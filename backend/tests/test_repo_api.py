import json
from collections.abc import AsyncIterator
from datetime import datetime, timezone

import pytest
from fastapi import HTTPException
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker

from backend.database import Base
from backend.features.llm_analysis.cache import make_cache_key
from backend.features.llm_analysis.router import explain_commit_stream
from backend.features.repo_ingestion.router import (
    cancel_ingestion,
    get_bus_factor,
    get_commit_detail,
    get_graph,
    get_llm_usage,
    get_repo_by_slug,
    get_timeline,
    ingest_progress,
    ingest_repo,
    list_repos,
    run_ingestion,
)
from backend.shared.models import (
    AnalysisJob,
    BusFactor,
    Commit,
    GraphEdge,
    GraphNode,
    HealthSnapshot,
    LLMNarrative,
    Repo,
)
from backend.shared.schemas import IngestRequest, NarrativeRequest

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


class BackgroundTaskRecorder:
    def __init__(self):
        self.tasks = []

    def add_task(self, func, *args, **kwargs):
        self.tasks.append((func, args, kwargs))


async def _read_sse_payload(response) -> dict:
    chunk = await anext(response.body_iterator)
    text = chunk.decode("utf-8") if isinstance(chunk, bytes) else chunk
    assert text.startswith("data: ")
    return json.loads(text.removeprefix("data: ").strip())


async def _read_sse_payloads(response) -> list[dict]:
    payloads = []
    async for chunk in response.body_iterator:
        text = chunk.decode("utf-8") if isinstance(chunk, bytes) else chunk
        for event in text.split("\n\n"):
            if not event.startswith("data: "):
                continue
            payloads.append(json.loads(event.removeprefix("data: ").strip()))
    return payloads


class FakeExecuteResult:
    def __init__(self, job):
        self.job = job

    def scalar_one_or_none(self):
        return self.job


class FakeProgressDb:
    def __init__(self, jobs):
        self.jobs = list(jobs)
        self.close_count = 0

    async def execute(self, statement):
        return FakeExecuteResult(self.jobs.pop(0) if self.jobs else None)


class FakeProgressSessionFactory:
    def __init__(self, db: FakeProgressDb):
        self.db = db

    async def __aenter__(self):
        return self.db

    async def __aexit__(self, exc_type, exc, traceback):
        self.db.close_count += 1


def _mock_progress_db(monkeypatch, jobs) -> FakeProgressDb:
    db = FakeProgressDb(jobs)
    monkeypatch.setattr(
        "backend.database.AsyncSessionLocal",
        lambda: FakeProgressSessionFactory(db),
    )
    return db


