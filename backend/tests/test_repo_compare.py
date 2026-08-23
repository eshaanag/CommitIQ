from datetime import datetime, timezone

import pytest
from fastapi import HTTPException
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker

from backend.database import Base
from backend.features.repo_ingestion.router import compare_repos
from backend.shared.models import BusFactor, Commit, HealthSnapshot, Repo

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
        self.session.add(*args, **kwargs)

    async def flush(self):
        self.session.flush()

    async def commit(self):
        self.session.commit()

    async def rollback(self):
        self.session.rollback()

    async def refresh(self, instance):
        self.session.refresh(instance)


@pytest.fixture()
def db_session() -> AsyncSessionAdapter:
    engine = create_engine("sqlite:///:memory:")
    Base.metadata.create_all(engine)
    session = sessionmaker(bind=engine)()
    try:
        yield AsyncSessionAdapter(session)
    finally:
        session.close()


async def test_compare_repos_success(db_session: AsyncSessionAdapter):
    # Setup Repo 1
    repo1 = Repo(
        url="https://github.com/facebook/react",
        name="facebook/react",
        owner="facebook",
        repo_slug="facebook_react",
        default_branch="main",
        status="ready",
        total_commits=120,
        analyzed_commits=100,
        github_stars=220000,
        github_language="TypeScript",
    )
    # Setup Repo 2
    repo2 = Repo(
        url="https://github.com/vuejs/vue",
        name="vuejs/vue",
        owner="vuejs",
        repo_slug="vuejs_vue",
        default_branch="main",
        status="ready",
        total_commits=95,
        analyzed_commits=90,
        github_stars=206000,
        github_language="TypeScript",
    )
    db_session.add(repo1)
    db_session.add(repo2)
    await db_session.flush()

    # Add Commits & Snapshots for Repo 1
    commit1 = Commit(
        repo_id=repo1.id,
        sha="1111111",
        full_sha="1111111111111111111111111111111111111111",
        message="feat: react core improvements",
        author_name="Alice Dev",
        author_email="alice@example.com",
        committed_at=datetime.now(timezone.utc),
    )
    db_session.add(commit1)
    await db_session.flush()

    snap1 = HealthSnapshot(
        repo_id=repo1.id,
        commit_id=commit1.id,
        full_sha=commit1.full_sha,
        health_score=88.5,
        avg_complexity=4.2,
        max_complexity=14.0,
        total_loc=45000,
        churn_rate=0.08,
        num_files_changed=6,
        bus_factor_min=3,
        hotspot_count=2,
        cc_score=85.0,
        churn_score=90.0,
        bus_score=88.0,
        loc_score=92.0,
    )
    db_session.add(snap1)

    # Add Commits & Snapshots for Repo 2
    commit2 = Commit(
        repo_id=repo2.id,
        sha="2222222",
        full_sha="2222222222222222222222222222222222222222",
        message="feat: vue reactivity",
        author_name="Bob Dev",
        author_email="bob@example.com",
        committed_at=datetime.now(timezone.utc),
    )
    db_session.add(commit2)
    await db_session.flush()

    snap2 = HealthSnapshot(
        repo_id=repo2.id,
        commit_id=commit2.id,
        full_sha=commit2.full_sha,
        health_score=82.0,
        avg_complexity=5.8,
        max_complexity=19.0,
        total_loc=32000,
        churn_rate=0.14,
        num_files_changed=10,
        bus_factor_min=2,
        hotspot_count=5,
        cc_score=78.0,
        churn_score=80.0,
        bus_score=75.0,
        loc_score=85.0,
    )
    db_session.add(snap2)

    # Bus factor records
    db_session.add(
        BusFactor(
            repo_id=repo1.id,
            module_path="packages/react",
            contributor_count=4,
            top_contributor="Alice",
            top_contributor_pct=0.45,
            total_commits_to_module=50,
            risk_level="low",
        )
    )
    db_session.add(
        BusFactor(
            repo_id=repo2.id,
            module_path="src/core",
            contributor_count=2,
            top_contributor="Bob",
            top_contributor_pct=0.75,
            total_commits_to_module=40,
            risk_level="medium",
        )
    )
    await db_session.commit()

    # Call compare_repos
    response = await compare_repos(
        base="facebook_react",
        head="vuejs_vue",
        db=db_session,
    )

    assert response.base.repo.name == "facebook/react"
    assert response.head.repo.name == "vuejs/vue"
    assert response.base.metrics_summary.health_score == 88.5
    assert response.head.metrics_summary.health_score == 82.0
    assert response.deltas.health_score_delta == -6.5
    assert response.deltas.avg_complexity_delta == 1.6
    assert response.deltas.bus_factor_min_delta == -1
    assert len(response.insights) > 0
    assert "facebook/react" in response.verdict or "vuejs/vue" in response.verdict


async def test_compare_repos_with_aliases(db_session: AsyncSessionAdapter):
    repo1 = Repo(
        url="https://github.com/expressjs/express",
        name="expressjs/express",
        owner="expressjs",
        repo_slug="expressjs_express",
        status="ready",
    )
    repo2 = Repo(
        url="https://github.com/fastify/fastify",
        name="fastify/fastify",
        owner="fastify",
        repo_slug="fastify_fastify",
        status="ready",
    )
    db_session.add(repo1)
    db_session.add(repo2)
    await db_session.commit()

    # Test with repo1 & repo2 alias
    response = await compare_repos(
        repo1="expressjs_express",
        repo2="fastify_fastify",
        db=db_session,
    )
    assert response.base.repo.repo_slug == "expressjs_express"
    assert response.head.repo.repo_slug == "fastify_fastify"


async def test_compare_repos_missing_params(db_session: AsyncSessionAdapter):
    with pytest.raises(HTTPException) as exc_info:
        await compare_repos(base="expressjs_express", head=None, db=db_session)
    assert exc_info.value.status_code == 422


async def test_compare_repos_nonexistent_base(db_session: AsyncSessionAdapter):
    repo = Repo(
        url="https://github.com/expressjs/express",
        name="expressjs/express",
        owner="expressjs",
        repo_slug="expressjs_express",
        status="ready",
    )
    db_session.add(repo)
    await db_session.commit()

    with pytest.raises(HTTPException) as exc_info:
        await compare_repos(base="does_not_exist", head="expressjs_express", db=db_session)
    assert exc_info.value.status_code == 404
    assert "does_not_exist" in str(exc_info.value.detail)


async def test_compare_repos_nonexistent_head(db_session: AsyncSessionAdapter):
    repo = Repo(
        url="https://github.com/expressjs/express",
        name="expressjs/express",
        owner="expressjs",
        repo_slug="expressjs_express",
        status="ready",
    )
    db_session.add(repo)
    await db_session.commit()

    with pytest.raises(HTTPException) as exc_info:
        await compare_repos(base="expressjs_express", head="nonexistent_head", db=db_session)
    assert exc_info.value.status_code == 404
    assert "nonexistent_head" in str(exc_info.value.detail)
