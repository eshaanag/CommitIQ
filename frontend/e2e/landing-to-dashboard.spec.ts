import { expect, test, type Page, type Route } from '@playwright/test'

const repo = {
  id: 17,
  url: 'https://github.com/example/project',
  name: 'example/project',
  owner: 'example',
  repo_slug: 'example-project',
  default_branch: 'main',
  ingested_at: '2026-05-31T00:00:00Z',
  last_updated_at: '2026-05-31T00:02:00Z',
  total_commits: 2,
  analyzed_commits: 2,
  status: 'ready',
  error_message: null,
  max_commits_setting: 25,
  github_stars: null,
  github_language: null,
  github_description: null,
}

const commits = [
  {
    sha: 'abc123',
    full_sha: 'abc123',
    message: 'Initial import',
    author: 'Ada',
    committed_at: '2026-05-31T00:00:00Z',
    health_score: 80,
    avg_complexity: 2,
    max_complexity: 4,
    total_loc: 100,
    churn_rate: 0.1,
    num_files_changed: 2,
    bus_factor_min: 2,
    health_delta: null,
    cc_score: 80,
    churn_score: 90,
    bus_score: 40,
    loc_score: 95,
    avg_semantic_drift: 0.1,
    semantic_health_score: 90,
    semantic_drift_method: 'fallback_levenshtein',
    top_files: [],
    risk_reasons: [],
    persistent_hotspots: [],
    hotspot_persistence_score: 0,
  },
  {
    sha: 'def456',
    full_sha: 'def456',
    message: 'Improve ingestion resilience',
    author: 'Grace',
    committed_at: '2026-05-31T00:01:00Z',
    health_score: 91,
    avg_complexity: 3,
    max_complexity: 6,
    total_loc: 140,
    churn_rate: 0.2,
    num_files_changed: 3,
    bus_factor_min: 2,
    health_delta: 11,
    cc_score: 85,
    churn_score: 80,
    bus_score: 60,
    loc_score: 95,
    avg_semantic_drift: 0.12,
    semantic_health_score: 88,
    semantic_drift_method: 'fallback_levenshtein',
    top_files: [],
    risk_reasons: [
      {
        code: 'high_churn',
        label: 'Elevated churn',
        detail: 'This commit changes a larger share of the analyzed code.',
        severity: 'medium',
        value: 0.2,
      },
    ],
    persistent_hotspots: [],
    hotspot_persistence_score: 0,
  },
]

async function json(route: Route, body: unknown) {
  await route.fulfill({ json: body })
}

async function mockApi(page: Page) {
  await page.route('**/api/**', async (route) => {
    const request = route.request()
    const url = new URL(request.url())
    const path = url.pathname

    if (request.method() === 'POST' && path === '/api/repos/ingest') {
      await json(route, {
        repo_id: 17,
        repo_slug: 'example-project',
        status: 'processing',
        job_id: 42,
        message: 'started',
      })
      return
    }
    if (path === '/api/repos/ingest/progress/17') {
      await route.fulfill({
        status: 200,
        contentType: 'text/event-stream',
        headers: { 'Cache-Control': 'no-cache' },
        body: `data: ${JSON.stringify({
          current: 2,
          total: 2,
          current_sha: null,
          stage: 'Complete',
          progress_pct: 100,
          status: 'ready',
          error_message: null,
        })}\n\n`,
      })
      return
    }
    if (path === '/api/repos/17') {
      await json(route, repo)
      return
    }
    if (path === '/api/repos/by-slug/example-project') {
      await json(route, repo)
      return
    }
    if (path === '/api/repos/17/timeline') {
      await json(route, { repo_id: 17, commits })
      return
    }
    if (path === '/api/repos/17/bus-factor') {
      await json(route, { repo_id: 17, modules: [] })
      return
    }
    if (path === '/api/repos/17/graph') {
      await json(route, {
        repo_id: 17,
        commit_sha: url.searchParams.get('sha'),
        nodes: [],
        edges: [],
      })
      return
    }
    if (path === '/api/repos/17/hotspots') {
      await json(route, { repo_id: 17, commit_sha: url.searchParams.get('sha'), files: [] })
      return
    }
    if (path === '/api/repos/17/llm-usage') {
      await json(route, {
        repo_id: 17,
        total_calls: 1,
        cache_hits: 0,
        anthropic_calls: 1,
        gemini_calls: 0,
        total_tokens: 150,
        total_cost_usd: 0.001,
        cache_savings_usd: 0,
        budget_remaining: 24,
        max_calls: 25,
      })
      return
    }

    await route.abort('failed')
  })
}

test('moves from repository submission through ingestion into the dashboard', async ({ page }) => {
  await mockApi(page)
  await page.goto('/')

  await page.getByPlaceholder(/search or enter/i).fill('example/project')
  await page.getByPlaceholder('500').fill('25')

  const ingestRequest = page.waitForRequest(
    (request) =>
      request.method() === 'POST' && new URL(request.url()).pathname === '/api/repos/ingest'
  )
  await page.getByRole('button', { name: 'Analyze' }).click()

  expect((await ingestRequest).postDataJSON()).toEqual({
    repo_url: 'https://github.com/example/project',
    max_commits: 25,
  })
  await expect(page).toHaveURL('/dashboard/example-project')
  await expect(page.getByText('example/project').first()).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Improve ingestion resilience' })).toBeVisible()
  await expect(page.getByText('Top Risk Reasons')).toBeVisible()
  await expect(page.getByText('Elevated churn')).toBeVisible()
})
