from unittest.mock import AsyncMock

import pytest

from backend.database import commit_with_retry


@pytest.mark.anyio
async def test_commit_with_retry_success_first_try():
    session = AsyncMock()
    await commit_with_retry(session)
    assert session.commit.call_count == 1


@pytest.mark.anyio
async def test_commit_with_retry_succeeds_after_transient_lock(monkeypatch):
    import asyncio

    monkeypatch.setattr(asyncio, "sleep", AsyncMock())

    session = AsyncMock()
    # Fail first two times with 'database is locked', then succeed
    session.commit.side_effect = [
        Exception("OperationalError: database is locked"),
        Exception("OperationalError: database is locked"),
        None,
    ]

    await commit_with_retry(session, max_retries=3, initial_delay=0.1)

    assert session.commit.call_count == 3
    assert asyncio.sleep.call_count == 2
    # Verify exponential backoff: 0.1, 0.2
    assert asyncio.sleep.call_args_list[0][0][0] == 0.1
    assert asyncio.sleep.call_args_list[1][0][0] == 0.2


@pytest.mark.anyio
async def test_commit_with_retry_raises_after_max_retries(monkeypatch):
    import asyncio

    monkeypatch.setattr(asyncio, "sleep", AsyncMock())

    session = AsyncMock()
    session.commit.side_effect = Exception("OperationalError: database is locked")

    with pytest.raises(Exception, match="database is locked"):
        await commit_with_retry(session, max_retries=3, initial_delay=0.1)

    assert session.commit.call_count == 3
    assert asyncio.sleep.call_count == 2


@pytest.mark.anyio
async def test_commit_with_retry_raises_on_non_lock_error(monkeypatch):
    import asyncio

    monkeypatch.setattr(asyncio, "sleep", AsyncMock())

    session = AsyncMock()
    session.commit.side_effect = Exception("Some other error")

    with pytest.raises(Exception, match="Some other error"):
        await commit_with_retry(session, max_retries=3, initial_delay=0.1)

    assert session.commit.call_count == 1
    assert asyncio.sleep.call_count == 0
