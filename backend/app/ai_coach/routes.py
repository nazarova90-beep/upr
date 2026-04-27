"""HTTP-роуты домена «AI-тренер».

Возможно, отдельных роутов у этого домена не будет — он работает
«внутри» exercise_chat и video_analysis. Файл создан для симметрии
структуры; если эндпоинты так и не появятся, файл можно будет
удалить вместе с include_router.
"""

from fastapi import APIRouter

router = APIRouter()
