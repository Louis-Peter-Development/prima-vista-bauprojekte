import { Link } from 'react-router-dom';
import { WOHNUNG_GEWERKE, formatTsd } from '../../data/wohnungSanierung';
import type { KalkulatorHandoff } from '../../data/blitzAngebot';

type Props = {
  hasPicks: boolean;
  totalMin: number;
  totalMax: number;
  totalMid: number;
  perM2: number;
  area: number;
  picked: string[];
  factor: number;
  kindLabel: string;
};

export default function WohnungSanierungResult({
  hasPicks,
  totalMin,
  totalMax,
  totalMid,
  perM2,
  area,
  picked,
  factor,
  kindLabel,
}: Props) {
  const pickedGewerke = WOHNUNG_GEWERKE.filter((g) => picked.includes(g.key));
  const handoff: KalkulatorHandoff | null = hasPicks
    ? {
        kind: 'wohnung',
        kindLabel,
        area,
        picks: pickedGewerke.map((g) => ({
          key: g.key,
          label: g.label,
          subtotal: g.pricePerM2 * area * factor,
        })),
        totalMin,
        totalMax,
        totalMid,
        perM2,
      }
    : null;
  return (
    <aside className="kalk-result" data-calculator-result>
      <div className="kalk-result__sticky">
        <div className="kalk-result__head">
          <div className="kalk-result__eyebrow">
            <span className="rule-red"></span>
            Live-Schätzung
          </div>
          {hasPicks ? (
            <>
              <div className="kalk-result__range">
                <span className="kalk-result__from">
                  <small>ab</small>
                  <strong>€ {formatTsd(totalMin)}</strong>
                </span>
                <span className="kalk-result__dash">—</span>
                <span className="kalk-result__to">
                  <small>bis</small>
                  <strong>€ {formatTsd(totalMax)}</strong>
                </span>
              </div>
              <div className="kalk-result__meta">
                <span><small>Mittelwert</small> € {formatTsd(totalMid)}</span>
                <span><small>pro m²</small> € {Math.round(perM2).toLocaleString('de-DE')}</span>
              </div>
            </>
          ) : (
            <div className="kalk-result__empty-state">
              <div className="kalk-result__placeholder">— — —</div>
              <p>Wählen Sie mindestens ein Gewerk, um eine erste Spanne zu sehen.</p>
            </div>
          )}
        </div>

        {hasPicks && (
          <div className="kalk-result__breakdown">
            <div className="kalk-result__breakdown-head">
              <span>Aufstellung</span>
              <span>nach Gewerk</span>
            </div>
            <ul>
              {pickedGewerke.map((g) => {
                const sub = g.pricePerM2 * area * factor;
                return (
                  <li key={g.key}>
                    <span className="kalk-result__row-num">{g.num}</span>
                    <span className="kalk-result__row-name">{g.label}</span>
                    <span className="kalk-result__row-value">€ {formatTsd(sub)}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        <p className="kalk-result__disclaimer">
          Vorab-Schätzung für die gewählten Wohnungstyp- und Gewerk-Optionen — exklusive Sondergewerke, Genehmigungen und Bauleitungspauschale. Verbindliche Preise nach Aufmaß vor Ort.
        </p>

        <div className="kalk-result__actions">
          <Link
            className="btn btn--solid"
            to="/blitz-angebot"
            state={handoff ? { kalkulator: handoff } : undefined}
          >
            Verbindliches Angebot <span className="arrow">&gt;</span>
          </Link>
          <Link className="btn btn--light kalk-result__btn-light" to="/kontakt">
            Termin vereinbaren <span className="arrow">&gt;</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
