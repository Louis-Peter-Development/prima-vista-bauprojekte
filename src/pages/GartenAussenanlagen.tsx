import PageIntro from '../components/common/PageIntro';
import GewerkPhotoShowcase from '../components/common/GewerkPhotoShowcase';
import EndCtaLocal from '../components/common/EndCtaLocal';
import GartenConfigurator from '../components/gewerke/GartenConfigurator';
import { usePageTitle } from '../hooks/usePageTitle';
import '../styles/pages/heizkoerper.css';
import '../styles/pages/kalkulator.css';
import '../styles/pages/haus-sanierung.css';

export default function GartenAussenanlagen() {
  usePageTitle('Garten & Außenanlagen Kostenrechner');

  return (
    <>
      <PageIntro
        backgroundImage="/assets/img/leistungen/garten-aussenanlagen-01.webp"
        crumbNumber="03"
        crumbLabel="Gewerke · Garten & Außenanlagen"
        title={<>Garten &<br /><em>Außenanlagen kalkulieren.</em></>}
        lede="Terrassen, Gartenmauern, Beleuchtung, Carport, Gartenhaus, Hochbeete, Wasserwirtschaft, Zaun oder Überdachung: Wählen Sie die passende Außenleistung und erhalten Sie eine erste Vorab-Schätzung."
        meta={[
          { label: 'Varianten', value: '15 Rechner' },
          { label: 'Gewerke', value: 'Garten & Terrasse' },
          { label: 'Aufmaß', value: 'Vor Ort' },
          { label: 'Angebot', value: 'Festpreisfähig' },
        ]}
      />

      <GewerkPhotoShowcase photoSet="garten" />

      <section className="kalkulator">
        <GartenConfigurator />
      </section>

      <EndCtaLocal
        eyebrow="Außenbereich planen?"
        title={<>Wir prüfen <em>Untergrund</em><br />und Entwässerung vor Ort.</>}
        ctaLabel="Gartenbau anfragen"
      />
    </>
  );
}
