import { useState, useMemo } from 'react'

// ─── Types ──────────────────────────────────────────────────────────────────

type MetricCategory =
  'quality' | 'security' | 'performance' | 'testing' | 'documentation' | 'maintainability'
type TrendDirection = 'improving' | 'stable' | 'declining'

interface HealthMetric {
  id: string
  name: string
  category: MetricCategory
  score: number
  maxScore: number
  trend: TrendDirection
  trendValue: number
  description: string
  details: string[]
}

interface CommitHealth {
  id: string
  sha: string
  message: string
  author: string
  date: string
  filesChanged: number
  additions: number
  deletions: number
  overallScore: number
  metrics: HealthMetric[]
  tags: string[]
}

interface TeamMember {
  name: string
  avatar: string
  commits: number
  avgScore: number
  trend: TrendDirection
  specialties: string[]
}

interface HealthInsight {
  id: string
  type: 'achievement' | 'warning' | 'suggestion' | 'trend'
  icon: string
  title: string
  description: string
  impact: 'high' | 'medium' | 'low'
}

interface QualityGate {
  name: string
  threshold: number
  current: number
  passed: boolean
  icon: string
}

// ─── Constants ──────────────────────────────────────────────────────────────

const CATEGORY_MAP: Record<MetricCategory, { label: string; icon: string; color: string }> = {
  quality: { label: 'Code Quality', icon: '✨', color: '#8b5cf6' },
  security: { label: 'Security', icon: '🛡️', color: '#ef4444' },
  performance: { label: 'Performance', icon: '⚡', color: '#f59e0b' },
  testing: { label: 'Testing', icon: '🧪', color: '#10b981' },
  documentation: { label: 'Documentation', icon: '📝', color: '#3b82f6' },
  maintainability: { label: 'Maintainability', icon: '🔧', color: '#06b6d4' },
}

const TREND_MAP: Record<TrendDirection, { icon: string; color: string; label: string }> = {
  improving: { icon: '📈', color: '#10b981', label: 'Improving' },
  stable: { icon: '➡️', color: '#6b7280', label: 'Stable' },
  declining: { icon: '📉', color: '#ef4444', label: 'Declining' },
}

// ─── Sample Data ────────────────────────────────────────────────────────────

