import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { ScheduledReportsDashboard } from './ScheduledReportsDashboard'

vi.mock('../lib/api', () => ({
  listReportSchedules: vi.fn().mockResolvedValue([]),
  createReportSchedule: vi.fn(),
  deleteReportSchedule: vi.fn(),
  toggleReportSchedule: vi.fn(),
  triggerReportSchedule: vi.fn(),
  getReportDeliveries: vi.fn().mockResolvedValue({ deliveries: [], total: 0 }),
  previewReport: vi.fn(),
}))

describe('ScheduledReportsDashboard', () => {
  it('renders title and new schedule button', () => {
    render(<ScheduledReportsDashboard repoId={1} />)
    expect(screen.getByText(/Scheduled Reports/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /New Schedule/i })).toBeInTheDocument()
  })
})
