/**
 * Builds trusted calculator handoffs for direct Blitzangebot package requests.
 *
 * The catalog manifest is generated from the live frontend defaults, while the
 * quantity calculation below mirrors useRenovationCalculator. This keeps the
 * email/PDF independent of client-supplied totals and exact at off-grid areas.
 */

import {
  BLITZ_DEFAULT_PACKAGES,
  type BlitzDefaultPackage,
  type BlitzDefaultRenovationPackage,
  type BlitzDefaultRenovationRow,
} from './blitzRates.generated.js';
import type { KalkulatorHandoff, KalkulatorPick, KalkulatorRow } from './mail.js';

type CalculatorContext = {
  livingArea: number;
  floorCount: number;
};

type FormulaToken =
  | { type: 'number'; value: number }
  | { type: 'identifier'; value: keyof CalculatorContext }
  | { type: 'operator'; value: '+' | '-' | '*' | '/' }
  | { type: 'paren'; value: '(' | ')' };

const SKU_PREFIX_TO_TRADE: Record<string, string> = {
  ROHB: 'Abbruch & Rohbau',
  TROC: 'Trockenbau',
  ELEK: 'Elektroinstallation',
  WASS: 'Wasserinstallation & Sanitär',
  BADE: 'Badezimmer',
  GAWC: 'Gäste-WC',
  BODE: 'Bodenbeläge',
  HEIZ: 'Heizung',
  KUEC: 'Küche',
  MALE: 'Maler & Lackierer',
  FENS: 'Fenster',
  TUER: 'Türen & Zargen',
  ABBD: 'Abdichtung',
  DACH: 'Dach',
  FASS: 'Fassade',
  ENTS: 'Entsorgung',
  MON: 'Montage & Sonstiges',
  LHT: 'Licht',
  CARP: 'Schreinerei',
  GARA: 'Garage',
  GART: 'Garten & Außenanlagen',
  TREP: 'Treppen',
  TR: 'Treppen',
  ZAUN: 'Zaun',
  PV: 'Photovoltaik',
};

const DEFAULT_BY_ALIAS = new Map<string, BlitzDefaultPackage>();
for (const definition of BLITZ_DEFAULT_PACKAGES) {
  for (const alias of definition.aliases) DEFAULT_BY_ALIAS.set(alias, definition);
}

export type BlitzDefaultCalculation = {
  handoff: KalkulatorHandoff;
  packageId: string;
  serviceLabel: string;
  areaMin: number;
  areaMax: number;
  bandMin: number;
  bandMax: number;
};

function tokenizeFormula(formula: string): FormulaToken[] | null {
  const tokens: FormulaToken[] = [];
  let index = 0;

  while (index < formula.length) {
    const char = formula[index];
    if (/\s/.test(char)) {
      index += 1;
      continue;
    }

    const rest = formula.slice(index);
    const numberMatch = /^\d+(?:\.\d+)?/.exec(rest);
    if (numberMatch) {
      tokens.push({ type: 'number', value: Number(numberMatch[0]) });
      index += numberMatch[0].length;
      continue;
    }
    if (rest.startsWith('livingArea')) {
      tokens.push({ type: 'identifier', value: 'livingArea' });
      index += 'livingArea'.length;
      continue;
    }
    if (rest.startsWith('floorCount')) {
      tokens.push({ type: 'identifier', value: 'floorCount' });
      index += 'floorCount'.length;
      continue;
    }
    if (char === '+' || char === '-' || char === '*' || char === '/') {
      tokens.push({ type: 'operator', value: char });
      index += 1;
      continue;
    }
    if (char === '(' || char === ')') {
      tokens.push({ type: 'paren', value: char });
      index += 1;
      continue;
    }
    return null;
  }
  return tokens;
}

/** Safe arithmetic evaluator matching src/data/calculator/engine.ts. */
function evaluateQuantityFormula(formula: string, context: CalculatorContext): number | null {
  const tokens = tokenizeFormula(formula);
  if (!tokens) return null;
  let index = 0;
  const peek = () => tokens[index];
  const consume = () => tokens[index++];

  const parseFactor = (): number | null => {
    const token = consume();
    if (!token) return null;
    if (token.type === 'operator' && (token.value === '+' || token.value === '-')) {
      const value = parseFactor();
      if (value === null) return null;
      return token.value === '-' ? -value : value;
    }
    if (token.type === 'number') return token.value;
    if (token.type === 'identifier') return context[token.value];
    if (token.type === 'paren' && token.value === '(') {
      const value = parseExpression();
      const closing = consume();
      if (!closing || closing.type !== 'paren' || closing.value !== ')') return null;
      return value;
    }
    return null;
  };

  const parseTerm = (): number | null => {
    let value = parseFactor();
    if (value === null) return null;
    while (peek()?.type === 'operator' && (peek().value === '*' || peek().value === '/')) {
      const operator = consume() as Extract<FormulaToken, { type: 'operator' }>;
      const right = parseFactor();
      if (right === null) return null;
      value = operator.value === '*' ? value * right : value / right;
    }
    return value;
  };

  function parseExpression(): number | null {
    let value = parseTerm();
    if (value === null) return null;
    while (peek()?.type === 'operator' && (peek().value === '+' || peek().value === '-')) {
      const operator = consume() as Extract<FormulaToken, { type: 'operator' }>;
      const right = parseTerm();
      if (right === null) return null;
      value = operator.value === '+' ? value + right : value - right;
    }
    return value;
  }

  const result = parseExpression();
  if (result === null || index !== tokens.length || !Number.isFinite(result)) return null;
  return result;
}

