import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import EndCtaLocal from '../components/common/EndCtaLocal';
import PageIntro from '../components/common/PageIntro';
import FeaturedTrades from '../components/gewerke/FeaturedTrades';
import ProcessSection from '../components/gewerke/ProcessSection';
import TradeIndex from '../components/gewerke/TradeIndex';
import { useLightbox, type LightboxItem } from '../components/Lightbox';
import { FEATURED_TRADES, PREVIEW_IMAGES, TRADES, type TradeRow } from '../data/gewerke';
import '../styles/pages/gewerke.css';

export default function Gewerke() {
  const { t } = useTranslation('pages');
  const { open } = useLightbox();
  const [active, setActive] = useState<TradeRow>(TRADES[0]);

  const featuredItems: LightboxItem[] = FEATURED_TRADES.map((f) => ({
    src: f.src,
    title: t(`gewerke.featured.cards.${f.key}.alt`),
  }));
  const heroImages = [
    PREVIEW_IMAGES.bad,
    PREVIEW_IMAGES.kueche,
    PREVIEW_IMAGES.rohbau,
    PREVIEW_IMAGES.trockenbau,
    PREVIEW_IMAGES.fassade,
    PREVIEW_IMAGES.treppen,
    PREVIEW_IMAGES.garten,
  ];

  return (
    <>
      <PageIntro
        backgroundImage="/assets/img/projects/spa-bad-hotel-01.webp"
        backgroundImages={heroImages}
        crumbNumber="03"
        crumbLabel={t('gewerke.crumbLabel')}
        title={<Trans i18nKey="pages:gewerke.title" components={{ em: <em />, br: <br /> }} />}
        lede={t('gewerke.lede')}
        meta={[
          { label: t('gewerke.metaSelectionLabel'), value: t('gewerke.metaSelectionValue') },
          { label: t('gewerke.metaCoordLabel'), value: t('gewerke.metaCoordValue') },
          { label: t('gewerke.metaMaterialsLabel'), value: t('gewerke.metaMaterialsValue') },
          { label: t('gewerke.metaWarrantyLabel'), value: t('gewerke.metaWarrantyValue') },
        ]}
      />

      <FeaturedTrades items={featuredItems} onOpen={open} />
      <TradeIndex active={active} onActiveChange={setActive} />
      <ProcessSection />
      <EndCtaLocal
        eyebrow={t('gewerke.endEyebrow')}
        title={<Trans i18nKey="pages:gewerke.endTitle" components={{ em: <em />, br: <br /> }} />}
        ctaLabel={t('gewerke.endCta')}
        art="einzel"
      />
    </>
  );
}
