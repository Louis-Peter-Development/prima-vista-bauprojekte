export type MalerVariantKey =
  | 'all'
  | 'paint'
  | 'smoothPaint'
  | 'wallpaper'
  | 'ceilings'
  | 'radiators'
  | 'windows'
  | 'doors'
  | 'stairs'
  | 'facade';

export type MalerVariant = {
  key: MalerVariantKey;
  num: string;
  title: string;
  lead: string;
  detail: string;
  image: string;
  netBase: number;
};

export const MALER_VARIANTS: MalerVariant[] = [
  {
    key: 'all',
    num: '01',
    title: 'Alles zu Maler & Lackierung',
    lead: 'Komplettleistung',
    detail: 'Wände, Decken, Tapeten, Lackflächen, Abklebung, Ausbesserung und saubere Übergabe aus einer Hand.',
    image: '/assets/img/proj-paint-swatches.webp',
    netBase: 9400,
  },
  {
    key: 'paint',
    num: '02',
    title: 'Anstrich',
    lead: 'Wände & Decken',
    detail: 'Innenanstrich für Wände und Decken inklusive Abdeckung, Untergrundprüfung und zweifachem Farbauftrag.',
    image: '/assets/img/photo-office-light.webp',
    netBase: 5200,
  },
  {
    key: 'smoothPaint',
    num: '03',
    title: 'Glätten & Anstrich',
    lead: 'Malerfertig',
    detail: 'Spachteln, Schleifen, Grundieren und anschließender Anstrich für ruhige, glatte Wand- und Deckenflächen.',
    image: '/assets/img/photo-altbausanierung.webp',
    netBase: 7800,
  },
  {
    key: 'wallpaper',
    num: '04',
    title: 'Tapezieren & Anstrich',
    lead: 'Vlies & Tapete',
    detail: 'Tapezierarbeiten mit Untergrundvorbereitung, Stoßausbildung, Anstrich und sauberer Raumübergabe.',
    image: '/assets/img/proj-paint-swatches.webp',
    netBase: 6900,
  },
  {
    key: 'ceilings',
    num: '05',
    title: 'Decken-Lackierung',
    lead: 'Holzdecken',
    detail: 'Holzdecken anschleifen, vorbereiten, grundieren und deckend oder lasierend neu lackieren.',
    image: '/assets/img/proj-lobby-tree.webp',
    netBase: 6400,
  },
  {
    key: 'radiators',
    num: '06',
    title: 'Heizkörper-Lackierung',
    lead: 'Radiatoren',
    detail: 'Heizkörper reinigen, anschleifen, grundieren und mit hitzebeständigem Lack neu beschichten.',
    image: '/assets/img/photo-bad-prima-vista.webp',
    netBase: 3600,
  },
  {
    key: 'windows',
    num: '07',
    title: 'Fenster-Lackierung',
    lead: 'Holzfenster',
    detail: 'Fensterflächen vorbereiten, schadhafte Stellen ausbessern, grundieren und wetterfest lackieren.',
    image: '/assets/img/photo-haus-exterior.webp',
    netBase: 5800,
  },
  {
    key: 'doors',
    num: '08',
    title: 'Türen-Lackierung',
    lead: 'Innentüren',
    detail: 'Türblätter und Zargen anschleifen, ausbessern, grundieren und in Wunschfarbton lackieren.',
    image: '/assets/img/photo-altbausanierung.webp',
    netBase: 4300,
  },
  {
    key: 'stairs',
    num: '09',
    title: 'Treppe & Geländer',
    lead: 'Lackierung',
    detail: 'Treppen, Handläufe und Geländer vorbereiten, beschichten und widerstandsfähig versiegeln.',
    image: '/assets/img/proj-stairs-concrete.webp',
    netBase: 8200,
  },
  {
    key: 'facade',
    num: '10',
    title: 'Fassadenanstrich',
    lead: 'Außenfläche',
    detail: 'Fassade reinigen, grundieren, Risse prüfen und mit wetterbeständigem Außenanstrich beschichten.',
    image: '/assets/img/photo-haus-exterior.webp',
    netBase: 11600,
  },
];

export const MALER_EXTRAS = [
  { key: 'prep', label: 'Untergrund ausbessern', netPrice: 1200 },
  { key: 'protection', label: 'Möbel, Böden & Einbauten schützen', netPrice: 850 },
  { key: 'premiumPaint', label: 'Premiumfarbe oder Sonderfarbton', netPrice: 1500 },
] as const;

export function formatEuro(value: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 2,
  }).format(value);
}
