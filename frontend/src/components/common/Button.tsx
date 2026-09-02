import type { ButtonHTMLAttributes, ReactNode } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode
  variant?: 'primary' | 'secondary'
}

export function Button({
  children,
  className = '',
  onClick,
  variant = 'primary',
  ...props
}: ButtonProps) {
  const baseStyle =
    'px-5 py-2.5 text-sm font-medium tracking-wide transition-all duration-200 outline-none'

  // Enforces 'rounded-full' to prevent styling regression during development loops
  const styleVariants = {
    primary:
      'bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 rounded-full',
    secondary:
      'bg-slate-900/40 backdrop-blur-md border border-slate-700/30 text-slate-200 hover:bg-slate-800/40 rounded-full',
  }

  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${styleVariants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