def _seed_repo(session: Session) -> None:
    repo = Repo(
        id=1,
        url="https://github.com/example/project",
        name="example/project",
        owner="example",
        repo_slug="example-project",
        default_branch="main",
        total_commits=2,
        analyzed_commits=2,
        status="ready",
        max_commits_setting=50,
        github_stars=42,
        github_language="Python",
        github_description="Fixture repository",
    )
    session.add(repo)
    session.flush()

    first_commit = Commit(
        repo_id=repo.id,
        sha="abc123def456",
        full_sha="abc123def4567890abc123def4567890abc123de",
        message="initial commit",
        author_name="Ava",
        author_email="ava@example.com",
        committed_at=datetime(2026, 1, 1, tzinfo=timezone.utc),
        insertions=25,
        deletions=0,
        files_changed=1,
    )
    second_commit = Commit(
        repo_id=repo.id,
        sha="def456abc123",
        full_sha="def456abc1237890def456abc1237890def456ab",
        message="refactor service layer",
        author_name="Noor",
        author_email="noor@example.com",
        committed_at=datetime(2026, 1, 2, tzinfo=timezone.utc),
        insertions=40,
        deletions=10,
        files_changed=2,
        parent_sha=first_commit.full_sha,
    )
    session.add_all([first_commit, second_commit])
    session.flush()

    session.add_all(
        [
            HealthSnapshot(
                repo_id=repo.id,
                commit_id=first_commit.id,
                full_sha=first_commit.full_sha,
                health_score=82.0,
                avg_complexity=2.0,
                max_complexity=3.0,
                total_loc=120,
                churn_rate=0.2,
                num_files_changed=1,
                bus_factor_min=2,
                health_delta=None,
                cc_score=90,
                churn_score=80,
                bus_score=40,
                loc_score=85,
                complexity_drift_score=90,
                churn_risk_score=80,
                bus_factor_risk_score=40,
                dependency_health_score=85,
                top_files_json='[{"path":"src/app.py","complexity":2.0,"loc":120}]',
            ),
            HealthSnapshot(
                repo_id=repo.id,
                commit_id=second_commit.id,
                full_sha=second_commit.full_sha,
                health_score=68.5,
                avg_complexity=7.25,
                max_complexity=12.0,
                total_loc=240,
                churn_rate=0.35,
                num_files_changed=2,
                bus_factor_min=1,
                health_delta=-13.5,
                cc_score=63.8,
                churn_score=65,
                bus_score=20,
                loc_score=80,
                complexity_drift_score=63.8,
                churn_risk_score=65,
                bus_factor_risk_score=20,
                dependency_health_score=80,
                dependency_density=0.5,
                avg_semantic_drift=0.12,
                semantic_health_score=88,
                high_drift_files=0,
                semantic_drift_method="fallback_levenshtein",
                risk_reasons_json='[{"code":"single_owner","severity":"critical","label":"Single-owner risk","detail":"At least one critical module has only one active contributor.","impact":30.0}]',
                hotspot_persistence_score=37.5,
                persistent_hotspots_json='[{"path":"src/service.py","recent_commit_count":3,"complexity":7.25,"loc":160}]',
                top_files_json='[{"path":"src/service.py","complexity":7.25,"loc":160}]',
            ),
        ]
    )

    session.add_all(
        [
            GraphNode(
                repo_id=repo.id,
                commit_id=second_commit.id,
                full_sha=second_commit.full_sha,
                file_path="src/service.py",
                module_name="service.py",
                loc=160,
                avg_complexity=7.25,
                health_color="yellow",
                is_entry_point=False,
                semantic_drift_score=0.12,
                drift_method="fallback_levenshtein",
            ),
            GraphNode(
                repo_id=repo.id,
                commit_id=second_commit.id,
                full_sha=second_commit.full_sha,
                file_path="src/app.py",
                module_name="app.py",
                loc=80,
                avg_complexity=2.0,
                health_color="green",
                is_entry_point=True,
            ),
            GraphEdge(
                repo_id=repo.id,
                commit_id=second_commit.id,
                full_sha=second_commit.full_sha,
                source_file="src/app.py",
                target_file="src/service.py",
                edge_type="import",
                weight=1,
            ),
            BusFactor(
                repo_id=repo.id,
                module_path="src/service.py",
                contributor_count=1,
                top_contributor="Noor",
                top_contributor_email="noor@example.com",
                top_contributor_pct=1.0,
                total_commits_to_module=2,
                risk_level="critical",
                last_commit_sha=second_commit.sha,
            ),
            LLMNarrative(
                repo_id=repo.id,
                commit_id=second_commit.id,
                full_sha=second_commit.full_sha,
                prompt_type="explain_drop",
                cache_key=make_cache_key(repo.id, second_commit.full_sha, "explain_drop"),
                prompt_input="{}",
                response_text="Complexity increased in the service layer.",
                tokens_input=10,
                tokens_output=8,
                cost_usd=0.00015,
                model_used="claude-3-5-sonnet-20241022",
            ),
        ]
    )
    session.commit()


@pytest.fixture()
async def db_session() -> AsyncIterator[AsyncSessionAdapter]:
    engine = create_engine("sqlite:///:memory:")
    session_factory = sessionmaker(engine, expire_on_commit=False)

    Base.metadata.create_all(engine)

    with session_factory() as session:
        _seed_repo(session)
        yield AsyncSessionAdapter(session)

    engine.dispose()


async def test_list_and_lookup_repos(db_session: AsyncSessionAdapter):
    listed = await list_repos(slug=None, db=db_session)
    assert len(listed) == 1
    assert listed[0].repo_slug == "example-project"

    filtered = await list_repos(slug="example-project", db=db_session)
    assert len(filtered) == 1

    by_slug = await get_repo_by_slug("example-project", db=db_session)
    assert by_slug.github_stars == 42

    with pytest.raises(HTTPException) as exc_info:
        await get_repo_by_slug("missing", db=db_session)
    assert exc_info.value.status_code == 404
    assert exc_info.value.headers["X-CommitIQ-Error"] == "repo_not_found"


async def test_timeline_returns_snapshot_payloads(db_session: AsyncSessionAdapter):
    payload = await get_timeline(repo_id=1, db=db_session)

    assert payload["repo_id"] == 1
    assert [commit["sha"] for commit in payload["commits"]] == ["abc123def456", "def456abc123"]
    assert payload["commits"][1]["top_files"] == [
        {"path": "src/service.py", "complexity": 7.25, "loc": 160}
    ]
    assert payload["commits"][1]["subscores"]["semantic_drift"] == 88
    assert payload["commits"][1]["risk_reasons"][0]["code"] == "single_owner"
    assert payload["commits"][1]["hotspot_persistence_score"] == 37.5
    assert payload["commits"][1]["persistent_hotspots"][0]["path"] == "src/service.py"


