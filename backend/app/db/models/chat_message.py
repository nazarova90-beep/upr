"""Таблица «Сообщение чата» (ChatMessage).

Одна запись = одно сообщение в чате упражнения (от пользователя или от
ассистента). Связана с `ExerciseChat` через foreign key (будет добавлено
в thin slice). На текущем шаге — пустой класс.
"""

from sqlmodel import Field, SQLModel


class ChatMessage(SQLModel, table=True):
    """Сообщение чата. Поля будут добавлены в thin slice."""

    id: int | None = Field(default=None, primary_key=True)
