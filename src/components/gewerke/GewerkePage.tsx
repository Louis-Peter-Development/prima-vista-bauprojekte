import type { ReactNode } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import PageIntro from '../common/PageIntro';
import GewerkPhotoShowcase from '../common/GewerkPhotoShowcase';
import EndCtaLocal from '../common/EndCtaLocal';
import { usePageTitle } from '../../hooks/usePageTitle';
import type { GewerkPhotoSetKey } from '../../data/gewerkPhotoSets';
import '../../styles/pages/heizkoerper.css';
import '../../styles/pages/kalkulator.css';
import '../../styles/pages/haus-sanierung.css';

type Props = {
  /** Key under pages:trade.<tradeKey>. */
  tradeKey: string;
  crumbNumber: string;
  backgroundImage: string;
  photoSet: GewerkPhotoSetKey;
  className?: string;
  /** The trade's calculator/configurator. */
  children: ReactNode;
};

/**
 * Shared shell for the 17 trade detail pages: a localized PageIntro + photo
 * showcase + the trade's configurator + a localized end CTA.
 */
export default function GewerkePage({ tradeKey, crumbNumber, backgroundImage, photoSet, className, children }: Props) {
  const { t } = useTranslation('pages');
  const base = `trade.${tradeKey}`;
  usePageTitle(t(`${base}.metaTitle`), t(`${base}.lede`));

  return (
    <>
      <PageIntro
        className={className}
        backgroundImage={backgroundImage}
        crumbNumber={crumbNumber}
        crumbLabel={t(`${base}.crumbLabel`)}
        title={<Trans i18nKey={`pages:${base}.title`} components={{ em: <em />, br: <br /> }} />}
        lede={t(`${base}.lede`)}
        meta={[
          { label: t('gw.metaVariants'), value: t(`${base}.variants`) },
          { label: t('gw.metaTrades'), value: t(`${base}.trades`) },
          { label: t('gw.metaMeasure'), value: t('gw.metaMeasureValue') },
          { label: t('gw.metaOffer'), value: t('gw.metaOfferValue') },
        ]}
      />

      <GewerkPhotoShowcase photoSet={photoSet} />

      <section className="kalkulator">{children}</section>

      <EndCtaLocal
        eyebrow={t(`${base}.endEyebrow`)}
        title={<Trans i18nKey={`pages:${base}.endTitle`} components={{ em: <em />, br: <br /> }} />}
        ctaLabel={t(`${base}.endCta`)}
        art="einzel"
      />
    </>
  );
}
