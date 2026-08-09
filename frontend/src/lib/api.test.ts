import { afterEach, describe, expect, it, vi } from 'vitest'
import { streamNarrative } from './api'
import type { NarrativeStreamChunk } from '../types'

function streamResponse(chunks: string[]): Response {
  const encoder = new TextEncoder()
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      for (const chunk of chunks) {
        controller.enqueue(encoder.encode(chunk))
      }
      controller.close()
    },
  })
  return new Response(stream, { status: 200 })
}

describe('streamNarrative', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('parses server-sent narrative chunks split across network reads', async () => {
    const chunks: NarrativeStreamChunk[] = []
    const fetchMock = vi.fn(async () =>
      streamResponse([
        'data: {"token":"The ","done":false}\n\n',
        'data: {"token":"risk","done":false}\n',
        '\n',
        'data: {"done":true,"explanation":"The risk","tokens_total":4,"cost_usd":0.001,"cached":false,"model":"demo"}\n\n',
      ])
    )
    vi.stubGlobal('fetch', fetchMock)

    await streamNarrative(7, 'abcdef123456', (chunk) => chunks.push(chunk))

    expect(fetchMock).toHaveBeenCalledWith('/api/explain/stream', expect.any(Object))
    expect(chunks).toEqual([
      { token: 'The ', done: false },
      { token: 'risk', done: false },
      {
        done: true,
        explanation: 'The risk',
        tokens_total: 4,
        cost_usd: 0.001,
        cached: false,
        model: 'demo',
      },
    ])
  })

  it('surfaces API error details for failed streams', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(
        async () => new Response(JSON.stringify({ detail: 'LLM budget exceeded' }), { status: 429 })
      )
    )

    await expect(streamNarrative(7, 'abcdef123456', vi.fn())).rejects.toThrow('LLM budget exceeded')
  })
})
