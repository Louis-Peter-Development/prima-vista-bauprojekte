export type TreppenVariantKey =
  | 'all'
  | 'wood'
  | 'concrete'
  | 'opening'
  | 'railing'
  | 'outside'
  | 'spaceSaving'
  | 'attic'
  | 'spiral'
  | 'refurbish'
  | 'covering';

export type TreppenVariant = {
  key: TreppenVariantKey;
  num: string;
  title: string;
  lead: string;
  detail: string;
  image: string;
  netBase: number;
};

export const TREPPEN_VARIANTS: TreppenVariant[] = [
  {
    key: 'all',
    num: '01',
    title: 'Alle Gewerkpositionen',
    lead: 'Einzelanwahl',
    detail: 'Treppen, Geländer, Durchbrüche, Stufenbelegung und Aufbereitung als koordinierte Treppenleistung.',
    image: '/assets/img/leistungen/treppen-gelaender-01.webp',
    netBase: 18600,
  },
  {
    key: 'wood',
    num: '02',
    title: 'Holztreppe',
    lead: 'Massivholz',
    detail: 'Holztreppe planen, fertigen und montieren inklusive Stufen, Wangen, Handlauf und Anschlussdetails.',
    image: '/assets/img/leistungen/treppen-gelaender-05.webp',
    netBase: 14200,
  },
  {
    key: 'concrete',
    num: '03',
    title: 'Betontreppe',
    lead: 'Rohbau',
    detail: 'Betontreppe herstellen oder sanieren mit Schalung, Bewehrung, Betonage und belegreifer Oberfläche.',
    image: '/assets/img/leistungen/treppen-gelaender-15.webp',
    netBase: 16400,
  },
  {
    key: 'opening',
    num: '04',
    title: 'Durchbruch Treppenloch',
    lead: 'Treppenauge',
    detail: 'Deckendurchbruch vorbereiten, sichern, herstellen und für die neue Treppenführung sauber anschließen.',
    image: '/assets/img/leistungen/treppen-gelaender-13.webp',
    netBase: 9200,
  },
  {
    key: 'railing',
    num: '05',
    title: 'Geländer',
    lead: 'Absturzschutz',
    detail: 'Geländer, Handlauf oder Absturzsicherung aus Holz, Stahl oder Glas mit sicherer Befestigung montieren.',
    image: '/assets/img/leistungen/treppen-gelaender-04.webp',
    netBase: 7200,
  },
  {
    key: 'outside',
    num: '06',
    title: 'Außen-Treppe',
    lead: 'Erschließung',
    detail: 'Außentreppe mit witterungsbeständiger Konstruktion, Podest, Geländer und tragfähigem Anschluss.',
    image: '/assets/img/leistungen/treppen-gelaender-03.webp',
    netBase: 13800,
  },
  {
    key: 'spaceSaving',
    num: '07',
    title: 'Raumspar-Treppe',
    lead: 'Kompakt',
    detail: 'Kompakte Treppenlösung für enge Grundrisse inklusive Aufmaß, Laufbreite, Geländer und Montage.',
    image: '/assets/img/leistungen/treppen-gelaender-02.webp',
    netBase: 9800,
  },
  {
    key: 'attic',
    num: '08',
    title: 'Dachboden-Treppe',
    lead: 'Bodentreppe',
    detail: 'Dachboden- oder Bodentreppe mit Deckenausschnitt, Klappe, Wärmeschutz und sauberer Einfassung.',
    image: '/assets/img/leistungen/treppen-gelaender-10.webp',
    netBase: 6200,
  },
  {
    key: 'spiral',
    num: '09',
    title: 'Spindel-Treppe',
    lead: 'Rundlauf',
    detail: 'Spindeltreppe mit Mittelspindel, Stufen, Geländer, Podestanschluss und präziser Montage.',
    image: '/assets/img/leistungen/treppen-gelaender-08.webp',
    netBase: 11800,
  },
  {
    key: 'refurbish',
    num: '10',
    title: 'Aufbereiten der Treppe',
    lead: 'Renovierung',
    detail: 'Bestehende Treppe schleifen, ausbessern, beschichten oder ölen und wieder sauber nutzbar machen.',
    image: '/assets/img/leistungen/treppen-gelaender-16.webp',
    netBase: 5600,
  },
  {
    key: 'covering',
    num: '11',
    title: 'Belegung der Treppe',
    lead: 'Stufenbelag',
    detail: 'Treppenstufen mit Holz, Vinyl, Stein oder anderem Belag belegen inklusive Kanten und Übergängen.',
    image: '/assets/img/leistungen/treppen-gelaender-07.webp',
    netBase: 8400,
  },
];

export const TREPPEN_EXTRAS = [
  { key: 'measurement', label: 'Aufmaß & Werkplanung', netPrice: 900 },
  { key: 'demolition', label: 'Rückbau & Entsorgung', netPrice: 1800 },
  { key: 'finish', label: 'Oberflächenfinish & Rutschschutz', netPrice: 1400 },
] as const;

export function formatEuro(value: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 2,
  }).format(value);
}
