---
status: approved
last_updated: 2026-04-27
owner: Кристина
related: ../FRONTEND.md, ../stack.md, expo.md, index.md
---

# Expo Router — research-справка

> **Источник.** Собрано через MCP `user-context7`, library ID `/expo/expo` (Source Reputation: High; Benchmark Score: 81.41; ветка `sdk-54`). Дата сбора: 2026-04-27.

## Зачем нужна в нашем проекте

Expo Router — встроенная в Expo система навигации между экранами **по структуре папок**. Файл = экран. Имя папки = сегмент URL. Это резко упрощает архитектуру для нашего MVP: вместо ручной декларации списка экранов и роутов — просто кладём файл в нужное место в `app/`. Используется по умолчанию в стандартном шаблоне `npx create-expo-app` начиная с SDK 50+.

> **Аналогия.** Если обычная навигация — это «адресная книга» (где надо завести каждый адрес руками), то expo-router — «адрес = реальное расположение дома на карте». Кладёшь файл в `app/chat/[id].tsx` — это автоматически экран по адресу `/chat/<любой_id>`.

## Версия

- Идёт **в комплекте с Expo SDK 54** (актуальная стабильная ветка на момент справки). Отдельно версионировать не нужно — `expo-router` обновляется вместе с SDK.
- Ссылка ветки в Context7: `/expo/expo` `__branch__sdk-54`.

## Ключевое API

### 1. Базовая структура папок

```
mobile/
└── app/
    ├── _layout.tsx        # корневой layout (применяется ко всем экранам)
    ├── index.tsx          # экран по адресу "/"
    └── chat/
        └── [exerciseId].tsx  # экран по адресу "/chat/<любой id>"
```

Правила (из официальной документации):

- **Файл = экран.** Каждый `.tsx` в `app/` — это экран, **должен экспортировать `default`-компонент**.
- **`index.tsx`** — это «домашний» экран своей папки. `app/index.tsx` ↔ адрес `/`.
- **`_layout.tsx`** — обёртка для соседей и потомков (например, навигатор Stack или Tabs).
- **`[name].tsx`** — динамический сегмент (например, `[exerciseId].tsx` ловит любой id).
- **`(group)/_layout.tsx`** — группа без влияния на URL (для логической группировки экранов).
- **`+not-found.tsx`** — экран 404.

### 2. Корневой layout со Stack-навигатором

```tsx
// app/_layout.tsx
import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack />;
}
```

Этого достаточно для базовой работы. `Stack` — стандартный «стопка экранов»: тапнул на экране в списке → провалился глубже → кнопка «назад» возвращает.

С загрузкой шрифтов и сплеш-скрином (на будущее, когда подключим Manrope):

```tsx
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    /* шрифты */
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

### 3. Динамические сегменты и `useLocalSearchParams`

```tsx
// app/chat/[exerciseId].tsx
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function ChatScreen() {
  const { exerciseId } = useLocalSearchParams<{ exerciseId: string }>();
  return (
    <View>
      <Text>Чат для упражнения {exerciseId}</Text>
    </View>
  );
}
```

### 4. Навигация: компонент `Link` и императивный `router`

```tsx
import { Link, router } from "expo-router";

<Link href="/chat/romanian_deadlift">Открыть чат</Link>;

// Или императивно (из обработчика события):
router.navigate({
  pathname: "/chat/[exerciseId]",
  params: { exerciseId: "romanian_deadlift" },
});
```

## Подводные камни

| Камень | Что делать |
|---|---|
| Файлы в `app/` **должны** экспортировать `default`-компонент. Иначе — ошибка сборки. | Помнить про `export default function ...`. |
| Любой `.tsx`-файл в `app/` становится экраном. | Вспомогательные компоненты класть в `src/components/`, а не в `app/`. |
| `useLocalSearchParams` без указания типа возвращает `string | string[] | undefined`. | Указывать дженерик: `useLocalSearchParams<{ id: string }>()`. |
| Конфликт между `app/` и старой структурой (если внезапно есть `App.tsx` в корне) — приложение запускает не то. | В шаблоне `default` стандартно. Не создавать `App.tsx` руками. |
| Глубокие вложенности `app/a/b/c/[d]/index.tsx` сложно читать. | Стараться держать иерархию в 1-2 уровня (для нашего MVP это естественно). |

## Что нам важно из этой библиотеки прямо сейчас

Для **структурного скелета** Single-scenario MVP:

- `app/_layout.tsx` — корневой layout (`<Stack />` + инициализация i18n).
- `app/index.tsx` — экран тренировки (заглушка).
- `app/chat/[exerciseId].tsx` — экран чата упражнения (заглушка).
- Реальные переходы (`Link` / `router.navigate`) добавятся в hello-world / thin slice.

## Ссылки

- Официальная документация: <https://docs.expo.dev/router/introduction/>
- Notation: <https://docs.expo.dev/router/basics/notation/>
- Layouts: <https://docs.expo.dev/router/basics/layout/>
- Navigation: <https://docs.expo.dev/router/basics/navigation/>
- Typed Routes: <https://docs.expo.dev/router/reference/typed-routes/>
