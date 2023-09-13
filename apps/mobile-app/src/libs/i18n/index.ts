import 'intl-pluralrules';
import i18next, { LanguageDetectorModule } from 'i18next';

import { initReactI18next } from 'react-i18next';
import { getLocales } from 'react-native-localize';
import { storage } from '$libs/mmkv';

import { enResource } from './en';
import { arResource } from './ar';

const RESOURCES = {
  en: enResource,
  ar: arResource,
};

const languageDetector: LanguageDetectorModule = {
  type: 'languageDetector',
  init: () => {},
  detect: () => {
    const lang = storage.lang.get(getLocales()[0].languageCode as 'en');
    return lang;
  },
  cacheUserLanguage: language => {
    storage.lang.set(language as 'en');
  },
};

// eslint-disable-next-line import/no-named-as-default-member
i18next
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['ar', 'en'],
    debug: __DEV__,
    resources: RESOURCES,
    fallbackLng: 'en',
    ns: Object.keys(enResource),
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18next;
