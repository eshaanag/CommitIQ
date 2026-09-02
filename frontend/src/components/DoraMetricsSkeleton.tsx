import { TrendingUp } from 'lucide-react'

export function DoraMetricsSkeleton() {
  return (
    <div
      className="glass-panel rounded-[28px] overflow-hidden shadow-2xl relative border border-white/10 flex flex-col h-full"
      style={{ minHeight: '350px' }}
      role="status"
      aria-label="Loading DORA metrics"
    >
      <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/5 rounded-full blur-[80px] pointer-events-none" />

      {/* Header */}
      <div className="px-6 py-5 border-b border-white/5 relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-indigo-400/40" />
          <h2 className="font-head text-[18px] font-semibold text-white/40 tracking-tight">
            DORA Performance
          </h2>
        </div>
        <div className="h-6 w-32 rounded-full bg-white/5 border border-white/5 animate-pulse" />
      </div>

      {/* 3 Metric Cards */}
      <div className="p-6 relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 flex-grow">
        {[
          { titleWidth: 'w-28', valWidth: 'w-20', badgeWidth: 'w-16' },
          { titleWidth: 'w-24', valWidth: 'w-16', badgeWidth: 'w-14' },
          { titleWidth: 'w-16', valWidth: 'w-14', badgeWidth: 'w-16' },
        ].map((card, idx) => (
          <div
            key={idx}
            className="bg-white/5 border border-white/5 rounded-[20px] p-5 shadow-inner flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-2">
              <div className={`h-3 ${card.titleWidth} rounded-full bg-white/10 animate-pulse`} />
              <div className="w-5 h-5 rounded-full bg-white/5 animate-pulse" />
            </div>
            <div>
              <div
                className={`h-8 ${card.valWidth} rounded-lg bg-white/10 animate-pulse mt-3 mb-2`}
                style={{ animationDelay: `${idx * 100}ms` }}
              />
              <div
                className={`h-4 ${card.badgeWidth} rounded-md bg-white/5 border border-white/5 animate-pulse mt-2`}
                style={{ animationDelay: `${idx * 150}ms` }}
              />
            </div>
          </div>
        ))}
      </div>

      <span className="sr-only">Loading DORA metrics…</span>
    </div>
  )
}
