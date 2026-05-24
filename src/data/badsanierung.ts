export type BadVariantKey =
  | 'all'
  | 'tubShower'
  | 'tub'
  | 'shower'
  | 'guestWc'
  | 'barrierFree'
  | 'whirlpool'
  | 'sauna';

export type BadVariant = {
  key: BadVariantKey;
  num: string;
  title: string;
  lead: string;
  detail: string;
  image: string;
  netBase: number;
};

export const BAD_VARIANTS: BadVariant[] = [
  {
    key: 'all',
    num: '01',
    title: 'Alles zur Badsanierung',
    lead: 'Komplettbad',
    detail: 'Rückbau, Rohinstallation, Abdichtung, Fliesen, Sanitär, Licht und Endmontage aus einer Hand.',
    image: '/assets/img/proj-spa-bath.webp',
    netBase: 24500,
  },
  {
    key: 'tubShower',
    num: '02',
    title: 'Badewanne & Dusche',
    lead: 'Komfortbad',
    detail: 'Kombinierte Lösung mit Wanne, Dusche, Armaturen, Abdichtung und neuen Oberflächen.',
    image: '/assets/img/proj-bath-double.webp',
    netBase: 21500,
  },
  {
    key: 'tub',
    num: '03',
    title: 'Badewanne',
    lead: 'Wannenbad',
    detail: 'Badewannenbereich erneuern, Armaturen versetzen, Verkleidung und Fugen sauber schließen.',
    image: '/assets/img/proj-spa-tub.webp',
    netBase: 12800,
  },
  {
    key: 'shower',
    num: '04',
    title: 'Dusche',
    lead: 'Duschbad',
    detail: 'Duschbereich modernisieren, Abdichtung erneuern, Glas, Armaturen und Fliesen koordinieren.',
    image: '/assets/img/photo-bad-prima-vista.webp',
    netBase: 11200,
  },
  {
    key: 'guestWc',
    num: '05',
    title: 'Gäste-WC',
    lead: 'Kompakt',
    detail: 'Kleiner Raum mit Waschtisch, WC, Fliesen, Licht und cleverer Stauraumplanung.',
    image: '/assets/img/proj-bath-stone.webp',
    netBase: 6800,
  },
  {
    key: 'barrierFree',
    num: '06',
    title: 'Barrierefreies Bad',
    lead: 'Sicher',
    detail: 'Bodengleiche Dusche, Haltegriffe, Bewegungsflächen, rutschfeste Beläge und passende Montagehöhen.',
    image: '/assets/img/proj-spa-corridor.webp',
    netBase: 26800,
  },
  {
    key: 'whirlpool',
    num: '07',
    title: 'Whirlpool',
    lead: 'Wellness',
    detail: 'Whirlpool-Anschluss, Wannenintegration, Wasserführung, Stromanschluss und Revisionszugang.',
    image: '/assets/img/proj-spa-tub.webp',
    netBase: 18400,
  },
  {
    key: 'sauna',
    num: '08',
    title: 'Sauna',
    lead: 'Spa',
    detail: 'Sauna im Bad oder Wellnessbereich mit Ofen, Lüftung, Strom und materialgerechter Ausführung.',
    image: '/assets/img/proj-spa-bath.webp',
    netBase: 22500,
  },
];

export const BAD_EXTRAS = [
  { key: 'demolition', label: 'Rückbau & Entsorgung', netPrice: 2800 },
  { key: 'floorHeating', label: 'Elektrische Fußbodentemperierung', netPrice: 1650 },
  { key: 'lighting', label: 'Licht- und Spiegelkonzept', netPrice: 1250 },
] as const;

export function formatEuro(value: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 2,
  }).format(value);
}