const SAMPLE_COMMITS: CommitHealth[] = [
  {
    id: 'c1',
    sha: 'a1b2c3d',
    message: 'feat: add OAuth2 authentication with JWT tokens',
    author: 'Sarah Chen',
    date: '2026-08-28T14:30:00',
    filesChanged: 12,
    additions: 450,
    deletions: 28,
    overallScore: 92,
    metrics: [
      {
        id: 'm1',
        name: 'Code Complexity',
        category: 'quality',
        score: 88,
        maxScore: 100,
        trend: 'improving',
        trendValue: 5,
        description: 'Low cyclomatic complexity',
        details: ['Avg complexity: 4.2', 'Max complexity: 8', '0 functions > 15'],
      },
      {
        id: 'm2',
        name: 'Security Score',
        category: 'security',
        score: 95,
        maxScore: 100,
        trend: 'improving',
        trendValue: 3,
        description: 'No vulnerabilities detected',
        details: ['0 critical findings', '0 high findings', '2 low findings'],
      },
      {
        id: 'm3',
        name: 'Test Coverage',
        category: 'testing',
        score: 85,
        maxScore: 100,
        trend: 'stable',
        trendValue: 0,
        description: 'Good test coverage',
        details: ['85% line coverage', '92% branch coverage', '12 new tests'],
      },
      {
        id: 'm4',
        name: 'Performance Impact',
        category: 'performance',
        score: 90,
        maxScore: 100,
        trend: 'improving',
        trendValue: 8,
        description: 'No performance regression',
        details: ['Bundle size: +2KB', 'Lighthouse: +2pts', 'No N+1 queries'],
      },
      {
        id: 'm5',
        name: 'Documentation',
        category: 'documentation',
        score: 78,
        maxScore: 100,
        trend: 'stable',
        trendValue: 1,
        description: 'Adequate documentation',
        details: ['README updated', 'API docs added', 'Inline comments: 65%'],
      },
      {
        id: 'm6',
        name: 'Maintainability',
        category: 'maintainability',
        score: 88,
        maxScore: 100,
        trend: 'improving',
        trendValue: 4,
        description: 'High maintainability index',
        details: ['MI: 88/100', 'Tech debt: -2 items', 'No code smells'],
      },
    ],
    tags: ['feature', 'security', 'auth'],
  },
  {
    id: 'c2',
    sha: 'e4f5g6h',
    message: 'fix: resolve memory leak in WebSocket connection handler',
    author: 'Marcus Johnson',
    date: '2026-08-27T10:15:00',
    filesChanged: 4,
    additions: 85,
    deletions: 42,
    overallScore: 88,
    metrics: [
      {
        id: 'm6',
        name: 'Code Complexity',
        category: 'quality',
        score: 92,
        maxScore: 100,
        trend: 'stable',
        trendValue: 0,
        description: 'Simple fix with clear logic',
        details: ['Complexity: 3', 'No nested conditionals', 'Clean error handling'],
      },
      {
        id: 'm7',
        name: 'Security Score',
        category: 'security',
        score: 90,
        maxScore: 100,
        trend: 'stable',
        trendValue: 0,
        description: 'Memory leak could lead to DoS',
        details: ['1 medium finding', 'Resource cleanup added', 'Timeout configured'],
      },
      {
        id: 'm8',
        name: 'Test Coverage',
        category: 'testing',
        score: 95,
        maxScore: 100,
        trend: 'improving',
        trendValue: 10,
        description: 'Excellent test coverage',
        details: ['95% coverage', 'Memory leak test added', 'Load test included'],
      },
      {
        id: 'm9',
        name: 'Performance Impact',
        category: 'performance',
        score: 95,
        maxScore: 100,
        trend: 'improving',
        trendValue: 15,
        description: 'Significant improvement',
        details: ['Memory usage: -40%', 'Connection stability: +25%', 'No regressions'],
      },
      {
        id: 'm10',
        name: 'Documentation',
        category: 'documentation',
        score: 82,
        maxScore: 100,
        trend: 'stable',
        trendValue: 2,
        description: 'Good documentation',
        details: ['Root cause explained', 'Fix documented', 'Changelog updated'],
      },
      {
        id: 'm11',
        name: 'Maintainability',
        category: 'maintainability',
        score: 90,
        maxScore: 100,
        trend: 'improving',
        trendValue: 5,
        description: 'Improved code quality',
        details: ['MI: 90/100', 'Tech debt: -1 item', 'Code smell removed'],
      },
    ],
    tags: ['bugfix', 'performance', 'memory'],
  },
  {
    id: 'c3',
    sha: 'i7j8k9l',
    message: 'refactor: extract shared utilities into common module',
    author: 'Priya Patel',
    date: '2026-08-26T16:45:00',
    filesChanged: 18,
    additions: 320,
    deletions: 280,
    overallScore: 85,
    metrics: [
      {
        id: 'm12',
        name: 'Code Complexity',
        category: 'quality',
        score: 82,
        maxScore: 100,
        trend: 'improving',
        trendValue: 12,
        description: 'Reduced duplication',
        details: ['DRY violations: -8', 'Shared utils: +12', 'Avg complexity: -1.5'],
      },
      {
        id: 'm13',
        name: 'Security Score',
        category: 'security',
        score: 88,
        maxScore: 100,
        trend: 'stable',
        trendValue: 0,
        description: 'No security changes',
        details: [
          'Existing security maintained',
          'No new attack surface',
          'Input validation preserved',
        ],
      },
      {
        id: 'm14',
        name: 'Test Coverage',
        category: 'testing',
        score: 80,
        maxScore: 100,
        trend: 'declining',
        trendValue: -5,
        description: 'Coverage dropped slightly',
        details: ['80% coverage (-5%)', 'Refactored paths untested', 'Need more tests'],
      },
      {
        id: 'm15',
        name: 'Performance Impact',
        category: 'performance',
        score: 85,
        maxScore: 100,
        trend: 'improving',
        trendValue: 5,
        description: 'Slight improvement',
        details: ['Bundle size: -8KB', 'Import tree: optimized', 'No runtime changes'],
      },
      {
        id: 'm16',
        name: 'Documentation',
        category: 'documentation',
        score: 75,
        maxScore: 100,
        trend: 'stable',
        trendValue: 0,
        description: 'Needs more docs',
        details: ['Module docs: partial', 'JSDoc: 50%', 'README: updated'],
      },
      {
        id: 'm17',
        name: 'Maintainability',
        category: 'maintainability',
        score: 92,
        maxScore: 100,
        trend: 'improving',
        trendValue: 8,
        description: 'Much more maintainable',
        details: ['MI: 92/100', 'Tech debt: -5 items', 'Code reuse: +15%'],
      },
    ],
    tags: ['refactor', 'cleanup', 'shared'],
  },
  {
    id: 'c4',
    sha: 'm0n1o2p',
    message: 'feat: implement real-time notification system',
    author: 'Alex Kim',
    date: '2026-08-25T11:20:00',
    filesChanged: 8,
    additions: 520,
    deletions: 15,
    overallScore: 78,
    metrics: [
      {
        id: 'm18',
        name: 'Code Complexity',
        category: 'quality',
        score: 72,
        maxScore: 100,
        trend: 'declining',
        trendValue: -8,
        description: 'Complex event handling',
        details: ['Avg complexity: 6.8', 'Max complexity: 14', '3 functions > 10'],
      },
      {
        id: 'm19',
        name: 'Security Score',
        category: 'security',
        score: 85,
        maxScore: 100,
        trend: 'stable',
        trendValue: 0,
        description: 'WebSocket security considered',
        details: ['Auth on connect', 'Rate limiting added', 'XSS protection'],
      },
      {
        id: 'm20',
        name: 'Test Coverage',
        category: 'testing',
        score: 65,
        maxScore: 100,
        trend: 'declining',
        trendValue: -12,
        description: 'Needs more tests',
        details: ['65% coverage', 'E2E tests missing', 'Unit tests: partial'],
      },
      {
        id: 'm21',
        name: 'Performance Impact',
        category: 'performance',
        score: 75,
        maxScore: 100,
        trend: 'stable',
        trendValue: -2,
        description: 'Moderate impact',
        details: ['WebSocket overhead', 'Memory: +15MB', 'CPU: +5% idle'],
      },
      {
        id: 'm22',
        name: 'Documentation',
        category: 'documentation',
        score: 70,
        maxScore: 100,
        trend: 'stable',
        trendValue: 0,
        description: 'Basic documentation',
        details: ['API docs: partial', 'Architecture: described', 'Examples: 2'],
      },
      {
        id: 'm23',
        name: 'Maintainability',
        category: 'maintainability',
        score: 78,
        maxScore: 100,
        trend: 'stable',
        trendValue: 0,
        description: 'Moderate maintainability',
        details: ['MI: 78/100', 'Tech debt: +2 items', 'Coupling: moderate'],
      },
    ],
    tags: ['feature', 'websocket', 'notifications'],
  },
  {
    id: 'c5',
    sha: 'q3r4s5t',
    message: 'docs: update API documentation and add examples',
    author: 'Sarah Chen',
    date: '2026-08-24T09:00:00',
    filesChanged: 6,
    additions: 180,
    deletions: 12,
    overallScore: 95,
    metrics: [
      {
        id: 'm24',
        name: 'Code Complexity',
        category: 'quality',
        score: 100,
        maxScore: 100,
        trend: 'stable',
        trendValue: 0,
        description: 'No code changes',
        details: ['Documentation only', 'No logic changes', 'Formatting improvements'],
      },
      {
        id: 'm25',
        name: 'Security Score',
        category: 'security',
        score: 100,
        maxScore: 100,
        trend: 'stable',
        trendValue: 0,
        description: 'No security impact',
        details: ['No code changes', 'Examples reviewed', 'No secrets exposed'],
      },
      {
        id: 'm26',
        name: 'Test Coverage',
        category: 'testing',
        score: 100,
        maxScore: 100,
        trend: 'stable',
        trendValue: 0,
        description: 'No test changes needed',
        details: ['Doc-only changes', 'Examples verified', 'No regressions'],
      },
      {
        id: 'm27',
        name: 'Performance Impact',
        category: 'performance',
        score: 100,
        maxScore: 100,
        trend: 'stable',
        trendValue: 0,
        description: 'No performance impact',
        details: ['No code changes', 'Bundle size unchanged', 'Runtime unaffected'],
      },
      {
        id: 'm28',
        name: 'Documentation',
        category: 'documentation',
        score: 98,
        maxScore: 100,
        trend: 'improving',
        trendValue: 15,
        description: 'Excellent documentation',
        details: ['12 examples added', 'API ref: complete', 'README: comprehensive'],
      },
      {
        id: 'm29',
        name: 'Maintainability',
        category: 'maintainability',
        score: 95,
        maxScore: 100,
        trend: 'stable',
        trendValue: 0,
        description: 'High maintainability',
        details: ['MI: 95/100', 'No tech debt', 'Clear structure'],
      },
    ],
    tags: ['docs', 'examples', 'api'],
  },
]

