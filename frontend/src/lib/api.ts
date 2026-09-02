/**
 * API client for CommitIQ backend.
 *
 * - Non-streaming endpoints use the `axios` `client` instance.
 * - Streaming endpoints (SSE) use the native `fetch` API + `ReadableStream`
 *   reader because axios cannot stream responses. See `streamNarrative`.
 */

import axios, { AxiosError } from 'axios'
import type {
  BusFactorWrapper,
  CommitDetailResponse,
  GraphResponse,
  GraphDiffResponse,
  HotspotResponse,
  HealthSnapshot,
  IngestResponse,
  IngestStatus,
  LLMNarrative,
  LLMUsage,
  NarrativeStreamChunk,
  PredictRequest,
  Repo,
  TimelineResponse,
  CycleTimeMetrics,
  DoraMetrics,
  TeamHealthMetrics,
  CodeQualityMetrics,
  RepoCompareResponse,
  VelocityMetrics,
  ReportSchedule,
  ReportScheduleListResponse,
  ReportPreview,
  WeeklyDigest,
  RecommendationsResponse,
  CommitQualityMetrics,
  DeploymentTimeline,
} from '../types'

export type { NarrativeStreamChunk } from '../types'

export const API_BASE = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/+$/, '')
export const API_ROOT = `${API_BASE}/api`

export const client = axios.create({
  baseURL: API_ROOT,
  headers: { 'Content-Type': 'application/json' },
  timeout: 30000,
})

interface ErrorDetailItem {
  msg?: string
  detail?: string
}

function normalizeError(error: unknown): Error {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<Record<string, unknown>>
    const data = axiosError.response?.data
    if (typeof data === 'string') return new Error(data)
    if (data && typeof data === 'object') {
      if ('detail' in data) {
        if (typeof data.detail === 'string') return new Error(data.detail)
        if (Array.isArray(data.detail)) {
          const msgs = (data.detail as ErrorDetailItem[])
            .map((d: ErrorDetailItem) => d.msg?.replace(/^Value error,\s*/, '') || d.detail)
            .filter((val): val is string => Boolean(val))
          if (msgs.length > 0) return new Error(msgs.join('; '))
        }
      }
      if ('message' in data && typeof data.message === 'string') return new Error(data.message)
    }
    return new Error(axiosError.message)
  }
  return error instanceof Error ? error : new Error('Unexpected API error')
}

async function request<T>(promise: Promise<{ data: T }>): Promise<T> {
  try {
    const response = await promise
    return response.data
  } catch (error) {
    throw normalizeError(error)
  }
}

export async function listRepos(slug?: string): Promise<Repo[]> {
  return request<Repo[]>(client.get('/repos', { params: slug ? { slug } : undefined }))
}

export async function ingestRepo(
  url: string,
  maxCommits?: number,
  branch?: string
): Promise<IngestResponse> {
  return request<IngestResponse>(
    client.post('/repos/ingest', { repo_url: url, max_commits: maxCommits || 500, branch })
  )
}

export async function rescanRepo(repoId: string | number): Promise<IngestResponse> {
  return request<IngestResponse>(client.post(`/repos/${repoId}/rescan`))
}

export async function getRepoBySlug(slug: string): Promise<Repo> {
  return request<Repo>(client.get(`/repos/by-slug/${slug}`))
}

export async function compareRepos(
  baseSlug: string,
  headSlug: string
): Promise<RepoCompareResponse> {
  return request<RepoCompareResponse>(
    client.get('/repos/compare', { params: { base: baseSlug, head: headSlug } })
  )
}

export async function getRepo(repoId: string | number): Promise<Repo> {
  return request<Repo>(client.get(`/repos/${repoId}`))
}

export async function deleteRepo(repoId: string | number): Promise<void> {
  return request<void>(client.delete(`/repos/${repoId}`))
}

