"""Создание SQLModel engine и фабрика сессий.

На текущем шаге — заглушка. Реальный engine будет создаваться через
`create_engine(settings.database_url)` при подключении первого
эндпоинта (hello-world / thin slice). Также сюда добавится зависимость
`get_session()` для FastAPI.

См. docs/references/sqlmodel.md, раздел «Engine и создание таблиц».
"""

from sqlmodel import SQLModel  # noqa: F401  (импорт зарезервирован под будущий create_all)

engine = None
"""Будущий SQLAlchemy engine.

На текущем шаге — `None`. При подключении БД здесь появится
`create_engine(settings.database_url, echo=False)`.
"""
