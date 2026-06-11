import { describe, expect, it } from 'vitest';
import { computeQuantity, evaluateQuantityFormula } from './engine';
import type { RenovationProduct } from './types';

const baseProduct: RenovationProduct = {
  id: 'test-product',
  category: 'test',
  subcategory: 'test',
  title: 'Test Product',
  sku: 'TEST-1',
  type: 'service',
  unit: 'qm',
  basePrice: 10,
  enabled: true,
  optional: false,
  minQuantity: 1,
  quantityStep: 1,
  baseQuantity: 5,
  scalable: true,
  formula: 'livingArea',
  quantity: 5,
  canDuplicate: true,
  canRemove: true,
  canReplace: true,
  description: 'Test',
  alternatives: [],
};

describe('evaluateQuantityFormula', () => {
  it('evaluates arithmetic expressions with calculator variables', () => {
    expect(evaluateQuantityFormula('livingArea * (5/60)', { livingArea: 120, floorCount: 2 })).toBe(10);
    expect(evaluateQuantityFormula('floorCount + 2 * 3', { livingArea: 120, floorCount: 2 })).toBe(8);
    expect(evaluateQuantityFormula('-livingArea / 2 + 80', { livingArea: 20, floorCount: 1 })).toBe(70);
  });

  it('rejects unsupported expressions instead of executing code', () => {
    expect(evaluateQuantityFormula('globalThis.process.exit()', { livingArea: 120, floorCount: 2 })).toBeNull();
    expect(evaluateQuantityFormula('livingArea ** 2', { livingArea: 120, floorCount: 2 })).toBeNull();
    expect(evaluateQuantityFormula('livingArea + ', { livingArea: 120, floorCount: 2 })).toBeNull();
  });
});

describe('computeQuantity', () => {
  it('applies step rounding and minimum clamping', () => {
    const product = {
      ...baseProduct,
      formula: 'livingArea * 0.23',
      minQuantity: 4,
      quantityStep: 2,
    };

    expect(computeQuantity(product, { livingArea: 20, floorCount: 1 })).toBe(4);
    expect(computeQuantity(product, { livingArea: 40, floorCount: 1 })).toBe(10);
  });

  it('falls back to base quantity for invalid formulas', () => {
    expect(
      computeQuantity({ ...baseProduct, formula: 'livingArea.constructor.constructor("return 1")()' }, {
        livingArea: 100,
        floorCount: 1,
      }),
    ).toBe(baseProduct.baseQuantity);
  });
});
