# Prima Vista Bauprojekte

Editorial website for Prima Vista Bauprojekte — a premium renovation & construction company (Frankfurt & Emmenbrücke).

Five pages — Home, Gewerke, Komplett-Pakete, Projekte, Kontakt — built as a React SPA with a cream-and-copper aesthetic, Cormorant Garamond + Manrope + Inter, scroll reveals, animated counters, lightbox gallery, and a filterable projects grid.

## Stack

- [Vite 5](https://vitejs.dev/) — dev server & build
- [React 18](https://react.dev/) + TypeScript
- [React Router 6](https://reactrouter.com/) — client-side routing

## Scripts

```sh
npm install
npm run dev        # start dev server at http://localhost:5173
npm run build      # type-check + production build to dist/
npm run preview    # preview the production build
npm run typecheck  # tsc --noEmit
```

## Project structure

```
public/assets/           Static fonts and images (referenced by absolute /assets/... paths)
src/
  main.tsx               Vite entry — mounts <App> in BrowserRouter
  App.tsx                Route table
  components/
    Layout.tsx           Header + Footer + SocialRail + Chat + LightboxProvider wrapper
    Header.tsx           Sticky nav with active-state NavLinks
    Footer.tsx
    SocialRail.tsx       Fixed left-edge social icons
    ChatBubble.tsx       Fixed bottom-right chat button
    Lightbox.tsx         Context provider + modal for image galleries
    Counter.tsx          Wraps useCounter into a render-friendly element
    icons.tsx            Inline SVG icon components
  hooks/
    useReveal.ts         IntersectionObserver — adds `.is-in` to `.reveal` elements
    useCounter.ts        Eased number animation when the element scrolls into view
  pages/
    Home.tsx, Gewerke.tsx, KomplettPakete.tsx, Projekte.tsx, Kontakt.tsx
  styles/
    tokens.css           Design tokens (colors, type, space, motion) + @font-face
    global.css           Reset, type utilities, buttons, header/footer, social rail, lightbox
    pages/*.css          Per-page sections (extracted from the original embedded <style> blocks)
```

## Conventions

- Design tokens live in `src/styles/tokens.css` as CSS custom properties (`--pv-*`). Global components in `src/styles/global.css`; per-page sections in `src/styles/pages/`.
- Images and fonts ship via `public/assets/` so the legacy class-based styles work unchanged.
- Routes match the legacy filenames without the `.html` (e.g. `/komplett-pakete`).

## Legacy reference

`_legacy/` contains the original static HTML pages, the live-edit `tweaks-panel.jsx`, and the chat handoff notes (also under `chats/`) — kept for reference while diffing against the original design. They are not part of the build.
