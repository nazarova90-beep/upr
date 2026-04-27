---
status: approved
last_updated: 2026-04-27
owner: Кристина
related: ../FRONTEND.md, ../stack.md, expo.md, i18next.md, react-i18next.md, index.md
---

# expo-localization — research-справка

> **Источник.** Собрано через MCP `user-context7`, library ID `/expo/expo` (Source Reputation: High; Benchmark Score: 81.41; ветка `sdk-54`). Дата сбора: 2026-04-27.

## Зачем нужна в нашем проекте

`expo-localization` — официальный пакет Expo для **чтения языковых и региональных настроек устройства**: какой язык выбран в системе, какой формат чисел/дат, какая валюта, какие единицы измерения. На MVP UPR используем его строго ради одной задачи: **подать в `i18next` правильный язык на старте приложения**. В будущем (вес в кг/lb, формат даты) — пригодится тот же модуль.

> **Аналогия.** Это «паспортный стол» приложения: спрашиваем у iPhone «как тебя настроили», получаем ответ — и приложение начинает разговаривать с пользователем на его языке.

## Версия

- Идёт в комплекте с **Expo SDK 54** (актуальная стабильная ветка). Версионируется вместе с SDK.
- Установка стандартная: `npx expo install expo-localization` — установит правильную версию для текущего SDK.

## Ключевое API

### 1. `getLocales()` — список предпочтительных языков

```ts
import { getLocales } from "expo-localization";

const locales = getLocales();
// Пример возвращаемого значения:
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

- Возвращает массив, **минимум один элемент** (гарантировано).
- Первый элемент — наиболее предпочтительный язык пользователя.
- `languageCode` — короткий код вроде `"ru"`, `"en"`, `"zh"`. Подходит для подачи в `i18next.init({ lng })`.
- `languageTag` — полный тэг IETF BCP 47 (`"ru-RU"`, `"en-US"`).

### 2. `getCalendars()` — настройки календаря (на будущее)

```ts
import { getCalendars } from "expo-localization";

const [calendar] = getCalendars();
console.log(calendar.timeZone); // "Europe/Moscow"
```

На MVP не используем.

### 3. Интеграция с `i18next`

Стандартный паттерн (взят за основу из официальной документации Expo, адаптирован под `i18next` вместо `i18n-js`):

```ts
// src/i18n/index.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { getLocales } from "expo-localization";
import ru from "./locales/ru.json";

const deviceLanguage = getLocales()[0]?.languageCode ?? "ru";

const SUPPORTED = ["ru"]; // на MVP — только русский
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

На MVP всегда получится `lng = "ru"`. Когда добавим английский — расширим массив `SUPPORTED`, остальной код не меняется.

### 4. Конфигурация в `app.json` (опционально)

```json
{
  "expo": {
    "plugins": ["expo-localization"]
  }
}
```

Плагин нужен для нативных настроек (RTL и т.п.). На MVP без RTL — можно не подключать. Добавим, если решим поддерживать арабский/иврит.

## Подводные камни

| Камень | Что делать |
|---|---|
| На Android язык можно поменять, не перезапуская приложение. `getLocales()` тогда нужно вызывать заново. | Слушать `AppState` и переинициализировать i18n при возврате в foreground. На MVP — игнорируем (один пользователь, ситуация маловероятна). |
| `Localization.locale` — устаревший (deprecated) API. Использовать только `getLocales()`. | Используем только `getLocales()`. |
| Массив всегда содержит ≥ 1 элемент, но `languageCode` может быть `null` для редких локалей. | Всегда писать `?? "ru"` как фолбэк. |
| Эмулятор/симулятор может вернуть язык операционной системы хоста, а не «продакшн»-устройства. | На реальном iPhone проверять отдельно (так и так делаем — у нас Expo Go на физическом устройстве). |

## Что нам важно из этой библиотеки прямо сейчас

Для **структурного скелета**:

- В `mobile/src/i18n/index.ts` использовать `getLocales()[0]?.languageCode ?? "ru"` для определения языка.
- На MVP массив `SUPPORTED = ["ru"]`, поэтому фактически язык всегда `ru`.
- Никаких настроек `getCalendars` / валюты / RTL пока не добавляем.

## Ссылки

- Гид Expo по локализации: <https://docs.expo.dev/guides/localization/>
- API expo-localization: <https://docs.expo.dev/versions/latest/sdk/localization/>
- IETF BCP 47 (стандарт языковых тегов): <https://www.rfc-editor.org/info/bcp47>
