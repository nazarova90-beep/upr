---
status: approved
last_updated: 2026-04-27
owner: Кристина
related: exercise-chat.md, ../product.md, ../SECURITY.md, ../exec-plans/active/roadmap.md
---

# Video handling

Spec describes the **Full MVP** form. Single-scenario MVP runs a simplified version (Phases 1–3 of `roadmap.md` § 3).

## Single-scenario MVP simplifications

| Aspect | Full MVP | Single-scenario MVP |
|---|---|---|
| Upload entry | Exercise screen (inside active workout), "Загрузить видео" button | Inside chat (attach button). No exercise screen — chat = exercise screen. |
| Video source | In-app camera + gallery picker | Gallery system picker only. No in-app camera. Removes camera integration, recording preview, camera permissions, recording-interruption handling. In-app capture returns ≥ Phase 4. |
| Exercise recognition (chat-match check) | Active — AI detects mismatch and asks "rebind / don't analyze here?" | Not in Single-scenario MVP / Phase 2. AI tries to analyze any video sent. Recognition logic returns at Phase 3. |
| Two-stage video quality check (device + AI) | Both stages active | Phase 3 (polish). Phase 2 — minimal: only server "couldn't analyze" without detailed hints. |
| Comment field + AI prioritization | Active (comment processed first) | Chat supports plain text alongside video → comment = text message in chat. Dedicated "comment-to-video" UI element optional, decided by Track B. |
| Video retention | Tier-based: 2 months free / unlimited paid | Indefinite for everyone (no tiers in Single-scenario MVP). Retention returns at Phase 7 with billing. |

Invariants kept across both modes: one analysis in queue per user; one video per message; input field locked while AI processes; analysis continues server-side if app backgrounded; no push notifications.

Single-scenario MVP replacements:
- User flow → `../user-flows/upload-video-and-get-feedback.md`.
- 3 exercises (with recommended camera angle) → `exercises-base.md`. **Lat pulldown** — front or 3⁄4. Other two — side. Reflect in UI hints and AI system prompt.

---

## Context

Video is the primary material for the AI coach. User records a set, sends to per-exercise chat, gets technique review.

Chat behavior: `exercise-chat.md`.

## Upload entry (Full MVP)

From exercise screen inside active workout. **"Загрузить видео"** button:
- record in-app, or
- pick from device gallery.

## Post-pick state

After picking / recording:

1. Video preview (playable before send).
2. Optional comment field — short text, e.g. "проверь глубину", "сегодня болит колено", "новый рабочий вес".
3. **"Отправить на разбор"** button.

Video sent to AI only on button tap, not automatically.

## Comment handling by AI

If comment is filled:
1. AI replies to that question first as a separate message.
2. Then general technique review + recommendations.

Comment > general review. Forces relevance to user's actual concern.

## Exercise recognition

AI detects which exercise is on video.

Mismatch (e.g. bench press video into "Squats" chat):

1. AI detects mismatch.
2. Replies: **"Это не похоже на приседания. Перепривязать видео к другому упражнению или не разбирать его здесь?"**
3. User chooses:
   - rebind → video moves to correct exercise chat;
   - don't analyze → video stays as message, no analysis.

Hard requirement on AI provider.

## Video upload error handling

Two-stage check.

### Stage 1: pre-upload (on device)

Catch obvious issues before "Отправить на разбор" tap:
- video too long (seconds limit);
- file too large (MB limit);
- unsupported format.

Clear message + hint: "перезапиши видео покороче / в другом формате / меньшего размера". Not sent to server.

### Stage 2: post-upload (AI side)

If technically valid but AI can't analyze:
- bad lighting / dark;
- person not visible or occluded;
- bad camera angle;
- irrelevant content;
- excessive shake.

AI replies in chat: **"Не могу разобрать твой подход, потому что [reason]. Попробуй переснять [advice: angle, lighting, etc.]"**.

## Analysis queue

One active analysis per user.

Pending analysis ⇒
- "Отправить на разбор" disabled in current chat;
- attempt to upload to another chat → "дождитесь завершения предыдущего разбора".

Simplifies MVP architecture and controls AI cost.

## Videos per message

One video per message. No multi-video comparison in MVP — potential v2 feature.

## "AI is thinking" state (MVP)

1. Tap "Отправить на разбор".
2. Placeholder AI message: "Анализирую твой подход…" with animation.
3. Input field locked until reply.
4. App can be backgrounded; analysis continues server-side. Reply waits when user returns.
5. No push in MVP.

### Deferred to v2

Floating analysis indicator across screens — separate engineering effort. Not in MVP.

## Video retention

Videos saved as part of chat message history; same retention rules:

- **Free:** 2 months, then background deletion.
- **Paid:** unlimited.

Details: `exercise-chat.md`.

## AI model requirements (for stack selection)

1. Analyze strength-exercise video and produce substantive technique review (not generic).
2. Recognize specific exercise on video.
3. Produce text in trainer-style human tone.
4. Produce annotated frame: error point circled + correction shown graphically.
5. Take entire prior chat history into account (per-exercise progress over time).
6. Prioritize user comment in reply construction.

Inputs into AI provider + architecture selection.

## Out of MVP

- Multi-video comparison in one analysis.
- Parallel analyses for one user.
- Floating analysis indicator across screens.
- Push on analysis ready.
- Slow-motion / frame-by-frame playback with annotations in chat.
- Video upload outside an active workout (e.g. from a global exercises section).
