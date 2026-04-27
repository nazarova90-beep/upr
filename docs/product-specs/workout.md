---
status: in-progress
last_updated: 2026-04-27
owner: Кристина
related: ../product.md, exercise-chat.md, exercises-base.md, ../exec-plans/active/roadmap.md, ../exec-plans/active/mvp-product-spec.md
---

# Workout

A workout = a named, ordered list of exercises taken in one gym session.

Two passes (mirroring `exercises-base.md`):

1. **Single-scenario MVP** (`roadmap.md` Phase 1) — one hardcoded workout. No create / edit / delete. No set log.
2. **Full MVP** (`roadmap.md` Phase 4) — user-built workouts from base, set log (weight × reps), history, multi-workout program.

---

## MVP: single hardcoded workout (Single-scenario MVP)

### Definition

Exactly one workout, hardcoded in code / DB seed. User cannot rename, reorder, or delete. Main and only screen on app open — no workout-selection screen, no onboarding.

### Workout fields

| Field | MVP value | Behavior |
|---|---|---|
| Name | **"Вайбкодинговая тренировка"** | Hardcoded. |
| Date | **19.04.2026** | Hardcoded. Not "today", not editable. Becomes real creation/run date in Full MVP. |
| Exercise count | **"3 упражнения"** (string under name) | Hardcoded string. Auto-counted in Full MVP. |
| Exercise list | three references to records in `exercises-base.md` | Fixed order (below). |

### Exercise order

| # | id | name |
|---|---|---|
| 1 | `romanian_deadlift` | Румынская тяга со штангой |
| 2 | `lat_pulldown_to_chest` | Вертикальная тяга блока к груди |
| 3 | `dumbbell_biceps_curl` | Подъём гантелей на бицепс |

### Workout screen anatomy

Top-down:

1. Header:
   - Workout name: "Вайбкодинговая тренировка".
   - Date below name: "19.04.2026".
   - Counter below date: "3 упражнения".
2. Three exercise cards in order.

#### Exercise card anatomy

- Sequential number: "1", "2", "3".
- Exercise name (`name` field from `exercises-base.md`).
- Small "info" icon (i-in-circle or similar) — tap → pop-up over screen with full technique description (`technique` field). Closed via close button/link. Pop-up does not navigate user away from workout screen.
- Right-side arrow on card — tap on card or arrow → navigate to per-exercise chat.

Tap-card → straight to chat (no separate exercise screen with technique / set log) is the key Single-scenario MVP decision (`roadmap.md` § 3). Technique description lives in the info-icon pop-up.

#### Absent on workout screen in Single-scenario MVP

- "Начать тренировку" / "Завершить тренировку" buttons.
- Workout timer.
- Progress indicator ("1 of 3 done").
- Drag-reorder, delete, add-new-exercise.
- Set log on this screen (Full MVP — on exercise screen, which doesn't exist in Single-scenario MVP).
- "Сменить тренировку" / "Создать новую" buttons.

### Visual decisions

Exact visuals (paddings, typography, card style, info-icon style, pop-up form: modal vs bottom sheet) — Track B (Phase 1 mockups). This doc fixes meaning, not pixels.

Chat-screen visuals (target of arrow tap) — separate Track B task, not described here.

### Connections

- Exercise base: `exercises-base.md` — source of three records.
- Per-exercise chat: `exercise-chat.md` — destination of arrow tap.
- User flow: `../user-flows/upload-video-and-get-feedback.md` — scenario starting on this screen.

---

## Full MVP: workout expansion (Phase 4)

Stub.

### To define

- Exercise screen as separate entity: set log (weight × reps), history, video upload from this screen (or duplicated).
- User-created workout: pick from 20-exercise base, set order, name.
- Edit existing workout: rename, reorder, add/remove exercises.
- Start / pause / finish workout: "active workout" concept, timer, resume behavior.
- Workout history + per-set progress.
- Training program — set of workouts (with or without schedule — open).
- Workout templates (if needed).

### Strategy items already fixed (`product.md`)

- User builds workouts from the base.
- Workout = ordered exercise list.
- Exercise screen records weight + reps per set (Full MVP only fields).
- Add / remove sets, change set count.
- Multiple workouts form a training program.

### Open questions

- Training program: dateless set vs scheduled (Mon/Wed/Fri)?
- Off-plan execution allowed (skip, reorder)?
- Last working weight — auto-suggested next session?
- Rest timers between sets?
- Behavior on returning to unfinished workout?

Decisions deferred to Phase 4.

---

## Decision log

| Date | Decision | Source |
|---|---|---|
| 2026-04-19 | Single-scenario MVP — one hardcoded workout "Вайбкодинговая тренировка", hardcoded date 19.04.2026, "3 упражнения" counter. No create / edit / delete. | Chat, Phase 1 / Track A, step 4. |
| 2026-04-19 | Exercise order: 1) Romanian deadlift, 2) lat pulldown, 3) biceps curl. | Chat, Phase 1 / Track A, step 4. |
| 2026-04-19 | Exercise card anatomy: sequence number + name + info icon (technique pop-up over screen) + arrow to chat. No separate exercise screen, no "Начать тренировку" button, no set log. | Chat, Phase 1 / Track A, step 4. |
