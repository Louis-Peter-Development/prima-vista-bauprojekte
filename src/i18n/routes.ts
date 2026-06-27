// Central route registry for the trilingual site.
//
// German is the default locale and keeps its original, un-prefixed URLs so the
// existing SEO and bookmarks never break. English and Italian live under a
// `/en` and `/it` prefix AND get fully translated slugs, e.g.
//   DE  /gewerke           (canonical)
//   EN  /en/trades
//   IT  /it/mestieri
//
// The German path is the canonical identity of a page everywhere in the code.
// Components keep linking with German paths (`to="/gewerke"`) and the localized
// <Link> wrapper rewrites them to the active locale. Routing, the language
// switcher and hreflang tags are all generated from the table below.

export const LOCALES = ['de', 'en', 'it'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'de';

export const LOCALE_LABELS: Record<Locale, string> = {
  de: 'Deutsch',
  en: 'English',
  it: 'Italiano',
};

/** Short label shown inside the language switcher. */
export const LOCALE_SHORT: Record<Locale, string> = {
  de: 'DE',
  en: 'EN',
  it: 'IT',
};

/** `<html lang>` / hreflang attribute value for each locale. */
export const LOCALE_HTML_LANG: Record<Locale, string> = {
  de: 'de',
  en: 'en',
  it: 'it',
};

type SlugMap = { en: string; it: string };

// canonical German path (without leading slash) -> { en, it } slug.
// Dynamic segments keep their `:param` placeholder; only the static prefix is
// translated, the content slug tail is preserved as-is.
const SLUGS: Record<string, SlugMap> = {
  'gewerke': { en: 'trades', it: 'mestieri' },
  'badsanierung': { en: 'bathroom-renovation', it: 'ristrutturazione-bagno' },
  'badsanierung-gaeste-wc': { en: 'bathroom-guest-wc', it: 'bagno-ospiti' },
  'kuechen-moebelbau': { en: 'kitchens-cabinetry', it: 'cucine-mobili' },
  'boeden-belaege': { en: 'floors-coverings', it: 'pavimenti-rivestimenti' },
  'elektroinstallation': { en: 'electrical-installation', it: 'impianto-elettrico' },
  'trockenbau': { en: 'drywall', it: 'cartongesso' },
  'maler-lackierer': { en: 'painting-decorating', it: 'pittura-verniciatura' },
  'fassadensanierung': { en: 'facade-renovation', it: 'ristrutturazione-facciata' },
  'abdichtung-keller': { en: 'waterproofing-basement', it: 'impermeabilizzazione-cantina' },
  'dachsanierung': { en: 'roof-renovation', it: 'ristrutturazione-tetto' },
  'treppen-gelaender': { en: 'stairs-railings', it: 'scale-ringhiere' },
  'garten-aussenanlagen': { en: 'garden-landscaping', it: 'giardino-esterni' },
  'barrierefreiheit': { en: 'accessibility', it: 'accessibilita' },
  'fenstertechnik': { en: 'windows', it: 'serramenti' },
  'rohbau-abbruch': { en: 'shell-demolition', it: 'struttura-demolizione' },
  'tueren-zargen': { en: 'doors-frames', it: 'porte-telai' },
  'sanitaerinstallation': { en: 'plumbing', it: 'impianto-idraulico' },
  'zaeune': { en: 'fences', it: 'recinzioni' },
  'komplett-pakete': { en: 'complete-packages', it: 'pacchetti-completi' },
  'projekte': { en: 'projects', it: 'progetti' },
  'projekte/:slug': { en: 'projects/:slug', it: 'progetti/:slug' },
  'blog': { en: 'magazine', it: 'magazine' },
  'blog/:slug': { en: 'magazine/:slug', it: 'magazine/:slug' },
  'kontakt': { en: 'contact', it: 'contatto' },
  'blitz-angebot': { en: 'express-quote', it: 'preventivo-express' },
  'kalkulator': { en: 'calculator', it: 'calcolatore' },
  'haus-sanierung': { en: 'house-renovation', it: 'ristrutturazione-casa' },
  'wohnung-sanierung': { en: 'apartment-renovation', it: 'ristrutturazione-appartamento' },
  'gastronomie-ausbau': { en: 'restaurant-fit-out', it: 'allestimento-ristorazione' },
  'buero-ausbau': { en: 'office-fit-out', it: 'allestimento-ufficio' },
  'heizmethoden': { en: 'heating-methods', it: 'metodi-riscaldamento' },
  'heizkoerper': { en: 'radiators', it: 'radiatori' },
  'heizstraenge': { en: 'heating-risers', it: 'colonne-riscaldamento' },
  'fussbodenheizung': { en: 'underfloor-heating', it: 'riscaldamento-a-pavimento' },
  'waermepumpe': { en: 'heat-pump', it: 'pompa-di-calore' },
  'gas-heizung': { en: 'gas-heating', it: 'riscaldamento-a-gas' },
  'pelletofen': { en: 'pellet-stove', it: 'stufa-a-pellet' },
  'saunaofen': { en: 'sauna-heater', it: 'stufa-per-sauna' },
  'impressum': { en: 'imprint', it: 'note-legali' },
  'datenschutz': { en: 'privacy-policy', it: 'privacy' },
};

export type RouteKey = string; // canonical German path WITHOUT leading slash ('' === home)

/** All canonical (German) route patterns, including dynamic ones and home (''). */
export const ROUTE_KEYS: RouteKey[] = ['', ...Object.keys(SLUGS)];

// Longest canonical prefixes first so `/projekte/:slug` wins over `/projekte`.
const STATIC_KEYS_BY_LENGTH = Object.keys(SLUGS)
  .filter((k) => !k.includes(':'))
  .sort((a, b) => b.length - a.length);

function splitTrailing(path: string): { base: string; tail: string } {
  // Separate an optional query/hash tail so it survives translation.
  const match = path.match(/^([^?#]*)([?#].*)?$/);
  return { base: match?.[1] ?? path, tail: match?.[2] ?? '' };
}

/** Strip a leading `/en` or `/it` locale prefix; returns the locale + remainder. */
export function localeFromPathname(pathname: string): Locale {
  if (pathname === '/en' || pathname.startsWith('/en/')) return 'en';
  if (pathname === '/it' || pathname.startsWith('/it/')) return 'it';
  return 'de';
}

function stripLocalePrefix(pathname: string): { locale: Locale; rest: string } {
  const locale = localeFromPathname(pathname);
  if (locale === 'de') return { locale, rest: pathname };
  const rest = pathname.slice(`/${locale}`.length) || '/';
  return { locale, rest };
}

/**
 * Map any in-app path (expressed with the canonical German slug) to the URL for
 * the given locale. Query/hash and dynamic content tails are preserved.
 */
export function localizedPath(canonical: string, locale: Locale): string {
  // Admin lives outside the localized URL space — never prefix or translate it.
  if (canonical === '/admin' || canonical.startsWith('/admin/')) return canonical;

  // Allow callers to pass an already-localized path defensively.
  const normalizedCanonical = toCanonicalPath(canonical);
  const { base, tail } = splitTrailing(normalizedCanonical);

  if (base === '/' || base === '') {
    return (locale === 'de' ? '/' : `/${locale}`) + tail;
  }

  const segment = base.replace(/^\//, '');

  if (locale === 'de') return `/${segment}${tail}`;

  // Find the longest canonical static prefix that matches this path.
  const key = STATIC_KEYS_BY_LENGTH.find(
    (k) => segment === k || segment.startsWith(`${k}/`),
  );
  if (!key) return `/${locale}/${segment}${tail}`; // unknown path: prefix only

  const localizedSlug = SLUGS[key][locale];
  const remainder = segment.slice(key.length); // includes leading '/' for tails
  return `/${locale}/${localizedSlug}${remainder}${tail}`;
}

/**
 * Reverse of {@link localizedPath}: turn any (possibly localized) pathname back
 * into its canonical German path, so pathname-based logic (nav highlighting,
 * route metadata lookup) keeps working regardless of the active locale.
 */
export function toCanonicalPath(pathname: string): string {
  const { locale, rest } = stripLocalePrefix(pathname);
  if (locale === 'de') return rest;

  const { base, tail } = splitTrailing(rest);
  const segment = base.replace(/^\//, '');
  if (segment === '') return `/${tail}`;

  // Find the localized slug that matches and swap it back to German.
  for (const key of Object.keys(SLUGS)) {
    if (key.includes(':')) continue;
    const localized = SLUGS[key][locale];
    if (segment === localized || segment.startsWith(`${localized}/`)) {
      const remainder = segment.slice(localized.length);
      return `/${key}${remainder}${tail}`;
    }
  }
  return `/${segment}${tail}`;
}

/** Route path pattern (with `:param`) for React Router, per locale. */
export function routePattern(canonicalKey: RouteKey, locale: Locale): string {
  if (canonicalKey === '') return locale === 'de' ? '/' : `/${locale}`;
  if (locale === 'de') return `/${canonicalKey}`;
  return `/${locale}/${SLUGS[canonicalKey][locale]}`;
}
