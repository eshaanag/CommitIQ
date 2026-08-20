import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { HealthBadge } from './HealthBadge'

describe('HealthBadge', () => {
  it('renders rounded score and positive delta', () => {
    render(<HealthBadge score={72.4} delta={1.24} />)

    expect(screen.getByText('72')).toBeInTheDocument()
    expect(screen.getByText('+1.2')).toBeInTheDocument()
  })

  it('renders negative delta without a plus sign', () => {
    render(<HealthBadge score={38.9} delta={-4.56} />)

    expect(screen.getByText('39')).toBeInTheDocument()
    expect(screen.getByText('-4.6')).toBeInTheDocument()
  })

  it('shows tooltip overlay with calculation factors on hover', () => {
    render(<HealthBadge score={85} />)

    const tooltip = screen.getByRole('tooltip', { hidden: true })
    expect(tooltip).toBeInTheDocument()

    // Factor names and contribution weights
    expect(screen.getByText('Cyclomatic Complexity')).toBeInTheDocument()
    expect(screen.getByText('Bus Factor Risk')).toBeInTheDocument()
    expect(screen.getByText('Churn Rate')).toBeInTheDocument()
    expect(screen.getByText('25%')).toBeInTheDocument()
    expect(screen.getAllByText('20%').length).toBeGreaterThan(0)
  })
})
