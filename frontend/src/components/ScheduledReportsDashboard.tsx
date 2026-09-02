import { useCallback, useRef, useState, forwardRef, type FormEvent } from 'react'
import useSWR from 'swr'
import {
  Clock,
  Plus,
  Play,
  Pause,
  Trash2,
  RefreshCw,
  Bell,
  Zap,
  Calendar,
  ChevronDown,
  ChevronRight,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  History,
  Eye,
  Globe,
  Mail,
  Shield,
  Timer,
} from 'lucide-react'
import type { ReportSchedule, ReportDelivery, ReportPreview } from '../types'
import {
  listReportSchedules,
  createReportSchedule,
  deleteReportSchedule,
  toggleReportSchedule,
  triggerReportSchedule,
  getReportDeliveries,
  previewReport,
} from '../lib/api'

interface Props {
  repoId: number
}

const REPORT_TYPE_LABELS: Record<string, string> = {
  health_summary: 'Health Summary',
  dora_metrics: 'DORA Metrics',
  team_health: 'Team Health',
  full_analysis: 'Full Analysis',
}

const REPORT_TYPE_COLORS: Record<string, string> = {
  health_summary: 'emerald',
  dora_metrics: 'sky',
  team_health: 'amber',
  full_analysis: 'purple',
}

const CRON_PRESETS = [
  { label: 'Daily 9am UTC', value: '0 9 * * *' },
  { label: 'Weekly Monday', value: '0 9 * * MON' },
  { label: 'Weekly Friday', value: '0 17 * * FRI' },
  { label: 'Every Monday & Thursday', value: '0 9 * * MON,THU' },
  { label: 'Monthly 1st', value: '0 9 1 * *' },
  { label: 'Weekdays 10am', value: '0 10 * * 1-5' },
]

