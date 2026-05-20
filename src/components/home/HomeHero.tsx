import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { HERO_IMAGES } from '../../data/home';

const PARALLAX_RANGE = 600;

export default function HomeHero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
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
        {HERO_IMAGES.map((src, i) => (
          <div
            key={src}
            className={`hero__bg-slide ${i === currentSlide ? 'is-active' : ''}`}
            style={{ backgroundImage: `url(${src})` }}
          />
        ))}
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
            <div className="hero__meta-num">01 — Editorial</div>
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
