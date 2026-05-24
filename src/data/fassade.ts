export type FassadeVariantKey =
  | 'all'
  | 'insulation'
  | 'paint'
  | 'wood'
  | 'baseInsulation'
  | 'brickSlips'
  | 'panelCladding'
  | 'naturalStone'
  | 'curtainWall'
  | 'facingMasonry';

export type FassadeVariant = {
  key: FassadeVariantKey;
  num: string;
  title: string;
  lead: string;
  detail: string;
  image: string;
  netBase: number;
};

export const FASSADE_VARIANTS: FassadeVariant[] = [
  {
    key: 'all',
    num: '01',
    title: 'Alles zu Fassade',
    lead: 'Sanierung',
    detail: 'Dämmung, Putz, Anstrich, Sockel, Verkleidung und Anschlüsse als koordinierte Fassadenleistung.',
    image: '/assets/img/photo-haus-exterior.webp',
    netBase: 28600,
  },
  {
    key: 'insulation',
    num: '02',
    title: 'Dämmung - Fassade',
    lead: 'WDVS',
    detail: 'Fassadendämmung mit Dämmplatten, Armierung, Putzsystem, Anstrich und sauber ausgeführten Anschlüssen.',
    image: '/assets/img/photo-haus-exterior.webp',
    netBase: 24800,
  },
  {
    key: 'paint',
    num: '03',
    title: 'Anstrich - Fassade',
    lead: 'Wetterschutz',
    detail: 'Fassade reinigen, Untergrund prüfen, grundieren und mit wetterbeständigem Außenanstrich beschichten.',
    image: '/assets/img/proj-paint-swatches.webp',
    netBase: 9200,
  },
  {
    key: 'wood',
    num: '04',
    title: 'Holzverkleidung',
    lead: 'Naturfassade',
    detail: 'Unterkonstruktion, Holzprofile, Hinterlüftung, Schutzbehandlung und präzise Abschlüsse an Öffnungen.',
    image: '/assets/img/photo-altbausanierung.webp',
    netBase: 22600,
  },
  {
    key: 'baseInsulation',
    num: '05',
    title: 'Sockeldämmung',
    lead: 'Sockelzone',
    detail: 'Perimeternahe Sockelbereiche dämmen, abdichten, armieren und robust gegen Spritzwasser ausbilden.',
    image: '/assets/img/photo-haus-exterior.webp',
    netBase: 7800,
  },
  {
    key: 'brickSlips',
    num: '06',
    title: 'Klinker & Steinriemchen',
    lead: 'Riemchen',
    detail: 'Klinker- oder Steinriemchen auf vorbereiteter Fassade mit Fugenbild, Eckausbildung und Anschlüssen.',
    image: '/assets/img/proj-concrete-corner.webp',
    netBase: 19600,
  },
  {
    key: 'panelCladding',
    num: '07',
    title: 'Plattenverkleidung',
    lead: 'Fassadenplatten',
    detail: 'Moderne Fassadenplatten inklusive Unterkonstruktion, Hinterlüftung und objektbezogener Detailplanung.',
    image: '/assets/img/proj-lobby-tree.webp',
    netBase: 23800,
  },
  {
    key: 'naturalStone',
    num: '08',
    title: 'Natursteinverkleidung',
    lead: 'Steinoberfläche',
    detail: 'Natursteinbekleidung mit Untergrundvorbereitung, Zuschnitten, Befestigung und sauberen Übergängen.',
    image: '/assets/img/proj-bath-stone.webp',
    netBase: 26400,
  },
  {
    key: 'curtainWall',
    num: '09',
    title: 'Vorhangfassade',
    lead: 'Hinterlüftet',
    detail: 'Vorgehängte hinterlüftete Fassade mit Dämmung, Tragprofilen, Bekleidung und Anschlussdetails.',
    image: '/assets/img/photo-office-light.webp',
    netBase: 31200,
  },
  {
    key: 'facingMasonry',
    num: '10',
    title: 'Verblendmauerwerk',
    lead: 'Mauerwerk',
    detail: 'Verblendschale mit Steinen, Mörtel, Luftschicht, Ankern und sauber ausgebildeten Öffnungen.',
    image: '/assets/img/photo-haus-exterior.webp',
    netBase: 29400,
  },
];

export const FASSADE_EXTRAS = [
  { key: 'scaffold', label: 'Gerüst & Baustelleneinrichtung', netPrice: 3600 },
  { key: 'prep', label: 'Reinigung & Untergrundsanierung', netPrice: 2400 },
  { key: 'details', label: 'Fensterbänke, Laibungen & Anschlüsse', netPrice: 3200 },
] as const;

export function formatEuro(value: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 2,
  }).format(value);
}
