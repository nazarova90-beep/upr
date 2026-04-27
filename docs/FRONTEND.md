---
status: approved
last_updated: 2026-04-27
owner: Кристина
related: stack.md, ../ARCHITECTURE.md, BACKEND.md, ui/index.md, SECURITY.md, references/expo.md
---

# Frontend — mobile app

## Stack

- **React Native + Expo (TypeScript)**, Expo SDK 54.
- Single codebase, iOS and Android.
- Dev mode: **Expo Go** on a physical device (no Xcode/Android Studio required until Phase 3).
- Rationale and Flutter→Expo migration: `stack.md` → "Decision log".
- Expo capabilities, Expo Go vs Dev Build: `references/expo.md`.

## Platforms

- iOS (Expo SDK 54 requires iOS 15+).
- Android (Expo SDK 54 requires Android 7+).

## Responsibilities

- Entire UI.
- Local state (current workout, chat cache).
- Video selection from device gallery via system picker. **No in-app camera in Single-scenario MVP** (`docs/user-flows/upload-video-and-get-feedback.md`).
- Video upload to backend.
- UI updates on analysis ready (polling for MVP; websocket / push later).
- Auth token in secure storage (`expo-secure-store`, Keychain on iOS / Keystore on Android) — appears with registration (Phase 5).
- Optional biometric app lock — not in MVP.

## Localization (i18n)

- **MVP UI:** Russian only. Other languages not required for first public release.
- **Engineering rule:** multi-language support enabled from day one.

| Rule | Reason |
|---|---|
| UI strings in JSON dictionaries (key → text), never inlined | New language = new JSON, no code hunting. |
| Single source of truth for date / number / weight unit (kg, later lb) formats | Locale-specific rendering. |
| User-facing strings only via i18n layer; code/comments unrestricted | Clear separation. |
| Stack: `expo-localization` + `i18next` + `react-i18next` | Boring tech, well-supported. |

Future (post-MVP): app language from settings or OS; sync preference with backend for localized server errors and push.

References: `references/i18next.md`, `references/react-i18next.md`, `references/expo-localization.md`.

## Design tokens and theme

- Source of truth: **Lucent** (HTML/CSS) at `docs/ui/design-system/`.
- Code transfer: values from `style.css` → `mobile/src/theme/*.ts` constants (`colors`, `spacing`, `radius`, `typography`).
- Used inside `StyleSheet.create({...})`.
- Font **Manrope** via `expo-font`.
- Icons **Material Symbols Rounded** via `@expo/vector-icons`.
- Source-of-truth rule: if app diverges from Lucent, fix the app.

Details: `docs/ui/design-system/README.md`.

## Libraries (MVP set — each must have a `references/<lib>.md` before use)

| Purpose | Library |
|---|---|
| Framework | `expo` (SDK 54) |
| Language | TypeScript |
| Navigation | `expo-router` (file-based) |
| Video picker | `expo-image-picker` |
| Media library access | `expo-media-library` |
| Video playback | `expo-video` |
| HTTP upload | `fetch` / `expo-file-system` for large files |
| Server cache / queries | `@tanstack/react-query` |
| Local state | `zustand` or `useState`/`useReducer` |
| Fonts | `expo-font` |
| i18n | `expo-localization` + `i18next` + `react-i18next` |
| Secure token storage (Phase 5) | `expo-secure-store` |
| On-device pose estimation (optional, Phase 3) | Native MediaPipe — requires Dev Build (`references/expo.md`) |
| SVG | `react-native-svg` |

## Single-scenario MVP scope

- One hardcoded user (no auth).
- **Workout screen** with three hardcoded exercises (`docs/product-specs/workout.md`).
- **Exercise chat screen**, two visual states: empty (button "Загрузить видео" + placeholder) / active (message feed + input + attach).
- **Technique pop-up** (tap on info icon in exercise card).
- Video from gallery via system picker → upload → AI review in chat.
- Dark theme, Russian via i18next.

Full scenario: `docs/user-flows/upload-video-and-get-feedback.md`.

## Expansion plan (matches `docs/exec-plans/active/roadmap.md`)

| Phase | Frontend additions |
|---|---|
| 3 (polish) | Two-stage video quality check; possible Expo Go → Dev Build migration for on-device MediaPipe. First need for Xcode / Android Studio. |
| 4 (Full MVP) | Workout builder, set log, exercise catalog (20). |
| 5 (closed beta) | Sign in with Apple / Google (`expo-auth-session`), profile screen. |
| 6 (public beta) | Push via `expo-notifications`, floating analysis indicator. |
| 7 (monetization) | App Store IAP / Google Play Billing (`react-native-iap` or Expo wrapper, requires Dev Build). |
| 9 (audience expansion) | Second locale (i18n already wired); web build via React Native for Web. |

## Project structure (current skeleton)

```
mobile/
├── app/                       # expo-router screens
│   ├── _layout.tsx            # root layout, i18n init
│   ├── index.tsx              # workout screen (stub)
│   └── chat/[exerciseId].tsx  # chat screen (stub)
├── src/
│   ├── theme/                 # Lucent tokens
│   ├── i18n/                  # i18next init + locales/ru.json
│   ├── domain/                # TS types (mirror backend models)
│   ├── components/            # reusable UI
│   └── api/                   # HTTP client to backend
├── assets/
└── package.json
```

Path alias: `~/foo` → `src/foo` (`tsconfig.json`).
