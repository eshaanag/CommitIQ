from collections.abc import AsyncIterator
import csv
import io
from datetime import datetime, timezone

import pytest
from httpx import ASGITransport, AsyncClient
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker

from backend.database import Base, get_db
from backend.features.metrics.pr_export import CSV_COLUMNS, export_prs_to_csv
from backend.main import app
from backend.shared.models import PullRequest, Repo


@pytest.fixture()
def anyio_backend():
    return "asyncio"


class AsyncSessionAdapter:
    def __init__(self, session: Session):
        self.session = session

    async def execute(self, *args, **kwargs):
        return self.session.execute(*args, **kwargs)

    async def get(self, *args, **kwargs):
        return self.session.get(*args, **kwargs)

    def add(self, *args, **kwargs):
        return self.session.add(*args, **kwargs)

    async def flush(self):
        return self.session.flush()

    async def commit(self):
        return self.session.commit()

    async def refresh(self, instance):
        return self.session.refresh(instance)


@pytest.fixture()
async def db_session() -> AsyncIterator[AsyncSessionAdapter]:
    engine = create_engine("sqlite:///:memory:")
    session_factory = sessionmaker(engine, expire_on_commit=False)

    Base.metadata.create_all(engine)

    with session_factory() as session:
        adapter = AsyncSessionAdapter(session)
        app.dependency_overrides[get_db] = lambda: adapter
        yield adapter
        app.dependency_overrides.clear()
    engine.dispose()


@pytest.mark.anyio
async def test_export_prs_to_csv_empty(db_session: AsyncSessionAdapter):
    repo = Repo(
        url="https://github.com/test/empty-repo",
        name="empty-repo",
        owner="test",
        repo_slug="test-empty-repo",
        status="ready",
    )
    db_session.add(repo)
    await db_session.commit()
    await db_session.refresh(repo)

    csv_data = await export_prs_to_csv(db_session, repo.id)
    lines = csv_data.strip().split("\n")

    assert len(lines) == 1
    reader = csv.reader(io.StringIO(csv_data))
    header = next(reader)
    assert header == CSV_COLUMNS


@pytest.mark.anyio
async def test_export_prs_to_csv_with_data(db_session: AsyncSessionAdapter):
    repo = Repo(
        url="https://github.com/test/pr-repo",
        name="pr-repo",
        owner="test",
        repo_slug="test-pr-repo",
        status="ready",
    )
    db_session.add(repo)
    await db_session.commit()
    await db_session.refresh(repo)

    created_1 = datetime(2026, 8, 10, 10, 0, 0, tzinfo=timezone.utc)
    merged_1 = datetime(2026, 8, 10, 14, 30, 0, tzinfo=timezone.utc)
    pr1 = PullRequest(
        repo_id=repo.id,
        pr_number=101,
        title='Fix issue with "quotes" and, commas',
        state="merged",
        author="alice",
        created_at=created_1,
        merged_at=merged_1,
        first_review_at=datetime(2026, 8, 10, 11, 0, 0, tzinfo=timezone.utc),
        coding_time_sec=3600,
        pickup_time_sec=1800,
        review_time_sec=5400,
    )

    created_2 = datetime(2026, 8, 12, 9, 0, 0, tzinfo=timezone.utc)
    pr2 = PullRequest(
        repo_id=repo.id,
        pr_number=102,
        title="WIP: new feature",
        state="open",
        author="bob",
        created_at=created_2,
        merged_at=None,
        closed_at=None,
    )

    db_session.add(pr1)
    db_session.add(pr2)
    await db_session.commit()

    csv_data = await export_prs_to_csv(db_session, repo.id)
    reader = list(csv.reader(io.StringIO(csv_data)))

    assert reader[0] == CSV_COLUMNS
    assert len(reader) == 3  # Header + 2 rows

    # Rows ordered by pr_number desc (102 then 101)
    row_102 = reader[1]
    assert row_102[2] == "102"
    assert row_102[3] == "WIP: new feature"
    assert row_102[4] == "open"
    assert row_102[5] == "bob"
    assert row_102[10] == ""  # cycle_time_hours is empty for open PR

    row_101 = reader[2]
    assert row_101[2] == "101"
    assert row_101[3] == 'Fix issue with "quotes" and, commas'
    assert row_101[4] == "merged"
    assert row_101[5] == "alice"
    assert row_101[10] == "4.50"  # 4.5 hours cycle time
    assert row_101[11] == "3600"
    assert row_101[12] == "1800"
    assert row_101[13] == "5400"


