export interface DoraThresholdInfo {
  title: string
  deploymentFrequency: string
  leadTimeForChanges: string
  timeToRestoreService: string
  changeFailureRate: string
}

export const DORA_THRESHOLDS: Record<string, DoraThresholdInfo> = {
  ELITE: {
    title: 'Elite Performance',
    deploymentFrequency: 'Multiple times per day',
    leadTimeForChanges: 'Less than one day',
    timeToRestoreService: 'Less than one hour',
    changeFailureRate: '0% - 15%',
  },
  HIGH: {
    title: 'High Performance',
    deploymentFrequency: 'Once per day to once per week',
    leadTimeForChanges: 'Between one day and one week',
    timeToRestoreService: 'Less than one day',
    changeFailureRate: '16% - 30%',
  },
  MEDIUM: {
    title: 'Medium Performance',
    deploymentFrequency: 'Once per week to once per month',
    leadTimeForChanges: 'Between one week and one month',
    timeToRestoreService: 'Between one day and one week',
    changeFailureRate: '16% - 30%',
  },
  LOW: {
    title: 'Low Performance',
    deploymentFrequency: 'Fewer than once per month',
    leadTimeForChanges: 'Between one month and six months',
    timeToRestoreService: 'Between one week and one month',
    changeFailureRate: '46% - 60%',
  },
}
