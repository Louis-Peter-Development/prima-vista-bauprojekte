import PageIntro from '../components/common/PageIntro';
import GewerkPhotoShowcase from '../components/common/GewerkPhotoShowcase';
import EndCtaLocal from '../components/common/EndCtaLocal';
import FussbodenheizungCalculator from '../components/fussbodenheizung/FussbodenheizungCalculator';
import { usePageTitle } from '../hooks/usePageTitle';
import '../styles/pages/heizkoerper.css';

export default function Fussbodenheizung() {
  usePageTitle('Fußbodenheizung Kostenrechner');

  return (
    <>
      <PageIntro
        backgroundImage="/assets/img/leistungen/fussbodenheizung-01.webp"
        crumbNumber="12"
        crumbLabel="Fußbodenheizung · Kostenrechner"
        title={<>Fußbodenheizung<br /><em>kalkulieren.</em></>}
        lede="Flächenheizung pro Quadratmeter, optionale Estricharbeiten und elektrische Warmup-Systeme. Für Sanierung, Trockenaufbau und Bodenbeläge mit niedriger Aufbauhöhe."
        meta={[
          { label: 'Standard', value: '100 qm' },
          { label: 'Basis', value: '89 €/qm netto' },
          { label: 'Extras', value: 'Estrich & Rückbau' },
          { label: 'Option', value: 'Elektro-System' },
        ]}
      />

      <GewerkPhotoShowcase photoSet="fussbodenheizung" />

      <FussbodenheizungCalculator />

      <EndCtaLocal
        eyebrow="Wärme unter dem Boden?"
        title={<>Wir prüfen <em>Aufbauhöhe</em><br />und Bodenbelag vor Ort.</>}
        ctaLabel="Fußbodenheizung anfragen"
      />
    </>
  );
}
