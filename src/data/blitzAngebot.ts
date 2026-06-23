export type BlitzFormState = {
  art: 'pakete' | 'gewerke' | 'heizung' | 'anderes';
  gewerke: string[];
  groesse: string;
  starttermin: string;
  msg: string;
  name: string;
  email: string;
  tel: string;
};

export const INITIAL_BLITZ_FORM: BlitzFormState = {
  art: 'pakete',
  gewerke: [],
  groesse: '',
  starttermin: '',
  msg: '',
  name: '',
  email: '',
  tel: '',
};

export const BLITZ_ART_OPTIONS: Array<{ value: BlitzFormState['art']; label: string }> = [
  { value: 'pakete', label: 'Komplett-Pakete' },
  { value: 'gewerke', label: 'Gewerke' },
  { value: 'heizung', label: 'Heizmethoden' },
  { value: 'anderes', label: 'Anderes' },
];

export type BlitzServiceGroup = {
  key: string;
  label: string;
  options: string[];
};

export const BLITZ_SERVICE_GROUPS: BlitzServiceGroup[] = [
  {
    key: 'pakete',
    label: 'Komplett-Pakete',
    options: [
      'Haus-Sanierung',
      'Wohnung-Sanierung',
      'Gastronomie-Ausbau',
      'Büro-Ausbau',
    ],
  },
  {
    key: 'gewerke',
    label: 'Gewerke',
    options: [
      'Bäder & Sanitär',
      'Küchen & Möbelbau',
      'Böden & Beläge',
      'Elektroinstallation',
      'Sanitärinstallation',
      'Trockenbau',
      'Maler & Lackierer',
      'Fassadensanierung',
      'Dachsanierung',
      'Abdichtung & Keller',
      'Treppen & Geländer',
      'Garten & Außenanlagen',
      'Barrierefreiheit',
      'Fenstertechnik',
      'Rohbau & Abbruch',
      'Türen & Zargen',
      'Zäune & Tore',
    ],
  },
  {
    key: 'heizung',
    label: 'Heizmethoden',
    options: [
      'Heizkörper',
      'Heizstränge',
      'Fußboden-Heizung',
      'Luft-Wärmepumpe',
      'Gas-Heizung',
      'Pelletofen',
      'Saunaofen',
    ],
  },
];

export const BLITZ_GEWERKE_OPTIONS = BLITZ_SERVICE_GROUPS.flatMap((group) => group.options);

/* ----- Handoff from Kalkulator → Blitz-Angebot ----- */

export type KalkulatorRow = {
  /** Cleaned product title without trailing pricing markers. */
  label: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  subtotal: number;
  sku?: string;
  description?: string;
  image?: string;
  category?: string;
  subcategory?: string;
  type?: string;
};

export type KalkulatorPick = {
  key: string;
  label: string;
  subtotal: number;
  sku?: string;
  description?: string;
  image?: string;
  category?: string;
  subcategory?: string;
  type?: string;
  /** Optional trade grouping for hierarchical display. When set, picks
   *  with the same tradeKey are rendered nested under the tradeLabel. */
  tradeKey?: string;
  tradeLabel?: string;
  /** Individual line items contributing to this pick's subtotal. */
  rows?: KalkulatorRow[];
};

export type KalkulatorHandoff = {
  kind: BlitzFormState['art'];
  kindLabel: string;          // e.g. "2-Zimmer-Wohnung", "Restaurant"
  scopeLabel?: string;
  area: number;
  picks: KalkulatorPick[];
  totalMin: number;
  totalMax: number;
  totalMid: number;
  perM2: number;
};

export type KalkulatorGroup = {
  key: string;
  label: string;
  subtotal: number;
  items: KalkulatorPick[];
};

/** Map SKU prefixes (first segment, e.g. ROHB-201-MAT → "ROHB") to a
 *  human-readable trade label. Used to nest the flat category breakdown
 *  in the Bossmann calculator under their parent trade. */
const SKU_PREFIX_TO_TRADE: Record<string, string> = {
  ROHB: 'Abbruch & Rohbau',
  TROC: 'Trockenbau',
  ELEK: 'Elektroinstallation',
  WASS: 'Wasserinstallation & Sanitär',
  BADE: 'Badezimmer',
  GAWC: 'Gäste-WC',
  BODE: 'Bodenbeläge',
  HEIZ: 'Heizung',
  KUEC: 'Küche',
  MALE: 'Maler & Lackierer',
  FENS: 'Fenster',
  TUER: 'Türen & Zargen',
  ABBD: 'Abdichtung',
  DACH: 'Dach',
  FASS: 'Fassade',
  ENTS: 'Entsorgung',
  MON: 'Montage & Sonstiges',
  LHT: 'Licht',
  CARP: 'Schreinerei',
  GARA: 'Garage',
  GART: 'Garten & Außenanlagen',
  TREP: 'Treppen',
  TR: 'Treppen',
  ZAUN: 'Zaun',
  PV: 'Photovoltaik',
  // MAT (Material) and BLITZ (cross-package add-ons) intentionally not mapped:
  // they're generic line types meant to inherit from the preceding trade.
};

