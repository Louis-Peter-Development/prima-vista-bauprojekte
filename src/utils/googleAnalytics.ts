import { hasAdsMeasurementConsent, hasAnalyticsConsent, readConsent } from '../hooks/useConsent';

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
const completedLeadSubmissions = new WeakSet<object>();
const LEAD_FORM_NAMES = ['contact', 'quote', 'calculator'] as const;
export type LeadFormName = (typeof LEAD_FORM_NAMES)[number];

// Do not attach form values, link destinations, query strings or fragments.
function publicPageContext() {
  return {
    page_location: `${window.location.origin}${window.location.pathname}`,
    page_referrer: '',
    page_title: 'Prima Vista Bauprojekte',
  };
}

function analyticsAllowedNow() {
  // Read at dispatch time: a request may finish after consent was withdrawn.
  return hasAnalyticsConsent(readConsent());
}

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

function consentSignals(analyticsGranted: boolean, adsMeasurementGranted = false) {
  const adsGranted = analyticsGranted && adsMeasurementGranted;
  return {
    analytics_storage: analyticsGranted ? 'granted' : 'denied',
    ad_storage: adsGranted ? 'granted' : 'denied',
    ad_user_data: adsGranted ? 'granted' : 'denied',
    // Measurement does not authorize personalized advertising or remarketing.
    ad_personalization: 'denied',
  };
}

function applyCurrentConsent() {
  const consent = readConsent();
  window.gtag?.('consent', 'update', consentSignals(
    hasAnalyticsConsent(consent), hasAdsMeasurementConsent(consent),
  ));
}

function initializeGoogleAnalytics() {
  if (!GOOGLE_ANALYTICS_ID || typeof window === 'undefined' || typeof document === 'undefined') {
    return false;
  }
  if (!analyticsAllowedNow()) return false;
  if (googleAnalyticsInitialized) {
    // Consent may have changed while a form request was in flight, before the
    // React effect runs. Apply the current choice before dispatching an event.
    applyCurrentConsent();
    return true;
  }

  ensureDataLayer();
  // Queue defaults and the visitor's explicit choice before the Google loader
  // or config can send data. Legacy "accept all" never grants the new purpose.
  window.gtag?.('consent', 'default', consentSignals(false));
  window.gtag?.('set', 'ads_data_redaction', true);
  applyCurrentConsent();
  window.gtag?.('js', new Date());
  // Disable the automatic page_view; this is a SPA, so views are sent
  // explicitly per route via trackGoogleAnalyticsPageView (incl. the first one).
  window.gtag?.('config', GOOGLE_ANALYTICS_ID, {
    anonymize_ip: true,
    send_page_view: false,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });
  if (!document.getElementById(GTAG_SCRIPT_ID)) {
    const script = document.createElement('script');
    script.id = GTAG_SCRIPT_ID;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GOOGLE_ANALYTICS_ID)}`;
    document.head.append(script);
  }
  googleAnalyticsInitialized = true;
  return true;
}

export function updateGoogleAnalyticsConsent(granted: boolean, adsMeasurementGranted = false) {
  if (typeof window === 'undefined') return;

  if (granted) {
    if (initializeGoogleAnalytics()) {
      window.gtag?.('consent', 'update', consentSignals(
        true, adsMeasurementGranted && hasAdsMeasurementConsent(readConsent()),
      ));
    }
    return;
  }

  // Withdrawal: if GA was loaded earlier this session, tell it to stop using
  // analytics storage. If it was never loaded, there is nothing to disable.
  if (googleAnalyticsInitialized) {
    window.gtag?.('consent', 'update', consentSignals(false));
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

function sendInteraction(name: 'generate_lead' | 'contact_click', parameters: Record<string, string>) {
  if (!GOOGLE_ANALYTICS_ID || typeof window === 'undefined' || typeof document === 'undefined') return;
  if (!analyticsAllowedNow()) return;
  try {
    if (!initializeGoogleAnalytics()) return;
    window.gtag?.('event', name, {
      send_to: GOOGLE_ANALYTICS_ID,
      ...publicPageContext(),
      ...parameters,
    });
  } catch {
    // Optional measurement must never turn a successful enquiry into an error.
  }
}

/** Called by the actual success handler, never by a form-submit or state effect. */
export function trackGoogleAnalyticsLead(
  formName: LeadFormName,
  response: Pick<Response, 'ok'>,
  result: unknown,
  submission: object,
) {
  if (!LEAD_FORM_NAMES.includes(formName) || !response.ok) return;
  if (!result || typeof result !== 'object') return;
  const acknowledgement = result as Record<string, unknown>;
  if (acknowledgement.ok !== true || acknowledgement.spam === true || acknowledgement.duplicate === true) return;
  // Blitz can acknowledge a suppressed duplicate. Require its server decision.
  if (formName === 'quote' && acknowledgement.duplicate !== false) return;
  if (completedLeadSubmissions.has(submission)) return;
  // A repeated success must not become a new lead, even if consent changes later.
  completedLeadSubmissions.add(submission);
  sendInteraction('generate_lead', { form_name: formName });
}

/** One delegated listener covers existing links, including nested SVG icons. */
export function trackGoogleAnalyticsContactClick(event: MouseEvent) {
  if (event.defaultPrevented || event.button !== 0 || !(event.target instanceof Element)) return;
  const href = event.target.closest('a[href]')?.getAttribute('href')?.trim();
  if (!href) return;
  if (/^tel:/i.test(href)) {
    sendInteraction('contact_click', { contact_method: 'phone' });
    return;
  }
  try {
    const destination = new URL(href, window.location.origin);
    if (destination.protocol === 'whatsapp:' || (
      destination.protocol === 'https:' &&
      ['wa.me', 'www.wa.me', 'api.whatsapp.com', 'web.whatsapp.com'].includes(destination.hostname)
    )) {
      sendInteraction('contact_click', { contact_method: 'whatsapp' });
    }
  } catch {
    // Ignore malformed/non-contact links.
  }
}
