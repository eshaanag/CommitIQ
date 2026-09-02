import React, { useState, useMemo } from 'react'

/* ─── Types ─── */
type PipelineStatus = 'success' | 'failed' | 'running' | 'pending' | 'cancelled' | 'skipped'
type StageStatus = 'passed' | 'failed' | 'running' | 'pending' | 'skipped' | 'cancelled'
type AlertSeverity = 'critical' | 'warning' | 'info'

interface Pipeline {
  id: string
  name: string
  branch: string
  commit: string
  commitMessage: string
  author: string
  status: PipelineStatus
  startTime: string
  duration: string
  stages: Stage[]
  triggeredBy: string
  environment: string
  tags: string[]
}

interface Stage {
  name: string
  status: StageStatus
  duration: string
  jobs: Job[]
}

interface Job {
  name: string
  status: StageStatus
  duration: string
  runner: string
  logs: string
}

interface Metric {
  label: string
  value: string
  change: string
  positive: boolean
  icon: string
}

interface Alert {
  id: string
  title: string
  description: string
  severity: AlertSeverity
  timestamp: string
  source: string
  acknowledged: boolean
}

interface Deployment {
  id: string
  environment: string
  version: string
  status: PipelineStatus
  deployedAt: string
  deployedBy: string
  rollbackAvailable: boolean
  healthCheck: string
  commitSha: string
}

