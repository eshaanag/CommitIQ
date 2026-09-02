import { useEffect, useState } from 'react'
import { getVelocityMetrics } from '../lib/api'
import type { VelocityMetrics } from '../types'
import { Activity, BarChart3, Calendar, Flame, TrendingUp, Users, Zap } from 'lucide-react'

interface VelocityDashboardProps {
  repoId: string | number
}

function CadenceGauge({ score }: { score: number }) {
  const color = score >= 80 ? 'text-emerald-400' : score >= 50 ? 'text-amber-400' : 'text-rose-400'

  const circumference = 2 * Math.PI * 42
  const offset = circumference - (score / 100) * circumference

  return (
    <div className="relative flex items-center justify-center w-[110px] h-[110px]">
      <svg width="110" height="110" className="-rotate-90">
        <circle
          cx="55"
          cy="55"
          r="42"
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="8"
        />
        <circle
          cx="55"
          cy="55"
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
        <span className={`font-head text-xl font-bold ${color}`}>{score}</span>
        <span className="text-[9px] text-slate-500 font-medium">cadence</span>
      </div>
    </div>
  )
}

function MiniBar({ value, max, color }: { value: number; max: number; color: string }) {
  const width = max > 0 ? Math.min((value / max) * 100, 100) : 0
  return (
    <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
      <div
        className={`h-1.5 rounded-full ${color} transition-all duration-700`}
        style={{ width: `${width}%` }}
      />
    </div>
  )
}

export function VelocityDashboard({ repoId }: VelocityDashboardProps) {
  const [metrics, setMetrics] = useState<VelocityMetrics | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    setLoading(true)
    setError(null)
    getVelocityMetrics(repoId)
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
        <Activity className="w-8 h-8 text-cyan-400 mb-2" />
        <span className="text-slate-400 text-sm">Computing Velocity Cadence…</span>
      </div>
    )
  }

  if (error || !metrics) {
    return (
      <div className="glass-panel rounded-[28px] overflow-hidden shadow-2xl relative border border-red-500/20 flex flex-col items-center justify-center h-[350px] text-red-400">
        <Flame className="w-8 h-8 mb-2" />
        <span className="text-sm">Failed to load velocity metrics</span>
      </div>
    )
  }

  const { totals, weekly, contributors } = metrics
  const maxCommits = Math.max(...weekly.map((w) => w.commits), 1)
  const recentWeeks = weekly.slice(-12)

  return (
    <div className="glass-panel rounded-[28px] overflow-hidden shadow-2xl relative border border-white/10 flex flex-col h-full">
      <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="px-6 py-5 border-b border-white/5 relative z-10 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-cyan-400" />
        <h2 className="font-head text-[18px] font-semibold text-white tracking-tight">
          Velocity &amp; Delivery Cadence
        </h2>
      </div>

      {/* ── summary row ───────────────────────────────────────────── */}
      <div className="px-6 pt-5 pb-4 border-b border-white/5 relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white/5 border border-white/5 rounded-[18px] p-4 flex flex-col">
          <div className="flex items-center gap-1.5 mb-1">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-head text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
              Avg Commits / Week
            </span>
          </div>
          <span className="font-head text-[28px] font-extralight text-white leading-none">
            {totals.avg_commits_per_week}
          </span>
        </div>

        <div className="bg-white/5 border border-white/5 rounded-[18px] p-4 flex flex-col">
          <div className="flex items-center gap-1.5 mb-1">
            <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-head text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
              Avg Lines / Week
            </span>
          </div>
          <span className="font-head text-[28px] font-extralight text-white leading-none">
            {(totals.avg_lines_per_week ?? 0).toLocaleString()}
          </span>
        </div>

        <div className="bg-white/5 border border-white/5 rounded-[18px] p-4 flex flex-col">
          <div className="flex items-center gap-1.5 mb-1">
            <Calendar className="w-3.5 h-3.5 text-purple-400" />
            <span className="font-head text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
              Best Streak
            </span>
          </div>
          <span className="font-head text-[28px] font-extralight text-white leading-none">
            {totals.max_commit_streak_weeks}
            <span className="text-sm text-slate-500 ml-1">wk</span>
          </span>
        </div>

        <div className="bg-white/5 border border-white/5 rounded-[18px] p-4 flex flex-col items-center justify-center">
          <CadenceGauge score={totals.cadence_score} />
          <span className="text-[10px] text-slate-500 font-medium mt-1">Consistency</span>
        </div>
      </div>

      {/* ── weekly bar chart ──────────────────────────────────────── */}
      <div className="px-6 pt-5 pb-3 relative z-10">
        <div className="flex items-center justify-between mb-3">
          <span className="font-head text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
            Weekly Commit Throughput
          </span>
          <span className="text-[10px] text-slate-500">Last {recentWeeks.length} weeks shown</span>
        </div>

        <div className="flex items-end gap-1 h-[100px]">
          {recentWeeks.map((w, idx) => (
            <div
              key={w.iso_week || w.label || idx}
              className="flex-1 flex flex-col items-center justify-end h-full group relative"
            >
              <div
                className="w-full bg-gradient-to-t from-cyan-500/60 to-cyan-400/20 rounded-t-sm min-h-[2px] transition-all duration-500 hover:from-cyan-400/80 hover:to-cyan-300/40"
                style={{
                  height: `${(w.commits / maxCommits) * 100}%`,
                }}
              />
              {/* tooltip */}
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 hidden group-hover:block z-30">
                <div className="glass-panel rounded-xl px-3 py-2 border border-white/10 shadow-2xl text-[10px] whitespace-nowrap">
                  <div className="text-white font-semibold">{w.label}</div>
                  <div className="text-cyan-300 mt-0.5">
                    {w.commits} commits · {w.lines_changed.toLocaleString()} lines
                  </div>
                  <div className="text-slate-400">
                    {w.contributor_count} contributor{w.contributor_count !== 1 ? 's' : ''}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-2">
          {recentWeeks.length > 0 && (
            <span className="text-[9px] text-slate-500">{recentWeeks[0]?.label}</span>
          )}
          {recentWeeks.length > 1 && (
            <span className="text-[9px] text-slate-500">
              {recentWeeks[recentWeeks.length - 1]?.label}
            </span>
          )}
        </div>
      </div>

      {/* ── contributor leaderboard ───────────────────────────────── */}
      {contributors.length > 0 && (
        <div className="px-6 pt-3 pb-5 relative z-10">
          <div className="flex items-center gap-1.5 mb-3">
            <Users className="w-3.5 h-3.5 text-sky-400" />
            <span className="font-head text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
              Contributor Velocity
            </span>
          </div>

          <div className="space-y-2">
            {contributors.slice(0, 5).map((c, idx) => (
              <div
                key={`${c.name}-${c.email || idx}`}
                className="bg-white/[0.03] border border-white/5 rounded-xl px-4 py-3 flex items-center gap-3"
              >
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-semibold text-slate-100 truncate">{c.name}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    {c.commits} commits · {c.weeks_active} active weeks
                  </div>
                </div>
                <div className="flex-shrink-0 w-20">
                  <MiniBar
                    value={c.commit_pct}
                    max={contributors[0]?.commit_pct || 100}
                    color="bg-sky-400/60"
                  />
                </div>
                <span className="flex-shrink-0 font-mono text-[10px] text-sky-300 w-10 text-right">
                  {c.commit_pct}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
