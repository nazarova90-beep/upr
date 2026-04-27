---
status: approved
last_updated: 2026-04-27
owner: Кристина
related: ../stack.md, ../FRONTEND.md, ../exec-plans/active/roadmap.md, index.md
---

# Expo (React Native) — research note

Source: MCP `user-context7` (`/llmstxt/expo_dev_llms_txt`, `/llmstxt/expo_dev_llms-full_txt`). Basis for 2026-04-19 stack decision: Flutter → React Native + Expo (TypeScript). See `docs/stack.md` and `docs/FRONTEND.md`.

## What Expo provides

Wrapper over React Native: (a) bundled standard APIs (camera, gallery, video, file system, notifications); (b) dev/build tooling; (c) **Expo Go** mode — App Store / Google Play app that runs your project via QR code without local Xcode / Android Studio.

## Expo Go vs Development Build

| Mode | How it works | Required when |
|---|---|---|
| **Expo Go** | App from App Store / Google Play. CLI prints QR; phone camera scan opens the project inside Expo Go on real iPhone/Android. Hot reload ~1 s. | Project uses only standard Expo SDK packages. Covers most of Single-scenario MVP. |
| **Development Build** (EAS Build or local) | Custom build with required native modules. Installs as a normal app. | Native modules absent from Expo Go (e.g. MediaPipe), custom camera/ML plugins, non-default `infoPlist` / AndroidManifest entries. Local build needs Xcode (iOS) or Android Studio (Android). |

Migration path: start in Expo Go, switch to Dev Build when blocked by a native module. Codebase stays the same.

## Verified Expo Go support (Single-scenario MVP needs)

Source: `docs.expo.dev/versions/latest/sdk/...`.

| Feature | Package | Expo Go | Source |
|---|---|---|---|
| Pick video from gallery (system picker) | `expo-image-picker` (`launchImageLibraryAsync`) | Yes | `docs.expo.dev/versions/latest/sdk/imagepicker` |
| Media library access (metadata / asset URI) | `expo-media-library` | Yes (Android cannot create empty albums — irrelevant) | `docs.expo.dev/versions/latest/sdk/media-library` |
| Video playback in chat | `expo-video` (`useVideoPlayer`, `VideoView`) | Yes | `docs.expo.dev/versions/latest/sdk/video` |
| HTTP upload to backend | `fetch` / `expo-file-system` | Yes | base JS / Expo SDK |
| Dark theme + Manrope / Material Symbols | `expo-font`, `StyleSheet` | Yes | base Expo |
| i18n (Russian in MVP) | `expo-localization` + `i18next` | Yes | base Expo |

Conclusion: Single-scenario MVP scenario (`docs/user-flows/upload-video-and-get-feedback.md`) — workout screen → chat → gallery picker → upload → AI reply with playable video — fits entirely in Expo Go, no Xcode / Android Studio needed.

## Not supported in Expo Go (or limited)

| Item | Role in stack | Required at |
|---|---|---|
| **MediaPipe** on-device (two-stage video quality check) | Native module, custom integration | Phase 3 (Single-scenario MVP polish). |
| Custom native camera plugins | Not used | Not needed — no in-app capture in MVP (`roadmap.md` § 3). |
| `expo-task-manager` (background tasks) | Possibly background upload | Not needed in MVP — upload runs in foreground. Background mode ≥ Phase 6. |
| Push via custom backend / non-default config | Not used in MVP | Phase 6+. |
| `UIDesignRequiresCompatibility` and similar custom `infoPlist` keys | Not used | Possibly later → Dev Build. |

First Dev Build trigger: Phase 3 with MediaPipe. Phases 1–2 (Single-scenario MVP code) run on Expo Go.

## Local install for Expo Go workflow

1. **Node.js** (LTS) — installer from `nodejs.org`, ~80 MB.
2. **Expo CLI** — via `npx` / `npm`, no separate install.
3. **Expo Go** on phone — App Store / Google Play, ~100 MB.

Not required (vs Flutter):

- Xcode (~15 GB, Mac App Store).
- Android Studio (~10 GB).
- iOS Simulator / Android Emulator.

Required later (Phase 3 for MediaPipe), not now.

## Edit-to-result loop

```
Save file in editor
    → Metro bundler rebuild JS bundle (~0.5–2 s)
    → Expo Go on iPhone/Android updates over Wi-Fi
    → Screen reloads automatically (~0.5–1 s)
```

1–3 s iteration on real device, no emulator.

## Versions

- **Expo SDK (stable, 2026-04-19):** SDK 54. SDK 55 in preview; production stays on 54.
- **React Native:** version pinned by Expo SDK 54; manual upgrade not needed.
- **Language:** TypeScript (`npx create-expo-app` defaults to TS).

## Common gotchas

| Gotcha | Detail | Applies to us |
|---|---|---|
| Expo Go limits functionality | Some native modules unavailable | Does not block MVP; Phase 3 → Dev Build. |
| EAS Build is paid | Cloud build has free-tier limits | Local build is free. EAS optional. |
| Larger bundle than bare RN | Expo bundles standard modules | Non-critical at this app size. |
| Eject to bare RN is painful | Hard to revert | Mitigated by stack design; rarely required. |

## Current Expo recommendations

- **`expo-router`** for navigation (file-based, Next.js-style). Fits — only 2 screens + pop-up.
- **TypeScript** required.
- UI styling — `StyleSheet` or `nativewind` (Tailwind-like). For Lucent: hand-roll tokens in `mobile/src/theme/*.ts` + `StyleSheet`.

## Sources (via Context7)

- `/llmstxt/expo_dev_llms_txt` — main Expo docs dump (SDK 54).
- `docs.expo.dev/versions/latest/sdk/imagepicker`
- `docs.expo.dev/versions/latest/sdk/media-library`
- `docs.expo.dev/versions/latest/sdk/video`
- `docs.expo.dev/debugging/devtools-plugins`
- `docs.expo.dev/versions/latest/sdk/task-manager`

## Decision result (2026-04-19)

Primary criterion: avoid Xcode / Android Studio at Single-scenario MVP stage — satisfied by Expo Go. All MVP features (gallery video picker, video playback, chat, HTTP upload) supported in Expo Go without Dev Build. First hard need for native build: Phase 3, only with on-device MediaPipe (itself optional). Stack updated: `docs/stack.md` → React Native + Expo (TypeScript). Full journal: `docs/stack.md` § "Decision log", `docs/exec-plans/active/roadmap.md` § 8.
