# UPR backend

Python + FastAPI server. Status: structural skeleton only (Phase 1 / Track C — see `../docs/exec-plans/completed/2026-04-27-phase1-track-c-skeleton.md`). No endpoints, empty DB, stub AI provider. Next step: hello-world.

## Dependencies

- Python 3.13 (pinned in `.python-version`).
- External libs declared in `pyproject.toml`. References:
  - FastAPI → `../docs/references/fastapi.md`
  - SQLModel → `../docs/references/sqlmodel.md`
  - pydantic-settings → `../docs/references/pydantic-settings.md`
  - Uvicorn → `../docs/references/uvicorn.md` (bundled with `fastapi[standard]`)

## Local launch (future hello-world)

Skeleton stage: do not launch (no endpoints to hit). Commands below are the contract for hello-world step.

```bash
cd backend

python3.13 -m venv .venv
source .venv/bin/activate
pip install -e ".[dev]"
cp .env.example .env
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Interactive docs: `http://localhost:8000/docs`.

## Structure

Matches `../docs/BACKEND.md` "Project structure":

```
backend/
├── pyproject.toml
├── .python-version
├── .env.example
├── README.md
├── app/
│   ├── main.py          # FastAPI() without endpoints
│   ├── core/            # config, logging
│   ├── workout/         # domain
│   ├── exercise_chat/   # domain
│   ├── video_analysis/  # domain
│   ├── ai_coach/        # domain
│   ├── ai_provider/     # adapter + Gemini stub
│   ├── storage/         # adapter + local impl
│   └── db/              # SQLModel session + entity models
└── tests/               # pytest (empty)
```

## Out of scope at skeleton stage

- No server launch (no endpoints).
- No DB file creation (`SQLModel.metadata.create_all` not called).
- No real AI providers (stubs only).
- No tests (folders only).

Adopted in: hello-world → thin slice (Phase 2).

## Related

- `../docs/BACKEND.md` — backend purpose and principles.
- `../docs/stack.md` — FastAPI + SQLModel + SQLite rationale.
- `../ARCHITECTURE.md` — layers and domains.
- `../docs/SECURITY.md` — secret handling rules.
