import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SWRConfig } from 'swr'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { getBusFactor, getGraph, getHealthTimeline, getLLMUsage, getRepoBySlug } from '../lib/api'
import type { HealthSnapshot, Repo } from '../types'
import DashboardPage from './DashboardPage'

vi.mock('../lib/api', () => ({
  getBusFactor: vi.fn(),
  getCycleTime: vi.fn(() => Promise.resolve({ avg_cycle_time_hours: 0, bottlenecks: [] })),
  getDoraMetrics: vi.fn(() => Promise.resolve({ dora_score: 'Elite' })),
  getTeamHealthMetrics: vi.fn(() =>
    Promise.resolve({ burnout_risk_score: 'Low', context_switching_score: 'Low' })
  ),
  getCodeQualityMetrics: vi.fn(() =>
    Promise.resolve({ churn_category: 'Low', ai_impact_score: 'Low' })
  ),
  getVelocityMetrics: vi.fn(() =>
    Promise.resolve({
      totals: {
        total_commits: 0,
        avg_commits_per_week: 0,
        avg_lines_per_week: 0,
        cadence_score: 0,
      },
      weekly: [],
      contributors: [],
    })
  ),
  getCommitQuality: vi.fn(() =>
    Promise.resolve({
      total_commits: 0,
      quality_score: 100,
      convention_rate: 100,
      error_free_rate: 100,
      warning_free_rate: 100,
      severity_breakdown: { error: 0, warning: 0, info: 0 },
      top_violations: [],
      contributors: [],
    })
  ),
  getDeploymentTimeline: vi.fn(() =>
    Promise.resolve({
      deployments: [],
      summary: {
        total_deploys: 0,
        success_count: 0,
        failure_count: 0,
        success_rate: 100,
        most_recent: '',
        by_environment: {},
        by_provider: {},
      },
      daily: [],
    })
  ),
  getGraph: vi.fn(),
  getHealthTimeline: vi.fn(),
  getIngestProgress: vi.fn(),
  getLLMUsage: vi.fn(),
  getRepoBySlug: vi.fn(),
}))

vi.mock('../components/VelocityDashboard', () => ({
  VelocityDashboard: ({ repoId }: { repoId: string | number }) => (
    <div data-testid="velocity-dashboard">velocity: {repoId}</div>
  ),
}))

vi.mock('../components/CommitQualityDashboard', () => ({
  CommitQualityDashboard: ({ repoId }: { repoId: string | number }) => (
    <div data-testid="commit-quality-dashboard">commit quality: {repoId}</div>
  ),
}))

vi.mock('../components/DeploymentTimeline', () => ({
  DeploymentTimeline: ({ repoId }: { repoId: string | number }) => (
    <div data-testid="deployment-timeline">deployments: {repoId}</div>
  ),
}))

vi.mock('../components/BusFactorTable', () => ({
  BusFactorTable: ({ modules }: { modules: Array<{ module_path: string }> }) => (
    <div data-testid="bus-factor">ownership modules: {modules.length}</div>
  ),
}))

vi.mock('../components/CycleTimeDashboard', () => ({
  CycleTimeDashboard: ({ repoId }: { repoId: string | number }) => (
    <div data-testid="cycle-time-dashboard">cycle time: {repoId}</div>
  ),
}))

vi.mock('../components/DoraMetricsDashboard', () => ({
  DoraMetricsDashboard: ({ repoId }: { repoId: string | number }) => (
    <div data-testid="dora-metrics-dashboard">dora metrics: {repoId}</div>
  ),
}))

vi.mock('../components/TeamHealthDashboard', () => ({
  TeamHealthDashboard: ({ repoId }: { repoId: string | number }) => (
    <div data-testid="team-health-dashboard">team health: {repoId}</div>
  ),
}))

vi.mock('../components/CodeQualityDashboard', () => ({
  CodeQualityDashboard: ({ repoId }: { repoId: string | number }) => (
    <div data-testid="code-quality-dashboard">code quality: {repoId}</div>
  ),
}))

