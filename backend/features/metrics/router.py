from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException, Query, Response
from sqlalchemy.ext.asyncio import AsyncSession

from backend.database import get_db
from backend.features.metrics.code_quality import compute_code_quality
from backend.features.metrics.commit_linter import compute_commit_quality
from backend.features.metrics.cycle_time import compute_cycle_time_metrics
from backend.features.metrics.dora import compute_dora_metrics
from backend.features.metrics.pr_export import export_prs_to_csv
from backend.features.metrics.team_health import compute_team_health
from backend.features.metrics.velocity import compute_velocity
from backend.shared.models import Repo

router = APIRouter(prefix="/metrics", tags=["metrics"])


@router.get("/repos/{repo_id}/cycle-time")
async def get_cycle_time(repo_id: int, db: AsyncSession = Depends(get_db)):
    repo = await db.get(Repo, repo_id)
    if not repo:
        raise HTTPException(status_code=404, detail="Repository not found")

    metrics = await compute_cycle_time_metrics(db, repo_id)
    return metrics


@router.get("/repos/{repo_id}/dora")
async def get_dora_metrics(
    repo_id: int,
    start_date: datetime | None = Query(None),
    end_date: datetime | None = Query(None),
    db: AsyncSession = Depends(get_db),
):
    repo = await db.get(Repo, repo_id)
    if not repo:
        raise HTTPException(status_code=404, detail="Repository not found")

    metrics = await compute_dora_metrics(
        db, repo_id, start_date=start_date, end_date=end_date
    )
    return metrics


@router.get("/repos/{repo_id}/team-health")
async def get_team_health_metrics(repo_id: int, db: AsyncSession = Depends(get_db)):
    repo = await db.get(Repo, repo_id)
    if not repo:
        raise HTTPException(status_code=404, detail="Repository not found")

    metrics = await compute_team_health(db, repo_id)
    return metrics


@router.get("/repos/{repo_id}/code-quality")
async def get_code_quality_metrics(repo_id: int, db: AsyncSession = Depends(get_db)):
    repo = await db.get(Repo, repo_id)
    if not repo:
        raise HTTPException(status_code=404, detail="Repository not found")

    metrics = await compute_code_quality(db, repo_id)
    return metrics


@router.get("/repos/{repo_id}/velocity")
async def get_velocity_metrics(repo_id: int, db: AsyncSession = Depends(get_db)):
    """Return weekly commit velocity & delivery cadence metrics."""
    repo = await db.get(Repo, repo_id)
    if not repo:
        raise HTTPException(status_code=404, detail="Repository not found")

    metrics = await compute_velocity(db, repo_id)
    return metrics


@router.get("/repos/{repo_id}/commit-quality")
async def get_commit_quality_metrics(repo_id: int, db: AsyncSession = Depends(get_db)):
    """Return commit message quality analytics."""
    repo = await db.get(Repo, repo_id)
    if not repo:
        raise HTTPException(status_code=404, detail="Repository not found")

    metrics = await compute_commit_quality(db, repo_id)
    return metrics


@router.get("/repos/{repo_id}/prs/export")
async def export_pull_requests_csv(
    repo_id: int,
    state: str | None = Query(
        None, description="Optional filter by PR state ('open', 'closed', 'merged')"
    ),
    start_date: datetime | None = Query(
        None, description="Optional filter for PRs created after this date"
    ),
    end_date: datetime | None = Query(
        None, description="Optional filter for PRs created before this date"
    ),
    db: AsyncSession = Depends(get_db),
):
    """Export pull request metrics for a repository in CSV format for external analysis."""
    repo = await db.get(Repo, repo_id)
    if not repo:
        raise HTTPException(status_code=404, detail="Repository not found")

    csv_content = await export_prs_to_csv(
        db=db,
        repo_id=repo_id,
        state=state,
        start_date=start_date,
        end_date=end_date,
    )

    clean_slug = (repo.repo_slug or f"repo_{repo_id}").replace("/", "_")
    filename = f"{clean_slug}_pull_requests.csv"

    return Response(
        content=csv_content,
        media_type="text/csv",
        headers={
            "Content-Disposition": f'attachment; filename="{filename}"',
        },
    )
