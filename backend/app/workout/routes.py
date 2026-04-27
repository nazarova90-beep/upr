"""HTTP-роуты домена «Тренировка».

Экспортируемый объект `router` подключается из app/main.py через
`app.include_router(router, prefix="/workouts", tags=["workout"])`.
На текущем шаге роутер пустой — эндпоинты появятся в hello-world и далее.
"""

from fastapi import APIRouter

router = APIRouter()
