---
status: approved
last_updated: 2026-04-27
owner: Кристина
related: ../FRONTEND.md, ../stack.md, react-i18next.md, deprecated/expo-localization.md, index.md
---

# i18next — research note

Source: MCP `user-context7`, library ID `/i18next/i18next` (Source Reputation: High; Benchmark Score: 63.5; versions `v23.11.5`, `v26.0.2`). Fetched: 2026-04-27.

## Purpose in project

i18n engine for JS/TS. Loads JSON dictionaries (`ru.json`, future `en.json`, …), returns text by key. Supports interpolation (`Hello {{name}}`), pluralization, nested keys, namespaces.

Stack relations: engine only. React components use via `react-i18next.md`. Browser language detection: planned `i18next-browser-languagedetector.md` (replaces deprecated `deprecated/expo-localization.md` after 2026-04-27 web pivot — see `../exec-plans/active/EP-pivot-to-web.md`).

## Version

- Stable: `v26`. LTS: `v23`. New projects: `v26`.
- Web (React) — primary surface. Also React Native + Expo compatible via `react-i18next` (relevant to frozen `mobile/` skeleton only).
- Pin: `i18next>=26,<27`.

## Key API

### 1. Init (minimal)

```ts
import i18next from "i18next";
import ru from "./locales/ru.json";

i18next.init({
  lng: "ru",
  fallbackLng: "ru",
  defaultNS: "translation",
  resources: {
    ru: { translation: ru },
  },
  interpolation: {
    escapeValue: false, // React/RN already escapes
  },
});
```

- `lng` — current language. MVP: hardcoded `"ru"`. Later: from `i18next-browser-languagedetector` (web).
- `fallbackLng` — fallback when key missing.
- `resources` — `{ <lang>: { <namespace>: <dictionary> } }`.

### 2. `t(key)` usage

```ts
i18next.t("welcome");
i18next.t("greeting", { name: "Кристина" });
i18next.t("nested.deep.key");
i18next.t("item", { count: 0 });
i18next.t("item", { count: 1 });
i18next.t("item", { count: 5 });
```

### 3. JSON dictionary format

```json
{
  "welcome": "Добро пожаловать",
  "greeting": "Привет, {{name}}!",
  "chat": {
    "empty": {
      "placeholder": "Загрузите видео, чтобы начать"
    }
  },
  "item": "Один элемент",
  "item_other": "{{count}} элементов"
}
```

- Nested via objects; lookup via dot path: `chat.empty.placeholder`.
- Pluralization via suffixes `_one`, `_other`, etc. Russian rules: `_one`, `_few`, `_many`, `_other`.

### 4. Dynamic resource bundles

```ts
i18next.addResourceBundle("en", "translation", { welcome: "Welcome" }, true, false);
```

Used in Phase 9 when adding English.

## Gotchas

| Issue | Mitigation |
|---|---|
| `init()` async. `t()` before init returns the key. | Wait for init before render, or use `react-i18next`. |
| `escapeValue: true` (default) double-escapes in React/RN. | Always `escapeValue: false` in React. |
| Confusing `lng` and `fallbackLng` can leak wrong language. | MVP: both `"ru"`. |
| Multi-namespace overkill for small projects. | MVP: single namespace `translation`. Split on growth. |
| Russian plurals require correct CLDR suffixes (`_one`, `_few`, `_many`, `_other`). | Use standard CLDR suffixes. |

## Skeleton scope (Single-scenario MVP)

Active (web client, target after web-skeleton plan):

- `web/src/i18n/index.ts`: `i18next.use(LanguageDetector).use(initReactI18next).init({ fallbackLng: "ru", supportedLngs: ["ru"], resources: { ru: { translation: ru } } })`.
- `web/src/i18n/locales/ru.json`: `{}` or one test key (e.g. `app.name: "UPR"`).
- Real UI strings added in Track B (mockups) and Phase 2 (thin slice).
- Import i18n in `web/src/main.tsx` for single init at app start.

Frozen (mobile skeleton, retained on disk):

- `mobile/src/i18n/index.ts`: `i18next.init({ lng: "ru", fallbackLng: "ru", resources: { ru: { translation: ru } } })`. Imported once in `mobile/app/_layout.tsx`.

## Links

- Docs: <https://www.i18next.com/>
- Configuration: <https://www.i18next.com/overview/configuration-options>
- Plurals: <https://www.i18next.com/translation-function/plurals>
- GitHub: <https://github.com/i18next/i18next>
