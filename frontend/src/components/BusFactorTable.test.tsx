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
})
