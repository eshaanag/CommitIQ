import { useEffect, useState } from 'react'
import { getCycleTime } from '../lib/api'
import type { CycleTimeMetrics } from '../types'
import { Clock, AlertTriangle, Activity } from 'lucide-react'

interface CycleTimeDashboardProps {
  repoId: string | number
}

export function CycleTimeDashboard({ repoId }: CycleTimeDashboardProps) {
  const [metrics, setMetrics] = useState<CycleTimeMetrics | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    setLoading(true)
    setError(null)
    getCycleTime(repoId)
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
        <Activity className="w-8 h-8 text-blue-400 mb-2" />
        <span className="text-slate-400 text-sm">Computing Flow Metrics...</span>
      </div>
    )
  }

  if (error || !metrics) {
    return (
      <div className="glass-panel rounded-[28px] overflow-hidden shadow-2xl relative border border-red-500/20 flex flex-col items-center justify-center h-[350px] text-red-400">
        <AlertTriangle className="w-8 h-8 mb-2" />
        <span className="text-sm">Failed to load cycle time metrics</span>
      </div>
    )
  }

  return (
    <div
      className="glass-panel rounded-[28px] overflow-hidden shadow-2xl relative border border-white/10 flex flex-col"
      style={{ height: '350px' }}
    >
      <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="px-6 py-5 border-b border-white/5 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-400" />
            <h2 className="font-head text-[18px] font-semibold text-white tracking-tight">
              Delivery Flow
            </h2>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[28px] font-mono font-bold text-white leading-none">
              {metrics.avg_cycle_time_hours.toFixed(1)}
              <span className="text-sm text-slate-400 ml-1">hrs</span>
            </span>
            <span className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-semibold">
              Avg Cycle Time
            </span>
          </div>
        </div>
      </div>

      <div className="p-6 relative z-10 flex-grow flex flex-col">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
          Longest PR Bottlenecks
        </h3>

        {metrics.bottlenecks.length === 0 ? (
          <div className="flex-grow flex items-center justify-center text-slate-500 text-sm font-medium">
            No significant bottlenecks detected.
          </div>
        ) : (
          <div className="space-y-3 overflow-y-auto pr-2" style={{ maxHeight: '180px' }}>
            {metrics.bottlenecks.map((pr) => (
              <div
                key={pr.pr_number}
                className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors"
              >
                <div className="flex flex-col max-w-[70%]">
                  <span className="text-sm font-medium text-slate-200 truncate" title={pr.title}>
                    #{pr.pr_number} {pr.title}
                  </span>
                  <span className="text-xs text-slate-500 mt-0.5">by {pr.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-md bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-mono font-bold">
                    {pr.cycle_time_hours.toFixed(1)}h
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