/* ─── Data ─── */
const PIPELINES: Pipeline[] = [
  {
    id: 'PL-1042',
    name: 'main-ci',
    branch: 'main',
    commit: 'a7f3e2d',
    commitMessage: 'feat: add monitoring dashboard',
    author: 'anubhuti',
    status: 'success',
    startTime: '2026-08-31T14:23:00',
    duration: '4m 32s',
    triggeredBy: 'push',
    environment: 'production',
    tags: ['release', 'v2.4.1'],
    stages: [
      {
        name: 'Build',
        status: 'passed',
        duration: '1m 12s',
        jobs: [
          {
            name: 'compile',
            status: 'passed',
            duration: '45s',
            runner: 'runner-01',
            logs: 'Build completed successfully\nTypeScript compilation: 0 errors\nBundle size: 847KB (gzipped: 234KB)',
          },
          {
            name: 'docker-build',
            status: 'passed',
            duration: '27s',
            runner: 'runner-02',
            logs: 'Docker image built: commitiq:latest\nImage size: 156MB\nPushed to registry',
          },
        ],
      },
      {
        name: 'Test',
        status: 'passed',
        duration: '2m 05s',
        jobs: [
          {
            name: 'unit-tests',
            status: 'passed',
            duration: '45s',
            runner: 'runner-01',
            logs: '247 tests passed\nCoverage: 89.2%\n0 failures, 0 skipped',
          },
          {
            name: 'integration-tests',
            status: 'passed',
            duration: '1m 20s',
            runner: 'runner-03',
            logs: '42 integration tests passed\nAPI contracts verified\nDatabase migrations: OK',
          },
        ],
      },
      {
        name: 'Security',
        status: 'passed',
        duration: '45s',
        jobs: [
          {
            name: 'sast-scan',
            status: 'passed',
            duration: '30s',
            runner: 'runner-02',
            logs: 'SAST scan: 0 high, 1 medium, 3 low\nNo secrets detected\nLicense check: all permissive',
          },
          {
            name: 'dependency-audit',
            status: 'passed',
            duration: '15s',
            runner: 'runner-01',
            logs: 'npm audit: 0 vulnerabilities\nAll dependencies up to date',
          },
        ],
      },
      {
        name: 'Deploy',
        status: 'passed',
        duration: '30s',
        jobs: [
          {
            name: 'staging',
            status: 'passed',
            duration: '15s',
            runner: 'runner-04',
            logs: 'Deployed to staging.commitiq.dev\nHealth check: OK\nSmoke tests: passed',
          },
          {
            name: 'production',
            status: 'passed',
            duration: '15s',
            runner: 'runner-04',
            logs: 'Deployed to commitiq.dev\nHealth check: OK\nRollback window: 30min',
          },
        ],
      },
    ],
  },
  {
    id: 'PL-1041',
    name: 'feature-ci',
    branch: 'feature/team-analytics',
    commit: 'b8c4d5e',
    commitMessage: 'feat: team analytics page',
    author: 'anubhuti',
    status: 'failed',
    startTime: '2026-08-31T13:45:00',
    duration: '2m 18s',
    triggeredBy: 'pull_request',
    environment: 'staging',
    tags: ['feature'],
    stages: [
      {
        name: 'Build',
        status: 'passed',
        duration: '1m 10s',
        jobs: [
          {
            name: 'compile',
            status: 'passed',
            duration: '42s',
            runner: 'runner-01',
            logs: 'Build completed',
          },
          {
            name: 'docker-build',
            status: 'passed',
            duration: '28s',
            runner: 'runner-02',
            logs: 'Image built',
          },
        ],
      },
      {
        name: 'Test',
        status: 'failed',
        duration: '1m 08s',
        jobs: [
          {
            name: 'unit-tests',
            status: 'failed',
            duration: '52s',
            runner: 'runner-01',
            logs: '243 tests passed, 4 failed\nFAIL: TeamAnalytics.test.tsx\n- should render metric cards (15ms)\n  Expected: 4 metric cards\n  Received: 0\n- should calculate team score (8ms)\n  TypeError: Cannot read property of undefined',
          },
          {
            name: 'lint',
            status: 'passed',
            duration: '16s',
            runner: 'runner-02',
            logs: 'ESLint: 0 errors, 0 warnings',
          },
        ],
      },
      {
        name: 'Security',
        status: 'skipped',
        duration: '-',
        jobs: [
          {
            name: 'sast-scan',
            status: 'skipped',
            duration: '-',
            runner: 'runner-02',
            logs: 'Skipped due to test failure',
          },
        ],
      },
    ],
  },
  {
    id: 'PL-1040',
    name: 'nightly-build',
    branch: 'main',
    commit: 'd9e0f1a',
    commitMessage: 'chore: nightly dependency update',
    author: 'bot',
    status: 'running',
    startTime: '2026-08-31T02:00:00',
    duration: '3m 45s',
    triggeredBy: 'schedule',
    environment: 'staging',
    tags: ['nightly'],
    stages: [
      {
        name: 'Build',
        status: 'passed',
        duration: '1m 08s',
        jobs: [
          {
            name: 'compile',
            status: 'passed',
            duration: '40s',
            runner: 'runner-01',
            logs: 'Build completed',
          },
          {
            name: 'docker-build',
            status: 'passed',
            duration: '28s',
            runner: 'runner-02',
            logs: 'Image built',
          },
        ],
      },
      {
        name: 'Test',
        status: 'running',
        duration: '2m 37s',
        jobs: [
          {
            name: 'unit-tests',
            status: 'passed',
            duration: '48s',
            runner: 'runner-01',
            logs: '247 tests passed',
          },
          {
            name: 'e2e-tests',
            status: 'running',
            duration: '1m 49s',
            runner: 'runner-05',
            logs: 'Running 85 E2E tests...\n38/85 completed\nCurrently: Auth flow tests',
          },
        ],
      },
      {
        name: 'Security',
        status: 'pending',
        duration: '-',
        jobs: [
          {
            name: 'full-scan',
            status: 'pending',
            duration: '-',
            runner: 'runner-02',
            logs: 'Waiting for test stage',
          },
        ],
      },
    ],
  },
  {
    id: 'PL-1039',
    name: 'hotfix-ci',
    branch: 'hotfix/auth-bypass',
    commit: 'e2f3g4h',
    commitMessage: 'fix: critical auth bypass vulnerability',
    author: 'anubhuti',
    status: 'success',
    startTime: '2026-08-30T22:15:00',
    duration: '5m 12s',
    triggeredBy: 'push',
    environment: 'production',
    tags: ['hotfix', 'security'],
    stages: [
      {
        name: 'Build',
        status: 'passed',
        duration: '1m 05s',
        jobs: [
          {
            name: 'compile',
            status: 'passed',
            duration: '38s',
            runner: 'runner-01',
            logs: 'Build completed',
          },
          {
            name: 'docker-build',
            status: 'passed',
            duration: '27s',
            runner: 'runner-02',
            logs: 'Image built',
          },
        ],
      },
      {
        name: 'Test',
        status: 'passed',
        duration: '2m 15s',
        jobs: [
          {
            name: 'unit-tests',
            status: 'passed',
            duration: '48s',
            runner: 'runner-01',
            logs: '247 tests passed',
          },
          {
            name: 'security-tests',
            status: 'passed',
            duration: '1m 27s',
            runner: 'runner-03',
            logs: 'Auth bypass test: PASS\nJWT validation: PASS\nSession management: PASS',
          },
        ],
      },
      {
        name: 'Security',
        status: 'passed',
        duration: '52s',
        jobs: [
          {
            name: 'pen-test',
            status: 'passed',
            duration: '52s',
            runner: 'runner-02',
            logs: 'Automated pen test: 0 exploitable vulnerabilities\nAuth flow hardened',
          },
        ],
      },
      {
        name: 'Deploy',
        status: 'passed',
        duration: '1m 00s',
        jobs: [
          {
            name: 'emergency-prod',
            status: 'passed',
            duration: '1m 00s',
            runner: 'runner-04',
            logs: 'Emergency deploy to production\nRolling update: 3/3 pods\nHealth check: OK',
          },
        ],
      },
    ],
  },
  {
    id: 'PL-1038',
    name: 'main-ci',
    branch: 'main',
    commit: 'f5g6h7i',
    commitMessage: 'refactor: optimize bundle size',
    author: 'anubhuti',
    status: 'cancelled',
    startTime: '2026-08-30T18:30:00',
    duration: '0m 45s',
    triggeredBy: 'push',
    environment: 'staging',
    tags: [],
    stages: [
      {
        name: 'Build',
        status: 'passed',
        duration: '1m 05s',
        jobs: [
          {
            name: 'compile',
            status: 'passed',
            duration: '38s',
            runner: 'runner-01',
            logs: 'Build completed',
          },
          {
            name: 'docker-build',
            status: 'passed',
            duration: '27s',
            runner: 'runner-02',
            logs: 'Image built',
          },
        ],
      },
      {
        name: 'Test',
        status: 'cancelled',
        duration: '0m 45s',
        jobs: [
          {
            name: 'unit-tests',
            status: 'cancelled',
            duration: '45s',
            runner: 'runner-01',
            logs: 'Cancelled by user',
          },
        ],
      },
    ],
  },
]

