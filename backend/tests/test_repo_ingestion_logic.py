import json

import pytest


@pytest.fixture()
def anyio_backend():
    return "asyncio"


from pydantic import ValidationError

from backend.config import MAX_COMMITS
from backend.features.repo_ingestion import semantic_analyzer
from backend.features.repo_ingestion.bus_factor import _blame_authors, is_code_file
from backend.features.repo_ingestion.clone_service import (
    cleanup_repo,
    get_clone_path,
    make_repo_slug,
    parse_github_url,
    sanitize_repo_url,
)
from backend.features.repo_ingestion.graph_builder import (
    build_cochange_edges,
    extract_go_imports,
    extract_js_imports,
    extract_python_imports,
    get_top_files_by_frequency,
    resolve_import_to_file,
)
from backend.features.repo_ingestion.health_scorer import compute_full_snapshot
from backend.shared.schemas import IngestRequest


@pytest.mark.parametrize(
    ("raw", "expected"),
    [
        ("https://token@github.com/owner/repo", "https://github.com/owner/repo"),
        ("https://user:token@github.com/owner/repo.git", "https://github.com/owner/repo.git"),
        ("http://ghp_1234567890@github.com/owner/repo", "http://github.com/owner/repo"),
        ("token@github.com/owner/repo", "github.com/owner/repo"),
        ("https://github.com/owner/repo", "https://github.com/owner/repo"),
        ("owner/repo", "owner/repo"),
        ("", ""),
    ],
)
def test_sanitize_repo_url_strips_token_credentials(raw, expected):
    assert sanitize_repo_url(raw) == expected


@pytest.mark.parametrize(
    ("raw", "expected"),
    [
        ("owner/repo", ("owner", "repo")),
        ("https://github.com/owner/repo", ("owner", "repo")),
        ("http://github.com/owner/repo.git/", ("owner", "repo")),
        ("www.github.com/owner/repo", ("owner", "repo")),
        ("https://ghp_token123@github.com/owner/repo", ("owner", "repo")),
        ("https://user:secret@github.com/owner/repo.git", ("owner", "repo")),
    ],
)
def test_parse_github_url_accepts_supported_forms(raw, expected):
    assert parse_github_url(raw) == expected


@pytest.mark.parametrize(
    "raw",
    [
        "",
        "github.com/owner",
        "https://gitlab.com/owner/repo",
        "owner/repo;rm",
        "owner/../repo",
    ],
)
def test_parse_github_url_rejects_invalid_or_unsafe_forms(raw):
    with pytest.raises(ValueError):
        parse_github_url(raw)


def test_make_repo_slug_is_stable_and_filesystem_safe():
    assert make_repo_slug("Open-AI", "Repo.Name") == "open-ai-repo-name"


def test_cleanup_repo_deletes_clone_directory(monkeypatch, tmp_path):
    monkeypatch.setattr("backend.features.repo_ingestion.clone_service.REPO_STORAGE_PATH", tmp_path)
    clone_path = get_clone_path(42)
    clone_path.mkdir()
    (clone_path / "README.md").write_text("temporary clone", encoding="utf-8")

    assert cleanup_repo(42) is True
    assert not clone_path.exists()


def test_cleanup_repo_does_not_mask_cleanup_failures(monkeypatch, tmp_path):
    monkeypatch.setattr("backend.features.repo_ingestion.clone_service.REPO_STORAGE_PATH", tmp_path)
    clone_path = get_clone_path(42)
    clone_path.mkdir()

    def fail_rmtree(path, **kwargs):
        raise OSError("permission denied")

    monkeypatch.setattr("backend.features.repo_ingestion.clone_service.shutil.rmtree", fail_rmtree)

    assert cleanup_repo(42) is False


def test_ingest_request_normalizes_shorthand_and_http_github_url():
    assert IngestRequest(repo_url="owner/repo").repo_url == "https://github.com/owner/repo"
    assert (
        IngestRequest(repo_url="http://github.com/owner/repo").repo_url
        == "https://github.com/owner/repo"
    )


def test_ingest_request_rejects_non_github_urls():
    for raw in (
        "https://example.com/owner/repo",
        "https://github.com/owner/../repo",
        "owner/../repo",
        "https://github.com/owner/repo/tree/main",
    ):
        with pytest.raises(ValidationError):
            IngestRequest(repo_url=raw)


