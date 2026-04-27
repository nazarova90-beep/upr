---
status: draft
last_updated: 2026-04-27
owner: Кристина
related: index.md, ../product.md, ../SECURITY.md
---

# User flow: onboarding

First-entry scenario for a new user: install → "ready to start first workout".

## Status

Partial. Audience-interview takeaways for the first 5–10 minutes are fixed (below). Detailed screen-by-screen flow, texts, step order — next iteration. Plan: `../exec-plans/active/EP-mvp-product-spec.md`.

## First-5-minutes elements (from audience interviews)

Source: `../product.md` § "Audience interview takeaways". Only items directly shaping onboarding.

To avoid first-minutes uninstall, combine:

| Element | Purpose |
|---|---|
| AI demo on prepared video | Try analysis before going to the gym; no immediate self-recording. |
| Beginner-ready workout | Removes "what do I do today?" |
| Mini-lessons on base exercises | Technique groundwork before first own video. |
| Short UI tour | Show chat, video upload, workout structure. |
| Data transparency block | Where video goes, who sees it, retention — clear, no fine print. |
| Free-to-touch | No upfront paywall (aggressive paywall correlates with churn). |
| AI-coach persona introduction | Brief intro: who, how they help. |

Not required in first 5 minutes: long survey, "your personalized program after a quiz" — defer until after first value.

Usage context note (affects later copy too): users open the app **between sets** and **after the gym** — not as a daily feed. Onboarding must not promise daily browsing.

## To define

- Registration methods (email/password, Sign in with Apple, Sign in with Google).
- Consents (privacy policy, personal-data processing, explicit AI-video processing consent).
- Initial data collected:
  - Age (advice tuning).
  - Gender (advice tuning).
  - Gym experience.
  - Goal (mass / strength / health / weight loss).
  - Available equipment / gym type.
- Welcome screens / UI tour.
- First workout: pre-built or guided custom-build.
- Optional first video upload as "try it now".

## Open questions

- Registration mandatory immediately or guest mode allowed?
- Minimum data needed for app to function vs optional.
- Pre-built first workout: which one for absolute beginner?
- Explain free / paid difference upfront? (Interviews: do not push payment at start; reveal softly after value lands.)
- **18+ age gate:** product is 18+ only. Confirmation form required at registration (declaration + DOB) and rejection/mismatch behavior. No parental consent, no kids modes. See `../SECURITY.md` § "Age restrictions".
