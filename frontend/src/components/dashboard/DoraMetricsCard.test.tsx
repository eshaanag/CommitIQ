import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { DoraMetricsCard } from './DoraMetricsCard'

describe('DoraMetricsCard component', () => {
  it('renders ranking badge and tooltip info', () => {
    render(<DoraMetricsCard tier="ELITE" />)
    expect(screen.getByText('DORA Ranking')).toBeInTheDocument()
    expect(screen.getByText('ELITE')).toBeInTheDocument()
    expect(screen.getByText('Elite Performance')).toBeInTheDocument()
  })

  it('handles other tiers gracefully', () => {
    render(<DoraMetricsCard tier="HIGH" />)
    expect(screen.getByText('HIGH')).toBeInTheDocument()
    expect(screen.getByText('High Performance')).toBeInTheDocument()
  })
})
