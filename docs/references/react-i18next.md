---
status: approved
last_updated: 2026-04-27
owner: Кристина
related: ../FRONTEND.md, ../stack.md, i18next.md, expo-localization.md, index.md
---

# react-i18next — research note

Source: MCP `user-context7`, library ID `/i18next/react-i18next` (Source Reputation: High; Benchmark Score: 78.94; 186 snippets). Fetched: 2026-04-27.

## Purpose in project

React bindings for `i18next.md`. Provides `useTranslation()` hook and `<Trans>` component. Standard for Expo/React Native.

## Version

- Pairs with `i18next`. Current: `react-i18next >= 15`.
- React 18+ / React Native 0.74+ (Expo SDK 54).
- Pin: `react-i18next>=15,<17`.

## Key API

### 1. Wire to i18next via `initReactI18next`

```ts
// src/i18n/index.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ru from "./locales/ru.json";

i18n
  .use(initReactI18next)
  .init({
    lng: "ru",
    fallbackLng: "ru",
    resources: {
      ru: { translation: ru },
    },
    interpolation: {
      escapeValue: false, // React handles escape
    },
    react: {
      useSuspense: false, // MVP: no Suspense for simpler debugging
    },
  });

export default i18n;
```

`useSuspense: false`: resources are loaded statically, no Suspense needed; avoids component suspension.

### 2. `useTranslation` hook

```tsx
import { Text, View } from "react-native";
import { useTranslation } from "react-i18next";

export default function ChatScreen() {
  const { t } = useTranslation();
  return (
    <View>
      <Text>{t("chat.empty.placeholder")}</Text>
    </View>
  );
}
```

With namespace and keyPrefix:

```tsx
const { t } = useTranslation("translation", { keyPrefix: "chat.empty" });
t("placeholder"); // ≡ t("chat.empty.placeholder")
```

Language switch:

```tsx
const { t, i18n } = useTranslation();
i18n.changeLanguage("en");
```

### 3. `<Trans>` for text with JSX

```tsx
import { Trans } from "react-i18next";

<Trans
  i18nKey="terms.agreement"
  components={{
    termsLink: <Link href="/terms" />,
  }}
>
  By continuing, you agree to the <termsLink>terms</termsLink>.
</Trans>;
```

JSON dictionary:

```json
{
  "terms": {
    "agreement": "By continuing, you agree to the <termsLink>terms</termsLink>."
  }
}
```

MVP likely won't need `<Trans>`; reserved for future complex strings.

## Gotchas

| Issue | Mitigation |
|---|---|
| Suspense + static resources adds needless async. | Set `react.useSuspense: false`. |
| Key drift between JSON and code (typos surface as raw keys). | Enable TS translation types when string count grows. |
| `i18n.changeLanguage(lng)` is async; rerender after promise. | MVP: single language (`ru`); no switching. |
| `escapeValue: true` breaks quotes etc. | Always `escapeValue: false` in React/RN. |
| `useTranslation` without args uses `defaultNS`. Adding namespaces later requires updates. | MVP: single namespace `translation`. |

## Skeleton scope

- `mobile/src/i18n/index.ts`: `.use(initReactI18next).init(...)`. MVP: no HTTP backend, no Language Detector (language from `expo-localization` directly).
- `mobile/app/_layout.tsx`: `import "../src/i18n"` once at app start (init via import side-effect).
- `useTranslation()` not used in stub screens (no real UI strings yet).

## Links

- Docs: <https://react.i18next.com/>
- `useTranslation`: <https://react.i18next.com/latest/usetranslation-hook>
- `<Trans>`: <https://react.i18next.com/latest/trans-component>
- GitHub: <https://github.com/i18next/react-i18next>
