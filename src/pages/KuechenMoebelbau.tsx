import PageIntro from '../components/common/PageIntro';
import EndCtaLocal from '../components/common/EndCtaLocal';
import KuechenConfigurator from '../components/gewerke/KuechenConfigurator';
import { usePageTitle } from '../hooks/usePageTitle';
import '../styles/pages/heizkoerper.css';
import '../styles/pages/kalkulator.css';
import '../styles/pages/haus-sanierung.css';

export default function KuechenMoebelbau() {
  usePageTitle('Küchen & Möbelbau Kostenrechner');

  return (
    <>
      <PageIntro
        backgroundImage="/assets/img/proj-kitchen-oak.jpg"
        crumbNumber="03"
        crumbLabel="Gewerke · Küchen & Möbelbau"
        title={<>Küchen &<br /><em>Möbelbau kalkulieren.</em></>}
        lede="Küchenzeile, Arbeitsplatte, Spüle, Boden, Decke, Elektro oder Wasseranschluss: Wählen Sie die passende Variante und erhalten Sie eine erste Vorab-Schätzung."
        meta={[
          { label: 'Varianten', value: '6 Rechner' },
          { label: 'Gewerke', value: 'Schreinerei & Anschlüsse' },
          { label: 'Aufmaß', value: 'Vor Ort' },
          { label: 'Angebot', value: 'Festpreisfähig' },
        ]}
      />

      <section className="kalkulator">
        <KuechenConfigurator />
      </section>

      <EndCtaLocal
        eyebrow="Küche planen?"
        title={<>Wir prüfen <em>Maße</em><br />und Anschlüsse vor Ort.</>}
        ctaLabel="Küchenbau anfragen"
      />
    </>
  );
}
