import I18n from 'i18n-js';
import * as RNLocalize from 'react-native-localize';
import localStorage from '@react-native-async-storage/async-storage';

import en from './en';

const locales = RNLocalize.getLocales();

I18n.fallbacks = true;
I18n.translations = {en};

export const initializeI18n = async () => {
  const languageCode = await localStorage.getItem('Codebase-lang');
  I18n.locale = languageCode || locales[0].languageCode;
};

export const strings = (name: any, params = {}) => I18n.t(name, params);
export default I18n;
