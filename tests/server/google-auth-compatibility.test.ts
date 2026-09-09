import { generateKeyPairSync, sign, verify } from 'node:crypto';
import type { Gaxios, GaxiosOptions, GaxiosPromise } from 'gaxios';
import { OAuth2Client } from 'google-auth-library';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { loginGoogleAdmin, verifyAdmin } from '../../netlify/functions/_shared/auth';
import { isConsultationSlotAvailable } from '../../server/terminAvailability';

vi.mock('../../netlify/functions/_shared/db', () => ({
  connectDb: () => { throw new Error('Database access is forbidden in auth compatibility tests'); },
}));

const clientId = 'local-compatibility-client.apps.googleusercontent.com';
const adminEmail = 'admin@example.test';
const serviceEmail = 'calendar@example.test';
const calendarId = 'office@example.test';
const calendarScope = 'https://www.googleapis.com/auth/calendar';
const tokenUrl = 'https://oauth2.googleapis.com/token';
const freeBusyUrl = 'https://www.googleapis.com/calendar/v3/freeBusy';
const certsUrl = 'https://www.googleapis.com/oauth2/v1/certs';
const keys = generateKeyPairSync('rsa', { modulusLength: 2048 });
const publicKey = keys.publicKey.export({ type: 'spki', format: 'pem' }).toString();
const privateKey = keys.privateKey.export({ type: 'pkcs8', format: 'pem' }).toString();

function idToken(overrides: Record<string, unknown> = {}) {
  const now = Math.floor(Date.now() / 1000);
  const header = Buffer.from(JSON.stringify({ alg: 'RS256', kid: 'local-key' })).toString('base64url');
  const payload = Buffer.from(JSON.stringify({
    iss: 'https://accounts.google.com',
    aud: clientId,
    sub: 'local-google-subject',
    email: adminEmail,
    email_verified: true,
    iat: now - 10,
    exp: now + 3600,
    ...overrides,
  })).toString('base64url');
  const input = `${header}.${payload}`;
  return `${input}.${sign('RSA-SHA256', Buffer.from(input), keys.privateKey).toString('base64url')}`;
}

const requests: Request[] = [];
let respond: (request: Request) => Promise<Response>;

beforeEach(() => {
  requests.length = 0;
  delete globalThis.__pvCalendarJwt;
  delete globalThis.__pvTermineCache;
  vi.stubGlobal('Netlify', undefined);
  vi.stubEnv('GOOGLE_CLIENT_ID', clientId);
  vi.stubEnv('ADMIN_GOOGLE_EMAIL', adminEmail);
  vi.stubEnv('JWT_SECRET', 'local-test-secret-with-at-least-thirty-two-characters');
  vi.stubEnv('GOOGLE_CALENDAR_ID', calendarId);
  vi.stubEnv('GOOGLE_SA_EMAIL', serviceEmail);
  // Exercise the real caller's normalization of environment-stored newlines.
  vi.stubEnv('GOOGLE_SA_KEY', privateKey.replaceAll('\n', '\\n'));

  respond = async (request) => {
    if (request.url === certsUrl) {
      expect(request.method).toBe('GET');
      return Response.json({ 'local-key': publicKey }, { headers: { 'cache-control': 'max-age=3600' } });
    }
    throw new Error(`Unexpected HTTP request: ${request.method} ${request.url}`);
  };
  const fetchFixture: typeof fetch = async (input, init) => {
    const request = new Request(input, init);
    requests.push(request.clone());
    return respond(request);
  };
  vi.stubGlobal('fetch', fetchFixture);

  // Keep the actual SDK, signing, verification, and Gaxios serialization. Only
  // replace HTTP at the public transport seam, including its node-fetch path.
  const prototype = Object.getPrototypeOf(new OAuth2Client().transporter) as Gaxios;
  const request = prototype.request;
  vi.spyOn(prototype, 'request').mockImplementation(function <T>(this: Gaxios, options: GaxiosOptions) {
    return request.call(this, {
      ...options,
      fetchImplementation: fetchFixture,
      retry: false,
      retryConfig: { ...options.retryConfig, retry: 0 },
    }) as GaxiosPromise<T>;
  });
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
  delete globalThis.__pvCalendarJwt;
  delete globalThis.__pvTermineCache;
});

