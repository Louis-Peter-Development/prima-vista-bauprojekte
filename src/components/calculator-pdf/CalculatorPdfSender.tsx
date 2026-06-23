import { useId, useState, type FormEvent } from 'react';
import type { KalkulatorHandoff } from '../../data/blitzAngebot';
import { MailIcon } from '../icons';
import '../../styles/components/calculator-pdf.css';

type Props = {
  handoff: KalkulatorHandoff | null;
  disabled?: boolean;
};

type SendState = 'idle' | 'sending' | 'sent' | 'error';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function CalculatorPdfSender({ handoff, disabled }: Props) {
  const emailId = useId();
  const consentId = useId();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<SendState>('idle');
  const [message, setMessage] = useState('');

  const unavailable = disabled || !handoff;

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
        disabled={unavailable}
      >
        <MailIcon aria-hidden="true" />
        Als PDF versenden
      </button>

      {open && !unavailable && (
        <form className="calculator-pdf__panel" onSubmit={onSubmit}>
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
          <button type="submit" className="calculator-pdf__submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Wird gesendet' : 'Jetzt senden'}
          </button>
          {message && (
            <p className={`calculator-pdf__message calculator-pdf__message--${status}`} role={status === 'error' ? 'alert' : 'status'}>
              {message}
            </p>
          )}
        </form>
      )}
    </div>
  );
}
