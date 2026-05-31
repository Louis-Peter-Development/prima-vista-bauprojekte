import type { Config, Context } from '@netlify/functions';
import { adminCookie, clearAdminCookie, loginAdmin, loginGoogleAdmin, verifyAdmin } from './_shared/auth';
import { asString, json, methodNotAllowed, readJson } from './_shared/http';

async function handleLogin(req: Request) {
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
  return json({ isAdmin: !!admin, admin });
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
    console.error('[auth]', err);
    const message = err instanceof Error ? err.message : 'Unexpected error';
    return json({ error: message }, { status: message === 'Invalid JSON' ? 400 : 500 });
  }
};

export const config: Config = {
  path: '/api/auth/:action',
};
