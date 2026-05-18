export type RadiatorModelKey = 'plan' | 'bad' | 'elektro';

export type RadiatorModel = {
  key: RadiatorModelKey;
  label: string;
  detail: string;
  sku: string;
  unit: string;
  netPrice: number;
};

export type PipeOptionKey = 'package' | 'ap' | 'up';

export type PipeOption = {
  key: PipeOptionKey;
  label: string;
  detail: string;
  sku: string;
  unit: string;
  netPrice: number;
};

export const MOUNTING_ITEM = {
  label: 'Heizkörper Montage',
  detail: 'Austausch, Anschluss und Inbetriebnahme pro Heizkörper.',
  sku: 'HEIZ-101-MON',
  unit: 'Stk',
  netPrice: 149,
};

export const RADIATOR_MODELS: RadiatorModel[] = [
  {
    key: 'plan',
    label: 'Plan-Flachheizkörper',
    detail: 'Cosmo T6 Typ 33, 300 x 800 cm, W 1012.',
    sku: 'PT6333080',
    unit: 'Stück',
    netPrice: 749,
  },
  {
    key: 'bad',
    label: 'Badheizkörper',
    detail: 'Ximax Bianca, weiß.',
    sku: 'uv835-10017',
    unit: 'Stück',
    netPrice: 388.95,
  },
  {
    key: 'elektro',
    label: 'Elektro-Raumheizkörper',
    detail: 'Ximax Fortuna Horizontal, weiß.',
    sku: 'uv835-1083',
    unit: 'Stück',
    netPrice: 471.41,
  },
];

export const PIPE_OPTIONS: PipeOption[] = [
  {
    key: 'package',
    label: 'Heizstränge bis 5 m',
    detail: 'Montage-Leistungspaket für kurze Leitungswege.',
    sku: 'HEIZ-301-MAT',
    unit: 'Stück',
    netPrice: 434.56,
  },
  {
    key: 'ap',
    label: 'AP-Heizstränge',
    detail: 'Neuinstallation Aufputz pro laufendem Meter.',
    sku: 'HEIZ-301.3-MAT',
    unit: 'lfm.',
    netPrice: 88.06,
  },
  {
    key: 'up',
    label: 'UP-Heizstränge',
    detail: 'Neuinstallation Unterputz pro laufendem Meter.',
    sku: 'HEIZ-301.2-MAT',
    unit: 'lfm.',
    netPrice: 118.75,
  },
];

export function formatEuro(value: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 2,
  }).format(value);
}
