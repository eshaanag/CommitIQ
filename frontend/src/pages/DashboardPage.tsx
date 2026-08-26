import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useSWR from 'swr'
import {
  getBusFactor,
  getGraph,
  getHealthTimeline,
  getIngestProgress,
  getLLMUsage,
  getRepoBySlug,
  rescanRepo,
} from '../lib/api'
import type { HealthSnapshot } from '../types'
import { BusFactorTable } from '../components/BusFactorTable'
import { CommitList } from '../components/CommitList'
import { CostMeter } from '../components/CostMeter'
import { GraphExplorer } from '../components/GraphExplorer'
import { HealthTimeline } from '../components/HealthTimeline'
import { HealthTimelineSkeleton } from '../components/HealthTimelineSkeleton'
import { HotspotMap } from '../components/HotspotMap'
import { NarrativeCard } from '../components/NarrativeCard'
import { CycleTimeDashboard } from '../components/CycleTimeDashboard'
import { DoraMetricsDashboard } from '../components/DoraMetricsDashboard'
import { TeamHealthDashboard } from '../components/TeamHealthDashboard'
import { TimeRangeSelector, type TimeRangePreset } from '../components/TimeRangeSelector'
import { HealthBadge } from '../components/ui/HealthBadge'
import { ThemeToggle } from '../components/ui/ThemeToggle'
import { ScrollToTop } from '../components/ui/ScrollToTop'
import { MetricTooltip } from '../components/ui/MetricTooltip'
import {
  Layers,
  Compass,
  BarChart2,
  Activity,
  GitBranch,
  RefreshCw,
  AlertTriangle,
  Download,
  ChevronDown,
  FileText,
  FileJson,
  ArrowLeftRight,
} from 'lucide-react'
import { sanitizeCommitMessage } from '../lib/utils'
import { exportTimelineCsv, exportBusFactorJson } from '../lib/exportUtils'

