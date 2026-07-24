/**
 * Server-side estimate for the automatic Blitzangebot.
 *
 * Two pricing bases exist:
 *  - 'kalkulator': the submission carries an itemized calculator handoff; the
 *    grand total is re-derived from the sanitized line items (client totals are
 *    never trusted) exactly like the calculator-pdf endpoint does.
 *  - 'pakete': a direct Komplettpaket request with a plausible area; the server
 *    rebuilds the matching live calculator's Standard/default configuration
 *    and returns the same itemized handoff used by the PDF generator.
 *
 * Everything else (single trades, heating, missing or implausible scope,
 * totals outside the auto band) stays on the manual 24-hour review path.
 */

import {
  buildDefaultCalculatorCalculation,
  isDefaultCalculatorPackageLabel,
} from './blitzDefaultCalculator.js';
import { BLITZ_DEFAULTS_GENERATED_AT } from './blitzRates.generated.js';
import type { BlitzPayload, KalkulatorHandoff } from './mail.js';

export const BLITZ_CALC_VERSION = `blitz-auto-v2+calculator-defaults-${BLITZ_DEFAULTS_GENERATED_AT}`;

// Automatic quotes only inside this net-total corridor; anything below is too
// unspecific to be useful, anything above deserves personal attention.
export const ESTIMATE_MIN_TOTAL = 3_000;
export const ESTIMATE_MAX_TOTAL = 900_000;

// Same fuzz band the RenovationCalculator itself presents (0.9× / 1.15×).
const BAND_MIN = 0.9;
const BAND_MAX = 1.15;

export type BlitzEstimate = {
  basis: 'kalkulator' | 'pakete';
  totalMin: number;
  totalMid: number;
  totalMax: number;
  perM2: number;
  areaM2: number;
  /** Trusted Standard/default configuration backing a package estimate. */
  details?: Array<{ label: string; net: number }>;
};

export type BlitzDecision =
  | { mode: 'auto'; estimate: BlitzEstimate; kalkulator?: KalkulatorHandoff }
  | { mode: 'manual'; reason: string };

/** Parse "120", "120,5", "ca. 120 m²" → 120.5; null when no usable number. */
export function parseAreaM2(groesse: string): number | null {
  const match = groesse.replace(',', '.').match(/-?\d+(?:\.\d+)?/);
  if (!match) return null;
  const value = Number(match[0]);
  return Number.isFinite(value) && value > 0 ? value : null;
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
  if (!isDefaultCalculatorPackageLabel(paketLabel)) {
    return { mode: 'manual', reason: 'paket-not-priceable' };
  }

  const area = parseAreaM2(groesse);
  if (area === null) return { mode: 'manual', reason: 'area-missing' };
  const calculation = buildDefaultCalculatorCalculation(paketLabel, area);
  if (!calculation) return { mode: 'manual', reason: 'paket-not-priceable' };
  if (area < calculation.areaMin || area > calculation.areaMax) {
    return { mode: 'manual', reason: 'area-out-of-range' };
  }

  const mid = recomputeKalkulatorMid(calculation.handoff);
  if (mid < ESTIMATE_MIN_TOTAL || mid > ESTIMATE_MAX_TOTAL) {
    return { mode: 'manual', reason: 'paket-total-out-of-range' };
  }

  const estimate: BlitzEstimate = {
    basis: 'pakete',
    totalMin: Math.round(mid * calculation.bandMin),
    totalMid: Math.round(mid),
    totalMax: Math.round(mid * calculation.bandMax),
    perM2: area > 0 ? Math.round(mid / area) : 0,
    areaM2: area,
    details: [{
      label: `${calculation.handoff.kindLabel} · Standardkonfiguration`,
      net: Math.round(mid),
    }],
  };
  return { mode: 'auto', estimate, kalkulator: calculation.handoff };
}

/** Decide whether a validated Blitz submission qualifies for an automatic
 *  estimate, and compute it. Consent is checked by the caller. */
export function decideBlitzEstimate(payload: BlitzPayload): BlitzDecision {
  if (payload.kalkulator && payload.kalkulator.picks.length > 0) {
    return estimateForKalkulator(payload.kalkulator);
  }
  if (payload.art === 'pakete') {
    const pakete = payload.gewerke.filter(isDefaultCalculatorPackageLabel);
    if (pakete.length !== 1) return { mode: 'manual', reason: 'paket-selection-ambiguous' };
    return estimateForPakete(pakete[0], payload.groesse);
  }
  return { mode: 'manual', reason: 'art-not-priceable' };
}
