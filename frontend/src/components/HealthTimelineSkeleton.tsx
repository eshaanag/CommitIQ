import { TrendingUp } from 'lucide-react'

const LEGEND_PILLS = ['w-24', 'w-20', 'w-16', 'w-24', 'w-28', 'w-20']

export function HealthTimelineSkeleton() {
  return (
    <div
      className="glass-panel rounded-[28px] p-6 shadow-2xl relative border border-white/10 overflow-hidden"
      role="status"
      aria-label="Loading health timeline"
    >
      <div className="absolute inset-0 overflow-hidden rounded-[28px] pointer-events-none">
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-purple-500/10 rounded-full blur-[80px]" />
        <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-blue-500/10 rounded-full blur-[80px]" />
      </div>

      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4 mb-6 relative z-10">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-400/40" />
            <h2 className="font-head text-[18px] font-semibold text-white/20 tracking-tight">
              Codebase Health Timeline
            </h2>
          </div>
          <div className="h-3 w-64 max-w-full rounded-full bg-white/5 animate-pulse mt-2" />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {LEGEND_PILLS.map((width, i) => (
            <div
              key={i}
              className={`h-[26px] ${width} rounded-full bg-white/5 border border-white/5 animate-pulse`}
              style={{ animationDelay: `${i * 75}ms` }}
            />
          ))}
        </div>
      </div>

      <div
        className="w-full relative z-10 rounded-2xl overflow-hidden bg-white/[0.02] border border-white/5"
        style={{ height: 280 }}
      >
        <svg
          className="w-full h-full animate-pulse"
          viewBox="0 0 700 280"
          preserveAspectRatio="none"
          fill="none"
        >
          <defs>
            <linearGradient id="skeletonLineGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#a855f7" stopOpacity={0.18} />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>

          {[60, 110, 160, 210].map((y) => (
            <line key={y} x1="0" y1={y} x2="700" y2={y} stroke="rgba(255,255,255,0.04)" />
          ))}

          <path
            d="M0,190 C60,150 100,205 150,170 C210,128 250,190 310,150 C360,118 400,175 460,140 C520,108 560,160 610,120 C650,95 680,130 700,110 L700,280 L0,280 Z"
            fill="url(#skeletonLineGrad)"
          />
          <path
            d="M0,190 C60,150 100,205 150,170 C210,128 250,190 310,150 C360,118 400,175 460,140 C520,108 560,160 610,120 C650,95 680,130 700,110"
            stroke="rgba(167, 139, 250, 0.35)"
            strokeWidth={2.5}
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="w-full flex items-center gap-1.5 mt-2 relative z-10" style={{ height: 26 }}>
        <div className="h-full w-full rounded-md bg-white/[0.03] border border-white/5 flex items-center px-2 animate-pulse">
          <div className="h-3.5 w-10 rounded-sm bg-white/10" />
          <div className="flex-grow" />
          <div className="h-3.5 w-10 rounded-sm bg-white/10" />
        </div>
      </div>

      <span className="sr-only">Loading health timeline…</span>
    </div>
  )
}
