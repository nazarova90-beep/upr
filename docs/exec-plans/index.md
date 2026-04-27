---
status: in-progress
last_updated: 2026-04-27
owner: Кристина
related: ../../AGENTS.md, tech-debt-tracker.md, active/roadmap.md
---

# Exec plans

Plans as first-class documents.

## Hierarchy

1. **Top-level roadmap** — one per project, describes all phases. `active/roadmap.md`.
2. **Detailed exec-plans** — per phase or per large task, with `[ ]` / `[x]` checklist and decision log. Created at start of the phase, not earlier.

Light plans for small tasks are optional. Create an exec-plan only for non-trivial work.

## Folder structure

| Path | Contents |
|---|---|
| `active/roadmap.md` | Top-level roadmap. |
| `active/` (rest) | Detailed plans for current phases. |
| `completed/` | Closed plans and archived transcripts. |
| `tech-debt-tracker.md` | Tech-debt log. |

## Active

- `active/roadmap.md` — top-level roadmap.
- `active/mvp-product-spec.md` — MVP product-spec work (Track A of Phase 1 closed; Track B / Track C tracked here).

## Completed

- `completed/2026-04-27-phase1-track-c-skeleton.md` — `backend/` + `mobile/` skeleton (Track C of Phase 1).
- `completed/2026-04-18-mvp-product-spec-discussion.txt` — first product-discussion transcript.

## Plan template

1. **Goal** — desired outcome.
2. **Context** — why now, prior state.
3. **Steps** — numbered checklist `[ ]` / `[x]`.
4. **Open questions**.
5. **Decision log** — date + decision.
6. **Related documents** — destination for results.

## Rules

- Plan created in `active/` at task start.
- Updated as work progresses (check marks, decision log).
- On completion → moves to `completed/` with date prefix in filename.
- If cancelled → moves to `completed/` with status `cancelled`.
