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
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll<HTMLElement>('.reveal, .reveal-group').forEach((el) => el.classList.add('is-in'));
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

    const observeAll = () => {
      document.querySelectorAll<HTMLElement>('.reveal:not(.is-in), .reveal-group:not(.is-in)').forEach((el) => io.observe(el));
    };

    observeAll();

    const mo = new MutationObserver(() => {
      observeAll();
    });

    mo.observe(document.body, { childList: true, subtree: true });

    const safety = window.setTimeout(() => {
      document.querySelectorAll<HTMLElement>('.reveal:not(.is-in), .reveal-group:not(.is-in)').forEach((el) => {
        el.classList.add('is-in');
        io.unobserve(el);
      });
    }, 1500);

    return () => {
      io.disconnect();
      mo.disconnect();
      window.clearTimeout(safety);
    };
  }, [pathname]);
}
