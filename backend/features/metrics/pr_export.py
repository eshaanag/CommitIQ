from __future__ import annotations

import csv
import io
from datetime import datetime

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from backend.shared.models import PullRequest

CSV_COLUMNS = [
    "id",
    "repo_id",
    "pr_number",
    "title",
    "state",
    "author",
    "created_at",
    "merged_at",
    "closed_at",
    "first_review_at",
    "cycle_time_hours",
    "coding_time_sec",
    "pickup_time_sec",
    "review_time_sec",
]


async def export_prs_to_csv(
    db: AsyncSession,
    repo_id: int,
    state: str | None = None,
    start_date: datetime | None = None,
    end_date: datetime | None = None,
) -> str:
    """Query pull requests for a repository and serialize them to CSV format."""
    stmt = select(PullRequest).where(PullRequest.repo_id == repo_id)

    if state:
        stmt = stmt.where(PullRequest.state == state.lower())

    if start_date:
        stmt = stmt.where(PullRequest.created_at >= start_date)

    if end_date:
        stmt = stmt.where(PullRequest.created_at <= end_date)

    stmt = stmt.order_by(PullRequest.pr_number.desc())

    result = await db.execute(stmt)
    prs = result.scalars().all()

    output = io.StringIO()
    writer = csv.writer(output, lineterminator="\n")
    writer.writerow(CSV_COLUMNS)

    for pr in prs:
        cycle_time_hours = ""
        if pr.merged_at and pr.created_at:
            delta = pr.merged_at - pr.created_at
            if delta.total_seconds() >= 0:
                cycle_time_hours = f"{round(delta.total_seconds() / 3600, 2):.2f}"

        writer.writerow(
            [
                pr.id,
                pr.repo_id,
                pr.pr_number,
                pr.title,
                pr.state,
                pr.author,
                pr.created_at.isoformat() if pr.created_at else "",
                pr.merged_at.isoformat() if pr.merged_at else "",
                pr.closed_at.isoformat() if pr.closed_at else "",
                pr.first_review_at.isoformat() if pr.first_review_at else "",
                cycle_time_hours,
                pr.coding_time_sec if pr.coding_time_sec is not None else "",
                pr.pickup_time_sec if pr.pickup_time_sec is not None else "",
                pr.review_time_sec if pr.review_time_sec is not None else "",
            ]
        )

    return output.getvalue()
