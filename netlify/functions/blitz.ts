import { sendBlitzEmails, type BlitzPayload } from '../../server/mail.js';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function asString(v: unknown): string {
  return typeof v === 'string' ? v.trim() : '';
}

function asStringArray(v: unknown): string[] {
  return Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : [];
}

function validate(body: unknown): BlitzPayload | { error: string } {
  if (!body || typeof body !== 'object') return { error: 'Invalid body' };
  const b = body as Record<string, unknown>;
  const payload: BlitzPayload = {
    art: asString(b.art),
    artLabel: asString(b.artLabel) || asString(b.art),
    groesse: asString(b.groesse),
    starttermin: asString(b.starttermin),
    starterminLabel: asString(b.starterminLabel) || asString(b.starttermin),
    gewerke: asStringArray(b.gewerke),
    msg: asString(b.msg),
    name: asString(b.name),
    email: asString(b.email),
    tel: asString(b.tel),
  };
  if (!payload.name) return { error: 'name is required' };
  if (!payload.email || !EMAIL_RE.test(payload.email)) return { error: 'email is invalid' };
  if (!payload.tel) return { error: 'tel is required' };
  if (!payload.groesse) return { error: 'groesse is required' };
  if (!payload.starttermin) return { error: 'starttermin is required' };
  return payload;
}

export default async (req: Request) => {
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    });
  }

  const result = validate(body);
  if ('error' in result) {
    return new Response(JSON.stringify(result), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    });
  }

  try {
    await sendBlitzEmails(result);
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  } catch (err) {
    console.error('[blitz] send failed', err);
    return new Response(JSON.stringify({ error: 'Send failed' }), {
      status: 502,
      headers: { 'content-type': 'application/json' },
    });
  }
};

export const config = { path: '/api/blitz' };
