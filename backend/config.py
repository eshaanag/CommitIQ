import logging
import os
from pathlib import Path

from dotenv import load_dotenv

load_dotenv()

logger = logging.getLogger(__name__)


def _normalize_database_url(url: str) -> str:
    if url.startswith("postgres://"):
        return url.replace("postgres://", "postgresql+asyncpg://", 1)
    if url.startswith("postgresql://") and "+asyncpg" not in url:
        return url.replace("postgresql://", "postgresql+asyncpg://", 1)
    return url


def _parse_csv(value: str) -> list[str]:
    return [item.strip() for item in value.split(",") if item.strip()]


def _parse_bool(value: str | None, default: bool = False) -> bool:
    if value is None:
        return default
    return value.strip().lower() not in {"", "0", "false", "no", "off"}


# Localhost origins that are ALWAYS allowed in development environments
# so a developer never has to set CORS_ORIGINS just to load the frontend
# against the local backend. Covers the common Vite (5173-5175) and
# Next.js (3000) dev server ports on both `localhost` and `127.0.0.1`.
DEFAULT_LOCAL_CORS_ORIGINS = (
    "http://localhost:5173,http://127.0.0.1:5173,http://localhost:5174,http://127.0.0.1:5174,"
    "http://localhost:5175,http://127.0.0.1:5175,http://localhost:3000,http://127.0.0.1:3000"
)

# Environment identifiers that are treated as "development-like" and
# therefore auto-allow localhost origins. Any value not in this set is
# treated as production-grade and requires explicit CORS_ORIGINS.
DEVELOPMENT_ENVIRONMENTS = frozenset({"development", "dev", "local", "staging", "test", "testing"})


def _is_development_environment(environment: str) -> bool:
    """Return True for environment identifiers treated as development-like.

    Comparison is case-insensitive and trims surrounding whitespace so
    values like ``"Development"`` or ``" local "`` from a misformatted
    .env file still resolve to development defaults.
    """
    return (environment or "").strip().lower() in DEVELOPMENT_ENVIRONMENTS


def _cors_origins(environment: str, raw_origins: str | None) -> list[str]:
    """Resolve the list of allowed CORS origins.

    Behavior (Issue #264):

    * **Development environments** (``development``, ``dev``, ``local``,
      ``staging``, ``test``, ``testing``): localhost origins are ALWAYS
      allowed. Any origins the operator explicitly set via
      ``CORS_ORIGINS`` are merged in (deduplicated, order-preserving).
      An empty / whitespace-only ``CORS_ORIGINS`` value is treated as
      "unset" so a stray ``CORS_ORIGINS=`` line in ``.env`` does not
      silently block all cross-origin requests.

    * **Production environment** (``production``): only explicitly
      configured origins are allowed. If none are set, an empty list is
      returned (CORS rejects all cross-origin browser requests) and a
      ``WARNING`` is logged so operators notice the misconfiguration.

    * **Unknown environments**: treated as production-grade (fail-closed)
      and a ``WARNING`` is logged guiding the operator to set
      ``ENVIRONMENT=development`` if they intended localhost defaults.

    Args:
        environment: The ``ENVIRONMENT`` setting (e.g. ``"development"``,
            ``"production"``). Case-insensitive.
        raw_origins: The raw value of ``CORS_ORIGINS`` from the
            environment (may be ``None`` if unset, or an empty string if
            set to blank).

    Returns:
        List of allowed origin URLs. Order: development localhost
        defaults first (in dev), then any explicit origins.
    """
    env_normalized = (environment or "").strip().lower()
    is_dev = _is_development_environment(env_normalized)
    is_production = env_normalized == "production"

    # Treat empty / whitespace-only raw_origins as "unset". This is the
    # core bug fix: previously `CORS_ORIGINS=""` returned `[]` even in
    # development, silently breaking every cross-origin request.
    explicit_origins: list[str] = []
    if raw_origins is not None and raw_origins.strip():
        explicit_origins = _parse_csv(raw_origins)

    local_defaults = _parse_csv(DEFAULT_LOCAL_CORS_ORIGINS)

    if is_production:
        if not explicit_origins:
            logger.warning(
                "CORS_ORIGINS is not set in production environment %r; "
                "all cross-origin browser requests will be rejected. "
                "Set CORS_ORIGINS to the comma-separated list of allowed "
                "frontend origins.",
                environment,
            )
        return explicit_origins

    if is_dev:
        # Merge localhost defaults with any operator-provided origins.
        # Dedup while preserving order (localhost first, then explicit).
        merged: list[str] = []
        seen: set[str] = set()
        for origin in local_defaults + explicit_origins:
            if origin not in seen:
                seen.add(origin)
                merged.append(origin)
        if not explicit_origins:
            logger.info(
                "CORS_ORIGINS not set in %r environment; falling back to "
                "localhost defaults (%d origins).",
                environment,
                len(merged),
            )
        else:
            logger.info(
                "CORS_ORIGINS resolved in %r environment: %d explicit "
                "origin(s) merged with %d localhost default(s) = %d total.",
                environment,
                len(explicit_origins),
                len(local_defaults),
                len(merged),
            )
        return merged

    # Unknown environment — fail closed like production, but log a hint.
    logger.warning(
        "Unknown ENVIRONMENT value %r; treating as production for CORS. "
        "Set ENVIRONMENT=development to auto-allow localhost origins.",
        environment,
    )
    return explicit_origins


ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY", "")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN", "")
DATABASE_URL = _normalize_database_url(
    os.getenv("DATABASE_URL", "sqlite+aiosqlite:///./commitiq.db")
)
REPO_STORAGE_PATH = Path(os.getenv("REPO_STORAGE_PATH", "/tmp/commitiq_repos"))
MAX_REPO_STORAGE_MB = int(os.getenv("MAX_REPO_STORAGE_MB", "5000"))
MAX_COMMITS = int(os.getenv("MAX_COMMITS_PER_INGESTION", os.getenv("MAX_COMMITS", "500")))
LLM_MAX_CALLS = int(
    os.getenv(
        "LLM_BUDGET_PER_REPO", os.getenv("LLM_MAX_CALLS_PER_REPO", os.getenv("LLM_MAX_CALLS", "25"))
    )
)
LLM_BUDGET_PER_REPO_USD = float(os.getenv("LLM_BUDGET_PER_REPO_USD", "0.50"))
ENABLE_SEMANTIC_ANALYSIS = _parse_bool(os.getenv("ENABLE_SEMANTIC_ANALYSIS"), default=True)
ENABLE_GRAPHCODEBERT = _parse_bool(os.getenv("ENABLE_GRAPHCODEBERT"), default=False)
ENVIRONMENT = os.getenv("ENVIRONMENT", "development")
CORS_ORIGINS = _cors_origins(ENVIRONMENT, os.getenv("CORS_ORIGINS"))

REPO_STORAGE_PATH.mkdir(parents=True, exist_ok=True)
