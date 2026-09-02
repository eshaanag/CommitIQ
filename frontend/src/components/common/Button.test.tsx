import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Button } from './Button'

describe('Button component', () => {
  it('renders primary button with rounded-full class', () => {
    render(<Button>Click me</Button>)
    const btn = screen.getByRole('button', { name: 'Click me' })
    expect(btn).toBeInTheDocument()
    expect(btn).toHaveClass('rounded-full')
  })

  it('renders secondary button variant', () => {
    render(<Button variant="secondary">Cancel</Button>)
    const btn = screen.getByRole('button', { name: 'Cancel' })
    expect(btn).toBeInTheDocument()
    expect(btn).toHaveClass('rounded-full')
  })
})
