---
status: approved
last_updated: 2026-04-27
owner: Кристина
related: ../../AGENTS.md, index.md, ../design-docs/core-beliefs.md
---

# Plans format spec

Defines what a plan is, how it is structured, named, and closed. Adapted from OpenAI ["Harness engineering"](https://openai.com/index/harness-engineering/) and the OpenAI Cookbook ["Using PLANS.md for multi-hour problem solving"](https://cookbook.openai.com/articles/codex_exec_plans), trimmed to single-owner scale.

Index of all current plans: `index.md`.

## 1. Mode selection

Before any task, the agent classifies it into one of three modes:

| Signal | Mode | Action |
|---|---|---|
| Trivial: text change, color tweak, typo, single-file rename, doc bump | **No plan** | Execute directly. |
| Multi-file change, new library, architectural decision, work spans more than one chat session, or owner says «сделай план» / «запланируй» / «разбей на фазы» | **ExecPlan** | Author a plan in `active/EP-<slug>.md` per § 3 below. Get owner approval on the plan before executing. |
| Small task with several discrete steps, no design decisions, fits in one chat session | **Light plan** | Author a plan in `active/EP-<slug>.md` per § 4 below. |

When in doubt → ExecPlan. The cost of a plan that turned out unnecessary is far lower than the cost of a missing plan on a multi-session task.

## 2. ID and filename

- Filename: `EP-<slug>.md`. Slug is kebab-case, descriptive, ≤ 5 words.
- ID = filename stem (`EP-pivot-to-web`). Cite plans by ID in chat and in cross-references.
- Slug uniqueness is owner-curated. If two branches accidentally produce the same slug, rename one with a more specific slug at merge time.
- `roadmap.md` and `tech-debt-tracker.md` are top-level artifacts of `docs/exec-plans/`, not plans. They keep their special names.

## 3. ExecPlan — required structure

Mandatory YAML header:

```yaml
---
id: EP-<slug>
tier: ExecPlan
status: active | completed | superseded | cancelled
last_updated: YYYY-MM-DD
owner: Кристина
related: <path>, <path>, ...
---
```

Mandatory body sections (in this order):

1. **`# <Title>`** — short, action-oriented.
2. **`## Goal & Context`** — 1–2 paragraphs of prose. What user-visible behavior exists after the plan completes; why now; what the prior state is. Self-contained: a fresh-chat agent must understand the plan without reading other docs.
3. **`## Phases`** — see § 5.
4. **`## Decision Log`** — table `| Date | Decision | Rationale |`. One row per decision. Decisions made before the plan existed (during chat discussion that produced the plan) — first rows.

Optional sections, added only when content exists for them (no empty stubs):

- `## Surprises & Discoveries` — unexpected behaviors / bugs / library quirks found during execution. Short observation + evidence.
- `## Open Questions` — unresolved questions blocking progress.
- `## Outcomes & Retrospective` — written when plan closes. What shipped, what was dropped, what to learn for next plans.

## 4. Light plan — required structure

Mandatory YAML header:

```yaml
---
id: EP-<slug>
tier: Light
status: active | completed | cancelled
last_updated: YYYY-MM-DD
owner: Кристина
related: <path>, ...
---
```

Mandatory body:

1. **`# <Title>`**.
2. **`## Goal`** — one sentence.
3. **`## Steps`** — checklist `[ ]` / `[x]`.

Optional: `## Decision Log` (only if a decision is made during the work). No phases. No retrospective.

## 5. Phase definition (ExecPlan only)

A phase is the unit of work that one fresh-chat agent run can complete. Sized so that loading the phase's required context (this plan + named source files + relevant references) fits in ≤ 70 % of the agent's context window. Practical guidance: 4–8 substantial steps per phase, never 30 micro-steps.

Each phase has its own subsection:

```
### Phase N — <Phase name>

**Goal:** <one sentence — what exists at the end of this phase that did not exist before>.

**Done when:** <observable, verifiable criterion — command output, UI behavior, file present, test passes>.

**Steps:**

- [ ] step 1
- [ ] step 2
- [x] (YYYY-MM-DD) step 3 done
```

Rules for phases:

- Independently verifiable. Each phase ends in a state where the project still builds / runs.
- Self-contained. Reading only the plan + the named files in `Goal & Context`, a fresh-chat agent must be able to deliver the phase. No "see previous chat" references.
- Stable order. If a phase's order changes mid-flight, record it in `Decision Log`.

Owner workflow (recommended): open new chat → «выполни Phase N из EP-<slug>» → agent loads only that phase's context, executes, updates checkboxes, reports. Phases are sized for this loop.

## 6. Lifecycle

| Transition | What happens |
|---|---|
| Plan created | File goes into `active/`. Status `active`. Owner approves before execution starts. |
| Plan in progress | File stays in `active/`. Steps and decisions updated as work proceeds. |
| Plan completed | Status flips to `completed`. File moves to `completed/`. `Outcomes & Retrospective` written if applicable (ExecPlan only). |
| Plan superseded by a different plan | Status flips to `superseded`. YAML gets `superseded_by: <id>`, `superseded_on: YYYY-MM-DD`, `supersession_reason: <text>`. File moves to `superseded/`. Body preserved as historical record. |
| Plan cancelled | File deleted from disk. One-line entry added to `index.md` § "Decommissioned": `EP-<slug> — cancelled YYYY-MM-DD — <one-line reason>`. Git history preserves the file. |

## 7. Index update obligation

Every transition (create / complete / supersede / cancel) requires a matching update to `index.md` in the same commit. The agent must not leave the index out of sync with disk state.

## 8. Format rules

- Prose-first. Checklists allowed only inside `Steps` blocks of phases (ExecPlan) or the `Steps` section (Light plan).
- Lines wrap freely; don't force fixed line widths.
- File ≤ 600 lines as a soft cap. Beyond that, the plan is doing too much — split into two or refactor.
- No nested triple-backtick code fences; use indented blocks for transcripts.

## 9. Documents this spec governs

Applies to plans authored on or after 2026-04-27 (introduction of this spec). Plans authored before that date keep their original structure; only filename, `id`, and `tier` are migrated.
