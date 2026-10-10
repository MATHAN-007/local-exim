import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enData from './locales/en.json';

import { siteConfig } from './siteConfig';

const supportedLanguages = siteConfig.languages.map((l) => l.code);

// We preload English for instantaneous first paint
const initialResources = {
  en: { translation: enData },
};

// Lazy loader for non-English locales
export const loadLanguageAsync = async (lng) => {
  if (!supportedLanguages.includes(lng)) return;

  if (lng === 'ar') {
    // Dynamically load Arabic font only when Arabic is active
    try {
      await import('@fontsource/noto-sans-arabic');
    } catch (e) {
      console.warn('Could not load Arabic font dynamically', e);
    }
  }

  if (!i18n.hasResourceBundle(lng, 'translation')) {
    try {
      let translationModule;
      switch (lng) {
        case 'ar':
          translationModule = await import('./locales/ar.json');
          break;
        case 'es':
          translationModule = await import('./locales/es.json');
          break;
        case 'fr':
          translationModule = await import('./locales/fr.json');
          break;
        case 'de':
          translationModule = await import('./locales/de.json');
          break;
        case 'hi':
          translationModule = await import('./locales/hi.json');
          break;
        case 'zh':
          translationModule = await import('./locales/zh.json');
          break;
        case 'ta':
          translationModule = await import('./locales/ta.json');
          break;
        case 'ru':
          translationModule = await import('./locales/ru.json');
          break;
        case 'pt':
          translationModule = await import('./locales/pt.json');
          break;
        default:
          return;
      }
      i18n.addResourceBundle(lng, 'translation', translationModule.default || translationModule, true, true);
      await i18n.changeLanguage(lng);
    } catch (err) {
      console.error(`Error loading locale "${lng}":`, err);
    }
  }
};

export const applyLanguageDirection = (lng) => {
  const isRtl = lng === 'ar';
  document.documentElement.setAttribute('dir', isRtl ? 'rtl' : 'ltr');
  document.documentElement.setAttribute('lang', lng);
  if (isRtl) {
    document.documentElement.classList.add('rtl-mode');
  } else {
    document.documentElement.classList.remove('rtl-mode');
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: initialResources,
    fallbackLng: 'en',
    supportedLngs: supportedLanguages,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['querystring', 'localStorage', 'navigator'],
      lookupQuerystring: 'lang',
      lookupLocalStorage: 'local-exim-lang',
      caches: ['localStorage'],
    },
  });

// Handle initial language and changes
const initialLng = i18n.language || 'en';
const activeLng = supportedLanguages.includes(initialLng.split('-')[0]) ? initialLng.split('-')[0] : 'en';

if (activeLng !== initialLng) {
  i18n.changeLanguage(activeLng);
}

applyLanguageDirection(activeLng);
if (activeLng !== 'en') {
  loadLanguageAsync(activeLng);
}

i18n.on('languageChanged', (lng) => {
  const cleanLng = lng.split('-')[0];
  applyLanguageDirection(cleanLng);
  localStorage.setItem('local-exim-lang', cleanLng);
  loadLanguageAsync(cleanLng);
});

export default i18n;
