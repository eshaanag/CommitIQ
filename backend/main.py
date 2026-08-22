from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import logging

from backend.config import CORS_ORIGINS, ENVIRONMENT
from backend.database import AsyncSessionLocal, engine, init_db
from backend.demo_seeder import seed_demo_data_if_empty
from backend.features.llm_analysis.router import router as llm_router
from backend.features.metrics.router import router as metrics_router
from backend.features.repo_ingestion.router import router as ingestion_router
from backend.features.webhooks.router import router as webhooks_router

logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db(env=ENVIRONMENT)
    async with AsyncSessionLocal() as session:
        try:
            await seed_demo_data_if_empty(session)
        except Exception as exc:
            logger.error("Failed to auto-seed demo data: %s", exc, exc_info=True)
    yield
    await engine.dispose()


app = FastAPI(
    title="CommitIQ API",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(ingestion_router, prefix="/api")
app.include_router(llm_router, prefix="/api")
app.include_router(metrics_router, prefix="/api")
app.include_router(webhooks_router, prefix="/api/webhooks", tags=["webhooks"])


@app.get("/health")
async def health():
    return {"status": "ok", "service": "commitiq-api"}
