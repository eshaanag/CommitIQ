CREATE TABLE IF NOT EXISTS pull_requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    repo_id INTEGER NOT NULL,
    pr_number INTEGER NOT NULL,
    title VARCHAR NOT NULL,
    state VARCHAR NOT NULL,
    author VARCHAR NOT NULL,
    created_at TIMESTAMP NOT NULL,
    first_review_at TIMESTAMP,
    merged_at TIMESTAMP,
    closed_at TIMESTAMP,
    coding_time_sec INTEGER,
    pickup_time_sec INTEGER,
    review_time_sec INTEGER,
    FOREIGN KEY(repo_id) REFERENCES repos(id) ON DELETE CASCADE,
    CONSTRAINT uq_pr_repo_number UNIQUE (repo_id, pr_number)
);

CREATE INDEX IF NOT EXISTS idx_prs_repo_created ON pull_requests (repo_id, created_at);
