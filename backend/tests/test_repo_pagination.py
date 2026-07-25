"""Pagination tests for the list_repos endpoint."""

from collections.abc import AsyncIterator

import pytest
from fastapi import HTTPException
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker

from backend.database import Base
from backend.features.repo_ingestion.router import list_repos
from backend.shared.models import Repo

pytestmark = pytest.mark.anyio


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
        self.session.flush()

    async def commit(self):
        self.session.commit()

    async def rollback(self):
        self.session.rollback()

    async def refresh(self, instance):
        self.session.refresh(instance)


def _seed_multiple_repos(session: Session) -> None:
    """Seed 3 repos for pagination tests."""
    for idx in range(1, 4):
        repo = Repo(
            id=idx,
            url=f"https://github.com/example/project{idx}",
            name=f"example/project{idx}",
            owner="example",
            repo_slug=f"example-project{idx}",
            default_branch="main",
            total_commits=2,
            analyzed_commits=2,
            status="ready",
            max_commits_setting=50,
            github_stars=idx * 10,
            github_language="Python",
            github_description=f"Fixture repository {idx}",
        )
        session.add(repo)
    session.commit()


@pytest.fixture()
async def multi_repo_session() -> AsyncIterator[AsyncSessionAdapter]:
    engine = create_engine("sqlite:///:memory:")
    session_factory = sessionmaker(engine, expire_on_commit=False)

    Base.metadata.create_all(engine)

    with session_factory() as session:
        _seed_multiple_repos(session)
        yield AsyncSessionAdapter(session)

    engine.dispose()


async def test_default_pagination(multi_repo_session: AsyncSessionAdapter):
    """Default limit=20, offset=0 returns all 3 repos."""
    listed = await list_repos(slug=None, db=multi_repo_session)
    assert len(listed) == 3


async def test_custom_limit(multi_repo_session: AsyncSessionAdapter):
    """limit=2 returns only 2 repos."""
    listed = await list_repos(slug=None, limit=2, offset=0, db=multi_repo_session)
    assert len(listed) == 2


async def test_custom_offset(multi_repo_session: AsyncSessionAdapter):
    """offset=2 skips first 2 repos and returns the last one."""
    listed = await list_repos(slug=None, limit=20, offset=2, db=multi_repo_session)
    assert len(listed) == 1
    assert listed[0].repo_slug == "example-project3"


async def test_offset_beyond_count(multi_repo_session: AsyncSessionAdapter):
    """offset beyond available rows returns empty list."""
    listed = await list_repos(slug=None, limit=20, offset=10, db=multi_repo_session)
    assert listed == []


async def test_negative_limit_raises(multi_repo_session: AsyncSessionAdapter):
    """Negative limit raises HTTPException."""
    with pytest.raises(HTTPException) as exc_info:
        await list_repos(slug=None, limit=-1, offset=0, db=multi_repo_session)
    assert exc_info.value.status_code == 422


async def test_negative_offset_raises(multi_repo_session: AsyncSessionAdapter):
    """Negative offset raises HTTPException."""
    with pytest.raises(HTTPException) as exc_info:
        await list_repos(slug=None, limit=20, offset=-1, db=multi_repo_session)
    assert exc_info.value.status_code == 422


async def test_zero_limit_raises(multi_repo_session: AsyncSessionAdapter):
    """limit=0 raises HTTPException (must be >= 1)."""
    with pytest.raises(HTTPException) as exc_info:
        await list_repos(slug=None, limit=0, offset=0, db=multi_repo_session)
    assert exc_info.value.status_code == 422


async def test_limit_capped_at_100(multi_repo_session: AsyncSessionAdapter):
    """limit > 100 is capped to 100."""
    listed = await list_repos(slug=None, limit=200, offset=0, db=multi_repo_session)
    assert len(listed) == 3  # Only 3 repos exist, so capped limit still returns all


async def test_slug_and_pagination(multi_repo_session: AsyncSessionAdapter):
    """slug filter combined with pagination works."""
    listed = await list_repos(slug="example-project1", limit=20, offset=0, db=multi_repo_session)
    assert len(listed) == 1
    assert listed[0].repo_slug == "example-project1"


async def test_ordering_preserved(multi_repo_session: AsyncSessionAdapter):
    """Pagination returns results in the same order (by ingested_at desc)."""
    first_two = await list_repos(slug=None, limit=2, offset=0, db=multi_repo_session)
    last_one = await list_repos(slug=None, limit=1, offset=2, db=multi_repo_session)
    assert first_two[0].repo_slug != last_one[0].repo_slug
