---
status: in-progress
last_updated: 2026-04-27
owner: Кристина
related: ../index.md, roadmap.md, mvp-product-spec.md, ../superseded/2026-04-27-hello-world.md, ../../stack.md, ../../FRONTEND.md, ../../product.md, ../../ui/index.md, ../../ui/design-system/README.md, ../../references/index.md, ../../references/i18next.md, ../../references/react-i18next.md, ../../references/deprecated/expo.md, ../../references/deprecated/expo-router.md, ../../references/deprecated/expo-localization.md, ../../../AGENTS.md, ../../../mobile/README.md
---

# Plan: Pivot frontend mobile → web

Master plan for the 2026-04-27 frontend pivot: **React Native + Expo (mobile, iPhone via Expo Go)** → **React + Vite + TypeScript (web)**. Drives the documentation commit, freezes the existing `mobile/` skeleton in place, and unblocks two follow-up plans (`web/` skeleton, web hello-world).

## Goal

Turn the project's frontend platform from a native-mobile path (RN + Expo, iOS via Expo Go, future TestFlight) into a browser-app path (React + Vite + TypeScript, runs on `localhost`, optional iPhone access via outbound HTTPS tunnel) — without changing backend, AI, storage, data model, or product scope.

Outputs of this plan are entirely textual: project documentation reflects the pivot consistently across every affected file. No code is written here. Implementation work (`web/` skeleton) is a separate plan, started after this one is committed.

## Context

### Triggering owner constraints (2026-04-27 chat)

1. **Always-on VPN on Mac and iPhone.** Both devices stay on consumer privacy VPNs full-time (privacy / region requirements). Direct LAN reach between Expo Go on iPhone and FastAPI on Mac (`192.168.x.x`) is unreliable: incoming local-network connections are blocked by Mac's VPN, outbound from iPhone goes through its own VPN tunnel and cannot resolve the Mac's private LAN. The superseded `superseded/2026-04-27-hello-world.md` plan worked around this with an ngrok HTTP tunnel — viable but adds a third-party dependency, an ephemeral URL per session, and ~100–300 ms latency, none of which exist on a `localhost`-served web client.
2. **No Apple Developer Account.** $99/year is out of MVP budget. Without it, TestFlight (the documented Phase 5 distribution path for closed beta) is unreachable, and even owner-only iPhone use is gated by Expo Go's preview limitations.
3. **Owner asked for "fastest path to product access for MVP."** Native iOS/Android delivery for a single owner-user is over-engineering relative to that goal.

### Surviving assets

- **Backend (`backend/`).** Python + FastAPI + SQLAlchemy/SQLModel, all domain folders, `ai_provider/` and `storage/` abstractions, ORM models. Untouched. Backend was platform-agnostic by design (`docs/BACKEND.md` § "Architectural rules").
- **Lucent design system (`docs/ui/design-system/`).** Already authored in **HTML/CSS**. In the mobile path it was going to be re-translated into React Native `StyleSheet` constants. In the web path it is consumed directly via CSS variables. This is a net simplification, not a regression.
- **Product / scope docs (`docs/product.md`, `docs/product-specs/*`, `docs/user-flows/*`).** No product behavior changes; the user scenario is identical (open → workout → chat → upload video → AI reply).
- **i18n catalogs (`mobile/src/i18n/locales/ru.json`).** JSON dictionaries are framework-agnostic; same `i18next` core works under React Native and React DOM. Catalogs are reusable as-is when the `web/` skeleton is created (separate plan).
- **`mobile/` skeleton on disk.** Owner-approved decision (2026-04-27): **keep, don't delete.** The skeleton becomes a frozen reference for: (a) project-structure conventions (`src/api/`, `src/i18n/`, `src/theme/`, `src/domain/`, `src/components/`) the `web/` plan will mirror; (b) historical record of what was attempted before the pivot. `mobile/README.md` carries a prominent "FROZEN" banner and pointers to this plan.

### Superseded / deprecated assets

