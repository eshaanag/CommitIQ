import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ingestRepo } from '../lib/api'
import LandingPage from './LandingPage'

vi.mock('../lib/api', () => ({
  ingestRepo: vi.fn(),
}))

const ingestRepoMock = vi.mocked(ingestRepo)

function renderLandingPage() {
  return render(
    <MemoryRouter>
      <LandingPage />
    </MemoryRouter>
  )
}

describe('LandingPage', () => {
  beforeEach(() => {
    ingestRepoMock.mockReset()
  })

  it('rejects invalid repository input before submission', async () => {
    const user = userEvent.setup()
    renderLandingPage()

    const repoInput = screen.getByPlaceholderText(/search or enter/i)
    await user.type(repoInput, 'not-a-repo')

    expect(screen.getByText('Please enter a valid owner/repository format.')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Analyze' }))
    expect(ingestRepoMock).not.toHaveBeenCalled()
  })

  it('normalizes shorthand repositories and starts ingestion with the commit limit', async () => {
    const user = userEvent.setup()

    ingestRepoMock.mockResolvedValue({
      repo_id: 17,
      repo_slug: 'example-project',
      status: 'processing',
      job_id: 23,
      message: 'started',
    })

    renderLandingPage()

    await user.type(screen.getByPlaceholderText(/search or enter/i), 'example/project')

    const limitInput = screen.getByPlaceholderText('500')

    await user.clear(limitInput)
    await user.type(limitInput, '25')

    await user.click(screen.getByRole('button', { name: 'Analyze' }))

    await waitFor(() => {
      expect(ingestRepoMock).toHaveBeenCalledWith(
        'https://github.com/example/project',
        25,
        undefined
      )
    })
  })

  it('normalizes full GitHub URLs before starting ingestion', async () => {
    const user = userEvent.setup()

    ingestRepoMock.mockResolvedValue({
      repo_id: 18,
      repo_slug: 'owner-repo',
      status: 'processing',
      job_id: 24,
      message: 'started',
    })

    renderLandingPage()

    await user.type(
      screen.getByPlaceholderText(/search or enter/i),
      'http://github.com/owner/repo.git/'
    )

    await user.click(screen.getByRole('button', { name: 'Analyze' }))

    await waitFor(() => {
      expect(ingestRepoMock).toHaveBeenCalledWith('https://github.com/owner/repo', 500, undefined)
    })
  })

  it('passes branch when provided', async () => {
    const user = userEvent.setup()

    ingestRepoMock.mockResolvedValue({
      repo_id: 19,
      repo_slug: 'example-project',
      status: 'processing',
      job_id: 25,
      message: 'started',
    })

    renderLandingPage()

    await user.type(screen.getByPlaceholderText(/search or enter/i), 'example/project')

    const limitInput = screen.getByPlaceholderText('500')
    await user.clear(limitInput)
    await user.type(limitInput, '25')

    const branchInput = screen.getByPlaceholderText(/branch/i)

    await user.type(branchInput, 'main')

    await user.click(screen.getByRole('button', { name: 'Analyze' }))

    await waitFor(() => {
      expect(ingestRepoMock).toHaveBeenCalledWith('https://github.com/example/project', 25, 'main')
    })
  })
})
