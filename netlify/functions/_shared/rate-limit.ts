import { json } from './http';

type RateLimitBucket = {
  count: number;
  resetAt: number;
};

type RateLimitOptions = {
  limit: number;
  windowMs: number;
  key: string;
};

type RateLimitResult = {
  ok: boolean;
  retryAfter: number;
};

declare global {
  var __pvRateLimit: Map<string, RateLimitBucket> | undefined;
}

function getBuckets() {
  return (globalThis.__pvRateLimit ??= new Map<string, RateLimitBucket>());
}

export function getClientIp(req: Request): string {
  // Only trust IPs set by the platform edge (Netlify, or Cloudflare when
  // fronted by it). The raw `x-forwarded-for` header is client-spoofable, so
  // using it as a rate-limit key would let an attacker mint a fresh bucket per
  // request and bypass the limit entirely.
  return (
    req.headers.get('x-nf-client-connection-ip')
    ?? req.headers.get('cf-connecting-ip')
    ?? 'unknown'
  );
}

export function checkRateLimit(req: Request, options: RateLimitOptions): RateLimitResult {
  const now = Date.now();
  const bucketKey = `${options.key}:${getClientIp(req)}`;
  const buckets = getBuckets();
  const bucket = buckets.get(bucketKey);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(bucketKey, { count: 1, resetAt: now + options.windowMs });
    return { ok: true, retryAfter: 0 };
  }

  if (bucket.count >= options.limit) {
    return {
      ok: false,
      retryAfter: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
    };
  }

  bucket.count += 1;
  return { ok: true, retryAfter: 0 };
}

export function rateLimitResponse(result: RateLimitResult) {
  return json(
    { error: 'Too many requests' },
    {
      status: 429,
      headers: { 'retry-after': String(result.retryAfter) },
    },
  );
}

export function hasSpamTrap(body: unknown): boolean {
  if (!body || typeof body !== 'object') return false;
  const record = body as Record<string, unknown>;
  return ['website', 'homepage', 'companyUrl', 'url'].some((field) => {
    const value = record[field];
    return typeof value === 'string' && value.trim().length > 0;
  });
}
