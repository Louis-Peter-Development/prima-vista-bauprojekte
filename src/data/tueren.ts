export type TuerenVariantKey =
  | 'all'
  | 'innen'
  | 'haus'
  | 'schiebe'
  | 'keller';

export type TuerenVariant = {
  key: TuerenVariantKey;
  num: string;
  title: string;
  lead: string;
  detail: string;
  image: string;
  netBase: number;
};

export const TUEREN_VARIANTS: TuerenVariant[] = [
  {
    key: 'all',
    num: '01',
    title: 'Türen-Paket komplett',
    lead: 'Innen & Außen',
    detail: 'Innentüren, Haustür und Nebeneingänge inklusive Zargen, Beschlägen und Demontage als koordiniertes Gewerke-Paket.',
    image: '/assets/img/proj-lobby-tree.webp',
    netBase: 14800,
  },
  {
    key: 'innen',
    num: '02',
    title: 'Innen- & Zimmertüren',
    lead: 'Wohnbereich',
    detail: 'Zimmertüren in Holz, CPL oder lackiert inklusive Stahl- oder Holzzarge, Drücker und Anschlag-Justage.',
    image: '/assets/img/proj-moroccan-corner.webp',
    netBase: 6800,
  },
  {
    key: 'haus',
    num: '03',
    title: 'Haustüren',
    lead: 'Eingang',
    detail: 'Sicherheits-Haustür aus Aluminium, Holz oder Kunststoff inklusive Mehrfachverriegelung, RC2-Optionen und Schwelle.',
    image: '/assets/img/photo-haus-exterior.webp',
    netBase: 5200,
  },
  {
    key: 'schiebe',
    num: '04',
    title: 'Schiebe- & Glastüren',
    lead: 'Raumtrenner',
    detail: 'Schiebetür auf Wandlauf oder im Wandeinbau inklusive ESG-Glas, Beschlag und Soft-Close-Mechanik.',
    image: '/assets/img/proj-spa-corridor.webp',
    netBase: 4400,
  },
  {
    key: 'keller',
    num: '05',
    title: 'Keller- & Nebeneingangstüren',
    lead: 'Funktional',
    detail: 'Robuste Keller- und Nebeneingangstüren mit Wärmedämmung, Mehrfachverriegelung und Bautiefenanpassung.',
    image: '/assets/img/photo-parkett-rohbau.webp',
    netBase: 3200,
  },
];

export const TUEREN_EXTRAS = [
  { key: 'zargen', label: 'Zargen-Set & Anschlag-Anpassung', netPrice: 1450 },
  { key: 'beschlaege', label: 'Beschläge, Drücker & Schließanlage', netPrice: 980 },
  { key: 'brandschutz', label: 'Brand- oder Schallschutz-Türelement', netPrice: 2200 },
  { key: 'demontage', label: 'Demontage & Entsorgung Alttüren', netPrice: 620 },
  { key: 'aufmass', label: 'Aufmaß & Lieferung vor Ort', netPrice: 480 },
] as const;

export function formatEuro(value: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 2,
  }).format(value);
}
