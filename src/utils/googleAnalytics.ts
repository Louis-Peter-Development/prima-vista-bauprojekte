const GOOGLE_ANALYTICS_ID = import.meta.env.VITE_GOOGLE_ANALYTICS_ID?.trim();
const GTAG_SCRIPT_ID = 'pv-google-analytics';

type ConsentValue = 'granted' | 'denied';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

let defaultConsentInitialized = false;
let googleAnalyticsConfigured = false;
let scriptPromise: Promise<void> | null = null;

export function hasGoogleAnalyticsConfig() {
  return Boolean(GOOGLE_ANALYTICS_ID);
}

function ensureDataLayer() {
  window.dataLayer = window.dataLayer ?? [];
  window.gtag = window.gtag ?? function gtag(...args: unknown[]) {
    window.dataLayer?.push(args);
  };
}

export function initializeGoogleAnalyticsConsent() {
  if (typeof window === 'undefined' || defaultConsentInitialized) return;

  ensureDataLayer();
  window.gtag?.('consent', 'default', {
    ad_personalization: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    analytics_storage: 'denied',
  });
  window.gtag?.('set', 'ads_data_redaction', true);
  defaultConsentInitialized = true;
}

function loadGoogleAnalyticsScript() {
  if (!GOOGLE_ANALYTICS_ID || typeof document === 'undefined') {
    return Promise.resolve();
  }

  const existingScript = document.getElementById(GTAG_SCRIPT_ID);
  if (existingScript) return scriptPromise ?? Promise.resolve();
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    script.id = GTAG_SCRIPT_ID;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GOOGLE_ANALYTICS_ID)}`;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Google Analytics failed to load.'));
    document.head.append(script);
  });

  return scriptPromise;
}

async function configureGoogleAnalytics() {
  if (!GOOGLE_ANALYTICS_ID || typeof window === 'undefined') return false;
  if (googleAnalyticsConfigured) return true;

  initializeGoogleAnalyticsConsent();
  try {
    await loadGoogleAnalyticsScript();
  } catch (error) {
    console.warn(error);
    return false;
  }

  ensureDataLayer();
  window.gtag?.('js', new Date());
  window.gtag?.('config', GOOGLE_ANALYTICS_ID, {
    send_page_view: false,
  });
  googleAnalyticsConfigured = true;
  return true;
}

export function updateGoogleAnalyticsConsent(granted: boolean) {
  if (typeof window === 'undefined') return;

  initializeGoogleAnalyticsConsent();

  const analyticsStorage: ConsentValue = granted ? 'granted' : 'denied';
  window.gtag?.('consent', 'update', {
    analytics_storage: analyticsStorage,
  });

  if (granted) {
    void configureGoogleAnalytics();
  }
}

export async function trackGoogleAnalyticsPageView(path: string) {
  if (!GOOGLE_ANALYTICS_ID || typeof window === 'undefined') return;

  const configured = await configureGoogleAnalytics();
  if (!configured) return;

  window.gtag?.('event', 'page_view', {
    page_location: window.location.href,
    page_path: path,
    page_title: document.title,
  });
}
