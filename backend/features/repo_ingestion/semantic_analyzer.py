"""
GraphCodeBERT-based semantic drift detection.

Runs during ingestion only. Request handlers should read the stored drift
scores from SQLite rather than invoking this module.
"""

from __future__ import annotations

import difflib
import hashlib
import json
import logging
import math
from pathlib import Path
from typing import Optional

from backend.config import ENABLE_GRAPHCODEBERT, ENABLE_SEMANTIC_ANALYSIS

logger = logging.getLogger(__name__)

MODEL_NAME = "microsoft/graphcodebert-base"
EMBEDDING_CACHE_DIR = Path(".cache/embeddings")


class _ModelHolder:
    tokenizer = None
    model = None
    loaded: bool = False
    attempted: bool = False


def _load_model() -> bool:
    """Load GraphCodeBERT once per ingestion process."""
    if not ENABLE_SEMANTIC_ANALYSIS or not ENABLE_GRAPHCODEBERT:
        return False
    if _ModelHolder.loaded:
        return True
    if _ModelHolder.attempted:
        return False

    try:
        _ModelHolder.attempted = True
        from transformers import AutoModel, AutoTokenizer

        logger.info("Loading %s for semantic drift analysis.", MODEL_NAME)
        _ModelHolder.tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
        _ModelHolder.model = AutoModel.from_pretrained(MODEL_NAME)
        _ModelHolder.model.eval()
        _ModelHolder.loaded = True
        return True
    except Exception as exc:
        logger.warning("GraphCodeBERT unavailable; using semantic fallback: %s", exc)
        _ModelHolder.loaded = False
        return False


def _cache_key(code: str) -> str:
    return hashlib.sha256(code.encode("utf-8", errors="ignore")).hexdigest()[:16]


def _get_cached_embedding(code: str) -> Optional[list[float]]:
    EMBEDDING_CACHE_DIR.mkdir(parents=True, exist_ok=True)
    cache_file = EMBEDDING_CACHE_DIR / f"{_cache_key(code)}.json"
    if not cache_file.exists():
        return None
    try:
        value = json.loads(cache_file.read_text(encoding="utf-8"))
        return value if isinstance(value, list) else None
    except Exception:
        return None


def _save_embedding(code: str, embedding: list[float]) -> None:
    EMBEDDING_CACHE_DIR.mkdir(parents=True, exist_ok=True)
    cache_file = EMBEDDING_CACHE_DIR / f"{_cache_key(code)}.json"
    cache_file.write_text(json.dumps(embedding), encoding="utf-8")


def get_code_embedding(code: str, max_tokens: int = 512) -> Optional[list[float]]:
    """Return a 768-dim GraphCodeBERT CLS embedding, or None if unavailable."""
    if not code.strip() or not ENABLE_SEMANTIC_ANALYSIS or not ENABLE_GRAPHCODEBERT:
        return None

    cached = _get_cached_embedding(code)
    if cached is not None:
        return cached

    if not _load_model():
        return None

    try:
        import torch

        inputs = _ModelHolder.tokenizer(
            code[:4000],
            return_tensors="pt",
            truncation=True,
            max_length=max_tokens,
            padding="max_length",
        )
        with torch.no_grad():
            outputs = _ModelHolder.model(**inputs)

        embedding = outputs.last_hidden_state[:, 0, :].squeeze().tolist()
        _save_embedding(code, embedding)
        return embedding
    except Exception as exc:
        logger.warning("GraphCodeBERT embedding failed: %s", exc)
        return None


def compute_semantic_drift(code_before: str, code_after: str) -> dict:
    """
    Compute semantic drift between two file versions.

    Returns 0.0 for identical code and 1.0 for maximally different code.
    Falls back to difflib so ingestion never fails when HuggingFace is absent.
    """
    if code_before == code_after:
        return {
            "semantic_drift_score": 0.0,
            "cosine_similarity": 1.0,
            "method": "identical",
            "model": "none",
        }

    emb_before = get_code_embedding(code_before)
    emb_after = get_code_embedding(code_after)

    if emb_before is not None and emb_after is not None:
        dot = sum(a * b for a, b in zip(emb_before, emb_after))
        norm_before = math.sqrt(sum(value * value for value in emb_before))
        norm_after = math.sqrt(sum(value * value for value in emb_after))
        cosine_sim = float(dot / ((norm_before * norm_after) + 1e-8))
        drift = 1.0 - max(0.0, min(1.0, cosine_sim))
        return {
            "semantic_drift_score": round(drift, 4),
            "cosine_similarity": round(cosine_sim, 4),
            "method": "graphcodebert",
            "model": MODEL_NAME,
        }

    ratio = difflib.SequenceMatcher(None, code_before, code_after).ratio()
    return {
        "semantic_drift_score": round(1.0 - ratio, 4),
        "cosine_similarity": round(ratio, 4),
        "method": "fallback_levenshtein",
        "model": "difflib.SequenceMatcher",
    }


def compute_repo_semantic_health(file_drifts: list[dict]) -> dict:
    """Aggregate file-level drift into commit-level health fields."""
    if not file_drifts:
        return {
            "avg_semantic_drift": 0.0,
            "max_semantic_drift": 0.0,
            "high_drift_files": 0,
            "semantic_health_score": 100.0,
            "semantic_drift_method": "none",
        }

    scores = [float(item.get("semantic_drift_score", 0.0)) for item in file_drifts]
    avg_drift = sum(scores) / max(len(scores), 1)
    max_drift = max(scores)
    method = (
        "graphcodebert"
        if any(item.get("method") == "graphcodebert" for item in file_drifts)
        else file_drifts[0].get("method", "none")
    )

    return {
        "avg_semantic_drift": round(avg_drift, 4),
        "max_semantic_drift": round(max_drift, 4),
        "high_drift_files": sum(1 for score in scores if score > 0.5),
        "semantic_health_score": round(max(0.0, 100.0 - (avg_drift * 100.0)), 1),
        "semantic_drift_method": method,
    }
