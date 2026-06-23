import { useEffect, useMemo, useReducer } from 'react';
import {
  DEFAULT_PACKAGE_ID,
  getCachedRenovationPackage,
  loadRenovationPackage,
} from '../data/calculator/packages';
import { clampQuantity, evaluateQuantityFormula } from '../data/calculator/engine';
import type {
  RenovationCategory,
  RenovationPackage,
  RenovationProduct,
  RenovationProductAlternative,
  RenovationSubsection,
} from '../data/calculator/types';

export type RowsByCategory = Array<
  Omit<RenovationCategory, 'subsections'> & {
    subsections: Array<RenovationSubsection & { rows: RenovationProduct[] }>;
  }
>;

export const RENOVATION_VAT_RATE = 0.19;
export const RENOVATION_MIN_AREA = 10;

type ReadyState = {
  status: 'ready';
  packageId: string;
  livingArea: number;
  floorCount: number;
  rows: RenovationProduct[];
  manualQuantities: Record<string, boolean>;
  collapsed: Record<string, boolean>;
};

type LoadingState = {
  status: 'loading';
  packageId: string;
};

export type RenovationCalculatorState = ReadyState | LoadingState;

type RenovationCalculatorAction =
  | { type: 'hydrate'; state: ReadyState }
  | { type: 'startLoading'; packageId: string }
  | { type: 'setArea'; value: number }
  | { type: 'toggleRow'; id: string }
  | { type: 'updateQuantity'; id: string; value: number }
  | { type: 'duplicateRow'; id: string }
  | { type: 'removeRow'; id: string }
  | { type: 'replaceRow'; id: string; alternative: RenovationProductAlternative }
  | { type: 'toggleCategory'; id: string }
  | { type: 'enableSubsection'; category: string; subcategory: string }
  | { type: 'reset' };

type PersistedState = Partial<Pick<ReadyState, 'livingArea' | 'rows' | 'collapsed'>> & {
  manualQuantities?: Record<string, boolean>;
  dataVersion?: string;
  dataSignature?: string;
};

const STORAGE_VERSION = 'v6';
const BOSSMANN_STORAGE_VERSION = 'v7';
const BOSSMANN_DATA_VERSION = 'bossmann-v2';
const BOSSMANN_PACKAGE_IDS = new Set([
  '1e', '1e-d', '2e', '2e-d',           // house variants
  'studio', '2zi', '3zi', 'maisonette', // wohnung variants
]);

const getStorageKey = (packageId: string) => {
  const version = BOSSMANN_PACKAGE_IDS.has(packageId) ? BOSSMANN_STORAGE_VERSION : STORAGE_VERSION;
  return `prima-vista-renovation-calculator-modular-${version}-${packageId}`;
};

const getDataVersion = (packageId: string) => (
  BOSSMANN_PACKAGE_IDS.has(packageId) ? BOSSMANN_DATA_VERSION : STORAGE_VERSION
);

function getPackageSignature(pkg: RenovationPackage | undefined): string {
  if (!pkg) return 'missing-package';
  const rowIds = pkg.categories.flatMap((category) => (
    category.subsections.flatMap((subsection) => subsection.products.map((product) => product.id))
  ));
  return `${pkg.id}:${rowIds.length}:${rowIds.join('|')}`;
}

