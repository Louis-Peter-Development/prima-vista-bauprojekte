import { Trans, useTranslation } from 'react-i18next';
import { Link } from '../../i18n/Link';

const HERO_END_PHOTOS = [
  { key: 'rohbau', src: '/assets/img/leistungen/rohbau-trockenbau-01.webp', to: '/rohbau-abbruch', width: 1200, height: 900 },
  { key: 'bad', src: '/assets/img/projects/bad-soden-einfamilienhaus-07.webp', to: '/badsanierung', width: 1086, height: 1448 },
  { key: 'kueche', src: '/assets/img/projects/bad-soden-einfamilienhaus-05.webp', to: '/kuechen-moebelbau', width: 1448, height: 1086 },
  { key: 'gastro', src: '/assets/img/proj-restaurant-dining.webp', to: '/gastronomie-ausbau', width: 1448, height: 1086 },
] as const;

export default function HomeHeroPhotos() {
  const { t } = useTranslation('home');
  return (
    <section className="home-hero-photos" aria-label={t('heroPhotos.aria')}>
      <div className="home-hero-photos__head reveal">
        <div className="eyebrow"><span className="rule-red"></span>&nbsp;&nbsp;{t('heroPhotos.eyebrow')}</div>
        <h2><Trans i18nKey="home:heroPhotos.title" components={{ em: <em /> }} /></h2>
        <p>{t('heroPhotos.p')}</p>
      </div>
      <ul className="home-hero-photos__grid">
        {HERO_END_PHOTOS.map((photo) => (
          <li className="home-hero-photos__tile" key={photo.src}>
            <Link className="home-hero-photos__link" to={photo.to}>
              <img
                src={photo.src}
                alt={t(`heroPhotos.${photo.key}.alt`)}
                width={photo.width}
                height={photo.height}
                loading="lazy"
                decoding="async"
              />
              <span className="home-hero-photos__label">
                {t(`heroPhotos.${photo.key}.label`)}
                <svg className="home-hero-photos__arrow" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
