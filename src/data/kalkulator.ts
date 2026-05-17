export type Objekt = 'haus' | 'wohnung' | 'gastro' | 'anderes';
export type Quality = 'standard' | 'gehoben' | 'premium';

export type ObjektOption = {
  value: Objekt;
  label: string;
  baseFactor: number;
};

export type QualityOption = {
  value: Quality;
  label: string;
  multiplier: number;
  note: string;
};

export type Gewerk = {
  key: string;
  num: string;
  label: string;
  pricePerM2: number;
  lead: string;
};

export const OBJEKT_OPTIONS: ObjektOption[] = [
  { value: 'haus', label: 'Haus', baseFactor: 1.0 },
  { value: 'wohnung', label: 'Wohnung', baseFactor: 0.9 },
  { value: 'gastro', label: 'Gastronomie', baseFactor: 1.25 },
  { value: 'anderes', label: 'Anderes', baseFactor: 1.0 },
];

export const QUALITY_OPTIONS: QualityOption[] = [
  { value: 'standard', label: 'Standard', multiplier: 1.0, note: 'Solide Materialien, klare Linie.' },
  { value: 'gehoben', label: 'Gehoben', multiplier: 1.35, note: 'Markenfabrikate, individuelle Details.' },
  { value: 'premium', label: 'Premium', multiplier: 1.75, note: 'Maßanfertigung, Naturmaterialien.' },
];

export const GEWERKE: Gewerk[] = [
  { key: 'rohbau', num: '01', label: 'Rohbau / Abriss', pricePerM2: 280, lead: 'Komplettabriss, Wände' },
  { key: 'bad', num: '02', label: 'Bad & Sanitär', pricePerM2: 420, lead: 'Wanne, Dusche, WC' },
  { key: 'kueche', num: '03', label: 'Küche & Möbelbau', pricePerM2: 380, lead: 'Schreinerei, Geräte' },
  { key: 'boden', num: '04', label: 'Böden & Beläge', pricePerM2: 140, lead: 'Parkett, Stein, Vinyl' },
  { key: 'maler', num: '05', label: 'Wände & Maler', pricePerM2: 95, lead: 'Spachtel, Farben' },
  { key: 'elektro', num: '06', label: 'Elektroinstallation', pricePerM2: 180, lead: 'Strom, Licht, KNX' },
  { key: 'sanitaer', num: '07', label: 'Sanitärinstallation', pricePerM2: 150, lead: 'Wasser, Abwasser' },
  { key: 'heizung', num: '08', label: 'Heizung / Energie', pricePerM2: 240, lead: 'Wärmepumpe, FBH' },
  { key: 'fassade', num: '09', label: 'Fassade / Dach', pricePerM2: 320, lead: 'Putz, WDVS, Eindeckung' },
  { key: 'trockenbau', num: '10', label: 'Trockenbau', pricePerM2: 110, lead: 'Wände, Decken' },
];

export function formatTsd(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2).replace('.', ',')} Mio.`;
  return `${Math.round(n / 1000).toLocaleString('de-DE')} Tsd.`;
}