const ALERTS: Alert[] = [
  {
    id: 'AL-001',
    title: 'Build Failure Rate Spike',
    description:
      'Build failure rate increased to 23% in the last 24 hours, exceeding the 10% threshold',
    severity: 'critical',
    timestamp: '2026-08-31T14:30:00',
    source: 'pipeline-monitor',
    acknowledged: false,
  },
  {
    id: 'AL-002',
    title: 'Slow Test Suite Detected',
    description: 'Unit test execution time increased by 45% compared to last week average',
    severity: 'warning',
    timestamp: '2026-08-31T13:15:00',
    source: 'test-analyzer',
    acknowledged: false,
  },
  {
    id: 'AL-003',
    title: 'Runner Utilization High',
    description: 'CI runner pool at 87% capacity. Consider scaling up runners.',
    severity: 'warning',
    timestamp: '2026-08-31T12:00:00',
    source: 'runner-monitor',
    acknowledged: true,
  },
  {
    id: 'AL-004',
    title: 'Nightly Build Completed',
    description: 'All 247 tests passed, no new vulnerabilities detected',
    severity: 'info',
    timestamp: '2026-08-31T02:05:00',
    source: 'nightly-scheduler',
    acknowledged: true,
  },
  {
    id: 'AL-005',
    title: 'Docker Layer Cache Hit Rate',
    description: 'Docker build cache hit rate dropped to 62% — consider optimizing layer ordering',
    severity: 'info',
    timestamp: '2026-08-30T22:20:00',
    source: 'docker-monitor',
    acknowledged: false,
  },
]

const DEPLOYMENTS: Deployment[] = [
  {
    id: 'DEP-089',
    environment: 'production',
    version: 'v2.4.1',
    status: 'success',
    deployedAt: '2026-08-31T14:27:00',
    deployedBy: 'anubhuti',
    rollbackAvailable: true,
    healthCheck: 'healthy',
    commitSha: 'a7f3e2d',
  },
  {
    id: 'DEP-088',
    environment: 'staging',
    version: 'v2.5.0-beta',
    status: 'running',
    deployedAt: '2026-08-31T14:00:00',
    deployedBy: 'anubhuti',
    rollbackAvailable: true,
    healthCheck: 'checking',
    commitSha: 'b8c4d5e',
  },
  {
    id: 'DEP-087',
    environment: 'production',
    version: 'v2.4.0',
    status: 'success',
    deployedAt: '2026-08-30T10:15:00',
    deployedBy: 'anubhuti',
    rollbackAvailable: true,
    healthCheck: 'healthy',
    commitSha: 'x1y2z3a',
  },
  {
    id: 'DEP-086',
    environment: 'staging',
    version: 'v2.4.1-rc1',
    status: 'success',
    deployedAt: '2026-08-29T16:00:00',
    deployedBy: 'anubhuti',
    rollbackAvailable: false,
    healthCheck: 'healthy',
    commitSha: 'w4v5u6t',
  },
]

