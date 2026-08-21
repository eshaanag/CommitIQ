import { clsx, type ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function formatDateShort(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

export function sanitizeCommitMessage(message?: string | null): string {
  if (!message) return 'No commit message'

  let cleaned = message.replace(
    /<\s*(?:script|style|iframe)[\s\S]*?<\s*\/\s*(?:script|style|iframe)\s*>/gi,
    ''
  )
  while (/<\s*\/?[a-zA-Z][^>]*>/i.test(cleaned)) {
    cleaned = cleaned.replace(/<\s*\/?[a-zA-Z][^>]*>/gi, '')
  }
  cleaned = cleaned.replace(/</g, '&lt;').replace(/>/g, '&gt;').trim()

  return cleaned || 'No commit message'
}
