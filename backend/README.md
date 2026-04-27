# UPR backend

Сервер UPR на **Python + FastAPI**. На текущий момент — **структурный скелет** (Phase 1 / Track C, см. [`../docs/exec-plans/active/phase1-track-c-skeleton.md`](../docs/exec-plans/active/phase1-track-c-skeleton.md)). Эндпоинтов нет, БД пустая, AI-провайдер — заглушка. Это намеренно: следующий шаг (отдельная задача) — рабочий hello-world.

## Зависимости

- **Python 3.13** (зафиксировано в `.python-version`).
- Внешние библиотеки — в `pyproject.toml`. Справки по каждой:
  - [FastAPI](../docs/references/fastapi.md) — веб-каркас;
  - [SQLModel](../docs/references/sqlmodel.md) — ORM + Pydantic-схемы;
  - [pydantic-settings](../docs/references/pydantic-settings.md) — настройки из `.env`;
  - [Uvicorn](../docs/references/uvicorn.md) — ASGI-сервер (идёт в `fastapi[standard]`).

## Поднять локально (для будущего hello-world)

> На сегодняшнем шаге **запускать не нужно** — пока нет ни одного эндпоинта, нечего проверять. Команды ниже — инструкция «как это будет работать», когда мы перейдём к hello-world.

```bash
cd backend

# 1. Создать виртуальное окружение (изолированную «коробку» для зависимостей).
python3.13 -m venv .venv

# 2. Активировать окружение в текущем терминале.
source .venv/bin/activate

# 3. Установить зависимости из pyproject.toml.
pip install -e ".[dev]"

# 4. Скопировать шаблон настроек и заполнить под себя.
cp .env.example .env

# 5. Запустить сервер (когда появится app/main.py с эндпоинтами).
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

После запуска интерактивная документация будет доступна на `http://localhost:8000/docs`.

## Структура

Соответствует [`../docs/BACKEND.md`](../docs/BACKEND.md) (раздел «Структура проекта»):

```
backend/
├── pyproject.toml
├── .python-version
├── .env.example
├── README.md            ← этот файл
├── app/
│   ├── main.py          # FastAPI() без эндпоинтов
│   ├── core/            # config, logging
│   ├── workout/         # домен «тренировка»
│   ├── exercise_chat/   # домен «чат упражнения»
│   ├── video_analysis/  # домен «приём и анализ видео»
│   ├── ai_coach/        # домен «логика тренера»
│   ├── ai_provider/     # абстракция AI-провайдера + заглушка Gemini
│   ├── storage/         # абстракция хранилища + локальная реализация
│   └── db/              # SQLModel-сессия + модели сущностей
└── tests/               # pytest (пока пусто)
```

## Что НЕ делаем сейчас

- Не запускаем сервер (нет эндпоинтов).
- Не создаём БД-файл (`SQLModel.metadata.create_all` ещё не вызывается).
- Не подключаем настоящие AI-провайдеры — только заглушки.
- Не пишем тесты — только структура каталога.

Всё это появится в следующих задачах: hello-world → thin slice (Phase 2).

## Связанные документы

- [`../docs/BACKEND.md`](../docs/BACKEND.md) — назначение бэкенда и принципы.
- [`../docs/stack.md`](../docs/stack.md) — почему именно FastAPI + SQLModel + SQLite.
- [`../ARCHITECTURE.md`](../ARCHITECTURE.md) — слои и домены.
- [`../docs/SECURITY.md`](../docs/SECURITY.md) — правила обращения с секретами.
