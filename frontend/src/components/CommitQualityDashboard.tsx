import { useEffect, useState } from 'react'
import { getCommitQuality } from '../lib/api'
import type { CommitQualityMetrics } from '../types'
import {
  Activity,
  AlertTriangle,
  BadgeCheck,
  BookOpen,
  CheckCircle2,
  FileText,
  Info,
  MessageSquare,
  ShieldAlert,
  Users,
  XCircle,
} from 'lucide-react'

interface CommitQualityDashboardProps {
  repoId: string | number
}

const SEVERITY_CONFIG: Record<string, { icon: React.ReactNode; color: string; bg: string }> = {
  error: {
    icon: <XCircle className="w-3.5 h-3.5" />,
    color: 'text-rose-300',
    bg: 'bg-rose-500/10 border-rose-500/20',
  },
  warning: {
    icon: <AlertTriangle className="w-3.5 h-3.5" />,
    color: 'text-amber-300',
    bg: 'bg-amber-500/10 border-amber-500/20',
  },
  info: {
    icon: <Info className="w-3.5 h-3.5" />,
    color: 'text-sky-300',
    bg: 'bg-sky-500/10 border-sky-500/20',
  },
}

const RULE_LABELS: Record<string, string> = {
  empty_message: 'Empty Message',
  subject_too_long: 'Subject Too Long',
  subject_too_short: 'Subject Too Short',
  non_conventional: 'Non-Conventional',
  missing_body: 'Missing Body',
  stale_message: 'Stale/WIP Message',
  all_caps: 'ALL CAPS',
  trailing_period: 'Trailing Period',
  body_line_long: 'Long Body Line',
  hidden_file_prefix: 'Dot Prefix',
}

function QualityRing({ score }: { score: number }) {
  const circumference = 2 * Math.PI * 42
  const offset = circumference - (score / 100) * circumference
  const color = score >= 80 ? 'text-emerald-400' : score >= 50 ? 'text-amber-400' : 'text-rose-400'

  return (
    <div className="relative flex items-center justify-center w-[120px] h-[120px]">
      <svg width="120" height="120" className="-rotate-90">
        <circle
          cx="60"
          cy="60"
          r="42"
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="8"
        />
        <circle
          cx="60"
          cy="60"
          r="42"
          fill="none"
          className={color}
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1s ease' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`font-head text-2xl font-bold ${color}`}>{score}</span>
        <span className="text-[9px] text-slate-500 font-medium">quality</span>
      </div>
    </div>
  )
}

function SeverityBar({ count, max, severity }: { count: number; max: number; severity: string }) {
  const cfg = SEVERITY_CONFIG[severity]
  const width = max > 0 ? Math.min((count / max) * 100, 100) : 0
  return (
    <div className="flex items-center gap-2">
      <span
        className={`flex-shrink-0 w-16 text-[10px] font-semibold uppercase tracking-wider ${cfg.color}`}
      >
        {severity}
      </span>
      <div className="flex-1 bg-white/5 rounded-full h-1.5 overflow-hidden">
        <div
          className={`h-1.5 rounded-full transition-all duration-700 ${
            severity === 'error'
              ? 'bg-rose-400/60'
              : severity === 'warning'
                ? 'bg-amber-400/60'
                : 'bg-sky-400/60'
          }`}
          style={{ width: `${width}%` }}
        />
      </div>
      <span className="flex-shrink-0 font-mono text-[10px] text-slate-400 w-8 text-right">
        {count}
      </span>
    </div>
  )
}

