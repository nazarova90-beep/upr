---
id: EP-mvp-product-spec
tier: ExecPlan
status: active
last_updated: 2026-04-27
owner: Кристина
related: ../../product.md, ../../product-specs/index.md, roadmap.md, ../../user-flows/upload-video-and-get-feedback.md, ../PLANS.md
---

# Plan: MVP product specification

Place in roadmap: Phase 1 / Track A. Track B = UI mockups. Track C = `mobile/` + `backend/` skeleton (closed; mobile part frozen by 2026-04-27 web pivot). Track D = web pivot + `web/` skeleton (in progress; see `EP-pivot-to-web.md`). All converge at end of Phase 1 → Phase 2 (thin slice).

## Goal

Fully describe MVP product surface before technical implementation. Outputs land in `docs/product-specs/`, `docs/user-flows/`, `docs/ui/`.

## Checklist structure (since 2026-04-19)

- **Block A — Single-scenario MVP** — Track A of Phase 1 + content for Phases 2–3.
- **Block B — Post-MVP / Full MVP** — items from `../../product.md` § 9 beyond Single-scenario MVP. Moves to Phase 4.

### Foundation (done)

- [x] Concept and audience (`docs/product.md`)
- [x] Main feature: per-exercise chat (`product-specs/exercise-chat.md`)
- [x] Video handling (`product-specs/videosinstruction.md`)
- [x] Main user scenario (inside `docs/product.md`)
- [x] Documentation structure per OpenAI Harness Engineering
- [x] Stack selection (`stack.md`)
- [x] Architecture baseline (`ARCHITECTURE.md`)
- [x] Project roadmap (`roadmap.md`)
- [x] Documentation optimized for project scale (2026-04-27): merged `product.md` / `product-specs/product.md` / `PRODUCT_SENSE.md`; removed `RELIABILITY.md`; trimmed `SECURITY.md` / `BACKEND.md` / `DATABASE.md`; full security checklist preserved in `design-docs/security-future-reference.md`.
- [x] Documentation refactored to agent-first (2026-04-27): removed beginner narratives and analogies from all `docs/*` files.

---

### Block A — Single-scenario MVP (Phases 1–3)

#### A.1. Product specs (Phase 1 / Track A) — closed 2026-04-19

- [x] **3 starting exercises** for hardcoded workout → `product-specs/exercises-base.md`
  - [x] Exercises: Romanian deadlift, dumbbell biceps curl (classic grip), lat pulldown
  - [x] Per-exercise fields: `id`, `name`, `technique` (3–5 lines). No common-mistakes, no image (deferred to Full MVP)
  - [x] Source of technique descriptions: written in-house (agent draft → owner edit)
- [x] **Single hardcoded workout** of these three → `product-specs/workout.md`
  - [x] Order: Romanian deadlift → lat pulldown → biceps curl
  - [x] Workout screen anatomy: title "Вайбкодинговая тренировка", date 19.04.2026, "3 упражнения" counter, three cards with sequential number, info icon (technique pop-up), nav arrow to chat

#### A.2. User flow Single-scenario MVP (Phase 1 / Track A) — closed 2026-04-19

- [x] Main and only MVP scenario — upload video and get analysis → `user-flows/upload-video-and-get-feedback.md`
  - [x] From "open app" to "got AI reply and asked follow-up"
  - [x] Tap exercise on workout screen → straight into per-exercise chat (no intermediate screens)
  - [x] Video upload from inside chat (instant send after system gallery picker) → no in-app capture, no preview screen → AI reply in same chat
  - [x] "AI is analyzing" state (placeholder, "Загрузить видео" button disabled, single analysis in queue)
  - [x] Upload error / bad-video behavior — minimal (full two-stage check → Phase 3); irrelevant exercise not checked in Single-scenario MVP (Phase 3)

#### A.3. UI for Single-scenario MVP (Phase 1 / Track B)

- [ ] Key UI components from Lucent for this scenario → `ui/components.md` (workout-list exercise card, chat bubble, attach button, "AI is analyzing" indicator, annotated frame in message)
- [ ] UI text principles → `ui/voice-and-tone.md`
- [ ] Mockups for 2 main MVP screens + states → `ui/mockups/`
  - [ ] Workout screen with three exercises (cards, tappable)
  - [ ] Per-exercise chat screen: message area + "Загрузить видео" button + input field
  - [ ] Empty-chat state (before first video) — guidance to user
  - [ ] "AI is analyzing video" state inside chat (indicator, input field locked)
  - [ ] "AI reply received" state — text + annotated frame
  - [ ] Error / irrelevant-video state inside chat

#### A.4. Technical skeleton (Phase 1 / Track C)

- [x] Expo project (TypeScript), Lucent design tokens in `theme.ts` (constants for `StyleSheet`), i18n via `i18next`. Manrope / Material Symbols — separate step.
- [x] FastAPI project per `BACKEND.md` domains: `backend/app/{workout,exercise_chat,video_analysis,ai_coach}/` + `ai_provider/` + `storage/` + `db/` — empty routers/services/models.
- [x] Baseline ORM models for Single-scenario MVP: `Exercise`, `Workout` (hardcoded), `ExerciseChat`, `ChatMessage`, `VideoAnalysis`. `User` — hardcoded singleton, no table. Empty SQLModel classes in `backend/app/db/models/`. Fields filled in Phase 2.
- [ ] Local "hello world": backend serves `/health`, **web** app calls it via Vite proxy (replaces superseded mobile-via-ngrok plan; see `EP-pivot-to-web.md`).
- [ ] Full DB schema (`DATABASE.md` + `generated/db-schema.md`) — auto-generated after models.

---

### Block B — Post-MVP / Full MVP (Phase 4)