const STATUS_COLORS: Record<PipelineStatus, string> = {
  success: '#22c55e',
  failed: '#ef4444',
  running: '#3b82f6',
  pending: '#94a3b8',
  cancelled: '#6b7280',
  skipped: '#6b7280',
}

const STAGE_STATUS_COLORS: Record<StageStatus, string> = {
  passed: '#22c55e',
  failed: '#ef4444',
  running: '#3b82f6',
  pending: '#94a3b8',
  skipped: '#6b7280',
  cancelled: '#6b7280',
}

const ALERT_COLORS: Record<AlertSeverity, string> = {
  critical: '#ef4444',
  warning: '#eab308',
  info: '#3b82f6',
}

/* ─── SVG Charts ─── */
function SuccessRateChart({ data }: { data: { date: string; rate: number }[] }) {
  const max = 100,
    w = 300,
    h = 80,
    pad = 10
  const points = data.map((d, i) => {
    const x = pad + (i / (data.length - 1)) * (w - pad * 2)
    const y = h - pad - (d.rate / max) * (h - pad * 2)
    return { x, y, ...d }
  })
  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
  const areaPath = `${linePath} L ${points[points.length - 1].x},${h - pad} L ${points[0].x},${h - pad} Z`
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
      <defs>
        <linearGradient id="srGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22c55e" stopOpacity={0.3} />
          <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
        </linearGradient>
      </defs>
      <path d={areaPath} fill="url(#srGrad)" />
      <path d={linePath} fill="none" stroke="#22c55e" strokeWidth={2} />
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={3} fill="#22c55e" />
      ))}
      {/* Threshold line */}
      <line
        x1={pad}
        y1={h - pad - (95 / max) * (h - pad * 2)}
        x2={w - pad}
        y2={h - pad - (95 / max) * (h - pad * 2)}
        stroke="#ef4444"
        strokeWidth={1}
        strokeDasharray="4 4"
        opacity={0.5}
      />
      <text
        x={w - pad + 2}
        y={h - pad - (95 / max) * (h - pad * 2) + 3}
        fill="#ef4444"
        fontSize={8}
      >
        95%
      </text>
    </svg>
  )
}

