---
status: approved
last_updated: 2026-04-27
owner: Кристина
related: ../FRONTEND.md, ../stack.md, i18next.md, expo-localization.md, index.md
---

# react-i18next — research-справка

> **Источник.** Собрано через MCP `user-context7`, library ID `/i18next/react-i18next` (Source Reputation: High; Benchmark Score: 78.94; 186 сниппетов). Дата сбора: 2026-04-27.

## Зачем нужна в нашем проекте

`react-i18next` — это «мост» между движком переводов [i18next](i18next.md) и React-компонентами. Без него можно — но придётся вручную тащить `i18next.t(...)` через все компоненты. С ним — стандартный React-хук `useTranslation()` и компонент `<Trans>` для встроенных в текст React-элементов. В Expo / React Native — стандартный выбор.

> **Аналогия.** Если `i18next` — это «телефонная книга», то `react-i18next` — это «розетка», в которую втыкается каждый React-компонент, чтобы получить нужный перевод и автоматически перерисоваться при смене языка.

## Версия

- Идёт в паре с `i18next`. На момент справки — `react-i18next >= 15`.
- Совместим с React 18+ и React Native 0.74+ (то, что в Expo SDK 54).
- Пиннуем `react-i18next>=15,<17`.

## Ключевое API

### 1. Подключение к i18next через `initReactI18next`

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
      escapeValue: false, // React сам экранирует
    },
    react: {
      useSuspense: false, // на MVP без Suspense — проще для отладки
    },
  });

export default i18n;
```

`useSuspense: false` важно: с Suspense на момент загрузки переводов компонент будет «подвешен», а у нас ресурсы и так загружены статически — Suspense не нужен.

### 2. Хук `useTranslation` в функциональном компоненте

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

С нэймспейсом и префиксом ключа:

```tsx
const { t } = useTranslation("translation", { keyPrefix: "chat.empty" });
t("placeholder"); // эквивалент t("chat.empty.placeholder")
```

С возможностью переключить язык:

```tsx
const { t, i18n } = useTranslation();
i18n.changeLanguage("en");
```

### 3. Компонент `<Trans>` для текста с React-элементами внутри

Для случаев, когда внутри переводимой фразы есть **JSX-элементы** (ссылка, `<strong>`, иконка):

```tsx
import { Trans } from "react-i18next";

<Trans
  i18nKey="terms.agreement"
  components={{
    termsLink: <Link href="/terms" />,
  }}
>
  Продолжая, вы соглашаетесь с <termsLink>условиями</termsLink>.
</Trans>;
```

В JSON-словаре:

```json
{
  "terms": {
    "agreement": "Продолжая, вы соглашаетесь с <termsLink>условиями</termsLink>."
  }
}
```

На MVP, скорее всего, обойдёмся без `<Trans>` — все строки простые. Но архитектурно `<Trans>` — стандартный способ для будущих сложных текстов.

## Подводные камни

| Камень | Что делать |
|---|---|
| Suspense + статические ресурсы создают лишнюю асинхронность. | Ставить `react.useSuspense: false`. |
| Ключи в JSON и в коде расходятся (опечатался — увидишь ключ вместо текста). | Включить TypeScript-типы переводов (отдельная фича, на MVP не подключаем — добавим, когда строк станет много). |
| `i18n.changeLanguage(lng)` асинхронен. Перерисовка происходит после промиса. | На MVP язык один (`ru`), переключение не используем. Появится с фичей выбора языка. |
| Двойной экранирование при `escapeValue: true` ломает символы вроде кавычек. | Всегда `escapeValue: false` в React/RN. |
| `useTranslation` без аргументов берёт `defaultNS`. Если позже добавим неймспейсы (`errors`, `common`) — нужно будет обновить. | На MVP — один неймспейс `translation`. |

## Что нам важно из этой библиотеки прямо сейчас

Для **структурного скелета**:

- В `mobile/src/i18n/index.ts` — `.use(initReactI18next).init(...)`. На MVP — без HTTP-backend и без Language Detector (язык — `expo-localization` напрямую при инициализации).
- В `mobile/app/_layout.tsx` — `import "../src/i18n"` (один раз при старте — этого достаточно, инициализация происходит на стороннем эффекте импорта).
- Сам `useTranslation()` в экранах-заглушках можно пока не использовать — нет реальных строк UI.

## Ссылки

- Официальная документация: <https://react.i18next.com/>
- `useTranslation`: <https://react.i18next.com/latest/usetranslation-hook>
- `<Trans>`: <https://react.i18next.com/latest/trans-component>
- GitHub: <https://github.com/i18next/react-i18next>