Run after Single-scenario MVP is stable (end of Phase 3).

#### B.1. Exercise base + workout expansion

- [ ] Full 20-exercise base (`product-specs/exercises-base.md`)
  - [ ] Final list of 20.
  - [ ] Source of technique descriptions.
- [ ] User-built workouts from base (`product-specs/workout.md`).
- [ ] Set log (weight × reps) on exercise screen.
- [ ] Multi-workout program.
- [ ] Workout start / pause / finish behavior.

#### B.2. Post-MVP user flows

- [ ] Onboarding (full, after interview insights) — `user-flows/onboarding.md`.
- [ ] Workout start and run — `user-flows/start-workout.md`.

#### B.3. Registration and account (Phase 5)

- [ ] Registration / login — `user-flows/registration.md`, `login.md`.
- [ ] Subscription management — `user-flows/manage-subscription.md`.
- [ ] Account deletion — `user-flows/delete-account.md`.

#### B.4. Business model (Phase 7)

- [ ] Free-tier limits.
- [ ] Paid-tier price + composition.
- [ ] AI request cost model.

## Open questions

- Final list of 20 exercises for MVP base.
- Source of technique descriptions: in-house / licensed / consulting trainer partnership.
- Free-tier limits and paid-tier features (numbers).
- Launch region: RU only / RU + EU / global with English.
- Minimum iOS / Android versions.

## Decision log

| Date | Decision | Source |
|---|---|---|
| 2026-04-18 | Concept, audience, MVP scope | `docs/product.md` |
| 2026-04-18 | One chat per exercise (not per workout) | `product-specs/exercise-chat.md` |
| 2026-04-18 | Analysis triggered by explicit button; user comment processed first | `product-specs/videosinstruction.md` |
| 2026-04-18 | AI must recognize exercise + match against chat | `product-specs/videosinstruction.md` |
| 2026-04-18 | One analysis in queue per user | `product-specs/videosinstruction.md` |
| 2026-04-18 | Message retention: 2 months free, unlimited paid | `product-specs/exercise-chat.md` |
| 2026-04-18 | Two-stage video quality check (device + AI) | `product-specs/videosinstruction.md` |
| 2026-04-18 | Doc structure per OpenAI Harness | `design-docs/core-beliefs.md`, `AGENTS.md` |
| 2026-04-18 | Security in dedicated `SECURITY.md` | `docs/SECURITY.md` |
| 2026-04-19 | Audience narrowed to 18+; kids modes / parental consent excluded | `docs/product.md`, `docs/SECURITY.md` |
| 2026-04-19 | MVP stack initial: Flutter + Python/FastAPI + SQLite (ORM) + Gemini Free Tier + MediaPipe; phased scaling plan | `docs/stack.md` |
| 2026-04-19 | Admin deferred; SQLAdmin reserved on top of ORM | `docs/stack.md` |
| 2026-04-19 | Project roadmap accepted (parallel tracks in Phase 1, exit triggers). This plan = Track A of Phase 1. | `roadmap.md` |
| 2026-04-19 | MVP narrowed: split into Single-scenario MVP and Full MVP. Set log moved to Block B. | `roadmap.md`, this file |
| 2026-04-19 | Workout-list tap → straight into chat; no exercise screen with technique / set log in Single-scenario MVP. Single-scenario MVP = 2 screens (workout + chat). | `roadmap.md`, this file (Block A) |
| 2026-04-19 | No in-app capture in Single-scenario MVP. Gallery system picker only. Out: in-app camera, recording preview, camera permissions, recording interruptions. | `roadmap.md`, this file (Block A) |
| 2026-04-19 | Track A of Phase 1 closed. Fixed: 3 starting exercises (Romanian deadlift, biceps curl, lat pulldown) with minimal `id` / `name` / `technique`; single hardcoded workout "Вайбкодинговая тренировка" 19.04.2026; workout-screen and exercise-card anatomy; single user flow (`user-flows/upload-video-and-get-feedback.md`); "Single-scenario MVP simplifications" notes in `exercise-chat.md` and `videosinstruction.md`. | this file (A.1, A.2 → `[x]`); `exercises-base.md`; `workout.md`; `user-flows/upload-video-and-get-feedback.md`; `exercise-chat.md`; `videosinstruction.md` |
| 2026-04-19 | Frontend stack revised at start of Track B: Flutter → React Native + Expo (TypeScript). Reason: onboarding cost (Flutter requires Xcode ~15 GB or Android Studio ~10 GB; Expo Go runs on owner's iPhone via QR code without native infra). All Single-scenario MVP features supported in Expo Go without Dev Build (verified via MCP `user-context7`). Track C updated: instead of "Flutter project + ARB + ThemeData" → "Expo project + i18next + theme.ts". Possible Track B + C merger. | `docs/stack.md`, `docs/FRONTEND.md`, `docs/references/expo.md`, `docs/exec-plans/active/roadmap.md`, this file (Track C) |
| 2026-04-27 | Documentation refactored to agent-first: removed beginner narratives and analogies from all `docs/*` files. | `roadmap.md` decision log |
| 2026-04-27 | **Frontend pivot: React Native + Expo → React + Vite + TypeScript (web).** Cause: always-on VPN on owner's Mac and iPhone blocking LAN reach between Expo Go and FastAPI; Apple Developer Account out of MVP budget; Lucent design system already in HTML/CSS. `mobile/` skeleton frozen on disk; new Track D added under Phase 1 to drive `web/` skeleton. Hello-world plan superseded. A.4 hello-world bullet retargeted to web client. | `active/EP-pivot-to-web.md`, `docs/stack.md`, `docs/FRONTEND.md`, `AGENTS.md`, `roadmap.md` decision log |
