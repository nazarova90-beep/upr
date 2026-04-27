"""Реализация AI-провайдера поверх Google Gemini.

На текущем шаге — пустая заглушка-наследник `AIProvider`. Реальная
интеграция (модель, ключ, формирование промптов) появится в Phase 2 /
thin slice вместе со справкой docs/references/gemini.md.
"""

from app.ai_provider.base import AIProvider


class GeminiAIProvider(AIProvider):
    """Заглушка реализации поверх Google Gemini.

    На текущем шаге методы поднимают NotImplementedError, чтобы при
    случайном использовании сразу был понятный сигнал «ещё не готово».
    """

    async def analyze_video(self, video_path: str) -> dict:
        raise NotImplementedError("GeminiAIProvider.analyze_video — заглушка, см. план Phase 2.")

    async def reply_to_chat(self, system_prompt: str, history: list[dict]) -> str:
        raise NotImplementedError("GeminiAIProvider.reply_to_chat — заглушка, см. план Phase 2.")