- `docs/exec-plans/superseded/2026-04-27-hello-world.md` (was `active/`). Original mobile-via-ngrok hello-world plan. Status flipped to `superseded`, moved to `superseded/`, banner added, content preserved as historical record. Reusable parts (`/health` endpoint design, `__DEV__`-gated debug button pattern) are explicitly noted for the future `active/2026-04-27-web-hello-world.md` plan.
- `docs/references/deprecated/expo.md`, `docs/references/deprecated/expo-router.md`, `docs/references/deprecated/expo-localization.md` (were `references/`). Status flipped to `deprecated`, files moved into `references/deprecated/`, banner added at the top of each, otherwise content preserved.

### Alternatives considered and rejected

- **Telegram Mini-App.** Discarded. Rationale: forces dependency on Telegram WebApp SDK, constrains UI to Telegram's chrome and theming model, conflicts with Lucent's existing HTML/CSS design tokens, ties owner-only MVP testing to having Telegram open, and provides no advantage over a plain web app for a single-user local MVP. Web app is strictly more general.
- **Stay on RN + Expo, just keep using ngrok.** Discarded. Solves VPN reach but does not solve Apple Developer Account, ongoing Expo Go Dev Build constraints, ngrok ephemeral URL friction, or Lucent's HTML/CSS-vs-RN re-translation cost. Web path eliminates all four at once.

## Decision

### New web stack (mirrors `docs/stack.md` "MVP stack" table after this commit)

| Layer | Choice |
|---|---|
| Framework | `react` (latest stable) |
| Build / dev server | `vite` |
| Language | TypeScript |
| Routing | `react-router` (v7) |
| HTTP / FormData | native `fetch` |
| File picker | native `<input type="file" accept="video/*">` |
| Video playback | native `<video>` |
| Server cache (Phase 2+) | `@tanstack/react-query` |
| Local state | `zustand` |
| i18n | `i18next` + `react-i18next` + `i18next-browser-languagedetector` |
| Styling | plain CSS + CSS modules; Lucent CSS variables imported into `web/src/styles/tokens.css` |
| Fonts | Manrope via `@font-face` or Google Fonts CSS |
| On-device pose (Phase 3, optional) | `@mediapipe/tasks-vision` (browser-native, no Dev Build) |

Same "boring tech first" lens as the mobile stack: each library small, well-represented in agent training data, replaceable behind a thin wrapper.

### Folder layout (target after `web/` skeleton plan)

```
upr/
├── backend/                # unchanged
├── mobile/                 # frozen; banner in README.md; kept on disk
├── web/                    # new home of the active client (created by next plan)
│   ├── public/
│   ├── src/
│   │   ├── main.tsx
│   │   ├── App.tsx
│   │   ├── routes/{Workout,Chat}.tsx
│   │   ├── styles/{tokens,global}.css
│   │   ├── i18n/{index.ts,locales/ru.json}
│   │   ├── domain/
│   │   ├── components/
│   │   └── api/
│   ├── index.html
│   ├── vite.config.ts      # proxies /api/* → localhost:8000
│   ├── tsconfig.json
│   └── package.json
└── docs/                   # source of truth (this commit's surface)
```

### Local development workflow (target)

1. `cd backend && uvicorn app.main:app --reload` → FastAPI on `http://localhost:8000`.
2. `cd web && npm run dev` → Vite on `http://localhost:5173`; `vite.config.ts` proxies `/api/*` → `http://localhost:8000` so the browser sees a single origin (no CORS middleware needed in MVP).
3. Open `http://localhost:5173` in **Mac Safari** — `localhost` traffic ignores the active VPN.
4. Optional iPhone Safari testing while owner's VPN is active: `cloudflared tunnel --url http://localhost:5173` → public HTTPS URL → open on iPhone. Outbound-only HTTPS is VPN-friendly. Tunnel ref-doc (`references/cloudflared.md`) written when first adopted, per `core-beliefs.md` § 4.

### Roadmap impact

- **Phase 1 / Track C** (mobile + backend skeletons): closed, but `mobile/` portion **frozen** by this pivot. Backend portion stays active.
- **Phase 1 / new Track D** added: "Frontend pivot mobile → web + `web/` skeleton". Status: in progress. Sub-deliverables:
  1. This documentation commit (closes Track D step 1).
  2. New library refs: `references/react.md`, `references/vite.md`, `references/react-router.md` (and later `references/i18next-browser-languagedetector.md`, `references/zustand.md`, `references/tanstack-react-query.md` per "boring tech first").
  3. `active/<date>-web-skeleton.md` exec-plan (analogue of `completed/2026-04-27-phase1-track-c-skeleton.md` for `web/`).
  4. `active/<date>-web-hello-world.md` exec-plan (analogue of superseded mobile hello-world).
