import type { Config, Context } from '@netlify/functions';
import { verifyAdmin } from './_shared/auth';
import { connectDb, type PostDocument, type PostModel } from './_shared/db';
import {
  excerptFromDoc,
  isTiptapDoc,
  readingTimeFromDoc,
  sanitizePlainText,
  uniqueSlug,
  type LocalizedContent,
  type PostStatus,
  type PostTranslations,
  type TiptapDoc,
} from './_shared/content';
import { asString, errorResponse, json, methodNotAllowed, readJson } from './_shared/http';
import { normalizeLocale, type Locale } from '../../server/i18n.js';

type PostPayload = {
  title: string;
  author: string;
  coverImageUrl: string;
  body: TiptapDoc;
  status: PostStatus;
  translations: PostTranslations;
};

function serialize(
  post: PostDocument & { _id?: unknown },
  locale: Locale = 'de',
  includeTranslations = false,
) {
  // Resolve display content: non-German locales use their translation when it
  // has a title, otherwise we fall back to the canonical German top-level.
  const localized = locale !== 'de' ? post.translations?.[locale] : undefined;
  const source = localized?.title ? localized : post;

  const base = {
    id: String(post._id ?? ''),
    title: source.title,
    slug: post.slug,
    author: post.author,
    coverImageUrl: post.coverImageUrl,
    body: source.body,
    excerpt: source.excerpt,
    readingTime: source.readingTime,
    status: post.status,
    sortOrder: post.sortOrder ?? 0,
    views: post.views,
    likes: post.likes,
    publishedAt: post.publishedAt,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
  };

  if (!includeTranslations) return base;

  // Admin editing: expose every language so the editor can load all tabs. The
  // German content is the top-level fields; en/it come from `translations`.
  return {
    ...base,
    translations: {
      en: post.translations?.en ?? null,
      it: post.translations?.it ?? null,
    },
  };
}

async function normalizeSortOrders(Post: PostModel) {
  const posts = await Post.find({})
    .sort({ sortOrder: 1, publishedAt: -1, createdAt: -1 })
    .select('_id sortOrder')
    .lean();

  const operations = posts
    .map((post, index) => {
      if (post.sortOrder === index) return null;
      return {
        updateOne: {
          filter: { _id: post._id },
          update: { $set: { sortOrder: index } },
        },
      };
    })
    .filter((operation): operation is NonNullable<typeof operation> => operation !== null);

  if (operations.length > 0) await Post.bulkWrite(operations);
}

// Build one optional translation language from an untrusted subdocument. A
// language is kept only when it has both a non-empty title and a valid TipTap
// body; otherwise it is omitted so the post falls back to German.
function localizedFrom(value: unknown): LocalizedContent | undefined {
  if (!value || typeof value !== 'object') return undefined;
  const record = value as Record<string, unknown>;
  const title = sanitizePlainText(asString(record.title), 140);
  const body = record.body;
  if (!title || !isTiptapDoc(body)) return undefined;
  return {
    title,
    body,
    excerpt: excerptFromDoc(body),
    readingTime: readingTimeFromDoc(body),
  };
}

function translationsFrom(value: unknown): PostTranslations {
  if (!value || typeof value !== 'object') return {};
  const record = value as Record<string, unknown>;
  const translations: PostTranslations = {};
  const en = localizedFrom(record.en);
  const it = localizedFrom(record.it);
  if (en) translations.en = en;
  if (it) translations.it = it;
  return translations;
}

function validatePayload(body: unknown): PostPayload | { error: string } {
  if (!body || typeof body !== 'object') return { error: 'Invalid body' };
  const record = body as Record<string, unknown>;
  const title = sanitizePlainText(asString(record.title), 140);
  const author = sanitizePlainText(asString(record.author) || 'Prima Vista Bauprojekte', 80);
  const coverImageUrl = asString(record.coverImageUrl);
  const status = record.status === 'published' ? 'published' : 'draft';
  const tiptapBody = record.body;

  if (!title) return { error: 'title is required' };
  if (!isTiptapDoc(tiptapBody)) return { error: 'body must be a TipTap document' };

  return {
    title,
    author,
    coverImageUrl,
    body: tiptapBody,
    status,
    translations: translationsFrom(record.translations),
  };
}

async function listPosts(req: Request, context: Context) {
  const url = new URL(req.url);
  const locale = normalizeLocale(url.searchParams.get('locale'));
  const wantsAll = url.searchParams.get('all') === 'true';
  const admin = verifyAdmin(req, context);
  const adminList = wantsAll && !!admin;
  const { Post } = await connectDb();
  const query: Partial<Pick<PostDocument, 'status'>> = adminList ? {} : { status: 'published' };
  if (adminList) await normalizeSortOrders(Post);

  const posts = await Post.find(query)
    .sort({ sortOrder: 1, publishedAt: -1, createdAt: -1 })
    .lean();

  return json({
    posts: posts.map((post) => serialize(post, locale, adminList)),
    isAdmin: !!admin,
  });
}