export async function getHealthTimeline(
  repoId: string | number,
  startDate?: string,
  endDate?: string
): Promise<HealthSnapshot[]> {
  const params: Record<string, string> = {}
  if (startDate) params.start_date = startDate
  if (endDate) params.end_date = endDate
  const data = await request<TimelineResponse>(
    client.get(`/repos/${repoId}/timeline`, {
      params: Object.keys(params).length ? params : undefined,
    })
  )
  return data.commits
}

export async function getCommitDetail(
  repoId: string | number,
  sha: string
): Promise<CommitDetailResponse> {
  return request<CommitDetailResponse>(client.get(`/repos/${repoId}/commit/${sha}`))
}

export async function getGraph(repoId: string | number, sha?: string): Promise<GraphResponse> {
  return request<GraphResponse>(
    client.get(`/repos/${repoId}/graph`, { params: sha ? { sha } : undefined })
  )
}

export async function getBusFactor(repoId: string | number): Promise<BusFactorWrapper> {
  return request<BusFactorWrapper>(client.get(`/repos/${repoId}/bus-factor`))
}

export async function getCycleTime(repoId: string | number): Promise<CycleTimeMetrics> {
  return request<CycleTimeMetrics>(client.get(`/metrics/repos/${repoId}/cycle-time`))
}

export async function getDoraMetrics(
  repoId: string | number,
  startDate?: string,
  endDate?: string
): Promise<DoraMetrics> {
  const params = new URLSearchParams()
  if (startDate) params.set('start_date', startDate)
  if (endDate) params.set('end_date', endDate)
  const qs = params.toString()
  return request<DoraMetrics>(client.get(`/metrics/repos/${repoId}/dora${qs ? `?${qs}` : ''}`))
}

export async function getTeamHealthMetrics(repoId: string | number): Promise<TeamHealthMetrics> {
  return request<TeamHealthMetrics>(client.get(`/metrics/repos/${repoId}/team-health`))
}

export async function getCodeQualityMetrics(repoId: string | number): Promise<CodeQualityMetrics> {
  return request<CodeQualityMetrics>(client.get(`/metrics/repos/${repoId}/code-quality`))
}

export async function getGraphDiff(
  repoId: string | number,
  shaBefore: string,
  shaAfter: string
): Promise<GraphDiffResponse> {
  return request<GraphDiffResponse>(
    client.get(`/repos/${repoId}/graph/diff`, {
      params: { sha_before: shaBefore, sha_after: shaAfter },
    })
  )
}

export async function getHotspots(
  repoId: string | number,
  sha?: string,
  limit?: number,
  offset?: number
): Promise<HotspotResponse> {
  const params: Record<string, unknown> = {}
  if (sha) params.sha = sha
  if (limit !== undefined) params.limit = limit
  if (offset !== undefined) params.offset = offset
  return request<HotspotResponse>(
    client.get(`/repos/${repoId}/hotspots`, {
      params: Object.keys(params).length > 0 ? params : undefined,
    })
  )
}

export async function getNarrative(repoId: string | number, sha: string): Promise<LLMNarrative> {
  return request<LLMNarrative>(
    client.post('/explain', {
      repo_id: Number(repoId),
      commit_sha: sha,
      prompt_type: 'explain_drop',
    })
  )
}

export async function predictMerge(repoId: string | number, sha: string): Promise<LLMNarrative> {
  const payload: PredictRequest = {
    repo_id: Number(repoId),
    commit_sha: sha,
    prompt_type: 'predict_merge',
  }
  return request<LLMNarrative>(client.post('/predict', payload))
}

export async function getLLMUsage(repoId: string | number): Promise<LLMUsage> {
  return request<LLMUsage>(client.get(`/repos/${repoId}/llm-usage`))
}

export function getIngestProgress(repoId: string | number): EventSource {
  return new EventSource(`${API_ROOT}/repos/ingest/progress/${repoId}`)
}

