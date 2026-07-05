import { useNavigate } from 'react-router-dom'
import { Sparkles, HelpCircle } from 'lucide-react'

export default function NotFoundPage() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center p-6 select-none font-body">
      <div className="glass-panel rounded-[32px] p-8 md:p-10 max-w-md text-center border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-purple-500/5 blur-3xl pointer-events-none -z-10" />

        <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6 relative">
          <HelpCircle className="w-6 h-6 text-purple-400" />
        </div>

        <h1 className="font-head text-[56px] font-extralight text-white tracking-tight Outfit leading-none">
          404
        </h1>
        <h2 className="font-head text-[18px] font-semibold text-white tracking-tight mt-3 mb-2">
          Workspace Lost in Space
        </h2>
        <p className="text-slate-400 text-xs leading-relaxed mb-8">
          The requested coordinate snapshot index was not compiled or does not exist in the active
          computing grid.
        </p>

        <button
          onClick={() => navigate('/')}
          className="liquid-button px-6 py-3 rounded-full text-xs font-bold text-white tracking-wide shadow-lg w-full flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          Navigate to Command Center
        </button>
      </div>
    </div>
  )
}
