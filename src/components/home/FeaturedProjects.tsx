import { Trans, useTranslation } from 'react-i18next';
import { Link } from '../../i18n/Link';
import { FEATURED_HOME_PROJECTS, FEATURED_HOME_TITLES } from '../../data/home';
import { projectAnchorId } from '../projekte/ProjectGallery';

export default function FeaturedProjects() {
  const { t } = useTranslation('home');
  return (
    <section className="featured">
      <div className="featured__head">
        <div className="reveal">
          <div className="eyebrow"><span className="rule-red"></span>&nbsp;&nbsp;{t('featured.eyebrow')}</div>
          <h2>
            <Trans i18nKey="home:featured.title" components={{ em: <em />, br: <br /> }} />
          </h2>
        </div>
        <div className="meta reveal" data-delay="1">
          2024 — 2026<br />
          {t('featured.meta')}
        </div>
      </div>

      <div className="featured__grid">
        {FEATURED_HOME_PROJECTS.map((p) => (
          <Link
            key={p.src}
            className={`proj ${p.gridClass} reveal`}
            data-delay={p.revealDelay}
            to={`/projekte#${projectAnchorId(p.src)}`}
          >
            <img
              src={p.src}
              alt={t(`featured.projects.${p.gridClass}.alt`, { defaultValue: p.alt })}
              width={p.width}
              height={p.height}
              loading="lazy"
            />
            <div className="proj__cap">
              <span className="ttl">
                {t(`featured.projects.${p.gridClass}.ttl`, {
                  defaultValue: FEATURED_HOME_TITLES[p.gridClass],
                })}
              </span>
              <span className="yr">{p.year}</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="featured__more reveal">
        <Link className="btn btn--light" to="/projekte">
          {t('featured.viewAll')} <span className="arrow">&gt;</span>
        </Link>
      </div>
    </section>
  );
}
