---
status: approved
last_updated: 2026-04-27
owner: Кристина
related: ../FRONTEND.md, react.md, vite.md, deprecated/expo-router.md, index.md
---

# react-router — research note

Source: MCP `user-context7`, library ID `/remix-run/react-router` (Source Reputation: High; Benchmark Score: 86.41; 1007 snippets). Fetched: 2026-04-27.

## Purpose in project

Client-side routing for the web SPA. Maps URLs to screen components without a full page reload. MVP routes:

| Path | Screen | File |
|---|---|---|
| `/` | Workout | `web/src/routes/Workout.tsx` |
| `/chat/:exerciseId` | Exercise chat | `web/src/routes/Chat.tsx` |
| `*` (unmatched) | 404 fallback | `web/src/routes/NotFound.tsx` |

Replaces deprecated `expo-router` from the frozen mobile skeleton (`deprecated/expo-router.md`). Pairs with `react.md` (UI), `vite.md` (build), TypeScript.

## Version

- Latest stable at fetch: **7.9.4** (Context7 lists `7.9.4`, `7.8.2`, `7.6.2`, `7.5.3`).
- **Package rename in v7:** `react-router-dom` → `react-router`. The unified `react-router` package replaces both `react-router` (core) and `react-router-dom` (DOM bindings) from v6. v7 docs and project code import from **`react-router`** only.
- `react-router-dom@7` still exists as a thin compat shim, but new code should not use it.
- Pin pattern: `"react-router": "^7.9.0"` (i.e. `>=7.9.0,<8.0.0`). Major bump (`8.x`) requires re-reading docs first.

## Library mode vs framework mode

React Router v7 ships in two modes — pick one, do not mix.

| Mode | What | When to use |
|---|---|---|
| **Library (data) mode** | `createBrowserRouter` + `<RouterProvider>`. Plain Vite + React app. | **Our choice.** SPA, no SSR, no file-based routing. |
| Framework mode | `@react-router/dev/vite` plugin + `routes.ts`. Adds loaders / actions / SSR / code-splitting. | Remix-style apps. Replaces `@vitejs/plugin-react`. |

Reason for library mode: simpler, fewer moving parts, plays nicely with the Vite config in `vite.md` (no plugin swap). Framework mode is an explicit upgrade path for later if the app grows. **Do not install `@react-router/dev`.**

## Key API

### 1. Install

```bash
npm install react-router
```

(Single package — do not also install `react-router-dom`.)

### 2. Define routes — `createBrowserRouter`

```tsx
// web/src/router.tsx
import { createBrowserRouter } from "react-router";
import RootLayout from "./routes/RootLayout";
import Workout from "./routes/Workout";
import Chat from "./routes/Chat";
import NotFound from "./routes/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Workout },
      { path: "chat/:exerciseId", Component: Chat },
      { path: "*", Component: NotFound },
    ],
  },
]);
```

- `Component` (capital C) is the v7 way to attach a component to a route. (`element: <Workout />` from v6 still works but is older style.)
- `index: true` matches the parent path exactly (here: `/`).
- `path: "*"` is the catch-all — must be the last child.

### 3. Render the router — `<RouterProvider>`

Replaces `<App />` in `react.md` "Application entry". Updated `main.tsx`:

```tsx
// web/src/main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { router } from "./router";
import "./i18n";
import "./styles/global.css";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element #root not found in index.html");
}

createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
```

`App.tsx` from a fresh `react-ts` template is no longer needed — router config (`router.tsx`) and `RootLayout` replace it.

### 4. Root layout with `<Outlet />`

Parent route renders shared chrome (header, etc.) and `<Outlet />` for the matched child:

```tsx
// web/src/routes/RootLayout.tsx
import { Outlet } from "react-router";

export default function RootLayout() {
  return (
    <div className="app">
      {/* shared header / nav goes here later */}
      <main>
        <Outlet />
      </main>
    </div>
  );
}
```

### 5. Navigation — `<Link>` / `<NavLink>`

```tsx
import { Link, NavLink } from "react-router";

<Link to="/">К тренировке</Link>;

<NavLink to="/" end className={({ isActive }) => (isActive ? "active" : undefined)}>
  Тренировка
</NavLink>;
```

