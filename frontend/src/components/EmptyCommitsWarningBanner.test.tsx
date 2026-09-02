import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { EmptyCommitsWarningBanner } from './EmptyCommitsWarningBanner'

describe('EmptyCommitsWarningBanner', () => {
  it('renders the default warning banner when repository has 0 analyzed commits', () => {
    render(
      <EmptyCommitsWarningBanner
        isFiltered={false}
        repoName="owner/sample-repo"
        onRescan={vi.fn()}
        onReingest={vi.fn()}
      />
    )

    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByText('No Commits Analyzed for This Repository')).toBeInTheDocument()
    expect(screen.getByText('owner/sample-repo')).toBeInTheDocument()
    expect(
      screen.getByText(/Try increasing the Maximum Commits setting during ingestion/i)
    ).toBeInTheDocument()
    expect(screen.getByTestId('rescan-from-banner-button')).toBeInTheDocument()
    expect(screen.getByTestId('reingest-from-banner-button')).toBeInTheDocument()
    expect(screen.queryByTestId('reset-time-filter-button')).not.toBeInTheDocument()
  })

  it('renders time-window filtered warning banner and triggers reset filter', async () => {
    const user = userEvent.setup()
    const onResetFilterMock = vi.fn()

    render(
      <EmptyCommitsWarningBanner
        isFiltered={true}
        onResetFilter={onResetFilterMock}
        onRescan={vi.fn()}
        onReingest={vi.fn()}
      />
    )

    expect(screen.getByText('No Commits in Selected Time Window')).toBeInTheDocument()
    expect(
      screen.getByText(
        /There are no commits recorded in this repository within the active time filter/i
      )
    ).toBeInTheDocument()

    const resetBtn = screen.getByTestId('reset-time-filter-button')
    expect(resetBtn).toBeInTheDocument()
    await user.click(resetBtn)
    expect(onResetFilterMock).toHaveBeenCalledTimes(1)
  })

  it('triggers rescan and re-ingest action callbacks', async () => {
    const user = userEvent.setup()
    const onRescanMock = vi.fn()
    const onReingestMock = vi.fn()

    render(
      <EmptyCommitsWarningBanner
        isFiltered={false}
        onRescan={onRescanMock}
        onReingest={onReingestMock}
      />
    )

    const rescanBtn = screen.getByTestId('rescan-from-banner-button')
    await user.click(rescanBtn)
    expect(onRescanMock).toHaveBeenCalledTimes(1)

    const reingestBtn = screen.getByTestId('reingest-from-banner-button')
    await user.click(reingestBtn)
    expect(onReingestMock).toHaveBeenCalledTimes(1)
  })

  it('disables rescan button when isRescanning is true', () => {
    render(<EmptyCommitsWarningBanner isFiltered={false} isRescanning={true} onRescan={vi.fn()} />)

    const rescanBtn = screen.getByTestId('rescan-from-banner-button')
    expect(rescanBtn).toBeDisabled()
    expect(screen.getByText('Updating...')).toBeInTheDocument()
  })
})
