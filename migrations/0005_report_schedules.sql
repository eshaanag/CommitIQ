-- Report Schedules: recurring health report scheduling
-- Report Deliveries: execution history for each scheduled report run

CREATE TABLE IF NOT EXISTS report_schedules (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    repo_id INTEGER NOT NULL REFERENCES repos(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    cron_expression VARCHAR(100) NOT NULL,
    timezone VARCHAR(50) NOT NULL DEFAULT 'UTC',
    report_type VARCHAR(50) NOT NULL DEFAULT 'health_summary',
    is_active BOOLEAN NOT NULL DEFAULT 1,
    webhook_url TEXT,
    webhook_secret VARCHAR(255),
    notification_email VARCHAR(255),
    include_narrative BOOLEAN NOT NULL DEFAULT 0,
    last_run_at TIMESTAMP,
    next_run_at TIMESTAMP,
    last_delivery_status VARCHAR(20),
    consecutive_failures INTEGER NOT NULL DEFAULT 0,
    max_retry_count INTEGER NOT NULL DEFAULT 3,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_report_schedules_repo ON report_schedules(repo_id);
CREATE INDEX IF NOT EXISTS idx_report_schedules_next_run ON report_schedules(next_run_at, is_active);

CREATE TABLE IF NOT EXISTS report_deliveries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    schedule_id INTEGER NOT NULL REFERENCES report_schedules(id) ON DELETE CASCADE,
    repo_id INTEGER NOT NULL REFERENCES repos(id) ON DELETE CASCADE,
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    report_type VARCHAR(50) NOT NULL,
    triggered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,
    duration_seconds FLOAT,
    report_payload TEXT,
    webhook_status_code INTEGER,
    webhook_response_body TEXT,
    error_message TEXT,
    retry_count INTEGER NOT NULL DEFAULT 0,
    snapshot_health_score FLOAT,
    snapshot_commits_analyzed INTEGER,
    snapshot_latest_sha VARCHAR(40)
);

CREATE INDEX IF NOT EXISTS idx_report_deliveries_schedule ON report_deliveries(schedule_id);
CREATE INDEX IF NOT EXISTS idx_report_deliveries_repo_time ON report_deliveries(repo_id, triggered_at);
