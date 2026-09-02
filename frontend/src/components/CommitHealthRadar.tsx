import { useMemo, useState, type ReactNode } from 'react'
import {
  Activity,
  AlertTriangle,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Code2,
  GitCommit,
  GitMerge,
  Heart,
  Info,
  Lightbulb,
  MessageSquare,
  Shield,
  Target,
  TrendingDown,
  TrendingUp,
  Zap,
} from 'lucide-react'

/* ─── Types ─────────────────────────────────────────────────────────── */

interface HealthDimension {
  id: string
  label: string
  score: number // 0-100
  icon: ReactNode
  color: string
  description: string
  details: string[]
  trend: 'up' | 'down' | 'stable'
  trendDelta: number
}

interface HealthRecommendation {
  severity: 'critical' | 'warning' | 'info'
  title: string
  description: string
  impact: string
  category: string
}

interface HealthGrade {
  grade: string
  label: string
  color: string
  bg: string
  description: string
}

interface CommitHealthRadarProps {
  /** Simulated data — in production would come from API */
  repoName?: string
  timeRange?: string
}

/* ─── Helpers ───────────────────────────────────────────────────────── */

function getGrade(score: number): HealthGrade {
  if (score >= 90)
    return {
      grade: 'A+',
      label: 'Exceptional',
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/30',
      description: 'Your repo is in outstanding health.',
    }
  if (score >= 80)
    return {
      grade: 'A',
      label: 'Excellent',
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20',
      description: 'Excellent health with minor room for improvement.',
    }
  if (score >= 70)
    return {
      grade: 'B+',
      label: 'Good',
      color: 'text-blue-400',
      bg: 'bg-blue-500/10 border-blue-500/20',
      description: 'Good health overall. Some areas could use attention.',
    }
  if (score >= 60)
    return {
      grade: 'B',
      label: 'Above Average',
      color: 'text-blue-400',
      bg: 'bg-blue-500/10 border-blue-500/20',
      description: 'Above average health. Consider addressing flagged areas.',
    }
  if (score >= 50)
    return {
      grade: 'C',
      label: 'Average',
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/20',
      description: 'Average health. Several areas need improvement.',
    }
  if (score >= 35)
    return {
      grade: 'D',
      label: 'Below Average',
      color: 'text-orange-400',
      bg: 'bg-orange-500/10 border-orange-500/20',
      description: 'Below average. Significant improvements needed.',
    }
  return {
    grade: 'F',
    label: 'Critical',
    color: 'text-red-400',
    bg: 'bg-red-500/10 border-red-500/20',
    description: 'Critical health issues require immediate attention.',
  }
}

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

/* ─── Mock Data Generator ───────────────────────────────────────────── */