@pytest.mark.anyio
async def test_export_prs_filter_by_state(db_session: AsyncSessionAdapter):
    repo = Repo(
        url="https://github.com/test/filter-repo",
        name="filter-repo",
        owner="test",
        repo_slug="test-filter-repo",
        status="ready",
    )
    db_session.add(repo)
    await db_session.commit()
    await db_session.refresh(repo)

    now = datetime(2026, 8, 15, 12, 0, 0, tzinfo=timezone.utc)
    pr_merged = PullRequest(
        repo_id=repo.id,
        pr_number=1,
        title="Merged PR",
        state="merged",
        author="alice",
        created_at=now,
        merged_at=now,
    )
    pr_open = PullRequest(
        repo_id=repo.id,
        pr_number=2,
        title="Open PR",
        state="open",
        author="bob",
        created_at=now,
    )
    pr_closed = PullRequest(
        repo_id=repo.id,
        pr_number=3,
        title="Closed PR",
        state="closed",
        author="charlie",
        created_at=now,
        closed_at=now,
    )
    db_session.add(pr_merged)
    db_session.add(pr_open)
    db_session.add(pr_closed)
    await db_session.commit()

    # Filter for merged only
    csv_merged = await export_prs_to_csv(db_session, repo.id, state="merged")
    rows_merged = list(csv.reader(io.StringIO(csv_merged)))
    assert len(rows_merged) == 2  # Header + 1 row
    assert rows_merged[1][2] == "1"
    assert rows_merged[1][4] == "merged"

    # Filter for open only
    csv_open = await export_prs_to_csv(db_session, repo.id, state="open")
    rows_open = list(csv.reader(io.StringIO(csv_open)))
    assert len(rows_open) == 2
    assert rows_open[1][2] == "2"
    assert rows_open[1][4] == "open"


@pytest.mark.anyio
async def test_export_prs_filter_by_date(db_session: AsyncSessionAdapter):
    repo = Repo(
        url="https://github.com/test/date-repo",
        name="date-repo",
        owner="test",
        repo_slug="test-date-repo",
        status="ready",
    )
    db_session.add(repo)
    await db_session.commit()
    await db_session.refresh(repo)

    pr_old = PullRequest(
        repo_id=repo.id,
        pr_number=1,
        title="Old PR",
        state="merged",
        author="alice",
        created_at=datetime(2026, 7, 1, 12, 0, 0, tzinfo=timezone.utc),
    )
    pr_mid = PullRequest(
        repo_id=repo.id,
        pr_number=2,
        title="Mid PR",
        state="merged",
        author="bob",
        created_at=datetime(2026, 7, 15, 12, 0, 0, tzinfo=timezone.utc),
    )
    pr_new = PullRequest(
        repo_id=repo.id,
        pr_number=3,
        title="New PR",
        state="merged",
        author="charlie",
        created_at=datetime(2026, 8, 1, 12, 0, 0, tzinfo=timezone.utc),
    )
    db_session.add(pr_old)
    db_session.add(pr_mid)
    db_session.add(pr_new)
    await db_session.commit()

    start = datetime(2026, 7, 10, 0, 0, 0, tzinfo=timezone.utc)
    end = datetime(2026, 7, 20, 0, 0, 0, tzinfo=timezone.utc)

    csv_data = await export_prs_to_csv(
        db_session, repo.id, start_date=start, end_date=end
    )
    rows = list(csv.reader(io.StringIO(csv_data)))
    assert len(rows) == 2  # Header + pr_mid only
    assert rows[1][2] == "2"


@pytest.mark.anyio
async def test_export_prs_api_endpoint_success(db_session: AsyncSessionAdapter):
    repo = Repo(
        url="https://github.com/owner/api-export-repo",
        name="api-export-repo",
        owner="owner",
        repo_slug="owner-api-export-repo",
        status="ready",
    )
    db_session.add(repo)
    await db_session.commit()
    await db_session.refresh(repo)

    pr = PullRequest(
        repo_id=repo.id,
        pr_number=42,
        title="Feature: Export PRs",
        state="merged",
        author="dev",
        created_at=datetime(2026, 8, 1, 10, 0, 0, tzinfo=timezone.utc),
        merged_at=datetime(2026, 8, 1, 12, 30, 0, tzinfo=timezone.utc),
    )
    db_session.add(pr)
    await db_session.commit()

    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        response = await client.get(f"/api/metrics/repos/{repo.id}/prs/export")

    assert response.status_code == 200
    assert "text/csv" in response.headers["content-type"]
    assert (
        response.headers["content-disposition"]
        == 'attachment; filename="owner-api-export-repo_pull_requests.csv"'
    )

    rows = list(csv.reader(io.StringIO(response.text)))
    assert rows[0] == CSV_COLUMNS
    assert len(rows) == 2
    assert rows[1][2] == "42"
    assert rows[1][3] == "Feature: Export PRs"
    assert rows[1][10] == "2.50"


@pytest.mark.anyio
async def test_export_prs_api_endpoint_not_found(db_session: AsyncSessionAdapter):
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        response = await client.get("/api/metrics/repos/99999/prs/export")

    assert response.status_code == 404
    assert response.json()["detail"] == "Repository not found"
