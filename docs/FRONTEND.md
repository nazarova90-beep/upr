---
status: approved
last_updated: 2026-04-27
owner: Кристина
related: stack.md, ../ARCHITECTURE.md, BACKEND.md, ui/index.md, SECURITY.md, exec-plans/active/EP-pivot-to-web.md, exec-plans/completed/EP-web-skeleton.md
---

# Frontend — web client

## Stack

- **React + Vite + TypeScript** (browser app, PWA-capable).
- Single codebase, runs in any modern browser (Safari, Chrome, Firefox, Edge).
- Dev mode: Vite dev server on `localhost:5173` proxying `/api/*` → `localhost:8000` (FastAPI).
- Pivot rationale: `stack.md` → "Choice notes" + "Decision log" 2026-04-27.
- Pivot plan: `exec-plans/active/EP-pivot-to-web.md`.

## Browsers

- Safari 16+ (iOS and macOS) — primary target (owner uses iPhone Safari + Mac Safari).
- Chrome / Firefox / Edge latest — supported, not exhaustively tested in MVP.
- Internet Explorer / legacy Edge — not supported.

## Responsibilities

- Entire UI.
- Local state (current workout, chat cache).
- Video selection from device via system file picker (`<input type="file" accept="video/*">`). On iPhone Safari this opens Photos + Files picker. **No in-app camera in Single-scenario MVP** (`docs/user-flows/upload-video-and-get-feedback.md`).
- Video upload to backend via `fetch` + `FormData`.
- UI updates on analysis ready (polling for MVP; websocket / push later).
- Auth via HttpOnly cookie issued by backend (Phase 5; no browser-side token storage).
- Optional PWA install ("Add to Home Screen" on iOS Safari) — Phase 3 polish.

## Localization (i18n)

- **MVP UI:** Russian only. Other languages not required for first public release.
- **Engineering rule:** multi-language support enabled from day one.

| Rule | Reason |
|---|---|
| UI strings in JSON dictionaries (key → text), never inlined | New language = new JSON, no code hunting. |
| Single source of truth for date / number / weight unit (kg, later lb) formats | Locale-specific rendering. |
| User-facing strings only via i18n layer; code/comments unrestricted | Clear separation. |
| Stack: `i18next` + `react-i18next` + `i18next-browser-languagedetector` | Boring tech, well-supported. |

Future (post-MVP): app language from settings or `navigator.languages`; sync preference with backend for localized server errors.

References: `references/i18next.md`, `references/react-i18next.md`, `references/i18next-browser-languagedetector.md`.

## Design tokens and theme

- Source of truth: **Lucent** (HTML/CSS) at `docs/ui/design-system/`.
- Code transfer: Lucent CSS variables imported directly into `web/src/styles/tokens.css` and consumed via CSS modules.
- Font **Manrope** via `@font-face` (self-hosted) or Google Fonts CSS.
- Icons **Material Symbols Rounded** via Google Fonts CSS.
- Source-of-truth rule: if app diverges from Lucent, fix the app.

Details: `docs/ui/design-system/README.md`.

## Libraries (MVP set — each must have a `references/<lib>.md` before use)

| Purpose | Library |
|---|---|
| Framework | `react` (latest stable) |
| Build / dev server | `vite` |
| Language | TypeScript |
| Routing | `react-router` (v7; package was `react-router-dom` in v6) |
| File picker | native `<input type="file" accept="video/*">` (no library) |
| Video playback | native `<video>` (no library) |
| HTTP / FormData | native `fetch` (no library) |
| Server cache / queries | `@tanstack/react-query` |
| Local state | `zustand` |
| Fonts | `@font-face` / Google Fonts CSS (no library) |
| i18n | `i18next` + `react-i18next` + `i18next-browser-languagedetector` |
| On-device pose estimation (optional, Phase 3) | `@mediapipe/tasks-vision` (browser-native, no Dev Build) |
| SVG | inline `<svg>` (no library) |
| Auth (Phase 5) | HttpOnly cookies issued by backend (no library) |

