export type PipeModeKey = 'ap' | 'up';

export type PipeMode = {
  key: PipeModeKey;
  label: string;
  detail: string;
  sku: string;
  unit: string;
  netPrice: number;
};

export const PIPE_MODES: PipeMode[] = [
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

export const PIPE_PACKAGE = {
  label: 'Heizstränge bis max. 5 m',
  detail: 'Montage-Leistungspaket für kurze Leitungswege.',
  sku: 'HEIZ-301-MAT',
  unit: 'Stück',
  netPrice: 434.56,
};

export function formatEuro(value: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 2,
  }).format(value);
}
