import { render, screen, fireEvent } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { TeamCollaborationHub } from './TeamCollaborationHub'

describe('TeamCollaborationHub', () => {
  it('renders team collaboration title and tabs', () => {
    render(<TeamCollaborationHub />)
    expect(screen.getByText(/Team Collaboration Hub/i)).toBeInTheDocument()
    expect(screen.getAllByText(/PR Reviews/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Code Ownership/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Knowledge Sharing/i).length).toBeGreaterThan(0)
  })

  it('allows switching tabs to Code Ownership', () => {
    render(<TeamCollaborationHub />)
    const ownershipTab = screen.getByRole('button', { name: /Code Ownership/i })
    fireEvent.click(ownershipTab)
    expect(screen.getAllByText(/Primary Owner/i).length).toBeGreaterThan(0)
  })
})
