from collections.abc import AsyncIterator

import pytest
from httpx import ASGITransport, AsyncClient
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker

from backend.database import Base, get_db
from backend.features.metrics.dora import compute_dora_metrics
from backend.main import app
from backend.shared.models import Deployment, Repo


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
async def test_gitlab_webhook_by_repo_id(db_session: AsyncSessionAdapter):
    repo = Repo(
        url="https://gitlab.com/owner/example-repo",
        name="owner/example-repo",
        owner="owner",
        repo_slug="owner-example-repo",
        status="ready",
    )
    db_session.add(repo)
    await db_session.flush()

    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        payload = {
            "object_kind": "pipeline",
            "object_attributes": {
                "id": 9988,
                "ref": "main",
                "status": "success",
                "detailed_status": "passed",
                "environment": "production",
            },
            "project": {
                "id": 456,
                "name": "example-repo",
                "path_with_namespace": "owner/example-repo",
                "web_url": "https://gitlab.com/owner/example-repo",
            },
            "commit": {
                "id": "c1234567890abcdef",
                "message": "Deploy production pipeline",
            },
        }

        resp = await client.post(
            f"/api/webhooks/gitlab/{repo.id}",
            json=payload,
            headers={"X-Gitlab-Event": "Pipeline Hook"},
        )
        assert resp.status_code == 200
        body = resp.json()
        assert body["status"] == "recorded"
        assert body["repo_id"] == repo.id

        dep = await db_session.get(Deployment, body["deployment_id"])
        assert dep is not None
        assert dep.repo_id == repo.id
        assert dep.provider == "gitlab"
        assert dep.status == "success"
        assert dep.pipeline_id == "9988"
        assert dep.sha == "c1234567890abcdef"

        dora = await compute_dora_metrics(db_session, repo.id)
        assert dora["deployment_frequency_value"] >= 1.0


@pytest.mark.anyio
async def test_gitlab_webhook_auto_resolves_repo(db_session: AsyncSessionAdapter):
    repo = Repo(
        url="https://gitlab.com/acme/service",
        name="acme/service",
        owner="acme",
        repo_slug="acme-service",
        status="ready",
    )
    db_session.add(repo)
    await db_session.flush()

    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        payload = {
            "object_kind": "pipeline",
            "object_attributes": {
                "id": 1001,
                "ref": "main",
                "status": "passed",
            },
            "project": {
                "path_with_namespace": "acme/service",
                "web_url": "https://gitlab.com/acme/service",
            },
            "commit": {
                "id": "a9876543210abcdef",
            },
        }

        resp = await client.post(
            "/api/webhooks/gitlab",
            json=payload,
        )
        assert resp.status_code == 200
        body = resp.json()
        assert body["status"] == "recorded"
        assert body["repo_id"] == repo.id


@pytest.mark.anyio
async def test_gitlab_webhook_ignores_non_pipeline_events(db_session: AsyncSessionAdapter):
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        payload = {
            "object_kind": "issue",
            "object_attributes": {"id": 12},
        }

        resp = await client.post("/api/webhooks/gitlab", json=payload)
        assert resp.status_code == 200
        body = resp.json()
        assert body["status"] == "ignored"
