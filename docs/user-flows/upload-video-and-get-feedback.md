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

1. **Workout screen** — entry point, always. Spec: `../product-specs/workout.md` § "MVP: single hardcoded workout". Mockup: [`../ui/mockups/workout.html`](../ui/mockups/workout.html).
2. **Per-exercise chat** — opened from card tap. Spec: `../product-specs/exercise-chat.md` (Full MVP) + "Single-scenario MVP simplifications". Two visual states:
   - **Empty (before first AI reply):** only "Загрузить видео" button + placeholder text. No text input, no attach button. Mockup: [`../ui/mockups/chat-empty.html`](../ui/mockups/chat-empty.html).
   - **Active (after first AI reply):** standard messenger: feed + text input + attach (paperclip) + send. The "Загрузить видео" button is replaced by the attach icon — single upload affordance. Mockup: [`../ui/mockups/chat-active.html`](../ui/mockups/chat-active.html).
3. **Technique pop-up** — over workout screen, opened from info icon. Spec: `../product-specs/workout.md` § "Exercise card anatomy". Mockup: [`../ui/mockups/technique-popup.html`](../ui/mockups/technique-popup.html).

## 8. Open questions (for Track B + Phase 2)

All four resolved in Phase 3 of `../exec-plans/active/EP-track-b-mockups.md` (2026-04-27); rows appended to § 9 below.

- ~~Exact transition from "empty chat" to "active chat" — how does the input field appear?~~ **Resolved Q1.**
- ~~Where does the camera-angle hint live (side for deadlift + biceps; front or 3⁄4 for lat pulldown)? Options: (a) inside empty-chat placeholder, (b) AI system message in chat, (c) hint on "Загрузить видео" tap, (d) inside technique pop-up.~~ **Resolved Q2.**
- ~~Exact "не смог разобрать" wording — list of mockup variants.~~ **Resolved Q3.**
- ~~"One analysis in queue" behavior in another chat — disabled button + tooltip vs system message?~~ **Resolved Q4.**

## 9. Decision log

| Date | Decision | Source |
|---|---|---|
| 2026-04-19 | Chat has two states: empty (placeholder + "Загрузить видео" only) and active (text input + attach appear after first AI reply). Header: "Back" + exercise name. | Chat, Phase 1 / Track A, step 6. |
| 2026-04-19 | Video upload — instant send: no preview screen after gallery picker; video appears in chat as user message immediately + AI placeholder "Анализирую…" below. | Chat, Phase 1 / Track A, step 6. |
| 2026-04-19 | Single-scenario MVP / Phase 2 excludes: exercise recognition + chat-match check, full two-stage video quality check, floating cross-screen indicator. All move to Phase 3. | Chat, Phase 1 / Track A, step 6; `exercise-chat.md`, `videosinstruction.md`. |
| 2026-04-27 | **Q1** — Empty→active chat transition: cross-fade. After the first AI reply, the full-width «Загрузить видео» button cross-fades into a chat input bar (text field + attach paperclip + send arrow). The attach icon becomes the new upload affordance — one bottom affordance instead of two. Pure CSS `opacity` transition; no animation library. | Track B (Phase 3 of `../exec-plans/active/EP-track-b-mockups.md`); rendered in `../ui/mockups/chat-active.html`. |
| 2026-04-27 | **Q2** — Camera-angle hint location: option (a) — inside the empty-chat placeholder, as a second line under the main «Загрузи видео…» string, in `--color-text-secondary`. Per-exercise canonical strings: `romanian_deadlift` / `dumbbell_biceps_curl` → «Снимай сбоку»; `lat_pulldown_to_chest` → «Снимай спереди или в три четверти». Source: `../product-specs/exercises-base.md` § "Camera angle". | Track B (Phase 3 of `EP-track-b-mockups.md`); strings recorded in `../ui/voice-and-tone.md` § 4 + § 4.1; rendered in `../ui/mockups/chat-empty.html`. |
| 2026-04-27 | **Q3** — Canonical "не смог разобрать" wording: «Не смог разобрать твой подход. Попробуй переснять видео и загрузить ещё раз». Verbatim string from § 4.1 above; no variants. | Track B (Phase 3 of `EP-track-b-mockups.md`); confirmed canonical in `../ui/voice-and-tone.md` § 4. |
| 2026-04-27 | **Q4** — "One analysis in queue" UI in another chat: «Загрузить видео» button rendered disabled (greyed) + a system message below the feed — «Дождись разбора предыдущего видео, иначе я запутаюсь». No tooltip (poor mobile pattern). | Track B (Phase 3 of `EP-track-b-mockups.md`); string recorded in `../ui/voice-and-tone.md` § 4. |
