import os
from dotenv import load_dotenv
from pathlib import Path

load_dotenv()

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


DEFAULT_LOCAL_CORS_ORIGINS = (
    "http://localhost:5173,http://127.0.0.1:5173,http://localhost:5174,http://127.0.0.1:5174,"
    "http://localhost:5175,http://127.0.0.1:5175,http://localhost:3000,http://127.0.0.1:3000"
)


def _cors_origins(environment: str, raw_origins: str | None) -> list[str]:
    if raw_origins is not None:
        return _parse_csv(raw_origins)
    if environment.lower() == "production":
        return []
    return _parse_csv(DEFAULT_LOCAL_CORS_ORIGINS)


ANTHROPIC_API_KEY  = os.getenv("ANTHROPIC_API_KEY", "")
GEMINI_API_KEY     = os.getenv("GEMINI_API_KEY", "")
GITHUB_TOKEN       = os.getenv("GITHUB_TOKEN", "")
DATABASE_URL       = _normalize_database_url(os.getenv("DATABASE_URL", "sqlite+aiosqlite:///./commitiq.db"))
REPO_STORAGE_PATH  = Path(os.getenv("REPO_STORAGE_PATH", "/tmp/commitiq_repos"))
MAX_REPO_STORAGE_MB = int(os.getenv("MAX_REPO_STORAGE_MB", "5000"))
MAX_COMMITS        = int(os.getenv("MAX_COMMITS_PER_INGESTION", os.getenv("MAX_COMMITS", "500")))
LLM_MAX_CALLS      = int(os.getenv("LLM_BUDGET_PER_REPO", os.getenv("LLM_MAX_CALLS_PER_REPO", os.getenv("LLM_MAX_CALLS", "25"))))
LLM_BUDGET_PER_REPO_USD = float(os.getenv("LLM_BUDGET_PER_REPO_USD", "0.50"))
ENABLE_SEMANTIC_ANALYSIS = _parse_bool(os.getenv("ENABLE_SEMANTIC_ANALYSIS"), default=True)
ENABLE_GRAPHCODEBERT = _parse_bool(os.getenv("ENABLE_GRAPHCODEBERT"), default=False)
ENVIRONMENT        = os.getenv("ENVIRONMENT", "development")
CORS_ORIGINS       = _cors_origins(ENVIRONMENT, os.getenv("CORS_ORIGINS"))

REPO_STORAGE_PATH.mkdir(parents=True, exist_ok=True)