function generateDimensions(): HealthDimension[] {
  return [
    {
      id: 'commit_frequency',
      label: 'Commit Frequency',
      score: 72,
      icon: <GitCommit className="w-4 h-4" />,
      color: '#a78bfa',
      description: 'How regularly commits are made to the repository.',
      details: [
        'Average 3.2 commits/day over last 30 days',
        'Peak activity on Tuesdays and Wednesdays',
        'Commit frequency increased 15% vs previous month',
        'Weekend commits: 12% of total (healthy work-life balance)',
      ],
      trend: 'up',
      trendDelta: 15,
    },
    {
      id: 'message_quality',
      label: 'Message Quality',
      score: 85,
      icon: <MessageSquare className="w-4 h-4" />,
      color: '#34d399',
      description: 'Conventional commit compliance and message clarity.',
      details: [
        '92% of commits follow Conventional Commits format',
        'Average message length: 58 characters (optimal)',
        '78% include scope tags (feat, fix, chore, etc.)',
        '0% use generic messages like "fix" or "update"',
      ],
      trend: 'up',
      trendDelta: 8,
    },
    {
      id: 'code_quality',
      label: 'Code Quality',
      score: 68,
      icon: <Code2 className="w-4 h-4" />,
      color: '#60a5fa',
      description: 'Static analysis, test coverage, and code standards adherence.',
      details: [
        'Test coverage: 74% (target: 80%)',
        '0 critical lint errors, 12 warnings',
        'TypeScript strict mode enabled',
        'Average function complexity: 4.2 (good)',
      ],
      trend: 'stable',
      trendDelta: 2,
    },
    {
      id: 'review_coverage',
      label: 'Review Coverage',
      score: 91,
      icon: <Shield className="w-4 h-4" />,
      color: '#f472b6',
      description: 'Pull request review practices and approval gates.',
      details: [
        '100% of PRs have at least 1 review',
        'Average 2.3 reviews per PR',
        'Code owners enforced for critical paths',
        'Auto-merge with CI passing enabled',
      ],
      trend: 'up',
      trendDelta: 5,
    },
    {
      id: 'merge_hygiene',
      label: 'Merge Hygiene',
      score: 58,
      icon: <GitMerge className="w-4 h-4" />,
      color: '#fbbf24',
      description: 'Branch management, merge conflict resolution, and history cleanliness.',
      details: [
        '14 open branches older than 30 days',
        '3 branches with merge conflicts',
        'Squash merges: 65%, merge commits: 35%',
        'Average PR lifetime: 2.8 days',
      ],
      trend: 'down',
      trendDelta: -12,
    },
    {
      id: 'velocity',
      label: 'Delivery Velocity',
      score: 76,
      icon: <Zap className="w-4 h-4" />,
      color: '#fb923c',
      description: 'Throughput, cycle time, and release cadence.',
      details: [
        'Average cycle time: 1.2 days (improved from 1.8)',
        'Throughput: 18 story points/sprint',
        'Release cadence: bi-weekly (consistent)',
        'Deployment frequency: 4.5/week',
      ],
      trend: 'up',
      trendDelta: 10,
    },
    {
      id: 'risk_exposure',
      label: 'Risk Exposure',
      score: 82,
      icon: <AlertTriangle className="w-4 h-4" />,
      color: '#e879f9',
      description: 'Dependency freshness, security vulnerabilities, and technical debt.',
      details: [
        '0 critical vulnerabilities, 2 moderate',
        '87% of dependencies up to date',
        'Technical debt ratio: 8% (target: <10%)',
        'Last security audit: 12 days ago',
      ],
      trend: 'up',
      trendDelta: 6,
    },
  ]
}

function generateRecommendations(dimensions: HealthDimension[]): HealthRecommendation[] {
  const recs: HealthRecommendation[] = []

  for (const dim of dimensions) {
    if (dim.score < 60) {
      recs.push({
        severity: 'critical',
        title: `Improve ${dim.label}`,
        description: `Your ${dim.label.toLowerCase()} score is ${dim.score}/100. This is below the recommended threshold of 60.`,
        impact: 'High — addressing this could improve overall health by 8-15%',
        category: dim.label,
      })
    } else if (dim.score < 75) {
      recs.push({
        severity: 'warning',
        title: `Enhance ${dim.label}`,
        description: `Your ${dim.label.toLowerCase()} score is ${dim.score}/100. There's room for meaningful improvement.`,
        impact: 'Medium — optimization could boost overall health by 3-8%',
        category: dim.label,
      })
    }
  }

  // Add general recommendations
  recs.push({
    severity: 'info',
    title: 'Enable Branch Protection Rules',
    description: 'Enforce required reviews, status checks, and up-to-date branches before merging.',
    impact: 'Medium — improves merge hygiene and code quality scores',
    category: 'General',
  })
  recs.push({
    severity: 'info',
    title: 'Set Up Automated Dependency Updates',
    description: 'Use Dependabot or Renovate to keep dependencies fresh and reduce security risk.',
    impact: 'Low — maintains risk exposure score over time',
    category: 'General',
  })

  return recs
}

/* ─── SVG Radar Chart ───────────────────────────────────────────────── */

