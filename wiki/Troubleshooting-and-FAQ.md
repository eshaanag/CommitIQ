# Troubleshooting & Frequently Asked Questions (FAQ)

Technical reference for debugging common errors, concurrency bottlenecks, and operational scenarios.

---

## Frequently Asked Questions

### 1. How is the repository health score computed?

The composite health score (0–100) is calculated as a bounded aggregation across 6 normalized signals:

- **Cyclomatic Complexity (30%)**: Exponential decay function mapped to average McCabe complexity.
- **Churn Volatility (25%)**: Ratio of modified lines relative to total codebase size over time.
- **Ownership Concentration / Bus Factor (20%)**: Penalizes reliance on isolated individual contributors.
- **Dependency & Co-Change Coupling (10%)**: Measures architectural inter-module sprawl and coupling density.
- **Semantic Drift (10%)**: Evaluates divergence between diff text and commit intentions.
- **Documentation Ratio (5%)**: Assesses comment density and structural inline documentation.

### 2. Can CommitIQ analyze private repositories?

Yes. When self-hosting or running locally, set the `GITHUB_TOKEN` environment variable with a personal access token possessing `repo` read scopes:

```bash
export GITHUB_TOKEN="ghp_yourPersonalAccessToken"
```

### 3. Which languages are supported for AST complexity calculation?

CommitIQ employs a hybrid AST and lexical analysis pipeline (integrating Radon and Lizard), supporting:

- Python, JavaScript, TypeScript, JSX, TSX
- Go, Rust, Java, C, C++, C#, Swift, Kotlin, Ruby, PHP

---

## Troubleshooting Guide

### "SQLite database is locked (`sqlite3.OperationalError`)"

- **Root Cause**: High concurrency during simultaneous repository ingestion jobs competing for SQLite write locks.
- **Resolution**: CommitIQ implements automatic transaction retries via `commit_with_retry(session, max_attempts=3)`. For high-throughput environments, configure PostgreSQL using `DATABASE_URL=postgresql+asyncpg://user:pass@host:5432/commitiq`.

### "Git clone network timeout"

- **Root Cause**: Large repository histories (>50,000 commits) on slow connections.
- **Resolution**: Specify the `max_commits` parameter (e.g. `max_commits=100` or `max_commits=500`) to perform a bounded, shallow historical clone.

### "AI narrative generation returns fallback template"

- **Root Cause**: Unset or exhausted `GEMINI_API_KEY` / `ANTHROPIC_API_KEY`.
- **Resolution**: Provide a valid Google Gemini API key in your `.env` file (`GEMINI_API_KEY=your_key_here...`). CommitIQ automatically falls back to an offline deterministic template if the external AI service is unreachable.
