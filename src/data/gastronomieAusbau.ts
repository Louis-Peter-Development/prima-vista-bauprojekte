export type GastronomieType = 'cafe' | 'restaurant' | 'bar' | 'systemgastro';

export type GastronomieTypeOption = {
  value: GastronomieType;
  label: string;
  detail: string;
  factor: number;
  multiLevel: boolean;
};

export type AreaOption = {
  value: number;
  label: string;
};

export type GastronomieGewerk = {
  key: string;
  num: string;
  label: string;
  lede: string;
  pricePerM2: number;
  multiLevelOnly?: boolean;
};

export const GASTRONOMIE_TYPES: GastronomieTypeOption[] = [
  { value: 'cafe', label: 'Café / Bistro', detail: 'Einfacher Ausbau ohne Großküche', factor: 0.90, multiLevel: false },
  { value: 'restaurant', label: 'Restaurant', detail: 'Vollausbau mit professioneller Gastroküche', factor: 1.15, multiLevel: false },
  { value: 'bar', label: 'Bar / Club', detail: 'Aufwendige Bar- und Lüftungstechnik', factor: 1.25, multiLevel: false },
  { value: 'systemgastro', label: 'Systemgastronomie', detail: 'Standardisierter Multi-Level Ausbau', factor: 1.05, multiLevel: true },
];

export const AREA_OPTIONS: AreaOption[] = [
  { value: 100, label: '100 m²' },
  { value: 200, label: '200 m²' },
  { value: 300, label: '300 m²' },
  { value: 500, label: '500 m²' },
];

export const GASTRONOMIE_GEWERKE: GastronomieGewerk[] = [
  { key: 'abbruch', num: '01', label: 'Abbruch & Entkernung', lede: 'Entfernung Altbestand', pricePerM2: 80 },
  { key: 'lueftung', num: '02', label: 'Lüftungs- & Klimatechnik', lede: 'Gastro-Lüftung, Klimaanlage', pricePerM2: 250 },
  { key: 'kueche', num: '03', label: 'Gastro-Küche', lede: 'Großküchentechnik, Edelstahlmöbel', pricePerM2: 450 },
  { key: 'kuehlung', num: '04', label: 'Kühl- & Schanktechnik', lede: 'Kühlzellen, Thekenanlage', pricePerM2: 180 },
  { key: 'sanitaer', num: '05', label: 'Sanitär & Gäste-WC', lede: 'Gäste-WCs, Personal-WCs', pricePerM2: 220 },
  { key: 'elektro', num: '06', label: 'Elektro & Beleuchtung', lede: 'Starkstrom, Beleuchtungskonzept', pricePerM2: 200 },
  { key: 'boeden', num: '07', label: 'Bodenbeläge', lede: 'Rutschfeste Fliesen, Gastraumboden', pricePerM2: 140 },
  { key: 'trockenbau', num: '08', label: 'Trockenbau & Akustik', lede: 'Akustikdecken, Trennwände', pricePerM2: 130 },
  { key: 'maler', num: '09', label: 'Malerarbeiten', lede: 'Wandgestaltung, Lackierungen', pricePerM2: 90 },
  { key: 'brandschutz', num: '10', label: 'Brandschutz & Sicherheit', lede: 'Brandmelder, Fluchtwege', pricePerM2: 110 },
  { key: 'moebel', num: '11', label: 'Möbel & Innenausbau', lede: 'Sitzbänke, Tische, Thekenbau', pricePerM2: 320 },
  { key: 'treppen', num: '12', label: 'Treppen & Geländer', lede: 'Interne Verbindungstreppen', pricePerM2: 90, multiLevelOnly: true },
];

export function formatTsd(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2).replace('.', ',')} Mio.`;
  return `${Math.round(n / 1000).toLocaleString('de-DE')} Tsd.`;
}
