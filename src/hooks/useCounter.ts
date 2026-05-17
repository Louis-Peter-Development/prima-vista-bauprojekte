import { useEffect, useRef, useState } from 'react';

export type CounterOptions = {
  target: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
};

const fmt = (n: number, decimals: number) =>
  n.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, '.');

/**
 * Animates from 0 → target with a cubic ease-out when the returned ref
 * scrolls into view. Returns the current formatted string.
 */
export function useCounter({
  target,
  decimals = 0,
  prefix = '',
  suffix = '',
  duration = 1600,
}: CounterOptions) {
  const ref = useRef<HTMLElement | null>(null);
  const [text, setText] = useState(prefix + fmt(0, decimals) + suffix);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let triggered = false;

    if (!('IntersectionObserver' in window)) {
      setText(prefix + fmt(target, decimals) + suffix);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !triggered) {
            triggered = true;
            io.unobserve(e.target);
            const start = performance.now();
            const tick = (now: number) => {
              const t = Math.min(1, (now - start) / duration);
              const eased = 1 - Math.pow(1 - t, 3);
              setText(prefix + fmt(target * eased, decimals) + suffix);
              if (t < 1) raf = requestAnimationFrame(tick);
            };
            raf = requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [target, decimals, prefix, suffix, duration]);

  return [ref, text] as const;
}
