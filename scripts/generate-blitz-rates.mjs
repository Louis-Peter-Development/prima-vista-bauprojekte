/**
 * Regenerates server/blitzRates.generated.ts — the trusted calculator defaults
 * used for automatic Blitzangebot estimates and their detailed PDFs.
 *
 * The server deliberately never imports from src/ (see server/i18n.ts), so the
 * customer-facing calculator catalogs are reduced to a server-safe manifest at
 * authoring time. The manifest contains only enabled Standard rows and the
 * metadata needed to reproduce the frontend's exact quantity calculation.
 *
 * Run after any calculator package, default selection, formula, or price change:
 *
 *   node scripts/generate-blitz-rates.mjs
 */
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { build } from 'esbuild';

const ROOT = process.cwd();
const OUT_FILE = path.join(ROOT, 'server/blitzRates.generated.ts');

const RENOVATION_DEFAULTS = [
  {
    packageId: '1e',
    group: 'haus',
    serviceLabel: 'Haussanierung',
    aliases: ['Haussanierung', 'Haus-Sanierung'],
    importFile: 'blitz-haus-3',
    exportName: 'packageBlitzHaus3',
    areaMin: 40,
    areaMax: 400,
    bandMin: 0.9,
    bandMax: 1.15,
  },
  {
    packageId: '2zi',
    group: 'wohnung',
    serviceLabel: 'Wohnungssanierung',
    aliases: ['Wohnungssanierung', 'Wohnung-Sanierung'],
    importFile: 'wohnung-2zi',
    exportName: 'packageWohnung2zi',
    areaMin: 20,
    areaMax: 300,
    bandMin: 0.9,
    bandMax: 1.15,
  },
];

const PER_M2_DEFAULTS = [
  {
    packageId: 'restaurant',
    group: 'gastronomie',
    serviceLabel: 'Gastronomieausbau',
    aliases: ['Gastronomieausbau', 'Gastronomie-Ausbau'],
    typeValue: 'restaurant',
    selectedKeys: ['lueftung', 'kueche', 'sanitaer', 'elektro', 'boeden', 'maler'],
    category: 'Gastronomieausbau',
    areaMin: 60,
    areaMax: 350,
    bandMin: 0.85,
    bandMax: 1.2,
  },
  {
    packageId: 'klassisch',
    group: 'buero',
    serviceLabel: 'Büroausbau',
    aliases: ['Büroausbau', 'Büro-Ausbau'],
    typeValue: 'klassisch',
    selectedKeys: ['trockenbau', 'akustik', 'elektro', 'netzwerk', 'licht', 'boeden', 'maler'],
    category: 'Büroausbau',
    areaMin: 50,
    areaMax: 300,
    bandMin: 0.85,
    bandMax: 1.2,
  },
];

const entry = [
  ...RENOVATION_DEFAULTS.map(
    (item) => `import { ${item.exportName} } from './src/data/calculator/packages/${item.importFile}';`,
  ),
  "import { evaluateQuantityFormula } from './src/data/calculator/engine';",
  "import { GASTRONOMIE_GEWERKE, GASTRONOMIE_TYPES } from './src/data/gastronomieAusbau';",
  "import { BUERO_GEWERKE, BUERO_TYPES } from './src/data/bueroAusbau';",
  `export const packages = { ${RENOVATION_DEFAULTS.map((item) => `'${item.packageId}': ${item.exportName}`).join(', ')} };`,
  'export { evaluateQuantityFormula, GASTRONOMIE_GEWERKE, GASTRONOMIE_TYPES, BUERO_GEWERKE, BUERO_TYPES };',
].join('\n');

const bundle = await build({
  stdin: { contents: entry, resolveDir: ROOT, loader: 'ts' },
  bundle: true,
  platform: 'node',
  format: 'esm',
  write: false,
  logLevel: 'error',
});

