"""
backend/scheduler.py
Background cron-job service that periodically re-ingests active
repositories to keep dashboards fresh (Issue #387).

Uses APScheduler's :class:`~apscheduler.schedulers.asyncio.AsyncIOScheduler`
which integrates natively with FastAPI's asyncio event loop — no
separate Celery worker or Redis broker required (though the project
already has Redis available for future use).

The scheduler:
  1. Starts on FastAPI lifespan startup (see ``main.py``).
  2. Runs every ``REFRESH_INTERVAL_HOURS`` (default 24) hours.
  3. On each tick, queries all repos whose ``status`` is ``ready``
     (i.e. previously ingested successfully) and whose
     ``last_updated_at`` is older than the refresh interval (or NULL).
  4. For each eligible repo, creates an ``AnalysisJob`` with
     ``triggered_by="scheduler"`` and launches ``run_rescan`` as a
     background asyncio task — reusing the exact same pipeline the
     manual ``POST /api/repos/{repo_id}/rescan`` endpoint uses.
  5. Logs every refresh attempt, success, and failure.
  6. Shuts down cleanly on FastAPI lifespan shutdown.
"""

from __future__ import annotations

import asyncio
import logging
from datetime import datetime, timedelta, timezone
from typing import TYPE_CHECKING

from sqlalchemy import select
from sqlalchemy.exc import SQLAlchemyError

from backend.config import ENVIRONMENT, MAX_COMMITS, REFRESH_INTERVAL_HOURS
from backend.database import AsyncSessionLocal
from backend.shared.models import AnalysisJob, Repo

if TYPE_CHECKING:
    from apscheduler.schedulers.asyncio import AsyncIOScheduler

logger = logging.getLogger(__name__)

# ── Module-level scheduler handle ────────────────────────────────
_scheduler: AsyncIOScheduler | None = None

# ── Max repos to refresh per tick (safety cap) ───────────────────
MAX_REPOS_PER_TICK = 25

# ── Stagger between repos to avoid GitHub rate-limit bursts ──────
STAGGER_SECONDS = 10


async def _get_repos_due_for_refresh() -> list[Repo]:
    """Return repos whose metrics are stale and should be re-ingested.

    A repo is "due" when:
      - ``status`` is ``"ready"`` (successfully ingested before), AND
      - ``last_updated_at`` is NULL or older than REFRESH_INTERVAL_HOURS.

    Returns at most ``MAX_REPOS_PER_TICK`` rows, oldest first.
    """
    cutoff = datetime.now(tz=timezone.utc) - timedelta(hours=REFRESH_INTERVAL_HOURS)
    async with AsyncSessionLocal() as db:
        result = await db.execute(
            select(Repo)
            .where(Repo.status == "ready")
            .where((Repo.last_updated_at.is_(None)) | (Repo.last_updated_at < cutoff))
            .order_by(Repo.last_updated_at.asc().nullsfirst())
            .limit(MAX_REPOS_PER_TICK)
        )
        return list(result.scalars().all())


async def _refresh_single_repo(repo: Repo) -> None:
    """Launch a rescan for a single repo as a background task.

    Reuses the existing ``run_rescan`` pipeline so the scheduler
    doesn't duplicate any analysis logic. The job is marked with
    ``triggered_by="scheduler"`` so the dashboard and logs can
    distinguish automated refreshes from manual ones.
    """
    from backend.features.repo_ingestion.router import _latest_active_job, run_rescan

    try:
        async with AsyncSessionLocal() as db:
            # Skip if a manual or scheduled rescan is already running.
            active = await _latest_active_job(db, repo.id)
            if active:
                logger.info(
                    "Scheduler: skipping repo %s (%s) — job #%s already active (%s)",
                    repo.id,
                    repo.repo_slug,
                    active.id,
                    active.status,
                )
                return

            # Mark repo as pending and create the job.
            repo.status = "pending"
            repo.error_message = None
            job = AnalysisJob(repo_id=repo.id, status="queued", triggered_by="scheduler")
            db.add(job)
            await db.commit()
            await db.refresh(job)
            job_id = job.id

        max_c = repo.max_commits_setting or MAX_COMMITS
        logger.info(
            "Scheduler: starting rescan for repo %s (%s) job=%s max_commits=%s",
            repo.id,
            repo.repo_slug,
            job_id,
            max_c,
        )

        # run_rescan creates its own DB session internally.
        await run_rescan(repo.id, job_id, max_c)
        logger.info(
            "Scheduler: completed rescan for repo %s (%s) job=%s",
            repo.id,
            repo.repo_slug,
            job_id,
        )
    except Exception:
        logger.exception(
            "Scheduler: failed to rescan repo %s (%s)",
            repo.id,
            getattr(repo, "repo_slug", "unknown"),
        )


