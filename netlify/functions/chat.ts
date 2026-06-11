import { createChatStream, type ChatMessage } from '../../server/chat.js';
import { methodNotAllowed } from './_shared/http';
import { checkRateLimit, rateLimitResponse } from './_shared/rate-limit';

type Body = { messages?: ChatMessage[] };

export default async (req: Request) => {
  if (req.method !== 'POST') {
    return methodNotAllowed(['POST']);
  }

  const rateLimit = checkRateLimit(req, {
    key: 'chat',
    limit: 12,
    windowMs: 10 * 60 * 1000,
  });
  if (!rateLimit.ok) return rateLimitResponse(rateLimit);

  let body: Body;
  try {
    body = await req.json();
  } catch {
    return new Response('Invalid JSON', { status: 400 });
  }

  const messages = (body.messages ?? []).filter(
    (m) =>
      m &&
      (m.role === 'user' || m.role === 'assistant') &&
      typeof m.content === 'string' &&
      m.content.length > 0,
  );

  if (!messages.length) {
    return new Response('No messages', { status: 400 });
  }

  const stream = createChatStream(messages);
  return new Response(stream, {
    headers: {
      'content-type': 'text/event-stream; charset=utf-8',
      'cache-control': 'no-cache, no-transform',
      'x-accel-buffering': 'no',
    },
  });
};

export const config = { path: '/api/chat' };
