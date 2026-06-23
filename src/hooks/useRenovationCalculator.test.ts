import { describe, expect, it } from 'vitest';
import { recalculateRowsForArea } from './useRenovationCalculator';
import type { RenovationProduct } from '../data/calculator/types';

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
  scalable: false,
  quantity: 5,
  canDuplicate: true,
  canRemove: true,
  canReplace: true,
  description: 'Test',
  alternatives: [],
};

describe('recalculateRowsForArea', () => {
  it('preserves manually edited quantities for non-scalable rows', () => {
    const rows = [{ ...baseProduct, quantity: 8, baseQuantity: 5 }];

    expect(recalculateRowsForArea(rows, 120, 1, 100, { 'test-product': true })[0].quantity).toBe(8);
  });

  it('scales untouched non-scalable rows from the package default area', () => {
    const rows = [{ ...baseProduct, quantity: 1, baseQuantity: 1, unit: 'Stk' }];

    expect(recalculateRowsForArea(rows, 2, 1, 1)[0].quantity).toBe(2);
  });

  it('allows automatic scaling to round below each row minimum', () => {
    const rows = [{ ...baseProduct, quantity: 5, baseQuantity: 5, minQuantity: 1, quantityStep: 1 }];

    expect(recalculateRowsForArea(rows, 1, 1, 60)[0].quantity).toBe(0);
  });

  it('recomputes formula-driven scalable rows when the area changes', () => {
    const rows = [{
      ...baseProduct,
      scalable: true,
      formula: 'livingArea * 0.1',
      quantity: 8,
      quantityStep: 1,
    }];

    expect(recalculateRowsForArea(rows, 120, 1, 100)[0].quantity).toBe(12);
  });

  it('allows formula-driven automatic scaling to round below each row minimum', () => {
    const rows = [{
      ...baseProduct,
      scalable: true,
      formula: 'livingArea * (5/60)',
      quantity: 5,
      quantityStep: 1,
    }];

    expect(recalculateRowsForArea(rows, 1, 1, 60)[0].quantity).toBe(0);
  });

  it('sets rows to zero when the project scope is zero', () => {
    const rows = [{ ...baseProduct, quantity: 8, baseQuantity: 5 }];

    expect(recalculateRowsForArea(rows, 0, 1, 100, { 'test-product': true })[0].quantity).toBe(0);
  });
});
