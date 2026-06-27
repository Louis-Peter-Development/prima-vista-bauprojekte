import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { DEFAULT_LOCALE, LOCALES } from './routes';

import deCommon from './locales/de/common.json';
import enCommon from './locales/en/common.json';
import itCommon from './locales/it/common.json';
import deHome from './locales/de/home.json';
import enHome from './locales/en/home.json';
import itHome from './locales/it/home.json';
import deLegal from './locales/de/legal.json';
import enLegal from './locales/en/legal.json';
import itLegal from './locales/it/legal.json';
import deKontakt from './locales/de/kontakt.json';
import enKontakt from './locales/en/kontakt.json';
import itKontakt from './locales/it/kontakt.json';
import dePages from './locales/de/pages.json';
import enPages from './locales/en/pages.json';
import itPages from './locales/it/pages.json';

export const NAMESPACES = ['common', 'home', 'legal', 'kontakt', 'pages'] as const;

const resources = {
  de: { common: deCommon, home: deHome, legal: deLegal, kontakt: deKontakt, pages: dePages },
  en: { common: enCommon, home: enHome, legal: enLegal, kontakt: enKontakt, pages: enPages },
  it: { common: itCommon, home: itHome, legal: itLegal, kontakt: itKontakt, pages: itPages },
} as const;

i18n.use(initReactI18next).init({
  resources,
  lng: DEFAULT_LOCALE,
  fallbackLng: DEFAULT_LOCALE,
  supportedLngs: LOCALES,
  defaultNS: 'common',
  ns: [...NAMESPACES],
  interpolation: { escapeValue: false }, // React already escapes
  returnNull: false,
  react: { useSuspense: false },
});

export default i18n;
