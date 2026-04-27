/**
 * Цветовые токены Lucent (тёмная тема).
 *
 * Источник правды — docs/ui/design-system/style.css. Если значение здесь
 * расходится с CSS-токенами, прав источник — этот файл должен подгоняться.
 *
 * В UI используем `colors.semantic.*`. «Сырые» значения из `colors.palette.*`
 * берём только для оформления статусов или редких исключений.
 */

const palette = {
  neutral0: '#000000',
  neutral50: '#1A1A1C',
  neutral100: '#1C1C1E',
  neutral200: '#2C2C2E',
  neutral300: '#3A3A3C',
  neutral500: '#6E6E73',
  neutral600: '#8E8E93',
  neutral1000: '#FFFFFF',

  pine: '#005D58',
  spruce: '#057A68',
  green: '#09A854',
  blue: '#307FE2',
  blueberry: '#65A5F5',
  red: '#FF453A',

  accentBgMuted: '#1A2C2A',
  accentFgMuted: '#4A5C5A',

  alphaWhite05: 'rgba(255, 255, 255, 0.05)',
  alphaWhite20: 'rgba(255, 255, 255, 0.20)',
  alphaWhite85: 'rgba(255, 255, 255, 0.85)',
  alphaBlack40: 'rgba(0, 0, 0, 0.40)',
} as const;

const semantic = {
  bg: palette.neutral0,
  surface: palette.neutral100,
  surfaceHover: palette.neutral200,
  surfaceStrong: palette.neutral300,
  surfaceDisabled: palette.neutral50,

  border: palette.neutral200,
  borderOnColor: palette.alphaWhite20,

  text: palette.neutral1000,
  textSecondary: palette.neutral600,
  textTertiary: palette.neutral500,
  textDisabled: palette.neutral500,
  textOnAccent: palette.neutral1000,
  textOnDanger: palette.neutral1000,
  textOnLight: palette.neutral0,
  textOnColorMuted: palette.alphaWhite85,

  accent: palette.pine,
  accentHover: palette.spruce,
  accentBgDisabled: palette.accentBgMuted,
  accentFgDisabled: palette.accentFgMuted,

  success: palette.green,
  danger: palette.red,

  overlayHover: palette.alphaWhite05,
  shadow: palette.alphaBlack40,
} as const;

export const colors = {
  palette,
  semantic,
} as const;

export type Colors = typeof colors;