async def test_graph_bus_factor_and_usage_endpoints_return_seeded_data(
    db_session: AsyncSessionAdapter,
):
    graph = await get_graph(repo_id=1, sha="def456", db=db_session)
    assert graph["commit_sha"] == "def456abc123"
    assert {node["file"] for node in graph["nodes"]} == {"src/app.py", "src/service.py"}
    assert graph["edges"] == [
        {
            "source": "src/app.py",
            "target": "src/service.py",
            "type": "import",
            "weight": 1,
            "cochange_count": None,
        }
    ]

    bus_factor = await get_bus_factor(repo_id=1, db=db_session)
    assert bus_factor["modules"][0]["risk_level"] == "critical"
    assert bus_factor["modules"][0]["top_contributor"] == "Noor"

    usage = await get_llm_usage(repo_id=1, db=db_session)
    assert usage["total_calls"] == 1
    assert usage["anthropic_calls"] == 1
    assert usage["total_tokens"] == 18


async def test_commit_detail_includes_nested_snapshot_graph_and_cached_narrative(
    db_session: AsyncSessionAdapter,
):
    detail = await get_commit_detail(repo_id=1, sha="def456", db=db_session)

    assert detail["repo"].repo_slug == "example-project"
    assert detail["commit"].message == "refactor service layer"
    assert detail["snapshot"]["health_score"] == 68.5
    assert detail["graph"]["nodes"][0]["file"] == "src/service.py"
    assert detail["bus_factor"]["modules"][0]["module_path"] == "src/service.py"
    assert detail["has_narrative"] is True
    assert detail["narrative"]["cached"] is True
    assert detail["narrative"]["explanation"] == "Complexity increased in the service layer."


async def test_streaming_narrative_falls_back_to_demo_mode(
    db_session: AsyncSessionAdapter, monkeypatch
):
    async def failing_stream(prompt: str):
        raise RuntimeError("provider keys missing")
        yield prompt, None

    monkeypatch.setattr("backend.features.llm_analysis.router.stream_narrative", failing_stream)

    response = await explain_commit_stream(
        NarrativeRequest(repo_id=1, commit_sha="abc123def456", prompt_type="explain_drop"),
        db=db_session,
    )
    payloads = await _read_sse_payloads(response)

    final_payload = payloads[-1]
    assert final_payload["done"] is True
    assert final_payload["demo_mode"] is True
    assert final_payload["provider"] == "none"
    assert final_payload["model"] == "demo-mode"
    assert "DEMO MODE" in final_payload["explanation"]
    assert "error" not in final_payload

    cached = (
        db_session.session.query(LLMNarrative)
        .filter(
            LLMNarrative.cache_key
            == make_cache_key(1, "abc123def4567890abc123def4567890abc123de", "explain_drop")
        )
        .one()
    )
    assert cached.model_used == "demo-mode"
    assert cached.cost_usd == 0.0


async def test_ingest_repo_reuses_active_job_without_scheduling_duplicate(
    db_session: AsyncSessionAdapter,
):
    active_job = AnalysisJob(
        repo_id=1,
        status="analyzing",
        total_commits=50,
        processed_commits=10,
        current_stage="Analyzing commit 10/50",
        triggered_by="user",
    )
    repo = db_session.session.get(Repo, 1)
    repo.status = "processing"
    db_session.session.add(active_job)
    db_session.session.commit()
    background_tasks = BackgroundTaskRecorder()

    response = await ingest_repo(
        IngestRequest(repo_url="example/project", max_commits=50),
        background_tasks=background_tasks,
        db=db_session,
    )

    assert response.repo_id == 1
    assert response.status == "processing"
    assert response.job_id == active_job.id
    assert response.message.startswith("Ingestion already in progress")
    assert background_tasks.tasks == []


async def test_ingest_repo_schedules_created_job_by_id(
    db_session: AsyncSessionAdapter, monkeypatch
):
    async def fake_fetch_github_metadata(owner: str, repo: str):
        return {
            "github_stars": 0,
            "github_language": None,
            "github_description": None,
        }

    monkeypatch.setattr(
        "backend.features.repo_ingestion.router.fetch_github_metadata",
        fake_fetch_github_metadata,
    )
    background_tasks = BackgroundTaskRecorder()

    response = await ingest_repo(
        IngestRequest(repo_url="another/project", max_commits=25),
        background_tasks=background_tasks,
        db=db_session,
    )

    scheduled_func, args, kwargs = background_tasks.tasks[0]
    job = db_session.session.get(AnalysisJob, response.job_id)

    assert scheduled_func is run_ingestion
    assert args == (response.repo_id, response.job_id, 25)
    assert kwargs == {}
    assert job.status == "queued"


