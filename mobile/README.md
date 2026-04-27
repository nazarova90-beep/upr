# UPR — mobile app (skeleton, FROZEN 2026-04-27)

> **This client is frozen as of 2026-04-27.**
>
> The active client surface is `web/` (React + Vite + TypeScript). Pivot reasons and migration plan: `../docs/exec-plans/active/EP-pivot-to-web.md`.
>
> This skeleton is kept on disk by owner decision (see same plan, "Decision log") as a historical reference and as a base if a native iOS/Android shell is ever revived (≥ Phase 9, optional). No further code or doc updates are planned here.
>
> Library refs that originally backed this skeleton:
> - `../docs/references/deprecated/expo.md`
> - `../docs/references/deprecated/expo-router.md`
> - `../docs/references/deprecated/expo-localization.md`
> - `../docs/references/i18next.md` (still active — used by web client too)
> - `../docs/references/react-i18next.md` (still active — used by web client too)

---

React Native + Expo (TypeScript) structural skeleton. Stub screens, Lucent design tokens, i18n infra. No real UI, no backend calls. Next step (now obsolete): hello-world via Expo Go + ngrok — superseded by web hello-world (`../docs/exec-plans/superseded/EP-hello-world.md` for original plan, replacement to be authored after web skeleton is in place).

## Stack (frozen)

- Expo SDK 54 + React Native 0.81 (`../docs/references/deprecated/expo.md`).
- TypeScript.
- expo-router — file-based navigation (`../docs/references/deprecated/expo-router.md`).
- i18next + react-i18next + expo-localization (`../docs/references/deprecated/expo-localization.md`; `i18next` and `react-i18next` themselves still active — see `../docs/references/`).

## Structure

```
mobile/
├── app/                    # screens (expo-router)
│   ├── _layout.tsx         # root layout, inits i18n
│   ├── index.tsx           # workout screen stub, route `/`
│   └── chat/
│       └── [exerciseId].tsx  # chat screen stub, route `/chat/<id>`
├── src/
│   ├── theme/              # Lucent tokens (colors, spacing, radii, typography)
│   ├── i18n/               # i18next init + ru/en dictionaries
│   ├── domain/             # TS types (mirror of backend models)
│   ├── components/         # shared UI (empty)
│   └── api/                # backend HTTP client (empty)
├── assets/                 # icons, splash (create-expo-app generated)
├── app.json
└── package.json
```

Path alias: `~/foo` → `src/foo` (`tsconfig.json`).

## Launch (frozen — not maintained)

This skeleton is no longer the active dev target. Commands below are preserved for historical reference; running them is not part of any current plan.

```bash
cd mobile
npm install
npx expo start
```

Original intent: open Expo Go on iPhone (same Wi-Fi as Mac), scan QR from terminal. The "same Wi-Fi" assumption is what was broken by always-on VPN — see `../docs/exec-plans/superseded/EP-hello-world.md` "Connection method" section for full context.

For active dev workflow on web client, see `../web/README.md` (created when web skeleton plan executes).

## Out of scope at skeleton stage

- Manrope font — separate step via `expo-font`.
- Material Symbols Rounded icons — separate step.
- Backend HTTP client — Phase 2.
- Real Russian UI strings — added with real UI.

## Related

- `../docs/exec-plans/active/EP-pivot-to-web.md` — **freeze rationale and active client direction.**
- `../docs/FRONTEND.md` — active client overview (now web).
- `../docs/ui/design-system/README.md` — Lucent (design token source — same in both stacks).
- `../docs/exec-plans/completed/EP-phase1-track-c-skeleton.md` — phase plan that produced this skeleton.
- `../docs/exec-plans/superseded/EP-hello-world.md` — original hello-world plan (mobile-via-ngrok), superseded by pivot.
