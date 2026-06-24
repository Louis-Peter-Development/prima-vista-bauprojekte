import { useEffect, useId, useMemo, useState, type FormEvent } from 'react';
import { createPortal } from 'react-dom';
import type { KalkulatorHandoff, KalkulatorPick, KalkulatorRow } from '../../data/blitzAngebot';
import { formatEuro } from '../../data/calculator/engine';
import { CloseIcon, MailIcon, PreviewIcon } from '../icons';
import '../../styles/components/calculator-pdf.css';

type Props = {
  handoff: KalkulatorHandoff | null;
  disabled?: boolean;
};

type SendState = 'idle' | 'sending' | 'sent' | 'error';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type PreviewItem = {
  label: string;
  quantity?: number;
  unit?: string;
  unitPrice?: number;
  subtotal: number;
  sku?: string;
  description?: string;
  image?: string;
  category?: string;
  subcategory?: string;
  type?: string;
};

type PreviewGroup = {
  key: string;
  label: string;
  subtotal: number;
  items: PreviewItem[];
};

function pickAsPreviewItem(pick: KalkulatorPick): PreviewItem {
  return {
    label: pick.label,
    quantity: 1,
    unit: '',
    unitPrice: pick.subtotal,
    subtotal: pick.subtotal,
    sku: pick.sku,
    description: pick.description,
    image: pick.image,
    category: pick.category,
    subcategory: pick.subcategory,
    type: pick.type,
  };
}

function rowAsPreviewItem(row: KalkulatorRow): PreviewItem {
  return {
    label: row.label,
    quantity: row.quantity,
    unit: row.unit,
    unitPrice: row.unitPrice,
    subtotal: row.subtotal,
    sku: row.sku,
    description: row.description,
    image: row.image,
    category: row.category,
    subcategory: row.subcategory,
    type: row.type,
  };
}

function buildPreviewGroups(handoff: KalkulatorHandoff | null): PreviewGroup[] {
  if (!handoff) return [];

  return handoff.picks.map((pick) => {
    const rows = Array.isArray(pick.rows)
      ? pick.rows.filter((row) => row.quantity > 0 && row.subtotal >= 0).map(rowAsPreviewItem)
      : [];

    return {
      key: pick.key,
      label: pick.label,
      subtotal: pick.subtotal,
      items: rows.length > 0 ? rows : [pickAsPreviewItem(pick)],
    };
  });
}

function formatQuantity(quantity?: number, unit?: string): string {
  if (typeof quantity !== 'number' || !Number.isFinite(quantity)) return '1';
  const value = new Intl.NumberFormat('de-DE', {
    maximumFractionDigits: 2,
  }).format(quantity);
  return [value, unit].filter(Boolean).join(' ');
}

function previewImageSrc(item: PreviewItem): string | null {
  if (item.image) return item.image;
  if (item.sku && /-MON$/i.test(item.sku)) return '/assets/img/products/MON-100-stk.jpg';
  if (item.sku && /^[a-z0-9-]+$/i.test(item.sku)) return `/assets/img/products/${item.sku}.jpg`;
  return null;
}

function previewFallbackLabel(item: PreviewItem): string {
  const source = item.sku || item.label;
  return source
    .replace(/[^a-z0-9]/gi, '')
    .slice(0, 4)
    .toUpperCase() || 'PV';
}

function PreviewThumb({ item }: { item: PreviewItem }) {
  const [failed, setFailed] = useState(false);
  const src = failed ? null : previewImageSrc(item);

  return (
    <div className="calculator-pdf__thumb" aria-hidden="true">
      {src ? (
        <img src={src} alt="" loading="eager" onError={() => setFailed(true)} />
      ) : (
        <span>{previewFallbackLabel(item)}</span>
      )}
    </div>
  );
}