function RadarChart({ dimensions, size = 280 }: { dimensions: HealthDimension[]; size?: number }) {
  const cx = size / 2
  const cy = size / 2
  const maxR = size / 2 - 30
  const levels = 5
  const n = dimensions.length
  const angleStep = 360 / n

  // Grid rings
  const rings = useMemo(() => {
    return Array.from({ length: levels }, (_, i) => {
      const r = (maxR / levels) * (i + 1)
      const points = Array.from({ length: n }, (_, j) => {
        const p = polarToCartesian(cx, cy, r, j * angleStep)
        return `${p.x},${p.y}`
      }).join(' ')
      return points
    })
  }, [n, maxR, cx, cy, angleStep, levels])

  // Axis lines
  const axes = useMemo(() => {
    return Array.from({ length: n }, (_, j) => {
      const end = polarToCartesian(cx, cy, maxR, j * angleStep)
      return { x1: cx, y1: cy, x2: end.x, y2: end.y }
    })
  }, [n, maxR, cx, cy, angleStep])

  // Data polygon
  const dataPoints = useMemo(() => {
    return dimensions.map((dim, j) => {
      const r = (dim.score / 100) * maxR
      return polarToCartesian(cx, cy, r, j * angleStep)
    })
  }, [dimensions, maxR, cx, cy, angleStep])

  const dataPath = dataPoints.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ') + ' Z'

  // Labels
  const labels = useMemo(() => {
    return dimensions.map((dim, j) => {
      const r = maxR + 22
      const p = polarToCartesian(cx, cy, r, j * angleStep)
      return { ...dim, x: p.x, y: p.y }
    })
  }, [dimensions, maxR, cx, cy, angleStep])

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="mx-auto">
      {/* Grid rings */}
      {rings.map((pts, i) => (
        <polygon key={i} points={pts} fill="none" stroke="rgba(148,163,184,0.1)" strokeWidth={1} />
      ))}

      {/* Axis lines */}
      {axes.map((a, i) => (
        <line
          key={i}
          x1={a.x1}
          y1={a.y1}
          x2={a.x2}
          y2={a.y2}
          stroke="rgba(148,163,184,0.15)"
          strokeWidth={1}
        />
      ))}

      {/* Data polygon */}
      <path d={dataPath} fill="rgba(167,139,250,0.15)" stroke="#a78bfa" strokeWidth={2} />

      {/* Data points */}
      {dataPoints.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={4}
          fill={dimensions[i].color}
          stroke="white"
          strokeWidth={1.5}
        />
      ))}

      {/* Labels */}
      {labels.map((l, i) => (
        <g key={i}>
          <text
            x={l.x}
            y={l.y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-slate-300 text-[10px] font-medium"
          >
            {l.label}
          </text>
          <text
            x={l.x}
            y={l.y + 12}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-slate-500 text-[9px]"
          >
            {l.score}
          </text>
        </g>
      ))}
    </svg>
  )
}

/* ─── Dimension Card ────────────────────────────────────────────────── */

