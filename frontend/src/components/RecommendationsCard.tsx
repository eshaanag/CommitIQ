import { useState, type ReactNode } from 'react'
import useSWR from 'swr'
import {
  CheckCircle2,
  Shield,
  Target,
  Clock,
  Zap,
  ChevronRight,
  RefreshCw,
  TrendingUp,
  Cpu,
  Flame,
  Users,
  GitBranch,
  BookOpen,
} from 'lucide-react'
import type { HealthRecommendation, RecommendationsResponse } from '../types'
import { getRecommendations } from '../lib/api'

interface Props {
  repoId: number
}

const SEV: Record<string, { bg: string; bd: string; tx: string; lbl: string }> = {
  critical: {
    bg: 'bg-rose-500/10',
    bd: 'border-rose-500/20',
    tx: 'text-rose-300',
    lbl: 'CRITICAL',
  },
  high: { bg: 'bg-orange-500/10', bd: 'border-orange-500/20', tx: 'text-orange-300', lbl: 'HIGH' },
  medium: { bg: 'bg-amber-500/10', bd: 'border-amber-500/20', tx: 'text-amber-300', lbl: 'MEDIUM' },
  low: { bg: 'bg-slate-500/10', bd: 'border-slate-500/20', tx: 'text-slate-300', lbl: 'LOW' },
}
const CAT_ICON: Record<string, ReactNode> = {
  health: <Shield className="w-3.5 h-3.5" />,
  complexity: <Cpu className="w-3.5 h-3.5" />,
  bus_factor: <Users className="w-3.5 h-3.5" />,
  churn: <Flame className="w-3.5 h-3.5" />,
  hotspots: <Target className="w-3.5 h-3.5" />,
  dependencies: <GitBranch className="w-3.5 h-3.5" />,
  team_health: <Clock className="w-3.5 h-3.5" />,
  documentation: <BookOpen className="w-3.5 h-3.5" />,
}

export function RecommendationsCard({ repoId }: Props) {
  const [exp, setExp] = useState<string | null>(null)
  const { data, isLoading } = useSWR<RecommendationsResponse>(
    repoId ? ['recommendations', repoId] : null,
    () => getRecommendations(repoId)
  )
  if (isLoading)
    return (
      <div className="glass-panel rounded-[28px] p-6 h-48 flex items-center justify-center text-slate-400 border border-white/10">
        <RefreshCw className="w-5 h-5 text-purple-400 animate-spin mr-2" />
        <span className="text-xs font-medium animate-pulse">Analysing health…</span>
      </div>
    )
  if (!data) return null
  const sc = data.health_score >= 80 ? 'emerald' : data.health_score >= 50 ? 'amber' : 'rose'

  return (
    <div className="glass-panel rounded-[28px] p-6 border border-white/10 shadow-2xl space-y-4">
      <div className="flex items-center justify-between border-b border-white/5 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
            <Zap className="w-4 h-4 text-emerald-300" />
          </div>
          <div>
            <h3 className="font-head text-[15px] font-semibold text-white">
              Health Recommendations
            </h3>
            <p className="text-[10px] text-slate-400 mt-0.5">
              {data.total_recommendations} actionable item{data.total_recommendations !== 1 && 's'}
            </p>
          </div>
        </div>
        <div
          className={`w-14 h-14 rounded-full border-2 border-${sc}-500/30 flex items-center justify-center`}
        >
          <span className={`font-head text-lg font-bold text-${sc}-300`}>{data.health_score}</span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {[
          { n: data.critical_count, l: 'Critical', c: 'rose' },
          { n: data.high_count, l: 'High', c: 'orange' },
          { n: data.medium_count, l: 'Medium', c: 'amber' },
          { n: data.low_count, l: 'Low', c: 'slate' },
        ].map((s) => (
          <div key={s.l} className="bg-white/5 rounded-xl p-2.5 text-center border border-white/5">
            <div className={`text-lg font-bold text-${s.c}-300`}>{s.n}</div>
            <div className="text-[10px] text-slate-400">{s.l}</div>
          </div>
        ))}
      </div>

      {data.recommendations.length === 0 && (
        <div className="text-center py-8">
          <CheckCircle2 className="w-10 h-10 text-emerald-400/50 mx-auto mb-2" />
          <p className="text-sm text-slate-300 font-medium">All clear — no issues detected.</p>
        </div>
      )}

      <div className="space-y-2">
        {data.recommendations.map((r) => (
          <RecRow
            key={r.id}
            rec={r}
            isOpen={exp === r.id}
            onToggle={() => setExp(exp === r.id ? null : r.id)}
          />
        ))}
      </div>
    </div>
  )
}

function RecRow({
  rec,
  isOpen,
  onToggle,
}: {
  rec: HealthRecommendation
  isOpen: boolean
  onToggle: () => void
}) {
  const s = SEV[rec.severity] || SEV.low
  return (
    <div className={`border rounded-xl ${s.bd} ${s.bg}`}>
      <button onClick={onToggle} className="w-full text-left px-4 py-3 flex items-center gap-3">
        <span className={s.tx}>{CAT_ICON[rec.category] || <Target className="w-3.5 h-3.5" />}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold text-white truncate">{rec.title}</span>
            <span
              className={`text-[8px] font-bold uppercase px-1.5 py-0.5 rounded-full ${s.bg} ${s.tx} border ${s.bd}`}
            >
              {s.lbl}
            </span>
          </div>
          <div className="flex items-center gap-3 mt-1 text-[10px] text-slate-500">
            <span>
              Impact: <span className="text-white font-semibold">{rec.impact}</span>
            </span>
            <span>{rec.effort} effort</span>
          </div>
        </div>
        <ChevronRight
          className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-90' : ''}`}
        />
      </button>
      {isOpen && (
        <div className="px-4 pb-3 border-t border-white/5 pt-3 space-y-2">
          <p className="text-xs text-slate-300 leading-relaxed">{rec.description}</p>
          {rec.metric && (
            <div className="flex items-center gap-4 text-[10px]">
              <span className="text-slate-400">
                <TrendingUp className="w-3 h-3 inline mr-1" />
                {rec.metric}
              </span>
              {rec.current_value && (
                <span className="text-slate-300">
                  Current: <span className="font-mono font-semibold">{rec.current_value}</span>
                </span>
              )}
              {rec.target_value && (
                <span className="text-emerald-300">
                  Target: <span className="font-mono font-semibold">{rec.target_value}</span>
                </span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default RecommendationsCard