function buildInitialState(pkg: RenovationPackage): ReadyState {
  const collapsed = pkg.categories.reduce<Record<string, boolean>>((acc, category, index) => {
    acc[category.id] = category.collapsedByDefault ?? index > 0;
    category.subsections.forEach((subsection) => {
      if (subsection.collapsedByDefault) acc[`${category.id}:${subsection.id}`] = true;
    });
    return acc;
  }, {});

  const rows = pkg.categories.flatMap((category) =>
    category.subsections.flatMap((subsection) => subsection.products),
  );

  return {
    status: 'ready',
    packageId: pkg.id,
    livingArea: pkg.defaultArea,
    floorCount: pkg.defaultFloorCount,
    rows,
    manualQuantities: {},
    collapsed,
  };
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

function clampLineQuantity(value: number, min: number): number {
  if (!Number.isFinite(value)) return 0;
  if (value <= 0) return 0;
  return clampQuantity(value, min);
}

function computeAutomaticQuantity(row: RenovationProduct, livingArea: number, floorCount: number, scaleBase: number): number {
  if (row.scalable && row.formula) {
    const raw = evaluateQuantityFormula(row.formula, { livingArea, floorCount });
    if (raw === null) return row.baseQuantity;
    return Math.max(0, roundQuantityToStep(raw, row.quantityStep));
  }

  const scaled = row.baseQuantity * (livingArea / scaleBase);
  return Math.max(0, roundQuantityToStep(scaled, row.quantityStep));
}

export function recalculateRowsForArea(
  rows: RenovationProduct[],
  livingArea: number,
  floorCount: number,
  packageDefaultArea: number,
  manualQuantities: Record<string, boolean> = {},
): RenovationProduct[] {
  if (livingArea <= 0) {
    return rows.map((row) => ({ ...row, quantity: 0 }));
  }

  const scaleBase = packageDefaultArea > 0 ? packageDefaultArea : 1;

  return rows.map((row) => {
    if (manualQuantities[row.id]) return row;
    return {
      ...row,
      quantity: computeAutomaticQuantity(row, livingArea, floorCount, scaleBase),
    };
  });
}

function isValidRow(row: unknown): row is RenovationProduct {
  if (!row || typeof row !== 'object') return false;
  const maybe = row as Partial<RenovationProduct>;
  return typeof maybe.id === 'string'
    && typeof maybe.title === 'string'
    && typeof maybe.sku === 'string'
    && typeof maybe.category === 'string'
    && typeof maybe.subcategory === 'string'
    && typeof maybe.basePrice === 'number'
    && typeof maybe.quantity === 'number';
}

function hydrateFromStorage(pkg: RenovationPackage): ReadyState {
  const initial = buildInitialState(pkg);
  if (typeof window === 'undefined') return initial;

  try {
    const raw = window.localStorage.getItem(getStorageKey(pkg.id));
    if (!raw) return initial;

    const saved = JSON.parse(raw) as PersistedState;
    if (saved.dataVersion !== getDataVersion(pkg.id)) return initial;
    if (saved.dataSignature !== getPackageSignature(pkg)) return initial;

    const rows = Array.isArray(saved.rows) && saved.rows.every(isValidRow)
      ? saved.rows
      : initial.rows;
    const livingArea = typeof saved.livingArea === 'number'
      ? Math.max(0, saved.livingArea)
      : initial.livingArea;
    const collapsed = saved.collapsed && typeof saved.collapsed === 'object'
      ? { ...initial.collapsed, ...saved.collapsed }
      : initial.collapsed;
    const manualQuantities = saved.manualQuantities && typeof saved.manualQuantities === 'object'
      ? saved.manualQuantities
      : initial.manualQuantities;

    return {
      ...initial,
      livingArea,
      rows,
      manualQuantities,
      collapsed,
    };
  } catch {
    return initial;
  }
}

function renovationReducer(
  state: RenovationCalculatorState,
  action: RenovationCalculatorAction,
): RenovationCalculatorState {
  if (action.type === 'hydrate') {
    return action.state;
  }
  if (action.type === 'startLoading') {
    if (state.status === 'loading' && state.packageId === action.packageId) return state;
    return { status: 'loading', packageId: action.packageId };
  }
  if (state.status !== 'ready') return state;

  switch (action.type) {
    case 'setArea': {
      const livingArea = Math.max(0, action.value);
      const pkg = getCachedRenovationPackage(state.packageId);
      const manualQuantities = livingArea <= 0 ? {} : state.manualQuantities;
      return {
        ...state,
        livingArea,
        manualQuantities,
        rows: recalculateRowsForArea(
          state.rows,
          livingArea,
          state.floorCount,
          pkg?.defaultArea ?? RENOVATION_MIN_AREA,
          manualQuantities,
        ),
      };
    }

    case 'toggleRow':
      return {
        ...state,
        rows: state.rows.map((row) => (
          row.id === action.id ? { ...row, enabled: !row.enabled } : row
        )),
      };

    case 'updateQuantity':
      return {
        ...state,
        manualQuantities: {
          ...state.manualQuantities,
          [action.id]: true,
        },
        rows: state.rows.map((row) => (
          row.id === action.id
            ? { ...row, quantity: clampLineQuantity(action.value, row.minQuantity) }
            : row
        )),
      };

    case 'duplicateRow': {
      const index = state.rows.findIndex((row) => row.id === action.id);
      if (index === -1) return state;

      const source = state.rows[index];
      if (!source.canDuplicate) return state;

      const duplicate: RenovationProduct = {
        ...source,
        id: `${source.id}-copy-${Date.now()}`,
        title: `${source.title} - Kopie`,
        enabled: true,
        optional: false,
      };

      return {
        ...state,
        rows: [
          ...state.rows.slice(0, index + 1),
          duplicate,
          ...state.rows.slice(index + 1),
        ],
        manualQuantities: {
          ...state.manualQuantities,
          [duplicate.id]: true,
        },
      };
    }

    case 'removeRow': {
      const manualQuantities = { ...state.manualQuantities };
      delete manualQuantities[action.id];
      return {
        ...state,
        rows: state.rows.filter((row) => row.id !== action.id || !row.canRemove),
        manualQuantities,
      };
    }

    case 'replaceRow':
      return {
        ...state,
        rows: state.rows.map((row) => (
          row.id === action.id && row.canReplace
            ? {
                ...row,
                title: action.alternative.title,
                sku: action.alternative.sku,
                unit: action.alternative.unit,
                basePrice: action.alternative.basePrice,
                description: action.alternative.description ?? row.description,
                image: action.alternative.image ?? row.image,
              }
            : row
        )),
      };

    case 'toggleCategory':
      return {
        ...state,
        collapsed: {
          ...state.collapsed,
          [action.id]: !state.collapsed[action.id],
        },
      };

    case 'enableSubsection':
      return {
        ...state,
        rows: state.rows.map((row) => (
          row.category === action.category && row.subcategory === action.subcategory
            ? { ...row, enabled: true }
            : row
        )),
        collapsed: {
          ...state.collapsed,
          [`${action.category}:${action.subcategory}`]: false,
        },
      };

    case 'reset': {
      const pkg = getCachedRenovationPackage(state.packageId);
      if (!pkg) return state;
      return buildInitialState(pkg);
    }

    default:
      return state;
  }
}

function initialStateFor(packageId: string): RenovationCalculatorState {
  const cached = getCachedRenovationPackage(packageId);
  if (cached) return hydrateFromStorage(cached);
  return { status: 'loading', packageId };
}

export function useRenovationCalculator(packageId: string = DEFAULT_PACKAGE_ID) {
  const [state, dispatch] = useReducer(renovationReducer, packageId, initialStateFor);

  useEffect(() => {
    let cancelled = false;

    const cached = getCachedRenovationPackage(packageId);
    if (cached) {
      if (state.packageId !== packageId || state.status !== 'ready') {
        dispatch({ type: 'hydrate', state: hydrateFromStorage(cached) });
      }
      return () => {
        cancelled = true;
      };
    }

    dispatch({ type: 'startLoading', packageId });
    loadRenovationPackage(packageId).then((pkg) => {
      if (cancelled || !pkg) return;
      dispatch({ type: 'hydrate', state: hydrateFromStorage(pkg) });
    });

    return () => {
      cancelled = true;
    };
  }, [packageId, state.packageId, state.status]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (state.status !== 'ready') return;
    try {
      const pkg = getCachedRenovationPackage(state.packageId);
      window.localStorage?.setItem(getStorageKey(state.packageId), JSON.stringify({
        ...state,
        dataVersion: getDataVersion(state.packageId),
        dataSignature: getPackageSignature(pkg),
      }));
    } catch {
      // The calculator still works when storage is unavailable.
    }
  }, [state]);

  const rows = state.status === 'ready' ? state.rows : EMPTY_ROWS;
  const livingArea = state.status === 'ready' ? state.livingArea : 0;

  const totals = useMemo(() => {
    const activeRows = rows.filter((row) => row.enabled);
    const net = activeRows.reduce((sum, row) => sum + row.quantity * row.basePrice, 0);
    const vat = net * RENOVATION_VAT_RATE;
    const gross = net + vat;
    const perM2 = livingArea > 0 ? net / livingArea : 0;

    return {
      net,
      vat,
      gross,
      perM2,
      activeRows,
      activeCount: activeRows.length,
      totalCount: rows.length,
    };
  }, [livingArea, rows]);

  const rowsByCategory = useMemo<RowsByCategory>(() => {
    if (state.status !== 'ready') return [];
    const pkg = getCachedRenovationPackage(state.packageId);
    if (!pkg) return [];
    return pkg.categories.map((category) => ({
      ...category,
      subsections: category.subsections.map((subsection) => ({
        ...subsection,
        rows: state.rows.filter((row) => (
          row.category === category.id && row.subcategory === subsection.id
        )),
      })),
    }));
  }, [state]);

  const minArea = useMemo(() => {
    if (state.status !== 'ready') return RENOVATION_MIN_AREA;
    const pkg = getCachedRenovationPackage(state.packageId);
    const pkgDefault = pkg?.defaultArea ?? RENOVATION_MIN_AREA;
    return Math.max(1, Math.min(pkgDefault, RENOVATION_MIN_AREA));
  }, [state]);

  return {
    state,
    isReady: state.status === 'ready',
    totals,
    rowsByCategory,
    dispatch,
    minArea,
  };
}

const EMPTY_ROWS: RenovationProduct[] = [];
