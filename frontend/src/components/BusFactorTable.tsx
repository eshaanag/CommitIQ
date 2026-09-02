import { useState, useMemo } from 'react'
import type { BusFactorTableProps } from '../types'
import { Users, AlertTriangle, ShieldCheck, HelpCircle, Search, X } from 'lucide-react'
import { MetricTooltip } from './ui/MetricTooltip'

const RISK_COLORS: Record<string, string> = {
  critical: '239, 68, 68',
  high: '245, 158, 11',
  medium: '96, 165, 250',
  low: '52, 211, 153',
}

export function BusFactorTable({ modules }: BusFactorTableProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredModules = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    // First, sort all modules by top contributor percentage
    const sorted = [...modules].sort((a, b) => b.top_contributor_pct - a.top_contributor_pct)

    if (!query) {
      return sorted.slice(0, 20)
    }

    // Filter by module_path or top_contributor name
    return sorted.filter(
      (m) =>
        m.module_path.toLowerCase().includes(query) ||
        (m.top_contributor && m.top_contributor.toLowerCase().includes(query))
    )
  }, [modules, searchQuery])

  return (
    <div className="glass-panel rounded-[28px] overflow-hidden shadow-2xl relative border border-white/10 flex flex-col">
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-[60px] pointer-events-none" />

      {/* Header section with Search Input */}
      <div className="px-6 py-5 border-b border-white/5 relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-400" />
            <h2 className="font-head text-[18px] font-semibold text-white tracking-tight">
              Bus Factor Index
            </h2>
            <MetricTooltip
              title="Bus Factor Index"
              description="Evaluates developer concentration per code module to uncover key-person dependencies before knowledge loss impacts the team."
              formula="Subscore = min(bus_factor_min × 20, 100). Modules with a single owner are flagged as critical single points of failure."
              weight="20% of Health Score"
              align="left"
            />
          </div>
          <p className="text-slate-400 text-xs mt-1">
            Contributor concentration distribution per system module
          </p>
        </div>

        {/* Search Input Bar */}
        <div className="relative min-w-[220px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter modules or owners..."
            className="w-full bg-white/5 hover:bg-white/[0.08] focus:bg-white/10 border border-white/10 focus:border-purple-500/50 rounded-xl pl-9 pr-8 py-1.5 text-xs text-white placeholder-slate-400 transition-all outline-none focus:ring-1 focus:ring-purple-500/50"
            aria-label="Filter modules"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Table Body */}
      <div className="overflow-y-auto relative z-10 flex-grow" style={{ height: 420 }}>
        {filteredModules.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-slate-500 gap-2">
            <HelpCircle className="w-8 h-8 text-slate-600 animate-pulse" />
            <span className="text-sm font-medium">
              {searchQuery
                ? `No modules matching "${searchQuery}"`
                : 'No contributor metrics compiled yet'}
            </span>
          </div>
        ) : (
          <div className="w-full">
            <table className="w-full text-left text-xs min-w-[320px]">
              <thead>
                <tr className="border-b border-white/5 text-slate-400 font-semibold uppercase tracking-wider bg-white/[0.01]">
                  <th className="px-5 py-3.5 font-head font-medium text-[10px] text-slate-400">
                    Module Path
                  </th>
                  <th className="px-5 py-3.5 font-head font-medium text-[10px] text-slate-400 text-center">
                    Risk Tier
                  </th>
                  <th className="px-5 py-3.5 font-head font-medium text-[10px] text-slate-400 text-center">
                    Contributors
                  </th>
                  <th className="px-5 py-3.5 font-head font-medium text-[10px] text-slate-400">
                    Principal Owner
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredModules.map((module) => {
                  const rgb = RISK_COLORS[module.risk_level] || '156, 163, 175'
                  const isCritical =
                    module.risk_level === 'critical' || module.risk_level === 'high'

                  return (
                    <tr
                      key={module.module_path}
                      className="hover:bg-white/[0.03] transition-colors group relative"
                      style={isCritical ? { borderLeft: `2px solid rgb(${rgb})` } : undefined}
                    >
                      <td className="px-5 py-3.5 font-mono text-[11px] text-slate-300 max-w-[150px]">
                        <span className="block truncate" dir="rtl" title={module.module_path}>
                          {module.module_path}
                        </span>
                      </td>

                      <td className="px-5 py-3.5 text-center">
                        <span
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border"
                          style={{
                            color: `rgb(${rgb})`,
                            backgroundColor: `rgba(${rgb}, 0.1)`,
                            borderColor: `rgba(${rgb}, 0.2)`,
                          }}
                        >
                          {isCritical ? (
                            <AlertTriangle className="w-3 h-3" />
                          ) : (
                            <ShieldCheck className="w-3 h-3" />
                          )}
                          {module.risk_level}
                        </span>
                      </td>

                      <td className="px-5 py-3.5 text-center font-mono text-xs font-bold text-white">
                        <span
                          className="inline-block px-2 py-0.5 rounded-md bg-white/5 border border-white/5"
                          style={{ color: `rgb(${rgb})` }}
                        >
                          {module.contributor_count}
                        </span>
                      </td>

                      <td className="px-5 py-3.5 text-slate-400 truncate max-w-[130px] font-medium group-hover:text-slate-200 transition-colors">
                        {module.top_contributor || 'Unassigned'}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
