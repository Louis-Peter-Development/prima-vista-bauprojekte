export type ZaunVariantKey =
  | 'all'
  | 'doppelstab'
  | 'holz'
  | 'sichtschutz'
  | 'maschendraht';

export type ZaunVariant = {
  key: ZaunVariantKey;
  num: string;
  title: string;
  lead: string;
  detail: string;
  image: string;
  netBase: number;
};

export const ZAUN_VARIANTS: ZaunVariant[] = [
  {
    key: 'all',
    num: '01',
    title: 'Zaun-Paket komplett',
    lead: 'Grundstück',
    detail: 'Zaunanlage rundum inklusive Pfosten, Fundamenten, Toranlage und Demontage als koordiniertes Außenanlagen-Paket.',
    image: '/assets/img/photo-haus-exterior.webp',
    netBase: 9800,
  },
  {
    key: 'doppelstab',
    num: '02',
    title: 'Doppelstab- & Metallzaun',
    lead: 'Robust',
    detail: 'Doppelstabmatten oder Stabgitter mit pulverbeschichteten Pfosten, Punktfundamenten und Beschlägen.',
    image: '/assets/img/proj-concrete-corner.webp',
    netBase: 4200,
  },
  {
    key: 'holz',
    num: '03',
    title: 'Holz- & Steckzaun',
    lead: 'Natürlich',
    detail: 'Lattenzaun, Bohlen- oder Steckzaun aus Lärche oder Douglasie inklusive Pfostenanker und Lasur.',
    image: '/assets/img/proj-spa-corridor.webp',
    netBase: 5400,
  },
  {
    key: 'sichtschutz',
    num: '04',
    title: 'Sichtschutz, Alu & Glas',
    lead: 'Privatsphäre',
    detail: 'WPC-, Aluminium- oder Glaselement-Zaun als blickdichter Sichtschutz inklusive LED-Vorrichtung.',
    image: '/assets/img/proj-concrete-sofa.webp',
    netBase: 7200,
  },
  {
    key: 'maschendraht',
    num: '05',
    title: 'Maschendraht & Vorgarten',
    lead: 'Schlicht',
    detail: 'Maschendraht- oder niedriger Vorgartenzaun inklusive Spanndraht, Pfosten und Eckaussteifung.',
    image: '/assets/img/photo-altbausanierung.webp',
    netBase: 2800,
  },
];

export const ZAUN_EXTRAS = [
  { key: 'tor', label: 'Garten- oder Einfahrtstor', netPrice: 1480 },
  { key: 'fundament', label: 'Punktfundamente & Pfostenanker', netPrice: 880 },
  { key: 'sichtstreifen', label: 'Sichtschutz-Streifen & Verkleidung', netPrice: 540 },
  { key: 'demontage', label: 'Demontage & Entsorgung Altzaun', netPrice: 460 },
  { key: 'aufmass', label: 'Aufmaß & Anlieferung vor Ort', netPrice: 380 },
] as const;

export function formatEuro(value: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 2,
  }).format(value);
}
