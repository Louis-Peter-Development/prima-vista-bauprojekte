import PageIntro from '../components/common/PageIntro';
import EndCtaLocal from '../components/common/EndCtaLocal';
import AbdichtungKellerConfigurator from '../components/gewerke/AbdichtungKellerConfigurator';
import { usePageTitle } from '../hooks/usePageTitle';
import '../styles/pages/kalkulator.css';
import '../styles/pages/haus-sanierung.css';

export default function AbdichtungKeller() {
  usePageTitle('Abdichtung & Keller');

  return (
    <>
      <PageIntro
        className="kalk-intro"
        backgroundImage="/assets/img/proj-spa-corridor.webp"
        crumbNumber="03"
        crumbLabel="Gewerke · Abdichtung & Keller"
        title={<>Abdichtung<br /><em>kalkulieren.</em></>}
        lede="Horizontalabdichtung, Perimeterabdichtung oder Kellerabdichtung: Wählen Sie die passende Abdichtungstechnik und erhalten Sie eine erste Vorab-Schätzung."
        meta={[
          { label: 'Varianten', value: '4 Systeme' },
          { label: 'Gewerke', value: 'Haus & Keller' },
          { label: 'Aufmaß', value: 'Vor Ort' },
          { label: 'Angebot', value: 'Festpreisfähig' },
        ]}
      />

      <section className="kalkulator">
        <AbdichtungKellerConfigurator />
      </section>

      <EndCtaLocal
        eyebrow="Feuchtigkeit stoppen?"
        title={<>Wir prüfen <em>Ursache</em><br />und Abdichtungssystem vor Ort.</>}
        ctaLabel="Abdichtung anfragen"
      />
    </>
  );
}