export async function cancelIngest(repoId: string | number): Promise<IngestStatus> {
  return request<IngestStatus>(client.post(`/repos/ingest/cancel/${repoId}`))
}

// --- Report Schedules ---

export async function listReportSchedules(repoId: string | number): Promise<ReportSchedule[]> {
  return request<ReportSchedule[]>(client.get(`/repos/${repoId}/schedules`))
}

export async function createReportSchedule(
  repoId: string | number,
  data: {
    name: string
    description?: string
    cron_expression: string
    timezone?: string
    report_type?: string
    webhook_url?: string
    webhook_secret?: string
    notification_email?: string
    include_narrative?: boolean
  }
): Promise<ReportSchedule> {
  return request<ReportSchedule>(client.post(`/repos/${repoId}/schedules`, data))
}

export async function updateReportSchedule(
  repoId: string | number,
  scheduleId: number,
  data: Partial<ReportSchedule>
): Promise<ReportSchedule> {
  return request<ReportSchedule>(client.patch(`/repos/${repoId}/schedules/${scheduleId}`, data))
}

export async function deleteReportSchedule(
  repoId: string | number,
  scheduleId: number
): Promise<void> {
  return request<void>(client.delete(`/repos/${repoId}/schedules/${scheduleId}`))
}

export async function toggleReportSchedule(
  repoId: string | number,
  scheduleId: number
): Promise<ReportSchedule> {
  return request<ReportSchedule>(client.post(`/repos/${repoId}/schedules/${scheduleId}/toggle`))
}

export async function triggerReportSchedule(
  repoId: string | number,
  scheduleId: number
): Promise<{ delivery_id: number; status: string; message: string }> {
  return request(client.post(`/repos/${repoId}/schedules/${scheduleId}/trigger`))
}

export async function getReportDeliveries(
  repoId: string | number,
  scheduleId: number,
  limit?: number,
  offset?: number
): Promise<ReportScheduleListResponse> {
  const params: Record<string, unknown> = {}
  if (limit !== undefined) params.limit = limit
  if (offset !== undefined) params.offset = offset
  return request<ReportScheduleListResponse>(
    client.get(`/repos/${repoId}/schedules/${scheduleId}/deliveries`, {
      params: Object.keys(params).length ? params : undefined,
    })
  )
}

export async function previewReport(
  repoId: string | number,
  reportType?: string
): Promise<ReportPreview> {
  const params = reportType ? { report_type: reportType } : undefined
  return request<ReportPreview>(client.get(`/repos/${repoId}/reports/preview`, { params }))
}

export async function getWeeklyDigest(
  repoId: string | number,
  weeks?: number
): Promise<WeeklyDigest> {
  const params = weeks && weeks !== 1 ? { weeks } : undefined
  return request<WeeklyDigest>(client.get(`/repos/${repoId}/digest`, { params }))
}

export async function getRecommendations(
  repoId: string | number
): Promise<RecommendationsResponse> {
  return request<RecommendationsResponse>(client.get(`/repos/${repoId}/recommendations`))
}

export interface NarrativeResponse {
  repo_id: number
  commit_sha: string
  prompt_type: string
  explanation: string
  tokens_used: number
  cost_usd: number
  cached: boolean
  model: string
  provider?: string
  demo_mode: boolean
}

/**
 * Stream an `explain_drop` narrative from `POST /api/explain/stream`.
 *
 * Calls `onChunk` once per SSE payload. The final chunk has `done: true`
 * and carries the full explanation, token totals, cost, and provider
 * metadata.
 *
 * Uses native `fetch` + `ReadableStream.getReader()` because axios does
 * not support streaming responses. Chunks split mid-`\n\n` are
 * reassembled via a small buffer.
 */
