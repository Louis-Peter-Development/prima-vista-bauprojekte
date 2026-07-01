export type Heizmethode = {
  key: string;
  title: string;
  subtitle?: string;
  desc: string;
  photo?: string;
  detailTo?: string;
};

export const HEIZMETHODEN: Heizmethode[] = [
  {
    key: 'heizkoerper',
    title: 'Heizkörper',
    photo: '/assets/img/leistungen/heizkoerper-01.webp',
    detailTo: '/heizkoerper',
    desc: 'Klassisch und effizient. Austausch, Anpassung an neue Heiztechnik, Lackierung und Verkleidung — inklusive hydraulischem Abgleich.',
  },
  {
    key: 'heizstraenge',
    title: 'Heizstränge',
    photo: '/assets/img/leistungen/wasserinstallation-02.webp',
    detailTo: '/heizstraenge',
    desc: 'Komplette Erneuerung der Steig- und Verteilstränge in Mehrfamilienhäusern und Etagenwohnungen — staub- und etagenweise koordiniert.',
  },
  {
    key: 'fussboden',
    title: 'Fußboden-Heizung',
    subtitle: 'Flächenheizung',
    photo: '/assets/img/projects/bad-soden-einfamilienhaus-11.webp',
    detailTo: '/fussbodenheizung',
    desc: 'Wassergeführt oder elektrisch — in Neubau, Sanierung und nachträglich im Bestand. Verträglich mit Parkett, Fliesen und Sichtestrich.',
  },
  {
    key: 'waermepumpe',
    title: 'Luft-Wärmepumpe',
    photo: '/assets/img/leistungen/waermepumpe-01.webp',
    detailTo: '/waermepumpe',
    desc: 'Förderfähige Wärmequelle für gut gedämmte Häuser. Auslegung, Aufstellplanung, Schallgutachten und Inbetriebnahme aus einer Hand.',
  },
  {
    key: 'gas',
    title: 'Gas-Heizung',
    subtitle: 'Brennwert',
    photo: '/assets/img/leistungen/gas-heizung-01.webp',
    detailTo: '/gas-heizung',
    desc: 'Bei vorhandenem Gasanschluss eine sichere Brückentechnologie — moderne Brennwertkessel mit hoher Effizienz, vorbereitet für Wasserstoff-Beimischung.',
  },
  {
    key: 'pellet',
    title: 'Pelletofen',
    photo: '/assets/img/leistungen/gas-heizung-01.webp',
    detailTo: '/pelletofen',
    desc: 'Holzpellets als CO₂-neutrale Alternative — als Zentralheizung mit Pufferspeicher oder als Einzelraum-Heizgerät im Wohnbereich.',
  },
  {
    key: 'thermen',
    title: 'Saunaofen Prestige',
    subtitle: 'Thermen & Öfen',
    photo: '/assets/img/projects/spa-bad-hotel-01.webp',
    detailTo: '/saunaofen',
    desc: 'Luxus-Saunaofen mit 9 kW Leistung, Materialbemusterung und optionalem Kaminsystem — für private Saunen und Wellnessbereiche.',
  },
];
