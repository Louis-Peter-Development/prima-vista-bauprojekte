import type { Locale } from './routes';

// ─────────────────────────────────────────────────────────────────────────────
// Render-only translation layer for the RenovationCalculator product catalog.
//
// HARD RULE: the German `title`/`sku`/`id` fields in
// `src/data/calculator/packages/*.ts` are the canonical identity the pricing
// engine, the `audit:calculator-data` script and the server PDF all key on.
// They are NEVER edited. This map is consulted at RENDER time only, to swap the
// *displayed* string for EN/IT while the underlying German data stays intact.
//
// SCOPE: it is intentionally seeded only with the bounded, high-visibility
// CATEGORY titles, CATEGORY leads and SUBSECTION titles — there are a few dozen
// distinct ones (generic section names like "Material", "Optionale Positionen",
// the trade section headers, etc.). They are keyed by their canonical German
// string, which is stable and unique enough to act as the lookup key.
//
// The ~5,738 individual product `row.title` values are NOT translated here:
// that is a deliberate bulk-translation TODO. `localizeCatalog` falls back to
// the German title for any key that is not present, so products simply render
// in German until the per-product catalog is filled in.
// ─────────────────────────────────────────────────────────────────────────────

export const CATALOG_TRANSLATIONS: Map<string, { en: string; it: string }> = new Map([
  // ── Generic section / subsection names ──────────────────────────────────────
  ['Leistungen & Materialien', { en: 'Services & materials', it: 'Prestazioni e materiali' }],
  ['Ausgewählte Leistungen und Materialien.', {
    en: 'Selected services and materials.',
    it: 'Prestazioni e materiali selezionati.',
  }],
  ['Material', { en: 'Material', it: 'Materiale' }],
  ['Extra Positionen', { en: 'Extra items', it: 'Voci aggiuntive' }],
  ['Optionale Positionen', { en: 'Optional items', it: 'Voci opzionali' }],
  ['Alternativ', { en: 'Alternative', it: 'Alternativa' }],
  ['Art der Ausführung', { en: 'Type of work', it: 'Tipo di esecuzione' }],
  ['Vollsanierung', { en: 'Full renovation', it: 'Ristrutturazione completa' }],
  ['Raumanpassung', { en: 'Room adaptation', it: 'Adattamento dei locali' }],
  ['Sicherheit & Komfort', { en: 'Safety & comfort', it: 'Sicurezza e comfort' }],
  ['Demontage', { en: 'Removal', it: 'Smontaggio' }],
  ['Bodenbelag', { en: 'Floor covering', it: 'Pavimentazione' }],
  ['Rohrinstallation', { en: 'Pipework installation', it: 'Installazione tubazioni' }],
  ['Sicherheitselemente', { en: 'Safety elements', it: 'Elementi di sicurezza' }],
  ['Tür & Zugang', { en: 'Door & access', it: 'Porta e accesso' }],
  ['Barrierefreies WC', { en: 'Accessible WC', it: 'WC accessibile' }],
  ['Unterfahrbarer Waschtisch', { en: 'Wheelchair-accessible washbasin', it: 'Lavabo accessibile in carrozzina' }],
  ['Duschbereich', { en: 'Shower area', it: 'Zona doccia' }],
  ['Bodengleiche Dusche', { en: 'Walk-in shower', it: 'Doccia a filo pavimento' }],

  // ── Trade section headers (category titles) ─────────────────────────────────
  ['Abbruch & Vorbereitung', { en: 'Demolition & preparation', it: 'Demolizione e preparazione' }],
  ['ABBRUCH | Basis-Haus', { en: 'DEMOLITION | Base house', it: 'DEMOLIZIONE | Casa base' }],
  ['CONTAINER & ENTSORGUNG | Basis-Haus', {
    en: 'SKIP & DISPOSAL | Base house',
    it: 'CONTAINER E SMALTIMENTO | Casa base',
  }],
  ['STAHLTRÄGER | Basis-Haus', { en: 'STEEL BEAMS | Base house', it: 'TRAVI IN ACCIAIO | Casa base' }],
  ['ESTRICH | Basis-Haus', { en: 'SCREED | Base house', it: 'MASSETTO | Casa base' }],
  ['ESTRICH-BODEN', { en: 'SCREED FLOOR', it: 'PAVIMENTO IN MASSETTO' }],
  ['TROCKENBAU | Basis-Haus', { en: 'DRYWALL | Base house', it: 'CARTONGESSO | Casa base' }],
  ['VERPUTZE | Basis-Haus', { en: 'PLASTERING | Base house', it: 'INTONACI | Casa base' }],
  ['WASSERINSTALLATION | Basis-Haus', {
    en: 'PLUMBING INSTALLATION | Base house',
    it: 'IMPIANTO IDRAULICO | Casa base',
  }],
  ['IT-NETZWERK | Basis-Haus', { en: 'IT NETWORK | Base house', it: 'RETE IT | Casa base' }],
  ['LAMPEN & LEUCHTMITTEL | Basis-Haus', {
    en: 'LAMPS & BULBS | Base house',
    it: 'LAMPADE E ILLUMINAZIONE | Casa base',
  }],
  ['HEIZKÖRPER | Basis-Haus', { en: 'RADIATORS | Base house', it: 'RADIATORI | Casa base' }],
  ['HEIZKÖRPER', { en: 'RADIATORS', it: 'RADIATORI' }],
  ['BODENHEIZUNG | Basis-Haus', {
    en: 'UNDERFLOOR HEATING | Base house',
    it: 'RISCALDAMENTO A PAVIMENTO | Casa base',
  }],
  ['FLÄCHENHEIZSYSTEM', { en: 'SURFACE HEATING SYSTEM', it: 'SISTEMA DI RISCALDAMENTO A SUPERFICIE' }],
  ['THERMEN & WÄRMEPUMPEN | Basis-Haus', {
    en: 'BOILERS & HEAT PUMPS | Base house',
    it: 'CALDAIE E POMPE DI CALORE | Casa base',
  }],
  ['DACHSTUHL | Basis-Haus', { en: 'ROOF TRUSS | Base house', it: 'STRUTTURA DEL TETTO | Casa base' }],
  ['DACHFENSTER | Basis-Haus', { en: 'ROOF WINDOWS | Base house', it: 'FINESTRE PER TETTI | Casa base' }],
  ['GAUBEN-DACH | Basis-Haus', { en: 'DORMER ROOF | Base house', it: 'TETTO CON ABBAINI | Casa base' }],
  ['INNENAUSBAU-DACH | Basis-Haus', {
    en: 'INTERIOR ROOF FINISHING | Base house',
    it: 'FINITURE INTERNE DEL TETTO | Casa base',
  }],
  ['DÄMMUNG - Fassade', { en: 'INSULATION - Façade', it: 'ISOLAMENTO - Facciata' }],
  ['HOLZ - Fassaden Verkleidung', { en: 'WOOD - Façade cladding', it: 'LEGNO - Rivestimento di facciata' }],
  ['KLINKERRIEMCHEN - Fassaden Verkleidung', {
    en: 'BRICK SLIPS - Façade cladding',
    it: 'LISTELLI IN CLINKER - Rivestimento di facciata',
  }],
  ['NATURSTEIN- Fassaden Verkleidung', {
    en: 'NATURAL STONE - Façade cladding',
    it: 'PIETRA NATURALE - Rivestimento di facciata',
  }],
  ['VERBLENDMAUERWERK - Fassaden Verkleidung', {
    en: 'FACING MASONRY - Façade cladding',
    it: 'MURATURA A VISTA - Rivestimento di facciata',
  }],
  ['VORHANGFASSADE', { en: 'CURTAIN WALL', it: 'FACCIATA VENTILATA' }],
  ['PLATTENVERKLEIDUNG', { en: 'PANEL CLADDING', it: 'RIVESTIMENTO A PANNELLI' }],
  ['FLIESEN BADEZIMMER', { en: 'TILES BATHROOM', it: 'PIASTRELLE BAGNO' }],
  ['FLIESEN GÄSTE WC', { en: 'TILES GUEST WC', it: 'PIASTRELLE WC OSPITI' }],
  ['FLIESEN-BODEN', { en: 'TILED FLOOR', it: 'PAVIMENTO IN PIASTRELLE' }],
  ['HOLZ-BODEN', { en: 'WOOD FLOOR', it: 'PAVIMENTO IN LEGNO' }],
  ['TEPPICH-BODEN', { en: 'CARPET FLOOR', it: 'PAVIMENTO IN MOQUETTE' }],
  ['SANITÄR BADEZIMMER', { en: 'SANITARY BATHROOM', it: 'SANITARI BAGNO' }],
  ['SANITÄR GÄSTE WC', { en: 'SANITARY GUEST WC', it: 'SANITARI WC OSPITI' }],
  ['Sanitärobjekte', { en: 'Sanitary fixtures', it: 'Oggetti sanitari' }],

  // ── Calculator area/scope field labels (configurator `customAreaLabel`) ─────
  ['Küchenumfang', { en: 'Kitchen size', it: 'Dimensione cucina' }],
  ['Gartenumfang', { en: 'Garden size', it: 'Dimensione giardino' }],
  ['Rohbauumfang', { en: 'Shell size', it: 'Dimensione struttura' }],
  ['Fassadenfläche', { en: 'Façade area', it: 'Superficie facciata' }],
  ['Fläche / Etagen', { en: 'Area / floors', it: 'Superficie / piani' }],
  ['Fläche / Umfang', { en: 'Area / scope', it: 'Superficie / entità' }],
  ['Anschlüsse / Umfang', { en: 'Connections / scope', it: 'Allacciamenti / entità' }],
  ['Stück / Umfang', { en: 'Units / scope', it: 'Pezzi / entità' }],
  ['Stufen / Umfang', { en: 'Steps / scope', it: 'Gradini / entità' }],
  ['Türen / Umfang', { en: 'Doors / scope', it: 'Porte / entità' }],
  ['Zaunlänge / Umfang', { en: 'Fence length / scope', it: 'Lunghezza recinzione / entità' }],
]);

