import { describe, expect, it } from 'vitest'
import { sanitizeCommitMessage } from './utils'

describe('sanitizeCommitMessage', () => {
  it('handles null, undefined, and empty string gracefully', () => {
    expect(sanitizeCommitMessage(null)).toBe('No commit message')
    expect(sanitizeCommitMessage(undefined)).toBe('No commit message')
    expect(sanitizeCommitMessage('')).toBe('No commit message')
    expect(sanitizeCommitMessage('   ')).toBe('No commit message')
  })

  it('leaves standard commit messages unchanged', () => {
    expect(sanitizeCommitMessage('fix: correct login button alignment')).toBe(
      'fix: correct login button alignment'
    )
    expect(sanitizeCommitMessage('feat: add user authentication')).toBe(
      'feat: add user authentication'
    )
  })

  it('safely escapes HTML tags and special characters', () => {
    expect(sanitizeCommitMessage('<script>alert("xss")</script> Fix bug')).toBe(
      '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt; Fix bug'
    )
    expect(sanitizeCommitMessage('fix: update <Header /> component')).toBe(
      'fix: update &lt;Header /&gt; component'
    )
    expect(sanitizeCommitMessage('feat: value < 100 && value > 10')).toBe(
      'feat: value &lt; 100 &amp;&amp; value &gt; 10'
    )
  })
})
