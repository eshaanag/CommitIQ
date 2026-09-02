import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker

from backend.database import Base
from backend.features.repo_ingestion.router import rescan_repo, run_rescan
from backend.shared.models import AnalysisJob, Repo

pytestmark = pytest.mark.anyio


@pytest.fixture()
def anyio_backend():
    return "asyncio"


class AsyncSessionAdapter:
    def __init__(self, session: Session):
        self.session = session

    async def execute(self, *args, **kwargs):
        return self.session.execute(*args, **kwargs)

    async def get(self, entity, ident):
        return self.session.get(entity, ident)

    def add(self, instance):
        self.session.add(instance)

    async def flush(self):
        self.session.flush()

    async def commit(self):
        self.session.commit()

    async def refresh(self, instance):
        self.session.refresh(instance)

    async def rollback(self):
        self.session.rollback()


@pytest.fixture()
def db_session():
    engine = create_engine("sqlite:///:memory:")
    Base.metadata.create_all(engine)
    SessionLocal = sessionmaker(bind=engine)
    session = SessionLocal()
    try:
        yield AsyncSessionAdapter(session)
    finally:
        session.close()


async def test_rescan_repo_not_found(db_session):
    from fastapi import HTTPException

    class DummyBackgroundTasks:
        def add_task(self, func, *args, **kwargs):
            pass

    with pytest.raises(HTTPException) as exc_info:
        await rescan_repo(repo_id=999, background_tasks=DummyBackgroundTasks(), db=db_session)
    assert exc_info.value.status_code == 404
    assert exc_info.value.detail == "Repository not found."


async def test_rescan_repo_creates_job(db_session):
    repo = Repo(
        url="https://github.com/test/rescan-repo",
        name="test/rescan-repo",
        owner="test",
        repo_slug="test-rescan-repo",
        status="ready",
    )
    db_session.add(repo)
    await db_session.commit()

    tasks_added = []

    class DummyBackgroundTasks:
        def add_task(self, func, *args, **kwargs):
            tasks_added.append((func, args, kwargs))

    res = await rescan_repo(repo_id=repo.id, background_tasks=DummyBackgroundTasks(), db=db_session)
    assert res.repo_id == repo.id
    assert res.status == "processing"
    assert len(tasks_added) == 1
    assert tasks_added[0][0] == run_rescan


async def test_rescan_repo_returns_existing_active_job(db_session):
    repo = Repo(
        url="https://github.com/test/rescan-active",
        name="test/rescan-active",
        owner="test",
        repo_slug="test-rescan-active",
        status="processing",
    )
    db_session.add(repo)
    await db_session.commit()

    job = AnalysisJob(repo_id=repo.id, status="analyzing", current_stage="Analyzing commit 1/5")
    db_session.add(job)
    await db_session.commit()

    tasks_added = []

    class DummyBackgroundTasks:
        def add_task(self, func, *args, **kwargs):
            tasks_added.append((func, args, kwargs))

    res = await rescan_repo(repo_id=repo.id, background_tasks=DummyBackgroundTasks(), db=db_session)
    assert res.repo_id == repo.id
    assert res.job_id == job.id
    assert len(tasks_added) == 0
    assert "already in progress" in res.message
