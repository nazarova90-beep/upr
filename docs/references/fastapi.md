---
status: approved
last_updated: 2026-04-27
owner: Кристина
related: ../BACKEND.md, ../stack.md, sqlmodel.md, uvicorn.md, pydantic-settings.md, index.md
---

# FastAPI — research-справка

> **Источник.** Собрано через MCP `user-context7`, library ID `/fastapi/fastapi` (Source Reputation: High; Benchmark Score: 82.27). Дата сбора: 2026-04-27.

## Зачем нужна в нашем проекте

FastAPI — каркас веб-сервера на Python. Это **главная библиотека бэкенда UPR**: она принимает HTTP-запросы от мобильного клиента, валидирует входные данные через Pydantic, отдаёт JSON-ответы, автоматически генерирует интерактивную документацию `/docs`. Выбрана в [stack.md](../stack.md) как baseline бэкенда (см. раздел «Почему именно эти варианты, а не другие» — почему FastAPI, а не Django).

> **Аналогия.** FastAPI — это «администратор на ресепшене»: принимает запрос от клиента, проверяет, что заполнены нужные поля, передаёт нужному отделу (роутеру), забирает ответ и выдаёт обратно.

## Версия

- На момент справки актуальные версии: 0.115–0.128 (стабильная ветка). В [release notes](https://fastapi.tiangolo.com/release-notes/) виден строгий semver: минорные версии могут содержать ломающие изменения, поэтому версию **пинуем**.
- **Поддерживает Python 3.13** (с релиза 0.118.3 от 2025-10-10 добавлена поддержка 3.14, наша 3.13 поддерживается давно).
- Рекомендация официальной документации: пиннинг через `fastapi[standard]>=0.118.0,<0.119.0` (минор разрешён к патчам, мажор — нет).

## Ключевое API

### 1. Создание приложения

```python
from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}
```

`FastAPI()` — фабрика приложения. Декораторы `@app.get`, `@app.post` и т.д. навешивают эндпоинты. Можно использовать `def` (синхронный) или `async def` (асинхронный) — FastAPI принимает оба варианта.

### 2. Разделение по модулям через `APIRouter`

Для большого проекта (как наш — несколько доменов) создаём по `APIRouter` на каждый домен и подключаем через `include_router`:

```python
from fastapi import APIRouter

router = APIRouter()


@router.get("/items/")
async def list_items():
    return [{"id": 1, "name": "Item 1"}]
```

```python
app.include_router(router, prefix="/api/items", tags=["items"])
```

**В нашем проекте** каждый домен (`workout`, `exercise_chat`, `video_analysis`, `ai_coach`) кладёт свой `router = APIRouter()` в `routes.py` и подключается из `app/main.py` — это соответствует [BACKEND.md](../BACKEND.md), раздел «Структура проекта».

### 3. Структура «Bigger Applications»

Из официальной документации FastAPI рекомендуется структура с `app` как python-пакетом, подкаталогами-доменами с `__init__.py`. Это **ровно та форма**, что у нас в [BACKEND.md](../BACKEND.md):

```
app/
├── __init__.py
├── main.py
├── core/
├── workout/
│   ├── __init__.py
│   ├── routes.py
│   ├── service.py
│   └── models.py
└── ...
```

## Подводные камни

| Камень | Что делать |
|---|---|
| FastAPI меняет API между минорными версиями (например, 0.115 → 0.116). | Всегда пиннить версию (`>=0.X.Y,<0.X+1.0`). |
| `fastapi` без extras — голая библиотека. Для запуска нужны `uvicorn`, `python-multipart`, `email-validator`. | Ставить как `fastapi[standard]` — пакет включает рекомендуемые extras. |
| По умолчанию валидация ответа — медленная при больших списках. | На MVP не критично; на стадии оптимизации использовать `response_model_exclude_unset=True`. |
| Эндпоинты с `def` (без `async`) выполняются в thread pool — это нормально, но не блокировать долгими IO. | Долгие IO (вызов AI, чтение файлов) — только через `async def` + `await`. |

## Что нам важно из этой библиотеки прямо сейчас

Для **структурного скелета**:
- `app/main.py` — `app = FastAPI()` без эндпоинтов;
- по `routes.py` с `router = APIRouter()` (пустым) в каждом домене;
- никаких реальных хендлеров — это уже логика, которая появится в hello-world и thin slice.

## Ссылки

- Официальная документация: <https://fastapi.tiangolo.com/>
- Bigger Applications: <https://fastapi.tiangolo.com/tutorial/bigger-applications/>
- Release notes: <https://fastapi.tiangolo.com/release-notes/>
- Versions and pinning: <https://fastapi.tiangolo.com/deployment/versions/>
