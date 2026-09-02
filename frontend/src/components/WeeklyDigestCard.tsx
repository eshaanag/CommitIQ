import { useState, type ReactNode } from 'react'
import useSWR from 'swr'
import {
  TrendingUp,
  TrendingDown,
  Minus,
  AlertTriangle,
  Shield,
  Cpu,
  Flame,
  RefreshCw,
  Zap,
} from 'lucide-react'
import type { WeeklyDigest } from '../types'
import { getWeeklyDigest } from '../lib/api'

interface Props {
  repoId: number
}

export function WeeklyDigestCard({ repoId }: Props) {
  const [weeks, setWeeks] = useState(1)
  const { data: d, isLoading } = useSWR<WeeklyDigest>(
    repoId ? ['weekly-digest', repoId, weeks] : null,
    () => getWeeklyDigest(repoId, weeks)
  )
  if (isLoading)
    return (
      <div className="glass-panel rounded-[28px] p-6 h-48 flex items-center justify-center text-slate-400 border border-white/10">
        <RefreshCw className="w-5 h-5 text-purple-400 animate-spin mr-2" />
        <span className="text-xs font-medium animate-pulse">Compiling digest…</span>
      </div>
    )
  if (!d) return null

  return (
    <div className="glass-panel rounded-[28px] p-6 border border-white/10 shadow-2xl space-y-4">
      <div className="flex items-center justify-between border-b border-white/5 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
            <Zap className="w-4 h-4 text-amber-300" />
          </div>
          <div>
            <h3 className="font-head text-[15px] font-semibold text-white">Weekly Digest</h3>
            <p className="text-[10px] text-slate-400 mt-0.5">
              {weeks}w · {d.summary.total_commits} commits · {d.summary.unique_contributors}{' '}
              contributors
            </p>
          </div>
        </div>
        <div className="flex gap-1">
          {[1, 2, 4].map((w) => (
            <button
              key={w}
              onClick={() => setWeeks(w)}
              className={`text-[10px] font-bold px-2.5 py-1 rounded-full transition-all ${weeks === w ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' : 'text-slate-400 hover:text-white bg-white/5 border border-white/5'}`}
            >
              {w}w
            </button>
          ))}
        </div>
      </div>

      {d.alerts.length > 0 &&
        d.alerts.map((a, i) => (
          <div
            key={i}
            className={`flex items-start gap-2 px-3 py-2 rounded-xl border text-xs ${a.severity === 'critical' ? 'bg-rose-500/10 border-rose-500/20 text-rose-200' : 'bg-amber-500/10 border-amber-500/20 text-amber-200'}`}
          >
            <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
            <span>{a.message}</span>
          </div>
        ))}

      <div className="grid grid-cols-3 gap-3">
        <Trend
          label="Health"
          cur={d.health.current_avg_score}
          prev={d.health.previous_avg_score}
          t={d.health.trend}
          sfx="pts"
          ok
          icon={<Shield className="w-3 h-3" />}
          c="emerald"
        />
        <Trend
          label="Complexity"
          cur={d.complexity.current_avg}
          prev={d.complexity.previous_avg}
          t={d.complexity.trend}
          sfx=""
          icon={<Cpu className="w-3 h-3" />}
          c="rose"
        />
        <Trend
          label="Churn"
          cur={d.churn.current_avg_rate * 100}
          prev={d.churn.previous_avg_rate * 100}
          t={d.churn.trend * 100}
          sfx="%"
          icon={<Flame className="w-3 h-3" />}
          c="sky"
        />
      </div>

      <div className="grid grid-cols-4 gap-2">
        {[
          { l: 'Insertions', v: `+${d.summary.total_insertions.toLocaleString()}` },
          { l: 'Deletions', v: `-${d.summary.total_deletions.toLocaleString()}` },
          { l: 'Files', v: d.summary.total_files_changed.toLocaleString() },
          { l: 'BF Risks', v: `${d.bus_factor.critical_risk_count} crit` },
        ].map((i) => (
          <div key={i.l} className="bg-white/5 rounded-xl p-2.5 text-center border border-white/5">
            <div className="text-[10px] text-slate-400">{i.l}</div>
            <div className="text-sm font-bold text-white mt-0.5">{i.v}</div>
          </div>
        ))}
      </div>

      {d.top_contributors.length > 0 && (
        <div className="space-y-1.5">
          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            Top Contributors
          </div>
          {d.top_contributors.slice(0, 5).map((c, i) => (
            <div
              key={c.author}
              className="flex items-center justify-between bg-white/[0.03] rounded-lg px-3 py-1.5 border border-white/5 text-xs"
            >
              <span className="text-slate-200 truncate">
                {i + 1}. {c.author}
              </span>
              <span className="text-slate-500 flex-shrink-0 ml-3">{c.commits} commits</span>
            </div>
          ))}
        </div>
      )}

      {d.persistent_hotspots.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {d.persistent_hotspots.map((h) => (
            <span
              key={h.path}
              className="font-mono text-[10px] bg-white/5 border border-white/5 text-slate-300 px-2 py-1 rounded-lg"
            >
              {h.path} <span className="text-slate-500">×{h.snapshot_count}</span>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

function Trend({
  label,
  cur,
  prev,
  t,
  sfx,
  ok,
  icon,
  c,
}: {
  label: string
  cur: number
  prev: number
  t: number
  sfx: string
  ok?: boolean
  icon: ReactNode
  c: string
}) {
  const good = ok ? t > 0 : t < 0
  const flat = Math.abs(t) < 0.01
  const TI = flat ? Minus : good ? TrendingUp : TrendingDown
  return (
    <div className="bg-white/5 rounded-2xl p-3.5 border border-white/5">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider flex items-center gap-1">
          <span className={`text-${c}-300`}>{icon}</span>
          {label}
        </span>
        <span
          className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${flat ? 'text-slate-400 bg-white/5' : good ? 'text-emerald-300 bg-emerald-500/10' : 'text-rose-300 bg-rose-500/10'}`}
        >
          <TI className="w-2.5 h-2.5 inline" />{' '}
          {flat ? '0' : `${t > 0 ? '+' : ''}${t.toFixed(1)}${sfx}`}
        </span>
      </div>
      <div className="flex items-baseline justify-between">
        <span className="font-head text-lg font-bold text-white">{cur.toFixed(1)}</span>
        <span className="text-[10px] text-slate-500">was {prev.toFixed(1)}</span>
      </div>
    </div>
  )
}

export default WeeklyDigestCard
