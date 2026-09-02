import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { WeeklyDigestCard } from './WeeklyDigestCard'

vi.mock('../lib/api', () => ({
  getWeeklyDigest: vi.fn().mockResolvedValue({
    repo_name: 'test-repo',
    repo_slug: 'test-repo',
    generated_at: new Date().toISOString(),
    window_weeks: 1,
    summary: {
      total_commits: 12,
      total_insertions: 340,
      total_deletions: 120,
      total_files_changed: 8,
      unique_contributors: 3,
    },
    health: {
      current_avg_score: 85,
      previous_avg_score: 80,
      trend: 5,
      trend_direction: 'up',
    },
    complexity: {
      current_avg: 12,
      previous_avg: 14,
      trend: -2,
    },
    churn: {
      current_avg_rate: 0.15,
      previous_avg_rate: 0.2,
      trend: -0.05,
    },
    bus_factor: {
      total_modules: 5,
      critical_risk_count: 0,
      high_risk_count: 1,
      top_risk_modules: [],
    },
    top_contributors: [],
    persistent_hotspots: [],
    alerts: [],
  }),
}))

describe('WeeklyDigestCard', () => {
  it('renders weekly digest card with metrics', async () => {
    render(<WeeklyDigestCard repoId={1} />)
    expect(await screen.findByText('Weekly Digest')).toBeInTheDocument()
    expect(await screen.findByText('Health')).toBeInTheDocument()
    expect(await screen.findByText('Complexity')).toBeInTheDocument()
  })
})
