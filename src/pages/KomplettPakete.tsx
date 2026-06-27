import { Trans, useTranslation } from 'react-i18next';
import EndCtaLocal from '../components/common/EndCtaLocal';
import PageIntro from '../components/common/PageIntro';
import PackageCompare from '../components/komplett-pakete/PackageCompare';
import PackageDetailSection from '../components/komplett-pakete/PackageDetailSection';
import { PACKAGES } from '../data/komplettPakete';
import '../styles/pages/komplett-pakete.css';

export default function KomplettPakete() {
  const { t } = useTranslation('pages');
  return (
    <>
      <PageIntro
        backgroundImage="/assets/img/photo-haus-exterior.webp"
        crumbNumber="02"
        crumbLabel={t('pakete.crumbLabel')}
        title={<Trans i18nKey="pages:pakete.title" components={{ em: <em />, br: <br /> }} />}
        lede={t('pakete.lede')}
        meta={[
          { label: t('pakete.metaPriceLabel'), value: t('pakete.metaPriceValue') },
          { label: t('pakete.metaTimeLabel'), value: t('pakete.metaTimeValue') },
          { label: t('pakete.metaMgmtLabel'), value: t('pakete.metaMgmtValue') },
          { label: t('pakete.metaInsuranceLabel'), value: t('pakete.metaInsuranceValue') },
        ]}
      />

      {PACKAGES.map((pkg) => (
        <PackageDetailSection key={pkg.num} pkg={pkg} />
      ))}

      <PackageCompare />

      <section className="pkg-quote">
        <div className="reveal">
          <blockquote>
            <Trans i18nKey="pages:pakete.quote" components={{ em: <em /> }} />
          </blockquote>
          <div className="attr">
            <span className="name">{t('pakete.quoteName')}</span> &nbsp;·&nbsp; {t('pakete.quoteRole')}
          </div>
        </div>
      </section>

      <EndCtaLocal
        eyebrow={t('pakete.endEyebrow')}
        title={<Trans i18nKey="pages:pakete.endTitle" components={{ em: <em />, br: <br /> }} />}
        ctaLabel={t('pakete.endCta')}
        art="haus"
        style={{ background: 'var(--pv-cream-paper)' }}
      />
    </>
  );
}
