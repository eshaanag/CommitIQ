import asyncio
import json
import logging

from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from backend.database import get_db
from backend.features.llm_analysis.cache import make_cache_key
from backend.features.llm_analysis.claude_client import (
    get_or_create_narrative,
)
from backend.features.llm_analysis.cost_guard import check_budget, estimate_cost_usd
from backend.features.llm_analysis.llm_router import (
    LLMProvider,
    model_for_provider,
    stream_narrative,
)
from backend.features.llm_analysis.prompt_builder import EXPLAIN_DROP_SYSTEM, build_explain_prompt
from backend.shared.models import Commit, HealthSnapshot, LLMNarrative
from backend.shared.schemas import NarrativeRequest, NarrativeResponse, PredictRequest

router = APIRouter(prefix="", tags=["llm"])
logger = logging.getLogger(__name__)


def _build_demo_narrative(
    commit_message: str,
    before: dict,
    after: dict,
) -> str:
    health_delta = float(after.get("health_score", 0) or 0) - float(before.get("health_score", 0) or 0)
    complexity_delta = float(after.get("avg_complexity", 0) or 0) - float(before.get("avg_complexity", 0) or 0)
    risk_level = "High" if health_delta <= -15 or after.get("bus_factor_min", 1) <= 1 else "Medium" if health_delta < 0 else "Low"
    top_files = after.get("top_files_json") or "[]"

    return (
        "DEMO MODE: Configure ANTHROPIC_API_KEY or GEMINI_API_KEY for provider-backed narratives.\n"
        f"- Commit: {(commit_message or 'No commit message')[:90]}\n"
        f"- Health moved from {before.get('health_score', 0)} to {after.get('health_score', 0)} "
        f"({health_delta:+.1f}).\n"
        f"- Average complexity changed by {complexity_delta:+.2f}; churn is "
        f"{after.get('churn_rate', 0)} across {after.get('num_files_changed', 0)} changed files.\n"
        f"- Bus factor minimum is {after.get('bus_factor_min', 1)}. Top changed-file metrics: {top_files[:220]}.\n"
        f"Risk level: {risk_level}"
    )


def _map_error(exc: Exception) -> HTTPException:
    if isinstance(exc, PermissionError):
        return HTTPException(status_code=429, detail=str(exc))
    if isinstance(exc, ValueError):
        return HTTPException(status_code=404, detail=str(exc))
    return HTTPException(status_code=503, detail=f"LLM call failed: {str(exc)[:200]}")


@router.post("/explain/bus-factor", response_model=NarrativeResponse)
async def explain_bus_factor(request: NarrativeRequest, db: AsyncSession = Depends(get_db)):
    # Returns AI plan to mitigate key-person dependency risks
    pass

@router.post("/explain", response_model=NarrativeResponse)
async def explain_commit(
    request: NarrativeRequest,
    db: AsyncSession = Depends(get_db),
):
    try:
        return await get_or_create_narrative(
            repo_id=request.repo_id,
            commit_sha=request.commit_sha,
            prompt_type=request.prompt_type,
            db=db,
        )
    except Exception as exc:
        raise _map_error(exc)


@router.post("/predict", response_model=NarrativeResponse)
async def predict_merge(
    request: PredictRequest,
    db: AsyncSession = Depends(get_db),
):
    try:
        return await get_or_create_narrative(
            repo_id=request.repo_id,
            commit_sha=request.commit_sha,
            prompt_type="predict_merge",
            db=db,
        )
    except Exception as exc:
        raise _map_error(exc)


