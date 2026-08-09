import { useEffect, useRef, useState } from 'react'
import { streamNarrative } from '../lib/api'
import type { NarrativeCardProps, NarrativeStreamChunk } from '../types'
import { Sparkles, Brain, DollarSign, HelpCircle, Activity } from 'lucide-react'

const PROVIDER_BADGE: Record<string, { label: string; color: string; dot: string }> = {
  anthropic: {
    label: 'Claude Sonnet',
    color: 'text-orange-400 bg-orange-950 border-orange-800',
    dot: 'bg-orange-400',
  },
  gemini: {
    label: 'Gemini Flash',
    color: 'text-blue-400 bg-blue-950 border-blue-800',
    dot: 'bg-blue-400',
  },
  cache: {
    label: 'Cached',
    color: 'text-zinc-400 bg-zinc-900 border-zinc-700',
    dot: 'bg-zinc-400',
  },
}

export function NarrativeCard({ repoId, commitSha }: NarrativeCardProps) {
  const [state, setState] = useState<'idle' | 'loading' | 'streaming' | 'done' | 'error'>('idle')
  const [displayText, setDisplayText] = useState('')
  const [meta, setMeta] = useState<NarrativeStreamChunk | null>(null)
  const [error, setError] = useState<string | null>(null)
  const mountedRef = useRef(true)

  useEffect(() => {
    mountedRef.current = true
    setState('idle')
    setDisplayText('')
    setMeta(null)
    setError(null)
    return () => {
      mountedRef.current = false
    }
  }, [commitSha])

  const handleExplain = async () => {
    if (!commitSha || state === 'loading' || state === 'streaming') return
    setState('loading')
    setDisplayText('')
    setError(null)
    try {
      await streamNarrative(repoId, commitSha, (chunk) => {
        if (!mountedRef.current) return
        if (chunk.error) {
          setError(chunk.error)
          setState('error')
          return
        }
        if (chunk.token) {
          setState('streaming')
          setDisplayText((text) => `${text}${chunk.token}`)
        }
        if (chunk.done) {
          setMeta(chunk)
          if (chunk.explanation) setDisplayText(chunk.explanation)
          setState('done')
        }
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not generate explanation.')
      setState('error')
    }
  }

  return (
    <div className="glass-panel rounded-[28px] overflow-hidden shadow-2xl relative border border-white/10 flex flex-col justify-between">
      <div className="absolute left-0 top-0 bottom-0 w-[5px] bg-gradient-to-b from-[#a855f7] via-[#6366f1] to-[#38bdf8] z-20" />

      <div className="absolute -top-12 -left-12 w-48 h-48 bg-[#a855f7]/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 relative z-10">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-400" />
          <span className="font-head text-[14px] font-semibold text-white uppercase tracking-wider">
            AI Narrative Analyst
          </span>
        </div>
        <span className="text-[10px] text-purple-300 font-mono font-bold bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/15">
          Claude to Gemini
        </span>
      </div>

      <div className="px-6 py-6 min-h-[140px] relative z-10">
        {state === 'idle' && (
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <Brain className="w-9 h-9 text-slate-500 flex-shrink-0" />
              <div>
                <h4 className="text-white text-sm font-semibold mb-1">
                  Generate Intelligence Narrative
                </h4>
                <p className="text-slate-400 text-xs leading-relaxed max-w-[480px]">
                  Request an AI-generated natural language report explaining the architectural
                  health fluctuations, code coupling anomalies, and refactor opportunities.
                </p>
              </div>
            </div>

            <div>
              <button
                onClick={handleExplain}
                disabled={!commitSha}
                className="liquid-button px-5 py-2.5 rounded-full text-xs font-semibold text-white tracking-wide transition-all shadow-lg shadow-purple-500/10 hover:shadow-purple-500/20 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Compile Intelligence Narrative
              </button>
            </div>
          </div>
        )}

        {state === 'loading' && (
          <div className="flex flex-col items-center justify-center py-6 gap-3 text-slate-400">
            <Activity className="w-6 h-6 text-purple-400 animate-spin" />
            <p className="text-xs font-medium animate-pulse">
              Consulting codebase knowledge models...
            </p>
          </div>
        )}

        {(state === 'streaming' || state === 'done') && (
          <div className="text-slate-200 text-xs leading-relaxed font-sans font-normal whitespace-pre-wrap max-h-[320px] overflow-y-auto pr-2">
            {displayText}
            {state === 'streaming' && (
              <span className="inline-block w-1.5 h-3.5 bg-purple-400 ml-1 rounded-sm animate-pulse" />
            )}
          </div>
        )}

        {state === 'error' && (
          <div className="flex items-start gap-3 bg-rose-500/10 border border-rose-500/20 rounded-[20px] p-4 text-xs text-rose-300">
            <HelpCircle className="w-5 h-5 flex-shrink-0 text-rose-400" />
            <div>
              <p className="font-bold mb-1">Narrative Generation Failed</p>
              <p className="text-slate-400 leading-relaxed mb-2">
                {error || 'Could not compile explanation.'}
              </p>
              <button
                onClick={() => setState('idle')}
                className="underline text-purple-300 font-semibold hover:text-white transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        )}
      </div>

      {meta && state === 'done' && (
        <div className="flex items-center justify-between px-6 py-3.5 border-t border-white/5 bg-white/[0.01] relative z-10 text-[10px] text-slate-500 font-mono">
          <div className="flex items-center gap-3">
            {meta.provider && PROVIDER_BADGE[meta.provider] ? (
              <span
                className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md border font-mono font-bold text-[9px] ${PROVIDER_BADGE[meta.provider].color}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${PROVIDER_BADGE[meta.provider].dot}`} />
                {PROVIDER_BADGE[meta.provider].label}
              </span>
            ) : (
              <span className="bg-white/5 px-2 py-1 rounded-md border border-white/10 font-mono font-bold text-[9px]">
                {meta.model || 'model unavailable'}
              </span>
            )}
            <div className="flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
              <span>Cost: ${meta.cost_usd ? meta.cost_usd.toFixed(5) : '0.00000'}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span>Tokens: {(meta.tokens_total || 0).toLocaleString()}</span>
            {meta.cached && (
              <span className="text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded-md font-bold text-[9px] border border-emerald-500/10">
                CACHED
              </span>
            )}
            {meta.demo_mode && (
              <span className="text-blue-400 bg-blue-500/10 px-1.5 py-0.2 rounded-md font-bold text-[9px] border border-blue-500/10">
                DEMO MODE
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
