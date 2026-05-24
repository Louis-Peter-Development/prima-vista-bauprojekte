import PageIntro from '../components/common/PageIntro';
import EndCtaLocal from '../components/common/EndCtaLocal';
import PelletofenCalculator from '../components/pelletofen/PelletofenCalculator';
import { usePageTitle } from '../hooks/usePageTitle';
import '../styles/pages/heizkoerper.css';

export default function Pelletofen() {
  usePageTitle('Pelletofen Kostenrechner');

  return (
    <>
      <PageIntro
        backgroundImage="/assets/img/proj-concrete-sofa.webp"
        crumbNumber="15"
        crumbLabel="Pelletofen · Kostenrechner"
        title={<>Pelletofen<br /><em>kalkulieren.</em></>}
        lede="Pelletheizung mit Montagepaket und Vitoligno 300. Kaminsystem, Altöltank-Rückbau und ergänzende Pellet-Positionen lassen sich direkt zuschalten."
        meta={[
          { label: 'System', value: 'Pellet' },
          { label: 'Leistung', value: '12 kW' },
          { label: 'Basis', value: 'Vitoligno 300' },
          { label: 'Optionen', value: 'Kamin & Tank' },
        ]}
      />

      <PelletofenCalculator />

      <EndCtaLocal
        eyebrow="Pelletwärme geplant?"
        title={<>Wir prüfen <em>Kamin</em><br />und Lagerung vor Ort.</>}
        ctaLabel="Pelletofen anfragen"
      />
    </>
  );
}
