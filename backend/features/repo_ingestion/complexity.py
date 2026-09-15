"""
Cyclomatic complexity calculation and AST parsing utilities.
"""
import ast
import logging
try:
    from radon.complexity import cc_visit
except ImportError:
    cc_visit = None

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
        tree = ast.parse(source_code)
        if cc_visit is not None:
            blocks = cc_visit(source_code)
            complexities = [block.complexity for block in blocks]
            if complexities:
                return round(sum(complexities) / len(complexities), 2), round(max(complexities), 2)
            return 1.0, 1.0

        # Standard library AST fallback when radon is not installed
        decision_nodes = (
            ast.If,
            ast.For,
            ast.While,
            ast.AsyncFor,
            ast.ExceptHandler,
            ast.With,
            ast.AsyncWith,
            ast.Assert,
            ast.IfExp,
        )
        fn_nodes = (ast.FunctionDef, ast.AsyncFunctionDef)
        funcs = [node for node in ast.walk(tree) if isinstance(node, fn_nodes)]
        if not funcs:
            complexity = 1.0 + sum(1 for node in ast.walk(tree) if isinstance(node, decision_nodes))
            return float(complexity), float(complexity)

        complexities = []
        for fn in funcs:
            fn_cc = 1.0 + sum(1 for node in ast.walk(fn) if isinstance(node, decision_nodes))
            complexities.append(fn_cc)

        return round(sum(complexities) / len(complexities), 2), round(max(complexities), 2)
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
