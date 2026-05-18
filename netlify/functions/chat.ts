import { createChatStream, type ChatMessage } from '../../server/chat.js';

type Body = { messages?: ChatMessage[] };

export default async (req: Request) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

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
