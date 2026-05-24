export type ElektroVariantKey =
  | 'all'
  | 'newFloor'
  | 'panel'
  | 'network'
  | 'single'
  | 'lighting'
  | 'freeHome'
  | 'shutters'
  | 'intercom';

export type ElektroVariant = {
  key: ElektroVariantKey;
  num: string;
  title: string;
  lead: string;
  detail: string;
  image: string;
  netBase: number;
};

export const ELEKTRO_VARIANTS: ElektroVariant[] = [
  {
    key: 'all',
    num: '01',
    title: 'Alles zu Elektroinstallation',
    lead: 'Komplettpaket',
    detail: 'Elektroplanung, Leitungsführung, Sicherungskasten, Schalter, Steckdosen, Licht und Abnahme koordiniert aus einer Hand.',
    image: '/assets/img/photo-office-light.webp',
    netBase: 22400,
  },
  {
    key: 'newFloor',
    num: '02',
    title: 'Neuinstallation pro Etage',
    lead: 'Grundinstallation',
    detail: 'Etagenweise Elektroinstallation mit Leitungswegen, Dosen, Schaltern, Steckdosen und Abstimmung der Stromkreise.',
    image: '/assets/img/photo-haus-exterior.webp',
    netBase: 16800,
  },
  {
    key: 'panel',
    num: '03',
    title: 'Sicherungskasten',
    lead: 'Verteilung',
    detail: 'Sicherungskasten erneuern, Stromkreise sauber auflegen, FI/LS-Konzept prüfen und beschriften.',
    image: '/assets/img/photo-office-light.webp',
    netBase: 6200,
  },
  {
    key: 'network',
    num: '04',
    title: 'Netzwerk & Bus',
    lead: 'Daten & KNX',
    detail: 'Netzwerkleitungen, Busleitungen, Dosen, Patchpunkte und Verteilerstruktur für moderne Gebäudetechnik.',
    image: '/assets/img/photo-office-light.webp',
    netBase: 7400,
  },
  {
    key: 'single',
    num: '05',
    title: 'Einzelinstallation',
    lead: 'Zuleitung',
    detail: 'Einzelne Zuleitungen, Schalter, Steckdosen, Geräteanschlüsse oder Wandpunkte gezielt ergänzen.',
    image: '/assets/img/proj-kitchen-oak.webp',
    netBase: 2800,
  },
  {
    key: 'lighting',
    num: '06',
    title: 'Lichttechnik & Beleuchtung',
    lead: 'Lichtplanung',
    detail: 'Einbauspots, Pendelleuchten, Unterbauleuchten, Schaltgruppen und dimmbare Lichtkreise abstimmen.',
    image: '/assets/img/photo-office-light.webp',
    netBase: 5400,
  },
  {
    key: 'freeHome',
    num: '07',
    title: 'Free Home',
    lead: 'Smart Home',
    detail: 'Smart-Home-Basis mit Schaltaktoren, Szenen, App-Steuerung und sauberer Einbindung in die Elektroplanung.',
    image: '/assets/img/photo-office-light.webp',
    netBase: 9200,
  },
  {
    key: 'shutters',
    num: '08',
    title: 'Rolladen-Steuerung',
    lead: 'Beschattung',
    detail: 'Rolladenmotoren, Taster, Zeitsteuerung, Leitungsführung und zentrale Steuerpunkte vorbereiten.',
    image: '/assets/img/photo-haus-exterior.webp',
    netBase: 4800,
  },
  {
    key: 'intercom',
    num: '09',
    title: 'Sprechanlagen',
    lead: 'Türkommunikation',
    detail: 'Audio- oder Video-Sprechanlage mit Innenstation, Außenstelle, Leitungsweg und Inbetriebnahme.',
    image: '/assets/img/photo-haus-exterior.webp',
    netBase: 3600,
  },
];

export const ELEKTRO_EXTRAS = [
  { key: 'demolition', label: 'Alte Leitungen freilegen & zurückbauen', netPrice: 2400 },
  { key: 'slots', label: 'Schlitze schließen & Oberflächen vorbereiten', netPrice: 1800 },
  { key: 'documentation', label: 'Dokumentation & Prüfprotokoll', netPrice: 950 },
] as const;

export function formatEuro(value: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 2,
  }).format(value);
}
