import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import type { Context } from '@netlify/functions';
import { getEnv, requireEnv } from './env';
import { connectDb } from './db';

const COOKIE_NAME = 'pv_admin_token';
const MAX_AGE_SECONDS = 60 * 60 * 8;

export type AdminSession = {
  sub: string;
  email: string;
};

function cookieSecureFlag() {
  return getEnv('NETLIFY_DEV') === 'true' ? '' : '; Secure';
}

export function adminCookie(token: string) {
  return `${COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${MAX_AGE_SECONDS}${cookieSecureFlag()}`;
}

export function clearAdminCookie() {
  return `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${cookieSecureFlag()}`;
}

function readCookie(req: Request, context?: Context, name = COOKIE_NAME): string | undefined {
  const fromContext = context?.cookies.get(name);
  if (fromContext) return fromContext;

  const header = req.headers.get('cookie');
  if (!header) return undefined;
  return header
    .split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${name}=`))
    ?.slice(name.length + 1);
}

let warnedWeakSecret = false;

// Pin HS256 explicitly on sign and verify so the verifier never accepts a
// token signed with a different algorithm (alg-confusion defense). Surface a
// weak secret without throwing, so a short JWT_SECRET can't lock out admin
// login on deploy — rotate it to a long random value (openssl rand -base64 48).
function jwtSecret(): string {
  const secret = requireEnv('JWT_SECRET');
  if (secret.length < 32 && !warnedWeakSecret) {
    warnedWeakSecret = true;
    console.warn('[auth] JWT_SECRET is shorter than 32 characters; rotate it to a longer random value.');
  }
  return secret;
}

export function signAdminToken(payload: AdminSession): string {
  return jwt.sign(payload, jwtSecret(), { algorithm: 'HS256', expiresIn: MAX_AGE_SECONDS });
}

export function verifyAdmin(req: Request, context?: Context): AdminSession | null {
  const token = readCookie(req, context);
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, jwtSecret(), { algorithms: ['HS256'] });
    if (!decoded || typeof decoded !== 'object') return null;
    const email = (decoded as Record<string, unknown>).email;
    const sub = (decoded as Record<string, unknown>).sub;
    if (typeof email !== 'string' || typeof sub !== 'string') return null;
    return { email, sub };
  } catch {
    return null;
  }
}

export async function loginAdmin(email: string, password: string): Promise<string | null> {
  const { User } = await connectDb();
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) return null;

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return null;

  return signAdminToken({ sub: String(user._id), email: user.email });
}

export async function loginGoogleAdmin(credential: string): Promise<string | null> {
  const clientId = requireEnv('GOOGLE_CLIENT_ID');
  const allowedEmail = (getEnv('ADMIN_GOOGLE_EMAIL') ?? getEnv('ADMIN_EMAIL') ?? '').toLowerCase();
  if (!allowedEmail) throw new Error('Missing ADMIN_GOOGLE_EMAIL or ADMIN_EMAIL');

  const client = new OAuth2Client(clientId);
  const ticket = await client.verifyIdToken({
    idToken: credential,
    audience: clientId,
  });
  const payload = ticket.getPayload();
  const email = payload?.email?.toLowerCase();

  if (!email || email !== allowedEmail || !payload?.email_verified) return null;

  return signAdminToken({ sub: `google:${email}`, email });
}
