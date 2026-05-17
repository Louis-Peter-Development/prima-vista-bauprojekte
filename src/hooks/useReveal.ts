import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Observes any `.reveal` elements inside the document and adds `.is-in`
 * when they intersect the viewport. Mirrors the legacy site.js behavior.
 * Re-runs on route change so newly mounted pages animate in.
 */
export function useReveal() {
  const { pathname } = useLocation();

  useEffect(() => {
    const reveals = document.querySelectorAll<HTMLElement>('.reveal');
    if (!reveals.length) return;

    if (!('IntersectionObserver' in window)) {
      reveals.forEach((el) => el.classList.add('is-in'));
      return;
    }

    document.body.classList.add('js-reveal');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.01 },
    );
    reveals.forEach((el) => io.observe(el));

    const safety = window.setTimeout(() => {
      reveals.forEach((el) => el.classList.add('is-in'));
    }, 1500);

    return () => {
      io.disconnect();
      window.clearTimeout(safety);
    };
  }, [pathname]);
}
