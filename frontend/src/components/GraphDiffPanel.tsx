import useSWR from 'swr'
import { getGraphDiff } from '../lib/api'

interface GraphDiffPanelProps {
  repoId: string | number
  commitSha: string
  previousSha: string | null
}

function StatChip({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-base border border-border rounded-panel p-3">
      <div className="text-muted text-xs uppercase tracking-wider font-semibold">{label}</div>
      <div className="font-mono text-mono-lg text-primary font-bold mt-1">{value}</div>
    </div>
  )
}

export function GraphDiffPanel({ repoId, commitSha, previousSha }: GraphDiffPanelProps) {
  const diffState = useSWR(
    previousSha ? ['graph-diff', repoId, previousSha, commitSha] : null,
    () => getGraphDiff(repoId, previousSha as string, commitSha)
  )

  if (!previousSha) return null

  if (diffState.isLoading) {
    return (
      <div className="bg-surface border border-border rounded-panel p-5 shadow-panel text-muted">
        Loading structural diff...
      </div>
    )
  }

  if (diffState.error || !diffState.data) {
    return (
      <div className="bg-surface border border-border rounded-panel p-5 shadow-panel text-health-critical">
        Could not load structural diff.
      </div>
    )
  }

  const diff = diffState.data

  return (
    <section className="bg-surface border border-border rounded-panel p-5 shadow-panel">
      <h2 className="font-head text-h2 text-primary mb-4">Structural Change vs Previous Commit</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-5">
        <StatChip label="Files Added" value={diff.summary.files_added} />
        <StatChip label="Files Removed" value={diff.summary.files_removed} />
        <StatChip label="Files Changed" value={diff.summary.files_changed} />
        <StatChip label="Edges Added" value={diff.summary.edges_added} />
        <StatChip label="Edges Removed" value={diff.summary.edges_removed} />
      </div>

      {diff.nodes_changed.length > 0 ? (
        <div>
          <p className="text-xs text-muted mb-2 uppercase tracking-wider font-semibold">
            Biggest Complexity Shifts
          </p>
          <div className="space-y-2">
            {diff.nodes_changed.slice(0, 5).map((node) => (
              <div
                key={node.file}
                className="flex items-center justify-between gap-4 text-small border-b border-border/60 pb-2 last:border-b-0"
              >
                <span className="text-secondary truncate font-mono">{node.file}</span>
                <span
                  className={
                    node.delta_pct > 0
                      ? 'text-health-critical font-mono'
                      : 'text-health-good font-mono'
                  }
                >
                  {node.delta_pct > 0 ? '+' : ''}
                  {node.delta_pct}%
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-small text-muted">No file complexity changed by more than 10%.</p>
      )}
    </section>
  )
}
