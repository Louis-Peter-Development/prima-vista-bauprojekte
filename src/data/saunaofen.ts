export type SaunaOptionKey = 'materialRequest' | 'chimney' | 'woodRack';

export type SaunaItem = {
  key: string;
  label: string;
  detail: string;
  sku: string;
  unit: string;
  netPrice: number;
};

export const SAUNA_BASE: SaunaItem = {
  key: 'mounting',
  label: 'Kamin Montage-Leistungspaket',
  detail: 'Montage-Leistungspaket für Kamin- oder Saunaofen im Thermen- und Ofenbereich.',
  sku: 'HEIZ-10005-Basis',
  unit: 'Stk.',
  netPrice: 2490,
};

export const SAUNA_MATERIAL_REQUEST: SaunaItem = {
  key: 'materialRequest',
  label: 'Material auf Anfrage & Bemusterung',
  detail: 'Materialauswahl und Bemusterung werden projektbezogen abgestimmt.',
  sku: 'MAT-Anfrage',
  unit: 'Stk.',
  netPrice: 0,
};

export const SAUNA_CHIMNEY_ITEMS: SaunaItem[] = [
  {
    key: 'kamtecSystem',
    label: 'Wienerberger LAS 1216 LW Kamtec Kaminsystem',
    detail: 'Kaminsystem 1 stgm, HAN.: 34765146.',
    sku: '743-1204',
    unit: 'Stück',
    netPrice: 545.6,
  },
  {
    key: 'flowHead',
    label: 'Wienerberger Kamtec Abströmkopf ASK 120',
    detail: 'Abströmkopf für Kamtec-System, HAN.: 30056461.',
    sku: '743-10076',
    unit: 'Stück',
    netPrice: 190.3,
  },
  {
    key: 'coverPlate',
    label: 'Wienerberger Kamtec Krag- und Abdeckplatte',
    detail: 'KP/AP-U 20 W für Untermauerung einzügig, HAN.: 34765655.',
    sku: '743-10042',
    unit: 'Stück',
    netPrice: 457.6,
  },
  {
    key: 'jointAdhesive',
    label: 'Wienerberger Kamtec ISSr Fugenkleber',
    detail: 'Fugenkleber für Kaminsystem, HAN.: 30054461.',
    sku: '743-10068',
    unit: 'Stück',
    netPrice: 68.75,
  },
];

export const SAUNA_WOOD_RACK: SaunaItem = {
  key: 'woodRack',
  label: 'EcoStar Kaminholzregal Trend',
  detail: 'Optionales Kaminholzregal als Ergänzung zum Ofenbereich.',
  sku: 'uv307-112',
  unit: 'Stk.',
  netPrice: 592.89,
};

export function formatEuro(value: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 2,
  }).format(value);
}
