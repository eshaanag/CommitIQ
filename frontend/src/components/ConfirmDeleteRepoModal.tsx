import { useEffect, useState } from 'react'
import { AlertTriangle, Loader2, X } from 'lucide-react'
import { deleteRepo } from '../lib/api'

interface ConfirmDeleteRepoModalProps {
  repoId: number
  repoSlug: string
  onClose: () => void
  onDeleted: (repoId: number) => void
}

export function ConfirmDeleteRepoModal({
  repoId,
  repoSlug,
  onClose,
  onDeleted,
}: ConfirmDeleteRepoModalProps) {
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleConfirm = async () => {
    if (deleting) return
    setDeleting(true)
    setError(null)
    try {
      await deleteRepo(repoId)
      onDeleted(repoId)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not delete this repository.')
      setDeleting(false)
    }
  }

  // Keyboard shortcut listeners (Escape to close, Enter to confirm submit)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (deleting) return

      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
      } else if (event.key === 'Enter') {
        event.preventDefault()
        handleConfirm()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [deleting, onClose, handleConfirm])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-delete-title"
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={() => !deleting && onClose()}
      />

      <div className="glass-panel relative z-10 w-full max-w-sm rounded-[24px] p-6 border border-white/10 shadow-2xl animate-fade-in">
        <button
          onClick={onClose}
          disabled={deleting}
          aria-label="Cancel"
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors disabled:opacity-40"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-10 h-10 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mb-4">
          <AlertTriangle className="w-5 h-5 text-rose-400" />
        </div>

        <h2 id="confirm-delete-title" className="font-head text-lg font-semibold text-white mb-2">
          Delete repository?
        </h2>
        <p className="text-slate-400 text-sm leading-relaxed mb-1">
          This will permanently remove <span className="font-mono text-slate-200">{repoSlug}</span>{' '}
          and all of its analyzed commits, timelines, and graphs.
        </p>
        <p className="text-slate-500 text-xs mb-6">This action cannot be undone.</p>

        {error && (
          <div className="mb-4 rounded-xl border border-rose-500/20 bg-rose-500/10 px-3 py-2 text-rose-300 text-xs">
            {error}
          </div>
        )}

        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            disabled={deleting}
            className="px-4 py-2 rounded-full text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors disabled:opacity-40"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={deleting}
            className="px-4 py-2 rounded-full text-sm font-semibold bg-rose-500/90 hover:bg-rose-500 text-white transition-colors disabled:opacity-50 disabled:hover:bg-rose-500/90 flex items-center gap-2"
          >
            {deleting ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Deleting...
              </>
            ) : (
              'Delete'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}