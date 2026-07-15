import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Area,
  Brush,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { AreaDotProps, ChartClickState, ChartTooltipProps, HealthTimelineProps } from '../types'
import { formatSha, getHealthColor } from '../types'
import { formatDateShort } from '../lib/utils'
import { GitCommit, TrendingUp, Cpu, Flame } from 'lucide-react'

function CommitTooltip({ active, payload }: ChartTooltipProps) {
  if (!active || !payload?.length) return null
  const data = payload[0]?.payload
  if (!data) return null

  const healthColor = getHealthColor(data.health_score)

  return (
    <div className="glass-tooltip rounded-[24px] p-4 shadow-2xl min-w-[240px] border border-white/15 backdrop-blur-2xl transition-all duration-200">
      <div className="flex items-center justify-between gap-3 mb-2 pb-2 border-b border-white/5">
        <span className="font-mono text-[10px] text-purple-300 font-semibold bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/15">
          {formatSha(data.sha)}
        </span>
        <span className="text-[10px] text-slate-400 font-medium">
          {formatDateShort(data.committed_at)}
        </span>
      </div>
      
      <div className="text-white text-xs font-medium mb-3 line-clamp-2 max-w-[220px] font-sans">
        {data.message || 'No commit message'}
      </div>

      <div className="space-y-2 pt-1">
        <div className="flex items-center justify-between text-xs bg-white/5 px-2.5 py-1.5 rounded-xl border border-white/5">
          <span className="text-slate-400 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: healthColor }} />
            Health Index
          </span>
          <span className="font-mono font-bold" style={{ color: healthColor }}>
            {data.health_score.toFixed(1)}
          </span>
        </div>
        
        <div className="flex items-center justify-between text-xs bg-white/5 px-2.5 py-1.5 rounded-xl border border-white/5">
          <span className="text-slate-400 flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-rose-400" />
            Avg Complexity
          </span>
          <span className="font-mono font-bold text-rose-300">
            {data.avg_complexity.toFixed(1)}
          </span>
        </div>
        <div className="flex items-center justify-between text-xs bg-white/5 px-2.5 py-1.5 rounded-xl border border-white/5">
          <span className="text-slate-400 flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-sky-400" />
            Churn Rate
          </span>
          <span className="font-mono font-bold text-sky-300">
            {(data.churn_rate * 100).toFixed(1)}%
          </span>
        </div>
        
        <div className="flex items-center justify-between text-xs bg-white/5 px-2.5 py-1.5 rounded-xl border border-white/5">
          <span className="text-slate-400 flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
            Semantic Drift
          </span>
          <span className="font-mono font-bold text-cyan-300">
            {(data.subscores?.semantic_drift ?? data.semantic_health_score ?? 100).toFixed(1)}
          </span>
        </div>
        {data.semantic_drift_method === 'graphcodebert' && (
          <div className="inline-flex items-center gap-1.5 text-[10px] bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 rounded-full px-2 py-0.5 font-mono mt-1 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            GraphCodeBERT
          </div>
        )}
      </div>
    </div>
  )
}

