export type ProjectSize = 'lg' | 'md' | 'sm' | 'tall' | 'wide' | 'sq';
export type ProjectTag = 'wohnsitz' | 'gastro' | 'bad' | 'kueche' | 'commercial';

export type Project = {
  num: string;
  slug: string;
  title: string;
  ttl: string;
  meta: string;
  src: string;
  size: ProjectSize;
  tags: ProjectTag[];
  revealDelay?: number;
  /* Detail page data */
  detail?: ProjectDetail;
};

export type ProjectDetail = {
  heroImg: string;
  headline: string;
  location: string;
  year: string;
  area: string;
  duration: string;
  scope: string;
  description: string[];
  gewerke: string[];
  gallery: string[];
  /** Single hero/feature film shown prominently right after the hero. */
  featuredVideo?: { id: string; label?: string };
  videos?: { id: string; label?: string }[];
};

export const PROJECTS: Project[] = [
  {
    num: '№ 147', slug: 'zoi-restaurant', title: 'Zoi — Restaurant · Frankfurt · 2026', ttl: 'Zoi Restaurant', meta: 'Gastronomie · Frankfurt · 2026', src: '/assets/img/proj-zoi-01.webp', size: 'lg', tags: ['gastro'],
    detail: {
      heroImg: '/assets/img/proj-zoi-01.webp',
      headline: 'Zoi Restaurant',
      location: 'Frankfurt',
      year: '2026',
      area: '240 m²',
      duration: '16 Wochen',
      scope: 'Komplett-Ausbau',
      description: [
        'Ein griechisch-mediterranes Restaurant — Zoi (griechisch für „Leben") — von der rohen Gewerbefläche bis zur schlüsselfertigen Eröffnung aus einer Hand.',
        'Das Raumkonzept lebt von skulpturalen Bögen und Rundbogen-Nischen: tiefe Terrakotta-Wände mit eingelassenen Rundnischen, dunkle Holzvertäfelungen und eine maßgefertigte Bar mit Mosaiktresen bilden das gestalterische Rückgrat des Gastraums.',
        'Handgemalte botanische Wandmalereien und ein abgestimmtes Lichtkonzept setzen warme Akzente, während alle Gewerke — inklusive Gastro-Lüftung und kompletter Kücheninstallation — koordiniert ineinandergreifen.',
      ],
      gewerke: ['Trockenbau', 'Elektroinstallation', 'Sanitär', 'Lüftung', 'Bodenbelag', 'Fliesen', 'Maler & Lackierer', 'Schreinerei', 'Möbelbau', 'Beleuchtung'],
      featuredVideo: { id: 'tVQud9TzU64', label: 'Restaurant sanieren in Rekordzeit — der Film' },
      videos: [
        { id: 'zI_MKILDPow' },
        { id: '2ZonoUK1uls' },
        { id: '1LKky-fCKu0' },
        { id: 'bk9gSI3zuTs' },
        { id: 'h5wWnVZpFZE' },
        { id: 'wg983ttU8ro' },
      ],
      gallery: [
        '/assets/img/proj-zoi-01.webp',
        '/assets/img/proj-zoi-02.webp',
        '/assets/img/proj-zoi-03.webp',
        '/assets/img/proj-zoi-04.webp',
        '/assets/img/proj-zoi-05.webp',
        '/assets/img/proj-zoi-06.webp',
        '/assets/img/proj-zoi-07.webp',
        '/assets/img/proj-zoi-08.webp',
        '/assets/img/proj-zoi-09.webp',
        '/assets/img/proj-zoi-10.webp',
        '/assets/img/proj-zoi-11.webp',
        '/assets/img/proj-zoi-12.webp',
        '/assets/img/proj-zoi-13.webp',
        '/assets/img/proj-zoi-14.webp',
        '/assets/img/proj-zoi-15.webp',
        '/assets/img/proj-zoi-16.webp',
        '/assets/img/proj-zoi-17.webp',
        '/assets/img/proj-zoi-18.webp',
        '/assets/img/proj-zoi-19.webp',
        '/assets/img/proj-zoi-20.webp',
        '/assets/img/proj-zoi-21.webp',
        '/assets/img/proj-zoi-22.webp',
        '/assets/img/proj-zoi-23.webp',
      ],
    },
  },
  {
    num: '№ 142', slug: 'riad-restaurant', title: 'Riad — Restaurant · Frankfurt · 2025', ttl: 'Riad Restaurant', meta: 'Gastronomie · Frankfurt · 2025', src: '/assets/img/proj-moroccan-dining-wide.webp', size: 'lg', tags: ['gastro'],
    detail: {
      heroImg: '/assets/img/proj-moroccan-dining-wide.webp',
      headline: 'Riad Restaurant',
      location: 'Frankfurt-Sachsenhausen',
      year: '2025',
      area: '320 m²',
      duration: '14 Wochen',
      scope: 'Komplett-Ausbau',
      description: [
        'Ein marokkanisch inspiriertes Restaurant im Herzen von Sachsenhausen — von der rohen Gewerbefläche bis zur schlüsselfertigen Eröffnung in 14 Wochen.',
        'Das Konzept verbindet traditionelle Riad-Architektur mit modernem Frankfurter Anspruch: handgefertigte Zellige-Fliesen, offene Showküche, kupferne Akzente und ein Lichtsystem, das den Gast durch den Abend begleitet.',
        'Alle 20 Gewerke wurden aus einer Hand koordiniert — einschließlich Lüftungsanlage nach Gastro-Vorschriften und kompletter Kücheninstallation.',
      ],
      gewerke: ['Trockenbau', 'Elektroinstallation', 'Sanitär', 'Lüftung', 'Bodenbelag', 'Maler & Lackierer', 'Küche', 'Möbelbau', 'Beleuchtung'],
      gallery: ['/assets/img/proj-moroccan-dining-wide.webp', '/assets/img/proj-moroccan-corner.webp', '/assets/img/proj-moroccan-lamps.webp'],
    },
  },
  {
    num: '№ 138', slug: 'villa-sichtbeton', title: 'Villa Sichtbeton · Luzern · 2024', ttl: 'Villa Sichtbeton', meta: 'Wohnsitz · Luzern · 2024', src: '/assets/img/proj-concrete-sofa-tall.webp', size: 'md', tags: ['wohnsitz'], revealDelay: 1,
    detail: {
      heroImg: '/assets/img/proj-concrete-sofa-tall.webp',
      headline: 'Villa Sichtbeton',
      location: 'Luzern, Innerschweiz',
      year: '2024',
      area: '280 m²',
      duration: '18 Wochen',
      scope: 'Generalsanierung',
      description: [
        'Komplettsanierung einer 1970er-Jahre-Villa mit freiliegendem Sichtbeton und skulpturaler Raumgestaltung.',
        'Die bestehende Substanz wurde erhalten und durch moderne Einbauten ergänzt: Sichtbetontreppen, ein offener Wohn-Essbereich mit raumhohen Fenstern und ein Badkonzept aus Naturstein.',
        'Besonderer Fokus auf thermische Sanierung der Gebäudehülle bei gleichzeitiger Bewahrung des brutalistischen Charakters.',
      ],
      gewerke: ['Rohbau', 'Fassade & WDVS', 'Fenstertechnik', 'Trockenbau', 'Elektro', 'Sanitär', 'Böden', 'Maler'],
      gallery: ['/assets/img/proj-concrete-sofa-tall.webp', '/assets/img/proj-concrete-corner.webp'],
    },
  },
  {
    num: '№ 140', slug: 'kueche-eichenholz', title: 'Küche Eichenholz · Frankfurt · 2025', ttl: 'Küche Eiche', meta: 'Wohnsitz · Frankfurt · 2025', src: '/assets/img/proj-kitchen-oak.webp', size: 'sm', tags: ['wohnsitz', 'kueche'],
    detail: {
      heroImg: '/assets/img/proj-kitchen-oak.webp',
      headline: 'Küche Eichenholz',
      location: 'Frankfurt-Nordend',
      year: '2025',
      area: '42 m²',
      duration: '6 Wochen',
      scope: 'Küchen- & Essbereich',
      description: [
        'Maßgefertigte Einbauküche aus massiver Eiche mit griffloser Front und integrierter Kochinsel.',
        'Der gesamte Koch- und Essbereich wurde neu strukturiert: neue Elektro- und Wasseranschlüsse, Fußbodenheizung, LED-Lichtband und ein nahtloser Übergang zum Wohnbereich.',
      ],
      gewerke: ['Schreinerei', 'Elektro', 'Sanitär', 'Bodenbelag', 'Maler'],
      gallery: ['/assets/img/proj-kitchen-oak.webp'],
    },
  },
  {
    num: '№ 141', slug: 'spa-bad-hotel', title: 'Spa-Bad — Hotel · Emmenbrücke · 2025', ttl: 'Spa-Bad', meta: 'Hotel · Emmenbrücke · 2025', src: '/assets/img/proj-spa-bath.webp', size: 'sm', tags: ['commercial', 'bad'], revealDelay: 1,
    detail: {
      heroImg: '/assets/img/proj-spa-bath.webp',
      headline: 'Spa-Bad Hotel',
      location: 'Emmenbrücke, Innerschweiz',
      year: '2025',
      area: '86 m²',
      duration: '8 Wochen',
      scope: 'Wellness-Bad',
      description: [
        'Umbau eines klassischen Hotelbadezimmers in eine moderne Spa-Landschaft mit freistehender Badewanne, Regendusche und Naturstein.',
        'Das Lichtkonzept setzt auf indirekte LED-Streifen und einen Sternenhimmel über der Wanne — gedimmt über KNX.',
      ],
      gewerke: ['Sanitär', 'Elektro & KNX', 'Naturstein', 'Trockenbau', 'Maler'],
      gallery: ['/assets/img/proj-spa-bath.webp', '/assets/img/proj-spa-corridor.webp'],
    },
  },
  {
    num: '№ 145', slug: 'office-lobby', title: 'Office Lobby · Frankfurt · 2026', ttl: 'Office Lobby', meta: 'Commercial · Frankfurt · 2026', src: '/assets/img/proj-lobby-tree-wide.webp', size: 'sm', tags: ['commercial'], revealDelay: 2,
    detail: {
      heroImg: '/assets/img/proj-lobby-tree-wide.webp',
      headline: 'Office Lobby',
      location: 'Frankfurt-Innenstadt',
      year: '2026',
      area: '160 m²',
      duration: '10 Wochen',
      scope: 'Empfangsbereich',
      description: [
        'Neugestaltung der Lobby eines Bürogebäudes mit lebendem Baum als Raumteiler, Naturstein-Empfangstresen und akustisch wirksamen Deckenplatten.',
        'Die Bodengestaltung kombiniert großformatige Feinsteinzeugplatten mit eingelassenen Metallstreifen — ein visuelles Leitsystem, das Besucher intuitiv zum Empfang führt.',
      ],
      gewerke: ['Trockenbau', 'Bodenbelag', 'Elektro', 'Maler', 'Möbelbau', 'Bepflanzung'],
      gallery: ['/assets/img/proj-lobby-tree-wide.webp', '/assets/img/proj-lobby-tree.webp'],
    },
  },
  {
    num: '№ 139', slug: 'sushi-counter', title: 'Sushi Counter · Wiesbaden · 2025', ttl: 'Sushi Counter', meta: 'Gastronomie · Wiesbaden · 2025', src: '/assets/img/proj-sushi-wide.webp', size: 'wide', tags: ['gastro'],
    detail: {
      heroImg: '/assets/img/proj-sushi-wide.webp',
      headline: 'Sushi Counter',
      location: 'Wiesbaden-Innenstadt',
      year: '2025',
      area: '110 m²',
      duration: '9 Wochen',
      scope: 'Gastro-Ausbau',
      description: [
        'Ein 16-Sitzplatz-Counter aus geöltem Eichenholz mit integrierter Kühlung und Live-Zubereitungszone.',
        'Der kompakte Raum wurde bis ins Detail geplant: Belüftungsanlage, Wasseraufbereitung, Sushi-Display-Vitrine und eine minimalistische Holzverkleidung, die japanische Schlichtheit mit Wiesbadener Gründerzeit verbindet.',
      ],
      gewerke: ['Schreinerei', 'Lüftung', 'Kältetechnik', 'Sanitär', 'Elektro', 'Bodenbelag'],
      gallery: ['/assets/img/proj-sushi-wide.webp'],
    },
  },
  {
    num: '№ 136', slug: 'treppenhaus-sichtbeton', title: 'Sichtbeton-Treppenhaus · Luzern · 2024', ttl: 'Treppenhaus', meta: 'Commercial · Luzern · 2024', src: '/assets/img/proj-stairs-concrete.webp', size: 'tall', tags: ['commercial'], revealDelay: 1,
    detail: {
      heroImg: '/assets/img/proj-stairs-concrete.webp',
      headline: 'Sichtbeton-Treppenhaus',
      location: 'Luzern, Innerschweiz',
      year: '2024',
      area: '65 m²',
      duration: '6 Wochen',
      scope: 'Treppenanlage',
      description: [
        'Freitragende Sichtbeton-Wendeltreppe über drei Geschosse mit eingelassenem LED-Handlauf und Edelstahlgeländer.',
        'Die bestehende Holztreppe wurde rückgebaut und durch eine monolithische Betonkonstruktion ersetzt — gegossen vor Ort, geschliffen und versiegelt.',
      ],
      gewerke: ['Rohbau', 'Treppen & Geländer', 'Elektro', 'Maler'],
      gallery: ['/assets/img/proj-stairs-concrete.webp'],
    },
  },
  {
    num: '№ 143', slug: 'doppelbad', title: 'Doppelbad · Frankfurt · 2025', ttl: 'Doppelbad', meta: 'Wohnsitz · Frankfurt · 2025', src: '/assets/img/proj-bath-double.webp', size: 'sm', tags: ['wohnsitz', 'bad'],
    detail: {
      heroImg: '/assets/img/proj-bath-double.webp',
      headline: 'Doppelbad',
      location: 'Frankfurt-Westend',
      year: '2025',
      area: '28 m²',
      duration: '5 Wochen',
      scope: 'Badsanierung',
      description: [
        'Zwei miteinander verbundene Bäder — ein Master-Bad mit freistehender Wanne und ein Gäste-WC mit Dusche — in einem durchgängigen Materialkonzept aus grauem Naturstein.',
        'Bodenbündige Duschen, wandhängende WCs und ein maßgefertigter Doppelwaschtisch aus Corian.',
      ],
      gewerke: ['Sanitär', 'Fliesen', 'Elektro', 'Trockenbau', 'Maler'],
      gallery: ['/assets/img/proj-bath-double.webp'],
    },
  },
  {
    num: '№ 137', slug: 'naturstein-bad', title: 'Naturstein-Bad · Sachsenhausen · 2024', ttl: 'Naturstein-Bad', meta: 'Wohnsitz · Sachsenhausen · 2024', src: '/assets/img/proj-bath-stone.webp', size: 'sm', tags: ['wohnsitz', 'bad'], revealDelay: 1,
    detail: {
      heroImg: '/assets/img/proj-bath-stone.webp',
      headline: 'Naturstein-Bad',
      location: 'Frankfurt-Sachsenhausen',
      year: '2024',
      area: '18 m²',
      duration: '4 Wochen',
      scope: 'Badsanierung',
      description: [
        'Komplettsanierung eines Altbau-Badezimmers mit durchgängigem Kalkstein-Belag an Wand und Boden.',
        'Fuge auf Fuge verlegt, mit minimalen Dehnungsfugen — das Ergebnis wirkt wie aus einem Stück.',
      ],
      gewerke: ['Sanitär', 'Naturstein', 'Elektro', 'Abdichtung'],
      gallery: ['/assets/img/proj-bath-stone.webp'],
    },
  },
  {
    num: '№ 142b', slug: 'riad-bar-ecke', title: 'Riad — Bar-Ecke · Frankfurt · 2025', ttl: 'Riad Bar-Ecke', meta: 'Gastronomie · Frankfurt · 2025', src: '/assets/img/proj-moroccan-corner.webp', size: 'md', tags: ['gastro'],
    detail: {
      heroImg: '/assets/img/proj-moroccan-corner.webp',
      headline: 'Riad Bar-Ecke',
      location: 'Frankfurt-Sachsenhausen',
      year: '2025',
      area: '45 m²',
      duration: 'Teil des Riad-Projekts',
      scope: 'Bar & Lounge',
      description: [
        'Die intime Bar-Ecke des Riad Restaurants — mit maßgefertigtem Tresen aus dunklem Walnussholz, marokkanischen Kacheln und warmem Kupferlicht.',
        'Der Bereich ist akustisch vom Hauptraum getrennt und bietet Platz für 18 Gäste.',
      ],
      gewerke: ['Schreinerei', 'Elektro', 'Fliesen', 'Maler'],
      gallery: ['/assets/img/proj-moroccan-corner.webp', '/assets/img/proj-moroccan-dining-wide.webp'],
    },
  },
  {
    num: '№ 138b', slug: 'concrete-corner', title: 'Concrete Corner · Luzern · 2024', ttl: 'Concrete Corner', meta: 'Wohnsitz · Luzern · 2024', src: '/assets/img/proj-concrete-corner.webp', size: 'lg', tags: ['wohnsitz'], revealDelay: 1,
    detail: {
      heroImg: '/assets/img/proj-concrete-corner.webp',
      headline: 'Concrete Corner',
      location: 'Luzern, Innerschweiz',
      year: '2024',
      area: 'Teil der Villa Sichtbeton',
      duration: 'Teil des Villa-Projekts',
      scope: 'Wohnbereich',
      description: [
        'Der offene Wohnbereich der Villa Sichtbeton — mit raumhohen Fenstern, eingelassenem Kamin und einem nahtlosen Übergang zur Terrasse.',
        'Die Sichtbetonwände wurden geschliffen und mit einer transparenten Versiegelung geschützt.',
      ],
      gewerke: ['Rohbau', 'Fenstertechnik', 'Elektro', 'Bodenbelag'],
      gallery: ['/assets/img/proj-concrete-corner.webp', '/assets/img/proj-concrete-sofa-tall.webp'],
    },
  },
  {
    num: '№ 146', slug: 'wine-bar', title: 'Wine Bar · Frankfurt · 2026', ttl: 'Wine Bar', meta: 'Gastronomie · Frankfurt · 2026', src: '/assets/img/proj-wine-restaurant.webp', size: 'sm', tags: ['gastro'],
    detail: {
      heroImg: '/assets/img/proj-wine-restaurant.webp',
      headline: 'Wine Bar',
      location: 'Frankfurt-Innenstadt',
      year: '2026',
      area: '95 m²',
      duration: '8 Wochen',
      scope: 'Gastro-Ausbau',
      description: [
        'Eine elegante Weinbar mit temperaturgesteuertem Weinlager hinter Glas, rustikalem Eichentresen und atmosphärischer Pendelbeleuchtung.',
        'Die Klimaanlage wurde speziell für die Weinlagerung dimensioniert — getrennte Zonen für Rot- und Weißwein.',
      ],
      gewerke: ['Schreinerei', 'Kältetechnik', 'Elektro', 'Sanitär', 'Bodenbelag', 'Maler'],
      gallery: ['/assets/img/proj-wine-restaurant.webp'],
    },
  },
  {
    num: '№ 141b', slug: 'spa-korridor', title: 'Spa-Korridor · Emmenbrücke · 2025', ttl: 'Spa Korridor', meta: 'Hotel · Emmenbrücke · 2025', src: '/assets/img/proj-spa-corridor.webp', size: 'sm', tags: ['commercial'], revealDelay: 1,
    detail: {
      heroImg: '/assets/img/proj-spa-corridor.webp',
      headline: 'Spa Korridor',
      location: 'Emmenbrücke, Innerschweiz',
      year: '2025',
      area: '40 m²',
      duration: 'Teil des Spa-Projekts',
      scope: 'Hotelflur',
      description: [
        'Der Übergangsbereich zwischen Hotelzimmern und Spa-Bereich — gestaltet als meditativer Korridor mit indirektem Licht, Eichenholzlamellen und einem Wasserspiel am Ende des Gangs.',
      ],
      gewerke: ['Trockenbau', 'Elektro', 'Bodenbelag', 'Maler', 'Schreinerei'],
      gallery: ['/assets/img/proj-spa-corridor.webp', '/assets/img/proj-spa-bath.webp'],
    },
  },
  {
    num: '№ 144', slug: 'eiche-parkett', title: 'Eiche Parkett · Wiesbaden · 2025', ttl: 'Eiche Parkett', meta: 'Wohnsitz · Wiesbaden · 2025', src: '/assets/img/photo-parkett-altbau.webp', size: 'sm', tags: ['wohnsitz'], revealDelay: 2,
    detail: {
      heroImg: '/assets/img/photo-parkett-altbau.webp',
      headline: 'Eiche Parkett',
      location: 'Wiesbaden',
      year: '2025',
      area: '120 m²',
      duration: '3 Wochen',
      scope: 'Bodenbelag',
      description: [
        'Verlegung von Eiche-Massivdielen im Fischgrätmuster in einer Altbauwohnung — einschließlich Unterbodenaufbereitung, Trittschalldämmung und Sockelleisten.',
        'Die Dielen wurden vor Ort geschliffen und dreifach geölt für eine natürliche, warme Haptik.',
      ],
      gewerke: ['Bodenbelag', 'Trockenbau', 'Maler'],
      gallery: ['/assets/img/photo-parkett-altbau.webp'],
    },
  },
  {
    num: '№ 145b', slug: 'lobby-garden', title: 'Lobby Garden · Frankfurt · 2026', ttl: 'Lobby Garden', meta: 'Commercial · Frankfurt · 2026', src: '/assets/img/proj-lobby-tree.webp', size: 'wide', tags: ['commercial'],
    detail: {
      heroImg: '/assets/img/proj-lobby-tree.webp',
      headline: 'Lobby Garden',
      location: 'Frankfurt-Innenstadt',
      year: '2026',
      area: '80 m²',
      duration: 'Teil des Lobby-Projekts',
      scope: 'Innenraumbegrünung',
      description: [
        'Der begrünte Bereich der Office Lobby — ein lebender Olivenbaum, umgeben von Sitzinseln aus gebürstetem Beton und integrierten Pflanzbeeten.',
        'Bewässerung und Drainage wurden unter dem Bodenbelag versteckt, das Licht über einen automatisierten Tageslichtzyklus gesteuert.',
      ],
      gewerke: ['Bepflanzung', 'Sanitär', 'Elektro', 'Bodenbelag', 'Möbelbau'],
      gallery: ['/assets/img/proj-lobby-tree.webp', '/assets/img/proj-lobby-tree-wide.webp'],
    },
  },
  {
    num: '№ 142c', slug: 'riad-lampen', title: 'Riad — Lampen · Frankfurt · 2025', ttl: 'Riad Lampen', meta: 'Gastronomie · Frankfurt · 2025', src: '/assets/img/proj-moroccan-lamps.webp', size: 'tall', tags: ['gastro'], revealDelay: 1,
    detail: {
      heroImg: '/assets/img/proj-moroccan-lamps.webp',
      headline: 'Riad Lampen',
      location: 'Frankfurt-Sachsenhausen',
      year: '2025',
      area: 'Teil des Riad-Projekts',
      duration: 'Teil des Riad-Projekts',
      scope: 'Beleuchtungskonzept',
      description: [
        'Handgefertigte marokkanische Messinglampen, einzeln importiert und vor Ort an ein dimmbares LED-System angeschlossen.',
        'Jede Lampe wirft ein eigenes Schattenmuster an die Wand — ein Spiel aus Licht und Ornament, das den gesamten Gastraum durchzieht.',
      ],
      gewerke: ['Elektro', 'Beleuchtung', 'Schreinerei'],
      gallery: ['/assets/img/proj-moroccan-lamps.webp', '/assets/img/proj-moroccan-dining-wide.webp'],
    },
  },
];

export const PROJECT_FILTERS: Array<{ key: 'all' | ProjectTag; label: string }> = [
  { key: 'all', label: 'Alle' },
  { key: 'wohnsitz', label: 'Wohnsitz' },
  { key: 'gastro', label: 'Gastronomie' },
  { key: 'bad', label: 'Bäder' },
  { key: 'kueche', label: 'Küchen' },
  { key: 'commercial', label: 'Commercial' },
];
