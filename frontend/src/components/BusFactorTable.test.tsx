import { render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { BusFactorTable } from './BusFactorTable'

describe('BusFactorTable', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders critical rows without invalid table nesting warnings', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined)

    render(
      <BusFactorTable
        modules={[
          {
            module_path: 'src/core/risky.ts',
            contributor_count: 1,
            top_contributor: 'Ada',
            top_contributor_email: 'ada@example.com',
            top_contributor_pct: 100,
            total_commits_to_module: 8,
            risk_level: 'critical',
            last_commit_sha: 'abc123',
          },
        ]}
      />
    )

    expect(screen.getByText('src/core/risky.ts')).toBeInTheDocument()
    expect(consoleError).not.toHaveBeenCalledWith(
      expect.stringContaining('validateDOMNesting'),
      expect.anything(),
      expect.anything()
    )
  })

  it('sorts modules by top contributor percentage descending', () => {
    render(
      <BusFactorTable
        modules={[
          {
            module_path: 'src/low_risk.ts',
            contributor_count: 5,
            top_contributor: 'Bob',
            top_contributor_email: 'bob@example.com',
            top_contributor_pct: 30,
            total_commits_to_module: 10,
            risk_level: 'low',
            last_commit_sha: 'abc123',
          },
          {
            module_path: 'src/high_risk.ts',
            contributor_count: 1,
            top_contributor: 'Alice',
            top_contributor_email: 'alice@example.com',
            top_contributor_pct: 95,
            total_commits_to_module: 20,
            risk_level: 'critical',
            last_commit_sha: 'def456',
          },
        ]}
      />
    )

    const rows = screen.getAllByRole('row')
    expect(rows[1]).toHaveTextContent('src/high_risk.ts')
    expect(rows[2]).toHaveTextContent('src/low_risk.ts')
  })

  it('filters rows based on search input', async () => {
    const userEvent = (await import('@testing-library/user-event')).default.setup()

    render(
      <BusFactorTable
        modules={[
          {
            module_path: 'src/components/Button.tsx',
            contributor_count: 2,
            top_contributor: 'Alice',
            top_contributor_email: 'alice@example.com',
            top_contributor_pct: 60,
            total_commits_to_module: 10,
            risk_level: 'medium',
            last_commit_sha: '111',
          },
          {
            module_path: 'backend/server.py',
            contributor_count: 1,
            top_contributor: 'Bob',
            top_contributor_email: 'bob@example.com',
            top_contributor_pct: 90,
            total_commits_to_module: 25,
            risk_level: 'high',
            last_commit_sha: '222',
          },
        ]}
      />
    )

    const searchInput = screen.getByPlaceholderText(/filter modules or owners/i)
    await userEvent.type(searchInput, 'backend')

    expect(screen.getByText('backend/server.py')).toBeInTheDocument()
    expect(screen.queryByText('src/components/Button.tsx')).not.toBeInTheDocument()
  })
})
