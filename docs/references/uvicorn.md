---
status: approved
last_updated: 2026-04-27
owner: Кристина
related: ../BACKEND.md, ../stack.md, fastapi.md, index.md
---

# Uvicorn — research note

Source: MCP `user-context7`, library ID `/kludex/uvicorn` (Source Reputation: High; Benchmark Score: 94.75; 242 snippets). Fetched: 2026-04-27.

## Purpose in project

ASGI server for Python: listens on port, dispatches HTTP requests to FastAPI app. Standard FastAPI server, bundled with `fastapi[standard]`.

## Version

- Stable branch `uvicorn >= 0.30`. Python 3.13 supported.
- Included in `fastapi[standard]` as extra. Standalone: `uvicorn[standard]>=0.30,<0.40`. `[standard]` extra brings `watchfiles` (for `--reload`) and `httptools` (fast HTTP parser).

## Key API

### 1. CLI launch (development)

```bash
uvicorn app.main:app --reload --port 8000
```

- `app.main:app` — Python object path: module `app.main`, variable `app`.
- `--reload` — auto-restart on file changes. Dev only; not for production.
- `--port 8000` — default 8000.
- `--host 0.0.0.0` — listen on all interfaces (required so iPhone on same Wi-Fi can reach backend on laptop). Default `127.0.0.1`.

### 2. Programmatic launch

```python
import uvicorn

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True, log_level="info")
```

Place in `backend/app/main.py` under `if __name__ == "__main__":` to enable `python -m app.main`.

### 3. `--reload` configuration

```python
uvicorn.run(
    "app.main:app",
    reload=True,
    reload_dirs=["app"],
    reload_includes=["*.py", "*.json"],
    reload_excludes=["tests/*"],
    reload_delay=0.25,
)
```

Avoids restart on test or irrelevant file changes.

### 4. Configuration source priority

1. CLI flags (`--host`, `--port`) — highest priority.
2. `uvicorn.run(...)` arguments — equal to CLI.
3. Env vars with `UVICORN_` prefix (e.g. `UVICORN_PORT=8000`) — lowest priority.

## Gotchas

| Issue | Mitigation |
|---|---|
| `--reload` incompatible with `--workers N`. | Dev: `--reload`. Prod: `--workers`. |
| Default `host=127.0.0.1` blocks remote devices (iPhone). | Dev: `--host 0.0.0.0`. |
| `--reload` uses `watchfiles`; without `[standard]` extra → less efficient fallback watcher. | Install `uvicorn[standard]`. |
| App-import errors sometimes swallowed. | On error: launch without `--reload` to surface stack trace. |
| macOS firewall may prompt on `--host 0.0.0.0`. | Approve once. |

## Skeleton scope

- `backend/pyproject.toml` declares `fastapi[standard]` (uvicorn comes as extra; no separate install needed).
- `backend/README.md` records launch command: `uvicorn app.main:app --reload --host 0.0.0.0 --port 8000` (used in hello-world next step).
- No actual launches at skeleton stage.

## Links

- Docs: <https://www.uvicorn.org/>
- Settings: <https://www.uvicorn.org/settings/>
- Deployment: <https://www.uvicorn.org/deployment/>
- GitHub: <https://github.com/encode/uvicorn>
