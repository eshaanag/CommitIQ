"""
Builds import edges (from AST parsing of HEAD state)
and co-change edges (from commit history co-occurrence).
"""

import ast
import os
import re
from collections import defaultdict
from pathlib import Path


def extract_python_imports(file_content: str) -> list[str]:
    try:
        tree = ast.parse(file_content)
        imports = []
        for node in ast.walk(tree):
            if isinstance(node, ast.Import):
                imports.extend(alias.name for alias in node.names)
            elif isinstance(node, ast.ImportFrom):
                if node.module or node.level:
                    imports.append(("." * node.level) + (node.module or ""))
        return imports
    except SyntaxError:
        return []


def extract_js_imports(file_content: str) -> list[str]:
    imports = []

    # 1. Matches: import ... from 'path' and export ... from 'path' (including multiline and type imports)
    es6_from_pattern = r"""(?:import|export)\s+(?:type\s+)?[\s\S]*?\s+from\s+['"]([^'"]+)['"]"""
    imports.extend(re.findall(es6_from_pattern, file_content))

    # 2. Matches: import 'path' (side-effect imports)
    es6_side_effect_pattern = r"""import\s+['"]([^'"]+)['"]"""
    imports.extend(re.findall(es6_side_effect_pattern, file_content))

    # 3. Matches require('path')
    require_pattern = r"""require\s*\(\s*['"]([^'"]+)['"]\s*\)"""
    imports.extend(re.findall(require_pattern, file_content))

    # 4. Matches require 'path' (CommonJS without parentheses)
    require_no_paren = r"""require\s+['"]([^'"]+)['"]"""
    imports.extend(re.findall(require_no_paren, file_content))

    # 5. Matches dynamic import('path')
    dynamic_import_pattern = r"""import\s*\(\s*['"]([^'"]+)['"]\s*\)"""
    imports.extend(re.findall(dynamic_import_pattern, file_content))

    # De-duplicate while preserving order
    seen = set()
    unique_imports = []
    for imp in imports:
        # Strip query params or webpack loaders if present
        imp_clean = imp.split("!")[-1].split("?")[0].strip()
        if imp_clean and imp_clean not in seen:
            seen.add(imp_clean)
            unique_imports.append(imp_clean)

    return unique_imports


def resolve_import_to_file(import_path: str, source_file: str, all_files: list[str]) -> str | None:
    """
    Try to resolve an import path to an actual file in the repo.
    Supports relative imports, direct match, and suffix/sub-path match (e.g. monorepo packages).
    Returns the resolved path or None if not resolvable.
    """
    import_path_clean = import_path.replace("\\", "/").strip()
    if not import_path_clean:
        return None

    # Helper set of files for O(1) lookup
    file_set = set(all_files)

    if import_path_clean.startswith("."):
        source_dir = os.path.dirname(source_file)
        candidate = os.path.normpath(os.path.join(source_dir, import_path_clean))
        candidate_clean = candidate.replace("\\", "/")

        for ext in ["", ".js", ".ts", ".jsx", ".tsx", ".py"]:
            with_ext = candidate_clean + ext
            if with_ext in file_set:
                return with_ext
            index = f"{candidate_clean}/index{ext}"
            if index in file_set:
                return index
            index_norm = os.path.normpath(index).replace("\\", "/")
            if index_norm in file_set:
                return index_norm
        return None

    # 2. Handle absolute/package/module-alias imports (e.g. monorepo sub-paths)
    for ext in ["", ".js", ".ts", ".jsx", ".tsx", ".py"]:
        with_ext = import_path_clean + ext
        if with_ext in file_set:
            return with_ext

    # Suffix match (e.g. "react-reconciler/src/ReactFiberReconciler" matching "packages/react-reconciler/src/ReactFiberReconciler.js")
    if "/" in import_path_clean:
        for f in all_files:
            f_clean = f.replace("\\", "/")
            for ext in ["", ".js", ".ts", ".jsx", ".tsx", ".py"]:
                suffix = import_path_clean + ext
                if f_clean.endswith("/" + suffix):
                    return f

    return None


