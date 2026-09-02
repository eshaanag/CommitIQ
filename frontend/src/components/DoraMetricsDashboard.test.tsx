import { render, screen, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { DoraMetricsDashboard } from './DoraMetricsDashboard'
import * as api from '../lib/api'

vi.mock('../lib/api', () => ({
  getDoraMetrics: vi.fn(),
}))

describe('DoraMetricsDashboard', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders skeleton loader while loading', () => {
    vi.mocked(api.getDoraMetrics).mockReturnValue(new Promise(() => {}))

    render(<DoraMetricsDashboard repoId={1} />)

    expect(screen.getByRole('status', { name: /loading dora metrics/i })).toBeInTheDocument()
  })

  it('renders metrics data when loaded successfully', async () => {
    vi.mocked(api.getDoraMetrics).mockResolvedValue({
      deployment_frequency: 'High',
      deployment_frequency_value: 3.5,
      change_failure_rate: 'Low',
      change_failure_rate_value: 4.2,
      mttr_hours: 1.5,
      mttr_category: 'Elite',
      dora_score: 'Elite',
    })

    render(<DoraMetricsDashboard repoId={1} />)

    await waitFor(() => {
      expect(screen.getByText('Elite Performer')).toBeInTheDocument()
    })

    expect(screen.getByText('3.5/wk')).toBeInTheDocument()
    expect(screen.getByText('4.2%')).toBeInTheDocument()
    expect(screen.getByText('1.5h')).toBeInTheDocument()
  })

  it('renders error message when fetch fails', async () => {
    vi.mocked(api.getDoraMetrics).mockRejectedValue(new Error('Network error'))

    render(<DoraMetricsDashboard repoId={1} />)

    await waitFor(() => {
      expect(screen.getByText('Failed to load DORA metrics')).toBeInTheDocument()
    })
  })
})
