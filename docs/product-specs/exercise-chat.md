---
status: approved
last_updated: 2026-04-27
owner: Кристина
related: ../product.md, videosinstruction.md, exercises-base.md, workout.md, ../exec-plans/active/roadmap.md
---

# Per-exercise chat

Spec describes the **Full MVP** form. Single-scenario MVP runs a simplified version (Phases 1–3 of `roadmap.md` § 3).

## Single-scenario MVP simplifications

| Aspect | Full MVP | Single-scenario MVP |
|---|---|---|
| Chat entry | Workout list → tap exercise → exercise screen (set log, technique, "Загрузить видео") → chat | Tap exercise card on workout screen = open chat. No exercise screen. |
| Video source | In-app camera + gallery picker | Gallery system picker only. No in-app camera. |
| Set log (weight × reps) | Present on exercise screen | Absent (no exercise screen, no log). |
| Registration / login | User registered | Hardcoded singleton; no login / onboarding form. |
| Message retention | Free 2 months / paid unlimited | Everything kept indefinitely (no tiers, no billing). Retention policy returns at Phase 7 with billing (`roadmap.md`). |
| Exercise recognition + chat-match check | Active (see "Exercise recognition" below) | Phase 3 (polish); not in Phase 2 (thin slice). |
| Two-stage video quality check (device + AI) | Active (see "Error handling" below) | Phase 3. Phase 2 handles errors minimally. |

Invariants kept across both modes: one chat per exercise forever; chat is a bottom-up message feed with input field; video and text share one stream; AI replies into same chat; one analysis in queue per user.

**DB modeling note (for Track C):** Single-scenario MVP chat has two visual states (empty / active — `../user-flows/upload-video-and-get-feedback.md` steps 3 and 7). No status field needed in chat table — "active" derived from existence of any AI message. No enum status to store.

Single-scenario MVP replacements:
- 3 exercises and per-exercise data → `exercises-base.md` § "MVP: 3 starting exercises".
- Hardcoded workout + workout-screen anatomy → `workout.md` § "MVP: single hardcoded workout".
- User flow → `../user-flows/upload-video-and-get-feedback.md`.

---

## Core concept

**One chat = one exercise, forever.**

Chat is bound to an exercise from the catalog, not a workout, not a set. All "Squats" videos from any workout fall into one shared "Squats" chat. AI sees the user's progress on that exercise across time.

Differentiator vs competitors: most do one-shot video analysis; UPR keeps a per-exercise technique history.

## User flow (Full MVP)

User registered, onboarded, has built a workout.

1. App → pick workout → tap **"Начать тренировку"**.
2. See exercise list of the workout.
3. Tap exercise → exercise screen:
   - Name + short technique description.
   - Set log: weight + reps (MVP-only fields).
   - Add / remove / change set count.
   - **"Загрузить видео"** button.
4. Capture or pick from gallery → upload.
5. Next to video preview:
   - Optional comment field (e.g. "проверь глубину").
   - **"Отправить на разбор"** button.
6. Tap → video processed. Chat opens (or expands over exercise screen).
7. AI replies in chat.
8. User asks follow-ups in same chat.
9. Another video any time → same chat, AI takes prior history into account.

## AI reply format

Trainer-style human tone, plain language, no rigid structure.

Attached: annotated frame from video — error point circled, correction shown graphically.

If user comment was attached:
1. AI replies to that question first as a separate message.
2. Then general technique review + recommendations.

User comment is priority — addressed first.

## Exercise recognition

AI must determine which exercise is on video. Mismatch handling:

1. AI detects mismatch.
2. Replies in chat: **"Это не похоже на приседания. Перепривязать видео к другому упражнению или не разбирать его здесь?"**
3. User chooses one of two options.

Hard requirement on the AI model — factor into provider selection.

## Video upload error handling

Two-stage check.

**On device (pre-upload):** length, file size, format. Clear "перезаписать видео" message before "Отправить на разбор" tap.

**On AI side (post-upload):** if technically valid but AI cannot analyze (poor quality, dark, no person, irrelevant content) — separate chat message: **"Не могу разобрать, потому что… Попробуй переснять с такого ракурса"**.

## Analysis queue

One analysis per user at a time. Pending analysis ⇒ "Отправить на разбор" disabled or "дождитесь завершения предыдущего разбора" message.

## Videos per message

One video per message. No multi-video comparison in MVP.

## "AI is thinking" state (MVP)

- "Отправить на разбор" → placeholder AI message: "Анализирую твой подход…" with animation.
- Input field locked until reply arrives.
- App can be backgrounded; analysis continues on server. Reply waits when user returns.
- No push notifications in MVP.

Floating indicator across screens — deferred to v2.

## Message retention

**Free tier:**
- Each message: 2-month TTL (sliding window).
- Daily background job deletes messages older than 2 months.
- No deletion notifications.
- User sees only live messages; history ends at oldest live message.

**Paid:**
- No deletion, indefinite history.

## Chat UI

Standard messenger pattern: bottom-up feed, input at bottom, scroll up for history. Exact visual treatment (separate screen vs sheet over exercise screen) — design phase.

## Connections

- Exercise screen — entry point for chat + video upload.
- Exercise base — defines which chats exist (`exercises-base.md`).
- Workout — exercise list to enter each exercise (`workout.md`).

## Out of MVP

- Metrics beyond weight + reps.
- Multi-video comparison in one analysis.
- Floating analysis indicator across screens.
- Push on analysis ready.
- Live trainer in chat (paid v2 feature).
- Indefinite retention on free tier.
