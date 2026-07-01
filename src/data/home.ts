import type { LightboxItem } from '../components/Lightbox';
import type { TradeKey } from './gewerke';

export type HeroSlide = {
  /** Base name (under /assets/img/hero/) and shape: `${name}-800.avif`, `${name}-1600.webp`, etc. */
  name: string;
  alt: string;
};

/**
 * Hero slideshow. Each slide ships in AVIF + WebP at 800w (mobile) and 1600w
 * (desktop) under /assets/img/hero/. The first slide is the LCP image and gets
 * `fetchpriority="high"`.
 */
export const HERO_SLIDES: HeroSlide[] = [
  { name: 'lounge-modern', alt: 'Moderne Lounge mit Holzdecke und Naturmaterialien' },
  { name: 'atrium-tree', alt: 'Atrium mit Glasrotunde und Baum-Installation' },
  { name: 'spa-bath', alt: 'Spa-Badezimmer mit freistehender Wanne und Holzwand' },
];

/** Back-compat for any caller that still imports HERO_IMAGES (high-res fallback). */
export const HERO_IMAGES = HERO_SLIDES.map((s) => `/assets/img/hero/${s.name}-1600.webp`);

export const HOME_TRADES = [
  'Sanierung', 'Renovierung', 'Gastronomie-Ausbau', 'Bäder', 'Küchen', 'Böden',
  'Elektro', 'Heizung', 'Fassade', 'Maler & Lack', 'Treppen', 'Trockenbau',
];

export const TRADES_PREVIEW: Array<{ num: string; name: string; lead: string; key: TradeKey; detailTo?: string }> = [
  { num: '01', name: 'Bäder & Sanitär', lead: 'Wanne, Dusche, WC', key: 'bad', detailTo: '/badsanierung' },
  { num: '02', name: 'Küchen & Möbelbau', lead: 'Schreinerei', key: 'kueche', detailTo: '/kuechen-moebelbau' },
  { num: '03', name: 'Böden & Beläge', lead: 'Parkett, Stein, Vinyl', key: 'boden', detailTo: '/boeden-belaege' },
  { num: '04', name: 'Elektroinstallation', lead: 'Strom, Licht, KNX', key: 'elektro', detailTo: '/elektroinstallation' },
  { num: '05', name: 'Heizungsbau', lead: 'Wärmepumpe, FBH', key: 'heizung', detailTo: '/heizmethoden' },
  { num: '06', name: 'Maler & Lackierer', lead: 'Farben, Tapeten', key: 'maler', detailTo: '/maler-lackierer' },
  { num: '07', name: 'Fassadensanierung', lead: 'Putz, WDVS', key: 'fassade', detailTo: '/fassadensanierung' },
  { num: '08', name: 'Trockenbau', lead: 'Wände, Decken', key: 'trockenbau', detailTo: '/trockenbau' },
];

export const FEATURED_HOME_PROJECTS: Array<LightboxItem & { gridClass: string; year: string; alt: string; revealDelay?: number; width: number; height: number }> = [
  {
    src: '/assets/img/projects/bad-soden-einfamilienhaus-01.webp',
    title: 'Einfamilienhaus Bad Soden — Wohnsitz · 2026',
    year: '2026',
    alt: 'Einfamilienhaus Bad Soden, fertig sanierter Wohnbereich',
    gridClass: 'proj--a',
    width: 1448,
    height: 1086,
  },
  {
    src: '/assets/img/projects/zoi-restaurant-01.webp',
    title: 'Zoi — Restaurant · Frankfurt · 2026',
    year: '2026',
    alt: 'Zoi Restaurant Frankfurt',
    gridClass: 'proj--b',
    revealDelay: 1,
    width: 2200,
    height: 1237,
  },
  {
    src: '/assets/img/projects/riad-restaurant-01.webp',
    title: 'Riad — Restaurant · Frankfurt · 2025',
    year: '2025',
    alt: 'Riad Restaurant Frankfurt-Sachsenhausen',
    gridClass: 'proj--c',
    width: 1200,
    height: 1600,
  },
  {
    src: '/assets/img/projects/spa-bad-hotel-01.webp',
    title: 'Spa-Bad — Hotel · Emmenbrücke · 2025',
    year: '2025',
    alt: 'Spa-Bad Hotel',
    gridClass: 'proj--d',
    revealDelay: 1,
    width: 1536,
    height: 1024,
  },
  {
    src: '/assets/img/proj-spa-corridor.webp',
    title: 'Lobby — Office · Frankfurt · 2026',
    year: '2026',
    alt: 'Lobby Office Frankfurt',
    gridClass: 'proj--e',
    revealDelay: 2,
    width: 1500,
    height: 1125,
  },
];

export const FEATURED_HOME_TITLES: Record<string, string> = {
  'proj--a': 'Einfamilienhaus Bad Soden',
  'proj--b': 'Zoi — Restaurant',
  'proj--c': 'Riad — Restaurant',
  'proj--d': 'Spa-Bad — Hotel',
  'proj--e': 'Office Lobby',
};
