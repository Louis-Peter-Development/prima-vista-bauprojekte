import type { Config, Context } from '@netlify/functions';
import { connectDb } from './_shared/db';
import { json, methodNotAllowed } from './_shared/http';

export default async (req: Request, context: Context) => {
  if (req.method !== 'POST') return methodNotAllowed(['POST']);
  const slug = context.params.slug;
  if (!slug) return json({ error: 'Missing slug' }, { status: 400 });

  try {
    const { Post } = await connectDb();
    const post = await Post.findOneAndUpdate(
      { slug, status: 'published' },
      { $inc: { views: 1 } },
      { new: true },
    ).lean();

    if (!post) return json({ error: 'Post not found' }, { status: 404 });
    return json({ views: post.views });
  } catch (err) {
    console.error('[views]', err);
    const message = err instanceof Error ? err.message : 'Unexpected error';
    return json({ error: message }, { status: 500 });
  }
};

export const config: Config = {
  path: '/api/views/:slug',
};
