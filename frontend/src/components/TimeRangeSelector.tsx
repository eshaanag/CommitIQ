import { Calendar, Clock, Filter, RotateCcw } from 'lucide-react'

export type TimeRangePreset = 'all' | '7d' | '30d' | '1y' | 'custom'

export interface TimeRangeSelectorProps {
  selectedPreset: TimeRangePreset
  onSelectPreset: (preset: TimeRangePreset) => void
  customStartDate: string
  customEndDate: string
  onCustomDateChange: (startDate: string, endDate: string) => void
  onReset?: () => void
}

const PRESETS: { id: TimeRangePreset; label: string }[] = [
  { id: 'all', label: 'All Time' },
  { id: '7d', label: 'Last 7 Days' },
  { id: '30d', label: 'Last 30 Days' },
  { id: '1y', label: 'Last Year' },
  { id: 'custom', label: 'Custom Range' },
]

export function TimeRangeSelector({
  selectedPreset,
  onSelectPreset,
  customStartDate,
  customEndDate,
  onCustomDateChange,
  onReset,
}: TimeRangeSelectorProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white/[0.02] border border-white/5 p-2.5 rounded-[20px] backdrop-blur-xl">
      <div className="flex items-center gap-2 px-2 text-slate-400">
        <Filter className="w-4 h-4 text-purple-400 flex-shrink-0" />
        <span className="font-head text-[11px] font-semibold uppercase tracking-wider text-slate-300">
          Time Range
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-1.5 flex-1 justify-start sm:justify-end">
        {PRESETS.map((preset) => {
          const isActive = selectedPreset === preset.id
          return (
            <button
              key={preset.id}
              onClick={() => onSelectPreset(preset.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border flex items-center gap-1.5 cursor-pointer ${
                isActive
                  ? 'bg-purple-500/20 text-purple-200 border-purple-500/40 shadow-[0_0_12px_rgba(168,85,247,0.2)]'
                  : 'bg-white/5 text-slate-400 border-white/5 hover:bg-white/10 hover:text-slate-200 hover:border-white/10'
              }`}
            >
              {preset.id === 'custom' ? (
                <Calendar className="w-3.5 h-3.5 text-purple-400" />
              ) : (
                <Clock className="w-3.5 h-3.5 opacity-60" />
              )}
              {preset.label}
            </button>
          )
        })}
        {(selectedPreset !== 'all' || customStartDate || customEndDate) && onReset && (
          <button
            onClick={onReset}
            title="Reset Filters"
            className="px-2.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border flex items-center cursor-pointer bg-white/5 text-slate-400 border-white/5 hover:bg-rose-500/20 hover:text-rose-300 hover:border-rose-500/40 ml-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {selectedPreset === 'custom' && (
        <div className="flex flex-wrap items-center gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5">
          <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-xl px-2.5 py-1">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">From:</span>
            <input
              type="date"
              value={customStartDate}
              onChange={(e) => onCustomDateChange(e.target.value, customEndDate)}
              className="bg-transparent text-xs text-white font-mono focus:outline-none cursor-pointer border-none p-0"
              aria-label="Start Date"
            />
          </div>
          <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-xl px-2.5 py-1">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">To:</span>
            <input
              type="date"
              value={customEndDate}
              onChange={(e) => onCustomDateChange(customStartDate, e.target.value)}
              className="bg-transparent text-xs text-white font-mono focus:outline-none cursor-pointer border-none p-0"
              aria-label="End Date"
            />
          </div>
        </div>
      )}
    </div>
  )
}
