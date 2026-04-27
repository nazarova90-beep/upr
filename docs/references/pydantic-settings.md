---
status: approved
last_updated: 2026-04-27
owner: Кристина
related: ../BACKEND.md, ../stack.md, ../SECURITY.md, fastapi.md, index.md
---

# pydantic-settings — research note

Source: MCP `user-context7`, library ID `/pydantic/pydantic-settings` (Source Reputation: High; Benchmark Score: 86.87). Fetched: 2026-04-27.

## Purpose in project

Type-checked load of application settings from environment variables and `.env` files. Required for:

1. **Secrets** (Gemini API key, future DB tokens) — never committed; arrive via `.env`. Required by `SECURITY.md`.
2. **Environment swap without code change**: local vs Render-beta vs production differ by `.env`, code unchanged. `stack.md` "replaceable without rewrite" principle.

## Version

- Stable `pydantic-settings >= 2.0` (compatible with Pydantic v2 used by FastAPI 0.118+).
- Python 3.13 supported (requires 3.9+).
- Pin pattern: `pydantic-settings>=2.0,<3.0`.

## Key API

### 1. Minimal settings class

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

- Subclass `BaseSettings`.
- `model_config` — load configuration. Here: read `.env`, utf-8, ignore extra vars.
- Fields without default (`database_url: str`) — required: missing → app fails at start with clear error.
- Fields with default (`debug: bool = False`) — optional.

### 2. Env-var prefix

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

With `env_prefix="UPR_"`, field `database_url` reads `UPR_DATABASE_URL` — avoids conflicts with system env vars.

### 3. Multiple `.env` files with priority

```python
class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=(".env", ".env.prod"),
    )

    database_url: str
    debug: bool
```

Later files in tuple override earlier (e.g. `.env` base + `.env.prod` overlay).

### 4. Source priority

Environment variables always win over `.env` file values. Useful in CI/CD: prod may have no `.env`; values come via hosting env-vars.

## Gotchas

| Issue | Mitigation |
|---|---|
| Without `extra="ignore"`, foreign vars in `.env` fail validation. | Always set `extra="ignore"` on `.env`-backed configs. |
| `case_sensitive=False` by default — `Database_Url` ≡ `DATABASE_URL`. | Remember for debugging. |
| Heavy types (`PostgresDsn`, `RedisDsn`) validate URL syntax. | MVP on SQLite: use `str`; typed DSN later. |
| `Settings()` re-instantiates on each call. | Create one global object (`settings = Settings()` in `app/core/config.py`) and import. |

## Skeleton scope

- `backend/app/core/config.py` — `Settings(BaseSettings)` stub with `model_config` (`env_file=".env"`, `extra="ignore"`) + placeholder for `database_url` etc.
- `backend/.env.example` — template, no secrets, with field descriptions.
- Real fields (`gemini_api_key`, `database_url`) added in hello-world / thin slice.

## Links

- Docs: <https://docs.pydantic.dev/latest/concepts/pydantic_settings/>
- GitHub: <https://github.com/pydantic/pydantic-settings>
- Pydantic: <https://docs.pydantic.dev/>
