import PageIntro from '../components/common/PageIntro';
import EndCtaLocal from '../components/common/EndCtaLocal';
import ElektroCalculator from '../components/gewerke/ElektroCalculator';
import { usePageTitle } from '../hooks/usePageTitle';
import '../styles/pages/heizkoerper.css';

export default function Elektroinstallation() {
  usePageTitle('Elektroinstallation Kostenrechner');

  return (
    <>
      <PageIntro
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

      <ElektroCalculator />

      <EndCtaLocal
        eyebrow="Elektrik erneuern?"
        title={<>Wir prüfen <em>Leitungswege</em><br />und Verteiler vor Ort.</>}
        ctaLabel="Elektroinstallation anfragen"
      />
    </>
  );
}
