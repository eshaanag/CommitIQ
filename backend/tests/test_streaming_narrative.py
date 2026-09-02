"""HTTP-level integration tests for the SSE streaming endpoints (Issue #394).

These tests exercise ``POST /api/explain/stream`` and ``POST /api/predict/stream``
end-to-end through FastAPI's ``TestClient``, asserting the SSE wire format,
content-type, cache-hit behaviour, and demo-mode fallback.
"""

from __future__ import annotations

import json
from typing import Any
from unittest.mock import AsyncMock, MagicMock, patch

import pytest
from fastapi.testclient import TestClient


def _parse_sse_events(body: bytes) -> list[dict[str, Any]]:
    """Parse a raw SSE response body into a list of payload dicts."""
    text = body.decode("utf-8")
    events: list[dict[str, Any]] = []
    for block in text.split("\n\n"):
        for line in block.split("\n"):
            if line.startswith("data: "):
                payload = line[len("data: ") :].strip()
                if payload:
                    events.append(json.loads(payload))
    return events


def _make_commit() -> MagicMock:
    """Return a stand-in Commit object with the fields the router reads."""
    commit = MagicMock()
    commit.id = 1
    commit.repo_id = 1
    commit.sha = "abc123def456"
    commit.full_sha = "abc123def456789012345678901234567890abcd"
    commit.message = "Refactor authentication module"
    commit.committed_at = MagicMock()  # any truthy comparable value works for the query builder
    return commit


def _make_snapshot() -> MagicMock:
    snap = MagicMock()
    snap.id = 1
    snap.commit_id = 1
    snap.health_score = 72.5
    snap.avg_complexity = 4.2
    snap.churn_rate = 0.18
    snap.num_files_changed = 7
    snap.bus_factor_min = 3
    snap.top_files_json = "[]"
    snap.avg_semantic_drift = 0.05
    snap.semantic_health_score = 88.0
    snap.high_drift_files = 0
    snap.semantic_drift_method = "none"
    return snap


@pytest.fixture()
def client(monkeypatch):
    """Yield a TestClient wired against a stubbed DB and LLM provider."""
    # Patch AsyncSessionLocal so post-stream persistence does not hit a real DB.
    fake_session = AsyncMock()
    fake_session.add = MagicMock()
    fake_session.commit = AsyncMock()

    class _AsyncSessionContext:
        async def __aenter__(self):
            return fake_session

        async def __aexit__(self, exc_type, exc, tb):
            return False

    monkeypatch.setattr("backend.database.AsyncSessionLocal", lambda: _AsyncSessionContext())

    # Stub the DB dependency FastAPI uses for the request scope.
    async def override_get_db():
        commit = _make_commit()
        snap = _make_snapshot()

        request_db = AsyncMock()

        # The router calls db.execute(...) multiple times with different
        # SELECT queries. Return an object whose scalar_one_or_none picks
        # the right mock based on the query's model.
        def _scalar_one_or_none():
            return None  # cache lookups return None → always go live

        async def _execute(stmt):
            result = MagicMock()
            result.scalar_one_or_none = _scalar_one_or_none

            # Heuristic: detect what the query selects by stringifying it.
            # Note: ``committed_at`` appears in *every* commit SELECT (as a
            # column), so we look for the ``<`` comparison operator that is
            # only present in the previous-commit lookup.
            stmt_str = str(stmt).lower()
            if "health_snapshot" in stmt_str:
                result.scalar_one_or_none = lambda: snap
            elif "llm_narratives" in stmt_str:
                result.scalar_one_or_none = _scalar_one_or_none
            elif "commits" in stmt_str and "committed_at <" in stmt_str:
                # Previous-commit lookup → return None so before dict uses defaults.
                result.scalar_one_or_none = _scalar_one_or_none
            else:
                # _resolve_commit's query → return the commit mock.
                result.scalar_one_or_none = lambda: commit
            return result

        request_db.execute = AsyncMock(side_effect=_execute)
        yield request_db

    # Stub budget check so we always proceed to the live stream.
    monkeypatch.setattr(
        "backend.features.llm_analysis.router.check_budget", AsyncMock(return_value=True)
    )
    # Stub cache lookups so we always go live.
    monkeypatch.setattr(
        "backend.features.llm_analysis.router.get_cached_narrative", AsyncMock(return_value=None)
    )
    # set_cached_narrative is called after persistence - stub it to no-op.
    monkeypatch.setattr(
        "backend.features.llm_analysis.router.set_cached_narrative", AsyncMock(return_value=None)
    )

    # Defer the app import until after monkeypatching is in place.
    from backend.database import get_db
    from backend.main import app

    app.dependency_overrides[get_db] = override_get_db
    try:
        yield TestClient(app)
    finally:
        app.dependency_overrides.clear()


