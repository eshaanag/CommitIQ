import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

export interface ScrollToTopProps {
  containerRef?: React.RefObject<HTMLElement | null>
  threshold?: number
  ariaLabel?: string
}

export function ScrollToTop({
  containerRef,
  threshold = 200,
  ariaLabel = 'Scroll back to top',
}: ScrollToTopProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const containerScrollTop = containerRef?.current?.scrollTop ?? 0
      const windowScrollTop = window.scrollY || document.documentElement.scrollTop || 0
      const currentScroll = Math.max(containerScrollTop, windowScrollTop)

      setIsVisible(currentScroll > threshold)
    }

    // Check initial scroll state
    handleScroll()

    const targetElement = containerRef?.current
    if (targetElement) {
      targetElement.addEventListener('scroll', handleScroll, { passive: true })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      if (targetElement) {
        targetElement.removeEventListener('scroll', handleScroll)
      }
      window.removeEventListener('scroll', handleScroll)
    }
  }, [containerRef, threshold])

  const scrollToTop = () => {
    if (containerRef?.current) {
      containerRef.current.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label={ariaLabel}
      title={ariaLabel}
      data-testid="scroll-to-top"
      className={`fixed bottom-6 right-6 z-50 p-3 rounded-full transition-all duration-300 transform backdrop-blur-md shadow-2xl border flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-purple-400/50 ${
        isVisible
          ? 'opacity-100 scale-100 pointer-events-auto bg-purple-950/80 hover:bg-purple-900/90 border-purple-500/30 text-purple-200 hover:text-white shadow-purple-950/50 hover:scale-110 active:scale-95'
          : 'opacity-0 scale-75 pointer-events-none bg-purple-950/0 border-transparent text-transparent'
      }`}
    >
      <ArrowUp className="w-5 h-5 stroke-[2.5]" />
    </button>
  )
}