export default function CalculatorPdfSender({ handoff, disabled }: Props) {
  const emailId = useId();
  const consentId = useId();
  const panelId = useId();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<SendState>('idle');
  const [message, setMessage] = useState('');

  const unavailable = disabled || !handoff;
  const previewGroups = useMemo(() => buildPreviewGroups(handoff), [handoff]);
  const previewCount = previewGroups.reduce((count, group) => count + group.items.length, 0);

  useEffect(() => {
    if (!open || unavailable) return undefined;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.body.classList.add('calculator-pdf-modal-open');
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.classList.remove('calculator-pdf-modal-open');
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, unavailable]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!handoff || status === 'sending') return;

    const normalizedEmail = email.trim();
    if (!EMAIL_RE.test(normalizedEmail)) {
      setStatus('error');
      setMessage('Bitte eine gültige E-Mail-Adresse eingeben.');
      return;
    }
    if (!consent) {
      setStatus('error');
      setMessage('Bitte bestätigen Sie den PDF-Versand per E-Mail.');
      return;
    }

    setStatus('sending');
    setMessage('');

    try {
      const response = await fetch('/api/calculator-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: normalizedEmail,
          consent,
          kalkulator: handoff,
          sourceUrl: window.location.href,
        }),
      });

      if (!response.ok) throw new Error('PDF konnte nicht versendet werden.');
      setStatus('sent');
      setMessage('PDF wurde versendet.');
    } catch {
      setStatus('error');
      setMessage('PDF konnte nicht versendet werden. Bitte später erneut versuchen.');
    }
  }

  return (
    <div className="calculator-pdf">
      <button
        type="button"
        className="calculator-pdf__trigger"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={panelId}
        disabled={unavailable}
      >
        <PreviewIcon aria-hidden="true" />
        PDF-Vorschau
      </button>

      {open && !unavailable && createPortal(
        <div
          className="calculator-pdf__overlay"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
        >
          <section
            id={panelId}
            className="calculator-pdf__panel calculator-pdf__preview"
            role="dialog"
            aria-modal="true"
            aria-label="PDF-Vorschau"
          >
            <form className="calculator-pdf__send" onSubmit={onSubmit}>
              <div className="calculator-pdf__send-top">
                <div className="calculator-pdf__send-head">
                  <MailIcon aria-hidden="true" />
                  <span>Als PDF versenden</span>
                </div>
                <button
                  type="button"
                  className="calculator-pdf__close"
                  aria-label="Vorschau schließen"
                  onClick={() => setOpen(false)}
                >
                  <CloseIcon aria-hidden="true" />
                </button>
              </div>

              <div className="calculator-pdf__send-body">
                <label className="calculator-pdf__label" htmlFor={emailId}>Bitte E-Mail-Adresse eingeben</label>
                <input
                  id={emailId}
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.currentTarget.value);
                    if (status !== 'sending') setStatus('idle');
                  }}
                  placeholder="E-Mail-Adresse eingeben"
                />
                <button type="submit" className="calculator-pdf__submit" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Wird gesendet' : 'Jetzt senden'}
                </button>
                <label className="calculator-pdf__check" htmlFor={consentId}>
                  <input
                    id={consentId}
                    type="checkbox"
                    checked={consent}
                    onChange={(event) => {
                      setConsent(event.currentTarget.checked);
                      if (status !== 'sending') setStatus('idle');
                    }}
                  />
                  <span aria-hidden="true" />
                  <em>Hiermit bestätige ich, dass ich die PDF per E-Mail erhalte und wünsche themenbezogene Informationen.</em>
                </label>
                {message && (
                  <p className={`calculator-pdf__message calculator-pdf__message--${status}`} role={status === 'error' ? 'alert' : 'status'}>
                    {message}
                  </p>
                )}
              </div>
            </form>

            <header className="calculator-pdf__preview-head">
              <span>PDF-Vorschau</span>
              <h3>Details der Auswahl</h3>
              <p>{handoff.kindLabel}{handoff.scopeLabel ? ` · ${handoff.scopeLabel}` : ''}</p>
            </header>

            <dl className="calculator-pdf__summary">
              <div>
                <dt>Positionen</dt>
                <dd>{previewCount}</dd>
              </div>
              <div>
                <dt>Gesamt netto</dt>
                <dd>{formatEuro(handoff.totalMid)}</dd>
              </div>
            </dl>

            <div className="calculator-pdf__groups">
              {previewGroups.map((group) => (
                <article className="calculator-pdf__group" key={group.key}>
                  <div className="calculator-pdf__group-head">
                    <h4>{group.label}</h4>
                    <strong>{formatEuro(group.subtotal)}</strong>
                  </div>
                  <div className="calculator-pdf__items">
                    {group.items.map((item, index) => (
                      <div className="calculator-pdf__item" key={`${group.key}-${item.sku || item.label}-${index}`}>
                        <PreviewThumb item={item} />
                        <div className="calculator-pdf__item-body">
                          <p className="calculator-pdf__item-meta">
                            {[item.type, item.sku].filter(Boolean).join(' · ')}
                          </p>
                          <h5>{item.label}</h5>
                          {item.description && (
                            <p className="calculator-pdf__item-description">{item.description}</p>
                          )}
                          <dl className="calculator-pdf__item-totals">
                            <div>
                              <dt>Menge</dt>
                              <dd>{formatQuantity(item.quantity, item.unit)}</dd>
                            </div>
                            <div>
                              <dt>Einzel</dt>
                              <dd>{formatEuro(item.unitPrice ?? item.subtotal)}</dd>
                            </div>
                            <div>
                              <dt>Gesamt</dt>
                              <dd>{formatEuro(item.subtotal)}</dd>
                            </div>
                          </dl>
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>,
        document.body,
      )}
    </div>
  );
}
