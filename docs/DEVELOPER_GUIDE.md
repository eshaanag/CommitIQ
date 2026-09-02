# Developer Guide & Contributing Standards

This guide covers environment setup, architecture principles, testing requirements, and quality standards for contributing to CommitIQ.

---

## Core Principles

1. **Production-First Integrity**: Production code and documentation must remain strictly free of placeholder snippets, invalid badges, or mock data.
2. **Resilient Dependency Architecture**: Optional runtime libraries (such as `reportlab` for PDF generation, `redis` for caching, and `pybreaker` for circuit breaking) must be safely isolated using standard import guards (`try/except ImportError`).
3. **Automated Verification Gates**: All contributions must pass Pytest, Vitest, ESLint, Prettier formatting, and CodeQL security analysis before merging.

---

## Local Environment Setup

### Prerequisites

- Python 3.11+
- Node.js 20+ and `npm`
- Git

### 1. Backend Setup

```bash
# Create and activate virtual environment:
python -m venv .venv
source .venv/bin/activate
pip install -r backend/requirements-dev.txt

# Start backend server:
uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## Automated Verification Suite

Execute the following verification steps locally before submitting changes:

### 1. Backend Test Suite & Coverage

```bash
cd backend
python -m pytest --cov=backend
```

### 2. Frontend Test Suite

```bash
cd frontend
npm run test
```

### 3. Frontend Linting & Production Build

```bash
cd frontend
npm run lint
npm run build
```

### 4. Code Formatting

```bash
npx prettier --check .
npx prettier --write .
```

---

## Commit Conventions

Commit messages must conform to standard Conventional Commits:

- `feat(...)`: New user-facing features or metric calculations
- `fix(...)`: Bug fixes and regression repairs
- `perf(...)`: Performance optimizations and caching
- `docs(...)`: Documentation and guide updates
- `refactor(...)`: Code modifications that neither fix bugs nor add features
- `test(...)`: Adding or updating test suites
- `chore(...)`: Routine tooling, dependency, and CI configuration updates

---

## Pull Request Workflow

1. Branch naming: create a feature branch (`feat/short-description` or `fix/short-description`).
2. Verification: confirm all automated tests pass locally.
3. Changelog: add an entry to `PROJECT_BRAIN.md` summarizing the change.
4. Format: run `npx prettier --write .`.
5. Open PR: submit a pull request against `main` for automated CI review.
