import axios, { AxiosError } from 'axios'
import type {
  ApiError,
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
} from '../types'

const API_BASE = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/+$/, '')
const API_ROOT = `${API_BASE}/api`

const client = axios.create({
  baseURL: API_ROOT,
  headers: { 'Content-Type': 'application/json' },
  timeout: 30000,
})

function normalizeError(error: unknown): Error {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiError | string>
    const data = axiosError.response?.data
    if (typeof data === 'string') return new Error(data)
    if (data?.detail) return new Error(data.detail)
    if (data?.message) return new Error(data.message)
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

export async function ingestRepo(url: string, maxCommits?: number, pat?: string): Promise<IngestResponse> {
  return request<IngestResponse>(
    client.post('/repos/ingest', { repo_url: url, max_commits: maxCommits || 500, pat })
  )
}

export async function getRepoBySlug(slug: string): Promise<Repo> {
  return request<Repo>(client.get(`/repos/by-slug/${slug}`))
}

export async function getRepo(repoId: string | number): Promise<Repo> {
  return request<Repo>(client.get(`/repos/${repoId}`))
}

export async function getHealthTimeline(repoId: string | number): Promise<HealthSnapshot[]> {
  const data = await request<TimelineResponse>(client.get(`/repos/${repoId}/timeline`))
  return data.commits
}

export async function getCommitDetail(
  repoId: string | number,
  sha: string,
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

export async function getGraphDiff(
  repoId: string | number,
  shaBefore: string,
  shaAfter: string,
): Promise<GraphDiffResponse> {
  return request<GraphDiffResponse>(
    client.get(`/repos/${repoId}/graph/diff`, {
      params: { sha_before: shaBefore, sha_after: shaAfter },
    })
  )
}

export async function getHotspots(repoId: string | number, sha?: string): Promise<HotspotResponse> {
  return request<HotspotResponse>(
    client.get(`/repos/${repoId}/hotspots`, { params: sha ? { sha } : undefined })
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
  onChunk: (chunk: NarrativeStreamChunk) => void,
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