def build_import_edges(repo_path: Path, all_files: list[str]) -> list[dict]:
    """Extract import dependency edges from HEAD state of repo."""
    edges = []
    file_set = set(all_files)

    for rel_path in all_files:
        full_path = os.path.join(repo_path, rel_path)
        try:
            with open(full_path, "r", encoding="utf-8", errors="ignore") as f:
                content = f.read()
        except Exception:
            continue

        ext = os.path.splitext(rel_path)[1].lower()
        if ext == ".py":
            raw_imports = extract_python_imports(content)
        elif ext in {".js", ".ts", ".jsx", ".tsx"}:
            raw_imports = extract_js_imports(content)
        else:
            continue

        for imp in raw_imports:
            target = resolve_import_to_file(imp, rel_path, all_files)
            if target and target != rel_path:
                edges.append(
                    {
                        "source_file": rel_path,
                        "target_file": target,
                        "edge_type": "import",
                        "weight": 1,
                        "cochange_count": None,
                    }
                )

    return edges


def resolve_renamed_path(file_path: str, rename_map: dict[str, str] | None = None) -> str:
    """
    Resolve a file path to its latest name using a rename mapping dictionary.
    Traverses chains of renames (e.g. A -> B -> C returns C) with cycle protection.
    """
    if not rename_map or file_path not in rename_map:
        return file_path

    current = file_path
    visited = set()
    while current in rename_map and current not in visited:
        visited.add(current)
        current = rename_map[current]

    return current


def build_rename_map_from_history(commit_history: list[dict]) -> dict[str, str]:
    """
    Build a path resolution mapping dictionary from commit history.
    Maps older file names to their latest canonical file names.
    """
    rename_map: dict[str, str] = {}
    for commit in commit_history:
        renames = commit.get("renames") or commit.get("rename_map") or {}
        if isinstance(renames, dict):
            for old_path, new_path in renames.items():
                if old_path and new_path and old_path != new_path:
                    rename_map[old_path] = new_path
        elif isinstance(renames, list):
            for item in renames:
                if isinstance(item, (tuple, list)) and len(item) == 2:
                    old_path, new_path = item
                    if old_path and new_path and old_path != new_path:
                        rename_map[old_path] = new_path
    return rename_map


def build_cochange_edges(
    commit_history: list[dict],
    min_cooccurrence: int = 3,
    rename_map: dict[str, str] | None = None,
) -> list[dict]:
    """
    If files A and B are changed together in ≥ min_cooccurrence commits → co-change edge.
    Normalizes file paths to their latest names using rename_map
    so file renames don't distort co-change coupling metrics.
    """
    history_rename_map = build_rename_map_from_history(commit_history)
    if rename_map:
        history_rename_map.update(rename_map)

    cochange_counts = defaultdict(int)

    for commit in commit_history:
        raw_files = commit.get("files_list", [])
        resolved_files = set()
        for fpath in raw_files:
            if not fpath:
                continue
            canonical_path = resolve_renamed_path(fpath, history_rename_map)
            resolved_files.add(canonical_path)

        files = sorted(resolved_files)
        for i, f1 in enumerate(files):
            for f2 in files[i + 1 :]:
                if f1 != f2:
                    cochange_counts[(f1, f2)] += 1

    edges = []
    for (f1, f2), count in sorted(cochange_counts.items()):
        if count >= min_cooccurrence:
            edges.append(
                {
                    "source_file": f1,
                    "target_file": f2,
                    "edge_type": "co_change",
                    "weight": count,
                    "cochange_count": count,
                }
            )

    return edges


def get_top_files_by_frequency(
    commit_history: list[dict],
    top_n: int = 50,
    rename_map: dict[str, str] | None = None,
) -> list[str]:
    """Return the top N most frequently changed files, normalizing renamed paths."""
    history_rename_map = build_rename_map_from_history(commit_history)
    if rename_map:
        history_rename_map.update(rename_map)

    freq = defaultdict(int)
    for commit in commit_history:
        seen_in_commit = set()
        for f in commit.get("files_list", []):
            if not f:
                continue
            canonical_path = resolve_renamed_path(f, history_rename_map)
            if canonical_path not in seen_in_commit:
                seen_in_commit.add(canonical_path)
                freq[canonical_path] += 1

    return [f for f, _ in sorted(freq.items(), key=lambda x: -x[1])[:top_n]]
