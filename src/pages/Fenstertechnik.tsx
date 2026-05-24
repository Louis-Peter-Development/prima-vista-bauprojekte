import PageIntro from '../components/common/PageIntro';
import EndCtaLocal from '../components/common/EndCtaLocal';
import FensterConfigurator from '../components/gewerke/FensterConfigurator';
import { usePageTitle } from '../hooks/usePageTitle';
import '../styles/pages/heizkoerper.css';
import '../styles/pages/kalkulator.css';
import '../styles/pages/haus-sanierung.css';

export default function Fenstertechnik() {
  usePageTitle('Fenstertechnik Kostenrechner');

  return (
    <>
      <PageIntro
        backgroundImage="/assets/img/photo-office-light.jpg"
        crumbNumber="03"
        crumbLabel="Gewerke · Fenstertechnik"
        title={<>Fenstertechnik<br /><em>kalkulieren.</em></>}
        lede="Aluminium-, Holz- oder Kunststofffenster, Balkon- und Terrassentüren, Dachfenster, Rollladen, Markisen oder Fenster aufbereiten: Wählen Sie die passende Leistung und erhalten Sie eine erste Vorab-Schätzung."
        meta={[
          { label: 'Varianten', value: '11 Rechner' },
          { label: 'Gewerke', value: 'Fenster & Türen' },
          { label: 'Aufmaß', value: 'Vor Ort' },
          { label: 'Angebot', value: 'Festpreisfähig' },
        ]}
      />

      <section className="kalkulator">
        <FensterConfigurator />
      </section>

      <EndCtaLocal
        eyebrow="Fenster erneuern?"
        title={<>Wir prüfen <em>Aufmaß</em><br />und Anschlüsse vor Ort.</>}
        ctaLabel="Fenster anfragen"
      />
    </>
  );
}