def test_ingest_request_rejects_commit_limits_above_configured_cap():
    with pytest.raises(ValidationError):
        IngestRequest(repo_url="owner/repo", max_commits=MAX_COMMITS + 1)


def test_import_extractors_and_resolver_cover_common_python_and_ts_patterns():
    python_imports = extract_python_imports(
        "import os\nfrom package.module import Thing\nfrom .local import helper\n"
    )
    assert "os" in python_imports
    assert "package.module" in python_imports


def test_extract_python_imports_preserves_relative_import_levels():
    source = "\n".join(
        [
            "from .database import get_db",
            "from ..shared.utils import helper",
            "from ...config import settings",
            "from . import models",
            "from .. import api",
            "import os",
            "import pathlib",
            "from collections import defaultdict",
        ]
    )
    python_imports = extract_python_imports(source)
    assert ".database" in python_imports
    assert "..shared.utils" in python_imports
    assert "...config" in python_imports
    assert "." in python_imports
    assert ".." in python_imports
    assert "os" in python_imports
    assert "pathlib" in python_imports
    assert "collections" in python_imports

    js_imports = extract_js_imports("""
        import type { User } from './types'
        export { Button } from './Button'
        import './polyfill'
        const mod = require('../lib/mod')
        const lazy = import('./lazy')
        """)
    assert js_imports == ["./types", "./Button", "./polyfill", "../lib/mod", "./lazy"]

    files = [
        "src/App.tsx",
        "src/types.ts",
        "src/Button/index.ts",
        "src/lazy.ts",
        "lib/mod.ts",
    ]
    assert resolve_import_to_file("./types", "src/App.tsx", files) == "src/types.ts"
    assert resolve_import_to_file("./Button", "src/App.tsx", files) == "src/Button/index.ts"
    assert resolve_import_to_file("../lib/mod", "src/App.tsx", files) == "lib/mod.ts"


def test_cochange_edges_count_unique_file_pairs_per_commit():
    history = [
        {"files_list": ["src/a.py", "src/b.py", "src/a.py", ""]},
        {"files_list": ["src/b.py", "src/a.py", "src/c.py"]},
        {"files_list": ["src/a.py", "src/b.py"]},
        {"files_list": ["src/a.py", "src/c.py"]},
    ]

    edges = build_cochange_edges(history, min_cooccurrence=2)

    assert edges == [
        {
            "source_file": "src/a.py",
            "target_file": "src/b.py",
            "edge_type": "co_change",
            "weight": 3,
            "cochange_count": 3,
        },
        {
            "source_file": "src/a.py",
            "target_file": "src/c.py",
            "edge_type": "co_change",
            "weight": 2,
            "cochange_count": 2,
        },
    ]
    assert not any(edge["source_file"] == edge["target_file"] for edge in edges)


def test_top_files_by_frequency_counts_repeated_history_changes():
    history = [
        {"files_list": ["src/a.py", "src/b.py"]},
        {"files_list": ["src/a.py"]},
        {"files_list": ["src/c.py", "src/b.py"]},
    ]

    assert get_top_files_by_frequency(history, top_n=2) == ["src/a.py", "src/b.py"]


def test_bus_factor_file_filter_keeps_code_and_ignores_docs_configs():
    assert is_code_file("src/api/router.py")
    assert is_code_file("frontend/src/App.tsx")
    assert not is_code_file("README.md")
    assert not is_code_file(".github/workflows/ci.yml")
    assert not is_code_file("package.json")


def test_blame_authors_handles_timeout(monkeypatch, tmp_path):
    import subprocess

    def mock_run(*args, **kwargs):
        raise subprocess.TimeoutExpired(cmd=args[0], timeout=60)

    monkeypatch.setattr("backend.features.repo_ingestion.bus_factor.subprocess.run", mock_run)

    result = _blame_authors(tmp_path, "some_file.py")
    assert result == {}