export function HealthTimeline({ commits, repoSlug, selectedSha, onSelectCommit }: HealthTimelineProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Listen to ArrowLeft/ArrowRight to cycle commits
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [commits]);
  const navigate = useNavigate()
  const [visibleLines, setVisibleLines] = useState({
    complexity_drift: false,
    churn_risk: false,
    bus_factor_risk: false,
    dependency_health: false,
    semantic_drift: false,
  })

  if (commits.length === 0) {
    return (
      <div className="glass-panel rounded-[28px] p-6 shadow-2xl h-48 flex flex-col items-center justify-center text-slate-400 border border-white/10">
        <GitCommit className="w-8 h-8 text-slate-500 mb-2 animate-pulse" />
        <span className="text-sm font-medium">No health timeline data compiled yet</span>
      </div>
    )
  }

  const handleClick = (data: ChartClickState) => {
    const commit = data?.activePayload?.[0]?.payload
    if (!commit) return
    onSelectCommit(commit)
    if (repoSlug) navigate(`/dashboard/${repoSlug}/commit/${commit.sha}`)
  }

  const toggleLine = (key: keyof typeof visibleLines) => {
    setVisibleLines(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="glass-panel rounded-[28px] p-6 shadow-2xl relative border border-white/10 overflow-hidden">
      <div className="absolute -top-12 -left-12 w-48 h-48 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4 mb-6 relative z-10">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-400" />
            <h2 className="font-head text-[18px] font-semibold text-white tracking-tight">Codebase Health Timeline</h2>
          </div>
          <p className="text-slate-400 text-xs mt-1">Interactive timeline tracker highlighting drift over recent commits</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            Health Index
          </span>

          {[
            {
              key: 'complexity_drift',
              label: 'Complexity',
              color: 'text-amber-300',
              dotBg: 'bg-amber-400',
              activeBg: 'bg-amber-500/15 border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.15)]',
            },
            {
              key: 'churn_risk',
              label: 'Churn',
              color: 'text-rose-300',
              dotBg: 'bg-rose-400',
              activeBg: 'bg-rose-500/15 border-rose-500/30 shadow-[0_0_15px_rgba(244,63,94,0.15)]',
            },
            {
              key: 'bus_factor_risk',
              label: 'Bus Factor',
              color: 'text-fuchsia-300',
              dotBg: 'bg-fuchsia-400',
              activeBg: 'bg-fuchsia-500/15 border-fuchsia-500/30 shadow-[0_0_15px_rgba(217,70,239,0.15)]',
            },
            {
              key: 'dependency_health',
              label: 'Dependencies',
              color: 'text-emerald-300',
              dotBg: 'bg-emerald-400',
              activeBg: 'bg-emerald-500/15 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.15)]',
            },
            {
              key: 'semantic_drift',
              label: 'Semantic',
              color: 'text-cyan-300',
              dotBg: 'bg-cyan-400',
              activeBg: 'bg-cyan-500/15 border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.15)]',
            }
          ].map((item) => {
            const isActive = visibleLines[item.key as keyof typeof visibleLines]
            return (
              <button
                key={item.key}
                onClick={() => toggleLine(item.key as keyof typeof visibleLines)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 border text-xs font-semibold cursor-pointer ${
                  isActive 
                    ? `${item.activeBg} ${item.color}` 
                    : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-300'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${item.dotBg} ${isActive ? 'animate-pulse' : 'opacity-60'}`} />
                {item.label}
              </button>
            )
          })}
        </div>
      </div>

      <div className="w-full relative z-10" style={{ height: 280 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={commits} onClick={handleClick} style={{ cursor: 'pointer' }}>
            <defs>
              <linearGradient id="healthGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a855f7" stopOpacity={0.22} />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--glass-border)" vertical={false} />
            <XAxis 
              dataKey="committed_at" 
              tickFormatter={(value: string) => formatDateShort(value)} 
              tick={{ fill: 'var(--color-muted)', fontSize: 10, fontFamily: 'var(--font-body)' }} 
              axisLine={false} 
              tickLine={false} 
              minTickGap={40} 
            />
            <YAxis 
              domain={[0, 100]} 
              tick={{ fill: 'var(--color-muted)', fontSize: 10, fontFamily: 'var(--font-mono)' }} 
              axisLine={false} 
              tickLine={false} 
              width={28} 
            />
            <Tooltip 
              content={<CommitTooltip />} 
              cursor={{ stroke: 'var(--glass-border)', strokeWidth: 1.5 }}
              wrapperStyle={{ zIndex: 999999, pointerEvents: 'none' }}
              useTranslate3d={true}
            />

            <Area
              type="monotone"
              dataKey="health_score"
              stroke="rgba(167, 139, 250, 0.85)"
              strokeWidth={2.5}
              fill="url(#healthGrad)"
              dot={(props: AreaDotProps) => {
                const score = props.payload?.health_score || 0
                const isSelected = props.payload?.sha === selectedSha
                const color = getHealthColor(score)
                const radius = isSelected ? 7 : 3.5

                return (
                  <g key={props.index}>
                    {isSelected && (
                      <circle 
                        cx={props.cx || 0} 
                        cy={props.cy || 0} 
                        r={12} 
                        fill={color} 
                        opacity={0.16} 
                        className="animate-ping"
                      />
                    )}
                    <circle 
                      cx={props.cx || 0} 
                      cy={props.cy || 0} 
                      r={radius} 
                      fill={isSelected ? '#ffffff' : 'rgba(10, 11, 16, 0.85)'} 
                      stroke={color} 
                      strokeWidth={isSelected ? 4 : 2} 
                    />
                  </g>
                )
              }}
            />
            
            <Line 
              type="monotone" 
              dataKey="subscores.complexity_drift" 
              stroke="#fb1" 
              strokeWidth={1.5} 
              strokeDasharray="4 3" 
              dot={false}
              hide={!visibleLines.complexity_drift}
              name="Complexity Drift"
            />
            
            <Line 
              type="monotone" 
              dataKey="subscores.churn_risk" 
              stroke="#ef4444" 
              strokeWidth={1.5} 
              strokeDasharray="3 3" 
              dot={false}
              hide={!visibleLines.churn_risk}
              name="Churn Risk"
            />

            <Line 
              type="monotone" 
              dataKey="subscores.bus_factor_risk" 
              stroke="#d946ef" 
              strokeWidth={1.5} 
              strokeDasharray="4 2" 
              dot={false}
              hide={!visibleLines.bus_factor_risk}
              name="Bus Factor"
            />

            <Line 
              type="monotone" 
              dataKey="subscores.dependency_health" 
              stroke="#10b981" 
              strokeWidth={1.5} 
              strokeDasharray="5 3" 
              dot={false}
              hide={!visibleLines.dependency_health}
              name="Dependency Health"
            />

            <Line 
              type="monotone" 
              dataKey="subscores.semantic_drift" 
              stroke="#06b6d4" 
              strokeWidth={1.5} 
              strokeDasharray="3 4" 
              dot={false}
              hide={!visibleLines.semantic_drift}
              name="Semantic Drift"
            />

            <Brush 
              dataKey="committed_at" 
              tickFormatter={(value: string) => formatDateShort(value)} 
              height={26} 
              stroke="var(--glass-border)" 
              fill="var(--glass-bg)" 
              travellerWidth={7} 
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