/**
 * Render-only catalog localizer. Returns the localized display string for a
 * catalog title/lead if one is seeded in {@link CATALOG_TRANSLATIONS}, else the
 * German fallback. `key` is the stable lookup key — the canonical German string
 * for category/subsection titles, or a product `sku` for per-product titles
 * (per-product translations are an intentional TODO and fall back to German).
 */
export function localizeCatalog(key: string, german: string, locale: Locale): string {
  if (locale === 'de') return german;
  const entry = CATALOG_TRANSLATIONS.get(key) ?? CATALOG_TRANSLATIONS.get(german);
  if (!entry) return german;
  return locale === 'en' ? entry.en : entry.it;
}

// ─────────────────────────────────────────────────────────────────────────────
// Locale-aware number formatting for the live result panels. The German source
// helpers (`formatTsd` in the data files) hardcode `de-DE` grouping and the
// German abbreviations "Tsd."/"Mio."; these render-time equivalents localize
// both the grouping and the suffix while keeping the German output identical.
// ─────────────────────────────────────────────────────────────────────────────

const LOCALE_TAG: Record<Locale, string> = { de: 'de-DE', en: 'en-US', it: 'it-IT' };

/** Compact currency magnitude, e.g. DE "93 Tsd." / EN "93k" / IT "93 mila". */
export function formatTsd(n: number, locale: Locale): string {
  const tag = LOCALE_TAG[locale];
  if (n >= 1_000_000) {
    const value = (n / 1_000_000).toLocaleString(tag, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    const suffix = locale === 'en' ? 'M' : locale === 'it' ? 'mln' : 'Mio.';
    return locale === 'en' ? `${value}${suffix}` : `${value} ${suffix}`;
  }
  const value = Math.round(n / 1000).toLocaleString(tag);
  const suffix = locale === 'en' ? 'k' : locale === 'it' ? 'mila' : 'Tsd.';
  return locale === 'en' ? `${value}${suffix}` : `${value} ${suffix}`;
}

/** Locale-grouped integer, e.g. DE "1.552" / EN "1,552" / IT "1.552". */
export function formatGroupedInt(n: number, locale: Locale): string {
  return Math.round(n).toLocaleString(LOCALE_TAG[locale]);
}

/**
 * Locale-aware EUR currency for the calculator's on-screen display, e.g.
 * DE "1.234,56 €" / EN "€1,234.56" / IT "1.234,56 €". The engine's own
 * `formatEuro` (always `de-DE`) is left untouched — it feeds the canonical
 * handoff/server PDF, which must stay German.
 */
export function formatEuroLocalized(value: number, locale: Locale): string {
  return new Intl.NumberFormat(LOCALE_TAG[locale], {
    style: 'currency',
    currency: 'EUR',
  }).format(value);
}
