import { Trans, useTranslation } from 'react-i18next';
import { Link } from '../../i18n/Link';
import type { LightboxItem } from '../Lightbox';
import SectionEyebrow from '../common/SectionEyebrow';
import { FEATURED_TRADES } from '../../data/gewerke';

type FeaturedTradesProps = {
  items: LightboxItem[];
  onOpen: (items: LightboxItem[], index: number) => void;
};

export default function FeaturedTrades({ items, onOpen }: FeaturedTradesProps) {
  const { t } = useTranslation('pages');
  return (
    <section className="featured-trades">
      <div className="featured-trades__inner">
        <div className="featured-trades__head">
          <div className="reveal">
            <SectionEyebrow>{t('gewerke.featured.eyebrow')}</SectionEyebrow>
            <h2>
              <Trans i18nKey="pages:gewerke.featured.title" components={{ em: <em />, br: <br /> }} />
            </h2>
          </div>
          <p className="reveal" data-delay="1">{t('gewerke.featured.intro')}</p>
        </div>
        <div className="featured-trades__grid">
          {FEATURED_TRADES.map((card, i) => {
            const base = `gewerke.featured.cards.${card.key}`;
            const className = `ft-card${card.feature ? ' ft-card--feature' : ''} reveal reveal--scale`;
            const body = (
              <>
                <img src={card.src} alt={t(`${base}.alt`)} width="800" height="600" loading="lazy" />
                <div className="ft-card__body">
                  <span className="ft-card__count">{t(`${base}.count`)}</span>
                  <h3 className="ft-card__title">{t(`${base}.heading1`)}<br />{t(`${base}.heading2`)}</h3>
                  <p className="ft-card__desc">{t(`${base}.desc`)}</p>
                  {card.detailTo ? <span className="ft-card__more">{t('gewerke.featured.openCalculator')} ›</span> : null}
                </div>
              </>
            );

            return card.detailTo ? (
              <Link
                key={card.src}
                className={className}
                data-delay={card.revealDelay}
                to={card.detailTo}
              >
                {body}
              </Link>
            ) : (
              <a
                key={card.src}
                className={className}
                data-delay={card.revealDelay}
                href={card.src}
                onClick={(e) => { e.preventDefault(); onOpen(items, i); }}
              >
                {body}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
