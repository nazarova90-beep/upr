---
status: approved
last_updated: 2026-04-27
owner: Кристина
related: stack.md, ../ARCHITECTURE.md, BACKEND.md, generated/
---

# Database

Data layer overview. Concrete fields finalize as code lands in `backend/app/db/models/`. Final schema auto-generates into `generated/db-schema.md`.

## Stack

- **MVP:** SQLite (single file).
- **ORM:** SQLAlchemy + SQLModel — single model dictionary for app, migrations (Alembic), future admin (SQLAdmin).
- **Phase 6:** PostgreSQL via the same ORM (no app rewrite). Migration strategy: Alembic (introduced at Phase 5 first cloud deploy).

Rationale: `stack.md` → "Why these choices".

## Entities (Single-scenario MVP)

| Entity | Purpose |
|---|---|
| `Exercise` | Exercise catalog item. Fields (MVP): `id`, `name`, `technique`. |
| `Workout` | Workout (MVP: one hardcoded). |
| `ExerciseChat` | Chat per exercise (one per `user × exercise`). |
| `ChatMessage` | Messages (text / video / annotation / system). |
| `VideoAnalysis` | Analysis result (metadata + screenshot URI). |

`User` — hardcoded singleton, no table; appears at Phase 5 with registration.
`Set` (weight × reps), `Subscription` — appear at Phase 4 (set log) and Phase 7 (billing).

## Video storage

Videos are not stored in the main DB. DB stores **URI + metadata** (size, duration, type, owner, date).

- **MVP:** URI points to local folder (via `storage/`).
- **Phase 5+:** same URI points to S3-compatible storage — no DB schema change.

## Phase additions

| Trigger | Addition |
|---|---|
| First models exist | Auto-generated ER diagram and indexes in `generated/db-schema.md`. |
| Phase 5 (first cloud deploy) | Alembic migrations. Account-deletion cascade (videos physically removed within 30 days — see `design-docs/security-future-reference.md`). |
| Phase 7 (billing) | Retention policy: 2 months free / unlimited paid. |
| Phase 5 | Backups. |
| Phase 8+ | Sharding / replication. |
