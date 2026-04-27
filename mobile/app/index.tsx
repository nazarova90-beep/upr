import { StyleSheet, Text, View } from 'react-native';

import { colors, spacing, typography } from '~/theme';

/**
 * Заглушка экрана тренировки (`/`).
 *
 * Это «домашняя страница» приложения по правилам expo-router:
 * файл `app/index.tsx` = маршрут `/`. Сейчас просто статичный текст —
 * UI и реальная логика появятся в следующих задачах.
 */
export default function WorkoutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Workout</Text>
      <Text style={styles.subtitle}>Skeleton screen — UI coming soon.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.semantic.bg,
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  title: {
    color: colors.semantic.text,
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
  },
  subtitle: {
    color: colors.semantic.textSecondary,
    fontSize: typography.fontSize.base,
    textAlign: 'center',
  },
});
