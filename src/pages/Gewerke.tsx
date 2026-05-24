import { useState } from 'react';
import EndCtaLocal from '../components/common/EndCtaLocal';
import PageIntro from '../components/common/PageIntro';
import FeaturedTrades from '../components/gewerke/FeaturedTrades';
import ProcessSection from '../components/gewerke/ProcessSection';
import TradeIndex from '../components/gewerke/TradeIndex';
import { useLightbox, type LightboxItem } from '../components/Lightbox';
import { FEATURED_TRADES, TRADES, type TradeRow } from '../data/gewerke';
import { usePageTitle } from '../hooks/usePageTitle';
import '../styles/pages/gewerke.css';

export default function Gewerke() {
  usePageTitle('Gewerke – alle Leistungen im Überblick');
  const { open } = useLightbox();
  const [active, setActive] = useState<TradeRow>(TRADES[0]);

  const featuredItems: LightboxItem[] = FEATURED_TRADES.map((f) => ({ src: f.src, title: f.title }));

  return (
    <>
      <PageIntro
        backgroundImage="/assets/img/proj-spa-bath.webp"
        crumbNumber="03"
        crumbLabel="Gewerke · Bauleistungen"
        title={<>Achtzehn<br />Gewerke,<br /><em>eine Hand.</em></>}
        lede="Entdecken Sie individuelle Produkte, Baumaterialien und Komplettpakete für alle Gewerke — koordiniert durch unsere Bauleitung in Frankfurt und Emmenbrücke."
        meta={[
          { label: 'Auswahl', value: '18 Gewerke' },
          { label: 'Koordination', value: 'Inhouse-Bauleitung' },
          { label: 'Materialien', value: 'Inklusive Festpreis' },
          { label: 'Garantie', value: '5 Jahre' },
        ]}
      />

      <FeaturedTrades items={featuredItems} onOpen={open} />
      <TradeIndex active={active} onActiveChange={setActive} />
      <ProcessSection />
      <EndCtaLocal
        eyebrow="Bereit zu starten?"
        title={<>Welches <em>Gewerk</em><br />steht bei Ihnen an?</>}
        ctaLabel="Anfrage senden"
      />
    </>
  );
}
