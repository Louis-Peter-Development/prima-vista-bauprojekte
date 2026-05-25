import { useEffect, type PointerEvent } from 'react';
import { Link } from 'react-router-dom';
import SectionEyebrow from '../common/SectionEyebrow';
import { PREVIEW_IMAGES, TRADES, type TradeRow } from '../../data/gewerke';

type TradeIndexProps = {
  active: TradeRow;
  onActiveChange: (row: TradeRow) => void;
};

export default function TradeIndex({ active, onActiveChange }: TradeIndexProps) {
  useEffect(() => {
    Object.values(PREVIEW_IMAGES).forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const handleRowPointerEnter = (event: PointerEvent, row: TradeRow) => {
    if (event.pointerType === 'mouse' || event.pointerType === 'pen') {
      onActiveChange(row);
    }
  };

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
        <div className="trade-index__preview reveal reveal--scale">
          <img
            key={active.key}
            src={PREVIEW_IMAGES[active.key]}
            alt={active.name}
            width="800"
            height="600"
          />
          <div className={`trade-index__preview-cap${active.detailTo ? ' trade-index__preview-cap--with-link' : ''}`}>
            <span className="num">№ {active.num}</span>
            <span className="ttl">{active.name}</span>
          </div>
          {active.detailTo ? (
            <Link className="trade-index__preview-link" to={active.detailTo}>
              Kostenrechner öffnen <span>›</span>
            </Link>
          ) : null}
        </div>

        <ul className="trade-list">
          {TRADES.map((row) => (
            <li
              key={row.num}
              className={row.key === active.key ? 'is-active' : undefined}
            >
              <Link
                className={`trade-list__row${row.key === active.key ? ' is-active' : ''}`}
                to={row.detailTo ?? '/kontakt'}
                onPointerEnter={(event) => handleRowPointerEnter(event, row)}
                onFocus={() => onActiveChange(row)}
                aria-label={`${row.name} Kostenrechner öffnen`}
                aria-current={row.key === active.key ? 'page' : undefined}
              >
                <span className="num">{row.num}</span>
                <span className="name">{row.name}</span>
                <span className="lead">{row.lead}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
