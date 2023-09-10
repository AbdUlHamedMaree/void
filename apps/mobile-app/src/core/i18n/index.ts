import { I18n } from 'i18n-js';
import * as RNLocalize from 'react-native-localize';
import localStorage from '@react-native-async-storage/async-storage';

import en from './en';

const locales = RNLocalize.getLocales();

export const i18n = new I18n({ en });

i18n.enableFallback = true;

export const initializeI18n = async () => {
  const languageCode = await localStorage.getItem('Codebase-lang');
  i18n.locale = languageCode || locales[0].languageCode;
};

export const strings = i18n.t;
