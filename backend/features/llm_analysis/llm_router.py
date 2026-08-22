"""Multi-provider LLM routing for CommitIQ narratives."""

from __future__ import annotations

import asyncio
import logging
from enum import Enum
from typing import AsyncGenerator

from backend.config import ANTHROPIC_API_KEY, GEMINI_API_KEY

logger = logging.getLogger(__name__)

ANTHROPIC_MODEL = "claude-3-5-sonnet-20241022"
GEMINI_MODEL = "gemini-2.5-flash"

try:
    import pybreaker

    llm_breaker = pybreaker.CircuitBreaker(fail_max=3, reset_timeout=60)
    CircuitBreakerError = pybreaker.CircuitBreakerError
except ImportError:
    pybreaker = None

    def _dummy_decorator(func):
        return func

    llm_breaker = _dummy_decorator

    class CircuitBreakerError(Exception):
        pass


class LLMProvider(str, Enum):
    ANTHROPIC = "anthropic"
    GEMINI = "gemini"
    NONE = "none"


SYSTEM_PROMPT = """You are a senior engineering lead analyzing repository health metrics.

Given metric deltas from a Git commit analysis, explain in plain English:
1. What drove the health score change (be specific - name the metrics that moved most)
2. Whether this looks like intentional refactoring or careless degradation
3. What the team should watch next sprint

Rules:
- Be specific. Use the actual numbers from the data. Never be vague.
- Max 4 sentences. Engineers are busy.
- End with exactly one line: "Risk level: [Low / Medium / High / Critical]"
- Never mention that you are an AI or reference your training.
- Never say "I think" or "it seems" - state facts from the metrics."""


def model_for_provider(provider: LLMProvider | str) -> str:
    provider_value = provider.value if isinstance(provider, LLMProvider) else provider
    if provider_value == LLMProvider.ANTHROPIC.value:
        return ANTHROPIC_MODEL
    if provider_value == LLMProvider.GEMINI.value:
        return GEMINI_MODEL
    return "none"


async def stream_narrative(
    prompt: str,
    max_tokens: int = 600,
) -> AsyncGenerator[tuple[str, LLMProvider], None]:
    """Stream narrative tokens from Claude first, then Gemini fallback."""
    try:
        if ANTHROPIC_API_KEY:
            try:
                async for token in _stream_anthropic(prompt, max_tokens):
                    yield token, LLMProvider.ANTHROPIC
                return
            except pybreaker.CircuitBreakerError:
                raise  # Let the outer try-except handle breaker errors
            except Exception as exc:
                logger.warning("Anthropic failed, trying Gemini fallback: %s", exc)

        if GEMINI_API_KEY:
            try:
                async for token in _stream_gemini(prompt, max_tokens):
                    yield token, LLMProvider.GEMINI
                return
            except CircuitBreakerError:
                raise
            except Exception as exc:
                logger.error("Gemini fallback failed: %s", exc)

        raise RuntimeError(
            "All LLM providers unavailable. Configure ANTHROPIC_API_KEY or GEMINI_API_KEY."
        )
    except CircuitBreakerError:
        logger.error("LLM circuit breaker open. APIs temporarily degraded.")
        fallback_msg = "AI services are temporarily degraded due to high failure rates. Please try again later.\n\nRisk level: Unknown"
        yield fallback_msg, LLMProvider.NONE


@llm_breaker
async def _stream_anthropic(prompt: str, max_tokens: int) -> AsyncGenerator[str, None]:
    import anthropic

    client = anthropic.AsyncAnthropic(api_key=ANTHROPIC_API_KEY)
    async with client.messages.stream(
        model=ANTHROPIC_MODEL,
        max_tokens=max_tokens,
        system=SYSTEM_PROMPT,
        messages=[{"role": "user", "content": prompt}],
    ) as stream:
        async for text in stream.text_stream:
            yield text


@llm_breaker
async def _stream_gemini(prompt: str, max_tokens: int) -> AsyncGenerator[str, None]:
    import google.generativeai as genai

    genai.configure(api_key=GEMINI_API_KEY)
    model = genai.GenerativeModel(
        model_name=GEMINI_MODEL,
        system_instruction=SYSTEM_PROMPT,
    )
    loop = asyncio.get_event_loop()

    def _next_chunk(iterator):
        try:
            return next(iterator)
        except StopIteration:
            return None

    def _sync_stream():
        return model.generate_content(
            prompt,
            generation_config={"max_output_tokens": max_tokens, "temperature": 0.3},
            stream=True,
        )

    stream = await loop.run_in_executor(None, _sync_stream)
    stream_iter = iter(stream)
    while True:
        chunk = await loop.run_in_executor(None, _next_chunk, stream_iter)
        if chunk is None:
            break
        text = getattr(chunk, "text", "")
        if text:
            yield text


async def get_narrative_non_streaming(
    prompt: str, max_tokens: int = 600
) -> tuple[str, LLMProvider]:
    full_text: list[str] = []
    provider_used = LLMProvider.NONE
    async for token, provider in stream_narrative(prompt, max_tokens):
        full_text.append(token)
        provider_used = provider
    return "".join(full_text), provider_used
