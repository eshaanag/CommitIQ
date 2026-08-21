import { useEffect, useState } from 'react'
import { getCodeQualityMetrics } from '../lib/api'
import type { CodeQualityMetrics } from '../types'
import { Activity, Bot, RefreshCcw, ShieldAlert, Sparkles, Trash2 } from 'lucide-react'

interface CodeQualityDashboardProps {
  repoId: string | number
}

const QUALITY_COLORS: Record<string, string> = {
  Low: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  Medium: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  High: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
}

export function CodeQualityDashboard({ repoId }: CodeQualityDashboardProps) {
  const [metrics, setMetrics] = useState<CodeQualityMetrics | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    setLoading(true)
    setError(null)
    getCodeQualityMetrics(repoId)
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
        <span className="text-slate-400 text-sm">Analyzing Code Quality...</span>
      </div>
    )
  }

  if (error || !metrics) {
    return (
      <div className="glass-panel rounded-[28px] overflow-hidden shadow-2xl relative border border-red-500/20 flex flex-col items-center justify-center h-[350px] text-red-400">
        <ShieldAlert className="w-8 h-8 mb-2" />
        <span className="text-sm">Failed to load Code Quality metrics</span>
      </div>
    )
  }

  const churnColor = QUALITY_COLORS[metrics.churn_category] || QUALITY_COLORS.Medium
  const aiColor = QUALITY_COLORS[metrics.ai_impact_score] || QUALITY_COLORS.Medium

  return (
    <div
      className="glass-panel rounded-[28px] overflow-hidden shadow-2xl relative border border-white/10 flex flex-col h-full"
      style={{ minHeight: '350px' }}
    >
      <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="px-6 py-5 border-b border-white/5 relative z-10 flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-cyan-400" />
        <h2 className="font-head text-[18px] font-semibold text-white tracking-tight">
          Code Quality & AI Impact
        </h2>
      </div>

      <div className="p-6 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
        {/* Code Churn */}
        <div className="bg-white/5 border border-white/5 rounded-[20px] p-5 shadow-inner flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-slate-300">
              <RefreshCcw className="w-4 h-4 text-emerald-400" />
              <span className="font-head text-sm font-semibold tracking-wide">Code Churn</span>
            </div>
            <div
              className={`px-2.5 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider ${churnColor}`}
            >
              {metrics.churn_category}
            </div>
          </div>

          <div className="mt-2 flex-grow flex flex-col justify-center items-center text-center">
            <span className="text-[48px] font-head font-extralight text-white tracking-tight leading-none">
              {metrics.churn_rate_percent}%
            </span>
            <span className="text-xs text-slate-400 mt-2 flex items-center gap-1 justify-center">
              <Trash2 className="w-3 h-3" /> Deletions vs Insertions
            </span>
            <p className="text-[10px] text-slate-500 mt-4 leading-relaxed max-w-[90%] mx-auto">
              Percentage of recently authored code that is subsequently deleted or heavily modified.
              High churn indicates rework or shifting requirements.
            </p>
          </div>
        </div>

        {/* AI Impact */}
        <div className="bg-white/5 border border-white/5 rounded-[20px] p-5 shadow-inner flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-slate-300">
              <Bot className="w-4 h-4 text-violet-400" />
              <span className="font-head text-sm font-semibold tracking-wide">
                AI-Assisted Commits
              </span>
            </div>
            <div
              className={`px-2.5 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider ${aiColor}`}
            >
              {metrics.ai_impact_score} Impact
            </div>
          </div>

          <div className="mt-2 flex-grow flex flex-col justify-center items-center text-center">
            <span className="text-[48px] font-head font-extralight text-white tracking-tight leading-none">
              {metrics.ai_assisted_commits}
            </span>
            <span className="text-xs text-slate-400 mt-2 block">Suspected AI Commits</span>
            <p className="text-[10px] text-slate-500 mt-4 leading-relaxed max-w-[90%] mx-auto">
              Anomalously large code blocks committed rapidly across few files. Watch this alongside
              Churn Rate to ensure AI assistants aren't introducing technical debt.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
