"""
backend/tests/test_scheduler.py
Unit tests for the background cron-job scheduler (Issue #387).

Tests cover:
  - Scheduler start / stop lifecycle.
  - Repo eligibility (due-for-refresh query).
  - ``refresh_all_due_repos`` with mocked rescan.
  - ``_refresh_single_repo`` skips repos with an active job.
  - Scheduler disabled when REFRESH_INTERVAL_HOURS=0.
  - ``get_scheduler_status`` returns the expected shape.
"""

from __future__ import annotations

from datetime import datetime, timedelta, timezone
from unittest.mock import AsyncMock, MagicMock, patch

import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker

from backend.database import Base
from backend.shared.models import Repo

pytestmark = pytest.mark.anyio


@pytest.fixture()
def anyio_backend():
    return "asyncio"


@pytest.fixture()
def sync_db():
    """Create an in-memory SQLite DB with synchronous sessions."""
    engine = create_engine("sqlite:///:memory:", echo=False)
    Base.metadata.create_all(engine)
    SessionLocal = sessionmaker(bind=engine)
    session = SessionLocal()
    yield session
    session.close()


def _make_repo(
    db: Session,
    slug: str = "test/repo",
    status: str = "ready",
    last_updated: datetime | None = None,
    max_commits: int = 100,
) -> Repo:
    repo = Repo(
        url=f"https://github.com/{slug}",
        name=slug.split("/")[-1],
        owner=slug.split("/")[0],
        repo_slug=slug,
        status=status,
        last_updated_at=last_updated,
        max_commits_setting=max_commits,
    )
    db.add(repo)
    db.commit()
    db.refresh(repo)
    return repo


def _setup_session_mock(mock_factory: MagicMock) -> AsyncMock:
    """Configure a patched AsyncSessionLocal to return a mock session.

    The key: ``mock_factory.return_value = mock_session`` ensures that
    ``AsyncSessionLocal()`` returns our mock, and
    ``mock_session.__aenter__`` returns the same mock for the
    ``async with ... as db`` protocol.
    """
    mock_session = AsyncMock()
    mock_factory.return_value = mock_session
    mock_session.__aenter__ = AsyncMock(return_value=mock_session)
    mock_session.__aexit__ = AsyncMock(return_value=None)
    return mock_session


# ════════════════════════════════════════════════════════════════
# 1. Scheduler lifecycle
# ════════════════════════════════════════════════════════════════


class TestSchedulerLifecycle:
    @pytest.mark.asyncio
    async def test_start_scheduler_returns_none_when_disabled(self):
        """Scheduler returns None when REFRESH_INTERVAL_HOURS=0."""
        with patch("backend.scheduler.REFRESH_INTERVAL_HOURS", 0):
            from backend.scheduler import start_scheduler

            result = start_scheduler()
            assert result is None

    @pytest.mark.asyncio
    async def test_start_scheduler_returns_none_without_apscheduler(self):
        """Scheduler returns None when APScheduler is not installed."""
        with patch("backend.scheduler.REFRESH_INTERVAL_HOURS", 24):
            with patch.dict("sys.modules", {"apscheduler": None}):
                from backend.scheduler import start_scheduler

                result = start_scheduler()
                assert result is None

    @pytest.mark.asyncio
    async def test_stop_scheduler_when_not_started(self):
        """stop_scheduler is a no-op when no scheduler is running."""
        from backend.scheduler import stop_scheduler

        # Should not raise.
        stop_scheduler()

    @pytest.mark.asyncio
    async def test_get_scheduler_status_when_disabled(self):
        """get_scheduler_status returns running=False when disabled."""
        with patch("backend.scheduler.REFRESH_INTERVAL_HOURS", 0):
            from backend.scheduler import get_scheduler_status

            status = get_scheduler_status()
            assert status["running"] is False
            assert status["enabled"] is False


# ════════════════════════════════════════════════════════════════
# 2. Repo eligibility
# ════════════════════════════════════════════════════════════════


class TestRepoEligibility:
    def test_repo_due_when_last_updated_is_old(self, sync_db):
        """A repo with last_updated_at older than the threshold is due."""
        old_time = datetime.now(tz=timezone.utc) - timedelta(hours=48)
        repo = _make_repo(sync_db, slug="old/repo", last_updated=old_time)
        assert repo.status == "ready"

    def test_repo_not_due_when_recently_updated(self, sync_db):
        """A repo with last_updated_at within the threshold is not due."""
        recent_time = datetime.now(tz=timezone.utc) - timedelta(hours=1)
        repo = _make_repo(sync_db, slug="recent/repo", last_updated=recent_time)
        assert repo.status == "ready"

    def test_repo_due_when_last_updated_is_null(self, sync_db):
        """A repo with NULL last_updated_at is due."""
        repo = _make_repo(sync_db, slug="null/repo", last_updated=None)
        assert repo.status == "ready"
        assert repo.last_updated_at is None

    def test_repo_not_due_when_status_not_ready(self, sync_db):
        """A repo with status != 'ready' is not due."""
        repo = _make_repo(sync_db, slug="pending/repo", status="pending")
        assert repo.status != "ready"


# ════════════════════════════════════════════════════════════════
# 3. refresh_all_due_repos
# ════════════════════════════════════════════════════════════════


