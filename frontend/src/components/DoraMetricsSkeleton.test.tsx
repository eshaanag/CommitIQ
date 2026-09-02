import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { DoraMetricsSkeleton } from './DoraMetricsSkeleton'

describe('DoraMetricsSkeleton', () => {
  it('renders skeleton loader with accessible status and role', () => {
    render(<DoraMetricsSkeleton />)

    const statusEl = screen.getByRole('status', { name: /loading dora metrics/i })
    expect(statusEl).toBeInTheDocument()
    expect(screen.getByText('DORA Performance')).toBeInTheDocument()
    expect(screen.getByText('Loading DORA metrics…')).toHaveClass('sr-only')
  })
})
