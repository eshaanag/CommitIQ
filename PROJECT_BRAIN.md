# PROJECT BRAIN

## What this project is

CommitIQ is a full-stack repository health analyzer for GitHub projects. It ingests
commit history, computes complexity/churn/dependency/semantic/bus-factor signals, stores
snapshots in SQLite or Postgres, and presents an interactive React dashboard with
optional LLM-generated commit narratives streamed token-by-token over Server-Sent Events.

## Tech stack

- Backend: Python 3.11+, FastAPI, SQLAlchemy async ORM, SQLite via aiosqlite by default,
  optional Postgres via asyncpg.
- Repository analysis: GitPython, git subprocess calls, radon for Python complexity,
  lizard for JS/TS/Java/Go/C/C++ metrics, custom import/co-change graph extraction, git
  blame for bus factor.
- Semantic analysis: difflib fallback enabled by default, optional GraphCodeBERT via
  transformers and torch only when `ENABLE_GRAPHCODEBERT=true`.
- LLM layer: Anthropic Claude first, Google Gemini fallback, pybreaker circuit breaker,
  persisted narrative cache, per-repo cost/call guard, and SSE token streaming on both
  `/explain/stream` and `/predict/stream` endpoints.
- Frontend: React 18, TypeScript, Vite, SWR, axios, Recharts, react-force-graph-2d,
  d3-force, lucide-react, Tailwind CSS-style utility classes plus custom CSS tokens,
  Vitest, and Playwright.
- Deployment/config: backend `.env.example`, frontend `.env.example`, frontend lockfile,
  GitHub Actions CI/governance checks including Chromium e2e, contribution/security
  templates, Dependabot config, CODEOWNERS, and GitHub issue/PR templates are checked in;
  no Dockerfile, backend lockfile, or deployment manifest exists yet.

## Architecture overview

- `backend/main.py` creates the FastAPI app, initializes database schema and SQL
  migrations on lifespan startup, configures CORS, and mounts repo ingestion, metrics,
  reports, and LLM routers under `/api`.
- `backend/config.py` loads environment variables, normalizes database URLs, creates repo
  storage, and exposes operational settings including `ANTHROPIC_API_KEY`,
  `GEMINI_API_KEY`, `LLM_MAX_CALLS`, and `LLM_BUDGET_PER_REPO_USD`.
- `backend/shared/models.py` defines repos, commits, health snapshots, graph nodes/edges,
  bus factor rows, LLM narratives, ingestion jobs, pull requests, and deployments.
- Repo ingestion starts at `POST /api/repos/ingest`, validates a GitHub URL, creates/
  updates a `Repo` and `AnalysisJob`, then runs `run_ingestion` as a FastAPI background
  task.
- Ingestion clones a shallow single-branch repo, walks commits oldest-to-newest, checks
  out each commit, extracts file metrics and semantic drift, builds import and co-change
  graph rows, computes explainable health snapshots with risk reasons and hotspot
  persistence, computes bus factor at HEAD, and marks the repo ready/error.
- The frontend entry is `frontend/src/App.tsx`, with routes for landing, ingestion
  progress, dashboard, commit detail, demo redirect, and 404.
- Frontend data flow uses `frontend/src/lib/api.ts` for REST/SSE/fetch calls and SWR in
  dashboard/detail views. The landing page starts ingestion; the analyze page streams job
  progress; dashboard and detail pages read persisted snapshots/graphs/narratives.
- `frontend/e2e/landing-to-dashboard.spec.ts` runs the frontend flow in Chromium with
  deterministic REST/SSE interception, while backend API tests cover the corresponding
  server contracts.
- LLM narratives are requested on demand from `NarrativeCard`, streamed token-by-token
  over `/api/explain/stream` (or `/api/predict/stream` for merge predictions), cached in
  `llm_narratives`, seeded into Redis for fast replay, and summarized in the cost meter
  with billable provider rows separated from demo/pre-cached rows. When provider keys are
  absent or a provider call fails, the stream returns a deterministic demo-mode narrative
  instead of a failure card.

## Current state assessment

Working well:

- Clear product concept with a coherent end-to-end flow: enter GitHub repo, ingest, view health timeline, inspect commit graph, review hotspots/bus-factor, generate narratives.
- Graph Explorer node labels use measured, width-bounded ellipsis rendering with focused boundary and Unicode coverage.
- Backend has structured schemas/models and separates ingestion, analysis, graph, bus factor, semantic, and LLM concerns.
- LLM cost guard, cache, and streaming are part of the domain model, which is the right production instinct.
- The UI has loading/error/empty states in many places and exposes high-value analysis concepts rather than raw tables only.
- Removed dead compute_health_score function from metrics_extractor.py; health scoring now lives exclusively in health_scorer.py, eliminating duplicate logic.
- SSE streaming endpoints share a single code path via extracted helpers (`_resolve_commit`, `_build_before_after`, `_replay_cached_stream`, `_generate_live_stream`, `_sse`) so `/explain/stream` and `/predict/stream` stay in sync.

Incomplete or fragile:

- Test runner config, focused backend/frontend tests, a real-browser frontend e2e, a
  frontend lockfile, and CI quality gates now exist; backend dependency locking is still
  absent.
- A tracked SQL migration workflow now exists with `schema_migrations` applied-file
  tracking, but there are not yet model-changing migration files because the current
  schema is still bootstrapped from SQLAlchemy metadata.
- Backend ingestion performs long CPU/disk/network work inside FastAPI `BackgroundTasks`;
  active duplicate submissions now reuse the existing job and users can request
  cooperative cancellation, but restarts and production scaling remain fragile.
- Graph and health metrics are often based only on files changed in each commit, not a
  stable whole-repo snapshot, so dashboard labels can overstate "codebase" health.
- Frontend Tailwind tokens now have checked-in PostCSS/Tailwind config, so production
  builds emit real utility CSS instead of raw `@tailwind` directives.
- Demo flow now runs live bounded analysis, but still lacks a fast fixture-backed offline
  demo.

## User flows (as-is)

- New analysis: user opens `/`, enters a GitHub URL or `owner/repo`, optionally sets max
  commits, submits, then lands on `/analyze?repo_id=...`.
- Ingestion progress: `/analyze` opens an EventSource to
  `/api/repos/ingest/progress/{repo_id}`, displays clone/analyze/bus-factor/finalize
  progress, allows cancellation through `/api/repos/ingest/cancel/{repo_id}`, then
  redirects to `/dashboard/{repo_slug}` when ready.
- Dashboard: user views latest health score, commit timeline, recent commit list,
  selected commit metrics, top risk reasons, persistent hotspots, graph explorer, bus
  factor table, hotspot map, and LLM cost meter.
- Commit selection: user can select commits from the timeline/list or step through graph
  playback. Commit detail route shows metadata, metrics, graph, structural diff vs previous
  commit, and narrative controls.