const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Sarah Chen',
    avatar: '👩‍💻',
    commits: 45,
    avgScore: 91,
    trend: 'improving',
    specialties: ['Security', 'Documentation'],
  },
  {
    name: 'Marcus Johnson',
    avatar: '👨‍💻',
    commits: 38,
    avgScore: 87,
    trend: 'stable',
    specialties: ['Performance', 'Testing'],
  },
  {
    name: 'Priya Patel',
    avatar: '👩‍🔬',
    commits: 42,
    avgScore: 89,
    trend: 'improving',
    specialties: ['Quality', 'Maintainability'],
  },
  {
    name: 'Alex Kim',
    avatar: '🧑‍💻',
    commits: 35,
    avgScore: 82,
    trend: 'declining',
    specialties: ['Features', 'WebSocket'],
  },
  {
    name: 'Jordan Lee',
    avatar: '👨‍🎨',
    commits: 28,
    avgScore: 85,
    trend: 'stable',
    specialties: ['UI/UX', 'Documentation'],
  },
]

const HEALTH_INSIGHTS: HealthInsight[] = [
  {
    id: 'h1',
    type: 'achievement',
    icon: '🏆',
    title: 'Security Champion',
    description: '3 consecutive commits with 90+ security scores',
    impact: 'high',
  },
  {
    id: 'h2',
    type: 'warning',
    icon: '⚠️',
    title: 'Test Coverage Drop',
    description: 'Coverage dropped below 80% in recent commits',
    impact: 'high',
  },
  {
    id: 'h3',
    type: 'suggestion',
    icon: '💡',
    title: 'Consider Breaking Down',
    description: 'Commit #4 has complexity > 10 in 3 functions',
    impact: 'medium',
  },
  {
    id: 'h4',
    type: 'trend',
    icon: '📈',
    title: 'Quality Improving',
    description: 'Code quality scores trending up over last 5 commits',
    impact: 'medium',
  },
  {
    id: 'h5',
    type: 'achievement',
    icon: '✨',
    title: 'Documentation Star',
    description: 'Documentation scores averaging 90+ this sprint',
    impact: 'low',
  },
  {
    id: 'h6',
    type: 'warning',
    icon: '🔍',
    title: 'Performance Watch',
    description: 'WebSocket commit added 15MB memory overhead',
    impact: 'medium',
  },
]

