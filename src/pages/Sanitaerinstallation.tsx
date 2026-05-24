import PageIntro from '../components/common/PageIntro';
import EndCtaLocal from '../components/common/EndCtaLocal';
import WasserConfigurator from '../components/gewerke/WasserConfigurator';
import { usePageTitle } from '../hooks/usePageTitle';
import '../styles/pages/heizkoerper.css';
import '../styles/pages/kalkulator.css';
import '../styles/pages/haus-sanierung.css';

export default function Sanitaerinstallation() {
  usePageTitle('Wasserinstallation Kostenrechner');

  return (
    <>
      <PageIntro
        backgroundImage="/assets/img/photo-bad-prima-vista.webp"
        crumbNumber="05"
        crumbLabel="Gewerke · Wasser & Sanitär"
        title={<>Wasser<br /><em>kalkulieren.</em></>}
        lede="Bad, Küche, Keller oder Außen: Wählen Sie den passenden Sanitärstrang und erhalten Sie eine erste Vorab-Schätzung."
        meta={[
          { label: 'Varianten', value: '5 Rechner' },
          { label: 'Gewerke', value: 'Wasser & Sanitär' },
          { label: 'Aufmaß', value: 'Vor Ort' },
          { label: 'Angebot', value: 'Festpreisfähig' },
        ]}
      />

      <section className="kalkulator">
        <WasserConfigurator />
      </section>

      <EndCtaLocal
        eyebrow="Neuinstallation geplant?"
        title={<>Wir koordinieren <em>Trink-</em><br />und Abwasser aus einer Hand.</>}
        ctaLabel="Sanitär anfragen"
      />
    </>
  );
}
