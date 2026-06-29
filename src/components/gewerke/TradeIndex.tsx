import { useEffect, type PointerEvent } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from '../../i18n/Link';
import SectionEyebrow from '../common/SectionEyebrow';
import { PREVIEW_IMAGES, TRADES, type TradeRow } from '../../data/gewerke';

type TradeIndexProps = {
  active: TradeRow;
  onActiveChange: (row: TradeRow) => void;
};

export default function TradeIndex({ active, onActiveChange }: TradeIndexProps) {
  const { t } = useTranslation('pages');

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

  const activeName = t(`gewerke.trades.${active.key}.name`);

  return (
    <section className="trade-index">
      <div className="trade-index__head">
        <div className="reveal">
          <SectionEyebrow>{t('gewerke.index.eyebrow')}</SectionEyebrow>
          <h2>
            <Trans i18nKey="pages:gewerke.index.title" components={{ em: <em />, br: <br /> }} />
          </h2>
        </div>
        <p className="reveal" data-delay="1">{t('gewerke.index.intro')}</p>
      </div>

      <div className="trade-index__split">
        <div className="trade-index__preview reveal reveal--scale">
          <img
            key={active.key}
            src={PREVIEW_IMAGES[active.key]}
            alt={activeName}
            width="800"
            height="600"
          />
          <div className={`trade-index__preview-cap${active.detailTo ? ' trade-index__preview-cap--with-link' : ''}`}>
            <span className="num">№ {active.num}</span>
            <span className="ttl">{activeName}</span>
          </div>
          {active.detailTo ? (
            <Link className="trade-index__preview-link" to={active.detailTo}>
              {t('gewerke.index.openCalculator')} <span>›</span>
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
                aria-label={t('gewerke.index.openAria', { name: t(`gewerke.trades.${row.key}.name`) })}
                aria-current={row.key === active.key ? 'page' : undefined}
              >
                <span className="num">{row.num}</span>
                <span className="name">{t(`gewerke.trades.${row.key}.name`)}</span>
                <span className="lead">{t(`gewerke.trades.${row.key}.lead`)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
