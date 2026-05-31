import type { Config, Context } from '@netlify/functions';
import { verifyAdmin } from './_shared/auth';
import { connectDb, type PostDocument, type PostModel } from './_shared/db';
import {
  excerptFromDoc,
  isTiptapDoc,
  readingTimeFromDoc,
  sanitizePlainText,
  uniqueSlug,
  type PostStatus,
  type TiptapDoc,
} from './_shared/content';
import { asString, json, methodNotAllowed, readJson } from './_shared/http';

type PostPayload = {
  title: string;
  author: string;
  coverImageUrl: string;
  body: TiptapDoc;
  status: PostStatus;
};

function serialize(post: PostDocument & { _id?: unknown }) {
  return {
    id: String(post._id ?? ''),
    title: post.title,
    slug: post.slug,
    author: post.author,
    coverImageUrl: post.coverImageUrl,
    body: post.body,
    excerpt: post.excerpt,
    readingTime: post.readingTime,
    status: post.status,
    sortOrder: post.sortOrder ?? 0,
    views: post.views,
    likes: post.likes,
    publishedAt: post.publishedAt,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
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

  return { title, author, coverImageUrl, body: tiptapBody, status };
}

async function listPosts(req: Request, context: Context) {
  const url = new URL(req.url);
  const wantsAll = url.searchParams.get('all') === 'true';
  const admin = verifyAdmin(req, context);
  const { Post } = await connectDb();
  const query: Partial<Pick<PostDocument, 'status'>> = wantsAll && admin ? {} : { status: 'published' };
  if (wantsAll && admin) await normalizeSortOrders(Post);

  const posts = await Post.find(query)
    .sort({ sortOrder: 1, publishedAt: -1, createdAt: -1 })
    .lean();

  return json({ posts: posts.map(serialize), isAdmin: !!admin });
}

async function getPost(req: Request, context: Context, slug: string) {
  const admin = verifyAdmin(req, context);
  const { Post } = await connectDb();
  const post = await Post.findOne({ slug }).lean();

  if (!post || (post.status !== 'published' && !admin)) {
    return json({ error: 'Post not found' }, { status: 404 });
  }

  return json({ post: serialize(post), isAdmin: !!admin });
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
    console.error('[posts]', err);
    const message = err instanceof Error ? err.message : 'Unexpected error';
    return json({ error: message }, { status: message === 'Invalid JSON' ? 400 : 500 });
  }
};

export const config: Config = {
  path: ['/api/posts', '/api/posts/:slug'],
};