- **Phase 1 exit trigger** updated in `roadmap.md`: "mockups + specs closed + `web/` skeleton runs locally on Mac Safari" (was: "Expo Go on owner's iPhone").
- **Phase 2 exit trigger** updated: "test video uploaded from Mac Safari (or iPhone Safari via tunnel) yields real Gemini analysis."
- **Phase 9** updated: removed "web build via React Native for Web"; added "optional native iOS/Android shell" as a separate Expo project beside `web/`, sharing TS domain types and i18n catalogs, gated on owner approval and Apple Developer Account at that point.

### Out of scope (this plan)

- `web/` directory creation, `package.json`, `vite.config.ts`, any TS code. Handled by `<date>-web-skeleton.md` after library refs are in.
- Library refs themselves (`references/react.md`, `references/vite.md`, `references/react-router.md`, etc.). Each is a separate small commit per `core-beliefs.md` § 4 (ref before use).
- Web hello-world (`/health` from `web` to `backend` via Vite proxy). Replaces the superseded mobile hello-world plan; written after `web/` skeleton lands.
- PWA manifest + service worker. Tracked as Phase 3 polish.
- CORS middleware on backend. Not needed in MVP because Vite proxy collapses both ports into a single browser origin. Activates at Phase 5 (closed beta) when frontend is statically deployed (Cloudflare Pages / Vercel / Netlify).
- Deletion of `mobile/`. Owner-approved decision: retain on disk as frozen reference.

## Documentation checklist

This single commit (after owner approval) covers everything below. Each item refers to a concrete file or file move; no code is touched.

### Plans

- [x] Create this master pivot plan: `docs/exec-plans/active/2026-04-27-pivot-to-web.md`.
- [x] Move old hello-world plan: `docs/exec-plans/active/2026-04-27-hello-world.md` → `docs/exec-plans/superseded/2026-04-27-hello-world.md`. Header `status: superseded`, `superseded_by`, `superseded_on`, `supersession_reason`. Banner at top.
- [x] Update `docs/exec-plans/index.md`: add `superseded/` to folder structure; list this plan under "Active"; new "Superseded" section listing the moved plan; rules for handling supersession.
- [x] Update `docs/exec-plans/active/roadmap.md`: § 1 "Current state" reflects web stack + frozen `mobile/`; § 5 Phase 1 gains Track D; § 5 Phase 9 swaps "web via RN-for-Web" for "optional native iOS/Android shell"; § 7 "Not planned now" updated; § 8 decision log entry added.
- [x] Update `docs/exec-plans/active/mvp-product-spec.md`: § "Place in roadmap" mentions Track D; A.4 "Local hello world" reworded to "web app calls it via Vite proxy"; decision log entry added.

### Stack / architecture / agent map

- [x] Update `docs/stack.md`: replace "Mobile" row with "Web client" row; rewrite "Choice notes" first bullet to justify web pivot; rewrite Phase 9 in "Scaling phases"; update "Open questions" (drop Expo-specific, add PWA timing + browser-native MediaPipe); add 2026-04-27 frontend-pivot entry in "Decision log"; update `related` field to point to this plan.
- [x] Rewrite `docs/FRONTEND.md` for the web stack: Stack, Browsers, Responsibilities (file picker, `<video>`, `fetch`/`FormData`, polling, HttpOnly-cookie auth in Phase 5, optional PWA in Phase 3), Localization (with `i18next-browser-languagedetector`), Design tokens (Lucent CSS variables), Libraries, Single-scenario MVP scope, iPhone access during development (Cloudflare tunnel), Expansion plan, Project structure (`web/`).
- [x] Update `AGENTS.md`: project description "mobile (iOS/Android) AI coach" → "web AI coach (browser app, PWA-capable)"; file-map entry for `docs/FRONTEND.md` updated.
- [x] Update `docs/product.md`: § 9 "Platforms" iOS/Android → web client; native deferred to optional ≥ Phase 9.