function decimalPlaces(value: number): number {
  const [, decimals = ''] = String(value).split('.');
  return decimals.length;
}

function roundQuantityToStep(value: number, step: number): number {
  const safeStep = step > 0 ? step : 1;
  const precision = Math.max(decimalPlaces(safeStep), decimalPlaces(value));
  return Number((Math.round(value / safeStep) * safeStep).toFixed(precision));
}

function automaticQuantity(
  row: BlitzDefaultRenovationRow,
  livingArea: number,
  floorCount: number,
  scaleBase: number,
): number {
  if (row.scalable && row.formula) {
    const raw = evaluateQuantityFormula(row.formula, { livingArea, floorCount });
    if (raw === null) return row.baseQuantity;
    return Math.max(0, roundQuantityToStep(raw, row.quantityStep));
  }
  const scaled = row.baseQuantity * (livingArea / scaleBase);
  return Math.max(0, roundQuantityToStep(scaled, row.quantityStep));
}

function cleanProductTitle(title: string): string {
  return title.replace(/\s*\|\s*\*?\*?(Varianten|VARIANTEN)\*?\*?\s*/gi, '').trim();
}

function typeLabel(type: BlitzDefaultRenovationRow['type']): string {
  if (type === 'material') return 'Material';
  if (type === 'extra') return 'Extra';
  if (type === 'optional') return 'Optional';
  return 'Montage';
}

function inferTrade(sku: string | undefined): { key: string; label: string } | null {
  const prefix = sku?.split('-')[0]?.toUpperCase();
  if (!prefix) return null;
  const label = SKU_PREFIX_TO_TRADE[prefix];
  return label ? { key: prefix.toLowerCase(), label } : null;
}

function renovationPicks(definition: BlitzDefaultRenovationPackage, area: number): KalkulatorPick[] {
  const categories = new Map<string, { label: string; rows: KalkulatorRow[] }>();
  const scaleBase = definition.defaultArea > 0 ? definition.defaultArea : 1;

  for (const row of definition.rows) {
    let category = categories.get(row.categoryKey);
    if (!category) {
      category = { label: row.categoryLabel, rows: [] };
      categories.set(row.categoryKey, category);
    }
    const quantity = automaticQuantity(row, area, definition.defaultFloorCount, scaleBase);
    category.rows.push({
      label: cleanProductTitle(row.title),
      quantity,
      unit: row.unit,
      unitPrice: row.basePrice,
      subtotal: quantity * row.basePrice,
      sku: row.sku,
      description: row.description,
      image: row.image,
      category: row.categoryLabel,
      subcategory: row.subsectionLabel,
      type: typeLabel(row.type),
    });
  }

  return Array.from(categories, ([key, category]) => {
    const subtotal = category.rows.reduce((sum, row) => sum + row.subtotal, 0);
    const trade = inferTrade(category.rows[0]?.sku);
    return {
      key,
      label: category.label,
      subtotal,
      tradeKey: trade?.key,
      tradeLabel: trade?.label,
      rows: category.rows,
    };
  }).filter((pick) => pick.subtotal > 0);
}

/** Build the exact Standard/default calculator result for one direct package. */
export function buildDefaultCalculatorCalculation(
  packageLabel: string,
  area: number,
): BlitzDefaultCalculation | null {
  const definition = DEFAULT_BY_ALIAS.get(packageLabel);
  if (!definition || !Number.isFinite(area) || area <= 0) return null;

  const picks: KalkulatorPick[] = definition.mode === 'renovation'
    ? renovationPicks(definition, area)
    : definition.rows.map((row) => ({
        key: row.key,
        label: row.label,
        subtotal: row.pricePerM2 * definition.factor * area,
        description: row.description,
        category: row.category,
        type: row.type,
      }));

  const totalMid = picks.reduce((sum, pick) => sum + pick.subtotal, 0);
  const handoff: KalkulatorHandoff = {
    kind: 'pakete',
    kindLabel: definition.kindLabel,
    scopeLabel: definition.scopeLabel,
    area,
    picks,
    totalMin: totalMid * definition.bandMin,
    totalMid,
    totalMax: totalMid * definition.bandMax,
    perM2: area > 0 ? totalMid / area : 0,
  };

  return {
    handoff,
    packageId: definition.packageId,
    serviceLabel: definition.serviceLabel,
    areaMin: definition.areaMin,
    areaMax: definition.areaMax,
    bandMin: definition.bandMin,
    bandMax: definition.bandMax,
  };
}

export function isDefaultCalculatorPackageLabel(label: string): boolean {
  return DEFAULT_BY_ALIAS.has(label);
}
