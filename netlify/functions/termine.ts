import { getMonthAvailability } from '../../server/terminAvailability.js';
import { json, methodNotAllowed } from './_shared/http';
import { checkRateLimit, rateLimitResponse } from './_shared/rate-limit';

const MONTH_RE = /^\d{4}-(0[1-9]|1[0-2])$/;
const MAX_MONTHS_AHEAD = 6;

/** Month within [current month, +MAX_MONTHS_AHEAD] (UTC is close enough for a
 *  month-granular guard). */
function isMonthInRange(month: string): boolean {
  const now = new Date();
  const current = now.getUTCFullYear() * 12 + now.getUTCMonth();
  const [year, monthNumber] = month.split('-').map(Number);
  const requested = year * 12 + (monthNumber - 1);
  return requested >= current && requested <= current + MAX_MONTHS_AHEAD;
}

export default async (req: Request) => {
  if (req.method !== 'GET') return methodNotAllowed(['GET']);

  const rateLimit = checkRateLimit(req, {
    key: 'termine',
    limit: 30,
    windowMs: 10 * 60 * 1000,
  });
  if (!rateLimit.ok) return rateLimitResponse(rateLimit);

  const month = new URL(req.url).searchParams.get('month') ?? '';
  if (!MONTH_RE.test(month) || !isMonthInRange(month)) {
    return json({ error: 'invalid month' }, { status: 400 });
  }

  try {
    const availability = await getMonthAvailability(month);
    return json(availability, {
      headers: { 'cache-control': 'public, max-age=300' },
    });
  } catch (err) {
    console.error('[termine] availability failed', err);
    // Fail open: the picker silently degrades to preference-only.
    return json({ configured: false, days: {} });
  }
};

export const config = { path: '/api/termine' };
