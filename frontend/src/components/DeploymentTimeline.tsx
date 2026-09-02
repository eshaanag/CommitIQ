import { useEffect, useState } from 'react'
import { getDeploymentTimeline } from '../lib/api'
import type { DeploymentTimeline as DeploymentTimelineData } from '../types'
import {
  Activity,
  CheckCircle2,
  Clock,
  Cloud,
  GitBranch,
  Rocket,
  Server,
  XCircle,
} from 'lucide-react'

interface DeploymentTimelineProps {
  repoId: string | number
}

const ENV_BADGE: Record<string, string> = {
  production: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
  staging: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
  development: 'bg-sky-500/10 text-sky-300 border-sky-500/20',
  preview: 'bg-violet-500/10 text-violet-300 border-violet-500/20',
}

const STATUS_ICON: Record<string, React.ReactNode> = {
  success: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />,
  failed: <XCircle className="w-3.5 h-3.5 text-rose-400" />,
  error: <XCircle className="w-3.5 h-3.5 text-rose-400" />,
  canceled: <XCircle className="w-3.5 h-3.5 text-slate-500" />,
  running: <Activity className="w-3.5 h-3.5 text-sky-400 animate-pulse" />,
}

function Sparkline({ daily }: { daily: DeploymentTimelineData['daily'] }) {
  if (!daily.length) return null
  const maxTotal = Math.max(...daily.map((d) => d.total), 1)
  return (
    <div className="flex items-end gap-[2px] h-[48px]">
      {daily.slice(-20).map((d) => (
        <div
          key={d.date}
          className="flex-1 flex flex-col justify-end h-full group relative min-w-[6px]"
        >
          <div className="flex flex-col-reverse w-full h-full">
            <div
              className="w-full bg-emerald-400/50 rounded-t-[1px]"
              style={{ height: `${(d.success / maxTotal) * 100}%` }}
            />
            <div
              className="w-full bg-rose-400/50 rounded-t-[1px]"
              style={{ height: `${(d.failure / maxTotal) * 100}%` }}
            />
          </div>
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 hidden group-hover:block z-30">
            <div className="glass-panel rounded-lg px-2 py-1 border border-white/10 shadow-2xl text-[9px] whitespace-nowrap">
              <div className="text-white font-semibold">{d.date}</div>
              <div className="text-slate-400">{d.total} deploys</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function formatTimeAgo(isoStr: string): string {
  if (!isoStr) return '—'
  const diff = Date.now() - new Date(isoStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  return `${days}d ago`
}

export function DeploymentTimeline({ repoId }: DeploymentTimelineProps) {
  const [data, setData] = useState<DeploymentTimelineData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    setLoading(true)
    setError(null)
    getDeploymentTimeline(repoId, 50)
      .then((d) => {
        if (active) setData(d)
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
        <Rocket className="w-8 h-8 text-emerald-400 mb-2" />
        <span className="text-slate-400 text-sm">Loading Deployment Timeline…</span>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="glass-panel rounded-[28px] overflow-hidden shadow-2xl relative border border-red-500/20 flex flex-col items-center justify-center h-[350px] text-red-400">
        <Cloud className="w-8 h-8 mb-2" />
        <span className="text-sm">Failed to load deployment timeline</span>
      </div>
    )
  }

  const { summary, deployments, daily } = data

  if (summary.total_deploys === 0) {
    return (
      <div className="glass-panel rounded-[28px] overflow-hidden shadow-2xl relative border border-white/10 flex flex-col items-center justify-center h-[300px]">
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-[80px] pointer-events-none" />
        <Rocket className="w-10 h-10 text-emerald-500/30 mb-3" />
        <span className="text-slate-500 text-sm font-medium">No deployments recorded yet</span>
        <span className="text-slate-600 text-[11px] mt-1">
          Connect GitLab webhooks to start tracking deployments
        </span>
      </div>
    )
  }

  const envEntries = Object.entries(summary.by_environment)
  const providerEntries = Object.entries(summary.by_provider)

  return (
    <div className="glass-panel rounded-[28px] overflow-hidden shadow-2xl relative border border-white/10 flex flex-col h-full">
      <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="px-6 py-5 border-b border-white/5 relative z-10 flex items-center gap-2">
        <Rocket className="w-5 h-5 text-emerald-400" />
        <h2 className="font-head text-[18px] font-semibold text-white tracking-tight">
          Deployment Timeline
        </h2>
      </div>

      {/* ── summary stats ─────────────────────────────────────────── */}
      <div className="px-6 pt-5 pb-4 border-b border-white/5 relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white/5 border border-white/5 rounded-[16px] p-3">
          <div className="flex items-center gap-1 mb-1">
            <Rocket className="w-3 h-3 text-emerald-400" />
            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
              Total
            </span>
          </div>
          <span className="font-head text-xl font-extralight text-white">
            {summary.total_deploys}
          </span>
        </div>

        <div className="bg-white/5 border border-white/5 rounded-[16px] p-3">
          <div className="flex items-center gap-1 mb-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
              Success
            </span>
          </div>
          <span className="font-head text-xl font-extralight text-white">
            {summary.success_rate}%
          </span>
        </div>

        <div className="bg-white/5 border border-white/5 rounded-[16px] p-3">
          <div className="flex items-center gap-1 mb-1">
            <XCircle className="w-3 h-3 text-rose-400" />
            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
              Failed
            </span>
          </div>
          <span className="font-head text-xl font-extralight text-white">
            {summary.failure_count}
          </span>
        </div>

        <div className="bg-white/5 border border-white/5 rounded-[16px] p-3">
          <div className="flex items-center gap-1 mb-1">
            <Clock className="w-3 h-3 text-sky-400" />
            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
              Last Deploy
            </span>
          </div>
          <span className="font-head text-sm font-extralight text-white">
            {formatTimeAgo(summary.most_recent)}
          </span>
        </div>
      </div>

      {/* ── sparkline ─────────────────────────────────────────────── */}
      {daily.length > 0 && (
        <div className="px-6 pt-4 pb-3 relative z-10">
          <div className="flex items-center justify-between mb-2">
            <span className="font-head text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
              Daily Deployment Activity
            </span>
            <div className="flex items-center gap-3 text-[9px] text-slate-500">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400/50" />
                success
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-rose-400/50" />
                failure
              </span>
            </div>
          </div>
          <Sparkline daily={daily} />
        </div>
      )}

      {/* ── environment & provider breakdown ──────────────────────── */}
      {(envEntries.length > 0 || providerEntries.length > 0) && (
        <div className="px-6 pt-2 pb-3 relative z-10 grid grid-cols-2 gap-4">
          {envEntries.length > 0 && (
            <div>
              <div className="font-head text-[10px] text-slate-400 font-semibold uppercase tracking-wider mb-2">
                By Environment
              </div>
              <div className="space-y-1.5">
                {envEntries.map(([env, stats]) => (
                  <div key={env} className="flex items-center justify-between text-[11px]">
                    <span
                      className={`px-1.5 py-0.5 rounded-full border text-[9px] font-semibold uppercase ${ENV_BADGE[env] || ENV_BADGE.development}`}
                    >
                      {env}
                    </span>
                    <span className="text-slate-400 font-mono">
                      {stats.success}/{stats.total}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {providerEntries.length > 0 && (
            <div>
              <div className="font-head text-[10px] text-slate-400 font-semibold uppercase tracking-wider mb-2">
                By Provider
              </div>
              <div className="space-y-1.5">
                {providerEntries.map(([provider, count]) => (
                  <div key={provider} className="flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-1.5">
                      <Server className="w-3 h-3 text-slate-500" />
                      <span className="text-slate-200 font-medium capitalize">{provider}</span>
                    </div>
                    <span className="text-slate-400 font-mono">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── recent deployments list ───────────────────────────────── */}
      <div className="px-6 pt-2 pb-5 relative z-10">
        <div className="font-head text-[10px] text-slate-400 font-semibold uppercase tracking-wider mb-2">
          Recent Deployments
        </div>
        <div className="space-y-1.5 max-h-[200px] overflow-y-auto pr-1">
          {deployments.slice(0, 10).map((d) => (
            <div
              key={d.id}
              className="flex items-center gap-3 bg-white/[0.03] border border-white/5 rounded-xl px-3 py-2"
            >
              {STATUS_ICON[d.status] || <Activity className="w-3.5 h-3.5 text-slate-500" />}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-slate-100 font-mono">
                    {d.sha || '—'}
                  </span>
                  <span
                    className={`px-1.5 py-0.5 rounded-full border text-[8px] font-bold uppercase ${ENV_BADGE[d.environment] || ENV_BADGE.development}`}
                  >
                    {d.environment}
                  </span>
                </div>
                <div className="text-[9px] text-slate-500 mt-0.5 flex items-center gap-2">
                  <GitBranch className="w-2.5 h-2.5 inline" />
                  {d.ref || '—'}
                  {d.pipeline_id && <span className="font-mono">#{d.pipeline_id}</span>}
                </div>
              </div>
              <span className="flex-shrink-0 text-[10px] text-slate-500">
                {formatTimeAgo(d.deployed_at)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
