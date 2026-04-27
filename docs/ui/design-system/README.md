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
2. These files are **not** application code. App is React Native + Expo (TypeScript) — see `../../stack.md`, `../../FRONTEND.md`. Does not consume HTML/CSS directly. Code transfer = extract values into `mobile/src/theme/*.ts` constants for `StyleSheet`.
3. **HTML/CSS here is the source of truth.** App-vs-style-guide divergence — fix app.
4. Icons: **Material Symbols Rounded** font (Google Fonts). No separate icons folder; icons by name (e.g. `home`, `settings`).
5. Body font: **Manrope** (Google Fonts).

## Provenance

Static HTML page + CSS. Imported 2026-04-19. External source: `~/Desktop/luc/` on owner's machine.

## Forward plan (deferred)

Task "transfer Lucent tokens to Expo theme":

- Extract values from `style.css` (colors, spacing, radii, fonts).
- Place in `mobile/src/theme/*.ts` as constants (`colors`, `spacing`, `radius`, `typography`) for `StyleSheet.create({...})`.
- Load **Manrope** via `expo-font`.
- Load **Material Symbols Rounded** via `@expo/vector-icons` or direct font load.
- Plan filed under `docs/exec-plans/active/` after approval.

Partial transfer already done in Phase 1 / Track C (colors + base spacing); Manrope / Material Symbols are a separate future step.
