import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { initI18n } from '~/i18n';
import { colors } from '~/theme';

/**
 * Корневой layout приложения.
 *
 * Аналогия: это «прихожая» — всё, что должно произойти ДО того, как
 * пользователь увидит первый экран. Здесь мы:
 *   1. Инициализируем i18next (чтобы любой экран мог брать переводы).
 *   2. Показываем заглушку-сплеш, пока инициализация идёт.
 *   3. Передаём управление expo-router (`<Stack>`) — он сам подберёт
 *      нужный экран по URL-пути.
 *
 * Реальный сплеш с логотипом — отдельная задача, сейчас просто индикатор.
 */
export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    initI18n()
      .catch((error) => {
        console.warn('Failed to initialize i18n', error);
      })
      .finally(() => {
        setIsReady(true);
      });
  }, []);

  if (!isReady) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.semantic.bg,
        }}
      >
        <ActivityIndicator color={colors.semantic.accent} />
      </View>
    );
  }

  return (
    <>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.semantic.bg },
          headerTintColor: colors.semantic.text,
          contentStyle: { backgroundColor: colors.semantic.bg },
        }}
      />
      <StatusBar style="light" />
    </>
  );
}
