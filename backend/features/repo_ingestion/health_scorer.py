import json


def assign_health_color(avg_complexity: float) -> str:
    if avg_complexity <= 5:
        return "green"
    if avg_complexity <= 10:
        return "yellow"
    if avg_complexity <= 20:
        return "orange"
    return "red"


def build_top_files_json(
    files_list: list[str],
    file_metrics_map: dict,
    max_files: int = 5,
) -> str:
    ranked = sorted(
        (
            {
                "path": fpath,
                "complexity": file_metrics_map.get(fpath, {}).get("avg_complexity", 0.0),
                "loc": file_metrics_map.get(fpath, {}).get("loc", 0),
            }
            for fpath in files_list
            if fpath in file_metrics_map
        ),
        key=lambda item: (item["complexity"], item["loc"]),
        reverse=True,
    )
    return json.dumps(ranked[:max_files])


def _risk_reason(code: str, severity: str, label: str, detail: str, impact: float) -> dict:
    return {
        "code": code,
        "severity": severity,
        "label": label,
        "detail": detail,
        "impact": round(impact, 1),
    }


def build_risk_reasons(
    avg_complexity: float,
    prev_avg_complexity: float,
    churn_rate: float,
    bus_factor_min: int,
    dependency_density: float,
    has_cycles: bool,
    hotspot_files: list[str],
    semantic_health_score: float,
    hotspot_persistence_score: float = 0.0,
) -> list[dict]:
    """Return action-oriented reasons behind a snapshot health score."""
    reasons: list[dict] = []

    if avg_complexity >= 10:
        reasons.append(_risk_reason(
            "high_complexity",
            "high",
            "High complexity",
            f"Changed files average {avg_complexity:.1f} cyclomatic complexity.",
            min(avg_complexity * 2.0, 30.0),
        ))
    elif avg_complexity >= 5:
        reasons.append(_risk_reason(
            "elevated_complexity",
            "medium",
            "Elevated complexity",
            f"Changed files average {avg_complexity:.1f} cyclomatic complexity.",
            min(avg_complexity * 1.4, 18.0),
        ))

    if prev_avg_complexity > 0:
        drift_pct = (avg_complexity - prev_avg_complexity) / prev_avg_complexity
        if drift_pct > 0.20:
            reasons.append(_risk_reason(
                "complexity_jump",
                "medium",
                "Complexity jump",
                f"Average complexity rose {drift_pct * 100.0:.0f}% from the previous analyzed commit.",
                min(drift_pct * 35.0, 20.0),
            ))

    if churn_rate >= 0.50:
        reasons.append(_risk_reason(
            "high_churn",
            "high",
            "High churn",
            f"This commit rewrote about {churn_rate * 100.0:.0f}% of the analyzed lines.",
            22.0,
        ))
    elif churn_rate >= 0.25:
        reasons.append(_risk_reason(
            "elevated_churn",
            "medium",
            "Elevated churn",
            f"This commit touched about {churn_rate * 100.0:.0f}% of the analyzed lines.",
            12.0,
        ))

    if hotspot_files:
        reasons.append(_risk_reason(
            "active_hotspots",
            "high" if len(hotspot_files) > 2 else "medium",
            "Active hotspots",
            f"{len(hotspot_files)} high-complexity file(s) are repeatedly changing.",
            min(len(hotspot_files) * 8.0, 24.0),
        ))

    if hotspot_persistence_score >= 60:
        reasons.append(_risk_reason(
            "persistent_hotspots",
            "high",
            "Persistent hotspots",
            "Risky files are staying active across several recent commits.",
            min(hotspot_persistence_score / 4.0, 25.0),
        ))
    elif hotspot_persistence_score >= 30:
        reasons.append(_risk_reason(
            "persistent_hotspots",
            "medium",
            "Persistent hotspots",
            "Some risky files are recurring in the recent commit window.",
            min(hotspot_persistence_score / 5.0, 15.0),
        ))

    if bus_factor_min <= 1:
        reasons.append(_risk_reason(
            "single_owner",
            "critical",
            "Single-owner risk",
            "At least one critical module has only one active contributor.",
            30.0,
        ))
    elif bus_factor_min == 2:
        reasons.append(_risk_reason(
            "limited_ownership",
            "medium",
            "Limited ownership",
            "Critical ownership is concentrated across two contributors.",
            14.0,
        ))

    if dependency_density >= 2.0:
        reasons.append(_risk_reason(
            "dense_dependencies",
            "high",
            "Dense dependency graph",
            f"Dependency density is {dependency_density:.2f} edges per analyzed file.",
            18.0,
        ))
    elif dependency_density >= 1.0:
        reasons.append(_risk_reason(
            "dense_dependencies",
            "medium",
            "Dense dependency graph",
            f"Dependency density is {dependency_density:.2f} edges per analyzed file.",
            10.0,
        ))

    if has_cycles:
        reasons.append(_risk_reason(
            "dependency_cycle",
            "high",
            "Dependency cycle",
            "Import cycles were detected in the analyzed dependency graph.",
            20.0,
        ))

    if semantic_health_score < 70:
        reasons.append(_risk_reason(
            "semantic_drift",
            "high",
            "High semantic drift",
            f"Semantic health is {semantic_health_score:.0f}/100 for this snapshot.",
            20.0,
        ))
    elif semantic_health_score < 85:
        reasons.append(_risk_reason(
            "semantic_drift",
            "medium",
            "Semantic drift",
            f"Semantic health is {semantic_health_score:.0f}/100 for this snapshot.",
            10.0,
        ))

    return sorted(reasons, key=lambda item: item["impact"], reverse=True)[:6]


