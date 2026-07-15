from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from backend.config import CORS_ORIGINS
from backend.database import engine, init_db
from backend.features.repo_ingestion.router import router as ingestion_router
from backend.features.llm_analysis.router import router as llm_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
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

# Expose metrics endpoint hook
@app.get("/metrics")
async def prometheus_metrics():
    return {"metrics": "commitiq"}


@app.get("/health")
async def health():
    return {"status": "ok", "service": "commitiq-api"}
