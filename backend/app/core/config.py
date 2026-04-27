"""Настройки приложения, читаются из переменных окружения и .env.

Реализация — через pydantic-settings, см. docs/references/pydantic-settings.md.

На текущем шаге это **заглушка**: реальные поля (database_url, gemini_api_key
и т.д.) добавятся при подключении соответствующих фичей. Сейчас здесь
лежит каркас, к которому будем дописывать поля по мере подключения
зависимостей.
"""

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Контейнер всех настроек UPR backend."""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        env_prefix="UPR_",
        case_sensitive=False,
        extra="ignore",
    )


settings = Settings()
"""Глобальный экземпляр настроек.

Импортируется как `from app.core.config import settings` в местах,
где нужны параметры окружения. Экземпляр создаётся один раз при импорте
модуля.
"""
