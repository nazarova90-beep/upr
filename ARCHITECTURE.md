---
status: approved
last_updated: 2026-04-27
owner: Кристина
related: docs/stack.md, docs/BACKEND.md, docs/FRONTEND.md, docs/DATABASE.md
---

# UPR — architecture

Top-level map of domains and dependency directions. Concrete tools and libraries: `docs/stack.md`. Module-level details: `docs/BACKEND.md`, `docs/FRONTEND.md`, `docs/DATABASE.md`.

## Stack summary

| Layer | Choice |
|---|---|
| Mobile | React Native + Expo (TypeScript). Expo Go in dev; Dev Build only when a native module is required (Phase 3+). |
| Backend | Python + FastAPI. |
| ORM / DB | SQLModel + SQLAlchemy on SQLite (MVP) → PostgreSQL (Phase 6). |
| Video storage | Local folder via `storage/` abstraction (MVP) → S3-compatible (Phase 5). |
| AI | Google Gemini Free Tier (vision) + MediaPipe Pose (server-side preprocessing). |
| Not in MVP, accommodated | Queues, auth, billing, push, deploy, admin panel, observability. |

Full rationale: `docs/stack.md`.

## Architecture invariants (must be enforced in code)

1. **Layered, domain-first.** Each backend domain is a folder under `backend/app/<domain>/` (`workout/`, `exercise_chat/`, `video_analysis/`, `ai_coach/`). Cross-cutting adapters: `ai_provider/`, `storage/`, `db/`, `core/`.
2. **External dependencies hidden behind abstractions.**
   - All AI provider calls go through `ai_provider/` (base interface + concrete impl, e.g. `gemini.py`). Switching to GPT-4o / local Qwen-VL = new implementation only.
   - All file/video persistence goes through `storage/` (base interface + concrete impl, e.g. `local.py`). Switching to S3 = new implementation only.
   - All DB access goes through ORM (SQLModel/SQLAlchemy). No raw concatenated SQL with user input.
3. **i18n by default.** Mobile UI strings come from JSON catalogs via `i18next` + `react-i18next`. Hardcoded user-facing strings in components are forbidden.
4. **Structured logging from day one.**
5. **Boring tech.** Each new library: research dump in `docs/references/<lib>.md` first.

## Domains

| Domain | Backend folder | Responsibility |
|---|---|---|
| Auth | TBD (Phase 5) | Sign-in (Apple/Google), 18+ age gate, account deletion. |
| Workout | `backend/app/workout/` | Workouts, exercises, set log (Phase 4). |
| ExerciseChat | `backend/app/exercise_chat/` | Per-exercise chat, message history. |
| VideoAnalysis | `backend/app/video_analysis/` | Video intake, validation, dispatch to AI, analysis result. |
| AICoach | `backend/app/ai_coach/` | Prompt construction, AI provider invocation. |
| Subscription | TBD (Phase 7) | Paid tiers, limits, billing. |
| Notifications | TBD (Phase 6) | Push. |

## Cross-cutting

- **Localization (i18n):** MVP UI Russian only; client and content strings authored as keys, never inlined (`docs/FRONTEND.md`).
- **Security:** active rules in `docs/SECURITY.md`; deferred full checklist in `docs/design-docs/security-future-reference.md`.