export function inferTradeFromSku(sku: string | undefined): { key: string; label: string } | null {
  if (!sku) return null;
  const prefix = sku.split('-')[0]?.toUpperCase();
  if (!prefix) return null;
  const label = SKU_PREFIX_TO_TRADE[prefix];
  if (!label) return null;
  return { key: prefix.toLowerCase(), label };
}

/** Map kalkulator gewerke/trade keys → BLITZ_GEWERKE_OPTIONS labels. */
const KALKULATOR_TO_BLITZ_GEWERKE: Record<string, string> = {
  // Package-level choices
  haus: 'Haus-Sanierung',
  wohnung: 'Wohnung-Sanierung',
  gastronomie: 'Gastronomie-Ausbau',
  buero: 'Büro-Ausbau',

  // Haus / Wohnung
  bad: 'Bäder & Sanitär',
  sanitaer: 'Sanitärinstallation',
  sanitaerstraenge: 'Sanitärinstallation',
  wasser: 'Sanitärinstallation',
  kueche: 'Küchen & Möbelbau',
  teekueche: 'Küchen & Möbelbau',
  moebel: 'Küchen & Möbelbau',
  boeden: 'Böden & Beläge',
  boden: 'Böden & Beläge',
  maler: 'Maler & Lackierer',
  trockenbau: 'Trockenbau',
  akustik: 'Trockenbau',
  elektro: 'Elektroinstallation',
  netzwerk: 'Elektroinstallation',
  licht: 'Elektroinstallation',
  brandschutz: 'Elektroinstallation',
  fassade: 'Fassadensanierung',
  dach: 'Dachsanierung',
  fenster: 'Fenstertechnik',
  tueren: 'Türen & Zargen',
  rohbau: 'Rohbau & Abbruch',
  abdichtung: 'Abdichtung & Keller',
  abbruch: 'Rohbau & Abbruch',
  heizflaechen: 'Heizkörper',
  thermen: 'Luft-Wärmepumpe',
  treppen: 'Treppen & Geländer',
  garten: 'Garten & Außenanlagen',
  barrierefreiheit: 'Barrierefreiheit',
  zaeune: 'Zäune & Tore',
  zaun: 'Zäune & Tore',

  // SKU-derived trade keys
  bade: 'Bäder & Sanitär',
  gawc: 'Bäder & Sanitär',
  bode: 'Böden & Beläge',
  elek: 'Elektroinstallation',
  wass: 'Sanitärinstallation',
  kuec: 'Küchen & Möbelbau',
  male: 'Maler & Lackierer',
  troc: 'Trockenbau',
  fass: 'Fassadensanierung',
  fens: 'Fenstertechnik',
  tuer: 'Türen & Zargen',
  rohb: 'Rohbau & Abbruch',
  abbd: 'Abdichtung & Keller',
  gart: 'Garten & Außenanlagen',
  trep: 'Treppen & Geländer',
  tr: 'Treppen & Geländer',
  pv: 'Luft-Wärmepumpe',
  carp: 'Küchen & Möbelbau',
  // Gastronomie
  lueftung: 'Luft-Wärmepumpe',
  kuehlung: 'Luft-Wärmepumpe',
  // Büro
  klima: 'Luft-Wärmepumpe',
};

function normalizeChoiceLabel(value: string): string {
  return value.toLocaleLowerCase('de-DE').replace(/[^a-zäöüß0-9]+/g, '');
}

/** Pick the unique set of Blitz service labels matching the kalkulator picks. */
export function mapKalkulatorPicksToBlitzGewerke(picks: KalkulatorPick[], kindLabel?: string): string[] {
  const set = new Set<string>();

  if (kindLabel) {
    const normalizedKind = normalizeChoiceLabel(kindLabel);
    const exactKind = BLITZ_GEWERKE_OPTIONS.find((option) => {
      const normalizedOption = normalizeChoiceLabel(option);
      return normalizedOption === normalizedKind
        || normalizedOption.includes(normalizedKind)
        || normalizedKind.includes(normalizedOption);
    });
    if (exactKind) return [exactKind];
  }

  for (const pick of picks) {
    const mapped = KALKULATOR_TO_BLITZ_GEWERKE[pick.key] ?? (
      pick.tradeKey ? KALKULATOR_TO_BLITZ_GEWERKE[pick.tradeKey] : undefined
    );
    if (mapped) set.add(mapped);
  }
  return Array.from(set);
}

