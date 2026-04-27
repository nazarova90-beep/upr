---
status: approved
last_updated: 2026-04-27
owner: Кристина
related: ../FRONTEND.md, ../stack.md, expo.md, index.md
---

# Expo Router — research note

Source: MCP `user-context7`, library ID `/expo/expo` (Source Reputation: High; Benchmark Score: 81.41; branch `sdk-54`). Fetched: 2026-04-27.

## Purpose in project

File-based navigation built into Expo. File = screen, folder = URL segment. Default in `npx create-expo-app` template since SDK 50+.

## Version

- Bundled with Expo SDK 54. Updated with SDK; no separate pin.
- Context7 branch: `/expo/expo` `__branch__sdk-54`.

## Key API

### 1. Folder layout

```
mobile/
└── app/
    ├── _layout.tsx        # root layout, applies to all screens
    ├── index.tsx          # screen at "/"
    └── chat/
        └── [exerciseId].tsx  # screen at "/chat/<id>"
```

Rules:

- File = screen. Every `.tsx` in `app/` must `export default` a component.
- `index.tsx` = home screen of its folder. `app/index.tsx` ↔ `/`.
- `_layout.tsx` = wrapper for siblings/descendants (e.g. Stack, Tabs navigator).
- `[name].tsx` = dynamic segment.
- `(group)/_layout.tsx` = grouping without affecting URL.
- `+not-found.tsx` = 404 screen.

### 2. Root layout with Stack navigator

```tsx
// app/_layout.tsx
import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack />;
}
```

Sufficient for basic stack navigation. `Stack` = standard push/pop screen stack with back-button.

With font loading and splash-screen (future, once Manrope wired):

```tsx
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    /* fonts */
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hide();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <Stack />;
}
```

### 3. Dynamic segments + `useLocalSearchParams`

```tsx
// app/chat/[exerciseId].tsx
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function ChatScreen() {
  const { exerciseId } = useLocalSearchParams<{ exerciseId: string }>();
  return (
    <View>
      <Text>Chat for exercise {exerciseId}</Text>
    </View>
  );
}
```

### 4. Navigation: `Link` and imperative `router`

```tsx
import { Link, router } from "expo-router";

<Link href="/chat/romanian_deadlift">Open chat</Link>;

router.navigate({
  pathname: "/chat/[exerciseId]",
  params: { exerciseId: "romanian_deadlift" },
});
```

## Gotchas

| Issue | Mitigation |
|---|---|
| `app/` files must `export default`. Otherwise build fails. | `export default function ...`. |
| Any `.tsx` in `app/` becomes a screen. | Helper components → `src/components/`, not `app/`. |
| `useLocalSearchParams` without generic returns `string | string[] | undefined`. | Use generic: `useLocalSearchParams<{ id: string }>()`. |
| Conflict if a stray `App.tsx` exists at root. | Don't create `App.tsx` manually; default template is correct. |
| Deep nesting (`app/a/b/c/[d]/index.tsx`) hurts readability. | Keep depth 1-2 for MVP. |

## Skeleton scope (Single-scenario MVP)

- `app/_layout.tsx` — root layout (`<Stack />` + i18n init).
- `app/index.tsx` — workout screen stub.
- `app/chat/[exerciseId].tsx` — chat screen stub.
- Real transitions (`Link` / `router.navigate`) added in hello-world / thin slice.

## Links

- Docs: <https://docs.expo.dev/router/introduction/>
- Notation: <https://docs.expo.dev/router/basics/notation/>
- Layouts: <https://docs.expo.dev/router/basics/layout/>
- Navigation: <https://docs.expo.dev/router/basics/navigation/>
- Typed Routes: <https://docs.expo.dev/router/reference/typed-routes/>
