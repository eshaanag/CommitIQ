<div align="center">
  <h1>CommitIQ</h1>
  <p><strong>Repository health intelligence for professional engineering teams.</strong></p>

[![CI](https://github.com/eshaanag/CommitIQ/actions/workflows/ci.yml/badge.svg)](https://github.com/eshaanag/CommitIQ/actions/workflows/ci.yml)
[![CodeQL](https://github.com/eshaanag/CommitIQ/actions/workflows/codeql.yml/badge.svg)](https://github.com/eshaanag/CommitIQ/actions/workflows/codeql.yml)
[![codecov](https://codecov.io/gh/eshaanag/CommitIQ/branch/main/graph/badge.svg)](https://codecov.io/gh/eshaanag/CommitIQ)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Discord](https://img.shields.io/discord/1234567890?label=Discord&logo=discord&color=5865F2)](https://discord.gg/commitiq)
</div>

<br />

CommitIQ analyzes a repository's commit history and turns raw engineering activity into actionable maintainability signals: **complexity**, **churn**, **dependency risk**, **semantic drift**, **ownership concentration**, and **AI-generated commit narratives**.

## 🚀 Why CommitIQ?

Most GitHub dashboards show activity. CommitIQ focuses on **code health**. It helps developers and maintainers answer critical questions:

- Which files are becoming risky over time?
- Where is churn hiding architectural debt?
- Which parts of the repo depend too heavily on one contributor?
- What changed across a period of commits, in plain English?
- Which hotspots deserve review before the next release?

---

## ⚡ Demo

Try the live application: [**https://commit-iq-iota.vercel.app**](https://commit-iq-iota.vercel.app)

---

## ✨ Features

- **Holistic Health Timelines:** Built from complexity, churn, dependency, semantic, and ownership signals.
- **Architectural Discovery:** Import and co-change graph exploration for architectural risk discovery.
- **Risk Dashboards:** Hotspot and bus-factor views for maintainability and ownership risk.
- **AI Narratives:** Claude/Gemini-generated narratives with cache, budget controls, and demo fallbacks.
- **Enterprise-Grade CI/CD:** Covered by Pytest, Vitest, CodeQL Security Scanning, Codecov, and strict pre-commit hooks.
- **Beautiful UI:** Light/dark React dashboard with Vite, SWR, Recharts, and Force Graph tooling.

---

## 🛠️ Tech Stack

| Area               | Stack                                                           |
| :----------------- | :-------------------------------------------------------------- |
| **Backend**        | FastAPI, SQLAlchemy Async ORM, SQLite (default) / Postgres      |
| **Analysis**       | GitPython, git subprocesses, radon, lizard, custom graphs       |
| **Semantic Drift** | difflib fallback, GraphCodeBERT (optional)                      |
| **AI Layer**       | Anthropic Claude, Google Gemini fallback                        |
| **Frontend**       | React, TypeScript, Vite, SWR, Recharts, react-force-graph-2d    |
| **Quality**        | Pytest, Vitest, ESLint, CodeQL, Codecov, Pre-commit, Playwright |

---

## 💻 Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/eshaanag/CommitIQ.git
cd CommitIQ
```

### 2. Backend Setup

```bash
cp .env.example .env
python -m venv .venv
source .venv/bin/activate
pip install -r backend/requirements.txt
uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
```

### 3. Frontend Setup

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

The frontend runs at `http://localhost:5173`.

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details on setting up your environment, running tests, and our pull request process.

Before pushing, please ensure you have our pre-commit hooks installed:

```bash
pip install pre-commit
pre-commit install
```

### Contributors

Thanks goes to these wonderful people who have contributed to CommitIQ:

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/eshaanag"><img src="https://avatars.githubusercontent.com/u/10000000?v=4" width="100px;" alt="Eshaan Agrawal"/><br /><sub><b>Eshaan Agrawal</b></sub></a><br /><a href="https://github.com/eshaanag/CommitIQ/commits?author=eshaanag" title="Code">💻</a> <a href="#design-eshaanag" title="Design">🎨</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/PrathamReddy888"><img src="https://avatars.githubusercontent.com/u/10000001?v=4" width="100px;" alt="Pratham Reddy"/><br /><sub><b>Pratham Reddy</b></sub></a><br /><a href="https://github.com/eshaanag/CommitIQ/commits?author=PrathamReddy888" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/adityakryadav"><img src="https://avatars.githubusercontent.com/u/10000002?v=4" width="100px;" alt="Aditya Yadav"/><br /><sub><b>Aditya Yadav</b></sub></a><br /><a href="https://github.com/eshaanag/CommitIQ/commits?author=adityakryadav" title="Code">💻</a></td>
    </tr>
  </tbody>
</table>
<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

---

## 📚 Documentation

- [PROJECT_BRAIN.md](PROJECT_BRAIN.md) - Architecture, decisions, risks, and history.
- [REPO_HEALTH_METRICS.md](docs/REPO_HEALTH_METRICS.md) - Health signals and metrics design.
- [SECURITY.md](SECURITY.md) - Vulnerability reporting and operator security.

## 📄 License

This project is licensed under the [MIT License](LICENSE).