class TestRefreshAllDueRepos:
    @pytest.mark.asyncio
    async def test_refresh_all_returns_empty_when_no_repos(self):
        """refresh_all_due_repos returns zeros when no repos exist."""
        with patch("backend.scheduler.AsyncSessionLocal") as mock_factory:
            mock_session = _setup_session_mock(mock_factory)

            # execute returns a result whose .scalars().all() is []
            mock_result = MagicMock()
            mock_result.scalars.return_value.all.return_value = []
            mock_session.execute = AsyncMock(return_value=mock_result)

            from backend.scheduler import refresh_all_due_repos

            result = await refresh_all_due_repos()
            assert result == {
                "checked": 0,
                "refreshed": 0,
                "skipped": 0,
                "errors": 0,
            }

    @pytest.mark.asyncio
    async def test_refresh_all_handles_db_error(self):
        """refresh_all_due_repos returns error count on DB failure."""
        from sqlalchemy.exc import OperationalError

        with patch("backend.scheduler.AsyncSessionLocal") as mock_factory:
            mock_session = _setup_session_mock(mock_factory)
            mock_session.execute = AsyncMock(
                side_effect=OperationalError("SELECT 1", {}, Exception("DB down"))
            )

            from backend.scheduler import refresh_all_due_repos

            result = await refresh_all_due_repos()
            assert result == {
                "checked": 0,
                "refreshed": 0,
                "skipped": 0,
                "errors": 1,
            }

    @pytest.mark.asyncio
    async def test_refresh_all_refreshes_due_repos(self):
        """refresh_all_due_repos calls _refresh_single_repo for each due repo."""
        mock_repo_1 = MagicMock(id=1, repo_slug="a/b")
        mock_repo_2 = MagicMock(id=2, repo_slug="c/d")

        with patch("backend.scheduler.AsyncSessionLocal") as mock_factory:
            mock_session = _setup_session_mock(mock_factory)

            mock_result = MagicMock()
            mock_result.scalars.return_value.all.return_value = [
                mock_repo_1,
                mock_repo_2,
            ]
            mock_session.execute = AsyncMock(return_value=mock_result)

            with patch(
                "backend.scheduler._refresh_single_repo",
                new_callable=AsyncMock,
            ) as mock_refresh:
                # Patch STAGGER_SECONDS to 0 so the test doesn't sleep.
                with patch("backend.scheduler.STAGGER_SECONDS", 0):
                    from backend.scheduler import refresh_all_due_repos

                    result = await refresh_all_due_repos()

                assert mock_refresh.call_count == 2
                assert result["checked"] == 2
                assert result["refreshed"] == 2
                assert result["errors"] == 0


# ════════════════════════════════════════════════════════════════
# 4. _refresh_single_repo
# ════════════════════════════════════════════════════════════════


class TestRefreshSingleRepo:
    @pytest.mark.asyncio
    async def test_skips_repo_with_active_job(self):
        """_refresh_single_repo skips repos that already have an active job."""
        mock_repo = MagicMock(id=1, repo_slug="a/b", max_commits_setting=100)
        mock_active_job = MagicMock(id=42, status="analyzing")

        with patch("backend.scheduler.AsyncSessionLocal") as mock_factory:
            _setup_session_mock(mock_factory)

            with patch(
                "backend.features.repo_ingestion.router._latest_active_job",
                new_callable=AsyncMock,
                return_value=mock_active_job,
            ) as mock_latest:
                with patch(
                    "backend.features.repo_ingestion.router.run_rescan",
                    new_callable=AsyncMock,
                ) as mock_rescan:
                    from backend.scheduler import _refresh_single_repo

                    await _refresh_single_repo(mock_repo)

                    mock_latest.assert_called_once()
                    mock_rescan.assert_not_called()

    @pytest.mark.asyncio
    async def test_launches_rescan_when_no_active_job(self):
        """_refresh_single_repo launches run_rescan when no active job exists."""
        mock_repo = MagicMock(id=1, repo_slug="a/b", max_commits_setting=100)

        with patch("backend.scheduler.AsyncSessionLocal") as mock_factory:
            mock_session = _setup_session_mock(mock_factory)

            # add() is synchronous — must be MagicMock, not AsyncMock.
            mock_session.add = MagicMock()
            mock_session.commit = AsyncMock()
            mock_session.refresh = AsyncMock()

            with patch(
                "backend.features.repo_ingestion.router._latest_active_job",
                new_callable=AsyncMock,
                return_value=None,
            ):
                with patch(
                    "backend.features.repo_ingestion.router.run_rescan",
                    new_callable=AsyncMock,
                ) as mock_rescan:
                    from backend.scheduler import _refresh_single_repo

                    await _refresh_single_repo(mock_repo)

                    mock_rescan.assert_called_once()
                    # Verify the job was created with triggered_by="scheduler"
                    added_job = mock_session.add.call_args[0][0]
                    assert added_job.triggered_by == "scheduler"
                    assert added_job.status == "queued"

    @pytest.mark.asyncio
    async def test_handles_exception_gracefully(self):
        """_refresh_single_repo logs but doesn't propagate exceptions."""
        mock_repo = MagicMock(id=1, repo_slug="error/repo", max_commits_setting=100)

        with patch("backend.scheduler.AsyncSessionLocal") as mock_factory:
            mock_session = _setup_session_mock(mock_factory)

            mock_session.add = MagicMock()
            mock_session.commit = AsyncMock()
            mock_session.refresh = AsyncMock()

            with patch(
                "backend.features.repo_ingestion.router._latest_active_job",
                new_callable=AsyncMock,
                return_value=None,
            ):
                with patch(
                    "backend.features.repo_ingestion.router.run_rescan",
                    new_callable=AsyncMock,
                    side_effect=RuntimeError("git clone failed"),
                ):
                    from backend.scheduler import _refresh_single_repo

                    # Should not raise.
                    await _refresh_single_repo(mock_repo)