export function ScheduledReportsDashboard({ repoId }: Props) {
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [expandedScheduleId, setExpandedScheduleId] = useState<number | null>(null)
  const [previewScheduleId, setPreviewScheduleId] = useState<number | null>(null)
  const [previewData, setPreviewData] = useState<ReportPreview | null>(null)
  const [previewLoading, setPreviewLoading] = useState(false)
  const [triggeringId, setTriggeringId] = useState<number | null>(null)
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const {
    data: schedules = [],
    isLoading,
    mutate: refreshSchedules,
  } = useSWR<ReportSchedule[]>(repoId ? ['report-schedules', repoId] : null, () =>
    listReportSchedules(repoId)
  )

  const handleToggle = useCallback(
    async (scheduleId: number) => {
      try {
        await toggleReportSchedule(repoId, scheduleId)
        refreshSchedules()
      } catch (err) {
        console.error('Toggle failed:', err)
      }
    },
    [repoId, refreshSchedules]
  )

  const handleTrigger = useCallback(
    async (scheduleId: number) => {
      setTriggeringId(scheduleId)
      try {
        await triggerReportSchedule(repoId, scheduleId)
        refreshSchedules()
      } catch (err) {
        console.error('Trigger failed:', err)
      } finally {
        setTriggeringId(null)
      }
    },
    [repoId, refreshSchedules]
  )

  const handleDelete = useCallback(
    async (scheduleId: number) => {
      setDeletingId(scheduleId)
      try {
        await deleteReportSchedule(repoId, scheduleId)
        setConfirmDeleteId(null)
        refreshSchedules()
      } catch (err) {
        console.error('Delete failed:', err)
      } finally {
        setDeletingId(null)
      }
    },
    [repoId, refreshSchedules]
  )

  const handlePreview = useCallback(
    async (scheduleId: number) => {
      if (previewScheduleId === scheduleId) {
        setPreviewScheduleId(null)
        setPreviewData(null)
        return
      }
      const schedule = schedules.find((s) => s.id === scheduleId)
      if (!schedule) return
      setPreviewScheduleId(scheduleId)
      setPreviewLoading(true)
      try {
        const data = await previewReport(repoId, schedule.report_type)
        setPreviewData(data)
      } catch (err) {
        console.error('Preview failed:', err)
      } finally {
        setPreviewLoading(false)
      }
    },
    [repoId, schedules, previewScheduleId]
  )

  return (
    <div className="glass-panel rounded-[28px] p-6 border border-white/10 shadow-2xl space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 border-b border-white/5 pb-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center flex-shrink-0">
            <Clock className="w-4 h-4 text-purple-300" />
          </div>
          <div>
            <h3 className="font-head text-[15px] font-semibold text-white">Scheduled Reports</h3>
            <p className="text-[10px] text-slate-400 font-medium mt-0.5">
              {schedules.length} schedule{schedules.length !== 1 ? 's' : ''} configured
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="text-xs font-semibold text-purple-200 hover:text-white bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 rounded-full px-4 py-2 transition-all flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>{showCreateForm ? 'Cancel' : 'New Schedule'}</span>
        </button>
      </div>

      {/* Create Form */}
      {showCreateForm && (
        <CreateScheduleForm
          repoId={repoId}
          ref={formRef}
          onCreated={() => {
            setShowCreateForm(false)
            refreshSchedules()
          }}
          onCancel={() => setShowCreateForm(false)}
        />
      )}

      {/* Empty State */}
      {!isLoading && schedules.length === 0 && (
        <div className="text-center py-12 space-y-3">
          <Clock className="w-10 h-10 text-slate-500/50 mx-auto" />
          <p className="text-sm text-slate-400 font-medium">No scheduled reports yet</p>
          <p className="text-xs text-slate-500">
            Create a schedule to automatically generate and deliver health reports on a recurring
            basis.
          </p>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-12 space-y-2">
          <RefreshCw className="w-6 h-6 text-purple-400 animate-spin mx-auto" />
          <p className="text-xs text-slate-400 animate-pulse">Loading schedules...</p>
        </div>
      )}

      {/* Schedule Cards */}
      {schedules.map((schedule) => (
        <ScheduleCard
          key={schedule.id}
          schedule={schedule}
          repoId={repoId}
          isExpanded={expandedScheduleId === schedule.id}
          onToggleExpand={() =>
            setExpandedScheduleId(expandedScheduleId === schedule.id ? null : schedule.id)
          }
          onToggle={() => handleToggle(schedule.id)}
          onTrigger={() => handleTrigger(schedule.id)}
          onDelete={() => handleDelete(schedule.id)}
          onPreview={() => handlePreview(schedule.id)}
          isTriggering={triggeringId === schedule.id}
          isDeletingId={deletingId === schedule.id}
          confirmDeleteId={confirmDeleteId}
          setConfirmDeleteId={setConfirmDeleteId}
          previewScheduleId={previewScheduleId}
          previewData={previewData}
          previewLoading={previewLoading}
        />
      ))}
    </div>
  )
}

/* ---------------------------------------------------------------------- */
/* Create Schedule Form                                                    */
/* ---------------------------------------------------------------------- */

const CreateScheduleForm = forwardRef<
  HTMLFormElement,
  {
    repoId: number
    onCreated: () => void
    onCancel: () => void
  }