const TSD = (n: number) => `€ ${Math.round(n / 1000).toLocaleString('de-DE')} Tsd.`;

/** Format a subtotal compactly: < 1000 € → exact euros, otherwise rounded
 *  thousands. Avoids the "€ 0 Tsd." artefact when a small sub-item rounds
 *  down. */
export function formatPickAmount(n: number): string {
  if (n <= 0) return '—';
  if (n < 1000) return `€ ${Math.round(n).toLocaleString('de-DE')}`;
  return TSD(n);
}

/** Group flat picks under their inferred trade.
 *
 *  Calculator packages encode parent-child relationships through *order*,
 *  not metadata: generic categories like "Material" or "Extra Positionen"
 *  follow the trade they belong to. So when a pick has no trade key (its
 *  rows use a generic SKU prefix like MAT-/BLITZ-), we attach it to the
 *  most recent trade group. Only the very first pick falls back to its
 *  own label as the group header. */
export function groupPicksByTrade(picks: KalkulatorPick[]): KalkulatorGroup[] {
  const groups: KalkulatorGroup[] = [];
  const byKey = new Map<string, KalkulatorGroup>();
  let lastGroup: KalkulatorGroup | null = null;

  function pushIntoGroup(group: KalkulatorGroup, pick: KalkulatorPick) {
    group.items.push(pick);
    group.subtotal += pick.subtotal;
    lastGroup = group;
  }

  for (const pick of picks) {
    if (pick.tradeKey) {
      let group = byKey.get(pick.tradeKey);
      if (!group) {
        group = {
          key: pick.tradeKey,
          label: pick.tradeLabel ?? pick.label,
          subtotal: 0,
          items: [],
        };
        byKey.set(pick.tradeKey, group);
        groups.push(group);
      }
      pushIntoGroup(group, pick);
    } else if (lastGroup) {
      // Inherit the previous trade — preserves the "trade → line items" shape
      // for generic Material / Extra Positionen categories.
      pushIntoGroup(lastGroup, pick);
    } else {
      // First pick has no trade — start a standalone group from the label.
      const group: KalkulatorGroup = {
        key: `_${pick.key}`,
        label: pick.label,
        subtotal: 0,
        items: [],
      };
      groups.push(group);
      pushIntoGroup(group, pick);
    }
  }
  return groups;
}

/** Build a human-readable message block from a kalkulator handoff. */
export function formatKalkulatorMessage(handoff: KalkulatorHandoff): string {
  const groups = groupPicksByTrade(handoff.picks);
  const lines = [
    `— Aus dem Kalkulator übernommen —`,
    `Objektart: ${handoff.kindLabel}`,
    `Fläche: ${handoff.area} m²`,
    `Vorab-Schätzung: ${TSD(handoff.totalMin)} – ${TSD(handoff.totalMax)} (Mittelwert ${TSD(handoff.totalMid)} · ca. € ${Math.round(handoff.perM2).toLocaleString('de-DE')} / m²)`,
    ``,
    `Gewählte Gewerke:`,
  ];
  for (const group of groups) {
    const groupHasNested = group.items.length > 1 || group.items[0]?.label !== group.label;
    if (groupHasNested) {
      lines.push(`  • ${group.label} — ${formatPickAmount(group.subtotal)}`);
      for (const item of group.items) {
        lines.push(`      – ${item.label} — ${formatPickAmount(item.subtotal)}`);
        if (item.rows) {
          for (const row of item.rows) {
            const qty = formatRowQuantity(row.quantity, row.unit);
            lines.push(`          · ${row.label} (${qty}) — ${formatPickAmount(row.subtotal)}`);
          }
        }
      }
    } else {
      lines.push(`  • ${group.label} — ${formatPickAmount(group.subtotal)}`);
      const item = group.items[0];
      if (item?.rows) {
        for (const row of item.rows) {
          const qty = formatRowQuantity(row.quantity, row.unit);
          lines.push(`      · ${row.label} (${qty}) — ${formatPickAmount(row.subtotal)}`);
        }
      }
    }
  }
  return lines.join('\n');
}

/** "1,5 qm" / "2 Stück" — formatted quantity with unit for the breakdown. */
export function formatRowQuantity(quantity: number, unit: string): string {
  const num = Number.isInteger(quantity)
    ? quantity.toLocaleString('de-DE')
    : quantity.toLocaleString('de-DE', { maximumFractionDigits: 2 });
  return `${num}\u00a0${unit}`;
}
