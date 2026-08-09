"""
Tests for Issue #263 — Cache and reuse git commit history walks.

Verifies that:
  1. walk_commits caches results to disk on first call.
  2. Subsequent calls within TTL load from cache instead of re-walking.
  3. Different repo_paths or limits produce separate cache files.
  4. Expired cache files trigger a re-walk.
  5. Cache read/write errors are handled gracefully (fall back to walk).
"""

import json
import os
import time
from unittest.mock import patch

from backend.features.repo_ingestion.commit_walker import (
    _CACHE_TTL_SECONDS,
    _cache_is_valid,
    _cache_path,
    _load_cache,
    _save_cache,
    walk_commits,
)


def _mock_commit_data(count: int) -> list[dict]:
    """Generate mock commit metadata dicts."""
    return [
        {
            "sha": f"abc{i:04d}",
            "full_sha": f"abc{i:04d}" + "0" * 28,
            "message": f"Commit {i}",
            "author_name": "Test Author",
            "author_email": "test@example.com",
            "committed_at": "2026-01-01T00:00:00+00:00",
            "insertions": 10,
            "deletions": 5,
            "files_changed": 2,
            "files_list": ["file1.py", "file2.py"],
            "parent_sha": f"abc{i-1:04d}" if i > 0 else None,
            "index": i,
            "total": count,
        }
        for i in range(count)
    ]


def test_cache_path_is_deterministic(tmp_path):
    """Same repo_path + limit must produce the same cache path."""
    p1 = _cache_path(tmp_path, 150)
    p2 = _cache_path(tmp_path, 150)
    assert p1 == p2


def test_cache_path_differs_for_different_limits(tmp_path):
    """Different limits must produce different cache paths."""
    p1 = _cache_path(tmp_path, 150)
    p2 = _cache_path(tmp_path, 500)
    assert p1 != p2


def test_cache_path_differs_for_different_repos(tmp_path):
    """Different repo_paths must produce different cache paths."""
    p1 = _cache_path(tmp_path / "repo1", 150)
    p2 = _cache_path(tmp_path / "repo2", 150)
    assert p1 != p2


def test_cache_is_valid_returns_false_for_missing_file(tmp_path):
    """Non-existent cache file must be invalid."""
    assert not _cache_is_valid(tmp_path / "nonexistent.json")


def test_cache_is_valid_returns_true_for_fresh_file(tmp_path):
    """Recently created cache file must be valid."""
    cache_file = tmp_path / "cache.json"
    cache_file.write_text("[]")
    assert _cache_is_valid(cache_file)


def test_cache_is_valid_returns_false_for_expired_file(tmp_path):
    """Cache file older than TTL must be invalid."""
    cache_file = tmp_path / "cache.json"
    cache_file.write_text("[]")
    # Set mtime to 25 hours ago
    old_time = time.time() - (_CACHE_TTL_SECONDS + 3600)
    os.utime(cache_file, (old_time, old_time))
    assert not _cache_is_valid(cache_file)


def test_save_and_load_cache_roundtrip(tmp_path):
    """Saving and loading a cache must preserve the data."""
    cache_file = tmp_path / "cache.json"
    data = _mock_commit_data(5)
    _save_cache(cache_file, data)
    loaded = _load_cache(cache_file)
    assert loaded is not None
    assert len(loaded) == 5
    assert loaded[0]["sha"] == "abc0000"
    assert loaded[4]["message"] == "Commit 4"


def test_load_cache_returns_none_for_invalid_json(tmp_path):
    """Corrupted JSON cache must return None."""
    cache_file = tmp_path / "cache.json"
    cache_file.write_text("{invalid json")
    assert _load_cache(cache_file) is None


def test_load_cache_returns_none_for_wrong_format(tmp_path):
    """Cache with wrong data type must return None."""
    cache_file = tmp_path / "cache.json"
    cache_file.write_text('"not a list"')
    assert _load_cache(cache_file) is None


