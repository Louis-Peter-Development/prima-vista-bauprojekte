import { useEffect, type KeyboardEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SectionEyebrow from '../common/SectionEyebrow';
import { PREVIEW_IMAGES, TRADES, type TradeRow } from '../../data/gewerke';

type TradeIndexProps = {
  active: TradeRow;
  onActiveChange: (row: TradeRow) => void;
};

export default function TradeIndex({ active, onActiveChange }: TradeIndexProps) {
  const navigate = useNavigate();

  useEffect(() => {
    Object.values(PREVIEW_IMAGES).forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const handleRowClick = (row: TradeRow) => {
    onActiveChange(row);
    if (row.detailTo) navigate(row.detailTo);
  };

  const handleRowKeyDown = (event: KeyboardEvent<HTMLLIElement>, row: TradeRow) => {
    if (!row.detailTo) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleRowClick(row);
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
              className={`trade-list__row${row.key === active.key ? ' is-active' : ''}${row.detailTo ? ' trade-list__row--link' : ''}`}
              onPointerEnter={() => onActiveChange(row)}
              onMouseEnter={() => onActiveChange(row)}
              onFocus={() => onActiveChange(row)}
              onClick={() => handleRowClick(row)}
              onKeyDown={(event) => handleRowKeyDown(event, row)}
              tabIndex={row.detailTo ? 0 : undefined}
              role={row.detailTo ? 'link' : undefined}
              aria-label={row.detailTo ? `${row.name} Kostenrechner öffnen` : undefined}
              aria-current={row.key === active.key ? 'true' : undefined}
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
