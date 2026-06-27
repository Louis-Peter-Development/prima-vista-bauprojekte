import { useParams } from 'react-router-dom';
import { useMemo } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from '../i18n/Link';
import { PROJECTS } from '../data/projects';
import { useLightbox, type LightboxItem } from '../components/Lightbox';
import { projectAnchorId } from '../components/projekte/ProjectGallery';
import ProjectVideos from '../components/projekte/ProjectVideos';
import ProjectFeatureVideo from '../components/projekte/ProjectFeatureVideo';
import { usePageTitle } from '../hooks/usePageTitle';
import '../styles/pages/projekt-detail.css';

export default function ProjektDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation('projects');
  const { open } = useLightbox();

  const project = useMemo(() => PROJECTS.find((p) => p.slug === slug), [slug]);
  const detail = project?.detail;
  const base = `items.${slug}`;
  const headline = project ? t(`${base}.headline`, { defaultValue: project.ttl }) : '';

  usePageTitle(project ? `${headline} — ${t('detail.metaTitleSuffix')}` : t('detail.metaTitleSuffix'));

  if (!project || !detail) {
    return (
      <section className="pd-empty">
        <div className="pd-empty__inner">
          <h1>{t('detail.notFound')}</h1>
          <Link className="btn btn--solid" to="/projekte">{t('detail.notFoundBack')}</Link>
        </div>
      </section>
    );
  }

  const description = t(`${base}.description`, { returnObjects: true }) as string[];
  const gewerke = t(`${base}.gewerke`, { returnObjects: true }) as string[];
  const videoLabel = t(`${base}.videoLabel`, { defaultValue: '' });

  const lightboxItems: LightboxItem[] = detail.gallery.map((src, i) => ({
    src,
    title: `${headline} — ${i + 1} / ${detail.gallery.length}`,
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
            ← {t('detail.back')}
          </Link>
          <div className="pd-hero__text">
            <span className="pd-hero__num">{project.num}</span>
            <h1 className="pd-hero__headline">{headline}</h1>
            <span className="pd-hero__meta">{t(`${base}.meta`, { defaultValue: project.meta })}</span>
          </div>
        </div>
      </section>

      {/* Facts */}
      <section className="pd-facts">
        <div className="pd-facts__inner">
          <div className="pd-fact">
            <span className="pd-fact__label">{t('detail.factLocation')}</span>
            <span className="pd-fact__value">{t(`${base}.location`)}</span>
          </div>
          <div className="pd-fact">
            <span className="pd-fact__label">{t('detail.factYear')}</span>
            <span className="pd-fact__value">{detail.year}</span>
          </div>
          <div className="pd-fact">
            <span className="pd-fact__label">{t('detail.factArea')}</span>
            <span className="pd-fact__value">{t(`${base}.area`)}</span>
          </div>
          <div className="pd-fact">
            <span className="pd-fact__label">{t('detail.factDuration')}</span>
            <span className="pd-fact__value">{t(`${base}.duration`)}</span>
          </div>
          <div className="pd-fact">
            <span className="pd-fact__label">{t('detail.factScope')}</span>
            <span className="pd-fact__value">{t(`${base}.scope`)}</span>
          </div>
        </div>
      </section>

      {/* Feature film — shown prominently right after the hero/facts */}
      {detail.featuredVideo && (
        <ProjectFeatureVideo
          video={{ id: detail.featuredVideo.id, label: videoLabel || undefined }}
          headline={headline}
          poster={detail.heroImg}
        />
      )}

      {/* Description */}
      <section className="pd-body">
        <div className="pd-body__inner">
          <div className="pd-body__copy">
            <div className="eyebrow"><span className="rule-red"></span>&nbsp;&nbsp;{t('detail.aboutEyebrow')}</div>
            <h2>
              {headline}<br />
              <em>{t('detail.aboutTitleSuffix')}</em>
            </h2>
            {description.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="pd-body__gewerke">
            <h3>{t('detail.gewerkeHeading')}</h3>
            <ul>
              {gewerke.map((g, i) => (
                <li key={g}>
                  <span className="num">{String(i + 1).padStart(2, '0')}</span>
                  {g}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Videos — Rundgang */}
      {detail.videos && detail.videos.length > 0 && (
        <ProjectVideos videos={detail.videos} headline={headline} poster={detail.heroImg} />
      )}

      {/* Gallery */}
      {detail.gallery.length > 1 && (
        <section className="pd-gallery">
          <div className="pd-gallery__inner">
            <div className="eyebrow"><span className="rule-red"></span>&nbsp;&nbsp;{t('detail.galleryEyebrow')}</div>
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
                  <img src={src} alt={t('detail.imageAlt', { headline, n: i + 1 })} width="1600" height="1200" loading="lazy" />
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
              <span className="pd-nav__dir">← {t('detail.prev')}</span>
              <span className="pd-nav__title">{t(`items.${prev.slug}.ttl`, { defaultValue: prev.ttl })}</span>
            </Link>
          ) : <span />}
          {next ? (
            <Link className="pd-nav__link pd-nav__link--next" to={`/projekte/${next.slug}`}>
              <span className="pd-nav__dir">{t('detail.next')} →</span>
              <span className="pd-nav__title">{t(`items.${next.slug}.ttl`, { defaultValue: next.ttl })}</span>
            </Link>
          ) : <span />}
        </div>
      </section>

      {/* CTA */}
      <section className="pd-cta">
        <div className="pd-cta__inner">
          <h2><Trans i18nKey="projects:detail.ctaTitle" components={{ em: <em /> }} /></h2>
          <p>{t('detail.ctaText')}</p>
          <div className="pd-cta__buttons">
            <Link className="btn btn--solid" to="/blitz-angebot">
              {t('detail.ctaExpress')} <span className="arrow">&gt;</span>
            </Link>
            <Link className="btn btn--light" to="/kontakt">
              {t('detail.ctaAppointment')} <span className="arrow">&gt;</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
