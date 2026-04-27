# UPR — web client

Active client surface for UPR. Replaces the frozen `mobile/` skeleton (see `../docs/exec-plans/active/EP-pivot-to-web.md`).

Stack: **Vite + React + TypeScript**. Lucent dark theme, i18next (Russian only in MVP), client-side routing with `react-router` (library/data mode).

## Quickstart

```bash
cd web
npm install
npm run dev
```

Then open `http://localhost:5173` in **Mac Safari** (target browser of MVP).

The dev server proxies `/api/*` → `http://localhost:8000`, so run the FastAPI backend in a second terminal when you need it:

```bash
cd backend
uvicorn app.main:app --reload
```

## Open on iPhone (optional)

Real device testing on iPhone Safari while owner's VPN is on — use a public tunnel:

```bash
cloudflared tunnel --url http://localhost:5173
```

Open the printed `*.trycloudflare.com` URL on the iPhone. Tunnel kept ad-hoc; no `cloudflared` config files committed.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Vite dev server with HMR on `http://localhost:5173`. |
| `npm run build` | Type-check (`tsc -b`) + production build into `dist/`. |
| `npm run preview` | Serve the production build locally (`http://localhost:4173`) for smoke tests. |
| `npm run lint` | ESLint over the project (config in `eslint.config.js`). |

## Project structure

Target tree spelled out in `../docs/FRONTEND.md` § "Project structure". Path alias `@/*` → `src/*` (mirror of `vite.config.ts` `resolve.alias`; declared in `tsconfig.app.json`).

## Pointers

- `../docs/FRONTEND.md` — stack, libraries, i18n, expansion plan.
- `../docs/ui/` — Lucent design tokens, mockups, component inventory.
- `../docs/exec-plans/active/EP-pivot-to-web.md` — pivot rationale.
- `../docs/exec-plans/active/EP-web-skeleton.md` — this skeleton's source plan.
