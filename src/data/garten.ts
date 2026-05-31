export type GartenVariantKey =
  | 'all'
  | 'lighting'
  | 'blockSteps'
  | 'carport'
  | 'gardenHouse'
  | 'walls'
  | 'shed'
  | 'raisedBeds'
  | 'pavilion'
  | 'woodTerrace'
  | 'stoneTerrace'
  | 'water'
  | 'winterGarden'
  | 'fence'
  | 'roofing';

export type GartenVariant = {
  key: GartenVariantKey;
  num: string;
  title: string;
  lead: string;
  detail: string;
  image: string;
  netBase: number;
};

export const GARTEN_VARIANTS: GartenVariant[] = [
  {
    key: 'all',
    num: '01',
    title: 'Alles zu Garten & Terrassen',
    lead: 'Außenanlage',
    detail: 'Terrassen, Wege, Mauern, Zaun, Beleuchtung, Entwässerung und Gartenbauten als koordinierte Außenanlage.',
    image: '/assets/img/photo-haus-exterior.webp',
    netBase: 34800,
  },
  {
    key: 'lighting',
    num: '02',
    title: 'Beleuchtung im Garten',
    lead: 'Lichtkonzept',
    detail: 'Außenbeleuchtung mit Leitungswegen, Leuchtenpositionen, Dämmerungsschaltung und wetterfesten Anschlüssen.',
    image: '/assets/img/photo-office-light.webp',
    netBase: 6800,
  },
  {
    key: 'blockSteps',
    num: '03',
    title: 'Blockstufen Montage',
    lead: 'Stufenanlage',
    detail: 'Blockstufen setzen, Unterbau vorbereiten, Höhen ausgleichen und sichere Übergänge zu Wegen oder Terrassen herstellen.',
    image: '/assets/img/proj-stairs-concrete.webp',
    netBase: 9200,
  },
  {
    key: 'carport',
    num: '04',
    title: 'Carport Montage',
    lead: 'Überstand',
    detail: 'Carport mit Fundamentpunkten, Tragwerk, Dachaufbau, Entwässerung und sauberem Anschluss an Bestand montieren.',
    image: '/assets/img/photo-haus-exterior.webp',
    netBase: 17600,
  },
  {
    key: 'gardenHouse',
    num: '05',
    title: 'Gartenhaus Montage',
    lead: 'Nutzraum',
    detail: 'Gartenhaus auf vorbereiteter Fläche montieren inklusive Untergrund, Aufbau, Dachanschluss und Wetterschutz.',
    image: '/assets/img/photo-altbausanierung.webp',
    netBase: 11800,
  },
  {
    key: 'walls',
    num: '06',
    title: 'Gartenmauern Montage',
    lead: 'Einfassung',
    detail: 'Gartenmauer mit Fundament, Mauerwerk oder Systemsteinen, Abdeckung und Entwässerungsdetails herstellen.',
    image: '/assets/img/proj-concrete-corner.webp',
    netBase: 13200,
  },
  {
    key: 'shed',
    num: '07',
    title: 'Gerätehaus Montage',
    lead: 'Stauraum',
    detail: 'Gerätehaus oder Schuppen aufbauen, ausrichten und mit Untergrund, Türanschlag und Wetterschutz übergeben.',
    image: '/assets/img/photo-parkett-rohbau.webp',
    netBase: 7600,
  },
  {
    key: 'raisedBeds',
    num: '08',
    title: 'Hochbeete Montage',
    lead: 'Bepflanzung',
    detail: 'Hochbeete setzen, innen auskleiden, befüllen und in Wege, Bewässerung oder Terrassenflächen integrieren.',
    image: '/assets/img/proj-moroccan-dining-wide.webp',
    netBase: 5400,
  },
  {
    key: 'pavilion',
    num: '09',
    title: 'Pavillon Montage',
    lead: 'Sitzplatz',
    detail: 'Pavillon mit Fundament, Tragwerk, Dach und Befestigungen für einen geschützten Außenbereich montieren.',
    image: '/assets/img/photo-altbausanierung.webp',
    netBase: 9800,
  },
  {
    key: 'woodTerrace',
    num: '10',
    title: 'Terrassen aus Holz',
    lead: 'Holzdeck',
    detail: 'Holzterrasse mit Unterkonstruktion, Dielen, Randabschluss, Gefälle und fachgerechter Verschraubung herstellen.',
    image: '/assets/img/proj-floor-oak.webp',
    netBase: 14600,
  },
  {
    key: 'stoneTerrace',
    num: '11',
    title: 'Terrassen aus Stein',
    lead: 'Steinfläche',
    detail: 'Steinterrasse mit tragfähigem Unterbau, Bettung, Plattenbelag, Fugen und sauberem Gefälle herstellen.',
    image: '/assets/img/photo-parkett-altbau.webp',
    netBase: 15800,
  },
  {
    key: 'water',
    num: '12',
    title: 'Wasserwirtschaft anlegen',
    lead: 'Entwässerung',
    detail: 'Entwässerung, Rigolen, Abläufe oder Gartenwasseranschlüsse planen und in die Außenfläche integrieren.',
    image: '/assets/img/proj-spa-corridor.webp',
    netBase: 11200,
  },
  {
    key: 'winterGarden',
    num: '13',
    title: 'Wintergarten Montage',
    lead: 'Ganzjahresraum',
    detail: 'Wintergarten mit Fundament, Verglasung, Dach, Anschlüssen und Abdichtungsdetails als Erweiterung montieren.',
    image: '/assets/img/proj-spa-bath.webp',
    netBase: 38600,
  },
  {
    key: 'fence',
    num: '14',
    title: 'Zaunanlagen Montage',
    lead: 'Einfriedung',
    detail: 'Zaunanlage mit Pfosten, Toren, Fundamenten, Höhenverlauf und sauberer Grundstückskante montieren.',
    image: '/assets/img/photo-haus-exterior.webp',
    netBase: 10400,
  },
  {
    key: 'roofing',
    num: '15',
    title: 'Überdachung Montage',
    lead: 'Wetterschutz',
    detail: 'Terrassenüberdachung mit Fundament, Tragwerk, Dachfläche, Entwässerung und Wandanschluss montieren.',
    image: '/assets/img/proj-concrete-sofa.webp',
    netBase: 18400,
  },
];

export const GARTEN_EXTRAS = [
  { key: 'planning', label: 'Aufmaß & Ausführungsplanung', netPrice: 1200 },
  { key: 'earthwork', label: 'Erdarbeiten & Unterbau', netPrice: 4200 },
  { key: 'disposal', label: 'Rückbau & Entsorgung', netPrice: 2600 },
] as const;

export function formatEuro(value: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 2,
  }).format(value);
}
