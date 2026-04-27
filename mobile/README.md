# UPR — mobile app (skeleton)

React Native + Expo (TypeScript) structural skeleton. Stub screens, Lucent design tokens, i18n infra. No real UI, no backend calls. Next step: hello-world.

## Stack

- Expo SDK 54 + React Native 0.81 (`../docs/references/expo.md`).
- TypeScript.
- expo-router — file-based navigation (`../docs/references/expo-router.md`).
- i18next + react-i18next + expo-localization (refs in `docs/references/`).

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

## Launch (future)

Skeleton stage: do not run. Commands below are the contract for hello-world step.

```bash
cd mobile
npm install
npx expo start
```

Open **Expo Go** on iPhone (same Wi-Fi as Mac), scan QR from terminal.

## Out of scope at skeleton stage

- Manrope font — separate step via `expo-font`.
- Material Symbols Rounded icons — separate step.
- Backend HTTP client — Phase 2.
- Real Russian UI strings — added with real UI.

## Related

- `../docs/FRONTEND.md` — mobile client overview.
- `../docs/ui/design-system/README.md` — Lucent (design token source).
- `../docs/exec-plans/completed/2026-04-27-phase1-track-c-skeleton.md` — phase plan.
