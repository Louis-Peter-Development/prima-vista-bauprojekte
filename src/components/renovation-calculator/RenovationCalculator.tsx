import { Fragment, useCallback, useEffect, useMemo, useState, type ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from '../../i18n/Link';
import { useLocale } from '../../i18n/useLocale';
import { localizeCatalog, formatEuroLocalized } from '../../i18n/calculatorCatalog';
import {
  ChevronDownIcon,
  CopyIcon,
  MinusIcon,
  PlusIcon,
  ResetIcon,
  SwapIcon,
  TrashIcon,
} from '../icons';
import type { RenovationProduct, RenovationProductAlternative } from '../../data/calculator/types';
import { inferTradeFromSku, type BlitzFormState, type KalkulatorHandoff } from '../../data/blitzAngebot';
import { useRenovationCalculator } from '../../hooks/useRenovationCalculator';
import CalculatorPdfSender from '../calculator-pdf/CalculatorPdfSender';
import '../../styles/pages/renovation-calculator.css';

type Props = {
  packageId?: string;
  embedded?: boolean;
  livingArea?: number;
  onLivingAreaChange?: (value: number) => void;
  minimumArea?: number;
  kindLabel?: string;
  customAreaLabel?: string;
};

const BLITZ_CATEGORY_KEYS: Record<string, string> = {
  demolition: 'rohbau',
  drywall: 'trockenbau',
  electrical: 'elektro',
  painting: 'maler',
  plumbing: 'wasser',
  heating: 'heizflaechen',
  bathroom: 'bad',
  flooring: 'boeden',
  'doors-windows': 'fenster',
  kitchen: 'kueche',
  'facade-outdoor': 'fassade',
};

const PACKAGE_CALCULATOR_IDS = new Set([
  '1e',
  '1e-d',
  '2e',
  '2e-d',
  'studio',
  '2zi',
  '3zi',
  'maisonette',
]);

function inferBlitzArt(packageId: string): BlitzFormState['art'] {
  if (PACKAGE_CALCULATOR_IDS.has(packageId)) return 'pakete';
  if (packageId.startsWith('heizmethoden')) return 'heizung';
  return 'gewerke';
}

function rowTotal(row: RenovationProduct): number {
  return row.quantity * row.basePrice;
}

// Map the catalog line type to its kalk.types.* i18n key. 'service' (and any
// other value) falls through to the "Montage" label, matching the original
// German default branch.
function typeLabelKey(type: RenovationProduct['type']): string {
  switch (type) {
    case 'material':
      return 'types.material';
    case 'extra':
      return 'types.extra';
    case 'optional':
      return 'types.optional';
    default:
      return 'types.montage';
  }
}

// Canonical GERMAN line-type label. Used for the handoff payload that is POSTed
// to the server PDF, which keys on the German strings — must NOT be localized.
function typeLabelDe(type: RenovationProduct['type']): string {
  switch (type) {
    case 'material':
      return 'Material';
    case 'extra':
      return 'Extra';
    case 'optional':
      return 'Optional';
    default:
      return 'Montage';
  }
}

function decimalPlaces(value: number): number {
  const [, decimals = ''] = String(value).split('.');
  return decimals.length;
}

function normalizeNumberInputValue(value: string): string {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? String(parsed) : '0';
}

export default function RenovationCalculator({
  packageId = '1e',
  embedded,
  livingArea,
  onLivingAreaChange,
  minimumArea,
  kindLabel = '1 Etage ohne Dach',
  customAreaLabel,
}: Props = {}) {
  const { t } = useTranslation('kalk');
  const locale = useLocale();
  const { state, rowsByCategory, totals, dispatch } = useRenovationCalculator(packageId);
  const [replaceRowId, setReplaceRowId] = useState<string | null>(null);
  const areaMinimum = Math.max(0, minimumArea ?? 0);

  // Render-only localizers. The German title/lead strings stay the canonical
  // data the engine and PDF key on; only the DISPLAYED text is swapped.
  const localizeTitle = useCallback(
    (title: string) => localizeCatalog(title, title, locale),
    [locale],
  );
  const formatEuro = useCallback(
    (value: number) => formatEuroLocalized(value, locale),
    [locale],
  );
  const typeLabel = useCallback(
    (type: RenovationProduct['type']) => t(typeLabelKey(type)),
    [t],
  );

  const livingAreaForEffect = state.status === 'ready' ? state.livingArea : null;
  useEffect(() => {
    if (livingAreaForEffect == null) return;
    if (typeof livingArea === 'number' && Number.isFinite(livingArea) && livingArea !== livingAreaForEffect) {
      dispatch({ type: 'setArea', value: livingArea });
    }
  }, [dispatch, livingArea, livingAreaForEffect]);

  const categoryBreakdown = useMemo(() => (
    rowsByCategory
      .map((category) => {
        const categoryRows = category.subsections.flatMap((subsection) => subsection.rows);
        const activeRows = categoryRows.filter((row) => row.enabled);
        const subtotal = activeRows.reduce((sum, row) => sum + rowTotal(row), 0);
        const trade = inferTradeFromSku(activeRows[0]?.sku);
        const detailRows = activeRows.map((row) => {
          const subsection = category.subsections.find((item) => item.id === row.subcategory);
          return {
            // Strip trailing "| Varianten" / "**Varianten**" / "| Montage-..." cruft
            // for a tighter human-readable label.
            label: row.title.replace(/\s*\|\s*\*?\*?(Varianten|VARIANTEN)\*?\*?\s*/gi, '').trim(),
            quantity: row.quantity,
            unit: row.unit,
            unitPrice: row.basePrice,
            subtotal: rowTotal(row),
            sku: row.sku,
            description: row.description,
            image: row.image,
            category: category.title,
            subcategory: subsection?.title ?? row.subcategory,
            type: typeLabelDe(row.type),
          };
        });

        return {
          key: BLITZ_CATEGORY_KEYS[category.id] ?? category.id,
          id: category.id,
          label: category.title,
          activeCount: activeRows.length,
          totalCount: categoryRows.length,
          subtotal,
          tradeKey: trade?.key,
          tradeLabel: trade?.label,
          rows: detailRows,
        };
      })
      .filter((category) => category.subtotal > 0)
  ), [rowsByCategory]);

  const handoffArea = state.status === 'ready' ? state.livingArea : 0;
  const handoff = useMemo<KalkulatorHandoff>(() => {
    return {
      kind: inferBlitzArt(packageId),
      kindLabel,
      scopeLabel: customAreaLabel || 'Wohnfläche in qm',
      area: handoffArea,
      picks: categoryBreakdown.map((category) => ({
        key: category.key,
        label: category.label,
        subtotal: category.subtotal,
        tradeKey: category.tradeKey,
        tradeLabel: category.tradeLabel,
        rows: category.rows,
      })),
      totalMin: totals.net * 0.9,
      totalMax: totals.net * 1.15,
      totalMid: totals.net,
      perM2: totals.perM2,
    };
  }, [categoryBreakdown, customAreaLabel, kindLabel, handoffArea, packageId, totals.net, totals.perM2]);

  function replaceRow(rowId: string, alternativeId: string) {
    if (state.status !== 'ready') return;
    const row = state.rows.find((item) => item.id === rowId);
    if (!row?.canReplace) return;
    const alternative = row?.alternatives.find((item) => item.id === alternativeId);
    if (!alternative) return;
    dispatch({ type: 'replaceRow', id: rowId, alternative });
    setReplaceRowId(null);
  }

  function onAreaChange(event: ChangeEvent<HTMLInputElement>) {
    const normalizedValue = normalizeNumberInputValue(event.currentTarget.value);
    if (event.currentTarget.value !== normalizedValue) {
      event.currentTarget.value = normalizedValue;
    }

    const nextArea = Number(normalizedValue);
    dispatch({ type: 'setArea', value: nextArea });
    onLivingAreaChange?.(nextArea);
  }

  function onAreaBlur() {
    if (state.status !== 'ready') return;
    if (state.livingArea < areaMinimum) {
      dispatch({ type: 'setArea', value: areaMinimum });
      onLivingAreaChange?.(areaMinimum);
    }
  }

  if (state.status !== 'ready') {
    return (
      <section
        className={`renocalc renocalc--loading${embedded ? ' renocalc--embedded' : ''}`}
        aria-label={t('reno.aria')}
        aria-busy="true"
      >
        <div className="renocalc__loading">{t('reno.loading')}</div>
      </section>
    );
  }

  function stepRowQuantity(row: RenovationProduct, direction: -1 | 1) {
    const step = row.quantityStep || 1;
    const precision = Math.max(decimalPlaces(step), decimalPlaces(row.quantity));
    const next = Number((row.quantity + (step * direction)).toFixed(precision));
    dispatch({ type: 'updateQuantity', id: row.id, value: next });
  }

  return (
    <section
      className={`renocalc${embedded ? ' renocalc--embedded' : ''}`}
      aria-label={t('reno.aria')}
      data-calculator-result
    >
      <div className="renocalc__workspace">
        <div className="renocalc__main">
          <div className="renocalc__toolbar">
            <div className="renocalc__area">
              <label htmlFor="renocalc-area">{customAreaLabel ? localizeTitle(customAreaLabel) : t('reno.areaLabel')}</label>
              <input
                id="renocalc-area"
                type="number"
                min={areaMinimum}
                step="1"
                value={state.livingArea}
                onChange={onAreaChange}
                onBlur={onAreaBlur}
              />
            </div>
          </div>

          <div className="renocalc__meta">
            <span>{t('reno.itemsActive', { active: totals.activeCount, total: totals.totalCount })}</span>
            <span>{t('reno.netPerM2', { value: formatEuro(totals.perM2) })}</span>
            <button type="button" onClick={() => dispatch({ type: 'reset' })} title={t('reno.reset')} aria-label={t('reno.reset')}>
              <ResetIcon aria-hidden="true" />
            </button>
          </div>

          <div className="renocalc__table-shell">
            <table className="renocalc-table">
              <thead>
                <tr>
                  <th>{t('reno.colName')}</th>
                  <th>{t('reno.colQuantity')}</th>
                  <th>{t('reno.colUnit')}</th>
                  <th>{t('reno.colPrice')}</th>
                  <th>{t('reno.colTotal')}</th>
                  <th>{t('reno.colActions')}</th>
                </tr>
              </thead>
              <tbody>
                {rowsByCategory.map((category) => {
                  const categoryRows = category.subsections.flatMap((subsection) => subsection.rows);
                  const activeRows = categoryRows.filter((row) => row.enabled).length;
                  const categoryTotal = categoryRows.reduce((sum, row) => sum + (row.enabled ? rowTotal(row) : 0), 0);
                  const categoryCollapsed = Boolean(state.collapsed[category.id]);

                  return (
                    <Fragment key={category.id}>
                      <tr className="renocalc-table__category">
                        <th colSpan={6}>
                          <button
                            type="button"
                            onClick={() => dispatch({ type: 'toggleCategory', id: category.id })}
                            aria-expanded={!categoryCollapsed}
                          >
                            <ChevronDownIcon aria-hidden="true" className={categoryCollapsed ? '' : 'is-open'} />
                            <span>
                              {localizeTitle(category.title)}
                              <small>{localizeTitle(category.lead)}</small>
                            </span>
                            <em>{activeRows}/{categoryRows.length}</em>
                            <strong>{formatEuro(categoryTotal)}</strong>
                          </button>
                        </th>
                      </tr>

                      {!categoryCollapsed && category.subsections.map((subsection) => {
                        const disabledOptionalCount = subsection.rows.filter((row) => row.optional && !row.enabled).length;

                        return (
                          <Fragment key={`${category.id}:${subsection.id}`}>
                            <tr className="renocalc-table__subhead">
                              <th colSpan={6}>
                                <span>{localizeTitle(subsection.title)}</span>
                                {disabledOptionalCount > 0 && (
                                  <button
                                    type="button"
                                    onClick={() => dispatch({ type: 'enableSubsection', category: category.id, subcategory: subsection.id })}
                                    title={t('reno.enableOptional')}
                                    aria-label={t('reno.enableOptional')}
                                  >
                                    <PlusIcon aria-hidden="true" />
                                  </button>
                                )}
                              </th>
                            </tr>

                            {subsection.rows.map((row) => {
                              const rowTitle = localizeCatalog(row.sku, row.title, locale);
                              return (
                              <tr className={`renocalc-table__row${row.enabled ? '' : ' is-off'}${row.optional ? ' is-optional' : ''}`} key={row.id}>
                                <td data-label={t('reno.colName')}>
                                  <label className="renocalc-row-name">
                                    <input
                                      type="checkbox"
                                      checked={row.enabled}
                                      onChange={() => dispatch({ type: 'toggleRow', id: row.id })}
                                      aria-label={t('reno.toggleRow', { name: rowTitle })}
                                    />
                                    <span className="renocalc-row-name__check" aria-hidden="true" />
                                    <span className="renocalc-row-name__text">
                                      <em>{typeLabel(row.type)}</em>
                                      <strong>{rowTitle}</strong>
                                      <small>{row.description}</small>
                                    </span>
                                  </label>
                                  {replaceRowId === row.id && (
                                    <select
                                      className="renocalc-replace"
                                      value={row.alternatives.find((item) => item.sku === row.sku)?.id ?? row.alternatives[0]?.id}
                                      onChange={(event) => replaceRow(row.id, event.target.value)}
                                      aria-label={t('reno.replaceRow', { name: rowTitle })}
                                    >
                                      {row.alternatives.map((alternative: RenovationProductAlternative) => (
                                        <option key={alternative.id} value={alternative.id}>
                                          {alternative.title} · {formatEuro(alternative.basePrice)}
                                        </option>
                                      ))}
                                    </select>
                                  )}
                                </td>
                                <td data-label={t('reno.colQuantity')}>
                                  <div className="renocalc-stepper">
                                    <button
                                      type="button"
                                      onClick={() => stepRowQuantity(row, -1)}
                                      disabled={row.quantity <= 0}
                                      title={t('reno.qtyDecrease')}
                                      aria-label={t('reno.qtyDecreaseRow', { name: rowTitle })}
                                    >
                                      <MinusIcon aria-hidden="true" />
                                    </button>
                                    <input
                                      type="number"
                                      min={0}
                                      step={row.quantityStep}
                                      value={row.quantity}
                                      onChange={(event) => dispatch({
                                        type: 'updateQuantity',
                                        id: row.id,
                                        value: Number(event.target.value),
                                      })}
                                      aria-label={t('reno.qtyRow', { name: rowTitle })}
                                    />
                                    <button
                                      type="button"
                                      onClick={() => stepRowQuantity(row, 1)}
                                      title={t('reno.qtyIncrease')}
                                      aria-label={t('reno.qtyIncreaseRow', { name: rowTitle })}
                                    >
                                      <PlusIcon aria-hidden="true" />
                                    </button>
                                  </div>
                                </td>
                                <td data-label={t('reno.colUnit')}>{row.unit}</td>
                                <td data-label={t('reno.colPrice')}>{formatEuro(row.basePrice)}</td>
                                <td data-label={t('reno.colTotal')}>{formatEuro(rowTotal(row))}</td>
                                <td data-label={t('reno.colActions')}>
                                  <div className="renocalc-actions">
                                    <button
                                      type="button"
                                      onClick={() => setReplaceRowId(replaceRowId === row.id ? null : row.id)}
                                      title={row.canReplace && row.alternatives.length > 0 ? t('reno.swap') : t('reno.swapDisabled')}
                                      aria-label={row.canReplace && row.alternatives.length > 0 ? t('reno.swap') : t('reno.swapDisabled')}
                                      disabled={!row.canReplace || row.alternatives.length === 0}
                                    >
                                      <SwapIcon aria-hidden="true" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => dispatch({ type: 'duplicateRow', id: row.id })}
                                      title={row.canDuplicate ? t('reno.duplicate') : t('reno.duplicateDisabled')}
                                      aria-label={row.canDuplicate ? t('reno.duplicate') : t('reno.duplicateDisabled')}
                                      disabled={!row.canDuplicate}
                                    >
                                      <CopyIcon aria-hidden="true" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => dispatch({ type: 'removeRow', id: row.id })}
                                      title={row.canRemove ? t('reno.remove') : t('reno.removeDisabled')}
                                      aria-label={row.canRemove ? t('reno.remove') : t('reno.removeDisabled')}
                                      disabled={!row.canRemove}
                                    >
                                      <TrashIcon aria-hidden="true" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                              );
                            })}
                          </Fragment>
                        );
                      })}
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <aside className="renocalc-live" aria-label={t('reno.liveOffer')} aria-live="polite">
          <div className="renocalc-live__sticky">
            <span className="renocalc-live__eyebrow">{t('reno.liveOffer')}</span>
            <strong className="renocalc-live__gross">{formatEuro(totals.gross)}</strong>
            <span className="renocalc-live__vat-note">{t('reno.vatInclNote')}</span>

            <dl className="renocalc-live__totals">
              <div>
                <dt>{t('reno.totalNet')}</dt>
                <dd>{formatEuro(totals.net)}</dd>
              </div>
              <div>
                <dt>{t('reno.vatLine')}</dt>
                <dd>{formatEuro(totals.vat)}</dd>
              </div>
              <div>
                <dt>{t('reno.totalGross')}</dt>
                <dd>{formatEuro(totals.gross)}</dd>
              </div>
            </dl>

            <div className="renocalc-live__meta">
              <span>{t('reno.itemsCount', { count: totals.activeCount })}</span>
              <span>{state.livingArea} {t('reno.areaUnit')}</span>
              <span>{t('reno.netPerM2', { value: formatEuro(totals.perM2) })}</span>
            </div>

            <div className="renocalc-live__breakdown">
              {categoryBreakdown.slice(0, 6).map((category) => (
                <div className="renocalc-live__row" key={category.id}>
                  <span>
                    <strong>{localizeTitle(category.label)}</strong>
                    <small>{t('reno.itemsOf', { active: category.activeCount, total: category.totalCount })}</small>
                  </span>
                  <em>{formatEuro(category.subtotal)}</em>
                </div>
              ))}
            </div>

            <p>{t('reno.disclaimer')}</p>

            <CalculatorPdfSender handoff={handoff} />

            <Link className="btn btn--solid" to="/blitz-angebot" state={{ kalkulator: handoff }}>
              {t('reno.requestOffer')} <span className="arrow">&gt;</span>
            </Link>
          </div>
        </aside>
      </div>
    </section>
  );
}