- Narrative generation: user clicks the narrative card, frontend calls
  `streamNarrative()` which POSTs to `/api/explain/stream` and consumes the SSE response
  via `fetch` + `ReadableStream.getReader()` + `TextDecoder`, appending each `token`
  chunk to the UI. On `done: true`, the terminal chunk's `explanation` overwrites partial
  accumulation so the rendered text matches exactly what the backend persisted. Without
  Claude/Gemini keys, the same stream returns and caches a zero-cost demo-mode
  explanation from static metrics.
- Demo: `/demo` starts a bounded `facebook/react` analysis and then routes to the normal
  analysis progress page.

## Identified problems (root causes, not symptoms)

- Verification breadth: unit, integration, route smoke, one real-browser frontend e2e,
  and HTTP-level SSE streaming integration tests now protect the main flow, but there is
  no staging test that performs a live GitHub clone and backend ingestion.
- Backend dependency reproducibility: the frontend lockfile is committed, but broad
  Python requirement ranges and no backend lock tooling mean backend installs can still
  drift.
- No production ingestion boundary: FastAPI background tasks are not a durable job
  system. Active job reuse and cooperative cancellation reduce user-facing harm, but long
  repo analysis is still tied to a web worker process lifecycle.
- Schema evolution gap: the project now has a tracked SQL migration runner, but future
  model changes still need explicit migration files and review discipline.
- Metric contract ambiguity: names like "codebase health" are presented broadly, but many
  calculations operate on commit-touched files and shallow clone data. Risk reasons and
  hotspot persistence now make the score more explainable, but the snapshot scope still
  needs clearer product labeling.
- Semantic analysis model risk is now gated: lightweight difflib drift remains enabled by
  default, while GraphCodeBERT requires explicit `ENABLE_GRAPHCODEBERT=true`; operators
  still need to plan ML cache/storage before enabling it.
- Security/abuse surface: ingestion clones arbitrary public GitHub repositories and runs
  git commands over repo contents; URL validation and max-commit caps are now stronger,
  but storage quotas, concurrency controls, and operational limits still need hardening.
- API/base URL behavior is now deployment-safe by default: frontend calls same-origin
  `/api`, with optional `VITE_API_BASE_URL` for separate API origins and a Vite dev proxy
  target for local development.
- UI maintainability drift: Tailwind token configuration and one browser e2e now exist,
  but heavy one-off styling still makes visual regressions likely without broader
  route-level visual coverage.

## Discovered issues

- Medium: shutil.rmtree raised PermissionError on Windows when deleting read-only .git
  files; it now uses a custom onerror handler to clear the readonly bit.
