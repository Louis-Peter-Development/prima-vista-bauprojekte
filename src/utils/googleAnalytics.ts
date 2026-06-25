const DEFAULT_GOOGLE_ANALYTICS_ID = 'G-ZSYN2EKHTF';
// Fall back to the built-in ID only in production builds, so `vite dev` (and
// any build without the env var) doesn't send hits to the live GA property.
// To silence analytics on a deploy-preview too, set VITE_GOOGLE_ANALYTICS_ID=""
// for that Netlify context.
const GOOGLE_ANALYTICS_ID = (
  import.meta.env.VITE_GOOGLE_ANALYTICS_ID
  ?? (import.meta.env.PROD ? DEFAULT_GOOGLE_ANALYTICS_ID : '')
).trim();
const GTAG_SCRIPT_ID = 'pv-google-analytics';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

let googleAnalyticsInitialized = false;
let lastTrackedPagePath: string | null = null;

export function hasGoogleAnalyticsConfig() {
  return Boolean(GOOGLE_ANALYTICS_ID);
}

function ensureDataLayer() {
  window.dataLayer = window.dataLayer ?? [];
  window.gtag = window.gtag ?? function gtag() {
    // Google's loader expects the official snippet's Arguments object here.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer?.push(arguments);
  };
}

function initializeGoogleAnalytics() {
  if (!GOOGLE_ANALYTICS_ID || typeof window === 'undefined' || typeof document === 'undefined') {
    return false;
  }
  if (googleAnalyticsInitialized) return true;

  ensureDataLayer();
  if (!document.getElementById(GTAG_SCRIPT_ID)) {
    const script = document.createElement('script');
    script.id = GTAG_SCRIPT_ID;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GOOGLE_ANALYTICS_ID)}`;
    document.head.append(script);
  }

  window.gtag?.('js', new Date());
  // Disable the automatic page_view; this is a SPA, so views are sent
  // explicitly per route via trackGoogleAnalyticsPageView (incl. the first one).
  window.gtag?.('config', GOOGLE_ANALYTICS_ID, {
    anonymize_ip: true,
    send_page_view: false,
  });
  googleAnalyticsInitialized = true;
  return true;
}

export function updateGoogleAnalyticsConsent(granted: boolean) {
  if (typeof window === 'undefined') return;

  if (granted) {
    if (initializeGoogleAnalytics()) {
      window.gtag?.('consent', 'update', { analytics_storage: 'granted' });
    }
    return;
  }

  // Withdrawal: if GA was loaded earlier this session, tell it to stop using
  // analytics storage. If it was never loaded, there is nothing to disable.
  if (googleAnalyticsInitialized) {
    window.gtag?.('consent', 'update', { analytics_storage: 'denied' });
  }
}

export function trackGoogleAnalyticsPageView(path: string) {
  if (!GOOGLE_ANALYTICS_ID || typeof window === 'undefined' || typeof document === 'undefined') return;

  const initialized = initializeGoogleAnalytics();
  if (!initialized) return;
  if (lastTrackedPagePath === path) return;

  window.gtag?.('event', 'page_view', {
    page_location: window.location.href,
    page_path: path,
    page_title: document.title,
  });
  lastTrackedPagePath = path;
}
