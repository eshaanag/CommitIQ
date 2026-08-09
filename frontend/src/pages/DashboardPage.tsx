import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useSWR from 'swr'
import { getBusFactor, getGraph, getHealthTimeline, getLLMUsage, getRepoBySlug } from '../lib/api'
import type { HealthSnapshot } from '../types'
import { BusFactorTable } from '../components/BusFactorTable'
import { CommitList } from '../components/CommitList'
import { CostMeter } from '../components/CostMeter'
import { GraphExplorer } from '../components/GraphExplorer'
import { HealthTimeline } from '../components/HealthTimeline'
import { HotspotMap } from '../components/HotspotMap'
import { NarrativeCard } from '../components/NarrativeCard'
import { TimeRangeSelector, type TimeRangePreset } from '../components/TimeRangeSelector'
import { HealthBadge } from '../components/ui/HealthBadge'
import { ThemeToggle } from '../components/ui/ThemeToggle'
import { ScrollToTop } from '../components/ui/ScrollToTop'
import { Layers, Compass, BarChart2, Activity, GitBranch, AlertTriangle } from 'lucide-react'
import { sanitizeCommitMessage } from '../lib/utils'

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
                {repo.analyzed_commits} commits compiled
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
          <TimeRangeSelector
            selectedPreset={timeRangePreset}
            onSelectPreset={setTimeRangePreset}
            customStartDate={customStartDate}
            customEndDate={customEndDate}
            onCustomDateChange={(start, end) => {
              setCustomStartDate(start)
              setCustomEndDate(end)
            }}
          />

          {timelineState.isLoading ? (
            <div className="glass-panel rounded-[28px] p-6 h-64 flex items-center justify-center text-slate-400 border border-white/10">
              <Activity className="w-6 h-6 text-purple-400 animate-spin mr-2" />
              <span className="text-xs font-medium animate-pulse">Loading health timeline...</span>
            </div>
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
                  },
                  {
                    label: 'Commit Churn',
                    value: `${selectedChurnPct.toFixed(0)}%`,
                    unit: `${selected.num_files_changed} modified components`,
                    icon: <Activity className="w-4.5 h-4.5 text-sky-400" />,
                  },
                  {
                    label: 'Minimum Bus Factor',
                    value: String(selected.bus_factor_min),
                    unit: 'Crucial owners limit',
                    icon: <Compass className="w-4.5 h-4.5 text-emerald-400" />,
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
                  },
                ].map((metric) => (
                  <div
                    key={metric.label}
                    className="bg-white/5 border border-white/5 hover:border-white/10 rounded-[20px] p-5 transition-all shadow-inner"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-head text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                          {metric.label}
                        </span>
                        {metric.badge && (
                          <span className="inline-flex items-center gap-1 text-[8px] px-1.5 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 font-mono uppercase">
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
            {busState.error ? (
              <div className="glass-panel rounded-[28px] p-6 text-rose-300 border border-rose-500/20 bg-rose-500/10">
                Could not retrieve module ownership datasets.
              </div>
            ) : (
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
            )}

            {repoId && (
              <HotspotMap
                repoId={repoId}
                sha={selected?.sha || null}
                startDate={startDate}
                endDate={endDate}
              />
            )}
          </div>
        </main>
      </div>
      <ScrollToTop containerRef={mainRef} />
    </div>
  )
}
