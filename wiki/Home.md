# CommitIQ Documentation & Wiki

CommitIQ analyzes repository commit histories and transforms raw version-control activity into actionable maintainability signals: code complexity, churn velocity, dependency risk, semantic drift, ownership concentration (Bus Factor), and AI-generated commit narratives.

---

## Documentation Index

| Section                     | Description                                                                                      |
| :-------------------------- | :----------------------------------------------------------------------------------------------- |
| **[[Architecture]]**        | System architecture, ingestion pipeline, AST parsing, graph calculation, and frontend structure. |
| **[[Metrics & Formulas      | Metrics-and-Formulas]]**                                                                         | Mathematical formulations, decay functions, and thresholds for all 6 core health signals.          |
| **[[DORA & Cycle Time       | DORA-and-Cycle-Time]]**                                                                          | DevOps delivery metrics (Deployment Frequency, Lead Time, CFR, MTTR) and cycle time phases.        |
| **[[REST API Reference      | API-Reference]]**                                                                                | Complete OpenAPI REST endpoints, query parameters, and JSON request/response schemas.              |
| **[[Developer Guide         | Developer-Guide]]**                                                                              | Local development workflow, test verification suites (Pytest, Vitest), and pull request standards. |
| **[[Deployment & Operations | Deployment-and-Operations]]**                                                                    | Vercel deployment, Docker Compose containerization, database configurations, and cron workers.     |
| **[[Troubleshooting & FAQ   | Troubleshooting-and-FAQ]]**                                                                      | Resolving operational issues, concurrency locks, and provider credentials.                         |

---

## Quick Start

### 1. Clone Repository

```bash
git clone https://github.com/eshaanag/CommitIQ.git
cd CommitIQ
```

### 2. Start Backend API Service

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r backend/requirements-dev.txt
uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
```

### 3. Start Frontend Dashboard

```bash
cd frontend
npm install
npm run dev
```

The application will be accessible at `http://localhost:5173`.
