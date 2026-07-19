/**
 * Server-side estimate for the automatic Blitzangebot.
 *
 * Two pricing bases exist:
 *  - 'kalkulator': the submission carries an itemized calculator handoff; the
 *    grand total is re-derived from the sanitized line items (client totals are
 *    never trusted) exactly like the calculator-pdf endpoint does.
 *  - 'pakete': a Komplettpaket request (Haus/Wohnung) with a plausible living
 *    area; priced against the sampled net tables in blitzRates.generated.ts,
 *    which mirror the live calculator packages' default configuration.
 *
 * Everything else (single trades, heating, Gastronomie/Büro packages, missing
 * or implausible scope, totals outside the auto band) stays on the manual
 * 24-hour review path.
 */

import {
  BLITZ_RATES_AREA_MAX,
  BLITZ_RATES_AREA_MIN,
  BLITZ_RATES_AREA_STEP,
  BLITZ_RATES_GENERATED_AT,
  BLITZ_RATE_SERIES,
} from './blitzRates.generated.js';
import type { BlitzPayload, KalkulatorHandoff } from './mail.js';

export const BLITZ_CALC_VERSION = `blitz-auto-v1+rates-${BLITZ_RATES_GENERATED_AT}`;

// Automatic quotes only inside this net-total corridor; anything below is too
// unspecific to be useful, anything above deserves personal attention.
export const ESTIMATE_MIN_TOTAL = 3_000;
export const ESTIMATE_MAX_TOTAL = 900_000;

// Same fuzz band the RenovationCalculator itself presents (0.9× / 1.15×).
const BAND_MIN = 0.9;
const BAND_MAX = 1.15;

// Plausible living areas per package group. Outside → manual review.
const AREA_BOUNDS: Record<'haus' | 'wohnung', { min: number; max: number }> = {
  haus: { min: 40, max: 400 },
  wohnung: { min: 20, max: 300 },
};

const PAKET_LABEL_TO_GROUP: Record<string, 'haus' | 'wohnung'> = {
  'Haussanierung': 'haus',
  'Wohnungssanierung': 'wohnung',
  // Cached clients may still submit the former spellings during rollout.
  'Haus-Sanierung': 'haus',
  'Wohnung-Sanierung': 'wohnung',
};

export type BlitzEstimate = {
  basis: 'kalkulator' | 'pakete';
  totalMin: number;
  totalMid: number;
  totalMax: number;
  perM2: number;
  areaM2: number;
  /** Per-subtype nets backing a 'pakete' estimate (for the office email). */
  details?: Array<{ label: string; net: number }>;
};

export type BlitzDecision =
  | { mode: 'auto'; estimate: BlitzEstimate; kalkulator?: KalkulatorHandoff }
  | { mode: 'manual'; reason: string };

/** Parse "120", "120,5", "ca. 120 m²" → 120.5; null when no usable number. */
export function parseAreaM2(groesse: string): number | null {
  const match = groesse.replace(',', '.').match(/\d+(?:\.\d+)?/);
  if (!match) return null;
  const value = Number(match[0]);
  return Number.isFinite(value) && value > 0 ? value : null;
}

/** Net at `area` for one series — linear interpolation between grid points. */
function seriesNetAt(nets: readonly number[], area: number): number {
  const clamped = Math.min(Math.max(area, BLITZ_RATES_AREA_MIN), BLITZ_RATES_AREA_MAX);
  const position = (clamped - BLITZ_RATES_AREA_MIN) / BLITZ_RATES_AREA_STEP;
  const lower = Math.floor(position);
  const upper = Math.min(lower + 1, nets.length - 1);
  const t = position - lower;
  return nets[lower] * (1 - t) + nets[upper] * t;
}

/** Re-derive the grand total from sanitized picks — row sums when itemized,
 *  else the pick subtotal. Mirrors netlify/functions/calculator-pdf.ts. */
