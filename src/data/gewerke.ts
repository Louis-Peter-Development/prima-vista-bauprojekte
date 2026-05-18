export type TradeKey =
  | 'bad' | 'kueche' | 'fassade' | 'dach' | 'elektro' | 'boden'
  | 'treppen' | 'heizung' | 'abdichtung' | 'maler' | 'trockenbau' | 'sanitaer';

export type TradeRow = {
  num: string;
  name: string;
  lead: string;
  key: TradeKey;
};

export type FeaturedTrade = {
  src: string;
  title: string;
  count: string;
  heading: [string, string];
  desc: string;
  feature?: boolean;
  revealDelay?: number;
};

export const PREVIEW_IMAGES: Record<TradeKey, string> = {
  bad: '/assets/img/photo-bad-prima-vista.jpg',
  kueche: '/assets/img/proj-kitchen-oak.jpg',
  fassade: '/assets/img/photo-haus-exterior.jpg',
  dach: '/assets/img/photo-altbausanierung.jpg',
  elektro: '/assets/img/photo-office-light.jpg',
  boden: '/assets/img/photo-parkett-altbau.jpg',
  treppen: '/assets/img/proj-stairs-concrete.jpg',
  heizung: '/assets/img/photo-haus-exterior.jpg',
  abdichtung: '/assets/img/proj-spa-corridor.jpg',
  maler: '/assets/img/proj-paint-swatches.jpg',
  trockenbau: '/assets/img/photo-parkett-rohbau.jpg',
  sanitaer: '/assets/img/photo-bad-prima-vista.jpg',
};

export const TRADES: TradeRow[] = [
  { num: '01', name: 'Bäder & Sanitär', lead: 'Wanne, Dusche, WC', key: 'bad' },
  { num: '02', name: 'Küchen & Möbelbau', lead: 'Schreinerei', key: 'kueche' },
  { num: '03', name: 'Böden & Beläge', lead: 'Parkett, Stein, Vinyl', key: 'boden' },
  { num: '04', name: 'Elektroinstallation', lead: 'Strom, Licht, KNX', key: 'elektro' },
  { num: '05', name: 'Sanitärinstallation', lead: 'Wasser, Abwasser', key: 'sanitaer' },
  { num: '06', name: 'Heizungsbau', lead: 'Wärmepumpe, FBH', key: 'heizung' },
  { num: '07', name: 'Trockenbau', lead: 'Wände, Decken', key: 'trockenbau' },
  { num: '08', name: 'Maler & Lackierer', lead: 'Farben, Tapeten', key: 'maler' },
  { num: '09', name: 'Fassadensanierung', lead: 'Putz, WDVS', key: 'fassade' },
  { num: '10', name: 'Dachsanierung', lead: 'Eindeckung, Dämmung', key: 'dach' },
  { num: '11', name: 'Abdichtung & Keller', lead: 'Feuchtigkeit', key: 'abdichtung' },
  { num: '12', name: 'Treppen & Geländer', lead: 'Holz, Beton, Stahl', key: 'treppen' },
  { num: '13', name: 'Fliesenleger', lead: 'Bad, Küche, Bodenfliesen', key: 'kueche' },
  { num: '14', name: 'Stuckateur', lead: 'Putz, Altbau-Profile', key: 'trockenbau' },
  { num: '15', name: 'Estrich & Industrieboden', lead: 'Zement, Anhydrit', key: 'boden' },
  { num: '16', name: 'Glaser & Spiegel', lead: 'Duschen, Fenster', key: 'elektro' },
  { num: '17', name: 'Marmor & Naturstein', lead: 'Platten, Sockel', key: 'bad' },
  { num: '18', name: 'Tischlerei & Türen', lead: 'Innen, Außen, Fenster', key: 'trockenbau' },
  { num: '19', name: 'Smart-Home & KNX', lead: 'Licht, Audio, Klima', key: 'elektro' },
  { num: '20', name: 'Garten & Außenanlagen', lead: 'Terrasse, Wege', key: 'fassade' },
];

export const FEATURED_TRADES: FeaturedTrade[] = [
  {
    src: '/assets/img/photo-bad-prima-vista.jpg',
    title: 'Badezimmer — Sanitär & Fliesen',
    count: '01 — 142 Projekte',
    heading: ['Bäder &', 'Sanitär'],
    desc: 'Komplettbäder von 4 bis 28 m². Fliesen, Sanitär, Heizkörper, Beleuchtung — aus einer Bestellung.',
    feature: true,
  },
  {
    src: '/assets/img/proj-kitchen-oak.jpg',
    title: 'Küchen & Möbelbau',
    count: '02 — 98 Projekte',
    heading: ['Küchen &', 'Möbelbau'],
    desc: 'Maßgefertigte Schreiner­küchen und Einbauten.',
    revealDelay: 1,
  },
  {
    src: '/assets/img/photo-parkett-altbau.jpg',
    title: 'Bodenbeläge',
    count: '03 — 187 Projekte',
    heading: ['Böden &', 'Beläge'],
    desc: 'Parkett, Vinyl, Naturstein, Estrich, Industrieboden.',
    revealDelay: 2,
  },
];

export const PROCESS_STEPS = [
  { num: '01', label: 'Erstgespräch', title: 'Aufnahme vor Ort', desc: 'Termin in 48 Stunden. Wir messen, hören zu und skizzieren grobe Optionen.' },
  { num: '02', label: 'Festpreis', title: 'Verbindliches Angebot', desc: 'Innerhalb von 14 Tagen erhalten Sie ein Festpreis-Angebot mit Endtermin.' },
  { num: '03', label: 'Bauphase', title: 'Eine Bauleitung', desc: 'Wöchentlicher Status, ein Ansprechpartner, alle Gewerke unter Vertrag.' },
  { num: '04', label: 'Übergabe', title: 'Abnahme & Pflege', desc: 'Schlüsselübergabe, Pflegeprotokoll, 5 Jahre Werks­gewähr — und Sie sind drin.' },
];
