# Database Migrations

## Alembic Migration Workflow
CommitIQ supports standard Alembic migrations. Run:
```bash
alembic init migrations
alembic revision --autogenerate -m "schema change"
alembic upgrade head
```

Place SQL migration files in this directory using sortable filenames, for example
`0001_add_repository_metadata.sql`.

The backend applies these files once during startup after SQLAlchemy has ensured
the base schema exists. Applied filenames are recorded in the `schema_migrations`
table.
