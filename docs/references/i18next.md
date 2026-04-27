---
status: approved
last_updated: 2026-04-27
owner: Кристина
related: ../FRONTEND.md, ../stack.md, react-i18next.md, expo-localization.md, index.md
---

# i18next — research-справка

> **Источник.** Собрано через MCP `user-context7`, library ID `/i18next/i18next` (Source Reputation: High; Benchmark Score: 63.5; версии `v23.11.5`, `v26.0.2`). Дата сбора: 2026-04-27.

## Зачем нужна в нашем проекте

`i18next` — стандартная и «boring» система интернационализации (i18n) для JavaScript/TypeScript. В UPR — **движок переводов**: загружает JSON-словари (`ru.json` и в будущем `en.json`, `…`), отдаёт по ключу нужный текст. Плюс умеет: интерполяцию переменных (`Hello {{name}}`), плюрализацию («1 подход» / «2 подхода» / «5 подходов»), вложенные ключи, неймспейсы.

**Связь с другими библиотеками.** Сам `i18next` — общий движок. В React-компонентах используем его через [react-i18next.md](react-i18next.md). Текущий язык устройства определяет [expo-localization.md](expo-localization.md). i18next просто читает результат.

> **Аналогия.** `i18next` — это «телефонная книга» приложения. Везде в коде ты вместо текста пишешь его «номер» (ключ, например `chat.empty.placeholder`). Перевод хранится в книге. Меняешь книгу — меняется язык, код менять не надо.

## Версия

- Стабильная ветка: `v26`. Также есть `v23` LTS. Для нового проекта берём `v26`.
- Совместимость с React Native + Expo — да, работает «из коробки» через стандартные пакеты `react-i18next`.
- Пиннуем `i18next>=26,<27`.

## Ключевое API

### 1. Инициализация (минимум)

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
    escapeValue: false, // в React/RN экранирование уже делает сам React
  },
});
```

- `lng` — текущий язык. На MVP жёстко `"ru"`. Позже сюда подаём результат от `expo-localization`.
- `fallbackLng` — какой язык брать, если ключ не найден в текущем.
- `resources` — структура `{ <язык>: { <неймспейс>: <словарь> } }`.

### 2. Использование `t(key)`

```ts
i18next.t("welcome");
// "Добро пожаловать"

i18next.t("greeting", { name: "Кристина" });
// "Привет, Кристина!"

i18next.t("nested.deep.key");
// "Глубоко вложенное значение"

i18next.t("item", { count: 0 }); // "Нет элементов"
i18next.t("item", { count: 1 }); // "Один элемент"
i18next.t("item", { count: 5 }); // "5 элементов"
```

### 3. Структура JSON-словаря

Стандартный формат — простой вложенный JSON:

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

- Вложенность — через объекты, ключ обращения через точку: `chat.empty.placeholder`.
- Плюрализация — через суффиксы `_one`, `_other` и т.д. (для русского правила — `_one`, `_few`, `_many`, `_other`).

### 4. Динамическое добавление ресурсов (на будущее)

```ts
i18next.addResourceBundle("en", "translation", { welcome: "Welcome" }, true, false);
```

Пригодится в Фазе 9, когда будем добавлять английский язык.

## Подводные камни

| Камень | Что делать |
|---|---|
| `init()` асинхронен. Если до `init` выполнится `t()` — вернётся ключ как есть. | Ждать инициализации перед рендером (или использовать `react-i18next` — он сам справится). |
| `interpolation.escapeValue: true` (по умолчанию) — двойное экранирование в React/RN. | В React всегда `escapeValue: false`. |
| Перепутать `lng` и `fallbackLng` — можно случайно начать показывать английские строки на русском устройстве. | На MVP оба равны `"ru"`. |
| Многоуровневые namespace'ы (`common`, `errors`) усложняют структуру без пользы для маленького проекта. | На MVP — один неймспейс `translation`. Разделение появится с ростом строк. |
| Русские плюрализации работают только при правильных суффиксах: `key_one`, `key_few`, `key_many`, `key_other`. | Использовать стандартные суффиксы CLDR. |

## Что нам важно из этой библиотеки прямо сейчас

Для **структурного скелета** Single-scenario MVP:

- `mobile/src/i18n/index.ts` — `i18next.init({ lng: "ru", fallbackLng: "ru", resources: { ru: { translation: ru } } })`.
- `mobile/src/i18n/locales/ru.json` — пустой объект `{}` или с одним тестовым ключом (например, `app.name: "UPR"`).
- Реальные строки UI добавятся в Track B (мокапы) и в Phase 2 (thin slice).
- Импорт i18n в `app/_layout.tsx`, чтобы инициализация выполнялась один раз при старте приложения.

## Ссылки

- Официальная документация: <https://www.i18next.com/>
- Configuration options: <https://www.i18next.com/overview/configuration-options>
- Plurals: <https://www.i18next.com/translation-function/plurals>
- GitHub: <https://github.com/i18next/i18next>
