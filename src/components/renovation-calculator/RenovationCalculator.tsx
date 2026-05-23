import { Fragment, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronDownIcon,
  CopyIcon,
  PlusIcon,
  ResetIcon,
  SwapIcon,
  TrashIcon,
} from '../icons';
import { formatEuro } from '../../data/calculator/engine';
import type { RenovationProduct, RenovationProductAlternative } from '../../data/calculator/types';
import type { KalkulatorHandoff } from '../../data/blitzAngebot';
import { useRenovationCalculator } from '../../hooks/useRenovationCalculator';
import '../../styles/pages/renovation-calculator.css';

type Props = {
  packageId?: string;
  embedded?: boolean;
  livingArea?: number;
  onLivingAreaChange?: (value: number) => void;
  kindLabel?: string;
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

function rowTotal(row: RenovationProduct): number {
  return row.quantity * row.basePrice;
}

function typeLabel(type: RenovationProduct['type']): string {
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

export default function RenovationCalculator({
  packageId = '1e',
  embedded,
  livingArea,
  onLivingAreaChange,
  kindLabel = '1 Etage ohne Dach',
}: Props = {}) {
  const { state, rowsByCategory, totals, minArea, dispatch } = useRenovationCalculator(packageId);
  const [replaceRowId, setReplaceRowId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof livingArea === 'number' && Number.isFinite(livingArea) && livingArea !== state.livingArea) {
      dispatch({ type: 'setArea', value: livingArea });
    }
  }, [dispatch, livingArea, state.livingArea]);

  const categoryBreakdown = useMemo(() => (
    rowsByCategory
      .map((category) => {
        const categoryRows = category.subsections.flatMap((subsection) => subsection.rows);
        const activeRows = categoryRows.filter((row) => row.enabled);
        const subtotal = activeRows.reduce((sum, row) => sum + rowTotal(row), 0);

        return {
          key: BLITZ_CATEGORY_KEYS[category.id] ?? category.id,
          id: category.id,
          label: category.title,
          activeCount: activeRows.length,
          totalCount: categoryRows.length,
          subtotal,
        };
      })
      .filter((category) => category.subtotal > 0)
  ), [rowsByCategory]);

  const handoff = useMemo<KalkulatorHandoff>(() => {
    return {
      kind: 'haus',
      kindLabel,
      area: state.livingArea,
      picks: categoryBreakdown.map((category) => ({
        key: category.key,
        label: category.label,
        subtotal: category.subtotal,
      })),
      totalMin: totals.net * 0.9,
      totalMax: totals.net * 1.15,
      totalMid: totals.net,
      perM2: totals.perM2,
    };
  }, [categoryBreakdown, kindLabel, state.livingArea, totals.net, totals.perM2]);

  function replaceRow(rowId: string, alternativeId: string) {
    const row = state.rows.find((item) => item.id === rowId);
    const alternative = row?.alternatives.find((item) => item.id === alternativeId);
    if (!alternative) return;
    dispatch({ type: 'replaceRow', id: rowId, alternative });
    setReplaceRowId(null);
  }

  function onAreaChange(value: string) {
    const next = Number(value);
    const nextArea = Number.isFinite(next) ? next : 0;
    dispatch({ type: 'setArea', value: nextArea });
    onLivingAreaChange?.(nextArea);
  }

  function onAreaBlur() {
    if (state.livingArea < minArea) {
      dispatch({ type: 'setArea', value: minArea });
      onLivingAreaChange?.(minArea);
    }
  }

  return (
    <section
      className={`renocalc${embedded ? ' renocalc--embedded' : ''}`}
      aria-label="Renovierung Konfigurator"
      data-calculator-result
    >
      <div className="renocalc__workspace">
        <div className="renocalc__main">
          <div className="renocalc__toolbar">
            <div className="renocalc__area">
              <label htmlFor="renocalc-area">Wohnfläche in qm</label>
              <input
                id="renocalc-area"
                type="number"
                min={minArea}
                step="1"
                value={state.livingArea}
                onChange={(event) => onAreaChange(event.target.value)}
                onBlur={onAreaBlur}
              />
            </div>
          </div>

          <div className="renocalc__meta">
            <span>{totals.activeCount} von {totals.totalCount} Positionen aktiv</span>
            <span>{formatEuro(totals.perM2)} netto / qm</span>
            <button type="button" onClick={() => dispatch({ type: 'reset' })} title="Konfiguration zuruecksetzen" aria-label="Konfiguration zuruecksetzen">
              <ResetIcon aria-hidden="true" />
            </button>
          </div>

          <div className="renocalc__table-shell">
            <table className="renocalc-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Menge</th>
                  <th>VPE</th>
                  <th>Preis</th>
                  <th>Gesamt</th>
                  <th>Aktionen</th>
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
                              {category.title}
                              <small>{category.lead}</small>
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
                                <span>{subsection.title}</span>
                                {disabledOptionalCount > 0 && (
                                  <button
                                    type="button"
                                    onClick={() => dispatch({ type: 'enableSubsection', category: category.id, subcategory: subsection.id })}
                                    title="Optionale Positionen aktivieren"
                                    aria-label="Optionale Positionen aktivieren"
                                  >
                                    <PlusIcon aria-hidden="true" />
                                  </button>
                                )}
                              </th>
                            </tr>

                            {subsection.rows.map((row) => (
                              <tr className={`renocalc-table__row${row.enabled ? '' : ' is-off'}${row.optional ? ' is-optional' : ''}`} key={row.id}>
                                <td data-label="Name">
                                  <label className="renocalc-row-name">
                                    <input
                                      type="checkbox"
                                      checked={row.enabled}
                                      onChange={() => dispatch({ type: 'toggleRow', id: row.id })}
                                      aria-label={`${row.title} aktivieren`}
                                    />
                                    <span className="renocalc-row-name__check" aria-hidden="true" />
                                    <span className="renocalc-row-name__text">
                                      <em>{typeLabel(row.type)}</em>
                                      <strong>{row.title}</strong>
                                      <small>{row.description}</small>
                                    </span>
                                  </label>
                                  {replaceRowId === row.id && (
                                    <select
                                      className="renocalc-replace"
                                      value={row.alternatives.find((item) => item.sku === row.sku)?.id ?? row.alternatives[0]?.id}
                                      onChange={(event) => replaceRow(row.id, event.target.value)}
                                      aria-label={`${row.title} ersetzen`}
                                    >
                                      {row.alternatives.map((alternative: RenovationProductAlternative) => (
                                        <option key={alternative.id} value={alternative.id}>
                                          {alternative.title} · {formatEuro(alternative.basePrice)}
                                        </option>
                                      ))}
                                    </select>
                                  )}
                                </td>
                                <td data-label="Menge">
                                  <input
                                    type="number"
                                    min={row.minQuantity}
                                    step={row.quantityStep}
                                    value={row.quantity}
                                    onChange={(event) => dispatch({
                                      type: 'updateQuantity',
                                      id: row.id,
                                      value: Number(event.target.value),
                                    })}
                                    aria-label={`Menge ${row.title}`}
                                  />
                                </td>
                                <td data-label="VPE">{row.unit}</td>
                                <td data-label="Preis">{formatEuro(row.basePrice)}</td>
                                <td data-label="Gesamt">{formatEuro(rowTotal(row))}</td>
                                <td data-label="Aktionen">
                                  <div className="renocalc-actions">
                                    <button type="button" onClick={() => setReplaceRowId(replaceRowId === row.id ? null : row.id)} title="Produkt tauschen" aria-label="Produkt tauschen">
                                      <SwapIcon aria-hidden="true" />
                                    </button>
                                    <button type="button" onClick={() => dispatch({ type: 'duplicateRow', id: row.id })} title="Produkt duplizieren" aria-label="Produkt duplizieren">
                                      <CopyIcon aria-hidden="true" />
                                    </button>
                                    <button type="button" onClick={() => dispatch({ type: 'removeRow', id: row.id })} title="Produkt entfernen" aria-label="Produkt entfernen">
                                      <TrashIcon aria-hidden="true" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
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

        <aside className="renocalc-live" aria-label="Live-Angebot" aria-live="polite">
          <div className="renocalc-live__sticky">
            <span className="renocalc-live__eyebrow">Live-Angebot</span>
            <strong className="renocalc-live__gross">{formatEuro(totals.gross)}</strong>
            <span className="renocalc-live__vat-note">inkl. 19 % MwSt.</span>

            <dl className="renocalc-live__totals">
              <div>
                <dt>Gesamtnettosumme</dt>
                <dd>{formatEuro(totals.net)}</dd>
              </div>
              <div>
                <dt>zzgl. 19 % MwSt.</dt>
                <dd>{formatEuro(totals.vat)}</dd>
              </div>
              <div>
                <dt>Gesamtsumme</dt>
                <dd>{formatEuro(totals.gross)}</dd>
              </div>
            </dl>

            <div className="renocalc-live__meta">
              <span>{totals.activeCount} Positionen</span>
              <span>{state.livingArea} qm</span>
              <span>{formatEuro(totals.perM2)} netto / qm</span>
            </div>

            <div className="renocalc-live__breakdown">
              {categoryBreakdown.slice(0, 6).map((category) => (
                <div className="renocalc-live__row" key={category.id}>
                  <span>
                    <strong>{category.label}</strong>
                    <small>{category.activeCount} von {category.totalCount} Positionen</small>
                  </span>
                  <em>{formatEuro(category.subtotal)}</em>
                </div>
              ))}
            </div>

            <p>Vorab-Schätzung auf Basis der ausgewählten Positionen. Verbindliche Preise nach Aufmaß, Prüfung und Materialbemusterung.</p>

            <Link className="btn btn--solid" to="/blitz-angebot" state={{ kalkulator: handoff }}>
              Als Angebot anfragen <span className="arrow">&gt;</span>
            </Link>
          </div>
        </aside>
      </div>
    </section>
  );
}
