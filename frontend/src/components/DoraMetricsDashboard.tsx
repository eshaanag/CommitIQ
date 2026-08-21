import { useEffect, useState } from 'react'
import { getDoraMetrics } from '../lib/api'
import type { DoraMetrics } from '../types'
import { Activity, Rocket, ShieldAlert, Timer, TrendingUp } from 'lucide-react'

interface DoraMetricsDashboardProps {
  repoId: string | number
}

const CATEGORY_COLORS: Record<string, string> = {
  Elite: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  High: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  Medium: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  Low: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
}

export function DoraMetricsDashboard({ repoId }: DoraMetricsDashboardProps) {
  const [metrics, setMetrics] = useState<DoraMetrics | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    setLoading(true)
    setError(null)
    getDoraMetrics(repoId)
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
        <Activity className="w-8 h-8 text-indigo-400 mb-2" />
        <span className="text-slate-400 text-sm">Computing DORA Metrics...</span>
      </div>
    )
  }

  if (error || !metrics) {
    return (
      <div className="glass-panel rounded-[28px] overflow-hidden shadow-2xl relative border border-red-500/20 flex flex-col items-center justify-center h-[350px] text-red-400">
        <ShieldAlert className="w-8 h-8 mb-2" />
        <span className="text-sm">Failed to load DORA metrics</span>
      </div>
    )
  }

  const overallColor = CATEGORY_COLORS[metrics.dora_score] || CATEGORY_COLORS.Medium

  return (
    <div
      className="glass-panel rounded-[28px] overflow-hidden shadow-2xl relative border border-white/10 flex flex-col h-full"
      style={{ minHeight: '350px' }}
    >
      <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="px-6 py-5 border-b border-white/5 relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-indigo-400" />
          <h2 className="font-head text-[18px] font-semibold text-white tracking-tight">
            DORA Performance
          </h2>
        </div>
        <div
          className={`px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-wider ${overallColor}`}
        >
          {metrics.dora_score} Performer
        </div>
      </div>

      <div className="p-6 relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 flex-grow">
        <MetricCard
          title="Deployment Freq"
          value={`${metrics.deployment_frequency_value}/wk`}
          category={metrics.deployment_frequency}
          icon={<Rocket className="w-5 h-5 text-sky-400" />}
        />
        <MetricCard
          title="Change Failure"
          value={`${metrics.change_failure_rate_value}%`}
          category={metrics.change_failure_rate}
          icon={<ShieldAlert className="w-5 h-5 text-rose-400" />}
        />
        <MetricCard
          title="MTTR"
          value={`${metrics.mttr_hours}h`}
          category={metrics.mttr_category}
          icon={<Timer className="w-5 h-5 text-emerald-400" />}
        />
      </div>
    </div>
  )
}

function MetricCard({
  title,
  value,
  category,
  icon,
}: {
  title: string
  value: string
  category: string
  icon: React.ReactNode
}) {
  const colorClass = CATEGORY_COLORS[category] || CATEGORY_COLORS.Medium

  return (
    <div className="bg-white/5 border border-white/5 hover:border-white/10 rounded-[20px] p-5 transition-all shadow-inner flex flex-col justify-between">
      <div className="flex items-center justify-between mb-2">
        <span className="font-head text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
          {title}
        </span>
        {icon}
      </div>
      <div>
        <div className="font-head text-[32px] font-extralight text-white tracking-tight mt-2">
          {value}
        </div>
        <div
          className={`inline-flex items-center px-2 py-0.5 rounded-md border text-[10px] font-mono font-bold mt-2 ${colorClass}`}
        >
          {category}
        </div>
      </div>
    </div>
  )
}
