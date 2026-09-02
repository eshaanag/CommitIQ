export type RepoStatus = 'pending' | 'processing' | 'ready' | 'error'
export type JobStatus =
  | 'queued'
  | 'cloning'
  | 'analyzing'
  | 'building_graph'
  | 'computing_bus_factor'
  | 'ready'
  | 'error'
  | 'cancelled'
export type PromptType = 'explain_drop' | 'predict_merge'
export type RiskLevel = 'low' | 'medium' | 'high' | 'critical'
export type GraphEdgeType = 'import' | 'co_change'
export type HealthColor = 'green' | 'yellow' | 'orange' | 'red'

export interface ApiError {
  detail: string
  code?: string
  message?: string
}

export interface Repo {
  id: number
  url: string
  name: string
  owner: string
  repo_slug: string
  default_branch: string
  ingested_at: string | null
  last_updated_at: string | null
  last_job_completed_at?: string | null
  total_commits: number
  analyzed_commits: number
  status: RepoStatus
  error_message: string | null
  max_commits_setting: number
  github_stars: number | null
  github_language: string | null
  github_description: string | null
  active_contributors_count?: number
}

export interface Commit {
  id: number
  repo_id: number
  sha: string
  full_sha: string
  message: string | null
  author_name: string | null
  author_email: string | null
  committed_at: string
  insertions: number
  deletions: number
  files_changed: number
  parent_sha: string | null
}

export interface TopFileMetric {
  path: string
  complexity: number
  loc: number
}

export interface RiskReason {
  code: string
  severity: string
  label: string
  detail: string
  impact: number
}

export interface PersistentHotspot {
  path: string
  recent_commit_count: number
  complexity: number
  loc: number
}

export interface HealthSnapshot {
  id?: number
  repo_id?: number
  commit_id?: number
  sha: string
  full_sha: string
  message: string | null
  author: string | null
  author_email?: string | null
  committed_at: string
  health_score: number
  avg_complexity: number
  max_complexity: number
  total_loc: number
  churn_rate: number
  num_files_changed: number
  insertions?: number
  deletions?: number
  bus_factor_min: number
  health_delta: number | null
  cc_score: number
  churn_score: number
  bus_score: number
  loc_score: number
  subscores?: {
    complexity_drift?: number
    churn_risk?: number
    bus_factor_risk?: number
    dependency_health?: number
    semantic_drift?: number
  }
  dependency_density?: number
  has_cycles?: boolean
  hotspot_count?: number
  avg_semantic_drift?: number
  semantic_health_score?: number
  high_drift_files?: number
  semantic_drift_method?: string
  risk_reasons?: RiskReason[]
  hotspot_persistence_score?: number
  persistent_hotspots?: PersistentHotspot[]
  top_files: TopFileMetric[]
  computed_at?: string | null
}

export interface GraphNode {
  id: string
  file: string
  module: string | null
  loc: number
  health: number
  health_color: HealthColor
  is_entry_point: boolean
  semantic_drift_score?: number
  drift_method?: string
}

export interface GraphEdge {
  source: string
  target: string
  type: GraphEdgeType
  weight: number
  cochange_count?: number | null
}

export interface GraphResponse {
  repo_id: number
  commit_sha: string
  nodes: GraphNode[]
  edges: GraphEdge[]
}

export interface BusFactorEntry {
  module_path: string
  contributor_count: number
  top_contributor: string | null
  top_contributor_email: string | null
  top_contributor_pct: number
  total_commits_to_module: number
  risk_level: RiskLevel
  last_commit_sha: string | null
  last_updated_at?: string | null
}

export interface BusFactorWrapper {
  repo_id: number
  modules: BusFactorEntry[]
}

export interface LLMNarrative {
  repo_id: number
  commit_sha: string
  prompt_type: PromptType
  explanation: string
  tokens_used: number
  cost_usd: number
  cached: boolean
  model: string
  provider?: string | null
  demo_mode?: boolean
}

export interface LLMUsage {
  repo_id: number
  total_calls: number
  cache_hits: number
  anthropic_calls: number
  gemini_calls: number
  total_tokens: number
  total_cost_usd: number
  cache_savings_usd: number
  budget_remaining: number
  max_calls: number
}

