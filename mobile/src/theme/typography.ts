/**
 * Базовые типографические токены Lucent.
 *
 * ВНИМАНИЕ: шрифт Manrope сюда НЕ загружается — это отдельный шаг
 * (через `expo-font`, см. docs/ui/design-system/README.md, раздел
 * «Что будет дальше»). Сейчас `fontFamilyBase` равен `undefined`,
 * чтобы React Native использовал системный шрифт. Когда Manrope будет
 * подключён, поменяем на `'Manrope'`.
 *
 * Источник правды по размерам шрифта — docs/ui/design-system/style.css.
 */

export const typography = {
  fontFamilyBase: undefined as string | undefined,
  fontFamilyMono: undefined as string | undefined,

  fontSize: {
    xs: 11,
    sm: 13,
    md: 14,
    base: 16,
    lg: 20,
    xl: 24,
    xxl: 32,
  },

  fontWeight: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },

  lineHeight: {
    tight: 1.2,
    base: 1.4,
    loose: 1.6,
  },
} as const;

export type Typography = typeof typography;
