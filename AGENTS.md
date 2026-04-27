# UPR — agent map

Entry point for AI agents. Table of contents, not a manual. Facts live in `docs/`.

## Project

UPR — web AI coach (browser app, PWA-capable) reviewing strength-exercise technique from user-uploaded video. Per-exercise long-lived chat is the core feature. UI/AI replies in MVP — Russian (i18n-ready). Native iOS/Android shell deferred to ≥ Phase 9 (optional).

## Read this first

| Task type | Start at |
|---|---|
| Product / feature | `docs/product.md`; per-feature: `docs/product-specs/<feature>.md` |
| Code / architecture | `docs/stack.md`, `ARCHITECTURE.md` |
| Current phase / next step | `docs/exec-plans/active/roadmap.md` |
| Plan format / when to plan | `docs/exec-plans/PLANS.md` |
| Library before use | `docs/references/<lib>.md` (fetch via MCP `user-context7` first) |

## Hard rules (invariants)

1. **Repository is the system of record.** Decision not in `docs/` ⇒ does not exist. Reflect chat decisions into the right `docs/` file before closing the task.
2. **No feature without explicit approval.** Do not add product behavior absent from `docs/product.md` or `docs/product-specs/`. Surface, get approval, write it down, then implement.
3. **Library research before use.** Before introducing any third-party library: fetch current docs via MCP `user-context7`, write `docs/references/<library>.md` (purpose, version, key API, gotchas, source link), then write code.
4. **Boring tech first.** Stable, well-represented in training data, predictable APIs.
5. **Layered architecture.** Respect domains and dependency directions in `ARCHITECTURE.md`. Each external dependency (AI provider, video storage, DB) lives behind an abstraction (`ai_provider/`, `storage/`, ORM).
6. **AGENTS.md is a map, not an encyclopedia.** Same for all top-level docs: short entry points, push details into deeper files.
7. **Update docs on significant changes.** Bump `last_updated` and update the file map below when structure changes.
8. **Ask before large structural changes** (rename/move folders, rewrite a top-level doc).
9. **Documentation files are agent-optimized.** No analogies, no beginner explanations, no narrative for non-programmers — only facts, constraints, schemas, decisions. Analogies live in chat output, not in files.
10. **Ask before AGENTS.md edits.** Any change to this file (new rule, new section, reword of an existing rule) — surface in chat, get explicit owner approval, then commit.
11. **Plan before non-trivial work.** Classify every task per `docs/exec-plans/PLANS.md` § 1. ExecPlan is approved by the owner before execution starts.

## Planning workflow

Before any non-trivial task, classify by complexity per `docs/exec-plans/PLANS.md` § 1:

| Task signal | Mode | Action |
|---|---|---|
| Trivial: text change, color tweak, typo, single-file rename, doc bump | **No plan** | Execute directly. |
| Multi-file change, new library, architectural decision, work spans more than one chat session, or owner says «сделай план» / «запланируй» / «разбей на фазы» | **ExecPlan** | Author `docs/exec-plans/active/EP-<slug>.md` per `PLANS.md` § 3. **Get owner approval on the plan before executing.** |
| Small task with several discrete steps, no design decisions, fits in one chat session | **Light plan** | Author `docs/exec-plans/active/EP-<slug>.md` per `PLANS.md` § 4. |

ExecPlans are split into **phases** (`PLANS.md` § 5). A phase is one fresh-chat agent run, sized so its required context fits in ≤ 70 % of the agent's context window (rule of thumb: 4–8 substantial steps per phase, never 30 micro-steps). Owner workflow: open new chat → «выполни Phase N из EP-<slug>» → agent loads only that phase's context, executes, updates checkboxes.

When in doubt → ExecPlan.

## File map

### Top-level

| File | Content |
|---|---|
| `README.md` | Human-facing intro. |
| `ARCHITECTURE.md` | Domains, layers, dependency directions. |
| `docs/product.md` | Product strategy, MVP scope, principles, decisions. |
| `docs/stack.md` | Stack (MVP) + scaling triggers + decision log. |
| `docs/BACKEND.md` | Backend (Python + FastAPI) — domains, rules. |
| `docs/FRONTEND.md` | Web client (React + Vite + TypeScript) — stack, libraries, i18n. Pivot plan: `docs/exec-plans/active/EP-pivot-to-web.md`. |
| `docs/DATABASE.md` | Data model (SQLite MVP → PostgreSQL Phase 6). |
| `docs/SECURITY.md` | Active security rules. Future checklist: `docs/design-docs/security-future-reference.md`. |

### Folders

| Folder | Contents | Start at |
|---|---|---|
| `docs/product-specs/` | Per-feature specs (chat, video, exercises, workout). | `index.md` |
| `docs/user-flows/` | User scenarios. | `index.md` |
| `docs/ui/` | Design tokens, mockups, components. Design system: `ui/design-system/`. | `index.md` |
| `docs/design-docs/` | Working principles (`core-beliefs.md`) + decision rationale. | `index.md` |
| `docs/exec-plans/` | Plans as first-class artifacts. Format spec: `PLANS.md`. Roadmap: `active/roadmap.md`. Tech debt: `tech-debt-tracker.md`. | `PLANS.md` |
| `docs/references/` | Library research dumps (via `user-context7`). | `index.md` |
| `docs/generated/` | Auto-generated docs (DB schema etc.). Populated when code exists. | — |

## Where to write new information

| Decision | Target |
|---|---|
| Product decision | `docs/product.md` or `docs/product-specs/<feature>.md` |
| User scenario | `docs/user-flows/<flow>.md` |
| "Why this way" decision | `docs/design-docs/<decision>.md` |
| Plan / phase progress | `docs/exec-plans/active/EP-<slug>.md` (move to `completed/` when closed; `superseded/` when replaced; delete + 1-line note in `index.md` § Decommissioned when cancelled) |
| Tech debt / shortcut | line in `docs/exec-plans/tech-debt-tracker.md` |
| New library | `docs/references/<lib>.md` (after Context7 fetch) |

## Document headers

Top-level strategic files (`AGENTS.md`, `README.md`, `ARCHITECTURE.md`, `docs/product.md`, `docs/stack.md`, `docs/design-docs/core-beliefs.md`) — full YAML header:

```
---
status: draft | in-progress | approved | deprecated
last_updated: YYYY-MM-DD
owner: Кристина
related: ../path/to/related.md
---
```

Other files — single line `_Updated: YYYY-MM-DD_` under the title is enough.

## Owner communication

Product owner is a non-programmer. Chat answers must be simple and analogy-friendly. **Documentation files are agent-optimized — no analogies, no beginner explanations.**
