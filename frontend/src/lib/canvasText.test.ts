import { describe, expect, it } from 'vitest'
import { fitTextToWidth } from './canvasText'

const measureCodePoints = (text: string) => Array.from(text).length * 10

describe('fitTextToWidth', () => {
  it('leaves labels unchanged when they fit at or below the boundary', () => {
    expect(fitTextToWidth('short.ts', 80, measureCodePoints)).toBe('short.ts')
    expect(fitTextToWidth('exact', 50, measureCodePoints)).toBe('exact')
  })

  it('clips long labels with an ellipsis within the requested width', () => {
    const result = fitTextToWidth('configuration.ts', 80, measureCodePoints)

    expect(result).toBe('confi...')
    expect(result.endsWith('...')).toBe(true)
    expect(measureCodePoints(result)).toBeLessThanOrEqual(80)
  })

  it('stays bounded when only the ellipsis or no text can fit', () => {
    expect(fitTextToWidth('long.ts', 30, measureCodePoints)).toBe('...')
    expect(fitTextToWidth('long.ts', 29, measureCodePoints)).toBe('')
    expect(fitTextToWidth('long.ts', 0, measureCodePoints)).toBe('')
  })

  it('does not split extended Unicode characters while clipping', () => {
    const result = fitTextToWidth('😀😀😀😀.ts', 50, measureCodePoints)

    expect(result).toBe('😀😀...')
    expect(measureCodePoints(result)).toBeLessThanOrEqual(50)
    expect(result).not.toMatch(
      /[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?<![\uD800-\uDBFF])[\uDC00-\uDFFF]/
    )
  })
})