const tmpDir = await mkdtemp(path.join(tmpdir(), 'blitz-rates-'));
const tmpFile = path.join(tmpDir, 'calculator-defaults.mjs');
await writeFile(tmpFile, bundle.outputFiles[0].text);
const bundled = await import(pathToFileURL(tmpFile).href);
await rm(tmpDir, { recursive: true, force: true });

// Quantity semantics mirrored from src/hooks/useRenovationCalculator.ts. They
// are used here as a generation-time integrity check; the server builder uses
// the same rules at request time for the visitor's exact area.
function decimalPlaces(value) {
  const [, decimals = ''] = String(value).split('.');
  return decimals.length;
}

function roundQuantityToStep(value, step) {
  const safeStep = step > 0 ? step : 1;
  const precision = Math.max(decimalPlaces(safeStep), decimalPlaces(value));
  return Number((Math.round(value / safeStep) * safeStep).toFixed(precision));
}

function automaticQuantity(product, livingArea, floorCount, scaleBase) {
  if (product.scalable && product.formula) {
    const raw = bundled.evaluateQuantityFormula(product.formula, { livingArea, floorCount });
    if (raw === null) return product.baseQuantity;
    return Math.max(0, roundQuantityToStep(raw, product.quantityStep));
  }
  const scaled = product.baseQuantity * (livingArea / scaleBase);
  return Math.max(0, roundQuantityToStep(scaled, product.quantityStep));
}

function renovationDefault(definition) {
  const pkg = bundled.packages[definition.packageId];
  if (!pkg) throw new Error(`calculator package ${definition.packageId} not found`);

  const rows = pkg.categories.flatMap((category) => category.subsections.flatMap((subsection) => (
    subsection.products
      .filter((product) => product.enabled)
      .map((product) => ({
        id: product.id,
        categoryKey: category.id,
        categoryLabel: category.title,
        subsectionKey: subsection.id,
        subsectionLabel: subsection.title,
        title: product.title,
        sku: product.sku,
        type: product.type,
        unit: product.unit,
        basePrice: product.basePrice,
        baseQuantity: product.baseQuantity,
        quantityStep: product.quantityStep,
        scalable: product.scalable,
        ...(product.formula ? { formula: product.formula } : {}),
        ...(product.description ? { description: product.description } : {}),
        ...(product.image ? { image: product.image } : {}),
      }))
  )));

  const defaultNet = rows.reduce((sum, row) => (
    sum + (automaticQuantity(row, pkg.defaultArea, pkg.defaultFloorCount, pkg.defaultArea) * row.basePrice)
  ), 0);
  if (!Number.isFinite(defaultNet) || defaultNet <= 0 || rows.length === 0) {
    throw new Error(`calculator package ${definition.packageId} produced an invalid default`);
  }

  return {
    mode: 'renovation',
    packageId: definition.packageId,
    group: definition.group,
    serviceLabel: definition.serviceLabel,
    aliases: definition.aliases,
    kindLabel: pkg.title,
    scopeLabel: 'Wohnfläche in qm',
    defaultArea: pkg.defaultArea,
    defaultFloorCount: pkg.defaultFloorCount,
    areaMin: definition.areaMin,
    areaMax: definition.areaMax,
    bandMin: definition.bandMin,
    bandMax: definition.bandMax,
    rows,
  };
}

function perM2Default(definition) {
  const isGastronomie = definition.group === 'gastronomie';
  const types = isGastronomie ? bundled.GASTRONOMIE_TYPES : bundled.BUERO_TYPES;
  const trades = isGastronomie ? bundled.GASTRONOMIE_GEWERKE : bundled.BUERO_GEWERKE;
  const type = types.find((item) => item.value === definition.typeValue);
  if (!type) throw new Error(`calculator type ${definition.typeValue} not found`);

  const rows = definition.selectedKeys.map((key) => {
    const trade = trades.find((item) => item.key === key);
    if (!trade) throw new Error(`calculator trade ${key} not found for ${definition.packageId}`);
    return {
      key: trade.key,
      label: trade.label,
      description: trade.lede,
      pricePerM2: trade.pricePerM2,
      category: definition.category,
      type: 'Gewerk',
    };
  });

  return {
    mode: 'perM2',
    packageId: definition.packageId,
    group: definition.group,
    serviceLabel: definition.serviceLabel,
    aliases: definition.aliases,
    kindLabel: type.label,
    scopeLabel: 'Fläche',
    factor: type.factor,
    areaMin: definition.areaMin,
    areaMax: definition.areaMax,
    bandMin: definition.bandMin,
    bandMax: definition.bandMax,
    rows,
  };
}

