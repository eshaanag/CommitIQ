"""Make `python -c "import main"` work when executed from backend/.

Several hackathon scripts run Python with the current directory set to
`backend/`, while the application imports use the package name `backend`.
Adding the project root to sys.path keeps both invocation styles working.
"""

from __future__ import annotations

import sys
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent
if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))
