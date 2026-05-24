export type WasserVariantKey =
  | 'all'
  | 'bad'
  | 'kueche'
  | 'keller'
  | 'garten';

export type WasserVariant = {
  key: WasserVariantKey;
  num: string;
  title: string;
  lead: string;
  detail: string;
  image: string;
  netBase: number;
};

export const WASSER_VARIANTS: WasserVariant[] = [
  {
    key: 'all',
    num: '01',
    title: 'Wasserinstallation komplett',
    lead: 'Haus & Anschlüsse',
    detail: 'Bad, Küche, Keller und Außenanschlüsse koordiniert: Trink- und Abwasserleitungen, Verteiler, Armaturen und Inbetriebnahme.',
    image: '/assets/img/photo-bad-prima-vista.webp',
    netBase: 18400,
  },
  {
    key: 'bad',
    num: '02',
    title: 'Bad & Gäste-WC',
    lead: 'Sanitärstrang',
    detail: 'Komplettstrang für Wanne, Dusche, WC und Waschbecken inklusive Vorwand, Spülkasten und Armaturen.',
    image: '/assets/img/proj-bath-stone.webp',
    netBase: 8400,
  },
  {
    key: 'kueche',
    num: '03',
    title: 'Küche & Geräteanschlüsse',
    lead: 'Spüle & Maschinen',
    detail: 'Trink- und Abwasseranschluss für Spüle, Geschirrspüler, Waschmaschine inklusive Eckventile und Siphon.',
    image: '/assets/img/proj-kitchen-oak.webp',
    netBase: 4200,
  },
  {
    key: 'keller',
    num: '04',
    title: 'Keller & Hauptstrang',
    lead: 'Verteilung',
    detail: 'Hausanschluss, Hauptverteiler, Steigleitungen, Druckminderer und Trinkwasserfilter inklusive Spülung.',
    image: '/assets/img/photo-parkett-rohbau.webp',
    netBase: 6800,
  },
  {
    key: 'garten',
    num: '05',
    title: 'Garten & Außenzapfstellen',
    lead: 'Außenbereich',
    detail: 'Frostsichere Außenarmaturen, Garten- und Pool-Zapfstellen inklusive Leitungsführung und Absperrung.',
    image: '/assets/img/proj-spa-corridor.webp',
    netBase: 3400,
  },
];

export const WASSER_EXTRAS = [
  { key: 'spuelkasten', label: 'Vorwand-Spülkasten & WC-Modul', netPrice: 1280 },
  { key: 'waschmaschine', label: 'Waschmaschinen-Anschluss & Sifon', netPrice: 480 },
  { key: 'warmwasser', label: 'Warmwasserspeicher & Zirkulation', netPrice: 2600 },
  { key: 'druck', label: 'Druckminderer & Trinkwasserfilter', netPrice: 740 },
  { key: 'demontage', label: 'Demontage & Entsorgung Altinstallation', netPrice: 880 },
] as const;

export function formatEuro(value: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 2,
  }).format(value);
}
