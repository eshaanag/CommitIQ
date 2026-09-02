import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { CodeQualitySkeleton } from './CodeQualitySkeleton'

describe('CodeQualitySkeleton', () => {
  it('renders skeleton loader with accessible status and role', () => {
    render(<CodeQualitySkeleton />)

    const statusEl = screen.getByRole('status', { name: /loading code quality metrics/i })
    expect(statusEl).toBeInTheDocument()
    expect(screen.getByText('Code Quality & AI Impact')).toBeInTheDocument()
    expect(screen.getByText('Loading code quality metrics…')).toHaveClass('sr-only')
  })
})
