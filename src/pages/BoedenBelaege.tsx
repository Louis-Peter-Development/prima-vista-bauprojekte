import PageIntro from '../components/common/PageIntro';
import EndCtaLocal from '../components/common/EndCtaLocal';
import BoedenConfigurator from '../components/gewerke/BoedenConfigurator';
import { usePageTitle } from '../hooks/usePageTitle';
import '../styles/pages/kalkulator.css';
import '../styles/pages/haus-sanierung.css';

export default function BoedenBelaege() {
  usePageTitle('Böden & Beläge Kostenrechner');

  return (
    <>
      <PageIntro
        className="kalk-intro"
        backgroundImage="/assets/img/proj-floor-oak.webp"
        crumbNumber="03"
        crumbLabel="Gewerke · Böden & Beläge"
        title={<>Böden &<br /><em>Beläge kalkulieren.</em></>}
        lede="Parkett, Laminat, Vinyl, Fliesen, Kork oder Estrich: Wählen Sie die passende Bodenleistung und erhalten Sie eine erste Vorab-Schätzung."
        meta={[
          { label: 'Varianten', value: '4 Konzepte' },
          { label: 'Gewerke', value: 'Boden & Estrich' },
          { label: 'Aufmaß', value: 'Vor Ort' },
          { label: 'Angebot', value: 'Festpreisfähig' },
        ]}
      />

      <section className="kalkulator">
        <BoedenConfigurator />
      </section>

      <EndCtaLocal
        eyebrow="Boden erneuern?"
        title={<>Wir prüfen <em>Untergrund</em><br />und Übergänge vor Ort.</>}
        ctaLabel="Bodenverlegung anfragen"
      />
    </>
  );
}
