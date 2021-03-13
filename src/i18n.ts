import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { FALLBACK_LANGUAGE, WHITELIST_LANGUAGES } from './utils/contants';

export default i18n
  .use(initReactI18next)
  .use(Backend)
  .use(LanguageDetector)
  .init({
    preload: [FALLBACK_LANGUAGE],
    fallbackLng: FALLBACK_LANGUAGE,
    // won't print anything into console
    debug: false,
    detection: {
      order: ['queryString', 'cookie'],
      cache: ['cookie'],
      checkWhitelist: true,
      whitelist: WHITELIST_LANGUAGES
    }
  });
