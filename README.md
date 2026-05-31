# Prima Vista Bauprojekte

Editorial website for Prima Vista Bauprojekte — a premium renovation & construction company (Frankfurt & Emmenbrücke).

Built as a React SPA with a cream-and-copper aesthetic, Cormorant Garamond + Manrope + Inter, scroll reveals, animated counters, lightbox gallery, and a filterable projects grid. It now features an AI Chat assistant, a Cost Calculator, and a Quick Offer (Blitz-Angebot) form.

## Features

- **Comprehensive Service Pages:** Detailed pages for all trades (Gewerke) and complete packages (Komplett-Pakete).
- **Kalkulator:** Interactive cost calculator for renovations and heating methods.
- **Blitz-Angebot:** Quick offer form with email notifications.
- **AI Chat Assistant:** Integrated AI chat using the Anthropic API to answer customer queries.
- **Magazin + Admin:** Serverless blog with public articles, likes, comments, and an authenticated TipTap authoring area.
- **Serverless API:** Email delivery via Resend and AI chat endpoints powered by Netlify Functions.
- **Custom Dev Server:** Vite dev server is configured with custom middleware to mock serverless endpoints (`/api/chat`, `/api/contact`, `/api/blitz`) locally.

## Stack

- [Vite 5](https://vitejs.dev/) — dev server & build
- [React 18](https://react.dev/) + TypeScript
- [React Router 6](https://reactrouter.com/) — client-side routing
- [Anthropic SDK](https://github.com/anthropics/anthropic-sdk-typescript) — AI chat capabilities
- [Resend](https://resend.com/) — email delivery
- [MongoDB Atlas](https://www.mongodb.com/atlas) — blog storage
- [TipTap](https://tiptap.dev/) — admin rich-text editor
- [Netlify Functions](https://docs.netlify.com/functions/overview/) — serverless backend

## Scripts

```sh
npm install
npm run dev        # start dev server at http://localhost:5173 (includes custom API middleware)
npm run build      # type-check + production build to dist/
npm run preview    # preview the production build
npm run typecheck  # tsc --noEmit
npm run seed:admin # create the first admin user from env vars
npm run netlify:dev # run Vite through Netlify's local Functions runtime
```

## Environment Variables

To run the dev server with full functionality (Chat, Email), you need to set up the following environment variables in a `.env` file based on `.env.example`:

```env
ANTHROPIC_API_KEY=your_anthropic_api_key
RESEND_API_KEY=your_resend_api_key
MAIL_FROM=onboarding@resend.dev
MAIL_TO_OFFICE=your_email@example.com
MONGODB_URI=mongodb+srv://...
MONGODB_DB=prima_vista
JWT_SECRET=long-random-secret
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=strong-password-used-only-for-seeding
VITE_GOOGLE_CLIENT_ID=your-google-oauth-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_ID=your-google-oauth-client-id.apps.googleusercontent.com
ADMIN_GOOGLE_EMAIL=admin@example.com
```

## Blog admin

1. Create a free MongoDB Atlas M0 cluster and add `MONGODB_URI`, `MONGODB_DB`, and `JWT_SECRET` to Netlify environment variables.
2. Put `ADMIN_EMAIL` and `ADMIN_PASSWORD` in your local `.env` or pass them inline for one run.
3. Run `npm run seed:admin` to create the first admin user.
4. Open `/admin/login` and author posts from `/admin/blog`.

There is no public signup route. Admin users are created manually through the seed script.

For Google admin login, create a Google OAuth Web Client, add your site origins,
then set `VITE_GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_ID`, and `ADMIN_GOOGLE_EMAIL`.
Only that exact email is allowed to receive an admin session.

## Project structure

```
public/assets/           Static fonts and images (referenced by absolute /assets/... paths)
server/                  Serverless endpoint handlers (chat.ts, mail.ts)
netlify/                 Netlify configuration for serverless functions
src/
  main.tsx               Vite entry — mounts <App> in BrowserRouter
  App.tsx                Route table
  components/            Global UI components (Header, Footer, Layout, Chat, Counter, etc.)
    kalkulator/          Cost calculator sub-components
    blitz-angebot/       Quick offer sub-components
    ...                  Trade-specific sub-components
  hooks/                 Custom hooks (useReveal, useCounter, etc.)
  pages/                 Page components (Home, Kontakt, Projekte, various Gewerke/Pakete)
  styles/                CSS styling
    tokens.css           Design tokens (colors, type, space, motion) + @font-face
    global.css           Reset, type utilities, buttons, header/footer, social rail, lightbox
    pages/*.css          Per-page sections
```

## Conventions

- Design tokens live in `src/styles/tokens.css` as CSS custom properties (`--pv-*`). Global components in `src/styles/global.css`; per-page sections in `src/styles/pages/`.
- Images and fonts ship via `public/assets/`.
- The Vite config (`vite.config.ts`) includes custom plugins (`chatDevPlugin`, `mailDevPlugin`) that proxy API requests locally by dynamically loading `server/chat.ts` and `server/mail.ts` so you don't need a separate backend server during development.

## Legacy reference

`_legacy/` contains the original static HTML pages, the live-edit `tweaks-panel.jsx`, and the chat handoff notes (also under `chats/`) — kept for reference while diffing against the original design. They are not part of the build.
