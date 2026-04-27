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

Screen mockups and component spec — not started; arrive with scenario work.

## Folder structure

| Path | Status | Contents |
|---|---|---|
| `design-system/` | draft | Lucent style guide: `index.html` (browser preview), `style.css` (design tokens), `Lucent.png` (brand cover). See `design-system/README.md`. |
| `components.md` | TBD | UI component spec (buttons, cards, inputs), references `design-system/`. |
| `mockups/` | TBD | Mockup screenshots / Figma links. |
| `flows-visual/` | TBD | Visual user-flow diagrams. |
| `voice-and-tone.md` | TBD | UI text principles. |

## Principles

1. **Minimalism.** One screen = one primary action.
2. **Large tap targets.** Gym context: sweaty hands, poor light.
3. **Dark theme required.** Gym lighting, phone in pocket — no eye-strain.
4. **No aggressive gamification.** Calm, supportive tone. No "GG WP" badges, no "Pro Lifter" levels.
5. **Accessibility (a11y).** Sufficient contrast, large-font support, VoiceOver / TalkBack.
6. **MVP UI language — Russian; strings prepared as translatable.** All user-facing strings = future localization keys: avoid untranslatable wordplay where possible; size buttons with slack for longer languages. Policy: `../product.md`. Implementation: `../FRONTEND.md`.
