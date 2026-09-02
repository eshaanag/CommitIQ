/**
 * TeamCollaborationHub.tsx
 *
 * Team collaboration analytics dashboard with:
 * - PR review metrics (turnaround, approval rates, review load)
 * - Code ownership map (who owns what files)
 * - Knowledge sharing index (cross-module contributions)
 * - Team activity heatmap
 * - Contributor network visualization
 * - Collaboration health score
 */

import { useState, useMemo } from 'react'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ReviewMetric {
  reviewer: string
  avatar: string
  reviewsDone: number
  avgTurnaroundHrs: number
  approvalRate: number
  commentsGiven: number
  linesReviewed: number
  helpfulnessScore: number
}

interface CodeOwner {
  area: string
  icon: string
  primaryOwner: string
  contributors: string[]
  coveragePct: number
  lastActivity: string
  riskLevel: 'low' | 'medium' | 'high'
}

interface KnowledgeNode {
  name: string
  avatar: string
  modules: string[]
  crossModulePct: number
  knowledgeDepth: number
  mentoring: number
}

interface ActivityDay {
  day: string
  hours: number[]
}

interface TeamMetric {
  label: string
  value: string
  icon: string
  trend: 'up' | 'down' | 'stable'
  delta: string
}

// ---------------------------------------------------------------------------
// Mock Data
// ---------------------------------------------------------------------------

function generateMockReviewMetrics(): ReviewMetric[] {
  return [
    {
      reviewer: 'Alice Chen',
      avatar: '👩‍💻',
      reviewsDone: 87,
      avgTurnaroundHrs: 2.1,
      approvalRate: 72,
      commentsGiven: 342,
      linesReviewed: 12400,
      helpfulnessScore: 94,
    },
    {
      reviewer: 'Bob Smith',
      avatar: '👨‍💻',
      reviewsDone: 65,
      avgTurnaroundHrs: 4.8,
      approvalRate: 68,
      commentsGiven: 198,
      linesReviewed: 8200,
      helpfulnessScore: 82,
    },
    {
      reviewer: 'Carol White',
      avatar: '👩‍🔬',
      reviewsDone: 72,
      avgTurnaroundHrs: 3.2,
      approvalRate: 75,
      commentsGiven: 287,
      linesReviewed: 10100,
      helpfulnessScore: 91,
    },
    {
      reviewer: 'David Brown',
      avatar: '🧑‍💻',
      reviewsDone: 43,
      avgTurnaroundHrs: 6.5,
      approvalRate: 82,
      commentsGiven: 98,
      linesReviewed: 4800,
      helpfulnessScore: 76,
    },
    {
      reviewer: 'Eva Martinez',
      avatar: '👩‍🎨',
      reviewsDone: 78,
      avgTurnaroundHrs: 2.8,
      approvalRate: 70,
      commentsGiven: 310,
      linesReviewed: 11200,
      helpfulnessScore: 89,
    },
    {
      reviewer: 'Frank Lee',
      avatar: '👨‍🔧',
      reviewsDone: 55,
      avgTurnaroundHrs: 3.9,
      approvalRate: 78,
      commentsGiven: 165,
      linesReviewed: 7400,
      helpfulnessScore: 85,
    },
    {
      reviewer: 'Grace Kim',
      avatar: '👩‍🏫',
      reviewsDone: 91,
      avgTurnaroundHrs: 1.8,
      approvalRate: 65,
      commentsGiven: 420,
      linesReviewed: 14800,
      helpfulnessScore: 96,
    },
  ]
}

function generateMockCodeOwners(): CodeOwner[] {
  return [
    {
      area: 'Frontend Core',
      icon: '⚛️',
      primaryOwner: 'Alice Chen',
      contributors: ['Bob Smith', 'Eva Martinez'],
      coveragePct: 92,
      lastActivity: '2 hours ago',
      riskLevel: 'low',
    },
    {
      area: 'Backend API',
      icon: '🔧',
      primaryOwner: 'Bob Smith',
      contributors: ['Carol White', 'Frank Lee'],
      coveragePct: 78,
      lastActivity: '5 hours ago',
      riskLevel: 'low',
    },
    {
      area: 'Database Layer',
      icon: '🗄️',
      primaryOwner: 'Carol White',
      contributors: ['David Brown'],
      coveragePct: 65,
      lastActivity: '1 day ago',
      riskLevel: 'medium',
    },
    {
      area: 'DevOps/CI',
      icon: '🚀',
      primaryOwner: 'David Brown',
      contributors: [],
      coveragePct: 45,
      lastActivity: '3 days ago',
      riskLevel: 'high',
    },
    {
      area: 'Auth & Security',
      icon: '🔐',
      primaryOwner: 'Eva Martinez',
      contributors: ['Grace Kim'],
      coveragePct: 88,
      lastActivity: '12 hours ago',
      riskLevel: 'low',
    },
    {
      area: 'Testing',
      icon: '🧪',
      primaryOwner: 'Grace Kim',
      contributors: ['Alice Chen', 'Carol White'],
      coveragePct: 82,
      lastActivity: '8 hours ago',
      riskLevel: 'low',
    },
    {
      area: 'Documentation',
      icon: '📝',
      primaryOwner: 'Frank Lee',
      contributors: ['Grace Kim', 'Bob Smith'],
      coveragePct: 58,
      lastActivity: '2 days ago',
      riskLevel: 'medium',
    },
  ]
}

