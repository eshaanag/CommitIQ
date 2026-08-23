from datetime import datetime

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from backend.shared.models import Deployment, PullRequest


async def compute_dora_metrics(db: AsyncSession, repo_id: int) -> dict:
    deploy_stmt = select(Deployment).where(
        Deployment.repo_id == repo_id, Deployment.status == "success"
    )
    deploy_res = await db.execute(deploy_stmt)
    deployments = deploy_res.scalars().all()

    pr_stmt = select(PullRequest).where(PullRequest.repo_id == repo_id)
    pr_res = await db.execute(pr_stmt)
    all_prs = pr_res.scalars().all()
    prs = [p for p in all_prs if p.merged_at is not None]

    if not prs and not deployments:
        return {
            "deployment_frequency": "Low",
            "deployment_frequency_value": 0.0,
            "change_failure_rate": "Low",
            "change_failure_rate_value": 0.0,
            "mttr_hours": 0.0,
            "mttr_category": "Low",
            "dora_score": "Low",
        }

    # 1. Deployment Frequency (Deployments per week)
    if deployments:
        now = (
            datetime.now(deployments[0].deployed_at.tzinfo)
            if deployments[0].deployed_at and deployments[0].deployed_at.tzinfo
            else datetime.now()
        )
        earliest_dep = min(deployments, key=lambda d: d.deployed_at or now)
        days_span = (now - (earliest_dep.deployed_at or now)).days
        weeks_span = max(1, days_span / 7)
        weekly_deployments = len(deployments) / weeks_span
    else:
        now = datetime.now(prs[0].merged_at.tzinfo) if prs[0].merged_at.tzinfo else datetime.now()
        earliest_pr = min(prs, key=lambda p: p.merged_at)
        days_span = (now - earliest_pr.merged_at).days
        weeks_span = max(1, days_span / 7)
        weekly_deployments = len(prs) / weeks_span

    if weekly_deployments >= 7:
        df_category = "Elite"
    elif weekly_deployments >= 1:
        df_category = "High"
    elif weekly_deployments >= 0.25:
        df_category = "Medium"
    else:
        df_category = "Low"

    # 2. Change Failure Rate
    failure_prs = []
    for pr in prs:
        title = pr.title.lower()
        if "hotfix" in title or "fix" in title or "revert" in title or "bug" in title:
            failure_prs.append(pr)

    cfr_value = (len(failure_prs) / len(prs) * 100) if prs else 0.0

    if cfr_value <= 5:
        cfr_category = "Elite"
    elif cfr_value <= 10:
        cfr_category = "High"
    elif cfr_value <= 15:
        cfr_category = "Medium"
    else:
        cfr_category = "Low"

    # 3. MTTR (Mean Time to Recovery)
    mttr_seconds = 0
    valid_mttr_prs = 0
    for pr in failure_prs:
        if pr.created_at and pr.merged_at:
            time_to_resolve = (pr.merged_at - pr.created_at).total_seconds()
            if time_to_resolve > 0:
                mttr_seconds += time_to_resolve
                valid_mttr_prs += 1

    mttr_hours = (mttr_seconds / valid_mttr_prs / 3600) if valid_mttr_prs > 0 else 0

    if valid_mttr_prs == 0:
        mttr_category = "Elite"
    elif mttr_hours < 1:
        mttr_category = "Elite"
    elif mttr_hours < 24:
        mttr_category = "High"
    elif mttr_hours < 168:
        mttr_category = "Medium"
    else:
        mttr_category = "Low"

    score_map = {"Elite": 4, "High": 3, "Medium": 2, "Low": 1}
    total_score = score_map[df_category] + score_map[cfr_category] + score_map[mttr_category]
    avg_score = total_score / 3

    if avg_score >= 3.5:
        dora_score = "Elite"
    elif avg_score >= 2.5:
        dora_score = "High"
    elif avg_score >= 1.5:
        dora_score = "Medium"
    else:
        dora_score = "Low"

    return {
        "deployment_frequency": df_category,
        "deployment_frequency_value": round(weekly_deployments, 1),
        "change_failure_rate": cfr_category,
        "change_failure_rate_value": round(cfr_value, 1),
        "mttr_hours": round(mttr_hours, 1),
        "mttr_category": mttr_category,
        "dora_score": dora_score,
    }
