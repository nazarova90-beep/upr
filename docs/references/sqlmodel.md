---
status: approved
last_updated: 2026-04-27
owner: Кристина
related: ../BACKEND.md, ../DATABASE.md, ../stack.md, fastapi.md, index.md
---

# SQLModel — research note

Source: MCP `user-context7`, library ID `/fastapi/sqlmodel` (Source Reputation: Medium; Benchmark Score: 72.2; 463 snippets). Fetched: 2026-04-27.

## Purpose in project

Single model dictionary serving both ORM (DB tables) and API schemas (Pydantic). Same author as FastAPI; designed to be used together. Selected in `stack.md` as the unified model layer for DB + future admin.

## Version

- Pre-1.0 at fetch (`0_0_24`).
- Pin pattern: `sqlmodel>=0.0.24,<0.1.0`.
- Python 3.13 supported (requires 3.7+; tracks SQLAlchemy 2.0+).

## Key API

### 1. Table definition

```python
from sqlmodel import Field, SQLModel


class Hero(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str
    secret_name: str
    age: int | None = None
```

- Subclass `SQLModel`.
- `table=True` → DB table (without it → API schema only).
- `id: int | None = Field(default=None, primary_key=True)` — autoincrement pattern: `None` pre-save, integer post-save.

### 2. `Field()` for column settings

```python
class Product(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    sku: str = Field(unique=True)
    category_id: int | None = Field(default=None, foreign_key="category.id")
    description: str | None = Field(default=None, max_length=500)
```

`Field()` configures: indexes, uniqueness, foreign keys (`"category.id"` — table.column), string length, validators (`ge=0`, `le=5`), nullable.

### 3. Relationships

```python
from sqlmodel import Relationship


class Team(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str
    heroes: list["Hero"] = Relationship(back_populates="team")


class Hero(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str
    team_id: int | None = Field(default=None, foreign_key="team.id")
    team: Team | None = Relationship(back_populates="heroes")
```

`Relationship(back_populates=...)` defines a bidirectional link. Not a DB column — accessor for related records.

### 4. Engine + table creation

```python
from sqlmodel import SQLModel, create_engine


engine = create_engine("sqlite:///database.db")


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)
```

- `create_engine(...)` — DB connection. SQLite → file path. PostgreSQL → `postgresql://...`. SQLite → PostgreSQL = string change (`stack.md`).
- `SQLModel.metadata.create_all(engine)` — creates missing tables. Sufficient for MVP. Beta phase → Alembic migrations (`DATABASE.md`).

## Gotchas

| Issue | Mitigation |
|---|---|
| Pre-1.0; minors may break API. | Pin version. |
| `table=True` required for DB tables. Without it — Pydantic schema only, no DB. | Keep table vs API-schema split clear. |
| `id: int | None` must be Optional, else Pydantic requires id at construction (none exists pre-save). | Use `id: int | None = Field(default=None, primary_key=True)`. |
| `metadata.create_all` does not update existing tables on model change — only creates missing ones. | MVP: delete `database.db` manually. Beta: Alembic. |

## Skeleton scope

- One file per entity in `backend/app/db/models/`.
- Empty class with `table=True` and minimal fields (e.g. `id`).
- Real fields filled in thin slice (Phase 2).

## Links

- Docs: <https://sqlmodel.tiangolo.com/>
- Tutorial: <https://sqlmodel.tiangolo.com/tutorial/>
- Releases: <https://github.com/fastapi/sqlmodel/releases>
