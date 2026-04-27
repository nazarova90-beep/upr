---
status: in-progress
last_updated: 2026-04-27
owner: Кристина
related: ../user-flows/index.md, ../FRONTEND.md, design-system/README.md
---

# UI

Visual layer: design system, screen mockups, icons, illustrations, style rules.

## Status

Lucent design system loaded in project (HTML + CSS, draft) at `design-system/`. Source of truth for visuals. After 2026-04-27 frontend pivot to web, `style.css` is consumed directly by the web client (CSS variables imported into `web/src/styles/tokens.css`). No translation to RN `StyleSheet` constants is required. Details: `design-system/README.md`. Pivot rationale: `../exec-plans/active/EP-pivot-to-web.md`.

Track B (UI mockups for Single-scenario MVP) closed 2026-04-27 — see `../exec-plans/completed/EP-track-b-mockups.md`. Four screen mockups (`mockups/workout.html`, `mockups/technique-popup.html`, `mockups/chat-empty.html`, `mockups/chat-active.html`), the voice-and-tone foundation (`voice-and-tone.md`), and the component inventory (`components.md`) shipped in that plan.

## Folder structure

| Path | Status | Contents |
|---|---|---|
| `design-system/` | draft | Lucent style guide: `index.html` (browser preview), `style.css` (design tokens), `Lucent.png` (brand cover). See `design-system/README.md`. |
| [`components.md`](components.md) | approved | Inventory of UI elements actually used across the four MVP mockups, grouped by category (layout / content / controls / feedback), each cited to a mockup file + line range. Reusable React abstractions are deferred to `EP-web-skeleton.md`. |
| [`mockups/`](mockups/README.md) | approved | Static HTML mockups of MVP screens. Authored in `EP-track-b-mockups.md`: [`workout.html`](mockups/workout.html), [`technique-popup.html`](mockups/technique-popup.html), [`chat-empty.html`](mockups/chat-empty.html), [`chat-active.html`](mockups/chat-active.html). |
| `flows-visual/` | TBD | Visual user-flow diagrams. |
| [`voice-and-tone.md`](voice-and-tone.md) | approved | UI text principles (Russian copy, address form, AI tone, error vocabulary). |

## Principles

1. **Minimalism.** One screen = one primary action.
2. **Large tap targets.** Gym context: sweaty hands, poor light.
3. **Dark theme required.** Gym lighting, phone in pocket — no eye-strain.
4. **No aggressive gamification.** Calm, supportive tone. No "GG WP" badges, no "Pro Lifter" levels.
5. **Accessibility (a11y).** Sufficient contrast, large-font support, VoiceOver / TalkBack.
6. **MVP UI language — Russian; strings prepared as translatable.** All user-facing strings = future localization keys: avoid untranslatable wordplay where possible; size buttons with slack for longer languages. Policy: `../product.md`. Implementation: `../FRONTEND.md`.
