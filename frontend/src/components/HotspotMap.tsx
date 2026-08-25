import { useState } from 'react'
import { ResponsiveContainer, Tooltip, Treemap } from 'recharts'
import useSWR from 'swr'
import { getHotspots } from '../lib/api'

interface HotspotMapProps {
  repoId: string | number
  sha?: string | null
  startDate?: string
  endDate?: string
}

interface TreemapNode {
  name?: string
  fullPath?: string
  size?: number
  riskScore?: number
  complexity?: number
  churnCount?: number
  loc?: number
  x?: number
  y?: number
  width?: number
  height?: number
}

const RISK_COLORS = {
  critical: '#dc2626',
  high: '#f97316',
  medium: '#eab308',
  low: '#22c55e',
}

function getRiskLevel(score: number): keyof typeof RISK_COLORS {
  if (score > 75) return 'critical'
  if (score > 50) return 'high'
  if (score > 25) return 'medium'
  return 'low'
}

function HotspotCell(props: TreemapNode) {
  const { x = 0, y = 0, width = 0, height = 0, name = '', riskScore = 0 } = props
  const risk = getRiskLevel(riskScore)
  const labelLimit = Math.max(3, Math.floor(width / 7))
  const label = name.length > labelLimit ? `${name.slice(0, labelLimit)}...` : name
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={RISK_COLORS[risk]}
        fillOpacity={0.86}
        stroke="var(--color-surface)"
        strokeWidth={1}
        rx={2}
      />
      {width > 36 && height > 18 && (
        <text
          x={x + width / 2}
          y={y + height / 2}
          textAnchor="middle"
          fill="white"
          fontSize={Math.min(Math.max(width / 8, 8), 11)}
          fontFamily="monospace"
          dominantBaseline="central"
        >
          {label}
        </text>
      )}
    </g>
  )
}

export function HotspotMap({ repoId, sha }: HotspotMapProps) {
  const [offset, setOffset] = useState(0)
  const limit = 50

  const hotspotState = useSWR(['hotspots', repoId, sha, limit, offset], () =>
    getHotspots(repoId, sha || undefined, limit, offset)
  )
  const hotspots = hotspotState.data?.hotspots || []
  const total = hotspotState.data?.total ?? hotspots.length

  const currentPage = Math.floor(offset / limit) + 1
  const totalPages = Math.ceil(total / limit) || 1

  const handlePrevPage = () => {
    setOffset((prev) => Math.max(0, prev - limit))
  }

  const handleNextPage = () => {
    if (offset + limit < total) {
      setOffset((prev) => prev + limit)
    }
  }

  const treemapData: TreemapNode[] = hotspots.map((hotspot) => ({
    name: hotspot.file.split('/').pop() || hotspot.file,
    fullPath: hotspot.file,
    size: hotspot.complexity * hotspot.churn_count + 1,
    riskScore: hotspot.risk_score,
    complexity: hotspot.complexity,
    churnCount: hotspot.churn_count,
    loc: hotspot.loc,
  }))

  return (
    <section className="glass-panel rounded-[24px] sm:rounded-[28px] shadow-2xl relative border border-white/10 p-4 sm:p-5 flex flex-col gap-4 w-full max-w-full overflow-hidden min-w-0">
      <div className="absolute inset-0 overflow-hidden rounded-[24px] sm:rounded-[28px] pointer-events-none">
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-[60px]" />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 relative z-10">
        <div>
          <h2 className="font-head text-[16px] sm:text-[18px] font-semibold text-white tracking-tight flex items-center gap-2 flex-wrap">
            Complexity Churn Hotspots
            {total > 0 && (
              <span className="text-[11px] font-mono font-normal px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300">
                Total: {total}
              </span>
            )}
          </h2>
          <p className="text-slate-400 text-xs mt-1">
            Area represents file complexity scaled by recent churn volume
          </p>
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-3 text-[10px] font-bold tracking-wider uppercase font-mono">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 border border-red-500/30" />{' '}
            Critical
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 border border-orange-400/30" />{' '}
            High
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 border border-yellow-400/30" />{' '}
            Medium
          </span>
        </div>
      </div>

      {/* ── Treemap ─────────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-full overflow-hidden min-w-0" style={{ minHeight: 240 }}>
        {hotspotState.isLoading ? (
          <div className="h-[240px] sm:h-[280px] flex items-center justify-center text-slate-400 font-mono text-xs animate-pulse">
            Loading hotspots...
          </div>
        ) : hotspots.length === 0 ? (
          <div className="h-[240px] sm:h-[280px] flex items-center justify-center text-slate-500 font-mono text-xs">
            No high-complexity churn hotspots found for this commit.
          </div>
        ) : (
          <div className="w-full h-[240px] sm:h-[280px] max-w-full overflow-hidden">
            <ResponsiveContainer width="100%" height="100%">
              <Treemap
                data={treemapData}
                dataKey="size"
                aspectRatio={4 / 3}
                content={<HotspotCell />}
              >
                <Tooltip
                  allowEscapeViewBox={{ x: true, y: true }}
                  content={({ payload }) => {
                    if (!payload?.[0]) return null
                    const item = payload[0].payload as TreemapNode
                    return (
                      <div className="glass-panel-bright rounded-[16px] sm:rounded-[20px] p-3 sm:p-4 text-xs shadow-2xl border border-white/10 font-sans backdrop-blur-xl max-w-[240px] sm:max-w-[280px]">
                        <p className="font-mono text-white mb-2 truncate pb-1.5 border-b border-white/5">
                          {item.fullPath}
                        </p>
                        <div className="space-y-1 font-mono text-[11px]">
                          <p className="text-slate-400">
                            Complexity:{' '}
                            <span className="text-white font-bold">{item.complexity ?? 0}</span>
                          </p>
                          <p className="text-slate-400">
                            Churn count:{' '}
                            <span className="text-white font-bold">{item.churnCount ?? 0}</span>
                          </p>
                          <p className="text-slate-400">
                            LOC: <span className="text-white font-bold">{item.loc ?? '—'}</span>
                          </p>
                          <p className="text-slate-400">
                            Risk score:{' '}
                            <span className="text-red-400 font-bold">{item.riskScore ?? 0}/100</span>
                          </p>
                        </div>
                      </div>
                    )
                  }}
                />
              </Treemap>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {total > limit && (
        <div className="mt-4 pt-3 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 relative z-10 text-xs font-mono text-slate-400">
          <span className="text-center sm:text-left">
            Page {currentPage} of {totalPages} ({offset + 1}-{Math.min(offset + limit, total)} of{' '}
            {total})
          </span>
          <div className="flex gap-2">
            <button
              onClick={handlePrevPage}
              disabled={offset === 0}
              aria-label="Previous page"
              className="px-3 py-1 rounded-lg border border-white/10 bg-white/5 text-white hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={offset + limit >= total}
              aria-label="Next page"
              className="px-3 py-1 rounded-lg border border-white/10 bg-white/5 text-white hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
