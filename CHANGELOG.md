# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 1.0.0 (2026-08-22)


### Features

* add branch selection support ([2f84cb7](https://github.com/eshaanag/CommitIQ/commit/2f84cb7056d0f1f358744403f128ffce219ce8f0))
* add branch selection support ([#210](https://github.com/eshaanag/CommitIQ/issues/210)) ([f5e34aa](https://github.com/eshaanag/CommitIQ/commit/f5e34aabc9d8e7e399ff9f6d3cb50a5c321a6744))
* Add Code Quality and AI Impact metrics ([03cf55b](https://github.com/eshaanag/CommitIQ/commit/03cf55b16307d471fb916f7148636aa5c7e76769))
* Add Cycle Time and DORA metrics ([8e991c2](https://github.com/eshaanag/CommitIQ/commit/8e991c274d832f011a7d63bd862085617e5b9004))
* Add Dockerfile and docker-compose.yml for containerized development ([#203](https://github.com/eshaanag/CommitIQ/issues/203)) ([7916299](https://github.com/eshaanag/CommitIQ/commit/7916299a047e31d6156c3eee81b3fb0258b0f0f4))
* add Go import extraction and TypeScript path alias resolution ([#348](https://github.com/eshaanag/CommitIQ/issues/348)) ([#410](https://github.com/eshaanag/CommitIQ/issues/410)) ([6db04ef](https://github.com/eshaanag/CommitIQ/commit/6db04efa1ba5b7d7bb6cd58de6347cb7f71273e2))
* add pagination support to list_repos endpoint ([f29e168](https://github.com/eshaanag/CommitIQ/commit/f29e168a436c5f4c5fd080725f291b4d833c2c08))
* add reset button to time range selector ([89d236b](https://github.com/eshaanag/CommitIQ/commit/89d236b9e1c4bd45aa676bd645092cc353e8f4e3))
* add side-by-side repository comparison and reporting ([#299](https://github.com/eshaanag/CommitIQ/issues/299)) ([c0c2056](https://github.com/eshaanag/CommitIQ/commit/c0c205674b24094537cd7931ae20ae2dc98fbe9c))
* add skeleton loader for Health Timeline chart ([9deab27](https://github.com/eshaanag/CommitIQ/commit/9deab274fb76edb6fe1f81601592d6f8d21b30c7)), closes [#305](https://github.com/eshaanag/CommitIQ/issues/305)
* Add Team Health metrics and dashboard ([5498ff6](https://github.com/eshaanag/CommitIQ/commit/5498ff648af21c3a5d34e53fefe2d123ed0dc66d))
* add tracked schema migration workflow ([60f4591](https://github.com/eshaanag/CommitIQ/commit/60f45915fa0b7a6321cd6fb00b1f0f18ab4ef6dc))
* **api:** support pagination for repository hotspots endpoint ([#321](https://github.com/eshaanag/CommitIQ/issues/321)) ([c9ab46c](https://github.com/eshaanag/CommitIQ/commit/c9ab46c0ef77714214f3f2cba22fd8b55fb27c3e))
* cache and reuse git commit history walks for faster rescans ([#295](https://github.com/eshaanag/CommitIQ/issues/295)) ([c88f0a7](https://github.com/eshaanag/CommitIQ/commit/c88f0a78fb2c752015302fe6f8069248a3dd4986))
* complete open source professionalization (phase 2) ([a3b6aa3](https://github.com/eshaanag/CommitIQ/commit/a3b6aa368f8451726d710ce25229287637c51899))
* confirmation modal before deleting a repository ([9df9c58](https://github.com/eshaanag/CommitIQ/commit/9df9c58eb6f125627dcaa845637b48ffe278b832)), closes [#302](https://github.com/eshaanag/CommitIQ/issues/302)
* Create ARCHITECTURE.md documentation ([7d42479](https://github.com/eshaanag/CommitIQ/commit/7d42479ce1905ce79749ee966d002ad618bbc557))
* **dashboard:** show single point of failure warning when min bus factor is 1 ([8653ecb](https://github.com/eshaanag/CommitIQ/commit/8653ecb0ffce121ac9c2f438bf0a9e1994d29be0))
* **dashboard:** show total file count and loc on overview (fixes [#216](https://github.com/eshaanag/CommitIQ/issues/216)) ([9d37c89](https://github.com/eshaanag/CommitIQ/commit/9d37c89bb2f51ff757231c3f72aa7ae4abb33ca7))
* **database:** implement automated database migrations check on startup ([#317](https://github.com/eshaanag/CommitIQ/issues/317)) ([034488d](https://github.com/eshaanag/CommitIQ/commit/034488db9c7af41e908039f2af1cc3069b5eacf1))
* **demo:** add frontend-only static mock fallback for facebook-react demo enabling instant loading without backend ([6419719](https://github.com/eshaanag/CommitIQ/commit/6419719ff863d1fe19da4e41670a0a0197180a64))
* **demo:** auto-seed facebook-react demo data on application startup ([37201ab](https://github.com/eshaanag/CommitIQ/commit/37201ab921df61402ce307cfbbf8b9a7f83959cc))
* **demo:** revert client-side mock interception to point back to the backend database ([43bcf5f](https://github.com/eshaanag/CommitIQ/commit/43bcf5f94621d10c2a9510ef9ef3276f08b6cf77))
* enforce storage quota and transaction rollback safety in ingestion pipeline ([9137af4](https://github.com/eshaanag/CommitIQ/commit/9137af4856844ea4eb9b7e7289780c0c29e934fb))
* explain repo health risk reasons ([76c2bd9](https://github.com/eshaanag/CommitIQ/commit/76c2bd9c2918b63e4a850eb5469bff99d21e8ab0))
* **frontend:** add 'Back to Top' scroll button on dashboard ([#261](https://github.com/eshaanag/CommitIQ/issues/261)) ([#293](https://github.com/eshaanag/CommitIQ/issues/293)) ([00777ae](https://github.com/eshaanag/CommitIQ/commit/00777ae998c5211c22fecd4971950ef791a6630c))
* **frontend:** highlight hotspots in Graph Explorer file tree ([#215](https://github.com/eshaanag/CommitIQ/issues/215)) ([53d2074](https://github.com/eshaanag/CommitIQ/commit/53d20749942a49e9415e2fbbbecedd9cf27a85cf))
* **frontend:** highlight hotspots in Graph Explorer file tree ([#215](https://github.com/eshaanag/CommitIQ/issues/215)) ([1be2bd0](https://github.com/eshaanag/CommitIQ/commit/1be2bd031934de8a89fd61201c3ae1ea765bcbca))
* **graph:** add skeleton loader for initial render (fixes [#222](https://github.com/eshaanag/CommitIQ/issues/222)) ([0dca96e](https://github.com/eshaanag/CommitIQ/commit/0dca96e2eedd36496fdf35a6bf1e1dc865b1a07f))
* **hotspots:** sortable table with LOC, Churn, Complexity, and Risk columns ([#294](https://github.com/eshaanag/CommitIQ/issues/294)) ([25b9a8a](https://github.com/eshaanag/CommitIQ/commit/25b9a8afe9769f9d2a3e6095eaa80b8a5da6f0de))
* implement custom time range selector for commit timeline and hotspots ([#223](https://github.com/eshaanag/CommitIQ/issues/223)) ([c76a52c](https://github.com/eshaanag/CommitIQ/commit/c76a52cafcedc9e66084a2d2e74bef8102d722be))
* Implement Prettier for automated code formatting ([d3978ea](https://github.com/eshaanag/CommitIQ/commit/d3978ea59098ae64ab546a3ad254ee375ba9de37))
* **ingestion:** add repository rescan button, backend endpoint, and stability fixes ([#26](https://github.com/eshaanag/CommitIQ/issues/26)) ([85ef7ba](https://github.com/eshaanag/CommitIQ/commit/85ef7ba256ae420b9f3c998f97ac626318d76616))
* **ingestion:** implement GraphQL integration for fetching GitHub PR data ([#385](https://github.com/eshaanag/CommitIQ/issues/385)) ([#402](https://github.com/eshaanag/CommitIQ/issues/402)) ([906279e](https://github.com/eshaanag/CommitIQ/commit/906279e4c2505fa40660af0e5a834fc5174e9445))
* integrate docrunner and ci-failure-pack ([f248c0f](https://github.com/eshaanag/CommitIQ/commit/f248c0fd3fb0df7306244319eb840d5e0f2ae8eb))
* integrate FreshstartCI ([2e03e67](https://github.com/eshaanag/CommitIQ/commit/2e03e67b99381c9f70e4d84203a520b02b181a11))
* **llm:** implement Circuit Breaker for LLM API calls (fixes [#336](https://github.com/eshaanag/CommitIQ/issues/336)) ([#407](https://github.com/eshaanag/CommitIQ/issues/407)) ([4f8e907](https://github.com/eshaanag/CommitIQ/commit/4f8e907229dd24e9e143373fa09ca0c1622c96ad))
* **llm:** implement intelligent Redis caching layer for narratives ([#335](https://github.com/eshaanag/CommitIQ/issues/335)) ([9d84a61](https://github.com/eshaanag/CommitIQ/commit/9d84a61ff3c9614f98e20e3c046b92f18feb2d58))
* **repo_ingestion:** parallelize metrics extraction using git worktrees and ProcessPoolExecutor ([#334](https://github.com/eshaanag/CommitIQ/issues/334)) ([a05d5fc](https://github.com/eshaanag/CommitIQ/commit/a05d5fc0fadef07496eb98331e7bea7ea594fa5e))
* **repo:** add active_contributors_count metric to Repo API and UI ([#315](https://github.com/eshaanag/CommitIQ/issues/315)) ([14ce37f](https://github.com/eshaanag/CommitIQ/commit/14ce37f8110ea81aab460f24e57b0b9e08b27167))
* **seeder:** fix lazyload and update GitHub link in landing page ([24fe3c2](https://github.com/eshaanag/CommitIQ/commit/24fe3c264acad5417d0cbc01dd49e89cde460cf0))
* **seeder:** seed actual real analyzed facebook/react repository data from JSON fixture on database startup ([a7e564c](https://github.com/eshaanag/CommitIQ/commit/a7e564cd6e9a426ab8efa6c653a6ff33fd9f4490))
* support cancelling active ingestion jobs ([b57ce4c](https://github.com/eshaanag/CommitIQ/commit/b57ce4c642248cf58639d4197178b11cc5317e8e))
* **ui:** add Built by Pixelary backlink to site footer ([1b11544](https://github.com/eshaanag/CommitIQ/commit/1b115449db14e1a47d274db7e4d20859b76386e3))
* upgrade repository to professional open-source standards ([3168c10](https://github.com/eshaanag/CommitIQ/commit/3168c105bcad4e9b875f8f392a95ca9ec5f8520e))
* **webhooks:** add support for parsing GitLab Webhooks for deployment frequency ([#386](https://github.com/eshaanag/CommitIQ/issues/386)) ([#403](https://github.com/eshaanag/CommitIQ/issues/403)) ([17f9dcc](https://github.com/eshaanag/CommitIQ/commit/17f9dcc3baf8b88125514a9bfb070f065d303018))


### Bug Fixes

* add postinstall to install frontend dependencies in FreshstartCI sandbox ([ced83dd](https://github.com/eshaanag/CommitIQ/commit/ced83ddec96ad81044fc5d4ca27236b500327bee))
* add pytest-cov to backend dev requirements and update root package.json ([5b7b5fc](https://github.com/eshaanag/CommitIQ/commit/5b7b5fcdfd244fcbf0e088be3081f6184107bc90))
* add root package.json and .env.example for FreshstartCI monorepo support ([6a569bc](https://github.com/eshaanag/CommitIQ/commit/6a569bce62e10aa1c465fa490cdc721a71f999b5))
* adjust FreshstartCI threshold to 50 pending buildCheck bug fix ([b319c1e](https://github.com/eshaanag/CommitIQ/commit/b319c1e27a3a323e259cf2893edb56633b805aff))
* **bus-factor:** avoid substring-based file exclusions ([eb759a5](https://github.com/eshaanag/CommitIQ/commit/eb759a5bcb2388c6bebfe4edff7641e7ca74f98e))
* cap ingestion commit limits to protect analysis jobs ([6fb83c3](https://github.com/eshaanag/CommitIQ/commit/6fb83c3b3cfafaeb052bc2b951776dc55a2f8e1d))
* catch subprocess.TimeoutExpired in git blame during bus factor extraction ([ff0dcc9](https://github.com/eshaanag/CommitIQ/commit/ff0dcc91344a1fb878d102e6c19d48b0ae78be65))
* **ci:** add pytest-cov to requirements-dev.txt and match vitest coverage package version ([5b91342](https://github.com/eshaanag/CommitIQ/commit/5b91342c6e8cf2573f02821df797b90ebd1548b7))
* **ci:** merge upstream main, resolve webhook schemas, codeql url sanitization, and prettier formatting ([49670f7](https://github.com/eshaanag/CommitIQ/commit/49670f74c83a2f9093cda7ede88f4c317fa07438))
* **ci:** restore full multi-platform frontend package-lock.json from upstream ([869c9d6](https://github.com/eshaanag/CommitIQ/commit/869c9d6c61a39199b59c352df23c8d6e62fb9abb))
* **ci:** synchronize frontend package.json with lockfile and update test command ([ac3e40a](https://github.com/eshaanag/CommitIQ/commit/ac3e40a9cdae8259fdc207192cc1c0ca041639c0))
* count co-change graph pairs once per commit ([b0759e7](https://github.com/eshaanag/CommitIQ/commit/b0759e7c2c93e24f962c83e6bad54e5fceb106a0))
* **database:** preserve mark_stale_jobs_as_error and demo seeder in init_db ([a4467c4](https://github.com/eshaanag/CommitIQ/commit/a4467c4991b42c6fd1bef5e410c493dbe3bcfb19))
* **db:** retry write transactions on transient sqlite database locks ([#259](https://github.com/eshaanag/CommitIQ/issues/259)) ([2ef4643](https://github.com/eshaanag/CommitIQ/commit/2ef4643554fe2b45390eace1916aa02315a0b41a))
* **db:** retry write transactions on transient sqlite database locks ([#259](https://github.com/eshaanag/CommitIQ/issues/259)) ([#269](https://github.com/eshaanag/CommitIQ/issues/269)) ([69bf8f7](https://github.com/eshaanag/CommitIQ/commit/69bf8f79f6e471c1f472fc95f2e6d45e3072d07c))
* deduplicate contributor identities in bus factor calculation ([019b96e](https://github.com/eshaanag/CommitIQ/commit/019b96ec98a8a48f0ac4fdd7f7fd59c0db1e23e3))
* **deps:** keep @vitest/coverage-v8 in frontend devDependencies ([13c3f0c](https://github.com/eshaanag/CommitIQ/commit/13c3f0c47eb267cf3cec1f0cb3d2283e009daf28))
* division by zero in health scorer when repository contains no code files ([#31](https://github.com/eshaanag/CommitIQ/issues/31)) ([#228](https://github.com/eshaanag/CommitIQ/issues/228)) ([9d26fdc](https://github.com/eshaanag/CommitIQ/commit/9d26fdc331701d521c5bf4fb9104942919a33e57))
* **frontend:** allow chart tooltips to overflow viewBox dynamically ([#217](https://github.com/eshaanag/CommitIQ/issues/217)) ([45c41a1](https://github.com/eshaanag/CommitIQ/commit/45c41a1fcdf0178fe87c166fe91353b665b3810e))
* **frontend:** allow chart tooltips to overflow viewBox dynamically on small screens ([fa4ad92](https://github.com/eshaanag/CommitIQ/commit/fa4ad92fb5f77515573c2659acb75fa2954453e2))
* **frontend:** resolve TS compiler errors in api.ts, LandingPage, and HotspotMap ([19d5eba](https://github.com/eshaanag/CommitIQ/commit/19d5ebac5d5e32d8053b06137c4b5e15290faf73))
* handle read-only PermissionError on Windows during cleanup ([#227](https://github.com/eshaanag/CommitIQ/issues/227)) ([1469890](https://github.com/eshaanag/CommitIQ/commit/146989035d23254f8c44e800e1e566f6ce1e649e))
* incorporate contributor bug fixes (timeout, rmtree, empty repo) ([4c783c8](https://github.com/eshaanag/CommitIQ/commit/4c783c8efb0937e99bdcb78f534661354c147bf7))
* **ingestion:** handle missing git commit author name or email gracefully ([#291](https://github.com/eshaanag/CommitIQ/issues/291)) ([3663c41](https://github.com/eshaanag/CommitIQ/commit/3663c41caceba17d1f530408fcb1c8934dc2e658))
* **ingestion:** normalize renamed file paths to latest canonical names in co-change coupling ([7c1f061](https://github.com/eshaanag/CommitIQ/commit/7c1f06135bdf024d0e44a5fa572f896611946768))
* **ingestion:** normalize repository URLs and names to lowercase ([#206](https://github.com/eshaanag/CommitIQ/issues/206)) ([628b92e](https://github.com/eshaanag/CommitIQ/commit/628b92e7b1777cc1784cd2fb06acfb2f3b92843a))
* **ingestion:** normalize repository URLs and names to lowercase ([#206](https://github.com/eshaanag/CommitIQ/issues/206)) ([c1d6a92](https://github.com/eshaanag/CommitIQ/commit/c1d6a92efc71ceac22a5ae7a4a8d1f0298907130))
* **ingestion:** resolve syntax error in clone_service and imports in DashboardPage ([95ce74e](https://github.com/eshaanag/CommitIQ/commit/95ce74e854ac360841cfdde6ba795db3626388ef))
* **ingestion:** sanitize and strip token credentials from repository URLs ([d1ac5ce](https://github.com/eshaanag/CommitIQ/commit/d1ac5ce17d43af924ee6ae42beda43e38e7cdcdf))
* **ingestion:** stream git diff logs line-by-line to prevent memory spikes on giant commits ([2b99601](https://github.com/eshaanag/CommitIQ/commit/2b9960149033c4cdc0f352fe055787d46c0f5405))
* keep clone cleanup from masking ingestion failures ([1a1e16d](https://github.com/eshaanag/CommitIQ/commit/1a1e16de0722b0806a792202ea3aa9202cc379a1))
* **layout:** replace invalid w-sidebar class with w-80 to restore main dashboard content rendering ([c4b461a](https://github.com/eshaanag/CommitIQ/commit/c4b461ad0b96e0e183ebe46cd8269ab6ad1c15c3))
* **llm_analysis:** resolve fastAPI streaming response closed session bug (fixes [#25](https://github.com/eshaanag/CommitIQ/issues/25)) ([4313ac8](https://github.com/eshaanag/CommitIQ/commit/4313ac87781980970d0db70875025f0ea55c1b00))
* make GraphCodeBERT analysis explicitly opt-in ([d834ed9](https://github.com/eshaanag/CommitIQ/commit/d834ed92bc51b4cd435833b920610d76a6072413))
* make ingestion submissions reuse active jobs ([b8d53a9](https://github.com/eshaanag/CommitIQ/commit/b8d53a93eee9559fb6e4af9cce6b60be3341c323))
* mark stale/orphaned ingestion jobs as error on startup [#26](https://github.com/eshaanag/CommitIQ/issues/26) ([41cac23](https://github.com/eshaanag/CommitIQ/commit/41cac23ef6260e184705f36fab16b2f91dd081d3))
* preserve relative import levels in Python import parser ([3bbcd6b](https://github.com/eshaanag/CommitIQ/commit/3bbcd6b62a93c6ece208c5d19a96ec48ddf311b1))
* refactor clone_service to use non-blocking async subprocesses ([86db413](https://github.com/eshaanag/CommitIQ/commit/86db413fc07dae9749eff04969b85eb3e521deae))
* remove invalid badges, update avatars, and fix CI dependencies ([791c698](https://github.com/eshaanag/CommitIQ/commit/791c69826f98fb97d52b17300aa8befb94a894d1))
* remove unpublished actions to fix CI ([74fd405](https://github.com/eshaanag/CommitIQ/commit/74fd4052f793ffbfccef2bc600a32b9f7ce3051e))
* replace missing demo seed path with bounded analysis ([93e8972](https://github.com/eshaanag/CommitIQ/commit/93e8972ea515da358d5ddb050727bc701a49aee6))
* **repo:** enforce case-insensitive uniqueness on repo slug ([#303](https://github.com/eshaanag/CommitIQ/issues/303)) ([e632de6](https://github.com/eshaanag/CommitIQ/commit/e632de69b70a639d1dc7dec75046c4ef226c5ade))
* report LLM usage from billable provider calls ([ad667be](https://github.com/eshaanag/CommitIQ/commit/ad667be886eb62023ac521f6bf7030302231b99c))
* require explicit CORS origins in production ([03bf056](https://github.com/eshaanag/CommitIQ/commit/03bf056970439a422024d6d73c2222818b6683d5))
* resolve peer dependency conflict and add root lockfile for FreshstartCI ([b048591](https://github.com/eshaanag/CommitIQ/commit/b0485914d33897c3cf4cc72001245850d4f55e65))
* resolve shutil.rmtree python 3 scope bug and missing dateutil ([ff9fac9](https://github.com/eshaanag/CommitIQ/commit/ff9fac9eff3ec328b4b4e3bddb002cb793ca59d3))
* restore ingestRepo branch parameter and remove vercel build artifacts ([94f5f2e](https://github.com/eshaanag/CommitIQ/commit/94f5f2e9ae379ad5cc7965a87e32822efba85a2b))
* **router:** restore limit and offset pagination in list_repos ([640c441](https://github.com/eshaanag/CommitIQ/commit/640c441a3633c83223e3b6ce2f81c3a8d948bd5c))
* **router:** restore start_date and end_date query parameters in get_hotspots ([681cb06](https://github.com/eshaanag/CommitIQ/commit/681cb066c586fbd974fc85738c9a792b61be91e8))
* sanitize commit messages to prevent unsafe HTML tags and XSS ([#221](https://github.com/eshaanag/CommitIQ/issues/221)) ([#229](https://github.com/eshaanag/CommitIQ/issues/229)) ([70f0434](https://github.com/eshaanag/CommitIQ/commit/70f043483ee7dced649d9298127d3105dc3a44ad))
* **security:** eliminate remaining CodeQL alerts for log-injection, cyclic imports, and unused globals ([4f0f512](https://github.com/eshaanag/CommitIQ/commit/4f0f512439bcd0745c8871f9f980e285085c200a))
* **security:** resolve CodeQL security, reliability, and code quality alerts ([7f4ed7b](https://github.com/eshaanag/CommitIQ/commit/7f4ed7b42ea860713d4b3a177f157df663302f11))
* **security:** resolve SSRF dataflow, URL hostname validation, and cyclic imports ([8897924](https://github.com/eshaanag/CommitIQ/commit/889792430e639feb7670b5ac7bc5f92aa78fc809))
* **types:** correct DemoPage repo status check to ready ([9cb1cd0](https://github.com/eshaanag/CommitIQ/commit/9cb1cd0e9865f81acb37c4415f50bd636c6fdb09))
* **types:** make total_file_count and total_repo_loc optional on Repo interface to fix test type compilation on Vercel ([d474da8](https://github.com/eshaanag/CommitIQ/commit/d474da8845d145ab29e070f7cc4225632795ae32))
* use deploy-safe frontend API base path ([8e43f38](https://github.com/eshaanag/CommitIQ/commit/8e43f38b26cd8cd4e909be178634fcb770a570bc))


### Performance Improvements

* **demo:** load demo dashboard instantly if already analyzed ([87d0e2f](https://github.com/eshaanag/CommitIQ/commit/87d0e2f944c999929852335e65b88379b6868abe))
* split route bundles to reduce initial payload ([4145e84](https://github.com/eshaanag/CommitIQ/commit/4145e846a6de6ea5fe3fd7dfce2ca048c9129462))

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
