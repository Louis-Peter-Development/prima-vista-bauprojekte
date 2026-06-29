import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/components/error-boundary.css';

type ErrorStrings = {
  eyebrow: string;
  title: string;
  lede: string;
  reload: string;
  home: string;
};

// Self-contained copy (no i18next dependency): this fallback may render when the
// app — including the i18n provider — has failed to load. Locale is derived from
// the URL prefix.
const ERROR_STRINGS: Record<'de' | 'en' | 'it' | 'fr', ErrorStrings> = {
  de: {
    eyebrow: 'Fehler beim Laden',
    title: 'Diese Seite konnte nicht sauber geladen werden.',
    lede: 'Vermutlich ist noch eine alte Browser-Version der Website aktiv. Laden Sie die Seite neu, damit Chrome oder Safari die aktuelle Fassung abruft.',
    reload: 'Neu laden',
    home: 'Zur Startseite',
  },
  en: {
    eyebrow: 'Loading error',
    title: 'This page could not load cleanly.',
    lede: 'An older cached version of the site is probably still active. Reload the page so Chrome or Safari fetches the current version.',
    reload: 'Reload',
    home: 'Back to home',
  },
  it: {
    eyebrow: 'Errore di caricamento',
    title: 'Questa pagina non è stata caricata correttamente.',
    lede: 'Probabilmente è ancora attiva una versione precedente del sito nella cache. Ricarichi la pagina così Chrome o Safari recuperano la versione aggiornata.',
    reload: 'Ricarica',
    home: 'Alla home page',
  },
  fr: {
    eyebrow: 'Erreur de chargement',
    title: "Cette page n'a pas pu se charger correctement.",
    lede: "Une ancienne version du site est probablement encore active dans le cache. Rechargez la page pour que Chrome ou Safari récupèrent la version actuelle.",
    reload: 'Recharger',
    home: "Retour à l'accueil",
  },
};

type ErrorBoundaryProps = {
  children: ReactNode;
  resetKey: string;
  strings: ErrorStrings;
  homeHref: string;
};

type ErrorBoundaryState = {
  error: Error | null;
};

async function clearBrowserStateAndReload() {
  try {
    if ('serviceWorker' in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      await Promise.all(registrations.map((registration) => registration.unregister()));
    }

    if ('caches' in window) {
      const cacheKeys = await caches.keys();
      await Promise.all(cacheKeys.map((key) => caches.delete(key)));
    }
  } finally {
    window.location.reload();
  }
}

class ErrorBoundaryInner extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Prima Vista route error', error, info);
  }

  componentDidUpdate(previousProps: ErrorBoundaryProps) {
    if (previousProps.resetKey !== this.props.resetKey && this.state.error) {
      this.setState({ error: null });
    }
  }

  render() {
    if (!this.state.error) return this.props.children;

    const { strings, homeHref } = this.props;
    return (
      <main className="app-error" role="alert" aria-labelledby="app-error-title">
        <section className="app-error__inner">
          <p className="app-error__eyebrow">{strings.eyebrow}</p>
          <h1 id="app-error-title">{strings.title}</h1>
          <p className="app-error__lede">{strings.lede}</p>
          <div className="app-error__actions">
            <button className="btn btn--solid" type="button" onClick={() => void clearBrowserStateAndReload()}>
              {strings.reload} <span className="arrow">&gt;</span>
            </button>
            <Link className="btn btn--dark" to={homeHref}>
              {strings.home} <span className="arrow">&gt;</span>
            </Link>
          </div>
        </section>
      </main>
    );
  }
}

export default function ErrorBoundary({ children }: { children: ReactNode }) {
  const location = useLocation();
  const locale = location.pathname.startsWith('/en')
    ? 'en'
    : location.pathname.startsWith('/it')
      ? 'it'
      : location.pathname.startsWith('/fr')
        ? 'fr'
        : 'de';
  const homeHref = locale === 'de' ? '/' : `/${locale}`;
  return (
    <ErrorBoundaryInner
      resetKey={`${location.pathname}${location.search}`}
      strings={ERROR_STRINGS[locale]}
      homeHref={homeHref}
    >
      {children}
    </ErrorBoundaryInner>
  );
}
