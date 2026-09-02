import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { VelocityDashboard } from './VelocityDashboard'

vi.mock('../lib/api', () => ({
  getVelocityMetrics: vi.fn().mockResolvedValue({
    totals: {
      total_commits: 120,
      total_insertions: 4500,
      total_deletions: 1200,
      avg_commits_per_week: 10,
      avg_lines_per_week: 600,
      avg_weekly_commits: 10,
      cadence_score: 85,
      cadence_label: 'Consistent',
      max_commit_streak_weeks: 6,
      current_commit_streak_weeks: 3,
      num_active_contributors: 4,
    },
    weekly: [
      {
        iso_week: '2026-W34',
        week_start: '2026-08-17',
        commits: 12,
        insertions: 500,
        deletions: 100,
        lines_changed: 600,
        active_contributors: 3,
      },
    ],
    contributors: [
      {
        name: 'Alice',
        email: 'alice@example.com',
        commits: 60,
        commit_pct: 50,
        insertions: 2500,
        deletions: 600,
        weeks_active: 6,
      },
    ],
  }),
}))

describe('VelocityDashboard component', () => {
  it('renders velocity metrics and delivery cadence title', async () => {
    render(<VelocityDashboard repoId={1} />)
    expect(await screen.findByText(/Velocity & Delivery Cadence/i)).toBeInTheDocument()
  })
})
