---
status: approved
last_updated: 2026-04-27
owner: Кристина
related: ../FRONTEND.md, ../stack.md, react-i18next.md, index.md
---

# React — research note

Source: MCP `user-context7`, library ID `/reactjs/react.dev` (Source Reputation: High; Benchmark Score: 82.99; 4908 snippets). Fetched: 2026-04-27.

## Purpose in project

UI library for the web client. Drives the entire interface (workout screen, exercise chat, technique pop-up). Pairs with `vite` (build / dev server, ref pending) and TypeScript. Renders one root in `web/src/main.tsx`. Selected in `stack.md` "Choice notes" and pivot plan `exec-plans/active/2026-04-27-pivot-to-web.md`.

## Version

- Latest stable at fetch: **19.2** (Context7 lists `v19_1_1`, `v19_2_0`). React and `react-dom` are released and updated together — same version in both packages.
- Minimum for `react-i18next.md` (web): React 18+. We use 19.x.
- Pin pattern: `"react": "^19.2.0"`, `"react-dom": "^19.2.0"` (i.e. `>=19.2.0,<20.0.0`). Major bump (`20.x`) requires re-reading docs first.

## Key API

### 1. Application entry — `createRoot` + `<StrictMode>`

```tsx
// web/src/main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./i18n"; // side-effect init of i18next
import "./styles/global.css";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element #root not found in index.html");
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

- `createRoot(domNode)` is the React 18+ entry API; the older `ReactDOM.render` is removed.
- `<StrictMode>` is dev-only checks, no behavior change in production. It intentionally double-invokes render functions and effects to surface impure code.
- Exactly one `createRoot` for the whole app in MVP. Multiple roots are reserved for gradual migration of legacy pages — not our case.

### 2. Function component with TypeScript props

Project-wide pattern: explicit `interface` for props, no `React.FC`.

```tsx
// web/src/components/Button.tsx
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: "primary" | "ghost";
  children?: React.ReactNode;
}

export function Button({ label, onClick, variant = "primary", children }: ButtonProps) {
  return (
    <button type="button" className={`btn btn-${variant}`} onClick={onClick}>
      {label}
      {children}
    </button>
  );
}
```

- `children?: React.ReactNode` — broadest type for children (JSX, strings, numbers, arrays, `null`).
- Default values via destructuring (`variant = "primary"`), not `defaultProps` (deprecated for function components in React 19).

### 3. Hooks — `useState`

Type is inferred from initial value; specify explicitly when initial value is `null`/`undefined` or a union.

```tsx
import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export function UploadButton() {
  const [status, setStatus] = useState<Status>("idle");
  const [file, setFile] = useState<File | null>(null);
  // ...
}
```

### 4. Hooks — `useEffect` with cleanup and deps

```tsx
import { useEffect, useRef } from "react";

interface VideoPlayerProps {
  src: string;
  isPlaying: boolean;
}

export function VideoPlayer({ src, isPlaying }: VideoPlayerProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    if (isPlaying) {
      video.play();
    } else {
      video.pause();
    }

    return () => {
      video.pause();
    };
  }, [isPlaying]); // ✅ all referenced reactive values listed

  return <video ref={ref} src={src} loop playsInline />;
}
```

- Dependency array lists every reactive value (props, state, derived values) used inside the effect. `[]` means "run once after mount" only when the effect references no reactive values.
- `return () => { ... }` is the cleanup, called before the next effect run and on unmount.

### 5. Code-splitting — `lazy` + `<Suspense>`

```tsx
import { lazy, Suspense } from "react";

const TechniquePopup = lazy(() => import("./TechniquePopup"));

export function ExerciseCard() {
  return (
    <Suspense fallback={<div>Загрузка…</div>}>
      <TechniquePopup />
    </Suspense>
  );
}
```

Not needed in initial MVP (small bundle), but reserved for the technique pop-up if its bundle grows.

### 6. List rendering — keys

```tsx
{exercises.map((exercise) => (
  <ExerciseRow key={exercise.id} exercise={exercise} />
))}
```

- `key` must be stable, unique among siblings, and **not the array index** when items can be reordered, inserted, or deleted. Use a database id.

## Gotchas

| Issue | Mitigation |
|---|---|
| `<StrictMode>` double-invokes render and effects in dev → `useEffect` runs setup → cleanup → setup. Looks like a bug. | Treat as a feature — write effects that survive mount → unmount → mount. Production has no double-invoke. |
| Missing deps in `useEffect` (e.g. `[]` while reading `isPlaying`) → stale values, effect doesn't re-run. | Always list every reactive value used in the effect. Trust the `react-hooks/exhaustive-deps` ESLint rule. |
| `React.FC<Props>` historically forced an implicit `children` prop and confused inference. Modern docs use explicit `interface Props { children?: React.ReactNode }`. | Project rule: never `React.FC`. Use plain function + `interface`. |
| Object/array literals in JSX (`<X items={[1,2]} />`) create new references every render → break `memo`/effect deps. | If it matters, hoist or `useMemo`. Don't optimize prematurely. |
| Stale closures: a function captured in `useEffect`/`useCallback` reads old state. | Either include the value in deps, or use the functional form: `setState(prev => ...)`. |
| `key={index}` on dynamic lists → wrong item state after reorder. | Use a stable id from data. |
| Mounting via `document.getElementById("root")` returns `Element \| null`; TS will flag null. | Narrow with `if (!rootElement) throw …`, do not use `!` non-null assertion. |
| Mutating state in place (`state.items.push(x)`) does not re-render. | Always replace: `setItems([...items, x])`. |

## Skeleton scope

Active (web client, target after `web-skeleton-plan`):

- `web/src/main.tsx`: `createRoot(...).render(<StrictMode><App /></StrictMode>)`. Side-effect imports for `./i18n` and global CSS.
- `web/src/App.tsx`: router root (uses `react-router-dom`, ref pending in `react-router.md`). No real screens yet — only stub routes.
- `web/src/routes/Workout.tsx`, `web/src/routes/Chat.tsx`: empty function components returning a placeholder `<div>`.
- `web/src/components/`: empty in skeleton; populated as UI is built.
- No hooks usage in stub routes — `useState`/`useEffect` arrive with the thin slice (Phase 2).

Frozen (mobile skeleton, retained on disk):

- `mobile/` uses React Native (different renderer, same core React). Out of scope here. Web `react.md` is the authoritative ref while mobile is frozen.

## Links

- Docs (home): <https://react.dev/>
- Reference / `createRoot`: <https://react.dev/reference/react-dom/client/createRoot>
- Reference / `<StrictMode>`: <https://react.dev/reference/react/StrictMode>
- Learn / TypeScript: <https://react.dev/learn/typescript>
- Reference / Hooks: <https://react.dev/reference/react/hooks>
- Reference / `lazy`: <https://react.dev/reference/react/lazy>
- GitHub: <https://github.com/facebook/react>
