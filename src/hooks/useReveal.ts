import { useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Auto-tag content inside <main> with reveal classes.
 * Conservative: only tags elements that don't already sit inside a
 * `.reveal` / `.reveal-group` ancestor, so existing animations are
 * untouched.
 */
function autoTag() {
  const main = document.querySelector('main');
  if (!main) return;

  const hasRevealAncestor = (el: Element): boolean => {
    let cur: Element | null = el.parentElement;
    while (cur && cur !== main) {
      if (cur.classList.contains('reveal') || cur.classList.contains('reveal-group')) return true;
      cur = cur.parentElement;
    }
    return false;
  };

  const isReveal = (el: Element) =>
    el.classList.contains('reveal') || el.classList.contains('reveal-group');

  // Headings: fade-up
  main.querySelectorAll<HTMLElement>('h1, h2, h3').forEach((el) => {
    if (isReveal(el) || hasRevealAncestor(el)) return;
    el.classList.add('reveal');
  });

  // Paragraphs: fade-up (only direct children of section/main/article to avoid noise inside nested cards)
  main.querySelectorAll<HTMLElement>('section > p, main > p, article > p').forEach((el) => {
    if (isReveal(el) || hasRevealAncestor(el)) return;
    el.classList.add('reveal');
  });

  // Images & figures: scale-in
  main.querySelectorAll<HTMLElement>('img, figure, picture').forEach((el) => {
    if (isReveal(el) || hasRevealAncestor(el)) return;
    el.classList.add('reveal', 'reveal--scale');
  });

  // Cards / tiles / project items — common naming patterns: scale-in
  const cardSelectors = [
    '.card', '.pkg-card', '.trade-chip', '.heat-card', '.proj', '.g-card',
    '.stat', '.faq__item', '.tile', '.feature', '.benefit',
  ].join(',');
  main.querySelectorAll<HTMLElement>(cardSelectors).forEach((el) => {
    if (isReveal(el) || hasRevealAncestor(el)) return;
    el.classList.add('reveal', 'reveal--scale');
  });

  // Grids / lists of cards: turn the parent into a reveal-group so its items stagger
  const groupSelectors = [
    '.packages__grid', '.heating__grid', '.trades-preview__grid',
    '.stats__grid', '.faq__list', '.proj-grid', '.cards', '.tiles',
  ].join(',');
  main.querySelectorAll<HTMLElement>(groupSelectors).forEach((el) => {
    if (isReveal(el) || hasRevealAncestor(el)) return;
    el.classList.add('reveal-group');
  });
}

export function useReveal() {
  const { pathname } = useLocation();

  // Tag elements synchronously before paint to avoid a flash of visible
  // content that then dims when reveal classes are added.
  useLayoutEffect(() => {
    document.body.classList.add('js-reveal');
    autoTag();
  }, [pathname]);

  useEffect(() => {
    const targetSelector = '.reveal:not(.is-in), .reveal-group:not(.is-in)';
    let io: IntersectionObserver | null = null;

    const reveal = (el: Element) => {
      el.classList.add('is-in');
      io?.unobserve(el);
    };

    const revealAll = () => {
      document.querySelectorAll<HTMLElement>('.reveal, .reveal-group').forEach(reveal);
    };

    const revealIfVisible = () => {
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const revealLine = viewportHeight * 0.9;
      document.querySelectorAll<HTMLElement>(targetSelector).forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < revealLine && rect.bottom > 0) {
          reveal(el);
        }
      });
    };

    let revealFrame = 0;
    const scheduleRevealIfVisible = () => {
      if (revealFrame) return;
      revealFrame = window.requestAnimationFrame(() => {
        revealFrame = 0;
        revealIfVisible();
      });
    };

    if (typeof window.IntersectionObserver !== 'function') {
      autoTag();
      revealAll();

      const fallbackMo = new MutationObserver(() => {
        if (revealFrame) return;
        revealFrame = window.requestAnimationFrame(() => {
          revealFrame = 0;
          autoTag();
          revealAll();
        });
      });

      fallbackMo.observe(document.body, { childList: true, subtree: true });

      return () => {
        if (revealFrame) window.cancelAnimationFrame(revealFrame);
        fallbackMo.disconnect();
      };
    }

    io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            reveal(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0 },
    );

    const observeAll = () => {
      document.querySelectorAll<HTMLElement>(targetSelector).forEach((el) => io?.observe(el));
    };

    autoTag();
    observeAll();
    revealIfVisible();
    // The IntersectionObserver handles reveal-on-scroll on its own. We
    // deliberately do NOT add a scroll listener here — running
    // getBoundingClientRect() over every element on each scroll frame caused
    // noticeable stutter on touch devices. Resize/orientation still re-check
    // because those change which elements are in view without scrolling.
    window.addEventListener('resize', scheduleRevealIfVisible);
    window.addEventListener('orientationchange', scheduleRevealIfVisible);

    let scheduled = false;
    const mo = new MutationObserver(() => {
      if (scheduled) return;
      scheduled = true;
      // Coalesce rapid mutations into one autoTag/observe pass per frame.
      requestAnimationFrame(() => {
        scheduled = false;
        autoTag();
        observeAll();
        revealIfVisible();
      });
    });

    // Only watch for added/removed nodes (e.g. route content, lazy components).
    // We must NOT watch class attributes: reveal() adds the `is-in` class, which
    // would re-trigger this observer on every reveal — a feedback loop that
    // degrades scrolling on touch devices.
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      if (revealFrame) window.cancelAnimationFrame(revealFrame);
      io?.disconnect();
      mo.disconnect();
      window.removeEventListener('resize', scheduleRevealIfVisible);
      window.removeEventListener('orientationchange', scheduleRevealIfVisible);
    };
  }, [pathname]);
}
