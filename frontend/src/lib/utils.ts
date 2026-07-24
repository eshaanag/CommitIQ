import { clsx, type ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  })
}

export function formatDateShort(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric'
  })
}

export function sanitizeCommitMessage(message?: string | null): string {
  if (!message) return 'No commit message'
  
  const sanitized = message
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, '')
    .replace(/<iframe[\s\S]*?>[\s\S]*?<\/iframe>/gi, '')
    .replace(/<[a-zA-Z/!][^>]*>/g, '')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .trim()

  return sanitized || 'No commit message'
}



