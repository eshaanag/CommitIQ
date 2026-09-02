import { render, screen, fireEvent } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ReleaseImpactAnalyzer } from './ReleaseImpactAnalyzer'

describe('ReleaseImpactAnalyzer', () => {
  it('renders release impact title and summary metrics', () => {
    render(<ReleaseImpactAnalyzer />)
    expect(screen.getByText(/Release Impact Analyzer/i)).toBeInTheDocument()
    expect(screen.getByText(/Total Releases/i)).toBeInTheDocument()
    expect(screen.getByText(/Success Rate/i)).toBeInTheDocument()
  })

  it('allows switching to compare view', () => {
    render(<ReleaseImpactAnalyzer />)
    const compareButton = screen.getByRole('button', { name: /Compare/i })
    fireEvent.click(compareButton)
    expect(screen.getAllByText(/Release Comparison/i).length).toBeGreaterThan(0)
  })
})
