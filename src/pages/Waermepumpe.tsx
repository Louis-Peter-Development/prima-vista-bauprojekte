import PageIntro from '../components/common/PageIntro';
import EndCtaLocal from '../components/common/EndCtaLocal';
import WaermepumpeCalculator from '../components/waermepumpe/WaermepumpeCalculator';
import { usePageTitle } from '../hooks/usePageTitle';
import '../styles/pages/heizkoerper.css';

export default function Waermepumpe() {
  usePageTitle('Wärmepumpe Kostenrechner');

  return (
    <>
      <PageIntro
        backgroundImage="/assets/img/photo-haus-exterior.webp"
        crumbNumber="13"
        crumbLabel="Wärmepumpe · Kostenrechner"
        title={<>Wärmepumpe<br /><em>kalkulieren.</em></>}
        lede="LG Luft-Wärmepumpe als Montage- und Materialpaket mit Zubehör. Optionale Positionen wie Altöltank-Rückbau und Fundament lassen sich direkt ergänzen."
        meta={[
          { label: 'Paket', value: 'LG 12 kW' },
          { label: 'Montage', value: 'Leistungspaket' },
          { label: 'Material', value: 'Zubehör-Set' },
          { label: 'Optionen', value: 'Tank & Fundament' },
        ]}
      />

      <WaermepumpeCalculator />

      <EndCtaLocal
        eyebrow="Wärmepumpe geplant?"
        title={<>Wir prüfen <em>Heizlast</em><br />und Aufstellort vor Ort.</>}
        ctaLabel="Wärmepumpe anfragen"
      />
    </>
  );
}
