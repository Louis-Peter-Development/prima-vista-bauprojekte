export type BodenVariantKey =
  | 'all'
  | 'parkett'
  | 'laminat'
  | 'fliesen'
  | 'sockel'
  | 'parkettRefresh'
  | 'kork'
  | 'vinyl'
  | 'estrichplatten'
  | 'sichtestrich'
  | 'teppich';

export type BodenVariant = {
  key: BodenVariantKey;
  num: string;
  title: string;
  lead: string;
  detail: string;
  image: string;
  netBase: number;
};

export const BODEN_VARIANTS: BodenVariant[] = [
  {
    key: 'all',
    num: '01',
    title: 'Alles zu Böden',
    lead: 'Komplettpaket',
    detail: 'Untergrund prüfen, Ausgleich, Belag, Sockel, Übergänge und Endreinigung als koordinierte Bodenleistung.',
    image: '/assets/img/proj-floor-oak.jpg',
    netBase: 16800,
  },
  {
    key: 'parkett',
    num: '02',
    title: 'Parkett verlegen',
    lead: 'Holzboden',
    detail: 'Parkett mit Untergrundvorbereitung, Verlegung, Zuschnitten, Übergängen und passenden Sockelleisten.',
    image: '/assets/img/proj-floor-oak.jpg',
    netBase: 12600,
  },
  {
    key: 'laminat',
    num: '03',
    title: 'Laminat verlegen',
    lead: 'Robust',
    detail: 'Laminatboden inklusive Trittschall, Zuschnitten, Übergangsprofilen und sauberer Randfuge.',
    image: '/assets/img/photo-parkett-altbau.jpg',
    netBase: 7200,
  },
  {
    key: 'fliesen',
    num: '04',
    title: 'Fliesen verlegen',
    lead: 'Stein & Keramik',
    detail: 'Bodenfliesen mit Abdichtung nach Bedarf, Kleberbett, Fugen, Zuschnitten und Anschlussdetails.',
    image: '/assets/img/proj-bath-stone.jpg',
    netBase: 11800,
  },
  {
    key: 'sockel',
    num: '05',
    title: 'Sockelleisten',
    lead: 'Abschluss',
    detail: 'Sockelleisten liefern und montieren, Gehrungen schneiden und Wandanschlüsse sauber schließen.',
    image: '/assets/img/photo-parkett-altbau.jpg',
    netBase: 2600,
  },
  {
    key: 'parkettRefresh',
    num: '06',
    title: 'Parkett aufbereiten',
    lead: 'Schleifen & Ölen',
    detail: 'Bestehendes Parkett schleifen, ausbessern, ölen oder versiegeln und wieder bezugsfertig machen.',
    image: '/assets/img/proj-floor-oak.jpg',
    netBase: 6800,
  },
  {
    key: 'kork',
    num: '07',
    title: 'Kork- oder Designboden',
    lead: 'Warm & leise',
    detail: 'Kork- oder Designboden mit Unterlage, Zuschnitt, Kanten und Übergängen fachgerecht verlegen.',
    image: '/assets/img/photo-parkett-rohbau.jpg',
    netBase: 8200,
  },
  {
    key: 'vinyl',
    num: '08',
    title: 'Vinyl oder Linoleum',
    lead: 'Pflegeleicht',
    detail: 'Vinyl- oder Linoleumbelag vollflächig oder schwimmend verlegen, inklusive Untergrundvorbereitung.',
    image: '/assets/img/photo-parkett-altbau.jpg',
    netBase: 7600,
  },
  {
    key: 'estrichplatten',
    num: '09',
    title: 'Estrichplatten',
    lead: 'Trockenaufbau',
    detail: 'Trockenestrichplatten mit Ausgleich, Randdämmung und belegreifer Oberfläche herstellen.',
    image: '/assets/img/photo-parkett-rohbau.jpg',
    netBase: 9400,
  },
  {
    key: 'sichtestrich',
    num: '10',
    title: 'Sichtestrich',
    lead: 'Mineralisch',
    detail: 'Sichtestrich oder Industrieoptik mit sauberer Oberfläche, Kantenführung und Schutzbehandlung.',
    image: '/assets/img/proj-stairs-concrete.jpg',
    netBase: 13200,
  },
  {
    key: 'teppich',
    num: '11',
    title: 'Teppich verlegen',
    lead: 'Textilboden',
    detail: 'Teppichboden inklusive Untergrund, Verklebung oder Fixierung, Zuschnitt und Randabschluss.',
    image: '/assets/img/photo-parkett-altbau.jpg',
    netBase: 6100,
  },
];

export const BODEN_EXTRAS = [
  { key: 'demolition', label: 'Altbelag entfernen & entsorgen', netPrice: 1850 },
  { key: 'leveling', label: 'Untergrund ausgleichen', netPrice: 2400 },
  { key: 'doors', label: 'Türblätter kürzen & Übergänge anpassen', netPrice: 950 },
] as const;

export function formatEuro(value: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 2,
  }).format(value);
}
