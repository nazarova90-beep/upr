<!--
status: approved
last_updated: 2026-04-27
owner: Кристина
related: AGENTS.md, ARCHITECTURE.md, docs/stack.md, docs/product.md
-->

# UPR

Mobile (iOS/Android) AI coach for strength training. The user uploads a video of their set; AI returns a technique review in a per-exercise long-lived chat with text and an annotated frame.

## Audience

Adults 18+, primarily gym beginners, Russian-speaking. UI and AI replies in MVP — Russian (i18n-ready).

## MVP

Two stages:

- **Single-scenario MVP** (built first): no auth, hardcoded user, one hardcoded workout with three exercises, video upload from gallery → AI review → chat continuation.
- **Full MVP**: catalog of 20 exercises, user-built workouts, set log (weight × reps), message-history retention policy (2 months free / unlimited paid).

Full picture: `docs/product.md`. Roadmap: `docs/exec-plans/active/roadmap.md`.

## Documentation entry points

- `AGENTS.md` — agent map (start here for any task).
- `ARCHITECTURE.md` — domains and layers.
- `docs/product.md` — product strategy + MVP scope + decisions.
- `docs/stack.md` — stack + scaling triggers.
- `docs/BACKEND.md`, `docs/FRONTEND.md`, `docs/DATABASE.md`, `docs/SECURITY.md` — domain overviews.
- `docs/exec-plans/active/roadmap.md` — phases and triggers.

## Status

Product design for MVP largely complete. Stack chosen (`docs/stack.md`). Skeleton of `mobile/` and `backend/` committed (`docs/exec-plans/completed/EP-phase1-track-c-skeleton.md`). Next: Phase 2 (thin slice).