vi.mock('../components/CommitList', () => ({
  CommitList: ({ commits }: { commits: HealthSnapshot[] }) => (
    <div data-testid="commit-list">commit list: {commits.length}</div>
  ),
}))

vi.mock('../components/CostMeter', () => ({
  CostMeter: ({ usage }: { usage?: { total_calls: number } }) => (
    <div data-testid="cost-meter">provider calls: {usage?.total_calls ?? 0}</div>
  ),
}))

vi.mock('../components/GraphExplorer', () => ({
  GraphExplorer: ({
    graphData,
    selectedSha,
  }: {
    graphData?: { nodes: unknown[] }
    selectedSha: string | null
  }) => (
    <div data-testid="graph-explorer">
      graph {selectedSha ?? 'none'} nodes {graphData?.nodes.length ?? 0}
    </div>
  ),
}))

vi.mock('../components/HealthTimeline', () => ({
  HealthTimeline: ({
    commits,
    selectedSha,
  }: {
    commits: HealthSnapshot[]
    selectedSha?: string
  }) => (
    <div data-testid="health-timeline">
      timeline {commits.length} selected {selectedSha ?? 'none'}
    </div>
  ),
}))

vi.mock('../components/HotspotMap', () => ({
  HotspotMap: ({ repoId, sha }: { repoId: number; sha: string | null }) => (
    <div data-testid="hotspots">
      hotspots {repoId}:{sha ?? 'none'}
    </div>
  ),
}))

vi.mock('../components/NarrativeCard', () => ({
  NarrativeCard: ({ repoId, commitSha }: { repoId: number; commitSha: string }) => (
    <div data-testid="narrative-card">
      narrative {repoId}:{commitSha}
    </div>
  ),
}))

const getRepoBySlugMock = vi.mocked(getRepoBySlug)
const getHealthTimelineMock = vi.mocked(getHealthTimeline)
const getBusFactorMock = vi.mocked(getBusFactor)
const getGraphMock = vi.mocked(getGraph)
const getLLMUsageMock = vi.mocked(getLLMUsage)

function makeRepo(overrides: Partial<Repo> = {}): Repo {
  return {
    id: 7,
    url: 'https://github.com/example/project',
    name: 'example/project',
    owner: 'example',
    repo_slug: 'example-project',
    default_branch: 'main',
    ingested_at: null,
    last_updated_at: null,
    total_commits: 2,
    analyzed_commits: 2,
    status: 'ready',
    error_message: null,
    max_commits_setting: 50,
    github_stars: null,
    github_language: null,
    github_description: null,
    ...overrides,
  }
}

function makeSnapshot(overrides: Partial<HealthSnapshot>): HealthSnapshot {
  return {
    sha: 'abc123',
    full_sha: 'abc123',
    message: 'Initial commit',
    author: 'Ada',
    committed_at: '2026-05-31T00:00:00Z',
    health_score: 82,
    avg_complexity: 2.4,
    max_complexity: 4,
    total_loc: 120,
    churn_rate: 0.12,
    num_files_changed: 3,
    bus_factor_min: 2,
    health_delta: null,
    cc_score: 80,
    churn_score: 88,
    bus_score: 40,
    loc_score: 95,
    avg_semantic_drift: 0.08,
    semantic_health_score: 92,
    semantic_drift_method: 'fallback_levenshtein',
    risk_reasons: [],
    hotspot_persistence_score: 0,
    persistent_hotspots: [],
    top_files: [],
    ...overrides,
  }
}

function renderDashboard(path = '/dashboard/example-project') {
  return render(
    <SWRConfig value={{ provider: () => new Map(), dedupingInterval: 0, revalidateOnFocus: false }}>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path="/dashboard/:repoSlug" element={<DashboardPage />} />
          <Route path="/dashboard/:repoSlug/commit/:sha" element={<div>Commit detail route</div>} />
          <Route path="/" element={<div>Landing</div>} />
        </Routes>
      </MemoryRouter>
    </SWRConfig>
  )
}

