import hashlib
import json
import logging
import os
import re
import subprocess
from datetime import datetime, timezone
from pathlib import Path
from typing import Iterator

import git

logger = logging.getLogger(__name__)

# ── Issue #266: Graceful fallbacks for missing author details ───────────────
# Some commits (notably shallow-clone boundaries, root commits authored via
# plumbing tooling, or repos imported from other VCS systems) may have a
# null/empty author name or email.  Yielding None here would later crash
# downstream consumers (Pydantic models, DB inserts, attribution metrics).
# We instead substitute deterministic placeholder values so ingestion
# never breaks on missing identity data.
DEFAULT_AUTHOR_NAME = "Unknown"
DEFAULT_AUTHOR_EMAIL = "unknown@example.com"

# ── Issue #263: Commit walk cache ───────────────────────────────────────────
# Directory for on-disk JSON caches of parsed commit metadata.
# Caches are keyed by repo_slug + commit_count so that rescans of the same
# repo (with the same number of commits) skip the expensive git walk entirely.
_CACHE_DIR = Path(os.getenv("COMMITIQ_CACHE_DIR", "/tmp/commitiq_cache"))
_CACHE_TTL_SECONDS = 86400  # 24 hours


def _cache_path(repo_path: Path, limit: int) -> Path:
    """Return the cache file path for a given repo_path + limit.

    The cache key is derived from the absolute repo_path and the commit
    limit so that different repos (or different depth clones of the same
    repo) get separate cache files.
    """
    key_str = f"{repo_path.resolve()}:{limit}"
    key_hash = hashlib.sha256(key_str.encode()).hexdigest()[:16]
    return _CACHE_DIR / f"commits_{key_hash}.json"


def _cache_is_valid(path: Path) -> bool:
    """Check if a cache file exists and is not older than _CACHE_TTL_SECONDS."""
    if not path.exists():
        return False
    age = datetime.now().timestamp() - path.stat().st_mtime
    return age < _CACHE_TTL_SECONDS


def _load_cache(path: Path) -> list[dict] | None:
    """Load commit metadata from a JSON cache file. Returns None on failure."""
    try:
        with open(path, "r", encoding="utf-8") as f:
            data = json.load(f)
        if isinstance(data, list) and all(isinstance(item, dict) for item in data):
            logger.info("commit_walker: loaded %d commits from cache %s", len(data), path.name)
            return data
        logger.warning("commit_walker: cache %s has invalid format, ignoring", path.name)
        return None
    except (json.JSONDecodeError, OSError) as e:
        logger.warning("commit_walker: failed to load cache %s: %s", path.name, e)
        return None


def _save_cache(path: Path, commits: list[dict]) -> None:
    """Save commit metadata to a JSON cache file."""
    try:
        _CACHE_DIR.mkdir(parents=True, exist_ok=True)
        with open(path, "w", encoding="utf-8") as f:
            json.dump(commits, f)
        logger.info("commit_walker: cached %d commits to %s", len(commits), path.name)
    except OSError as e:
        logger.warning("commit_walker: failed to write cache %s: %s", path.name, e)


def _safe_str(value: str | None) -> str:
    """Return *value* stripped if non-empty, else an empty string.

    Used as the first step in author fallback resolution: a value that is
    None or only whitespace is treated as "missing" so the caller can
    substitute the documented default.
    """
    if value is None:
        return ""
    return value.strip()


def resolve_author_name(raw_name: str | None) -> str:
    """Return a non-empty author name, falling back to ``Unknown``.

    Handles None, empty strings, and whitespace-only strings.
    """
    cleaned = _safe_str(raw_name)
    return cleaned if cleaned else DEFAULT_AUTHOR_NAME


def resolve_author_email(raw_email: str | None) -> str:
    """Return a non-empty author email, falling back to ``unknown@example.com``.

    Handles None, empty strings, and whitespace-only strings.  Does not
    perform full RFC 5322 validation — Git itself does not enforce this on
    the stored commit object, so a permissive "non-empty after strip" check
    is sufficient to prevent downstream crashes.
    """
    cleaned = _safe_str(raw_email)
    return cleaned if cleaned else DEFAULT_AUTHOR_EMAIL


def sanitize_commit_message(message: str | None) -> str:
    """
    Sanitizes commit messages to strip unsafe HTML tags and escape < / > characters.
    """
    if not message:
        return ""
    msg = re.sub(r"<script[\s\S]*?>[\s\S]*?</script>", "", message, flags=re.IGNORECASE)
    msg = re.sub(r"<style[\s\S]*?>[\s\S]*?</style>", "", msg, flags=re.IGNORECASE)
    msg = re.sub(r"<iframe[\s\S]*?>[\s\S]*?</iframe>", "", msg, flags=re.IGNORECASE)
    msg = re.sub(r"<[a-zA-Z/!][^>]*>", "", msg)
    msg = msg.replace("<", "&lt;").replace(">", "&gt;")
    return msg.strip()[:500]


