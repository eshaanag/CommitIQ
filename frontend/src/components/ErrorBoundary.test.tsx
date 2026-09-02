import { render, screen } from '@testing-library/react'
import { ErrorBoundary } from './ErrorBoundary'
import { describe, expect, it, vi } from 'vitest'

const BrokenComponent = () => {
  throw new Error('Test crash')
}

describe('ErrorBoundary', () => {
  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div data-testid="child">Safe Component</div>
      </ErrorBoundary>
    )
    expect(screen.getByTestId('child')).toHaveTextContent('Safe Component')
  })

  it('renders standard error UI when a child crashes', () => {
    // Suppress console.error output for expected test error
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})

    render(
      <ErrorBoundary>
        <BrokenComponent />
      </ErrorBoundary>
    )

    expect(screen.getByText('Component Error')).toBeInTheDocument()
    expect(screen.getByText('Test crash')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument()

    spy.mockRestore()
  })

  it('renders custom fallback when provided and a child crashes', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})

    render(
      <ErrorBoundary fallback={<div data-testid="fallback">Custom Fallback</div>}>
        <BrokenComponent />
      </ErrorBoundary>
    )

    expect(screen.getByTestId('fallback')).toHaveTextContent('Custom Fallback')

    spy.mockRestore()
  })
})