async def refresh_all_due_repos() -> dict:
    """Refresh all repos that are due. Called by the APScheduler job.

    Returns a summary dict for logging / API exposure.
    """
    logger.info("Scheduler: starting refresh tick")
    try:
        repos = await _get_repos_due_for_refresh()
    except SQLAlchemyError:
        logger.exception("Scheduler: failed to query repos due for refresh")
        return {"checked": 0, "refreshed": 0, "skipped": 0, "errors": 1}

    if not repos:
        logger.info("Scheduler: no repos due for refresh")
        return {"checked": 0, "refreshed": 0, "skipped": 0, "errors": 0}

    logger.info("Scheduler: %d repo(s) due for refresh", len(repos))

    refreshed = 0
    skipped = 0
    errors = 0

    for repo in repos:
        # Stagger to avoid GitHub API rate-limit bursts.
        if refreshed > 0:
            await asyncio.sleep(STAGGER_SECONDS)
        try:
            await _refresh_single_repo(repo)
            refreshed += 1
        except Exception:
            errors += 1
            # Exception already logged inside _refresh_single_repo.

    logger.info(
        "Scheduler: refresh tick complete — refreshed=%d skipped=%d errors=%d",
        refreshed,
        skipped,
        errors,
    )
    return {
        "checked": len(repos),
        "refreshed": refreshed,
        "skipped": skipped,
        "errors": errors,
    }


def start_scheduler() -> AsyncIOScheduler | None:
    """Initialize and start the background scheduler.

    Returns the scheduler instance, or ``None`` if APScheduler is
    not installed or the scheduler is disabled.
    """
    global _scheduler

    if not _should_run_scheduler():
        logger.info(
            "Scheduler: disabled (ENVIRONMENT=%s, REFRESH_INTERVAL_HOURS=%s)",
            ENVIRONMENT,
            REFRESH_INTERVAL_HOURS,
        )
        return None

    try:
        from apscheduler.schedulers.asyncio import AsyncIOScheduler
        from apscheduler.triggers.interval import IntervalTrigger
    except ImportError:
        logger.warning(
            "Scheduler: APScheduler not installed; "
            "install 'apscheduler' to enable automatic metric refresh."
        )
        return None

    if _scheduler is not None:
        logger.warning("Scheduler: already started, skipping duplicate initialization")
        return _scheduler

    _scheduler = AsyncIOScheduler()
    _scheduler.add_job(
        refresh_all_due_repos,
        trigger=IntervalTrigger(hours=REFRESH_INTERVAL_HOURS),
        id="refresh_repo_metrics",
        name="Refresh stale repository metrics",
        replace_existing=True,
        max_instances=1,
        coalesce=True,
    )
    _scheduler.start()
    logger.info(
        "Scheduler: started — will refresh repos every %s hour(s)",
        REFRESH_INTERVAL_HOURS,
    )
    return _scheduler


def stop_scheduler() -> None:
    """Shut down the scheduler cleanly on FastAPI lifespan exit."""
    global _scheduler
    if _scheduler is not None:
        _scheduler.shutdown(wait=False)
        _scheduler = None
        logger.info("Scheduler: stopped")


def get_scheduler_status() -> dict:
    """Return a snapshot of the scheduler state for the health endpoint."""
    if _scheduler is None:
        return {"running": False, "enabled": _should_run_scheduler()}
    return {
        "running": _scheduler.running,
        "enabled": True,
        "jobs": [
            {
                "id": job.id,
                "name": job.name,
                "next_run_time": (job.next_run_time.isoformat() if job.next_run_time else None),
            }
            for job in _scheduler.get_jobs()
        ],
    }


def _should_run_scheduler() -> bool:
    """Return True when the scheduler should be active.

    The scheduler is enabled when:
      - ``REFRESH_INTERVAL_HOURS`` is > 0, AND
      - APScheduler can be imported.

    It is NOT gated on environment — operators may want the scheduler
    in staging or production. Setting ``REFRESH_INTERVAL_HOURS=0``
    disables it entirely.
    """
    return REFRESH_INTERVAL_HOURS > 0
