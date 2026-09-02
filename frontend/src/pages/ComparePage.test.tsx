import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { compareRepos, listRepos } from '../lib/api'
import ComparePage from './ComparePage'
import type { Repo, RepoCompareResponse } from '../types'

vi.mock('../lib/api', () => ({
  listRepos: vi.fn(),
  compareRepos: vi.fn(),
}))

const listReposMock = vi.mocked(listRepos)
const compareReposMock = vi.mocked(compareRepos)

const mockRepos: Repo[] = [
  {
    id: 1,
    name: 'facebook/react',
    owner: 'facebook',
    repo_slug: 'facebook_react',
    url: 'https://github.com/facebook/react',
    default_branch: 'main',
    status: 'ready',
    total_commits: 100,
    analyzed_commits: 100,
    github_stars: 220000,
    github_language: 'TypeScript',
    github_description: 'React core library',
    ingested_at: '2026-05-31T00:00:00Z',
    last_updated_at: '2026-05-31T00:00:00Z',
    max_commits_setting: 500,
    error_message: null,
    active_contributors_count: 12,
  },
  {
    id: 2,
    name: 'vuejs/vue',
    owner: 'vuejs',
    repo_slug: 'vuejs_vue',
    url: 'https://github.com/vuejs/vue',
    default_branch: 'main',
    status: 'ready',
    total_commits: 90,
    analyzed_commits: 90,
    github_stars: 200000,
    github_language: 'TypeScript',
    github_description: 'Vue framework',
    ingested_at: '2026-05-31T00:00:00Z',
    last_updated_at: '2026-05-31T00:00:00Z',
    max_commits_setting: 500,
    error_message: null,
    active_contributors_count: 8,
  },
]

const mockCompareResponse: RepoCompareResponse = {
  base: {
    repo: mockRepos[0],
    latest_snapshot: {
      sha: '1111111',
      full_sha: '1111111111111111111111111111111111111111',
      message: 'feat: react 19 features',
      author: 'Alice',
      committed_at: '2026-05-31T00:00:00Z',
      health_score: 88.0,
      avg_complexity: 3.4,
      max_complexity: 12.0,
      total_loc: 45000,
      churn_rate: 0.08,
      num_files_changed: 5,
      bus_factor_min: 3,
      health_delta: 1.2,
      cc_score: 85.0,
      churn_score: 90.0,
      bus_score: 85.0,
      loc_score: 92.0,
      top_files: [],
    },
    metrics_summary: {
      health_score: 88.0,
      avg_complexity: 3.4,
      max_complexity: 12.0,
      churn_rate: 0.08,
      total_loc: 45000,
      bus_factor_min: 3,
      hotspot_count: 2,
      active_contributors: 12,
      total_commits: 100,
      analyzed_commits: 100,
    },
    bus_factor: { repo_id: 1, modules: [] },
    timeline_summary: [
      {
        sha: '1111111',
        full_sha: '1111111111111111111111111111111111111111',
        message: 'feat: react 19 features',
        author: 'Alice',
        committed_at: '2026-05-31T00:00:00Z',
        health_score: 88.0,
        avg_complexity: 3.4,
        max_complexity: 12.0,
        total_loc: 45000,
        churn_rate: 0.08,
        num_files_changed: 5,
        bus_factor_min: 3,
        health_delta: 1.2,
        cc_score: 85.0,
        churn_score: 90.0,
        bus_score: 85.0,
        loc_score: 92.0,
        top_files: [],
      },
    ],
  },
  head: {
    repo: mockRepos[1],
    latest_snapshot: {
      sha: '2222222',
      full_sha: '2222222222222222222222222222222222222222',
      message: 'feat: vue reactivity updates',
      author: 'Bob',
      committed_at: '2026-05-31T00:00:00Z',
      health_score: 82.0,
      avg_complexity: 4.8,
      max_complexity: 18.0,
      total_loc: 32000,
      churn_rate: 0.14,
      num_files_changed: 8,
      bus_factor_min: 2,
      health_delta: -0.5,
      cc_score: 78.0,
      churn_score: 80.0,
      bus_score: 75.0,
      loc_score: 85.0,
      top_files: [],
    },
    metrics_summary: {
      health_score: 82.0,
      avg_complexity: 4.8,
      max_complexity: 18.0,
      churn_rate: 0.14,
      total_loc: 32000,
      bus_factor_min: 2,
      hotspot_count: 4,
      active_contributors: 8,
      total_commits: 90,
      analyzed_commits: 90,
    },
    bus_factor: { repo_id: 2, modules: [] },
    timeline_summary: [
      {
        sha: '2222222',
        full_sha: '2222222222222222222222222222222222222222',
        message: 'feat: vue reactivity updates',
        author: 'Bob',
        committed_at: '2026-05-31T00:00:00Z',
        health_score: 82.0,
        avg_complexity: 4.8,
        max_complexity: 18.0,
        total_loc: 32000,
        churn_rate: 0.14,
        num_files_changed: 8,
        bus_factor_min: 2,
        health_delta: -0.5,
        cc_score: 78.0,
        churn_score: 80.0,
        bus_score: 75.0,
        loc_score: 85.0,
        top_files: [],
      },
    ],
  },
  deltas: {
    health_score_delta: -6.0,
    avg_complexity_delta: 1.4,
    max_complexity_delta: 6.0,
    churn_rate_delta: 0.06,
    total_loc_delta: -13000,
    bus_factor_min_delta: -1,
    hotspot_count_delta: 2,
    active_contributors_delta: -4,
    total_commits_delta: -10,
  },
  insights: [
    {
      category: 'Health Score',
      winner: 'facebook_react',
      summary: 'facebook/react has a higher health score (88.0 vs 82.0).',
    },
    {
      category: 'Code Complexity',
      winner: 'facebook_react',
      summary: 'facebook/react shows lower cyclomatic complexity (3.4 vs 4.8).',
    },
  ],
  verdict: 'facebook/react demonstrates superior overall health (+6.0 pts) compared to vuejs/vue.',
}

