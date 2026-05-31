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
