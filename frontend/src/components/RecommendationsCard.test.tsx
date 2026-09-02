import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { RecommendationsCard } from './RecommendationsCard'

vi.mock('../lib/api', () => ({
  getRecommendations: vi.fn().mockResolvedValue({
    repo_name: 'test-repo',
    repo_slug: 'test-repo',
    generated_at: new Date().toISOString(),
    health_score: 75,
    total_recommendations: 2,
    critical_count: 1,
    high_count: 1,
    medium_count: 0,
    low_count: 0,
    recommendations: [
      {
        id: 'rec-1',
        category: 'complexity',
        severity: 'critical',
        title: 'Refactor complex modules',
        description: 'Several files have complexity over 15.',
        impact: 85,
        effort: 'high',
        metric: 'avg_complexity',
        current_value: '18.2',
        target_value: '<10.0',
        file_path: 'backend/main.py',
      },
    ],
  }),
}))

describe('RecommendationsCard', () => {
  it('renders health recommendations card', async () => {
    render(<RecommendationsCard repoId={1} />)
    expect(await screen.findByText('Health Recommendations')).toBeInTheDocument()
    expect(await screen.findByText('Refactor complex modules')).toBeInTheDocument()
  })
})
