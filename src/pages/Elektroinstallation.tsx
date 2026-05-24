import PageIntro from '../components/common/PageIntro';
import EndCtaLocal from '../components/common/EndCtaLocal';
import ElektroConfigurator from '../components/gewerke/ElektroConfigurator';
import { usePageTitle } from '../hooks/usePageTitle';
import '../styles/pages/kalkulator.css';
import '../styles/pages/haus-sanierung.css';

export default function Elektroinstallation() {
  usePageTitle('Elektroinstallation Kostenrechner | Prima Vista');

  return (
    <>
      <PageIntro
        className="kalk-intro"
        backgroundImage="/assets/img/photo-office-light.jpg"
        crumbNumber="03"
        crumbLabel="Gewerke · Elektroinstallation"
        title={<>Elektroinstallation<br /><em>kalkulieren.</em></>}
        lede="Neuinstallation, Sicherungskasten, Netzwerk, Lichttechnik, Smart Home, Rolladensteuerung oder Sprechanlage: Wählen Sie die passende Leistung und erhalten Sie eine erste Vorab-Schätzung."
        meta={[
          { label: 'Varianten', value: '9 Rechner' },
          { label: 'Gewerke', value: 'Strom, Licht, KNX' },
          { label: 'Aufmaß', value: 'Vor Ort' },
          { label: 'Angebot', value: 'Festpreisfähig' },
        ]}
      />

      <section className="kalkulator">
        <ElektroConfigurator />
      </section>

      <EndCtaLocal
        eyebrow="Elektrik erneuern?"
        title={<>Wir prüfen <em>Leitungswege</em><br />und Verteiler vor Ort.</>}
        ctaLabel="Elektroinstallation anfragen"
      />
    </>
  );
}
