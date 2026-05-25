import { Link, useParams } from 'react-router-dom';
import { useMemo } from 'react';
import { PROJECTS } from '../data/projects';
import { useLightbox, type LightboxItem } from '../components/Lightbox';
import { projectAnchorId } from '../components/projekte/ProjectGallery';
import { usePageTitle } from '../hooks/usePageTitle';
import '../styles/pages/projekt-detail.css';

export default function ProjektDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { open } = useLightbox();

  const project = useMemo(() => PROJECTS.find((p) => p.slug === slug), [slug]);
  const detail = project?.detail;

  usePageTitle(project ? `${project.ttl} — Projekt` : 'Projekt');

  if (!project || !detail) {
    return (
      <section className="pd-empty">
        <div className="pd-empty__inner">
          <h1>Projekt nicht gefunden.</h1>
          <Link className="btn btn--solid" to="/projekte">Zurück zur Übersicht</Link>
        </div>
      </section>
    );
  }

  const lightboxItems: LightboxItem[] = detail.gallery.map((src, i) => ({
    src,
    title: `${detail.headline} — ${i + 1} / ${detail.gallery.length}`,
  }));

  /* Find prev/next project */
  const currentIdx = PROJECTS.indexOf(project);
  const prev = currentIdx > 0 ? PROJECTS[currentIdx - 1] : null;
  const next = currentIdx < PROJECTS.length - 1 ? PROJECTS[currentIdx + 1] : null;

  return (
    <>
      {/* Hero — split */}
      <section className="pd-hero">
        <div className="pd-hero__bg" style={{ backgroundImage: `url(${detail.heroImg})` }} />
        <div className="pd-hero__content">
          <Link className="pd-hero__back" to="/projekte" state={{ targetId: projectAnchorId(project.src) }}>
            ← Alle Projekte
          </Link>
          <div className="pd-hero__text">
            <span className="pd-hero__num">{project.num}</span>
            <h1 className="pd-hero__headline">{detail.headline}</h1>
            <span className="pd-hero__meta">{project.meta}</span>
          </div>
        </div>
      </section>

      {/* Facts */}
      <section className="pd-facts">
        <div className="pd-facts__inner">
          <div className="pd-fact">
            <span className="pd-fact__label">Standort</span>
            <span className="pd-fact__value">{detail.location}</span>
          </div>
          <div className="pd-fact">
            <span className="pd-fact__label">Jahr</span>
            <span className="pd-fact__value">{detail.year}</span>
          </div>
          <div className="pd-fact">
            <span className="pd-fact__label">Fläche</span>
            <span className="pd-fact__value">{detail.area}</span>
          </div>
          <div className="pd-fact">
            <span className="pd-fact__label">Bauzeit</span>
            <span className="pd-fact__value">{detail.duration}</span>
          </div>
          <div className="pd-fact">
            <span className="pd-fact__label">Leistung</span>
            <span className="pd-fact__value">{detail.scope}</span>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="pd-body">
        <div className="pd-body__inner">
          <div className="pd-body__copy">
            <div className="eyebrow"><span className="rule-red"></span>&nbsp;&nbsp;Über das Projekt</div>
            <h2>
              {detail.headline}<br />
              <em>im Detail.</em>
            </h2>
            {detail.description.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="pd-body__gewerke">
            <h3>Beteiligte Gewerke</h3>
            <ul>
              {detail.gewerke.map((g, i) => (
                <li key={g}>
                  <span className="num">{String(i + 1).padStart(2, '0')}</span>
                  {g}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Gallery */}
      {detail.gallery.length > 1 && (
        <section className="pd-gallery">
          <div className="pd-gallery__inner">
            <div className="eyebrow"><span className="rule-red"></span>&nbsp;&nbsp;Galerie</div>
            <div className="pd-gallery__grid">
              {detail.gallery.map((src, i) => (
                <a
                  key={src}
                  className="pd-gallery__img"
                  href={src}
                  onClick={(e) => {
                    e.preventDefault();
                    open(lightboxItems, i);
                  }}
                >
                  <img src={src} alt={`${detail.headline} — Bild ${i + 1}`} width="1600" height="1200" loading="lazy" />
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Prev / Next */}
      <section className="pd-nav">
        <div className="pd-nav__inner">
          {prev ? (
            <Link className="pd-nav__link pd-nav__link--prev" to={`/projekte/${prev.slug}`}>
              <span className="pd-nav__dir">← Vorheriges Projekt</span>
              <span className="pd-nav__title">{prev.ttl}</span>
            </Link>
          ) : <span />}
          {next ? (
            <Link className="pd-nav__link pd-nav__link--next" to={`/projekte/${next.slug}`}>
              <span className="pd-nav__dir">Nächstes Projekt →</span>
              <span className="pd-nav__title">{next.ttl}</span>
            </Link>
          ) : <span />}
        </div>
      </section>

      {/* CTA */}
      <section className="pd-cta">
        <div className="pd-cta__inner">
          <h2>Ähnliches <em>Projekt?</em></h2>
          <p>Erzählen Sie uns davon — erste Beratung kostenlos, Termin innerhalb von 48 Stunden.</p>
          <div className="pd-cta__buttons">
            <Link className="btn btn--solid" to="/blitz-angebot">
              Blitz-Angebot <span className="arrow">&gt;</span>
            </Link>
            <Link className="btn btn--light" to="/kontakt">
              Termin vereinbaren <span className="arrow">&gt;</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
