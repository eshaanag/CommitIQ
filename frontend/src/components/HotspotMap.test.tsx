import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { HotspotMap } from './HotspotMap'

globalThis.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
} as unknown as typeof window.ResizeObserver

vi.mock('../lib/api', () => ({
  getHotspots: vi.fn().mockImplementation((_repoId, _sha, limit = 50, offset = 0) => {
    const total = 60
    const hotspots = Array.from(
      { length: Math.min(limit, Math.max(0, total - offset)) },
      (_, i) => ({
        file: `src/file_${offset + i + 1}.ts`,
        complexity: 10,
        churn_count: 5,
        risk_score: 80,
      })
    )
    return Promise.resolve({
      repo_id: 1,
      commit_sha: 'sha123',
      hotspots,
      total,
      limit,
      offset,
    })
  }),
}))

describe('HotspotMap', () => {
  it('renders hotspot map with pagination controls when total exceeds limit', async () => {
    render(<HotspotMap repoId={1} sha="sha123" />)

    expect(await screen.findByText('Complexity Churn Hotspots')).toBeInTheDocument()
    expect(await screen.findByText('Total: 60')).toBeInTheDocument()
    expect(await screen.findByText(/Page 1 of 2/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Previous page' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Next page' })).not.toBeDisabled()
  })

  it('renders risk category badges and legend', async () => {
    render(<HotspotMap repoId={1} sha="sha123" />)

    expect(await screen.findByText('Critical')).toBeInTheDocument()
    expect(screen.getByText('High')).toBeInTheDocument()
    expect(screen.getByText('Medium')).toBeInTheDocument()
  })
})
