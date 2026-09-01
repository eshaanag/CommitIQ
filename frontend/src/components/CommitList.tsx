import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import type { CommitListProps } from '../types'
import { formatSha, getHealthColor } from '../types'
import { GitCommit, ExternalLink, Search, X } from 'lucide-react'
import { sanitizeCommitMessage } from '../lib/utils'

export function CommitList({ commits, repoSlug, selectedSha, onSelect }: CommitListProps) {
 const [authorFilter, setAuthorFilter] = useState('')

const filteredCommits = useMemo(() => {
  const recent = [...commits].reverse()
  const query = authorFilter.trim().toLowerCase()

  if (!query) {
    return recent.slice(0, 30)
  }

  // Search across all commits, then slice the top matching results
  return recent
    .filter((commit) => {
      // Safely check author field, or author_name if available in your type
      const author = (commit.author || '').toLowerCase()
      return author.includes(query)
    })
    .slice(0, 30)
}, [commits, authorFilter])

  return (
    <div className="flex flex-col h-full space-y-3 relative">
      <div className="px-5 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <GitCommit className="w-4 h-4 text-purple-400" />
          <h3 className="font-head text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Snapshots Analyzed
          </h3>
        </div>
      </div>

      {/* Author Search Filter Input */}
      <div className="px-5">
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={authorFilter}
            onChange={(e) => setAuthorFilter(e.target.value)}
            placeholder="Filter by author name..."
            className="w-full bg-white/5 hover:bg-white/[0.08] focus:bg-white/10 border border-white/10 focus:border-purple-500/50 rounded-xl pl-8 pr-8 py-1.5 text-xs text-white placeholder-slate-400 transition-all outline-none focus:ring-1 focus:ring-purple-500/50"
            aria-label="Filter commits by author"
          />
          {authorFilter && (
            <button
              onClick={() => setAuthorFilter('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
              aria-label="Clear filter"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      <div className="overflow-y-auto flex-1 max-h-[400px] pr-1 space-y-1.5 scrollbar-thin">
        {filteredCommits.length === 0 ? (
          <div className="px-6 py-8 text-slate-500 text-xs font-medium flex flex-col items-center justify-center gap-2 text-center">
            <GitCommit className="w-6 h-6 text-slate-600 animate-pulse" />
            <span>
              {authorFilter
                ? `No commits found for author "${authorFilter}"`
                : 'No analyzed commits found'}
            </span>
          </div>
        ) : (
          filteredCommits.map((commit) => {
            const isSelected = selectedSha === commit.sha
            const healthColor = getHealthColor(commit.health_score)

            return (
              <div
                key={commit.sha}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl border transition-all duration-200 group relative ${
                  isSelected
                    ? 'bg-white/[0.06] border-purple-500/35 shadow-lg shadow-purple-500/5'
                    : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.04] hover:border-white/10'
                }`}
              >
                {isSelected && (
                  <span className="absolute left-1.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.7)]" />
                )}

                <button
                  onClick={() => onSelect(commit)}
                  className="flex-1 min-w-0 flex items-center gap-3 text-left focus:outline-none"
                >
                  <span
                    className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                      isSelected
                        ? 'text-purple-300 bg-purple-500/10 border-purple-500/15'
                        : 'text-slate-400 bg-white/5 border-white/5 group-hover:text-slate-300'
                    }`}
                  >
                    {formatSha(commit.sha)}
                  </span>

                  <span className="flex-1 text-slate-300 text-xs truncate font-medium group-hover:text-white transition-colors pr-1">
                    {sanitizeCommitMessage(commit.message)}
                  </span>

                  <span
                    className="font-mono text-xs font-extrabold flex-shrink-0 px-2 py-0.5 rounded-md"
                    style={{
                      color: healthColor,
                      backgroundColor: `${healthColor}12`,
                    }}
                  >
                    {commit.health_score.toFixed(0)}
                  </span>
                </button>

                <Link
                  to={`/dashboard/${repoSlug}/commit/${commit.sha}`}
                  className="text-purple-400 hover:text-white flex-shrink-0 p-1 bg-white/5 hover:bg-purple-500/15 rounded-lg border border-white/5 hover:border-purple-500/15 transition-all"
                  title="Open Focus Snapshot Details"
                >
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}