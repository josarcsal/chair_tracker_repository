import 'intl-pluralrules';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import languages from './languages';
import type { Language } from './languages';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'en_US';
    resources: typeof languages;
  }
}

i18n.use(initReactI18next).init({
  resources: languages,
  lng: 'en_US' as Language,
});

export default i18n;