## Single-scenario MVP scope

- One hardcoded user (no auth).
- **Workout screen** with three hardcoded exercises (`docs/product-specs/workout.md`).
- **Exercise chat screen**, two visual states: empty (button "Загрузить видео" + placeholder) / active (message feed + input + attach).
- **Technique pop-up** (tap on info icon in exercise card).
- Video from device via system picker → upload → AI review in chat.
- Dark theme, Russian via i18next.

Full scenario: `docs/user-flows/upload-video-and-get-feedback.md`.

## iPhone access during development (optional)

Default dev surface: Mac Safari → `http://localhost:5173`. VPN is irrelevant on `localhost`.

For occasional iPhone-on-Safari testing while owner's VPN is active:

- **Cloudflare quick tunnel:** `cloudflared tunnel --url http://localhost:5173`. Outbound HTTPS — VPN-friendly. No account required for quick tunnels.
- **ngrok:** valid alternative; requires free account + authtoken.

Ref-doc (`references/cloudflared.md` or `references/ngrok.md`) written only when first adopted, per Rule §3 of `core-beliefs.md`.

## Expansion plan (matches `docs/exec-plans/active/roadmap.md`)

| Phase | Frontend additions |
|---|---|
| 1 (closed 2026-04-27) | Web skeleton (Vite + React + TS), Lucent CSS, i18next, route shells (`completed/EP-web-skeleton.md`). |
| 2 (thin slice) | Video upload, chat UI, real Gemini call from backend. |
| 3 (polish) | Two-stage video quality check (browser-side `@mediapipe/tasks-vision` optional), PWA manifest + service worker (Add to Home Screen on iOS Safari). |
| 4 (Full MVP) | Workout builder, set log, exercise catalog (20). |
| 5 (closed beta) | HttpOnly cookie auth via backend, profile screen, static deploy (Cloudflare Pages / Vercel / Netlify), CORS middleware on backend. |
| 6 (public beta) | Web Push (where supported), floating analysis indicator. |
| 7 (monetization) | Stripe Checkout integration via backend redirect (no native IAP needed in web path). |
| 9 (audience expansion) | Second locale (i18n already wired). Optional native iOS/Android shell as separate `mobile/` rebuild beside `web/` if owner-approved. |

## Project structure (target after web skeleton plan)

```
web/
├── public/                    # static assets, favicon, PWA manifest (Phase 3)
├── src/
│   ├── main.tsx               # entry point — mounts <RouterProvider>
│   ├── router.tsx             # createBrowserRouter (v7 library/data mode)
│   ├── routes/                # screen components
│   │   ├── Workout.tsx        # workout screen
│   │   └── Chat.tsx           # chat screen (exerciseId param)
│   ├── styles/                # global CSS, Lucent tokens
│   │   ├── tokens.css         # @import "@lucent/style.css"
│   │   └── global.css
│   ├── i18n/                  # i18next init + locales/ru.json
│   ├── domain/                # TS types (mirror backend models)
│   ├── components/            # reusable UI (CSS modules)
│   └── api/                   # HTTP client to backend
├── index.html
├── vite.config.ts             # proxy /api/* → localhost:8000; @lucent + @ aliases
├── tsconfig.app.json          # path alias @/foo → src/foo
└── package.json
```

Mirror of `mobile/src/` where applicable (same `i18n/`, `domain/`, `components/`, `api/` conventions). Two intentional deviations from the legacy `mobile/` shape: (a) no `App.tsx` — `router.tsx` is the root container under React Router v7's library/data mode; (b) path alias is `@/foo` (Vite/Next ecosystem default), not `~/foo` as in `mobile/`. Both fixed at `web/` skeleton time per `completed/EP-web-skeleton.md` Decision Log. `mobile/` retained on disk as frozen skeleton; see `mobile/README.md`.
