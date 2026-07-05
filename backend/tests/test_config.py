from backend.config import _cors_origins, _normalize_database_url, _parse_bool, _parse_csv


def test_normalize_database_url_uses_asyncpg_for_postgres_urls():
    assert (
        _normalize_database_url("postgres://user:pass@host/db")
        == "postgresql+asyncpg://user:pass@host/db"
    )
    assert (
        _normalize_database_url("postgresql://user:pass@host/db")
        == "postgresql+asyncpg://user:pass@host/db"
    )
    assert (
        _normalize_database_url("sqlite+aiosqlite:///./commitiq.db")
        == "sqlite+aiosqlite:///./commitiq.db"
    )


def test_parse_csv_trims_empty_values():
    assert _parse_csv(" https://app.example.com, ,https://admin.example.com ") == [
        "https://app.example.com",
        "https://admin.example.com",
    ]


def test_parse_bool_handles_common_env_values():
    assert _parse_bool(None, default=True) is True
    assert _parse_bool(None, default=False) is False
    assert _parse_bool("true") is True
    assert _parse_bool("1") is True
    assert _parse_bool("off") is False
    assert _parse_bool(" no ") is False


def test_cors_origins_use_local_defaults_outside_production():
    origins = _cors_origins("development", None)

    assert "http://localhost:5173" in origins
    assert "http://127.0.0.1:3000" in origins


def test_cors_origins_require_explicit_values_in_production():
    assert _cors_origins("production", None) == []
    assert _cors_origins("production", "https://app.example.com") == ["https://app.example.com"]
