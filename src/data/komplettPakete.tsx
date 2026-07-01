// Layout / render metadata only. All display text lives in the i18n `pages`
// namespace under `pakete.packages.<key>` and `pakete.compare.rows.<key>`.

export type PackageKey = 'haus' | 'wohnung' | 'gastro' | 'buero';

export type Package = {
  key: PackageKey;
  num: string;
  variant?: 'paper' | 'ink';
  reverse?: boolean;
  photo: string;
  ctaDark?: boolean;
  detailTo?: string;
};

export const PACKAGES: Package[] = [
  {
    key: 'haus',
    num: '01',
    photo: '/assets/img/photo-haus-exterior.webp',
    detailTo: '/haus-sanierung',
  },
  {
    key: 'wohnung',
    num: '02',
    variant: 'paper',
    reverse: true,
    photo: '/assets/img/projects/eiche-parkett-01.webp',
    detailTo: '/wohnung-sanierung',
  },
  {
    key: 'gastro',
    num: '03',
    variant: 'ink',
    photo: '/assets/img/proj-restaurant-dining.webp',
    detailTo: '/gastronomie-ausbau',
    ctaDark: true,
  },
  {
    key: 'buero',
    num: '04',
    variant: 'paper',
    reverse: true,
    photo: '/assets/img/photo-office-modern.webp',
    detailTo: '/buero-ausbau',
  },
];

/** How each comparison cell renders: a tick, a dash, a numeric value, or
 *  short translated text shown in the "no/partial" style. */
export type CompareCell = 'check' | 'no' | 'num' | 'noText';

export const COMPARE_ROWS: Array<{
  key: string;
  cells: Record<PackageKey, CompareCell>;
}> = [
  { key: 'buildTime', cells: { haus: 'num', wohnung: 'num', gastro: 'num', buero: 'num' } },
  { key: 'investment', cells: { haus: 'num', wohnung: 'num', gastro: 'num', buero: 'num' } },
  { key: 'selfOccupant', cells: { haus: 'check', wohnung: 'check', gastro: 'no', buero: 'no' } },
  { key: 'duringOccupancy', cells: { haus: 'noText', wohnung: 'check', gastro: 'no', buero: 'noText' } },
  { key: 'authorities', cells: { haus: 'check', wohnung: 'check', gastro: 'check', buero: 'check' } },
  { key: 'fixedPrice', cells: { haus: 'check', wohnung: 'check', gastro: 'check', buero: 'check' } },
  { key: 'warranty', cells: { haus: 'check', wohnung: 'check', gastro: 'check', buero: 'check' } },
];
