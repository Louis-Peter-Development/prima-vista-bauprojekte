import type { IncomingMessage, ServerResponse } from 'node:http';
import { defineConfig, loadEnv, type Plugin, type ViteDevServer } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

function chatDevPlugin(): Plugin {
  return {
    name: 'pv-chat-dev',
    configureServer(server) {
      server.middlewares.use('/api/chat', async (req, res, next) => {
        if (req.method !== 'POST') return next();
        try {
          const chunks: Buffer[] = [];
          for await (const c of req as AsyncIterable<Buffer>) chunks.push(c);
          const body = JSON.parse(Buffer.concat(chunks).toString('utf8'));
          const mod = await server.ssrLoadModule('/server/chat.ts');
          const stream: ReadableStream<Uint8Array> = mod.createChatStream(
            body.messages ?? [],
          );
          res.writeHead(200, {
            'content-type': 'text/event-stream; charset=utf-8',
            'cache-control': 'no-cache, no-transform',
          });
          const reader = stream.getReader();
          while (true) {
            const { value, done } = await reader.read();
            if (done) break;
            res.write(Buffer.from(value));
          }
          res.end();
        } catch (err) {
          const message = err instanceof Error ? err.message : String(err);
          res.writeHead(500, { 'content-type': 'text/plain' });
          res.end(message);
        }
      });
    },
  };
}

async function readJson(req: IncomingMessage): Promise<unknown> {
  const chunks: Buffer[] = [];
  for await (const c of req as AsyncIterable<Buffer>) chunks.push(c);
  return JSON.parse(Buffer.concat(chunks).toString('utf8'));
}

function sendJson(res: ServerResponse, status: number, body: unknown) {
  res.writeHead(status, { 'content-type': 'application/json' });
  res.end(JSON.stringify(body));
}

/**
 * Dev-only middleware that mirrors the /api/contact and /api/blitz Netlify
 * functions so the forms work against `npm run dev`. The real prod path is
 * the Netlify functions in netlify/functions/.
 */
function mailDevPlugin(): Plugin {
  type MailModule = typeof import('./server/mail');

  const handle = (
    server: ViteDevServer,
    method: keyof Pick<MailModule, 'sendKontaktEmails' | 'sendBlitzEmails'>,
  ) => async (req: IncomingMessage, res: ServerResponse, next: () => void) => {
    if (req.method !== 'POST') return next();
    try {
      const body = await readJson(req);
      const mod = (await server.ssrLoadModule('/server/mail.ts')) as MailModule;
      // We re-validate on the function side; here we just forward.
      await (mod[method] as (p: unknown) => Promise<void>)(body);
      sendJson(res, 200, { ok: true });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error(`[mail-dev:${method}]`, message);
      sendJson(res, 500, { error: 'Send failed', detail: message });
    }
  };

  return {
    name: 'pv-mail-dev',
    configureServer(server) {
      server.middlewares.use('/api/contact', handle(server, 'sendKontaktEmails'));
      server.middlewares.use('/api/blitz', handle(server, 'sendBlitzEmails'));
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  for (const key of ['ANTHROPIC_API_KEY', 'RESEND_API_KEY', 'MAIL_FROM', 'MAIL_TO_OFFICE'] as const) {
    if (env[key]) process.env[key] = env[key];
  }
  return {
    plugins: [
      react(),
      chatDevPlugin(),
      mailDevPlugin(),
      VitePWA({
        registerType: 'autoUpdate',
        injectRegister: 'auto',
        includeAssets: [
          'assets/icons/apple-touch-icon.png',
          'assets/img/logo.png',
          'robots.txt',
        ],
        manifest: {
          name: 'Prima Vista Bauprojekte',
          short_name: 'Prima Vista',
          description:
            'Sanierung & Renovierung aus einer Hand — für Wohnsitz und Gastronomie, in Frankfurt und Emmenbrücke.',
          theme_color: '#1a1a1a',
          background_color: '#e8dfdf',
          display: 'standalone',
          orientation: 'portrait',
          scope: '/',
          start_url: '/',
          lang: 'de',
          categories: ['business', 'lifestyle'],
          icons: [
            {
              src: '/assets/icons/icon-192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: '/assets/icons/icon-512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: '/assets/icons/icon-512-maskable.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
          ],
        },
        workbox: {
          // Cap files at 4 MB so Workbox doesn't refuse our larger WebP heroes.
          maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
          globPatterns: ['**/*.{js,css,html,woff2,webp,svg,png,ico}'],
          navigateFallback: '/index.html',
          // Don't fall back to index.html for API or function URLs.
          navigateFallbackDenylist: [/^\/api\//, /^\/\.netlify\//],
          runtimeCaching: [
            {
              urlPattern: ({ request }) => request.destination === 'image',
              handler: 'CacheFirst',
              options: {
                cacheName: 'pv-images',
                expiration: { maxEntries: 80, maxAgeSeconds: 60 * 60 * 24 * 30 },
                cacheableResponse: { statuses: [0, 200] },
              },
            },
            {
              urlPattern: ({ request }) => request.destination === 'font',
              handler: 'CacheFirst',
              options: {
                cacheName: 'pv-fonts',
                expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
                cacheableResponse: { statuses: [0, 200] },
              },
            },
          ],
        },
        devOptions: {
          // Keep the SW off during dev so HMR isn't intercepted.
          enabled: false,
        },
      }),
    ],
    server: { host: true, port: Number(process.env.PORT) || 5173, strictPort: !!process.env.PORT, open: !process.env.PORT },
  };
});
