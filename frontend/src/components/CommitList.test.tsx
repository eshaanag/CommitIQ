import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { CommitList } from './CommitList'

const mockCommits = [
  {
    sha: 'abcdef1234567890',
    short_sha: 'abcdef1',
    message: 'feat: add awesome feature',
    author: 'Alice Developer',
    committed_at: '2026-08-30T12:00:00Z',
    health_score: 88,
    churn_score: 12,
    complexity_score: 15,
  },
  {
    sha: '1234567890abcdef',
    short_sha: '1234567',
    message: 'fix: resolve edge case bug',
    author: 'Bob Engineer',
    committed_at: '2026-08-30T13:00:00Z',
    health_score: 95,
    churn_score: 5,
    complexity_score: 8,
  },
]

describe('CommitList component', () => {
  it('renders all commits and filters by author query', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()

    render(
      <MemoryRouter>
        <CommitList
          commits={mockCommits as unknown as Parameters<typeof CommitList>[0]['commits']}
          repoSlug="facebook/react"
          selectedSha={null}
          onSelect={onSelect}
        />
      </MemoryRouter>
    )

    expect(screen.getByText('feat: add awesome feature')).toBeInTheDocument()
    expect(screen.getByText('fix: resolve edge case bug')).toBeInTheDocument()

    const searchInput = screen.getByPlaceholderText(/filter by author name/i)
    await user.type(searchInput, 'Alice')

    expect(screen.getByText('feat: add awesome feature')).toBeInTheDocument()
    expect(screen.queryByText('fix: resolve edge case bug')).not.toBeInTheDocument()
  })
})
