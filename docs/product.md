---
status: approved
last_updated: 2026-04-27
owner: Кристина
related: ../README.md, stack.md, exec-plans/active/roadmap.md, product-specs/index.md, user-flows/index.md, ui/index.md
---

# UPR — product

Single top-level product document: concept, audience, market position, MVP scope, monetization, risks, decision principles.

Out of scope here: step-by-step scenarios (`user-flows/`), screen mockups (`ui/`), per-feature specs (`product-specs/exercise-chat.md`, `videosinstruction.md`, `exercises-base.md`, `workout.md`), stack (`stack.md`), architecture (`../ARCHITECTURE.md`).

## 1. One-liner

Mobile AI coach for strength-exercise technique. User submits a set video → AI returns review and continues per-exercise dialogue. Per-exercise chat persists technique history over time.

## 2. Problem and JTBD

**Problem:** gym beginner can't see themselves, uncertain about technique, fears injury and wasted effort. Live trainer is inaccessible / undesirable / distrusted for part of the audience.

**Job-to-be-done:** deliver accessible, in-the-moment, personally accumulating technique feedback close in spirit to a trainer conversation, with continuity per exercise.

## 3. Target audience

- **Age:** 18+ only. Upper reference ~49; no hard upper bound. Under-18 not in audience and cannot register. Deliberate strategic decision excluding minor data / media legal risk.
- **Gender:** men and women, no narrow gender niche.
- **Experience:** primarily beginners with technique-confidence deficit.
- **Context:** strength exercises in a gym; MVP focuses on a limited exercise set.
- **Behavioral cut:** part of audience avoids in-person trainer help due to embarrassment, cost, schedule, or competence doubts. Product positioned as safe alternative to in-person contact, not as replacement for all trainers.

## 4. Market and niche

Market contains apps with **video-based technique scoring** (narrow-specialized and broad-coverage) and **strong workout journals** without deep video analysis.

**Observation:** competitors typically offer a one-shot transaction (upload → score → forget). No accumulated context per movement.

**Niche:** chat-first experience with **per-exercise long-term memory**; Russian-speaking beginners; honesty about AI limits; ladder to live trainer for trust and monetization.

### Competitors and positioning

**Direct (AI video analysis):**
- Gymscore — market leader, 2500+ exercises, 0–100 score.
- Formax — iPhone-only, 4-parameter analysis.
- IronCoach — narrow niche (3 exercises).
- Perfect Form — 3D pose analysis.
- Bench Only — web app on GPT-4o vision.

**Indirect (workout journals without AI):** Hevy, Strong, Fitbod, JEFIT.

**UPR position:** chat-first AI coach for Russian-speaking beginners with persistent per-exercise memory; live human trainer hookup option in v2+.

## 5. Central product thesis

1. **Technique > workout-completion check.** Core value is movement confidence, not weight/rep tracking.
2. **Per-exercise memory is a strategic asset.** One persistent channel per exercise improves both advice quality and return habit.
3. **Trust is layered:** AI quality + emotional safety + data transparency + (optional) human verification.
4. **In-gym speed and relevance** > daily content feed. Used between sets and after training, not as a daily app.

## 6. Strategic pillars

| Pillar | Meaning |
|---|---|
| Technique analysis | Substantive answer to a recorded set, with visual error markup where possible. |
| Dialogue and accumulated context | Not a one-shot report — ongoing exercise-specific conversation with history. |
| Set log | Basic workout tracking creates the moment "check this movement now". |
| Trust and safety | Both perception ("won't be judged") and reality (data, consent, deletion, minimization). |
| AI honesty | Don't fake confidence; handle exercise/recording mismatch. |
| Path to human | Ladder from AI-only to human-led with AI assist. |

## 7. Core entities

- **Exercise** — catalog item (e.g. "Romanian deadlift"). Each has technique description and dedicated AI chat.
- **Exercise catalog** — set of movements. MVP: 20 most-popular strength exercises (`product-specs/exercises-base.md`).
- **Workout** — list of exercises for one gym session. User-built (`product-specs/workout.md`).
- **Set** — weight × reps within an exercise.
- **Per-exercise chat** — persistent AI conversation per movement (`product-specs/exercise-chat.md`).
- **Set video** — submitted recording (`product-specs/videosinstruction.md`).
- **Tier and chat retention** — free tier with limited message horizon vs paid with extended.

## 8. Main user scenario (Full MVP)

> Single-scenario MVP narrows this — see `exec-plans/active/roadmap.md` → section 3.

1. Open app → select workout → tap **"Начать тренировку"**.
2. See exercise list.
3. Tap exercise → exercise screen with technique, set log (weight × reps), **"Загрузить видео"** button.
4. Capture or select video → optional comment ("проверь глубину") → **"Отправить на разбор"**.
5. Chat opens; AI replies: trainer-style text + annotated video frame.
6. User asks follow-up questions, may submit next video to same chat.
7. Return to workout, next exercise.

## 9. Full MVP scope

### Functions
- Catalog of **20 strength exercises** with technique descriptions.
- User-built workouts from catalog.
- Workout flow: set log (weight × reps).
- Per-exercise AI chat (one chat = one exercise, persistent).
- One set-video upload.
- AI analysis: text + annotated frame.
- Exercise recognition + chat-match check.
- Two-stage video quality check (device + AI).
- Free-text follow-ups.
- Message retention: **2 months free**, **unlimited paid**.

### Platforms
- iOS and Android (React Native + Expo — `stack.md`).

