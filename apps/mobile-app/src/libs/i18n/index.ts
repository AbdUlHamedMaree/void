import 'intl-pluralrules';
import i18next from 'i18next';

import { initReactI18next } from 'react-i18next';
import { getLocales } from 'react-native-localize';
import AsyncStoragePlugin from 'i18next-react-native-async-storage';

import { enResource } from './en';
import { arResource } from './ar';

const RESOURCES = {
  en: enResource,
  ar: arResource,
};

// eslint-disable-next-line import/no-named-as-default-member
i18next
  .use(AsyncStoragePlugin(getLocales()[0].languageCode))
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
