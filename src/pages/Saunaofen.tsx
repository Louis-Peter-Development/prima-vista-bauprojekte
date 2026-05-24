import PageIntro from '../components/common/PageIntro';
import EndCtaLocal from '../components/common/EndCtaLocal';
import SaunaofenCalculator from '../components/saunaofen/SaunaofenCalculator';
import { usePageTitle } from '../hooks/usePageTitle';
import '../styles/pages/heizkoerper.css';

export default function Saunaofen() {
  usePageTitle('Saunaofen Prestige Kostenrechner');

  return (
    <>
      <PageIntro
        backgroundImage="/assets/img/proj-spa-tub.webp"
        crumbNumber="16"
        crumbLabel="Saunaofen Prestige · Kostenrechner"
        title={<>Saunaofen<br /><em>Prestige.</em></>}
        lede="Luxus Saunaofen Prestige mit Montage-Leistungspaket. Materialbemusterung, Kaminsystem und ergänzende Ofenpositionen lassen sich direkt dazurechnen."
        meta={[
          { label: 'Leistung', value: '9 kW' },
          { label: 'Basis', value: 'Montagepaket' },
          { label: 'Material', value: 'Bemusterung' },
          { label: 'Optionen', value: 'Kamin & Regal' },
        ]}
      />

      <SaunaofenCalculator />

      <EndCtaLocal
        eyebrow="Saunaofen geplant?"
        title={<>Wir prüfen <em>Aufstellort</em><br />und Brandschutz vor Ort.</>}
        ctaLabel="Saunaofen anfragen"
      />
    </>
  );
}
