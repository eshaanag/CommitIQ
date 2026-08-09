import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import type { HotspotResponse } from '../types'
import { HotspotMap } from './HotspotMap'

// Mock SWR
vi.mock('swr')
vi.mock('../lib/api', () => ({
  getHotspots: vi.fn(),
}))

// Mock recharts to avoid rendering issues in test env
vi.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Tooltip: () => null,
  Treemap: () => null,
}))

import useSWR from 'swr'
import { getHotspots } from '../lib/api'

type SWRMockReturn = ReturnType<typeof useSWR<HotspotResponse, Error>>

const mockUseSWR = vi.mocked(useSWR)
const mockGetHotspots = vi.mocked(getHotspots)

const mockHotspots = [
  { file: 'src/auth.ts', complexity: 12.5, churn_count: 8, risk_score: 72.0, loc: 340 },
  { file: 'src/db.ts', complexity: 18.2, churn_count: 5, risk_score: 55.5, loc: 520 },
  { file: 'src/utils.ts', complexity: 6.0, churn_count: 15, risk_score: 90.0, loc: 120 },
]

function mockSWRReturnValue(overrides: Partial<SWRMockReturn>): SWRMockReturn {
  return {
    data: undefined,
    error: undefined,
    isLoading: false,
    isValidating: false,
    mutate: vi.fn(),
    ...overrides,
  } as SWRMockReturn
}

describe('HotspotMap', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockGetHotspots.mockResolvedValue({ repo_id: 1, commit_sha: 'abc', hotspots: mockHotspots })
  })

  it('renders the hotspot table with all columns', async () => {
    mockUseSWR.mockReturnValue(
      mockSWRReturnValue({
        data: { repo_id: 1, commit_sha: 'abc', hotspots: mockHotspots },
      })
    )

    render(<HotspotMap repoId={1} />)

    await waitFor(() => {
      expect(screen.getByText('src/auth.ts')).toBeInTheDocument()
    })

    // Check column headers exist
    expect(screen.getByText('File')).toBeInTheDocument()
    expect(screen.getByText('LOC')).toBeInTheDocument()
    expect(screen.getByText('Churn')).toBeInTheDocument()
    expect(screen.getByText('Complexity')).toBeInTheDocument()
    expect(screen.getByText('Risk')).toBeInTheDocument()
  })

  it('sorts by complexity descending by default (risk_score)', async () => {
    mockUseSWR.mockReturnValue(
      mockSWRReturnValue({
        data: { repo_id: 1, commit_sha: 'abc', hotspots: mockHotspots },
      })
    )

    const { container } = render(<HotspotMap repoId={1} />)

    await waitFor(() => {
      expect(screen.getByText('src/utils.ts')).toBeInTheDocument()
    })

    // Default sort is risk_score desc, so utils.ts (90.0) should be first
    const rows = container.querySelectorAll('tbody tr')
    expect(rows[0].textContent).toContain('src/utils.ts')
  })

  it('sorts by LOC when LOC header is clicked', async () => {
    mockUseSWR.mockReturnValue(
      mockSWRReturnValue({
        data: { repo_id: 1, commit_sha: 'abc', hotspots: mockHotspots },
      })
    )

    const { container } = render(<HotspotMap repoId={1} />)

    await waitFor(() => {
      expect(screen.getByText('src/auth.ts')).toBeInTheDocument()
    })

    // Click LOC header
    fireEvent.click(screen.getByText('LOC'))

    const rows = container.querySelectorAll('tbody tr')
    // Descending: 520, 340, 120 → db.ts, auth.ts, utils.ts
    expect(rows[0].textContent).toContain('src/db.ts')
    expect(rows[1].textContent).toContain('src/auth.ts')
    expect(rows[2].textContent).toContain('src/utils.ts')
  })

  it('toggles sort direction when clicking the same header twice', async () => {
    mockUseSWR.mockReturnValue(
      mockSWRReturnValue({
        data: { repo_id: 1, commit_sha: 'abc', hotspots: mockHotspots },
      })
    )

    const { container } = render(<HotspotMap repoId={1} />)

    await waitFor(() => {
      expect(screen.getByText('src/auth.ts')).toBeInTheDocument()
    })

    // Click LOC once → desc (520 first)
    fireEvent.click(screen.getByText('LOC'))
    let rows = container.querySelectorAll('tbody tr')
    expect(rows[0].textContent).toContain('src/db.ts')

    // Click LOC again → asc (120 first)
    fireEvent.click(screen.getByText('LOC'))
    rows = container.querySelectorAll('tbody tr')
    expect(rows[0].textContent).toContain('src/utils.ts')
  })

  it('sorts by Churn when Churn header is clicked', async () => {
    mockUseSWR.mockReturnValue(
      mockSWRReturnValue({
        data: { repo_id: 1, commit_sha: 'abc', hotspots: mockHotspots },
      })
    )

    const { container } = render(<HotspotMap repoId={1} />)

    await waitFor(() => {
      expect(screen.getByText('src/auth.ts')).toBeInTheDocument()
    })

    fireEvent.click(screen.getByText('Churn'))

    const rows = container.querySelectorAll('tbody tr')
    // Descending: 15, 8, 5 → utils.ts, auth.ts, db.ts
    expect(rows[0].textContent).toContain('src/utils.ts')
    expect(rows[2].textContent).toContain('src/db.ts')
  })

  it('shows empty state when no hotspots', () => {
    mockUseSWR.mockReturnValue(
      mockSWRReturnValue({
        data: { repo_id: 1, commit_sha: 'abc', hotspots: [] },
      })
    )

    render(<HotspotMap repoId={1} />)
    expect(screen.getByText(/No high-complexity churn hotspots found/i)).toBeInTheDocument()
  })

  it('shows loading state', () => {
    mockUseSWR.mockReturnValue(
      mockSWRReturnValue({
        data: undefined,
        isLoading: true,
      })
    )

    render(<HotspotMap repoId={1} />)
    expect(screen.getByText(/Loading hotspots/i)).toBeInTheDocument()
  })
})