function generateMockKnowledgeNodes(): KnowledgeNode[] {
  return [
    {
      name: 'Alice Chen',
      avatar: '👩‍💻',
      modules: ['Frontend Core', 'Testing', 'Auth'],
      crossModulePct: 78,
      knowledgeDepth: 88,
      mentoring: 12,
    },
    {
      name: 'Bob Smith',
      avatar: '👨‍💻',
      modules: ['Backend API', 'Database', 'Documentation'],
      crossModulePct: 62,
      knowledgeDepth: 75,
      mentoring: 8,
    },
    {
      name: 'Carol White',
      avatar: '👩‍🔬',
      modules: ['Database', 'Backend API', 'Testing'],
      crossModulePct: 71,
      knowledgeDepth: 82,
      mentoring: 15,
    },
    {
      name: 'David Brown',
      avatar: '🧑‍💻',
      modules: ['DevOps/CI', 'Database'],
      crossModulePct: 35,
      knowledgeDepth: 68,
      mentoring: 3,
    },
    {
      name: 'Eva Martinez',
      avatar: '👩‍🎨',
      modules: ['Auth', 'Frontend Core', 'Backend API'],
      crossModulePct: 85,
      knowledgeDepth: 90,
      mentoring: 18,
    },
    {
      name: 'Frank Lee',
      avatar: '👨‍🔧',
      modules: ['Documentation', 'Backend API', 'Testing'],
      crossModulePct: 55,
      knowledgeDepth: 72,
      mentoring: 6,
    },
    {
      name: 'Grace Kim',
      avatar: '👩‍🏫',
      modules: ['Testing', 'Auth', 'Documentation', 'Frontend Core'],
      crossModulePct: 92,
      knowledgeDepth: 85,
      mentoring: 22,
    },
  ]
}

function generateMockActivityHeatmap(): ActivityDay[] {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const hours = Array.from({ length: 24 }, (_, i) => i)
  return days.map((day) => ({
    day,
    hours: hours.map((h) => {
      if (h < 6 || h > 22) return 0
      if (h < 9 || h > 18) return Math.random() * 20
      if (day === 'Sat' || day === 'Sun') return Math.random() * 30
      return Math.random() * 100
    }),
  }))
}

// ---------------------------------------------------------------------------
// Components
// ---------------------------------------------------------------------------

function MetricCard({ metric }: { metric: TeamMetric }) {
  return (
    <div className="glass-panel rounded-xl p-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">{metric.icon}</span>
        <span className="text-xs text-slate-400 uppercase tracking-wider">{metric.label}</span>
      </div>
      <div className="text-2xl font-bold text-white">{metric.value}</div>
      <div
        className={`text-xs mt-1 flex items-center gap-1 ${
          metric.trend === 'up'
            ? 'text-green-400'
            : metric.trend === 'down'
              ? 'text-red-400'
              : 'text-slate-400'
        }`}
      >
        {metric.trend === 'up' ? '↑' : metric.trend === 'down' ? '↓' : '→'} {metric.delta}
      </div>
    </div>
  )
}

function ReviewLoadBar({
  reviewer,
  reviews,
  maxReviews,
}: {
  reviewer: string
  reviews: number
  maxReviews: number
}) {
  const pct = (reviews / maxReviews) * 100
  const isOverloaded = pct > 80
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-slate-300 w-24 truncate">{reviewer}</span>
      <div className="flex-1 bg-white/5 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all ${isOverloaded ? 'bg-orange-500' : 'bg-purple-500'}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs text-slate-400 w-12 text-right">{reviews}</span>
    </div>
  )
}

