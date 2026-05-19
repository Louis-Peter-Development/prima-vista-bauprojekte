import PageIntro from '../components/common/PageIntro';
import EndCtaLocal from '../components/common/EndCtaLocal';
import BadsanierungCalculator from '../components/gewerke/BadsanierungCalculator';
import { usePageTitle } from '../hooks/usePageTitle';
import '../styles/pages/heizkoerper.css';

export default function Badsanierung() {
  usePageTitle('Badsanierung Kostenrechner');

  return (
    <>
      <PageIntro
        backgroundImage="/assets/img/proj-spa-bath.jpg"
        crumbNumber="03"
        crumbLabel="Gewerke · Badsanierung"
        title={<>Badsanierung<br /><em>kalkulieren.</em></>}
        lede="Badewanne, Dusche, Gäste-WC, barrierefreies Bad, Whirlpool oder Sauna: Wählen Sie die passende Variante und erhalten Sie eine erste Vorab-Schätzung."
        meta={[
          { label: 'Varianten', value: '8 Rechner' },
          { label: 'Gewerke', value: 'Sanitär & Fliesen' },
          { label: 'Aufmaß', value: 'Vor Ort' },
          { label: 'Angebot', value: 'Festpreisfähig' },
        ]}
      />

      <BadsanierungCalculator />

      <EndCtaLocal
        eyebrow="Bad modernisieren?"
        title={<>Wir prüfen <em>Leitungen</em><br />und Abdichtung vor Ort.</>}
        ctaLabel="Badsanierung anfragen"
      />
    </>
  );
}
