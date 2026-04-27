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

## Documents

| File | Status | Subject |
|---|---|---|
| `expo.md` | approved | Expo (React Native) research note: Expo Go support matrix, when Dev Build is required, local setup. Source: MCP `user-context7`. Basis for 2026-04-19 stack decision (RN + Expo TS). |
| `expo-router.md` | approved | File-based routing (`app/_layout.tsx`, `app/index.tsx`, `app/chat/[exerciseId].tsx`). Bundled with Expo SDK 54. Used in `mobile/`. |
| `i18next.md` | approved | Translation engine: `i18next.init({ lng, fallbackLng, resources })`, `t(key)`, JSON dictionaries, pluralization. Version 26+. |
| `react-i18next.md` | approved | i18next ↔ React bridge: `initReactI18next`, `useTranslation` hook, `<Trans>` component. Used in `mobile/`. |
| `expo-localization.md` | approved | Device locale: `getLocales()`, i18next integration for boot-time language detection. Bundled with Expo SDK 54. |
| `fastapi.md` | approved | Python web framework: `FastAPI()`, `APIRouter`, "Bigger Applications" layout. Version 0.118+. Used in `backend/`. |
| `sqlmodel.md` | approved | ORM + Pydantic combined: class with `table=True`, `Field()`, `Relationship`, `create_engine`. Version 0.0.24+. Used in `backend/app/db/`. |
| `pydantic-settings.md` | approved | Settings via `.env` / env-vars through `BaseSettings`. Version 2.x. Used in `backend/app/core/config.py`. |
| `uvicorn.md` | approved | ASGI server for FastAPI: `uvicorn app.main:app --reload --host 0.0.0.0 --port 8000`. Bundled with `fastapi[standard]`. |

## Planned

- `harness-engineering-openai.md` — digest of OpenAI Harness Engineering article.
- `competitor-research.md` — detailed competitor analysis (Gymscore, Formax, …).
- `gemini.md` — Google Gemini Vision API ref (Phase 2 / thin slice).
- `mediapipe.md` — MediaPipe Pose ref (Phase 2).
- `expo-image-picker.md`, `expo-video.md`, `expo-file-system.md` — added as adopted (Phase 2 / thin slice).

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
