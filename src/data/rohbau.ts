export type RohbauVariantKey =
  | 'all'
  | 'abbruch'
  | 'fundament'
  | 'mauerwerk'
  | 'decken';

export type RohbauVariant = {
  key: RohbauVariantKey;
  num: string;
  title: string;
  lead: string;
  detail: string;
  image: string;
  netBase: number;
};

export const ROHBAU_VARIANTS: RohbauVariant[] = [
  {
    key: 'all',
    num: '01',
    title: 'Rohbau komplett',
    lead: 'Gewerke-Paket',
    detail: 'Abbruch, Erdarbeiten, Fundament, Mauerwerk, Decken und Verputzen koordiniert aus einer Hand inklusive Baustelleneinrichtung.',
    image: '/assets/img/photo-parkett-rohbau.webp',
    netBase: 84500,
  },
  {
    key: 'abbruch',
    num: '02',
    title: 'Abbruch & Rückbau',
    lead: 'Entkernung',
    detail: 'Komplett- oder Teilrückbau, Entkernung, Schadstoffbeprobung, Bauschuttsortierung und Containerlogistik.',
    image: '/assets/img/photo-altbausanierung.webp',
    netBase: 18600,
  },
  {
    key: 'fundament',
    num: '03',
    title: 'Fundament & Bodenplatte',
    lead: 'Gründung',
    detail: 'Streifen-, Platten- oder Punktfundament inklusive Schalung, Bewehrung, Beton und Frostschürze.',
    image: '/assets/img/proj-concrete-corner.webp',
    netBase: 26400,
  },
  {
    key: 'mauerwerk',
    num: '04',
    title: 'Mauerwerk & Wände',
    lead: 'Aufgehende Konstruktion',
    detail: 'Tragende und nichttragende Wände aus Kalksandstein, Poroton oder Beton inklusive Stürze und Ringanker.',
    image: '/assets/img/photo-haus-exterior.webp',
    netBase: 22800,
  },
  {
    key: 'decken',
    num: '05',
    title: 'Geschossdecken',
    lead: 'Decken & Treppen',
    detail: 'Filigran-, Ortbeton- oder Holzbalkendecke inklusive Bewehrung, Aussparungen und Treppenanschlüssen.',
    image: '/assets/img/proj-concrete-sofa.webp',
    netBase: 19400,
  },
];

export const ROHBAU_EXTRAS = [
  { key: 'erdarbeiten', label: 'Erdarbeiten & Aushub', netPrice: 6800 },
  { key: 'kanal', label: 'Kanalisierung & Hausanschluss', netPrice: 4200 },
  { key: 'stahltraeger', label: 'Stahlträger & Unterzüge', netPrice: 3600 },
  { key: 'verputzen', label: 'Innen- & Außenputz', netPrice: 8400 },
  { key: 'schornstein', label: 'Schornstein & Kamin', netPrice: 5200 },
] as const;

export function formatEuro(value: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 2,
  }).format(value);
}
