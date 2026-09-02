import { useNavigate, useParams } from 'react-router-dom'
import useSWR from 'swr'
import { getCommitDetail, getHealthTimeline, getRepoBySlug } from '../lib/api'
import { GraphExplorer } from '../components/GraphExplorer'
import { GraphDiffPanel } from '../components/GraphDiffPanel'
import { ThemeToggle } from '../components/ui/ThemeToggle'
import { MetricTooltip } from '../components/ui/MetricTooltip'
import { NarrativeCard } from '../components/NarrativeCard'
import { getHealthColor } from '../types'
import { sanitizeCommitMessage } from '../lib/utils'
import { Sparkles, User, Calendar, ArrowLeft, GitCommit, Cpu, Flame, Users } from 'lucide-react'

export default function CommitDetailPage() {
  const { repoSlug, sha } = useParams<{ repoSlug: string; sha: string }>()
  const navigate = useNavigate()

  const repoState = useSWR(repoSlug ? ['repo', repoSlug] : null, () => getRepoBySlug(repoSlug))
  const repo = repoState.data
  const detailState = useSWR(repo && sha ? ['commit-detail', repo.id, sha] : null, () =>
    getCommitDetail(repo!.id, sha)
  )
  const timelineState = useSWR(repo ? ['timeline', repo.id] : null, () =>
    getHealthTimeline(repo!.id)
  )

  if (repoState.isLoading || detailState.isLoading) {
    return (
      <div className="min-h-screen bg-transparent flex flex-col items-center justify-center gap-4 text-slate-300">
        <Sparkles className="w-8 h-8 text-purple-400 animate-spin" />
        <span className="text-sm font-medium animate-pulse">
          Decompressing repository snapshot details...
        </span>
      </div>
    )
  }

  if (repoState.error || detailState.error || !repo || !detailState.data) {
    return (
      <div className="min-h-screen bg-transparent flex flex-col items-center justify-center gap-4 text-rose-400">
        <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
        <span className="text-sm font-semibold">Failed to fetch commit metadata snapshot.</span>
        <button
          onClick={() => navigate(`/dashboard/${repoSlug}`)}
          className="text-xs bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-full px-4 py-2 transition-all mt-2"
        >
          Return to Dashboard
        </button>
      </div>
    )
  }

  const detail = detailState.data
  const snapshot = detail.snapshot
  const color = getHealthColor(snapshot.health_score)
  const commits = timelineState.data || []
  const commitIndex = commits.findIndex((commit) => commit.sha === detail.commit.sha)
  const previousSha = commitIndex > 0 ? commits[commitIndex - 1].sha : null
  const churnPct = Math.min(Math.max(snapshot.churn_rate * 100, 0), 100)

  return (
    <div className="min-h-screen bg-transparent relative z-10 font-body pb-12 pt-[88px]">
      <div className="w-full fixed top-0 left-0 right-0 z-50 select-none pointer-events-none px-4 sm:px-6 pt-4">
        <nav className="glass-panel rounded-full h-16 px-6 flex items-center justify-between shadow-2xl pointer-events-auto">
          <button
            onClick={() => navigate(`/dashboard/${repoSlug}`)}
            className="text-xs font-bold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-4 py-2.5 transition-all flex items-center gap-2 pointer-events-auto"
          >
            <ArrowLeft className="w-4 h-4 text-purple-400" />
            Return to {repo.name} Dashboard
          </button>
          <ThemeToggle />
        </nav>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-8 py-8 space-y-8">
        <section className="glass-panel rounded-[28px] p-6 shadow-2xl relative border border-white/10 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-[60px] pointer-events-none" />

          <div className="flex items-center gap-2 bg-purple-500/10 border border-purple-500/15 px-3 py-1 rounded-full w-fit">
            <GitCommit className="w-3.5 h-3.5 text-purple-300" />
            <span className="font-mono text-[10px] font-bold text-purple-300 select-all leading-none">
              {detail.commit.sha}
            </span>
          </div>

          <h1 className="font-head text-[22px] sm:text-[26px] font-bold text-white tracking-tight mt-3 break-words leading-snug">
            {sanitizeCommitMessage(detail.commit.message)}
          </h1>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-4 pt-4 border-t border-white/5 text-xs text-slate-400 font-medium">
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-purple-400" />
              {detail.commit.author_name || 'Unknown Author'}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-purple-400" />
              {new Date(detail.commit.committed_at).toLocaleDateString(undefined, {
                dateStyle: 'long',
              })}
            </span>

            <div className="flex items-center gap-2 ml-auto">
              <span className="text-slate-500 font-mono text-[10px]">HEALTH METRIC:</span>
              <span style={{ color }} className="font-mono text-base font-extrabold select-all">
                {snapshot.health_score.toFixed(1)}
              </span>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            {
              label: 'Avg Complexity',
              value: snapshot.avg_complexity === 0 ? '-' : snapshot.avg_complexity.toFixed(1),
              unit: snapshot.avg_complexity === 0 ? 'no code files changed' : 'cyclomatic score',
              icon: <Cpu className="w-4 h-4 text-rose-400" />,
              tooltipTitle: 'Average Cyclomatic Complexity',
              tooltipDescription:
                'Average linearly independent execution paths across modified code files. Lower values signify more maintainable logic.',
              tooltipFormula:
                'M = E - N + 2P. Subscore = max(0, 100 - min(avg_complexity × 5, 100)).',
              tooltipWeight: '25% of Health Score',
              tooltipAlign: 'left' as const,
            },
            {
              label: 'Max Complexity',
              value: snapshot.max_complexity.toFixed(1),
              unit: 'single file limit',
              icon: <Cpu className="w-4 h-4 text-orange-400" />,
              tooltipTitle: 'Maximum File Complexity',
              tooltipDescription:
                'Highest cyclomatic complexity observed in any single modified file within this snapshot.',
              tooltipFormula: 'max(file_cyclomatic_scores)',
              tooltipAlign: 'center' as const,
            },
            {
              label: 'Commit Churn',
              value: `${churnPct.toFixed(0)}%`,
              unit: `${snapshot.insertions || 0} + / ${snapshot.deletions || 0} -`,
              icon: <Flame className="w-4 h-4 text-sky-400" />,
              tooltipTitle: 'Commit Churn Rate',
              tooltipDescription:
                'Ratio of total line modifications (additions + deletions) to codebase size.',
              tooltipFormula: 'Churn Rate = (insertions + deletions) / total_loc',
              tooltipWeight: '20% of Health Score',
              tooltipAlign: 'center' as const,
            },
            {
              label: 'Bus Factor',
              value: String(snapshot.bus_factor_min),
              unit: 'contributor pool',
              icon: <Users className="w-4 h-4 text-emerald-400" />,
              tooltipTitle: 'Bus Factor (Minimum)',
              tooltipDescription:
                'Minimum number of vital contributors whose absence threatens module knowledge continuity.',
              tooltipFormula: 'Subscore = min(bus_factor_min × 20, 100)',
              tooltipWeight: '20% of Health Score',
              tooltipAlign: 'center' as const,
            },
            {
              label: 'Semantic Drift',
              value: `${(snapshot.subscores?.semantic_drift ?? snapshot.semantic_health_score ?? 100).toFixed(0)}`,
              unit:
                snapshot.semantic_drift_method === 'graphcodebert'
                  ? 'GraphCodeBERT'
                  : 'offline semantic',
              icon: <Sparkles className="w-4 h-4 text-purple-400" />,
              tooltipTitle: 'Semantic Drift',
              tooltipDescription:
                'Semantic distance between the commit message and actual code diff embeddings.',
              tooltipFormula: 'Cosine similarity between commit message and diff patch tokens.',
              tooltipWeight: '20% of Health Score',
              tooltipAlign: 'right' as const,
            },
          ].map((metric) => (
            <div
              key={metric.label}
              className="glass-panel rounded-[24px] p-5 shadow-2xl border border-white/10 hover:border-white/15 transition-all flex flex-col justify-between"
            >
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="font-head text-[10px] font-semibold uppercase tracking-wider truncate">
                    {metric.label}
                  </span>
                  <MetricTooltip
                    title={metric.tooltipTitle}
                    description={metric.tooltipDescription}
                    formula={metric.tooltipFormula}
                    weight={metric.tooltipWeight}
                    align={metric.tooltipAlign}
                  />
                </div>
                {metric.icon}
              </div>
              <div className="font-head text-[32px] font-extralight text-white tracking-tight Outfit my-1">
                {metric.value}
              </div>
              <div className="text-slate-500 text-[10px] font-medium font-mono uppercase tracking-tight">
                {metric.unit}
              </div>
            </div>
          ))}
        </section>

        <GraphExplorer graphData={detail.graph} selectedSha={detail.commit.sha} />
        <GraphDiffPanel repoId={repo.id} commitSha={detail.commit.sha} previousSha={previousSha} />
        <NarrativeCard repoId={repo.id} commitSha={detail.commit.sha} />
      </main>
    </div>
  )
}
