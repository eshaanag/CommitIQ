from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from backend.config import LLM_BUDGET_PER_REPO_USD, LLM_MAX_CALLS
from backend.features.llm_analysis.llm_router import provider_from_model
from backend.shared.models import LLMNarrative

PROVIDER_COSTS_PER_1K_OUTPUT = {
    "anthropic": 0.015,
    "gemini": 0.00035,
    "cache": 0.0,
}


async def check_budget(repo_id: int, db: AsyncSession) -> bool:
    """Returns True if we have budget for another call, False otherwise."""
    result = await db.execute(select(LLMNarrative).where(LLMNarrative.repo_id == repo_id))
    rows = result.scalars().all()
    billable_rows = [row for row in rows if _is_provider_call(row)]
    total_calls = len(billable_rows)
    total_cost = sum(float(row.cost_usd or 0.0) for row in billable_rows)
    return total_calls < LLM_MAX_CALLS and total_cost < LLM_BUDGET_PER_REPO_USD


def estimate_cost_usd(tokens_input: int, tokens_output: int, provider: str) -> float:
    if provider == "gemini":
        # Approximate input as cheap enough for demo metering; output dominates visible cost.
        return round((tokens_output / 1000.0) * PROVIDER_COSTS_PER_1K_OUTPUT["gemini"], 6)
    if provider == "anthropic":
        return round((tokens_input * 0.000003) + (tokens_output * 0.000015), 6)
    return 0.0


def _is_provider_call(row: LLMNarrative) -> bool:
    if row.is_pre_cached:
        return False
    return provider_from_model(row.model_used) in {"anthropic", "gemini"}


async def get_usage_summary(repo_id: int, db: AsyncSession) -> dict:
    result = await db.execute(select(LLMNarrative).where(LLMNarrative.repo_id == repo_id))
    rows = result.scalars().all()
    provider_rows = [row for row in rows if _is_provider_call(row)]
    cached_rows = [row for row in rows if row.is_pre_cached]
    total_tokens = sum(row.tokens_input + row.tokens_output for row in provider_rows)
    total_cost = sum(float(row.cost_usd or 0.0) for row in provider_rows)
    anthropic_calls = sum(
        1 for row in provider_rows if provider_from_model(row.model_used) == "anthropic"
    )
    gemini_calls = sum(
        1 for row in provider_rows if provider_from_model(row.model_used) == "gemini"
    )
    cached_tokens = sum(row.tokens_input + row.tokens_output for row in cached_rows)
    cache_hits = len(cached_rows)
    return {
        "repo_id": repo_id,
        "total_calls": len(provider_rows),
        "cache_hits": cache_hits,
        "anthropic_calls": anthropic_calls,
        "gemini_calls": gemini_calls,
        "total_tokens": total_tokens,
        "total_cost_usd": round(float(total_cost or 0.0), 6),
        "cache_savings_usd": round(
            (cached_tokens / 1000.0) * PROVIDER_COSTS_PER_1K_OUTPUT["anthropic"], 6
        ),
        "budget_remaining": max(0, LLM_MAX_CALLS - len(provider_rows)),
        "max_calls": LLM_MAX_CALLS,
    }
