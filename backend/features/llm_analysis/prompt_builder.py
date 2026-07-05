"""
Builds the LLM prompt from structured metric data.
NEVER sends raw source code to the LLM.
Input is always a JSON diff of metric values.
Target: under 700 input tokens.
"""

import json

EXPLAIN_DROP_SYSTEM = """You are a senior engineering analyst reviewing codebase health data.
Given two commit health snapshots and their metric diff, explain in 3-4 sentences why the
codebase health changed. Be specific about files and metrics. Avoid generic advice.
Speak directly to an engineering lead. Do not use bullet points. Write flowing prose."""


PREDICT_MERGE_SYSTEM = """You are a senior engineering analyst.
Given metrics for a feature branch vs main, predict the health impact of merging.
Output: one sentence for risk_level (low/medium/high), one sentence for the top concern,
one sentence recommendation. Total 3 sentences max."""


def build_explain_prompt(
    before: dict,
    after: dict,
    commit_msg: str,
) -> str:
    """
    Build the explain_drop prompt.
    Input dicts are HealthSnapshot row dicts (no raw code).
    Estimated tokens: ~580–680 input, ~150–200 output.
    Total cost: ~$0.003–0.004 per call.
    """
    diff = {
        "commit_message": commit_msg[:120],
        "health_before": before.get("health_score", 0),
        "health_after": after.get("health_score", 0),
        "health_delta": round(after.get("health_score", 0) - before.get("health_score", 0), 2),
        "complexity_before": before.get("avg_complexity", 0),
        "complexity_after": after.get("avg_complexity", 0),
        "complexity_delta": round(
            after.get("avg_complexity", 0) - before.get("avg_complexity", 0), 2
        ),
        "churn_rate": after.get("churn_rate", 0),
        "files_changed": after.get("num_files_changed", 0),
        "bus_factor_before": before.get("bus_factor_min", 1),
        "bus_factor_after": after.get("bus_factor_min", 1),
        "avg_semantic_drift": after.get("avg_semantic_drift", 0),
        "semantic_health_score": after.get("semantic_health_score", 100),
        "high_drift_files": after.get("high_drift_files", 0),
        "semantic_drift_method": after.get("semantic_drift_method", "none"),
        "top_changed_files": json.loads(after.get("top_files_json") or "[]")[:5],
    }
    return f"Analyze this commit health change:\n{json.dumps(diff, indent=2)}"


def build_predict_prompt(branch_metrics: dict, main_metrics: dict) -> str:
    """
    Build the predict_merge prompt.
    Estimated tokens: ~500–600 input, ~100–150 output.
    Cost: ~$0.002–0.003 per call.
    """
    comparison = {
        "main_health": main_metrics.get("health_score", 0),
        "branch_health": branch_metrics.get("health_score", 0),
        "health_delta": round(
            branch_metrics.get("health_score", 0) - main_metrics.get("health_score", 0), 2
        ),
        "complexity_main": main_metrics.get("avg_complexity", 0),
        "complexity_branch": branch_metrics.get("avg_complexity", 0),
        "churn_branch": branch_metrics.get("churn_rate", 0),
        "bus_factor_branch": branch_metrics.get("bus_factor_min", 1),
        "files_to_merge": branch_metrics.get("num_files_changed", 0),
    }
    return f"Predict health impact of merging this branch:\n{json.dumps(comparison, indent=2)}"