def test_semantic_drift_uses_fallback_without_graphcodebert(monkeypatch):
    def fail_if_model_loads():
        raise AssertionError("GraphCodeBERT should not load unless explicitly enabled")

    monkeypatch.setattr(semantic_analyzer, "ENABLE_SEMANTIC_ANALYSIS", True)
    monkeypatch.setattr(semantic_analyzer, "ENABLE_GRAPHCODEBERT", False)
    monkeypatch.setattr(semantic_analyzer, "_load_model", fail_if_model_loads)

    result = semantic_analyzer.compute_semantic_drift(
        "def value():\n    return 1\n", "def value():\n    return 2\n"
    )

    assert result["method"] == "fallback_levenshtein"
    assert result["model"] == "difflib.SequenceMatcher"
    assert result["semantic_drift_score"] > 0


def test_compute_full_snapshot_aggregates_metric_and_semantic_inputs():
    commit_data = {
        "full_sha": "abc123",
        "insertions": 10,
        "deletions": 5,
        "files_list": ["src/high.py", "src/low.py"],
    }
    file_metrics = {
        "src/high.py": {"avg_complexity": 8.0, "max_complexity": 12.0, "loc": 120},
        "src/low.py": {"avg_complexity": 2.0, "max_complexity": 3.0, "loc": 40},
        "__semantic_health__": {
            "avg_semantic_drift": 0.25,
            "semantic_health_score": 75.0,
            "high_drift_files": 1,
            "semantic_drift_method": "fallback_levenshtein",
        },
    }
    persistent_hotspots = [
        {"path": "src/high.py", "recent_commit_count": 4, "complexity": 8.0, "loc": 120},
    ]

    snapshot = compute_full_snapshot(
        commit_data=commit_data,
        file_metrics_map=file_metrics,
        bus_factor_min=2,
        prev_health=60.0,
        prev_avg_complexity=4.0,
        dependency_density=0.5,
        has_cycles=True,
        hotspot_files=["src/high.py"],
        persistent_hotspots=persistent_hotspots,
    )

    assert snapshot["full_sha"] == "abc123"
    assert snapshot["avg_complexity"] == 5.0
    assert snapshot["max_complexity"] == 12.0
    assert snapshot["total_loc"] == 160
    assert snapshot["bus_factor_min"] == 2
    assert snapshot["has_cycles"] is True
    assert snapshot["hotspot_count"] == 1
    assert snapshot["avg_semantic_drift"] == 0.25
    assert snapshot["semantic_health_score"] == 75.0
    assert snapshot["semantic_drift_method"] == "fallback_levenshtein"
    assert snapshot["hotspot_persistence_score"] == 50.0

    top_files = json.loads(snapshot["top_files_json"])
    assert [item["path"] for item in top_files] == ["src/high.py", "src/low.py"]
    risk_reasons = json.loads(snapshot["risk_reasons_json"])
    assert {reason["code"] for reason in risk_reasons} >= {
        "dependency_cycle",
        "limited_ownership",
        "semantic_drift",
        "persistent_hotspots",
    }
    assert json.loads(snapshot["persistent_hotspots_json"]) == persistent_hotspots


@pytest.mark.anyio
async def test_clone_repo_rejects_when_storage_quota_exceeded(monkeypatch, tmp_path):
    """Ingestion must be rejected when REPO_STORAGE_PATH usage exceeds MAX_REPO_STORAGE_MB."""
    from backend.features.repo_ingestion.clone_service import clone_repo, get_storage_usage_mb

    monkeypatch.setattr("backend.features.repo_ingestion.clone_service.REPO_STORAGE_PATH", tmp_path)
    monkeypatch.setattr("backend.config.MAX_REPO_STORAGE_MB", 1)

    # Create files totalling > 1 MB
    big_file = tmp_path / "existing_repo" / "bigfile.bin"
    big_file.parent.mkdir(parents=True, exist_ok=True)
    big_file.write_bytes(b"\x00" * (2 * 1024 * 1024))  # 2 MB

    assert get_storage_usage_mb(tmp_path) > 1.0

    with pytest.raises(ValueError, match="Storage quota exceeded"):
        await clone_repo("https://github.com/test/repo", repo_id=999, max_commits=10)


@pytest.mark.anyio
async def test_clone_repo_allows_when_under_quota(monkeypatch, tmp_path):
    """clone_repo should NOT raise when storage is under quota (it will fail at git clone, not quota)."""
    from backend.features.repo_ingestion.clone_service import clone_repo

    monkeypatch.setattr("backend.features.repo_ingestion.clone_service.REPO_STORAGE_PATH", tmp_path)
    monkeypatch.setattr("backend.config.MAX_REPO_STORAGE_MB", 5000)

    # Storage is empty, so quota check should pass; it will fail at git clone instead
    with pytest.raises(RuntimeError):
        await clone_repo(
            "https://github.com/test/nonexistent-repo-12345", repo_id=999, max_commits=10
        )


