import { Trans, useTranslation } from 'react-i18next';
import SectionEyebrow from '../common/SectionEyebrow';
import { COMPARE_ROWS, type CompareCell, type PackageKey } from '../../data/komplettPakete';

const COLS: Array<{ key: PackageKey; col: string }> = [
  { key: 'haus', col: 'colHaus' },
  { key: 'wohnung', col: 'colWohnung' },
  { key: 'gastro', col: 'colGastro' },
  { key: 'buero', col: 'colBuero' },
];

export default function PackageCompare() {
  const { t } = useTranslation('pages');

  const renderCell = (rowKey: string, col: PackageKey, kind: CompareCell) => {
    if (kind === 'check') return <span className="compare__check">✓</span>;
    if (kind === 'no') return <span className="compare__no">—</span>;
    const text = t(`pakete.compare.rows.${rowKey}.${col}`);
    if (kind === 'noText') return <span className="compare__no">{text}</span>;
    return <span className="num">{text}</span>;
  };

  return (
    <section className="compare">
      <div className="compare__head reveal">
        <SectionEyebrow>{t('pakete.compare.eyebrow')}</SectionEyebrow>
        <h2>
          <Trans i18nKey="pages:pakete.compare.title" components={{ em: <em /> }} />
        </h2>
        <p>{t('pakete.compare.intro')}</p>
      </div>
      <div className="compare__table">
        <div className="compare__grid">
          <div className="compare__row">
            <div className="compare__cell compare__cell--head">{t('pakete.compare.colFeature')}</div>
            {COLS.map(({ key, col }) => (
              <div
                key={key}
                className="compare__cell compare__cell--head"
                style={key === 'wohnung' ? { color: 'var(--pv-copper)' } : undefined}
              >
                {t(`pakete.compare.${col}`)}
              </div>
            ))}
          </div>
          {COMPARE_ROWS.map((row) => (
            <div key={row.key} className="compare__row">
              <div className="compare__cell compare__cell--first">{t(`pakete.compare.rows.${row.key}.feature`)}</div>
              {COLS.map(({ key, col }) => (
                <div
                  key={key}
                  className={`compare__cell${key === 'wohnung' ? ' compare__highlight' : ''}`}
                  data-label={t(`pakete.compare.${col}`)}
                >
                  {renderCell(row.key, key, row.cells[key])}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
