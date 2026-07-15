import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ingestRepo } from '../lib/api'
import { Sparkles, AlertCircle } from 'lucide-react'

export default function DemoPage() {
  const loadOfflineFixtures = () => {
    // Load pre-populated JSON fixtures if backend is unreachable
  };
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const startDemoAnalysis = async () => {
    setLoading(true)
    setError(null)
    try {
      const demoUrl = 'https://github.com/facebook/react'
      const response = await ingestRepo(demoUrl, 100)
      navigate(`/analyze?repo_id=${response.repo_id}&name=${encodeURIComponent(demoUrl)}`, { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not start the demo analysis.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center p-6 select-none font-body">
      <div className="glass-panel rounded-[32px] p-8 max-w-sm text-center border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-purple-500/5 blur-2xl pointer-events-none -z-10" />

        <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-5 relative">
          {error ? (
            <AlertCircle className="w-5 h-5 text-rose-400" />
          ) : loading ? (
            <div className="absolute inset-1 rounded-full border-2 border-t-purple-400 border-r-indigo-400 border-b-transparent border-l-transparent animate-spin" />
          ) : (
            <Sparkles className="w-5 h-5 text-purple-400" />
          )}
        </div>

        <p className={`text-sm ${error ? 'text-rose-400 font-medium' : 'text-slate-300 animate-pulse font-medium'}`}>
          {error || (loading ? 'Starting React demo analysis...' : 'Analyze facebook/react with a smaller demo-sized commit window.')}
        </p>

        <div className="mt-6 space-y-3">
          <button 
            onClick={error ? () => navigate('/') : startDemoAnalysis}
            disabled={loading}
            className="mt-6 liquid-button px-5 py-2.5 rounded-full text-xs font-bold text-white tracking-wide shadow-lg w-full flex items-center justify-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5" />
            {error ? 'Return to Command Center' : loading ? 'Starting...' : 'Start Demo Analysis'}
          </button>
        </div>
      </div>
    </div>
  )
}
