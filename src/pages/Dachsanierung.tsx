import PageIntro from '../components/common/PageIntro';
import EndCtaLocal from '../components/common/EndCtaLocal';
import DachConfigurator from '../components/gewerke/DachConfigurator';
import { usePageTitle } from '../hooks/usePageTitle';
import '../styles/pages/kalkulator.css';
import '../styles/pages/haus-sanierung.css';

export default function Dachsanierung() {
  usePageTitle('Dachsanierung Kostenrechner | Prima Vista');

  return (
    <>
      <PageIntro
        className="kalk-intro"
        backgroundImage="/assets/img/photo-altbausanierung.jpg"
        crumbNumber="05"
        crumbLabel="Gewerke · Dachsanierung"
        title={<>Dach &<br /><em>Ausbau kalkulieren.</em></>}
        lede="Vom neuen Dachstuhl über die Dacheindeckung bis zum Innenausbau oder der Dämmung: Berechnen Sie die Kosten für Ihr Dachprojekt."
        meta={[
          { label: 'Varianten', value: '10 Konzepte' },
          { label: 'Gewerke', value: 'Dach & Holzbau' },
          { label: 'Aufmaß', value: 'Vor Ort' },
          { label: 'Angebot', value: 'Festpreisfähig' },
        ]}
      />

      <section className="kalkulator">
        <DachConfigurator />
      </section>

      <EndCtaLocal
        eyebrow="Dachprojekt planen?"
        title={<>Wir prüfen Zustand<br />und <em>Möglichkeiten</em> vor Ort.</>}
        ctaLabel="Dachsanierung anfragen"
      />
    </>
  );
}
