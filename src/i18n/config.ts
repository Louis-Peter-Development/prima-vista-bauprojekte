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
import deProjects from './locales/de/projects.json';
import enProjects from './locales/en/projects.json';
import itProjects from './locales/it/projects.json';
import deKalk from './locales/de/kalk.json';
import enKalk from './locales/en/kalk.json';
import itKalk from './locales/it/kalk.json';
import deBlitz from './locales/de/blitz.json';
import enBlitz from './locales/en/blitz.json';
import itBlitz from './locales/it/blitz.json';

export const NAMESPACES = ['common', 'home', 'legal', 'kontakt', 'pages', 'projects', 'kalk', 'blitz'] as const;

const resources = {
  de: { common: deCommon, home: deHome, legal: deLegal, kontakt: deKontakt, pages: dePages, projects: deProjects, kalk: deKalk, blitz: deBlitz },
  en: { common: enCommon, home: enHome, legal: enLegal, kontakt: enKontakt, pages: enPages, projects: enProjects, kalk: enKalk, blitz: enBlitz },
  it: { common: itCommon, home: itHome, legal: itLegal, kontakt: itKontakt, pages: itPages, projects: itProjects, kalk: itKalk, blitz: itBlitz },
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
