import { useEffect, useState } from 'react'

function getStoredTheme(): 'light' | 'dark' | null {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return null;
    const saved = window.localStorage.getItem('theme')
    return saved === 'light' || saved === 'dark' ? saved : null
  } catch {
    return null
  }
}

function storeTheme(theme: 'light' | 'dark') {
  try {
    window.localStorage?.setItem('theme', theme)
  } catch {
    // Theme switching still works when storage is unavailable.
  }
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => getStoredTheme() || 'dark')

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    storeTheme(theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center justify-between w-12 h-6 rounded-full p-0.5 cursor-pointer bg-elevated border border-border/80 hover:border-brand/40 transition-all duration-300 select-none shadow-inner focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 group"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div
        className={`w-5 h-5 rounded-full shadow-md flex items-center justify-center transform theme-knob-transition z-10
          ${theme === 'dark' ? 'translate-x-[22px] bg-brand hover:bg-brand-hover text-primary' : 'translate-x-0 bg-yellow-500 text-white'}
        `}
      >
        {theme === 'dark' ? (
          <svg className="w-3.5 h-3.5 animate-pulse-slow" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        ) : (
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
            <circle cx="12" cy="12" r="5" fill="currentColor" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
        )}
      </div>

      <span className={`absolute left-1 transition-opacity duration-300 flex items-center justify-center w-5 h-5 ${theme === 'light' ? 'opacity-0' : 'opacity-40 group-hover:opacity-60'}`}>
        <svg className="w-3.5 h-3.5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <circle cx="12" cy="12" r="5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      </span>

      <span className={`absolute right-1 transition-opacity duration-300 flex items-center justify-center w-5 h-5 ${theme === 'dark' ? 'opacity-0' : 'opacity-40 group-hover:opacity-60'}`}>
        <svg className="w-3.5 h-3.5 text-secondary" fill="currentColor" viewBox="0 0 20 20">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      </span>
    </button>
  )
}
