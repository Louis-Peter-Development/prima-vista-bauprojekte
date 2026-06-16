export type FensterVariantKey =
  | 'all'
  | 'aluminium'
  | 'balconyDoors'
  | 'garage'
  | 'roofWindow'
  | 'refurbish'
  | 'shutters'
  | 'wood'
  | 'plastic'
  | 'awnings'
  | 'rollerShutters';

export type FensterVariant = {
  key: FensterVariantKey;
  num: string;
  title: string;
  lead: string;
  detail: string;
  image: string;
  netBase: number;
};

export const FENSTER_VARIANTS: FensterVariant[] = [
  {
    key: 'all',
    num: '01',
    title: 'Alles zu Fenster',
    lead: 'Komplettpaket',
    detail: 'Fenster, Balkontüren, Rollladen, Markisen, Fensterläden, Dachfenster und Aufbereitung als koordinierte Fensterleistung.',
    image: '/assets/img/leistungen/fenstertechnik-02.webp',
    netBase: 24600,
  },
  {
    key: 'aluminium',
    num: '02',
    title: 'Aluminium-Fenster',
    lead: 'Modern',
    detail: 'Aluminiumfenster mit Aufmaß, Ausbau, Montage, Anschlussfugen, Abdichtung und sauberer Übergabe.',
    image: '/assets/img/leistungen/fenstertechnik-02.webp',
    netBase: 14800,
  },
  {
    key: 'balconyDoors',
    num: '03',
    title: 'Balkon- & Terrassentüren',
    lead: 'Übergang',
    detail: 'Balkon- oder Terrassentüren einbauen inklusive Schwellenanschluss, Abdichtung, Beschläge und Justage.',
    image: '/assets/img/leistungen/fenstertechnik-02.webp',
    netBase: 12600,
  },
  {
    key: 'garage',
    num: '04',
    title: 'Carport & Garagentore',
    lead: 'Zufahrt',
    detail: 'Garagentor, Carportabschluss oder Toranlage mit Aufmaß, Befestigung, Antriebsvorbereitung und Einweisung montieren.',
    image: '/assets/img/leistungen/fenstertechnik-03.webp',
    netBase: 16400,
  },
  {
    key: 'roofWindow',
    num: '05',
    title: 'Dach-Fenster',
    lead: 'Belichtung',
    detail: 'Dachfenster einbauen oder tauschen inklusive Eindeckrahmen, Innenfutter, Dämmanschluss und regensicherer Einbindung.',
    image: '/assets/img/leistungen/fenstertechnik-01.webp',
    netBase: 8600,
  },
  {
    key: 'refurbish',
    num: '06',
    title: 'Fenster aufbereiten',
    lead: 'Renovierung',
    detail: 'Bestehende Fenster schleifen, ausbessern, lackieren, Beschläge prüfen und Oberflächen wieder schützen.',
    image: '/assets/img/leistungen/fenstertechnik-01.webp',
    netBase: 5400,
  },
  {
    key: 'shutters',
    num: '07',
    title: 'Fensterläden',
    lead: 'Sichtschutz',
    detail: 'Fensterläden montieren oder erneuern inklusive Beschläge, Anschläge, Ausrichtung und Wetterschutz.',
    image: '/assets/img/leistungen/fenstertechnik-03.webp',
    netBase: 7800,
  },
  {
    key: 'wood',
    num: '08',
    title: 'Holz-Fenster',
    lead: 'Natürlich',
    detail: 'Holzfenster liefern und montieren mit Anschlussfugen, Oberflächenschutz, Justage und sauberem Innenanschluss.',
    image: '/assets/img/leistungen/fenstertechnik-01.webp',
    netBase: 13200,
  },
  {
    key: 'plastic',
    num: '09',
    title: 'Kunststoff-Fenster',
    lead: 'Pflegeleicht',
    detail: 'Kunststofffenster einbauen inklusive Ausbau alter Elemente, Montage, Dämmung, Abdichtung und Beschläge.',
    image: '/assets/img/leistungen/fenstertechnik-02.webp',
    netBase: 9800,
  },
  {
    key: 'awnings',
    num: '10',
    title: 'Markisen',
    lead: 'Sonnenschutz',
    detail: 'Markise mit Konsolen, Ausrichtung, Wandbefestigung, Bedienung und Abstimmung auf Fenster oder Terrasse montieren.',
    image: '/assets/img/leistungen/fenstertechnik-03.webp',
    netBase: 6200,
  },
  {
    key: 'rollerShutters',
    num: '11',
    title: 'Rollladen',
    lead: 'Schutz',
    detail: 'Rollladen oder Vorsatzrollladen mit Führungsschienen, Kasten, Bedienung und Fensteranschluss montieren.',
    image: '/assets/img/leistungen/fenstertechnik-03.webp',
    netBase: 7200,
  },
];

export const FENSTER_EXTRAS = [
  { key: 'measurement', label: 'Aufmaß & Anschlussplanung', netPrice: 850 },
  { key: 'demolition', label: 'Ausbau Altfenster & Entsorgung', netPrice: 1900 },
  { key: 'interior', label: 'Innenlaibung & Anschlussarbeiten', netPrice: 2400 },
] as const;

export function formatEuro(value: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 2,
  }).format(value);
}
