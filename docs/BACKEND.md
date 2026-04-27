---
status: approved
last_updated: 2026-04-27
owner: Кристина
related: stack.md, ../ARCHITECTURE.md, DATABASE.md, FRONTEND.md
---

# Backend

Server-side overview. Stack rationale: `stack.md`. Folder/module names finalize as code lands in `backend/`.

## MVP stack

- **Python + FastAPI** — async, AI-friendly.
- **SQLModel + SQLAlchemy** — ORM (`DATABASE.md`).
- **SQLite** — local file (MVP); migration path to PostgreSQL via the same ORM.
- **Google Gemini Free Tier** — AI provider (vision).
- **MediaPipe Pose** — server-side preprocessing.

## Responsibilities

- HTTP API for the mobile client.
- Video intake → MediaPipe preprocessing → AI dispatch → result persistence.
- Persistence of workouts, exercises, chats, messages.
- Later (by phase): auth, billing, background jobs, content localization.

## Architectural rules

1. **Domain-first layout.** `backend/app/<domain>/`: `workout/`, `exercise_chat/`, `video_analysis/`, `ai_coach/`. Cross-cutting adapters: `ai_provider/`, `storage/`, `db/`, `core/`.
2. **External dependencies behind abstractions.** AI provider and video storage hidden behind `ai_provider/` and `storage/`. Swapping Gemini → GPT-4o or local folder → S3 is a new interface implementation, not product-logic edits.
3. **All DB queries via ORM.** No concatenated strings with user input.
4. **Structured logging from day one** (observability stack plugs in at Phase 6 — see `stack.md`).

## Single-scenario MVP scope

- FastAPI app runnable locally.
- One hardcoded user singleton (no registration table).
- Video intake endpoint + synchronous (`async`) AI call.
- Chat and video metadata persisted to SQLite via ORM.
- Video files in a local folder via `storage/`.

Excluded from MVP: registration, queues, billing, push, deploy, admin panel. Full list: `stack.md` → "What we deliberately do NOT take into MVP".

## Expansion plan (triggers in `stack.md`)

| Phase | Adds |
|---|---|
| 5 | Sign in with Apple/Google, cloud hosting, S3 via the same `storage/`, SQLAdmin. |
| 6 | SQLite → PostgreSQL via the same ORM, task queue, paid AI, observability. |
| 7 | Billing (App Store IAP / Google Play / Stripe), limits service. |
| 8 | Horizontal scaling, cache, backup AI provider. |

## Project structure (current skeleton)

```
backend/app/
├── main.py             # FastAPI() — no endpoints yet
├── core/               # config, logging
├── workout/            # routes, service, models
├── exercise_chat/
├── video_analysis/
├── ai_coach/
├── ai_provider/        # base + gemini stub
├── storage/            # base + local stub
└── db/                 # session + SQLModel models
```
