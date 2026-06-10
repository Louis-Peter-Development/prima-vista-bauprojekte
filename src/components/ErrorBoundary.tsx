import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/components/error-boundary.css';

type ErrorBoundaryProps = {
  children: ReactNode;
  resetKey: string;
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

    return (
      <main className="app-error" role="alert" aria-labelledby="app-error-title">
        <section className="app-error__inner">
          <p className="app-error__eyebrow">Fehler beim Laden</p>
          <h1 id="app-error-title">Diese Seite konnte nicht sauber geladen werden.</h1>
          <p className="app-error__lede">
            Vermutlich ist noch eine alte Browser-Version der Website aktiv. Laden Sie die Seite neu, damit Chrome oder Safari die aktuelle Fassung abruft.
          </p>
          <div className="app-error__actions">
            <button className="btn btn--solid" type="button" onClick={() => void clearBrowserStateAndReload()}>
              Neu laden <span className="arrow">&gt;</span>
            </button>
            <Link className="btn btn--dark" to="/">
              Zur Startseite <span className="arrow">&gt;</span>
            </Link>
          </div>
        </section>
      </main>
    );
  }
}

export default function ErrorBoundary({ children }: { children: ReactNode }) {
  const location = useLocation();
  return (
    <ErrorBoundaryInner resetKey={`${location.pathname}${location.search}`}>
      {children}
    </ErrorBoundaryInner>
  );
}
