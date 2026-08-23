import hashlib
import logging
import os

logger = logging.getLogger(__name__)

REDIS_URL = os.environ.get("REDIS_URL", "redis://localhost:6379/0")
_redis_client = None


def _get_redis():
    global _redis_client
    if _redis_client is not None:
        return _redis_client
    try:
        import redis.asyncio as redis

        _redis_client = redis.from_url(REDIS_URL, decode_responses=True)
        return _redis_client
    except Exception as exc:
        logger.debug("Redis client unavailable: %s", exc)
        return None


def make_cache_key(repo_id: int, full_sha: str, prompt_type: str) -> str:
    """SHA256 of (repo_id:full_sha:prompt_type) — deterministic, collision-free."""
    raw = f"{repo_id}:{full_sha}:{prompt_type}"
    return hashlib.sha256(raw.encode()).hexdigest()


async def get_cached_narrative(cache_key: str) -> str | None:
    client = _get_redis()
    if not client:
        return None
    try:
        return await client.get(f"narrative:{cache_key}")
    except Exception as exc:
        logger.warning("Failed to get cached narrative for key %s: %s", cache_key, exc)
        return None


async def set_cached_narrative(
    cache_key: str, narrative: str, ttl_seconds: int = 86400 * 30
) -> None:
    client = _get_redis()
    if not client:
        return
    try:
        await client.set(f"narrative:{cache_key}", narrative, ex=ttl_seconds)
    except Exception as exc:
        logger.warning("Failed to set cached narrative for key %s: %s", cache_key, exc)
