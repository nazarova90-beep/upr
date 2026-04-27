---
status: in-progress
last_updated: 2026-04-27
owner: Кристина
related: ../product-specs/exercise-chat.md, ../product-specs/videosinstruction.md, ../product-specs/exercises-base.md, ../product-specs/workout.md, ../exec-plans/active/roadmap.md, ../exec-plans/active/EP-mvp-product-spec.md
---

# User flow: upload video and get feedback (Single-scenario MVP)

Main and only Single-scenario MVP scenario (`roadmap.md` Phases 1–3). End-to-end working state of this scenario = Single-scenario MVP delivered.

## 1. Context

- **User:** hardcoded singleton, no table. App does not distinguish users. No login, no registration, no onboarding form (`roadmap.md` § 3).
- **State:** user already recorded a set with the device's stock camera (no in-app capture in Single-scenario MVP — `videosinstruction.md`). Video is in device gallery.
- **Intent:** get AI technique review on this video and ask follow-ups.

## 2. Trigger

User opens the app. No intermediate screens (login / onboarding / workout selection). App lands on workout screen.

## 3. Steps (happy path)

| # | User action | System reaction | Reference |
|---|---|---|---|
| 1 | Open app | Workout screen: header "Вайбкодинговая тренировка" + date "19.04.2026" + counter "3 упражнения". Three exercise cards in order: Romanian deadlift → lat pulldown → biceps curl. | `workout.md` § "MVP: single hardcoded workout" |
| 2 | (Optional) Tap "info" icon on exercise card | Pop-up over screen with technique description (`technique` field). Closed via close button. User stays on workout screen. | `exercises-base.md` § "Technique text" |
| 3 | Tap exercise card (or right arrow) | Navigate to per-exercise chat. Header: "Back" + exercise name. Empty message feed. Center placeholder: **"Загрузи видео с выполнением упражнения, и я проверю технику выполнения"**. Bottom: large **"Загрузить видео"** button. **No text input field, no attach button at this stage.** | `exercise-chat.md` § "Single-scenario MVP simplifications" |
| 4 | Tap "Загрузить видео" | System gallery picker opens. User picks file. | `videosinstruction.md` |
| 5 | File picked | No preview screen. **Video sent immediately.** Chat feed shows user message with embedded video; below — AI placeholder "Анализирую твой подход…" with animation. "Загрузить видео" disabled (one analysis per user). | `exercise-chat.md` § "AI is thinking" |
| 6 | (Optional) Background app or tap "Back" | Analysis continues server-side. Returning to chat shows current state ("Анализирую…" or finished reply). | `videosinstruction.md` § "AI is thinking" |
| 7 | Stay in chat / return; AI finished | Placeholder replaced by real AI message: text review in human tone + (optional) annotated frame. "Загрузить видео" re-enabled. **Text input + attach button appear** — chat upgrades from "first video" mode to full conversation mode. | `exercise-chat.md` § "AI reply format" |
| 8 | (Optional) Type follow-up question | User message in feed. AI replies in same chat. | `exercise-chat.md` |
| 9 | (Optional) Send another video for the same exercise | Same behavior: instant send, "Анализирую…" placeholder, AI reply takes prior chat history into account. | `exercise-chat.md` § "Core concept" |

## 4. Branches

### 4.1. AI cannot analyze video

Full two-stage video quality check is Phase 3, not Single-scenario MVP / Phase 2. Minimal Phase 2 behavior:

- AI returns error or clearly didn't understand → AI message: **"Не смог разобрать твой подход. Попробуй переснять видео и загрузить ещё раз"**. Specific reasons (dark / no person / bad angle) come unstructured.
- "Загрузить видео" stays enabled — user can retry.
- Text input + attach button open (same as on success) — user already interacted with AI.

### 4.2. User leaves chat before reply arrives

User taps "Back" → workout screen. **No visual change** on workout screen in Single-scenario MVP — exercise card looks identical (no status / indicator). Re-tap → back into same chat with current state ("Анализирую…" or finished reply).

Floating cross-screen indicator deferred to v2 (`exercise-chat.md`).

### 4.3. User opens another exercise chat while first is processing

Rule **"one analysis per user"** (`videosinstruction.md` § "Analysis queue") preserved. Single-scenario MVP behavior:

- Switching to another chat — allowed; chat opens.
- "Загрузить видео" in that other chat — disabled (or short hint "дождись завершения предыдущего разбора"). Exact wording / visual — Track B.

## 5. Edge cases

| Situation | Single-scenario MVP behavior |
|---|---|
| No internet at upload | Phase 2: simple error message in chat "не получилось загрузить, проверь интернет". Detailed offline handling — Phase 3. |
| File too long / large / unsupported format | Full client-side check (stage 1) — Phase 3. Phase 2: server "не смог принять видео" or AI "не смог разобрать" (see 4.1). |
| User closes and reopens app | Lands on workout screen (always entry point). Chat + video history preserved in DB (no 2-month policy — kept indefinitely). Returning to chat shows history. |
| Video doesn't match exercise (e.g. lat pulldown video into Romanian-deadlift chat) | Exercise recognition + chat-match check not in Single-scenario MVP / Phase 2 — Phase 3. AI tries to analyze any video sent. |

## 6. Success state

- Chat contains user message with video.
- Same chat contains AI reply with technique review (text and/or annotated frame).
- User reads reply.
- (Optional) Chat contains follow-up question + AI reply.

## 7. Related screens

Two screens + one pop-up in this scenario:

1. **Workout screen** — entry point, always. Spec: `workout.md` § "MVP: single hardcoded workout". Mockup: Track B.
2. **Per-exercise chat** — opened from card tap. Spec: `exercise-chat.md` (Full MVP) + "Single-scenario MVP simplifications". Mockup: Track B. Two visual states:
   - **Empty (before first AI reply):** only "Загрузить видео" button + placeholder text. No text input, no attach button.
   - **Active (after first AI reply):** standard messenger: feed + text input + attach button + "Загрузить видео" (or same behavior via attach — Track B).
3. **Technique pop-up** — over workout screen, opened from info icon. Spec: `workout.md` § "Exercise card anatomy". Mockup: Track B.

## 8. Open questions (for Track B + Phase 2)

Non-blocking for Track A; resolve at Track B (mockups) or Phase 2 (implementation).

- Exact transition from "empty chat" to "active chat" — how does the input field appear?
- Where does the camera-angle hint live (side for deadlift + biceps; front or 3⁄4 for lat pulldown)? Options: (a) inside empty-chat placeholder, (b) AI system message in chat, (c) hint on "Загрузить видео" tap, (d) inside technique pop-up.
- Exact "не смог разобрать" wording — list of mockup variants.
- "One analysis in queue" behavior in another chat — disabled button + tooltip vs system message?

## 9. Decision log

| Date | Decision | Source |
|---|---|---|
| 2026-04-19 | Chat has two states: empty (placeholder + "Загрузить видео" only) and active (text input + attach appear after first AI reply). Header: "Back" + exercise name. | Chat, Phase 1 / Track A, step 6. |
| 2026-04-19 | Video upload — instant send: no preview screen after gallery picker; video appears in chat as user message immediately + AI placeholder "Анализирую…" below. | Chat, Phase 1 / Track A, step 6. |
| 2026-04-19 | Single-scenario MVP / Phase 2 excludes: exercise recognition + chat-match check, full two-stage video quality check, floating cross-screen indicator. All move to Phase 3. | Chat, Phase 1 / Track A, step 6; `exercise-chat.md`, `videosinstruction.md`. |
