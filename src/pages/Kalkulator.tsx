import { Suspense, useEffect, useRef, useState } from 'react';
import PageIntro from '../components/common/PageIntro';
import KalkCategoryPicker from '../components/kalkulator/KalkCategoryPicker';
import KalkLeafPicker from '../components/kalkulator/KalkLeafPicker';
import { KATEGORIEN, type KategorieKey } from '../data/kalkulatorNav';
import { usePageTitle } from '../hooks/usePageTitle';
import '../styles/pages/kalkulator.css';

export default function Kalkulator() {
  usePageTitle('Kostenkalkulator für Sanierung & Bau');
  const [kategorieKey, setKategorieKey] = useState<KategorieKey | null>(null);
  const [leafKey, setLeafKey] = useState<string | null>(null);
  const embedRef = useRef<HTMLDivElement | null>(null);

  const category = KATEGORIEN.find((c) => c.key === kategorieKey) ?? null;
  const leaf = category?.leaves.find((l) => l.key === leafKey) ?? null;
  const LeafComponent = leaf?.Component ?? null;

  useEffect(() => {
    if (!leafKey || !embedRef.current) return;
    embedRef.current.scrollIntoView({ block: 'start' });
  }, [leafKey]);

  function selectCategory(key: KategorieKey) {
    setKategorieKey(key);
    setLeafKey(null);
  }

  return (
    <>
      <PageIntro
        className="kalk-intro"
        backgroundImage="/assets/img/photo-parkett-altbau.webp"
        crumbNumber="06"
        crumbLabel="Kalkulator · Live-Schätzung"
        title={<>Was kostet<br />Ihr <em>Bauprojekt?</em></>}
        lede="Ein paar Klicks. Eine ehrliche Spanne. Auf Basis von Daten aus über 400 abgeschlossenen Projekten in Hessen und der Innerschweiz — ohne Anmeldung, ohne Verkaufstaktik."
        meta={[
          { label: 'Berechnung', value: 'Live, in Echtzeit' },
          { label: 'Datenbasis', value: '412 reale Projekte' },
          { label: 'Genauigkeit', value: '−15 % / +20 % Vorab-Spanne' },
          { label: 'Festpreis', value: 'Auf Wunsch in 24 Std.' },
        ]}
      />

      <section className={`kalkulator kalkulator--nav ${LeafComponent ? 'has-embed' : ''}`}>
        <div className="kalkulator__inner kalkulator__inner--stack">
          <KalkCategoryPicker selected={kategorieKey} onSelect={selectCategory} />
          {category && (
            <KalkLeafPicker
              category={category}
              selected={leafKey}
              onSelect={setLeafKey}
            />
          )}
        </div>
      </section>

      {LeafComponent && (
        <div ref={embedRef} className="kalk-embed-wrap">
          <Suspense fallback={<div className="kalk-loading">Wird geladen …</div>}>
            <LeafComponent embedded />
          </Suspense>
        </div>
      )}
    </>
  );
}
