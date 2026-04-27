---
status: approved
last_updated: 2026-04-27
owner: Кристина
related: ../FRONTEND.md, ../stack.md, i18next.md, react-i18next.md, deprecated/expo-localization.md, ../exec-plans/active/EP-web-skeleton.md, index.md
---

# i18next-browser-languagedetector — research note

Source: MCP `user-context7` (library IDs `/websites/i18next`, `/llmstxt/i18next_llms-full_txt` — Source Reputation: High; Benchmark Score: 83.6 / 78). Cross-checked against the GitHub README (<https://github.com/i18next/i18next-browser-languageDetector>) and npm registry. Fetched: 2026-04-27.

## Purpose in project

Browser-side language detector plugin for `i18next.md`. On app start it walks a configurable list of sources (URL query string, cookie, localStorage, `navigator.languages`, `<html lang>`, …), picks the first usable language, and feeds it to i18next so `t(key)` returns the right dictionary without a manual settings screen.

In MVP UI is Russian-only with `fallbackLng: 'ru'`, so every visitor lands on Russian regardless of detection result. The detector is wired in now so that adding English in Phase 9 (multi-language) "just works": no settings screen, no extra plumbing — `navigator.languages` flips the active locale.

Replaces deprecated `deprecated/expo-localization.md` (mobile/Expo era — `getLocales()` → `lng`). Same role on the web client (`web/src/i18n/index.ts`).

## Version

- Stable: `v8.2.1` (published 2026-02-12). License MIT. Single runtime dep: `@babel/runtime`.
- Pairs with `i18next >= 26` (active project pin).
- Pin: `i18next-browser-languagedetector>=8,<9`.

## Key API

### 1. Init — plugin order matters

```ts
// web/src/i18n/index.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import ru from "./locales/ru.json";

i18n
  .use(LanguageDetector)        // must come BEFORE .init()
  .use(initReactI18next)
  .init({
    fallbackLng: "ru",
    supportedLngs: ["ru"],      // English added in Phase 9
    defaultNS: "common",
    ns: ["common"],
    resources: { ru: { common: ru.common } },
    interpolation: { escapeValue: false },
    detection: {
      order: ["navigator", "htmlTag"],
      caches: [],               // MVP: no language switcher → nothing to persist
    },
  });

export default i18n;
```

Do **not** set `lng` — if present it overrides the detector. Quote from i18next docs: "if you're using a language detector, do not define the lng option".

### 2. Default detection options (from upstream README)

```js
{
  order: [
    "querystring", "hash", "cookie", "localStorage",
    "sessionStorage", "navigator", "htmlTag", "path", "subdomain"
  ],
  lookupQuerystring: "lng",            // ?lng=ru
  lookupCookie: "i18next",             // cookie name
  lookupLocalStorage: "i18nextLng",    // localStorage key
  lookupSessionStorage: "i18nextLng",
  lookupFromPathIndex: 0,              // /ru/foo
  lookupFromSubdomainIndex: 0,         // ru.example.com
  caches: ["localStorage", "cookie"],  // where to persist detected lng
  excludeCacheFor: ["cimode"],         // diagnostic locale, never persist
  cookieMinutes: 10,
  cookieDomain: undefined,
  cookieOptions: { path: "/", sameSite: "strict" },
  htmlTag: document.documentElement,
  convertDetectedLanguage: undefined,  // optional normaliser, e.g. "ru-RU" → "ru"
}
```

MVP overrides only `order` and `caches`. Everything else stays default.

### 3. Supported lookup sources

| Source | Reads from | Note |
|---|---|---|
| `querystring` | `?lng=xx` | Useful for explicit overrides / share links. |
| `hash` | `#lng=xx` or `#/xx` | Legacy SPA pattern. |
| `cookie` | cookie `i18next` | Persisted across sessions. |
| `localStorage` | key `i18nextLng` | Persisted per browser. |
| `sessionStorage` | key `i18nextLng` | Single tab. |
| `navigator` | `navigator.languages` / `navigator.language` | Browser preference set in OS / browser settings. **MVP primary source.** |
| `htmlTag` | `<html lang="…">` | Static fallback set by Phase 3 of `EP-web-skeleton.md` to `ru`. |
| `path` | URL path segment | Multi-locale routing (`/ru/foo`). Not used in MVP. |
| `subdomain` | URL subdomain | Multi-locale subdomains (`ru.example.com`). Not used in MVP. |

## Gotchas

| Issue | Mitigation |
|---|---|
| `.use(LanguageDetector)` placed **after** `.init()` is silently ignored. | Always chain `.use(LanguageDetector).use(initReactI18next).init(...)` in that order. |
| Setting `lng` in `init` overrides the detector — common copy-paste from `i18next.md`. | Omit `lng`. Use `fallbackLng` only. |
| Default `caches: ['localStorage', 'cookie']` writes `i18nextLng` to localStorage on every visit; if a user once visited with `?lng=en` it is now sticky and ignores their browser preference. | MVP: `caches: []` (no language switcher → nothing to remember). Phase 9: re-enable when a switcher exists. |
| `navigator.languages` returns full BCP-47 tags (`ru-RU`, `en-US`) but i18next looks up resources by exact key. | Set `supportedLngs: ["ru"]` and rely on i18next's built-in best-match (`ru-RU` → `ru`). For aggressive normalisation use `convertDetectedLanguage: (lng) => lng.split("-")[0]`. |
| In Mac Safari with strict ITP, third-party cookie / storage access can be blocked, breaking `cookie` and `localStorage` lookups in iframes. | Skeleton not embedded in iframe → not relevant. If embedded later, use `navigator` + `htmlTag` only. |
| With `caches: []` the `cacheUserLanguage` step is a no-op. Detection re-runs on every reload — fine because detection is synchronous and cheap. | Acceptable MVP trade-off. |

## Skeleton scope (web client)

Active (target after Phase 4 of `EP-web-skeleton.md` lands):

- `web/src/i18n/index.ts`: `.use(LanguageDetector).use(initReactI18next).init({ ..., detection: { order: ["navigator", "htmlTag"], caches: [] } })`.
- `web/index.html`: `<html lang="ru">` set in Phase 3 → guarantees the `htmlTag` fallback always returns `"ru"` even if `navigator` is unavailable (private mode, automated tests).
- `web/src/main.tsx`: side-effect `import "@/i18n"` once before `<RouterProvider>` mounts.

Not in the project (deferred until Phase 9 / multi-language):

- Language switcher UI.
- `caches: ["localStorage"]` to remember user choice.
- `convertDetectedLanguage` normalisation.

## Links

- GitHub: <https://github.com/i18next/i18next-browser-languageDetector>
- npm: <https://www.npmjs.com/package/i18next-browser-languagedetector>
- i18next plugin overview: <https://www.i18next.com/overview/plugins-and-utils#language-detector>
- "Don't set `lng` with a detector" (official): <https://www.i18next.com/overview/getting-started>