function DurationBarChart({ data }: { data: { name: string; seconds: number; color: string }[] }) {
  const max = Math.max(...data.map((d) => d.seconds), 1)
  return (
    <div className="space-y-2">
      {data.map((d) => (
        <div key={d.name} className="flex items-center gap-3">
          <span className="text-xs text-slate-400 w-20 truncate">{d.name}</span>
          <div className="flex-1 h-5 bg-slate-800/60 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full flex items-center pl-2 transition-all duration-500"
              style={{ width: `${(d.seconds / max) * 100}%`, backgroundColor: d.color }}
            >
              <span className="text-[10px] text-white font-medium whitespace-nowrap">
                {Math.round(d.seconds)}s
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function StagePipeline({ stages }: { stages: Stage[] }) {
  return (
    <div className="flex items-center gap-1">
      {stages.map((stage, i) => (
        <React.Fragment key={stage.name}>
          <div className="flex flex-col items-center">
            <div
              className="w-7 h-7 rounded-full border-2 flex items-center justify-center text-[10px] font-bold"
              style={{
                borderColor: STAGE_STATUS_COLORS[stage.status],
                color: STAGE_STATUS_COLORS[stage.status],
                backgroundColor: `${STAGE_STATUS_COLORS[stage.status]}15`,
              }}
            >
              {stage.status === 'passed'
                ? '✓'
                : stage.status === 'failed'
                  ? '✗'
                  : stage.status === 'running'
                    ? '◉'
                    : stage.status === 'pending'
                      ? '○'
                      : '–'}
            </div>
            <span className="text-[9px] text-slate-500 mt-1 text-center">{stage.name}</span>
          </div>
          {i < stages.length - 1 && (
            <div
              className="w-8 h-0.5 mt-[-12px]"
              style={{
                backgroundColor:
                  stage.status === 'passed'
                    ? '#22c55e30'
                    : stage.status === 'failed'
                      ? '#ef444430'
                      : '#94a3b830',
              }}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

/* ─── Main Component ─── */
export default function CICDPipelineMonitor() {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'pipelines' | 'deployments' | 'alerts' | 'metrics'
  >('overview')
  const [selectedPipeline, setSelectedPipeline] = useState<string | null>(null)
  const [showJobLogs, setShowJobLogs] = useState<string | null>(null)

  const metrics = useMemo<Metric[]>(
    () => [
      { label: 'Success Rate', value: '92.4%', change: '+2.1%', positive: true, icon: '✅' },
      { label: 'Avg Duration', value: '3m 42s', change: '-18s', positive: true, icon: '⏱️' },
      { label: 'Deployments Today', value: '4', change: '+1', positive: true, icon: '🚀' },
      { label: 'Failed Pipelines', value: '1', change: '+1', positive: false, icon: '❌' },
      { label: 'Avg Queue Time', value: '12s', change: '-5s', positive: true, icon: '⏳' },
      { label: 'Active Runners', value: '5/6', change: '', positive: true, icon: '🖥️' },
    ],
    []
  )

  const successRateData = useMemo(
    () => [
      { date: 'Aug 25', rate: 88 },
      { date: 'Aug 26', rate: 95 },
      { date: 'Aug 27', rate: 91 },
      { date: 'Aug 28', rate: 97 },
      { date: 'Aug 29', rate: 89 },
      { date: 'Aug 30', rate: 94 },
      { date: 'Aug 31', rate: 92 },
    ],
    []
  )

  const durationData = useMemo(
    () => [
      { name: 'Build', seconds: 72, color: '#3b82f6' },
      { name: 'Unit Tests', seconds: 48, color: '#22c55e' },
      { name: 'Integration', seconds: 80, color: '#8b5cf6' },
      { name: 'Security Scan', seconds: 45, color: '#f59e0b' },
      { name: 'E2E Tests', seconds: 109, color: '#ef4444' },
      { name: 'Deploy', seconds: 30, color: '#10b981' },
    ],
    []
  )

  const tabs = [
    { key: 'overview' as const, label: '📊 Overview', short: 'Overview' },
    { key: 'pipelines' as const, label: '🔄 Pipelines', short: 'Pipelines' },
    { key: 'deployments' as const, label: '🚀 Deployments', short: 'Deploys' },
    { key: 'alerts' as const, label: '🔔 Alerts', short: 'Alerts' },
    { key: 'metrics' as const, label: '📈 Metrics', short: 'Metrics' },
  ]

  const selectedPl = PIPELINES.find((p) => p.id === selectedPipeline)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-lg">
            🔄
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              CI/CD Pipeline Monitor
            </h1>
            <p className="text-slate-400 text-sm">
              Real-time pipeline status, deployments, and performance metrics
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 p-1 bg-slate-900/60 rounded-xl border border-slate-800/50 w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab.key ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-cyan-300 shadow-lg' : 'text-slate-400 hover:text-slate-300 hover:bg-slate-800/50'}`}
          >
            <span className="hidden sm:inline">{tab.label}</span>
            <span className="sm:hidden">{tab.short}</span>
          </button>
        ))}
      </div>

      {/* ═══ OVERVIEW TAB ═══ */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {metrics.map((m) => (
              <div
                key={m.label}
                className="bg-slate-900/60 border border-slate-800/50 rounded-xl p-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{m.icon}</span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wide">
                    {m.label}
                  </span>
                </div>
                <div className="text-xl font-bold text-slate-100">{m.value}</div>
                {m.change && (
                  <span className={`text-[10px] ${m.positive ? 'text-green-400' : 'text-red-400'}`}>
                    {m.change}
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Success Rate Trend */}
            <div className="bg-slate-900/60 border border-slate-800/50 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-slate-200 mb-4">Success Rate (7 days)</h3>
              <SuccessRateChart data={successRateData} />
              <div className="flex justify-between text-[10px] text-slate-500 mt-2 px-2">
                {successRateData.map((d) => (
                  <span key={d.date}>{d.date.split(' ')[1]}</span>
                ))}
              </div>
              <div className="mt-2 flex items-center gap-2 text-[10px] text-slate-400">
                <div className="w-4 h-0 border-t border-dashed border-red-500/50" />
                <span>Target: 95%</span>
              </div>
            </div>

            {/* Pipeline Duration Breakdown */}
            <div className="bg-slate-900/60 border border-slate-800/50 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-slate-200 mb-4">
                Pipeline Stage Durations
              </h3>
              <DurationBarChart data={durationData} />
              <div className="mt-3 text-xs text-slate-500">
                Total estimated: {durationData.reduce((a, d) => a + d.seconds, 0)}s (
                {Math.round(durationData.reduce((a, d) => a + d.seconds, 0) / 60)}m{' '}
                {durationData.reduce((a, d) => a + d.seconds, 0) % 60}s)
              </div>
            </div>
          </div>

          {/* Recent Pipelines */}
          <div className="bg-slate-900/60 border border-slate-800/50 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-slate-200 mb-4">Recent Pipelines</h3>
            <div className="space-y-2">
              {PIPELINES.slice(0, 4).map((pl) => (
                <div
                  key={pl.id}
                  className="flex items-center gap-4 p-3 rounded-lg bg-slate-800/30 border border-slate-700/20 hover:bg-slate-800/50 cursor-pointer transition-all"
                  onClick={() => {
                    setSelectedPipeline(pl.id)
                    setActiveTab('pipelines')
                  }}
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: STATUS_COLORS[pl.status],
                      boxShadow:
                        pl.status === 'running' ? `0 0 8px ${STATUS_COLORS[pl.status]}` : undefined,
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-slate-200">{pl.name}</span>
                      <span className="text-xs text-slate-500">#{pl.id}</span>
                      <span className="text-xs text-slate-500">on {pl.branch}</span>
                    </div>
                    <p className="text-xs text-slate-400 truncate">{pl.commitMessage}</p>
                  </div>
                  <StagePipeline stages={pl.stages} />
                  <span className="text-xs text-slate-400 whitespace-nowrap">{pl.duration}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ═══ PIPELINES TAB ═══ */}
      {activeTab === 'pipelines' && (
        <div className="space-y-4">
          {selectedPl ? (
            <div className="space-y-4">
              <button
                onClick={() => setSelectedPipeline(null)}
                className="text-xs text-cyan-400 hover:text-cyan-300"
              >
                ← Back to all pipelines
              </button>
              <div className="bg-slate-900/60 border border-slate-800/50 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: STATUS_COLORS[selectedPl.status] }}
                  />
                  <h2 className="text-lg font-bold text-slate-100">
                    {selectedPl.name}{' '}
                    <span className="text-slate-500 text-sm">#{selectedPl.id}</span>
                  </h2>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: `${STATUS_COLORS[selectedPl.status]}20`,
                      color: STATUS_COLORS[selectedPl.status],
                    }}
                  >
                    {selectedPl.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4 text-xs">
                  <div>
                    <span className="text-slate-500">Branch:</span>{' '}
                    <span className="text-slate-300">{selectedPl.branch}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Commit:</span>{' '}
                    <span className="text-slate-300 font-mono">{selectedPl.commit}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Author:</span>{' '}
                    <span className="text-slate-300">{selectedPl.author}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Duration:</span>{' '}
                    <span className="text-slate-300">{selectedPl.duration}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Triggered by:</span>{' '}
                    <span className="text-slate-300">{selectedPl.triggeredBy}</span>
                  </div>
                </div>
                <p className="text-sm text-slate-400 mb-4">{selectedPl.commitMessage}</p>
                {selectedPl.tags.length > 0 && (
                  <div className="flex gap-1 mb-4">
                    {selectedPl.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-full bg-slate-800/60 text-[10px] text-slate-400 border border-slate-700/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                {/* Stages */}
                <div className="space-y-4">
                  {selectedPl.stages.map((stage) => (
                    <div
                      key={stage.name}
                      className="p-4 rounded-lg bg-slate-800/30 border border-slate-700/20"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className="w-6 h-6 rounded-full border-2 flex items-center justify-center text-[10px]"
                          style={{
                            borderColor: STAGE_STATUS_COLORS[stage.status],
                            color: STAGE_STATUS_COLORS[stage.status],
                          }}
                        >
                          {stage.status === 'passed'
                            ? '✓'
                            : stage.status === 'failed'
                              ? '✗'
                              : stage.status === 'running'
                                ? '◉'
                                : '○'}
                        </div>
                        <span className="text-sm font-semibold text-slate-200">{stage.name}</span>
                        <span className="text-xs text-slate-400">{stage.duration}</span>
                      </div>
                      <div className="space-y-2 ml-9">
                        {stage.jobs.map((job) => (
                          <div
                            key={job.name}
                            className="p-2 rounded bg-slate-900/40 border border-slate-700/10"
                          >
                            <div className="flex items-center gap-2">
                              <div
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: STAGE_STATUS_COLORS[job.status] }}
                              />
                              <span className="text-xs text-slate-300">{job.name}</span>
                              <span className="text-[10px] text-slate-500">{job.duration}</span>
                              <span className="text-[10px] text-slate-600">on {job.runner}</span>
                              <button
                                onClick={() =>
                                  setShowJobLogs(
                                    showJobLogs === `${selectedPl.id}-${job.name}`
                                      ? null
                                      : `${selectedPl.id}-${job.name}`
                                  )
                                }
                                className="ml-auto text-[10px] text-cyan-400 hover:text-cyan-300"
                              >
                                Logs
                              </button>
                            </div>
                            {showJobLogs === `${selectedPl.id}-${job.name}` && (
                              <pre className="mt-2 p-2 rounded bg-slate-950/60 text-[10px] text-green-400 font-mono overflow-x-auto whitespace-pre-wrap">
                                {job.logs}
                              </pre>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {PIPELINES.map((pl) => (
                <div
                  key={pl.id}
                  className="bg-slate-900/60 border border-slate-800/50 rounded-xl p-4 hover:border-slate-700/50 transition-all cursor-pointer"
                  onClick={() => setSelectedPipeline(pl.id)}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{
                        backgroundColor: STATUS_COLORS[pl.status],
                        boxShadow:
                          pl.status === 'running'
                            ? `0 0 8px ${STATUS_COLORS[pl.status]}`
                            : undefined,
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-slate-200">{pl.name}</span>
                        <span className="text-xs text-slate-500">#{pl.id}</span>
                        <span className="text-xs text-slate-500">on {pl.branch}</span>
                        <span
                          className="text-xs px-1.5 py-0.5 rounded"
                          style={{
                            backgroundColor: `${STATUS_COLORS[pl.status]}20`,
                            color: STATUS_COLORS[pl.status],
                          }}
                        >
                          {pl.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 truncate mt-0.5">{pl.commitMessage}</p>
                    </div>
                    <StagePipeline stages={pl.stages} />
                    <div className="text-right text-xs text-slate-400">
                      <div>{pl.duration}</div>
                      <div className="text-[10px] text-slate-500">{pl.author}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ═══ DEPLOYMENTS TAB ═══ */}
      {activeTab === 'deployments' && (
        <div className="space-y-4">
          {DEPLOYMENTS.map((dep) => (
            <div key={dep.id} className="bg-slate-900/60 border border-slate-800/50 rounded-xl p-5">
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold"
                  style={{
                    backgroundColor: `${STATUS_COLORS[dep.status]}20`,
                    color: STATUS_COLORS[dep.status],
                  }}
                >
                  {dep.status === 'success'
                    ? '✓'
                    : dep.status === 'running'
                      ? '◉'
                      : dep.status === 'failed'
                        ? '✗'
                        : '○'}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-slate-200">{dep.version}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800/60 text-slate-400">
                      {dep.environment}
                    </span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded ${dep.healthCheck === 'healthy' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}
                    >
                      {dep.healthCheck}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                    <span>by {dep.deployedBy}</span>
                    <span className="font-mono">{dep.commitSha}</span>
                    <span>{new Date(dep.deployedAt).toLocaleString()}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {dep.rollbackAvailable && (
                    <button className="px-3 py-1.5 rounded-lg bg-slate-800/60 border border-slate-700/30 text-xs text-slate-300 hover:bg-slate-800">
                      Rollback
                    </button>
                  )}
                  <button className="px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-400 hover:bg-cyan-500/20">
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ═══ ALERTS TAB ═══ */}
      {activeTab === 'alerts' && (
        <div className="space-y-3">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs text-slate-400">
              {ALERTS.filter((a) => !a.acknowledged).length} unacknowledged
            </span>
          </div>
          {ALERTS.map((alert) => (
            <div
              key={alert.id}
              className={`bg-slate-900/60 border rounded-xl p-4 transition-all ${alert.acknowledged ? 'border-slate-800/30 opacity-60' : 'border-slate-800/50'}`}
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-sm mt-0.5"
                  style={{
                    backgroundColor: `${ALERT_COLORS[alert.severity]}20`,
                    color: ALERT_COLORS[alert.severity],
                  }}
                >
                  {alert.severity === 'critical'
                    ? '🚨'
                    : alert.severity === 'warning'
                      ? '⚠️'
                      : 'ℹ️'}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-slate-200">{alert.title}</span>
                    <span
                      className="text-[10px] px-1.5 py-0.5 rounded uppercase font-medium"
                      style={{
                        backgroundColor: `${ALERT_COLORS[alert.severity]}20`,
                        color: ALERT_COLORS[alert.severity],
                      }}
                    >
                      {alert.severity}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{alert.description}</p>
                  <div className="flex items-center gap-3 mt-2 text-[10px] text-slate-500">
                    <span>{alert.source}</span>
                    <span>{new Date(alert.timestamp).toLocaleString()}</span>
                  </div>
                </div>
                {!alert.acknowledged && (
                  <button className="px-3 py-1 rounded-lg bg-slate-800/60 border border-slate-700/30 text-xs text-slate-400 hover:bg-slate-800">
                    Ack
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ═══ METRICS TAB ═══ */}
      {activeTab === 'metrics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Build Frequency */}
            <div className="bg-slate-900/60 border border-slate-800/50 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-slate-200 mb-4">
                Build Frequency (7 days)
              </h3>
              <div className="grid grid-cols-7 gap-2">
                {[8, 12, 6, 15, 10, 9, 7].map((count, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <div
                      className="w-full bg-blue-500/20 rounded-t"
                      style={{ height: `${count * 8}px` }}
                    />
                    <span className="text-[10px] text-slate-500">
                      {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                    </span>
                    <span className="text-[10px] text-slate-400">{count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Failure Reasons */}
            <div className="bg-slate-900/60 border border-slate-800/50 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-slate-200 mb-4">Failure Reasons</h3>
              <div className="space-y-3">
                {[
                  { reason: 'Test failures', count: 4, pct: 44, color: '#ef4444' },
                  { reason: 'Build errors', count: 2, pct: 22, color: '#f97316' },
                  { reason: 'Lint violations', count: 1, pct: 11, color: '#eab308' },
                  { reason: 'Timeout', count: 1, pct: 11, color: '#8b5cf6' },
                  { reason: 'Docker build fail', count: 1, pct: 11, color: '#3b82f6' },
                ].map((r) => (
                  <div key={r.reason} className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: r.color }} />
                    <span className="text-xs text-slate-300 flex-1">{r.reason}</span>
                    <span className="text-xs text-slate-400">{r.count}</span>
                    <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${r.pct}%`, backgroundColor: r.color }}
                      />
                    </div>
                    <span className="text-[10px] text-slate-500 w-8 text-right">{r.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Runner Performance */}
          <div className="bg-slate-900/60 border border-slate-800/50 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-slate-200 mb-4">Runner Performance</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-slate-500 border-b border-slate-800/50">
                    <th className="text-left py-2 px-3">Runner</th>
                    <th className="text-left py-2 px-3">Status</th>
                    <th className="text-left py-2 px-3">Jobs Today</th>
                    <th className="text-left py-2 px-3">Avg Duration</th>
                    <th className="text-left py-2 px-3">Success Rate</th>
                    <th className="text-left py-2 px-3">Uptime</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      name: 'runner-01',
                      status: 'active',
                      jobs: 24,
                      avgDuration: '2m 15s',
                      successRate: 96,
                      uptime: '99.9%',
                    },
                    {
                      name: 'runner-02',
                      status: 'active',
                      jobs: 18,
                      avgDuration: '1m 48s',
                      successRate: 94,
                      uptime: '99.8%',
                    },
                    {
                      name: 'runner-03',
                      status: 'active',
                      jobs: 15,
                      avgDuration: '3m 02s',
                      successRate: 98,
                      uptime: '99.9%',
                    },
                    {
                      name: 'runner-04',
                      status: 'active',
                      jobs: 12,
                      avgDuration: '1m 30s',
                      successRate: 100,
                      uptime: '100%',
                    },
                    {
                      name: 'runner-05',
                      status: 'busy',
                      jobs: 8,
                      avgDuration: '4m 22s',
                      successRate: 88,
                      uptime: '99.5%',
                    },
                    {
                      name: 'runner-06',
                      status: 'idle',
                      jobs: 0,
                      avgDuration: '-',
                      successRate: 0,
                      uptime: '99.9%',
                    },
                  ].map((runner) => (
                    <tr
                      key={runner.name}
                      className="border-b border-slate-800/30 hover:bg-slate-800/20"
                    >
                      <td className="py-2 px-3 text-slate-300 font-mono">{runner.name}</td>
                      <td className="py-2 px-3">
                        <span
                          className={`px-1.5 py-0.5 rounded text-[10px] ${runner.status === 'active' ? 'bg-green-500/20 text-green-400' : runner.status === 'busy' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-slate-700/40 text-slate-400'}`}
                        >
                          {runner.status}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-slate-300">{runner.jobs}</td>
                      <td className="py-2 px-3 text-slate-300">{runner.avgDuration}</td>
                      <td className="py-2 px-3">
                        <span
                          className={
                            runner.successRate >= 95
                              ? 'text-green-400'
                              : runner.successRate >= 90
                                ? 'text-yellow-400'
                                : 'text-red-400'
                          }
                        >
                          {runner.successRate}%
                        </span>
                      </td>
                      <td className="py-2 px-3 text-slate-300">{runner.uptime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
