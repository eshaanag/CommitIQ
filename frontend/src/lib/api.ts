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
} from '../types'

const API_BASE = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/+$/, '')
const API_ROOT = `${API_BASE}/api`

const client = axios.create({
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

export async function getDoraMetrics(repoId: string | number): Promise<DoraMetrics> {
  return request<DoraMetrics>(client.get(`/metrics/repos/${repoId}/dora`))
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

export async function streamNarrative(
  repoId: string | number,
  sha: string,
  onChunk: (chunk: NarrativeStreamChunk) => void
): Promise<void> {
  const response = await fetch(`${API_ROOT}/explain/stream`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      repo_id: Number(repoId),
      commit_sha: sha,
      prompt_type: 'explain_drop',
    }),
  })

  if (!response.ok) {
    const data = await response.json().catch(() => null)
    throw new Error(data?.detail || `Narrative stream failed (${response.status})`)
  }

  if (!response.body) {
    throw new Error('Narrative stream did not return a response body')
  }

  const reader = response.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break

    buffer += decoder.decode(value, { stream: true })
    const events = buffer.split('\n\n')
    buffer = events.pop() || ''

    for (const event of events) {
      const line = event.split('\n').find((part) => part.startsWith('data: '))
      if (!line) continue
      const payload = line.slice(6).trim()
      if (!payload) continue
      onChunk(JSON.parse(payload) as NarrativeStreamChunk)
    }
  }

  if (buffer.trim().startsWith('data: ')) {
    onChunk(JSON.parse(buffer.trim().slice(6)) as NarrativeStreamChunk)
  }
}