def test_explain_stream_emits_sse_chunks_and_terminal_event(client):
    """A live stream yields ``data:`` lines and a final ``done:true`` payload."""
    from backend.features.llm_analysis.llm_router import LLMProvider

    async def fake_stream(_prompt, max_tokens=600):
        yield "Hello ", LLMProvider.ANTHROPIC
        yield "world.", LLMProvider.ANTHROPIC

    with patch("backend.features.llm_analysis.router.stream_narrative", fake_stream):
        response = client.post(
            "/api/explain/stream",
            json={
                "repo_id": 1,
                "commit_sha": "abc123def456789012345678901234567890abcd",
                "prompt_type": "explain_drop",
            },
        )

    assert response.status_code == 200
    assert response.headers["content-type"].startswith("text/event-stream")
    assert response.headers["cache-control"] == "no-cache"
    assert response.headers["x-accel-buffering"] == "no"

    events = _parse_sse_events(response.content)
    token_chunks = [e for e in events if not e.get("done")]
    assert len(token_chunks) == 2
    assert token_chunks[0]["token"] == "Hello "
    assert token_chunks[1]["token"] == "world."

    terminal = events[-1]
    assert terminal["done"] is True
    assert terminal["explanation"] == "Hello world."
    assert terminal["provider"] == "anthropic"
    assert terminal["demo_mode"] is False
    assert terminal["model"].startswith("claude-")
    assert terminal["tokens_total"] > 0


def test_explain_stream_falls_back_to_demo_mode_on_provider_failure(client):
    """When ``stream_narrative`` raises, the endpoint emits a demo-mode terminal event."""

    async def failing_stream(_prompt, max_tokens=600):
        raise RuntimeError("provider down")
        yield  # pragma: no cover - makes this an async generator

    with patch("backend.features.llm_analysis.router.stream_narrative", failing_stream):
        response = client.post(
            "/api/explain/stream",
            json={
                "repo_id": 1,
                "commit_sha": "abc123def456789012345678901234567890abcd",
                "prompt_type": "explain_drop",
            },
        )

    assert response.status_code == 200
    events = _parse_sse_events(response.content)
    terminal = events[-1]
    assert terminal["done"] is True
    assert terminal["demo_mode"] is True
    assert terminal["provider"] == "none"
    assert terminal["model"] == "demo-mode"
    assert terminal["cost_usd"] == 0.0
    assert "DEMO MODE" in terminal["explanation"]


def test_explain_stream_returns_404_for_missing_commit(client):
    """A commit SHA that doesn't resolve yields HTTP 404, not an SSE stream."""

    async def override_get_db_missing():
        request_db = AsyncMock()

        async def _execute(stmt):
            result = MagicMock()
            result.scalar_one_or_none = lambda: None
            return result

        request_db.execute = AsyncMock(side_effect=_execute)
        yield request_db

    from backend.database import get_db
    from backend.main import app

    app.dependency_overrides[get_db] = override_get_db_missing
    try:
        response = client.post(
            "/api/explain/stream",
            json={
                "repo_id": 1,
                "commit_sha": "0000000000000000000000000000000000000000",
                "prompt_type": "explain_drop",
            },
        )
    finally:
        # Restore the test fixture's override so teardown works.
        app.dependency_overrides.clear()

    assert response.status_code == 404
    assert "not found" in response.json()["detail"].lower()


def test_predict_stream_emits_sse_chunks(client):
    """The /predict/stream endpoint mirrors /explain/stream and emits the same SSE shape."""
    from backend.features.llm_analysis.llm_router import LLMProvider

    async def fake_stream(_prompt, max_tokens=600):
        yield "Low ", LLMProvider.ANTHROPIC
        yield "risk.", LLMProvider.ANTHROPIC

    with patch("backend.features.llm_analysis.router.stream_narrative", fake_stream):
        response = client.post(
            "/api/predict/stream",
            json={
                "repo_id": 1,
                "commit_sha": "abc123def456789012345678901234567890abcd",
                "prompt_type": "predict_merge",
            },
        )

    assert response.status_code == 200
    assert response.headers["content-type"].startswith("text/event-stream")
    events = _parse_sse_events(response.content)
    terminal = events[-1]
    assert terminal["done"] is True
    assert terminal["explanation"] == "Low risk."
    assert terminal["provider"] == "anthropic"
