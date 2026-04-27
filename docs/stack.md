---
status: approved
last_updated: 2026-04-27
owner: Кристина
related: ../README.md, ../ARCHITECTURE.md, BACKEND.md, FRONTEND.md, DATABASE.md, SECURITY.md, product.md, exec-plans/active/EP-pivot-to-web.md
---

# UPR — stack

Single source of truth for the chosen stack: current MVP picks, future expansion triggers, decision log. Domain-specific details: `BACKEND.md`, `FRONTEND.md`, `DATABASE.md`.

## Stack constraints

1. MVP — single user (owner). No public load, no registration, no billing.
2. AI on MVP — only free tiers / free providers.
3. No deploy on MVP — local execution.
4. Custom UI required (no third-party UI kit lock-in).
5. Audience 18+.
6. Stack must be boring tech — well-represented in training data, agent-friendly.
7. No present-day shortcut may block future scaling.

## Selection principles

| Principle | Practical effect |
|---|---|
| Simplicity wins over power | One library beats three. |
| Replaceable without rewrite | Each external dependency (DB, AI provider, video storage) hidden behind an abstraction. |
| Free now, paid as revenue grows | MVP: free tiers. Paid + cloud once revenue exists. |
| Admin-ready models from day one | ORM models from day one — SQLAdmin can plug in later in a day. |
| i18n-ready from first commit | No inlined Russian strings — only via i18n. |
| Document external libraries | `docs/references/<lib>.md` via MCP `user-context7` before code. |

## MVP stack

| Layer | Choice | Note |
|---|---|---|
| Web client | React + Vite + TypeScript | Browser app (PWA-capable). Mac Safari is primary dev surface; iPhone Safari via tunnel. No Xcode, no Apple Developer Account. |
| Backend | Python + FastAPI | Async, AI-friendly. |
| ORM | SQLAlchemy + SQLModel | Single model dictionary for DB and (future) admin. |
| DB (start) | SQLite (single file) | |
| Video storage (start) | Local folder via `storage/` abstraction | |
| AI measurement layer | MediaPipe Pose (Google, free, local) | Reduces LLM cost, improves analysis quality. |
| AI coach | Google Gemini API — Free Tier | Only top vision-LLM with native video input + free tier in 2026. |
| Task queue | None on MVP — `async`/`await` in FastAPI | |
| Auth / billing / push | None on MVP | |
| Admin panel | None on MVP | SQLAdmin reserved on top of ORM models. |
| Deploy | None | Local. Single-origin via Vite proxy `/api/*` → `localhost:8000`. |
| i18n | `i18next-browser-languagedetector` + `i18next` + JSON catalogs | |

### Choice notes

- **React + Vite (web), not React Native + Expo (mobile), not Flutter.** Owner constraints (2026-04-27): always-on VPN on Mac and iPhone blocks LAN reach between Expo Go and FastAPI; Apple Developer Account ($99/year) out of MVP budget. Browser app sidesteps both. Lucent design system already authored in HTML/CSS — direct consumption, no token re-translation. Vite dev server gives <1 s hot reload on `localhost`. Native iOS/Android shell tracked as ≥ Phase 9 if owner-approved.
- **FastAPI, not Django.** Center of gravity is AI interaction (long requests, async, streaming). Free admin via SQLAdmin without changing backend.
- **SQLite, not PostgreSQL on day one.** Single user — PostgreSQL is overkill. ORM allows config-line migration later.
- **Gemini Free Tier, not GPT-4o / Claude.** Native video input + free tier sufficient for one user. GPT-4o / Claude considered as paid alternatives at public release.
- **MediaPipe, not LLM-only.** Free pose estimation provides exact body angles → fed alongside video → cheaper, more concrete analysis. Browser-side `@mediapipe/tasks-vision` available for optional on-device pre-filter (Phase 3).
- **Plain CSS + CSS modules, not CSS-in-JS / Tailwind.** Lucent ships as CSS; direct consumption is simplest. Boring tech first.

## Deliberately excluded from MVP

| Component | Reason |
|---|---|
| Task queue (Celery / RQ + Redis) | Single user — no resource contention. Adds when concurrent users appear. |
| Full registration (email/password/recovery) | Single user — hardcoded singleton suffices. |
| Billing (Stripe / RuStore Billing / App Store IAP) | No monetization on MVP. |
| Push (Firebase / APNs) | User sees result in-app. |
| Cloud video storage (S3 / Yandex Object Storage) | Local folder suffices. |
| Admin panel | Designed separately, post-product-use. |
| CI/CD and deploy | Later. |
| Analytics (Amplitude / PostHog) | Single user — meaningless. |
| Reliability / SLO / observability stack | Single local user, no public API. Activates at Phase 6 (public beta). |

## Forward-compatibility decisions

These cost no time today and save months later:

1. **All data via ORM (SQLAlchemy/SQLModel).** Enables: SQLite → PostgreSQL migration, SQLAdmin admin panel, schema auto-generation in `docs/generated/db-schema.md`.
2. **`ai_provider/` abstraction layer.** Switch Gemini → GPT-4o / Claude / local Qwen-VL = new interface implementation, no product-logic edits.
3. **`storage/` abstraction layer.** Local folder today, S3 tomorrow.
4. **All UI strings via `i18next` + JSON catalogs.**
5. **Domain-first project structure** (`workout/`, `exercise_chat/`, `video_analysis/`, `ai_coach/`).
6. **Structured logging** from day one.

