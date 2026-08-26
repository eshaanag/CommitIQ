import { useState, useRef, useEffect, type ReactNode } from 'react'
import { HelpCircle } from 'lucide-react'
import { cn } from '../../lib/utils'

export interface MetricTooltipProps {
  title: string
  description: string
  formula?: string
  weight?: string
  thresholds?: string
  align?: 'left' | 'right' | 'center'
  className?: string
  iconSize?: 'sm' | 'md'
  children?: ReactNode
}

export function MetricTooltip({
  title,
  description,
  formula,
  weight,
  thresholds,
  align = 'center',
  className,
  iconSize = 'sm',
  children,
}: MetricTooltipProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isPinned, setIsPinned] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const isVisible = isHovered || isPinned

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsHovered(false)
    }, 150)
  }

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsPinned((prev) => !prev)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsPinned(false)
      setIsHovered(false)
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setIsPinned((prev) => !prev)
    }
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsPinned(false)
        setIsHovered(false)
      }
    }

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [isVisible])

  const alignmentClasses = {
    left: 'left-0 origin-top-left',
    center: 'left-1/2 -translate-x-1/2 origin-top',
    right: 'right-0 origin-top-right',
  }

  const iconDimensions = iconSize === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'

  return (
    <div
      ref={containerRef}
      className={cn('relative inline-flex items-center', className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsHovered(true)}
        onBlur={(e) => {
          if (!containerRef.current?.contains(e.relatedTarget as Node)) {
            setIsHovered(false)
          }
        }}
        aria-label={`About ${title}`}
        aria-expanded={isVisible}
        className="text-slate-400 hover:text-purple-300 focus:text-purple-300 focus:outline-none transition-colors p-0.5 rounded-full hover:bg-white/10 focus-visible:ring-1 focus-visible:ring-purple-400/50"
      >
        {children || <HelpCircle className={iconDimensions} />}
      </button>

      {isVisible && (
        <div
          role="tooltip"
          className={cn(
            'absolute top-full mt-2 z-50 w-72 sm:w-80 rounded-2xl p-4',
            'bg-[#0c0e17]/95 text-slate-200 border border-white/15 shadow-2xl backdrop-blur-xl',
            'animate-in fade-in zoom-in-95 duration-150',
            alignmentClasses[align]
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-2 mb-2.5">
            <span className="font-head text-xs font-bold text-white tracking-wide">{title}</span>
            {weight && (
              <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/25 font-semibold">
                {weight}
              </span>
            )}
          </div>

          <p className="text-[11px] leading-relaxed text-slate-300 mb-3">{description}</p>

          {formula && (
            <div className="bg-white/5 rounded-xl p-2.5 border border-white/5 mb-2.5">
              <span className="block font-mono text-[9px] uppercase tracking-wider text-purple-300 font-bold mb-1">
                Formula &amp; Calculation
              </span>
              <p className="font-mono text-[10px] text-slate-300 leading-normal break-words">
                {formula}
              </p>
            </div>
          )}

          {thresholds && (
            <div className="text-[10px] text-slate-400 flex items-center gap-1.5 pt-1">
              <span className="font-semibold text-slate-300">Guideline:</span>
              <span>{thresholds}</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
