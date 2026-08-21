# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- GitHub CodeQL Advanced Security scanning in CI/CD pipeline.
- Test coverage generation (Codecov integration) for Python and TypeScript.
- Pre-commit hooks for automated code formatting and linting (Black, isort, Flake8, Prettier).
- Strict GitHub Issue Forms for bug reports and feature requests.
- "Export Report" dropdown on Dashboard to generate CSV (Health Timeline) and JSON (Bus Factor).
- Team Health dashboard showing burnout risk, weekend commits, and context-switching heuristics.
- DORA metrics dashboard reporting Deployment Frequency, Change Failure Rate, and MTTR.

### Changed

- Project renamed from `CommitIQ---` to `CommitIQ` across the entire ecosystem.
- Upgraded repository hygiene checks (rejecting console.log, debugger, and obvious secrets).
- Restructured `README.md` to match top-tier open-source repository standards with dynamic badges.

### Fixed

- Re-enabled robust fallback logic for AI narrative generation when providers (Anthropic/Gemini) are missing or rate-limited.
- Repaired rendering of the 3D dependency force-graph by dynamically scoping physics engines.
- Resolved git blame timeouts on massive legacy files (`subprocess.TimeoutExpired`).
- Mitigated Windows PermissionError upon repository cleanup (`shutil.rmtree` read-only fixes).
- Prevented division-by-zero crashes on empty repository health scorings.