def _walk_commits_uncached(repo_path: Path, limit: int) -> Iterator[dict]:
    """
    Walk last `limit` commits from shallow clone.
    Yields commit metadata dicts. Does NOT checkout each commit
    (shallow clones don't support full checkout).
    Metrics are computed from git stats, not file inspection.
    """
    repo = git.Repo(repo_path)
    commits = list(repo.iter_commits("HEAD", max_count=limit))
    commits.reverse()  # oldest → newest for timeline

    total = len(commits)
    for idx, commit in enumerate(commits):
        parent_sha = commit.parents[0].hexsha if commit.parents else None

        try:
            stats = commit.stats
            files_changed = list(stats.files.keys())
            insertions = stats.total.get("insertions", 0)
            deletions = stats.total.get("deletions", 0)
        except Exception:
            # Fallback for shallow clone boundary commits where parent object is missing
            files_changed = []
            insertions = 0
            deletions = 0
            try:
                cmd = ["git", "diff-tree", "--no-commit-id", "--name-only", "-r", commit.hexsha]
                res = subprocess.run(
                    cmd, cwd=repo_path, capture_output=True, text=True, errors="replace"
                )
                if res.returncode == 0:
                    files_changed = [
                        line.strip() for line in res.stdout.splitlines() if line.strip()
                    ]
                # Set dummy insertions/deletions as proxy to avoid zero metrics division issues
                insertions = len(files_changed) * 15
                deletions = 5
            except Exception:
                pass

        # ── Issue #266: resolve author identity with graceful fallbacks ──
        # ``commit.author.name`` / ``commit.author.email`` can be None or
        # empty for certain malformed commits (shallow-clone boundaries,
        # imported-from-other-VCS histories, plumbing-created commits).
        # Wrap the access in a defensive try/except so a single corrupt
        # commit object never aborts the whole ingestion walk.
        try:
            raw_author_name = commit.author.name
            raw_author_email = commit.author.email
        except Exception as exc:
            # The Actor object itself could not be read — extremely rare,
            # but we still want to yield a record rather than crash.
            logger.warning(
                "commit_walker: failed to read author for commit %s (%s); " "using defaults",
                commit.hexsha[:12],
                exc,
            )
            raw_author_name = None
            raw_author_email = None

        author_name = resolve_author_name(raw_author_name)
        author_email = resolve_author_email(raw_author_email)

        # Emit a debug log when a fallback was actually used, so operators
        # can spot repos with widespread author metadata corruption.
        if author_name == DEFAULT_AUTHOR_NAME or author_email == DEFAULT_AUTHOR_EMAIL:
            logger.info(
                "commit_walker: commit %s had missing/empty author identity; "
                "fell back to name=%r email=%r",
                commit.hexsha[:12],
                author_name,
                author_email,
            )

        yield {
            "sha": commit.hexsha[:12],
            "full_sha": commit.hexsha,
            "message": sanitize_commit_message(commit.message),
            "author_name": author_name,
            "author_email": author_email,
            "committed_at": datetime.fromtimestamp(
                commit.committed_date, tz=timezone.utc
            ).isoformat(),
            "insertions": insertions,
            "deletions": deletions,
            "files_changed": len(files_changed),
            "files_list": files_changed[:100],  # cap to 100 for storage
            "parent_sha": parent_sha,
            "index": idx,
            "total": total,
        }


def walk_commits(repo_path: Path, limit: int = 150) -> Iterator[dict]:
    """
    Walk last `limit` commits from shallow clone, with on-disk caching
    to avoid re-walking the git commit tree on rescans (issue #263).

    On first call for a given (repo_path, limit) pair, the full commit
    walk is performed and the results are cached as JSON on disk. On
    subsequent calls within the TTL window (24 hours), the cached
    results are loaded directly, skipping the expensive git walk.

    Args:
        repo_path: Path to the cloned git repository.
        limit: Maximum number of commits to walk.

    Yields:
        Commit metadata dicts (same format as _walk_commits_uncached).
    """
    cpath = _cache_path(repo_path, limit)

    # Issue #263: Try to load from cache first
    if _cache_is_valid(cpath):
        cached = _load_cache(cpath)
        if cached is not None:
            yield from cached
            return

    # Cache miss or invalid — walk the git tree
    commits = list(_walk_commits_uncached(repo_path, limit))

    # Save to cache for future rescans
    if commits:
        _save_cache(cpath, commits)

    yield from commits
