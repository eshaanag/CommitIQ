import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ingestRepo, getRepoBySlug } from '../lib/api'
import type { Repo } from '../types'
import DemoPage from './DemoPage'

vi.mock('../lib/api', () => ({
  ingestRepo: vi.fn(),
  getRepoBySlug: vi.fn(),
}))

const ingestRepoMock = vi.mocked(ingestRepo)
const getRepoBySlugMock = vi.mocked(getRepoBySlug)

const { mockNavigate } = vi.hoisted(() => ({
  mockNavigate: vi.fn(),
}))

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>()
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

function makeRepo(overrides: Partial<Repo> = {}): Repo {
  return {
    id: 31,
    url: 'https://github.com/facebook/react',
    name: 'facebook/react',
    owner: 'facebook',
    repo_slug: 'facebook-react',
    default_branch: 'main',
    ingested_at: null,
    last_updated_at: null,
    total_commits: 100,
    analyzed_commits: 100,
    status: 'ready',
    error_message: null,
    max_commits_setting: 100,
    github_stars: 200000,
    github_language: 'JavaScript',
    github_description: 'The library for web and native user interfaces',
    ...overrides,
  }
}

function renderDemoPage() {
  return render(
    <MemoryRouter>
      <DemoPage />
    </MemoryRouter>
  )
}

describe('DemoPage', () => {
  beforeEach(() => {
    ingestRepoMock.mockReset()
    getRepoBySlugMock.mockReset()
    mockNavigate.mockReset()
  })

  it('starts a bounded facebook/react demo analysis when not already completed', async () => {
    const user = userEvent.setup()
    getRepoBySlugMock.mockRejectedValue(new Error('not found'))
    ingestRepoMock.mockResolvedValue({
      repo_id: 31,
      repo_slug: 'facebook-react',
      status: 'processing',
      job_id: 44,
      message: 'started',
    })
    renderDemoPage()

    await user.click(screen.getByRole('button', { name: /start demo analysis/i }))

    await waitFor(() => {
      expect(ingestRepoMock).toHaveBeenCalledWith('https://github.com/facebook/react', 100)
    })
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(
        '/analyze?repo_id=31&name=https%3A%2F%2Fgithub.com%2Ffacebook%2Freact',
        { replace: true }
      )
    })
  })

  it('navigates directly to the dashboard when the demo repo is already completed', async () => {
    const user = userEvent.setup()
    getRepoBySlugMock.mockResolvedValue(makeRepo({
      id: 31,
      name: 'facebook/react',
      owner: 'facebook',
      repo_slug: 'facebook-react',
      status: 'ready',
    }))
    renderDemoPage()

    await user.click(screen.getByRole('button', { name: /start demo analysis/i }))

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard/facebook-react', { replace: true })
    })
    expect(ingestRepoMock).not.toHaveBeenCalled()
  })

  it('shows an actionable error when the demo analysis cannot start', async () => {
    const user = userEvent.setup()
    getRepoBySlugMock.mockRejectedValue(new Error('not found'))
    ingestRepoMock.mockRejectedValue(new Error('backend unavailable'))
    renderDemoPage()

    await user.click(screen.getByRole('button', { name: /start demo analysis/i }))

    expect(await screen.findByText('backend unavailable')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /return to command center/i })).toBeInTheDocument()
  })
})
