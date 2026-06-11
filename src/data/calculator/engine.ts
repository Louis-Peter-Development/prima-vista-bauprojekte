import type {
  RenovationProduct,
  RenovationProductAlternative,
  RenovationLineType,
  CalculatorContext
} from './types';

export const RENOVATION_VAT_RATE = 0.19;

function roundMoney(value: number): number {
  return Math.round(value * 100) / 100;
}

export function makeAlternatives(type: RenovationLineType, title: string, sku: string, unit: string, basePrice: number, description?: string, image?: string): RenovationProductAlternative[] {
  const suffix = type === 'material' ? ['Basis', 'Robust', 'Premium'] : ['Standard', 'Komfort', 'Premium'];
  const multipliers = basePrice === 0 ? [1, 1, 1] : [1, 1.14, 1.28];

  return suffix.map((label, index) => {
    const altTitle = index === 0 ? title : `${title} - ${label}`;
    const altSku = index === 0 ? sku : `${sku}-${label.slice(0, 1).toUpperCase()}`;

    return {
      id: `${sku}-${label.toLowerCase()}`,
      title: altTitle,
      sku: altSku,
      unit,
      basePrice: roundMoney(basePrice * multipliers[index]),
      description,
      image,
    };
  });
}

export type ProductSeed = {
  id: string;
  title: string;
  sku: string;
  type: RenovationLineType;
  unit: string;
  basePrice: number;
  baseQuantity: number;
  enabled?: boolean;
  optional?: boolean;
  minQuantity?: number;
  quantityStep?: number;
  scalable?: boolean;
  formula?: string;
  description?: string;
};

export function createProduct(category: string, subcategory: string, seed: ProductSeed): RenovationProduct {
  const optional = seed.optional ?? false;
  return {
    id: seed.id,
    category,
    subcategory,
    title: seed.title,
    sku: seed.sku,
    type: seed.type,
    unit: seed.unit,
    basePrice: seed.basePrice,
    baseQuantity: seed.baseQuantity,
    quantity: seed.baseQuantity,
    enabled: seed.enabled ?? !optional,
    optional,
    scalable: seed.scalable ?? false,
    formula: seed.formula,
    minQuantity: seed.minQuantity ?? 1,
    quantityStep: seed.quantityStep ?? 1,
    canDuplicate: true,
    canRemove: true,
    canReplace: true,
    description: seed.description ?? 'Kalkulationsposition fuer Montage, Material oder Zusatzleistung.',
    alternatives: makeAlternatives(seed.type, seed.title, seed.sku, seed.unit, seed.basePrice, seed.description),
  };
}

export function clampQuantity(value: number, min: number): number {
  if (!Number.isFinite(value)) return min;
  return Math.max(min, value);
}

type FormulaToken =
  | { type: 'number'; value: number }
  | { type: 'identifier'; value: keyof CalculatorContext }
  | { type: 'operator'; value: '+' | '-' | '*' | '/' }
  | { type: 'paren'; value: '(' | ')' };

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

export function evaluateQuantityFormula(formula: string, context: CalculatorContext): number | null {
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

export function computeQuantity(product: RenovationProduct, context: CalculatorContext): number {
  if (!product.scalable || !product.formula) return product.baseQuantity;

  const raw = evaluateQuantityFormula(product.formula, context);
  if (raw === null) return product.baseQuantity;
  const stepped = Math.round(raw / product.quantityStep) * product.quantityStep;
  return clampQuantity(stepped, product.minQuantity);
}

export function formatEuro(value: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(value);
}
