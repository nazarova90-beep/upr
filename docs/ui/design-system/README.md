---
status: draft
last_updated: 2026-04-27
owner: Кристина
related: ../index.md, ../../FRONTEND.md, ../../stack.md
---

# Lucent — UPR design system source

Source-of-truth design system: colors, typography, spacing, radii, icons, base components.

## Folder contents

| File | Subject |
|---|---|
| `index.html` | Live style-guide page (open in browser). |
| `style.css` | Design tokens (colors, spacing, radii, shadows, font sizes) + component styles. |
| `Lucent.png` | Brand cover / preview. |

## Token map (`style.css`)

| Section | Contents |
|---|---|
| `Color · Primitives` | Base palette: blacks, whites, brand color tints. |
| `Color · Semantic (UI roles)` | Semantic colors: background, surface, text, accent, error, success. **Use these by default**, not raw palette colors. |
| `Radius scale` | Corner radii (`xs`, `sm`, `md`, …). |
| `Spacing scale` | 4px-based spacing (`xs`=8, `sm`=12, `md`=16, …). |
| Further | Typography (**Manrope** font), icons (**Material Symbols Rounded** font), component styles. |

## Usage rules

1. Don't edit files casually. Change deliberately, bump `last_updated`.
2. These files are **not** application code, but the active client (web — React + Vite + TypeScript; see `../../stack.md`, `../../FRONTEND.md`) consumes them directly. CSS variables in `style.css` import into `web/src/styles/tokens.css`. No translation to TS constants required (was needed in deprecated mobile/RN stack — see `../../exec-plans/active/2026-04-27-pivot-to-web.md`).
3. **HTML/CSS here is the source of truth.** App-vs-style-guide divergence — fix app.
4. Icons: **Material Symbols Rounded** font (Google Fonts). No separate icons folder; icons by name (e.g. `home`, `settings`).
5. Body font: **Manrope** (Google Fonts).

## Provenance

Static HTML page + CSS. Imported 2026-04-19. External source: `~/Desktop/luc/` on owner's machine.

## Forward plan (web client)

Task "wire Lucent tokens into web client" — covered by future web-skeleton plan (see `../../exec-plans/active/2026-04-27-pivot-to-web.md` § "Future work"):

- Import `style.css` directly into `web/src/styles/tokens.css` (or include via `@import`).
- Use CSS variables in component-level CSS modules (`.module.css`).
- Load **Manrope** via `@font-face` (self-hosted) or Google Fonts CSS link in `index.html`.
- Load **Material Symbols Rounded** via Google Fonts CSS link in `index.html`.

### Historical note (deprecated mobile path)

Earlier plan was to extract `style.css` values into `mobile/src/theme/*.ts` constants for `StyleSheet`, load Manrope via `expo-font`, and load Material Symbols via `@expo/vector-icons`. Partial transfer (colors + base spacing) was completed in Phase 1 / Track C. After 2026-04-27 web pivot the mobile theme files in `mobile/src/theme/` are frozen alongside the rest of the mobile skeleton.
