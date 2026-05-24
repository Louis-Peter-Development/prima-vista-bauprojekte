import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Outlet, useLocation, useNavigationType } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import SocialRail from './SocialRail';
import Chat from './Chat';
import CookieConsent from './CookieConsent';
import { LightboxProvider } from './Lightbox';
import { useReveal } from '../hooks/useReveal';

const DESKTOP_MEDIA = '(min-width: 881px)';

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window === 'undefined' ? true : window.matchMedia(DESKTOP_MEDIA).matches,
  );
  useEffect(() => {
    const mql = window.matchMedia(DESKTOP_MEDIA);
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);
  return isDesktop;
}

function ScrollToTop() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const { hash, key, pathname, search, state } = location;
  const lastScrollByKey = useRef<Record<string, number>>({});
  const lastScrollByPath = useRef<Record<string, number>>({});
  const pathKey = `${pathname}${search}`;
  const currentKey = useRef(key);
  const currentPathKey = useRef(pathKey);

  const readSavedScroll = (storageKey: string) => {
    const value = window.sessionStorage.getItem(storageKey);
    if (value === null) return null;
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  };

  const writeScrollState = (scrollY: number) => {
    try {
      window.history.replaceState(
        { ...(window.history.state ?? {}), pvScrollY: scrollY },
        document.title,
      );
    } catch {
      // Keep the sessionStorage fallback when history state is unavailable.
    }
  };

  useLayoutEffect(() => {
    currentKey.current = key;
    currentPathKey.current = pathKey;
  }, [key, pathKey]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.history.scrollRestoration = 'manual';

    const saveCurrentScroll = () => {
      lastScrollByKey.current[currentKey.current] = window.scrollY;
      lastScrollByPath.current[currentPathKey.current] = window.scrollY;
      writeScrollState(window.scrollY);
      window.sessionStorage.setItem(`scroll:${currentKey.current}`, String(window.scrollY));
      window.sessionStorage.setItem(`scroll:${currentPathKey.current}`, String(window.scrollY));
    };

    document.addEventListener('click', saveCurrentScroll, true);
    window.addEventListener('pagehide', saveCurrentScroll);

    return () => {
      saveCurrentScroll();
      document.removeEventListener('click', saveCurrentScroll, true);
      window.removeEventListener('pagehide', saveCurrentScroll);
      window.history.scrollRestoration = 'auto';
    };
  }, []);

  useEffect(() => {
    const saveScroll = () => {
      lastScrollByKey.current[key] = window.scrollY;
      lastScrollByPath.current[pathKey] = window.scrollY;
      writeScrollState(window.scrollY);
      window.sessionStorage.setItem(`scroll:${key}`, String(window.scrollY));
      window.sessionStorage.setItem(`scroll:${pathKey}`, String(window.scrollY));
    };
    if (navigationType !== 'POP') saveScroll();
    window.addEventListener('scroll', saveScroll, { passive: true });

    return () => {
      saveScroll();
      window.removeEventListener('scroll', saveScroll);
    };
  }, [key, navigationType, pathKey]);

  useLayoutEffect(() => {
    if (hash) {
      const frame = window.requestAnimationFrame(() => {
        const target = document.getElementById(decodeURIComponent(hash.slice(1)));
        target?.scrollIntoView({ block: 'start', behavior: 'instant' as ScrollBehavior });
      });
      return () => window.cancelAnimationFrame(frame);
    }

    if (state && state.targetId) {
      const frame = window.requestAnimationFrame(() => {
        const target = document.getElementById(state.targetId);
        if (target) {
          // Force all reveal elements to be visible instantly to prevent a sluggish feeling
          document.querySelectorAll('.reveal, .reveal-group').forEach((el) => {
            const htmlEl = el as HTMLElement;
            htmlEl.style.transition = 'none';
            htmlEl.style.animation = 'none';
            htmlEl.classList.add('is-in');
          });
          target.scrollIntoView({ block: 'center', behavior: 'instant' as ScrollBehavior });
          
          // Cleanup inline styles after a moment so future reveals work
          setTimeout(() => {
            document.querySelectorAll('.reveal, .reveal-group').forEach((el) => {
              const htmlEl = el as HTMLElement;
              htmlEl.style.transition = '';
              htmlEl.style.animation = '';
            });
          }, 50);
        } else {
          window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
        }
      });
      return () => window.cancelAnimationFrame(frame);
    }

    if (navigationType === 'POP') {
      const frame = window.requestAnimationFrame(() => {
        const storedScroll = readSavedScroll(`scroll:${key}`);
        const storedPathScroll = readSavedScroll(`scroll:${pathKey}`);
        const historyScroll = window.history.state?.pvScrollY;
        const savedScroll = (typeof historyScroll === 'number' && Number.isFinite(historyScroll) ? historyScroll : null)
          ?? lastScrollByKey.current[key]
          ?? storedScroll
          ?? lastScrollByPath.current[pathKey]
          ?? storedPathScroll
          ?? 0;
        const restore = () => {
          window.scrollTo({ top: savedScroll, behavior: 'instant' as ScrollBehavior });
        };

        const restoreWhenReady = (attempt = 0) => {
          const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
          if (savedScroll <= maxScroll || attempt > 12) {
            restore();
            return;
          }
          window.requestAnimationFrame(() => restoreWhenReady(attempt + 1));
        };

        restoreWhenReady();
        if (savedScroll > 0) {
          window.setTimeout(restore, 100);
          window.setTimeout(restore, 300);
          window.setTimeout(restore, 700);
          window.setTimeout(restore, 1200);
        }
      });
      return () => window.cancelAnimationFrame(frame);
    }

    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [hash, key, navigationType, pathKey, pathname, state]);

  return null;
}

export default function Layout() {
  useReveal();
  const isDesktop = useIsDesktop();
  return (
    <LightboxProvider>
      <ScrollToTop />
      <Header />
      <main>
        <Outlet />
      </main>
      <SocialRail />
      {isDesktop && <Chat />}
      <CookieConsent />
      <Footer />
    </LightboxProvider>
  );
}
