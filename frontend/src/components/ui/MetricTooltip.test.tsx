import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { MetricTooltip } from './MetricTooltip'

describe('MetricTooltip', () => {
  it('renders help trigger button with accessible label', () => {
    render(
      <MetricTooltip
        title="Cyclomatic Complexity"
        description="Measures code paths"
        formula="M = E - N + 2P"
      />
    )

    const trigger = screen.getByRole('button', { name: /about cyclomatic complexity/i })
    expect(trigger).toBeInTheDocument()
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
  })

  it('shows tooltip content on hover and hides on mouse leave', async () => {
    render(
      <MetricTooltip
        title="Bus Factor"
        description="Minimum contributors required"
        formula="min(bus_factor * 20, 100)"
        weight="20% of Health Score"
      />
    )

    const trigger = screen.getByRole('button', { name: /about bus factor/i })
    fireEvent.mouseEnter(trigger)

    expect(screen.getByRole('tooltip')).toBeInTheDocument()
    expect(screen.getByText('Bus Factor')).toBeInTheDocument()
    expect(screen.getByText('Minimum contributors required')).toBeInTheDocument()
    expect(screen.getByText('min(bus_factor * 20, 100)')).toBeInTheDocument()
    expect(screen.getByText('20% of Health Score')).toBeInTheDocument()

    fireEvent.mouseLeave(trigger)
    await waitFor(() => {
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
    })
  })

  it('toggles tooltip on click and closes on Escape key', async () => {
    const user = userEvent.setup()
    render(<MetricTooltip title="Commit Churn" description="Percentage of modified lines" />)

    const trigger = screen.getByRole('button', { name: /about commit churn/i })
    await user.click(trigger)
    expect(screen.getByRole('tooltip')).toBeInTheDocument()
    expect(trigger).toHaveAttribute('aria-expanded', 'true')

    await user.keyboard('{Escape}')
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
  })

  it('closes on click outside', async () => {
    const user = userEvent.setup()
    render(
      <div>
        <div data-testid="outside">Outside area</div>
        <MetricTooltip title="Semantic Drift" description="NLP embedding similarity" />
      </div>
    )

    const trigger = screen.getByRole('button', { name: /about semantic drift/i })
    await user.click(trigger)
    expect(screen.getByRole('tooltip')).toBeInTheDocument()

    await user.click(screen.getByTestId('outside'))
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
  })
})