### UI

- [x] Update `docs/ui/index.md`: "Code transfer" note specifies that Lucent's `style.css` is consumed directly by the web client; no translation to RN `StyleSheet` constants required.
- [x] Update `docs/ui/design-system/README.md`: "Usage rules" updated for web (CSS variables); "Forward plan" rewritten for the web client (direct CSS import, `@font-face`, Google Fonts CSS); historical note added for the deprecated mobile path.

### References

- [x] Move Expo refs to `docs/references/deprecated/`:
  - [x] `references/expo.md` → `references/deprecated/expo.md`. Header `status: deprecated`, `deprecated_on: 2026-04-27`, `deprecated_by: ../../exec-plans/active/2026-04-27-pivot-to-web.md`, `deprecation_reason`. Banner at top.
  - [x] `references/expo-router.md` → `references/deprecated/expo-router.md`. Same header treatment.
  - [x] `references/expo-localization.md` → `references/deprecated/expo-localization.md`. Same header treatment.
- [x] Update `docs/references/index.md`: split into "Active" / "Deprecated" / "Planned"; "Planned" lists web pivot follow-ups (`react.md`, `vite.md`, `react-router.md`, etc.) as high-priority.
- [x] Update `docs/references/i18next.md`: `related` repointed to `deprecated/expo-localization.md`; "Stack relations" mentions `i18next-browser-languagedetector`; "Skeleton scope" carries both web (active) and mobile (frozen) examples.
- [x] Update `docs/references/react-i18next.md`: `related` repointed; "Purpose in project" calls out web as the active surface; "Key API" example shows both web HTML and frozen RN; "Skeleton scope" updated.

### `mobile/` directory

- [x] Update `mobile/README.md`: title gains "FROZEN 2026-04-27"; banner at top points to `web/` (when created) and to this plan; "Stack" / "Launch" sections marked frozen with pointers to deprecated refs; `related` updated.

### Owner-action items (this plan closes only when both are done)

