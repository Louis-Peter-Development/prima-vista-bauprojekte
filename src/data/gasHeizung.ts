export type GasHeatingOptionKey = 'foundation' | 'oilTank';

export type GasHeatingItem = {
  key: string;
  label: string;
  detail: string;
  sku: string;
  unit: string;
  netPrice: number;
};

export const GAS_HEATING_PACKAGE: GasHeatingItem[] = [
  {
    key: 'boiler',
    label: 'Gas-Brennwert-Kessel 20 kW',
    detail: 'Brennwert-Kessel für ein Haus als zentrale Gas-Heizung.',
    sku: 'HEIZ-401.3-MAT',
    unit: 'Stück',
    netPrice: 10588.99,
  },
  {
    key: 'combi',
    label: 'Gas-Kombitherme 20-24 kW',
    detail: 'Kombitherme für eine Wohnung mit Heizung und Warmwasserbereitung.',
    sku: 'HEIZ-403.13-MAT',
    unit: 'Stück',
    netPrice: 3955.9,
  },
];

export const GAS_HEATING_OPTIONS: Array<GasHeatingItem & { key: GasHeatingOptionKey }> = [
  {
    key: 'foundation',
    label: 'Fundament für Therme & Wärmepumpe',
    detail: 'Fundamentposition für Außengerät, Therme oder Wärmepumpe.',
    sku: 'HEIZ-401-BASIS',
    unit: 'Stück',
    netPrice: 2495,
  },
  {
    key: 'oilTank',
    label: 'Alt-Öltank Demontage & Entsorgung',
    detail: 'Rückbau und fachgerechte Entsorgung eines vorhandenen Öltanks.',
    sku: 'HEIZ-431.1-ZU',
    unit: 'Stück',
    netPrice: 2900,
  },
];

export function formatEuro(value: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 2,
  }).format(value);
}
