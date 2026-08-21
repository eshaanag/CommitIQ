/**
 * exportUtils.test.ts — Tests for CSV / JSON export helpers (issue #349).
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
  buildTimelineCsv,
  buildBusFactorJson,
  exportTimelineCsv,
  exportBusFactorJson,
  escapeCsvCell,
  TIMELINE_CSV_HEADERS,
} from './exportUtils'
import type { BusFactorWrapper, HealthSnapshot } from '../types'

function makeSnapshot(overrides: Partial<HealthSnapshot> = {}): HealthSnapshot {
  return {
    sha: 'abc123',
    full_sha: 'abc123',
    message: 'Initial commit',
    author: 'Ada',
    committed_at: '2026-05-31T00:00:00Z',
    health_score: 82,
    avg_complexity: 2.4,
    max_complexity: 4,
    total_loc: 120,
    churn_rate: 0.12,
    num_files_changed: 3,
    bus_factor_min: 2,
    health_delta: null,
    cc_score: 80,
    churn_score: 88,
    bus_score: 40,
    loc_score: 95,
    top_files: [],
    ...overrides,
  }
}

function makeBusFactor(): BusFactorWrapper {
  return {
    repo_id: 7,
    modules: [
      {
        module_path: 'backend/main.py',
        contributor_count: 2,
        top_contributor: 'Ada',
        top_contributor_email: 'ada@example.com',
        top_contributor_pct: 70,
        total_commits_to_module: 4,
        risk_level: 'medium',
        last_commit_sha: 'def456',
      },
      {
        module_path: 'frontend/app.tsx',
        contributor_count: 1,
        top_contributor: 'Bob',
        top_contributor_email: 'bob@example.com',
        top_contributor_pct: 100,
        total_commits_to_module: 3,
        risk_level: 'high',
        last_commit_sha: 'abc123',
      },
    ],
  }
}

describe('escapeCsvCell', () => {
  it('passes through plain values', () => {
    expect(escapeCsvCell('hello')).toBe('hello')
    expect(escapeCsvCell(42)).toBe('42')
    expect(escapeCsvCell(0.12)).toBe('0.12')
  })

  it('returns empty string for null/undefined', () => {
    expect(escapeCsvCell(null)).toBe('')
    expect(escapeCsvCell(undefined)).toBe('')
  })

  it('wraps values containing commas in double quotes', () => {
    expect(escapeCsvCell('hello, world')).toBe('"hello, world"')
  })

  it('wraps values containing double quotes and doubles the quotes', () => {
    expect(escapeCsvCell('say "hi"')).toBe('"say ""hi"""')
  })

  it('wraps values containing newlines', () => {
    expect(escapeCsvCell('line1\nline2')).toBe('"line1\nline2"')
    expect(escapeCsvCell('line1\r\nline2')).toBe('"line1\r\nline2"')
  })

  it('handles commit messages with special characters', () => {
    const msg = 'fix: handle "quoted" args, and commas\nin multiline'
    const escaped = escapeCsvCell(msg)
    expect(escaped.startsWith('"')).toBe(true)
    expect(escaped.endsWith('"')).toBe(true)
    expect(escaped).toContain('""quoted""')
    expect(escaped).toContain('commas')
  })
})

describe('buildTimelineCsv', () => {
  it('produces valid CSV with canonical headers', () => {
    const csv = buildTimelineCsv([makeSnapshot()])
    const lines = csv.split('\r\n')
    expect(lines[0]).toBe(TIMELINE_CSV_HEADERS.join(','))
  })

  it('contains all 9 required column headers', () => {
    const csv = buildTimelineCsv([makeSnapshot()])
    const headers = csv.split('\r\n')[0].split(',')
    expect(headers).toEqual([
      'Commit SHA',
      'Committed At',
      'Author',
      'Health Score',
      'Average Complexity',
      'Total LOC',
      'Churn Rate',
      'Files Changed',
      'Min Bus Factor',
    ])
  })

  it('produces one data row per commit', () => {
    const commits = [
      makeSnapshot({ sha: 'aaa' }),
      makeSnapshot({ sha: 'bbb' }),
      makeSnapshot({ sha: 'ccc' }),
    ]
    const csv = buildTimelineCsv(commits)
    const lines = csv.split('\r\n')
    expect(lines).toHaveLength(4)
  })

  it('includes correct metric values in data rows', () => {
    const commits = [
      makeSnapshot({
        sha: 'abc123',
        health_score: 82,
        avg_complexity: 2.4,
        total_loc: 120,
        churn_rate: 0.12,
        num_files_changed: 3,
        bus_factor_min: 2,
      }),
    ]
    const csv = buildTimelineCsv(commits)
    const dataLine = csv.split('\r\n')[1]
    expect(dataLine).toContain('abc123')
    expect(dataLine).toContain('Ada')
    expect(dataLine).toContain('82')
    expect(dataLine).toContain('2.4')
    expect(dataLine).toContain('120')
    expect(dataLine).toContain('0.12')
    expect(dataLine).toContain('3')
  })

  it('properly escapes author names with special characters', () => {
    const commits = [
      makeSnapshot({
        sha: 'special',
        author: 'O\'Brien, Patrick "Pat"',
      }),
    ]
    const csv = buildTimelineCsv(commits)
    const lines = csv.split('\r\n')
    expect(lines).toHaveLength(2)
  })

  it('handles empty commits array', () => {
    const csv = buildTimelineCsv([])
    expect(csv).toBe(TIMELINE_CSV_HEADERS.join(','))
  })
})

describe('buildBusFactorJson', () => {
  it('produces structured JSON with all required module fields', () => {
    const result = buildBusFactorJson(makeBusFactor())
    expect(result).not.toBeNull()
    const payload = result as { modules: Array<Record<string, unknown>> }
    expect(payload.modules).toHaveLength(2)
    const mod = payload.modules[0]
    expect(mod).toHaveProperty('module_path', 'backend/main.py')
    expect(mod).toHaveProperty('contributor_count', 2)
    expect(mod).toHaveProperty('top_contributor', 'Ada')
    expect(mod).toHaveProperty('top_contributor_email', 'ada@example.com')
    expect(mod).toHaveProperty('top_contributor_pct', 70)
    expect(mod).toHaveProperty('total_commits_to_module', 4)
    expect(mod).toHaveProperty('risk_level', 'medium')
  })

  it('includes exported_at timestamp and module_count', () => {
    const result = buildBusFactorJson(makeBusFactor())
    const payload = result as { exported_at: string; module_count: number; repo_id: number }
    expect(payload.exported_at).toBeTruthy()
    expect(typeof payload.exported_at).toBe('string')
    expect(payload.module_count).toBe(2)
    expect(payload.repo_id).toBe(7)
  })

  it('returns null for null/undefined input', () => {
    expect(buildBusFactorJson(null)).toBeNull()
    expect(buildBusFactorJson(undefined)).toBeNull()
  })

  it('returns null when modules array is empty', () => {
    expect(buildBusFactorJson({ repo_id: 7, modules: [] })).toBeNull()
  })

  it('excludes internal-only fields like last_commit_sha from the export', () => {
    const result = buildBusFactorJson(makeBusFactor())
    const payload = result as { modules: Array<Record<string, unknown>> }
    expect(payload.modules[0]).not.toHaveProperty('last_commit_sha')
    expect(payload.modules[0]).not.toHaveProperty('last_updated_at')
  })
})

describe('exportTimelineCsv', () => {
  beforeEach(() => {
    globalThis.URL.createObjectURL = vi.fn(() => 'blob:mock-url')
    globalThis.URL.revokeObjectURL = vi.fn()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('creates a Blob with CSV content and triggers a download', () => {
    const commits = [makeSnapshot({ sha: 'abc123' })]
    const blob = exportTimelineCsv(commits)
    expect(blob).not.toBeNull()
    expect(blob?.type).toBe('text/csv;charset=utf-8;')
    expect(globalThis.URL.createObjectURL).toHaveBeenCalledOnce()
  })

  it('returns null and does not download when commits are empty', () => {
    const blob = exportTimelineCsv([])
    expect(blob).toBeNull()
    expect(globalThis.URL.createObjectURL).not.toHaveBeenCalled()
  })

  it('returns null for null/undefined input', () => {
    expect(exportTimelineCsv(null as never)).toBeNull()
    expect(exportTimelineCsv(undefined as never)).toBeNull()
  })
})

describe('exportBusFactorJson', () => {
  beforeEach(() => {
    globalThis.URL.createObjectURL = vi.fn(() => 'blob:mock-url')
    globalThis.URL.revokeObjectURL = vi.fn()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('creates a Blob with JSON content and triggers a download', () => {
    const blob = exportBusFactorJson(makeBusFactor())
    expect(blob).not.toBeNull()
    expect(blob?.type).toBe('application/json;charset=utf-8;')
    expect(globalThis.URL.createObjectURL).toHaveBeenCalledOnce()
  })

  it('returns null and does not download when no data is provided', () => {
    expect(exportBusFactorJson(null)).toBeNull()
    expect(exportBusFactorJson(undefined)).toBeNull()
    expect(exportBusFactorJson({ repo_id: 7, modules: [] })).toBeNull()
    expect(globalThis.URL.createObjectURL).not.toHaveBeenCalled()
  })
})
