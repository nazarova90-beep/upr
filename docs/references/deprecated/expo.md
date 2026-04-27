---
status: deprecated
last_updated: 2026-04-27
owner: Кристина
deprecated_on: 2026-04-27
deprecated_by: ../../exec-plans/active/EP-pivot-to-web.md
deprecation_reason: Frontend pivot from React Native + Expo to React + Vite + TypeScript (web). Expo and Expo Go no longer in active stack. Mobile skeleton frozen on disk; not actively developed.
related: ../../FRONTEND.md, ../../stack.md, ../index.md
---

# Expo (React Native) — research note (DEPRECATED 2026-04-27)

> **Deprecated by frontend pivot to web on 2026-04-27.** See `../../exec-plans/active/EP-pivot-to-web.md`.
>
> Kept as historical record of the original mobile-stack research. The Expo Go vs Dev Build decision matrix and the SDK 54 verification notes informed the choice that this pivot replaces. Active web stack: `../../FRONTEND.md`.

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

Conclusion (frozen at deprecation): Single-scenario MVP scenario fits in Expo Go without Dev Build. **Web pivot replaces this entire path.**

## Not supported in Expo Go (or limited)

| Item | Role in stack | Required at |
|---|---|---|
| **MediaPipe** on-device (two-stage video quality check) | Native module, custom integration | Phase 3 (Single-scenario MVP polish) — now solved by browser-native `@mediapipe/tasks-vision` in web stack. |
| Custom native camera plugins | Not used | Not needed — no in-app capture in MVP. |
| `expo-task-manager` (background tasks) | Possibly background upload | Not needed in MVP — upload runs in foreground. Background mode ≥ Phase 6. |
| Push via custom backend / non-default config | Not used in MVP | Phase 6+ — replaced by Web Push in web stack. |
| `UIDesignRequiresCompatibility` and similar custom `infoPlist` keys | Not used | n/a in web. |

## Local install for Expo Go workflow (historical)

1. **Node.js** (LTS) — installer from `nodejs.org`, ~80 MB.
2. **Expo CLI** — via `npx` / `npm`, no separate install.
3. **Expo Go** on phone — App Store / Google Play, ~100 MB.

Not required (vs Flutter):

- Xcode (~15 GB, Mac App Store).
- Android Studio (~10 GB).
- iOS Simulator / Android Emulator.

## Edit-to-result loop (historical)

```
Save file in editor
    → Metro bundler rebuild JS bundle (~0.5–2 s)
    → Expo Go on iPhone/Android updates over Wi-Fi
    → Screen reloads automatically (~0.5–1 s)
```

1–3 s iteration on real device, no emulator. (Web equivalent: Vite hot-reload <1 s on `localhost`.)

## Versions (frozen at deprecation)

- **Expo SDK (stable, 2026-04-19):** SDK 54.
- **React Native:** version pinned by Expo SDK 54.
- **Language:** TypeScript.

## Common gotchas (frozen at deprecation)

| Gotcha | Detail | Applies to us |
|---|---|---|
| Expo Go limits functionality | Some native modules unavailable | n/a after pivot. |
| EAS Build is paid | Cloud build has free-tier limits | n/a after pivot. |
| Larger bundle than bare RN | Expo bundles standard modules | n/a after pivot. |
| Eject to bare RN is painful | Hard to revert | n/a after pivot. |

## Sources (via Context7)

- `/llmstxt/expo_dev_llms_txt` — main Expo docs dump (SDK 54).
- `docs.expo.dev/versions/latest/sdk/imagepicker`
- `docs.expo.dev/versions/latest/sdk/media-library`
- `docs.expo.dev/versions/latest/sdk/video`
- `docs.expo.dev/debugging/devtools-plugins`
- `docs.expo.dev/versions/latest/sdk/task-manager`

## Decision history

- 2026-04-19: Stack decision — Flutter → React Native + Expo (TypeScript). Recorded in `docs/stack.md` decision log.
- 2026-04-27: **Deprecated.** Frontend pivot to React + Vite + TypeScript (web). Recorded in `docs/stack.md` decision log and `exec-plans/active/EP-pivot-to-web.md`.
