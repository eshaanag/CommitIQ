from datetime import timedelta

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from backend.shared.models import PullRequest


async def compute_cycle_time_metrics(db: AsyncSession, repo_id: int) -> dict:
    stmt = select(PullRequest).where(
        PullRequest.repo_id == repo_id, PullRequest.state.in_(["closed", "merged", "all"])
    )
    result = await db.execute(stmt)
    prs = result.scalars().all()

    # Filter for merged PRs only
    merged_prs = [pr for pr in prs if pr.merged_at is not None]

    if not merged_prs:
        return {
            "avg_cycle_time_hours": 0.0,
            "avg_pickup_time_hours": 0.0,
            "avg_review_time_hours": 0.0,
            "total_prs_analyzed": 0,
            "bottlenecks": [],
        }

    total_cycle_time = timedelta()
    valid_cycle_prs = 0

    bottlenecks = []

    for pr in merged_prs:
        if pr.merged_at and pr.created_at:
            cycle_time = pr.merged_at - pr.created_at
            if cycle_time.total_seconds() > 0:
                total_cycle_time += cycle_time
                valid_cycle_prs += 1

                # Flag PRs that took more than 72 hours as bottlenecks
                if cycle_time.total_seconds() > 72 * 3600:
                    bottlenecks.append(
                        {
                            "pr_number": pr.pr_number,
                            "title": pr.title,
                            "author": pr.author,
                            "cycle_time_hours": round(cycle_time.total_seconds() / 3600, 1),
                            "url": f"https://github.com/placeholder/placeholder/pull/{pr.pr_number}",  # Will need to construct full URL on frontend
                        }
                    )

    # Sort bottlenecks by longest cycle time
    bottlenecks.sort(key=lambda x: x["cycle_time_hours"], reverse=True)

    avg_cycle = (
        (total_cycle_time.total_seconds() / valid_cycle_prs / 3600) if valid_cycle_prs > 0 else 0.0
    )

    return {
        "avg_cycle_time_hours": round(avg_cycle, 2),
        "avg_pickup_time_hours": 0.0,  # Will implement when we fetch review data
        "avg_review_time_hours": 0.0,  # Will implement when we fetch review data
        "total_prs_analyzed": valid_cycle_prs,
        "bottlenecks": bottlenecks[:10],  # Top 10 longest bottlenecks
    }