describe('Google admin login with the real Google Auth SDK', () => {
  it('verifies a signed ID token and issues a usable session for the allowed verified email', async () => {
    const session = await loginGoogleAdmin(idToken({ email: adminEmail.toUpperCase() }));
    expect(session).toBeTypeOf('string');
    expect(verifyAdmin(new Request('https://example.test/admin', {
      headers: { cookie: `pv_admin_token=${session}` },
    }))).toEqual({ sub: `google:${adminEmail}`, email: adminEmail });
    expect(requests.map((request) => request.url)).toEqual([certsUrl]);
  });

  it.each([
    ['a different audience', () => idToken({ aud: 'another-client' })],
    ['an untrusted issuer', () => idToken({ iss: 'https://issuer.example.test' })],
    ['an expired token', () => idToken({ iat: Math.floor(Date.now() / 1000) - 7200, exp: Math.floor(Date.now() / 1000) - 3600 })],
    ['a token used before its issue time', () => idToken({ iat: Math.floor(Date.now() / 1000) + 3600 })],
    ['a forged signature', () => {
      const [header, payload] = idToken().split('.');
      return `${header}.${payload}.${Buffer.alloc(256).toString('base64url')}`;
    }],
  ])('rejects %s before issuing an admin session', async (_label, credential) => {
    await expect(loginGoogleAdmin(credential())).rejects.toThrow();
    expect(requests).toHaveLength(1);
  });

  it.each([
    { email: 'other@example.test' },
    { email_verified: false },
  ])('does not authorize a validly signed token with disallowed identity claims: %j', async (claims) => {
    await expect(loginGoogleAdmin(idToken(claims))).resolves.toBeNull();
  });

  it('fails closed when verification certificates cannot be retrieved', async () => {
    respond = async () => Response.json({ error: 'fixture unavailable' }, { status: 503 });
    await expect(loginGoogleAdmin(idToken())).rejects.toThrow();
    expect(requests.map((request) => request.url)).toEqual([certsUrl]);
  });
});

describe('Calendar service-account authentication with the real Google Auth SDK', () => {
  it('signs the token exchange, uses its access token for free/busy, and reuses unexpired credentials', async () => {
    respond = async (request) => {
      if (request.url === tokenUrl) {
        expect(request.method).toBe('POST');
        expect(request.headers.get('content-type')).toContain('application/x-www-form-urlencoded');
        const form = new URLSearchParams(await request.text());
        expect(form.get('grant_type')).toBe('urn:ietf:params:oauth:grant-type:jwt-bearer');
        const [header, payload, signature] = form.get('assertion')!.split('.');
        expect(JSON.parse(Buffer.from(header, 'base64url').toString()).alg).toBe('RS256');
        expect(verify('RSA-SHA256', Buffer.from(`${header}.${payload}`), keys.publicKey, Buffer.from(signature, 'base64url'))).toBe(true);
        const claims = JSON.parse(Buffer.from(payload, 'base64url').toString());
        expect(claims).toMatchObject({ iss: serviceEmail, aud: tokenUrl, scope: calendarScope });
        expect(claims.exp - claims.iat).toBe(3600);
        return Response.json({ access_token: 'local-access-token', token_type: 'Bearer', expires_in: 3600 });
      }
      if (request.url === freeBusyUrl) {
        expect(request.method).toBe('POST');
        expect(request.headers.get('authorization')).toBe('Bearer local-access-token');
        expect(await request.json()).toMatchObject({ timeZone: 'Europe/Berlin', items: [{ id: calendarId }] });
        return Response.json({ calendars: { [calendarId]: { busy: [
          { start: '2030-01-07T08:00:00Z', end: '2030-01-07T09:00:00Z' },
        ] } } });
      }
      throw new Error(`Unexpected HTTP request: ${request.method} ${request.url}`);
    };

    await expect(isConsultationSlotAvailable('2030-01-07', '09:30')).resolves.toBe(false);
    await expect(isConsultationSlotAvailable('2030-01-07', '11:00')).resolves.toBe(true);
    expect(requests.map((request) => request.url)).toEqual([tokenUrl, freeBusyUrl, freeBusyUrl]);
    expect(await requests[1].json()).toMatchObject({ timeMin: '2030-01-07T08:30:00.000Z', timeMax: '2030-01-07T10:30:00.000Z' });
  });

  it('does not call Calendar when the service-account token exchange fails', async () => {
    respond = async (request) => {
      expect(request.url).toBe(tokenUrl);
      return Response.json({ error: 'invalid_grant' }, { status: 400 });
    };
    await expect(isConsultationSlotAvailable('2030-01-07', '11:00')).rejects.toThrow();
    expect(requests.map((request) => request.url)).toEqual([tokenUrl]);
  });
});