def test_walk_commits_writes_cache_on_first_call(tmp_path, monkeypatch):
    """First call to walk_commits must write a cache file."""
    # Point cache dir to tmp_path
    monkeypatch.setattr("backend.features.repo_ingestion.commit_walker._CACHE_DIR", tmp_path)

    mock_data = _mock_commit_data(3)

    # Mock the uncached walk
    def mock_walk(repo_path, limit):
        yield from mock_data

    with patch(
        "backend.features.repo_ingestion.commit_walker._walk_commits_uncached",
        side_effect=mock_walk,
    ):
        result = list(walk_commits(tmp_path / "fake_repo", 150))

    assert len(result) == 3
    # Cache file must exist
    cpath = _cache_path(tmp_path / "fake_repo", 150)
    # _cache_path uses _CACHE_DIR which we patched, so recompute
    import hashlib

    key_str = f"{(tmp_path / 'fake_repo').resolve()}:150"
    key_hash = hashlib.sha256(key_str.encode()).hexdigest()[:16]
    expected_path = tmp_path / f"commits_{key_hash}.json"
    assert expected_path.exists()

    # Verify cache content
    with open(expected_path) as f:
        cached = json.load(f)
    assert len(cached) == 3
    assert cached[0]["sha"] == "abc0000"


def test_walk_commits_loads_from_cache_on_second_call(tmp_path, monkeypatch):
    """Second call within TTL must load from cache, not re-walk."""
    monkeypatch.setattr("backend.features.repo_ingestion.commit_walker._CACHE_DIR", tmp_path)

    mock_data = _mock_commit_data(3)

    walk_call_count = [0]

    def mock_walk(repo_path, limit):
        walk_call_count[0] += 1
        yield from mock_data

    with patch(
        "backend.features.repo_ingestion.commit_walker._walk_commits_uncached",
        side_effect=mock_walk,
    ):
        # First call — should walk and cache
        result1 = list(walk_commits(tmp_path / "fake_repo", 150))
        assert walk_call_count[0] == 1
        assert len(result1) == 3

        # Second call — should load from cache, NOT walk
        result2 = list(walk_commits(tmp_path / "fake_repo", 150))
        assert walk_call_count[0] == 1  # Still 1, not 2
        assert len(result2) == 3
        assert result2[0]["sha"] == result1[0]["sha"]


def test_walk_commits_rewalks_when_cache_expired(tmp_path, monkeypatch):
    """Expired cache must trigger a re-walk."""
    monkeypatch.setattr("backend.features.repo_ingestion.commit_walker._CACHE_DIR", tmp_path)

    mock_data = _mock_commit_data(2)

    walk_call_count = [0]

    def mock_walk(repo_path, limit):
        walk_call_count[0] += 1
        yield from mock_data

    with patch(
        "backend.features.repo_ingestion.commit_walker._walk_commits_uncached",
        side_effect=mock_walk,
    ):
        # First call — writes cache
        list(walk_commits(tmp_path / "fake_repo", 150))
        assert walk_call_count[0] == 1

        # Expire the cache by setting mtime to past TTL
        import hashlib

        key_str = f"{(tmp_path / 'fake_repo').resolve()}:150"
        key_hash = hashlib.sha256(key_str.encode()).hexdigest()[:16]
        cache_file = tmp_path / f"commits_{key_hash}.json"
        old_time = time.time() - (_CACHE_TTL_SECONDS + 3600)
        os.utime(cache_file, (old_time, old_time))

        # Second call — cache expired, should re-walk
        list(walk_commits(tmp_path / "fake_repo", 150))
        assert walk_call_count[0] == 2  # Re-walk happened


def test_walk_commits_different_limits_use_separate_caches(tmp_path, monkeypatch):
    """Different limits must not share cache files."""
    monkeypatch.setattr("backend.features.repo_ingestion.commit_walker._CACHE_DIR", tmp_path)

    walk_call_count = [0]

    def mock_walk(repo_path, limit):
        walk_call_count[0] += 1
        yield from _mock_commit_data(limit)

    with patch(
        "backend.features.repo_ingestion.commit_walker._walk_commits_uncached",
        side_effect=mock_walk,
    ):
        # Walk with limit=50
        list(walk_commits(tmp_path / "fake_repo", 50))
        assert walk_call_count[0] == 1

        # Walk with limit=100 — different limit, different cache, must re-walk
        list(walk_commits(tmp_path / "fake_repo", 100))
        assert walk_call_count[0] == 2

        # Walk with limit=50 again — cache hit, no re-walk
        list(walk_commits(tmp_path / "fake_repo", 50))
        assert walk_call_count[0] == 2  # Still 2
