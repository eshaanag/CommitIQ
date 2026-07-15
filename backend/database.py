import logging
from pathlib import Path

from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.orm import DeclarativeBase

from backend.config import DATABASE_URL

logger = logging.getLogger(__name__)
_IS_SQLITE = DATABASE_URL.startswith("sqlite")

engine = create_async_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False, "timeout": 30} if _IS_SQLITE else {},
    echo=False,
)

AsyncSessionLocal = async_sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False,
)


class Base(DeclarativeBase):
    pass


async def get_db():
    async with AsyncSessionLocal() as session:
        yield session


def _migrations_dir() -> Path:
    return Path(__file__).resolve().parent.parent / "migrations"


async def _sqlite_columns(conn, table_name: str) -> set[str]:
    result = await conn.execute(text(f"PRAGMA table_info({table_name})"))
    return {row[1] for row in result.fetchall()}


async def _execute_statement(conn, statement: str, *, is_sqlite: bool = _IS_SQLITE) -> None:
    if not is_sqlite:
        await conn.execute(text(statement))
        return

    upper = statement.upper()
    if upper.startswith("ALTER TABLE") and " ADD COLUMN " in upper:
        parts = statement.split()
        if len(parts) >= 6:
            table_name = parts[2]
            column_name = parts[5]
            if column_name in await _sqlite_columns(conn, table_name):
                return
    await conn.execute(text(statement))


def _migration_statements(migration_sql: str) -> list[str]:
    migration_lines = migration_sql.splitlines()
    uncommented_sql = "\n".join(
        line for line in migration_lines
        if not line.lstrip().startswith("--")
    )
    return [
        statement.strip()
        for statement in uncommented_sql.split(";")
        if statement.strip()
    ]


async def _ensure_migration_table(conn) -> None:
    await conn.execute(text("""
        CREATE TABLE IF NOT EXISTS schema_migrations (
            version VARCHAR(255) PRIMARY KEY,
            applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """))


async def _applied_migrations(conn) -> set[str]:
    result = await conn.execute(text("SELECT version FROM schema_migrations"))
    return {row[0] for row in result.fetchall()}


async def _record_migration(conn, version: str) -> None:
    await conn.execute(
        text("INSERT INTO schema_migrations (version) VALUES (:version)"),
        {"version": version},
    )


async def apply_sql_migrations(
    conn,
    migrations_dir: Path | None = None,
    *,
    is_sqlite: bool = _IS_SQLITE,
) -> list[str]:
    """Apply checked-in SQL migrations once, in filename order."""
    migration_root = migrations_dir or _migrations_dir()
    await _ensure_migration_table(conn)

    if not migration_root.exists():
        return []

    applied = await _applied_migrations(conn)
    applied_now: list[str] = []

    for migration_path in sorted(migration_root.glob("*.sql")):
        version = migration_path.stem
        if version in applied:
            continue

        for statement in _migration_statements(migration_path.read_text(encoding="utf-8")):
            if not is_sqlite and statement.upper().startswith("PRAGMA"):
                continue
            await _execute_statement(conn, statement, is_sqlite=is_sqlite)

        await _record_migration(conn, version)
        applied.add(version)
        applied_now.append(version)

    return applied_now


def utc_normalize(dt):
    import datetime
    if dt is None:
        return None
    if dt.tzinfo is not None:
        return dt.astimezone(datetime.timezone.utc).replace(tzinfo=None)
    return dt

async def init_db():
    """Initialize database schema for local SQLite and hosted Postgres."""
    from backend.shared import models  # noqa: F401

    async with engine.begin() as conn:
        if _IS_SQLITE:
            await conn.execute(text("PRAGMA journal_mode=WAL"))
            await conn.execute(text("PRAGMA synchronous=NORMAL"))
            await conn.execute(text("PRAGMA foreign_keys=ON"))

        await conn.run_sync(Base.metadata.create_all)
        applied = await apply_sql_migrations(conn)

    logger.info("Database initialized", extra={"migrations_applied": len(applied)})
