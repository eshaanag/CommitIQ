<!-- Please fill this out completely — PRs missing program info or a clear description will be closed without review. -->

## Program
<!-- Check exactly one -->
- [x] ECSoC 2026
- [ ] ELUSOC 2026
- [ ] Regular contribution (not part of a program)

## What does this PR do?
<!-- 2-3 sentences. Be specific — "fixed bug" is not enough. -->
Implement a startup routine in the backend lifespan to query the database for active/queued analysis jobs (status in ACTIVE_JOB_STATUSES) and mark them as error since a system restart has aborted their execution. Additionally, cleanup leftover cloned repository directories matching those stale jobs in REPO_STORAGE_PATH.

## Related issue
Closes #26

## Checklist
- [x] I have added the correct program label (`ECSoC26` or `ELUSOC`) to this PR
- [x] I tested this change locally
- [x] This PR addresses exactly one issue/feature (not a bundle of unrelated changes)
- [x] I did not open this PR purely to farm contribution counts
