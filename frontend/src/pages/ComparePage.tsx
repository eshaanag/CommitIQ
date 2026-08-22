import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import useSWR from 'swr'
import {
  Layers,
  ArrowLeftRight,
  Download,
  ChevronDown,
  FileText,
  FileJson,
  Activity,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Minus,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Users,
  Flame,
  Cpu,
  Star,
  Code2,
} from 'lucide-react'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts'
import { compareRepos, listRepos } from '../lib/api'
import { exportComparisonReportCsv, exportComparisonReportJson } from '../lib/exportUtils'
import { HealthBadge } from '../components/ui/HealthBadge'
import { ThemeToggle } from '../components/ui/ThemeToggle'
import type { RepoCompareResponse } from '../types'

export default function ComparePage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  const initialBase = searchParams.get('base') || ''
  const initialHead = searchParams.get('head') || ''

  const [baseSlug, setBaseSlug] = useState<string>(initialBase)
  const [headSlug, setHeadSlug] = useState<string>(initialHead)
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false)
  const exportMenuRef = useRef<HTMLDivElement>(null)

  // Fetch all available repositories for the selector dropdowns
  const { data: repos = [], isLoading: isReposLoading } = useSWR('repos-list', () => listRepos())

  // Set default repositories if not specified in URL and repos are available
  useEffect(() => {
    if (repos.length >= 2) {
      if (!baseSlug && !headSlug) {
        setBaseSlug(repos[0].repo_slug)
        setHeadSlug(repos[1].repo_slug)
        setSearchParams({ base: repos[0].repo_slug, head: repos[1].repo_slug })
      } else if (!baseSlug && repos[0]) {
        setBaseSlug(repos[0].repo_slug)
        setSearchParams({ base: repos[0].repo_slug, head: headSlug })
      } else if (!headSlug && repos[1]) {
        setHeadSlug(repos[1].repo_slug)
        setSearchParams({ base: baseSlug, head: repos[1].repo_slug })
      }
    } else if (repos.length === 1 && !baseSlug) {
      setBaseSlug(repos[0].repo_slug)
    }
  }, [repos, baseSlug, headSlug, setSearchParams])

  // Sync state changes to searchParams
  const handleSelectBase = (slug: string) => {
    setBaseSlug(slug)
    setSearchParams({ base: slug, head: headSlug })
  }

  const handleSelectHead = (slug: string) => {
    setHeadSlug(slug)
    setSearchParams({ base: baseSlug, head: slug })
  }

  const handleSwap = () => {
    const temp = baseSlug
    setBaseSlug(headSlug)
    setHeadSlug(temp)
    setSearchParams({ base: headSlug, head: temp })
  }

  // Fetch comparison data when both slugs are provided
  const shouldFetch = Boolean(baseSlug && headSlug && baseSlug !== headSlug)
  const {
    data: comparison,
    error: compareError,
    isLoading: isCompareLoading,
  } = useSWR<RepoCompareResponse>(shouldFetch ? ['repos-compare', baseSlug, headSlug] : null, () =>
    compareRepos(baseSlug, headSlug)
  )

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

  // Timeline comparative chart dataset preparation
  const timelineChartData = useMemo(() => {
    if (!comparison) return []
    const baseTimeline = comparison.base.timeline_summary || []
    const headTimeline = comparison.head.timeline_summary || []

    const maxLen = Math.max(baseTimeline.length, headTimeline.length)
    if (maxLen === 0) return []

    const data = []
    for (let i = 0; i < maxLen; i++) {
      const bSnap = baseTimeline[i]
      const hSnap = headTimeline[i]
      data.push({
        index: i + 1,
        baseScore: bSnap ? Math.round(bSnap.health_score * 10) / 10 : null,
        headScore: hSnap ? Math.round(hSnap.health_score * 10) / 10 : null,
        baseSha: bSnap?.sha?.slice(0, 7) || '',
        headSha: hSnap?.sha?.slice(0, 7) || '',
        baseComplexity: bSnap?.avg_complexity ? Math.round(bSnap.avg_complexity * 10) / 10 : null,
        headComplexity: hSnap?.avg_complexity ? Math.round(hSnap.avg_complexity * 10) / 10 : null,
      })
    }
    return data
  }, [comparison])

  // Radar comparative chart dataset preparation for subscores
  const radarChartData = useMemo(() => {
    if (!comparison) return []
    const b = comparison.base.metrics_summary
    const h = comparison.head.metrics_summary

    return [
      {
        subject: 'Health Score',
        base: Math.round(b.health_score),
        head: Math.round(h.health_score),
        fullMark: 100,
      },
      {
        subject: 'Complexity Score',
        base: Math.round(b.cc_score || Math.max(0, 100 - b.avg_complexity * 10)),
        head: Math.round(h.cc_score || Math.max(0, 100 - h.avg_complexity * 10)),
        fullMark: 100,
      },
      {
        subject: 'Churn Resilience',
        base: Math.round(b.churn_score || Math.max(0, 100 - b.churn_rate * 200)),
        head: Math.round(h.churn_score || Math.max(0, 100 - h.churn_rate * 200)),
        fullMark: 100,
      },
      {
        subject: 'Bus Factor Risk',
        base: Math.round(b.bus_score || Math.min(100, b.bus_factor_min * 30)),
        head: Math.round(h.bus_score || Math.min(100, h.bus_factor_min * 30)),
        fullMark: 100,
      },
      {
        subject: 'LOC & Deps',
        base: Math.round(b.loc_score || 85),
        head: Math.round(h.loc_score || 85),
        fullMark: 100,
      },
      {
        subject: 'Semantic Health',
        base: Math.round(b.semantic_health_score ?? 100),
        head: Math.round(h.semantic_health_score ?? 100),
        fullMark: 100,
      },
    ]
  }, [comparison])

  const renderDeltaPill = (val: number, isHigherBetter = true, suffix = '', precision = 1) => {
    if (val === 0 || isNaN(val)) {
      return (
        <span className="inline-flex items-center gap-1 font-mono text-[11px] text-slate-400 bg-white/5 px-2 py-0.5 rounded-full border border-white/5">
          <Minus className="w-3 h-3" /> 0{suffix}
        </span>
      )
    }

    const isGood = isHigherBetter ? val > 0 : val < 0
    const sign = val > 0 ? '+' : ''
    const formatted = `${sign}${val.toFixed(precision)}${suffix}`

    return (
      <span
        className={`inline-flex items-center gap-1 font-mono text-[11px] font-semibold px-2 py-0.5 rounded-full border ${
          isGood
            ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
            : 'bg-rose-500/10 text-rose-300 border-rose-500/20'
        }`}
      >
        {isGood ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
        {formatted}
      </span>
    )
  }

  return (
    <div className="min-h-screen bg-transparent flex flex-col relative z-10 font-body">
      {/* Top Floating Glass Navigation Header */}
      <div className="w-full fixed top-0 left-0 right-0 z-50 select-none pointer-events-none px-4 sm:px-6 pt-4">
        <nav className="glass-panel rounded-full h-16 px-6 flex items-center justify-between shadow-2xl pointer-events-auto">
          <div className="flex items-center gap-4 min-w-0">
            <button
              onClick={() => navigate('/')}
              className="font-head text-[18px] font-bold text-white tracking-tight hover:opacity-80 transition-opacity flex items-center gap-2"
            >
              <Layers className="w-5 h-5 text-purple-400" />
              CommitIQ
            </button>

            <span className="text-white/10 hidden sm:block">/</span>

            <div className="flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 px-3.5 py-1.5 rounded-full">
              <ArrowLeftRight className="w-3.5 h-3.5 text-purple-300" />
              <span className="font-head text-xs font-semibold text-purple-200">
                Repository Comparison
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />

            {/* Export Comparison Dropdown */}
            <div ref={exportMenuRef} className="relative">
              <button
                onClick={() => setIsExportMenuOpen(!isExportMenuOpen)}
                data-testid="export-compare-report-button"
                disabled={!comparison}
                className="text-xs font-semibold text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-4 py-2 transition-all flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
                title="Export comparison report as CSV or JSON"
                aria-haspopup="menu"
                aria-expanded={isExportMenuOpen}
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Report</span>
                <ChevronDown
                  className={`w-3 h-3 transition-transform ${isExportMenuOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {isExportMenuOpen && comparison && (
                <div
                  role="menu"
                  data-testid="export-compare-menu"
                  className="absolute right-0 top-full mt-2 w-64 glass-panel rounded-2xl border border-white/10 shadow-2xl overflow-hidden z-50"
                >
                  <div className="px-4 py-2.5 border-b border-white/5">
                    <span className="font-head text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Export Format
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      exportComparisonReportCsv(comparison)
                      setIsExportMenuOpen(false)
                    }}
                    data-testid="export-compare-csv"
                    className="w-full text-left px-4 py-3 hover:bg-white/5 transition-colors flex items-start gap-3"
                    role="menuitem"
                  >
                    <FileText className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-slate-100">Comparison CSV</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        Tabular side-by-side metric matrix
                      </div>
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      exportComparisonReportJson(comparison)
                      setIsExportMenuOpen(false)
                    }}
                    data-testid="export-compare-json"
                    className="w-full text-left px-4 py-3 hover:bg-white/5 transition-colors flex items-start gap-3"
                    role="menuitem"
                  >
                    <FileJson className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-slate-100">Comparison JSON</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        Full machine-readable benchmark payload
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
              Analyze New
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-[96px] pb-16 space-y-6">
        {/* Repository Selectors Header Panel */}
        <section className="glass-panel rounded-[28px] p-6 border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Base Repo Selector */}
            <div className="w-full md:w-[45%] space-y-2">
              <label className="block font-head text-[11px] font-bold text-purple-300 uppercase tracking-wider">
                Base Repository (Reference)
              </label>
              <div className="relative">
                <select
                  value={baseSlug}
                  onChange={(e) => handleSelectBase(e.target.value)}
                  disabled={isReposLoading}
                  data-testid="base-repo-select"
                  className="w-full appearance-none glass-panel bg-[#0d0f18]/80 text-white font-mono text-sm px-4 py-3 rounded-2xl border border-white/10 focus:border-purple-500/50 outline-none pr-10 cursor-pointer"
                >
                  <option value="" disabled>
                    {isReposLoading ? 'Loading repositories...' : 'Select base repository'}
                  </option>
                  {repos.map((r) => (
                    <option
                      key={r.repo_slug}
                      value={r.repo_slug}
                      className="bg-[#0d0f18] text-white"
                    >
                      {r.name} ({r.repo_slug})
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Swap Button */}
            <div className="flex items-center justify-center pt-2 md:pt-6">
              <button
                onClick={handleSwap}
                disabled={!baseSlug || !headSlug}
                data-testid="swap-repos-button"
                className="w-10 h-10 rounded-full glass-panel flex items-center justify-center hover:bg-white/10 transition-all border border-white/10 active:scale-95 disabled:opacity-40"
                title="Swap Base and Comparison repositories"
                aria-label="Swap repositories"
              >
                <ArrowLeftRight className="w-4 h-4 text-purple-300" />
              </button>
            </div>

            {/* Head/Compare Repo Selector */}
            <div className="w-full md:w-[45%] space-y-2">
              <label className="block font-head text-[11px] font-bold text-sky-300 uppercase tracking-wider">
                Compare Repository (Target)
              </label>
              <div className="relative">
                <select
                  value={headSlug}
                  onChange={(e) => handleSelectHead(e.target.value)}
                  disabled={isReposLoading}
                  data-testid="head-repo-select"
                  className="w-full appearance-none glass-panel bg-[#0d0f18]/80 text-white font-mono text-sm px-4 py-3 rounded-2xl border border-white/10 focus:border-sky-500/50 outline-none pr-10 cursor-pointer"
                >
                  <option value="" disabled>
                    {isReposLoading ? 'Loading repositories...' : 'Select comparison repository'}
                  </option>
                  {repos.map((r) => (
                    <option
                      key={r.repo_slug}
                      value={r.repo_slug}
                      className="bg-[#0d0f18] text-white"
                    >
                      {r.name} ({r.repo_slug})
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>
        </section>

        {/* Validation / State Messages */}
        {baseSlug && headSlug && baseSlug === headSlug && (
          <div className="glass-panel rounded-[20px] p-5 text-amber-300 border border-amber-500/30 bg-amber-500/10 flex items-center gap-3 text-xs font-medium">
            <AlertCircle className="w-5 h-5 flex-shrink-0 text-amber-400" />
            <span>
              Please select two different repositories to generate a meaningful comparative
              analysis.
            </span>
          </div>
        )}

        {compareError && (
          <div className="glass-panel rounded-[20px] p-5 text-rose-300 border border-rose-500/30 bg-rose-500/10 flex items-center justify-between text-xs font-medium">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-400" />
              <span>Failed to fetch repository comparison: {compareError.message}</span>
            </div>
            <button
              onClick={() => navigate('/demo')}
              className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold"
            >
              Analyze Demo Repo
            </button>
          </div>
        )}

        {isCompareLoading && (
          <div className="glass-panel rounded-[28px] p-12 flex flex-col items-center justify-center gap-4 text-slate-300 border border-white/10">
            <Activity className="w-8 h-8 text-purple-400 animate-spin" />
            <span className="text-sm font-medium animate-pulse">
              Computing side-by-side architectural metrics & health indicators...
            </span>
          </div>
        )}

        {/* Comparison Dashboard Display */}
        {comparison && !isCompareLoading && (
          <>
            {/* Verdict & Executive Summary Banner */}
            <section
              data-testid="comparison-verdict-banner"
              className="glass-panel rounded-[28px] p-6 border border-purple-500/20 bg-gradient-to-r from-purple-900/10 via-transparent to-sky-900/10 shadow-2xl relative overflow-hidden"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <ShieldCheck className="w-5 h-5 text-purple-300" />
                </div>
                <div className="space-y-1 min-w-0">
                  <span className="font-head text-[10px] font-bold text-purple-300 uppercase tracking-wider">
                    Executive Health Verdict
                  </span>
                  <h3 className="font-head text-[17px] font-semibold text-white leading-snug">
                    {comparison.verdict}
                  </h3>
                </div>
              </div>
            </section>

            {/* Side-by-Side Hero Repository Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Base Repo Card */}
              <div
                data-testid="base-repo-card"
                className="glass-panel rounded-[28px] p-6 border border-purple-500/20 shadow-xl space-y-4 relative overflow-hidden"
              >
                <div className="flex items-center justify-between gap-3 border-b border-white/5 pb-4">
                  <div className="min-w-0">
                    <span className="font-mono text-[10px] text-purple-300 bg-purple-500/10 px-2.5 py-0.5 rounded-full border border-purple-500/20 font-bold uppercase">
                      Base (Reference)
                    </span>
                    <h4 className="font-head text-lg font-bold text-white truncate mt-1.5">
                      {comparison.base.repo.name}
                    </h4>
                  </div>
                  <HealthBadge score={comparison.base.metrics_summary.health_score} size="lg" />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
                    <div className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                      <Code2 className="w-3 h-3 text-purple-300" /> Language
                    </div>
                    <div className="text-sm font-semibold text-white mt-1 truncate">
                      {comparison.base.repo.github_language || 'Various'}
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
                    <div className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-300" /> Stars
                    </div>
                    <div className="text-sm font-semibold text-white mt-1">
                      {comparison.base.repo.github_stars?.toLocaleString() || '0'}
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
                    <div className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                      <Users className="w-3 h-3 text-emerald-300" /> Contributors
                    </div>
                    <div className="text-sm font-semibold text-white mt-1">
                      {comparison.base.metrics_summary.active_contributors}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => navigate(`/dashboard/${comparison.base.repo.repo_slug}`)}
                  className="w-full text-center py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-purple-300 hover:text-white transition-all border border-white/5"
                >
                  View Base Full Dashboard →
                </button>
              </div>

              {/* Head Repo Card */}
              <div
                data-testid="head-repo-card"
                className="glass-panel rounded-[28px] p-6 border border-sky-500/20 shadow-xl space-y-4 relative overflow-hidden"
              >
                <div className="flex items-center justify-between gap-3 border-b border-white/5 pb-4">
                  <div className="min-w-0">
                    <span className="font-mono text-[10px] text-sky-300 bg-sky-500/10 px-2.5 py-0.5 rounded-full border border-sky-500/20 font-bold uppercase">
                      Compare (Target)
                    </span>
                    <h4 className="font-head text-lg font-bold text-white truncate mt-1.5">
                      {comparison.head.repo.name}
                    </h4>
                  </div>
                  <HealthBadge score={comparison.head.metrics_summary.health_score} size="lg" />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
                    <div className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                      <Code2 className="w-3 h-3 text-sky-300" /> Language
                    </div>
                    <div className="text-sm font-semibold text-white mt-1 truncate">
                      {comparison.head.repo.github_language || 'Various'}
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
                    <div className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-300" /> Stars
                    </div>
                    <div className="text-sm font-semibold text-white mt-1">
                      {comparison.head.repo.github_stars?.toLocaleString() || '0'}
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
                    <div className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                      <Users className="w-3 h-3 text-emerald-300" /> Contributors
                    </div>
                    <div className="text-sm font-semibold text-white mt-1">
                      {comparison.head.metrics_summary.active_contributors}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => navigate(`/dashboard/${comparison.head.repo.repo_slug}`)}
                  className="w-full text-center py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-sky-300 hover:text-white transition-all border border-white/5"
                >
                  View Target Full Dashboard →
                </button>
              </div>
            </div>

            {/* Core Health Indicators Comparison Grid */}
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-head text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Zap className="w-4 h-4 text-purple-400" /> Health Indicators Side-by-Side
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Health Score Metric Card */}
                <div className="glass-panel rounded-[24px] p-5 border border-white/5 space-y-2">
                  <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
                    <span>Overall Health</span>
                    {renderDeltaPill(comparison.deltas.health_score_delta, true, ' pts', 1)}
                  </div>
                  <div className="flex items-baseline justify-between pt-1">
                    <div>
                      <div className="text-[10px] text-purple-300 font-mono">BASE</div>
                      <div className="font-head text-2xl font-bold text-white">
                        {comparison.base.metrics_summary.health_score.toFixed(1)}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-sky-300 font-mono">TARGET</div>
                      <div className="font-head text-2xl font-bold text-white">
                        {comparison.head.metrics_summary.health_score.toFixed(1)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Average Complexity Metric Card */}
                <div className="glass-panel rounded-[24px] p-5 border border-white/5 space-y-2">
                  <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
                    <span className="flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-rose-400" /> Avg Complexity
                    </span>
                    {renderDeltaPill(comparison.deltas.avg_complexity_delta, false, '', 1)}
                  </div>
                  <div className="flex items-baseline justify-between pt-1">
                    <div>
                      <div className="text-[10px] text-purple-300 font-mono">BASE</div>
                      <div className="font-head text-2xl font-bold text-white">
                        {comparison.base.metrics_summary.avg_complexity.toFixed(1)}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-sky-300 font-mono">TARGET</div>
                      <div className="font-head text-2xl font-bold text-white">
                        {comparison.head.metrics_summary.avg_complexity.toFixed(1)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Churn Rate Metric Card */}
                <div className="glass-panel rounded-[24px] p-5 border border-white/5 space-y-2">
                  <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
                    <span className="flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 text-sky-400" /> Churn Rate
                    </span>
                    {renderDeltaPill(comparison.deltas.churn_rate_delta * 100, false, '%', 1)}
                  </div>
                  <div className="flex items-baseline justify-between pt-1">
                    <div>
                      <div className="text-[10px] text-purple-300 font-mono">BASE</div>
                      <div className="font-head text-2xl font-bold text-white">
                        {(comparison.base.metrics_summary.churn_rate * 100).toFixed(0)}%
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-sky-300 font-mono">TARGET</div>
                      <div className="font-head text-2xl font-bold text-white">
                        {(comparison.head.metrics_summary.churn_rate * 100).toFixed(0)}%
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bus Factor Minimum Metric Card */}
                <div className="glass-panel rounded-[24px] p-5 border border-white/5 space-y-2">
                  <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-emerald-400" /> Min Bus Factor
                    </span>
                    {renderDeltaPill(comparison.deltas.bus_factor_min_delta, true, '', 0)}
                  </div>
                  <div className="flex items-baseline justify-between pt-1">
                    <div>
                      <div className="text-[10px] text-purple-300 font-mono">BASE</div>
                      <div className="font-head text-2xl font-bold text-white">
                        {comparison.base.metrics_summary.bus_factor_min}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-sky-300 font-mono">TARGET</div>
                      <div className="font-head text-2xl font-bold text-white">
                        {comparison.head.metrics_summary.bus_factor_min}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Visual Charts: Timeline Trend & Radar Comparison */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
              {/* Timeline Trend Line Chart (2 Cols) */}
              <div className="lg:col-span-2 glass-panel rounded-[28px] p-6 border border-white/10 shadow-2xl flex flex-col justify-between">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-head text-sm font-bold text-white uppercase tracking-wider">
                      Health Score Trajectory
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Historical snapshot evolution across recent commit samples
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-mono">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
                      <span className="text-slate-300">{comparison.base.repo.name}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
                      <span className="text-slate-300">{comparison.head.repo.name}</span>
                    </div>
                  </div>
                </div>

                <div className="h-64 w-full">
                  {timelineChartData.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-slate-500 text-xs">
                      No chronological snapshots recorded yet for trend chart.
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={timelineChartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                        <XAxis
                          dataKey="index"
                          stroke="#64748b"
                          tickLine={false}
                          tick={{ fontSize: 10 }}
                          label={{
                            value: 'Commit Sample Index',
                            position: 'insideBottom',
                            offset: -4,
                            fontSize: 10,
                            fill: '#64748b',
                          }}
                        />
                        <YAxis
                          domain={[0, 100]}
                          stroke="#64748b"
                          tickLine={false}
                          tick={{ fontSize: 10 }}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#0a0b10e6',
                            borderColor: '#ffffff20',
                            borderRadius: '16px',
                            backdropFilter: 'blur(12px)',
                            fontSize: '12px',
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="baseScore"
                          name={comparison.base.repo.name}
                          stroke="#c084fc"
                          strokeWidth={2.5}
                          dot={false}
                          activeDot={{ r: 5, fill: '#c084fc' }}
                        />
                        <Line
                          type="monotone"
                          dataKey="headScore"
                          name={comparison.head.repo.name}
                          stroke="#38bdf8"
                          strokeWidth={2.5}
                          dot={false}
                          activeDot={{ r: 5, fill: '#38bdf8' }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </div>

              {/* Subscores Radar Comparison Chart (1 Col) */}
              <div className="glass-panel rounded-[28px] p-6 border border-white/10 shadow-2xl flex flex-col justify-between">
                <div>
                  <h4 className="font-head text-sm font-bold text-white uppercase tracking-wider">
                    Architectural Profile
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Multi-dimensional subscore comparison radar
                  </p>
                </div>

                <div className="h-64 w-full flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarChartData}>
                      <PolarGrid stroke="#ffffff15" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 9 }} />
                      <PolarRadiusAxis domain={[0, 100]} stroke="#475569" tick={false} />
                      <Radar
                        name={comparison.base.repo.name}
                        dataKey="base"
                        stroke="#c084fc"
                        fill="#c084fc"
                        fillOpacity={0.25}
                      />
                      <Radar
                        name={comparison.head.repo.name}
                        dataKey="head"
                        stroke="#38bdf8"
                        fill="#38bdf8"
                        fillOpacity={0.25}
                      />
                      <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '8px' }} iconSize={8} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#0a0b10e6',
                          borderColor: '#ffffff20',
                          borderRadius: '16px',
                          backdropFilter: 'blur(12px)',
                          fontSize: '11px',
                        }}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Key Comparison Insights Section */}
            {comparison.insights && comparison.insights.length > 0 && (
              <section className="space-y-3">
                <h3 className="font-head text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Key Comparative Insights
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {comparison.insights.map((insight) => (
                    <div
                      key={insight.category}
                      className="glass-panel rounded-[24px] p-5 border border-white/5 space-y-2 hover:border-white/10 transition-all"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-head text-[10px] font-bold text-purple-300 uppercase tracking-wider">
                          {insight.category}
                        </span>
                        <span
                          className={`font-mono text-[9px] px-2 py-0.5 rounded-full border uppercase ${
                            insight.winner === comparison.head.repo.repo_slug
                              ? 'bg-sky-500/10 text-sky-300 border-sky-500/20'
                              : insight.winner === comparison.base.repo.repo_slug
                                ? 'bg-purple-500/10 text-purple-300 border-purple-500/20'
                                : 'bg-white/5 text-slate-400 border-white/10'
                          }`}
                        >
                          {insight.winner
                            ? `Advantage: ${insight.winner.split('_')[0]}`
                            : 'Balanced'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-200 leading-relaxed font-normal">
                        {insight.summary}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Complete Metrics Benchmark Comparison Table */}
            <section className="glass-panel rounded-[28px] p-6 border border-white/10 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div>
                  <h4 className="font-head text-sm font-bold text-white uppercase tracking-wider">
                    Full Metric Benchmark Table
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Complete comparative matrix between {comparison.base.repo.name} and{' '}
                    {comparison.head.repo.name}
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-white/5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      <th className="py-3 px-4">Metric</th>
                      <th className="py-3 px-4 text-purple-300">
                        Base ({comparison.base.repo.name})
                      </th>
                      <th className="py-3 px-4 text-sky-300">
                        Target ({comparison.head.repo.name})
                      </th>
                      <th className="py-3 px-4">Delta (Target − Base)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-mono">
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-4 font-sans font-medium text-slate-200">
                        Overall Health Score
                      </td>
                      <td className="py-3 px-4 font-bold text-purple-200">
                        {comparison.base.metrics_summary.health_score.toFixed(1)} / 100
                      </td>
                      <td className="py-3 px-4 font-bold text-sky-200">
                        {comparison.head.metrics_summary.health_score.toFixed(1)} / 100
                      </td>
                      <td className="py-3 px-4">
                        {renderDeltaPill(comparison.deltas.health_score_delta, true, ' pts', 1)}
                      </td>
                    </tr>
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-4 font-sans font-medium text-slate-200">
                        Average Cyclomatic Complexity
                      </td>
                      <td className="py-3 px-4 text-slate-300">
                        {comparison.base.metrics_summary.avg_complexity.toFixed(2)}
                      </td>
                      <td className="py-3 px-4 text-slate-300">
                        {comparison.head.metrics_summary.avg_complexity.toFixed(2)}
                      </td>
                      <td className="py-3 px-4">
                        {renderDeltaPill(comparison.deltas.avg_complexity_delta, false, '', 2)}
                      </td>
                    </tr>
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-4 font-sans font-medium text-slate-200">
                        Maximum File Complexity
                      </td>
                      <td className="py-3 px-4 text-slate-300">
                        {comparison.base.metrics_summary.max_complexity.toFixed(2)}
                      </td>
                      <td className="py-3 px-4 text-slate-300">
                        {comparison.head.metrics_summary.max_complexity.toFixed(2)}
                      </td>
                      <td className="py-3 px-4">
                        {renderDeltaPill(comparison.deltas.max_complexity_delta, false, '', 2)}
                      </td>
                    </tr>
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-4 font-sans font-medium text-slate-200">
                        Component Churn Rate
                      </td>
                      <td className="py-3 px-4 text-slate-300">
                        {(comparison.base.metrics_summary.churn_rate * 100).toFixed(1)}%
                      </td>
                      <td className="py-3 px-4 text-slate-300">
                        {(comparison.head.metrics_summary.churn_rate * 100).toFixed(1)}%
                      </td>
                      <td className="py-3 px-4">
                        {renderDeltaPill(comparison.deltas.churn_rate_delta * 100, false, '%', 1)}
                      </td>
                    </tr>
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-4 font-sans font-medium text-slate-200">
                        Minimum Bus Factor (Resilience)
                      </td>
                      <td className="py-3 px-4 text-slate-300">
                        {comparison.base.metrics_summary.bus_factor_min}
                      </td>
                      <td className="py-3 px-4 text-slate-300">
                        {comparison.head.metrics_summary.bus_factor_min}
                      </td>
                      <td className="py-3 px-4">
                        {renderDeltaPill(comparison.deltas.bus_factor_min_delta, true, '', 0)}
                      </td>
                    </tr>
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-4 font-sans font-medium text-slate-200">
                        High-Risk Hotspot Count
                      </td>
                      <td className="py-3 px-4 text-slate-300">
                        {comparison.base.metrics_summary.hotspot_count}
                      </td>
                      <td className="py-3 px-4 text-slate-300">
                        {comparison.head.metrics_summary.hotspot_count}
                      </td>
                      <td className="py-3 px-4">
                        {renderDeltaPill(comparison.deltas.hotspot_count_delta, false, '', 0)}
                      </td>
                    </tr>
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-4 font-sans font-medium text-slate-200">
                        Active Contributors Count
                      </td>
                      <td className="py-3 px-4 text-slate-300">
                        {comparison.base.metrics_summary.active_contributors}
                      </td>
                      <td className="py-3 px-4 text-slate-300">
                        {comparison.head.metrics_summary.active_contributors}
                      </td>
                      <td className="py-3 px-4">
                        {renderDeltaPill(comparison.deltas.active_contributors_delta, true, '', 0)}
                      </td>
                    </tr>
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-4 font-sans font-medium text-slate-200">
                        Total Analyzed Commits
                      </td>
                      <td className="py-3 px-4 text-slate-300">
                        {comparison.base.metrics_summary.analyzed_commits}
                      </td>
                      <td className="py-3 px-4 text-slate-300">
                        {comparison.head.metrics_summary.analyzed_commits}
                      </td>
                      <td className="py-3 px-4">
                        {renderDeltaPill(
                          comparison.head.metrics_summary.analyzed_commits -
                            comparison.base.metrics_summary.analyzed_commits,
                          true,
                          '',
                          0
                        )}
                      </td>
                    </tr>
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-4 font-sans font-medium text-slate-200">
                        Total Lines of Code (LOC)
                      </td>
                      <td className="py-3 px-4 text-slate-300">
                        {comparison.base.metrics_summary.total_loc.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-slate-300">
                        {comparison.head.metrics_summary.total_loc.toLocaleString()}
                      </td>
                      <td className="py-3 px-4">
                        {renderDeltaPill(comparison.deltas.total_loc_delta, true, '', 0)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  )
}
