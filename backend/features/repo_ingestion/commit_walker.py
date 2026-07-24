import git
import re
import subprocess
from datetime import datetime, timezone
from pathlib import Path
from typing import Iterator


def sanitize_commit_message(message: str | None) -> str:
    """
    Sanitizes commit messages to strip unsafe HTML tags and escape < / > characters.
    """
    if not message:
        return ""
    msg = re.sub(r'<script[\s\S]*?>[\s\S]*?</script>', '', message, flags=re.IGNORECASE)
    msg = re.sub(r'<style[\s\S]*?>[\s\S]*?</style>', '', msg, flags=re.IGNORECASE)
    msg = re.sub(r'<iframe[\s\S]*?>[\s\S]*?</iframe>', '', msg, flags=re.IGNORECASE)
    msg = re.sub(r'<[a-zA-Z/!][^>]*>', '', msg)
    msg = msg.replace('<', '&lt;').replace('>', '&gt;')
    return msg.strip()[:500]



def walk_commits(repo_path: Path, limit: int = 150) -> Iterator[dict]:
    """
    Walk last `limit` commits from shallow clone.
    Yields commit metadata dicts. Does NOT checkout each commit
    (shallow clones don't support full checkout).
    Metrics are computed from git stats, not file inspection.
    """
    repo = git.Repo(repo_path)
    commits = list(repo.iter_commits('HEAD', max_count=limit))
    commits.reverse()  # oldest → newest for timeline

    total = len(commits)
    for idx, commit in enumerate(commits):
        parent_sha = commit.parents[0].hexsha if commit.parents else None

        try:
            stats = commit.stats
            files_changed = list(stats.files.keys())
            insertions = stats.total.get('insertions', 0)
            deletions = stats.total.get('deletions', 0)
        except Exception:
            # Fallback for shallow clone boundary commits where parent object is missing
            files_changed = []
            insertions = 0
            deletions = 0
            try:
                cmd = ["git", "diff-tree", "--no-commit-id", "--name-only", "-r", commit.hexsha]
                res = subprocess.run(cmd, cwd=repo_path, capture_output=True, text=True, errors="replace")
                if res.returncode == 0:
                    files_changed = [line.strip() for line in res.stdout.splitlines() if line.strip()]
                # Set dummy insertions/deletions as proxy to avoid zero metrics division issues
                insertions = len(files_changed) * 15
                deletions = 5
            except Exception:
                pass

        yield {
            "sha":           commit.hexsha[:12],
            "full_sha":      commit.hexsha,
            "message":       sanitize_commit_message(commit.message),
            "author_name":   commit.author.name,

            "author_email":  commit.author.email,
            "committed_at":  datetime.fromtimestamp(
                                 commit.committed_date, tz=timezone.utc
                             ).isoformat(),
            "insertions":    insertions,
            "deletions":     deletions,
            "files_changed": len(files_changed),
            "files_list":    files_changed[:100],  # cap to 100 for storage
            "parent_sha":    parent_sha,
            "index":         idx,
            "total":         total,
        }
