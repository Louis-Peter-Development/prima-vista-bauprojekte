import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { ChevronDownIcon } from './icons';

const FOOTER_HIDE_MARGIN = 80;
const BOTTOM_EPSILON = 24;

export default function ScrollDownFloat() {
  const { t } = useTranslation('home');
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      raf = 0;
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const scrollHeight = document.documentElement.scrollHeight;
      const footer = document.querySelector('.pv-footer');
      const footerTop = footer instanceof HTMLElement
        ? footer.getBoundingClientRect().top
        : Number.POSITIVE_INFINITY;
      const canScrollMore = scrollY + viewportHeight < scrollHeight - BOTTOM_EPSILON;
      const footerReached = footerTop <= viewportHeight + FOOTER_HIDE_MARGIN;

      setVisible(canScrollMore && !footerReached);
    };

    const requestUpdate = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    const resizeObserver = typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(requestUpdate)
      : null;
    const mutationObserver = typeof MutationObserver !== 'undefined'
      ? new MutationObserver(requestUpdate)
      : null;

    resizeObserver?.observe(document.documentElement);
    if (document.body) {
      resizeObserver?.observe(document.body);
      mutationObserver?.observe(document.body, { childList: true, subtree: true });
    }

    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      resizeObserver?.disconnect();
      mutationObserver?.disconnect();
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [pathname]);

  const scrollDown = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const footer = document.querySelector('.pv-footer');
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    const step = viewportHeight * 0.78;
    const footerLimit = footer instanceof HTMLElement
      ? scrollY + footer.getBoundingClientRect().top - FOOTER_HIDE_MARGIN
      : document.documentElement.scrollHeight - viewportHeight;
    const target = Math.min(scrollY + step, footerLimit);

    window.scrollTo({
      top: Math.max(0, target),
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <button
      className={`pv-scroll-down${visible ? ' is-visible' : ''}`}
      type="button"
      onClick={scrollDown}
      aria-label={t('hero.scrollDown')}
    >
      <ChevronDownIcon aria-hidden="true" />
    </button>
  );
}