export async function streamNarrative(
  repoId: string | number,
  sha: string,
  onChunk: (chunk: NarrativeStreamChunk) => void,
  options: { signal?: AbortSignal } = {}
): Promise<void> {
  const response = await fetch(`${API_ROOT}/explain/stream`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      repo_id: Number(repoId),
      commit_sha: sha,
      prompt_type: 'explain_drop',
    }),
    signal: options.signal,
  })

  if (!response.ok) {
    const data = await response.json().catch(() => null)
    throw new Error(data?.detail || `Narrative stream failed (${response.status})`)
  }

  if (!response.body) {
    throw new Error('Narrative stream did not return a response body')
  }

  await consumeSseStream(response.body, onChunk)
}

/**
 * Stream a `predict_merge` narrative from `POST /api/predict/stream`.
 * Mirrors `streamNarrative` but targets the merge-impact endpoint.
 */
export async function streamPredictNarrative(
  repoId: string | number,
  sha: string,
  onChunk: (chunk: NarrativeStreamChunk) => void,
  options: { signal?: AbortSignal } = {}
): Promise<void> {
  const response = await fetch(`${API_ROOT}/predict/stream`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      repo_id: Number(repoId),
      commit_sha: sha,
      prompt_type: 'predict_merge',
    }),
    signal: options.signal,
  })

  if (!response.ok) {
    const data = await response.json().catch(() => null)
    throw new Error(data?.detail || `Predict stream failed (${response.status})`)
  }

  if (!response.body) {
    throw new Error('Predict stream did not return a response body')
  }

  await consumeSseStream(response.body, onChunk)
}

/**
 * Internal helper: consume a `ReadableStream<Uint8Array>` of SSE-formatted
 * bytes, reassembling chunks split across network reads.
 */
async function consumeSseStream(
  body: ReadableStream<Uint8Array>,
  onChunk: (chunk: NarrativeStreamChunk) => void
): Promise<void> {
  const reader = body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''

  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      buffer += decoder.decode(value, { stream: true })
      const events = buffer.split('\n\n')
      buffer = events.pop() || ''

      for (const event of events) {
        const payload = extractSsePayload(event)
        if (payload) {
          onChunk(JSON.parse(payload) as NarrativeStreamChunk)
        }
      }
    }

    // Flush any trailing event that didn't end with a blank line.
    const trailing = extractSsePayload(buffer)
    if (trailing) {
      onChunk(JSON.parse(trailing) as NarrativeStreamChunk)
    }
  } finally {
    reader.releaseLock()
  }
}

function extractSsePayload(event: string): string | null {
  const line = event.split('\n').find((part) => part.startsWith('data: '))
  if (!line) return null
  const payload = line.slice(6).trim()
  return payload || null
}

/** Convenience wrapper for the non-streaming `POST /api/explain` endpoint. */
export async function fetchNarrative(
  repoId: string | number,
  sha: string,
  promptType: 'explain_drop' | 'predict_merge' = 'explain_drop'
): Promise<NarrativeResponse> {
  try {
    const { data } = await client.post<NarrativeResponse>('/explain', {
      repo_id: Number(repoId),
      commit_sha: sha,
      prompt_type: promptType,
    })
    return data
  } catch (err) {
    const axErr = err as AxiosError<{ detail?: string }>
    const detail = axErr.response?.data?.detail || axErr.message
    throw new Error(detail)
  }
}

export async function getVelocityMetrics(repoId: string | number): Promise<VelocityMetrics> {
  return request<VelocityMetrics>(client.get(`/metrics/repos/${repoId}/velocity`))
}

export async function getCommitQuality(repoId: string | number): Promise<CommitQualityMetrics> {
  return request<CommitQualityMetrics>(client.get(`/metrics/repos/${repoId}/commit-quality`))
}

export async function getDeploymentTimeline(
  repoId: string | number,
  limit?: number
): Promise<DeploymentTimeline> {
  const params: Record<string, string> = {}
  if (limit !== undefined) params.limit = String(limit)
  return request<DeploymentTimeline>(
    client.get(`/repos/${repoId}/deployments`, {
      params: Object.keys(params).length ? params : undefined,
    })
  )
}