def compute_health_score(
    avg_complexity: float,
    prev_avg_complexity: float,
    churn_rate: float,
    bus_factor_min: int,
    dependency_density: float,
    has_cycles: bool,
    hotspot_files: list[str],
    semantic_health_score: float = 100.0,
    hotspot_persistence_score: float = 0.0,
) -> dict:
    """Compute CommitIQ's five-subscore repo health model."""
    complexity_score = max(0.0, 100.0 - min(avg_complexity * 5.0, 100.0))
    if prev_avg_complexity > 0:
        drift_pct = (avg_complexity - prev_avg_complexity) / prev_avg_complexity
        if drift_pct > 0.20:
            complexity_score = max(0.0, complexity_score - 10.0)

    churn_rate = max(0.0, min(churn_rate, 1.0))
    churn_score = max(0.0, 100.0 - (churn_rate * 100.0))
    if hotspot_files:
        churn_score = max(0.0, churn_score - 15.0)

    bus_score = min(float(bus_factor_min) * 20.0, 100.0)

    dep_score = max(0.0, 100.0 - min(dependency_density * 50.0, 100.0))
    if has_cycles:
        dep_score = max(0.0, dep_score - 20.0)

    semantic_score = max(0.0, min(float(semantic_health_score), 100.0))

    # Custom weights can be overridden via config; defaults fall back to the standard weights
    w_complexity = 0.25
    w_churn = 0.20
    w_bus = 0.20
    w_dep = 0.15
    w_semantic = 0.20
    
    health_score = (
        complexity_score * w_complexity
        + churn_score * w_churn
        + bus_score * w_bus
        + dep_score * w_dep
        + semantic_score * w_semantic
    )

    return {
        "health_score": round(max(0.0, min(100.0, health_score)), 1),
        "subscores": {
            "complexity_drift": round(complexity_score, 1),
            "churn_risk": round(churn_score, 1),
            "bus_factor_risk": round(bus_score, 1),
            "dependency_health": round(dep_score, 1),
            "semantic_drift": round(semantic_score, 1),
        },
        "breakdown": {
            "avg_complexity": round(avg_complexity, 2),
            "churn_rate": round(churn_rate, 4),
            "bus_factor_min": bus_factor_min,
            "dependency_density": round(dependency_density, 4),
            "has_cycles": has_cycles,
            "hotspot_count": len(hotspot_files),
            "semantic_health_score": round(semantic_score, 1),
            "hotspot_persistence_score": round(hotspot_persistence_score, 1),
        },
        "risk_reasons": build_risk_reasons(
            avg_complexity=avg_complexity,
            prev_avg_complexity=prev_avg_complexity,
            churn_rate=churn_rate,
            bus_factor_min=bus_factor_min,
            dependency_density=dependency_density,
            has_cycles=has_cycles,
            hotspot_files=hotspot_files,
            semantic_health_score=semantic_score,
            hotspot_persistence_score=hotspot_persistence_score,
        ),
    }


