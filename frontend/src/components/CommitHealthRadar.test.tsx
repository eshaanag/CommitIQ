import { render, screen, fireEvent } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { CommitHealthRadar } from './CommitHealthRadar'

describe('CommitHealthRadar', () => {
  it('renders radar title and health grade overview', () => {
    render(<CommitHealthRadar />)
    expect(screen.getByText('Commit Health Radar')).toBeInTheDocument()
    expect(screen.getByText('Good')).toBeInTheDocument()
    expect(screen.getAllByText('Commit Frequency').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Code Quality').length).toBeGreaterThan(0)
  })

  it('allows expanding dimension details on click', () => {
    render(<CommitHealthRadar />)
    const button = screen.getByRole('button', { name: /Commit Frequency/i })
    expect(button).toBeInTheDocument()
    fireEvent.click(button)
    expect(screen.getByText(/Average 3\.2 commits\/day/i)).toBeInTheDocument()
  })
})
