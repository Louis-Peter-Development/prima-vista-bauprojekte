import { sendKontaktEmails, type KontaktPayload } from '../../server/mail.js';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function asString(v: unknown): string {
  return typeof v === 'string' ? v.trim() : '';
}

function validate(body: unknown): KontaktPayload | { error: string } {
  if (!body || typeof body !== 'object') return { error: 'Invalid body' };
  const b = body as Record<string, unknown>;
  const payload: KontaktPayload = {
    vorname: asString(b.vorname),
    nachname: asString(b.nachname),
    email: asString(b.email),
    tel: asString(b.tel) || undefined,
    art: asString(b.art) || undefined,
    region: asString(b.region) || undefined,
    budget: asString(b.budget) || undefined,
    msg: asString(b.msg),
  };
  if (!payload.vorname) return { error: 'vorname is required' };
  if (!payload.nachname) return { error: 'nachname is required' };
  if (!payload.email || !EMAIL_RE.test(payload.email)) return { error: 'email is invalid' };
  if (!payload.msg) return { error: 'msg is required' };
  if (!b.dsgvo) return { error: 'dsgvo consent is required' };
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
    await sendKontaktEmails(result);
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  } catch (err) {
    console.error('[contact] send failed', err);
    return new Response(JSON.stringify({ error: 'Send failed' }), {
      status: 502,
      headers: { 'content-type': 'application/json' },
    });
  }
};

export const config = { path: '/api/contact' };
