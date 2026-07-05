import type { BusFactorTableProps } from '../types'
import { Users, AlertTriangle, ShieldCheck, HelpCircle } from 'lucide-react'

const RISK_COLORS: Record<string, string> = {
  critical: '239, 68, 68',
  high: '245, 158, 11',
  medium: '96, 165, 250',
  low: '52, 211, 153',
}

const RISK_ORDER = { critical: 0, high: 1, medium: 2, low: 3 }

export function BusFactorTable({ modules }: BusFactorTableProps) {
  const sorted = [...modules]
    .sort((a, b) => RISK_ORDER[a.risk_level] - RISK_ORDER[b.risk_level])
    .slice(0, 20)

  return (
    <div className="glass-panel rounded-[28px] overflow-hidden shadow-2xl relative border border-white/10 flex flex-col">
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-[60px] pointer-events-none" />

      <div className="px-6 py-5 border-b border-white/5 relative z-10 flex items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-400" />
            <h2 className="font-head text-[18px] font-semibold text-white tracking-tight">
              Bus Factor Index
            </h2>
          </div>
          <p className="text-slate-400 text-xs mt-1">
            Contributor concentration distribution per system module
          </p>
        </div>
      </div>

      <div className="overflow-y-auto relative z-10 flex-grow" style={{ height: 420 }}>
        {sorted.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-slate-500 gap-2">
            <HelpCircle className="w-8 h-8 text-slate-600 animate-pulse" />
            <span className="text-sm font-medium">No contributor metrics compiled yet</span>
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
                {sorted.map((module) => {
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
