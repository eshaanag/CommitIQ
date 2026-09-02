# Repository Health Metrics Roadmap

CommitIQ already measures complexity, churn, dependency and co-change graph structure, semantic drift, hotspots, and bus factor. The next step is to make repo health more predictive: not just "what changed", but "what kind of risk is accumulating and where".

## Principles

- Prefer metrics that explain a concrete engineering decision.
- Separate commit-level signals from whole-repo signals.
- Show confidence and data source limits when a metric is approximate.
- Avoid rewarding vanity numbers. A metric should identify risk, trend, or action.
- Add tests for each scoring formula before exposing it in the UI.

## High-Value Metrics

### 1. Risk Velocity

Measures how quickly health risk is changing over recent commits.

Inputs:

- Health score delta
- Complexity delta
- Churn trend
- Hotspot count trend

Why it matters:

- A repo with a moderate score but rapidly worsening trend needs attention before the absolute score looks bad.

Suggested output:

- `risk_velocity_score`
- `risk_velocity_direction`: improving, stable, worsening
- `risk_velocity_confidence`

### 2. Hotspot Persistence

Tracks files that stay risky across multiple commits, not just one snapshot.

Inputs:

- Repeated high complexity
- Repeated churn
- Repeated semantic drift
- Repeated graph centrality

Why it matters:

- Persistent hotspots are more important than one-off risky changes.

Suggested output:

- `persistent_hotspots`
- `hotspot_age_commits`
- `hotspot_pressure_score`

### 3. Ownership Entropy

Measures whether ownership is healthy or concentrated.

Inputs:

- Contributors per file/module
- Share of commits by top contributor
- Recency of contributor activity

Why it matters:

- Bus factor catches critical single-owner modules, but entropy gives a smoother risk signal.

Suggested output:

- `ownership_entropy`
- `ownership_concentration_score`
- `inactive_owner_risk`

### 4. Coupling Surprise

Measures hidden coupling by comparing co-change frequency against normal file activity.

Inputs:

- Co-change edge count
- Individual file change frequencies
- Expected co-change baseline

Why it matters:

- Two files that change together more often than expected may share an undocumented dependency.

Suggested output:

- `coupling_surprise_score`
- `surprising_cochange_edges`
- `hidden_coupling_modules`

### 5. Blast Radius

Estimates how many files or modules are likely affected by changes to a file.

Inputs:

- Import graph centrality
- Co-change graph centrality
- Entry-point flags
- Recent churn

Why it matters:

- A low-complexity file can still be risky if it sits at the center of the dependency graph.

Suggested output:

- `blast_radius_score`
- `high_blast_radius_files`
- `centrality_rank`

### 6. Architectural Cycle Severity

Moves beyond yes/no cycle detection.

Inputs:

- Cycle count
- Cycle size
- Files/modules involved
- Whether cycles touch entry points or hotspots

Why it matters:

- Small isolated cycles and large core cycles should not be treated the same.

Suggested output:

- `cycle_severity_score`
- `largest_cycle_size`
- `critical_cycles`

### 7. Change Risk Classification

Classifies commits by risk type.

Inputs:

- Files changed
- Churn
- Complexity delta
- Semantic drift
- Ownership risk
- Blast radius

Why it matters:

- Users need labels like "high-churn refactor" or "central module change", not only raw scores.

Suggested output:

- `change_risk_type`
- `change_risk_score`
- `risk_reasons`

### 8. Recovery and Stabilization Signal

Detects whether recent work is reducing accumulated risk.

Inputs:

- Complexity decrease
- Hotspot count decrease
- Cycle reduction
- Broader ownership
- Lower churn after high-risk commits

Why it matters:

- A good health system should recognize cleanup and stabilization, not only punish churn.

Suggested output:

- `stabilization_score`
- `risk_reduction_events`
- `cleanup_momentum`

## Metrics That Need External Data

These are valuable but should be optional because they require GitHub PR, issue, CI, or release data.

- Review latency and review depth
- Change failure rate proxy from reverted commits or failed CI
- PR size and merge risk
- Issue-to-code ownership mapping
- Release cadence and stabilization windows
- Test coverage trend

## Recommended Implementation Order

1. Add commit-level `risk_reasons` so health scores become explainable.
2. Add hotspot persistence using existing stored snapshots and graph nodes.
3. Add ownership entropy beside bus factor.
4. Add coupling surprise on top of existing co-change counts.
5. Add blast-radius scoring from import and co-change centrality.
6. Add cycle severity and expose the top cycles.
7. Add optional GitHub API enrichment for PR/review/CI metrics.

## UI Guidance

- Show the health score as a summary, not the only answer.
- Show top risk reasons beside each score.
- Keep raw metric values available, but lead with action-oriented labels.
- Mark approximate metrics clearly when based on shallow clone or bounded commit history.
