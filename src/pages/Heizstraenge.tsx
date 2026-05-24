import PageIntro from '../components/common/PageIntro';
import EndCtaLocal from '../components/common/EndCtaLocal';
import HeizstraengeCalculator from '../components/heizstraenge/HeizstraengeCalculator';
import { usePageTitle } from '../hooks/usePageTitle';
import '../styles/pages/heizkoerper.css';

export default function Heizstraenge() {
  usePageTitle('Heizstränge Kostenrechner');

  return (
    <>
      <PageIntro
        backgroundImage="/assets/img/photo-parkett-rohbau.webp"
        crumbNumber="11"
        crumbLabel="Heizung & Sanitär · Kostenrechner"
        title={<>Heizstränge<br /><em>kalkulieren.</em></>}
        lede="Aufputz oder Unterputz, laufende Meter und optionales Kurzstrecken-Paket. Für neue Heizungsleitungen in Wohnungen, Häusern und Etagenabschnitten."
        meta={[
          { label: 'Standard', value: '50 lfm. Aufputz' },
          { label: 'Option', value: 'Unterputz' },
          { label: 'Paket', value: 'bis 5 m' },
          { label: 'Ausgabe', value: 'Netto & Brutto' },
        ]}
      />

      <HeizstraengeCalculator />

      <EndCtaLocal
        eyebrow="Leitungsführung noch offen?"
        title={<>Wir planen <em>Trassen</em><br />und Anschlüsse vor Ort.</>}
        ctaLabel="Heizstränge anfragen"
      />
    </>
  );
}
