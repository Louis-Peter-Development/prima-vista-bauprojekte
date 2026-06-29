export type HouseType = '1e' | '1e-d' | '2e' | '2e-d';

export type HouseTypeOption = {
  value: HouseType;
  label: string;
  detail: string;
  defaultArea: number;
  factor: number;
  includesDach: boolean;
};

export type AreaOption = {
  value: number;
  label: string;
};

export type HausGewerk = {
  key: string;
  num: string;
  label: string;
  lead: string;
  pricePerM2: number;
  requiresDach?: boolean;
};

export const HOUSE_TYPES: HouseTypeOption[] = [
  { value: '1e', label: '1× Etage ohne Dach', detail: 'Bungalow · Erdgeschoss', defaultArea: 60, factor: 1.00, includesDach: false },
  { value: '1e-d', label: '1× Etage + Dach', detail: 'Erdgeschoss mit Bedachung', defaultArea: 60, factor: 1.12, includesDach: true },
  { value: '2e', label: '2× Etagen ohne Dach', detail: 'Mehrgeschossig · ohne Dachsanierung', defaultArea: 120, factor: 1.08, includesDach: false },
  { value: '2e-d', label: '2× Etagen + Dach', detail: 'Komplettes Wohnhaus mit Dach', defaultArea: 120, factor: 1.18, includesDach: true },
];

export const AREA_OPTIONS: AreaOption[] = [
  { value: 50, label: '50 m²' },
  { value: 100, label: '100 m²' },
  { value: 150, label: '150 m²' },
  { value: 200, label: '200 m²' },
];

export const HAUS_GEWERKE: HausGewerk[] = [
  { key: 'abdichtung', num: '01', label: 'Abdichtung Haus & Keller', lead: 'Horizontal-, Perimeter-, Kellerabdichtung', pricePerM2: 110 },
  { key: 'bad', num: '02', label: 'Badsanierung & Gäste-WC', lead: 'Wanne, Dusche, Sanitärobjekte', pricePerM2: 420 },
  { key: 'boeden', num: '03', label: 'Böden & Dielen', lead: 'Parkett, Fliesen, Vinyl, Estrich', pricePerM2: 140 },
  { key: 'dach', num: '04', label: 'Dachsanierung', lead: 'Eindeckung, Dämmung, Dachstuhl', pricePerM2: 280, requiresDach: true },
  { key: 'elektro', num: '05', label: 'Elektro-Installation', lead: 'Verteilung, Leitungen, KNX, Licht', pricePerM2: 180 },
  { key: 'fassade', num: '06', label: 'Fassaden & Dämmung', lead: 'WDVS, Putz, Sockel, Anstrich', pricePerM2: 220 },
  { key: 'fenster', num: '07', label: 'Fenster & Balkontüren', lead: 'Kunststoff, Holz, Aluminium', pricePerM2: 240 },
  { key: 'heizflaechen', num: '08', label: 'Heizkörper & Bodenheizung', lead: 'Flächenheizung, Heizkörper, Stränge', pricePerM2: 160 },
  { key: 'maler', num: '09', label: 'Maler & Lackierung', lead: 'Wände, Decken, Heizkörper, Türen', pricePerM2: 95 },
  { key: 'planung', num: '10', label: 'Planung & Bauleitung', lead: 'Statik, Genehmigung, Koordination', pricePerM2: 120 },
  { key: 'rohbau', num: '11', label: 'Rohbau-Leistungen', lead: 'Abbruch, Mauerwerk, Träger, Estrich', pricePerM2: 280 },
  { key: 'thermen', num: '12', label: 'Thermen & Öfen', lead: 'Gas-, Öl-Therme, Wärmepumpe, Kamin', pricePerM2: 180 },
  { key: 'treppen', num: '13', label: 'Treppen & Geländer', lead: 'Holz, Beton, Aufbereitung', pricePerM2: 90 },
  { key: 'tueren', num: '14', label: 'Türen & Tore', lead: 'Zimmer-, Haus-, Schiebetüren, Tore', pricePerM2: 130 },
  { key: 'trockenbau', num: '15', label: 'Trockenbau', lead: 'Wände, Decken, Vorsatzschalen', pricePerM2: 110 },
  { key: 'wasser', num: '16', label: 'Wasser-Installation', lead: 'Zu- und Abwasser, Hauptstrang', pricePerM2: 150 },
];

export function formatTsd(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2).replace('.', ',')} Mio.`;
  return `${Math.round(n / 1000).toLocaleString('de-DE')} Tsd.`;
}
