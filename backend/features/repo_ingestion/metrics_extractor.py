import os
import subprocess
from pathlib import Path

import lizard
from radon.complexity import cc_visit
from radon.raw import analyze as radon_raw_analyze

from backend.config import ENABLE_SEMANTIC_ANALYSIS
from backend.features.repo_ingestion.semantic_analyzer import (
    compute_repo_semantic_health,
    compute_semantic_drift,
)

SUPPORTED_EXTENSIONS = {".py", ".js", ".ts", ".jsx", ".tsx", ".java", ".go", ".cpp", ".c"}
SEMANTIC_EXTENSIONS = {".py", ".js", ".ts", ".jsx", ".tsx"}


def _empty_metric() -> dict:
    return {"avg_complexity": 0.0, "max_complexity": 0.0, "loc": 0}


def _is_supported(path: str) -> bool:
    return Path(path).suffix.lower() in SUPPORTED_EXTENSIONS


def extract_file_metrics_from_path(file_path: str) -> dict:
    """Run static analysis on a file at its current checked-out revision."""
    path = Path(file_path)
    if not path.exists() or not path.is_file() or not _is_supported(str(path)):
        return _empty_metric()

    try:
        if path.suffix.lower() == ".py":
            source = path.read_text(encoding="utf-8", errors="ignore")
            blocks = cc_visit(source)
            raw = radon_raw_analyze(source)
            complexities = [block.complexity for block in blocks]
            if complexities:
                return {
                    "avg_complexity": round(sum(complexities) / len(complexities), 2),
                    "max_complexity": round(max(complexities), 2),
                    "loc": int(raw.loc),
                }
            return {"avg_complexity": 0.0, "max_complexity": 0.0, "loc": int(raw.loc)}

        result = lizard.analyze_file(str(path))
        if not result.function_list:
            return {"avg_complexity": 0.0, "max_complexity": 0.0, "loc": int(result.nloc)}
        values = [function.cyclomatic_complexity for function in result.function_list]
        return {
            "avg_complexity": round(sum(values) / len(values), 2),
            "max_complexity": round(max(values), 2),
            "loc": int(result.nloc),
        }
    except Exception:
        return _empty_metric()


def checkout_commit(repo_path: Path, full_sha: str) -> None:
    result = subprocess.run(
        ["git", "checkout", "--force", full_sha],
        cwd=repo_path,
        capture_output=True,
        text=True,
        errors="replace",
        timeout=90,
    )
    if result.returncode != 0:
        raise RuntimeError(f"git checkout failed for {full_sha[:12]}: {result.stderr[:300]}")


def _file_content_at_commit(repo_path: Path, full_sha: str | None, rel_path: str) -> str:
    if not full_sha:
        return ""
    result = subprocess.run(
        ["git", "show", f"{full_sha}:{rel_path}"],
        cwd=repo_path,
        capture_output=True,
        text=True,
        errors="replace",
        timeout=30,
    )
    if result.returncode != 0:
        return ""
    return result.stdout


def _semantic_drift_for_file(repo_path: Path, commit_data: dict, rel_path: str) -> dict:
    if not ENABLE_SEMANTIC_ANALYSIS or Path(rel_path).suffix.lower() not in SEMANTIC_EXTENSIONS:
        return {
            "semantic_drift_score": 0.0,
            "method": "disabled" if not ENABLE_SEMANTIC_ANALYSIS else "unsupported",
        }

    try:
        before = _file_content_at_commit(repo_path, commit_data.get("parent_sha"), rel_path)
        after = _file_content_at_commit(repo_path, commit_data["full_sha"], rel_path)
        if not before and not after:
            return {"semantic_drift_score": 0.0, "method": "none"}
        return compute_semantic_drift(before, after)
    except Exception:
        return {"semantic_drift_score": 0.0, "method": "error"}


def extract_commit_metrics(
    repo_path: Path,
    commit_data: dict,
    max_files: int = 100,
) -> dict[str, dict]:
    """
    Checkout a commit and analyze the files changed by that commit.
    Returns {relative_path: {avg_complexity, max_complexity, loc}}.
    """
    checkout_commit(repo_path, commit_data["full_sha"])
    metrics: dict[str, dict] = {}

    files = [
        fpath for fpath in commit_data.get("files_list", [])
        if _is_supported(fpath)
    ][:max_files]

    for rel_path in files:
        full_path = repo_path / rel_path
        if full_path.exists():
            file_metrics = extract_file_metrics_from_path(str(full_path))
            drift = _semantic_drift_for_file(repo_path, commit_data, rel_path)
            file_metrics["semantic_drift_score"] = drift.get("semantic_drift_score", 0.0)
            file_metrics["drift_method"] = drift.get("method", "none")
            metrics[rel_path] = file_metrics

    drift_results = [
        {
            "semantic_drift_score": item.get("semantic_drift_score", 0.0),
            "method": item.get("drift_method", "none"),
        }
        for item in metrics.values()
        if item.get("drift_method") not in {None, "unsupported", "disabled"}
    ]
    metrics["__semantic_health__"] = compute_repo_semantic_health(drift_results)

    return metrics


def scan_repo_head(repo_path: Path, max_files: int = 200) -> dict[str, dict]:
    """Analyze supported files in the current checkout."""
    file_metrics: dict[str, dict] = {}
    count = 0

    for root, dirs, files in os.walk(repo_path):
        dirs[:] = [
            d for d in dirs
            if d not in {".git", "node_modules", "__pycache__", "dist", "build"}
        ]
        for fname in files:
            if count >= max_files:
                return file_metrics
            rel_path = os.path.relpath(os.path.join(root, fname), repo_path)
            if _is_supported(rel_path):
                file_metrics[rel_path] = extract_file_metrics_from_path(
                    str(repo_path / rel_path)
                )
                count += 1

    return file_metrics

