"""Абстрактный интерфейс AI-провайдера.

Бизнес-логика приложения (`exercise_chat`, `video_analysis`, `ai_coach`)
зависит **только** от этого интерфейса, а не от конкретной модели.
Конкретные реализации (Gemini, GPT, Claude) реализуют методы класса
`AIProvider`. На текущем шаге сигнатуры методов — заглушки; точные
типы аргументов и ответа уточним при подключении первой реализации.
"""

from abc import ABC, abstractmethod


class AIProvider(ABC):
    """Контракт всех AI-провайдеров.

    Все методы — асинхронные, чтобы не блокировать event loop FastAPI
    на сетевых вызовах.
    """

    @abstractmethod
    async def analyze_video(self, video_path: str) -> dict:
        """Проанализировать видеофайл и вернуть структурированный отчёт.

        На текущем шаге сигнатура и формат ответа — это заглушка.
        Уточнится при подключении Gemini.
        """
        raise NotImplementedError

    @abstractmethod
    async def reply_to_chat(self, system_prompt: str, history: list[dict]) -> str:
        """Сгенерировать ответ ассистента на сообщение в чате упражнения.

        На текущем шаге сигнатура — заглушка.
        """
        raise NotImplementedError
