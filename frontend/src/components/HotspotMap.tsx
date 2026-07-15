import { useState } from 'react'
import { ResponsiveContainer, Tooltip, Treemap } from 'recharts'
import useSWR from 'swr'
import { getHotspots } from '../lib/api'

interface HotspotMapProps {
  repoId: string | number
  sha?: string | null
}

interface TreemapNode {
  name?: string
  fullPath?: string
  size?: number
  riskScore?: number
  complexity?: number
  churnCount?: number
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
      <rect x={x} y={y} width={width} height={height} fill={RISK_COLORS[risk]} fillOpacity={0.86} stroke="var(--color-surface)" strokeWidth={1} rx={2} />
      {width > 44 && height > 22 && (
        <text x={x + width / 2} y={y + height / 2} textAnchor="middle" fill="white" fontSize={Math.min(width / 8, 11)} fontFamily="monospace">
          {label}
        </text>
      )}
    </g>
  )
}

export function HotspotMap({ repoId, sha }: HotspotMapProps) {
  const hotspotState = useSWR(['hotspots', repoId, sha], () => getHotspots(repoId, sha || undefined))
  const hotspots = hotspotState.data?.hotspots || []
  const treemapData: TreemapNode[] = hotspots.map((hotspot) => ({
    name: hotspot.file.split('/').pop() || hotspot.file,
    fullPath: hotspot.file,
    size: hotspot.complexity * hotspot.churn_count + 1,
    riskScore: hotspot.risk_score,
    complexity: hotspot.complexity,
    churnCount: hotspot.churn_count,
  }))

  return (
    <section className="glass-panel rounded-[28px] overflow-hidden shadow-2xl relative border border-white/10 p-5 flex flex-col justify-between">
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-[60px] pointer-events-none" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 relative z-10">
        <div>
          <h2 className="font-head text-[18px] font-semibold text-white tracking-tight">Complexity Churn Hotspots</h2>
          <p className="text-slate-400 text-xs mt-1">Area represents file complexity scaled by recent churn volume</p>
        </div>
        <div className="flex gap-3 text-[10px] font-bold tracking-wider uppercase font-mono">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-600 border border-red-500/30" /> Critical</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-orange-500 border border-orange-400/30" /> High</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-yellow-500 border border-yellow-400/30" /> Medium</span>
        </div>
      </div>

      <div className="relative z-10 flex-grow" style={{ minHeight: 280 }}>
        {hotspotState.isLoading ? (
          <div className="h-[280px] flex items-center justify-center text-slate-400 font-mono text-xs animate-pulse">Loading hotspots...</div>
        ) : hotspots.length === 0 ? (
          <div className="h-[280px] flex items-center justify-center text-slate-500 font-mono text-xs">No high-complexity churn hotspots found for this commit.</div>
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <Treemap
              data={treemapData}
              dataKey="size"
              aspectRatio={4 / 3}
              content={<HotspotCell />}
            >
              <Tooltip
                content={({ payload }) => {
                  if (!payload?.[0]) return null
                  const item = payload[0].payload as TreemapNode
                  return (
                    <div className="glass-panel-bright rounded-[20px] p-4 text-xs shadow-2xl border border-white/10 font-sans backdrop-blur-xl">
                      <p className="font-mono text-white mb-2 max-w-[260px] truncate pb-1.5 border-b border-white/5">{item.fullPath}</p>
                      <div className="space-y-1 font-mono text-[11px]">
                        <p className="text-slate-400">Complexity: <span className="text-white font-bold">{item.complexity ?? 0}</span></p>
                        <p className="text-slate-400">Churn count: <span className="text-white font-bold">{item.churnCount ?? 0}</span></p>
                        <p className="text-slate-400">Risk score: <span className="text-red-400 font-bold">{item.riskScore ?? 0}/100</span></p>
                      </div>
                    </div>
                  )
                }}
              />
            </Treemap>
          </ResponsiveContainer>
        )}
      </div>
    </section>
  )
}
