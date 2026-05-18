export type PelletOptionKey = 'chimney' | 'oilTank' | 'pelletGrill';

export type PelletItem = {
  key: string;
  label: string;
  detail: string;
  sku: string;
  unit: string;
  netPrice: number;
};

export const PELLET_PACKAGE: PelletItem[] = [
  {
    key: 'mounting',
    label: 'Pelletheizung Montage-Leistungspaket',
    detail: 'Montagepaket für Pelletheizung und Pelletofen-Anbindung.',
    sku: 'HEIZ-10014-Basis',
    unit: 'Paket',
    netPrice: 2000,
  },
  {
    key: 'vitoligno',
    label: 'Vitoligno 300 - 12 kW',
    detail: 'Pelletheizung Vitoligno 300 als 12-kW-Materialpaket.',
    sku: 'HEIZ-405-MAT',
    unit: 'Stück',
    netPrice: 9900,
  },
];

export const PELLET_CHIMNEY_ITEMS: PelletItem[] = [
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

export const PELLET_OPTIONS: Array<PelletItem & { key: Exclude<PelletOptionKey, 'chimney'> }> = [
  {
    key: 'oilTank',
    label: 'Alt-Öltank Demontage & Entsorgung',
    detail: 'Rückbau und fachgerechte Entsorgung eines vorhandenen Öltanks.',
    sku: 'HEIZ-431.1-ZU',
    unit: 'Stück',
    netPrice: 2900,
  },
  {
    key: 'pelletGrill',
    label: 'Weber Holzpelletgrill SmokeFire EX4 GBS',
    detail: 'Holzpelletgrill 61 x 45 cm in Schwarz.',
    sku: '725-76',
    unit: 'Stück',
    netPrice: 1406.9,
  },
];

export function formatEuro(value: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 2,
  }).format(value);
}