- Medium: commit author name/email could be None or empty for malformed commits
  (shallow-clone boundaries, VCS-imported histories, plumbing-created commits), crashing
  downstream Pydantic models and DB inserts. The commit walker now falls back to
  "Unknown" / "unknown@example.com" and logs the substitution (#266).
- High: clone_service and router used synchronous subprocesses that blocked the FastAPI
  event loop; they are now fully asynchronous.
- High: no deployment health gate; CI now exists for unit/e2e tests, lint, build, and
  repository hygiene checks on pushes and pull requests.
- High: npm audit previously reported 9 frontend dependency vulnerabilities; dependency
  upgrades now leave `npm audit --audit-level=moderate` clean as of 2026-06-04.
- High: migration workflow now exists, but no model-changing migration files have been
  needed or authored yet.
- High: demo route no longer depends on missing seeded data; it now starts a bounded
  `facebook/react` analysis, but a true instant fixture demo is still not available.
- High: live scan regressions around SQLite timestamp duration math, stale selected
  commits after rescans, and progress-stream disconnect handling were fixed and verified
  against a real `octocat/Hello-World` browser scan on 2026-06-07.
- Medium: route-level code splitting reduced the initial frontend JS chunk to about 168
  kB; dashboard and narrative code are now separate chunks.
- Medium: backend startup now logs database initialization through the module logger;
  broader request/job observability is still limited.
- Medium: production CORS now requires explicit `CORS_ORIGINS`; local development still
  gets localhost defaults when not in production.
- Medium: `CORS_ORIGINS=""` (empty string) in `.env` was treated as "explicitly set" and
  returned `[]`, silently blocking all cross-origin requests in development. Fixed in
  #264: empty/whitespace values now fall back to localhost defaults in dev, and dev
  environments always merge localhost defaults with any explicit origins.
- Medium: LLM usage accounting now separates billable provider rows from pre-cached/demo
  rows; runtime cache-hit telemetry is still not persisted separately from narrative rows.
- Medium: GraphCodeBERT model loading is now opt-in; deployments that enable it still
  need explicit model cache/storage planning.
- Medium: shallow clone plus per-commit checkout can fail or produce incomplete stats
  around boundary commits and deleted/renamed files.
- Medium: `stream_narrative` previously raised `RuntimeError` when no provider API keys
  were configured, breaking the SSE endpoint's contract of always emitting a terminal
  chunk. Now catches `RuntimeError` and yields a degraded fallback message with
  `LLMProvider.NONE` so the stream completes gracefully (#394).
- Medium: router had lazy `from ... import get_cached_narrative` statements inside
  endpoint functions, making the cache helpers unpatchable from tests. Moved to
  module-level imports so `monkeypatch.setattr("backend.features.llm_analysis.router.get
_cached_narrative", ...)` works (#394).

## Feature analysis

Exists:

- GitHub URL ingestion, shallow clone, commit walk, metric extraction, health scoring,
  dependency/co-change graph storage, bus-factor table, hot spot map, timeline, graph
  explorer, commit detail, LLM narratives with SSE token streaming on both `/explain` and
  `/predict` variants, cost meter, dark/light theme toggle, floating 'Back to Top'
  scroll button, GitHub PR ingestion via GraphQL with REST fallback to reduce rate limit
  consumption (#385), and a Chromium landing-to-dashboard e2e.

Half-done:

- Demo mode exists as a route and LLM fallback concept. Narrative streams now have a
  no-key demo fallback, but the product still lacks seed data/scripts and a complete
  no-backend demo experience.
- Migration support exists as a startup SQL runner with applied-file tracking and
  directory docs; it still lacks a generated-diff/revision authoring process.
- Semantic drift is implemented with a default lightweight fallback; GraphCodeBERT is
  documented and opt-in but not productionized for cache/storage management.
- Structural graph diff exists but uses separate visual language from the rest of the UI
  and likely relies on undefined design tokens.
- LLM cache exists and usage reporting separates provider, demo, and pre-cached rows,
  but runtime cache-hit telemetry is not persisted as its own event stream.

Missing but obviously needed:

- Backend lockfiles or pinned dependency management.
- Deployment health checks; basic CI secret/debug/conflict scans now exist.
- Durable job processing or at least safer ingestion state management with retry and
  stronger cancellation semantics around long-running subprocesses.
- Documented seed/demo path.
- Production deployment configuration and environment docs.
- Productized deeper health metrics beyond the new risk reasons and hotspot persistence,
  especially ownership entropy, coupling surprise, blast radius, cycle severity, and
  stabilization scoring.

## Improvement plan (prioritised)

1. Establish verification baseline: add backend pytest setup, frontend test setup, and
   smoke checks for core user/API flows. This matters because every meaningful
   improvement touches scoring, ingestion, or UI behavior.
2. Make builds reproducible: add frontend lockfile and tighten Python dependency
   strategy enough for deterministic local/CI installs.
3. Fix immediate correctness bugs in low-risk pure logic: URL parsing parity, cache/usage
   accounting, health scoring edge cases, graph import resolution, and bus-factor risk
   classification.
4. Add backend API/integration tests around ingestion-adjacent endpoints using database
   fixtures and isolated temp storage.
5. Add frontend smoke tests for landing validation, progress/error rendering, dashboard
   empty/loading/error states, and narrative streaming parser behavior.
6. Create a documented demo seed path or replace `/demo` with a reliable static/local
   fixture flow.
7. Introduce migrations or a documented schema bootstrap/evolution strategy.
8. Harden ingestion limits: max commit clamp, storage cleanup guarantees, better
   subprocess logging, safer concurrency, and clearer failure codes.
9. Improve deployment readiness: CI workflow, environment docs, production CORS/API base
   config, no production debug output.
10. Revisit ingestion architecture for durable jobs once baseline tests protect current
    behavior.

## Decisions log

- 2026-05-31: Read the entire tracked codebase and project config before feature work, per requested process.
- 2026-05-31: Treated `PROJECT_BRAIN.md` as the first required artifact and did not edit source code before creating it.
- 2026-05-31: Prioritized test infrastructure and reproducibility ahead of feature additions because the project currently has no safe change boundary.
- 2026-05-31: Added a "Discovered issues" section because critical production-readiness gaps were found during the audit.
- 2026-05-31: Added backend pytest infrastructure before broader feature work, because pure parser/scoring/LLM helpers are the safest first regression boundary.
- 2026-05-31: Hardened GitHub URL validation after tests exposed that non-GitHub HTTPS URLs and `.`/`..` path segments could pass low-level parsing.
- 2026-05-31: Generated and committed the frontend npm lockfile to make installs reproducible before adding more frontend testing or dependency changes.
- 2026-05-31: Added ESLint 9 flat config and typed graph explorer integration points instead of weakening `no-explicit-any`, so `npm run lint` is now a usable gate.
- 2026-05-31: Added Vitest with jsdom and focused frontend smoke tests for health display logic and SSE narrative parsing; deferred route/e2e coverage to the next testing increment.
- 2026-05-31: Added GitHub Actions CI to run backend pytest and frontend npm ci/test/lint/build on pushes to `main` and pull requests.
- 2026-05-31: Capped `IngestRequest.max_commits` at the configured backend maximum and exposed the 500-commit UI max to prevent accidental oversized ingestion jobs.
- 2026-05-31: Added backend database-backed endpoint coverage for repo listing, lookup, timeline, graph, bus factor, usage, and commit detail payloads.
- 2026-05-31: Moved the heavy metrics extractor import into `run_ingestion` so read-only API route imports do not require analysis dependencies such as `lizard` unless ingestion actually runs.
- 2026-05-31: Added landing-page route smoke coverage for invalid repo input, shorthand submission normalization, full GitHub URL normalization, and commit-limit submission.
- 2026-05-31: Replaced the broken `/demo` seed-data dependency with a bounded `facebook/react` analysis flow and added tests for success/error behavior.
- 2026-05-31: Added route-level lazy loading so graph/dashboard dependencies are no longer part of the first-load bundle.
- 2026-05-31: Upgraded vulnerable frontend dependencies, including the Vite 8 toolchain move, because the remaining audit findings had no non-major fix path and the local Node version satisfies Vite 8 requirements.
- 2026-05-31: Added explicit Tailwind/PostCSS config after build output showed raw `@tailwind` directives, preserving the app's existing CSS-variable design tokens rather than introducing a new theme.
- 2026-05-31: Added a lightweight SQL migration runner with `schema_migrations` tracking instead of introducing Alembic immediately, because the app already had a simple SQL migration hook and needed reliable application across SQLite/Postgres first.
- 2026-05-31: Changed the frontend API default from a hardcoded localhost origin to same-origin `/api`, because deployed builds should not assume a local backend and local development can be handled by the Vite proxy.
- 2026-05-31: Made ingestion submissions idempotent while a job is active and scheduled background work by explicit job id, because duplicate clicks/retries should not create races or attach work to the wrong latest job.
- 2026-05-31: Replaced the remaining backend startup `print` with structured logger metadata so production logs can be routed consistently.
- 2026-05-31: Added cooperative ingestion cancellation and exposed it from the progress page, because users need a way to stop expensive analyses even before a durable worker queue exists.
- 2026-05-31: Made clone cleanup return success/failure instead of raising in ingestion cleanup paths, because cleanup errors should be logged without masking the original ingestion result.
- 2026-05-31: Changed CORS config so production has no implicit browser origins, while development keeps localhost defaults for local ergonomics.
- 2026-05-31: Changed LLM usage and budget accounting to count only billable provider rows while reporting pre-cached rows separately, because demo/cache records should not consume provider budget or inflate cost totals.
- 2026-05-31: Split semantic drift enablement from GraphCodeBERT model loading, keeping fallback drift on by default while requiring explicit `ENABLE_GRAPHCODEBERT=true` for ML runtime costs.
- 2026-05-31: Added dashboard route smoke tests with child widgets mocked, because the page's API orchestration, empty/error states, selected-commit behavior, and commit-detail navigation are the user-facing core of the product.
- 2026-05-31: Added an app-level landing-to-dashboard smoke test inside Vitest rather than adding Playwright immediately, because it closes the main route orchestration risk using existing tooling while keeping a true browser e2e runner as a separate infrastructure decision.
- 2026-05-31: Added `NarrativeCard` UI state coverage for disabled, streaming, completed metadata, callback error, and request failure paths, because the user-facing LLM flow needs regression coverage beyond the low-level SSE parser.
- 2026-05-31: Made co-change graph edges count each file pair at most once per commit and emit stable sorted output, because duplicate file entries should not inflate hidden-coupling scores or create self-edges.
- 2026-05-31: Added ingestion progress SSE edge-case tests for missing jobs, terminal jobs, and active-to-cancelled polling updates, because the analyze page depends on this stream for user-facing progress and recovery states.
- 2026-05-31: Added professional GitHub repository materials and a deeper repo-health metrics roadmap, because maintainers need contribution/security workflows and the product needs a clear path from raw metrics to explainable risk signals.
- 2026-05-31: Added persisted risk reasons and hotspot persistence to health snapshots, because users need to understand why a score moved and which risky files are recurring across recent commits.
- 2026-05-31: Added repository governance checks for pushes and pull requests, plus PR metadata enforcement, Dependabot, and CODEOWNERS, because open-source-style repositories need automated guardrails beyond test execution.
- 2026-06-04: Added Playwright Chromium coverage for the landing-to-dashboard flow with intercepted REST/SSE contracts, because the existing jsdom app smoke did not exercise actual browser routing, EventSource, or rendering.
- 2026-06-04: Made theme persistence non-fatal when browser storage is unavailable, because theme controls should still render and switch under restricted storage environments.
- 2026-08-22: Parallelized commit metrics extraction across CPU cores using ProcessPoolExecutor and isolated git worktrees (#334).
- 2026-08-22: Enforced case-insensitive uniqueness check and lookups on repository slug generation using func.lower (#303).
- 2026-06-07: Fixed local end-to-end scan regressions after browser testing exposed proxy env loading, a missing SQLAlchemy `greenlet` runtime dependency, SQLite naive timestamp duration math, stale dashboard commit selections after rescans, invalid bus-factor table markup, and progress-stream disconnect errors.
- 2026-06-07: Made streaming LLM narratives match the non-streaming demo fallback, because a no-key local/demo environment should still show a useful static-metrics explanation instead of a failure card.
- 2026-06-07: Opted into React Router v7 future flags to remove route deprecation warnings in development; remaining Recharts dev warnings come from the installed `recharts@2.12.7` internals.
- 2026-07-21: Added pagination to the repo list endpoint with `limit` (default 20, max 100) and `offset` (default 0) query parameters, because unbounded list responses degrade as repositories accumulate.
- 2026-07-25: Implemented custom time range selector for Commit Timeline and Hotspots (#223), allowing users to filter codebase health data by preset intervals (7d, 30d, 1y, All Time) or custom start/end dates.
- 2026-07-26: Added contributor identity resolution for bus factor calculations. Introduced `ContributorIdentityResolver` with `.mailmap` support and normalized contributor identities before both `git blame` and fallback commit-history aggregation to prevent duplicate contributor aliases from distorting ownership metrics.
- 2026-07-31: Implemented 3-attempt transaction retry helper (commit_with_retry) and busy timeout connection parameter adjustments (timeout=30, PRAGMA busy_timeout=30000) to resolve transient SQLite lock errors during concurrent ingestion runs (#259).
- 2026-08-28: Added skeleton loader components for dashboard metric cards during data fetch (#378).
- 2026-08-28: Added custom default branch name support in repository ingestion and clone analysis (#381).
- 2026-08-28: Implemented in-memory caching for Team Health calculations to improve dashboard response times (#376).
- 2026-08-28: Integrated React Error Boundary around Code Quality Dashboard component (#380).
- 2026-08-28: Added start_date and end_date filtering options to DORA metrics calculation API (#375).
- 2026-09-01: Added EmptyCommitsWarningBanner component to guide users when 0 commits exist in analyzed range (#208, #495).
- 2026-08-31: Added real-time author search filter to CommitList component in Dashboard (#308, #493).
- 2026-08-31: Added Copy Markdown action button and feedback state to LLM Narrative Card (#310, #492).
- 2026-08-31: Added Escape and Enter keyboard shortcut accessibility support to modals (#311, #491).
- 2026-08-31: Added real-time search filter for analyzed repositories on the Landing Page (#205, #490).
- 2026-08-30: Added Deployment Timeline Dashboard with deployment history, sparklines, environment badges, and provider metrics (#488, #489).
- 2026-08-30: Added Commit Message Quality Linter & Dashboard with Conventional Commit validation, 10 violation rules, and contributor quality leaderboard (#485, #487).
- 2026-08-30: Added Velocity & Delivery Cadence Dashboard with 12-week commit throughput, cadence consistency score, and contributor distribution (#481, #482).
- 2026-08-30: Added CI/CD Pipeline Monitor dashboard with stage metrics, deployment status, and runner analytics (#483).
- 2026-08-30: Added Team Collaboration Hub with activity feed, reviewer metrics, PR tracking, and sprint goals (#479, #480).
- 2026-08-30: Added Commit Health Radar 5-tab dashboard with quality gate monitoring, team performance insights, and radar visualization (#477, #478).
- 2026-08-30: Added real-time module path and owner search filter input to Bus Factor table (#384, #466).
- 2026-08-30: Implemented local storage theme persistence and cross-tab synchronization with FOUC prevention (#383, #465).
- 2026-08-30: Added relative 'Last updated' timestamp with detailed hover tooltip to dashboard header navigation (#382, #462).
- 2026-08-30: Added informative hover tooltips for DORA metrics performance tiers and thresholds (#365, #464).
- 2026-08-30: Standardized interactive element curvature dimensions and added typed Button primitive with `rounded-full` layout restrictions (#366, #463).
- 2026-08-29: Added Actionable Health Recommendations Engine with multi-vector health analysis and severity-ranked suggestions (#460, #461).
- 2026-08-29: Added Weekly Health Digest with trend analysis and regression alerts (#458, #459).
- 2026-08-29: Added Scheduled Health Reports system with cron scheduling, webhook delivery, and history UI (#456, #457).
- 2026-08-29: Implemented Server-Sent Events (SSE) streaming for LLM narrative generation via `/api/explain/stream` and `/api/predict/stream` (#394, #452).
- 2026-08-29: Added custom CSS scrollbar for Health Timeline component (#370, #455).
- 2026-08-29: Sorted Bus Factor table rows by ownership percentage descending (#371, #454).
- 2026-08-29: Added backend setup and startup guide in backend/README.md (#374, #453).
- 2026-08-29: Bounded Graph Explorer node labels to prevent clipping on canvas (#316, #451).
- 2026-08-29: Added Release Impact Analyzer dashboard and `/releases` route (#446).
- 2026-08-29: Added Team Collaboration Hub analytics and `/team` route (#444).
- 2026-08-29: Added Commit Health Radar multi-dimensional visualization and `/health` route (#442).
- 2026-08-29: Created complete Wiki documentation system (Architecture, DORA & Cycle Time, REST API Reference, Developer Guide, Deployment & Operations, Troubleshooting & FAQ) in /wiki and expanded MkDocs documentation in /docs.
- 2026-08-26: Added metric explanation tooltips for Bus Factor, Churn, and Cyclomatic Complexity metrics across dashboard cards (#265).
- 2026-08-26: Made Hotspot Map and Knowledge Graph Explorer components responsive on mobile viewports (#377).
- 2026-08-26: Created unified PDF report export for developer health and repository maintainability metrics (#389).

## Test coverage status

- Backend unit tests: initial pure-logic coverage exists for config parsing/CORS defaults
  (including dev-environment merging, empty-string fallback, deduplication, and
  unknown-environment fail-closed behavior from #264), boolean env parsing, repo URL
  parsing/validation, URL token credentials stripping (#309), streaming git diff parsing
  (#300), renamed file path resolution in co-change coupling (#398), max-commit cap
  validation, slug generation, clone cleanup success/failure, import extraction/
  resolution, co-change edge generation, top-file frequency, bus-factor file filtering,
  semantic fallback behavior, health snapshot aggregation, risk reasons/hotspot
  persistence, LLM cache keys, provider mapping, cost estimation, usage/budget accounting,
  prompt builders, demo-narrative risk-level classification (High/Medium/Low),
  `stream_narrative` degraded fallback when no API keys are configured,
  `get_narrative_non_streaming` token joining, contributor identity normalization,
  `.mailmap` parsing, canonical identity resolution, bus factor contributor
  deduplication, and commit-walker author identity fallback resolution (#266).
- Backend integration/API tests: database-backed coverage exists for repo listing/lookup
  with pagination, timeline payloads including risk reasons and persistent hotspots,
  timeline and hotspots date-range filtering (`start_date`/`end_date`), graph payloads,
  bus factor payloads, LLM usage payloads, commit detail composition, active ingestion
  job reuse, background job scheduling arguments, ingestion cancellation, SQLite-safe
  duration math, ingestion progress SSE payloads for missing/terminal/polled jobs, and
  HTTP-level streaming narrative tests for `/api/explain/stream` and
  `/api/predict/stream` covering SSE wire format, cache-hit behaviour, demo-mode
  fallback, and 404 on missing commit (#394).

- Backend migration tests: coverage exists for sorted SQL migration application,
  applied-file tracking, skip-on-reapply behavior, and SQLite duplicate-column
  protection.
- Frontend unit/component tests: Vitest coverage exists for health status/formatting
  helpers, `HealthBadge`, restricted-storage `ThemeToggle` behavior, valid bus-factor
  table markup, `streamNarrative` success/error parsing, and `NarrativeCard`
  disabled/streaming/done/error states, including same-origin `/api` stream URL behavior.
- Frontend route/smoke tests: landing-page repository validation/submission coverage,
  analyze-page cancellation/completion coverage, demo-page bounded-analysis coverage,
  dashboard repository error/latest-commit/empty-timeline/detail-navigation/risk-reason
  rendering coverage, time range selector preset and custom date picker interaction
  coverage, and app-level landing-to-dashboard navigation coverage exist with mocked
  API/SSE calls.
- Frontend browser e2e: Playwright Chromium coverage exercises repository submission, REST
  payload normalization, EventSource completion, dashboard navigation, and risk-reason
  rendering against deterministic intercepted API contracts.
- Local quality gates: `python -m pytest` (189 tests, including 14 LLM unit tests and 4
  SSE streaming integration tests), `npm run test` (26 tests), `npm run lint`, `npm run
build`, and `git diff --check` pass. `black --check`, `isort --check`, and `flake8
--max-line-length=100` are clean on all changed Python files.

## Commit log summary

- `1132a0d` docs: initial PROJECT_BRAIN.md — full codebase understanding. Added the
  required living project understanding document before feature work.
- `e2fc631` test: add backend logic coverage and harden repo URL validation. Established
  pytest configuration/dev requirements, added 19 backend pure-logic tests, and fixed
  URL validation gaps those tests exposed.
- `d1e0cef` docs: update project brain after backend test baseline. Recorded the backend
  test baseline and parser-hardening decision.
- `aa471ab` chore: make frontend builds reproducible and enforce lint. Added
  `package-lock.json`, ESLint flat config, and graph explorer type cleanup so lint/build
  are actionable.
- `c089461` docs: update project brain after frontend quality gate. Recorded the frontend
  lockfile/lint/build baseline and remaining audit/bundle risks.
- `4f5940b` test: add frontend smoke coverage for dashboard utilities. Added Vitest/
  jsdom setup and 7 frontend tests around health utilities, `HealthBadge`, and narrative
  stream parsing.
- `00a4c17` docs: update project brain after frontend tests. Recorded the frontend test
  baseline and current local gate status.
- `40d4663` ci: run backend and frontend quality gates. Added GitHub Actions for backend
  pytest and frontend npm ci/test/lint/build on pushes to `main` and pull requests.
- `d840474` docs: update project brain after ci setup. Recorded the CI workflow and
  updated quality-gate status.
- `6fb83c3` fix: cap ingestion commit limits to protect analysis jobs. Enforced the
  configured max commit cap in backend validation, added regression coverage, and
  reflected the limit in the landing form.
- `b049e64` docs: update project brain after ingestion cap. Recorded the ingestion cap
  hardening and updated test coverage notes.
- `4b3ee64` test: cover backend repository data endpoints. Added database-backed endpoint
  coverage and deferred heavy metrics imports until ingestion execution.
- `18be60f` docs: update project brain after backend endpoint tests. Recorded backend
  endpoint coverage and the read-only route import-boundary decision.
- `e625d54` test: cover landing repository submission flow. Added landing-page smoke
  tests and shared Testing Library cleanup for Vitest.
- `8f16701` docs: update project brain after landing flow tests. Recorded landing-page
  route coverage and updated frontend route test status.
- `93e8972` fix: replace missing demo seed path with bounded analysis. Replaced the
  nonexistent seed-data dependency with a real bounded demo analysis flow and tests.
- `edf6bcf` docs: update project brain after demo fix. Recorded the demo route fix and
  updated route test status.
- `4145e84` perf: split route bundles to reduce initial payload. Added route-level lazy
  loading and removed the Vite chunk-size warning by splitting dashboard/narrative code
  out of the initial bundle.
- `c049a3b` docs: update project brain after route splitting. Recorded the lazy-loading
  decision and updated the known bundle-risk status.
- `4ac3ee0` chore: close frontend audit findings and restore Tailwind build. Upgraded
  vulnerable frontend dependencies, moved to Vite 8 with the compatible React plugin,
  and added PostCSS/Tailwind config so production CSS includes generated utilities.
- `3de8975` docs: update project brain after frontend audit hardening. Recorded the
  dependency-audit and Tailwind build decisions plus current clean gate state.
- `60f4591` feat: add tracked schema migration workflow. Added a reusable SQL migration
  runner, `schema_migrations` tracking, migration docs, and backend tests for apply/
  skip/idempotency behavior.
- `fa27861` docs: update project brain after migration workflow. Recorded the
  migration-runner decision, migration test coverage, and current schema-evolution risk.
- `8e43f38` fix: use deploy-safe frontend API base path. Switched frontend API calls to
  same-origin `/api`, added Vite dev proxy configuration, documented frontend env
  variables, and tested the stream URL behavior.
- `ea3106c` docs: update project brain after API config fix. Recorded the deploy-safe
  frontend API base path decision and current deployment config state.
- `b8d53a9` fix: make ingestion submissions reuse active jobs. Returned the existing
  active ingestion job for duplicate submissions and scheduled background work with an
  explicit job id to avoid latest-job races.
- `691bbc1` docs: update project brain after ingestion job reuse. Recorded the active-job
  reuse decision, updated ingestion risk notes, and bumped backend test count.
- `df6b1da` chore: use structured logging for database startup. Replaced the last backend
  startup `print` with module logger metadata after verifying no backend prints remain.
- `7a62f1a` docs: update project brain after database logging. Recorded the database
  logging decision and updated observability risk notes.
- `b57ce4c` feat: support cancelling active ingestion jobs. Added a cancel endpoint,
  cooperative cancellations checks during ingestion, a progress-page cancel action, and
  backend/frontend tests for cancellation behavior.
- `1a1e16d` fix: keep clone cleanup from masking ingestion failures. Made clone cleanup
  non-throwing for cleanup paths, strict for stale clone replacement before new clones,
  logged cleanup failures, and added cleanup tests.
- `163e74f` docs: update project brain after clone cleanup hardening. Recorded cleanup
  behavior and updated backend test counts.
- `03bf056` fix: require explicit CORS origins in production. Added environment-aware
  CORS defaults, config tests, and deployment docs so production APIs do not inherit local
  browser origins.
- `1d2c207` docs: update project brain after CORS hardening. Recorded the production CORS
  decision, deployment docs, and clean audit status.
- `ad667be` fix: report LLM usage from billable provider calls. Separated billable
  provider usage from pre-cached/demo narrative rows and added regression tests for
  usage summaries and budget checks.
- docs: update project brain after LLM usage accounting. Recorded the LLM accounting
  decision, updated test counts, and narrowed remaining test gaps.
- `d834ed9` fix: make GraphCodeBERT analysis explicitly opt-in. Added
  `ENABLE_GRAPHCODEBERT`, kept fallback semantic drift enabled, documented the runtime
  switch, and tested that fallback drift does not load the model path.
- docs: update project brain after GraphCodeBERT opt-in. Recorded the semantic runtime
  decision, updated test counts, and narrowed the remaining semantic-analysis risk.
- `605937b` test: cover dashboard route data states. Added dashboard route smoke
  coverage for repository load failure, latest commit selection, empty timeline
  behavior, data widget orchestration, and commit-detail navigation.
- docs: update project brain after dashboard route coverage. Recorded the dashboard
  testing decision, updated frontend test counts, and narrowed the remaining frontend
  coverage gap to full e2e and narrative UI behavior.
- `41cfb9b` test: cover landing to dashboard app flow. Added an app-level smoke test for
  repository submission, analyze-page SSE completion, dashboard route navigation, and
  dashboard data loading with mocked API/SSE.
- docs: update project brain after app-flow coverage. Recorded the app-flow testing
  decision, updated frontend test counts, and clarified that true browser e2e is still
  outstanding.
- `88dd19a` test: cover narrative streaming UI states. Added component coverage for
  disabled narrative generation, streamed text, completed provider/cost/token metadata,
  callback errors, request failures, and retry-to-idle behavior.
- docs: update project brain after narrative UI coverage. Recorded the narrative UI
  testing decision, updated frontend test counts, and removed narrative UI behavior from
  the must-test-before-shipping list.
- `b0759e7` fix: count co-change graph pairs once per commit. Deduplicated per-commit
  file lists before pairing, stabilized co-change edge ordering, and added regression
  tests for co-change edges and top-file frequency.
- docs: update project brain after co-change graph hardening. Recorded the graph
  decision, updated backend test counts, and removed co-change generation from the
  must-test-before-shipping list.
- `4661e6d` test: cover ingestion progress stream edge cases. Added direct SSE endpoint
  coverage for missing jobs, terminal ready jobs, and active-to-cancelled polling
  updates.
- docs: update project brain after ingestion progress SSE coverage. Recorded the SSE
  testing decision, updated backend test counts, and narrowed remaining shipping test
  gaps to real-browser e2e coverage.
- `a16ecdb` docs: professionalize GitHub project materials. Added contribution, security,
  issue, pull request, README, and repo-health metrics roadmap documentation.
- docs: update project brain after GitHub professionalization. Recorded the GitHub hygiene
  decision and deeper health metrics roadmap.
- `76c2bd9` feat: explain repo health risk reasons. Persisted risk reason and hotspot
  persistence fields, added migration/schema/API/frontend support, and rendered top
  reasons plus recurring hotspots in the dashboard.
- docs: update project brain after explainable health metrics. Recorded the
  score-explainability decision and updated coverage notes.
- `f2c8d31` ci: add repository governance checks. Added push/PR hygiene scans, PR
  title/body validation, project-brain update enforcement for PRs, Dependabot, and
  CODEOWNERS.
- docs: update project brain after repository governance. Recorded the governance
  decision and updated CI/deployment-risk notes.
- test: add real-browser landing-to-dashboard coverage. Added Playwright Chromium
  configuration, deterministic REST/SSE interception, CI execution, and non-fatal theme
  storage handling.
- docs: update project brain after browser e2e coverage. Recorded the closed browser
  testing gap and current quality-gate status.
- fix: stabilize local scan and narrative flows. Added the missing backend async DB
  runtime dependency, fixed Vite proxy env loading, made ingestion progress streams use
  independent DB sessions, handled SQLite naive timestamps, reset stale dashboard commit
  selections after rescans, hardened storage/markup edge cases, and made streaming
  narratives fall back to cached demo-mode output when LLM providers are unavailable.
- feat: add pagination to repo list endpoint. Added `limit`/`offset` query parameters to
  `list_repos` with defaults of 20/0 and a max limit of 100, plus backend integration
  tests for pagination behavior.
- docs: update project brain after repo list pagination. Recorded the pagination decision
  and updated backend API test coverage.
- fix: sanitize commit messages to prevent unsafe HTML tags and XSS (#221). Added commit
  message sanitization helpers on both backend ingestion and frontend rendering
  components, along with comprehensive unit tests.
- `cfc96af` fix: mark stale/orphaned ingestion jobs as error on startup #26. Added
  startup routine `mark_stale_jobs_as_error()` inside `init_db()` to query active
  `AnalysisJob` records, set them to error status with message "System restart aborted
  the analysis job", clean up matching repository storage folders under
  `REPO_STORAGE_PATH`, and added unit tests in `test_repo_api.py`.
- docs: update project brain for stale ingestion job recovery on startup #26. Recorded
  stale job recovery implementation, storage cleanup details, and unit test coverage.
- feat: implement custom time range selector for commit timeline and hotspots (#223).
  Added preset filters (All Time, 7d, 30d, 1y, Custom) and custom date pickers, updated
  timeline and hotspots backend APIs with `start_date`/`end_date` parameters, integrated
  into Dashboard UI, and added test coverage.
- `019b96e` fix: deduplicate contributor identities in bus factor calculation. Added
  `ContributorIdentityResolver` with `.mailmap` support, normalized contributor
  identities before ownership aggregation, integrated resolution into both `git blame`
  and fallback commit-history paths, and added comprehensive regression tests.
- feat: highlight hotspots in Graph Explorer file tree (#215). Added hotspot visual
  warning icons and color coding to the file tree view of the Graph Explorer.
- fix(frontend): allow chart tooltips to overflow viewBox dynamically on smaller screens
  (#217). Updated Recharts tooltips wrapper configurations so metrics aren't clipped on
  mobile.
- fix(ingestion): handle missing git commit author name or email gracefully (#266).
  Added `resolve_author_name`/`resolve_author_email` helpers in `commit_walker.py` with
  `"Unknown"` / `"unknown@example.com"` defaults, defensive Actor access, INFO logging
  when fallbacks apply, and five regression tests in `test_repo_ingestion_logic.py`.
- docs: update project brain after commit-walker author fallback (#266). Recorded the
  identity-fallback decision, updated discovered-issues and test-coverage status.
- feat: add side-by-side repository comparison and reporting (#299). Added
  `GET /api/repos/compare` endpoint in `router.py` with combined metrics, deltas, and
  automated verdict/insights; added dedicated `/compare` frontend workspace with repo
  selectors, swap capability, side-by-side hero cards, delta indicators, trajectory and
  radar charts, full benchmark table, and CSV/JSON report export helpers in
  `exportUtils.ts`. Added backend tests in `test_repo_compare.py` and frontend tests in
  `ComparePage.test.tsx` and `exportUtils.test.ts`.

- feat: support sorting and filtering by metrics (LOC, Churn, Complexity) in the hotspots
  list (#260). Added a sortable table below the treemap in `HotspotMap.tsx` with
  clickable column headers for File, LOC, Churn, Complexity, and Risk. Sorting defaults
  to risk_score descending; clicking a header toggles asc/desc. Added `loc` field to
  the backend `get_hotspots` response and `HotspotEntry` type. Added 7 unit tests
  covering rendering, sorting by each metric, direction toggling, empty state, and
  loading state.
- docs: update project brain after hotspot sorting enhancement (#260). Recorded the
  sortable hotspots table decision, backend `loc` field addition, and frontend test
  coverage.
- feat: cache and reuse git commit history walks in backend analysis (#263). Added
  on-disk JSON caching to `commit_walker.py` — the first `walk_commits()` call for a
  given (repo_path, limit) pair walks the git tree and caches results to
  `/tmp/commitiq_cache/`. Subsequent calls within a 24-hour TTL load directly from
  cache, skipping the expensive git walk entirely. The cache key is a SHA-256 hash of
  the absolute repo_path + limit, so different repos and different depth clones get
  separate cache files. Added `_walk_commits_uncached()` (the original walk logic) and
  made `walk_commits()` a thin caching wrapper. Added 13 unit tests covering cache path
  derivation, TTL expiry, roundtrip serialization, and cache-hit/cache-miss behavior.
- docs: update project brain after commit walk caching (#263). Recorded the caching
  decision, TTL strategy, and test coverage.
- Refactored git blame to catch TimeoutExpired and rmtree to handle Windows permission
  errors in backend.
- feat: add Go import extraction and TypeScript path alias resolution (#348). Extended
  `graph_builder.py` with `extract_go_imports()` for single-line (`import "fmt"`) and
  grouped-block (`import ( ... )`) Go imports, including aliased (`f "fmt"`),
  blank-identifier (`_ "image/png"`), and dot (`. "math"`) forms. Commented-out imports
  are stripped via `_strip_go_comments()`. Extended `resolve_import_to_file()` to handle
  TypeScript path aliases (`@/`, `~/`, `#/`, `@@/`) by stripping the prefix and
  matching against `src/`, `app/`, `lib/`, `packages/`, and project root. Added Go
  package-path resolution by matching progressively shorter suffixes of the import path
  against repo directory structures. Updated `build_import_edges()` to dispatch `.go`
  files. Added 18 unit tests covering Go extraction, alias resolution, Go path
  resolution, and regression guards for existing relative-import behavior.
- docs: update project brain after Go import extraction and TS alias resolution (#348).
  Recorded the new `extract_go_imports` function, extended `resolve_import_to_file` with
  alias and Go path support, `build_import_edges` `.go` dispatch, and 18-test coverage.
- feat: stream LLM narratives via Server-Sent Events (SSE) (#394). Added
  `POST /api/explain/stream` and `POST /api/predict/stream` endpoints emitting
  `text/event-stream` payloads with token chunks and a terminal `done: true` chunk.
  Frontend `streamNarrative()` and `streamPredictNarrative()` consume the stream via
  native `fetch` + `ReadableStream.getReader()`. Added 14 unit tests in
  `test_llm_logic.py` and 4 HTTP-level integration tests in
  `test_streaming_narrative.py`. Refactored `router.py` to extract shared helpers.
  Deleted dead `claude_client.stream_narrative` / `generate_narrative` helpers.
- docs: update project brain after SSE streaming (#394). Recorded the streaming
  endpoints, frontend consumer, test coverage, router refactor, and dead-code removal.

Scheduled metric refresh (Issue #387)

A background scheduler now automatically re-ingests active repositories to keep
dashboards fresh.

Implementation:

`backend/scheduler.py` wraps APScheduler's `AsyncIOScheduler`, which integrates natively
with FastAPI's asyncio event loop — no separate Celery worker or Redis broker required
(though Redis is available for future use). The scheduler starts on FastAPI lifespan
startup (`main.py`) and shuts down cleanly on lifespan exit. On each tick (every
`REFRESH_INTERVAL_HOURS`, default 24), the scheduler queries all repos whose status is
"ready" and whose `last_updated_at` is older than the refresh interval (or NULL). For
each eligible repo (capped at 25 per tick to avoid rate-limiting), it creates an
`AnalysisJob` with `triggered_by="scheduler"` and launches `run_rescan` — reusing the
exact same analysis pipeline as the manual `POST /api/repos/{repo_id}/rescan` endpoint.
Repos are staggered by 10 seconds to avoid GitHub API rate-limit bursts.

Configuration:

`REFRESH_INTERVAL_HOURS` env var (default 24). Set to 0 to disable the scheduler
entirely. `backend/requirements.txt` now includes `apscheduler>=3.10.0`.

Testing:

`backend/tests/test_scheduler.py` covers: scheduler lifecycle (start/stop/disabled),
repo eligibility (old/recent/null/non-ready), `refresh_all_due_repos` (empty, DB error,
multi-repo refresh), `_refresh_single_repo` (skip active, launch rescan, exception
handling). The scheduler's internal job calls `run_rescan` with its own DB session, so no
long-lived transactions are held between ticks.

design/button-radius-standardization
Implementation:
backend/features/reports/pdf_service.py uses ReportLab (SimpleDocTemplate + Table + Paragraph) to build a multi-section PDF: Executive Summary, DORA Metrics, Cycle Time Analysis (with bottleneck table), Team Health, and a footer.
The service fetches live data by calling the existing metric computation functions (compute_dora_metrics, compute_cycle_time_metrics, compute_team_health) and queries the latest HealthSnapshot for the overall score.
Colour-coded DORA/burnout labels (Elite=green, High=blue, Medium=amber, Low=red) are rendered inline in the PDF text.
backend/features/reports/router.py exposes GET /api/repos/{repo_id}/report which returns a StreamingResponse with Content-Type: application/pdf and a Content-Disposition: attachment header.
backend/main.py registers the reports router under /api.
backend/requirements.txt now includes reportlab>=4.0.0.

Testing:
backend/tests/test_pdf_report.py covers: service raises ValueError for missing repo, returns valid %PDF bytes, PDF content includes section labels, router returns 404 for missing repo, router returns 200 + application/pdf with correct headers for a valid repo.

Testing:
backend/tests/test_pdf_report.py covers: service raises ValueError for missing repo, returns valid %PDF bytes, PDF content includes section labels, router returns 404 for missing repo, router returns 200 + application/pdf with correct headers for a valid repo.
feature/landing-page-repo-filter-205

main

backend/tests/test_pdf_report.py covers: service raisesValueError for missing repo, returns valid %PDF bytes, PDFcontent includes section labels, router returns 404 for missing repo,router returns 200 + application/pdf with correct headers for avalid repo.

> > > > > > > origin/main
> > > > > > > origin/main
> > > > > > > origin/main
> > > > > > > origin/main
> > > > > > > origin/main

- fix: make the hotspot map and knowledge graph responsive on mobile devices (#377). Made the canvas container, treemap wrapper, sidebars, stats overlay, and playback controls fully responsive across narrow viewports without horizontal overflow.
- docs: update project brain after mobile responsiveness fix (#377). Recorded responsive layout adjustments for HotspotMap and GraphExplorer, and updated test coverage.

### Mobile Responsiveness for Hotspot Map & Knowledge Graph (Issue #377)

- **Problem**: On small mobile devices (viewports < 768px down to 320px), the Hotspot Treemap and ForceGraph2D canvas containers caused horizontal page overflow, unconstrained sidebar widths, and clipped overlay badges.
- **Implementation**:
  - `HotspotMap.tsx`: Responsive bounding classes, legend wrapping, and pagination stacking.
  - `GraphExplorer.tsx`: Mobile-safe canvas dimensions, responsive stats HUD, and sidebar wrapping.
- **Testing**: Verified with full test suite (`npm run test`, 17 test files, 83 tests passing).

feature/landing-page-repo-filter-205

main

### Support Time Window Parameters in DORA Metrics (Issue #375)

- **Problem**: `compute_dora_metrics` previously analyzed all historical deployments and merged pull requests, preventing users and teams from viewing DORA performance for specific sprints, quarters, or custom date ranges.
- **Implementation**:
  - `backend/features/metrics/dora.py`:
    - Updated `compute_dora_metrics(db, repo_id, start_date=None, end_date=None)` to accept optional ISO strings or `datetime` objects.
    - Added helper `_parse_datetime` to handle string/datetime formats and `_seconds_between` to handle naive and timezone-aware datetime subtractions safely.
    - Filtered `Deployment.deployed_at >= start_date` / `<= end_date` and `PullRequest.merged_at >= start_date` / `<= end_date`.
    - Computed measurement span dynamically using the specified time window or earliest recorded activity.
  - `backend/features/metrics/router.py`:
    - Updated `GET /api/metrics/repos/{repo_id}/dora` to accept `start_date` and `end_date` query parameters.
  - `frontend/src/lib/api.ts`:
    - Updated `getDoraMetrics(repoId, startDate, endDate)` to send `start_date` and `end_date` query parameters when provided.
  - `frontend/src/components/DoraMetricsDashboard.tsx`:
    - Added `startDate?: string` and `endDate?: string` to `DoraMetricsDashboardProps` and included them in the `useEffect` fetch dependencies.
  - `frontend/src/pages/DashboardPage.tsx`:
    - Passed current `startDate` and `endDate` from the dashboard time range filter to `<DoraMetricsDashboard />`.
- **Testing**:
  - Added `backend/tests/test_dora_metrics.py` testing bounded time windows, empty date ranges, ISO string timestamp parsing, and HTTP endpoint query parameters.
  - Verified with full test suite (180 backend pytest tests, 83 frontend vitest tests passing).
    \=======

### Layout-Specific Skeleton Loaders for DORA & Code Quality Dashboards (Issue #378)

- **Problem**: `DoraMetricsDashboard` and `CodeQualityDashboard` previously displayed generic centered pulsing loading spinners (`Activity` icon + text) that lacked visual resemblance to the final cards and caused layout shifting upon data resolution.
- **Implementation**:
  - `DoraMetricsSkeleton.tsx`:
    - Glass-panel container matching `DoraMetricsDashboard` dimensions and blur effects.
    - Header skeleton with icon, title, and performer badge placeholder.
    - 3-card metric grid skeleton matching Deployment Frequency, Change Failure Rate, and MTTR layouts with animated pulse lines, values, and badges.
    - Accessible `role="status"` and `aria-label="Loading DORA metrics"`.
  - `CodeQualitySkeleton.tsx`:
    - Glass-panel container matching `CodeQualityDashboard`.
    - Header skeleton with Sparkles icon and title.
    - 2-card grid skeleton matching Code Churn and AI Impact cards with headers, large metric placeholders, and description line skeletons.
    - Accessible `role="status"` and `aria-label="Loading code quality metrics"`.
  - `DoraMetricsDashboard.tsx` & `CodeQualityDashboard.tsx`:
    - Replaced the generic loading block with `<DoraMetricsSkeleton />` and `<CodeQualitySkeleton />`.
- **Testing**:
  <<<<<<< HEAD
  - Added unit test suites `DoraMetricsSkeleton.test.tsx`, `CodeQualitySkeleton.test.tsx`, `DoraMetricsDashboard.test.tsx`, and `CodeQualityDashboard.test.tsx`.
  - Verified with full frontend suite (21 test files, 91 tests passing) and production build.
    \=======
  - Expanded `HotspotMap.test.tsx` with unit tests for empty states, risk badges, and pagination under responsive layouts.
  - Verified with full test suite (`npm run test`, 16 test files, 78 tests passing).

feature/landing-page-repo-filter-205

main

> > > > > > > origin/main
> > > > > > > \=======
> > > > > > > <<<<<<< HEAD
> > > > > > > origin/main
> > > > > > > \=======
> > > > > > > <<<<<<< HEAD
> > > > > > > origin/main
> > > > > > > \=======
> > > > > > > <<<<<<< HEAD

### Landing Page Repository Name Validation (Issue #326)

- **Problem**: The "Analyze" submit button on the Landing Page did not properly disable when the repository name input field was empty or consisted solely of spaces.
- **Implementation**:
  - `LandingPage.tsx`:
    - Bound the submit button's `disabled` attribute directly to the text field state (`url.trim().length === 0`).
    - This ensures users cannot submit a blank repository for ingestion.
- **Testing**:

### Empty Commits Warning Banner (Issue #208)

- **Problem**: When a repository exists but has 0 commits in the analyzed range (or when a date filter excludes all commits), the dashboard previously displayed empty/blank states without guidance on how to fix or adjust settings.
- **Implementation**:
  - `EmptyCommitsWarningBanner.tsx`:
    - Created a glassmorphic amber banner with icon, context-aware title, and descriptive message.
    - Dynamically detects whether 0 commits is caused by an active time filter vs 0 analyzed commits in the repo overall.
    - Provides quick action buttons: "Reset to All Time" (for filtered views), "Update Analysis" (triggers rescan), and "Adjust Settings" (navigates to landing page to re-ingest with higher max commits or different branch).
    - Accessible with `role="alert"` and `data-testid="empty-commits-warning-banner"`.
  - `DashboardPage.tsx`:
    - Integrated `<EmptyCommitsWarningBanner />` conditionally when `!timelineState.isLoading && commits.length === 0`.
    - Wired callbacks for resetting time range filter, rescanning repository, and navigating to settings.
- **Testing**:
  - Added unit test suite `EmptyCommitsWarningBanner.test.tsx` verifying default warning, filtered warning, button actions, and rescan loading states.
  - Expanded `DashboardPage.test.tsx` to verify banner appearance and filter reset interactions.
  - 100% test pass rate (121 frontend vitest tests across 35 test files; 287 backend pytest tests).
