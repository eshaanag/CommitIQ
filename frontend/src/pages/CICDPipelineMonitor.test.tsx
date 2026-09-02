import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import CICDPipelineMonitor from './CICDPipelineMonitor'

describe('CICDPipelineMonitor page', () => {
  it('renders pipeline monitor headers and tabs', () => {
    render(<CICDPipelineMonitor />)
    expect(screen.getByText('CI/CD Pipeline Monitor')).toBeInTheDocument()
    expect(screen.getAllByText(/Overview/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Pipelines/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Deploy/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Alerts/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Metrics/i).length).toBeGreaterThan(0)
  })
})
