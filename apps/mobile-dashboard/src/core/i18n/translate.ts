import i18n from 'i18n-js';

export function translate(key: string, options?: Record<string, unknown>) {
  return key ? i18n.t(key, options) : null;
}
