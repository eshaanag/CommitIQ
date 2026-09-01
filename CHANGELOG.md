# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 1.0.0 (2026-09-01)


### Features

* add branch selection support ([2f84cb7](https://github.com/eshaanag/CommitIQ/commit/2f84cb7056d0f1f358744403f128ffce219ce8f0))
* add branch selection support ([#210](https://github.com/eshaanag/CommitIQ/issues/210)) ([f5e34aa](https://github.com/eshaanag/CommitIQ/commit/f5e34aabc9d8e7e399ff9f6d3cb50a5c321a6744))
* add CICDPipelineMonitor page with 5-tab pipeline dashboard ([bc204d8](https://github.com/eshaanag/CommitIQ/commit/bc204d81e4396b341d849bb8ea4df44807248c7a))
* Add Code Quality and AI Impact metrics ([03cf55b](https://github.com/eshaanag/CommitIQ/commit/03cf55b16307d471fb916f7148636aa5c7e76769))
* add Commit Health Radar — 645-line multi-dimensional health scoring dashboard ([e2fc22f](https://github.com/eshaanag/CommitIQ/commit/e2fc22f19178148675135b3e3a39bb932386789f))
* add Commit Health Radar — multi-dimensional repo health analysis ([e828311](https://github.com/eshaanag/CommitIQ/commit/e8283114dcc72585c14713221d8d1182a1acf4d6))
* add commit health radar dashboard with quality metrics and team insights ([4baa449](https://github.com/eshaanag/CommitIQ/commit/4baa449334e03a90bffc11f144df0c9d72f26483))
* Add Cycle Time and DORA metrics ([8e991c2](https://github.com/eshaanag/CommitIQ/commit/8e991c274d832f011a7d63bd862085617e5b9004))
* Add Dockerfile and docker-compose.yml for containerized development ([#203](https://github.com/eshaanag/CommitIQ/issues/203)) ([7916299](https://github.com/eshaanag/CommitIQ/commit/7916299a047e31d6156c3eee81b3fb0258b0f0f4))
* add exclude_merges flag to commit walker ([#325](https://github.com/eshaanag/CommitIQ/issues/325)) ([#440](https://github.com/eshaanag/CommitIQ/issues/440)) ([e7e8f92](https://github.com/eshaanag/CommitIQ/commit/e7e8f925bdbd368ed4d649c272806ca5e2675259))
* add Go import extraction and TypeScript path alias resolution ([#348](https://github.com/eshaanag/CommitIQ/issues/348)) ([#410](https://github.com/eshaanag/CommitIQ/issues/410)) ([6db04ef](https://github.com/eshaanag/CommitIQ/commit/6db04efa1ba5b7d7bb6cd58de6347cb7f71273e2))
* add pagination support to list_repos endpoint ([f29e168](https://github.com/eshaanag/CommitIQ/commit/f29e168a436c5f4c5fd080725f291b4d833c2c08))
* add Release Impact Analyzer — 444-line deployment risk and post-release health dashboard ([c65bd1a](https://github.com/eshaanag/CommitIQ/commit/c65bd1a2fc8c6a9f2a09d4061f040eb45b356531))
* add reset button to time range selector ([89d236b](https://github.com/eshaanag/CommitIQ/commit/89d236b9e1c4bd45aa676bd645092cc353e8f4e3))
* add side-by-side repository comparison and reporting ([#299](https://github.com/eshaanag/CommitIQ/issues/299)) ([c0c2056](https://github.com/eshaanag/CommitIQ/commit/c0c205674b24094537cd7931ae20ae2dc98fbe9c))
* add skeleton loader for Health Timeline chart ([9deab27](https://github.com/eshaanag/CommitIQ/commit/9deab274fb76edb6fe1f81601592d6f8d21b30c7)), closes [#305](https://github.com/eshaanag/CommitIQ/issues/305)
* add Team Collaboration Hub — 535-line PR review and knowledge sharing dashboard ([ba412e4](https://github.com/eshaanag/CommitIQ/commit/ba412e4e3fa14d770c33c9160bfe21383a45a4f0))
* add team collaboration hub with activity feed and code review stats ([864e979](https://github.com/eshaanag/CommitIQ/commit/864e9790f29694fc5e5dcf2379fc9c6e5cc93776))
* Add Team Health metrics and dashboard ([5498ff6](https://github.com/eshaanag/CommitIQ/commit/5498ff648af21c3a5d34e53fefe2d123ed0dc66d))
* add tracked schema migration workflow ([60f4591](https://github.com/eshaanag/CommitIQ/commit/60f45915fa0b7a6321cd6fb00b1f0f18ab4ef6dc))
* **api:** support pagination for repository hotspots endpoint ([#321](https://github.com/eshaanag/CommitIQ/issues/321)) ([c9ab46c](https://github.com/eshaanag/CommitIQ/commit/c9ab46c0ef77714214f3f2cba22fd8b55fb27c3e))
* background cron job to periodically refresh metrics ([#387](https://github.com/eshaanag/CommitIQ/issues/387)) ([#412](https://github.com/eshaanag/CommitIQ/issues/412)) ([e6ff77a](https://github.com/eshaanag/CommitIQ/commit/e6ff77aee7a1b00219842fbacad49564844163bc))
* **bus-factor:** add module path and owner search filter input ([#384](https://github.com/eshaanag/CommitIQ/issues/384), [#466](https://github.com/eshaanag/CommitIQ/issues/466)) ([69fb329](https://github.com/eshaanag/CommitIQ/commit/69fb3298183a9ee0bdbd9deeef086e4bd0f41304))
* cache and reuse git commit history walks for faster rescans ([#295](https://github.com/eshaanag/CommitIQ/issues/295)) ([c88f0a7](https://github.com/eshaanag/CommitIQ/commit/c88f0a78fb2c752015302fe6f8069248a3dd4986))
* **cicd:** add CI/CD pipeline monitor dashboard page ([#483](https://github.com/eshaanag/CommitIQ/issues/483)) ([d766c7c](https://github.com/eshaanag/CommitIQ/commit/d766c7c7b99ea4728be1a7bac31af628961cc68b))
* **collab:** add Team Collaboration Hub workspace ([#479](https://github.com/eshaanag/CommitIQ/issues/479), [#480](https://github.com/eshaanag/CommitIQ/issues/480)) ([34ac5de](https://github.com/eshaanag/CommitIQ/commit/34ac5de35cb1a2c92f7cd9ab0a68c91c9cfd9947))
* complete open source professionalization (phase 2) ([a3b6aa3](https://github.com/eshaanag/CommitIQ/commit/a3b6aa368f8451726d710ce25229287637c51899))
* confirmation modal before deleting a repository ([9df9c58](https://github.com/eshaanag/CommitIQ/commit/9df9c58eb6f125627dcaa845637b48ffe278b832)), closes [#302](https://github.com/eshaanag/CommitIQ/issues/302)
* Create ARCHITECTURE.md documentation ([7d42479](https://github.com/eshaanag/CommitIQ/commit/7d42479ce1905ce79749ee966d002ad618bbc557))
* **dashboard:** add informative hover tooltips to explain DORA metrics scores ([4e9a2c6](https://github.com/eshaanag/CommitIQ/commit/4e9a2c6d00dbe7945b2ec2af24b9e94b8f0cda9d))
* **dashboard:** add last updated timestamp to dashboard header ([#382](https://github.com/eshaanag/CommitIQ/issues/382), [#462](https://github.com/eshaanag/CommitIQ/issues/462)) ([70ef51e](https://github.com/eshaanag/CommitIQ/commit/70ef51e66c2acad35a7e4546ddd3dd5a2992c0b3))
* **dashboard:** add last updated timestamp to header ([#382](https://github.com/eshaanag/CommitIQ/issues/382)) ([c3c69aa](https://github.com/eshaanag/CommitIQ/commit/c3c69aa9cab8294582a953fbf641847b2e3ac5e4))
* **dashboard:** Display 'Last updated: X minutes ago' badge inside the dashboard header nav ([171cacb](https://github.com/eshaanag/CommitIQ/commit/171cacb6247d8ca1b7742690097cd6c0627e889c))
* **dashboard:** show single point of failure warning when min bus factor is 1 ([8653ecb](https://github.com/eshaanag/CommitIQ/commit/8653ecb0ffce121ac9c2f438bf0a9e1994d29be0))
* **dashboard:** show total file count and loc on overview (fixes [#216](https://github.com/eshaanag/CommitIQ/issues/216)) ([9d37c89](https://github.com/eshaanag/CommitIQ/commit/9d37c89bb2f51ff757231c3f72aa7ae4abb33ca7))
* **database:** implement automated database migrations check on startup ([#317](https://github.com/eshaanag/CommitIQ/issues/317)) ([034488d](https://github.com/eshaanag/CommitIQ/commit/034488db9c7af41e908039f2af1cc3069b5eacf1))
* **demo:** add frontend-only static mock fallback for facebook-react demo enabling instant loading without backend ([6419719](https://github.com/eshaanag/CommitIQ/commit/6419719ff863d1fe19da4e41670a0a0197180a64))
* **demo:** auto-seed facebook-react demo data on application startup ([37201ab](https://github.com/eshaanag/CommitIQ/commit/37201ab921df61402ce307cfbbf8b9a7f83959cc))
* **demo:** revert client-side mock interception to point back to the backend database ([43bcf5f](https://github.com/eshaanag/CommitIQ/commit/43bcf5f94621d10c2a9510ef9ef3276f08b6cf77))
* **dora:** add DORA metrics hover tooltips ([#365](https://github.com/eshaanag/CommitIQ/issues/365), [#464](https://github.com/eshaanag/CommitIQ/issues/464)) ([01cf472](https://github.com/eshaanag/CommitIQ/commit/01cf47266729562e7ec456d64d3103ee0f1adc07))
* **dora:** add DORA metrics hover tooltips and card ([#365](https://github.com/eshaanag/CommitIQ/issues/365), [#464](https://github.com/eshaanag/CommitIQ/issues/464)) ([c170783](https://github.com/eshaanag/CommitIQ/commit/c17078389dc734f27c766d98a866b4b6d89a9a7e))
* enforce storage quota and transaction rollback safety in ingestion pipeline ([9137af4](https://github.com/eshaanag/CommitIQ/commit/9137af4856844ea4eb9b7e7289780c0c29e934fb))
* explain repo health risk reasons ([76c2bd9](https://github.com/eshaanag/CommitIQ/commit/76c2bd9c2918b63e4a850eb5469bff99d21e8ab0))
* **frontend:** add 'Back to Top' scroll button on dashboard ([#261](https://github.com/eshaanag/CommitIQ/issues/261)) ([#293](https://github.com/eshaanag/CommitIQ/issues/293)) ([00777ae](https://github.com/eshaanag/CommitIQ/commit/00777ae998c5211c22fecd4971950ef791a6630c))
* **frontend:** add metric explanation tooltips with definitions and formulas for dashboard health score inputs ([#265](https://github.com/eshaanag/CommitIQ/issues/265)) ([#433](https://github.com/eshaanag/CommitIQ/issues/433)) ([17d6c30](https://github.com/eshaanag/CommitIQ/commit/17d6c30de745857b46bffbf176ec9b1e60a68141))
* **frontend:** highlight hotspots in Graph Explorer file tree ([#215](https://github.com/eshaanag/CommitIQ/issues/215)) ([53d2074](https://github.com/eshaanag/CommitIQ/commit/53d20749942a49e9415e2fbbbecedd9cf27a85cf))
* **frontend:** highlight hotspots in Graph Explorer file tree ([#215](https://github.com/eshaanag/CommitIQ/issues/215)) ([1be2bd0](https://github.com/eshaanag/CommitIQ/commit/1be2bd031934de8a89fd61201c3ae1ea765bcbca))
* **graph:** add skeleton loader for initial render (fixes [#222](https://github.com/eshaanag/CommitIQ/issues/222)) ([0dca96e](https://github.com/eshaanag/CommitIQ/commit/0dca96e2eedd36496fdf35a6bf1e1dc865b1a07f))
* **health:** add Commit Health Radar multi-metric dashboard ([#477](https://github.com/eshaanag/CommitIQ/issues/477), [#478](https://github.com/eshaanag/CommitIQ/issues/478)) ([24db81b](https://github.com/eshaanag/CommitIQ/commit/24db81b14860f3b4bdd292fdae11ed7bf652814d))
* **hotspots:** sortable table with LOC, Churn, Complexity, and Risk columns ([#294](https://github.com/eshaanag/CommitIQ/issues/294)) ([25b9a8a](https://github.com/eshaanag/CommitIQ/commit/25b9a8afe9769f9d2a3e6095eaa80b8a5da6f0de))
* implement custom time range selector for commit timeline and hotspots ([#223](https://github.com/eshaanag/CommitIQ/issues/223)) ([c76a52c](https://github.com/eshaanag/CommitIQ/commit/c76a52cafcedc9e66084a2d2e74bef8102d722be))
* Implement Prettier for automated code formatting ([d3978ea](https://github.com/eshaanag/CommitIQ/commit/d3978ea59098ae64ab546a3ad254ee375ba9de37))
* **ingestion:** add repository rescan button, backend endpoint, and stability fixes ([#26](https://github.com/eshaanag/CommitIQ/issues/26)) ([85ef7ba](https://github.com/eshaanag/CommitIQ/commit/85ef7ba256ae420b9f3c998f97ac626318d76616))
* **ingestion:** implement GraphQL integration for fetching GitHub PR data ([#385](https://github.com/eshaanag/CommitIQ/issues/385)) ([#402](https://github.com/eshaanag/CommitIQ/issues/402)) ([906279e](https://github.com/eshaanag/CommitIQ/commit/906279e4c2505fa40660af0e5a834fc5174e9445))
* integrate docrunner and ci-failure-pack ([f248c0f](https://github.com/eshaanag/CommitIQ/commit/f248c0fd3fb0df7306244319eb840d5e0f2ae8eb))
* integrate FreshstartCI ([2e03e67](https://github.com/eshaanag/CommitIQ/commit/2e03e67b99381c9f70e4d84203a520b02b181a11))
* **llm:** add robust regex fallback parser for JSON responses ([#318](https://github.com/eshaanag/CommitIQ/issues/318), [#498](https://github.com/eshaanag/CommitIQ/issues/498)) ([7e01131](https://github.com/eshaanag/CommitIQ/commit/7e011315f842f0682d9a8fff7796b39342cebf9d))
* **llm:** add robust regex fallback parser for JSON responses (fixes [#318](https://github.com/eshaanag/CommitIQ/issues/318)) ([c5f8630](https://github.com/eshaanag/CommitIQ/commit/c5f8630080ee0c224bd7b9750bbe511d76c7d6fb))
* **llm:** implement Circuit Breaker for LLM API calls (fixes [#336](https://github.com/eshaanag/CommitIQ/issues/336)) ([#407](https://github.com/eshaanag/CommitIQ/issues/407)) ([4f8e907](https://github.com/eshaanag/CommitIQ/commit/4f8e907229dd24e9e143373fa09ca0c1622c96ad))
* **llm:** implement intelligent Redis caching layer for narratives ([#335](https://github.com/eshaanag/CommitIQ/issues/335), [#496](https://github.com/eshaanag/CommitIQ/issues/496)) ([432686e](https://github.com/eshaanag/CommitIQ/commit/432686ef82f2da67cf78142a6c0b2dedc1af125c))
* **llm:** implement intelligent Redis caching layer for narratives ([#335](https://github.com/eshaanag/CommitIQ/issues/335)) ([9d84a61](https://github.com/eshaanag/CommitIQ/commit/9d84a61ff3c9614f98e20e3c046b92f18feb2d58))
* **llm:** implement intelligent Redis caching layer for narratives (fixes [#335](https://github.com/eshaanag/CommitIQ/issues/335)) ([4d97018](https://github.com/eshaanag/CommitIQ/commit/4d970182724735d019700dfa9567ec33707862c5))
* **llm:** stream LLM narratives via Server-Sent Events ([#394](https://github.com/eshaanag/CommitIQ/issues/394), [#452](https://github.com/eshaanag/CommitIQ/issues/452)) ([63ff186](https://github.com/eshaanag/CommitIQ/commit/63ff1865d051b4da00b146679f07aadc8890720d))
* **metrics:** add actionable health recommendations engine ([a2ea700](https://github.com/eshaanag/CommitIQ/commit/a2ea70013d25bd36b790328495f4b2d8db594b66))
* **metrics:** add actionable health recommendations engine ([#460](https://github.com/eshaanag/CommitIQ/issues/460), [#461](https://github.com/eshaanag/CommitIQ/issues/461)) ([e39d5b4](https://github.com/eshaanag/CommitIQ/commit/e39d5b406dd2a8954d141a8c17fb70b23cc934a2))
* **metrics:** add Commit Message Quality Linter & Dashboard ([#485](https://github.com/eshaanag/CommitIQ/issues/485), [#487](https://github.com/eshaanag/CommitIQ/issues/487)) ([f4081fb](https://github.com/eshaanag/CommitIQ/commit/f4081fb3903a25c15896b1c66f397e57bfea7373))
* **metrics:** add commit message quality linter and dashboard ([5fd9dc1](https://github.com/eshaanag/CommitIQ/commit/5fd9dc14943aaa28338c35a818a705f94932ff23))
* **metrics:** add velocity & delivery cadence dashboard ([33e366f](https://github.com/eshaanag/CommitIQ/commit/33e366ff5d6c8d612f461ea5caac8fb33a919cc7))
* **metrics:** add Velocity & Delivery Cadence Dashboard ([#481](https://github.com/eshaanag/CommitIQ/issues/481), [#482](https://github.com/eshaanag/CommitIQ/issues/482)) ([b10ba7a](https://github.com/eshaanag/CommitIQ/commit/b10ba7a1ddf3e57e66cfa9bd09c59dda33bfe605))
* **metrics:** add weekly health digest with trend analysis and regression alerts ([c3248d2](https://github.com/eshaanag/CommitIQ/commit/c3248d26e187b4bcaaeb9ecdaac09c129b585db2))
* **metrics:** add weekly health digest with trend analysis and regression alerts ([#458](https://github.com/eshaanag/CommitIQ/issues/458), [#459](https://github.com/eshaanag/CommitIQ/issues/459)) ([1be9667](https://github.com/eshaanag/CommitIQ/commit/1be9667896cc3f01c048020564e09fdc97a24ea5))
* **metrics:** support start_date and end_date in DORA metrics calculation ([#375](https://github.com/eshaanag/CommitIQ/issues/375)) ([8ec83d3](https://github.com/eshaanag/CommitIQ/commit/8ec83d31d36504d357c6a87b6fa2082e0dc48394))
* **repo_ingestion:** parallelize metrics extraction using git worktrees and ProcessPoolExecutor ([#334](https://github.com/eshaanag/CommitIQ/issues/334), [#497](https://github.com/eshaanag/CommitIQ/issues/497)) ([526cf5b](https://github.com/eshaanag/CommitIQ/commit/526cf5b078c44e89c0521482c4a568c3bc007211))
* **repo_ingestion:** parallelize metrics extraction using git worktrees and ProcessPoolExecutor ([#334](https://github.com/eshaanag/CommitIQ/issues/334)) ([a05d5fc](https://github.com/eshaanag/CommitIQ/commit/a05d5fc0fadef07496eb98331e7bea7ea594fa5e))
* **repo_ingestion:** parallelize metrics extraction using git worktrees and ProcessPoolExecutor (fixes [#334](https://github.com/eshaanag/CommitIQ/issues/334)) ([c2dde9d](https://github.com/eshaanag/CommitIQ/commit/c2dde9d880650c9209f41134366cb9c2ad7b8b33))
* **repo:** add active_contributors_count metric to Repo API and UI ([#315](https://github.com/eshaanag/CommitIQ/issues/315)) ([14ce37f](https://github.com/eshaanag/CommitIQ/commit/14ce37f8110ea81aab460f24e57b0b9e08b27167))
* **reports:** add Deployment Timeline Dashboard ([#488](https://github.com/eshaanag/CommitIQ/issues/488), [#489](https://github.com/eshaanag/CommitIQ/issues/489)) ([f352e83](https://github.com/eshaanag/CommitIQ/commit/f352e83a2ad4aff43e62ab09c1352f060a2d98cb))
* **reports:** add deployment timeline dashboard with sparkline and env breakdown ([c6988c2](https://github.com/eshaanag/CommitIQ/commit/c6988c24c208aa71588977886ac880a71f485f49))
* **reports:** add scheduled health report feature with webhook delivery ([aa96661](https://github.com/eshaanag/CommitIQ/commit/aa96661a667ebf842968e9fdeb020ed23c05897d))
* **reports:** add scheduled health reports and webhook delivery ([#456](https://github.com/eshaanag/CommitIQ/issues/456), [#457](https://github.com/eshaanag/CommitIQ/issues/457)) ([c97e495](https://github.com/eshaanag/CommitIQ/commit/c97e49556830c483bcc29a32d0adbf16121c4bc7))
* **seeder:** fix lazyload and update GitHub link in landing page ([24fe3c2](https://github.com/eshaanag/CommitIQ/commit/24fe3c264acad5417d0cbc01dd49e89cde460cf0))
* **seeder:** seed actual real analyzed facebook/react repository data from JSON fixture on database startup ([a7e564c](https://github.com/eshaanag/CommitIQ/commit/a7e564cd6e9a426ab8efa6c653a6ff33fd9f4490))
* support cancelling active ingestion jobs ([b57ce4c](https://github.com/eshaanag/CommitIQ/commit/b57ce4c642248cf58639d4197178b11cc5317e8e))
* **ui:** add 'Copy Markdown' button to NarrativeCard ([9219966](https://github.com/eshaanag/CommitIQ/commit/921996655dedc2091460cd7e23f8d5309135e1d3))
* **ui:** add author search filter to CommitList ([13595ea](https://github.com/eshaanag/CommitIQ/commit/13595eadc59dc8e1024a303415c013002f1c9b0b))
* **ui:** add Built by Pixelary backlink to site footer ([1b11544](https://github.com/eshaanag/CommitIQ/commit/1b115449db14e1a47d274db7e4d20859b76386e3))
* **ui:** add Commit Health Radar multi-dimensional visualization ([#442](https://github.com/eshaanag/CommitIQ/issues/442)) ([8cea981](https://github.com/eshaanag/CommitIQ/commit/8cea9815cc3353bca99c921dd8a27ce9302d49be))
* **ui:** add Copy Markdown button to LLM narrative card ([#310](https://github.com/eshaanag/CommitIQ/issues/310), [#492](https://github.com/eshaanag/CommitIQ/issues/492)) ([7565d8d](https://github.com/eshaanag/CommitIQ/commit/7565d8dace6f0e44d15fa70cd594ddaae849c0a7))
* **ui:** add dynamic real-time search filtering for repository view lists ([0e77cab](https://github.com/eshaanag/CommitIQ/commit/0e77cabc0403390d72af4f2a8ee775381256e996))
* **ui:** add Escape and Enter keyboard shortcuts to modals ([1f88f28](https://github.com/eshaanag/CommitIQ/commit/1f88f280fbc11dcf8abed9fad557944a441053e2))
* **ui:** add Escape and Enter keyboard shortcuts to modals ([#311](https://github.com/eshaanag/CommitIQ/issues/311), [#491](https://github.com/eshaanag/CommitIQ/issues/491)) ([f6c3da2](https://github.com/eshaanag/CommitIQ/commit/f6c3da289f46bf0f36e58890dbf5e0a8f1528b85))
* **ui:** add real-time search filter for landing page repositories ([#205](https://github.com/eshaanag/CommitIQ/issues/205), [#490](https://github.com/eshaanag/CommitIQ/issues/490)) ([b7655c9](https://github.com/eshaanag/CommitIQ/commit/b7655c91e6b8004920fa06dea97022e9d007e8c2))
* **ui:** add Release Impact Analyzer dashboard ([#446](https://github.com/eshaanag/CommitIQ/issues/446)) ([585a3ad](https://github.com/eshaanag/CommitIQ/commit/585a3adb77b7547d549e97fac64245fbc1067415))
* **ui:** add Team Collaboration Hub analytics ([#444](https://github.com/eshaanag/CommitIQ/issues/444)) ([5125c0f](https://github.com/eshaanag/CommitIQ/commit/5125c0f0f4f377f10febf3470793caee43b1b3a6))
* **ui:** add warning banner when repository has 0 commits in analyzed range ([#208](https://github.com/eshaanag/CommitIQ/issues/208), [#495](https://github.com/eshaanag/CommitIQ/issues/495)) ([f528bb6](https://github.com/eshaanag/CommitIQ/commit/f528bb66aef626b6960c1707a872dd12cd6fd3b9))
* **ui:** add warning banner when repository has 0 commits in analyzed range ([#208](https://github.com/eshaanag/CommitIQ/issues/208)) ([8dfb2d3](https://github.com/eshaanag/CommitIQ/commit/8dfb2d386e543a98762021f737c89ea3f4ef639e))
* **ui:** customize scrollbar for health timeline ([#370](https://github.com/eshaanag/CommitIQ/issues/370), [#455](https://github.com/eshaanag/CommitIQ/issues/455)) ([17ec8ff](https://github.com/eshaanag/CommitIQ/commit/17ec8ff30226b78d43084eac53bf6bca7996462c))
* **ui:** implement dark mode theme persistence in localStorage ([#383](https://github.com/eshaanag/CommitIQ/issues/383), [#465](https://github.com/eshaanag/CommitIQ/issues/465)) ([e249b56](https://github.com/eshaanag/CommitIQ/commit/e249b56dbf765f085b9f3c9b227d2478c6c0b921))
* **ui:** replace generic pulsing loaders with layout-specific skeletons for DORA and Code Quality ([#378](https://github.com/eshaanag/CommitIQ/issues/378)) ([0f32f06](https://github.com/eshaanag/CommitIQ/commit/0f32f06017d8ed9874df7148103b0b906b87a6ec))
* **ui:** sort Bus Factor table rows by ownership percentage descending ([#371](https://github.com/eshaanag/CommitIQ/issues/371), [#454](https://github.com/eshaanag/CommitIQ/issues/454)) ([3bb154a](https://github.com/eshaanag/CommitIQ/commit/3bb154ae28abb9f55abc0412052e2b5a710b48f2))
* **ui:** support filtering commits by author name in dashboard ([#308](https://github.com/eshaanag/CommitIQ/issues/308), [#493](https://github.com/eshaanag/CommitIQ/issues/493)) ([fc1bcf8](https://github.com/eshaanag/CommitIQ/commit/fc1bcf877125dfc8456b4082c0a27d7dc852c6f8))
* upgrade repository to professional open-source standards ([3168c10](https://github.com/eshaanag/CommitIQ/commit/3168c105bcad4e9b875f8f392a95ca9ec5f8520e))
* **webhooks:** add support for parsing GitLab Webhooks for deployment frequency ([#386](https://github.com/eshaanag/CommitIQ/issues/386)) ([#403](https://github.com/eshaanag/CommitIQ/issues/403)) ([17f9dcc](https://github.com/eshaanag/CommitIQ/commit/17f9dcc3baf8b88125514a9bfb070f065d303018))


### Bug Fixes

* add postinstall to install frontend dependencies in FreshstartCI sandbox ([ced83dd](https://github.com/eshaanag/CommitIQ/commit/ced83ddec96ad81044fc5d4ca27236b500327bee))
* add pytest-cov to backend dev requirements and update root package.json ([5b7b5fc](https://github.com/eshaanag/CommitIQ/commit/5b7b5fcdfd244fcbf0e088be3081f6184107bc90))
* add root package.json and .env.example for FreshstartCI monorepo support ([6a569bc](https://github.com/eshaanag/CommitIQ/commit/6a569bce62e10aa1c465fa490cdc721a71f999b5))
* adjust FreshstartCI threshold to 50 pending buildCheck bug fix ([b319c1e](https://github.com/eshaanag/CommitIQ/commit/b319c1e27a3a323e259cf2893edb56633b805aff))
* bound graph node label width ([dfef9a3](https://github.com/eshaanag/CommitIQ/commit/dfef9a34245cbbee2aa98fbc2af773b95f9a4f3e))
* **bus-factor:** avoid substring-based file exclusions ([eb759a5](https://github.com/eshaanag/CommitIQ/commit/eb759a5bcb2388c6bebfe4edff7641e7ca74f98e))
* cap ingestion commit limits to protect analysis jobs ([6fb83c3](https://github.com/eshaanag/CommitIQ/commit/6fb83c3b3cfafaeb052bc2b951776dc55a2f8e1d))
* catch subprocess.TimeoutExpired in git blame during bus factor extraction ([ff0dcc9](https://github.com/eshaanag/CommitIQ/commit/ff0dcc91344a1fb878d102e6c19d48b0ae78be65))
* **ci:** add pytest-cov to requirements-dev.txt and match vitest coverage package version ([5b91342](https://github.com/eshaanag/CommitIQ/commit/5b91342c6e8cf2573f02821df797b90ebd1548b7))
* **ci:** ensure sqlite schema is initialized in concurrency tests and fix TypeScript lint in DashboardPage ([b12caff](https://github.com/eshaanag/CommitIQ/commit/b12cafffbfbc959846026ee323c63bb9c443181a))
* **ci:** merge upstream main, resolve webhook schemas, codeql url sanitization, and prettier formatting ([49670f7](https://github.com/eshaanag/CommitIQ/commit/49670f74c83a2f9093cda7ede88f4c317fa07438))
* **ci:** restore full multi-platform frontend package-lock.json from upstream ([869c9d6](https://github.com/eshaanag/CommitIQ/commit/869c9d6c61a39199b59c352df23c8d6e62fb9abb))
* **ci:** synchronize frontend package.json with lockfile and update test command ([ac3e40a](https://github.com/eshaanag/CommitIQ/commit/ac3e40a9cdae8259fdc207192cc1c0ca041639c0))
* count co-change graph pairs once per commit ([b0759e7](https://github.com/eshaanag/CommitIQ/commit/b0759e7c2c93e24f962c83e6bad54e5fceb106a0))
* **database:** preserve mark_stale_jobs_as_error and demo seeder in init_db ([a4467c4](https://github.com/eshaanag/CommitIQ/commit/a4467c4991b42c6fd1bef5e410c493dbe3bcfb19))
* **database:** resolve SQLite concurrency lock errors during parallel scans ([#32](https://github.com/eshaanag/CommitIQ/issues/32), [#494](https://github.com/eshaanag/CommitIQ/issues/494)) ([eac9652](https://github.com/eshaanag/CommitIQ/commit/eac965288c62bf576b4fc74b4e534d5894b8c138))
* **database:** resolve SQLite concurrency lock errors during parallel scans ([#32](https://github.com/eshaanag/CommitIQ/issues/32)) ([72af80f](https://github.com/eshaanag/CommitIQ/commit/72af80fbae8ac1e520910d17b53c407d9a385dd8))
* **db:** retry write transactions on transient sqlite database locks ([#259](https://github.com/eshaanag/CommitIQ/issues/259)) ([2ef4643](https://github.com/eshaanag/CommitIQ/commit/2ef4643554fe2b45390eace1916aa02315a0b41a))
* **db:** retry write transactions on transient sqlite database locks ([#259](https://github.com/eshaanag/CommitIQ/issues/259)) ([#269](https://github.com/eshaanag/CommitIQ/issues/269)) ([69bf8f7](https://github.com/eshaanag/CommitIQ/commit/69bf8f79f6e471c1f472fc95f2e6d45e3072d07c))
* deduplicate contributor identities in bus factor calculation ([019b96e](https://github.com/eshaanag/CommitIQ/commit/019b96ec98a8a48f0ac4fdd7f7fd59c0db1e23e3))
* **deps:** keep @vitest/coverage-v8 in frontend devDependencies ([13c3f0c](https://github.com/eshaanag/CommitIQ/commit/13c3f0c47eb267cf3cec1f0cb3d2283e009daf28))
* division by zero in health scorer when repository contains no code files ([#31](https://github.com/eshaanag/CommitIQ/issues/31)) ([#228](https://github.com/eshaanag/CommitIQ/issues/228)) ([9d26fdc](https://github.com/eshaanag/CommitIQ/commit/9d26fdc331701d521c5bf4fb9104942919a33e57))
* **frontend:** add missing component/icon imports and remove duplicate components in DashboardPage ([66e4dcf](https://github.com/eshaanag/CommitIQ/commit/66e4dcfdfcebd6dd973775de62c4a5785daf0d6f))
* **frontend:** allow chart tooltips to overflow viewBox dynamically ([#217](https://github.com/eshaanag/CommitIQ/issues/217)) ([45c41a1](https://github.com/eshaanag/CommitIQ/commit/45c41a1fcdf0178fe87c166fe91353b665b3810e))
* **frontend:** allow chart tooltips to overflow viewBox dynamically on small screens ([fa4ad92](https://github.com/eshaanag/CommitIQ/commit/fa4ad92fb5f77515573c2659acb75fa2954453e2))
* **frontend:** disable submit button if repository input is empty or spaces ([#326](https://github.com/eshaanag/CommitIQ/issues/326)) ([8eecb0b](https://github.com/eshaanag/CommitIQ/commit/8eecb0b2c3126b0604aa913b07b3ad12f212379a))
* **frontend:** fix TypeScript types and unused variable warnings ([b2bb121](https://github.com/eshaanag/CommitIQ/commit/b2bb12117e7e9f716533d7324f1ae69908fced5d))
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
* **reports:** handle missing ReportLab dependency safely ([#389](https://github.com/eshaanag/CommitIQ/issues/389)) ([73a99b8](https://github.com/eshaanag/CommitIQ/commit/73a99b89ee4799d2724fc5de198645bceb3ca3f2))
* require explicit CORS origins in production ([03bf056](https://github.com/eshaanag/CommitIQ/commit/03bf056970439a422024d6d73c2222818b6683d5))
* resolve add/add conflict in CommitHealthRadar.tsx ([39b4d35](https://github.com/eshaanag/CommitIQ/commit/39b4d35ac385be8b651f2f6a3cdbac9d252bebe5))
* resolve merge conflicts in App.tsx ([96a2b0e](https://github.com/eshaanag/CommitIQ/commit/96a2b0eb9f2803da345a4e480ad4cff4bda6a86f))
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
* **ui:** make the hotspot map and knowledge graph responsive on mobile devices ([#377](https://github.com/eshaanag/CommitIQ/issues/377)) ([#432](https://github.com/eshaanag/CommitIQ/issues/432)) ([2eb7694](https://github.com/eshaanag/CommitIQ/commit/2eb7694ff461221fbb284322e237f4536f321c1b))
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
