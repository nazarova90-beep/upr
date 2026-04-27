---
status: in-progress
last_updated: 2026-04-27
owner: Кристина
related: ../../AGENTS.md, ../design-docs/core-beliefs.md
---

# References

Dumps and digests of external documentation needed for autonomous agent work:

- third-party library documentation (via MCP `user-context7`);
- market research and competitor analysis;
- inspirational article links;
- LLM-friendly digests of large documents.

If a library is used in the project, its key rules must live here.

## Active

| File | Status | Subject |
|---|---|---|
| `i18next.md` | approved | Translation engine: `i18next.init({ lng, fallbackLng, resources })`, `t(key)`, JSON dictionaries, pluralization. Version 26+. |
| `react-i18next.md` | approved | i18next ↔ React bridge: `initReactI18next`, `useTranslation` hook, `<Trans>` component. Web client (formerly mobile). |
| `react.md` | approved | UI library: `createRoot` + `<StrictMode>` entry, function components with TS props, hooks (`useState`, `useEffect`), `lazy` + `<Suspense>`. Version 19.2+. |
| `fastapi.md` | approved | Python web framework: `FastAPI()`, `APIRouter`, "Bigger Applications" layout. Version 0.118+. Used in `backend/`. |
| `sqlmodel.md` | approved | ORM + Pydantic combined: class with `table=True`, `Field()`, `Relationship`, `create_engine`. Version 0.0.24+. Used in `backend/app/db/`. |
| `pydantic-settings.md` | approved | Settings via `.env` / env-vars through `BaseSettings`. Version 2.x. Used in `backend/app/core/config.py`. |
| `uvicorn.md` | approved | ASGI server for FastAPI: `uvicorn app.main:app --reload --host 0.0.0.0 --port 8000`. Bundled with `fastapi[standard]`. |

## Deprecated

Plans superseded by `../exec-plans/active/2026-04-27-pivot-to-web.md`. Files moved to `deprecated/` and kept as historical record.

| File | Status | Subject |
|---|---|---|
| `deprecated/expo.md` | deprecated | Expo (React Native) research note. Replaced by web stack (`vite`, `react`). |
| `deprecated/expo-router.md` | deprecated | Expo Router (file-based routing). Replacement: `react-router-dom` (planned). |
| `deprecated/expo-localization.md` | deprecated | `expo-localization` (device locale on RN). Replacement: `i18next-browser-languagedetector` (planned). |

## Planned

Required before code that uses these libraries (Rule §3 of `core-beliefs.md`).

### Web pivot follow-ups (high priority)

- `vite.md` — Vite. Web build tool / dev server. `vite.config.ts` proxy `/api/*` → `localhost:8000`.
- `react-router.md` — `react-router-dom`. Routing for web client.
- `i18next-browser-languagedetector.md` — Browser locale detection. Replaces `expo-localization`.

### Phase 2 / thin slice

- `gemini.md` — Google Gemini Vision API.
- `mediapipe.md` — MediaPipe Pose (server-side).

### Conditional / on-demand

- `cloudflared.md` — only if owner adopts Cloudflare Tunnel for iPhone testing.
- `mediapipe-tasks-vision.md` — Phase 3 (optional on-device pose estimation in browser).

### Background reading (no code dependency)

- `harness-engineering-openai.md` — digest of OpenAI Harness Engineering article.
- `competitor-research.md` — detailed competitor analysis (Gymscore, Formax, …).

## Adding a reference

Required before using any third-party library:

1. Fetch current docs via MCP `user-context7`.
2. Create `references/<library-name>.md` with:
   - purpose in this project;
   - version;
   - key API + examples;
   - gotchas and best practices;
   - source link.
3. Only then write code that uses the library.

Rule: `../design-docs/core-beliefs.md` § 4.