@router.post("/explain/stream")
async def explain_commit_stream(
    request: NarrativeRequest,
    db: AsyncSession = Depends(get_db),
):
    commit_result = await db.execute(
        select(Commit).where(
            Commit.repo_id == request.repo_id,
            (Commit.sha == request.commit_sha[:12]) | (Commit.full_sha == request.commit_sha),
        ).limit(1)
    )
    commit = commit_result.scalar_one_or_none()
    if not commit:
        raise HTTPException(status_code=404, detail=f"Commit {request.commit_sha} not found")

    cache_key = make_cache_key(request.repo_id, commit.full_sha, request.prompt_type)
    cached_result = await db.execute(select(LLMNarrative).where(LLMNarrative.cache_key == cache_key))
    cached = cached_result.scalar_one_or_none()
    if cached:
        async def replay_cache():
            for word in cached.response_text.split(" "):
                yield f"data: {json.dumps({'token': word + ' ', 'done': False})}\n\n"
                await asyncio.sleep(0.03)
            yield f"data: {json.dumps({'done': True, 'explanation': cached.response_text, 'tokens_total': cached.tokens_input + cached.tokens_output, 'cost_usd': 0.0, 'cached': True, 'model': cached.model_used, 'provider': 'cache', 'demo_mode': False})}\n\n"

        return StreamingResponse(
            replay_cache(),
            media_type="text/event-stream",
            headers={"X-LLM-Provider": "cache", "X-Cache-Hit": "true", "X-LLM-Cost-USD": "0.0000"},
        )

    if not await check_budget(request.repo_id, db):
        raise HTTPException(status_code=429, detail="LLM budget exceeded for this repo. Cache will be used.")

    snapshot_result = await db.execute(select(HealthSnapshot).where(HealthSnapshot.commit_id == commit.id))
    snapshot = snapshot_result.scalar_one_or_none()
    if not snapshot:
        raise HTTPException(status_code=404, detail="Health snapshot not found")

    prev_commit_result = await db.execute(
        select(Commit)
        .where(Commit.repo_id == request.repo_id, Commit.committed_at < commit.committed_at)
        .order_by(Commit.committed_at.desc())
        .limit(1)
    )
    prev_commit = prev_commit_result.scalar_one_or_none()
    prev_snapshot = None
    if prev_commit:
        prev_snapshot_result = await db.execute(
            select(HealthSnapshot).where(HealthSnapshot.commit_id == prev_commit.id)
        )
        prev_snapshot = prev_snapshot_result.scalar_one_or_none()

    before = {
        "health_score": prev_snapshot.health_score if prev_snapshot else 0,
        "avg_complexity": prev_snapshot.avg_complexity if prev_snapshot else 0,
        "bus_factor_min": prev_snapshot.bus_factor_min if prev_snapshot else 1,
        "avg_semantic_drift": prev_snapshot.avg_semantic_drift if prev_snapshot else 0,
        "semantic_health_score": prev_snapshot.semantic_health_score if prev_snapshot else 100,
    }
    after = {
        "health_score": snapshot.health_score,
        "avg_complexity": snapshot.avg_complexity,
        "churn_rate": snapshot.churn_rate,
        "num_files_changed": snapshot.num_files_changed,
        "bus_factor_min": snapshot.bus_factor_min,
        "top_files_json": snapshot.top_files_json,
        "avg_semantic_drift": snapshot.avg_semantic_drift,
        "semantic_health_score": snapshot.semantic_health_score,
        "high_drift_files": snapshot.high_drift_files,
        "semantic_drift_method": snapshot.semantic_drift_method,
    }
    prompt = build_explain_prompt(before, after, commit.message or "")

    async def event_generator():
        full_text: list[str] = []
        provider_used = LLMProvider.NONE
        try:
            async for chunk, provider in stream_narrative(prompt):
                full_text.append(chunk)
                provider_used = provider
                yield f"data: {json.dumps({'token': chunk, 'done': False})}\n\n"
            response_text = "".join(full_text)
            tokens_in = int(len((EXPLAIN_DROP_SYSTEM + prompt).split()) * 1.3)
            tokens_out = int(len(response_text.split()) * 1.3)
            provider_value = provider_used.value
            cost = estimate_cost_usd(tokens_in, tokens_out, provider_value)
            model_used = model_for_provider(provider_used)
            narrative = LLMNarrative(
                repo_id=request.repo_id,
                commit_id=commit.id,
                full_sha=commit.full_sha,
                prompt_type=request.prompt_type,
                cache_key=cache_key,
                prompt_input=prompt,
                response_text=response_text,
                tokens_input=tokens_in,
                tokens_output=tokens_out,
                cost_usd=cost,
                model_used=model_used,
            )
            db.add(narrative)
            await db.commit()
            yield f"data: {json.dumps({'done': True, 'explanation': response_text, 'tokens_total': tokens_in + tokens_out, 'cost_usd': cost, 'cached': False, 'model': model_used, 'provider': provider_value, 'demo_mode': False})}\n\n"
        except Exception as exc:
            logger.warning("Narrative stream provider unavailable, using demo mode: %s", exc)
            response_text = _build_demo_narrative(commit.message or "", before, after)
            tokens_in = int(len((EXPLAIN_DROP_SYSTEM + prompt).split()) * 1.3)
            tokens_out = int(len(response_text.split()) * 1.3)
            narrative = LLMNarrative(
                repo_id=request.repo_id,
                commit_id=commit.id,
                full_sha=commit.full_sha,
                prompt_type=request.prompt_type,
                cache_key=cache_key,
                prompt_input=prompt,
                response_text=response_text,
                tokens_input=tokens_in,
                tokens_output=tokens_out,
                cost_usd=0.0,
                model_used="demo-mode",
                is_pre_cached=False,
            )
            db.add(narrative)
            await db.commit()
            yield f"data: {json.dumps({'done': True, 'explanation': response_text, 'tokens_total': tokens_in + tokens_out, 'cost_usd': 0.0, 'cached': False, 'model': 'demo-mode', 'provider': LLMProvider.NONE.value, 'demo_mode': True})}\n\n"

    return StreamingResponse(
        event_generator(),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
    )