export interface HotspotEntry {
  file: string
  complexity: number
  churn_count: number
  risk_score: number
  loc?: number
}

export interface HotspotResponse {
  repo_id: number
  commit_sha: string
  hotspots: HotspotEntry[]
  total?: number
  limit?: number
  offset?: number
}

export interface GraphDiffResponse {
  sha_before: string
  sha_after: string
  summary: {
    files_added: number
    files_removed: number
    files_changed: number
    edges_added: number
    edges_removed: number
  }
  nodes_added: string[]
  nodes_removed: string[]
  nodes_changed: Array<{
    file: string
    before_complexity: number
    after_complexity: number
    delta_pct: number
  }>
  edges_added: Array<{ source: string; target: string; type: GraphEdgeType }>
  edges_removed: Array<{ source: string; target: string; type: GraphEdgeType }>
}

export interface IngestRequest {
  repo_url: string
  max_commits?: number
}

export interface IngestResponse {
  repo_id: number
  repo_slug: string
  status: RepoStatus | 'processing'
  job_id: number
  message: string
}

export interface IngestStatus {
  current: number
  total: number
  current_sha: string | null
  stage: string | null
  progress_pct: number
  status: JobStatus
  error_message?: string | null
}

export type JobProgress = IngestStatus

export interface TimelineResponse {
  repo_id: number
  commits: HealthSnapshot[]
}

export interface CommitDetailResponse {
  repo: Repo
  commit: Commit
  snapshot: HealthSnapshot
  graph: GraphResponse
  bus_factor: BusFactorWrapper
  has_narrative: boolean
  narrative: LLMNarrative | null
}

export interface ExplainRequest {
  repo_id: number
  commit_sha: string
  prompt_type?: PromptType
}

export interface PredictRequest {
  repo_id: number
  commit_sha: string
  prompt_type?: 'predict_merge'
}

export interface NarrativeStreamChunk {
  token?: string
  done: boolean
  explanation?: string
  tokens_total?: number
  cost_usd?: number
  cached?: boolean
  model?: string
  provider?: string
  demo_mode?: boolean
  error?: string
}

export interface HealthTimelineProps {
  commits: HealthSnapshot[]
  repoSlug?: string
  selectedSha?: string | null
  onSelectCommit: (commit: HealthSnapshot) => void
}

export interface CommitListProps {
  commits: HealthSnapshot[]
  repoSlug: string
  selectedSha: string | null
  onSelect: (commit: HealthSnapshot) => void
}

export interface GraphExplorerProps {
  graphData: GraphResponse | null | undefined
  selectedSha: string | null
  commits?: HealthSnapshot[]
  onSelectCommit?: (commit: HealthSnapshot) => void
}

export interface BusFactorTableProps {
  modules: BusFactorEntry[]
}

export interface NarrativeCardProps {
  repoId: string | number
  commitSha: string | null
}

export interface HealthBadgeProps {
  score: number
  delta?: number | null
  size?: 'sm' | 'md' | 'lg'
}

export interface CostMeterProps {
  usage: LLMUsage | null | undefined
  loading?: boolean
  error?: string | null
}

export interface ChartTooltipProps {
  active?: boolean
  payload?: Array<{ payload?: HealthSnapshot }>
}

export interface ChartClickState {
  activePayload?: Array<{ payload?: HealthSnapshot }>
}

export interface AreaDotProps {
  cx?: number
  cy?: number
  index?: number
  payload?: HealthSnapshot
}

export interface ForceGraphNode {
  id: string
  name: string
  file: string
  health_color: HealthColor
  loc: number
  health: number
}

export interface ForceGraphLink {
  source: string
  target: string
  type: GraphEdgeType
  weight: number
}

export type HealthStatus = 'excellent' | 'healthy' | 'moderate' | 'warning' | 'critical' | 'failing'

export function getHealthStatus(score: number): HealthStatus {
  if (score >= 85) return 'excellent'
  if (score >= 70) return 'healthy'
  if (score >= 55) return 'moderate'
  if (score >= 40) return 'warning'
  if (score >= 25) return 'critical'
  return 'failing'
}

