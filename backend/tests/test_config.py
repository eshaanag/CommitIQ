from backend.config import (
    DEFAULT_LOCAL_CORS_ORIGINS,
    DEVELOPMENT_ENVIRONMENTS,
    _cors_origins,
    _is_development_environment,
    _normalize_database_url,
    _parse_bool,
    _parse_csv,
)


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


# --- CORS: existing behavior preserved (Issue #200) ---


def test_cors_origins_use_local_defaults_outside_production():
    origins = _cors_origins("development", None)

    assert "http://localhost:5173" in origins
    assert "http://127.0.0.1:3000" in origins


def test_cors_origins_require_explicit_values_in_production():
    assert _cors_origins("production", None) == []
    assert _cors_origins("production", "https://app.example.com") == ["https://app.example.com"]


# --- CORS: Issue #264 — enforce dev defaults, fix empty-string bug ---


def test_cors_origins_empty_string_falls_back_to_defaults_in_dev():
    """A stray `CORS_ORIGINS=` in .env must NOT block all origins in dev.

    Previously `raw_origins=""` was treated as "explicitly set" and
    returned `[]`, silently breaking every cross-origin request. It is
    now treated as "unset" and falls back to localhost defaults in
    development environments.
    """
    origins = _cors_origins("development", "")

    assert "http://localhost:5173" in origins
    assert "http://127.0.0.1:3000" in origins
    assert len(origins) == len(_parse_csv(DEFAULT_LOCAL_CORS_ORIGINS))


def test_cors_origins_whitespace_only_falls_back_to_defaults_in_dev():
    """Whitespace-only CORS_ORIGINS is also treated as unset in dev."""
    origins = _cors_origins("development", "   ,  , ")

    assert "http://localhost:5173" in origins
    assert "http://127.0.0.1:3000" in origins


def test_cors_origins_merges_explicit_with_defaults_in_dev():
    """In development, explicit origins are MERGED with localhost defaults.

    A developer who sets `CORS_ORIGINS=https://preview.example.com` does
    NOT lose access to localhost — both are allowed. This is the
    "enforce defaults in development" behavior from Issue #264.
    """
    origins = _cors_origins("development", "https://preview.example.com")

    assert any(o == "https://preview.example.com" for o in origins)
    assert any(o == "http://localhost:5173" for o in origins)
    assert any(o == "http://127.0.0.1:3000" for o in origins)


def test_cors_origins_deduplicates_in_dev():
    """Duplicate origins are collapsed, preserving first-seen order."""
    origins = _cors_origins(
        "development",
        "http://localhost:5173,https://custom.example.com,http://localhost:5173",
    )

    assert origins.count("http://localhost:5173") == 1
    assert any(o == "https://custom.example.com" for o in origins)
    # Localhost defaults appear first (they're merged in before explicit).
    assert origins[0] == "http://localhost:5173"


def test_cors_origins_dev_defaults_first_then_explicit():
    """Order: localhost defaults first, then operator-provided origins."""
    origins = _cors_origins("development", "https://custom.example.com")

    defaults = _parse_csv(DEFAULT_LOCAL_CORS_ORIGINS)
    assert origins[: len(defaults)] == defaults
    assert origins[len(defaults) :] == ["https://custom.example.com"]


def test_cors_origins_production_does_not_merge_defaults():
    """Production NEVER auto-allows localhost, even with explicit origins."""
    origins = _cors_origins("production", "https://app.example.com")

    assert origins == ["https://app.example.com"]
    assert "http://localhost:5173" not in origins


def test_cors_origins_production_empty_string_returns_empty():
    """`CORS_ORIGINS=` in production returns [] (fail-closed)."""
    assert _cors_origins("production", "") == []
    assert _cors_origins("production", "   ") == []


def test_cors_origins_recognizes_dev_environment_aliases():
    """Common dev environment identifiers all get localhost defaults."""
    for env in ("development", "dev", "local", "staging", "test", "testing"):
        origins = _cors_origins(env, None)
        assert (
            "http://localhost:5173" in origins
        ), f"Environment {env!r} should auto-allow localhost origins"


def test_cors_origins_case_insensitive_environment():
    """ENVIRONMENT=Development (capitalized) still resolves to dev defaults."""
    for env in ("Development", "DEVELOPMENT", "  Development  "):
        origins = _cors_origins(env, None)
        assert "http://localhost:5173" in origins


def test_cors_origins_unknown_environment_fails_closed():
    """An unrecognized ENVIRONMENT value is treated as production-grade.

    Fail-closed is the safe default: if the operator set ENVIRONMENT to
    something we don't recognize (e.g. 'qa', 'preview', 'prod-like'),
    we do NOT auto-allow localhost. They must set CORS_ORIGINS explicitly
    or change ENVIRONMENT to a recognized dev alias.
    """
    origins = _cors_origins("qa", None)
    assert origins == []

    origins = _cors_origins("preview", "https://preview.example.com")
    assert origins == ["https://preview.example.com"]
    assert "http://localhost:5173" not in origins


def test_is_development_environment_helper():
    """The helper correctly classifies environment identifiers."""
    assert _is_development_environment("development") is True
    assert _is_development_environment("dev") is True
    assert _is_development_environment("local") is True
    assert _is_development_environment("staging") is True
    assert _is_development_environment("test") is True
    assert _is_development_environment("testing") is True
    assert _is_development_environment("production") is False
    assert _is_development_environment("qa") is False
    assert _is_development_environment("") is False
    assert _is_development_environment(None) is False  # type: ignore[arg-type]
    # Case-insensitive
    assert _is_development_environment("Development") is True
    assert _is_development_environment("  LOCAL  ") is True


def test_development_environments_set_is_frozen():
    """The DEVELOPMENT_ENVIRONMENTS set must not be mutated at runtime."""
    import pytest

    with pytest.raises((AttributeError, TypeError)):
        DEVELOPMENT_ENVIRONMENTS.add("evil")  # type: ignore[attr-defined]
