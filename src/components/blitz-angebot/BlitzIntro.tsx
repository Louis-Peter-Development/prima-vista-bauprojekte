import { Trans, useTranslation } from 'react-i18next';

export default function BlitzIntro() {
  const { t } = useTranslation('blitz');
  return (
    <div className="kontakt__intro reveal reveal--left">
      <div className="crumb crumb--on-dark"><span className="num">06</span> {t('intro.crumb')}</div>
      <h1>
        <Trans i18nKey="blitz:intro.title" components={{ em: <em />, br: <br /> }} />
      </h1>
      <p>{t('intro.lede')}</p>
      <ul className="promise__list" style={{ marginTop: '48px', paddingTop: '32px' }}>
        <li style={{ color: 'var(--pv-bone)' }}><span className="num">01</span><span className="promise__list-copy"><strong>{t('intro.list1')}</strong></span></li>
        <li style={{ color: 'var(--pv-bone)' }}><span className="num">02</span><span className="promise__list-copy"><strong>{t('intro.list2')}</strong></span></li>
        <li style={{ color: 'var(--pv-bone)' }}><span className="num">03</span><span className="promise__list-copy"><strong>{t('intro.list3')}</strong></span></li>
      </ul>

      <figure className="kontakt__media kontakt__media--blitz">
        <img src="/assets/img/photo-altbausanierung.webp" alt={t('intro.mediaAlt')} width="1600" height="897" loading="lazy" />
        <figcaption>
          <span className="num">№ 06</span>
          <span>{t('intro.mediaCaption')}</span>
        </figcaption>
      </figure>
    </div>
  );
}