export function CommitQualityDashboard({ repoId }: CommitQualityDashboardProps) {
  const [metrics, setMetrics] = useState<CommitQualityMetrics | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    setLoading(true)
    setError(null)
    getCommitQuality(repoId)
      .then((data) => {
        if (active) setMetrics(data)
      })
      .catch((err) => {
        if (active) setError(err.message)
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [repoId])

  if (loading) {
    return (
      <div className="glass-panel rounded-[28px] overflow-hidden shadow-2xl relative border border-white/10 flex flex-col items-center justify-center h-[350px] animate-pulse">
        <Activity className="w-8 h-8 text-violet-400 mb-2" />
        <span className="text-slate-400 text-sm">Linting Commit Messages…</span>
      </div>
    )
  }

  if (error || !metrics) {
    return (
      <div className="glass-panel rounded-[28px] overflow-hidden shadow-2xl relative border border-red-500/20 flex flex-col items-center justify-center h-[350px] text-red-400">
        <ShieldAlert className="w-8 h-8 mb-2" />
        <span className="text-sm">Failed to load commit quality metrics</span>
      </div>
    )
  }

  const maxSevCount = Math.max(
    metrics.severity_breakdown.error,
    metrics.severity_breakdown.warning,
    metrics.severity_breakdown.info,
    1
  )

  return (
    <div className="glass-panel rounded-[28px] overflow-hidden shadow-2xl relative border border-white/10 flex flex-col h-full">
      <div className="absolute top-0 right-0 w-48 h-48 bg-violet-500/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="px-6 py-5 border-b border-white/5 relative z-10 flex items-center gap-2">
        <BookOpen className="w-5 h-5 text-violet-400" />
        <h2 className="font-head text-[18px] font-semibold text-white tracking-tight">
          Commit Message Quality
        </h2>
      </div>

      {/* ── top: ring + summary stats ─────────────────────────────── */}
      <div className="px-6 pt-5 pb-4 border-b border-white/5 relative z-10 flex flex-col sm:flex-row items-center gap-6">
        <QualityRing score={metrics.quality_score} />

        <div className="flex-1 grid grid-cols-2 gap-3 w-full">
          <div className="bg-white/5 border border-white/5 rounded-[16px] p-3">
            <div className="flex items-center gap-1 mb-1">
              <MessageSquare className="w-3 h-3 text-violet-400" />
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                Total Commits
              </span>
            </div>
            <span className="font-head text-xl font-extralight text-white">
              {metrics.total_commits}
            </span>
          </div>

          <div className="bg-white/5 border border-white/5 rounded-[16px] p-3">
            <div className="flex items-center gap-1 mb-1">
              <BadgeCheck className="w-3 h-3 text-emerald-400" />
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                Convention Rate
              </span>
            </div>
            <span className="font-head text-xl font-extralight text-white">
              {metrics.convention_rate}%
            </span>
          </div>

          <div className="bg-white/5 border border-white/5 rounded-[16px] p-3">
            <div className="flex items-center gap-1 mb-1">
              <FileText className="w-3 h-3 text-sky-400" />
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                Avg Subject Len
              </span>
            </div>
            <span className="font-head text-xl font-extralight text-white">
              {metrics.avg_subject_length}
              <span className="text-xs text-slate-500 ml-1">chars</span>
            </span>
          </div>

          <div className="bg-white/5 border border-white/5 rounded-[16px] p-3">
            <div className="flex items-center gap-1 mb-1">
              <CheckCircle2 className="w-3 h-3 text-violet-400" />
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                Violations
              </span>
            </div>
            <span className="font-head text-xl font-extralight text-white">
              {metrics.total_violations}
            </span>
          </div>
        </div>
      </div>

      {/* ── severity breakdown ────────────────────────────────────── */}
      <div className="px-6 pt-4 pb-3 relative z-10">
        <div className="font-head text-[10px] text-slate-400 font-semibold uppercase tracking-wider mb-3">
          Violation Severity
        </div>
        <div className="space-y-2">
          <SeverityBar
            count={metrics.severity_breakdown.error}
            max={maxSevCount}
            severity="error"
          />
          <SeverityBar
            count={metrics.severity_breakdown.warning}
            max={maxSevCount}
            severity="warning"
          />
          <SeverityBar count={metrics.severity_breakdown.info} max={maxSevCount} severity="info" />
        </div>
      </div>

      {/* ── top violations ────────────────────────────────────────── */}
      {metrics.top_violations.length > 0 && (
        <div className="px-6 pt-2 pb-3 relative z-10">
          <div className="font-head text-[10px] text-slate-400 font-semibold uppercase tracking-wider mb-3">
            Top Violations
          </div>
          <div className="space-y-1.5">
            {metrics.top_violations.slice(0, 5).map((v) => (
              <div
                key={v.rule}
                className="flex items-center justify-between bg-white/[0.03] border border-white/5 rounded-xl px-3 py-2"
              >
                <span className="text-[11px] text-slate-200 font-medium">
                  {RULE_LABELS[v.rule] || v.rule}
                </span>
                <span className="font-mono text-[10px] text-violet-300">{v.count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── contributor leaderboard ───────────────────────────────── */}
      {metrics.contributors.length > 0 && (
        <div className="px-6 pt-2 pb-5 relative z-10">
          <div className="flex items-center gap-1.5 mb-3">
            <Users className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-head text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
              Contributor Quality
            </span>
          </div>
          <div className="space-y-1.5">
            {metrics.contributors.slice(0, 5).map((c) => {
              const rateColor =
                c.convention_rate >= 80
                  ? 'text-emerald-300'
                  : c.convention_rate >= 50
                    ? 'text-amber-300'
                    : 'text-rose-300'
              return (
                <div
                  key={c.name}
                  className="flex items-center gap-3 bg-white/[0.03] border border-white/5 rounded-xl px-3 py-2"
                >
                  <div className="min-w-0 flex-1">
                    <div className="text-[11px] font-semibold text-slate-100 truncate">
                      {c.name}
                    </div>
                    <div className="text-[9px] text-slate-500">
                      {c.total} commits · {c.errors} errors · {c.warnings} warnings
                    </div>
                  </div>
                  <span className={`font-mono text-[11px] font-bold ${rateColor}`}>
                    {c.convention_rate}%
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
