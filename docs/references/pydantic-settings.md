---
status: approved
last_updated: 2026-04-27
owner: Кристина
related: ../BACKEND.md, ../stack.md, ../SECURITY.md, fastapi.md, index.md
---

# pydantic-settings — research-справка

> **Источник.** Собрано через MCP `user-context7`, library ID `/pydantic/pydantic-settings` (Source Reputation: High; Benchmark Score: 86.87). Дата сбора: 2026-04-27.

## Зачем нужна в нашем проекте

`pydantic-settings` — стандартный (и «boring») способ читать настройки приложения **из переменных окружения** и `.env`-файла, **с проверкой типов**. Это критично для UPR по двум причинам:

1. **Секреты** (Gemini API key, токены БД когда появятся) — никогда не коммитятся в код, они приходят через `.env`. Это требование из [SECURITY.md](../SECURITY.md).
2. **Замена окружения без изменения кода**: «локально» vs «бета на Render» vs «продакшн» — это разные `.env`-файлы; код один и тот же. Это [stack.md](../stack.md), принцип «замена без переписывания».

> **Аналогия.** `pydantic-settings` — это «панель приборов» приложения. Все «крутилки» (URL базы, секреты, флаги отладки) собраны в одном месте, у каждой написан тип («только число», «только URL»), и приложение откажется стартовать, если что-то заполнено неправильно.

## Версия

- Стабильная ветка `pydantic-settings >= 2.0` (на момент справки — 2.x). Совместима с Pydantic v2 (а Pydantic v2 — это то, что использует FastAPI 0.118+).
- Совместимость с Python 3.13 — да (требует Python 3.9+).
- Пиннуем `pydantic-settings>=2.0,<3.0`.

## Ключевое API

### 1. Минимальный класс настроек

```python
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    database_url: str
    debug: bool = False
```

- Наследуем `BaseSettings`.
- `model_config` — конфигурация загрузки. Здесь: читать из `.env`, в кодировке utf-8, игнорировать «лишние» переменные.
- Поля без значения по умолчанию (`database_url: str`) — **обязательные**: если их нет в `.env` или окружении, приложение упадёт со внятной ошибкой при старте.
- Поля с дефолтом (`debug: bool = False`) — необязательные.

### 2. Префикс для переменных окружения

```python
class AppSettings(BaseSettings):
    model_config = SettingsConfigDict(
        env_prefix="UPR_",
        case_sensitive=False,
        env_file=".env",
    )

    database_url: str
    gemini_api_key: str
```

С `env_prefix="UPR_"` поле `database_url` ожидает переменную `UPR_DATABASE_URL` — это защищает от конфликтов с системными переменными.

### 3. Несколько `.env`-файлов с приоритетом

```python
class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=(".env", ".env.prod"),
    )

    database_url: str
    debug: bool
```

В кортеже более поздние файлы перекрывают более ранние. Полезно для слоистой конфигурации в будущем (`.env` базовый + `.env.prod` поверх).

### 4. Приоритет источников значений

Документация Context7 явно фиксирует: **переменные окружения всегда побеждают значения из `.env`-файла**. Это удобно для CI/CD: в проде `.env` может вовсе отсутствовать, всё прилетит через переменные окружения хостинга.

## Подводные камни

| Камень | Что делать |
|---|---|
| Без `extra="ignore"` лишнее поле в `.env` (например, переменная другого приложения) роняет валидацию. | Всегда выставлять `extra="ignore"` для `.env`-файлов. |
| `case_sensitive=False` по умолчанию — `Database_Url` и `DATABASE_URL` равнозначны. | Помнить при отладке: имя переменной нечувствительно к регистру. |
| Тяжёлые типы (`PostgresDsn`, `RedisDsn`) валидируют URL по схеме — удобно, но требует точного синтаксиса. | На MVP с SQLite используем простой `str`; типизированные DSN — позже. |
| Объект `Settings()` создаётся каждый раз заново при импорте. | Создавать **один** глобальный объект, например `settings = Settings()` в `app/core/config.py`, и импортировать его в других модулях. |

## Что нам важно из этой библиотеки прямо сейчас

Для **структурного скелета**:
- `backend/app/core/config.py` — класс `Settings(BaseSettings)`-заглушка с `model_config` (`env_file=".env"`, `extra="ignore"`) и одним полем-комментарием «здесь будет `database_url` и т.д.»;
- `backend/.env.example` — шаблон без секретов с описанием полей;
- реальные поля настроек (`gemini_api_key`, `database_url`) добавятся в hello-world / thin slice.

## Ссылки

- Официальная документация: <https://docs.pydantic.dev/latest/concepts/pydantic_settings/>
- GitHub: <https://github.com/pydantic/pydantic-settings>
- Главная Pydantic: <https://docs.pydantic.dev/>
