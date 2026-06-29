export type TradeKey =
  | 'bad' | 'kueche' | 'fassade' | 'dach' | 'elektro' | 'boden'
  | 'treppen' | 'heizung' | 'abdichtung' | 'maler' | 'trockenbau' | 'sanitaer' | 'rohbau' | 'tueren' | 'zaun'
  | 'garten' | 'barrierefreiheit' | 'fenster' | 'thermen';

export type TradeRow = {
  num: string;
  name: string;
  lead: string;
  key: TradeKey;
  detailTo?: string;
};

export type FeaturedTrade = {
  /** Stable i18n key under pages:gewerke.featured.cards. */
  key: 'bad' | 'kueche' | 'boden';
  src: string;
  feature?: boolean;
  revealDelay?: number;
  detailTo?: string;
};

export const PREVIEW_IMAGES: Record<TradeKey, string> = {
  bad: '/assets/img/leistungen/badsanierung-05.webp',
  kueche: '/assets/img/leistungen/kuechen-moebelbau-02.webp',
  fassade: '/assets/img/leistungen/fassadensanierung-01.webp',
  dach: '/assets/img/leistungen/dachsanierung-01.webp',
  elektro: '/assets/img/leistungen/elektroinstallation-01.webp',
  boden: '/assets/img/leistungen/boeden-belaege-11.webp',
  treppen: '/assets/img/leistungen/treppen-gelaender-01.webp',
  heizung: '/assets/img/leistungen/waermepumpe-01.webp',
  abdichtung: '/assets/img/leistungen/abdichtung-keller-01.webp',
  maler: '/assets/img/leistungen/maler-lackierer-03.webp',
  trockenbau: '/assets/img/leistungen/trockenbau-decke-01.webp',
  sanitaer: '/assets/img/leistungen/wasserinstallation-04.webp',
  rohbau: '/assets/img/leistungen/rohbau-trockenbau-01.webp',
  tueren: '/assets/img/leistungen/tueren-zargen-01.webp',
  zaun: '/assets/img/leistungen/zaeune-tore-01.webp',
  garten: '/assets/img/leistungen/garten-aussenanlagen-01.webp',
  barrierefreiheit: '/assets/img/leistungen/badsanierung-06.webp',
  fenster: '/assets/img/leistungen/fenstertechnik-02.webp',
  thermen: '/assets/img/proj-spa-bath.webp',
};

export const TRADES: TradeRow[] = [
  { num: '01', name: 'Abdichtungen', lead: 'Feuchtigkeit', key: 'abdichtung', detailTo: '/abdichtung-keller' },
  { num: '02', name: 'Badsanierung & Gäste WC', lead: 'Wanne, Dusche, WC', key: 'bad', detailTo: '/badsanierung' },
  { num: '03', name: 'Barrierefreies Bad', lead: 'Bad, Dusche, WC', key: 'barrierefreiheit', detailTo: '/barrierefreiheit' },
  { num: '04', name: 'Boden & Estrich', lead: 'Parkett, Stein, Vinyl', key: 'boden', detailTo: '/boeden-belaege' },
  { num: '05', name: 'Dachsanierungen', lead: 'Eindeckung, Dämmung', key: 'dach', detailTo: '/dachsanierung' },
  { num: '06', name: 'Elektroinstallationen', lead: 'Strom, Licht, KNX', key: 'elektro', detailTo: '/elektroinstallation' },
  { num: '07', name: 'Fassaden & Dämmung', lead: 'Putz, WDVS', key: 'fassade', detailTo: '/fassadensanierung' },
  { num: '08', name: 'Fenster & Balkontüren', lead: 'Fenster, Türen, Sonnenschutz', key: 'fenster', detailTo: '/fenstertechnik' },
  { num: '09', name: 'Garten & Terassen', lead: 'Terrasse, Wege', key: 'garten', detailTo: '/garten-aussenanlagen' },
  { num: '10', name: 'Heizung & Heizstränge', lead: 'Wärmepumpe, FBH', key: 'heizung', detailTo: '/heizmethoden' },
  { num: '11', name: 'Küchen & Möbelbau', lead: 'Schreinerei', key: 'kueche', detailTo: '/kuechen-moebelbau' },
  { num: '12', name: 'Maler & Lackierungen', lead: 'Farben, Tapeten', key: 'maler', detailTo: '/maler-lackierer' },
  { num: '13', name: 'Rohbau Leistungen', lead: 'Fundament, Mauerwerk, Decken', key: 'rohbau', detailTo: '/rohbau-abbruch' },
  { num: '14', name: 'Thermen & Heiztechnik', lead: 'Gas, Öl, Wärmepumpen', key: 'thermen', detailTo: '/heizmethoden' },
  { num: '15', name: 'Treppen & Geländer', lead: 'Holz, Beton, Stahl', key: 'treppen', detailTo: '/treppen-gelaender' },
  { num: '16', name: 'Türen & Tore', lead: 'Innen, Haus, Schiebe', key: 'tueren', detailTo: '/tueren-zargen' },
  { num: '17', name: 'Trockenbau', lead: 'Wände, Decken', key: 'trockenbau', detailTo: '/trockenbau' },
  { num: '18', name: 'Wasserinstallationen', lead: 'Wasser, Abwasser', key: 'sanitaer', detailTo: '/sanitaerinstallation' },
  { num: '19', name: 'Zaunbau', lead: 'Doppelstab, Holz, Sichtschutz', key: 'zaun', detailTo: '/zaeune' },
];

export const FEATURED_TRADES: FeaturedTrade[] = [
  {
    key: 'bad',
    src: '/assets/img/leistungen/badsanierung-05.webp',
    feature: true,
    detailTo: '/badsanierung',
  },
  {
    key: 'kueche',
    src: '/assets/img/leistungen/kuechen-moebelbau-02.webp',
    revealDelay: 1,
    detailTo: '/kuechen-moebelbau',
  },
  {
    key: 'boden',
    src: '/assets/img/leistungen/boeden-belaege-11.webp',
    revealDelay: 2,
    detailTo: '/boeden-belaege',
  },
];

export const PROCESS_STEPS = [
  { num: '01', label: 'Erstgespräch', title: 'Aufnahme vor Ort', desc: 'Termin in 48 Stunden. Wir messen, hören zu und skizzieren grobe Optionen.' },
  { num: '02', label: 'Festpreis', title: 'Verbindliches Angebot', desc: 'Innerhalb von 14 Tagen erhalten Sie ein Festpreis-Angebot mit Endtermin.' },
  { num: '03', label: 'Bauphase', title: 'Eine Bauleitung', desc: 'Wöchentlicher Status, ein Ansprechpartner, alle Gewerke unter Vertrag.' },
  { num: '04', label: 'Übergabe', title: 'Abnahme & Pflege', desc: 'Schlüsselübergabe, Pflegeprotokoll, 5 Jahre Werks­gewähr — und Sie sind drin.' },
];
