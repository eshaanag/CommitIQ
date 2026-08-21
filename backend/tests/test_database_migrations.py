import asyncio
from pathlib import Path

from backend.database import (
    apply_sql_migrations,
    check_database_migrations,
    get_unapplied_migrations,
)


class FakeResult:
    def __init__(self, rows=None):
        self.rows = rows or []

    def fetchall(self):
        return self.rows


class FakeAsyncConnection:
    def __init__(self):
        self.applied_versions: set[str] = set()
        self.executed: list[str] = []
        self.widgets: list[tuple[int, str]] = []
        self.repos_columns = ["id"]

    async def execute(self, statement, params=None):
        sql = " ".join(str(statement).split())
        self.executed.append(sql)

        if sql.startswith("CREATE TABLE IF NOT EXISTS schema_migrations"):
            return FakeResult()
        if sql == "SELECT version FROM schema_migrations":
            return FakeResult([(version,) for version in sorted(self.applied_versions)])
        if sql.startswith("INSERT INTO schema_migrations"):
            self.applied_versions.add(params["version"])
            return FakeResult()
        if sql == "DELETE FROM schema_migrations":
            self.applied_versions.clear()
            return FakeResult()

        if sql.startswith("CREATE TABLE widgets"):
            return FakeResult()
        if sql.startswith("INSERT INTO widgets"):
            self.widgets.append((1, "alpha"))
            return FakeResult()
        if sql == "SELECT id, name FROM widgets":
            return FakeResult(self.widgets)

        if sql.startswith("CREATE TABLE repos"):
            self.repos_columns = ["id"]
            return FakeResult()
        if sql.startswith("PRAGMA table_info(repos)"):
            return FakeResult([(index, name) for index, name in enumerate(self.repos_columns)])
        if sql.startswith("ALTER TABLE repos ADD COLUMN"):
            column_name = sql.split()[5]
            if column_name not in self.repos_columns:
                self.repos_columns.append(column_name)
            return FakeResult()

        return FakeResult()


def test_apply_sql_migrations_records_and_skips_applied_files(tmp_path: Path):
    migration = tmp_path / "0001_create_widgets.sql"
    migration.write_text(
        """
        -- comments are ignored by the migration parser
        CREATE TABLE widgets (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL
        );

        INSERT INTO widgets (id, name) VALUES (1, 'alpha');
        """,
        encoding="utf-8",
    )

    async def run_assertions():
        conn = FakeAsyncConnection()

        first_run = await apply_sql_migrations(conn, tmp_path, is_sqlite=True)
        second_run = await apply_sql_migrations(conn, tmp_path, is_sqlite=True)
        rows = (await conn.execute("SELECT id, name FROM widgets")).fetchall()
        applied = (await conn.execute("SELECT version FROM schema_migrations")).fetchall()

        assert first_run == ["0001_create_widgets"]
        assert second_run == []
        assert rows == [(1, "alpha")]
        assert applied == [("0001_create_widgets",)]

    asyncio.run(run_assertions())


def test_apply_sql_migrations_keeps_sqlite_add_column_idempotent(tmp_path: Path):
    migration = tmp_path / "0001_add_repo_status.sql"
    migration.write_text(
        "ALTER TABLE repos ADD COLUMN status TEXT DEFAULT 'pending';",
        encoding="utf-8",
    )

    async def run_assertions():
        conn = FakeAsyncConnection()
        await conn.execute("CREATE TABLE repos (id INTEGER PRIMARY KEY)")

        await apply_sql_migrations(conn, tmp_path, is_sqlite=True)
        await conn.execute("DELETE FROM schema_migrations")
        reapplied = await apply_sql_migrations(conn, tmp_path, is_sqlite=True)
        columns = (await conn.execute("PRAGMA table_info(repos)")).fetchall()

        assert reapplied == ["0001_add_repo_status"]
        assert [column[1] for column in columns] == ["id", "status"]

    asyncio.run(run_assertions())


def test_get_unapplied_migrations_detects_pending_files(tmp_path: Path):
    m1 = tmp_path / "0001_init.sql"
    m2 = tmp_path / "0002_add_field.sql"
    m1.write_text("SELECT 1;", encoding="utf-8")
    m2.write_text("SELECT 2;", encoding="utf-8")

    async def run_assertions():
        conn = FakeAsyncConnection()
        unapplied_before = await get_unapplied_migrations(conn, tmp_path)
        assert unapplied_before == ["0001_init", "0002_add_field"]

        await apply_sql_migrations(conn, tmp_path, is_sqlite=True)

        unapplied_after = await get_unapplied_migrations(conn, tmp_path)
        assert unapplied_after == []

    asyncio.run(run_assertions())


def test_check_database_migrations_warns_in_development(tmp_path: Path):
    m1 = tmp_path / "0001_feature.sql"
    m1.write_text("SELECT 1;", encoding="utf-8")

    async def run_assertions():
        conn = FakeAsyncConnection()
        res = await check_database_migrations(conn, env="development", migrations_dir=tmp_path)

        assert res["status"] == "unapplied_detected"
        assert res["unapplied"] == ["0001_feature"]
        assert res["applied"] == []
        assert res["auto_applied"] is False
        assert conn.applied_versions == set()

    asyncio.run(run_assertions())


def test_check_database_migrations_auto_applies_in_production(tmp_path: Path):
    m1 = tmp_path / "0001_feature.sql"
    m1.write_text("SELECT 1;", encoding="utf-8")

    async def run_assertions():
        conn = FakeAsyncConnection()
        res = await check_database_migrations(conn, env="production", migrations_dir=tmp_path)

        assert res["status"] == "applied"
        assert res["applied"] == ["0001_feature"]
        assert res["auto_applied"] is True
        assert conn.applied_versions == {"0001_feature"}

    asyncio.run(run_assertions())
