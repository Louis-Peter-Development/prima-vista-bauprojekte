export type KuechenVariantKey =
  | 'all'
  | 'kitchenette'
  | 'worktop'
  | 'floorCeiling'
  | 'electrical'
  | 'water';

export type KuechenVariant = {
  key: KuechenVariantKey;
  num: string;
  title: string;
  lead: string;
  detail: string;
  image: string;
  netBase: number;
};

export const KUECHEN_VARIANTS: KuechenVariant[] = [
  {
    key: 'all',
    num: '01',
    title: 'Alles zu Küchen',
    lead: 'Komplettpaket',
    detail: 'Küchenmöbel, Arbeitsplatte, Anschlüsse, Beleuchtung, Boden- und Deckenarbeiten koordiniert aus einer Hand.',
    image: '/assets/img/proj-kitchen-oak.webp',
    netBase: 28600,
  },
  {
    key: 'kitchenette',
    num: '02',
    title: 'Küchenzeile',
    lead: 'Einbau & Montage',
    detail: 'Montage einer Küchenzeile mit Schränken, Geräten, Blenden, Sockeln und sauberem Anschluss an die Wandflächen.',
    image: '/assets/img/proj-kitchen-oak.webp',
    netBase: 14600,
  },
  {
    key: 'worktop',
    num: '03',
    title: 'Arbeitsplatte & Spüle',
    lead: 'Oberfläche',
    detail: 'Arbeitsplatte einpassen, Ausschnitte herstellen, Spüle und Armatur montieren, Fugen und Kanten sauber schließen.',
    image: '/assets/img/proj-kitchen-oak.webp',
    netBase: 5200,
  },
  {
    key: 'floorCeiling',
    num: '04',
    title: 'Boden & Decken',
    lead: 'Raumhülle',
    detail: 'Untergrund, Bodenbelag, Deckenflächen und Anschlüsse rund um die Küche vorbereiten und ausführen.',
    image: '/assets/img/photo-parkett-altbau.webp',
    netBase: 7800,
  },
  {
    key: 'electrical',
    num: '05',
    title: 'Elektro & Beleuchtung',
    lead: 'Strom & Licht',
    detail: 'Steckdosen, Geräteanschlüsse, Lichtpunkte, Unterbauleuchten und Absicherung für die Küchenplanung koordinieren.',
    image: '/assets/img/photo-office-light.webp',
    netBase: 6400,
  },
  {
    key: 'water',
    num: '06',
    title: 'Wasserinstallation',
    lead: 'Anschlüsse',
    detail: 'Frischwasser, Abwasser, Spülmaschinenanschluss und Spülenposition fachgerecht vorbereiten oder versetzen.',
    image: '/assets/img/photo-bad-prima-vista.webp',
    netBase: 4600,
  },
];

export const KUECHEN_EXTRAS = [
  { key: 'demolition', label: 'Alte Küche demontieren & entsorgen', netPrice: 1900 },
  { key: 'appliances', label: 'Geräteanschlüsse abstimmen', netPrice: 1250 },
  { key: 'lighting', label: 'Licht- und Steckdosenkonzept', netPrice: 1450 },
] as const;

export function formatEuro(value: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 2,
  }).format(value);
}
