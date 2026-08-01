import asyncio
import pytest
from unittest.mock import AsyncMock
from sqlalchemy import text
from backend.database import commit_with_retry, engine, _IS_SQLITE


@pytest.mark.anyio
async def test_commit_with_retry_succeeds_on_first_attempt():
    session = AsyncMock()
    session.commit = AsyncMock()

    await commit_with_retry(session, max_retries=3)

    assert session.commit.call_count == 1


@pytest.mark.anyio
async def test_commit_with_retry_retries_up_to_3_times_on_lock():
    session = AsyncMock()
    call_count = 0

    async def mock_commit():
        nonlocal call_count
        call_count += 1
        if call_count < 3:
            raise RuntimeError("(sqlite3.OperationalError) database is locked")
        return None

    session.commit = mock_commit

    await commit_with_retry(session, max_retries=3, initial_delay=0.01)

    assert call_count == 3


@pytest.mark.anyio
async def test_commit_with_retry_fails_after_3_retries():
    session = AsyncMock()
    session.commit = AsyncMock(side_effect=RuntimeError("(sqlite3.OperationalError) database is locked"))

    with pytest.raises(RuntimeError) as exc_info:
        await commit_with_retry(session, max_retries=3, initial_delay=0.01)

    assert "database is locked" in str(exc_info.value)
    assert session.commit.call_count == 3


@pytest.mark.anyio
async def test_commit_with_retry_raises_non_lock_error_immediately():
    session = AsyncMock()
    session.commit = AsyncMock(side_effect=ValueError("connection dropped"))

    with pytest.raises(ValueError) as exc_info:
        await commit_with_retry(session, max_retries=3, initial_delay=0.01)

    assert "connection dropped" in str(exc_info.value)
    assert session.commit.call_count == 1


@pytest.mark.anyio
async def test_sqlite_pragmas_active():
    if not _IS_SQLITE:
        pytest.skip("Test requires SQLite database")

    async with engine.connect() as conn:
        res = await conn.execute(text("PRAGMA journal_mode"))
        mode = res.scalar()
        assert mode.lower() == "wal"

        res_timeout = await conn.execute(text("PRAGMA busy_timeout"))
        timeout_ms = res_timeout.scalar()
        assert timeout_ms >= 10000