const QUALITY_GATES: QualityGate[] = [
  { name: 'Code Coverage', threshold: 80, current: 85, passed: true, icon: '🧪' },
  { name: 'Security Score', threshold: 90, current: 92, passed: true, icon: '🛡️' },
  { name: 'Complexity', threshold: 10, current: 7, passed: true, icon: '📊' },
  { name: 'Documentation', threshold: 70, current: 78, passed: true, icon: '📝' },
  { name: 'Performance', threshold: 80, current: 82, passed: true, icon: '⚡' },
  { name: 'Maintainability', threshold: 85, current: 88, passed: true, icon: '🔧' },
]

// ─── Utility Functions ──────────────────────────────────────────────────────

function getScoreColor(score: number): string {
  if (score >= 90) return '#10b981'
  if (score >= 75) return '#3b82f6'
  if (score >= 60) return '#f59e0b'
  return '#ef4444'
}

function getScoreLabel(score: number): string {
  if (score >= 90) return 'Excellent'
  if (score >= 75) return 'Good'
  if (score >= 60) return 'Fair'
  return 'Needs Work'
}

// ─── Radar Chart Component ──────────────────────────────────────────────────

function RadarChart({ metrics, size = 280 }: { metrics: HealthMetric[]; size?: number }) {
  const center = size / 2
  const maxRadius = size / 2 - 40
  const angleStep = (2 * Math.PI) / metrics.length

  const getPoint = (index: number, value: number) => {
    const angle = angleStep * index - Math.PI / 2
    const r = (value / 100) * maxRadius
    return { x: center + r * Math.cos(angle), y: center + r * Math.sin(angle) }
  }

  const polygonPoints = metrics
    .map((m, i) => {
      const p = getPoint(i, m.score)
      return `${p.x},${p.y}`
    })
    .join(' ')

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Grid levels */}
      {[25, 50, 75, 100].map((level) => {
        const pts = metrics
          .map((_, i) => {
            const p = getPoint(i, level)
            return `${p.x},${p.y}`
          })
          .join(' ')
        return (
          <polygon
            key={level}
            points={pts}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
          />
        )
      })}

      {/* Axis lines */}
      {metrics.map((_, i) => {
        const p = getPoint(i, 100)
        return (
          <line
            key={i}
            x1={center}
            y1={center}
            x2={p.x}
            y2={p.y}
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="1"
          />
        )
      })}

      {/* Data polygon */}
      <polygon
        points={polygonPoints}
        fill="rgba(139,92,246,0.15)"
        stroke="#8b5cf6"
        strokeWidth="2"
      />

      {/* Data points and labels */}
      {metrics.map((m, i) => {
        const p = getPoint(i, m.score)
        const labelP = getPoint(i, 115)
        const cat = CATEGORY_MAP[m.category]
        return (
          <g key={m.id}>
            <circle cx={p.x} cy={p.y} r="5" fill={cat.color} stroke="#0f172a" strokeWidth="2" />
            <text
              x={labelP.x}
              y={labelP.y + 3}
              textAnchor="middle"
              fill="#94a3b8"
              fontSize="9"
              fontWeight="600"
            >
              {cat.icon}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

// ─── Main Component ─────────────────────────────────────────────────────────

export default function CommitHealthRadar() {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'commits' | 'team' | 'insights' | 'gates'
  >('overview')
  const [selectedCommit, setSelectedCommit] = useState<CommitHealth>(SAMPLE_COMMITS[0])
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null)

  const overallStats = useMemo(() => {
    const avgScore = Math.round(
      SAMPLE_COMMITS.reduce((s, c) => s + c.overallScore, 0) / SAMPLE_COMMITS.length
    )
    const totalCommits = SAMPLE_COMMITS.length
    const totalFiles = SAMPLE_COMMITS.reduce((s, c) => s + c.filesChanged, 0)
    const totalAdditions = SAMPLE_COMMITS.reduce((s, c) => s + c.additions, 0)
    const totalDeletions = SAMPLE_COMMITS.reduce((s, c) => s + c.deletions, 0)
    return { avgScore, totalCommits, totalFiles, totalAdditions, totalDeletions }
  }, [])

  const tabs = [
    { id: 'overview' as const, label: 'Overview', icon: '📊' },
    { id: 'commits' as const, label: 'Commit Analysis', icon: '🔍' },
    { id: 'team' as const, label: 'Team Insights', icon: '👥' },
    { id: 'insights' as const, label: 'Health Insights', icon: '💡' },
    { id: 'gates' as const, label: 'Quality Gates', icon: '🚧' },
  ]

  const cardStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: '16px',
    padding: '20px',
  }

  const btnStyle = (active: boolean): React.CSSProperties => ({
    padding: '8px 16px',
    borderRadius: '10px',
    border: active ? '1px solid rgba(139,92,246,0.5)' : '1px solid rgba(255,255,255,0.06)',
    background: active ? 'rgba(139,92,246,0.15)' : 'rgba(255,255,255,0.03)',
    color: active ? '#8b5cf6' : '#94a3b8',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '600',
    transition: 'all 0.2s',
  })

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0f172a',
        color: '#e2e8f0',
        padding: '24px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '24px',
        }}
      >
        <div>
          <h1
            style={{
              fontSize: '28px',
              fontWeight: '800',
              margin: '0 0 8px',
              background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            🎯 Commit Health Radar
          </h1>
          <p style={{ color: '#94a3b8', margin: 0, fontSize: '14px' }}>
            Analyze code quality, security, and team performance across commits
          </p>
        </div>
        <div
          style={{
            textAlign: 'center',
            padding: '12px 24px',
            borderRadius: '16px',
            background: `${getScoreColor(overallStats.avgScore)}15`,
            border: `2px solid ${getScoreColor(overallStats.avgScore)}40`,
          }}
        >
          <div
            style={{
              fontSize: '36px',
              fontWeight: '900',
              color: getScoreColor(overallStats.avgScore),
            }}
          >
            {overallStats.avgScore}
          </div>
          <div
            style={{
              fontSize: '12px',
              color: getScoreColor(overallStats.avgScore),
              fontWeight: '600',
            }}
          >
            {getScoreLabel(overallStats.avgScore)}
          </div>
          <div style={{ fontSize: '10px', color: '#94a3b8' }}>Avg Health Score</div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            style={{ ...btnStyle(activeTab === tab.id), padding: '10px 20px' }}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* ═══ OVERVIEW TAB ═══ */}
      {activeTab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
          {/* Radar Chart */}
          <div style={cardStyle}>
            <h3 style={{ margin: '0 0 12px', fontSize: '16px' }}>🎯 Code Health Radar</h3>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <RadarChart metrics={selectedCommit.metrics} size={300} />
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '16px',
                marginTop: '12px',
                flexWrap: 'wrap',
              }}
            >
              {Object.entries(CATEGORY_MAP).map(([key, cat]) => (
                <div
                  key={key}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '10px',
                    color: '#94a3b8',
                  }}
                >
                  <span
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: cat.color,
                    }}
                  />
                  {cat.label}
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Quick Stats */}
            <div style={cardStyle}>
              <h3 style={{ margin: '0 0 12px', fontSize: '14px' }}>📊 Quick Stats</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { label: 'Total Commits', value: overallStats.totalCommits, color: '#8b5cf6' },
                  { label: 'Files Changed', value: overallStats.totalFiles, color: '#3b82f6' },
                  {
                    label: 'Lines Added',
                    value: `+${overallStats.totalAdditions}`,
                    color: '#10b981',
                  },
                  {
                    label: 'Lines Removed',
                    value: `-${overallStats.totalDeletions}`,
                    color: '#ef4444',
                  },
                  {
                    label: 'Avg Score',
                    value: overallStats.avgScore,
                    color: getScoreColor(overallStats.avgScore),
                  },
                ].map((stat, i) => (
                  <div
                    key={i}
                    style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}
                  >
                    <span style={{ color: '#94a3b8' }}>{stat.label}</span>
                    <span style={{ fontWeight: '700', color: stat.color }}>{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Category Scores */}
            <div style={cardStyle}>
              <h3 style={{ margin: '0 0 10px', fontSize: '14px' }}>📈 Category Scores</h3>
              {selectedCommit.metrics.map((m) => {
                const cat = CATEGORY_MAP[m.category]
                const trend = TREND_MAP[m.trend]
                return (
                  <div
                    key={m.id}
                    style={{ marginBottom: '8px', cursor: 'pointer' }}
                    onClick={() => setSelectedMetric(selectedMetric === m.id ? null : m.id)}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '3px',
                      }}
                    >
                      <span style={{ fontSize: '11px', color: '#94a3b8' }}>
                        {cat.icon} {cat.label}
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '10px', color: trend.color }}>{trend.icon}</span>
                        <span
                          style={{
                            fontSize: '12px',
                            fontWeight: '700',
                            color: getScoreColor(m.score),
                          }}
                        >
                          {m.score}
                        </span>
                      </div>
                    </div>
                    <div
                      style={{
                        height: '4px',
                        background: 'rgba(255,255,255,0.05)',
                        borderRadius: '2px',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          height: '100%',
                          width: `${m.score}%`,
                          background: cat.color,
                          borderRadius: '2px',
                        }}
                      />
                    </div>
                    {selectedMetric === m.id && (
                      <div
                        style={{
                          marginTop: '6px',
                          padding: '8px',
                          borderRadius: '6px',
                          background: 'rgba(255,255,255,0.03)',
                          fontSize: '10px',
                          color: '#94a3b8',
                        }}
                      >
                        <div style={{ marginBottom: '4px', color: '#e2e8f0' }}>{m.description}</div>
                        {m.details.map((d, i) => (
                          <div key={i}>• {d}</div>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Quality Gates */}
            <div style={cardStyle}>
              <h3 style={{ margin: '0 0 10px', fontSize: '14px' }}>🚧 Quality Gates</h3>
              {QUALITY_GATES.map((gate) => (
                <div
                  key={gate.name}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '6px',
                    fontSize: '11px',
                  }}
                >
                  <span>{gate.icon}</span>
                  <span style={{ flex: 1, color: '#94a3b8' }}>{gate.name}</span>
                  <span style={{ color: gate.passed ? '#10b981' : '#ef4444', fontWeight: '700' }}>
                    {gate.passed ? '✓' : '✗'} {gate.current}/{gate.threshold}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ═══ COMMITS TAB ═══ */}
      {activeTab === 'commits' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          {/* Commit List */}
          <div style={cardStyle}>
            <h3 style={{ margin: '0 0 12px', fontSize: '16px' }}>📋 Recent Commits</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {SAMPLE_COMMITS.map((commit) => (
                <div
                  key={commit.id}
                  style={{
                    padding: '12px',
                    borderRadius: '10px',
                    background:
                      selectedCommit.id === commit.id
                        ? 'rgba(139,92,246,0.1)'
                        : 'rgba(255,255,255,0.02)',
                    border:
                      selectedCommit.id === commit.id
                        ? '1px solid rgba(139,92,246,0.3)'
                        : '1px solid transparent',
                    cursor: 'pointer',
                  }}
                  onClick={() => setSelectedCommit(commit)}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '6px',
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '11px', color: '#6b7280', fontFamily: 'monospace' }}>
                        {commit.sha}
                      </div>
                      <div style={{ fontSize: '13px', fontWeight: '600', marginTop: '2px' }}>
                        {commit.message}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div
                        style={{
                          fontSize: '18px',
                          fontWeight: '800',
                          color: getScoreColor(commit.overallScore),
                        }}
                      >
                        {commit.overallScore}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', fontSize: '10px', color: '#94a3b8' }}>
                    <span>👤 {commit.author}</span>
                    <span>📁 {commit.filesChanged} files</span>
                    <span style={{ color: '#10b981' }}>+{commit.additions}</span>
                    <span style={{ color: '#ef4444' }}>-{commit.deletions}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '4px', marginTop: '6px', flexWrap: 'wrap' }}>
                    {commit.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          padding: '1px 6px',
                          borderRadius: '4px',
                          background: 'rgba(139,92,246,0.1)',
                          color: '#8b5cf6',
                          fontSize: '9px',
                        }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Commit Detail */}
          <div style={cardStyle}>
            <h3 style={{ margin: '0 0 12px', fontSize: '16px' }}>
              🔍 Commit Analysis: {selectedCommit.sha}
            </h3>
            <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>
              {selectedCommit.message}
            </div>

            {/* Mini Radar */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
              <RadarChart metrics={selectedCommit.metrics} size={220} />
            </div>

            {/* Metrics Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {selectedCommit.metrics.map((m) => {
                const cat = CATEGORY_MAP[m.category]
                return (
                  <div
                    key={m.id}
                    style={{
                      padding: '10px',
                      borderRadius: '8px',
                      background: 'rgba(255,255,255,0.03)',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '4px',
                      }}
                    >
                      <span style={{ fontSize: '10px', color: '#94a3b8' }}>
                        {cat.icon} {cat.label}
                      </span>
                      <span
                        style={{
                          fontSize: '14px',
                          fontWeight: '800',
                          color: getScoreColor(m.score),
                        }}
                      >
                        {m.score}
                      </span>
                    </div>
                    <div
                      style={{
                        height: '3px',
                        background: 'rgba(255,255,255,0.05)',
                        borderRadius: '2px',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          height: '100%',
                          width: `${m.score}%`,
                          background: cat.color,
                          borderRadius: '2px',
                        }}
                      />
                    </div>
                    <div style={{ fontSize: '9px', color: '#6b7280', marginTop: '4px' }}>
                      {m.description}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* ═══ TEAM TAB ═══ */}
      {activeTab === 'team' && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '16px',
          }}
        >
          {TEAM_MEMBERS.map((member) => (
            <div key={member.name} style={{ ...cardStyle, textAlign: 'center' }}>
              <div style={{ fontSize: '40px', marginBottom: '8px' }}>{member.avatar}</div>
              <div style={{ fontSize: '16px', fontWeight: '700', marginBottom: '4px' }}>
                {member.name}
              </div>
              <div
                style={{
                  fontSize: '28px',
                  fontWeight: '900',
                  color: getScoreColor(member.avgScore),
                  marginBottom: '4px',
                }}
              >
                {member.avgScore}
              </div>
              <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '8px' }}>
                Avg Health Score
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '16px',
                  fontSize: '12px',
                  marginBottom: '12px',
                }}
              >
                <div>
                  <div style={{ fontWeight: '700' }}>{member.commits}</div>
                  <div style={{ fontSize: '10px', color: '#94a3b8' }}>Commits</div>
                </div>
                <div>
                  <div style={{ color: TREND_MAP[member.trend].color }}>
                    {TREND_MAP[member.trend].icon}
                  </div>
                  <div style={{ fontSize: '10px', color: '#94a3b8' }}>Trend</div>
                </div>
              </div>

              <div
                style={{ display: 'flex', gap: '4px', justifyContent: 'center', flexWrap: 'wrap' }}
              >
                {member.specialties.map((s) => (
                  <span
                    key={s}
                    style={{
                      padding: '2px 8px',
                      borderRadius: '6px',
                      background: 'rgba(139,92,246,0.1)',
                      color: '#8b5cf6',
                      fontSize: '10px',
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ═══ INSIGHTS TAB ═══ */}
      {activeTab === 'insights' && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '16px',
          }}
        >
          {HEALTH_INSIGHTS.map((insight) => {
            const colors = {
              achievement: '#10b981',
              warning: '#f59e0b',
              suggestion: '#3b82f6',
              trend: '#8b5cf6',
            }
            const impactColors = { high: '#ef4444', medium: '#f59e0b', low: '#10b981' }
            return (
              <div
                key={insight.id}
                style={{ ...cardStyle, borderTop: `3px solid ${colors[insight.type]}` }}
              >
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}
                >
                  <span style={{ fontSize: '24px' }}>{insight.icon}</span>
                  <div>
                    <div style={{ fontWeight: '700', fontSize: '14px' }}>{insight.title}</div>
                    <div
                      style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'capitalize' }}
                    >
                      {insight.type}
                    </div>
                  </div>
                  <span
                    style={{
                      marginLeft: 'auto',
                      padding: '2px 8px',
                      borderRadius: '6px',
                      background: `${impactColors[insight.impact]}20`,
                      color: impactColors[insight.impact],
                      fontSize: '9px',
                      fontWeight: '700',
                    }}
                  >
                    {insight.impact} impact
                  </span>
                </div>
                <div style={{ fontSize: '12px', color: '#94a3b8' }}>{insight.description}</div>
              </div>
            )
          })}
        </div>
      )}

      {/* ═══ QUALITY GATES TAB ═══ */}
      {activeTab === 'gates' && (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={cardStyle}>
            <h3 style={{ margin: '0 0 16px', fontSize: '16px' }}>🚧 Quality Gate Status</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {QUALITY_GATES.map((gate) => (
                <div
                  key={gate.name}
                  style={{
                    padding: '16px',
                    borderRadius: '12px',
                    background: gate.passed ? 'rgba(16,185,129,0.05)' : 'rgba(239,68,68,0.05)',
                    border: `1px solid ${gate.passed ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)'}`,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '8px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '20px' }}>{gate.icon}</span>
                      <span style={{ fontWeight: '700', fontSize: '14px' }}>{gate.name}</span>
                    </div>
                    <span
                      style={{
                        padding: '4px 12px',
                        borderRadius: '8px',
                        background: gate.passed ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)',
                        color: gate.passed ? '#10b981' : '#ef4444',
                        fontSize: '12px',
                        fontWeight: '700',
                      }}
                    >
                      {gate.passed ? '✓ PASSED' : '✗ FAILED'}
                    </span>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '12px',
                      color: '#94a3b8',
                      marginBottom: '6px',
                    }}
                  >
                    <span>
                      Current:{' '}
                      <strong style={{ color: gate.passed ? '#10b981' : '#ef4444' }}>
                        {gate.current}
                      </strong>
                    </span>
                    <span>
                      Threshold: <strong>{gate.threshold}</strong>
                    </span>
                  </div>
                  <div
                    style={{
                      height: '6px',
                      background: 'rgba(255,255,255,0.05)',
                      borderRadius: '3px',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        height: '100%',
                        width: `${Math.min(100, (gate.current / gate.threshold) * 100)}%`,
                        background: gate.passed ? '#10b981' : '#ef4444',
                        borderRadius: '3px',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: '16px',
                padding: '12px',
                borderRadius: '10px',
                background: 'rgba(16,185,129,0.08)',
                border: '1px solid rgba(16,185,129,0.2)',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '18px', fontWeight: '700', color: '#10b981' }}>
                ✅ All Quality Gates Passed
              </div>
              <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>
                All {QUALITY_GATES.length} quality gates are passing. Code health is excellent!
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
