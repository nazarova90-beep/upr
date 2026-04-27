# Mockups

_Updated: 2026-04-27_

Static HTML mockups of the Single-scenario MVP screens. Visual source of truth before the web client exists. Authored in `../../exec-plans/active/EP-track-b-mockups.md`.

## Format

- **Standalone HTML** files. Each one renders without a build step — open in any browser.
- **Mobile-first viewport, 390 px wide.** A `.phone` container caps width at 390 px and centers it on a neutral backdrop for desktop preview.
- **Dark theme only.** Gym lighting context (`../index.md` § Principles).
- Each file imports `../design-system/style.css` (Lucent design tokens) and loads **Manrope** + **Material Symbols Rounded** from Google Fonts.
- **No raw hex colors.** Only CSS variables from Lucent.
- **No JavaScript** (or strictly cosmetic CSS-only animations). State variants are separate files, not JS toggles.
- Russian copy follows `../voice-and-tone.md` (canonical strings table § 4).

## How to open

Double-click a file in Finder; it opens in the default browser. For Safari iOS-like preview on desktop, narrow the window or use Safari's Responsive Design Mode (⌥⌘R) at 390 px width.

### Safari gotcha — styles don't load

Safari blocks loading `style.css` from a sibling directory (`../design-system/style.css`) over `file://` by default. The page renders without colors, layout, or icons. Two fixes:

1. **One-time Safari setting (recommended).** Settings (⌘,) → Advanced → enable «Show features for web developers». Then top menu Develop → Developer Settings… → enable «Disable local file restrictions». Reload the page.
2. **Local HTTP server.** From repo root: `python3 -m http.server 8000`, then open `http://localhost:8000/docs/ui/mockups/<file>.html` in Safari.

Chrome and Firefox load these mockups correctly without any configuration.

## Files

| File | Screen | Source spec |
|---|---|---|
| `workout.html` | Workout screen — name, date, counter, three exercise cards. | `../../product-specs/workout.md` § "Workout screen anatomy" |
| `technique-popup.html` | Technique pop-up over workout (Romanian deadlift). | `../../product-specs/workout.md` § "Exercise card anatomy" + `../../product-specs/exercises-base.md` § "Technique text" |
| `chat-empty.html` | Per-exercise chat — empty state (before first AI reply): «Загрузить видео» button + placeholder. | `../../product-specs/exercise-chat.md` § "Single-scenario MVP simplifications" + `../../user-flows/upload-video-and-get-feedback.md` § 3 step 3 |
| `chat-active.html` | Per-exercise chat — active state (after first AI reply): feed + text input + attach + send. Compendium of all bubble types. | `../../product-specs/exercise-chat.md` § "AI reply format" + § "AI is thinking" + `../../user-flows/upload-video-and-get-feedback.md` § 3 step 7 |

## What this directory is not

- Not Figma. Not a design tool. Not a clickable prototype.
- Not a component library. Components are inventoried in `../components.md` after all mockups exist.
- Not application code. The future `web/` client consumes the **same** `style.css`, so these mockups port over with minimal redesign — but the React/Vite stack is decided in `EP-web-skeleton.md`, not here.
