"""SQLModel-таблицы UPR.

Каждая сущность — отдельный модуль. Импорт из `app.db.models` сам
по себе пуст; при подключении БД сюда же добавятся реэкспорты, чтобы
`SQLModel.metadata.create_all(engine)` находил все таблицы.

Список сущностей задан в docs/exec-plans/active/EP-mvp-product-spec.md,
раздел A.4: Exercise, Workout, ExerciseChat, ChatMessage, VideoAnalysis.

User-сущности в MVP **нет** — пользователь захардкожен (см. roadmap.md).
"""
