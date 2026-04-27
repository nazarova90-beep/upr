"""Точка входа в FastAPI-приложение.

На текущем шаге (Phase 1 / Track C — структурный скелет) приложение
создаётся пустым: эндпоинты и роутеры ещё не подключены. См. план:
docs/exec-plans/active/phase1-track-c-skeleton.md.

Следующая задача (hello-world) подключит сюда:
- роутер /health для проверки живости;
- include_router из app/workout/, app/exercise_chat/ и т.д.
"""

from fastapi import FastAPI

app = FastAPI(
    title="UPR backend",
    version="0.0.1",
    description=(
        "Структурный скелет (Phase 1 / Track C). Эндпоинты появятся "
        "в следующих задачах."
    ),
)
