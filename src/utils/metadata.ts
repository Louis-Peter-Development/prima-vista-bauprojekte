import { SITE_NAME, SITE_ORIGIN } from '../data/routeMeta';
import {
  type Locale,
  LOCALES,
  LOCALE_HTML_LANG,
  localeFromPathname,
  localizedPath,
  toCanonicalPath,
} from '../i18n/routes';

type PageMeta = {
  title?: string;
  description?: string;
  /** Canonical (German) in-app path, e.g. `/gewerke`. */
  canonical?: string;
  locale?: Locale;
};

const OG_LOCALE: Record<Locale, string> = {
  de: 'de_DE',
  en: 'en_US',
  it: 'it_IT',
};

function upsertMeta(selector: string, attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function upsertLink(rel: string, href: string, hreflang?: string) {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]`;
  let element = document.head.querySelector<HTMLLinkElement>(selector);
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    if (hreflang) element.setAttribute('hreflang', hreflang);
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
}

export function setPageMeta({ title, description, canonical, locale }: PageMeta) {
  const activeLocale = locale ?? localeFromPathname(window.location.pathname);
  const canonicalPath = canonical ?? toCanonicalPath(window.location.pathname);
  const url = `${SITE_ORIGIN}${localizedPath(canonicalPath, activeLocale)}`;
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;

  document.title = fullTitle;
  upsertMeta('meta[property="og:title"]', 'property', 'og:title', fullTitle);
  upsertMeta('meta[property="og:site_name"]', 'property', 'og:site_name', SITE_NAME);
  upsertMeta('meta[property="og:type"]', 'property', 'og:type', 'website');
  upsertMeta('meta[property="og:url"]', 'property', 'og:url', url);
  upsertMeta('meta[property="og:locale"]', 'property', 'og:locale', OG_LOCALE[activeLocale]);
  upsertMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
  upsertLink('canonical', url);

  // hreflang alternates so search engines map the DE/EN/IT versions together.
  for (const loc of LOCALES) {
    upsertLink('alternate', `${SITE_ORIGIN}${localizedPath(canonicalPath, loc)}`, LOCALE_HTML_LANG[loc]);
  }
  upsertLink('alternate', `${SITE_ORIGIN}${localizedPath(canonicalPath, 'de')}`, 'x-default');

  if (description) {
    upsertMeta('meta[name="description"]', 'name', 'description', description);
    upsertMeta('meta[property="og:description"]', 'property', 'og:description', description);
    upsertMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);
  }
}
