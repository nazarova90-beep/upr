"""Таблица «Чат упражнения» (ExerciseChat).

Связывает пользователя и упражнение с ниткой сообщений. Сообщения —
в отдельной таблице `chat_message.py`. На текущем шаге — пустой класс.
"""

from sqlmodel import Field, SQLModel


class ExerciseChat(SQLModel, table=True):
    """Чат упражнения. Поля будут добавлены в thin slice."""

    id: int | None = Field(default=None, primary_key=True)
