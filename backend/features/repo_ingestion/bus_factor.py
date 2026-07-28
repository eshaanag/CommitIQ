import subprocess
from collections import defaultdict
from pathlib import Path


EXCLUDE_PATTERNS = (
    ".github/",
    "ISSUE_TEMPLATE",
    "PULL_REQUEST_TEMPLATE",
    ".md",
    "README",
    "LICENSE",
    "CHANGELOG",
    ".txt",
    ".json",
    ".yml",
    ".yaml",
)

CODE_EXTENSIONS = {
    ".c",
    ".cc",
    ".cpp",
    ".cs",
    ".go",
    ".java",
    ".js",
    ".jsx",
    ".kt",
    ".mjs",
    ".php",
    ".py",
    ".rb",
    ".rs",
    ".swift",
    ".ts",
    ".tsx",
}


def is_code_file(path: str) -> bool:
    normalized = path.replace("\\", "/")

    file_name = Path(normalized).name
    upper_name = normalized.upper()
    if ".github/" in normalized:
        return False

    if upper_name in {
        "ISSUE_TEMPLATE",
        "PULL_REQUEST_TEMPLATE",
    }:
        return False 

    if upper_name == "README":
        return False

    if upper_name == "LICENSE":
        return False 

    if upper_name.startswith("CHANGELOG"):
        return False

    if Path(file_name).suffix.lower() in {
        ".md",
        ".txt",
        ".json",
        ".yml",
        ".yaml",
    }:
        return False 

    return Path(file_name).suffix.lower() in CODE_EXTENSIONS


def _risk_level(contributor_count: int, top_pct: float) -> str:
    if contributor_count <= 1:
        return "critical"
    if contributor_count == 2 or top_pct >= 0.80:
        return "high"
    if contributor_count <= 4 or top_pct >= 0.60:
        return "medium"
    return "low"


def _blame_authors(repo_path: Path, file_path: str) -> dict[tuple[str, str | None], int]:
    result = subprocess.run(
        ["git", "blame", "--line-porcelain", "--", file_path],
        cwd=repo_path,
        capture_output=True,
        text=True,
        errors="replace",
        timeout=60,
    )
    if result.returncode != 0:
        return {}

    counts: dict[tuple[str, str | None], int] = defaultdict(int)
    current_author = "unknown"
    current_email: str | None = None

    for line in result.stdout.splitlines():
        if line.startswith("author "):
            current_author = line.removeprefix("author ").strip() or "unknown"
        elif line.startswith("author-mail "):
            current_email = line.removeprefix("author-mail ").strip("<> ") or None
        elif line.startswith("\t"):
            counts[(current_author, current_email)] += 1

    return counts


def compute_bus_factor_from_history(
    commit_history: list[dict],
    repo_path: Path,
) -> list[dict]:
    """
    Compute per-module bus factor using git blame on files touched in the analyzed history.
    Falls back to commit authorship counts if a file no longer exists at HEAD.
    """
    touched_files: dict[str, str | None] = {}
    fallback_counts: dict[str, dict[tuple[str, str | None], int]] = defaultdict(lambda: defaultdict(int))

    for commit in commit_history:
        author = commit.get("author_name") or "unknown"
        email = commit.get("author_email")
        for fpath in commit.get("files_list", []):
            if not is_code_file(fpath):
                continue
            touched_files[fpath] = commit.get("sha")
            fallback_counts[fpath][(author, email)] += 1

    entries = []
    for module_path in sorted(touched_files):
        author_counts = _blame_authors(repo_path, module_path)
        if not author_counts:
            author_counts = fallback_counts[module_path]

        total = sum(author_counts.values())
        if total == 0:
            continue

        ranked = sorted(author_counts.items(), key=lambda item: item[1], reverse=True)
        (top_author, top_email), top_count = ranked[0]
        top_pct = top_count / total
        contributor_count = len(ranked)

        entries.append({
            "module_path": module_path,
            "contributor_count": contributor_count,
            "top_contributor": top_author,
            "top_contributor_email": top_email,
            "top_contributor_pct": round(top_pct, 4),
            "total_commits_to_module": sum(fallback_counts[module_path].values()),
            "risk_level": _risk_level(contributor_count, top_pct),
            "last_commit_sha": touched_files[module_path],
        })

    return entries
