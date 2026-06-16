import PageIntro from '../components/common/PageIntro';
import GewerkPhotoShowcase from '../components/common/GewerkPhotoShowcase';
import EndCtaLocal from '../components/common/EndCtaLocal';
import ZaeuneConfigurator from '../components/gewerke/ZaeuneConfigurator';
import { usePageTitle } from '../hooks/usePageTitle';
import '../styles/pages/heizkoerper.css';
import '../styles/pages/kalkulator.css';
import '../styles/pages/haus-sanierung.css';

export default function Zaeune() {
  usePageTitle('Zäune Kostenrechner');

  return (
    <>
      <PageIntro
        backgroundImage="/assets/img/leistungen/zaeune-tore-01.webp"
        crumbNumber="25"
        crumbLabel="Gewerke · Zäune"
        title={<>Zäune<br /><em>kalkulieren.</em></>}
        lede="Doppelstab, Holz, Sichtschutz oder Maschendraht: Wählen Sie die passende Zaunart und erhalten Sie eine erste Vorab-Schätzung."
        meta={[
          { label: 'Varianten', value: '5 Rechner' },
          { label: 'Gewerke', value: 'Zäune & Tore' },
          { label: 'Aufmaß', value: 'Vor Ort' },
          { label: 'Angebot', value: 'Festpreisfähig' },
        ]}
      />

      <GewerkPhotoShowcase photoSet="zaeune" />

      <section className="kalkulator">
        <ZaeuneConfigurator />
      </section>

      <EndCtaLocal
        eyebrow="Grundstück einfrieden?"
        title={<>Wir setzen <em>Pfosten</em><br />und montieren passgenau.</>}
        ctaLabel="Zaun anfragen"
      />
    </>
  );
}
