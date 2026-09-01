import { useState } from 'react'
import { Sparkles, Loader2, AlertCircle, RefreshCw, Copy, Check } from 'lucide-react'

import { streamNarrative, type NarrativeStreamChunk } from '../lib/api'

type StreamState = 'idle' | 'loading' | 'streaming' | 'done' | 'error'

interface NarrativeCardProps {
  repoId: string | number
  commitSha: string | null
}

/**
 * Renders the AI narrative panel for a single commit. Streams the
 * response token-by-token from `POST /api/explain/stream` so the user
 * sees a live typing animation rather than waiting for the full
 * response.
 */
export function NarrativeCard({ repoId, commitSha }: NarrativeCardProps) {
  const [state, setState] = useState<StreamState>('idle')
  const [text, setText] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [meta, setMeta] = useState<NarrativeStreamChunk | null>(null)
  const [controller, setController] = useState<AbortController | null>(null)
  const [copied, setCopied] = useState(false)

  const disabled = !commitSha || state === 'streaming' || state === 'loading'

  async function handleCopy() {
    if (!text) return
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  async function handleGenerate() {
    if (!commitSha) return

    setText('')
    setError(null)
    setMeta(null)
    setState('loading')

    const ac = new AbortController()
    setController(ac)

    try {
      await streamNarrative(
        repoId,
        commitSha,
        (chunk) => {
          if (chunk.error) {
            setError(chunk.error)
            setState('error')
            return
          }
          if (chunk.token) {
            setState('streaming')
            setText((prev: string) => prev + chunk.token!)
          }
          if (chunk.done) {
            setMeta(chunk)
            if (chunk.explanation) {
              // The terminal chunk carries the canonical full text - use it
              // to overwrite any partial accumulation, ensuring the rendered
              // text matches exactly what the backend persisted.
              setText(chunk.explanation)
            }
            setState('done')
          }
        },
        { signal: ac.signal }
      )
    } catch (err) {
      if (ac.signal.aborted) {
        setState('idle')
        return
      }
      setError(err instanceof Error ? err.message : 'Stream failed')
      setState('error')
    } finally {
      setController(null)
    }
  }

  function handleCancel() {
    if (controller) {
      controller.abort()
      setState('idle')
    }
  }

  function handleReset() {
    setText('')
    setError(null)
    setMeta(null)
    setState('idle')
  }

  const providerLabel =
    meta?.provider && meta.provider !== 'none'
      ? meta.provider.charAt(0).toUpperCase() + meta.provider.slice(1)
      : null

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-indigo-500" />
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">AI Narrative</h3>
          
          {text && (
            <button
              type="button"
              onClick={handleCopy}
              className="ml-2 inline-flex items-center gap-1 rounded-md border border-slate-200 px-2 py-1 text-xs font-medium text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700"
              title="Copy narrative markdown to clipboard"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-slate-500 dark:text-slate-400" />
                  <span>Copy Markdown</span>
                </>
              )}
            </button>
          )}
        </div>
        <div className="flex items-center gap-2">
          {meta?.cached && (
            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
              CACHED
            </span>
          )}
          {meta?.demo_mode && (
            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
              DEMO MODE
            </span>
          )}
          {providerLabel && (
            <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300">
              {providerLabel}
            </span>
          )}
        </div>
      </div>

      {state === 'idle' && !text && (
        <div className="flex flex-col items-center gap-3 py-8 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Generate an AI explanation of this commit's health impact.
          </p>
          <button
            type="button"
            onClick={handleGenerate}
            disabled={disabled}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Sparkles className="h-4 w-4" />
            Generate Narrative
          </button>
        </div>
      )}

      {(state === 'loading' || state === 'streaming') && (
        <div className="flex flex-col gap-3">
          <div className="min-h-[80px] whitespace-pre-wrap text-sm text-slate-700 dark:text-slate-200">
            {text}
            {state === 'streaming' && (
              <span className="ml-0.5 inline-block h-4 w-2 animate-pulse bg-indigo-500 align-middle" />
            )}
            {state === 'loading' && !text && (
              <span className="inline-flex items-center gap-2 text-slate-400">
                <Loader2 className="h-4 w-4 animate-spin" />
                Connecting…
              </span>
            )}
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleCancel}
              className="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {state === 'done' && (
        <div className="flex flex-col gap-3">
          <p className="whitespace-pre-wrap text-sm text-slate-700 dark:text-slate-200">{text}</p>
          {meta && (
            <div className="flex flex-wrap gap-3 border-t border-slate-100 pt-3 text-xs text-slate-500 dark:border-slate-700 dark:text-slate-400">
              {meta.model && <span>Model: {meta.model}</span>}
              {meta.tokens_total !== undefined && meta.tokens_total > 0 && (
                <span>Tokens: {meta.tokens_total}</span>
              )}
              {meta.cost_usd !== undefined && meta.cost_usd > 0 && (
                <span>Cost: ${meta.cost_usd.toFixed(5)}</span>
              )}
            </div>
          )}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Regenerate
            </button>
          </div>
        </div>
      )}

      {state === 'error' && (
        <div className="flex flex-col items-center gap-3 py-6 text-center">
          <AlertCircle className="h-8 w-8 text-red-500" />
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          <button
            type="button"
            onClick={handleGenerate}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  )
}