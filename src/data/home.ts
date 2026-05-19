import type { LightboxItem } from '../components/Lightbox';

export const HERO_IMAGES = [
  '/assets/img/proj-moroccan-dining-wide.jpg',
  '/assets/img/proj-sushi-wide.jpg',
  '/assets/img/proj-lobby-tree-wide.jpg',
];

export const HOME_TRADES = [
  'Sanierung', 'Renovierung', 'Gastronomie-Ausbau', 'Bäder', 'Küchen', 'Böden',
  'Elektro', 'Heizung', 'Fassade', 'Maler & Lack', 'Treppen', 'Trockenbau',
];

export const TRADES_PREVIEW: Array<{ num: string; name: string; lead: string; detailTo?: string }> = [
  { num: '01', name: 'Bäder & Sanitär', lead: 'Wanne, Dusche, WC', detailTo: '/badsanierung' },
  { num: '02', name: 'Küchen & Möbelbau', lead: 'Schreinerei', detailTo: '/kuechen-moebelbau' },
  { num: '03', name: 'Böden & Beläge', lead: 'Parkett, Stein, Vinyl', detailTo: '/boeden-belaege' },
  { num: '04', name: 'Elektroinstallation', lead: 'Strom, Licht, KNX', detailTo: '/elektroinstallation' },
  { num: '05', name: 'Heizungsbau', lead: 'Wärmepumpe, FBH' },
  { num: '06', name: 'Maler & Lackierer', lead: 'Farben, Tapeten', detailTo: '/maler-lackierer' },
  { num: '07', name: 'Fassadensanierung', lead: 'Putz, WDVS' },
  { num: '08', name: 'Trockenbau', lead: 'Wände, Decken', detailTo: '/trockenbau' },
];

export const FEATURED_HOME_PROJECTS: Array<LightboxItem & { gridClass: string; year: string; alt: string; revealDelay?: number }> = [
  {
    src: '/assets/img/proj-moroccan-dining.jpg',
    title: 'Riad — Gastronomie · Frankfurt · 2025',
    year: '2025',
    alt: 'Riad Restaurant Frankfurt',
    gridClass: 'proj--a',
  },
  {
    src: '/assets/img/proj-concrete-sofa-tall.jpg',
    title: 'Villa Sichtbeton — Wohnsitz · Luzern · 2024',
    year: '2024',
    alt: 'Villa Sichtbeton Luzern',
    gridClass: 'proj--b',
    revealDelay: 1,
  },
  {
    src: '/assets/img/proj-kitchen-oak.jpg',
    title: 'Küche Eichenholz — Wohnsitz · Frankfurt · 2025',
    year: '2025',
    alt: 'Küche Eichenholz Frankfurt',
    gridClass: 'proj--c',
  },
  {
    src: '/assets/img/proj-spa-bath.jpg',
    title: 'Spa-Bad — Hotel · Emmenbrücke · 2025',
    year: '2025',
    alt: 'Spa-Bad Hotel',
    gridClass: 'proj--d',
    revealDelay: 1,
  },
  {
    src: '/assets/img/proj-lobby-tree.jpg',
    title: 'Lobby — Office · Frankfurt · 2026',
    year: '2026',
    alt: 'Lobby Office Frankfurt',
    gridClass: 'proj--e',
    revealDelay: 2,
  },
];

export const FEATURED_HOME_TITLES: Record<string, string> = {
  'proj--a': 'Riad — Gastronomie',
  'proj--b': 'Villa Sichtbeton',
  'proj--c': 'Küche Eichenholz',
  'proj--d': 'Spa-Bad — Hotel',
  'proj--e': 'Office Lobby',
};
