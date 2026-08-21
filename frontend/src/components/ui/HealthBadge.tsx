import type { HealthBadgeProps } from '../../types'
import { getHealthColor, getHealthStatus } from '../../types'
import { cn } from '../../lib/utils'

export function HealthBadge({ score, delta, size = 'md' }: HealthBadgeProps) {
  const status = getHealthStatus(score)
  const color = getHealthColor(score)
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
    <span
      className={cn(
        'inline-flex items-center font-mono bg-white/5 border border-white/10 shadow-lg select-none',
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
          boxShadow: `0 0 8px ${color}`,
        }}
      />
      <span style={{ color }} className="font-extrabold">
        {score.toFixed(0)}
      </span>
      {delta !== undefined && delta !== null && (
        <span
          className={cn(
            'text-[9px] font-bold ml-1',
            delta >= 0 ? 'text-emerald-400' : 'text-rose-400'
          )}
        >
          {delta >= 0 ? `+${delta.toFixed(1)}` : delta.toFixed(1)}
        </span>
      )}
    </span>
  )
}