async function getPost(req: Request, context: Context, slug: string) {
  const url = new URL(req.url);
  const locale = normalizeLocale(url.searchParams.get('locale'));
  const admin = verifyAdmin(req, context);
  const { Post } = await connectDb();
  const post = await Post.findOne({ slug }).lean();

  if (!post || (post.status !== 'published' && !admin)) {
    return json({ error: 'Post not found' }, { status: 404 });
  }

  return json({ post: serialize(post, locale, !!admin), isAdmin: !!admin });
}

async function createPost(req: Request, context: Context) {
  if (!verifyAdmin(req, context)) return json({ error: 'Unauthorized' }, { status: 401 });

  const payload = validatePayload(await readJson(req));
  if ('error' in payload) return json(payload, { status: 400 });

  const { Post } = await connectDb();
  const now = new Date();
  await normalizeSortOrders(Post);
  await Post.updateMany({}, { $inc: { sortOrder: 1 } });

  const post = await Post.create({
    ...payload,
    slug: await uniqueSlug(Post, payload.title),
    sortOrder: 0,
    excerpt: excerptFromDoc(payload.body),
    readingTime: readingTimeFromDoc(payload.body),
    translations: Object.keys(payload.translations).length ? payload.translations : undefined,
    publishedAt: payload.status === 'published' ? now : null,
  });

  return json({ post: serialize(post.toObject()) }, { status: 201 });
}

async function reorderPost(req: Request, context: Context, slug: string) {
  if (!verifyAdmin(req, context)) return json({ error: 'Unauthorized' }, { status: 401 });

  const body = await readJson(req);
  const direction = body && typeof body === 'object' ? (body as Record<string, unknown>).direction : '';
  if (direction !== 'up' && direction !== 'down') {
    return json({ error: 'direction must be up or down' }, { status: 400 });
  }

  const { Post } = await connectDb();
  await normalizeSortOrders(Post);
  const posts = await Post.find({}).sort({ sortOrder: 1 }).select('_id slug sortOrder').lean();
  const index = posts.findIndex((post) => post.slug === slug);
  if (index < 0) return json({ error: 'Post not found' }, { status: 404 });

  const targetIndex = direction === 'up' ? index - 1 : index + 1;
  if (targetIndex < 0 || targetIndex >= posts.length) return json({ ok: true });

  const current = posts[index];
  const target = posts[targetIndex];
  await Post.bulkWrite([
    { updateOne: { filter: { _id: current._id }, update: { $set: { sortOrder: target.sortOrder } } } },
    { updateOne: { filter: { _id: target._id }, update: { $set: { sortOrder: current.sortOrder } } } },
  ]);

  return json({ ok: true });
}

async function updatePost(req: Request, context: Context, slug: string) {
  if (!verifyAdmin(req, context)) return json({ error: 'Unauthorized' }, { status: 401 });

  const payload = validatePayload(await readJson(req));
  if ('error' in payload) return json(payload, { status: 400 });

  const { Post } = await connectDb();
  const existing = await Post.findOne({ slug });
  if (!existing) return json({ error: 'Post not found' }, { status: 404 });

  const wasDraft = existing.status !== 'published';
  existing.title = payload.title;
  existing.author = payload.author;
  existing.coverImageUrl = payload.coverImageUrl;
  existing.body = payload.body;
  existing.status = payload.status;
  existing.excerpt = excerptFromDoc(payload.body);
  existing.readingTime = readingTimeFromDoc(payload.body);
  // Replace the whole translations object so clearing a language removes it.
  // An empty payload becomes `undefined` to drop the subdocument entirely.
  existing.translations = Object.keys(payload.translations).length
    ? payload.translations
    : undefined;
  existing.slug = await uniqueSlug(Post, payload.title, String(existing._id));
  if (wasDraft && payload.status === 'published') existing.publishedAt = new Date();
  if (payload.status === 'draft') existing.publishedAt = null;

  await existing.save();
  return json({ post: serialize(existing.toObject()) });
}

async function deletePost(req: Request, context: Context, slug: string) {
  if (!verifyAdmin(req, context)) return json({ error: 'Unauthorized' }, { status: 401 });

  const { Post, Comment } = await connectDb();
  const post = await Post.findOneAndDelete({ slug });
  if (!post) return json({ error: 'Post not found' }, { status: 404 });
  await Comment.deleteMany({ postSlug: slug });

  return json({ ok: true });
}

export default async (req: Request, context: Context) => {
  const slug = context.params.slug;

  try {
    if (req.method === 'GET') return slug ? getPost(req, context, slug) : listPosts(req, context);
    if (req.method === 'POST' && !slug) return createPost(req, context);
    if (req.method === 'PATCH' && slug) return reorderPost(req, context, slug);
    if (req.method === 'PUT' && slug) return updatePost(req, context, slug);
    if (req.method === 'DELETE' && slug) return deletePost(req, context, slug);
    return methodNotAllowed(slug ? ['GET', 'PATCH', 'PUT', 'DELETE'] : ['GET', 'POST']);
  } catch (err) {
    return errorResponse(err, 'posts');
  }
};

export const config: Config = {
  path: ['/api/posts', '/api/posts/:slug'],
};
