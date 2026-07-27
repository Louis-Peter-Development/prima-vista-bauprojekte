import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

/** Reveals once the hero scrolls out of view and hides again once the
 *  footer is about to enter the viewport. Used by floating side elements
 *  (social rail, booking CTA) that should stay clear of the headline at
 *  the top of the page and the footer at the bottom.
 *
 *  Pages without a `.hero` element show the rail immediately; the footer
 *  rule still applies if a `.pv-footer` exists. */
export function useRevealMidPage() {
  const { pathname } = useLocation();
  const [heroOut, setHeroOut] = useState(
    () => typeof document === 'undefined' || !document.querySelector('.hero'),
  );
  const [footerNear, setFooterNear] = useState(false);

  useEffect(() => {
    const hero = document.querySelector('.hero');
    const footer = document.querySelector('.pv-footer');

    setHeroOut(!hero);
    setFooterNear(false);

    const observers: IntersectionObserver[] = [];

    if (hero) {
      const heroObs = new IntersectionObserver(
        ([entry]) => setHeroOut(entry.intersectionRatio < 0.1),
        { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] },
      );
      heroObs.observe(hero);
      observers.push(heroObs);
    }

    if (footer) {
      // rootMargin grows the viewport downward so the rail starts hiding
      // ~160px before the footer actually enters from the bottom edge.
      const footerObs = new IntersectionObserver(
        ([entry]) => setFooterNear(entry.isIntersecting),
        { rootMargin: '0px 0px 160px 0px', threshold: 0 },
      );
      footerObs.observe(footer);
      observers.push(footerObs);
    }

    return () => observers.forEach((o) => o.disconnect());
  }, [pathname]);

  return heroOut && !footerNear;
}
