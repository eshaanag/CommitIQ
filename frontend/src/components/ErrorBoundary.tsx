import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }
      return (
        <div className="glass-panel rounded-[28px] p-6 text-rose-300 border border-rose-500/20 bg-rose-500/10 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center flex-shrink-0">
              <span className="text-rose-400 text-sm">✕</span>
            </div>
            <div>
              <h4 className="font-head text-sm font-semibold text-white">Component Error</h4>
              <p className="text-slate-400 text-[11px] mt-0.5 leading-relaxed">
                An unexpected crash occurred inside this dashboard component.
              </p>
            </div>
          </div>
          {this.state.error && (
            <pre className="p-3 bg-black/40 rounded-lg text-[10px] font-mono overflow-auto max-h-32 border border-white/5 text-slate-300">
              {this.state.error.message}
            </pre>
          )}
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="text-[11px] font-semibold text-rose-300 hover:text-white bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/15 rounded-full px-3 py-1 transition-all"
          >
            Try Again
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
