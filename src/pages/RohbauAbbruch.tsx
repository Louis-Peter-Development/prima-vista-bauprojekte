import PageIntro from '../components/common/PageIntro';
import EndCtaLocal from '../components/common/EndCtaLocal';
import RohbauConfigurator from '../components/gewerke/RohbauConfigurator';
import { usePageTitle } from '../hooks/usePageTitle';
import '../styles/pages/heizkoerper.css';
import '../styles/pages/kalkulator.css';
import '../styles/pages/haus-sanierung.css';

export default function RohbauAbbruch() {
  usePageTitle('Rohbau & Abbruch Kostenrechner');

  return (
    <>
      <PageIntro
        backgroundImage="/assets/img/photo-parkett-rohbau.jpg"
        crumbNumber="23"
        crumbLabel="Gewerke · Rohbau & Abbruch"
        title={<>Rohbau<br /><em>kalkulieren.</em></>}
        lede="Abbruch, Fundament, Mauerwerk, Geschossdecken oder kompletter Rohbau: Wählen Sie die passende Leistung und erhalten Sie eine erste Vorab-Schätzung."
        meta={[
          { label: 'Varianten', value: '5 Rechner' },
          { label: 'Gewerke', value: 'Rohbau & Abbruch' },
          { label: 'Aufmaß', value: 'Vor Ort' },
          { label: 'Angebot', value: 'Festpreisfähig' },
        ]}
      />

      <section className="kalkulator">
        <RohbauConfigurator />
      </section>

      <EndCtaLocal
        eyebrow="Bauvorhaben starten?"
        title={<>Wir koordinieren <em>Rohbau</em><br />und Abbruch aus einer Hand.</>}
        ctaLabel="Rohbau anfragen"
      />
    </>
  );
}
