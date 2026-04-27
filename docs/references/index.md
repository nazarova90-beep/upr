---
status: in-progress
last_updated: 2026-04-27
owner: Кристина
related: ../../AGENTS.md, ../design-docs/core-beliefs.md
---

# References — внешние референсы

Здесь хранятся **дампы и выжимки внешней документации**, которые нужны для работы над проектом:

- документация сторонних библиотек (через MCP `user-context7`);
- ресерчи рынка и анализ конкурентов;
- ссылки на статьи и материалы, которыми вдохновляемся;
- LLM-friendly выжимки больших документов.

> **Зачем это нужно:** мы хотим, чтобы агент мог работать **автономно**, не лазая в интернет каждый раз. Если в проекте используется библиотека X — её ключевые правила должны лежать здесь.

## Документы

| Файл | Статус | О чём |
|---|---|---|
| `expo.md` | approved | Research-справка по Expo (React Native): что работает в Expo Go, когда нужен dev build, что нужно установить локально. Собрана через MCP `user-context7`. На её основе **2026-04-19 принято решение** о выборе стека frontend = React Native + Expo (TypeScript). |
| `expo-router.md` | approved | Маршрутизация по структуре папок (`app/_layout.tsx`, `app/index.tsx`, `app/chat/[exerciseId].tsx`). Идёт в комплекте с Expo SDK 54. Используется в `mobile/`. |
| `i18next.md` | approved | Движок переводов: `i18next.init({ lng, fallbackLng, resources })`, функция `t(key)`, JSON-словари, плюрализация. Версия 26+. |
| `react-i18next.md` | approved | «Мост» между i18next и React-компонентами: `initReactI18next`, хук `useTranslation`, компонент `<Trans>`. Используется в `mobile/`. |
| `expo-localization.md` | approved | Чтение языковых и региональных настроек устройства: `getLocales()`, интеграция с `i18next` для определения языка на старте. Идёт в комплекте с Expo SDK 54. |
| `fastapi.md` | approved | Каркас веб-сервера на Python: `FastAPI()`, `APIRouter`, структура «Bigger Applications». Версия 0.118+. Используется в `backend/`. |
| `sqlmodel.md` | approved | ORM + Pydantic в одном: класс с `table=True`, `Field()`, `Relationship`, `create_engine`. Версия 0.0.24+. Используется в `backend/app/db/`. |
| `pydantic-settings.md` | approved | Настройки приложения из `.env` и переменных окружения через `BaseSettings`. Версия 2.x. Используется в `backend/app/core/config.py`. |
| `uvicorn.md` | approved | ASGI-сервер для запуска FastAPI: `uvicorn app.main:app --reload --host 0.0.0.0 --port 8000`. Идёт в `fastapi[standard]`. |

## Будущие документы (примеры)

- `harness-engineering-openai.md` — выжимка статьи OpenAI про подход к работе с агентами.
- `competitor-research.md` — детальный анализ конкурентов (Gymscore, Formax и др.).
- `gemini.md` — справка по Google Gemini Vision API (появится в Phase 2 / thin slice).
- `mediapipe.md` — справка по MediaPipe Pose (появится при подключении в Phase 2).
- `expo-image-picker.md`, `expo-video.md`, `expo-file-system.md` — добавятся при подключении (Phase 2 / thin slice).

## Правила добавления

Перед использованием **любой** сторонней библиотеки:

1. Получаем актуальную документацию через MCP `user-context7`.
2. Создаём файл `references/<library-name>.md` со структурой:
   - назначение библиотеки в нашем проекте;
   - версия;
   - ключевые API и примеры;
   - подводные камни и best practices;
   - ссылка на полную документацию.
3. Только после этого пишем код, использующий библиотеку.

См. правило в `../design-docs/core-beliefs.md` пункт «Перед использованием библиотеки — Context7».
