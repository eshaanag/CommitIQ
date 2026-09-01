import React from 'react'
import { AlertTriangle, Clock, RefreshCw, RotateCcw, Sliders } from 'lucide-react'

export interface EmptyCommitsWarningBannerProps {
  isFiltered: boolean
  onResetFilter?: () => void
  onRescan?: () => void
  isRescanning?: boolean
  onReingest?: () => void
  repoName?: string
}

export const EmptyCommitsWarningBanner: React.FC<EmptyCommitsWarningBannerProps> = ({
  isFiltered,
  onResetFilter,
  onRescan,
  isRescanning = false,
  onReingest,
  repoName,
}) => {
  return (
    <div
      role="alert"
      data-testid="empty-commits-warning-banner"
      className="glass-panel rounded-[24px] p-5 border border-amber-500/30 bg-amber-500/10 text-amber-200 shadow-xl relative overflow-hidden backdrop-blur-xl"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5 min-w-0">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center flex-shrink-0 text-amber-400 mt-0.5 shadow-inner">
            {isFiltered ? (
              <Clock className="w-5 h-5" aria-hidden="true" />
            ) : (
              <AlertTriangle className="w-5 h-5" aria-hidden="true" />
            )}
          </div>
          <div className="min-w-0 space-y-1">
            <h4 className="font-head text-[15px] font-bold text-white tracking-tight flex items-center gap-2">
              <span>
                {isFiltered
                  ? 'No Commits in Selected Time Window'
                  : 'No Commits Analyzed for This Repository'}
              </span>
              {repoName && (
                <span className="font-mono text-xs text-amber-300 font-semibold px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/30">
                  {repoName}
                </span>
              )}
            </h4>
            <p className="text-slate-300 text-xs leading-relaxed max-w-3xl">
              {isFiltered
                ? 'There are no commits recorded in this repository within the active time filter. Try selecting a broader time window (such as "All Time") or adjusting your custom date bounds.'
                : 'This repository currently has 0 commits in the analyzed range. Try increasing the Maximum Commits setting during ingestion, checking the repository branch history, or triggering an analysis update.'}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 flex-shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-amber-500/20">
          {isFiltered && onResetFilter && (
            <button
              type="button"
              onClick={onResetFilter}
              data-testid="reset-time-filter-button"
              className="px-3.5 py-2 rounded-full text-xs font-semibold bg-amber-500/20 hover:bg-amber-500/30 text-amber-100 border border-amber-500/40 transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-300" />
              <span>Reset to All Time</span>
            </button>
          )}

          {onRescan && (
            <button
              type="button"
              onClick={onRescan}
              disabled={isRescanning}
              data-testid="rescan-from-banner-button"
              className="px-3.5 py-2 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/15 text-white border border-white/15 transition-all flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 ${isRescanning ? 'animate-spin text-purple-300' : ''}`}
              />
              <span>{isRescanning ? 'Updating...' : 'Update Analysis'}</span>
            </button>
          )}

          {onReingest && (
            <button
              type="button"
              onClick={onReingest}
              data-testid="reingest-from-banner-button"
              className="px-3.5 py-2 rounded-full text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Sliders className="w-3.5 h-3.5 text-slate-400" />
              <span>Adjust Settings</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
