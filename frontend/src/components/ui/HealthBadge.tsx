import { useState } from 'react'
import type { HealthBadgeProps, HealthFactor } from '../../types'
import { getHealthColor, getHealthStatus } from '../../types'
import { cn } from '../../lib/utils'

const DEFAULT_FACTORS: HealthFactor[] = [
  { name: 'Cyclomatic Complexity', weight: '25%' },
  { name: 'Bus Factor Risk', weight: '20%' },
  { name: 'Churn Rate', weight: '20%' },
  { name: 'Semantic Drift', weight: '20%' },
  { name: 'Dependency Health', weight: '15%' },
]

export function HealthBadge({ score, delta, size = 'md', factors, showTooltip = true }: HealthBadgeProps) {
  const [isHovered, setIsHovered] = useState(false)
  const status = getHealthStatus(score)
  const color = getHealthColor(score)

  const factorList: HealthFactor[] = factors && factors.length > 0 ? factors : DEFAULT_FACTORS

  const sizes = {
    sm: 'text-[10px] gap-1 px-2.5 py-0.5 rounded-full',
    md: 'text-[11px] gap-1.5 px-3 py-1 rounded-full',
    lg: 'text-xs gap-2 px-4 py-1.5 rounded-full',
  }
  const dotAnims: Record<string, string> = {
    excellent: '',
    healthy: '',
    moderate: 'animate-pulse',
    warning: 'animate-pulse',
    critical: 'animate-pulse',
    failing: 'animate-pulse',
  }

  return (
    <div 
      className="relative inline-block group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span 
        className={cn(
          'inline-flex items-center font-mono bg-white/5 border border-white/10 shadow-lg select-none cursor-pointer transition-all duration-200 group-hover:border-purple-500/40 group-hover:bg-white/10', 
          sizes[size]
        )}
      >
        <span 
          className={cn(
            'rounded-full flex-shrink-0', 
            dotAnims[status], 
            size === 'sm' ? 'w-1.5 h-1.5' : size === 'md' ? 'w-2 h-2' : 'w-2.5 h-2.5'
          )} 
          style={{ 
            backgroundColor: color,
            boxShadow: `0 0 8px ${color}`
          }} 
        />
        <span style={{ color }} className="font-extrabold">{score.toFixed(0)}</span>
        {delta !== undefined && delta !== null && (
          <span className={cn('text-[9px] font-bold ml-1', delta >= 0 ? 'text-emerald-400' : 'text-rose-400')}>
            {delta >= 0 ? `+${delta.toFixed(1)}` : delta.toFixed(1)}
          </span>
        )}
      </span>

      {showTooltip && (
        <div 
          role="tooltip"
          aria-label="Health score calculation factors"
          className={cn(
            'absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 p-3.5 rounded-2xl glass-panel-bright border border-white/15 shadow-2xl z-50 transition-all duration-200 pointer-events-none font-sans',
            isHovered ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'
          )}
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
            <span className="text-[11px] font-bold text-white tracking-tight font-head">Health Score Factors</span>
            <span className="text-[10px] font-mono text-purple-300 font-semibold bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20">
              Score: {score.toFixed(0)}
            </span>
          </div>
          <div className="space-y-1.5">
            {factorList.map((factor) => (
              <div key={factor.name} className="flex items-center justify-between text-[11px]">
                <span className="text-slate-300 font-medium">{factor.name}</span>
                <span className="font-mono text-purple-300 font-semibold bg-white/5 px-1.5 py-0.5 rounded border border-white/10">
                  {typeof factor.weight === 'number' ? `${factor.weight}%` : factor.weight}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-2.5 pt-2 border-t border-white/10 text-[10px] text-slate-400 text-center font-mono">
            Weighted contribution model
          </div>
        </div>
      )}
    </div>
  )
}

