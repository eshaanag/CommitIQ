"""
Cyclomatic complexity calculation and AST parsing utilities.
"""
import ast
import logging
from radon.complexity import cc_visit

logger = logging.getLogger(__name__)


def compute_python_complexity(source_code: str) -> tuple[float, float]:
    """
    Compute average and max cyclomatic complexity for Python source code using AST.
    If the file contains invalid Python syntax, catches SyntaxError and returns
    a default baseline complexity of 1.
    """
    if not source_code or not source_code.strip():
        return 1.0, 1.0

    try:
        ast.parse(source_code)
        blocks = cc_visit(source_code)
        complexities = [block.complexity for block in blocks]
        if complexities:
            return round(sum(complexities) / len(complexities), 2), round(max(complexities), 2)
        return 1.0, 1.0
    except SyntaxError as exc:
        logger.info("SyntaxError encountered parsing Python file for complexity: %s", exc)
        return 1.0, 1.0
    except Exception as exc:
        logger.warning("Error computing complexity from AST: %s", exc)
        return 1.0, 1.0


def calculate_complexity(source_code: str) -> float:
    """
    Calculate complexity score from source code, returning default 1 if syntax is invalid.
    """
    avg_cc, _ = compute_python_complexity(source_code)
    return avg_cc
