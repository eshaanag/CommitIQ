import type { ReactNode } from 'react'
import type { DoraThresholdInfo } from '../../constants/doraThresholds'

export interface TooltipProps {
  children: ReactNode
  content: DoraThresholdInfo
}

export function Tooltip({ children, content }: TooltipProps) {
  return (
    <div className="group relative inline-block cursor-help">
      {children}
      <div className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 w-64 -translate-x-1/2 scale-95 rounded-lg bg-slate-900 p-3 text-xs text-slate-200 opacity-0 shadow-xl blur-none transition-all duration-200 group-hover:scale-100 group-hover:opacity-100 border border-slate-700/50">
        <h4 className="font-bold text-white mb-1.5 border-b border-slate-700 pb-1">
          {content.title}
        </h4>
        <div className="space-y-1">
          <p>
            <span className="text-slate-400">Deploy Freq:</span> {content.deploymentFrequency}
          </p>
          <p>
            <span className="text-slate-400">Lead Time:</span> {content.leadTimeForChanges}
          </p>
          <p>
            <span className="text-slate-400">MTTR:</span> {content.timeToRestoreService}
          </p>
          <p>
            <span className="text-slate-400">CFR:</span> {content.changeFailureRate}
          </p>
        </div>
        {/* Tooltip Downward Arrow Anchor */}
        <div className="absolute top-full left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1 rotate-45 bg-slate-900 border-r border-b border-slate-700/50"></div>
      </div>
    </div>
  )
}

export default Tooltip
