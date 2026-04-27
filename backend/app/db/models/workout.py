"""Таблица «Тренировка» (Workout).

Одна запись = одна тренировка пользователя. Содержит ссылки на
упражнения и подходы. На текущем шаге — пустой класс.
"""

from sqlmodel import Field, SQLModel


class Workout(SQLModel, table=True):
    """Тренировка пользователя. Поля будут добавлены в thin slice."""

    id: int | None = Field(default=None, primary_key=True)
