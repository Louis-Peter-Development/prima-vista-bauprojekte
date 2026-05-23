import PageIntro from '../components/common/PageIntro';
import EndCtaLocal from '../components/common/EndCtaLocal';
import BarrierefreiesBadConfigurator from '../components/gewerke/BarrierefreiesBadConfigurator';
import { usePageTitle } from '../hooks/usePageTitle';
import '../styles/pages/kalkulator.css';
import '../styles/pages/haus-sanierung.css';

export default function Barrierefreiheit() {
  usePageTitle('Barrierefreies Bad Kostenrechner | Prima Vista');

  return (
    <>
      <PageIntro
        className="kalk-intro"
        backgroundImage="/assets/img/photo-bad-prima-vista.jpg"
        crumbNumber="03"
        crumbLabel="Gewerke · Barrierefreiheit"
        title={<>Barrierefreiheit<br /><em>kalkulieren.</em></>}
        lede="Bodengleiche Dusche, barrierefreies WC, unterfahrbarer Waschtisch, Haltegriffe und rutschfeste Beläge: Wählen Sie die passende Leistung und erhalten Sie eine erste Vorab-Schätzung."
        meta={[
          { label: 'Varianten', value: '4 Konzepte' },
          { label: 'Gewerke', value: 'Bad & Sanitär' },
          { label: 'Aufmaß', value: 'Vor Ort' },
          { label: 'Angebot', value: 'Festpreisfähig' },
        ]}
      />

      <section className="kalkulator">
        <BarrierefreiesBadConfigurator />
      </section>

      <EndCtaLocal
        eyebrow="Barrierearm umbauen?"
        title={<>Wir prüfen <em>Bewegungsflächen</em><br />und Anschlüsse vor Ort.</>}
        ctaLabel="Barrierefreiheit anfragen"
      />
    </>
  );
}
