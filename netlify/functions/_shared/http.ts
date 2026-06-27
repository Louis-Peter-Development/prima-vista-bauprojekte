export function json(body: unknown, init: ResponseInit = {}) {
  const headers = new Headers(init.headers);
  headers.set('content-type', 'application/json');
  return new Response(JSON.stringify(body), { ...init, headers });
}

export function methodNotAllowed(allowed: string[]) {
  return json(
    { error: 'Method not allowed' },
    {
      status: 405,
      headers: { allow: allowed.join(', ') },
    },
  );
}

// Log the full error server-side but never leak internal error text (mongoose
// messages, missing-env-var names, stack details) to the client. The only
// caller-meaningful branch is the controlled `Invalid JSON` 400 thrown by
// readJson(); everything else collapses to a generic 500.
export function errorResponse(err: unknown, tag: string) {
  console.error(`[${tag}]`, err);
  const isBadJson = err instanceof Error && err.message === 'Invalid JSON';
  return json(
    { error: isBadJson ? 'Invalid JSON' : 'Internal error' },
    { status: isBadJson ? 400 : 500 },
  );
}

export async function readJson(req: Request): Promise<unknown> {
  try {
    return await req.json();
  } catch {
    throw new Error('Invalid JSON');
  }
}

export function asString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

export function asBoolean(value: unknown): boolean {
  return value === true || value === 'true' || value === '1';
}