def compute_full_snapshot(
    commit_data: dict,
    file_metrics_map: dict,
    bus_factor_min: int,
    prev_health: float | None,
    prev_avg_complexity: float = 0.0,
    dependency_density: float = 0.0,
    has_cycles: bool = False,
    hotspot_files: list[str] | None = None,
    persistent_hotspots: list[dict] | None = None,
) -> dict:
    hotspot_files = hotspot_files or []
    persistent_hotspots = persistent_hotspots or []
    files_list = commit_data.get("files_list", [])
    metrics = [file_metrics_map[fpath] for fpath in files_list if fpath in file_metrics_map]
    semantic_health = file_metrics_map.get("__semantic_health__", {})

    total_loc = sum(item.get("loc", 0) for item in metrics)
    complexities = [
        item.get("avg_complexity", 0.0)
        for item in metrics
        if item.get("avg_complexity", 0.0) > 0
    ]
    max_complexities = [item.get("max_complexity", 0.0) for item in metrics]

    avg_cc = round(sum(complexities) / len(complexities), 2) if complexities else 0.0
    max_cc = round(max(max_complexities), 2) if max_complexities else 0.0
    lines_changed = commit_data["insertions"] + commit_data["deletions"]
    churn_rate = round(min(1.0, lines_changed / max(total_loc, lines_changed, 1)), 4)
    hotspot_persistence_score = round(
        min(100.0, sum(float(item.get("recent_commit_count", 0)) * 12.5 for item in persistent_hotspots)),
        1,
    )

    score = compute_health_score(
        avg_complexity=avg_cc,
        prev_avg_complexity=prev_avg_complexity,
        churn_rate=churn_rate,
        bus_factor_min=bus_factor_min,
        dependency_density=dependency_density,
        has_cycles=has_cycles,
        hotspot_files=hotspot_files,
        semantic_health_score=semantic_health.get("semantic_health_score", 100.0),
        hotspot_persistence_score=hotspot_persistence_score,
    )
    subscores = score["subscores"]
    health = score["health_score"]

    return {
        "full_sha": commit_data["full_sha"],
        "health_score": health,
        "avg_complexity": avg_cc,
        "max_complexity": max_cc,
        "total_loc": total_loc,
        "churn_rate": churn_rate,
        "num_files_changed": len(files_list),
        "bus_factor_min": bus_factor_min,
        "health_delta": round(health - prev_health, 2) if prev_health is not None else None,
        "cc_score": subscores["complexity_drift"],
        "churn_score": subscores["churn_risk"],
        "bus_score": subscores["bus_factor_risk"],
        "loc_score": subscores["dependency_health"],
        "complexity_drift_score": subscores["complexity_drift"],
        "churn_risk_score": subscores["churn_risk"],
        "bus_factor_risk_score": subscores["bus_factor_risk"],
        "dependency_health_score": subscores["dependency_health"],
        "avg_semantic_drift": semantic_health.get("avg_semantic_drift", 0.0),
        "semantic_health_score": semantic_health.get("semantic_health_score", 100.0),
        "high_drift_files": semantic_health.get("high_drift_files", 0),
        "semantic_drift_method": semantic_health.get("semantic_drift_method", "none"),
        "risk_reasons_json": json.dumps(score["risk_reasons"]),
        "hotspot_persistence_score": hotspot_persistence_score,
        "persistent_hotspots_json": json.dumps(persistent_hotspots[:10]),
        "dependency_density": score["breakdown"]["dependency_density"],
        "has_cycles": has_cycles,
        "hotspot_count": len(hotspot_files),
        "top_files_json": build_top_files_json(files_list, file_metrics_map),
    }
