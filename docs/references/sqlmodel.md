---
status: approved
last_updated: 2026-04-27
owner: Кристина
related: ../BACKEND.md, ../DATABASE.md, ../stack.md, fastapi.md, index.md
---

# SQLModel — research-справка

> **Источник.** Собрано через MCP `user-context7`, library ID `/fastapi/sqlmodel` (Source Reputation: Medium; Benchmark Score: 72.2; 463 сниппета). Дата сбора: 2026-04-27.

## Зачем нужна в нашем проекте

SQLModel — это «один словарь моделей» для двух задач сразу: описание таблиц в БД (роль ORM, как у SQLAlchemy) **и** описание схем входа/выхода API (роль валидатора, как у Pydantic). Автор у SQLModel и FastAPI один — Себастьян Рамирез, библиотеки спроектированы работать вместе. Выбрана в [stack.md](../stack.md) как «один словарь моделей и для БД, и для будущей админки».

> **Аналогия.** Обычно в проектах нужно две схожих описания одной сущности: одна — «как это лежит в базе» (ORM), другая — «как это летает по сети в JSON» (API-схема). SQLModel делает их одной — как один паспорт, который и в самолёте годится, и в магазине.

## Версия

- На момент справки в `resolve-library-id` указана версия `0_0_24` — то есть SQLModel ещё в pre-1.0. Это нормально для библиотеки такого зрелого автора.
- Для нашего MVP пиннуем как `sqlmodel>=0.0.24,<0.1.0`.
- Совместимость с Python 3.13 — да (требует Python 3.7+, новые версии ходят за свежим SQLAlchemy 2.0+).

## Ключевое API

### 1. Описание таблицы

```python
from sqlmodel import Field, SQLModel


class Hero(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str
    secret_name: str
    age: int | None = None
```

- Класс наследует `SQLModel`.
- `table=True` — это **именно таблица в БД** (без него — просто схема для API).
- `id: int | None = Field(default=None, primary_key=True)` — стандартный паттерн автоинкремента: до сохранения в базу `id` равен `None`, после — числу.

### 2. Field() для всех настроек поля

```python
class Product(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    sku: str = Field(unique=True)
    category_id: int | None = Field(default=None, foreign_key="category.id")
    description: str | None = Field(default=None, max_length=500)
```

Через `Field()` задаются: индексы, уникальность, foreign keys (`"category.id"` — таблица.поле), длина строк, валидаторы (`ge=0`, `le=5`), nullable.

### 3. Связи между таблицами

```python
from sqlmodel import Relationship


class Team(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str
    heroes: list["Hero"] = Relationship(back_populates="team")


class Hero(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str
    team_id: int | None = Field(default=None, foreign_key="team.id")
    team: Team | None = Relationship(back_populates="heroes")
```

`Relationship(back_populates=...)` создаёт двунаправленную связь. Это **не колонка в БД**, а удобный доступ к связанным записям.

### 4. Engine и создание таблиц

```python
from sqlmodel import SQLModel, create_engine


engine = create_engine("sqlite:///database.db")


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)
```

- `create_engine(...)` — точка подключения к БД. Для SQLite — путь к файлу. Для PostgreSQL — `postgresql://...`. **Смена SQLite → PostgreSQL — это смена строки**, как обещано в [stack.md](../stack.md).
- `SQLModel.metadata.create_all(engine)` — создаёт все таблицы, если их нет. На MVP этого достаточно. На этапе бета — миграции через Alembic (см. [DATABASE.md](../DATABASE.md)).

## Подводные камни

| Камень | Что делать |
|---|---|
| SQLModel — pre-1.0, минорные версии могут менять API. | Пиннить версию. |
| `table=True` обязательно для таблиц БД. Без него класс — просто Pydantic-схема и в БД не попадёт. | Помнить разделение: таблица vs API-схема. |
| `id: int | None` обязательно `Optional`, иначе Pydantic будет требовать `id` при создании объекта — а его до записи в базу нет. | Использовать стандартный паттерн `id: int | None = Field(default=None, primary_key=True)`. |
| `metadata.create_all` НЕ обновляет существующие таблицы при изменении модели — только создаёт отсутствующие. | На этапе MVP можно сносить файл `database.db` руками. На бете — переход на Alembic. |

## Что нам важно из этой библиотеки прямо сейчас

Для **структурного скелета**:
- по одному файлу на сущность в `backend/app/db/models/`;
- внутри — пустой класс с `table=True` без полей (или с одним `id`-полем для синтаксической корректности);
- реальные поля наполняются позже, при thin slice (Phase 2).

## Ссылки

- Официальная документация: <https://sqlmodel.tiangolo.com/>
- Tutorial: <https://sqlmodel.tiangolo.com/tutorial/>
- Релизы: <https://github.com/fastapi/sqlmodel/releases>
