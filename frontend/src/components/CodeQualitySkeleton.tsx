import { Sparkles } from 'lucide-react'

export function CodeQualitySkeleton() {
  return (
    <div
      className="glass-panel rounded-[28px] overflow-hidden shadow-2xl relative border border-white/10 flex flex-col h-full"
      style={{ minHeight: '350px' }}
      role="status"
      aria-label="Loading code quality metrics"
    >
      <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/5 rounded-full blur-[80px] pointer-events-none" />

      {/* Header */}
      <div className="px-6 py-5 border-b border-white/5 relative z-10 flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-cyan-400/40" />
        <h2 className="font-head text-[18px] font-semibold text-white/40 tracking-tight">
          Code Quality & AI Impact
        </h2>
      </div>

      {/* 2 Metric Cards */}
      <div className="p-6 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
        {/* Code Churn Card Skeleton */}
        <div className="bg-white/5 border border-white/5 rounded-[20px] p-5 shadow-inner flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-emerald-400/20 animate-pulse" />
              <div className="h-3.5 w-24 rounded-full bg-white/10 animate-pulse" />
            </div>
            <div className="h-5 w-16 rounded-full bg-white/5 border border-white/5 animate-pulse" />
          </div>

          <div className="mt-2 flex-grow flex flex-col justify-center items-center text-center">
            <div className="h-12 w-28 rounded-lg bg-white/10 animate-pulse" />
            <div className="h-3 w-36 rounded-full bg-white/5 animate-pulse mt-3" />
            <div className="w-full mt-4 space-y-1.5 flex flex-col items-center">
              <div className="h-2.5 w-4/5 rounded-full bg-white/[0.03] animate-pulse" />
              <div className="h-2.5 w-3/5 rounded-full bg-white/[0.03] animate-pulse" />
            </div>
          </div>
        </div>

        {/* AI Impact Card Skeleton */}
        <div className="bg-white/5 border border-white/5 rounded-[20px] p-5 shadow-inner flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-violet-400/20 animate-pulse" />
              <div className="h-3.5 w-32 rounded-full bg-white/10 animate-pulse" />
            </div>
            <div className="h-5 w-20 rounded-full bg-white/5 border border-white/5 animate-pulse" />
          </div>

          <div className="mt-2 flex-grow flex flex-col justify-center items-center text-center">
            <div
              className="h-12 w-24 rounded-lg bg-white/10 animate-pulse"
              style={{ animationDelay: '100ms' }}
            />
            <div
              className="h-3 w-32 rounded-full bg-white/5 animate-pulse mt-3"
              style={{ animationDelay: '150ms' }}
            />
            <div className="w-full mt-4 space-y-1.5 flex flex-col items-center">
              <div
                className="h-2.5 w-4/5 rounded-full bg-white/[0.03] animate-pulse"
                style={{ animationDelay: '200ms' }}
              />
              <div
                className="h-2.5 w-2/3 rounded-full bg-white/[0.03] animate-pulse"
                style={{ animationDelay: '250ms' }}
              />
            </div>
          </div>
        </div>
      </div>

      <span className="sr-only">Loading code quality metrics…</span>
    </div>
  )
}
