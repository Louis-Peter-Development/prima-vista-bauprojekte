const CALCULATOR_RESULT_SELECTOR = '[data-calculator-result]';
const FALLBACK_HEADER_HEIGHT = 88;
const TARGET_GAP = 24;

function getHeaderOffset(): number {
  if (typeof window === 'undefined') return FALLBACK_HEADER_HEIGHT;

  const rootValue = window
    .getComputedStyle(document.documentElement)
    .getPropertyValue('--pv-header-height');
  const parsed = Number.parseFloat(rootValue);
  return Number.isFinite(parsed) ? parsed : FALLBACK_HEADER_HEIGHT;
}

export function scrollToCalculatorResult() {
  if (typeof window === 'undefined') return;

  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      const target = document.querySelector<HTMLElement>(CALCULATOR_RESULT_SELECTOR);
      if (!target) return;

      const targetTop = target.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: Math.max(0, targetTop - getHeaderOffset() - TARGET_GAP),
        behavior: 'smooth',
      });
    });
  });
}