async def test_cancel_ingestion_marks_active_job_cancelled(db_session: AsyncSessionAdapter):
    active_job = AnalysisJob(
        repo_id=1,
        status="queued",
        total_commits=50,
        processed_commits=0,
        current_stage="Queued",
        triggered_by="user",
    )
    repo = db_session.session.get(Repo, 1)
    repo.status = "processing"
    db_session.session.add(active_job)
    db_session.session.commit()

    response = await cancel_ingestion(repo_id=1, db=db_session)

    cancelled_job = db_session.session.get(AnalysisJob, active_job.id)
    repo = db_session.session.get(Repo, 1)
    assert response.status == "cancelled"
    assert response.stage == "Cancelled"
    assert response.error_message == "Ingestion cancelled by user."
    assert cancelled_job.status == "cancelled"
    assert cancelled_job.completed_at is not None
    assert repo.status == "pending"
    assert repo.error_message == "Ingestion cancelled by user."


async def test_cancel_ingestion_handles_sqlite_naive_started_at(db_session: AsyncSessionAdapter):
    active_job = AnalysisJob(
        repo_id=1,
        status="analyzing",
        total_commits=50,
        processed_commits=10,
        current_stage="Analyzing",
        started_at=datetime(2026, 1, 1, 12, 0, 0),
        triggered_by="user",
    )
    repo = db_session.session.get(Repo, 1)
    repo.status = "processing"
    db_session.session.add(active_job)
    db_session.session.commit()

    response = await cancel_ingestion(repo_id=1, db=db_session)

    cancelled_job = db_session.session.get(AnalysisJob, active_job.id)
    assert response.status == "cancelled"
    assert cancelled_job.duration_seconds is not None
    assert cancelled_job.duration_seconds >= 0


async def test_cancel_ingestion_requires_active_job(db_session: AsyncSessionAdapter):
    with pytest.raises(HTTPException) as exc_info:
        await cancel_ingestion(repo_id=1, db=db_session)

    assert exc_info.value.status_code == 404
    assert exc_info.value.headers["X-CommitIQ-Error"] == "job_not_found"


async def test_ingest_progress_streams_error_payload_when_job_is_missing(monkeypatch):
    db = _mock_progress_db(monkeypatch, [None])

    response = await ingest_progress(repo_id=1)

    payload = await _read_sse_payload(response)

    assert response.media_type == "text/event-stream"
    assert payload == {"status": "error", "error_message": "Job not found"}
    with pytest.raises(StopAsyncIteration):
        await anext(response.body_iterator)
    assert db.close_count == 1


async def test_ingest_progress_streams_terminal_job_once(monkeypatch):
    job = AnalysisJob(
        repo_id=1,
        status="ready",
        total_commits=3,
        processed_commits=3,
        current_sha="def456abc123",
        current_stage="Complete",
        progress_pct=100.0,
        triggered_by="user",
    )
    db = _mock_progress_db(monkeypatch, [job])

    response = await ingest_progress(repo_id=1)
    payload = await _read_sse_payload(response)

    assert payload == {
        "current": 3,
        "total": 3,
        "current_sha": "def456abc123",
        "stage": "Complete",
        "progress_pct": 100.0,
        "status": "ready",
        "error_message": None,
    }
    assert db.close_count == 1
    with pytest.raises(StopAsyncIteration):
        await anext(response.body_iterator)


async def test_ingest_progress_stream_picks_up_cancelled_job_updates(monkeypatch):
    async def skip_sleep(seconds: float):
        return None

    db = _mock_progress_db(
        monkeypatch,
        [
            AnalysisJob(
                repo_id=1,
                status="queued",
                total_commits=5,
                processed_commits=0,
                current_stage="Queued",
                progress_pct=0.0,
                triggered_by="user",
            ),
            AnalysisJob(
                repo_id=1,
                status="cancelled",
                total_commits=5,
                processed_commits=0,
                current_stage="Cancelled",
                progress_pct=0.0,
                error_message="Ingestion cancelled by user.",
                triggered_by="user",
            ),
        ],
    )
    monkeypatch.setattr("backend.features.repo_ingestion.router.asyncio.sleep", skip_sleep)

    response = await ingest_progress(repo_id=1)
    first_payload = await _read_sse_payload(response)
    assert first_payload["status"] == "queued"

    second_payload = await _read_sse_payload(response)

    assert second_payload["status"] == "cancelled"
    assert second_payload["stage"] == "Cancelled"
    assert db.close_count == 2
    assert second_payload["error_message"] == "Ingestion cancelled by user."
    with pytest.raises(StopAsyncIteration):
        await anext(response.body_iterator)
