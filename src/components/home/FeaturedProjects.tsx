import { Link } from 'react-router-dom';
import { useLightbox, type LightboxItem } from '../Lightbox';
import { FEATURED_HOME_PROJECTS, FEATURED_HOME_TITLES } from '../../data/home';

export default function FeaturedProjects() {
  const { open } = useLightbox();
  const items: LightboxItem[] = FEATURED_HOME_PROJECTS.map((p) => ({ src: p.src, title: p.title }));

  return (
    <section className="featured">
      <div className="featured__head">
        <div className="reveal">
          <div className="eyebrow"><span className="rule-red"></span>&nbsp;&nbsp;Ausgewählte Projekte</div>
          <h2>
            Zuletzt aus der<br />
            <em>Werkstatt.</em>
          </h2>
        </div>
        <div className="meta reveal" data-delay="1">
          2024 — 2026<br />
          Frankfurt · Wiesbaden · Luzern
        </div>
      </div>

      <div className="featured__grid">
        {FEATURED_HOME_PROJECTS.map((p, i) => (
          <a
            key={p.src}
            className={`proj ${p.gridClass} reveal`}
            data-delay={p.revealDelay}
            href={p.src}
            onClick={(e) => {
              e.preventDefault();
              open(items, i);
            }}
          >
            <img src={p.src} alt={p.alt} />
            <div className="proj__cap">
              <span className="ttl">{FEATURED_HOME_TITLES[p.gridClass]}</span>
              <span className="yr">{p.year}</span>
            </div>
          </a>
        ))}
      </div>

      <div className="featured__more reveal">
        <Link className="btn btn--light" to="/projekte">
          Alle Projekte ansehen <span className="arrow">&gt;</span>
        </Link>
      </div>
    </section>
  );
}