export function recomputeKalkulatorMid(handoff: KalkulatorHandoff): number {
  return handoff.picks.reduce((sum, pick) => {
    const pickTotal = pick.rows && pick.rows.length
      ? pick.rows.reduce((rowSum, row) => rowSum + row.subtotal, 0)
      : pick.subtotal;
    return sum + pickTotal;
  }, 0);
}

function bandEstimate(mid: number, areaM2: number, basis: BlitzEstimate['basis']): BlitzEstimate {
  return {
    basis,
    totalMin: Math.round(mid * BAND_MIN),
    totalMid: Math.round(mid),
    totalMax: Math.round(mid * BAND_MAX),
    perM2: areaM2 > 0 ? Math.round(mid / areaM2) : 0,
    areaM2,
  };
}

function estimateForKalkulator(handoff: KalkulatorHandoff): BlitzDecision {
  const mid = recomputeKalkulatorMid(handoff);
  if (mid < ESTIMATE_MIN_TOTAL || mid > ESTIMATE_MAX_TOTAL) {
    return { mode: 'manual', reason: 'kalkulator-total-out-of-range' };
  }
  const estimate = bandEstimate(mid, handoff.area > 0 ? handoff.area : 0, 'kalkulator');
  // The estimate email/PDF must present the recomputed totals, not the client's.
  const kalkulator: KalkulatorHandoff = {
    ...handoff,
    totalMin: estimate.totalMin,
    totalMid: estimate.totalMid,
    totalMax: estimate.totalMax,
    perM2: estimate.perM2,
  };
  return { mode: 'auto', estimate, kalkulator };
}

function estimateForPakete(paketLabel: string, groesse: string): BlitzDecision {
  const group = PAKET_LABEL_TO_GROUP[paketLabel];
  if (!group) return { mode: 'manual', reason: 'paket-not-priceable' };

  const area = parseAreaM2(groesse);
  if (area === null) return { mode: 'manual', reason: 'area-missing' };
  const bounds = AREA_BOUNDS[group];
  if (area < bounds.min || area > bounds.max) {
    return { mode: 'manual', reason: 'area-out-of-range' };
  }

  const series = BLITZ_RATE_SERIES.filter((s) => s.group === group);
  const nets = series.map((s) => seriesNetAt(s.nets, area));
  const mid = nets.reduce((sum, net) => sum + net, 0) / nets.length;
  if (mid < ESTIMATE_MIN_TOTAL || mid > ESTIMATE_MAX_TOTAL) {
    return { mode: 'manual', reason: 'paket-total-out-of-range' };
  }

  // Widen the band by the subtype spread: the visitor told us "house" or
  // "apartment", not which of the four configurations it is.
  const estimate: BlitzEstimate = {
    basis: 'pakete',
    totalMin: Math.round(Math.min(...nets) * BAND_MIN),
    totalMid: Math.round(mid),
    totalMax: Math.round(Math.max(...nets) * BAND_MAX),
    perM2: area > 0 ? Math.round(mid / area) : 0,
    areaM2: area,
    details: series.map((s, index) => ({ label: s.label, net: Math.round(nets[index]) })),
  };
  return { mode: 'auto', estimate };
}

/** Decide whether a validated Blitz submission qualifies for an automatic
 *  estimate, and compute it. Consent is checked by the caller. */
export function decideBlitzEstimate(payload: BlitzPayload): BlitzDecision {
  if (payload.kalkulator && payload.kalkulator.picks.length > 0) {
    return estimateForKalkulator(payload.kalkulator);
  }
  if (payload.art === 'pakete') {
    const pakete = payload.gewerke.filter((label) => label in PAKET_LABEL_TO_GROUP
      || label === 'Gastronomieausbau' || label === 'Büroausbau'
      || label === 'Gastronomie-Ausbau' || label === 'Büro-Ausbau');
    if (pakete.length !== 1) return { mode: 'manual', reason: 'paket-selection-ambiguous' };
    return estimateForPakete(pakete[0], payload.groesse);
  }
  return { mode: 'manual', reason: 'art-not-priceable' };
}
