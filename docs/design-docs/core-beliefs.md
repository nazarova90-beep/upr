---
status: approved
last_updated: 2026-04-27
owner: Кристина
related: ../../AGENTS.md
---

# Core beliefs

Operating principles for humans and AI agents working on this project. Rules, not guidelines.

Adapted from OpenAI ["Harness engineering: leveraging Codex in an agent-first world"](https://openai.com/index/harness-engineering/) (Feb 2026); scaled down for one non-programmer owner + AI agents (single-user MVP). Team-scale tooling (architecture-boundary linters, full test coverage, per-worktree observability) is deliberately out.

## 1. Repository is the system of record

Decision not in `docs/` ⇒ does not exist. Do not rely on chat memory, human memory, or code comments. Every significant decision → commit → specific file under `docs/`.

## 2. Top-level docs are maps, not encyclopedias

`AGENTS.md` ≈ 100 lines, table-of-contents only. Same applies to other top-level files: short entry points, push details into deeper files. Reasons:

- Agent context is scarce — large files crowd out code and the task.
- "If everything is important, nothing is important."
- Large files rot fast.

## 3. Boring tech first

Prefer well-established libraries and frameworks: well-represented in agent training data, stable APIs, large community. When choosing between proven and trendy — pick proven.

## 4. Library research via MCP `user-context7` before code

Before introducing any third-party library, the agent must:

1. Fetch current docs via MCP `user-context7`.
2. Record purpose, version, key API, gotchas, source link in `docs/references/<library>.md`.
3. Only then write code.

Required because training data goes stale and libraries update.

## 5. Layered architecture with explicit boundaries

Layered, domain-first structure (see `../../ARCHITECTURE.md`). Each external dependency (AI provider, video storage, DB) lives behind an abstraction. Out of scope at current stage: architecture-boundary linters, 100% test coverage, custom observability stack — added when real pain appears.

## 6. Owner is non-programmer

Documentation files are agent-optimized: facts, constraints, schemas, decisions. Analogies and beginner explanations live in chat output, not in files. Russian is the product/UI language; documentation language is mixed (Russian for product content, English allowed for technical reference). Emoji only on explicit request.

## 7. No feature without explicit approval

Agent must not introduce product behavior absent from `docs/product.md` or `docs/product-specs/`. Workflow for new ideas:

1. Surface in chat.
2. Get explicit "yes".
3. Write decision into the right doc.
4. Then implement.

## Document headers

Top-level strategic files (`AGENTS.md`, `README.md`, `ARCHITECTURE.md`, `docs/product.md`, `docs/stack.md`, `docs/design-docs/core-beliefs.md`) — full YAML header:

```yaml
---
status: draft | in-progress | approved | deprecated
last_updated: YYYY-MM-DD
owner: Кристина
related: ../path/to/related.md
---
```

Other files — single line `_Updated: YYYY-MM-DD_` under the title.

## Structural changes

Renames, moves, rewrites of top-level docs — require explicit owner approval. Minor edits (wording, dates) — no approval needed.

## Document evolution

This file is living. Add or refine principles as experience accumulates — sparingly: each new principle eats agent context.
