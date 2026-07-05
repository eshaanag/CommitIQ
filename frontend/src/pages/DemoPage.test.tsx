import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ingestRepo } from '../lib/api'
import DemoPage from './DemoPage'

vi.mock('../lib/api', () => ({
  ingestRepo: vi.fn(),
}))

const ingestRepoMock = vi.mocked(ingestRepo)

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
  })

  it('starts a bounded facebook/react demo analysis', async () => {
    const user = userEvent.setup()
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
  })

  it('shows an actionable error when the demo analysis cannot start', async () => {
    const user = userEvent.setup()
    ingestRepoMock.mockRejectedValue(new Error('backend unavailable'))
    renderDemoPage()

    await user.click(screen.getByRole('button', { name: /start demo analysis/i }))

    expect(await screen.findByText('backend unavailable')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /return to command center/i })).toBeInTheDocument()
  })
})
