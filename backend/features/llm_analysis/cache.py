import hashlib
import os
import logging
import redis.asyncio as redis

logger = logging.getLogger(__name__)

# Try to get REDIS_URL from env, otherwise fallback to localhost for development
REDIS_URL = os.environ.get("REDIS_URL", "redis://localhost:6379/0")
_redis_client = None

def _get_redis() -> redis.Redis | None:
    global _redis_client
    if not _redis_client:
        try:
            _redis_client = redis.from_url(REDIS_URL, decode_responses=True)
        except Exception as exc:
            logger.error("Failed to initialize Redis client: %s", exc)
            return None
    return _redis_client


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


async def set_cached_narrative(cache_key: str, narrative: str, ttl_seconds: int = 86400 * 30) -> None:
    client = _get_redis()
    if not client:
        return
    try:
        await client.set(f"narrative:{cache_key}", narrative, ex=ttl_seconds)
    except Exception as exc:
        logger.warning("Failed to set cached narrative for key %s: %s", cache_key, exc)
