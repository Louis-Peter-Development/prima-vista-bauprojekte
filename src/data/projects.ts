export type ProjectSize = 'lg' | 'md' | 'sm' | 'tall' | 'wide' | 'sq';
export type ProjectTag = 'wohnsitz' | 'gastro' | 'bad' | 'kueche' | 'commercial';

export type Project = {
  num: string;
  title: string;
  ttl: string;
  meta: string;
  src: string;
  size: ProjectSize;
  tags: ProjectTag[];
  revealDelay?: number;
};

export const PROJECTS: Project[] = [
  { num: '№ 142', title: 'Riad — Restaurant · Frankfurt · 2025', ttl: 'Riad Restaurant', meta: 'Gastronomie · Frankfurt · 2025', src: '/assets/img/proj-moroccan-dining-wide.jpg', size: 'lg', tags: ['gastro'] },
  { num: '№ 138', title: 'Villa Sichtbeton · Luzern · 2024', ttl: 'Villa Sichtbeton', meta: 'Wohnsitz · Luzern · 2024', src: '/assets/img/proj-concrete-sofa-tall.jpg', size: 'md', tags: ['wohnsitz'], revealDelay: 1 },
  { num: '№ 140', title: 'Küche Eichenholz · Frankfurt · 2025', ttl: 'Küche Eiche', meta: 'Wohnsitz · Frankfurt · 2025', src: '/assets/img/proj-kitchen-oak.jpg', size: 'sm', tags: ['wohnsitz', 'kueche'] },
  { num: '№ 141', title: 'Spa-Bad — Hotel · Emmenbrücke · 2025', ttl: 'Spa-Bad', meta: 'Hotel · Emmenbrücke · 2025', src: '/assets/img/proj-spa-bath.jpg', size: 'sm', tags: ['commercial', 'bad'], revealDelay: 1 },
  { num: '№ 145', title: 'Office Lobby · Frankfurt · 2026', ttl: 'Office Lobby', meta: 'Commercial · Frankfurt · 2026', src: '/assets/img/proj-lobby-tree-wide.jpg', size: 'sm', tags: ['commercial'], revealDelay: 2 },
  { num: '№ 139', title: 'Sushi Counter · Wiesbaden · 2025', ttl: 'Sushi Counter', meta: 'Gastronomie · Wiesbaden · 2025', src: '/assets/img/proj-sushi-wide.jpg', size: 'wide', tags: ['gastro'] },
  { num: '№ 136', title: 'Sichtbeton-Treppenhaus · Luzern · 2024', ttl: 'Treppenhaus', meta: 'Commercial · Luzern · 2024', src: '/assets/img/proj-stairs-concrete.jpg', size: 'tall', tags: ['commercial'], revealDelay: 1 },
  { num: '№ 143', title: 'Doppelbad · Frankfurt · 2025', ttl: 'Doppelbad', meta: 'Wohnsitz · Frankfurt · 2025', src: '/assets/img/proj-bath-double.jpg', size: 'sm', tags: ['wohnsitz', 'bad'] },
  { num: '№ 137', title: 'Naturstein-Bad · Sachsenhausen · 2024', ttl: 'Naturstein-Bad', meta: 'Wohnsitz · Sachsenhausen · 2024', src: '/assets/img/proj-bath-stone.jpg', size: 'sm', tags: ['wohnsitz', 'bad'], revealDelay: 1 },
  { num: '№ 142b', title: 'Riad — Bar-Ecke · Frankfurt · 2025', ttl: 'Riad Bar-Ecke', meta: 'Gastronomie · Frankfurt · 2025', src: '/assets/img/proj-moroccan-corner.jpg', size: 'md', tags: ['gastro'] },
  { num: '№ 138b', title: 'Concrete Corner · Luzern · 2024', ttl: 'Concrete Corner', meta: 'Wohnsitz · Luzern · 2024', src: '/assets/img/proj-concrete-corner.jpg', size: 'lg', tags: ['wohnsitz'], revealDelay: 1 },
  { num: '№ 146', title: 'Wine Bar · Frankfurt · 2026', ttl: 'Wine Bar', meta: 'Gastronomie · Frankfurt · 2026', src: '/assets/img/proj-wine-restaurant.jpg', size: 'sm', tags: ['gastro'] },
  { num: '№ 141b', title: 'Spa-Korridor · Emmenbrücke · 2025', ttl: 'Spa Korridor', meta: 'Hotel · Emmenbrücke · 2025', src: '/assets/img/proj-spa-corridor.jpg', size: 'sm', tags: ['commercial'], revealDelay: 1 },
  { num: '№ 144', title: 'Eiche Parkett · Wiesbaden · 2025', ttl: 'Eiche Parkett', meta: 'Wohnsitz · Wiesbaden · 2025', src: '/assets/img/photo-parkett-altbau.jpg', size: 'sm', tags: ['wohnsitz'], revealDelay: 2 },
  { num: '№ 145b', title: 'Lobby Garden · Frankfurt · 2026', ttl: 'Lobby Garden', meta: 'Commercial · Frankfurt · 2026', src: '/assets/img/proj-lobby-tree.jpg', size: 'wide', tags: ['commercial'] },
  { num: '№ 142c', title: 'Riad — Lampen · Frankfurt · 2025', ttl: 'Riad Lampen', meta: 'Gastronomie · Frankfurt · 2025', src: '/assets/img/proj-moroccan-lamps.jpg', size: 'tall', tags: ['gastro'], revealDelay: 1 },
];

export const PROJECT_FILTERS: Array<{ key: 'all' | ProjectTag; label: string }> = [
  { key: 'all', label: 'Alle' },
  { key: 'wohnsitz', label: 'Wohnsitz' },
  { key: 'gastro', label: 'Gastronomie' },
  { key: 'bad', label: 'Bäder' },
  { key: 'kueche', label: 'Küchen' },
  { key: 'commercial', label: 'Commercial' },
];
