import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { cancelIngest, getIngestProgress, getRepo } from '../lib/api'
import type { IngestStatus } from '../types'

const STAGES = [
  { key: 'cloning', label: 'Cloning repository', done: 'Repository cloned' },
  { key: 'computing_bus_factor', label: 'Computing bus factor', done: 'Bus factor computed' },
  { key: 'analyzing', label: 'Analyzing commits and graphs', done: 'Commit snapshots analyzed' },
  { key: 'ready', label: 'Finalizing dashboard', done: 'Analysis complete' },
]

function stageIndex(status: string): number {
  const idx = STAGES.findIndex((stage) => stage.key === status)
  return idx >= 0 ? idx : 0
}

export default function AnalyzePage() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const repoId = params.get('repo_id')
  const repoName = params.get('name') || 'your repository'
  const [progress, setProgress] = useState<IngestStatus>({
    current: 0,
    total: 0,
    current_sha: null,
    stage: null,
    progress_pct: 0,
    status: 'queued',
    error_message: null,
  })
  const [error, setError] = useState<string | null>(null)
  const [isCancelling, setIsCancelling] = useState(false)

  useEffect(() => {
    if (!repoId) {
      navigate('/')
      return
    }

    const source = getIngestProgress(repoId)
    source.onmessage = (event) => {
      const data = JSON.parse(event.data) as IngestStatus
      setProgress(data)
      if (data.status === 'ready') {
        source.close()
        getRepo(repoId)
          .then((repo) => {
            navigate(`/dashboard/${repo.repo_slug}`, { replace: true })
          })
          .catch((err) => {
            setError(
              err instanceof Error
                ? err.message
                : 'Analysis completed, but repository metadata could not load.'
            )
          })
      }
      if (data.status === 'error') {
        source.close()
        setError(data.error_message || 'Repository ingestion failed.')
      }
      if (data.status === 'cancelled') {
        source.close()
        setError(data.error_message || 'Repository ingestion was cancelled.')
      }
    }
    source.onerror = () => {
      source.close()
      setError('Lost connection to ingestion progress. Refresh or retry from the landing page.')
    }
    return () => source.close()
  }, [repoId, navigate])

  const currentStageIdx = progress.status === 'queued' ? 0 : stageIndex(progress.status)
  const canCancel = Boolean(
    repoId && !error && !['ready', 'error', 'cancelled'].includes(progress.status)
  )

  async function handleCancel() {
    if (!repoId || isCancelling) return
    setIsCancelling(true)
    try {
      const cancelled = await cancelIngest(repoId)
      setProgress(cancelled)
      setError(cancelled.error_message || 'Repository ingestion was cancelled.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not cancel repository ingestion.')
    } finally {
      setIsCancelling(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 selection:bg-purple-500/30">
      <div className="max-w-xl w-full relative">
        <div className="absolute inset-0 bg-purple-500/10 blur-[80px] rounded-full pointer-events-none -z-10" />

        <div className="glass-panel rounded-[32px] p-8 md:p-10 shadow-2xl relative border border-white/10">
          <div className="mb-10 text-center">
            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6 relative">
              <div className="absolute inset-1 rounded-full border-2 border-t-purple-400 border-r-indigo-400 border-b-transparent border-l-transparent animate-spin" />
              <svg
                className="w-6 h-6 text-purple-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z"
                />
              </svg>
            </div>

            <h1 className="font-head text-[28px] font-semibold text-white tracking-tight mb-2">
              Analyzing Repository
            </h1>
            <div className="inline-block bg-white/5 border border-white/5 px-4 py-1.5 rounded-full max-w-full">
              <p className="text-slate-300 font-mono text-xs truncate">{repoName}</p>
            </div>
          </div>

          <div className="space-y-6">
            {STAGES.map((stage, index) => {
              const isDone = currentStageIdx > index || progress.status === 'ready'
              const isActive = currentStageIdx === index && progress.status !== 'ready' && !error
              return (
                <div
                  key={stage.key}
                  className={`flex items-start gap-4 transition-opacity duration-300 ${
                    isActive ? 'opacity-100' : isDone ? 'opacity-80' : 'opacity-40'
                  }`}
                >
                  <div className="pt-1.5 flex-shrink-0">
                    {isDone ? (
                      <div className="w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      </div>
                    ) : isActive ? (
                      <div className="w-4 h-4 rounded-full bg-purple-500/20 border border-purple-400 flex items-center justify-center animate-pulse">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                      </div>
                    ) : (
                      <div className="w-4 h-4 rounded-full bg-white/5 border border-white/10" />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                      <span
                        className={`text-sm font-medium ${isActive ? 'text-white font-semibold' : 'text-slate-300'}`}
                      >
                        {isDone ? stage.done : stage.label}
                      </span>
                      {isActive && progress.current > 0 && progress.total > 0 && (
                        <span className="text-xs font-mono text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20">
                          {progress.current} / {progress.total}
                        </span>
                      )}
                    </div>

                    {(isActive || isDone) && (
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                        <div
                          className={`h-full rounded-full transition-all duration-300 bg-gradient-to-r ${
                            isDone
                              ? 'from-emerald-500 to-emerald-400'
                              : 'from-purple-500 via-indigo-400 to-cyan-400'
                          }`}
                          style={{ width: isDone ? '100%' : `${progress.progress_pct}%` }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {progress.current_sha && (
            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-slate-500 font-mono">
              <span>ACTIVE SNAPSHOT</span>
              <span className="text-slate-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                {progress.current_sha}
              </span>
            </div>
          )}

          {canCancel && (
            <div className="mt-8 pt-6 border-t border-white/10 text-center">
              <button
                type="button"
                onClick={handleCancel}
                disabled={isCancelling}
                className="px-5 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white text-sm font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isCancelling ? 'Cancelling...' : 'Cancel analysis'}
              </button>
            </div>
          )}

          {error && (
            <div className="mt-8 pt-6 border-t border-rose-500/20 text-center">
              <p className="text-rose-400 text-sm mb-4 leading-relaxed">{error}</p>
              <button
                onClick={() => navigate('/')}
                className="px-6 py-2 rounded-full bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-300 text-sm font-semibold transition-all duration-300"
              >
                Return & Retry
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
