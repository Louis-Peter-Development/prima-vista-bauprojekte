export const FLOOR_HEATING_BASE = {
  label: 'Bodenheizung Montage-Leistungspaket',
  detail: 'Flächenheizung als Basisposition pro Quadratmeter.',
  sku: 'HEIZ-100-BASIS',
  unit: 'qm',
  netPrice: 89,
};

export const FLOOR_HEATING_EXTRAS = [
  {
    key: 'dryScreed',
    label: 'Estrich Trocken-Platten',
    detail: 'Trockenbauplatten als Aufbauvariante pro Quadratmeter.',
    sku: 'ROHB-501-MAT',
    unit: 'qm',
    netPrice: 48.46,
  },
  {
    key: 'removeScreed',
    label: 'Alt-Estrich Demontage & Entsorgung',
    detail: 'Rückbau und Entsorgung vorhandener Estrichflächen.',
    sku: 'ROHB-501-1-OP',
    unit: 'qm',
    netPrice: 45.89,
  },
] as const;

export const FLOOR_HEATING_ELECTRIC = [
  {
    key: 'surfaceMount',
    label: 'Flächenheizsysteme Montage',
    detail: 'Montage elektrischer Flächenheizsysteme pro Quadratmeter.',
    sku: 'MON-10158',
    unit: 'qm',
    netPrice: 69,
  },
  {
    key: 'warmupFoil',
    label: 'Warmup Aluminiumfolien-Heizsystem',
    detail: 'Für Holz-, Vinyl- und Laminatböden, 80 Watt.',
    sku: 'uv722-00108',
    unit: 'Stk.',
    netPrice: 219.93,
  },
] as const;

export function formatEuro(value: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 2,
  }).format(value);
}