export function getHealthColor(score: number): string {
  if (score >= 70) return 'var(--color-healthy)'
  if (score >= 40) return 'var(--color-warning)'
  return 'var(--color-critical)'
}

export function getHealthLabel(score: number): string {
  if (score >= 85) return 'Excellent'
  if (score >= 70) return 'Healthy'
  if (score >= 55) return 'Moderate'
  if (score >= 40) return 'Warning'
  if (score >= 25) return 'Critical'
  return 'Failing'
}

export function formatSha(sha: string): string {
  return sha.slice(0, 8)
}

export function formatDelta(delta: number | null): string {
  if (delta === null) return '-'
  const sign = delta > 0 ? '+' : ''
  return `${sign}${delta.toFixed(1)}`
}

export interface BottleneckPR {
  pr_number: number
  title: string
  author: string
  cycle_time_hours: number
  url: string
}

export interface CycleTimeMetrics {
  avg_cycle_time_hours: number
  avg_pickup_time_hours: number
  avg_review_time_hours: number
  total_prs_analyzed: number
  bottlenecks: BottleneckPR[]
}

export interface DoraMetrics {
  deployment_frequency: string
  deployment_frequency_value: number
  change_failure_rate: string
  change_failure_rate_value: number
  mttr_hours: number
  mttr_category: string
  dora_score: string
}

export interface TeamHealthMetrics {
  burnout_risk_score: string
  weekend_commits_percent: number
  after_hours_commits_percent: number
  context_switching_score: string
  avg_files_per_day: number
}

export interface CodeQualityMetrics {
  churn_rate_percent: number
  churn_category: string
  ai_assisted_commits: number
  ai_impact_score: string
}

export interface RepoCompareMetrics {
  health_score: number
  avg_complexity: number
  max_complexity: number
  churn_rate: number
  total_loc: number
  bus_factor_min: number
  hotspot_count: number
  active_contributors: number
  total_commits: number
  analyzed_commits: number
  dependency_density?: number
  has_cycles?: boolean
  avg_semantic_drift?: number
  cc_score?: number
  churn_score?: number
  bus_score?: number
  loc_score?: number
  semantic_health_score?: number
}

export interface RepoCompareItem {
  repo: Repo
  latest_snapshot: HealthSnapshot | null
  metrics_summary: RepoCompareMetrics
  bus_factor: BusFactorWrapper
  timeline_summary: HealthSnapshot[]
}

export interface RepoCompareDelta {
  health_score_delta: number
  avg_complexity_delta: number
  max_complexity_delta: number
  churn_rate_delta: number
  total_loc_delta: number
  bus_factor_min_delta: number
  hotspot_count_delta: number
  active_contributors_delta: number
  total_commits_delta: number
}

export interface RepoCompareInsight {
  category: string
  winner: string | null
  summary: string
}

export interface VelocityWeek {
  label: string
  iso_week?: string
  week_start: string
  commits: number
  insertions: number
  deletions: number
  lines_changed: number
  files_changed: number
  contributor_count: number
}

export interface VelocityContributor {
  name: string
  email: string
  commits: number
  commit_pct: number
  insertions: number
  deletions: number
  weeks_active: number
  avg_commits_per_active_week: number
}

export interface VelocityTotals {
  total_commits: number
  total_insertions: number
  total_deletions: number
  num_weeks: number
  num_active_contributors: number
  avg_commits_per_week: number
  avg_lines_per_week: number
  avg_contributors_per_week: number
  max_commit_streak_weeks: number
  commit_deviation: number
  lines_deviation: number
  cadence_score: number
}

export interface VelocityMetrics {
  weekly: VelocityWeek[]
  totals: VelocityTotals
  contributors: VelocityContributor[]
}

export interface ReportSchedule {
  id: number
  repo_id: number
  name: string
  description: string | null
  cron_expression: string
  cron_description: string
  timezone: string
  report_type: string
  is_active: boolean
  webhook_url: string | null
  notification_email: string | null
  include_narrative: boolean
  last_run_at: string | null
  next_run_at: string | null
  last_delivery_status: string | null
  consecutive_failures: number
  max_retry_count: number
  created_at: string | null
  updated_at: string | null
}

