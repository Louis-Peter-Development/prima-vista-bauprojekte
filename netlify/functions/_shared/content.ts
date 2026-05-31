import type { PostModel } from './db';

export type PostStatus = 'draft' | 'published';
export type TiptapDoc = Record<string, unknown>;

export function sanitizePlainText(value: string, max = 4000): string {
  return value
    .replace(/<[^>]*>/g, '')
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, '')
    .trim()
    .slice(0, max);
}

export function slugify(value: string): string {
  const normalized = value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .toLowerCase();

  return (
    normalized
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 80) || 'beitrag'
  );
}

export async function uniqueSlug(
  Post: PostModel,
  title: string,
  currentId?: string,
): Promise<string> {
  const base = slugify(title);
  let candidate = base;
  let counter = 2;

  while (true) {
    const existing = await Post.findOne({ slug: candidate }).select('_id').lean();
    if (!existing || String(existing._id) === currentId) return candidate;
    candidate = `${base}-${counter}`;
    counter += 1;
  }
}

export function extractText(doc: unknown): string {
  const chunks: string[] = [];

  function walk(node: unknown) {
    if (!node || typeof node !== 'object') return;
    const record = node as Record<string, unknown>;
    if (typeof record.text === 'string') chunks.push(record.text);
    if (Array.isArray(record.content)) record.content.forEach(walk);
  }

  walk(doc);
  return chunks.join(' ').replace(/\s+/g, ' ').trim();
}

export function excerptFromDoc(doc: unknown, max = 165): string {
  const text = extractText(doc);
  if (text.length <= max) return text;
  return `${text.slice(0, max).replace(/\s+\S*$/, '')}...`;
}

export function readingTimeFromDoc(doc: unknown): number {
  const words = extractText(doc).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function isTiptapDoc(value: unknown): value is TiptapDoc {
  return !!value && typeof value === 'object' && (value as Record<string, unknown>).type === 'doc';
}
