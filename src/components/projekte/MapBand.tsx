import { Trans, useTranslation } from 'react-i18next';
import SectionEyebrow from '../common/SectionEyebrow';

const COUNTRIES: Array<[string, string]> = [
  ['DE', 'germany'],
  ['CH', 'switzerland'],
];

export default function MapBand() {
  const { t } = useTranslation('projects');
  return (
    <section className="map-band">
      <div className="map-band__inner">
        <div className="reveal reveal--left">
          <SectionEyebrow onDark>{t('map.eyebrow')}</SectionEyebrow>
          <h2>
            <Trans i18nKey="projects:map.title" components={{ em: <em />, br: <br /> }} />
          </h2>
          <p>{t('map.intro')}</p>
          <ul className="map-band__cities">
            {COUNTRIES.map(([country, key]) => (
              <li key={`${country}-${key}`}><span className="num">{country}</span><span className="city">{t(`map.cities.${key}`)}</span></li>
            ))}
          </ul>
        </div>
        <div className="map-band__photo reveal reveal--right" data-delay="1">
          <img src="/assets/img/proj-team-jacket.webp" alt={t('map.photoAlt')} width="900" height="1600" loading="lazy" />
          <div className="map-band__photo-label">
            <span>{t('map.photoLabel')}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