- `<Link>` — replaces `<a>` for in-app navigation; no full page reload.
- `<NavLink>` — same, but exposes `isActive` for highlighting current tab.
- `end` prop — exact match (without it, `to="/"` would be active on every nested route).

### 6. URL params — `useParams`

```tsx
// web/src/routes/Chat.tsx
import { useParams } from "react-router";

export default function Chat() {
  const { exerciseId } = useParams<{ exerciseId: string }>();
  if (!exerciseId) {
    return <p>Упражнение не указано.</p>;
  }
  return <p>Чат для упражнения {exerciseId}</p>;
}
```

`useParams` returns `Partial<Record<K, string>>` — keys are typed but **values are always `string | undefined`**. Always narrow before use (do not assume the key exists).

### 7. Programmatic navigation — `useNavigate`

```tsx
import { useNavigate } from "react-router";

export function StartChatButton({ exerciseId }: { exerciseId: string }) {
  const navigate = useNavigate();
  return (
    <button type="button" onClick={() => navigate(`/chat/${exerciseId}`)}>
      Открыть чат
    </button>
  );
}
```

- `navigate(path)` — push history entry.
- `navigate(-1)` — back, like browser Back button.
- `navigate(path, { replace: true })` — replace current entry (no Back).

## Gotchas

| Issue | Mitigation |
|---|---|
| Imports from `react-router-dom` work in v7 (compat) but are deprecated. Mixing both in one project is the common cause of "two copies of React Router" warnings. | Always import from `react-router`. Do not list `react-router-dom` in `package.json`. |
| Snippet from a v6 tutorial uses `<BrowserRouter><Routes><Route /></Routes></BrowserRouter>`. Works, but is the "declarative mode" — does not enable data APIs (loaders/actions). | MVP doesn't need loaders, but using `createBrowserRouter` keeps the option open without rewriting. |
| `useParams` values are `string \| undefined`. TS lets you ignore this if not generic-typed. | Always type: `useParams<{ exerciseId: string }>()` and check for `undefined`. |
| Catch-all `path: "*"` is order-sensitive — must be the **last** child of a parent route. | Place the 404 route at the end of the children array. |
| `<Link to="/">` looks active for every route under `/` if you forget the `end` prop on `<NavLink>`. | Always `end` on the home `NavLink`. |
| Plain `<a href="/chat/...">` triggers a full page reload, losing all React state. | Use `<Link>` / `<NavLink>` for in-app links. Plain `<a>` only for external URLs. |
| `createBrowserRouter` requires the server to serve `index.html` for any unknown URL (so `/chat/123` reaches the SPA). Vite dev server does this by default. Phase 5 hosting (Cloudflare Pages / Vercel / Netlify) needs the same setup ("SPA fallback" / `_redirects` rewrite to `/index.html`). | When deploying, configure SPA fallback. Note in `exec-plans/active/roadmap.md` Phase 5. |
| Framework mode (`@react-router/dev/vite`) replaces `@vitejs/plugin-react` and conflicts with `vite.md` setup. | Do not install `@react-router/dev`. Library mode only. |

## Skeleton scope

Active (web client, target after `web-skeleton-plan`):

- `web/package.json` — adds `"react-router": "^7.9.0"`.
- `web/src/router.tsx` — `createBrowserRouter([...])` with `/`, `chat/:exerciseId`, `*`.
- `web/src/main.tsx` — `<RouterProvider router={router} />` inside `<StrictMode>` (replaces `<App />`).
- `web/src/routes/RootLayout.tsx` — `<Outlet />` inside a wrapper `<div>`.
- `web/src/routes/Workout.tsx`, `Chat.tsx`, `NotFound.tsx` — empty placeholders returning a `<div>` with the screen name.

No data loaders, no nested layouts beyond `RootLayout`, no auth guards in skeleton — those arrive in Phase 2 / Phase 5.

## Links

- Docs (home): <https://reactrouter.com/>
- Library mode quick-start: <https://reactrouter.com/start/library/installation>
- API reference: <https://reactrouter.com/api/data-routers/createBrowserRouter>
- v6 → v7 upgrade guide: <https://reactrouter.com/upgrading/v6>
- GitHub: <https://github.com/remix-run/react-router>
