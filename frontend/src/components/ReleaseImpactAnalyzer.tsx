/**
 * ReleaseImpactAnalyzer.tsx
 *
 * Release impact analysis dashboard with:
 * - Release risk scoring (change size, complexity, test coverage, rollback risk)
 * - Post-release health monitoring (error rates, performance, user impact)
 * - Release comparison view
 * - Deployment timeline
 * - Risk factor breakdown
 */

import { useState, useMemo } from 'react'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Release {
  id: string
  version: string
  date: string
  author: string
  avatar: string
  status: 'success' | 'partial' | 'failed' | 'rolled_back'
  riskScore: number
  metrics: ReleaseMetrics
  riskFactors: RiskFactor[]
  commits: number
  filesChanged: number
  linesAdded: number
  linesRemoved: number
}

interface ReleaseMetrics {
  errorRate: number
  p95Latency: number
  uptime: number
  userImpact: number
  rollbackTime: number | null
  deployTime: number
}

interface RiskFactor {
  name: string
  icon: string
  score: number
  maxScore: number
  description: string
  mitigation: string
}

// ---------------------------------------------------------------------------
// Mock Data
// ---------------------------------------------------------------------------

function generateMockReleases(): Release[] {
  return [
    {
      id: 'rel-001',
      version: 'v2.4.0',
      date: '2026-08-28',
      author: 'Alice Chen',
      avatar: '👩‍💻',
      status: 'success',
      riskScore: 32,
      commits: 47,
      filesChanged: 89,
      linesAdded: 4200,
      linesRemoved: 1800,
      metrics: {
        errorRate: 0.2,
        p95Latency: 145,
        uptime: 99.98,
        userImpact: 12,
        rollbackTime: null,
        deployTime: 8,
      },
      riskFactors: [
        {
          name: 'Change Size',
          icon: '📏',
          score: 6,
          maxScore: 10,
          description: 'Large release with 47 commits across 89 files',
          mitigation: 'Consider splitting into smaller releases',
        },
        {
          name: 'Test Coverage',
          icon: '🧪',
          score: 2,
          maxScore: 10,
          description: '92% test coverage on changed files',
          mitigation: 'Maintain current coverage levels',
        },
        {
          name: 'Complexity',
          icon: '🧩',
          score: 4,
          maxScore: 10,
          description: 'Moderate cyclomatic complexity in 3 modules',
          mitigation: 'Refactor complex functions post-release',
        },
        {
          name: 'Dependency Risk',
          icon: '📦',
          score: 3,
          maxScore: 10,
          description: '2 new dependencies added (low risk)',
          mitigation: 'Audit dependencies regularly',
        },
        {
          name: 'Rollback Plan',
          icon: '🔄',
          score: 1,
          maxScore: 10,
          description: 'Feature flags enabled, instant rollback possible',
          mitigation: 'N/A - well prepared',
        },
        {
          name: 'Team Familiarity',
          icon: '👥',
          score: 2,
          maxScore: 10,
          description: 'All contributors are core team members',
          mitigation: 'N/A',
        },
      ],
    },
    {
      id: 'rel-002',
      version: 'v2.3.1',
      date: '2026-08-20',
      author: 'Bob Smith',
      avatar: '👨‍💻',
      status: 'success',
      riskScore: 18,
      commits: 12,
      filesChanged: 23,
      linesAdded: 890,
      linesRemoved: 340,
      metrics: {
        errorRate: 0.1,
        p95Latency: 132,
        uptime: 99.99,
        userImpact: 3,
        rollbackTime: null,
        deployTime: 4,
      },
      riskFactors: [
        {
          name: 'Change Size',
          icon: '📏',
          score: 3,
          maxScore: 10,
          description: 'Small patch release',
          mitigation: 'N/A',
        },
        {
          name: 'Test Coverage',
          icon: '🧪',
          score: 1,
          maxScore: 10,
          description: '96% coverage on changes',
          mitigation: 'N/A',
        },
        {
          name: 'Complexity',
          icon: '🧩',
          score: 2,
          maxScore: 10,
          description: 'Low complexity bug fixes',
          mitigation: 'N/A',
        },
        {
          name: 'Dependency Risk',
          icon: '📦',
          score: 1,
          maxScore: 10,
          description: 'No new dependencies',
          mitigation: 'N/A',
        },
        {
          name: 'Rollback Plan',
          icon: '🔄',
          score: 1,
          maxScore: 10,
          description: 'Easy rollback',
          mitigation: 'N/A',
        },
        {
          name: 'Team Familiarity',
          icon: '👥',
          score: 1,
          maxScore: 10,
          description: 'Familiar codebase',
          mitigation: 'N/A',
        },
      ],
    },
    {
      id: 'rel-003',
      version: 'v2.3.0',
      date: '2026-08-10',
      author: 'Carol White',
      avatar: '👩‍🔬',
      status: 'rolled_back',
      riskScore: 72,
      commits: 63,
      filesChanged: 124,
      linesAdded: 7800,
      linesRemoved: 3200,
      metrics: {
        errorRate: 4.8,
        p95Latency: 890,
        uptime: 98.2,
        userImpact: 340,
        rollbackTime: 15,
        deployTime: 22,
      },
      riskFactors: [
        {
          name: 'Change Size',
          icon: '📏',
          score: 9,
          maxScore: 10,
          description: 'Very large release - 63 commits, 124 files',
          mitigation: 'Split into smaller releases',
        },
        {
          name: 'Test Coverage',
          icon: '🧪',
          score: 7,
          maxScore: 10,
          description: 'Only 61% coverage on new code',
          mitigation: 'Require 80%+ before deploy',
        },
        {
          name: 'Complexity',
          icon: '🧩',
          score: 8,
          maxScore: 10,
          description: 'High complexity in auth module',
          mitigation: 'Refactor before next release',
        },
        {
          name: 'Dependency Risk',
          icon: '📦',
          score: 6,
          maxScore: 10,
          description: '5 new dependencies, 2 with CVEs',
          mitigation: 'Update or replace vulnerable deps',
        },
        {
          name: 'Rollback Plan',
          icon: '🔄',
          score: 5,
          maxScore: 10,
          description: 'Database migrations required rollback',
          mitigation: 'Use backward-compatible migrations',
        },
        {
          name: 'Team Familiarity',
          icon: '👥',
          score: 4,
          maxScore: 10,
          description: '2 external contributors',
          mitigation: 'Pair review with core team',
        },
      ],
    },
    {
      id: 'rel-004',
      version: 'v2.2.2',
      date: '2026-07-28',
      author: 'Eva Martinez',
      avatar: '👩‍🎨',
      status: 'success',
      riskScore: 25,
      commits: 18,
      filesChanged: 34,
      linesAdded: 1200,
      linesRemoved: 560,
      metrics: {
        errorRate: 0.3,
        p95Latency: 155,
        uptime: 99.95,
        userImpact: 8,
        rollbackTime: null,
        deployTime: 6,
      },
      riskFactors: [
        {
          name: 'Change Size',
          icon: '📏',
          score: 4,
          maxScore: 10,
          description: 'Medium-sized feature release',
          mitigation: 'N/A',
        },
        {
          name: 'Test Coverage',
          icon: '🧪',
          score: 2,
          maxScore: 10,
          description: '88% coverage',
          mitigation: 'Slightly improve edge case tests',
        },
        {
          name: 'Complexity',
          icon: '🧩',
          score: 3,
          maxScore: 10,
          description: 'Moderate complexity',
          mitigation: 'N/A',
        },
        {
          name: 'Dependency Risk',
          icon: '📦',
          score: 2,
          maxScore: 10,
          description: '1 new dependency (low risk)',
          mitigation: 'N/A',
        },
        {
          name: 'Rollback Plan',
          icon: '🔄',
          score: 2,
          maxScore: 10,
          description: 'Feature flags enabled',
          mitigation: 'N/A',
        },
        {
          name: 'Team Familiarity',
          icon: '👥',
          score: 1,
          maxScore: 10,
          description: 'Core team',
          mitigation: 'N/A',
        },
      ],
    },
    {
      id: 'rel-005',
      version: 'v2.2.1',
      date: '2026-07-15',
      author: 'David Brown',
      avatar: '🧑‍💻',
      status: 'partial',
      riskScore: 55,
      commits: 31,
      filesChanged: 67,
      linesAdded: 3100,
      linesRemoved: 1400,
      metrics: {
        errorRate: 2.1,
        p95Latency: 420,
        uptime: 99.1,
        userImpact: 89,
        rollbackTime: null,
        deployTime: 18,
      },
      riskFactors: [
        {
          name: 'Change Size',
          icon: '📏',
          score: 7,
          maxScore: 10,
          description: 'Large release',
          mitigation: 'Consider staging rollout',
        },
        {
          name: 'Test Coverage',
          icon: '🧪',
          score: 5,
          maxScore: 10,
          description: '74% coverage on changes',
          mitigation: 'Add integration tests',
        },
        {
          name: 'Complexity',
          icon: '🧩',
          score: 6,
          maxScore: 10,
          description: 'Complex database changes',
          mitigation: 'Review migration scripts',
        },
        {
          name: 'Dependency Risk',
          icon: '📦',
          score: 3,
          maxScore: 10,
          description: 'Minor dependency updates',
          mitigation: 'N/A',
        },
        {
          name: 'Rollback Plan',
          icon: '🔄',
          score: 4,
          maxScore: 10,
          description: 'Partial rollback possible',
          mitigation: 'Implement full rollback path',
        },
        {
          name: 'Team Familiarity',
          icon: '👥',
          score: 3,
          maxScore: 10,
          description: 'New team member authored',
          mitigation: 'Senior review next time',
        },
      ],
    },
  ]
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getStatusConfig(status: Release['status']) {
  const configs = {
    success: { label: '✅ Success', color: '#22c55e', bg: 'bg-green-500/10 border-green-500/20' },
    partial: {
      label: '⚠️ Partial Issues',
      color: '#eab308',
      bg: 'bg-yellow-500/10 border-yellow-500/20',
    },
    failed: { label: '❌ Failed', color: '#ef4444', bg: 'bg-red-500/10 border-red-500/20' },
    rolled_back: {
      label: '🔄 Rolled Back',
      color: '#f97316',
      bg: 'bg-orange-500/10 border-orange-500/20',
    },
  }
  return configs[status]
}

function getRiskColor(score: number) {
  if (score <= 30) return '#22c55e'
  if (score <= 50) return '#eab308'
  if (score <= 70) return '#f97316'
  return '#ef4444'
}

function getRiskLabel(score: number) {
  if (score <= 30) return 'Low Risk'
  if (score <= 50) return 'Medium Risk'
  if (score <= 70) return 'High Risk'
  return 'Critical Risk'
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export function ReleaseImpactAnalyzer() {
  const [selectedRelease, setSelectedRelease] = useState<string | null>(null)
  const [view, setView] = useState<'timeline' | 'compare'>('timeline')

  const releases = useMemo(() => generateMockReleases(), [])
  const selected = releases.find((r) => r.id === selectedRelease)

  // Summary stats
  const totalReleases = releases.length
  const successRate = (
    (releases.filter((r) => r.status === 'success').length / totalReleases) *
    100
  ).toFixed(0)
  const avgRisk = Math.round(releases.reduce((sum, r) => sum + r.riskScore, 0) / totalReleases)
  const rolledBack = releases.filter((r) => r.status === 'rolled_back').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <span className="text-3xl">🚀</span> Release Impact Analyzer
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Deployment risk scoring, post-release health, and release comparison
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setView('timeline')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              view === 'timeline'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            📅 Timeline
          </button>
          <button
            onClick={() => setView('compare')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              view === 'compare'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            ⚖️ Compare
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="glass-panel rounded-xl p-4">
          <div className="text-xs text-slate-400 uppercase">Total Releases</div>
          <div className="text-2xl font-bold text-white">{totalReleases}</div>
        </div>
        <div className="glass-panel rounded-xl p-4">
          <div className="text-xs text-slate-400 uppercase">Success Rate</div>
          <div className="text-2xl font-bold text-green-400">{successRate}%</div>
        </div>
        <div className="glass-panel rounded-xl p-4">
          <div className="text-xs text-slate-400 uppercase">Avg Risk Score</div>
          <div className="text-2xl font-bold" style={{ color: getRiskColor(avgRisk) }}>
            {avgRisk}/100
          </div>
        </div>
        <div className="glass-panel rounded-xl p-4">
          <div className="text-xs text-slate-400 uppercase">Rollbacks</div>
          <div className="text-2xl font-bold text-orange-400">{rolledBack}</div>
        </div>
      </div>

      {/* Timeline View */}
      {view === 'timeline' && (
        <div className="space-y-4">
          {/* Release Timeline */}
          <div className="glass-panel rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">📅 Release Timeline</h3>
            <div className="space-y-3">
              {releases.map((release, i) => {
                const statusConfig = getStatusConfig(release.status)
                const riskColor = getRiskColor(release.riskScore)
                return (
                  <button
                    key={release.id}
                    onClick={() =>
                      setSelectedRelease(selectedRelease === release.id ? null : release.id)
                    }
                    className={`w-full text-left p-4 rounded-xl transition-all hover:bg-white/5 ${
                      selectedRelease === release.id
                        ? 'bg-purple-500/10 border border-purple-500/30'
                        : 'bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Timeline dot */}
                      <div className="flex flex-col items-center">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: riskColor }}
                        />
                        {i < releases.length - 1 && <div className="w-px h-8 bg-white/10" />}
                      </div>

                      {/* Release info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{release.avatar}</span>
                          <span className="font-bold text-white">{release.version}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${statusConfig.bg}`}>
                            {statusConfig.label}
                          </span>
                        </div>
                        <div className="text-xs text-slate-400 mt-1">
                          {release.date} • {release.author} • {release.commits} commits •{' '}
                          {release.filesChanged} files
                        </div>
                      </div>

                      {/* Risk score */}
                      <div className="text-right">
                        <div className="text-xl font-bold" style={{ color: riskColor }}>
                          {release.riskScore}
                        </div>
                        <div className="text-xs" style={{ color: riskColor }}>
                          {getRiskLabel(release.riskScore)}
                        </div>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Selected Release Detail */}
          {selected && (
            <div className="space-y-4">
              {/* Metrics */}
              <div className="glass-panel rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">
                  📊 Post-Release Health — {selected.version}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
                  <div className="text-center p-3 rounded-lg bg-white/5">
                    <div className="text-xs text-slate-400">Error Rate</div>
                    <div
                      className={`text-lg font-bold ${selected.metrics.errorRate < 1 ? 'text-green-400' : selected.metrics.errorRate < 3 ? 'text-yellow-400' : 'text-red-400'}`}
                    >
                      {selected.metrics.errorRate}%
                    </div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-white/5">
                    <div className="text-xs text-slate-400">P95 Latency</div>
                    <div
                      className={`text-lg font-bold ${selected.metrics.p95Latency < 200 ? 'text-green-400' : selected.metrics.p95Latency < 500 ? 'text-yellow-400' : 'text-red-400'}`}
                    >
                      {selected.metrics.p95Latency}ms
                    </div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-white/5">
                    <div className="text-xs text-slate-400">Uptime</div>
                    <div
                      className={`text-lg font-bold ${selected.metrics.uptime > 99.9 ? 'text-green-400' : selected.metrics.uptime > 99 ? 'text-yellow-400' : 'text-red-400'}`}
                    >
                      {selected.metrics.uptime}%
                    </div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-white/5">
                    <div className="text-xs text-slate-400">Users Impacted</div>
                    <div
                      className={`text-lg font-bold ${selected.metrics.userImpact < 20 ? 'text-green-400' : selected.metrics.userImpact < 100 ? 'text-yellow-400' : 'text-red-400'}`}
                    >
                      {selected.metrics.userImpact}
                    </div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-white/5">
                    <div className="text-xs text-slate-400">Deploy Time</div>
                    <div className="text-lg font-bold text-white">
                      {selected.metrics.deployTime}m
                    </div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-white/5">
                    <div className="text-xs text-slate-400">Rollback Time</div>
                    <div
                      className={`text-lg font-bold ${selected.metrics.rollbackTime ? 'text-orange-400' : 'text-green-400'}`}
                    >
                      {selected.metrics.rollbackTime ? `${selected.metrics.rollbackTime}m` : 'N/A'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Risk Factors */}
              <div className="glass-panel rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">⚠️ Risk Factor Breakdown</h3>
                <div className="space-y-3">
                  {selected.riskFactors.map((factor) => {
                    const pct = (factor.score / factor.maxScore) * 100
                    const color =
                      factor.score <= 3 ? '#22c55e' : factor.score <= 6 ? '#eab308' : '#ef4444'
                    return (
                      <div key={factor.name} className="p-3 rounded-lg bg-white/5">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <span>{factor.icon}</span>
                            <span className="text-sm font-semibold text-white">{factor.name}</span>
                          </div>
                          <span className="text-sm font-bold" style={{ color }}>
                            {factor.score}/{factor.maxScore}
                          </span>
                        </div>
                        <div className="w-full bg-white/5 rounded-full h-1.5 mb-1">
                          <div
                            className="h-1.5 rounded-full transition-all"
                            style={{ width: `${pct}%`, backgroundColor: color }}
                          />
                        </div>
                        <p className="text-xs text-slate-400">{factor.description}</p>
                        {factor.mitigation !== 'N/A' && (
                          <p className="text-xs text-blue-400 mt-1">💡 {factor.mitigation}</p>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Change Summary */}
              <div className="glass-panel rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">📝 Change Summary</h3>
                <div className="grid grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{selected.commits}</div>
                    <div className="text-xs text-slate-400">Commits</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{selected.filesChanged}</div>
                    <div className="text-xs text-slate-400">Files Changed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">
                      +{selected.linesAdded.toLocaleString()}
                    </div>
                    <div className="text-xs text-slate-400">Lines Added</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-400">
                      -{selected.linesRemoved.toLocaleString()}
                    </div>
                    <div className="text-xs text-slate-400">Lines Removed</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Compare View */}
      {view === 'compare' && (
        <div className="glass-panel rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">⚖️ Release Comparison</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-slate-400 text-xs uppercase">
                  <th className="text-left pb-3">Release</th>
                  <th className="text-left pb-3">Status</th>
                  <th className="text-right pb-3">Risk</th>
                  <th className="text-right pb-3">Commits</th>
                  <th className="text-right pb-3">Files</th>
                  <th className="text-right pb-3">+Lines</th>
                  <th className="text-right pb-3">-Lines</th>
                  <th className="text-right pb-3">Error Rate</th>
                  <th className="text-right pb-3">P95</th>
                  <th className="text-right pb-3">Deploy</th>
                </tr>
              </thead>
              <tbody>
                {releases.map((r) => {
                  const sc = getStatusConfig(r.status)
                  const rc = getRiskColor(r.riskScore)
                  return (
                    <tr
                      key={r.id}
                      className="border-t border-white/5 hover:bg-white/5 cursor-pointer"
                      onClick={() => {
                        setSelectedRelease(r.id)
                        setView('timeline')
                      }}
                    >
                      <td className="py-3 font-semibold text-white">{r.version}</td>
                      <td className="py-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${sc.bg}`}>
                          {sc.label}
                        </span>
                      </td>
                      <td className="py-3 text-right font-bold" style={{ color: rc }}>
                        {r.riskScore}
                      </td>
                      <td className="py-3 text-right text-slate-300">{r.commits}</td>
                      <td className="py-3 text-right text-slate-300">{r.filesChanged}</td>
                      <td className="py-3 text-right text-green-400">
                        +{r.linesAdded.toLocaleString()}
                      </td>
                      <td className="py-3 text-right text-red-400">
                        -{r.linesRemoved.toLocaleString()}
                      </td>
                      <td className="py-3 text-right text-slate-300">{r.metrics.errorRate}%</td>
                      <td className="py-3 text-right text-slate-300">{r.metrics.p95Latency}ms</td>
                      <td className="py-3 text-right text-slate-300">{r.metrics.deployTime}m</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Recommendations */}
      <div className="glass-panel rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">💡 Release Health Recommendations</h3>
        <div className="space-y-2">
          {[
            {
              priority: '🔴',
              title: 'Implement staged rollouts',
              desc: 'The v2.3.0 rollback affected 340 users. Use canary deployments to limit blast radius.',
              impact: 'Reduces user impact by 90%',
            },
            {
              priority: '🟠',
              title: 'Enforce minimum test coverage',
              desc: 'v2.3.0 had only 61% coverage. Require 80%+ on all changed files before deploy.',
              impact: 'Prevents ~60% of post-release bugs',
            },
            {
              priority: '🟡',
              title: 'Add deployment health checks',
              desc: 'Auto-monitor error rates for 1 hour post-deploy. Auto-rollback if error rate > 2%.',
              impact: 'Catches issues before user impact',
            },
            {
              priority: '🔵',
              title: 'Size limit releases',
              desc: 'Keep releases under 30 commits / 50 files. Larger releases have 3x higher risk.',
              impact: 'Reduces average risk score by 15 points',
            },
          ].map((rec, i) => (
            <div key={i} className="p-3 rounded-lg bg-white/5 flex items-start gap-3">
              <span className="text-lg">{rec.priority}</span>
              <div>
                <div className="text-sm font-semibold text-white">{rec.title}</div>
                <p className="text-xs text-slate-400">{rec.desc}</p>
                <p className="text-xs text-blue-400 mt-1">📈 {rec.impact}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ReleaseImpactAnalyzer
