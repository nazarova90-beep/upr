---
status: approved
last_updated: 2026-04-27
owner: Кристина
related: ../FRONTEND.md, ../stack.md, expo.md, i18next.md, react-i18next.md, index.md
---

# expo-localization — research note

Source: MCP `user-context7`, library ID `/expo/expo` (Source Reputation: High; Benchmark Score: 81.41; branch `sdk-54`). Fetched: 2026-04-27.

## Purpose in project

Read device language and locale settings. MVP scope: feed correct language to `i18next` on app start. Future: kg/lb, date formats.

## Version

- Bundled with Expo SDK 54. Versioned with SDK.
- Install: `npx expo install expo-localization` (matches current SDK).

## Key API

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

- Returns array, ≥ 1 element guaranteed.
- First element = most preferred locale.
- `languageCode` — short code (`"ru"`, `"en"`, `"zh"`). Use for `i18next.init({ lng })`.
- `languageTag` — IETF BCP 47 tag (`"ru-RU"`, `"en-US"`).

### 2. `getCalendars()` — calendar settings (future)

```ts
import { getCalendars } from "expo-localization";

const [calendar] = getCalendars();
console.log(calendar.timeZone); // "Europe/Moscow"
```

Not used in MVP.

### 3. `i18next` integration

```ts
// src/i18n/index.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { getLocales } from "expo-localization";
import ru from "./locales/ru.json";

const deviceLanguage = getLocales()[0]?.languageCode ?? "ru";

const SUPPORTED = ["ru"]; // MVP: ru only
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

MVP always resolves `lng = "ru"`. Adding English: extend `SUPPORTED` array, no other changes.

### 4. `app.json` plugin (optional)

```json
{
  "expo": {
    "plugins": ["expo-localization"]
  }
}
```

Required for native settings (RTL etc.). MVP: not needed (no RTL). Add when supporting Arabic/Hebrew.

## Gotchas

| Issue | Mitigation |
|---|---|
| Android allows changing language without app restart. `getLocales()` must be re-called. | Listen `AppState`, re-init i18n on foreground. MVP: ignore (single-user, low risk). |
| `Localization.locale` is deprecated. | Use `getLocales()` only. |
| Array ≥ 1 element, but `languageCode` may be `null` for rare locales. | Always `?? "ru"` fallback. |
| Emulator may return host OS language. | Verify on physical iPhone (Expo Go). |

## Skeleton scope

- `mobile/src/i18n/index.ts` uses `getLocales()[0]?.languageCode ?? "ru"`.
- `SUPPORTED = ["ru"]` → effectively `ru` only.
- No `getCalendars` / currency / RTL config yet.

## Links

- Expo localization guide: <https://docs.expo.dev/guides/localization/>
- API: <https://docs.expo.dev/versions/latest/sdk/localization/>
- IETF BCP 47: <https://www.rfc-editor.org/info/bcp47>
