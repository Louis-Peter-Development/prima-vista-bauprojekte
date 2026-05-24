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
    photo: '/assets/img/photo-bad-prima-vista.webp',
    detailTo: '/heizkoerper',
    desc: 'Klassisch und effizient. Austausch, Anpassung an neue Heiztechnik, Lackierung und Verkleidung — inklusive hydraulischem Abgleich.',
  },
  {
    key: 'heizstraenge',
    title: 'Heizstränge',
    photo: '/assets/img/photo-parkett-rohbau.webp',
    detailTo: '/heizstraenge',
    desc: 'Komplette Erneuerung der Steig- und Verteilstränge in Mehrfamilienhäusern und Etagenwohnungen — staub- und etagenweise koordiniert.',
  },
  {
    key: 'fussboden',
    title: 'Fußboden-Heizung',
    subtitle: 'Flächenheizung',
    photo: '/assets/img/proj-floor-oak.webp',
    detailTo: '/fussbodenheizung',
    desc: 'Wassergeführt oder elektrisch — in Neubau, Sanierung und nachträglich im Bestand. Verträglich mit Parkett, Fliesen und Sichtestrich.',
  },
  {
    key: 'waermepumpe',
    title: 'Luft-Wärmepumpe',
    photo: '/assets/img/photo-haus-exterior.webp',
    detailTo: '/waermepumpe',
    desc: 'Förderfähige Wärmequelle für gut gedämmte Häuser. Auslegung, Aufstellplanung, Schallgutachten und Inbetriebnahme aus einer Hand.',
  },
  {
    key: 'gas',
    title: 'Gas-Heizung',
    subtitle: 'Brennwert',
    photo: '/assets/img/proj-stairs-concrete.webp',
    detailTo: '/gas-heizung',
    desc: 'Bei vorhandenem Gasanschluss eine sichere Brückentechnologie — moderne Brennwertkessel mit hoher Effizienz, vorbereitet für Wasserstoff-Beimischung.',
  },
  {
    key: 'pellet',
    title: 'Pelletofen',
    photo: '/assets/img/proj-concrete-sofa.webp',
    detailTo: '/pelletofen',
    desc: 'Holzpellets als CO₂-neutrale Alternative — als Zentralheizung mit Pufferspeicher oder als Einzelraum-Heizgerät im Wohnbereich.',
  },
  {
    key: 'thermen',
    title: 'Saunaofen Prestige',
    subtitle: 'Thermen & Öfen',
    photo: '/assets/img/proj-spa-tub.webp',
    detailTo: '/saunaofen',
    desc: 'Luxus-Saunaofen mit 9 kW Leistung, Materialbemusterung und optionalem Kaminsystem — für private Saunen und Wellnessbereiche.',
  },
];
