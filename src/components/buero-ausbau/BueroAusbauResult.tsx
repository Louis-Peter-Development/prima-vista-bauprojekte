import { useTranslation } from 'react-i18next';
import { Link } from '../../i18n/Link';
import { useLocale } from '../../i18n/useLocale';
import { formatTsd, formatGroupedInt } from '../../i18n/calculatorCatalog';
import { BUERO_GEWERKE } from '../../data/bueroAusbau';
import type { KalkulatorHandoff } from '../../data/blitzAngebot';
import CalculatorPdfSender from '../calculator-pdf/CalculatorPdfSender';

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

export default function BueroAusbauResult({
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
  const { t } = useTranslation('kalk');
  const locale = useLocale();
  const pickedGewerke = BUERO_GEWERKE.filter((gewerk) => picked.includes(gewerk.key));
  const handoff: KalkulatorHandoff | null = hasPicks
    ? {
        kind: 'pakete',
        kindLabel,
        scopeLabel: 'Fläche',
        area,
        picks: pickedGewerke.map((gewerk) => ({
          key: gewerk.key,
          label: gewerk.label,
          subtotal: gewerk.pricePerM2 * area * factor,
          description: gewerk.lede,
          category: 'Büro-Ausbau',
          type: 'Gewerk',
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
            {t('result.liveEstimate')}
          </div>
          {hasPicks ? (
            <>
              <div className="kalk-result__range">
                <span className="kalk-result__from">
                  <small>{t('result.from')}</small>
                  <strong>€ {formatTsd(totalMin, locale)}</strong>
                </span>
                <span className="kalk-result__dash">—</span>
                <span className="kalk-result__to">
                  <small>{t('result.to')}</small>
                  <strong>€ {formatTsd(totalMax, locale)}</strong>
                </span>
              </div>
              <div className="kalk-result__meta">
                <span><small>{t('result.meanNet')}</small> € {formatTsd(totalMid, locale)}</span>
                <span><small>{t('result.perM2Net')}</small> € {formatGroupedInt(perM2, locale)}</span>
              </div>
              <p className="kalk-result__vat-note">{t('result.vatNote')}</p>
            </>
          ) : (
            <div className="kalk-result__empty-state">
              <div className="kalk-result__placeholder">{t('result.emptyPlaceholder')}</div>
              <p>{t('result.emptyHint')}</p>
            </div>
          )}
        </div>

        {hasPicks && (
          <div className="kalk-result__breakdown">
            <div className="kalk-result__breakdown-head">
              <span>{t('result.breakdownTitle')}</span>
              <span>{t('result.breakdownSub')}</span>
            </div>
            <ul>
              {pickedGewerke.map((gewerk) => {
                const sub = gewerk.pricePerM2 * area * factor;
                return (
                  <li key={gewerk.key}>
                    <span className="kalk-result__row-num">{gewerk.num}</span>
                    <span className="kalk-result__row-name">{t(`buero.gewerke.${gewerk.key}.label`, { defaultValue: gewerk.label })}</span>
                    <span className="kalk-result__row-value">€ {formatTsd(sub, locale)}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        <p className="kalk-result__disclaimer">
          {t('result.disclaimerBuero')}
        </p>

        <div className="kalk-result__actions">
          <CalculatorPdfSender handoff={handoff} disabled={!hasPicks} />
          <Link
            className="btn btn--solid"
            to="/blitz-angebot"
            state={handoff ? { kalkulator: handoff } : undefined}
          >
            {t('result.bindingOffer')} <span className="arrow">&gt;</span>
          </Link>
          <Link className="btn btn--appointment kalk-result__btn-light" to="/kontakt">
            {t('result.appointment')} <span className="arrow">&gt;</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
