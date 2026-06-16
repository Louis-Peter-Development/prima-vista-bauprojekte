export type BlitzFormState = {
  art: 'haus' | 'wohnung' | 'gastro' | 'buero' | 'anderes';
  gewerke: string[];
  groesse: string;
  starttermin: string;
  msg: string;
  name: string;
  email: string;
  tel: string;
};

export const INITIAL_BLITZ_FORM: BlitzFormState = {
  art: 'haus',
  gewerke: [],
  groesse: '',
  starttermin: '',
  msg: '',
  name: '',
  email: '',
  tel: '',
};

export const BLITZ_ART_OPTIONS: Array<{ value: BlitzFormState['art']; label: string }> = [
  { value: 'haus', label: 'Haus' },
  { value: 'wohnung', label: 'Wohnung' },
  { value: 'gastro', label: 'Gastronomie' },
  { value: 'buero', label: 'Büro' },
  { value: 'anderes', label: 'Anderes' },
];

export const BLITZ_GEWERKE_OPTIONS = [
  'Komplettabriss / Rohbau',
  'Bad & Sanitär',
  'Küche',
  'Böden & Parkett',
  'Wände & Maler',
  'Elektrik',
  'Fassade / Dach',
  'Heizung / Energie',
];

/* ----- Handoff from Kalkulator → Blitz-Angebot ----- */

export type KalkulatorRow = {
  /** Cleaned product title without trailing pricing markers. */
  label: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  subtotal: number;
};

export type KalkulatorPick = {
  key: string;
  label: string;
  subtotal: number;
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

/** Map kalkulator gewerke keys → BLITZ_GEWERKE_OPTIONS labels. */
const KALKULATOR_TO_BLITZ_GEWERKE: Record<string, string> = {
  // Haus / Wohnung
  bad: 'Bad & Sanitär',
  sanitaer: 'Bad & Sanitär',
  sanitaerstraenge: 'Bad & Sanitär',
  wasser: 'Bad & Sanitär',
  kueche: 'Küche',
  boeden: 'Böden & Parkett',
  maler: 'Wände & Maler',
  trockenbau: 'Wände & Maler',
  elektro: 'Elektrik',
  fassade: 'Fassade / Dach',
  dach: 'Fassade / Dach',
  fenster: 'Fassade / Dach',
  rohbau: 'Komplettabriss / Rohbau',
  abdichtung: 'Komplettabriss / Rohbau',
  abbruch: 'Komplettabriss / Rohbau',
  heizflaechen: 'Heizung / Energie',
  thermen: 'Heizung / Energie',
  // Gastronomie
  lueftung: 'Heizung / Energie',
  kuehlung: 'Heizung / Energie',
  // Büro
  akustik: 'Wände & Maler',
  netzwerk: 'Elektrik',
  licht: 'Elektrik',
  teekueche: 'Küche',
  brandschutz: 'Elektrik',
  moebel: 'Küche',
  klima: 'Heizung / Energie',
};

/** Pick the unique set of Blitz-gewerke labels matching the kalkulator picks. */
export function mapKalkulatorPicksToBlitzGewerke(picks: KalkulatorPick[]): string[] {
  const set = new Set<string>();
  for (const pick of picks) {
    const mapped = KALKULATOR_TO_BLITZ_GEWERKE[pick.key];
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
