import { createChatStream, type ChatMessage } from '../../server/chat.js';
import { methodNotAllowed } from './_shared/http';
import { checkRateLimit, rateLimitResponse } from './_shared/rate-limit';

type Body = { messages?: ChatMessage[]; locale?: string };

const SUPPORTED_LOCALES = ['de', 'en', 'it'] as const;
type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

function normalizeLocale(value: unknown): SupportedLocale {
  return SUPPORTED_LOCALES.includes(value as SupportedLocale)
    ? (value as SupportedLocale)
    : 'de';
}

// Bound the input forwarded to the LLM so a single request can't run up an
// unbounded Anthropic bill (denial-of-wallet). The rate limit caps request
// count; these cap the size of each request.
const MAX_MESSAGES = 24;
const MAX_MESSAGE_CHARS = 8_000;
const MAX_TOTAL_CHARS = 24_000;

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

  if (messages.some((m) => m.content.length > MAX_MESSAGE_CHARS)) {
    return new Response('Message too long', { status: 413 });
  }

  // Keep only the most recent turns and bound the total forwarded payload.
  const trimmed = messages.slice(-MAX_MESSAGES);
  const totalChars = trimmed.reduce((sum, m) => sum + m.content.length, 0);
  if (totalChars > MAX_TOTAL_CHARS) {
    return new Response('Conversation too long', { status: 413 });
  }

  const stream = createChatStream(trimmed, normalizeLocale(body.locale));
  return new Response(stream, {
    headers: {
      'content-type': 'text/event-stream; charset=utf-8',
      'cache-control': 'no-cache, no-transform',
      'x-accel-buffering': 'no',
    },
  });
};

export const config = { path: '/api/chat' };
