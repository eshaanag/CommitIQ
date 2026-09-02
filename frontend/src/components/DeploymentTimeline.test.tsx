import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { DeploymentTimeline } from './DeploymentTimeline'

vi.mock('../lib/api', () => ({
  getDeploymentTimeline: vi.fn().mockResolvedValue({
    deployments: [
      {
        id: 1,
        provider: 'github-actions',
        environment: 'production',
        status: 'success',
        ref: 'main',
        sha: 'abc123456789',
        pipeline_id: 'pl-101',
        deployed_at: '2026-08-30T12:00:00Z',
        env_color: 'emerald',
      },
    ],
    summary: {
      total_deploys: 1,
      success_count: 1,
      failure_count: 0,
      success_rate: 100,
      most_recent: '2026-08-30T12:00:00Z',
      by_environment: {
        production: { total: 1, success: 1, failure: 0 },
      },
      by_provider: {
        'github-actions': 1,
      },
    },
    daily: [
      {
        date: '2026-08-30',
        success: 1,
        failure: 0,
        total: 1,
      },
    ],
  }),
}))

describe('DeploymentTimeline component', () => {
  it('renders deployment timeline header and stats', async () => {
    render(<DeploymentTimeline repoId={1} />)
    expect(await screen.findByRole('heading', { name: /Deployment Timeline/i })).toBeInTheDocument()
  })
})