- [ ] **Owner approval** → flip this plan's `status` to `approved`.
- [ ] **Single commit** covering everything above (owner-driven; this plan is the message body's source).

## Future work (separate plans, in order)

1. `docs/references/react.md` — purpose, version, key API (function components, hooks), gotchas. Sourced via MCP `user-context7`.
2. `docs/references/vite.md` — purpose, version, key API (`vite.config.ts`, dev server, proxy, build), gotchas.
3. `docs/references/react-router.md` — `BrowserRouter`, route definitions, `useParams`.
4. `docs/exec-plans/active/<date>-web-skeleton.md` — exec-plan for the actual `web/` directory creation: `npm create vite@latest web -- --template react-ts`, install `react-router` / `i18next` / `react-i18next` / `i18next-browser-languagedetector` / `zustand`, write `vite.config.ts` proxy, `tokens.css` from Lucent, route shells, locale `ru.json` mirrored from `mobile/src/i18n/locales/ru.json`.
5. `docs/exec-plans/active/<date>-web-hello-world.md` — exec-plan replacing the superseded mobile hello-world: backend `/health` endpoint (design reusable from superseded plan, lives in `backend/app/core/health.py`), `web/src/api/health.ts`, dev-only health-check button (gated by `import.meta.env.DEV`), Mac Safari verification first, optional Cloudflare-tunnel iPhone Safari verification.

## Open questions

- **Cloudflare quick tunnel vs ngrok** as the recommended optional iPhone-access path. Recommendation: Cloudflare quick tunnel (no signup for quick mode, no ephemeral-URL DX worse than ngrok in practice). Decided when `references/cloudflared.md` is written.
- **PWA timing.** Phase 1 (early polish, "Add to Home Screen" right away) vs Phase 3 (after thin slice, with offline cache strategy). Default = Phase 3 to honor "boring tech first" / "thin slice first." Confirmed during Phase 3 polish.
- **Browser-side MediaPipe in Phase 3.** Backend-only vs `@mediapipe/tasks-vision` browser-side pre-filter. Default = backend-only, browser-side only if owner specifically wants instant on-device feedback. Confirmed at Phase 3.
- **`@font-face` self-hosted Manrope vs Google Fonts CSS** in `web/`. Default = Google Fonts CSS for skeleton (zero-effort), self-host if Phase 3 polish flags performance.

## Decision log

| Date | Decision | Source |
|---|---|---|
| 2026-04-27 | Frontend platform pivot: React Native + Expo (mobile, iOS via Expo Go) → React + Vite + TypeScript (web). | "Triggering owner constraints" (this plan), `docs/stack.md` decision log, `docs/exec-plans/active/roadmap.md` decision log. |
| 2026-04-27 | Lucent design system consumed directly as CSS by the web client. No translation to RN `StyleSheet` constants. | "Surviving assets" (this plan); `docs/ui/index.md`; `docs/ui/design-system/README.md`. |
| 2026-04-27 | `mobile/` skeleton retained on disk as frozen reference (not deleted). Banner added to `mobile/README.md`. | Owner choice 2026-04-27 chat. |
| 2026-04-27 | Original mobile hello-world plan moved to `docs/exec-plans/superseded/`, not deleted; banner added; reusable design notes preserved. | Owner choice (option C, 2026-04-27 chat). |
| 2026-04-27 | Expo refs moved to `docs/references/deprecated/`, not deleted; deprecation banner + YAML metadata added. | "Surviving assets" / "Superseded" sections (this plan); `docs/references/index.md`. |
| 2026-04-27 | New Track D added under Phase 1 of `roadmap.md` to drive the `web/` skeleton work, parallel to Tracks A / B / C. | `docs/exec-plans/active/roadmap.md` § 5 Phase 1. |
| 2026-04-27 | Phase 9 in `stack.md` and `roadmap.md` no longer carries "web build via RN-for-Web". Native iOS/Android shell repositioned to optional ≥ Phase 9 (separate Expo project beside `web/`, gated by owner approval + Apple Developer Account at that time). | `docs/stack.md` § "Scaling phases"; `docs/exec-plans/active/roadmap.md` § 5 Phase 9. |
| 2026-04-27 | CORS middleware on backend deferred to Phase 5 (closed-beta deploy). MVP single-origin via Vite proxy. | "Out of scope" (this plan); `docs/FRONTEND.md` § "Expansion plan". |
| 2026-04-27 | iPhone access during development (when needed) via Cloudflare quick tunnel by default; ngrok kept as alternative. | `docs/FRONTEND.md` § "iPhone access during development". |
| 2026-04-27 | Telegram Mini-App rejected as alternative MVP shell. | "Alternatives considered and rejected" (this plan). |

## Related documents

| Path | Role |
|---|---|
| `roadmap.md` | Top-level roadmap; Track D added; Phase 9 updated; decision log carries pivot entry. |
| `mvp-product-spec.md` | A.4 "Local hello world" retargeted to web client; decision log entry added. |
| `../superseded/2026-04-27-hello-world.md` | Predecessor plan (mobile-via-ngrok); superseded by this one. |
| `../../stack.md` | Single source of truth for stack; "Choice notes" + decision log carry the pivot. |
| `../../FRONTEND.md` | Rewritten end-to-end for the web client. |
| `../../product.md` | § 9 "Platforms" updated to web; native deferred. |
| `../../ui/index.md` | "Code transfer" note updated for direct CSS consumption. |
| `../../ui/design-system/README.md` | "Usage rules" + "Forward plan" rewritten for web. |
| `../../references/index.md` | Restructured: Active / Deprecated / Planned; web pivot follow-ups listed. |
| `../../references/i18next.md` | Updated: web (active) + mobile (frozen) examples. |
| `../../references/react-i18next.md` | Updated: web (active) + mobile (frozen) examples. |
| `../../references/deprecated/expo.md` | Deprecated by this pivot; preserved historically. |
| `../../references/deprecated/expo-router.md` | Deprecated by this pivot; preserved historically. |
| `../../references/deprecated/expo-localization.md` | Deprecated by this pivot; preserved historically. |
| `../../../AGENTS.md` | Project description + frontend file-map entry updated. |
| `../../../mobile/README.md` | Frozen banner added; pointers to this plan and to deprecated refs. |
