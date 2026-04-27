---
status: in-progress
last_updated: 2026-04-27
owner: Кристина
related: PLANS.md, ../../AGENTS.md, tech-debt-tracker.md, active/roadmap.md, completed/EP-web-skeleton.md, completed/EP-track-b-mockups.md
---

# Exec plans — index

Catalogue of every plan in the repository. Format spec: `PLANS.md`.

Updated together with the plan it tracks. Index out of sync with disk = bug.

## Top-level artifacts (not plans)

| File | Purpose |
|---|---|
| `PLANS.md` | Format spec — what an ExecPlan / Light plan is, mandatory sections, lifecycle. |
| `active/roadmap.md` | Top-level roadmap (phases + exit triggers). One per project. |
| `tech-debt-tracker.md` | Log of shortcuts and deferred fixes. |

## Plans

| ID | Title | Tier | Status | Started | Closed | File |
|---|---|---|---|---|---|---|
| `EP-mvp-product-spec` | MVP product specification | ExecPlan | active | 2026-04-18 | — | `active/EP-mvp-product-spec.md` |
| `EP-pivot-to-web` | Frontend pivot mobile → web | ExecPlan | active | 2026-04-27 | — | `active/EP-pivot-to-web.md` |
| `EP-web-skeleton` | Phase 1 / Track D — `web/` skeleton (Vite + React + TS) | ExecPlan | completed | 2026-04-27 | 2026-04-27 | `completed/EP-web-skeleton.md` |
| `EP-track-b-mockups` | Phase 1 / Track B — UI mockups for Single-scenario MVP | ExecPlan | completed | 2026-04-27 | 2026-04-27 | `completed/EP-track-b-mockups.md` |
| `EP-phase1-track-c-skeleton` | Phase 1 / Track C — `backend/` + `mobile/` skeleton | ExecPlan | completed | 2026-04-19 | 2026-04-27 | `completed/EP-phase1-track-c-skeleton.md` |
| `EP-hello-world` | Hello-world (mobile-via-ngrok) | ExecPlan | superseded | 2026-04-21 | — | `superseded/EP-hello-world.md` |

## Decommissioned

One-line entries for plans deleted from disk on cancellation. Git history preserves the file content.

_None yet._

## Folder structure

| Path | Contents |
|---|---|
| `PLANS.md` | Format spec. |
| `index.md` | This file. |
| `active/roadmap.md` | Top-level roadmap. |
| `active/EP-*.md` | Plans currently in progress. |
| `completed/EP-*.md` | Closed plans. |
| `superseded/EP-*.md` | Plans replaced before completion by a different plan. YAML carries `superseded_by`. |
| `tech-debt-tracker.md` | Tech-debt log. |

## Update obligation

Every plan transition (create / complete / supersede / cancel) → update both the plan file and this index in the same commit. Rule lives in `PLANS.md` § 7.
