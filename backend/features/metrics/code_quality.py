from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from backend.shared.models import Commit


async def compute_code_quality(db: AsyncSession, repo_id: int) -> dict:
    stmt = select(Commit).where(Commit.repo_id == repo_id)
    result = await db.execute(stmt)
    commits = result.scalars().all()

    if not commits:
        return {
            "churn_rate_percent": 0.0,
            "churn_category": "Low",
            "ai_assisted_commits": 0,
            "ai_impact_score": "Unknown",
        }

    total_insertions = 0
    total_deletions = 0
    ai_assisted = 0

    for c in commits:
        total_insertions += c.insertions or 0
        total_deletions += c.deletions or 0

        # Simple heuristic for AI-generated code: huge insertions with few files
        if (c.insertions or 0) > 250 and (c.files_changed or 0) <= 3:
            ai_assisted += 1

    churn_rate = 0.0
    if total_insertions > 0:
        # Churn rate: what percentage of inserted code is roughly getting deleted
        churn_rate = (total_deletions / total_insertions) * 100

    if churn_rate < 15:
        churn_category = "Low"
    elif churn_rate < 30:
        churn_category = "Medium"
    else:
        churn_category = "High"

    ai_percent = (ai_assisted / len(commits)) * 100
    if ai_percent > 20:
        ai_impact = "High"
    elif ai_percent > 5:
        ai_impact = "Medium"
    else:
        ai_impact = "Low"

    return {
        "churn_rate_percent": round(churn_rate, 1),
        "churn_category": churn_category,
        "ai_assisted_commits": ai_assisted,
        "ai_impact_score": ai_impact,
    }
