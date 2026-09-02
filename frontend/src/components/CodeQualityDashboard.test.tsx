import { render, screen, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { CodeQualityDashboard } from './CodeQualityDashboard'
import * as api from '../lib/api'

vi.mock('../lib/api', () => ({
  getCodeQualityMetrics: vi.fn(),
}))

describe('CodeQualityDashboard', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders skeleton loader while loading', () => {
    vi.mocked(api.getCodeQualityMetrics).mockReturnValue(new Promise(() => {}))

    render(<CodeQualityDashboard repoId={1} />)

    expect(
      screen.getByRole('status', { name: /loading code quality metrics/i })
    ).toBeInTheDocument()
  })

  it('renders code quality metrics when loaded successfully', async () => {
    vi.mocked(api.getCodeQualityMetrics).mockResolvedValue({
      churn_rate_percent: 12.5,
      churn_category: 'Low',
      ai_assisted_commits: 4,
      ai_impact_score: 'Medium',
    })

    render(<CodeQualityDashboard repoId={1} />)

    await waitFor(() => {
      expect(screen.getByText('12.5%')).toBeInTheDocument()
    })

    expect(screen.getByText('4')).toBeInTheDocument()
    expect(screen.getByText('Medium Impact')).toBeInTheDocument()
  })

  it('renders error message when fetch fails', async () => {
    vi.mocked(api.getCodeQualityMetrics).mockRejectedValue(new Error('Network error'))

    render(<CodeQualityDashboard repoId={1} />)

    await waitFor(() => {
      expect(screen.getByText('Failed to load Code Quality metrics')).toBeInTheDocument()
    })
  })
})
