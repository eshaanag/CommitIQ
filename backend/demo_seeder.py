import json
import logging
from datetime import datetime, timedelta, timezone

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from backend.shared.models import (
    BusFactor,
    Commit,
    GraphEdge,
    GraphNode,
    HealthSnapshot,
    LLMNarrative,
    Repo,
)

logger = logging.getLogger(__name__)


async def seed_demo_data_if_empty(session: AsyncSession) -> None:
    # Check if facebook-react repo already exists
    existing = await session.execute(select(Repo).where(Repo.repo_slug == "facebook-react"))
    if existing.scalar_one_or_none():
        logger.info(
            "Demo repository 'facebook-react' already exists in the database. Skipping seeder."
        )
        return

    import os

    fixture_path = os.path.join("backend", "fixtures", "facebook-react.json")
    if os.path.exists(fixture_path):
        logger.info(f"Seeding database using real analyzed demo fixture from {fixture_path}...")
        try:
            with open(fixture_path, "r", encoding="utf-8") as f:
                data = json.load(f)

            def parse_dt(val: str | None) -> datetime | None:
                if not val:
                    return None
                return datetime.fromisoformat(val.replace("Z", "+00:00"))

            # 1. Create Repo
            repo_data = data["repo"]
            repo_data["ingested_at"] = parse_dt(repo_data.get("ingested_at"))
            repo_data["last_updated_at"] = parse_dt(repo_data.get("last_updated_at"))
            repo = Repo(**repo_data)
            session.add(repo)
            await session.flush()

            # 2. Create Commits
            commit_sha_to_id = {}
            for c_data in data["commits"]:
                c_data["committed_at"] = parse_dt(c_data.get("committed_at"))
                commit = Commit(repo_id=repo.id, **c_data)
                session.add(commit)
                await session.flush()
                commit_sha_to_id[commit.full_sha] = commit.id

            # 3. Create HealthSnapshots
            for s_data in data["snapshots"]:
                s_data["computed_at"] = parse_dt(s_data.get("computed_at"))
                commit_id = commit_sha_to_id.get(s_data["full_sha"])
                snapshot = HealthSnapshot(repo_id=repo.id, commit_id=commit_id, **s_data)
                session.add(snapshot)

            # 4. Create GraphNodes
            for n_data in data["nodes"]:
                commit_id = commit_sha_to_id.get(n_data["commit_sha"])
                node = GraphNode(repo_id=repo.id, commit_id=commit_id, **n_data)
                session.add(node)

            # 5. Create GraphEdges
            for e_data in data["edges"]:
                commit_id = commit_sha_to_id.get(e_data["commit_sha"])
                edge = GraphEdge(repo_id=repo.id, commit_id=commit_id, **e_data)
                session.add(edge)

            # 6. Create BusFactor
            for b_data in data["bus"]:
                b_data["last_updated_at"] = parse_dt(b_data.get("last_updated_at"))
                bf = BusFactor(repo_id=repo.id, **b_data)
                session.add(bf)

            await session.commit()
            logger.info(
                "Successfully seeded database using real analyzed 'facebook-react' demo data!"
            )
            return
        except Exception as exc:
            logger.error(
                f"Failed to seed demo data using real fixture: {exc}. Falling back to generating mock data...",
                exc_info=True,
            )

    logger.info("Seeding database with generated fallback 'facebook-react' demo data...")

    # 1. Create Repo
    repo = Repo(
        url="https://github.com/facebook/react",
        name="facebook/react",
        owner="facebook",
        repo_slug="facebook-react",
        default_branch="main",
        total_commits=100,
        analyzed_commits=100,
        status="ready",
        max_commits_setting=100,
        github_stars=221500,
        github_language="JavaScript",
        github_description="A declarative, efficient, and flexible JavaScript library for building user interfaces.",
    )
    session.add(repo)
    await session.flush()

    # Define authors and files
    authors = [
        {"name": "Dan Abramov", "email": "dan@gaearon.mobi"},
        {"name": "Sebastian Markbåge", "email": "seb@fb.com"},
        {"name": "Sophie Alpert", "email": "sophie@fb.com"},
        {"name": "Andrew Clark", "email": "andrew@clark.com"},
        {"name": "Lauren Tan", "email": "lauren@fb.com"},
    ]

    files = [
        "packages/react/src/React.js",
        "packages/react/src/ReactBaseClasses.js",
        "packages/react/src/ReactHooks.js",
        "packages/react-reconciler/src/ReactFiber.js",
        "packages/react-reconciler/src/ReactFiberBeginWork.js",
        "packages/react-reconciler/src/ReactFiberCommitWork.js",
        "packages/react-dom/src/client/ReactDOM.js",
        "packages/shared/ReactSharedInternals.js",
    ]

    # 2. Generate timeline commits & snapshots
    base_time = datetime(2026, 6, 1, tzinfo=timezone.utc)
    commit_instances = []

    # We will generate 40 commits to make a nice timeline
    health_scores = []
    for i in range(40):
        committed_at = base_time + timedelta(days=i * 1.5)
        author = authors[i % len(authors)]
        sha_hex = f"{i:012x}"
        full_sha = f"{sha_hex}7890abc123def4567890abc123def4567890abc"

        # Calculate mock health metrics
        # Fluctuate health score
        if i < 10:
            health_score = 80.0 + (i * 0.5)
        elif i < 22:
            health_score = 85.0 - ((i - 10) * 1.5)  # Drop during major refactoring
        else:
            health_score = 67.0 + ((i - 22) * 1.2)  # Recovery

        health_scores.append(health_score)
        avg_complexity = 3.5 + (i * 0.05) if i < 20 else 4.5 - ((i - 20) * 0.03)
        max_complexity = 12.0 + (i % 5)
        total_loc = 45000 + (i * 150)
        churn_rate = 0.05 + (i % 3) * 0.1
        num_files_changed = 1 + (i % 4)
        bus_factor_min = 1 if i in range(12, 25) else 2

        # Create Commit
        commit = Commit(
            repo_id=repo.id,
            sha=sha_hex,
            full_sha=full_sha,
            message=(
                f"perf: optimize render pathway in concurrent mode part {i}"
                if i % 5 == 0
                else (
                    f"fix: resolve memory leak in hooks lifecycle (attempt {i})"
                    if i % 3 == 0
                    else f"chore: update internal package dependency mapping {i}"
                )
            ),
            author_name=author["name"],
            author_email=author["email"],
            committed_at=committed_at,
            insertions=120 + i * 5,
            deletions=45 + i * 2,
            files_changed=num_files_changed,
            parent_sha=commit_instances[-1].full_sha if commit_instances else None,
        )
        session.add(commit)
        await session.flush()
        commit_instances.append(commit)

        # Create HealthSnapshot
        snapshot = HealthSnapshot(
            repo_id=repo.id,
            commit_id=commit.id,
            full_sha=commit.full_sha,
            health_score=health_score,
            avg_complexity=avg_complexity,
            max_complexity=max_complexity,
            total_loc=total_loc,
            churn_rate=churn_rate,
            num_files_changed=num_files_changed,
            bus_factor_min=bus_factor_min,
            health_delta=(health_score - health_scores[-2]) if len(health_scores) > 1 else None,
            cc_score=health_score + 2.0,
            churn_score=100.0 - (churn_rate * 100),
            bus_score=bus_factor_min * 30.0,
            loc_score=85.0,
            complexity_drift_score=80.0,
            churn_risk_score=75.0,
            bus_factor_risk_score=bus_factor_min * 40.0,
            dependency_health_score=90.0,
            dependency_density=0.15,
            has_cycles=(i % 8 == 0),
            hotspot_count=2 if i > 15 else 1,
            avg_semantic_drift=0.08 + (i % 5) * 0.02,
            semantic_health_score=85.0 + (i % 3) * 3,
            high_drift_files=1 if i % 10 == 0 else 0,
            semantic_drift_method="fallback_levenshtein",
            risk_reasons_json=(
                json.dumps(
                    [
                        {
                            "code": "single_owner",
                            "severity": "high" if bus_factor_min == 1 else "medium",
                            "label": "Single-point-of-failure risk",
                            "detail": "Critical component ReactFiber.js relies entirely on a single contributor.",
                            "impact": 20.0,
                        }
                    ]
                )
                if bus_factor_min == 1
                else "[]"
            ),
            hotspot_persistence_score=45.0,
            persistent_hotspots_json=json.dumps(
                [
                    {
                        "path": "packages/react-reconciler/src/ReactFiber.js",
                        "recent_commit_count": 8,
                        "complexity": 18.5,
                        "loc": 1200,
                    }
                ]
            ),
            top_files_json=json.dumps(
                [
                    {
                        "path": "packages/react-reconciler/src/ReactFiber.js",
                        "complexity": 18.5,
                        "loc": 1200,
                    },
                    {"path": "packages/react/src/ReactHooks.js", "complexity": 12.0, "loc": 450},
                ]
            ),
        )
        session.add(snapshot)
        await session.flush()

        # Create LLM Narrative for latest commit
        if i == 39:
            narrative = LLMNarrative(
                repo_id=repo.id,
                commit_id=commit.id,
                full_sha=commit.full_sha,
                prompt_type="explain_drop",
                cache_key=f"explain_drop_{commit.full_sha}",
                prompt_input="Analyze changes...",
                response_text="### Architectural Changes Summary\nIn this snapshot, Dan Abramov optimized the scheduling loop inside `ReactFiber.js`. This resolves a critical scheduling bottleneck in React Concurrent Mode.\n\n### Complexity & Coupling Shifts\n* **`packages/react-reconciler/src/ReactFiber.js`**: Average cyclomatic complexity decreased slightly from 19.2 to 18.5.\n* **Coupling**: The dependency bridge between `ReactFiber` and `ReactDOM` remains stable.\n\n### Single Point of Failure (Bus Factor)\n* Sebastian Markbåge is currently the sole reviewer and major contributor to the core reconciler packages.",
                tokens_input=1200,
                tokens_output=350,
                cost_usd=0.00,
                model_used="claude-sonnet-4-20250514",
                is_pre_cached=True,
            )
            session.add(narrative)

    # 3. Create GraphNodes & GraphEdges (using the latest commit)
    latest_commit = commit_instances[-1]

    nodes_data = [
        {
            "file": "packages/react/src/React.js",
            "complexity": 3.2,
            "loc": 180,
            "color": "green",
            "entry": True,
        },
        {
            "file": "packages/react/src/ReactBaseClasses.js",
            "complexity": 4.1,
            "loc": 220,
            "color": "green",
            "entry": False,
        },
        {
            "file": "packages/react/src/ReactHooks.js",
            "complexity": 12.0,
            "loc": 450,
            "color": "yellow",
            "entry": False,
        },
        {
            "file": "packages/react-reconciler/src/ReactFiber.js",
            "complexity": 18.5,
            "loc": 1200,
            "color": "red",
            "entry": False,
        },
        {
            "file": "packages/react-reconciler/src/ReactFiberBeginWork.js",
            "complexity": 14.2,
            "loc": 950,
            "color": "orange",
            "entry": False,
        },
        {
            "file": "packages/react-reconciler/src/ReactFiberCommitWork.js",
            "complexity": 9.8,
            "loc": 750,
            "color": "yellow",
            "entry": False,
        },
        {
            "file": "packages/react-dom/src/client/ReactDOM.js",
            "complexity": 5.0,
            "loc": 320,
            "color": "green",
            "entry": True,
        },
        {
            "file": "packages/shared/ReactSharedInternals.js",
            "complexity": 1.5,
            "loc": 80,
            "color": "green",
            "entry": False,
        },
    ]

    for nd in nodes_data:
        node = GraphNode(
            repo_id=repo.id,
            commit_id=latest_commit.id,
            full_sha=latest_commit.full_sha,
            file_path=nd["file"],
            module_name=nd["file"].split("/")[1],
            loc=nd["loc"],
            avg_complexity=nd["complexity"],
            health_color=nd["color"],
            is_entry_point=nd["entry"],
            semantic_drift_score=0.05,
            drift_method="fallback_levenshtein",
        )
        session.add(node)

    await session.flush()

    edges_data = [
        {
            "source": "packages/react/src/React.js",
            "target": "packages/react/src/ReactBaseClasses.js",
            "type": "import",
        },
        {
            "source": "packages/react/src/React.js",
            "target": "packages/react/src/ReactHooks.js",
            "type": "import",
        },
        {
            "source": "packages/react-reconciler/src/ReactFiber.js",
            "target": "packages/react-reconciler/src/ReactFiberBeginWork.js",
            "type": "import",
        },
        {
            "source": "packages/react-reconciler/src/ReactFiber.js",
            "target": "packages/react-reconciler/src/ReactFiberCommitWork.js",
            "type": "import",
        },
        {
            "source": "packages/react-dom/src/client/ReactDOM.js",
            "source_file": "packages/react-dom/src/client/ReactDOM.js",
            "target": "packages/react/src/React.js",
            "type": "import",
        },
        {
            "source": "packages/react-reconciler/src/ReactFiber.js",
            "target": "packages/shared/ReactSharedInternals.js",
            "type": "import",
        },
        {
            "source": "packages/react/src/ReactHooks.js",
            "target": "packages/shared/ReactSharedInternals.js",
            "type": "import",
        },
        # Co-change
        {
            "source": "packages/react-reconciler/src/ReactFiber.js",
            "target": "packages/react-reconciler/src/ReactFiberBeginWork.js",
            "type": "co_change",
            "weight": 5,
        },
        {
            "source": "packages/react/src/React.js",
            "target": "packages/react/src/ReactHooks.js",
            "type": "co_change",
            "weight": 3,
        },
    ]

    for ed in edges_data:
        edge = GraphEdge(
            repo_id=repo.id,
            commit_id=latest_commit.id,
            full_sha=latest_commit.full_sha,
            source_file=ed["source"],
            target_file=ed["target"],
            edge_type=ed["type"],
            weight=ed.get("weight", 1),
        )
        session.add(edge)

    # 4. Create BusFactor modules
    bus_data = [
        {
            "path": "packages/react",
            "count": 12,
            "top": "Dan Abramov",
            "pct": 0.45,
            "commits": 150,
            "risk": "low",
        },
        {
            "path": "packages/react-reconciler",
            "count": 1,
            "top": "Sebastian Markbåge",
            "pct": 0.95,
            "commits": 300,
            "risk": "critical",
        },
        {
            "path": "packages/react-dom",
            "count": 5,
            "top": "Andrew Clark",
            "pct": 0.60,
            "commits": 200,
            "risk": "medium",
        },
        {
            "path": "packages/shared",
            "count": 8,
            "top": "Sophie Alpert",
            "pct": 0.50,
            "commits": 80,
            "risk": "low",
        },
    ]

    for bd in bus_data:
        bf = BusFactor(
            repo_id=repo.id,
            module_path=bd["path"],
            contributor_count=bd["count"],
            top_contributor=bd["top"],
            top_contributor_email="contributor@fb.com",
            top_contributor_pct=bd["pct"],
            total_commits_to_module=bd["commits"],
            risk_level=bd["risk"],
            last_commit_sha=latest_commit.sha,
        )
        session.add(bf)

    await session.commit()
    logger.info("Successfully seeded 'facebook-react' demo database records!")
