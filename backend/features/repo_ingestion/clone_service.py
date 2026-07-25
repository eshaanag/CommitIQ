import logging
import subprocess
from pathlib import Path
import shutil
from backend.config import REPO_STORAGE_PATH, GITHUB_TOKEN
import httpx
import re

logger = logging.getLogger(__name__)


def _redact_secret(value: str) -> str:
    if GITHUB_TOKEN:
        value = value.replace(GITHUB_TOKEN, "[REDACTED_GITHUB_TOKEN]")
    return re.sub(r"https://[^@\s]+@github\.com/", "https://[REDACTED]@github.com/", value)


def _is_valid_github_name(value: str) -> bool:
    if value in {".", ".."}:
        return False
    return bool(re.fullmatch(r"[\w.-]+", value))


def parse_github_url(url: str) -> tuple[str, str]:
    """Parse GitHub URL or shorthand to ('owner', 'repo')."""
    s = url.strip()
    
    while s.endswith('/') or s.endswith('.git'):
        if s.endswith('/'):
            s = s[:-1]
        elif s.endswith('.git'):
            s = s[:-4]
            
    explicit_host = False

    if s.startswith('https://'):
        s = s[len('https://'):]
        explicit_host = True
    elif s.startswith('http://'):
        s = s[len('http://'):]
        explicit_host = True
        
    if s.startswith('www.'):
        s = s[4:]
        
    if s.startswith('github.com/'):
        s = s[len('github.com/'):]
    elif explicit_host:
        raise ValueError(f"Cannot parse GitHub URL: {url}. Expected a github.com repository URL.")
        
    parts = s.split('/')
    if len(parts) < 2 or not parts[0] or not parts[1]:
        raise ValueError(f"Cannot parse GitHub URL: {url}. Expected format 'owner/repo' or 'github.com/owner/repo'.")
        
    owner = parts[0]
    repo = parts[1]
    
    # Validate owner/repo format to avoid invalid directory names or bad parameters
    if not _is_valid_github_name(owner) or not _is_valid_github_name(repo):
        raise ValueError(f"Invalid owner or repository name in URL: {url}")
        
    return owner, repo


def make_repo_slug(owner: str, repo: str) -> str:
    slug = f"{owner}-{repo}".lower()
    slug = re.sub(r'[^a-z0-9\-]', '-', slug)
    return slug


def get_clone_path(repo_url: str) -> Path:
    owner, repo = parse_github_url(repo_url)
    slug = make_repo_slug(owner, repo)
    return REPO_STORAGE_PATH / slug


def clone_repo(repo_url: str, repo_id: int, max_commits: int = 150, pat: str | None = None) -> Path:
    """Shallow clone to local disk. Returns clone path."""
    target = get_clone_path(repo_url)
    
    if pat:
        auth_url = repo_url.replace(
            'https://github.com/',
            f'https://{pat}@github.com/'
        )
    elif GITHUB_TOKEN:
        # This only speeds up clone for large repos — not required for public
        auth_url = repo_url.replace(
            'https://github.com/',
            f'https://{GITHUB_TOKEN}@github.com/'
        )
    else:
        auth_url = repo_url

    if target.exists():
        # Cache hit: Fetch latest and reset
        result = subprocess.run(
            ["git", "remote", "set-url", "origin", auth_url],
            cwd=target,
            capture_output=True,
            text=True,
            timeout=30,
        )
        if result.returncode == 0:
            result = subprocess.run(
                ["git", "fetch", "--depth", str(max_commits), "origin"],
                cwd=target,
                capture_output=True,
                text=True,
                timeout=300,
            )
        if result.returncode == 0:
            result = subprocess.run(
                ["git", "reset", "--hard", "origin/HEAD"],
                cwd=target,
                capture_output=True,
                text=True,
                timeout=30,
            )
        if result.returncode != 0:
            # Fallback to wipe and re-clone
            if not cleanup_repo(repo_url):
                raise RuntimeError(f"Could not clean existing clone directory for {repo_url}")
            target.mkdir(parents=True, exist_ok=True)
            result = subprocess.run(
                ["git", "clone", "--depth", str(max_commits), "--single-branch", auth_url, str(target)],
                capture_output=True,
                text=True,
                timeout=300,
            )
    else:
        target.mkdir(parents=True, exist_ok=True)
        result = subprocess.run(
            ["git", "clone", "--depth", str(max_commits), "--single-branch", auth_url, str(target)],
            capture_output=True,
            text=True,
            timeout=300,
        )

    if result.returncode != 0:
        cleanup_repo(repo_url)
        raise RuntimeError(f"git clone failed: {_redact_secret(result.stderr)[:500]}")

    return target


def count_available_commits(repo_path: Path) -> int:
    result = subprocess.run(
        ["git", "rev-list", "--count", "HEAD"],
        cwd=repo_path,
        capture_output=True,
        text=True,
        timeout=30,
    )
    if result.returncode != 0:
        return 0
    try:
        return int(result.stdout.strip())
    except ValueError:
        return 0


def cleanup_repo(repo_identifier: str | int) -> bool:
    """Delete cloned repo. Now optionally skipped to cache."""
    if isinstance(repo_identifier, int):
        target = REPO_STORAGE_PATH / str(repo_identifier)
    else:
        target = get_clone_path(repo_identifier)
        
    if not target.exists():
        return True
    try:
        shutil.rmtree(target)
        return True
    except OSError as exc:
        logger.warning(
            "Could not clean cloned repo directory",
            extra={"path": str(target), "error": str(exc)},
        )
        return False


async def fetch_github_metadata(owner: str, repo: str, pat: str | None = None) -> dict:
    """Optional metadata fetch — cosmetic only, skipped on rate limit."""
    headers = {"Accept": "application/vnd.github+json"}
    if pat:
        headers["Authorization"] = f"token {pat}"
    elif GITHUB_TOKEN:
        headers["Authorization"] = f"token {GITHUB_TOKEN}"

    try:
        async with httpx.AsyncClient(timeout=5) as client:
            r = await client.get(
                f"https://api.github.com/repos/{owner}/{repo}",
                headers=headers
            )
            if r.status_code == 200:
                data = r.json()
                return {
                    "github_stars": data.get("stargazers_count"),
                    "github_language": data.get("language"),
                    "github_description": data.get("description", "")[:300],
                }
    except Exception:
        pass  # Metadata is cosmetic — never fail ingestion for this
    return {"github_stars": None, "github_language": None, "github_description": None}
