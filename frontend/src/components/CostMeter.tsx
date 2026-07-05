import type { CostMeterProps } from '../types'
import { Landmark, AlertCircle, RefreshCw } from 'lucide-react'

export function CostMeter({ usage, loading, error }: CostMeterProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center p-4 gap-2 text-slate-400 text-xs font-medium">
        <RefreshCw className="w-4.5 h-4.5 text-purple-400 animate-spin" />
        <span>Loading resource metrics...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center gap-2 p-4 bg-rose-500/10 border border-rose-500/20 text-rose-300 rounded-[20px] text-xs">
        <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
        <span>Resource metrics offline</span>
      </div>
    )
  }

  if (!usage) {
    return (
      <div className="text-slate-500 text-xs py-2">No active resource tracking established.</div>
    )
  }

  const usedPct = usage.max_calls > 0 ? (usage.total_calls / usage.max_calls) * 100 : 0
  const warning = usedPct >= 80

  return (
    <div className="space-y-3 relative">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Landmark className="w-4 h-4 text-purple-400" />
          <span className="font-head text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            API Allocation
          </span>
        </div>
        <span
          className={`font-mono text-xs font-bold px-2 py-0.5 rounded-md ${
            warning
              ? 'text-rose-400 bg-rose-500/10 border border-rose-500/10'
              : 'text-slate-300 bg-white/5 border border-white/5'
          }`}
        >
          {usage.total_calls} / {usage.max_calls}
        </span>
      </div>

      <div className="h-2.5 bg-white/10 rounded-full overflow-hidden border border-white/5 p-0.5">
        <div
          className={`h-full rounded-full transition-all duration-700 ${
            warning
              ? 'bg-gradient-to-r from-rose-500 to-orange-400 shadow-[0_0_10px_rgba(239,68,68,0.3)]'
              : 'bg-gradient-to-r from-purple-500 via-indigo-400 to-cyan-400 shadow-[0_0_10px_rgba(168,85,247,0.3)]'
          }`}
          style={{ width: `${Math.min(usedPct, 100)}%` }}
        />
      </div>

      <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono">
        <span>Spent: ${usage.total_cost_usd.toFixed(4)}</span>
        <span className="font-semibold text-slate-400">{usage.budget_remaining} calls left</span>
      </div>
      <div className="mt-3 space-y-1.5 text-small">
        <div className="flex justify-between">
          <span className="text-muted">Claude calls</span>
          <span className="text-orange-400 font-mono">{usage.anthropic_calls}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted">Gemini fallback</span>
          <span className="text-blue-400 font-mono">{usage.gemini_calls}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted">Cache hits</span>
          <span className="text-emerald-400 font-mono">{usage.cache_hits}</span>
        </div>
      </div>
      <div className="border-t border-border mt-3 pt-3 text-small">
        <div className="flex justify-between">
          <span className="text-muted">Cache saved</span>
          <span className="text-emerald-400 font-mono">${usage.cache_savings_usd.toFixed(4)}</span>
        </div>
        <div className="flex items-center gap-1.5 mt-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          <span className="text-cyan-400">GraphCodeBERT</span>
          <span className="text-muted">offline - $0.00</span>
        </div>
      </div>
    </div>
  )
}
