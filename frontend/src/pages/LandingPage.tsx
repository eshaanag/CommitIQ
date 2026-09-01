import { useEffect, useState } from 'react'
import type { ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import useSWR from 'swr'
import { Trash2, Search, X } from 'lucide-react'
import { ingestRepo, listRepos } from '../lib/api'
import { ThemeToggle } from '../components/ui/ThemeToggle'
import { ConfirmDeleteRepoModal } from '../components/ConfirmDeleteRepoModal'

const PLACEHOLDERS = ['facebook/react', 'vercel/next.js', 'expressjs/express', 'vuejs/vue']

function parseGitHubUrl(url: string): { owner: string; repo: string } | null {
  let s = url.trim()

  while (s.endsWith('/') || s.endsWith('.git')) {
    if (s.endsWith('/')) {
      s = s.slice(0, -1)
    } else if (s.endsWith('.git')) {
      s = s.slice(0, -4)
    }
  }

  if (s.startsWith('https://')) {
    s = s.slice(8)
  } else if (s.startsWith('http://')) {
    s = s.slice(7)
  }

  if (s.startsWith('www.')) {
    s = s.slice(4)
  }

  if (s.startsWith('github.com/')) {
    s = s.slice(11)
  }

  const parts = s.split('/')
  if (parts.length < 2 || !parts[0] || !parts[1]) {
    return null
  }

  // Convert owner and repo to lowercase to maintain consistent URL formatting
  const owner = parts[0].toLowerCase()
  const repo = parts[1].toLowerCase()

  const nameRegex = /^[\w.-]+$/
  if (!nameRegex.test(owner) || !nameRegex.test(repo)) {
    return null
  }

  return { owner, repo }
}

export default function LandingPage() {
  const [url, setUrl] = useState('')
  const [status, setStatus] = useState<'idle' | 'valid' | 'invalid'>('idle')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [phIdx, setPhIdx] = useState(0)
  const [maxCommits, setMaxCommits] = useState('500')
  const [branch, setBranch] = useState('')
  const [repoSearch, setRepoSearch] = useState('')
  const [pendingDelete, setPendingDelete] = useState<{ id: number; slug: string } | null>(null)
  const navigate = useNavigate()

  const reposState = useSWR('recent-repos', () => listRepos())
  const recentRepos = reposState.data || []

  const filteredRepos = recentRepos.filter((repo) => {
    const q = repoSearch.toLowerCase().trim()
    if (!q) return true
    return (
      repo.repo_slug.toLowerCase().includes(q) ||
      (repo.github_description && repo.github_description.toLowerCase().includes(q))
    )
  })

  useEffect(() => {
    const timer = setInterval(() => setPhIdx((idx) => (idx + 1) % PLACEHOLDERS.length), 2800)
    return () => clearInterval(timer)
  }, [])

  const validateUrl = (value: string) => {
    if (!value.trim()) {
      setStatus('idle')
      return
    }
    const parsed = parseGitHubUrl(value)
    setStatus(parsed ? 'valid' : 'invalid')
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setError(null)
    setUrl(event.target.value)
    validateUrl(event.target.value)
  }

  const handleSubmit = async () => {
    if (loading) return
    const parsed = parseGitHubUrl(url)
    if (!parsed) {
      setStatus('invalid')
      setError(
        url.trim()
          ? 'Please enter a complete GitHub repository URL or owner/repo path (e.g. Myparadox-creator/CommitIQ---).'
          : 'Please enter a GitHub repository URL to analyze.'
      )
      return
    }
    setLoading(true)
    setError(null)
    try {
      const normalizedUrl = `https://github.com/${parsed.owner}/${parsed.repo}`
      const commitsNum = maxCommits ? parseInt(maxCommits, 10) : 500
      const response = await ingestRepo(
        normalizedUrl,
        isNaN(commitsNum) ? 500 : commitsNum,
        branch || undefined
      )
      navigate(`/analyze?repo_id=${response.repo_id}&name=${encodeURIComponent(normalizedUrl)}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not start repository ingestion.')
      setLoading(false)
    }
  }

  const statusBorderClass = {
    idle: 'border-white/10 focus-within:border-purple-500/50 focus-within:shadow-[0_0_20px_rgba(167,139,250,0.15)]',
    valid:
      'border-emerald-500/40 focus-within:border-emerald-500/70 focus-within:shadow-[0_0_20px_rgba(52,211,153,0.2)]',
    invalid:
      'border-rose-500/40 focus-within:border-rose-500/70 focus-within:shadow-[0_0_20px_rgba(244,63,94,0.2)]',
  }[status]

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-purple-500/30">
      <header className="w-full max-w-5xl mx-auto px-4 pt-6">
        <div className="glass-panel rounded-full px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-6 h-6 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 shadow-md">
              <div className="absolute inset-0.5 rounded-full bg-[#0a0b10]/20 backdrop-blur-sm" />
              <div className="absolute inset-1 rounded-full bg-gradient-to-tr from-purple-400 to-cyan-400 opacity-80 blur-[2px]" />
            </div>
            <span className="font-head text-[20px] font-semibold tracking-tight text-white glow-text-brand">
              Commit<span className="text-purple-400">IQ</span>
            </span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate('/compare')}
              className="text-slate-300 hover:text-white text-sm font-medium tracking-wide transition-colors"
            >
              Compare
            </button>
            <button
              onClick={() => navigate('/demo')}
              className="text-slate-300 hover:text-white text-sm font-medium tracking-wide transition-colors"
            >
              Interactive Demo
            </button>
            <a
              href="https://github.com/Myparadox-creator/CommitIQ---"
              target="_blank"
              rel="noreferrer"
              className="text-slate-300 hover:text-white text-sm font-medium tracking-wide transition-colors"
            >
              GitHub
            </a>
            <div className="w-[1px] h-4 bg-white/10" />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12 md:py-20">
        <div className="max-w-3xl w-full text-center relative">
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 bg-purple-600/10 blur-[90px] rounded-full pointer-events-none" />

          <h1 className="font-head text-[44px] md:text-[62px] leading-tight text-white mb-4 tracking-tight font-light select-none">
            Every commit has a{' '}
            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-200 to-cyan-300">
              story.
            </span>
          </h1>
          <p className="font-head text-[20px] md:text-[24px] text-slate-300 mb-10 font-light tracking-wide max-w-xl mx-auto select-none">
            Decipher architecture, complexity shifts, and knowledge dynamics directly from your
            codebase history.
          </p>

          <div className="max-w-xl mx-auto mb-6">
            <div
              className={`glass-panel rounded-full p-1.5 flex items-center transition-all duration-300 ${statusBorderClass}`}
            >
              <div className="pl-4 text-purple-400/70 select-none">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                autoFocus
                type="text"
                value={url}
                onChange={handleChange}
                onKeyDown={(event) => event.key === 'Enter' && handleSubmit()}
                placeholder={`Search or enter e.g. ${PLACEHOLDERS[phIdx]}`}
                className="flex-1 bg-transparent text-white font-mono text-sm px-3 py-2 outline-none w-full placeholder-slate-500"
              />
              <div className="w-[1px] h-6 bg-white/10 mx-2" />
              <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono pr-2 select-none">
                <span>LIMIT:</span>
                <input
                  type="number"
                  value={maxCommits}
                  onChange={(e) => setMaxCommits(e.target.value)}
                  onKeyDown={(event) => event.key === 'Enter' && handleSubmit()}
                  placeholder="500"
                  min="1"
                  max="500"
                  className="w-12 bg-transparent text-white font-mono text-xs outline-none focus:text-purple-300 transition-colors"
                />
              </div>
              <button
                onClick={handleSubmit}
                disabled={loading || url.trim().length === 0}
                className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-all duration-300 disabled:opacity-40 disabled:hover:bg-white/10 disabled:cursor-not-allowed flex items-center gap-2 border border-white/5 active:scale-95"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="3"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span>Parsing...</span>
                  </>
                ) : (
                  <span>Analyze</span>
                )}
              </button>
            </div>
            <div className="mt-3">
              <input
                type="text"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                onKeyDown={(event) => event.key === 'Enter' && handleSubmit()}
                placeholder="Branch (optional)"
                className="w-full glass-panel rounded-xl px-4 py-3 bg-transparent text-white font-mono text-sm outline-none placeholder-slate-500 border border-white/10 focus:border-purple-500/50"
              />
            </div>
          </div>

          {status === 'invalid' && (
            <div className="flex items-center gap-2 justify-center text-rose-400 text-sm mb-4 animate-fade-in">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
              <span>Please enter a valid owner/repository format.</span>
            </div>
          )}

          {error && (
            <div className="glass-panel-bright rounded-xl border border-rose-500/20 px-4 py-2.5 max-w-xl mx-auto mb-6 text-rose-300 text-sm flex items-center justify-center gap-3">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span>
                {error.includes('500 commits')
                  ? 'Demo version is limited to codebases within 500 commits.'
                  : error}
              </span>
            </div>
          )}

          <div className="flex justify-center gap-3">
            <button
              onClick={() => navigate('/demo')}
              className="text-purple-400 hover:text-purple-300 font-medium text-sm transition-all duration-300 hover:shadow-[0_0_15px_rgba(167,139,250,0.15)] rounded-full px-4 py-1.5 border border-purple-500/20 bg-purple-500/5 hover:bg-purple-500/10"
            >
              Or load facebook/react demo instantly →
            </button>
          </div>

          {recentRepos.length > 0 && (
            <div
              className="mt-12 text-left max-w-4xl mx-auto"
              aria-label="Analyzed repositories list"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <h2 className="font-head text-lg font-semibold text-white tracking-tight flex items-center gap-3">
                  <span>Analyzed Repositories</span>
                  <span className="text-xs font-mono text-slate-400 font-normal">
                    {filteredRepos.length} of {recentRepos.length}
                  </span>
                </h2>

                {/* Real-time search filter */}
                <div className="relative w-full sm:w-64">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={repoSearch}
                    onChange={(e) => setRepoSearch(e.target.value)}
                    placeholder="Search repositories..."
                    className="w-full bg-white/5 border border-white/10 rounded-full pl-8 pr-8 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-purple-500/50 transition-all font-mono"
                  />
                  {repoSearch && (
                    <button
                      onClick={() => setRepoSearch('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>

              {filteredRepos.length === 0 ? (
                <div className="glass-panel rounded-[20px] p-8 text-center border border-white/5">
                  <p className="text-slate-400 text-sm">
                    No repositories matching "
                    <span className="text-purple-300 font-mono">{repoSearch}</span>"
                  </p>
                  <button
                    onClick={() => setRepoSearch('')}
                    className="mt-3 text-xs text-purple-400 hover:text-purple-300 underline"
                  >
                    Clear filter
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {filteredRepos.map((r) => (
                    <div
                      key={r.id}
                      onClick={() => navigate(`/dashboard/${r.repo_slug}`)}
                      className="relative glass-panel rounded-[20px] p-4 border border-white/10 hover:border-purple-500/40 hover:bg-white/[0.04] transition-all cursor-pointer flex flex-col justify-between group"
                    >
                      <button
                        onClick={(event) => {
                          event.stopPropagation()
                          setPendingDelete({ id: r.id, slug: r.repo_slug })
                        }}
                        aria-label={`Delete ${r.repo_slug}`}
                        className="absolute top-3 right-3 p-1.5 rounded-full text-slate-500 opacity-0 group-hover:opacity-100 hover:text-rose-400 hover:bg-rose-500/10 transition-all"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <div>
                        <div className="font-mono text-sm font-bold text-white group-hover:text-purple-300 transition-colors truncate pr-6">
                          {r.repo_slug}
                        </div>
                        {r.github_description && (
                          <p className="text-slate-400 text-xs mt-1 line-clamp-2">
                            {r.github_description}
                          </p>
                        )}
                      </div>
                      <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
                        <span>{r.analyzed_commits} commits</span>
                        <span className="flex items-center gap-1 text-purple-300 font-semibold bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/15">
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                            />
                          </svg>
                          {r.active_contributors_count ?? 0} active contributors
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <div
            className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-4xl mx-auto"
            aria-label="Static product capabilities"
          >
            {[
              {
                title: 'Health Timeline',
                desc: 'Replay commit activity visually and scrub through complexity, churn, and code risk dynamics over time.',
                icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
                glow: 'group-hover:border-indigo-500/30 group-hover:shadow-[0_0_30px_rgba(99,102,241,0.06)]',
              },
              {
                title: 'Knowledge Graph',
                desc: 'Fly through 3D dependency streams to identify hidden import coupling and import risk structural flaws.',
                icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7',
                glow: 'group-hover:border-purple-500/30 group-hover:shadow-[0_0_30px_rgba(167,139,250,0.06)]',
              },
              {
                title: 'Bus Factor Index',
                desc: 'Audit critical files single-person dependencies to mitigate key-person risks before refactoring.',
                icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
                glow: 'group-hover:border-cyan-500/30 group-hover:shadow-[0_0_30px_rgba(6,182,212,0.06)]',
              },
            ].map((cap) => (
              <div
                key={cap.title}
                className={`group glass-panel rounded-[24px] p-6 transition-all duration-500 ${cap.glow} cursor-default`}
              >
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-purple-500/10 group-hover:border-purple-500/30">
                  <svg
                    className="w-5 h-5 text-slate-300 group-hover:text-purple-400 transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d={cap.icon}
                    />
                  </svg>
                </div>
                <h2 className="font-head text-lg font-medium text-white mb-2">{cap.title}</h2>
                <p className="text-slate-400 text-sm leading-relaxed">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="py-8 text-center text-xs text-slate-500 select-none space-y-1">
        <p>CommitIQ Spatial Intel — Designed for Vision Pro & High Performance Computing</p>
        <p>
          Built by{' '}
          <a
            href="https://www.pixelary.in"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-400 underline decoration-slate-600 underline-offset-2 transition-colors"
          >
            Pixelary
          </a>
        </p>
      </footer>

      {pendingDelete && (
        <ConfirmDeleteRepoModal
          repoId={pendingDelete.id}
          repoSlug={pendingDelete.slug}
          onClose={() => setPendingDelete(null)}
          onDeleted={(deletedId) => {
            reposState.mutate(
              (current) => (current || []).filter((repo) => repo.id !== deletedId),
              false
            )
            setPendingDelete(null)
          }}
        />
      )}
    </div>
  )
}
