import { useState, useMemo, useCallback } from 'react'
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

type SortKey = 'file' | 'complexity' | 'churn_count' | 'risk_score' | 'loc'
type SortDir = 'asc' | 'desc'

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
      {width > 44 && height > 22 && (
        <text
          x={x + width / 2}
          y={y + height / 2}
          textAnchor="middle"
          fill="white"
          fontSize={Math.min(width / 8, 11)}
          fontFamily="monospace"
        >
          {label}
        </text>
      )}
    </g>
  )
}

function SortIcon({ active, dir }: { active: boolean; dir: SortDir }) {
  if (!active) return <span className="text-slate-600 ml-1">↕</span>
  return <span className="text-cyan-400 ml-1">{dir === 'asc' ? '↑' : '↓'}</span>
}

function Th({
  label,
  sortKey,
  currentSort,
  currentDir,
  onSort,
  align = 'left',
}: {
  label: string
  sortKey: SortKey
  currentSort: SortKey
  currentDir: SortDir
  onSort: (key: SortKey) => void
  align?: 'left' | 'right'
}) {
  return (
    <th
      className={`px-3 py-2 font-mono text-[10px] font-bold tracking-wider uppercase cursor-pointer select-none hover:text-cyan-400 transition-colors ${align === 'right' ? 'text-right' : 'text-left'}`}
      onClick={() => onSort(sortKey)}
    >
      {label}
      <SortIcon active={currentSort === sortKey} dir={currentDir} />
    </th>
  )
}

export function HotspotMap({ repoId, sha, startDate, endDate }: HotspotMapProps) {
  const hotspotState = useSWR(['hotspots', repoId, sha, startDate, endDate], () =>
    getHotspots(repoId, sha || undefined, startDate, endDate)
  )
  const hotspots = useMemo(() => hotspotState.data?.hotspots || [], [hotspotState.data])

  // ── Sorting state ──────────────────────────────────────────────
  const [sortKey, setSortKey] = useState<SortKey>('risk_score')
  const [sortDir, setSortDir] = useState<SortDir>('desc')

  const handleSort = useCallback(
    (key: SortKey) => {
      if (key === sortKey) {
        setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'))
      } else {
        setSortKey(key)
        setSortDir('desc')
      }
    },
    [sortKey]
  )

  const sortedHotspots = useMemo(() => {
    const sorted = [...hotspots]
    sorted.sort((a, b) => {
      const valA = a[sortKey]
      const valB = b[sortKey]
      if (typeof valA === 'string' && typeof valB === 'string') {
        return sortDir === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA)
      }
      return sortDir === 'asc'
        ? (Number(valA) || 0) - (Number(valB) || 0)
        : (Number(valB) || 0) - (Number(valA) || 0)
    })
    return sorted
  }, [hotspots, sortKey, sortDir])

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
    <section className="glass-panel rounded-[28px] shadow-2xl relative border border-white/10 p-5 flex flex-col gap-4">
      <div className="absolute inset-0 overflow-hidden rounded-[28px] pointer-events-none">
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-[60px]" />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
        <div>
          <h2 className="font-head text-[18px] font-semibold text-white tracking-tight">
            Complexity Churn Hotspots
          </h2>
          <p className="text-slate-400 text-xs mt-1">
            Area represents file complexity scaled by recent churn volume
          </p>
        </div>
        <div className="flex gap-3 text-[10px] font-bold tracking-wider uppercase font-mono">
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
      <div className="relative z-10" style={{ minHeight: 280 }}>
        {hotspotState.isLoading ? (
          <div className="h-[280px] flex items-center justify-center text-slate-400 font-mono text-xs animate-pulse">
            Loading hotspots...
          </div>
        ) : hotspots.length === 0 ? (
          <div className="h-[280px] flex items-center justify-center text-slate-500 font-mono text-xs">
            No high-complexity churn hotspots found for this commit.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={280}>
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
                    <div className="glass-panel-bright rounded-[20px] p-4 text-xs shadow-2xl border border-white/10 font-sans backdrop-blur-xl">
                      <p className="font-mono text-white mb-2 max-w-[260px] truncate pb-1.5 border-b border-white/5">
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
        )}
      </div>

      {/* ── Sortable Table ──────────────────────────────────────── */}
      {hotspots.length > 0 && (
        <div className="relative z-10 overflow-x-auto rounded-xl border border-white/5">
          <table className="w-full text-xs">
            <thead className="bg-white/5 border-b border-white/10">
              <tr>
                <Th
                  label="File"
                  sortKey="file"
                  currentSort={sortKey}
                  currentDir={sortDir}
                  onSort={handleSort}
                />
                <Th
                  label="LOC"
                  sortKey="loc"
                  currentSort={sortKey}
                  currentDir={sortDir}
                  onSort={handleSort}
                  align="right"
                />
                <Th
                  label="Churn"
                  sortKey="churn_count"
                  currentSort={sortKey}
                  currentDir={sortDir}
                  onSort={handleSort}
                  align="right"
                />
                <Th
                  label="Complexity"
                  sortKey="complexity"
                  currentSort={sortKey}
                  currentDir={sortDir}
                  onSort={handleSort}
                  align="right"
                />
                <Th
                  label="Risk"
                  sortKey="risk_score"
                  currentSort={sortKey}
                  currentDir={sortDir}
                  onSort={handleSort}
                  align="right"
                />
              </tr>
            </thead>
            <tbody>
              {sortedHotspots.slice(0, 50).map((hp, i) => {
                const risk = getRiskLevel(hp.risk_score)
                const riskColor = RISK_COLORS[risk]
                return (
                  <tr
                    key={`${hp.file}-${i}`}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td
                      className="px-3 py-2 font-mono text-slate-300 max-w-[280px] truncate"
                      title={hp.file}
                    >
                      {hp.file}
                    </td>
                    <td className="px-3 py-2 font-mono text-right text-slate-400">
                      {hp.loc ?? '—'}
                    </td>
                    <td className="px-3 py-2 font-mono text-right text-slate-400">
                      {hp.churn_count}
                    </td>
                    <td className="px-3 py-2 font-mono text-right text-slate-400">
                      {hp.complexity.toFixed(2)}
                    </td>
                    <td className="px-3 py-2 font-mono text-right">
                      <span
                        className="inline-flex items-center gap-1.5 font-bold"
                        style={{ color: riskColor }}
                      >
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: riskColor }}
                        />
                        {hp.risk_score.toFixed(1)}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