export default function DashboardPage() {
  const { repoSlug = '' } = useParams<{ repoSlug: string }>()
  const navigate = useNavigate()
  const mainRef = useRef<HTMLElement>(null)
  const [selected, setSelected] = useState<HealthSnapshot | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [timeRangePreset, setTimeRangePreset] = useState<TimeRangePreset>('all')
  const [customStartDate, setCustomStartDate] = useState<string>('')
  const [customEndDate, setCustomEndDate] = useState<string>('')

  const { startDate, endDate } = useMemo(() => {
    if (timeRangePreset === 'all') {
      return { startDate: undefined, endDate: undefined }
    }
    if (timeRangePreset === 'custom') {
      return {
        startDate: customStartDate ? new Date(customStartDate).toISOString() : undefined,
        endDate: customEndDate
          ? new Date(`${customEndDate}T23:59:59.999Z`).toISOString()
          : undefined,
      }
    }
    const now = new Date()
    let start: Date
    if (timeRangePreset === '7d') {
      start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    } else if (timeRangePreset === '30d') {
      start = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    } else if (timeRangePreset === '1y') {
      start = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000)
    } else {
      return { startDate: undefined, endDate: undefined }
    }
    return {
      startDate: start.toISOString(),
      endDate: now.toISOString(),
    }
  }, [timeRangePreset, customStartDate, customEndDate])

  const [isRescanning, setIsRescanning] = useState(false)
  const [rescanStage, setRescanStage] = useState<string | null>(null)
  const [rescanError, setRescanError] = useState<string | null>(null)

  // Issue #349: Export Report dropdown state
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false)
  const exportMenuRef = useRef<HTMLDivElement>(null)

  // Close export dropdown on outside click
  useEffect(() => {
    if (!isExportMenuOpen) return
    const handleClickOutside = (e: MouseEvent) => {
      if (exportMenuRef.current && !exportMenuRef.current.contains(e.target as Node)) {
        setIsExportMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isExportMenuOpen])

  const handleExportTimeline = () => {
    exportTimelineCsv(commits)
    setIsExportMenuOpen(false)
  }

  const handleExportBusFactor = () => {
    exportBusFactorJson(busState.data)
    setIsExportMenuOpen(false)
  }

  const handleResetTimeRange = () => {
    setTimeRangePreset('all')
    setCustomStartDate('')
    setCustomEndDate('')
  }

  const repoState = useSWR(repoSlug ? ['repo', repoSlug] : null, () => getRepoBySlug(repoSlug))
  const repo = repoState.data
  const repoId = repo?.id
  const timelineState = useSWR(repoId ? ['timeline', repoId, startDate, endDate] : null, () =>
    getHealthTimeline(repoId as number, startDate, endDate)
  )
  const commits = useMemo(() => timelineState.data || [], [timelineState.data])
  const busState = useSWR(repoId ? ['bus-factor', repoId] : null, () =>
    getBusFactor(repoId as number)
  )
  const graphState = useSWR(repoId && selected ? ['graph', repoId, selected.sha] : null, () =>
    getGraph(repoId as number, selected?.sha)
  )
  const usageState = useSWR(repoId ? ['llm-usage', repoId] : null, () =>
    getLLMUsage(repoId as number)
  )

  const handleRescan = async () => {
    if (!repoId || isRescanning) return
    setIsRescanning(true)
    setRescanStage('Initiating rescan...')
    setRescanError(null)

    try {
      await rescanRepo(repoId)
      const es = getIngestProgress(repoId)
      es.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          if (data.stage) setRescanStage(data.stage)
          if (data.status === 'ready' || data.status === 'error' || data.status === 'cancelled') {
            es.close()
            setIsRescanning(false)
            setRescanStage(null)
            if (data.status === 'error') {
              setRescanError(data.error_message || 'Rescan failed.')
            } else {
              repoState.mutate()
              timelineState.mutate()
              busState.mutate()
              graphState.mutate()
              usageState.mutate()
            }
          }
        } catch {
          // ignore json parse error
        }
      }
      es.onerror = () => {
        es.close()
        setIsRescanning(false)
        setRescanStage(null)
      }
    } catch (err) {
      setIsRescanning(false)
      setRescanStage(null)
      setRescanError(err instanceof Error ? err.message : 'Rescan request failed.')
    }
  }
  const selectedChurnPct = selected ? Math.min(Math.max(selected.churn_rate * 100, 0), 100) : 0
  const selectedRiskReasons = selected?.risk_reasons?.slice(0, 4) || []
  const selectedPersistentHotspots = selected?.persistent_hotspots?.slice(0, 3) || []

  useEffect(() => {
    if (!commits.length) {
      setSelected(null)
      return
    }

    const matchingSelection = selected
      ? commits.find((commit) => commit.sha === selected.sha)
      : null
    const nextSelection = matchingSelection || commits[commits.length - 1]

    if (selected !== nextSelection) {
      setSelected(nextSelection)
    }
  }, [commits, selected])

  if (repoState.isLoading) {
    return (
      <div className="min-h-screen bg-[#07080d] flex flex-col items-center justify-center gap-4 text-slate-300">
        <Activity className="w-8 h-8 text-purple-400 animate-spin" />
        <span className="text-sm font-medium animate-pulse">
          Initializing spatial dashboard workspace...
        </span>
      </div>
    )
  }

  if (repoState.error || !repo) {
    return (
      <div className="min-h-screen bg-[#07080d] flex items-center justify-center p-6">
        <div className="glass-panel rounded-[28px] p-8 max-w-md text-center border border-white/10 shadow-2xl space-y-4">
          <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mx-auto">
            <span className="text-rose-400 text-lg">✕</span>
          </div>
          <h3 className="font-head text-[18px] font-semibold text-white">Repository Not Loaded</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            The requested repository slug could not be verified or loaded into the active
            environment workspace.
          </p>
          <button
            onClick={() => navigate('/')}
            className="liquid-button px-5 py-2.5 rounded-full text-xs font-semibold text-white tracking-wide shadow-lg w-full"
          >
            Return to Home
          </button>
        </div>
      </div>
    )
  }

  const latestScore = commits.length ? commits[commits.length - 1].health_score : 0

  return (
    <div className="min-h-screen bg-transparent flex flex-col relative z-10 font-body">
      <div className="w-full fixed top-0 left-0 right-0 z-50 select-none pointer-events-none px-4 sm:px-6 pt-4">
        <nav className="glass-panel rounded-full h-16 px-6 flex items-center justify-between shadow-2xl pointer-events-auto">
          <div className="flex items-center gap-4 min-w-0">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden p-2 -ml-1 text-slate-300 hover:text-white bg-white/5 rounded-full border border-white/5 flex-shrink-0"
              aria-label="Open sidebar"
            >
              <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            <button
              onClick={() => navigate('/')}
              className="font-head text-[18px] font-bold text-white tracking-tight hover:opacity-80 transition-opacity hidden sm:flex items-center gap-2"
            >
              <Layers className="w-5 h-5 text-purple-400" />
              CommitIQ
            </button>

            <span className="text-white/10 hidden sm:block">/</span>

            <div className="flex items-center gap-2 bg-white/5 border border-white/5 px-3 py-1.5 rounded-full max-w-[150px] sm:max-w-[240px]">
              <GitBranch className="w-3.5 h-3.5 text-purple-300 flex-shrink-0" />
              <span className="font-mono text-xs text-slate-200 font-semibold truncate select-all">
                {repo.name}
              </span>
            </div>

            <HealthBadge score={latestScore} size="md" />
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => navigate(`/compare?base=${repo.repo_slug}`)}
              className="text-xs font-semibold text-sky-200 hover:text-white bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 rounded-full px-4 py-2 transition-all flex items-center gap-1.5"
              title="Compare this repository with another codebase side-by-side"
            >
              <ArrowLeftRight className="w-3.5 h-3.5 text-sky-300" />
              <span>Compare</span>
            </button>
            <button
              onClick={handleRescan}
              disabled={isRescanning}
              className="text-xs font-semibold text-purple-200 hover:text-white bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 rounded-full px-4 py-2 transition-all flex items-center gap-1.5 disabled:opacity-50"
              title="Check for new remote commits and update metrics without wiping historical data"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 ${isRescanning ? 'animate-spin text-purple-400' : ''}`}
              />
              <span>{isRescanning ? rescanStage || 'Updating...' : 'Update Analysis'}</span>
            </button>

            <div ref={exportMenuRef} className="relative">
              <button
                onClick={() => setIsExportMenuOpen(!isExportMenuOpen)}
                data-testid="export-report-button"
                disabled={commits.length === 0 && !busState.data?.modules?.length}
                className="text-xs font-semibold text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-4 py-2 transition-all flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
                title="Export timeline and bus factor metrics as CSV / JSON"
                aria-haspopup="menu"
                aria-expanded={isExportMenuOpen}
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export</span>
                <ChevronDown
                  className={`w-3 h-3 transition-transform ${isExportMenuOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {isExportMenuOpen && (
                <div
                  role="menu"
                  data-testid="export-dropdown-menu"
                  className="absolute right-0 top-full mt-2 w-64 glass-panel rounded-2xl border border-white/10 shadow-2xl overflow-hidden z-50"
                >
                  <div className="px-4 py-2.5 border-b border-white/5">
                    <span className="font-head text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Export Report
                    </span>
                  </div>
                  <button
                    onClick={handleExportTimeline}
                    disabled={commits.length === 0}
                    data-testid="export-timeline-csv"
                    className="w-full text-left px-4 py-3 hover:bg-white/5 transition-colors flex items-start gap-3 disabled:opacity-40 disabled:cursor-not-allowed"
                    role="menuitem"
                  >
                    <FileText className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-slate-100">Timeline CSV</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        {commits.length > 0
                          ? `${commits.length} commit(s) — commit_health_timeline.csv`
                          : 'No commits loaded'}
                      </div>
                    </div>
                  </button>
                  <button
                    onClick={handleExportBusFactor}
                    disabled={!busState.data?.modules?.length}
                    data-testid="export-busfactor-json"
                    className="w-full text-left px-4 py-3 hover:bg-white/5 transition-colors flex items-start gap-3 disabled:opacity-40 disabled:cursor-not-allowed"
                    role="menuitem"
                  >
                    <FileJson className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-slate-100">Bus Factor JSON</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        {busState.data?.modules?.length
                          ? `${busState.data.modules.length} module(s) — bus_factor_index.json`
                          : 'No bus factor data'}
                      </div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => navigate('/')}
              className="text-xs font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-4 py-2 transition-all"
            >
              New Repository
            </button>
          </div>
        </nav>
      </div>

      <div className="flex flex-1 overflow-hidden relative pt-[88px]">
        {isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/65 z-35 md:hidden transition-opacity duration-300 backdrop-blur-sm"
          />
        )}

        <aside
          className={`w-80 flex-shrink-0 flex flex-col overflow-hidden bg-[#0a0b10]/40 backdrop-blur-2xl transition-transform duration-300 ease-in-out z-40 border-r border-white/5
          fixed md:static inset-y-0 left-0 pt-[88px] md:pt-0
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
        >
          <div className="p-5 border-b border-white/5 flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <div className="font-mono text-xs font-bold text-white truncate">{repo.name}</div>
              <div className="text-slate-400 text-[10px] mt-1 font-semibold uppercase tracking-wider">
                {repo.analyzed_commits} commits compiled • {repo.active_contributors_count ?? 0}{' '}
                active contributors
              </div>
            </div>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="md:hidden p-1.5 -mr-1.5 text-slate-400 hover:text-white bg-white/5 rounded-full transition-colors"
              aria-label="Close sidebar"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="p-5 border-b border-white/5 bg-white/[0.01]">
            <CostMeter
              usage={usageState.data}
              loading={usageState.isLoading}
              error={usageState.error?.message}
            />
          </div>

          <div className="flex-grow overflow-hidden pt-5">
            <CommitList
              commits={commits}
              repoSlug={repo.repo_slug}
              selectedSha={selected?.sha || null}
              onSelect={(commit) => {
                setSelected(commit)
                setIsSidebarOpen(false)
              }}
            />
          </div>
        </aside>

        <main
          ref={mainRef}
          className="flex-grow overflow-y-auto p-4 sm:p-6 space-y-6 relative z-10"
        >
          {rescanError && (
            <div className="glass-panel rounded-[20px] p-4 text-rose-300 border border-rose-500/30 bg-rose-500/10 flex items-center justify-between text-xs font-medium">
              <span>Failed to update repository analysis: {rescanError}</span>
              <button
                onClick={() => setRescanError(null)}
                className="text-slate-400 hover:text-white px-2 py-1 rounded bg-white/5"
              >
                Dismiss
              </button>
            </div>
          )}

          <TimeRangeSelector
            selectedPreset={timeRangePreset}
            onSelectPreset={setTimeRangePreset}
            customStartDate={customStartDate}
            customEndDate={customEndDate}
            onCustomDateChange={(start, end) => {
              setCustomStartDate(start)
              setCustomEndDate(end)
            }}
            onReset={handleResetTimeRange}
          />

          {timelineState.isLoading ? (
            <HealthTimelineSkeleton />
          ) : timelineState.error ? (
            <div className="glass-panel rounded-[28px] p-6 text-rose-300 border border-rose-500/20 bg-rose-500/10">
              Could not load architectural health timeline datasets.
            </div>
          ) : commits.length === 0 ? (
            <div className="glass-panel rounded-[28px] p-6 text-slate-500">
              No analyzed commits are currently compiled for this repository workspace.
            </div>
          ) : (
            <HealthTimeline
              commits={commits}
              repoSlug={repo.repo_slug}
              selectedSha={selected?.sha}
              onSelectCommit={setSelected}
            />
          )}

          {selected && (
            <div className="glass-panel rounded-[28px] p-6 shadow-2xl relative border border-white/10 overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/5 rounded-full blur-[80px] pointer-events-none" />

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-white/5 pb-4 mb-5 gap-4">
                <div className="min-w-0">
                  <span className="font-mono text-[10px] font-bold text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/15">
                    {selected.sha.slice(0, 12)}
                  </span>
                  <h3 className="font-head text-[18px] font-semibold text-white tracking-tight truncate mt-2">
                    {sanitizeCommitMessage(selected.message)}
                  </h3>
                </div>
                <button
                  onClick={() => navigate(`/dashboard/${repo.repo_slug}/commit/${selected.sha}`)}
                  className="text-xs font-bold text-purple-300 hover:text-white bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/15 rounded-full px-4.5 py-2 transition-all flex-shrink-0"
                >
                  Inspect Snapshot Details
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {[
                  {
                    label: 'Codebase Complexity',
                    value: selected.avg_complexity === 0 ? '-' : selected.avg_complexity.toFixed(1),
                    unit:
                      selected.avg_complexity === 0 ? 'no code changed' : 'Avg cyclomatic score',
                    icon: <BarChart2 className="w-4.5 h-4.5 text-rose-400" />,
                    tooltipTitle: 'Cyclomatic Complexity',
                    tooltipDescription:
                      'Measures structural code complexity by counting linearly independent execution paths through functions. Lower complexity indicates more readable, testable, and maintainable code.',
                    tooltipFormula:
                      'M = E - N + 2P. Subscore = max(0, 100 - min(avg_complexity × 5, 100)), with a 10-point deduction if complexity jumped >20% from the prior commit.',
                    tooltipWeight: '25% of Health Score',
                    tooltipThresholds: '≤ 5.0 healthy, 5.1–10.0 moderate, > 10.0 high risk',
                    tooltipAlign: 'left' as const,
                  },
                  {
                    label: 'Commit Churn',
                    value: `${selectedChurnPct.toFixed(0)}%`,
                    unit: `${selected.num_files_changed} modified components`,
                    icon: <Activity className="w-4.5 h-4.5 text-sky-400" />,
                    tooltipTitle: 'Commit Churn Rate',
                    tooltipDescription:
                      'Measures code volatility by calculating the percentage of modified lines (insertions and deletions) relative to total codebase size. High churn suggests large or volatile modifications.',
                    tooltipFormula:
                      'Churn Rate = (insertions + deletions) / total_loc. Subscore = max(0, 100 - (churn_rate × 100)), with a 15-point penalty if changes touch persistent hotspot files.',
                    tooltipWeight: '20% of Health Score',
                    tooltipThresholds: '< 25% healthy, 25%–50% moderate, > 50% high volatility',
                    tooltipAlign: 'center' as const,
                  },
                  {
                    label: 'Minimum Bus Factor',
                    value: String(selected.bus_factor_min),
                    unit: 'Crucial owners limit',
                    icon: <Compass className="w-4.5 h-4.5 text-emerald-400" />,
                    tooltipTitle: 'Minimum Bus Factor',
                    tooltipDescription:
                      'The minimum number of key contributors whose sudden departure would cause critical knowledge loss for a repository module. A bus factor of 1 represents a single point of failure.',
                    tooltipFormula:
                      'Subscore = min(bus_factor_min × 20, 100). Minimum bus factor ≤ 1 is critical risk, 2 is high risk, and ≥ 5 is considered resilient.',
                    tooltipWeight: '20% of Health Score',
                    tooltipThresholds: '1 critical, 2 high risk, 3–4 moderate, ≥ 5 resilient',
                    tooltipAlign: 'center' as const,
                  },
                  {
                    label: 'Semantic Drift',
                    value: `${(selected.subscores?.semantic_drift ?? selected.semantic_health_score ?? 100).toFixed(0)}`,
                    unit: `${selected.avg_semantic_drift?.toFixed(2) ?? '0.00'} avg drift`,
                    badge:
                      selected.semantic_drift_method === 'graphcodebert'
                        ? 'GraphCodeBERT'
                        : undefined,
                    icon: <Layers className="w-4.5 h-4.5 text-purple-400" />,
                    tooltipTitle: 'Semantic Drift',
                    tooltipDescription:
                      "Measures semantic alignment between the developer's commit message intent and the actual code diff modifications using NLP embeddings (e.g. GraphCodeBERT).",
                    tooltipFormula:
                      'Subscore = max(0, min(semantic_health_score, 100)) based on cosine similarity and semantic distance between intent and code changes.',
                    tooltipWeight: '20% of Health Score',
                    tooltipThresholds: '≥ 80 aligned, 60–79 minor drift, < 60 high semantic drift',
                    tooltipAlign: 'right' as const,
                  },
                ].map((metric) => (
                  <div
                    key={metric.label}
                    className="bg-white/5 border border-white/5 hover:border-white/10 rounded-[20px] p-5 transition-all shadow-inner"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="font-head text-[10px] text-slate-400 font-semibold uppercase tracking-wider truncate">
                          {metric.label}
                        </span>
                        <MetricTooltip
                          title={metric.tooltipTitle}
                          description={metric.tooltipDescription}
                          formula={metric.tooltipFormula}
                          weight={metric.tooltipWeight}
                          thresholds={metric.tooltipThresholds}
                          align={metric.tooltipAlign}
                        />
                        {metric.badge && (
                          <span className="inline-flex items-center gap-1 text-[8px] px-1.5 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 font-mono uppercase flex-shrink-0">
                            <span className="w-1 h-1 rounded-full bg-purple-400" />
                            {metric.badge}
                          </span>
                        )}
                      </div>
                      {metric.icon}
                    </div>
                    <div className="font-head text-[36px] font-extralight text-white tracking-tight Outfit">
                      {metric.value}
                    </div>
                    <div className="text-slate-500 text-[11px] font-medium mt-1">{metric.unit}</div>
                  </div>
                ))}
              </div>
              {(selectedRiskReasons.length > 0 || selectedPersistentHotspots.length > 0) && (
                <div className="mt-4 grid grid-cols-1 xl:grid-cols-2 gap-4">
                  {selectedRiskReasons.length > 0 && (
                    <div className="border border-white/5 bg-white/[0.03] rounded-[20px] p-4">
                      <div className="font-head text-[10px] text-slate-400 font-semibold uppercase tracking-wider mb-3">
                        Top Risk Reasons
                      </div>
                      <div className="space-y-2">
                        {selectedRiskReasons.map((reason) => (
                          <div
                            key={`${reason.code}-${reason.label}`}
                            className="flex items-start justify-between gap-3 text-xs"
                          >
                            <div className="min-w-0">
                              <div className="text-slate-100 font-semibold">{reason.label}</div>
                              <div className="text-slate-500 leading-relaxed mt-0.5">
                                {reason.detail}
                              </div>
                            </div>
                            <span
                              className={`flex-shrink-0 rounded-full px-2 py-0.5 font-mono text-[9px] uppercase border ${
                                reason.severity === 'critical'
                                  ? 'bg-rose-500/10 text-rose-300 border-rose-500/20'
                                  : reason.severity === 'high'
                                    ? 'bg-orange-500/10 text-orange-300 border-orange-500/20'
                                    : 'bg-amber-500/10 text-amber-300 border-amber-500/20'
                              }`}
                            >
                              {reason.severity}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedPersistentHotspots.length > 0 && (
                    <div className="border border-white/5 bg-white/[0.03] rounded-[20px] p-4">
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <div className="font-head text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                          Persistent Hotspots
                        </div>
                        <span className="font-mono text-[10px] text-purple-300">
                          {(selected.hotspot_persistence_score || 0).toFixed(0)}/100
                        </span>
                      </div>
                      <div className="space-y-2">
                        {selectedPersistentHotspots.map((hotspot) => (
                          <div
                            key={hotspot.path}
                            className="flex items-center justify-between gap-3 text-xs"
                          >
                            <span className="font-mono text-slate-200 truncate min-w-0">
                              {hotspot.path}
                            </span>
                            <span className="flex-shrink-0 text-slate-500">
                              {hotspot.recent_commit_count} commits / cx{' '}
                              {hotspot.complexity.toFixed(1)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
              <div className="mt-4">
                <NarrativeCard repoId={repoId as number} commitSha={selected.sha} />
              </div>
            </div>
          )}

          <div className="w-full">
            {graphState.error ? (
              <div className="glass-panel rounded-[28px] p-6 text-rose-300 border border-rose-500/20 bg-rose-500/10">
                Could not construct software import dependency landscape.
              </div>
            ) : (
              <GraphExplorer
                graphData={graphState.data}
                selectedSha={selected?.sha || null}
                commits={commits}
                onSelectCommit={setSelected}
              />
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {repoId && <CycleTimeDashboard repoId={repoId} />}
            {repoId && <DoraMetricsDashboard repoId={repoId} />}
          </div>

          {repoId && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              <div className="w-full">
                <TeamHealthDashboard repoId={repoId} />
              </div>
              <div>
                <BusFactorTable modules={busState.data?.modules || []} />
                {(selected?.bus_factor_min === 1 ||
                  (busState.data?.modules &&
                    busState.data.modules.some((m) => m.contributor_count === 1))) && (
                  <div
                    data-testid="bus-factor-warning"
                    className="mt-4 p-4 rounded-[20px] bg-amber-500/10 border border-amber-500/30 text-amber-200 flex items-start gap-3 text-xs shadow-lg backdrop-blur-xl"
                  >
                    <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-head font-semibold text-amber-300 block text-xs mb-0.5 uppercase tracking-wider">
                        Single Point of Failure Warning
                      </span>
                      <p className="text-slate-300 leading-relaxed text-[11px]">
                        The computed minimum bus factor for this repository is <strong>1</strong>.
                        Key modules depend entirely on a single principal contributor, leaving the
                        repository vulnerable to a single-point-of-failure if that contributor
                        becomes unavailable.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {repoId && (
            <HotspotMap
              repoId={repoId}
              sha={selected?.sha || null}
              startDate={startDate}
              endDate={endDate}
            />
          )}
        </main>
      </div>
      <ScrollToTop containerRef={mainRef} />
    </div>
  )
}