import { SWRConfig } from 'swr'

function renderComparePage(initialEntries = ['/compare?base=facebook_react&head=vuejs_vue']) {
  return render(
    <SWRConfig value={{ provider: () => new Map(), dedupingInterval: 0 }}>
      <MemoryRouter initialEntries={initialEntries}>
        <ComparePage />
      </MemoryRouter>
    </SWRConfig>
  )
}

describe('ComparePage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    listReposMock.mockResolvedValue(mockRepos)
    compareReposMock.mockResolvedValue(mockCompareResponse)
  })

  it('renders repository selection dropdowns and executive verdict', async () => {
    renderComparePage()

    await waitFor(() => {
      expect(screen.getByTestId('base-repo-select')).toBeInTheDocument()
      expect(screen.getByTestId('head-repo-select')).toBeInTheDocument()
      expect(screen.getByTestId('comparison-verdict-banner')).toBeInTheDocument()
    })

    expect(screen.getByText(mockCompareResponse.verdict)).toBeInTheDocument()
    expect(screen.getByTestId('base-repo-card')).toBeInTheDocument()
    expect(screen.getByTestId('head-repo-card')).toBeInTheDocument()
  })

  it('renders side-by-side health indicator metrics and benchmark table', async () => {
    renderComparePage()

    await waitFor(() => {
      expect(screen.getByText(/Health Indicators Side-by-Side/i)).toBeInTheDocument()
      expect(screen.getByText(/Full Metric Benchmark Table/i)).toBeInTheDocument()
    })

    expect(screen.getAllByText('facebook/react').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('vuejs/vue').length).toBeGreaterThanOrEqual(1)
  })

  it('allows swapping repositories when swap button is clicked', async () => {
    const user = userEvent.setup()
    renderComparePage()

    await waitFor(() => {
      expect(screen.getByTestId('swap-repos-button')).toBeInTheDocument()
    })

    await user.click(screen.getByTestId('swap-repos-button'))

    await waitFor(() => {
      expect(compareReposMock).toHaveBeenCalledWith('vuejs_vue', 'facebook_react')
    })
  })

  it('opens export report menu with CSV and JSON options', async () => {
    const user = userEvent.setup()
    renderComparePage()

    await waitFor(() => {
      expect(screen.getByTestId('export-compare-report-button')).toBeInTheDocument()
    })

    await user.click(screen.getByTestId('export-compare-report-button'))

    expect(screen.getByTestId('export-compare-menu')).toBeInTheDocument()
    expect(screen.getByTestId('export-compare-csv')).toBeInTheDocument()
    expect(screen.getByTestId('export-compare-json')).toBeInTheDocument()
  })

  it('displays error banner if comparison fetch fails', async () => {
    compareReposMock.mockRejectedValueOnce(new Error('Base repository not found.'))
    renderComparePage()

    await waitFor(() => {
      expect(screen.getByText(/Failed to fetch repository comparison/i)).toBeInTheDocument()
    })
  })
})
