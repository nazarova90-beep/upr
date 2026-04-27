---
status: approved
last_updated: 2026-04-27
owner: Кристина
related: ../FRONTEND.md, ../stack.md, react.md, ../BACKEND.md, fastapi.md, index.md
---

# Vite — research note

Source: MCP `user-context7`, library ID `/vitejs/vite` (Source Reputation: High; Benchmark Score: 83.89; 667 snippets). Fetched: 2026-04-27.

## Purpose in project

Build tool and dev server for the web client. Replaces classic bundler stacks (webpack, CRA). Two roles in this project:

1. **Dev server** at `http://localhost:5173` with HMR (Hot Module Replacement — code reloads in the browser without losing state).
2. **Production build** to `web/dist/` (static files: HTML, JS, CSS, assets) for later static hosting (Phase 5: Cloudflare Pages / Vercel / Netlify).

Pairs with `react.md` (UI), TypeScript (language), `react-i18next.md` (i18n). Selected in `stack.md` and pivot plan `exec-plans/active/2026-04-27-pivot-to-web.md`.

## Version

- Latest stable at fetch: **8.0** (Context7 lists `v7.3.1` and `v8.0.7`).
- Requires Node.js LTS — Node 20+ in 2026.
- Pin pattern: `"vite": "^8.0.0"` (i.e. `>=8.0.0,<9.0.0`). Plugin pinned together: `"@vitejs/plugin-react": "^X"` (latest matching plugin major). Major bump (`9.x`) requires re-reading docs first.

## Key API

### 1. Project scaffolding

One-time, only when creating `web/`:

```bash
npm create vite@latest web -- --template react-ts
cd web
npm install
npm install @vitejs/plugin-react
```

`react-ts` template = React + TypeScript pre-wired (`vite-env.d.ts`, `tsconfig.json`, `index.html` with `<div id="root"></div>` and `<script type="module" src="/src/main.tsx">`).

### 2. `package.json` scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

- `vite` — dev server with HMR (`localhost:5173`).
- `vite build` — production build into `dist/`.
- `vite preview` — serve `dist/` locally to verify the production bundle before deploying.

### 3. `vite.config.ts` — proxy `/api/*` to FastAPI

```ts
// web/vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
      },
    },
  },
});
```

- `plugins: [react()]` — enables JSX/TSX, Fast Refresh.
- `server.port: 5173` + `strictPort: true` — fail if 5173 is busy instead of silently switching ports (consistent dev URL).
- `server.proxy["/api"]` — every request from the browser to `/api/...` is forwarded by Vite to FastAPI at `http://localhost:8000/...`. **No `rewrite`** — backend routes themselves are mounted under `/api/...` (`fastapi.md` "Bigger Applications layout" shows `prefix="/api/items"`), so the prefix must be preserved.
- `changeOrigin: true` — Vite rewrites the `Host` header to the target. Avoids backend rejecting requests because `Host: localhost:5173`.

### 4. Environment variables

`.env*` files in `web/`:

```
# web/.env                — loaded always
VITE_APP_TITLE=UPR

# web/.env.development    — loaded only by `vite` (dev)
# web/.env.production     — loaded only by `vite build`
# web/.env.local          — git-ignored, for local secrets
```

Read in code via `import.meta.env`:

```ts
const title = import.meta.env.VITE_APP_TITLE;
```

Rules:

- Only variables with prefix `VITE_` are exposed to the browser. Everything else stays private (build-time only). Default prefix; do not change.
- Never put secrets in `VITE_*` — they end up in the JS bundle, visible to anyone in DevTools.
- TS types in `web/src/vite-env.d.ts`:

```ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

### 5. Production build

```bash
npm run build
```

Outputs to `web/dist/`:

- `index.html`
- `assets/index-<hash>.js`, `assets/index-<hash>.css` — hashed for cache-busting.

Static files only — no Node.js server needed at runtime. Phase 5 will upload `dist/` to Cloudflare Pages / Vercel / Netlify.

`npm run preview` to smoke-test the build locally (`localhost:4173` by default).

## Gotchas

| Issue | Mitigation |
|---|---|
| Vite is **ESM-only** — no CommonJS `require`. Some legacy Node libs ship CJS. | MVP libraries (`react`, `react-router`, `i18next`, `zustand`, `@tanstack/react-query`) are all ESM-clean. |
| Env vars without `VITE_` prefix are silently undefined in the browser. | Always rename to `VITE_*` before reading via `import.meta.env`. |
| Editing `vite.config.ts` requires restarting `npm run dev`. HMR does not cover the config itself. | Stop and restart the dev server after config changes. |
| `server.proxy` with `rewrite` is a common foot-gun: stripping the prefix makes the backend 404. Backend routes here live under `/api/...` (see `fastapi.md`). | Do **not** add `rewrite`. Keep the path identical between browser and backend. |
| Default `server.port: 5173` may collide with other Vite projects open at the same time. `strictPort: false` (default) silently picks 5174, 5175... | Set `strictPort: true` so the dev URL stays stable; if 5173 is busy, the command fails and the conflict is visible. |
| `import.meta.env.PROD` / `MODE` confused with NODE_ENV. | Use `import.meta.env.MODE` (`"development" \| "production"`) for build-mode checks; do not read `process.env` in browser code. |
| `assets/` paths in production assume the app is served from the domain root. Sub-path hosting (`/upr/`) breaks asset URLs. | If hosted under sub-path, set `base: "/upr/"` in `vite.config.ts`. Not relevant for MVP. |

## Skeleton scope

Active (web client, target after `web-skeleton-plan`):

- `web/package.json` — scripts `dev` / `build` / `preview`; deps: `vite`, `@vitejs/plugin-react`, `react`, `react-dom`, `typescript`.
- `web/vite.config.ts` — `defineConfig({ plugins: [react()], server: { port: 5173, strictPort: true, proxy: { "/api": { target: "http://localhost:8000", changeOrigin: true } } } })`.
- `web/index.html` — `<div id="root"></div>`, `<script type="module" src="/src/main.tsx">`.
- `web/src/vite-env.d.ts` — `/// <reference types="vite/client" />` + `ImportMetaEnv` interface.
- `web/.gitignore` — adds `dist/`, `.env.local`.

No `.env*` files committed in MVP — all defaults. Added when first `VITE_*` variable is needed.

## Links

- Docs (home): <https://vite.dev/>
- Guide: <https://vite.dev/guide/>
- Config reference: <https://vite.dev/config/>
- `server.proxy`: <https://vite.dev/config/server-options.html#server-proxy>
- Env and Mode: <https://vite.dev/guide/env-and-mode>
- `@vitejs/plugin-react`: <https://github.com/vitejs/vite-plugin-react>
- GitHub: <https://github.com/vitejs/vite>
