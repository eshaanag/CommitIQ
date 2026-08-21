import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createRef } from 'react'
import { ScrollToTop } from './ScrollToTop'

describe('ScrollToTop component', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
    window.scrollTo = vi.fn()
  })

  it('renders button hidden when scroll position is 0', () => {
    render(<ScrollToTop threshold={100} />)

    const button = screen.getByTestId('scroll-to-top')
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('opacity-0')
    expect(button).toHaveAttribute('aria-label', 'Scroll back to top')
  })

  it('becomes visible when window scrolls past threshold', () => {
    render(<ScrollToTop threshold={100} />)

    const button = screen.getByTestId('scroll-to-top')
    expect(button).toHaveClass('opacity-0')

    Object.defineProperty(window, 'scrollY', { value: 150, writable: true })
    fireEvent.scroll(window)

    expect(button).toHaveClass('opacity-100')
  })

  it('monitors container scroll if containerRef is provided', () => {
    const container = document.createElement('div')
    Object.defineProperty(container, 'scrollTop', { value: 250, writable: true })
    container.scrollTo = vi.fn()
    const containerRef = createRef<HTMLDivElement>()
    ;(containerRef as { current: HTMLDivElement | null }).current = container

    render(<ScrollToTop containerRef={containerRef} threshold={200} />)

    const button = screen.getByTestId('scroll-to-top')
    expect(button).toHaveClass('opacity-100')

    fireEvent.click(button)

    expect(container.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
  })

  it('scrolls window to top when clicked', () => {
    Object.defineProperty(window, 'scrollY', { value: 300, writable: true })
    render(<ScrollToTop threshold={100} />)

    fireEvent.scroll(window)

    const button = screen.getByTestId('scroll-to-top')
    expect(button).toHaveClass('opacity-100')

    fireEvent.click(button)

    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
  })
})
