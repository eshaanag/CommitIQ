import { useEffect, useState } from 'react'
import { getTeamHealthMetrics } from '../lib/api'
import type { TeamHealthMetrics } from '../types'
import {
  Activity,
  BatteryWarning,
  BrainCircuit,
  HeartPulse,
  MoonStar,
  ShieldAlert,
} from 'lucide-react'

interface TeamHealthDashboardProps {
  repoId: string | number
}

const HEALTH_COLORS: Record<string, string> = {
  Low: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  Medium: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  High: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
}

export function TeamHealthDashboard({ repoId }: TeamHealthDashboardProps) {
  const [metrics, setMetrics] = useState<TeamHealthMetrics | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    setLoading(true)
    setError(null)
    getTeamHealthMetrics(repoId)
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
        <Activity className="w-8 h-8 text-fuchsia-400 mb-2" />
        <span className="text-slate-400 text-sm">Analyzing Team Health...</span>
      </div>
    )
  }

  if (error || !metrics) {
    return (
      <div className="glass-panel rounded-[28px] overflow-hidden shadow-2xl relative border border-red-500/20 flex flex-col items-center justify-center h-[350px] text-red-400">
        <ShieldAlert className="w-8 h-8 mb-2" />
        <span className="text-sm">Failed to load Team Health metrics</span>
      </div>
    )
  }

  const burnoutColor = HEALTH_COLORS[metrics.burnout_risk_score] || HEALTH_COLORS.Medium
  const contextColor = HEALTH_COLORS[metrics.context_switching_score] || HEALTH_COLORS.Medium

  return (
    <div
      className="glass-panel rounded-[28px] overflow-hidden shadow-2xl relative border border-white/10 flex flex-col h-full"
      style={{ minHeight: '350px' }}
    >
      <div className="absolute top-0 right-0 w-48 h-48 bg-fuchsia-500/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="px-6 py-5 border-b border-white/5 relative z-10 flex items-center gap-2">
        <HeartPulse className="w-5 h-5 text-fuchsia-400" />
        <h2 className="font-head text-[18px] font-semibold text-white tracking-tight">
          Team Health
        </h2>
      </div>

      <div className="p-6 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
        {/* Burnout Risk */}
        <div className="bg-white/5 border border-white/5 rounded-[20px] p-5 shadow-inner flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-slate-300">
              <BatteryWarning className="w-4 h-4 text-orange-400" />
              <span className="font-head text-sm font-semibold tracking-wide">Burnout Risk</span>
            </div>
            <div
              className={`px-2.5 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider ${burnoutColor}`}
            >
              {metrics.burnout_risk_score}
            </div>
          </div>

          <div className="flex flex-col gap-3 mt-2">
            <div className="flex justify-between items-end">
              <span className="text-xs text-slate-400">Weekend Commits</span>
              <span className="font-mono text-sm text-white">
                {metrics.weekend_commits_percent}%
              </span>
            </div>
            <div className="w-full bg-white/5 rounded-full h-1.5">
              <div
                className="bg-orange-400 h-1.5 rounded-full"
                style={{ width: `${Math.min(100, metrics.weekend_commits_percent)}%` }}
              />
            </div>

            <div className="flex justify-between items-end mt-2">
              <span className="text-xs text-slate-400">
                After Hours <MoonStar className="w-3 h-3 inline ml-1 mb-0.5 text-indigo-300" />
              </span>
              <span className="font-mono text-sm text-white">
                {metrics.after_hours_commits_percent}%
              </span>
            </div>
            <div className="w-full bg-white/5 rounded-full h-1.5">
              <div
                className="bg-indigo-400 h-1.5 rounded-full"
                style={{ width: `${Math.min(100, metrics.after_hours_commits_percent)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Context Switching */}
        <div className="bg-white/5 border border-white/5 rounded-[20px] p-5 shadow-inner flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-slate-300">
              <BrainCircuit className="w-4 h-4 text-sky-400" />
              <span className="font-head text-sm font-semibold tracking-wide">
                Context Switching
              </span>
            </div>
            <div
              className={`px-2.5 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider ${contextColor}`}
            >
              {metrics.context_switching_score}
            </div>
          </div>

          <div className="mt-2 flex-grow flex flex-col justify-center items-center text-center">
            <span className="text-[32px] font-head font-extralight text-white tracking-tight leading-none">
              {metrics.avg_files_per_day}
            </span>
            <span className="text-xs text-slate-400 mt-2 block">
              Avg files changed / contributor / day
            </span>
            <p className="text-[10px] text-slate-500 mt-4 leading-relaxed max-w-[80%] mx-auto">
              High values indicate developers are juggling too many distinct areas of the codebase
              simultaneously.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
