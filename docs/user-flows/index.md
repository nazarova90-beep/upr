---
status: in-progress
last_updated: 2026-04-27
owner: Кристина
related: ../product-specs/index.md, ../ui/index.md, ../exec-plans/active/roadmap.md
---

# User flows

Step-by-step user scenarios: what user does in what order, which screens they see, which decisions they make. Not feature specs — those live in `product-specs/`.

## Documents

| File | Scenario | Status |
|---|---|---|
| `upload-video-and-get-feedback.md` | **Main Single-scenario MVP scenario**: open app → workout screen → tap exercise → chat → upload video from gallery → AI reply → follow-up. | in-progress (MVP version closed) |
| `onboarding.md` | First app entry, registration, initial data collection. Not in Single-scenario MVP — Phase 5 (closed testing). | TBD |

## Planned

**Phase 5 (closed testing, registration):**

- `login.md` — existing-user login.
- `registration.md` — sign-up (if separated from onboarding).
- `delete-account.md` — account deletion.
- `password-reset.md` — password reset.

**Phase 4 (extend to Full MVP):**

- `start-workout.md` — workout start through completion (with set log, 20 exercises).

**Phase 7 (monetization):**

- `manage-subscription.md` — subscribe / cancel.

## Flow document template

1. **Context** — user, state, intent.
2. **Trigger** — what starts the scenario.
3. **Steps** — numbered list of user actions + system reactions.
4. **Branches** — alternative user choices.
5. **Edge cases** — non-standard situations (no internet, server error, etc.).
6. **Success state** — final user state.
7. **Related screens** — links to UI docs.
