import { Trans, useTranslation } from 'react-i18next';
import { Link } from '../i18n/Link';
import PageIntro from '../components/common/PageIntro';
import EndCtaLocal from '../components/common/EndCtaLocal';
import { HEIZMETHODEN } from '../data/heizmethoden';
import '../styles/pages/heizmethoden.css';

export default function Heizmethoden() {
  const { t } = useTranslation('pages');

  return (
    <>
      <PageIntro
        backgroundImage="/assets/img/leistungen/waermepumpe-01.webp"
        crumbNumber="09"
        crumbLabel={t('heizmethoden.crumbLabel')}
        title={<Trans i18nKey="pages:heizmethoden.title" components={{ em: <em />, br: <br /> }} />}
        lede={t('heizmethoden.lede')}
        meta={[
          { label: t('heizmethoden.metaMethodsLabel'), value: t('heizmethoden.metaMethodsValue') },
          { label: t('heizmethoden.metaFundingLabel'), value: t('heizmethoden.metaFundingValue') },
          { label: t('heizmethoden.metaCommissioningLabel'), value: t('heizmethoden.metaCommissioningValue') },
          { label: t('heizmethoden.metaWarrantyLabel'), value: t('heizmethoden.metaWarrantyValue') },
        ]}
      />

      <section className="heiz">
        <div className="heiz__inner">
          <div className="heiz__head reveal">
            <div className="eyebrow"><span className="rule-red"></span>&nbsp;&nbsp;{t('heizmethoden.overviewEyebrow')}</div>
            <h2>
              <Trans i18nKey="pages:heizmethoden.overviewTitle" components={{ em: <em />, br: <br /> }} />
            </h2>
            <p>{t('heizmethoden.overviewLede')}</p>
          </div>

          <ul className="heiz__grid">
            {HEIZMETHODEN.map((m, i) => {
              const subtitle = t(`heizmethoden.methods.${m.key}.subtitle`, { defaultValue: '' });
              const title = t(`heizmethoden.methods.${m.key}.title`);
              const card = (
                <>
                  <div className="heiz-card__photo">
                    <img src={m.photo} alt={title} width="1600" height="1200" loading="lazy" />
                    <span className="heiz-card__num">№&nbsp;{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <div className="heiz-card__body">
                    <h3 className="heiz-card__title">
                      {title}
                      {subtitle && <small className="heiz-card__sub">{subtitle}</small>}
                    </h3>
                    <p className="heiz-card__desc">{t(`heizmethoden.methods.${m.key}.desc`)}</p>
                    {m.detailTo && <span className="heiz-card__more">{t('heizmethoden.openCalculator')} <span>&gt;</span></span>}
                  </div>
                </>
              );

              return (
                <li key={m.key} className="heiz-card reveal" data-delay={String((i % 4) + 1)}>
                  {m.detailTo ? (
                    <Link className="heiz-card__link" to={m.detailTo}>
                      {card}
                    </Link>
                  ) : card}
                </li>
              );
            })}
          </ul>

          <div className="heiz__foot reveal">
            <p>{t('heizmethoden.footText')}</p>
            <div className="heiz__actions">
              <Link className="btn btn--solid" to="/blitz-angebot">
                {t('heizmethoden.ctaQuote')} <span className="arrow">&gt;</span>
              </Link>
              <Link className="btn btn--appointment" to="/kontakt">
                {t('heizmethoden.ctaConsult')} <span className="arrow">&gt;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <EndCtaLocal
        eyebrow={t('heizmethoden.endEyebrow')}
        title={<Trans i18nKey="pages:heizmethoden.endTitle" components={{ em: <em />, br: <br /> }} />}
        ctaLabel={t('heizmethoden.endCta')}
        art="einzel"
      />
    </>
  );
}
