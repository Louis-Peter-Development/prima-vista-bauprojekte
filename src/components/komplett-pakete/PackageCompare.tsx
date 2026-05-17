import SectionEyebrow from '../common/SectionEyebrow';
import { COMPARE_ROWS } from '../../data/komplettPakete';

export default function PackageCompare() {
  return (
    <section className="compare">
      <div className="compare__head reveal">
        <SectionEyebrow>Im Vergleich</SectionEyebrow>
        <h2>
          Welches Paket passt zu <em>Ihrem</em> Projekt?
        </h2>
        <p>
          Die Antwort steckt fast immer in zwei Fragen: Wohnen Sie selbst dort? Und wie groß ist der Eingriff? Die folgenden Werte sind unsere Median-Erfahrungen aus 412 Projekten.
        </p>
      </div>
      <div className="compare__table">
        <div className="compare__grid">
          <div className="compare__row">
            <div className="compare__cell compare__cell--head">Merkmal</div>
            <div className="compare__cell compare__cell--head">Haus</div>
            <div className="compare__cell compare__cell--head" style={{ color: 'var(--pv-copper)' }}>Wohnung</div>
            <div className="compare__cell compare__cell--head">Gastro</div>
          </div>
          {COMPARE_ROWS.map((row) => (
            <div key={row.feature} className="compare__row">
              <div className="compare__cell compare__cell--first">{row.feature}</div>
              <div className="compare__cell" data-label="Haus">{row.haus}</div>
              <div className="compare__cell compare__highlight" data-label="Wohnung">{row.wohnung}</div>
              <div className="compare__cell" data-label="Gastro">{row.gastro}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
