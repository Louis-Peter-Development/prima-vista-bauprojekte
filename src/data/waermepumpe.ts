export type HeatPumpMaterialKey = 'lg12' | 'accessory';
export type HeatPumpOptionKey = 'oilTank' | 'foundation';

export type HeatPumpItem = {
  key: string;
  label: string;
  detail: string;
  sku: string;
  unit: string;
  netPrice: number;
};

export const HEAT_PUMP_BASE: HeatPumpItem = {
  key: 'mounting',
  label: 'Wärmepumpen Montage-Leistungspaket',
  detail: 'Montagepaket für Luft-Wärmepumpe inklusive Anschlusskoordination und Inbetriebnahme.',
  sku: 'HEIZ-400-BASIS',
  unit: 'Stück',
  netPrice: 4500,
};

export const HEAT_PUMP_MATERIAL: Array<HeatPumpItem & { key: HeatPumpMaterialKey }> = [
  {
    key: 'lg12',
    label: '12 kW LG Wärmepumpe im Paket',
    detail: 'LG Wärmepumpen-Paket TM187/123.',
    sku: 'HEIZ-411.4-MAT',
    unit: 'Stück',
    netPrice: 10542.42,
  },
  {
    key: 'accessory',
    label: 'LG Zubehör-Set',
    detail: 'Zubehör-Set für LG Wärmepumpen.',
    sku: 'HEIZ-411-ZU',
    unit: 'Stück',
    netPrice: 1500,
  },
];

export const HEAT_PUMP_OPTIONS: Array<HeatPumpItem & { key: HeatPumpOptionKey }> = [
  {
    key: 'oilTank',
    label: 'Alt-Öltank Demontage & Entsorgung',
    detail: 'Rückbau und fachgerechte Entsorgung eines vorhandenen Öltanks.',
    sku: 'HEIZ-431.1-ZU',
    unit: 'Stück',
    netPrice: 2900,
  },
  {
    key: 'foundation',
    label: 'Fundament für Therme & Wärmepumpe',
    detail: 'Fundamentposition für Außengerät, Therme oder Wärmepumpe.',
    sku: 'HEIZ-401-BASIS',
    unit: 'Stück',
    netPrice: 2495,
  },
];

export function formatEuro(value: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 2,
  }).format(value);
}
