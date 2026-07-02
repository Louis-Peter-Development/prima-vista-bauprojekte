export type WohnungType = 'studio' | '2zi' | '3zi' | 'maisonette';

export type WohnungTypeOption = {
  value: WohnungType;
  label: string;
  detail: string;
  defaultArea: number;
  factor: number;
  multiLevel: boolean;
  /** Preview image for this apartment type, shown in the picker. */
  previewImage: string;
};

export type AreaOption = {
  value: number;
  label: string;
};

export type WohnungGewerk = {
  key: string;
  num: string;
  label: string;
  lede: string;
  pricePerM2: number;
  multiLevelOnly?: boolean;
};

export const WOHNUNG_TYPES: WohnungTypeOption[] = [
  { value: 'studio', label: '1-Zimmer · Studio', detail: 'Kompakte Etagenwohnung', defaultArea: 50, factor: 0.96, multiLevel: false, previewImage: '/assets/img/leistungen/wohnung-sanierung-studio.webp' },
  { value: '2zi', label: '2-Zimmer-Wohnung', detail: 'Standard-Etagenwohnung', defaultArea: 100, factor: 1.00, multiLevel: false, previewImage: '/assets/img/leistungen/wohnung-sanierung-2zimmer.webp' },
  { value: '3zi', label: '3-Zimmer-Wohnung', detail: 'Geräumige Familienwohnung', defaultArea: 150, factor: 1.04, multiLevel: false, previewImage: '/assets/img/leistungen/wohnung-sanierung-3zimmer.webp' },
  { value: 'maisonette', label: 'Maisonette · 4+ Zimmer', detail: 'Mehrgeschossig oder Penthouse', defaultArea: 200, factor: 1.12, multiLevel: true, previewImage: '/assets/img/leistungen/wohnung-sanierung-maisonette.webp' },
];

export const AREA_OPTIONS: AreaOption[] = [
  { value: 50, label: '50 m²' },
  { value: 100, label: '100 m²' },
  { value: 150, label: '150 m²' },
  { value: 200, label: '200 m²' },
];

export const WOHNUNG_GEWERKE: WohnungGewerk[] = [
  { key: 'bad', num: '01', label: 'Badsanierung & Gäste-WC', lede: 'Wanne, Dusche, Sanitärobjekte', pricePerM2: 420 },
  { key: 'boeden', num: '02', label: 'Böden & Dielen', lede: 'Parkett, Fliesen, Vinyl, Estrich', pricePerM2: 140 },
  { key: 'elektro', num: '03', label: 'Elektro-Installation', lede: 'Verteilung, Leitungen, Licht, KNX', pricePerM2: 180 },
  { key: 'fenster', num: '04', label: 'Fenster & Balkontüren', lede: 'Kunststoff, Holz, Aluminium', pricePerM2: 240 },
  { key: 'heizflaechen', num: '05', label: 'Heizkörper & Bodenheizung', lede: 'Flächenheizung, Heizkörper, Stränge', pricePerM2: 160 },
  { key: 'kueche', num: '06', label: 'Küche & Möbelbau', lede: 'Einbauküche, Geräte, Schreinerei', pricePerM2: 380 },
  { key: 'maler', num: '07', label: 'Maler & Lackierung', lede: 'Wände, Decken, Heizkörper, Türen', pricePerM2: 95 },
  { key: 'planung', num: '08', label: 'Planung & Bauleitung', lede: 'Koordination, Aufmaß, Abnahme', pricePerM2: 100 },
  { key: 'sanitaerstraenge', num: '09', label: 'Sanitärstränge', lede: 'Zu- und Abwasser entlang Etage', pricePerM2: 150 },
  { key: 'treppen', num: '10', label: 'Treppen & Geländer', lede: 'Holz, Stahl, Glas — interne Treppe', pricePerM2: 90, multiLevelOnly: true },
  { key: 'trockenbau', num: '11', label: 'Trockenbau & Innenausbau', lede: 'Wände, Decken, Vorsatzschalen', pricePerM2: 110 },
  { key: 'tueren', num: '12', label: 'Türen — Zimmer & Wohnungs', lede: 'Zimmertüren, Wohnungseingang, Schiebetüren', pricePerM2: 130 },
];

export function formatTsd(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2).replace('.', ',')} Mio.`;
  return `${Math.round(n / 1000).toLocaleString('de-DE')} Tsd.`;
}