### UI language
- MVP: UI and AI replies in Russian.
- i18n wired from day one (`i18next`); second language not in MVP release.

### MVP limits
- Set log: weight + reps only (no RPE, tempo, rest time).
- One video at a time.
- One analysis per user in queue.
- User waits for reply (input field locked). No floating indicators.
- No push notifications.

## 10. Deferred to v2+

| Item | When |
|---|---|
| Live human trainer in chat (invite / subscription quota / trainer pool / super-premium) | v2+, phased |
| Floating analysis indicator over screens | v2 |
| Push on analysis ready | v2 |
| Multi-video comparison in one analysis | v2 |
| Extra metrics (RPE, tempo, rest time) | v2+ |
| Catalog expansion | gradual |
| Social features, progress feed | TBD |
| Pre-built workout programs | TBD |

## 11. AI: role and quality

AI is interactive assistant, not oracle:
- Specific where visible information exists; no internet boilerplate.
- Honors user's analysis prompt when present.
- On exercise/recording mismatch — don't go silent; branch correctly (rebind / refuse-here).
- MVP communication language: Russian.

**Existential risk:** low review quality → product fails to retain. Investments: answer quality, validation, real-recording testing, ladder to human.

**Tone:** support and encouragement matter for audience; configurable persona is a long-term requirement under non-negotiable rules (no humiliation, no toxicity — see section 13).

## 12. Video, data, privacy (strategy)

Video is sensitive:

- **Minimization:** store and transmit only what analysis and lawful tracking require.
- **Transparency:** where the video lands, who has access, retention period, account-deletion behavior.
- **Filming-in-gym** is also a social barrier (judgment, bystanders, gym rules, awkward angles). Lower it with educational and practical aids — placement hints.
- **Transfer to AI provider** — informed compromise; user must understand it before consent.

Active rules: `SECURITY.md`. Future checklist: `design-docs/security-future-reference.md`.

## 13. Decision principles

These are the test for any product dispute.

### Beginner-value test
Winner: option simpler and clearer for the core audience — adult beginner who entered the gym alone. "Will a first-time gym-goer understand this?" If no — simplify.

### Focus over features
MVP: only what directly closes the main pain — "I'm not sure I'm doing the exercise correctly." For new ideas: "closes the main pain or just neat?"

### One path, one way
Each scenario: one main path, no "do it this way or that." Example: video upload only from exercise screen inside workout — not from a global section.

### Emotional safety
User shares video of themselves in gym — vulnerable situation. AI:
- Never humiliates.
- Starts with what user does well.
- Default tone: supportive trainer.

Tone configurable later (softer / stricter / other) — never overrides base prohibition.

### Quality as survival
Top churn causes (interviews): AI errors, generic replies, aggressive monetization, no habit. Priority: specificity and accuracy over feature count.

### Honesty
- Don't promise "AI replaces trainer" — promise "AI helps when no trainer is around."
- Uncertain → say so, don't fabricate.
- Health disclaimers: clear, not buried.

### Soft monetization onboarding
Aggressive paywalls correlate with churn. Lead with value and transparency; payment offered after value understood.

### Time respect
User is in gym → every tap counts. Minimum taps to upload. No promotional modals or "rate us" prompts in productive moments.

## 14. Monetization (draft)

Freemium subscription:

- **Free:** core features, video reviews with limit, message history 2 months.
- **Paid:** unlimited history, raised/unlimited review quota, extended features.
- **Live trainer (ladder, not single option):**
  - One-time / quota-limited trainer-in-chat invite within a subscription;
  - Separate subscription or per-piece payment for live-trainer work;
  - Trainer pick from a **pool** for ongoing engagement;
  - **Super-premium:** human-led with AI assist.

Concrete prices, free-tier limits, paid-tier composition: defined later (`exec-plans/active/roadmap.md`, Phase 7).

## 15. Key risks

1. AI quality and specificity — existential.
2. Inference + video storage cost — margin pressure on free-tier.
3. Filming-in-gym psychology and ethics — onboarding barrier, reputation risk.
4. Legal and medical advice boundaries — regulation and store trust.
5. Mature competitors — need clear differentiation (per-exercise memory, Russian audience, human-centric ladder).
6. Monetization aggression — churn risk amplified by emotional vulnerability.

## 16. Audience interview takeaways

### Filming-in-gym barriers
Concerns: judgment, bystanders in frame, unknown destination of video, no tripod / awkward angle, gym rules.
Real reducer: clear placement hints for typical setups.

### Return motivation
AI praise and support important. App perceived as safe alternative to in-person trainer (embarrassment, cost, competence doubts).

### Trust in analysis
Demand for trust **anchor**: periodic or selective live-trainer confirmation (human-in-the-loop) — not pure AI.

### Usage context
Not daily feed — between sets (quick advice, re-read review) and post-training (deeper review, plan for next time).

### AI tone
Demand for configurable persona (stricter / softer), not one tone for all.

### First 5–10 minutes after install
Combination: AI demo on prepared video + beginner program + exercise mini-lessons + UI tour + data transparency + paywall-free trial + AI persona introduction. Long onboarding survey **not** mandatory.

### Churn risks
AI mistakes / generic replies / aggressive paywall / no habit formed.

## 17. Open strategic questions

- Free-tier exact limits and paid-tier composition in numbers.
- Speed and order of live-trainer ladder.
- Geography beyond Russian-speaking after MVP.
- Trainer-pool selection criteria and accountability model.
- Name and brand tone — affect positioning.
