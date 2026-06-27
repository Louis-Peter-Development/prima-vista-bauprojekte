import type { Config, Context } from '@netlify/functions';
import { adminCookie, clearAdminCookie, loginAdmin, loginGoogleAdmin, verifyAdmin } from './_shared/auth';
import { getEnv } from './_shared/env';
import { asString, errorResponse, json, methodNotAllowed, readJson } from './_shared/http';
import { checkRateLimit, rateLimitResponse } from './_shared/rate-limit';

// Throttle unauthenticated credential checks so the single admin account can't
// be brute-forced / password-sprayed. Best-effort (the limiter is per-instance
// in-memory), but it raises the cost of guessing dramatically and mirrors the
// rate limiting already applied to every other mutating endpoint.
const LOGIN_RATE_LIMIT = { key: 'auth-login', limit: 5, windowMs: 10 * 60 * 1000 } as const;

async function handleLogin(req: Request) {
  const rateLimit = checkRateLimit(req, LOGIN_RATE_LIMIT);
  if (!rateLimit.ok) return rateLimitResponse(rateLimit);

  const body = await readJson(req);
  if (!body || typeof body !== 'object') return json({ error: 'Invalid body' }, { status: 400 });

  const record = body as Record<string, unknown>;
  const email = asString(record.email).toLowerCase();
  const password = asString(record.password);
  if (!email || !password) return json({ error: 'Email and password are required' }, { status: 400 });

  const token = await loginAdmin(email, password);
  if (!token) return json({ error: 'Invalid credentials' }, { status: 401 });

  return json(
    { ok: true },
    {
      headers: { 'set-cookie': adminCookie(token) },
    },
  );
}

async function handleGoogleLogin(req: Request) {
  const rateLimit = checkRateLimit(req, LOGIN_RATE_LIMIT);
  if (!rateLimit.ok) return rateLimitResponse(rateLimit);

  const body = await readJson(req);
  if (!body || typeof body !== 'object') return json({ error: 'Invalid body' }, { status: 400 });

  const credential = asString((body as Record<string, unknown>).credential);
  if (!credential) return json({ error: 'credential is required' }, { status: 400 });

  const token = await loginGoogleAdmin(credential);
  if (!token) return json({ error: 'Invalid Google account' }, { status: 401 });

  return json(
    { ok: true },
    {
      headers: { 'set-cookie': adminCookie(token) },
    },
  );
}

function handleSession(req: Request, context: Context) {
  const admin = verifyAdmin(req, context);
  // Expose the (public) Google client id at runtime so the login button can
  // render without a build-time VITE_ var. Only advertise it when Google login
  // is fully configured (client id + allowed admin email), so the button never
  // appears in a state where sign-in would fail.
  const clientId = getEnv('GOOGLE_CLIENT_ID');
  const adminEmail = getEnv('ADMIN_GOOGLE_EMAIL') ?? getEnv('ADMIN_EMAIL');
  const googleClientId = clientId && adminEmail ? clientId : null;
  return json({ isAdmin: !!admin, admin, googleClientId });
}

function handleLogout() {
  return json(
    { ok: true },
    {
      headers: { 'set-cookie': clearAdminCookie() },
    },
  );
}

export default async (req: Request, context: Context) => {
  const action = context.params.action;

  try {
    if (action === 'login' && req.method === 'POST') return handleLogin(req);
    if (action === 'google' && req.method === 'POST') return handleGoogleLogin(req);
    if (action === 'session' && req.method === 'GET') return handleSession(req, context);
    if (action === 'logout' && req.method === 'POST') return handleLogout();
    return methodNotAllowed(action === 'session' ? ['GET'] : ['POST']);
  } catch (err) {
    return errorResponse(err, 'auth');
  }
};

export const config: Config = {
  path: '/api/auth/:action',
};
