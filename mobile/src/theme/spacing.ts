/**
 * Шкала отступов Lucent (база 4px).
 *
 * Источник правды — docs/ui/design-system/style.css, блок `Spacing scale`.
 * Используется в `style={{ padding: spacing.md }}` и т.п.
 */

export const spacing = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
  xxxl: 48,
  xxxxl: 64,
  xxxxxl: 80,
  xxxxxxl: 96,
} as const;

export type Spacing = typeof spacing;
