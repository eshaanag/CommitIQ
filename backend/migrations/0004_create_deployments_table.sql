-- Migration 0004: Create deployments table for tracking deployment frequency
CREATE TABLE IF NOT EXISTS deployments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    repo_id INTEGER NOT NULL REFERENCES repos(id) ON DELETE CASCADE,
    provider TEXT NOT NULL DEFAULT 'gitlab',
    environment TEXT NOT NULL DEFAULT 'production',
    status TEXT NOT NULL,
    ref TEXT,
    sha TEXT,
    pipeline_id TEXT,
    deployed_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_deployments_repo_time ON deployments (repo_id, deployed_at);