## Expansion / scaling phases

Phases are triggers, not calendar dates. "When X happens — switch to Y."

### Phase 1 (current). Single-user MVP.

Local, free, all of the above.

### Phase 5. Closed testing (5–20 users).

Trigger: ready to show to first real users.

- Registration: Sign in with Apple / Google.
- Backend → simple cloud host (Render / Railway / Fly.io / VPS).
- DB: SQLite + regular backups.
- Video → S3-compatible cloud storage.
- SQLAdmin minimal admin (user / video viewing).
- AI: Gemini Free Tier while quotas suffice; cost monitoring on.

### Phase 6. Public beta.

Trigger: tens/hundreds of users.

- DB: SQLite → PostgreSQL via the same ORM.
- Task queue (RQ + Redis or Celery) for video analysis.
- AI: paid Gemini or comparative test with GPT-4o (data not used for training by default).
- Observability (Sentry / OpenTelemetry).
- Product analytics (PostHog / Amplitude).
- Full admin panel.

### Phase 7. Paid subscription / monetization.

Trigger: confirmed PMF.

- Billing: App Store IAP / Google Play Billing / Stripe.
- Free-tier limits via rate limiter service.
- Paid tiers including AI + live trainer ladder.

### Phase 8. Scaling.

Trigger: stable growth, load spikes.

- Horizontal FastAPI scaling.
- Redis cache on hot endpoints.
- CDN for video and images.
- Possible dedicated AI worker (open-source Qwen3-VL on GPU).
- Backup AI provider.

### Phase 9. Audience expansion.

- English + other locales (i18n already wired).
- Live trainer marketplace.
- Optional native iOS/Android shell (if owner-approved) — fresh React Native + Expo project beside `web/`, sharing TS domain types and i18n catalogs. Requires Apple Developer Account at this point.

## Future admin (anticipated capabilities)

To avoid future model churn, fix what admin will do:

- Exercise catalog CRUD.
- Chat / video moderation (on user request or report).
- User management (view, block, soft delete).
- Bad-AI-response review for prompt improvement.
- Tier and limit management (post-monetization).
- Live-trainer database management.
- Translations / locale management.
- Basic logs and usage metrics.

Tech: SQLAdmin (or spa-sqladmin) on top of SQLAlchemy models. Admin auth: separate login + 2FA.

Detailed spec: `product-specs/admin.md` (created when scheduled).

## AI strategy: free now → paid as we grow

| Phase | Model | Tier | Notes |
|---|---|---|---|
| MVP (1) | Google Gemini (Vision) | Free | Data may be used for training. Acceptable for owner-only tests. |
| Beta (5–6) | Gemini paid or GPT-4o | Pay-as-you-go | Data not used for training by default. Compare quality and per-exercise cost. |
| Public (6+) | Primary + backup provider | Paid | Failover, prompt catalog, A/B tone tests. |
| Possible | Qwen3-VL / open-source vision LLM | Self-hosted | Full data control; requires GPU + DevOps. Decided by economics. |

Free supplementary tool at any phase: **MediaPipe Pose** — reduces cloud AI bill, improves analysis quality.

## Open questions

- Specific Gemini version for MVP (Pro / Flash / Flash-Lite).
- Phase 5 hosting choice for backend (Render / Railway / Fly.io / VPS) and for static `web/` build (Cloudflare Pages / Vercel / Netlify / same host as backend).
- Admin stack: classic SQLAdmin or spa-sqladmin.
- Phase 7 payment provider (region-dependent).
- PWA manifest + service worker timing: Phase 1 (early polish) or Phase 3 (after thin slice).
- On-device MediaPipe (Phase 3, optional): browser-native `@mediapipe/tasks-vision`. No Dev Build required (was a constraint in the deprecated mobile stack).

## Decision log

| Date | Decision |
|---|---|
| 2026-04-19 | Initial MVP stack: Flutter + Python/FastAPI + SQLite (via ORM) + Gemini Free Tier + MediaPipe. |
| 2026-04-19 | Frontend revised: Flutter → React Native + Expo (TypeScript). Cause: onboarding cost (Flutter needs Xcode ~15 GB or Android Studio ~10 GB; Expo Go runs on physical iPhone via QR code). All Single-scenario MVP capabilities (gallery video picker, video player, network upload, dark theme, Manrope, i18n) supported in Expo Go without Dev Build (verified via MCP `user-context7`, `references/expo.md`). First need for native build: Phase 3 (on-device MediaPipe, optional). |
| 2026-04-27 | Frontend revised: React Native + Expo → React + Vite + TypeScript (web client). Cause: owner runs always-on VPN on both Mac and iPhone, blocking LAN reach between Expo Go and FastAPI (already worked around via ngrok in superseded `exec-plans/superseded/EP-hello-world.md`); Apple Developer Account ($99/year) out of MVP budget; Lucent design system already authored in HTML/CSS — direct consumption in web; backend platform-agnostic by design. Browser app removes Xcode / Android Studio / Apple Developer / TestFlight from MVP path entirely. Native iOS/Android shell moved from Phase 1 to optional ≥ Phase 9. Pivot driven by `exec-plans/active/EP-pivot-to-web.md`. |