export interface ReportDelivery {
  id: number
  schedule_id: number
  repo_id: number
  status: string
  report_type: string
  triggered_at: string | null
  completed_at: string | null
  duration_seconds: number | null
  webhook_status_code: number | null
  error_message: string | null
  retry_count: number
  snapshot_health_score: number | null
  snapshot_commits_analyzed: number | null
  snapshot_latest_sha: string | null
}

export interface ReportScheduleListResponse {
  total: number
  limit: number
  offset: number
  deliveries: ReportDelivery[]
}

export interface ReportPreview {
  report_type: string
  repo_name: string
  repo_slug: string
  generated_at: string
  summary: {
    total_commits: number
    total_insertions: number
    total_deletions: number
    churn_rate_percent: number
    unique_contributors: number
    total_files_changed: number
    default_branch: string
  }
  latest_commit?: {
    sha: string
    message: string
    author: string | null
    committed_at: string | null
  }
}

export interface WeeklyDigestAlert {
  severity: string
  metric: string
  message: string
}

export interface WeeklyDigest {
  repo_name: string
  repo_slug: string
  generated_at: string
  window_weeks: number
  summary: {
    total_commits: number
    total_insertions: number
    total_deletions: number
    total_files_changed: number
    unique_contributors: number
  }
  health: {
    current_avg_score: number
    previous_avg_score: number
    trend: number
    trend_direction: 'up' | 'down' | 'flat'
  }
  complexity: {
    current_avg: number
    previous_avg: number
    trend: number
  }
  churn: {
    current_avg_rate: number
    previous_avg_rate: number
    trend: number
  }
  bus_factor: {
    total_modules: number
    critical_risk_count: number
    high_risk_count: number
    top_risk_modules: Array<{
      module: string
      risk_level: string
      top_contributor: string | null
      top_contributor_pct: number
      contributor_count: number
    }>
  }
  top_contributors: Array<{
    author: string
    commits: number
    insertions: number
    deletions: number
    files_changed: number
  }>
  persistent_hotspots: Array<{ path: string; snapshot_count: number }>
  alerts: WeeklyDigestAlert[]
}

export interface HealthRecommendation {
  id: string
  category: string
  severity: 'critical' | 'high' | 'medium' | 'low'
  title: string
  description: string
  impact: number
  effort: 'low' | 'medium' | 'high'
  metric: string | null
  current_value: string | null
  target_value: string | null
  file_path: string | null
}

export interface RecommendationsResponse {
  repo_name: string
  repo_slug: string
  generated_at: string
  health_score: number
  total_recommendations: number
  critical_count: number
  high_count: number
  medium_count: number
  low_count: number
  recommendations: HealthRecommendation[]
}

export interface RepoCompareResponse {
  base: RepoCompareItem
  head: RepoCompareItem
  deltas: RepoCompareDelta
  insights: RepoCompareInsight[]
  verdict: string
}

export interface CommitQualityViolation {
  rule: string
  count: number
}

export interface CommitQualityContributor {
  name: string
  total: number
  conventional: number
  convention_rate: number
  errors: number
  warnings: number
  infos: number
}

export interface CommitQualityMetrics {
  quality_score: number
  total_commits: number
  conventional_commits: number
  convention_rate: number
  merge_commits: number
  avg_subject_length: number
  median_subject_length: number
  total_violations: number
  severity_breakdown: {
    error: number
    warning: number
    info: number
  }
  top_violations: CommitQualityViolation[]
  contributors: CommitQualityContributor[]
}

export interface DeploymentEntry {
  id: number
  provider: string
  environment: string
  status: string
  ref: string
  sha: string
  pipeline_id: string
  deployed_at: string
  env_color: string
}

export interface DeploymentDailyCount {
  date: string
  success: number
  failure: number
  total: number
}

export interface DeploymentSummary {
  total_deploys: number
  success_count: number
  failure_count: number
  success_rate: number
  most_recent: string
  by_environment: Record<string, { total: number; success: number; failure: number }>
  by_provider: Record<string, number>
}

export interface DeploymentTimeline {
  deployments: DeploymentEntry[]
  summary: DeploymentSummary
  daily: DeploymentDailyCount[]
}
