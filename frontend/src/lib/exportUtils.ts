/**
 * exportUtils.ts — Pure client-side CSV/JSON export helpers (issue #349).
 *
 * Generates downloadable files via Blob + URL.createObjectURL — no backend
 * round-trip, no extra storage, instant download.
 *
 * Two export formats:
 *  1. Timeline CSV — tabular spreadsheet-friendly format with all health
 *     snapshot columns, properly escaping commas, quotes, and newlines.
 *  2. Bus Factor JSON — full structured JSON payload of module ownership
 *     distributions for data-pipeline / API consumers.
 */

import type {
  BusFactorEntry,
  BusFactorWrapper,
  HealthSnapshot,
  RepoCompareResponse,
} from '../types'

// ---------------------------------------------------------------------------
// CSV helpers
// ---------------------------------------------------------------------------

/**
 * Escape a single CSV cell value per RFC 4180:
 *  - If the value contains a comma, double-quote, newline, or carriage return,
 *    wrap it in double quotes and double any existing double-quotes.
 *  - null / undefined → empty string.
 *  - Numbers are passed through as-is (stringified).
 */
export function escapeCsvCell(value: unknown): string {
  if (value === null || value === undefined) return ''
  const str = String(value)
  // RFC 4180: fields containing CR, LF, comma, or double-quote must be quoted
  if (/[",\r\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`
  }
  return str
}

/**
 * Build a single CSV row from an array of cell values, escaping each per
 * RFC 4180 and joining with commas.
 */
function buildCsvRow(cells: unknown[]): string {
  return cells.map(escapeCsvCell).join(',')
}

// ---------------------------------------------------------------------------
// Timeline CSV export
// ---------------------------------------------------------------------------

/**
 * The canonical column headers for the health timeline CSV export.
 * Order matters — it matches the row builder below.
 */
export const TIMELINE_CSV_HEADERS = [
  'Commit SHA',
  'Committed At',
  'Author',
  'Health Score',
  'Average Complexity',
  'Total LOC',
  'Churn Rate',
  'Files Changed',
  'Min Bus Factor',
] as const

/**
 * Build a full CSV string from the loaded/filtered timeline snapshots.
 *
 * Column order matches TIMELINE_CSV_HEADERS.  Every cell is escaped per
 * RFC 4180 so commit messages / author names containing commas, double
 * quotes, or newlines do not break the CSV structure.
 *
 * For large datasets (hundreds of commits) the string is built with array
 * join (O(n) amortised) rather than string concatenation (O(n²)) to avoid
 * UI-thread jank.
 */
export function buildTimelineCsv(commits: HealthSnapshot[]): string {
  const headerRow = buildCsvRow([...TIMELINE_CSV_HEADERS])

  const dataRows = commits.map((c) =>
    buildCsvRow([
      c.sha,
      c.committed_at,
      c.author,
      c.health_score,
      c.avg_complexity,
      c.total_loc,
      c.churn_rate,
      c.num_files_changed,
      c.bus_factor_min,
    ])
  )

  // Join with \r\n for maximum spreadsheet compatibility (Excel / Sheets).
  return [headerRow, ...dataRows].join('\r\n')
}

/**
 * Trigger a browser download of `commit_health_timeline.csv` containing
 * the provided timeline snapshots.
 *
 * Returns the Blob that was created (useful for testing) or null if the
 * data was empty.
 */
export function exportTimelineCsv(commits: HealthSnapshot[]): Blob | null {
  if (!commits || commits.length === 0) return null

  const csv = buildTimelineCsv(commits)
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  triggerDownload(blob, 'commit_health_timeline.csv')
  return blob
}

// ---------------------------------------------------------------------------
// Bus Factor JSON export
// ---------------------------------------------------------------------------

/**
 * Build the canonical bus-factor JSON payload for export.
 *
 * The structure is an object with:
 *  - `exported_at`: ISO-8601 timestamp of when the export was generated.
 *  - `module_count`: number of modules in the payload.
 *  - `modules`: array of BusFactorEntry objects, each with the 7 fields
 *    specified in issue #349:
 *      module_path, contributor_count, top_contributor,
 *      top_contributor_email, top_contributor_pct,
 *      total_commits_to_module, risk_level
 */
export function buildBusFactorJson(data: BusFactorWrapper | null | undefined): object | null {
  if (!data || !data.modules || data.modules.length === 0) return null

  const modules: Array<{
    module_path: string
    contributor_count: number
    top_contributor: string | null
    top_contributor_email: string | null
    top_contributor_pct: number
    total_commits_to_module: number
    risk_level: string
  }> = data.modules.map((m: BusFactorEntry) => ({
    module_path: m.module_path,
    contributor_count: m.contributor_count,
    top_contributor: m.top_contributor,
    top_contributor_email: m.top_contributor_email,
    top_contributor_pct: m.top_contributor_pct,
    total_commits_to_module: m.total_commits_to_module,
    risk_level: m.risk_level,
  }))

  return {
    exported_at: new Date().toISOString(),
    repo_id: data.repo_id,
    module_count: modules.length,
    modules,
  }
}

/**
 * Trigger a browser download of `bus_factor_index.json` containing the
 * full bus-factor module ownership distribution.
 *
 * Returns the Blob that was created (useful for testing) or null if the
 * data was empty.
 */
export function exportBusFactorJson(data: BusFactorWrapper | null | undefined): Blob | null {
  const payload = buildBusFactorJson(data)
  if (!payload) return null

  const json = JSON.stringify(payload, null, 2)
  const blob = new Blob([json], { type: 'application/json;charset=utf-8;' })
  triggerDownload(blob, 'bus_factor_index.json')
  return blob
}

// ---------------------------------------------------------------------------
// Comparison Report Export
// ---------------------------------------------------------------------------

export function buildComparisonReportCsv(data: RepoCompareResponse | null | undefined): string {
  if (!data) return ''

  const baseName = data.base.repo.name
  const headName = data.head.repo.name
  const b = data.base.metrics_summary
  const h = data.head.metrics_summary
  const d = data.deltas

  const rows: Array<[string, unknown, unknown, unknown]> = [
    ['Metric', `Base: ${baseName}`, `Head: ${headName}`, 'Delta (Head - Base)'],
    ['Overall Health Score', b.health_score, h.health_score, d.health_score_delta],
    ['Average Complexity', b.avg_complexity, h.avg_complexity, d.avg_complexity_delta],
    ['Maximum Complexity', b.max_complexity, h.max_complexity, d.max_complexity_delta],
    [
      'Churn Rate',
      `${(b.churn_rate * 100).toFixed(1)}%`,
      `${(h.churn_rate * 100).toFixed(1)}%`,
      `${(d.churn_rate_delta * 100).toFixed(1)}%`,
    ],
    ['Total LOC', b.total_loc, h.total_loc, d.total_loc_delta],
    ['Min Bus Factor', b.bus_factor_min, h.bus_factor_min, d.bus_factor_min_delta],
    ['Hotspot Count', b.hotspot_count, h.hotspot_count, d.hotspot_count_delta],
    [
      'Active Contributors',
      b.active_contributors,
      h.active_contributors,
      d.active_contributors_delta,
    ],
    ['Total Commits', b.total_commits, h.total_commits, d.total_commits_delta],
    [
      'Dependency Density',
      b.dependency_density ?? 0,
      h.dependency_density ?? 0,
      (h.dependency_density ?? 0) - (b.dependency_density ?? 0),
    ],
    [
      'Semantic Health Score',
      b.semantic_health_score ?? 100,
      h.semantic_health_score ?? 100,
      (h.semantic_health_score ?? 100) - (b.semantic_health_score ?? 100),
    ],
  ]

  const tableCsv = rows.map((r) => buildCsvRow(r)).join('\r\n')
  const verdictSection = [
    '',
    'Comparison Verdict',
    buildCsvRow([data.verdict]),
    '',
    'Key Insights',
    buildCsvRow(['Category', 'Advantage / Winner', 'Summary']),
    ...data.insights.map((ins) =>
      buildCsvRow([ins.category, ins.winner || 'Tie / Comparable', ins.summary])
    ),
  ].join('\r\n')

  return `${tableCsv}\r\n${verdictSection}`
}

export function exportComparisonReportCsv(
  data: RepoCompareResponse | null | undefined
): Blob | null {
  if (!data) return null
  const csv = buildComparisonReportCsv(data)
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const baseSlug = data.base.repo.repo_slug
  const headSlug = data.head.repo.repo_slug
  triggerDownload(blob, `comparison_${baseSlug}_vs_${headSlug}.csv`)
  return blob
}

export function buildComparisonReportJson(
  data: RepoCompareResponse | null | undefined
): object | null {
  if (!data) return null
  return {
    exported_at: new Date().toISOString(),
    base: {
      repo_slug: data.base.repo.repo_slug,
      name: data.base.repo.name,
      metrics: data.base.metrics_summary,
      bus_factor_modules_count: data.base.bus_factor.modules.length,
    },
    head: {
      repo_slug: data.head.repo.repo_slug,
      name: data.head.repo.name,
      metrics: data.head.metrics_summary,
      bus_factor_modules_count: data.head.bus_factor.modules.length,
    },
    deltas: data.deltas,
    insights: data.insights,
    verdict: data.verdict,
  }
}

export function exportComparisonReportJson(
  data: RepoCompareResponse | null | undefined
): Blob | null {
  const payload = buildComparisonReportJson(data)
  if (!payload || !data) return null
  const json = JSON.stringify(payload, null, 2)
  const blob = new Blob([json], { type: 'application/json;charset=utf-8;' })
  const baseSlug = data.base.repo.repo_slug
  const headSlug = data.head.repo.repo_slug
  triggerDownload(blob, `comparison_${baseSlug}_vs_${headSlug}.json`)
  return blob
}

// ---------------------------------------------------------------------------
// Download trigger (shared)
// ---------------------------------------------------------------------------

/**
 * Create a temporary <a> element, click it, and revoke the object URL.
 *
 * This is the standard browser pattern for triggering a file download from
 * client-side JavaScript without a server round-trip.
 *
 * Guarded for non-browser environments (jsdom / Node test runners) where
 * document.createElement may not produce a clickable anchor.
 */
export function triggerDownload(blob: Blob, filename: string): void {
  // Guard: in jsdom (vitest) the anchor click doesn't navigate, but
  // we still create the URL so tests can verify the Blob.
  const url = URL.createObjectURL(blob)

  if (typeof document !== 'undefined') {
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    link.style.display = 'none'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Revoke the URL after a short delay to ensure the download has started.
  setTimeout(() => URL.revokeObjectURL(url), 100)
}
