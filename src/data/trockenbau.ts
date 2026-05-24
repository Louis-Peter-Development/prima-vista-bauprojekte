export type TrockenbauVariantKey =
  | 'all'
  | 'ceilings'
  | 'walls'
  | 'cladding'
  | 'screed'
  | 'slopes';

export type TrockenbauVariant = {
  key: TrockenbauVariantKey;
  num: string;
  title: string;
  lead: string;
  detail: string;
  image: string;
  netBase: number;
};

export const TROCKENBAU_VARIANTS: TrockenbauVariant[] = [
  {
    key: 'all',
    num: '01',
    title: 'Alles zu Trockenbau',
    lead: 'Innenausbau',
    detail: 'Decken, Wände, Verkleidungen, Anschlüsse, Spachtelung und Übergänge als koordinierter Innenausbau.',
    image: '/assets/img/photo-parkett-rohbau.webp',
    netBase: 18200,
  },
  {
    key: 'ceilings',
    num: '02',
    title: 'Decken abhängen',
    lead: 'Deckensystem',
    detail: 'Abgehängte GK-Decken mit Unterkonstruktion, Plattenlage, Revisionsöffnungen und sauberem Wandanschluss.',
    image: '/assets/img/photo-office-light.webp',
    netBase: 9200,
  },
  {
    key: 'walls',
    num: '03',
    title: 'Wände stellen',
    lead: 'Raumteilung',
    detail: 'Trockenbauwände mit Metallständerwerk, Beplankung, Dämmung nach Bedarf und vorbereiteter Oberfläche.',
    image: '/assets/img/photo-parkett-rohbau.webp',
    netBase: 10400,
  },
  {
    key: 'cladding',
    num: '04',
    title: 'Wände verkleiden',
    lead: 'Verkleidung',
    detail: 'Bestehende Wände verkleiden, Installationen führen, Ebenheit herstellen und gespachtelt übergeben.',
    image: '/assets/img/photo-altbausanierung.webp',
    netBase: 8600,
  },
  {
    key: 'screed',
    num: '05',
    title: 'Estrich verlegen',
    lead: 'Bodenaufbau',
    detail: 'Estrich- oder Trockenestrichaufbau mit Randdämmung, Ausgleich und belegreifer Oberfläche.',
    image: '/assets/img/proj-stairs-concrete.webp',
    netBase: 11800,
  },
  {
    key: 'slopes',
    num: '06',
    title: 'Dachschrägen verkleiden',
    lead: 'Dachraum',
    detail: 'Dachschrägen mit Unterkonstruktion, Dämmanschluss, GK-Beplankung und sauberer Spachtelung verkleiden.',
    image: '/assets/img/photo-altbausanierung.webp',
    netBase: 12600,
  },
];

export const TROCKENBAU_EXTRAS = [
  { key: 'demolition', label: 'Rückbau & Entsorgung', netPrice: 1700 },
  { key: 'insulation', label: 'Schall- oder Wärmedämmung', netPrice: 2600 },
  { key: 'finish', label: 'Q3-Spachtelung malerfertig', netPrice: 1900 },
] as const;

export function formatEuro(value: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 2,
  }).format(value);
}
