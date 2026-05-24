import PageIntro from '../components/common/PageIntro';
import EndCtaLocal from '../components/common/EndCtaLocal';
import BadsanierungConfigurator from '../components/gewerke/BadsanierungConfigurator';
import { usePageTitle } from '../hooks/usePageTitle';
import '../styles/pages/kalkulator.css';
import '../styles/pages/haus-sanierung.css';

export default function Badsanierung() {
  usePageTitle('Badsanierung & Gäste-WC | Prima Vista');

  return (
    <>
      <PageIntro
        className="kalk-intro"
        backgroundImage="/assets/img/proj-bad-modern.webp"
        crumbNumber="04"
        crumbLabel="Gewerke · Badsanierung"
        title={<>Badsanierung<br /><em>kalkulieren.</em></>}
        lede="Vom modernen Gäste-WC bis zum exklusiven Komplettbad: Konfigurieren Sie Ihre Sanierung und erhalten Sie transparente Kosten für Sanitär, Fliesen und Objekte."
        meta={[
          { label: 'Varianten', value: '4 Konzepte' },
          { label: 'Gewerke', value: 'Sanitär & Fliesen' },
          { label: 'Aufmaß', value: 'Vor Ort' },
          { label: 'Angebot', value: 'Festpreisfähig' },
        ]}
      />

      <section className="kalkulator">
        <BadsanierungConfigurator />
      </section>

      <EndCtaLocal
        eyebrow="Zeit für ein neues Bad?"
        title={<>Wir planen <em>Sanitär</em><br />und Design vor Ort.</>}
        ctaLabel="Badsanierung anfragen"
      />
    </>
  );
}