def test_calculate_average_metrics_zero_code_files():
    from backend.features.repo_ingestion.health_scorer import calculate_average_metrics

    assert calculate_average_metrics(0.0, 0) == 0.0
    assert calculate_average_metrics(10.0, 0) == 0.0
    assert calculate_average_metrics(10.0, 2) == 5.0


def test_compute_full_snapshot_with_zero_code_files():
    commit_data = {
        "full_sha": "def456",
        "insertions": 15,
        "deletions": 2,
        "files_list": ["README.md", ".gitignore"],
    }
    file_metrics_map = {
        "__semantic_health__": {
            "avg_semantic_drift": 0.0,
            "semantic_health_score": 100.0,
            "high_drift_files": 0,
            "semantic_drift_method": "none",
        }
    }

    snapshot = compute_full_snapshot(
        commit_data=commit_data,
        file_metrics_map=file_metrics_map,
        bus_factor_min=1,
        prev_health=None,
    )

    assert snapshot["health_score"] == 100.0
    assert snapshot["avg_complexity"] == 0.0
    assert snapshot["max_complexity"] == 0.0
    assert snapshot["total_loc"] == 0
    assert snapshot["churn_rate"] == 0.0
    assert json.loads(snapshot["risk_reasons_json"]) == []


def test_sanitize_commit_message():
    from backend.features.repo_ingestion.commit_walker import sanitize_commit_message

    assert sanitize_commit_message(None) == ""
    assert sanitize_commit_message("") == ""
    assert sanitize_commit_message("  ") == ""
    assert sanitize_commit_message("fix: normal commit") == "fix: normal commit"
    assert (
        sanitize_commit_message("<script>alert('xss')</script> Fix issue")
        == "&lt;script&gt;alert(&#x27;xss&#x27;)&lt;/script&gt; Fix issue"
    )
    assert sanitize_commit_message("fix: update <Header /> component") == "fix: update &lt;Header /&gt; component"
    assert sanitize_commit_message("feat: value < 100") == "feat: value &lt; 100"


def test_is_code_file_allows_license_named_source_files():
    assert is_code_file("src/hooks/useLicense.ts")
    assert is_code_file("src/components/LicenseGate.tsx")


def test_is_code_file_allows_changelog_named_source_files():
    assert is_code_file("src/services/changelog.go")


def test_is_code_file_excludes_documentation_files():
    assert not is_code_file("LICENSE")
    assert not is_code_file("README.md")
    assert not is_code_file("CHANGELOG.md")


def test_stream_commit_diff_stats_parses_numstat_lines(monkeypatch, tmp_path):
    from backend.features.repo_ingestion.commit_walker import stream_commit_diff_stats

    mock_diff_lines = [
        "10\t2\tbackend/main.py",
        "50\t0\tsrc/utils.ts",
        "-\t-\tassets/logo.png",
        "",
    ]

    monkeypatch.setattr(
        "backend.features.repo_ingestion.commit_walker.stream_git_diff_lines",
        lambda repo_path, cmd: iter(mock_diff_lines),
    )

    files, insertions, deletions, renames = stream_commit_diff_stats(tmp_path, "abc123456789")
    assert files == ["backend/main.py", "src/utils.ts", "assets/logo.png"]
    assert insertions == 60
    assert deletions == 2
    assert renames == {}


def test_stream_commit_diff_stats_handles_empty_stream(monkeypatch, tmp_path):
    from backend.features.repo_ingestion.commit_walker import stream_commit_diff_stats

    monkeypatch.setattr(
        "backend.features.repo_ingestion.commit_walker.stream_git_diff_lines",
        lambda repo_path, cmd: iter([]),
    )

    files, insertions, deletions, renames = stream_commit_diff_stats(tmp_path, "abc123456789")
    assert files == []
    assert insertions == 0
    assert deletions == 0
    assert renames == {}