function ActivityHeatmapCell({ value }: { value: number }) {
  const opacity = Math.min(value / 100, 1)
  const color =
    value > 70
      ? '#8b5cf6'
      : value > 40
        ? '#6366f1'
        : value > 10
          ? '#4f46e5'
          : 'rgba(255,255,255,0.03)'
  return (
    <div
      className="w-3 h-3 rounded-sm transition-all hover:scale-150"
      style={{ backgroundColor: color, opacity: Math.max(opacity, 0.05) }}
      title={`${value.toFixed(0)}% activity`}
    />
  )
}

function OwnershipRiskBadge({ level }: { level: 'low' | 'medium' | 'high' }) {
  const config = {
    low: { label: 'Well Covered', color: 'text-green-400 bg-green-500/10' },
    medium: { label: 'Needs Backup', color: 'text-yellow-400 bg-yellow-500/10' },
    high: { label: 'Bus Factor Risk', color: 'text-red-400 bg-red-500/10' },
  }
  const c = config[level]
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${c.color}`}>{c.label}</span>
  )
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export function TeamCollaborationHub() {
  const [activeTab, setActiveTab] = useState<'reviews' | 'ownership' | 'knowledge' | 'activity'>(
    'reviews'
  )

  const reviewMetrics = useMemo(() => generateMockReviewMetrics(), [])
  const codeOwners = useMemo(() => generateMockCodeOwners(), [])
  const knowledgeNodes = useMemo(() => generateMockKnowledgeNodes(), [])
  const activityHeatmap = useMemo(() => generateMockActivityHeatmap(), [])

  const maxReviews = Math.max(...reviewMetrics.map((r) => r.reviewsDone))

  const teamMetrics: TeamMetric[] = [
    { label: 'PR Turnaround', value: '3.2 hrs', icon: '⏱️', trend: 'down', delta: '18% faster' },
    { label: 'Approval Rate', value: '73%', icon: '✅', trend: 'up', delta: '5% improvement' },
    {
      label: 'Review Load',
      value: 'Balanced',
      icon: '⚖️',
      trend: 'stable',
      delta: 'No bottlenecks',
    },
    { label: 'Cross-Module %', value: '68%', icon: '🔀', trend: 'up', delta: '12% increase' },
    { label: 'Bus Factor', value: '2.8', icon: '🚌', trend: 'down', delta: 'Needs improvement' },
    { label: 'Knowledge Index', value: '76/100', icon: '🧠', trend: 'up', delta: '+4 points' },
  ]

  const tabs = [
    { id: 'reviews' as const, label: 'PR Reviews', icon: '📝' },
    { id: 'ownership' as const, label: 'Code Ownership', icon: '👑' },
    { id: 'knowledge' as const, label: 'Knowledge Sharing', icon: '🧠' },
    { id: 'activity' as const, label: 'Activity Map', icon: '🗺️' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <span className="text-3xl">👥</span> Team Collaboration Hub
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          PR review analytics, code ownership, knowledge sharing, and team activity
        </p>
      </div>

      {/* Team Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {teamMetrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === tab.id
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'reviews' && (
        <div className="space-y-6">
          {/* Review Leaderboard */}
          <div className="glass-panel rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">🏆 Review Leaderboard</h3>
            <div className="space-y-2">
              {reviewMetrics
                .sort((a, b) => b.reviewsDone - a.reviewsDone)
                .map((r, i) => (
                  <div
                    key={r.reviewer}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5"
                  >
                    <span className="text-sm font-bold text-slate-400 w-6">#{i + 1}</span>
                    <span className="text-xl">{r.avatar}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-white">{r.reviewer}</div>
                      <div className="text-xs text-slate-400">
                        {r.commentsGiven} comments • {r.linesReviewed.toLocaleString()} lines
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-purple-400">{r.reviewsDone}</div>
                      <div className="text-xs text-slate-400">reviews</div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Detailed Metrics Table */}
          <div className="glass-panel rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">📊 Review Analytics</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-slate-400 text-xs uppercase">
                    <th className="text-left pb-3">Reviewer</th>
                    <th className="text-right pb-3">Reviews</th>
                    <th className="text-right pb-3">Avg Turnaround</th>
                    <th className="text-right pb-3">Approval Rate</th>
                    <th className="text-right pb-3">Comments</th>
                    <th className="text-right pb-3">Lines Reviewed</th>
                    <th className="text-right pb-3">Helpfulness</th>
                  </tr>
                </thead>
                <tbody>
                  {reviewMetrics
                    .sort((a, b) => b.helpfulnessScore - a.helpfulnessScore)
                    .map((r) => (
                      <tr key={r.reviewer} className="border-t border-white/5 hover:bg-white/5">
                        <td className="py-3 flex items-center gap-2">
                          <span>{r.avatar}</span>
                          <span className="text-white font-medium">{r.reviewer}</span>
                        </td>
                        <td className="text-right py-3 text-slate-300">{r.reviewsDone}</td>
                        <td className="text-right py-3">
                          <span
                            className={
                              r.avgTurnaroundHrs < 3
                                ? 'text-green-400'
                                : r.avgTurnaroundHrs < 5
                                  ? 'text-yellow-400'
                                  : 'text-red-400'
                            }
                          >
                            {r.avgTurnaroundHrs}h
                          </span>
                        </td>
                        <td className="text-right py-3 text-slate-300">{r.approvalRate}%</td>
                        <td className="text-right py-3 text-slate-300">{r.commentsGiven}</td>
                        <td className="text-right py-3 text-slate-300">
                          {r.linesReviewed.toLocaleString()}
                        </td>
                        <td className="text-right py-3">
                          <span
                            className={`font-semibold ${r.helpfulnessScore >= 90 ? 'text-green-400' : r.helpfulnessScore >= 80 ? 'text-yellow-400' : 'text-slate-300'}`}
                          >
                            {r.helpfulnessScore}/100
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Review Load Distribution */}
          <div className="glass-panel rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">⚖️ Review Load Distribution</h3>
            <div className="space-y-2">
              {reviewMetrics
                .sort((a, b) => b.reviewsDone - a.reviewsDone)
                .map((r) => (
                  <ReviewLoadBar
                    key={r.reviewer}
                    reviewer={r.reviewer}
                    reviews={r.reviewsDone}
                    maxReviews={maxReviews}
                  />
                ))}
            </div>
            <p className="text-xs text-slate-500 mt-3">
              ⚠️ Orange indicates overloaded reviewers — redistribute if possible
            </p>
          </div>
        </div>
      )}

      {activeTab === 'ownership' && (
        <div className="space-y-6">
          {/* Ownership Overview */}
          <div className="glass-panel rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">👑 Code Ownership Map</h3>
            <div className="space-y-3">
              {codeOwners.map((owner) => (
                <div
                  key={owner.area}
                  className="p-4 rounded-xl bg-white/5 hover:bg-white/8 transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{owner.icon}</span>
                      <span className="font-semibold text-white">{owner.area}</span>
                    </div>
                    <OwnershipRiskBadge level={owner.riskLevel} />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs mt-3">
                    <div>
                      <span className="text-slate-400">Primary Owner</span>
                      <div className="text-white font-medium">{owner.primaryOwner}</div>
                    </div>
                    <div>
                      <span className="text-slate-400">Contributors</span>
                      <div className="text-white font-medium">
                        {owner.contributors.length > 0 ? owner.contributors.join(', ') : 'None'}
                      </div>
                    </div>
                    <div>
                      <span className="text-slate-400">Coverage</span>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-white/5 rounded-full h-1.5">
                          <div
                            className={`h-1.5 rounded-full ${owner.coveragePct >= 80 ? 'bg-green-500' : owner.coveragePct >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                            style={{ width: `${owner.coveragePct}%` }}
                          />
                        </div>
                        <span className="text-white font-medium">{owner.coveragePct}%</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-slate-400">Last Active</span>
                      <div className="text-white font-medium">{owner.lastActivity}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bus Factor Analysis */}
          <div className="glass-panel rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">🚌 Bus Factor Analysis</h3>
            <p className="text-xs text-slate-400 mb-4">
              How many people could get hit by a bus before a module has no experts?
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {codeOwners.map((owner) => {
                const busFactor = 1 + owner.contributors.length
                const color = busFactor >= 3 ? '#22c55e' : busFactor >= 2 ? '#eab308' : '#ef4444'
                return (
                  <div key={owner.area} className="p-3 rounded-lg bg-white/5 text-center">
                    <div className="text-3xl font-black" style={{ color }}>
                      {busFactor}
                    </div>
                    <div className="text-xs text-slate-300 font-medium">
                      {owner.icon} {owner.area}
                    </div>
                    <div className="text-xs text-slate-500">
                      {busFactor < 2
                        ? '⚠️ Single point of failure'
                        : busFactor < 3
                          ? 'Could use more coverage'
                          : 'Well covered'}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'knowledge' && (
        <div className="space-y-6">
          {/* Knowledge Sharing Index */}
          <div className="glass-panel rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">🧠 Knowledge Sharing Index</h3>
            <div className="space-y-3">
              {knowledgeNodes
                .sort((a, b) => b.crossModulePct - a.crossModulePct)
                .map((node) => (
                  <div key={node.name} className="p-3 rounded-xl bg-white/5">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xl">{node.avatar}</span>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-white">{node.name}</div>
                        <div className="text-xs text-slate-400">
                          Modules: {node.modules.join(', ')}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-purple-400">
                          {node.crossModulePct}%
                        </div>
                        <div className="text-xs text-slate-400">cross-module</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      <div className="text-center">
                        <div className="text-xs text-slate-400">Depth</div>
                        <div className="text-sm font-bold text-white">
                          {node.knowledgeDepth}/100
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-slate-400">Mentoring</div>
                        <div className="text-sm font-bold text-white">
                          {node.mentoring} sessions
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-slate-400">Modules</div>
                        <div className="text-sm font-bold text-white">{node.modules.length}</div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Knowledge Risk */}
          <div className="glass-panel rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">⚠️ Knowledge Risk Assessment</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                <div className="text-sm font-semibold text-green-400">
                  ✅ Well-Distributed Knowledge
                </div>
                <ul className="text-xs text-slate-300 mt-1 space-y-1">
                  <li>• Frontend Core: 3 contributors</li>
                  <li>• Backend API: 3 contributors</li>
                  <li>• Testing: 3 contributors</li>
                </ul>
              </div>
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                <div className="text-sm font-semibold text-red-400">
                  🚨 Knowledge Silos Detected
                </div>
                <ul className="text-xs text-slate-300 mt-1 space-y-1">
                  <li>• DevOps/CI: Only David (bus factor: 1)</li>
                  <li>• Database: Only Carol + David (bus factor: 2)</li>
                  <li>• Documentation: Under-documented (58% coverage)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'activity' && (
        <div className="space-y-6">
          {/* Activity Heatmap */}
          <div className="glass-panel rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">🗺️ Team Activity Heatmap</h3>
            <p className="text-xs text-slate-400 mb-4">
              When does your team commit code? Darker = more activity.
            </p>
            <div className="overflow-x-auto">
              <div className="inline-flex flex-col gap-1">
                {/* Hour labels */}
                <div className="flex gap-1 items-center">
                  <span className="w-10" />
                  {Array.from({ length: 24 }, (_, i) => (
                    <span key={i} className="w-3 text-center text-[8px] text-slate-500">
                      {i % 3 === 0 ? `${i}` : ''}
                    </span>
                  ))}
                </div>
                {/* Day rows */}
                {activityHeatmap.map((day) => (
                  <div key={day.day} className="flex gap-1 items-center">
                    <span className="w-10 text-xs text-slate-400 text-right pr-1">{day.day}</span>
                    {day.hours.map((h, i) => (
                      <ActivityHeatmapCell key={i} value={h} />
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4 mt-4 text-xs text-slate-500">
              <span>Less</span>
              <div className="flex gap-1">
                {[5, 20, 40, 70, 100].map((v) => (
                  <div
                    key={v}
                    className="w-3 h-3 rounded-sm"
                    style={{ backgroundColor: '#8b5cf6', opacity: v / 100 }}
                  />
                ))}
              </div>
              <span>More</span>
              <span className="ml-4">Weekend activity &gt; 20% may indicate burnout</span>
            </div>
          </div>

          {/* Activity Insights */}
          <div className="glass-panel rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">💡 Activity Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 text-center">
                <div className="text-2xl mb-2">🌅</div>
                <div className="text-sm font-semibold text-white">Peak Hours</div>
                <div className="text-lg font-bold text-purple-400">10 AM - 2 PM</div>
                <div className="text-xs text-slate-400">62% of all commits</div>
              </div>
              <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-center">
                <div className="text-2xl mb-2">📅</div>
                <div className="text-sm font-semibold text-white">Most Productive Day</div>
                <div className="text-lg font-bold text-blue-400">Tuesday</div>
                <div className="text-xs text-slate-400">18% more commits than average</div>
              </div>
              <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 text-center">
                <div className="text-2xl mb-2">⚠️</div>
                <div className="text-sm font-semibold text-white">Weekend Activity</div>
                <div className="text-lg font-bold text-orange-400">14%</div>
                <div className="text-xs text-slate-400">Above recommended 10%</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TeamCollaborationHub
