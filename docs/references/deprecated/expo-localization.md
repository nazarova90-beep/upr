---
status: deprecated
last_updated: 2026-04-27
owner: Кристина
deprecated_on: 2026-04-27
deprecated_by: ../../exec-plans/active/2026-04-27-pivot-to-web.md
deprecation_reason: Frontend pivot from React Native + Expo to React + Vite + TypeScript (web). Replacement for browser locale detection: `i18next-browser-languagedetector` (planned ref `../i18next-browser-languagedetector.md`).
related: ../../FRONTEND.md, ../../stack.md, expo.md, ../i18next.md, ../react-i18next.md, ../index.md
---

# expo-localization — research note (DEPRECATED 2026-04-27)

> **Deprecated by frontend pivot to web on 2026-04-27.** See `../../exec-plans/active/2026-04-27-pivot-to-web.md`.
>
> Replacement: `i18next-browser-languagedetector` (uses `navigator.languages` / `navigator.language`). Same role — feed device language to `i18next` on app start. Ref to be authored before use.
>
> Kept as historical record of the original mobile-stack research. `i18next` and `react-i18next` themselves remain in the active stack (refs not deprecated).

Source: MCP `user-context7`, library ID `/expo/expo` (Source Reputation: High; Benchmark Score: 81.41; branch `sdk-54`). Fetched: 2026-04-27.

## Purpose in project (historical)

Read device language and locale settings. MVP scope: feed correct language to `i18next` on app start. Future: kg/lb, date formats.

## Version (frozen at deprecation)

- Bundled with Expo SDK 54.
- Install: `npx expo install expo-localization`.

## Key API (historical reference)

### 1. `getLocales()` — preferred locales

```ts
import { getLocales } from "expo-localization";

const locales = getLocales();
// Sample return:
// [
//   {
//     languageTag: "ru-RU",
//     languageCode: "ru",
//     textDirection: "ltr",
//     digitGroupingSeparator: " ",
//     decimalSeparator: ",",
//     measurementSystem: "metric",
//     currencyCode: "RUB",
//     currencySymbol: "₽",
//     regionCode: "RU",
//     temperatureUnit: "celsius"
//   }
// ]

const deviceLanguage = locales[0]?.languageCode ?? "ru";
```

### 2. `i18next` integration (historical)

```ts
// src/i18n/index.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { getLocales } from "expo-localization";
import ru from "./locales/ru.json";

const deviceLanguage = getLocales()[0]?.languageCode ?? "ru";

const SUPPORTED = ["ru"];
const lng = SUPPORTED.includes(deviceLanguage) ? deviceLanguage : "ru";

i18n
  .use(initReactI18next)
  .init({
    lng,
    fallbackLng: "ru",
    resources: {
      ru: { translation: ru },
    },
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  });

export default i18n;
```

### Web equivalent (forward-pointer)

After pivot, the equivalent will look like:

```ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import ru from "./locales/ru.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "ru",
    supportedLngs: ["ru"],
    resources: { ru: { translation: ru } },
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  });

export default i18n;
```

Detail belongs to the future `../i18next-browser-languagedetector.md` ref.

## Gotchas (historical)

| Issue | Mitigation |
|---|---|
| Android allows changing language without app restart. | n/a in web. |
| `Localization.locale` is deprecated. | n/a in web. |
| Array ≥ 1 element, but `languageCode` may be `null` for rare locales. | Same kind of fallback applies in browser. |
| Emulator may return host OS language. | n/a in web. |

## Links

- Expo localization guide: <https://docs.expo.dev/guides/localization/>
- API: <https://docs.expo.dev/versions/latest/sdk/localization/>
- IETF BCP 47: <https://www.rfc-editor.org/info/bcp47>

## Decision history

- 2026-04-27: Adopted as locale source for `mobile/` skeleton.
- 2026-04-27: **Deprecated.** Web pivot — `i18next-browser-languagedetector` will replace.
