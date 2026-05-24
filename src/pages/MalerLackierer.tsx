import PageIntro from '../components/common/PageIntro';
import EndCtaLocal from '../components/common/EndCtaLocal';
import MalerConfigurator from '../components/gewerke/MalerConfigurator';
import { usePageTitle } from '../hooks/usePageTitle';
import '../styles/pages/heizkoerper.css';
import '../styles/pages/kalkulator.css';
import '../styles/pages/haus-sanierung.css';

export default function MalerLackierer() {
  usePageTitle('Maler & Lackierer Kostenrechner');

  return (
    <>
      <PageIntro
        backgroundImage="/assets/img/proj-paint-swatches.jpg"
        crumbNumber="03"
        crumbLabel="Gewerke · Maler & Lackierer"
        title={<>Maler &<br /><em>Lackierer kalkulieren.</em></>}
        lede="Anstrich, Glätten, Tapezieren, Holzdecken, Heizkörper, Fenster, Türen oder Fassadenanstrich: Wählen Sie die passende Leistung und erhalten Sie eine erste Vorab-Schätzung."
        meta={[
          { label: 'Varianten', value: '10 Rechner' },
          { label: 'Gewerke', value: 'Farben & Tapeten' },
          { label: 'Aufmaß', value: 'Vor Ort' },
          { label: 'Angebot', value: 'Festpreisfähig' },
        ]}
      />

      <section className="kalkulator">
        <MalerConfigurator />
      </section>

      <EndCtaLocal
        eyebrow="Malerarbeiten planen?"
        title={<>Wir prüfen <em>Untergrund</em><br />und Farbsystem vor Ort.</>}
        ctaLabel="Malerarbeiten anfragen"
      />
    </>
  );
}