def test_parse_numstat_rename():
    from backend.features.repo_ingestion.commit_walker import parse_numstat_rename

    assert parse_numstat_rename("src/main.py") == ("src/main.py", None)
    assert parse_numstat_rename("old_name.py => new_name.py") == ("new_name.py", "old_name.py")
    assert parse_numstat_rename("src/{legacy => current}/app.py") == (
        "src/current/app.py",
        "src/legacy/app.py",
    )


def test_resolve_renamed_path_chained_resolution():
    from backend.features.repo_ingestion.graph_builder import resolve_renamed_path

    rename_map = {
        "src/v1/main.py": "src/v2/main.py",
        "src/v2/main.py": "src/core/main.py",
    }
    assert resolve_renamed_path("src/v1/main.py", rename_map) == "src/core/main.py"
    assert resolve_renamed_path("src/v2/main.py", rename_map) == "src/core/main.py"
    assert resolve_renamed_path("src/unchanged.py", rename_map) == "src/unchanged.py"


def test_build_cochange_edges_normalizes_renamed_file_paths():
    from backend.features.repo_ingestion.graph_builder import build_cochange_edges

    # 2 commits with old_name.py + common.py, 1 commit with new_name.py + common.py
    commit_history = [
        {"files_list": ["old_name.py", "common.py"], "renames": {}},
        {"files_list": ["old_name.py", "common.py"], "renames": {}},
        {"files_list": ["new_name.py", "common.py"], "renames": {"old_name.py": "new_name.py"}},
    ]

    edges = build_cochange_edges(commit_history, min_cooccurrence=3)
    assert len(edges) == 1
    assert edges[0]["source_file"] == "common.py"
    assert edges[0]["target_file"] == "new_name.py"
    assert edges[0]["weight"] == 3


@pytest.mark.anyio
async def test_fetch_github_pull_requests_graphql_success(monkeypatch):
    from backend.features.repo_ingestion import clone_service

    monkeypatch.setattr(clone_service, "GITHUB_TOKEN", "mock-token")

    class MockResponse:
        status_code = 200

        def json(self):
            return {
                "data": {
                    "repository": {
                        "pullRequests": {
                            "pageInfo": {"hasNextPage": False, "endCursor": None},
                            "nodes": [
                                {
                                    "number": 42,
                                    "title": "Migrate to GraphQL API",
                                    "state": "MERGED",
                                    "createdAt": "2026-08-20T10:00:00Z",
                                    "mergedAt": "2026-08-20T12:00:00Z",
                                    "closedAt": "2026-08-20T12:00:00Z",
                                    "author": {"login": "octocat"},
                                }
                            ],
                        }
                    }
                }
            }

    class MockClient:
        async def __aenter__(self):
            return self

        async def __aexit__(self, *args):
            pass

        async def post(self, url, json=None, headers=None):
            assert url == "https://api.github.com/graphql"
            assert "bearer mock-token" in headers.get("Authorization", "")
            return MockResponse()

    monkeypatch.setattr("httpx.AsyncClient", lambda **kwargs: MockClient())

    prs = await clone_service.fetch_github_pull_requests("eshaanag", "CommitIQ", limit=10)
    assert len(prs) == 1
    assert prs[0]["pr_number"] == 42
    assert prs[0]["title"] == "Migrate to GraphQL API"
    assert prs[0]["state"] == "merged"
    assert prs[0]["author"] == "octocat"


@pytest.mark.anyio
async def test_fetch_github_pull_requests_graphql_fallback_to_rest(monkeypatch):
    from backend.features.repo_ingestion import clone_service

    monkeypatch.setattr(clone_service, "GITHUB_TOKEN", "mock-token")

    async def mock_graphql(owner, repo, limit=500):
        return None

    async def mock_rest(owner, repo, limit=500):
        return [
            {
                "pr_number": 1,
                "title": "REST Fallback PR",
                "state": "open",
                "author": "fallback-user",
                "created_at": None,
                "merged_at": None,
                "closed_at": None,
            }
        ]

    monkeypatch.setattr(clone_service, "fetch_github_pull_requests_graphql", mock_graphql)
    monkeypatch.setattr(clone_service, "fetch_github_pull_requests_rest", mock_rest)

    prs = await clone_service.fetch_github_pull_requests("eshaanag", "CommitIQ", limit=10)
    assert len(prs) == 1
    assert prs[0]["title"] == "REST Fallback PR"
    assert prs[0]["author"] == "fallback-user"

