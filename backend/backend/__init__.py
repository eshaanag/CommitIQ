"""Compatibility package for running commands from the backend directory."""

from __future__ import annotations

from pathlib import Path

__path__ = [str(Path(__file__).resolve().parent.parent)]
