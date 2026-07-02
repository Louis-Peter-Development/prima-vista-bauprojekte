import { useState, type FormEvent } from 'react';
import { useLocation } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from '../../i18n/Link';
import { useLocale } from '../../i18n/useLocale';
import {
  CONTACT_ART_OPTIONS,
  INITIAL_CONTACT_FORM,
  type ContactLocationState,
  type ContactFormState,
} from '../../data/kontakt';

type KontaktErrors = Partial<Record<keyof ContactFormState, string>>;

// Lightweight email shape check — server still does the real work.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function KontaktForm() {
  const { t } = useTranslation('kontakt');
  const locale = useLocale();
  const location = useLocation();
  const contactPreset = (location.state as ContactLocationState | null)?.contact;
  const [form, setForm] = useState<ContactFormState>(() => {
    const { art, region, budget, msg } = contactPreset ?? {};

    return {
      ...INITIAL_CONTACT_FORM,
      ...(art ? { art } : {}),
      ...(region ? { region } : {}),
      ...(budget ? { budget } : {}),
      ...(msg ? { msg } : {}),
    };
  });
  const [errors, setErrors] = useState<KontaktErrors>({});
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  function update<K extends keyof ContactFormState>(key: K, value: ContactFormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }

  function validate(): KontaktErrors {
    const next: KontaktErrors = {};
    if (!form.vorname.trim()) next.vorname = t('form.errors.vorname');
    if (!form.nachname.trim()) next.nachname = t('form.errors.nachname');
    if (!form.email.trim()) {
      next.email = t('form.errors.emailRequired');
    } else if (!EMAIL_RE.test(form.email.trim())) {
      next.email = t('form.errors.emailFormat');
    }
    if (!form.msg.trim()) next.msg = t('form.errors.msg');
    if (!form.dsgvo) next.dsgvo = t('form.errors.dsgvo');
    return next;
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (submitting) return;
    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      requestAnimationFrame(() => {
        const firstKey = Object.keys(nextErrors)[0];
        document.getElementById(firstKey)?.focus();
      });
      return;
    }
    setErrors({});
    setSubmitError(null);
    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          vorname: form.vorname.trim(),
          nachname: form.nachname.trim(),
          email: form.email.trim(),
          tel: form.tel.trim(),
          art: form.art,
          region: form.region,
          budget: form.budget,
          msg: form.msg.trim(),
          dsgvo: form.dsgvo,
          locale,
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `HTTP ${res.status}`);
      }
      setSent(true);
    } catch (err) {
      const msg = err instanceof Error ? err.message : t('form.errors.unknown');
      setSubmitError(t('form.errors.submit', { error: msg }));
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    const firstName = form.vorname.trim();
    const email = form.email.trim();
    return (
      <div className="kontakt__form-wrap kontakt__form-wrap--success reveal reveal--right" data-delay="1">
        <div className="kontakt__form-success">
          <div className="kontakt__form-eyebrow"><span className="rule-red"></span> {t('form.success.eyebrow')}</div>
          <h3 className="kontakt__form-title">
            {t('form.success.title')}{firstName && <>, <em>{firstName}</em></>}.
          </h3>
          <p className="kontakt__form-success-body">
            <Trans i18nKey="kontakt:form.success.body" values={{ email }} components={{ s: <strong /> }} />
            {form.tel.trim() && (
              <Trans i18nKey="kontakt:form.success.bodyPhone" values={{ tel: form.tel.trim() }} components={{ s: <strong /> }} />
            )}
            .
          </p>
          <ol className="kontakt__form-success-steps">
            <li><span className="num">01</span>{t('form.success.step1')}</li>
            <li><span className="num">02</span>{t('form.success.step2')}</li>
            <li><span className="num">03</span>{t('form.success.step3')}</li>
          </ol>
          <div className="kontakt__form-success-actions">
            <Link className="btn btn--light" to="/">{t('form.success.toHome')} <span className="arrow">&gt;</span></Link>
            <Link className="btn btn--light" to="/projekte">{t('form.success.toProjects')} <span className="arrow">&gt;</span></Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="kontakt__form-wrap reveal reveal--right" data-delay="1">
      <div className="kontakt__form-eyebrow"><span className="rule-red"></span> {t('form.eyebrow')}</div>
      <h3 className="kontakt__form-title">
        <Trans i18nKey="kontakt:form.title" components={{ em: <em />, br: <br /> }} />
      </h3>

      <form onSubmit={onSubmit} noValidate>
        {submitError && (
          <div className="form-submit-error" role="alert">{submitError}</div>
        )}
        <div className="form-row">
          <div className={`form-field${errors.vorname ? ' is-invalid' : ''}`}>
            <label htmlFor="vorname">{t('form.vorname')}</label>
            <input
              id="vorname"
              type="text"
              placeholder={t('form.vorname')}
              value={form.vorname}
              onChange={(e) => update('vorname', e.target.value)}
              aria-invalid={errors.vorname ? true : undefined}
              aria-describedby={errors.vorname ? 'vorname-error' : undefined}
            />
            {errors.vorname && (
              <span id="vorname-error" className="form-field__error" role="alert">
                {errors.vorname}
              </span>
            )}
          </div>
          <div className={`form-field${errors.nachname ? ' is-invalid' : ''}`}>
            <label htmlFor="nachname">{t('form.nachname')}</label>
            <input
              id="nachname"
              type="text"
              placeholder={t('form.nachname')}
              value={form.nachname}
              onChange={(e) => update('nachname', e.target.value)}
              aria-invalid={errors.nachname ? true : undefined}
              aria-describedby={errors.nachname ? 'nachname-error' : undefined}
            />
            {errors.nachname && (
              <span id="nachname-error" className="form-field__error" role="alert">
                {errors.nachname}
              </span>
            )}
          </div>
        </div>
        <div className="form-row">
          <div className={`form-field${errors.email ? ' is-invalid' : ''}`}>
            <label htmlFor="email">{t('form.email')}</label>
            <input
              id="email"
              type="email"
              placeholder={t('form.emailPlaceholder')}
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <span id="email-error" className="form-field__error" role="alert">
                {errors.email}
              </span>
            )}
          </div>
          <div className="form-field">
            <label htmlFor="tel">{t('form.tel')} <span className="form-field__hint">{t('form.telOptional')}</span></label>
            <input id="tel" type="tel" placeholder={t('form.telPlaceholder')} value={form.tel} onChange={(e) => update('tel', e.target.value)} />
          </div>
        </div>

        <div className="form-field">
          <label>{t('form.artLabel')}</label>
          <div className="form-chips">
            {CONTACT_ART_OPTIONS.map(({ value }) => (
              <span key={value}>
                <input
                  type="radio"
                  name="art"
                  id={`art-${value}`}
                  checked={form.art === value}
                  onChange={() => update('art', value)}
                />
                <label htmlFor={`art-${value}`}>{t(`form.art.${value}`)}</label>
              </span>
            ))}
          </div>
        </div>

        <div className="form-row">
          <div className="form-field form-field--select">
            <label htmlFor="region">{t('form.regionLabel')}</label>
            <select id="region" value={form.region} onChange={(e) => update('region', e.target.value)}>
              <option value="Deutschland">{t('form.regions.frankfurt')}</option>
              <option value="Schweiz">{t('form.regions.innerschweiz')}</option>
              <option value="Außerhalb">{t('form.regions.ausserhalb')}</option>
            </select>
          </div>
          <div className="form-field form-field--select">
            <label htmlFor="budget">{t('form.budgetLabel')}</label>
            <select id="budget" value={form.budget} onChange={(e) => update('budget', e.target.value)}>
              <option value="Bitte wählen">{t('form.budget.unset')}</option>
              <option value="Unter € 50.000">{t('form.budget.lt50')}</option>
              <option value="€ 50.000 – € 150.000">{t('form.budget.mid1')}</option>
              <option value="€ 150.000 – € 500.000">{t('form.budget.mid2')}</option>
              <option value="Über € 500.000">{t('form.budget.gt500')}</option>
            </select>
          </div>
        </div>

        <div className={`form-field${errors.msg ? ' is-invalid' : ''}`}>
          <label htmlFor="msg">{t('form.msgLabel')}</label>
          <textarea
            id="msg"
            placeholder={t('form.msgPlaceholder')}
            value={form.msg}
            onChange={(e) => update('msg', e.target.value)}
            aria-invalid={errors.msg ? true : undefined}
            aria-describedby={errors.msg ? 'msg-error' : undefined}
          />
          {errors.msg && (
            <span id="msg-error" className="form-field__error" role="alert">
              {errors.msg}
            </span>
          )}
        </div>

        <div className={`form-check${errors.dsgvo ? ' is-invalid' : ''}`}>
          <input
            type="checkbox"
            id="dsgvo"
            checked={form.dsgvo}
            onChange={(e) => update('dsgvo', e.target.checked)}
            aria-invalid={errors.dsgvo ? true : undefined}
            aria-describedby={errors.dsgvo ? 'dsgvo-error' : undefined}
          />
          <label htmlFor="dsgvo">
            {t('form.consent')} <Link to="/datenschutz">{t('form.consentLink')}</Link>.
            {errors.dsgvo && (
              <span id="dsgvo-error" className="form-field__error" role="alert">
                {errors.dsgvo}
              </span>
            )}
          </label>
        </div>

        <div className="form-actions">
          <span className="form-actions__note"><span className="dot"></span>{t('form.note')}</span>
          <button className="btn btn--solid" type="submit" disabled={submitting}>
            {submitting ? t('form.submitting') : <>{t('form.submit')} <span className="arrow">&gt;</span></>}
          </button>
        </div>
      </form>
    </div>
  );
}
