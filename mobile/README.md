# UPR — мобильное приложение (skeleton)

Это **структурный скелет** мобильного клиента UPR на React Native + Expo (TypeScript). Сейчас здесь только каркас: экраны-заглушки, токены дизайн-системы Lucent и инфраструктура i18n. Реального UI и обращений к бэкенду ещё нет — это следующая задача (hello-world).

## Стек

- **Expo SDK 54** + **React Native 0.81** — фреймворк (см. [`docs/references/expo.md`](../docs/references/expo.md)).
- **TypeScript** — язык.
- **expo-router** — файловая навигация: один файл в `app/` = один экран (см. [`docs/references/expo-router.md`](../docs/references/expo-router.md)).
- **i18next** + **react-i18next** + **expo-localization** — переводы и определение языка устройства (см. соответствующие справки в `docs/references/`).

## Структура

```
mobile/
├── app/                    # экраны (expo-router)
│   ├── _layout.tsx         # корневой layout, инициализирует i18n
│   ├── index.tsx           # экран тренировки (заглушка), маршрут `/`
│   └── chat/
│       └── [exerciseId].tsx  # экран чата, маршрут `/chat/<id>`
├── src/
│   ├── theme/              # токены Lucent (цвета, отступы, радиусы, типографика)
│   ├── i18n/               # init i18next + словари ru/en
│   ├── domain/             # TS-типы (зеркало backend-моделей)
│   ├── components/         # переиспользуемые UI-компоненты (пусто)
│   └── api/                # HTTP-клиент к бэку (пусто)
├── assets/                 # иконки, splash (сгенерировано create-expo-app)
├── app.json                # конфиг Expo
└── package.json
```

Алиас путей: `~/foo` → `src/foo` (см. `tsconfig.json`).

## Запуск (для будущих шагов)

> Пока **не делаем** — это часть следующей задачи (hello-world). Сейчас здесь только зависимости в `package.json`, чтобы они закоммитились и были видимы AI-агенту.

```bash
cd mobile
npm install
npx expo start
```

Затем — открыть приложение **Expo Go** на iPhone (тот же Wi-Fi, что и Mac), отсканировать QR-код из терминала.

## Что НЕ включено в этом коммите

- Шрифт **Manrope** — отдельный шаг через `expo-font`.
- Иконки **Material Symbols Rounded** — отдельный шаг.
- HTTP-клиент к бэкенду — Phase 2.
- Реальные строки UI на русском — появятся вместе с UI.

## Связанные документы

- [`docs/FRONTEND.md`](../docs/FRONTEND.md) — общее описание мобильного клиента.
- [`docs/ui/design-system/README.md`](../docs/ui/design-system/README.md) — Lucent (источник дизайн-токенов).
- [`docs/exec-plans/active/phase1-track-c-skeleton.md`](../docs/exec-plans/active/phase1-track-c-skeleton.md) — план этого этапа.
