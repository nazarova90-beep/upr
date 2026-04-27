"""Таблица «Анализ видео» (VideoAnalysis).

Хранит метаданные видео (ключ в storage, ссылка на упражнение/
тренировку) и результат анализа AI-провайдером. На текущем шаге —
пустой класс.
"""

from sqlmodel import Field, SQLModel


class VideoAnalysis(SQLModel, table=True):
    """Анализ видео. Поля будут добавлены в thin slice."""

    id: int | None = Field(default=None, primary_key=True)
