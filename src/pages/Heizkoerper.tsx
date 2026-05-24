import PageIntro from '../components/common/PageIntro';
import EndCtaLocal from '../components/common/EndCtaLocal';
import HeizkoerperCalculator from '../components/heizkoerper/HeizkoerperCalculator';
import { usePageTitle } from '../hooks/usePageTitle';
import '../styles/pages/heizkoerper.css';

export default function Heizkoerper() {
  usePageTitle('Heizkörper Kostenrechner');

  return (
    <>
      <PageIntro
        backgroundImage="/assets/img/photo-bad-prima-vista.webp"
        crumbNumber="10"
        crumbLabel="Heizkörper · Kostenrechner"
        title={<>Heizkörper<br /><em>kalkulieren.</em></>}
        lede="Montage, Material und optionale Heizstränge als saubere Einzelpositionen. Für einzelne Räume, Badheizkörper oder mehrere Heizkörper im Bestand."
        meta={[
          { label: 'Basis', value: 'Montage + Material' },
          { label: 'Optionen', value: 'Heizstränge AP/UP' },
          { label: 'Ausgabe', value: 'Netto & Brutto' },
          { label: 'Termin', value: 'Aufmaß vor Ort' },
        ]}
      />

      <HeizkoerperCalculator />

      <EndCtaLocal
        eyebrow="Bereit für den Austausch?"
        title={<>Wir prüfen <em>Leitungen</em><br />und Heizlast vor Ort.</>}
        ctaLabel="Heizkörper anfragen"
      />
    </>
  );
}
