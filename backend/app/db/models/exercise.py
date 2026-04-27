"""Таблица «Упражнение» (Exercise).

Справочник доступных упражнений (например, «Румынская тяга»). На
текущем шаге — пустой класс. Поля (имя, муск.группа, ссылка на видео-
демо и т.д.) появятся в Phase 2 / thin slice.
"""

from sqlmodel import Field, SQLModel


class Exercise(SQLModel, table=True):
    """Справочник упражнений. Поля будут добавлены в thin slice."""

    id: int | None = Field(default=None, primary_key=True)