function DimensionCard({
  dim,
  expanded,
  onToggle,
}: {
  dim: HealthDimension
  expanded: boolean
  onToggle: () => void
}) {
  const TrendIcon = dim.trend === 'up' ? TrendingUp : dim.trend === 'down' ? TrendingDown : Activity
  const trendColor =
    dim.trend === 'up'
      ? 'text-emerald-400'
      : dim.trend === 'down'
        ? 'text-red-400'
        : 'text-slate-400'
  const scoreColor =
    dim.score >= 80 ? 'text-emerald-400' : dim.score >= 60 ? 'text-amber-400' : 'text-red-400'

  return (
    <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden transition-all duration-300">
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 p-4 hover:bg-white/5 transition-colors text-left"
      >
        <div
          className="p-2 rounded-xl"
          style={{ backgroundColor: `${dim.color}15`, border: `1px solid ${dim.color}30` }}
        >
          {dim.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-slate-200">{dim.label}</span>
            <span className={`text-xs font-bold ${scoreColor}`}>{dim.score}/100</span>
          </div>
          {/* Progress bar */}
          <div className="mt-1.5 h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${dim.score}%`, backgroundColor: dim.color }}
            />
          </div>
        </div>
        <div className={`flex items-center gap-1 text-xs ${trendColor}`}>
          <TrendIcon className="w-3.5 h-3.5" />
          <span>
            {dim.trendDelta > 0 ? '+' : ''}
            {dim.trendDelta}
          </span>
        </div>
        {expanded ? (
          <ChevronUp className="w-4 h-4 text-slate-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-slate-400" />
        )}
      </button>

      {expanded && (
        <div className="px-4 pb-4 border-t border-white/5">
          <p className="text-xs text-slate-400 mt-3 mb-2">{dim.description}</p>
          <ul className="space-y-1.5">
            {dim.details.map((d, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                <span
                  className="mt-0.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: dim.color }}
                />
                {d}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

/* ─── Recommendation Card ───────────────────────────────────────────── */

function RecommendationCard({ rec }: { rec: HealthRecommendation }) {
  const severityConfig = {
    critical: {
      icon: <AlertTriangle className="w-4 h-4" />,
      color: 'text-red-400',
      bg: 'bg-red-500/10 border-red-500/20',
      dot: 'bg-red-400',
    },
    warning: {
      icon: <Info className="w-4 h-4" />,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/20',
      dot: 'bg-amber-400',
    },
    info: {
      icon: <Lightbulb className="w-4 h-4" />,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10 border-blue-500/20',
      dot: 'bg-blue-400',
    },
  }
  const config = severityConfig[rec.severity]

  return (
    <div className={`rounded-xl border p-3.5 ${config.bg}`}>
      <div className="flex items-start gap-2.5">
        <div className={`mt-0.5 ${config.color}`}>{config.icon}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-slate-200">{rec.title}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/5 text-slate-400 font-medium">
              {rec.category}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">{rec.description}</p>
          <p className={`text-xs mt-1.5 ${config.color} font-medium`}>📈 {rec.impact}</p>
        </div>
      </div>
    </div>
  )
}

/* ─── Main Component ────────────────────────────────────────────────── */

export function CommitHealthRadar({
  repoName = 'your-repo',
  timeRange = '30d',
}: CommitHealthRadarProps) {
  const [expandedDim, setExpandedDim] = useState<string | null>(null)
  const [showRecommendations, setShowRecommendations] = useState(true)

  const dimensions = useMemo(() => generateDimensions(), [])
  const overallScore = useMemo(
    () => Math.round(dimensions.reduce((acc, d) => acc + d.score, 0) / dimensions.length),
    [dimensions]
  )
  const grade = useMemo(() => getGrade(overallScore), [overallScore])
  const recommendations = useMemo(() => generateRecommendations(dimensions), [dimensions])

  const criticalCount = recommendations.filter((r) => r.severity === 'critical').length
  const warningCount = recommendations.filter((r) => r.severity === 'warning').length
  const improving = dimensions.filter((d) => d.trend === 'up').length
  const declining = dimensions.filter((d) => d.trend === 'down').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Heart className="w-6 h-6 text-purple-400" />
            Commit Health Radar
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Multi-dimensional health analysis for{' '}
            <span className="text-slate-300 font-medium">{repoName}</span> · {timeRange}
          </p>
        </div>
        <div className={`flex items-center gap-3 px-5 py-3 rounded-2xl border ${grade.bg}`}>
          <span className={`text-4xl font-black ${grade.color}`}>{grade.grade}</span>
          <div>
            <div className={`text-sm font-bold ${grade.color}`}>{grade.label}</div>
            <div className="text-xs text-slate-400">{overallScore}/100</div>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          {
            label: 'Dimensions',
            value: dimensions.length,
            icon: <Target className="w-4 h-4" />,
            color: 'text-purple-400',
          },
          {
            label: 'Improving',
            value: improving,
            icon: <TrendingUp className="w-4 h-4" />,
            color: 'text-emerald-400',
          },
          {
            label: 'Declining',
            value: declining,
            icon: <TrendingDown className="w-4 h-4" />,
            color: 'text-red-400',
          },
          {
            label: 'Issues',
            value: criticalCount + warningCount,
            icon: <AlertTriangle className="w-4 h-4" />,
            color: 'text-amber-400',
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="glass-panel rounded-xl border border-white/10 p-3.5 flex items-center gap-3"
          >
            <div className={`${stat.color}`}>{stat.icon}</div>
            <div>
              <div className="text-lg font-bold text-white">{stat.value}</div>
              <div className="text-[11px] text-slate-400">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Radar Chart */}
        <div className="glass-panel rounded-2xl border border-white/10 p-6">
          <h3 className="text-sm font-semibold text-slate-200 mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4 text-purple-400" />
            Health Profile
          </h3>
          <RadarChart dimensions={dimensions} size={300} />
          {/* Legend */}
          <div className="mt-4 flex flex-wrap gap-2 justify-center">
            {dimensions.map((d) => (
              <div key={d.id} className="flex items-center gap-1.5 text-[10px] text-slate-400">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                {d.label}
              </div>
            ))}
          </div>
        </div>

        {/* Dimension Breakdown */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-slate-200 mb-2 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            Dimension Breakdown
          </h3>
          {dimensions.map((dim) => (
            <DimensionCard
              key={dim.id}
              dim={dim}
              expanded={expandedDim === dim.id}
              onToggle={() => setExpandedDim(expandedDim === dim.id ? null : dim.id)}
            />
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div>
        <button
          onClick={() => setShowRecommendations(!showRecommendations)}
          className="flex items-center gap-2 text-sm font-semibold text-slate-200 mb-3 hover:text-white transition-colors"
        >
          <Lightbulb className="w-4 h-4 text-amber-400" />
          Recommendations ({recommendations.length})
          {showRecommendations ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
        {showRecommendations && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {recommendations.map((rec, i) => (
              <RecommendationCard key={i} rec={rec} />
            ))}
          </div>
        )}
      </div>

      {/* Trend Timeline (mini sparkline) */}
      <div className="glass-panel rounded-2xl border border-white/10 p-5">
        <h3 className="text-sm font-semibold text-slate-200 mb-3 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-blue-400" />
          12-Week Score Trend
        </h3>
        <TrendSparkline />
      </div>
    </div>
  )
}

/* ─── Mini Trend Sparkline ──────────────────────────────────────────── */

function TrendSparkline() {
  const weeks = [62, 64, 63, 67, 69, 68, 71, 73, 72, 75, 76, 78]
  const w = 600
  const h = 80
  const padding = 10
  const max = Math.max(...weeks)
  const min = Math.min(...weeks)
  const range = max - min || 1

  const points = weeks.map((v, i) => ({
    x: padding + (i / (weeks.length - 1)) * (w - padding * 2),
    y: h - padding - ((v - min) / range) * (h - padding * 2),
  }))

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ')
  const areaPath =
    linePath + ` L${points[points.length - 1].x},${h - padding} L${points[0].x},${h - padding} Z`

  const labels = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10', 'W11', 'W12']

  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h + 15}`} className="overflow-visible">
      {/* Grid lines */}
      {[0.25, 0.5, 0.75].map((pct) => (
        <line
          key={pct}
          x1={padding}
          y1={h - padding - pct * (h - padding * 2)}
          x2={w - padding}
          y2={h - padding - pct * (h - padding * 2)}
          stroke="rgba(148,163,184,0.08)"
          strokeWidth={1}
        />
      ))}

      {/* Area fill */}
      <path d={areaPath} fill="url(#trendGrad)" />

      {/* Gradient def */}
      <defs>
        <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a78bfa" stopOpacity={0.3} />
          <stop offset="100%" stopColor="#a78bfa" stopOpacity={0} />
        </linearGradient>
      </defs>

      {/* Line */}
      <path
        d={linePath}
        fill="none"
        stroke="#a78bfa"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Data points */}
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={3} fill="#a78bfa" stroke="white" strokeWidth={1} />
      ))}

      {/* X labels */}
      {labels.map((l, i) => (
        <text
          key={i}
          x={points[i].x}
          y={h + 8}
          textAnchor="middle"
          className="fill-slate-500 text-[9px]"
        >
          {l}
        </text>
      ))}

      {/* Start/End values */}
      <text
        x={points[0].x}
        y={points[0].y - 8}
        textAnchor="middle"
        className="fill-slate-400 text-[10px] font-medium"
      >
        {weeks[0]}
      </text>
      <text
        x={points[points.length - 1].x}
        y={points[points.length - 1].y - 8}
        textAnchor="middle"
        className="fill-purple-400 text-[10px] font-bold"
      >
        {weeks[weeks.length - 1]}
      </text>
    </svg>
  )
}

export default CommitHealthRadar
