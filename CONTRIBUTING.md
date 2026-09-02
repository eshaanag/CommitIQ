# Contributing to CommitIQ

Thank you for your interest in contributing to **CommitIQ**! We warmly welcome contributions from open-source developers, including participants in **ESOC** (Extramarks Summer of Code) and **ELUSOC**.

CommitIQ turns raw GitHub repository commit history into actionable maintainability and code health signals. This project is in active development, so we prioritize **correctness, observability, and test coverage** alongside feature development.

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Local Development Setup](#local-development-setup)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Backend Setup](#2-backend-setup)
  - [3. Frontend Setup](#3-frontend-setup)
- [Running Tests](#running-tests)
  - [Backend Tests (pytest)](#backend-tests-pytest)
  - [Frontend Unit Tests (Vitest)](#frontend-unit-tests-vitest)
  - [Frontend E2E Tests (Playwright)](#frontend-e2e-tests-playwright)
- [Styling & Code Quality Guidelines](#styling--code-quality-guidelines)
  - [Python (Backend)](#python-backend)
  - [TypeScript / React (Frontend)](#typescript--react-frontend)
- [Git Branching & PR Expectations](#git-branching--pr-expectations)
  - [Branch Naming](#branch-naming)
  - [Commit Style](#commit-style)
  - [Architecture Documentation (`PROJECT_BRAIN.md`)](#architecture-documentation-project_brainmd)
  - [Anti-Spam & Contribution Limits](#anti-spam--contribution-limits)
- [Pull Request Checklist](#pull-request-checklist)

---

## Prerequisites

Before starting, ensure you have the following installed on your local system:

- **Python**: 3.11 or higher
- **Node.js**: 18.x or 20.x (LTS recommended)
- **npm**: 9.x or higher
- **Git**: 2.30+
- _(Optional)_ API keys for Anthropic Claude, Google Gemini, and GitHub for LLM narrative generation and high-rate-limit ingestion.

---

## Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/eshaanag/CommitIQ.git
cd CommitIQ
```

### 2. Backend Setup

The backend is built with FastAPI, SQLAlchemy (async ORM), and SQLite/Postgres.

1. **Create and activate a virtual environment**:

   - **Linux / macOS**:
     ```bash
     python3 -m venv .venv
     source .venv/bin/activate
     ```
   - **Windows (PowerShell)**:
     ```powershell
     python -m venv .venv
     .\.venv\Scripts\Activate.ps1
     ```

2. **Install backend dependencies**:

   ```bash
   pip install -r backend/requirements-dev.txt
   ```

3. **Configure environment variables**:

   Copy the example environment configuration file to `.env` in the root directory:

   ```bash
   cp .env.example .env
   ```

   Default `.env` configuration for local development:

   ```env
   DATABASE_URL=sqlite+aiosqlite:///./commitiq.db
   ENVIRONMENT=development
   CORS_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
   REPO_STORAGE_PATH=/tmp/commitiq_repos
   LLM_MAX_CALLS=25
   MAX_COMMITS=150
   ENABLE_SEMANTIC_ANALYSIS=true
   ENABLE_GRAPHCODEBERT=false
   # Optional Provider Keys:
   GITHUB_TOKEN=your_github_token_here
   ANTHROPIC_API_KEY=your_anthropic_api_key_here
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start the FastAPI backend server**:

   ```bash
   uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
   ```

   The backend API server will run at `http://localhost:8000` (API documentation at `http://localhost:8000/docs`).

---

### 3. Frontend Setup

The frontend is built with React 18, TypeScript, Vite, Tailwind CSS, and SWR.

1. **Navigate to the `frontend` directory**:

   ```bash
   cd frontend
   ```

2. **Configure environment variables**:

   Copy the example frontend environment file:

   ```bash
   cp .env.example .env
   ```

   Default `frontend/.env` configuration:

   ```env
   VITE_API_BASE_URL=
   VITE_DEV_API_PROXY_TARGET=http://127.0.0.1:8000
   ```

3. **Install frontend dependencies**:

   ```bash
   npm ci
   ```

4. **Start the Vite development server**:

   ```bash
   npm run dev
   ```

   The frontend dashboard will be available at `http://localhost:5173`.

---

## Running Tests

All pull requests must pass backend and frontend quality checks.

### Backend Tests (pytest)

Backend unit and integration tests use **pytest**.

- **Run all backend tests**:

  ```bash
  python -m pytest
  ```

- **Run tests with verbose output**:

  ```bash
  python -m pytest -v
  ```

- **Run a specific test file**:

  ```bash
  python -m pytest backend/tests/test_repo_ingestion_logic.py
  ```

- **Run tests matching a keyword pattern**:
  ```bash
  python -m pytest -k "health_scorer"
  ```

---

### Frontend Unit Tests (Vitest)

Frontend unit and component tests use **Vitest** and `@testing-library/react`.

- **Run unit tests once**:

  ```bash
  cd frontend
  npm run test
  ```

- **Run unit tests in watch mode**:
  ```bash
  cd frontend
  npm run test:watch
  ```

---

### Frontend E2E Tests (Playwright)

End-to-end tests use **Playwright**.

1. **Install Chromium browser binary for Playwright** (first-time setup):

   ```bash
   cd frontend
   npx playwright install chromium
   ```

2. **Run E2E tests**:
   ```bash
   cd frontend
   npm run test:e2e
   ```

---

## Styling & Code Quality Guidelines

### Python (Backend)

We enforce standard formatting using **Black** and linting with **Ruff**.

- **Black formatting** (line length 100):

  ```bash
  black --config pyproject.toml backend/
  ```

- **Ruff linting and auto-fixing**:
  ```bash
  ruff check --config pyproject.toml --fix backend/
  ```

### TypeScript / React (Frontend)

We use **Prettier** for code formatting and **ESLint** for code quality.

- **Check ESLint rules**:

  ```bash
  cd frontend
  npm run lint
  ```

- **Format frontend code with Prettier**:

  ```bash
  npx prettier --config frontend/.prettierrc --write "frontend/src/**/*.{ts,tsx,js,jsx,css}" "frontend/public/**/*"
  ```

- **Verify production TypeScript build**:
  ```bash
  cd frontend
  npm run build
  ```

---

## Git Branching & PR Expectations

### Branch Naming

Name your working branches descriptively using standard prefixes:

- `feat/feature-name`
- `fix/bug-description`
- `docs/doc-update-name`
- `refactor/component-name`
- `chore/tooling-or-dep`

### Commit Style

We use **Conventional Commits**. Please format commit titles clearly:

- `feat:` for user-visible features or functionality additions
- `fix:` for bug fixes and patches
- `test:` for adding or modifying unit, integration, or E2E tests
- `docs:` for documentation additions and updates
- `refactor:` for internal restructuring without changing behavior
- `chore:` for tooling, dependencies, and configuration changes

### Architecture Documentation (`PROJECT_BRAIN.md`)

`PROJECT_BRAIN.md` serves as the living technical brain of CommitIQ. Whenever your changes alter architecture, API contracts, database schema, risk mitigations, operational behavior, or test coverage, **you must update `PROJECT_BRAIN.md`** alongside your pull request.

### Anti-Spam & Contribution Limits

To maintain high code review quality and prevent low-effort/farmed contributions, we strictly enforce rate limits via automation:

- **Max 3 open pull requests** per contributor at a time.
- **Max 5 open issues** per contributor at a time.
- **Max 6 total items (PRs + issues combined)** opened by one contributor in a rolling 24-hour window.

Exceeding these limits will result in automated closure of newly opened items tagged with `rate-limited`. Please focus on getting existing contributions reviewed and merged before opening additional requests.

---

## Pull Request Checklist

Before submitting your pull request, verify that:

- [ ] Backend tests pass cleanly with `python -m pytest`
- [ ] Frontend unit tests pass with `npm run test`
- [ ] Frontend end-to-end tests pass with `npm run test:e2e`
- [ ] Frontend lint checks pass with `npm run lint`
- [ ] Frontend build succeeds with `npm run build`
- [ ] Code formatting adheres to Black (`pyproject.toml`) and Prettier (`.prettierrc`)
- [ ] No hardcoded API keys, secrets, database passwords, or debug statements are committed
- [ ] `PROJECT_BRAIN.md` is updated if architectural, risk, or test parameters were modified
- [ ] Commit messages follow conventional commit guidelines (`feat:`, `fix:`, `docs:`, etc.)