const defaults = [
  ...RENOVATION_DEFAULTS.map(renovationDefault),
  ...PER_M2_DEFAULTS.map(perM2Default),
];

const today = new Date().toISOString().slice(0, 10);
const lines = [
  '// AUTO-GENERATED by scripts/generate-blitz-rates.mjs — DO NOT EDIT BY HAND.',
  '// Trusted Standard/default calculator configurations used by the server to',
  '// calculate direct Blitzangebot package requests and build their PDF rows.',
  '// Regenerate after calculator package/price/default changes:',
  '//   node scripts/generate-blitz-rates.mjs',
  '',
  `export const BLITZ_DEFAULTS_GENERATED_AT = '${today}';`,
  '',
  "export type BlitzDefaultGroup = 'haus' | 'wohnung' | 'gastronomie' | 'buero';",
  '',
  'export type BlitzDefaultRenovationRow = {',
  '  id: string;',
  '  categoryKey: string;',
  '  categoryLabel: string;',
  '  subsectionKey: string;',
  '  subsectionLabel: string;',
  '  title: string;',
  '  sku: string;',
  "  type: 'service' | 'material' | 'extra' | 'optional';",
  '  unit: string;',
  '  basePrice: number;',
  '  baseQuantity: number;',
  '  quantityStep: number;',
  '  scalable: boolean;',
  '  formula?: string;',
  '  description?: string;',
  '  image?: string;',
  '};',
  '',
  'export type BlitzDefaultRenovationPackage = {',
  "  mode: 'renovation';",
  '  packageId: string;',
  '  group: BlitzDefaultGroup;',
  '  serviceLabel: string;',
  '  aliases: readonly string[];',
  '  kindLabel: string;',
  '  scopeLabel: string;',
  '  defaultArea: number;',
  '  defaultFloorCount: number;',
  '  areaMin: number;',
  '  areaMax: number;',
  '  bandMin: number;',
  '  bandMax: number;',
  '  rows: readonly BlitzDefaultRenovationRow[];',
  '};',
  '',
  'export type BlitzDefaultPerM2Row = {',
  '  key: string;',
  '  label: string;',
  '  description: string;',
  '  pricePerM2: number;',
  '  category: string;',
  '  type: string;',
  '};',
  '',
  'export type BlitzDefaultPerM2Package = {',
  "  mode: 'perM2';",
  '  packageId: string;',
  '  group: BlitzDefaultGroup;',
  '  serviceLabel: string;',
  '  aliases: readonly string[];',
  '  kindLabel: string;',
  '  scopeLabel: string;',
  '  factor: number;',
  '  areaMin: number;',
  '  areaMax: number;',
  '  bandMin: number;',
  '  bandMax: number;',
  '  rows: readonly BlitzDefaultPerM2Row[];',
  '};',
  '',
  'export type BlitzDefaultPackage = BlitzDefaultRenovationPackage | BlitzDefaultPerM2Package;',
  '',
  `export const BLITZ_DEFAULT_PACKAGES: readonly BlitzDefaultPackage[] = ${JSON.stringify(defaults, null, 2)};`,
  '',
];

await writeFile(OUT_FILE, lines.join('\n'));
console.log(`Wrote ${OUT_FILE}: ${defaults.length} trusted defaults (${defaults.map((item) => `${item.serviceLabel}: ${item.rows.length} rows`).join(', ')}).`);
