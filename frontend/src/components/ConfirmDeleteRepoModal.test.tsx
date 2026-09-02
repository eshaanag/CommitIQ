import { render, screen, fireEvent } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { ConfirmDeleteRepoModal } from './ConfirmDeleteRepoModal'

vi.mock('../lib/api', () => ({
  deleteRepo: vi.fn().mockResolvedValue({ success: true }),
}))

describe('ConfirmDeleteRepoModal component', () => {
  it('closes on Escape key press', () => {
    const onClose = vi.fn()
    const onDeleted = vi.fn()
    render(
      <ConfirmDeleteRepoModal
        repoId={1}
        repoSlug="facebook/react"
        onClose={onClose}
        onDeleted={onDeleted}
      />
    )

    fireEvent.keyDown(window, { key: 'Escape' })
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('triggers delete on Enter key press', async () => {
    const onClose = vi.fn()
    const onDeleted = vi.fn()
    render(
      <ConfirmDeleteRepoModal
        repoId={1}
        repoSlug="facebook/react"
        onClose={onClose}
        onDeleted={onDeleted}
      />
    )

    fireEvent.keyDown(window, { key: 'Enter' })
    expect(screen.getByText(/Delete repository/i)).toBeInTheDocument()
  })
})
