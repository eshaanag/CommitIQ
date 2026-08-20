import { act, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SWRConfig } from 'swr'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'
import {
  getBusFactor,
  getGraph,
  getHealthTimeline,
  getIngestProgress,
  getLLMUsage,
  getRepo,
  getRepoBySlug,
  ingestRepo,
  listRepos,
} from './lib/api'
import type { HealthSnapshot, Repo } from './types'

vi.mock('./lib/api', () => ({
  cancelIngest: vi.fn(),
  getBusFactor: vi.fn(),
  getGraph: vi.fn(),
  getHealthTimeline: vi.fn(),
  getIngestProgress: vi.fn(),
  getLLMUsage: vi.fn(),
  getRepo: vi.fn(),
  getRepoBySlug: vi.fn(),
  ingestRepo: vi.fn(),
  listRepos: vi.fn(),
}))

vi.mock('./components/BusFactorTable', () => ({
  BusFactorTable: ({ modules }: { modules: Array<{ module_path: string }> }) => (
    <div data-testid="bus-factor">ownership modules: {modules.length}</div>
  ),
}))

vi.mock('./components/CommitList', () => ({
  CommitList: ({ commits }: { commits: HealthSnapshot[] }) => (
    <div data-testid="commit-list">commit list: {commits.length}</div>
  ),
}))

vi.mock('./components/CostMeter', () => ({
  CostMeter: ({ usage }: { usage?: { total_calls: number } }) => (
    <div data-testid="cost-meter">provider calls: {usage?.total_calls ?? 0}</div>
  ),
}))

vi.mock('./components/GraphExplorer', () => ({
  GraphExplorer: ({ selectedSha }: { selectedSha: string | null }) => (
    <div data-testid="graph-explorer">graph {selectedSha ?? 'none'}</div>
  ),
}))

vi.mock('./components/HealthTimeline', () => ({
  HealthTimeline: ({ commits }: { commits: HealthSnapshot[] }) => (
    <div data-testid="health-timeline">timeline {commits.length}</div>
  ),
}))

vi.mock('./components/HotspotMap', () => ({
  HotspotMap: ({ repoId, sha }: { repoId: number; sha: string | null }) => (
    <div data-testid="hotspots">hotspots {repoId}:{sha ?? 'none'}</div>
  ),
}))

vi.mock('./components/NarrativeCard', () => ({
  NarrativeCard: ({ repoId, commitSha }: { repoId: number; commitSha: string }) => (
    <div data-testid="narrative-card">narrative {repoId}:{commitSha}</div>
  ),
}))

const ingestRepoMock = vi.mocked(ingestRepo)
const getIngestProgressMock = vi.mocked(getIngestProgress)
const getRepoMock = vi.mocked(getRepo)
const getRepoBySlugMock = vi.mocked(getRepoBySlug)
const getHealthTimelineMock = vi.mocked(getHealthTimeline)
const getBusFactorMock = vi.mocked(getBusFactor)
const getGraphMock = vi.mocked(getGraph)
const getLLMUsageMock = vi.mocked(getLLMUsage)
const listReposMock = vi.mocked(listRepos)

class MockEventSource {
  onmessage: ((event: MessageEvent<string>) => void) | null = null
  onerror: (() => void) | null = null
  close = vi.fn()

  emit(data: unknown) {
    this.onmessage?.({ data: JSON.stringify(data) } as MessageEvent<string>)
  }
}

function makeRepo(overrides: Partial<Repo> = {}): Repo {
  return {
    id: 17,
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
    max_commits_setting: 25,
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
    message: 'Initial import',
    author: 'Ada',
    committed_at: '2026-05-31T00:00:00Z',
    health_score: 80,
    avg_complexity: 2,
    max_complexity: 4,
    total_loc: 100,
    churn_rate: 0.1,
    num_files_changed: 2,
    bus_factor_min: 2,
    health_delta: null,
    cc_score: 80,
    churn_score: 90,
    bus_score: 40,
    loc_score: 95,
    avg_semantic_drift: 0.1,
    semantic_health_score: 90,
    semantic_drift_method: 'fallback_levenshtein',
    top_files: [],
    ...overrides,
  }
}

function renderApp() {
  return render(
    <SWRConfig value={{ provider: () => new Map(), dedupingInterval: 0, revalidateOnFocus: false }}>
      <App />
    </SWRConfig>,
  )
}

describe('App route flow', () => {
  beforeEach(() => {
    window.history.pushState({}, '', '/')
    ingestRepoMock.mockReset()
    getIngestProgressMock.mockReset()
    getRepoMock.mockReset()
    getRepoBySlugMock.mockReset()
    getHealthTimelineMock.mockReset()
    getBusFactorMock.mockReset()
    getGraphMock.mockReset()
    getLLMUsageMock.mockReset()
    listReposMock.mockReset()

    listReposMock.mockResolvedValue([])

    ingestRepoMock.mockResolvedValue({
      repo_id: 17,
      repo_slug: 'example-project',
      status: 'processing',
      job_id: 42,
      message: 'started',
    })
    getRepoMock.mockResolvedValue(makeRepo())
    getRepoBySlugMock.mockResolvedValue(makeRepo())
    getHealthTimelineMock.mockResolvedValue([
      makeSnapshot({ sha: 'abc123', full_sha: 'abc123', message: 'Initial import' }),
      makeSnapshot({
        sha: 'def456',
        full_sha: 'def456',
        message: 'Improve ingestion resilience',
        health_score: 91,
      }),
    ])
    getBusFactorMock.mockResolvedValue({ repo_id: 17, modules: [] })
    getGraphMock.mockResolvedValue({ repo_id: 17, commit_sha: 'def456', nodes: [], edges: [] })
    getLLMUsageMock.mockResolvedValue({
      repo_id: 17,
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

  it('moves from repository submission through ready ingestion into the dashboard', async () => {
    const user = userEvent.setup()
    const source = new MockEventSource()
    getIngestProgressMock.mockReturnValue(source as unknown as EventSource)

    renderApp()

    await user.type(await screen.findByPlaceholderText(/search or enter/i), 'example/project')
    const limitInput = screen.getByPlaceholderText('500')
    await user.clear(limitInput)
    await user.type(limitInput, '25')
    await user.click(screen.getByRole('button', { name: 'Analyze' }))

    await waitFor(() => {
      expect(ingestRepoMock).toHaveBeenCalledWith('https://github.com/example/project', 25)
      expect(getIngestProgressMock).toHaveBeenCalledWith('17')
    })
    expect(await screen.findByText('Analyzing Repository')).toBeInTheDocument()

    act(() => {
      source.emit({
        current: 2,
        total: 2,
        current_sha: null,
        stage: 'Complete',
        progress_pct: 100,
        status: 'ready',
        error_message: null,
      })
    })

    expect(await screen.findByText('Improve ingestion resilience')).toBeInTheDocument()
    expect(window.location.pathname).toBe('/dashboard/example-project')
    expect(getRepoBySlugMock).toHaveBeenCalledWith('example-project')
    expect(screen.getByTestId('health-timeline')).toHaveTextContent('timeline 2')
    expect(screen.getByTestId('narrative-card')).toHaveTextContent('narrative 17:def456')

    await waitFor(() => {
      expect(getGraphMock).toHaveBeenCalledWith(17, 'def456')
    })
  })
})
