import SectionEyebrow from '../common/SectionEyebrow';
import { PREVIEW_IMAGES, TRADES, type TradeKey, type TradeRow } from '../../data/gewerke';

type TradeIndexProps = {
  active: TradeRow;
  onActiveChange: (row: TradeRow) => void;
};

export default function TradeIndex({ active, onActiveChange }: TradeIndexProps) {
  return (
    <section className="trade-index">
      <div className="trade-index__head">
        <div className="reveal">
          <SectionEyebrow>Alle Gewerke</SectionEyebrow>
          <h2>
            Das vollständige<br />
            <em>Verzeichnis.</em>
          </h2>
        </div>
        <p className="reveal" data-delay="1">
          Fahren Sie über einen Eintrag, um eine Vorschau zu sehen. Jedes Gewerk wird durch eigene Bauleitung koordiniert — Sie buchen einzeln oder gebündelt.
        </p>
      </div>

      <div className="trade-index__split">
        <div className="trade-index__preview">
          {(Object.keys(PREVIEW_IMAGES) as TradeKey[]).map((key) => (
            <img
              key={key}
              src={PREVIEW_IMAGES[key]}
              alt=""
              className={key === active.key ? 'is-active' : ''}
            />
          ))}
          <div className="trade-index__preview-cap">
            <span className="num">№ {active.num}</span>
            <span className="ttl">{active.name}</span>
          </div>
        </div>

        <ul className="trade-list">
          {TRADES.map((row) => (
            <li
              key={row.num}
              className={`trade-list__row${row === active ? ' is-active' : ''}`}
              onMouseEnter={() => onActiveChange(row)}
              onClick={() => onActiveChange(row)}
            >
              <span className="num">{row.num}</span>
              <span className="name">{row.name}</span>
              <span className="lead">{row.lead}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
