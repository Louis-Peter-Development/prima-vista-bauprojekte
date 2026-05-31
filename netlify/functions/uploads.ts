import { randomUUID } from 'node:crypto';
import { getStore } from '@netlify/blobs';
import type { Config, Context } from '@netlify/functions';
import { verifyAdmin } from './_shared/auth';
import { json, methodNotAllowed } from './_shared/http';

const STORE_NAME = 'pv-blog-images';
const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  'image/avif',
  'image/gif',
  'image/jpeg',
  'image/png',
  'image/webp',
]);

function getUploadStore() {
  return getStore({ name: STORE_NAME, consistency: 'strong' });
}

function safeFileName(name: string) {
  const cleaned = name
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 90);

  return cleaned || 'image';
}

function contentTypeFromMetadata(metadata: unknown) {
  if (!metadata || typeof metadata !== 'object') return 'application/octet-stream';
  const contentType = (metadata as Record<string, unknown>).contentType;
  return typeof contentType === 'string' ? contentType : 'application/octet-stream';
}

async function uploadImage(req: Request, context: Context) {
  const admin = verifyAdmin(req, context);
  if (!admin) return json({ error: 'Unauthorized' }, { status: 401 });

  const form = await req.formData();
  const file = form.get('file');
  if (!(file instanceof File)) {
    return json({ error: 'Bitte wählen Sie eine Bilddatei aus.' }, { status: 400 });
  }

  if (!ALLOWED_TYPES.has(file.type)) {
    return json({ error: 'Bitte laden Sie ein JPG, PNG, WebP, GIF oder AVIF hoch.' }, { status: 400 });
  }

  if (file.size > MAX_UPLOAD_BYTES) {
    return json({ error: 'Das Bild darf maximal 10 MB groß sein.' }, { status: 413 });
  }

  const key = `blog-${Date.now()}-${randomUUID()}-${safeFileName(file.name)}`;
  await getUploadStore().set(key, await file.arrayBuffer(), {
    metadata: {
      contentType: file.type,
      originalName: file.name,
      uploadedAt: new Date().toISOString(),
      uploadedBy: admin.email,
    },
  });

  return json({ key, url: `/api/uploads/${encodeURIComponent(key)}` }, { status: 201 });
}

async function getImage(key: string) {
  const store = getUploadStore();
  const result = await store.getWithMetadata(key, { type: 'arrayBuffer' });

  if (!result || !result.data) {
    return json({ error: 'Upload not found' }, { status: 404 });
  }

  const headers = new Headers({
    'cache-control': 'public, max-age=31536000, immutable',
    'content-type': contentTypeFromMetadata(result.metadata),
  });

  return new Response(result.data, { headers });
}

export default async (req: Request, context: Context) => {
  const key = context.params.key;

  try {
    if (req.method === 'POST' && !key) return uploadImage(req, context);
    if (req.method === 'GET' && key) return getImage(key);
    return methodNotAllowed(key ? ['GET'] : ['POST']);
  } catch (err) {
    console.error('[uploads]', err);
    const message = err instanceof Error ? err.message : 'Unexpected error';
    return json({ error: message }, { status: 500 });
  }
};

export const config: Config = {
  path: ['/api/uploads', '/api/uploads/:key'],
};
