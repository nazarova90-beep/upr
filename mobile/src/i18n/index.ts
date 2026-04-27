/**
 * Инициализация i18next для UPR.
 *
 * Что здесь происходит (простая аналогия):
 *   - i18next — это «словарь переводов»: даёшь ему ключ (`workout.title`),
 *     он отдаёт строку на нужном языке.
 *   - expo-localization — это «детектор языка устройства» (узнаёт, что
 *     у пользователя iPhone настроен на русский / английский / …).
 *   - react-i18next — это «розетка», через которую React-компоненты
 *     подключаются к словарю (хук `useTranslation`).
 *
 * Сейчас словари (ru.json, en.json) пустые — это нормально. Структурно
 * всё готово; реальные строки появятся вместе с UI.
 *
 * Подробности — в docs/references/i18next.md, docs/references/react-i18next.md,
 * docs/references/expo-localization.md.
 */

import { getLocales } from 'expo-localization';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import ru from './locales/ru.json';

const FALLBACK_LANGUAGE = 'ru';
const SUPPORTED_LANGUAGES = ['ru', 'en'] as const;

type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

function detectInitialLanguage(): SupportedLanguage {
  const locales = getLocales();
  const primary = locales[0]?.languageCode ?? FALLBACK_LANGUAGE;
  return (SUPPORTED_LANGUAGES as readonly string[]).includes(primary)
    ? (primary as SupportedLanguage)
    : FALLBACK_LANGUAGE;
}

export async function initI18n(): Promise<typeof i18next> {
  if (i18next.isInitialized) {
    return i18next;
  }

  await i18next.use(initReactI18next).init({
    resources: {
      ru: { common: ru.common },
      en: { common: en.common },
    },
    lng: detectInitialLanguage(),
    fallbackLng: FALLBACK_LANGUAGE,
    defaultNS: 'common',
    ns: ['common'],
    interpolation: {
      escapeValue: false,
    },
    returnNull: false,
  });

  return i18next;
}

export { i18next };
