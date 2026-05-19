import PageIntro from '../components/common/PageIntro';
import EndCtaLocal from '../components/common/EndCtaLocal';
import BoedenCalculator from '../components/gewerke/BoedenCalculator';
import { usePageTitle } from '../hooks/usePageTitle';
import '../styles/pages/heizkoerper.css';

export default function BoedenBelaege() {
  usePageTitle('Böden & Beläge Kostenrechner');

  return (
    <>
      <PageIntro
        backgroundImage="/assets/img/proj-floor-oak.jpg"
        crumbNumber="03"
        crumbLabel="Gewerke · Böden & Beläge"
        title={<>Böden &<br /><em>Beläge kalkulieren.</em></>}
        lede="Parkett, Laminat, Vinyl, Linoleum, Fliesen, Teppich, Kork oder Estrich: Wählen Sie die passende Bodenleistung und erhalten Sie eine erste Vorab-Schätzung."
        meta={[
          { label: 'Varianten', value: '11 Rechner' },
          { label: 'Gewerke', value: 'Boden & Estrich' },
          { label: 'Aufmaß', value: 'Vor Ort' },
          { label: 'Angebot', value: 'Festpreisfähig' },
        ]}
      />

      <BoedenCalculator />

      <EndCtaLocal
        eyebrow="Boden erneuern?"
        title={<>Wir prüfen <em>Untergrund</em><br />und Übergänge vor Ort.</>}
        ctaLabel="Bodenverlegung anfragen"
      />
    </>
  );
}
