import { Tooltip } from '../common/Tooltip'
import { DORA_THRESHOLDS } from '../../constants/doraThresholds'

export interface DoraMetricsCardProps {
  tier?: 'ELITE' | 'HIGH' | 'MEDIUM' | 'LOW' | string
}

export function DoraMetricsCard({ tier = 'ELITE' }: DoraMetricsCardProps) {
  const currentTier = tier.toUpperCase()
  const thresholdData = DORA_THRESHOLDS[currentTier] || DORA_THRESHOLDS.ELITE

  const colorVariants: Record<string, string> = {
    ELITE: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    HIGH: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    MEDIUM: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    LOW: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
  }

  return (
    <div className="p-4 bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-xl max-w-sm">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-400">DORA Ranking</span>

        {/* Tooltip Wrapper Hook */}
        <Tooltip content={thresholdData}>
          <span
            className={`px-2.5 py-1 text-xs font-bold tracking-wide uppercase border rounded-full transition-all ${colorVariants[currentTier] || colorVariants.ELITE}`}
          >
            {tier}
          </span>
        </Tooltip>
      </div>
      <p className="text-2xl font-bold mt-2 text-white">Continuous Delivery</p>
    </div>
  )
}

export default DoraMetricsCard
