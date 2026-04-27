import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { colors, spacing, typography } from '~/theme';

/**
 * Заглушка экрана чата с упражнением (`/chat/[exerciseId]`).
 *
 * Динамический маршрут expo-router: квадратные скобки в имени файла
 * означают «параметр URL». Например, `/chat/squat` → exerciseId="squat".
 * Параметр читаем через `useLocalSearchParams`. Сейчас только показываем
 * его на экране — реальный чат и AI-коуч появятся в Phase 2.
 */
export default function ExerciseChatScreen() {
  const { exerciseId } = useLocalSearchParams<{ exerciseId: string }>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat</Text>
      <Text style={styles.subtitle}>exerciseId: {exerciseId ?? 'unknown'}</Text>
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
  },
});
