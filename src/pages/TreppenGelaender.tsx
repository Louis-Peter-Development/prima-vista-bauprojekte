import PageIntro from '../components/common/PageIntro';
import EndCtaLocal from '../components/common/EndCtaLocal';
import TreppenConfigurator from '../components/gewerke/TreppenConfigurator';
import { usePageTitle } from '../hooks/usePageTitle';
import '../styles/pages/heizkoerper.css';
import '../styles/pages/kalkulator.css';
import '../styles/pages/haus-sanierung.css';

export default function TreppenGelaender() {
  usePageTitle('Treppen & Geländer Kostenrechner');

  return (
    <>
      <PageIntro
        backgroundImage="/assets/img/proj-stairs-concrete.jpg"
        crumbNumber="03"
        crumbLabel="Gewerke · Treppen & Geländer"
        title={<>Treppen &<br /><em>Geländer kalkulieren.</em></>}
        lede="Holztreppe, Betontreppe, Treppenloch, Geländer, Außen-, Raumspar- oder Spindeltreppe: Wählen Sie die passende Leistung und erhalten Sie eine erste Vorab-Schätzung."
        meta={[
          { label: 'Varianten', value: '11 Rechner' },
          { label: 'Gewerke', value: 'Holz, Beton, Stahl' },
          { label: 'Aufmaß', value: 'Vor Ort' },
          { label: 'Angebot', value: 'Festpreisfähig' },
        ]}
      />

      <section className="kalkulator">
        <TreppenConfigurator />
      </section>

      <EndCtaLocal
        eyebrow="Treppen planen?"
        title={<>Wir prüfen <em>Aufmaß</em><br />und Anschlüsse vor Ort.</>}
        ctaLabel="Treppen anfragen"
      />
    </>
  );
}
