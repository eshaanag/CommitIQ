import { describe, expect, it } from 'vitest'
import { formatDelta, formatSha, getHealthColor, getHealthLabel, getHealthStatus } from './index'

describe('health formatting helpers', () => {
  it('maps health scores to stable user-facing severity labels', () => {
    expect(getHealthStatus(90)).toBe('excellent')
    expect(getHealthStatus(72)).toBe('healthy')
    expect(getHealthStatus(58)).toBe('moderate')
    expect(getHealthStatus(45)).toBe('warning')
    expect(getHealthStatus(30)).toBe('critical')
    expect(getHealthStatus(10)).toBe('failing')

    expect(getHealthLabel(90)).toBe('Excellent')
    expect(getHealthLabel(10)).toBe('Failing')
  })

  it('formats commit and delta values for compact dashboard display', () => {
    expect(formatSha('1234567890abcdef')).toBe('12345678')
    expect(formatDelta(1.234)).toBe('+1.2')
    expect(formatDelta(-2.01)).toBe('-2.0')
    expect(formatDelta(null)).toBe('-')
  })

  it('uses semantic health colors at healthy, warning, and critical thresholds', () => {
    expect(getHealthColor(70)).toBe('var(--color-healthy)')
    expect(getHealthColor(40)).toBe('var(--color-warning)')
    expect(getHealthColor(39)).toBe('var(--color-critical)')
  })
})
