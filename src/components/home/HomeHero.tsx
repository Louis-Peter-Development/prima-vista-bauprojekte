import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { HERO_SLIDES } from '../../data/home';

const PARALLAX_RANGE = 600;
/** Stay on slide 1 long enough that LCP measurement settles before the
 *  first rotation. Without this delay the rotation moves the LCP candidate
 *  onto slide 2 (which is lazy + low-priority), tanking the metric. */
const FIRST_ROTATION_DELAY = 7000;
const ROTATION_INTERVAL = 5000;

export default function HomeHero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  /** Which slides have been mounted into the DOM. Starts with just the
   *  first slide so subsequent slides don't compete for bandwidth or
   *  trigger Lighthouse to pick a later, low-priority image as LCP. */
  const [mountedSlides, setMountedSlides] = useState<Set<number>>(() => new Set([0]));
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    const advance = () => {
      setCurrentSlide((prev) => {
        const next = (prev + 1) % HERO_SLIDES.length;
        setMountedSlides((s) => (s.has(next) ? s : new Set(s).add(next)));
        return next;
      });
    };
    const start = setTimeout(() => {
      advance();
      interval = setInterval(advance, ROTATION_INTERVAL);
    }, FIRST_ROTATION_DELAY);
    return () => {
      clearTimeout(start);
      if (interval) clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const y = Math.min(Math.max(window.scrollY, 0), PARALLAX_RANGE);
      el.style.setProperty('--pv-hero-scroll', String(y / PARALLAX_RANGE));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero__bg-slideshow">
        {HERO_SLIDES.map((slide, i) => {
          if (!mountedSlides.has(i)) return null;
          const isFirst = i === 0;
          const base = `/assets/img/hero/${slide.name}`;
          return (
            <picture
              key={slide.name}
              className={`hero__bg-slide ${i === currentSlide ? 'is-active' : ''}`}
            >
              <source
                type="image/avif"
                srcSet={`${base}-600.avif 600w, ${base}-800.avif 800w, ${base}-1600.avif 1600w`}
                sizes="100vw"
              />
              <source
                type="image/webp"
                srcSet={`${base}-600.webp 600w, ${base}-800.webp 800w, ${base}-1600.webp 1600w`}
                sizes="100vw"
              />
              <img
                src={`${base}-1600.webp`}
                alt={isFirst ? slide.alt : ''}
                aria-hidden={isFirst ? undefined : true}
                loading={isFirst ? 'eager' : 'lazy'}
                {...{ fetchpriority: isFirst ? 'high' : 'low' }}
                decoding={isFirst ? 'sync' : 'async'}
                width="1600"
                height="1000"
              />
            </picture>
          );
        })}
        <div className="hero__bg-overlay"></div>
      </div>

      <div className="hero__inner">
        <div className="hero__topline animate-in">
          <span><span className="dot"></span>Frankfurt &amp; Emmenbrücke</span>
          <span>Sanierung &amp; Renovierung — Bauprojekte seit 2014</span>
          <span>N° 26 / Frühjahr 2026</span>
        </div>

        <h1 className="hero__headline animate-in" data-delay="1">
          <span className="hero__headline-line"><em>Eine</em> Vision.</span>
          <span className="hero__headline-line"><em>Eine</em> Adresse.</span>
          <span className="hero__headline-line"><em>Ein</em> Team.</span>
        </h1>

        <div className="hero__meta animate-in" data-delay="2">
          <div>
            <div className="hero__meta-num">01 — Versprechen</div>
            <p className="hero__lede">
              <strong>Komplettsanierung aus einer Hand</strong> — vom Konzept bis zur Schlüsselübergabe. Wir verantworten jedes Gewerk: Festpreis, fester Endtermin, fünf Jahre Werksgewähr.
            </p>
          </div>
          <div></div>
          <div className="hero__cta">
            <small>Termin in 48 Stunden</small>
            <Link className="btn btn--light" to="/kontakt">
              Termin vereinbaren <span className="arrow">&gt;</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
