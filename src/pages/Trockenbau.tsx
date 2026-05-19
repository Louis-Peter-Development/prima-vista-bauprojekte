import PageIntro from '../components/common/PageIntro';
import EndCtaLocal from '../components/common/EndCtaLocal';
import TrockenbauCalculator from '../components/gewerke/TrockenbauCalculator';
import { usePageTitle } from '../hooks/usePageTitle';
import '../styles/pages/heizkoerper.css';

export default function Trockenbau() {
  usePageTitle('Trockenbau Kostenrechner');

  return (
    <>
      <PageIntro
        backgroundImage="/assets/img/photo-parkett-rohbau.jpg"
        crumbNumber="03"
        crumbLabel="Gewerke · Trockenbau"
        title={<>Trockenbau<br /><em>kalkulieren.</em></>}
        lede="Decken abhängen, Wände stellen, Wände verkleiden, Estrich verlegen oder Dachschrägen ausbauen: Wählen Sie die passende Leistung und erhalten Sie eine erste Vorab-Schätzung."
        meta={[
          { label: 'Varianten', value: '6 Rechner' },
          { label: 'Gewerke', value: 'Wände & Decken' },
          { label: 'Aufmaß', value: 'Vor Ort' },
          { label: 'Angebot', value: 'Festpreisfähig' },
        ]}
      />

      <TrockenbauCalculator />

      <EndCtaLocal
        eyebrow="Innenausbau starten?"
        title={<>Wir prüfen <em>Flächen</em><br />und Anschlüsse vor Ort.</>}
        ctaLabel="Trockenbau anfragen"
      />
    </>
  );
}