describe('DashboardPage', () => {
  beforeEach(() => {
    getRepoBySlugMock.mockReset()
    getHealthTimelineMock.mockReset()
    getBusFactorMock.mockReset()
    getGraphMock.mockReset()
    getLLMUsageMock.mockReset()

    getRepoBySlugMock.mockResolvedValue(makeRepo())
    getHealthTimelineMock.mockResolvedValue([
      makeSnapshot({
        sha: 'abc123',
        full_sha: 'abc123',
        message: 'Initial import',
        health_score: 76,
      }),
      makeSnapshot({
        sha: 'def456',
        full_sha: 'def456',
        message: 'Improve ingestion resilience',
        health_score: 91,
        risk_reasons: [
          {
            code: 'single_owner',
            severity: 'critical',
            label: 'Single-owner risk',
            detail: 'At least one critical module has only one active contributor.',
            impact: 30,
          },
        ],
        hotspot_persistence_score: 37.5,
        persistent_hotspots: [
          { path: 'src/service.py', recent_commit_count: 3, complexity: 7.25, loc: 160 },
        ],
      }),
    ])
    getBusFactorMock.mockResolvedValue({
      repo_id: 7,
      modules: [
        {
          module_path: 'backend/main.py',
          contributor_count: 2,
          top_contributor: 'Ada',
          top_contributor_email: 'ada@example.com',
          top_contributor_pct: 70,
          total_commits_to_module: 4,
          risk_level: 'medium',
          last_commit_sha: 'def456',
        },
      ],
    })
    getGraphMock.mockResolvedValue({
      repo_id: 7,
      commit_sha: 'def456',
      nodes: [
        {
          id: 'backend/main.py',
          file: 'backend/main.py',
          module: 'backend',
          loc: 80,
          health: 90,
          health_color: 'green',
          is_entry_point: true,
        },
      ],
      edges: [],
    })
    getLLMUsageMock.mockResolvedValue({
      repo_id: 7,
      total_calls: 1,
      cache_hits: 0,
      anthropic_calls: 1,
      gemini_calls: 0,
      total_tokens: 150,
      total_cost_usd: 0.001,
      cache_savings_usd: 0,
      budget_remaining: 24,
      max_calls: 25,
    })
  })

  it('renders an actionable error state when the repository cannot load', async () => {
    getRepoBySlugMock.mockRejectedValue(new Error('not found'))

    renderDashboard()

    expect(await screen.findByText('Repository Not Loaded')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /return to home/i })).toBeInTheDocument()
    expect(getHealthTimelineMock).not.toHaveBeenCalled()
  })

  it('loads dashboard data and auto-selects the latest analyzed commit', async () => {
    renderDashboard()

    expect(await screen.findByText('Improve ingestion resilience')).toBeInTheDocument()
    expect(screen.getByTestId('health-timeline')).toHaveTextContent('timeline 2 selected def456')
    expect(screen.getByTestId('commit-list')).toHaveTextContent('commit list: 2')
    expect(screen.getByTestId('bus-factor')).toHaveTextContent('ownership modules: 1')
    expect(screen.getByTestId('cost-meter')).toHaveTextContent('provider calls: 1')
    expect(screen.getByTestId('narrative-card')).toHaveTextContent('narrative 7:def456')
    expect(screen.getByTestId('hotspots')).toHaveTextContent('hotspots 7:def456')
    expect(screen.getByText('Single-owner risk')).toBeInTheDocument()
    expect(screen.getByText('src/service.py')).toBeInTheDocument()

    await waitFor(() => {
      expect(getGraphMock).toHaveBeenCalledWith(7, 'def456')
    })
    expect(screen.getByTestId('graph-explorer')).toHaveTextContent('graph def456 nodes 1')
  })

  it('navigates from the selected snapshot to commit detail', async () => {
    const user = userEvent.setup()
    renderDashboard()

    await screen.findByText('Improve ingestion resilience')
    await user.click(screen.getByRole('button', { name: /inspect snapshot details/i }))

    expect(await screen.findByText('Commit detail route')).toBeInTheDocument()
  })

  it('shows an empty commits warning banner and timeline state without requesting a graph', async () => {
    getHealthTimelineMock.mockResolvedValue([])

    renderDashboard()

    expect(await screen.findByTestId('empty-commits-warning-banner')).toBeInTheDocument()
    expect(screen.getByText('No Commits Analyzed for This Repository')).toBeInTheDocument()
    expect(
      screen.getByText(/Try increasing the Maximum Commits setting during ingestion/i)
    ).toBeInTheDocument()
    expect(screen.getByText(/no analyzed commits/i)).toBeInTheDocument()
    expect(screen.getByTestId('graph-explorer')).toHaveTextContent('graph none nodes 0')
    expect(getGraphMock).not.toHaveBeenCalled()
  })

  it('shows filtered warning banner when 0 commits returned for active time filter', async () => {
    const user = userEvent.setup()
    getHealthTimelineMock.mockResolvedValue([])

    renderDashboard()

    expect(await screen.findByTestId('empty-commits-warning-banner')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /last 7 days/i }))

    expect(await screen.findByText('No Commits in Selected Time Window')).toBeInTheDocument()
    expect(screen.getByTestId('reset-time-filter-button')).toBeInTheDocument()

    await user.click(screen.getByTestId('reset-time-filter-button'))
    expect(screen.getByRole('button', { name: /all time/i })).toHaveClass('bg-purple-500/20')
  })

  it('renders time range selector buttons and handles preset switching', async () => {
    const user = userEvent.setup()
    renderDashboard()

    expect(await screen.findByText('Time Range')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /all time/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /last 7 days/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /last 30 days/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /last year/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /custom range/i })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /last 7 days/i }))
    await waitFor(() => {
      expect(getHealthTimelineMock).toHaveBeenCalledWith(7, expect.any(String), expect.any(String))
    })

    await user.click(screen.getByRole('button', { name: /custom range/i }))
    expect(screen.getByLabelText('Start Date')).toBeInTheDocument()
    expect(screen.getByLabelText('End Date')).toBeInTheDocument()
  })

  it('displays single-point-of-failure warning card under bus factor card when bus_factor_min equals 1', async () => {
    getHealthTimelineMock.mockResolvedValue([
      makeSnapshot({ sha: 'xyz999', full_sha: 'xyz999', bus_factor_min: 1 }),
    ])

    renderDashboard()

    expect(await screen.findByTestId('bus-factor-warning')).toBeInTheDocument()
    expect(screen.getByText('Single Point of Failure Warning')).toBeInTheDocument()
    expect(screen.getByText(/vulnerable to a single-point-of-failure/i)).toBeInTheDocument()
  })

  it('renders the floating back to top button on the dashboard', async () => {
    renderDashboard()

    expect(await screen.findByTestId('scroll-to-top')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /scroll back to top/i })).toBeInTheDocument()
  })

  // ── Issue #349: Export Report dropdown tests ───────────────────────────

  it('shows the Export button on the dashboard when data is loaded', async () => {
    renderDashboard()

    expect(await screen.findByTestId('export-report-button')).toBeInTheDocument()
  })

  it('opens the export dropdown and shows both export options', async () => {
    const user = userEvent.setup()
    renderDashboard()

    await screen.findByText('Improve ingestion resilience')

    await user.click(screen.getByTestId('export-report-button'))

    expect(screen.getByTestId('export-dropdown-menu')).toBeInTheDocument()
    expect(screen.getByTestId('export-timeline-csv')).toBeInTheDocument()
    expect(screen.getByTestId('export-busfactor-json')).toBeInTheDocument()
    expect(screen.getByText(/2 commit\(s\)/)).toBeInTheDocument()
    expect(screen.getByText(/1 module\(s\)/)).toBeInTheDocument()
  })

  it('triggers timeline CSV download when Export Timeline CSV is clicked', async () => {
    const user = userEvent.setup()
    const createUrlSpy = vi.spyOn(URL, 'createObjectURL')
    renderDashboard()

    await screen.findByText('Improve ingestion resilience')

    await user.click(screen.getByTestId('export-report-button'))
    await user.click(screen.getByTestId('export-timeline-csv'))

    expect(createUrlSpy).toHaveBeenCalledTimes(1)
    const blob = createUrlSpy.mock.calls[0][0] as Blob
    expect(blob.type).toBe('text/csv;charset=utf-8;')
    createUrlSpy.mockRestore()
  })

  it('triggers bus factor JSON download when Export Bus Factor JSON is clicked', async () => {
    const user = userEvent.setup()
    const createUrlSpy = vi.spyOn(URL, 'createObjectURL')
    renderDashboard()

    await screen.findByText('Improve ingestion resilience')

    await user.click(screen.getByTestId('export-report-button'))
    await user.click(screen.getByTestId('export-busfactor-json'))

    expect(createUrlSpy).toHaveBeenCalledTimes(1)
    const blob = createUrlSpy.mock.calls[0][0] as Blob
    expect(blob.type).toBe('application/json;charset=utf-8;')
    createUrlSpy.mockRestore()
  })

  it('disables export button when there is no data (empty timeline + no bus factor)', async () => {
    getHealthTimelineMock.mockResolvedValue([])
    getBusFactorMock.mockResolvedValue({ repo_id: 7, modules: [] })

    renderDashboard()

    const exportBtn = await screen.findByTestId('export-report-button')
    expect(exportBtn).toBeDisabled()
  })

  it('closes the export dropdown when clicking outside', async () => {
    const user = userEvent.setup()
    renderDashboard()

    await screen.findByText('Improve ingestion resilience')

    await user.click(screen.getByTestId('export-report-button'))
    expect(screen.getByTestId('export-dropdown-menu')).toBeInTheDocument()

    await user.click(document.body)

    await waitFor(() => {
      expect(screen.queryByTestId('export-dropdown-menu')).not.toBeInTheDocument()
    })
  })

  it('renders metric help tooltips explaining Cyclomatic Complexity, Churn, and Bus Factor', async () => {
    const user = userEvent.setup()
    renderDashboard()

    await screen.findByText('Improve ingestion resilience')

    // Find help icon for Cyclomatic Complexity
    const complexityHelp = screen.getByRole('button', { name: /about cyclomatic complexity/i })
    expect(complexityHelp).toBeInTheDocument()

    // Open complexity tooltip
    await user.click(complexityHelp)
    const complexityTooltip = screen.getByRole('tooltip')
    expect(complexityTooltip).toBeInTheDocument()
    expect(within(complexityTooltip).getByText('Cyclomatic Complexity')).toBeInTheDocument()
    expect(
      within(complexityTooltip).getByText(/Measures structural code complexity/i)
    ).toBeInTheDocument()
    expect(within(complexityTooltip).getByText(/M = E - N \+ 2P/i)).toBeInTheDocument()
    expect(within(complexityTooltip).getByText('25% of Health Score')).toBeInTheDocument()

    // Close by clicking outside
    await user.click(document.body)
    await waitFor(() => {
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
    })

    // Check Minimum Bus Factor tooltip
    const busFactorHelp = screen.getByRole('button', { name: /about minimum bus factor/i })
    await user.click(busFactorHelp)
    const busFactorTooltip = screen.getByRole('tooltip')
    expect(busFactorTooltip).toBeInTheDocument()
    expect(within(busFactorTooltip).getByText('Minimum Bus Factor')).toBeInTheDocument()
    expect(
      within(busFactorTooltip).getByText(/minimum number of key contributors/i)
    ).toBeInTheDocument()
    expect(
      within(busFactorTooltip).getByText(/min\(bus_factor_min × 20, 100\)/i)
    ).toBeInTheDocument()

    // Close tooltip
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()

    // Check Commit Churn Rate tooltip
    const churnHelp = screen.getByRole('button', { name: /about commit churn rate/i })
    await user.click(churnHelp)
    const churnTooltip = screen.getByRole('tooltip')
    expect(churnTooltip).toBeInTheDocument()
    expect(within(churnTooltip).getByText('Commit Churn Rate')).toBeInTheDocument()
    expect(within(churnTooltip).getByText(/Measures code volatility/i)).toBeInTheDocument()
    expect(
      within(churnTooltip).getByText(/Churn Rate = \(insertions \+ deletions\) \/ total_loc/i)
    ).toBeInTheDocument()
  })
})