>(function CreateScheduleForm({ repoId, onCreated, onCancel }, ref) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [useCustomCron, setUseCustomCron] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const name = (formData.get('name') as string)?.trim()
    const cronExpression = (formData.get('cron_expression') as string)?.trim()
    const reportType = formData.get('report_type') as string
    const webhookUrl = (formData.get('webhook_url') as string)?.trim() || undefined
    const webhookSecret = (formData.get('webhook_secret') as string)?.trim() || undefined
    const notificationEmail = (formData.get('notification_email') as string)?.trim() || undefined

    if (!name) {
      setError('Schedule name is required')
      setIsSubmitting(false)
      return
    }
    if (!cronExpression) {
      setError('Cron expression is required')
      setIsSubmitting(false)
      return
    }

    try {
      await createReportSchedule(repoId, {
        name,
        cron_expression: cronExpression,
        report_type: reportType,
        webhook_url: webhookUrl,
        webhook_secret: webhookSecret,
        notification_email: notificationEmail,
      })
      onCreated()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create schedule')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      ref={ref}
      onSubmit={handleSubmit}
      className="bg-white/[0.03] border border-white/10 rounded-[24px] p-5 space-y-4"
    >
      <div className="flex items-center justify-between">
        <h4 className="font-head text-xs font-bold text-purple-300 uppercase tracking-wider">
          Create New Report Schedule
        </h4>
      </div>

      {error && (
        <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-3 text-rose-300 text-xs flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Schedule Name */}
        <div className="space-y-1.5">
          <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            Schedule Name
          </label>
          <input
            name="name"
            type="text"
            placeholder="Weekly Health Report"
            className="w-full glass-panel bg-[#0d0f18]/80 text-white text-xs px-3.5 py-2.5 rounded-xl border border-white/10 focus:border-purple-500/50 outline-none placeholder:text-slate-500"
          />
        </div>

        {/* Report Type */}
        <div className="space-y-1.5">
          <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            Report Type
          </label>
          <div className="relative">
            <select
              name="report_type"
              className="w-full appearance-none glass-panel bg-[#0d0f18]/80 text-white text-xs px-3.5 py-2.5 rounded-xl border border-white/10 focus:border-purple-500/50 outline-none cursor-pointer pr-8"
            >
              <option value="health_summary">Health Summary</option>
              <option value="dora_metrics">DORA Metrics</option>
              <option value="team_health">Team Health</option>
              <option value="full_analysis">Full Analysis</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Cron Expression */}
        <div className="space-y-1.5">
          <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            Schedule
          </label>
          {!useCustomCron ? (
            <div className="relative">
              <select
                name="cron_expression"
                className="w-full appearance-none glass-panel bg-[#0d0f18]/80 text-white text-xs px-3.5 py-2.5 rounded-xl border border-white/10 focus:border-purple-500/50 outline-none cursor-pointer pr-8"
              >
                {CRON_PRESETS.map((preset) => (
                  <option key={preset.value} value={preset.value}>
                    {preset.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          ) : (
            <input
              name="cron_expression"
              type="text"
              placeholder="0 9 * * MON"
              className="w-full font-mono glass-panel bg-[#0d0f18]/80 text-white text-xs px-3.5 py-2.5 rounded-xl border border-white/10 focus:border-purple-500/50 outline-none placeholder:text-slate-500"
            />
          )}
          <button
            type="button"
            onClick={() => setUseCustomCron(!useCustomCron)}
            className="text-[10px] text-purple-300 hover:text-purple-200 font-medium transition-colors"
          >
            {useCustomCron ? 'Use preset' : 'Custom cron expression'}
          </button>
        </div>
      </div>

      {/* Webhook Configuration */}
      <div className="border-t border-white/5 pt-4 space-y-4">
        <div className="flex items-center gap-2">
          <Bell className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            Delivery & Notifications
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-[10px] text-slate-400 font-semibold">
              <Globe className="w-3 h-3 inline mr-1" />
              Webhook URL (optional)
            </label>
            <input
              name="webhook_url"
              type="url"
              placeholder="https://hooks.slack.com/services/..."
              className="w-full font-mono glass-panel bg-[#0d0f18]/80 text-white text-[11px] px-3.5 py-2.5 rounded-xl border border-white/10 focus:border-purple-500/50 outline-none placeholder:text-slate-500"
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-[10px] text-slate-400 font-semibold">
              <Shield className="w-3 h-3 inline mr-1" />
              Webhook Secret (optional)
            </label>
            <input
              name="webhook_secret"
              type="password"
              placeholder="HMAC signing secret"
              className="w-full font-mono glass-panel bg-[#0d0f18]/80 text-white text-[11px] px-3.5 py-2.5 rounded-xl border border-white/10 focus:border-purple-500/50 outline-none placeholder:text-slate-500"
            />
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <label className="block text-[10px] text-slate-400 font-semibold">
              <Mail className="w-3 h-3 inline mr-1" />
              Notification Email (optional)
            </label>
            <input
              name="notification_email"
              type="email"
              placeholder="team@example.com"
              className="w-full glass-panel bg-[#0d0f18]/80 text-white text-xs px-3.5 py-2.5 rounded-xl border border-white/10 focus:border-purple-500/50 outline-none placeholder:text-slate-500"
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="text-xs font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-4 py-2 transition-all"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="text-xs font-semibold text-white bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 rounded-full px-5 py-2 transition-all flex items-center gap-1.5 disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <RefreshCw className="w-3 h-3 animate-spin" />
              Creating...
            </>
          ) : (
            <>
              <Plus className="w-3 h-3" />
              Create Schedule
            </>
          )}
        </button>
      </div>
    </form>
  )
})

/* ---------------------------------------------------------------------- */
/* Schedule Card                                                           */
/* ---------------------------------------------------------------------- */

function ScheduleCard({
  schedule,
  repoId,
  isExpanded,
  onToggleExpand,
  onToggle,
  onTrigger,
  onDelete,
  onPreview,
  isTriggering,
  isDeletingId,
  confirmDeleteId,
  setConfirmDeleteId,
  previewScheduleId,
  previewData,
  previewLoading,
}: {
  schedule: ReportSchedule
  repoId: number
  isExpanded: boolean
  onToggleExpand: () => void
  onToggle: () => void
  onTrigger: () => void
  onDelete: () => void
  onPreview: () => void
  isTriggering: boolean
  isDeletingId: boolean
  confirmDeleteId: number | null
  setConfirmDeleteId: (id: number | null) => void
  previewScheduleId: number | null
  previewData: ReportPreview | null
  previewLoading: boolean
}) {
  const color = REPORT_TYPE_COLORS[schedule.report_type] || 'emerald'
  const typeLabel = REPORT_TYPE_LABELS[schedule.report_type] || schedule.report_type

  return (
    <div
      className={`border rounded-[20px] transition-all ${
        schedule.is_active
          ? 'border-white/5 bg-white/[0.02] hover:border-white/10'
          : 'border-white/5 bg-white/[0.01] opacity-60'
      }`}
    >
      {/* Main Row */}
      <div className="flex items-center gap-3 px-4 py-3.5">
        <button
          onClick={onToggleExpand}
          className="flex-shrink-0 text-slate-400 hover:text-white transition-colors"
          aria-label={isExpanded ? 'Collapse' : 'Expand'}
        >
          {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-head text-xs font-semibold text-white truncate">
              {schedule.name}
            </span>
            <span
              className={`text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 rounded-full border bg-${color}-500/10 text-${color}-300 border-${color}-500/20`}
              style={{
                backgroundColor: `color-mix(in srgb, var(--tw-${color}-500, #888) 10%, transparent)`,
                color: `var(--tw-${color}-300, #bbb)`,
                borderColor: `color-mix(in srgb, var(--tw-${color}-500, #888) 20%, transparent)`,
              }}
            >
              {typeLabel}
            </span>
            {schedule.is_active ? (
              <span className="text-[9px] font-bold text-emerald-300 bg-emerald-500/10 px-1.5 py-0.5 rounded-full border border-emerald-500/20">
                ACTIVE
              </span>
            ) : (
              <span className="text-[9px] font-bold text-slate-400 bg-white/5 px-1.5 py-0.5 rounded-full border border-white/5">
                PAUSED
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 mt-1 text-[10px] text-slate-500 font-medium">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {schedule.cron_description}
            </span>
            {schedule.next_run_at && (
              <span className="flex items-center gap-1">
                <Timer className="w-3 h-3" />
                Next: {new Date(schedule.next_run_at).toLocaleString()}
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={onPreview}
            className={`p-2 rounded-xl transition-all text-xs ${
              previewScheduleId === schedule.id
                ? 'bg-purple-500/20 text-purple-300'
                : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
            title="Preview report output"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onTrigger}
            disabled={isTriggering}
            className="p-2 rounded-xl bg-white/5 text-emerald-400 hover:bg-emerald-500/10 transition-all disabled:opacity-50"
            title="Run report now"
          >
            {isTriggering ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Play className="w-3.5 h-3.5" />
            )}
          </button>
          <button
            onClick={onToggle}
            className="p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all"
            title={schedule.is_active ? 'Pause schedule' : 'Activate schedule'}
          >
            {schedule.is_active ? (
              <Pause className="w-3.5 h-3.5" />
            ) : (
              <Play className="w-3.5 h-3.5" />
            )}
          </button>
          {confirmDeleteId === schedule.id ? (
            <div className="flex items-center gap-1 bg-rose-500/10 rounded-xl px-2 py-1 border border-rose-500/20">
              <button
                onClick={onDelete}
                disabled={isDeletingId}
                className="text-[10px] font-bold text-rose-300 hover:text-rose-200 transition-colors"
              >
                {isDeletingId ? '...' : 'Confirm'}
              </button>
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="text-[10px] font-bold text-slate-400 hover:text-white transition-colors ml-1"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setConfirmDeleteId(schedule.id)}
              className="p-2 rounded-xl bg-white/5 text-slate-400 hover:text-rose-300 hover:bg-rose-500/10 transition-all"
              title="Delete schedule"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Preview Panel */}
      {previewScheduleId === schedule.id && (
        <div className="px-4 pb-3">
          <div className="bg-white/[0.03] rounded-xl border border-white/5 p-4 space-y-2">
            <div className="flex items-center gap-2 text-[10px] text-purple-300 font-bold uppercase tracking-wider">
              <Eye className="w-3 h-3" />
              Report Preview
            </div>
            {previewLoading ? (
              <div className="text-center py-4">
                <RefreshCw className="w-4 h-4 text-purple-400 animate-spin mx-auto" />
              </div>
            ) : previewData ? (
              <div className="space-y-2">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { label: 'Commits', value: previewData.summary.total_commits },
                    { label: 'Contributors', value: previewData.summary.unique_contributors },
                    {
                      label: 'Insertions',
                      value: `+${previewData.summary.total_insertions.toLocaleString()}`,
                    },
                    { label: 'Churn Rate', value: `${previewData.summary.churn_rate_percent}%` },
                  ].map((item) => (
                    <div key={item.label} className="bg-white/5 rounded-lg p-2 text-center">
                      <div className="text-[10px] text-slate-400">{item.label}</div>
                      <div className="text-sm font-bold text-white mt-0.5">{item.value}</div>
                    </div>
                  ))}
                </div>
                {previewData.latest_commit && (
                  <div className="flex items-center gap-2 text-[10px] text-slate-500">
                    <span className="font-mono text-purple-300">
                      {previewData.latest_commit.sha.slice(0, 7)}
                    </span>
                    <span className="truncate">{previewData.latest_commit.message}</span>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </div>
      )}

      {/* Expanded Details */}
      {isExpanded && <ExpandedScheduleDetails repoId={repoId} schedule={schedule} />}
    </div>
  )
}

/* ---------------------------------------------------------------------- */
/* Expanded Schedule Details with Delivery History                         */
/* ---------------------------------------------------------------------- */

function ExpandedScheduleDetails({
  repoId,
  schedule,
}: {
  repoId: number
  schedule: ReportSchedule
}) {
  const { data: deliveryData, isLoading: deliveriesLoading } = useSWR(
    repoId ? ['report-deliveries', repoId, schedule.id] : null,
    () => getReportDeliveries(repoId, schedule.id, 10, 0)
  )

  const deliveries = deliveryData?.deliveries || []

  return (
    <div className="px-4 pb-4 space-y-4 border-t border-white/5 pt-3">
      {/* Schedule Config */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <InfoCell
          label="Cron"
          value={schedule.cron_expression}
          icon={<Clock className="w-3 h-3" />}
        />
        <InfoCell label="Timezone" value={schedule.timezone} icon={<Globe className="w-3 h-3" />} />
        <InfoCell
          label="Failures"
          value={`${schedule.consecutive_failures} / ${schedule.max_retry_count}`}
          icon={<AlertTriangle className="w-3 h-3" />}
          isWarning={schedule.consecutive_failures > 0}
        />
        <InfoCell
          label="Last Status"
          value={schedule.last_delivery_status || 'none'}
          icon={
            schedule.last_delivery_status === 'success' ? (
              <CheckCircle2 className="w-3 h-3" />
            ) : (
              <XCircle className="w-3 h-3" />
            )
          }
          isWarning={schedule.last_delivery_status === 'failed'}
        />
      </div>

      {/* Delivery Meta */}
      <div className="flex items-center gap-4 text-[10px] text-slate-500">
        {schedule.webhook_url && (
          <span className="flex items-center gap-1">
            <Bell className="w-3 h-3" />
            Webhook configured
          </span>
        )}
        {schedule.notification_email && (
          <span className="flex items-center gap-1">
            <Mail className="w-3 h-3" />
            {schedule.notification_email}
          </span>
        )}
        <span className="flex items-center gap-1">
          <Zap className="w-3 h-3" />
          Narrative: {schedule.include_narrative ? 'included' : 'excluded'}
        </span>
      </div>

      {/* Delivery History */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
          <History className="w-3 h-3" />
          Recent Deliveries
        </div>
        {deliveriesLoading ? (
          <div className="text-center py-4">
            <RefreshCw className="w-4 h-4 text-slate-400 animate-spin mx-auto" />
          </div>
        ) : deliveries.length === 0 ? (
          <p className="text-[10px] text-slate-500 py-2">
            No deliveries yet. Trigger a run to see results here.
          </p>
        ) : (
          <div className="space-y-1.5">
            {deliveries.map((d: ReportDelivery) => (
              <DeliveryRow key={d.id} delivery={d} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

/* ---------------------------------------------------------------------- */
/* InfoCell                                                                */
/* ---------------------------------------------------------------------- */

function InfoCell({
  label,
  value,
  icon,
  isWarning,
}: {
  label: string
  value: string
  icon: React.ReactNode
  isWarning?: boolean
}) {
  return (
    <div className="bg-white/5 rounded-xl p-3 border border-white/5">
      <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-medium">
        <span className={isWarning ? 'text-amber-400' : 'text-purple-300'}>{icon}</span>
        {label}
      </div>
      <div
        className={`text-xs font-mono font-semibold mt-1 ${
          isWarning ? 'text-amber-300' : 'text-white'
        }`}
      >
        {value}
      </div>
    </div>
  )
}

/* ---------------------------------------------------------------------- */
/* DeliveryRow                                                             */
/* ---------------------------------------------------------------------- */

function DeliveryRow({ delivery }: { delivery: ReportDelivery }) {
  return (
    <div className="flex items-center justify-between gap-3 bg-white/[0.03] rounded-lg px-3 py-2 border border-white/5">
      <div className="flex items-center gap-3 min-w-0">
        {delivery.status === 'success' ? (
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
        ) : delivery.status === 'failed' ? (
          <XCircle className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" />
        ) : (
          <RefreshCw className="w-3.5 h-3.5 text-slate-400 animate-spin flex-shrink-0" />
        )}
        <div className="min-w-0">
          <div className="text-[11px] text-slate-200 font-medium truncate">
            Delivery #{delivery.id}
            {delivery.snapshot_latest_sha && (
              <span className="font-mono text-slate-500 ml-2">
                {delivery.snapshot_latest_sha.slice(0, 7)}
              </span>
            )}
          </div>
          {delivery.error_message && (
            <div className="text-[10px] text-rose-300/70 truncate mt-0.5">
              {delivery.error_message}
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-3 flex-shrink-0 text-[10px] text-slate-500">
        {delivery.duration_seconds !== null && <span>{delivery.duration_seconds.toFixed(1)}s</span>}
        {delivery.webhook_status_code && (
          <span
            className={`font-mono ${
              delivery.webhook_status_code < 300 ? 'text-emerald-400' : 'text-rose-400'
            }`}
          >
            HTTP {delivery.webhook_status_code}
          </span>
        )}
        <span>
          {delivery.triggered_at ? new Date(delivery.triggered_at).toLocaleString() : '—'}
        </span>
      </div>
    </div>
  )
}

export default ScheduledReportsDashboard
