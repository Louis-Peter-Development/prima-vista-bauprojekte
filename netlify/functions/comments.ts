import type { Config, Context } from '@netlify/functions';
import { connectDb } from './_shared/db';
import { sanitizePlainText } from './_shared/content';
import { asString, json, methodNotAllowed, readJson } from './_shared/http';

function serialize(comment: {
  _id?: unknown;
  name: string;
  body: string;
  createdAt: Date;
}) {
  return {
    id: String(comment._id ?? ''),
    name: comment.name,
    body: comment.body,
    createdAt: comment.createdAt,
  };
}

async function listComments(slug: string) {
  const { Comment } = await connectDb();
  const comments = await Comment.find({ postSlug: slug, approved: true })
    .sort({ createdAt: 1 })
    .lean();

  return json({ comments: comments.map(serialize) });
}

async function createComment(req: Request, slug: string) {
  const body = await readJson(req);
  if (!body || typeof body !== 'object') return json({ error: 'Invalid body' }, { status: 400 });

  const record = body as Record<string, unknown>;
  const name = sanitizePlainText(asString(record.name), 80);
  const commentBody = sanitizePlainText(asString(record.body), 1200);
  if (!name) return json({ error: 'name is required' }, { status: 400 });
  if (!commentBody) return json({ error: 'body is required' }, { status: 400 });

  const { Post, Comment } = await connectDb();
  const post = await Post.findOne({ slug, status: 'published' }).select('_id').lean();
  if (!post) return json({ error: 'Post not found' }, { status: 404 });

  const comment = await Comment.create({
    postSlug: slug,
    name,
    body: commentBody,
    approved: true,
  });

  return json({ comment: serialize(comment.toObject()) }, { status: 201 });
}

export default async (req: Request, context: Context) => {
  const slug = context.params.slug;
  if (!slug) return json({ error: 'Missing slug' }, { status: 400 });

  try {
    if (req.method === 'GET') return listComments(slug);
    if (req.method === 'POST') return createComment(req, slug);
    return methodNotAllowed(['GET', 'POST']);
  } catch (err) {
    console.error('[comments]', err);
    const message = err instanceof Error ? err.message : 'Unexpected error';
    return json({ error: message }, { status: message === 'Invalid JSON' ? 400 : 500 });
  }
};

export const config: Config = {
  path: '/api/comments/:slug',
};
