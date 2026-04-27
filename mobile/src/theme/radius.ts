/**
 * Шкала скруглений Lucent.
 *
 * Источник правды — docs/ui/design-system/style.css, блок `Radius scale`.
 * `pill` — для «таблеток» (например, кнопок), `full` — для круглых аватаров.
 */

export const radius = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  pill: 999,
} as const;

export type Radius = typeof radius;
