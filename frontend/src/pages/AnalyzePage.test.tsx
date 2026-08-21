import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { cancelIngest, getIngestProgress, getRepo } from '../lib/api'
import AnalyzePage from './AnalyzePage'

vi.mock('../lib/api', () => ({
  cancelIngest: vi.fn(),
  getIngestProgress: vi.fn(),
  getRepo: vi.fn(),
}))

const cancelIngestMock = vi.mocked(cancelIngest)
const getIngestProgressMock = vi.mocked(getIngestProgress)
const getRepoMock = vi.mocked(getRepo)

class MockEventSource {
  onmessage: ((event: MessageEvent<string>) => void) | null = null
  onerror: (() => void) | null = null
  close = vi.fn()

  emit(data: unknown) {
    this.onmessage?.({ data: JSON.stringify(data) } as MessageEvent<string>)
  }
}

function renderAnalyzePage(source = new MockEventSource()) {
  getIngestProgressMock.mockReturnValue(source as unknown as EventSource)
  render(
    <MemoryRouter initialEntries={['/analyze?repo_id=17&name=example/project']}>
      <Routes>
        <Route path="/analyze" element={<AnalyzePage />} />
        <Route path="/" element={<div>Landing</div>} />
        <Route path="/dashboard/:slug" element={<div>Dashboard</div>} />
      </Routes>
    </MemoryRouter>
  )
  return source
}

describe('AnalyzePage', () => {
  beforeEach(() => {
    cancelIngestMock.mockReset()
    getIngestProgressMock.mockReset()
    getRepoMock.mockReset()
  })

  it('cancels an active ingestion job from the progress page', async () => {
    const user = userEvent.setup()
    renderAnalyzePage()
    cancelIngestMock.mockResolvedValue({
      current: 0,
      total: 50,
      current_sha: null,
      stage: 'Cancelled',
      progress_pct: 0,
      status: 'cancelled',
      error_message: 'Ingestion cancelled by user.',
    })

    await user.click(screen.getByRole('button', { name: /cancel analysis/i }))

    await waitFor(() => {
      expect(cancelIngestMock).toHaveBeenCalledWith('17')
    })
    expect(await screen.findByText('Ingestion cancelled by user.')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /return & retry/i })).toBeInTheDocument()
  })

  it('navigates to the dashboard when ingestion completes', async () => {
    const source = renderAnalyzePage()
    getRepoMock.mockResolvedValue({
      id: 17,
      url: 'https://github.com/example/project',
      name: 'example/project',
      owner: 'example',
      repo_slug: 'example-project',
      default_branch: 'main',
      ingested_at: null,
      last_updated_at: null,
      total_commits: 1,
      analyzed_commits: 1,
      status: 'ready',
      error_message: null,
      max_commits_setting: 50,
      github_stars: null,
      github_language: null,
      github_description: null,
    })

    source.emit({
      current: 1,
      total: 1,
      current_sha: null,
      stage: 'Complete',
      progress_pct: 100,
      status: 'ready',
      error_message: null,
    })

    expect(await screen.findByText('Dashboard')).toBeInTheDocument()
  })
})
