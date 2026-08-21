import logging
from typing import Any

from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from backend.database import get_db
from backend.shared.models import Deployment, Repo
from backend.shared.schemas import WebhookResponse

logger = logging.getLogger(__name__)
router = APIRouter()


async def _resolve_repo(db: AsyncSession, repo_id: int | None, payload: dict[str, Any]) -> Repo | None:
    if repo_id is not None:
        repo = await db.get(Repo, repo_id)
        if repo:
            return repo

    project = payload.get("project") or payload.get("repository") or {}
    path_with_ns = project.get("path_with_namespace") or ""
    web_url = project.get("web_url") or project.get("homepage") or ""
    proj_name = project.get("name") or ""

    if path_with_ns:
        slug = path_with_ns.replace("/", "-").lower()
        res = await db.execute(select(Repo).where(func.lower(Repo.repo_slug) == slug))
        repo = res.scalar_one_or_none()
        if repo:
            return repo

    if web_url:
        res = await db.execute(select(Repo).where(func.lower(Repo.url) == web_url.lower()))
        repo = res.scalar_one_or_none()
        if repo:
            return repo

    if proj_name:
        res = await db.execute(select(Repo).where(func.lower(Repo.name).like(f"%{proj_name.lower()}")))
        repo = res.scalar_one_or_none()
        if repo:
            return repo

    return None


@router.post("/gitlab/{repo_id}", response_model=WebhookResponse, status_code=200)
async def gitlab_webhook_by_repo_id(
    repo_id: int,
    request: Request,
    db: AsyncSession = Depends(get_db),
):
    payload = await request.json()
    return await _process_gitlab_pipeline_webhook(db, payload, repo_id=repo_id)


@router.post("/gitlab", response_model=WebhookResponse, status_code=200)
async def gitlab_webhook(
    request: Request,
    db: AsyncSession = Depends(get_db),
):
    payload = await request.json()
    return await _process_gitlab_pipeline_webhook(db, payload, repo_id=None)


async def _process_gitlab_pipeline_webhook(
    db: AsyncSession,
    payload: dict[str, Any],
    repo_id: int | None = None,
) -> WebhookResponse:
    object_kind = payload.get("object_kind") or "pipeline"
    if object_kind not in {"pipeline", "deployment", "build"}:
        return WebhookResponse(
            status="ignored",
            message=f"Ignored event type '{object_kind}'. Only pipeline/deployment events are processed.",
        )

    repo = await _resolve_repo(db, repo_id, payload)
    if not repo:
        raise HTTPException(
            status_code=404,
            detail="Repository matching GitLab pipeline event could not be found.",
        )

    attrs = payload.get("object_attributes") or {}
    commit = payload.get("commit") or {}

    status_raw = (attrs.get("status") or attrs.get("detailed_status") or payload.get("status") or "unknown").lower()
    pipeline_id = str(attrs.get("id") or payload.get("deployment_id") or "")
    ref = attrs.get("ref") or payload.get("ref")
    sha = commit.get("id") or attrs.get("sha")
    environment = attrs.get("environment") or payload.get("environment") or "production"

    is_successful = status_raw in {"success", "passed", "successful"}

    deployment = Deployment(
        repo_id=repo.id,
        provider="gitlab",
        environment=environment,
        status="success" if is_successful else status_raw,
        ref=ref,
        sha=sha,
        pipeline_id=pipeline_id,
    )
    db.add(deployment)
    await db.commit()
    await db.refresh(deployment)

    logger.info(
        f"GitLab pipeline deployment recorded: repo_id={repo.id}, pipeline_id={pipeline_id}, status={status_raw}"
    )

    return WebhookResponse(
        status="recorded",
        message="GitLab pipeline deployment event successfully parsed and recorded.",
        deployment_id=deployment.id,
        repo_id=repo.id,
    )
