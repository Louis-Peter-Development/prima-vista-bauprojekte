import PageIntro from '../components/common/PageIntro';
import GewerkPhotoShowcase from '../components/common/GewerkPhotoShowcase';
import EndCtaLocal from '../components/common/EndCtaLocal';
import GasHeizungCalculator from '../components/gas-heizung/GasHeizungCalculator';
import { usePageTitle } from '../hooks/usePageTitle';
import '../styles/pages/heizkoerper.css';

export default function GasHeizung() {
  usePageTitle('Gas-Heizung Kostenrechner');

  return (
    <>
      <PageIntro
        backgroundImage="/assets/img/leistungen/gas-heizung-01.webp"
        crumbNumber="14"
        crumbLabel="Gas-Heizung · Kostenrechner"
        title={<>Gas-Heizung<br /><em>kalkulieren.</em></>}
        lede="Gas-Brennwerttechnik als Materialpaket für Haus und Wohnung. Optionale Positionen wie Fundament oder Altöltank-Rückbau können direkt ergänzt werden."
        meta={[
          { label: 'System', value: 'Brennwert' },
          { label: 'Haus', value: '20 kW Kessel' },
          { label: 'Wohnung', value: '20-24 kW Therme' },
          { label: 'Optionen', value: 'Tank & Fundament' },
        ]}
      />

      <GewerkPhotoShowcase photoSet="gasHeizung" />

      <GasHeizungCalculator />

      <EndCtaLocal
        eyebrow="Gas-Heizung erneuern?"
        title={<>Wir prüfen <em>Anschluss</em><br />und Abgasführung vor Ort.</>}
        ctaLabel="Gas-Heizung anfragen"
      />
    </>
  );
}
