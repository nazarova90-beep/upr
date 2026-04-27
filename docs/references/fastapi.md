---
status: approved
last_updated: 2026-04-27
owner: Кристина
related: ../BACKEND.md, ../stack.md, sqlmodel.md, uvicorn.md, pydantic-settings.md, index.md
---

# FastAPI — research note

Source: MCP `user-context7`, library ID `/fastapi/fastapi` (Source Reputation: High; Benchmark Score: 82.27). Fetched: 2026-04-27.

## Purpose in project

Python web framework. Backbone of UPR backend: HTTP intake from mobile client, Pydantic validation, JSON responses, auto-generated `/docs`. Selected in `stack.md` as backend baseline (FastAPI, not Django).

## Version

- Current at fetch: 0.115–0.128 (stable). Minor releases can break — pin version.
- Supports Python 3.13 (3.14 added in 0.118.3, 2025-10-10).
- Pin pattern: `fastapi[standard]>=0.118.0,<0.119.0` (patches allowed, no minor bump).

## Key API

### 1. Application creation

```python
from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}
```

`FastAPI()` — application factory. Decorators `@app.get`, `@app.post`, etc. attach endpoints. Both `def` and `async def` accepted.

### 2. Module split via `APIRouter`

One `APIRouter` per domain, mounted via `include_router`:

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

In project: each domain (`workout`, `exercise_chat`, `video_analysis`, `ai_coach`) places `router = APIRouter()` in its `routes.py`, mounted from `app/main.py`. Matches `BACKEND.md` "Project structure".

### 3. Bigger-applications layout

FastAPI-recommended layout: `app` as Python package with domain subpackages (`__init__.py`). Same form as `BACKEND.md`:

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

## Gotchas

| Issue | Mitigation |
|---|---|
| Minor versions can break API (e.g. 0.115 → 0.116). | Always pin (`>=0.X.Y,<0.X+1.0`). |
| Bare `fastapi` lacks runtime deps (`uvicorn`, `python-multipart`, `email-validator`). | Install as `fastapi[standard]`. |
| Default response validation slow on large lists. | Non-critical at MVP; later use `response_model_exclude_unset=True`. |
| `def` endpoints run in thread pool — fine but don't block on long IO. | Long IO (AI calls, file reads) → `async def` + `await`. |

## Skeleton scope

- `app/main.py` — `app = FastAPI()`, no endpoints.
- `routes.py` per domain with empty `router = APIRouter()`.
- No real handlers — appears in hello-world and thin slice.

## Links

- Docs: <https://fastapi.tiangolo.com/>
- Bigger Applications: <https://fastapi.tiangolo.com/tutorial/bigger-applications/>
- Release notes: <https://fastapi.tiangolo.com/release-notes/>
- Versions and pinning: <https://fastapi.tiangolo.com/deployment/versions/>
