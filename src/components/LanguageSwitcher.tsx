import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LOCALES, LOCALE_LABELS, LOCALE_SHORT } from '../i18n/routes';
import { useLocale, useSwitchLocale } from '../i18n/useLocale';
import { ChevronDownIcon } from './icons';
import '../styles/components/language-switcher.css';

type Props = { className?: string };

/**
 * Compact language picker: shows only the active locale; the rest reveal on
 * hover (desktop) or click/keyboard. Reads the full locale list from `LOCALES`,
 * so adding a language needs no change here.
 */
export default function LanguageSwitcher({ className }: Props) {
  const { t } = useTranslation();
  const active = useLocale();
  const switchLocale = useSwitchLocale();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number>(0);

  const openMenu = () => {
    window.clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const closeSoon = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(false), 120);
  };
  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  // Close on outside click / Escape.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div
      className={`pv-lang pv-lang--compact${open ? ' is-open' : ''}${className ? ` ${className}` : ''}`}
      ref={rootRef}
      onMouseEnter={openMenu}
      onMouseLeave={closeSoon}
      onBlur={(e) => {
        if (!rootRef.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        type="button"
        className="pv-lang__current"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t('language.aria')}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="pv-lang__current-code">{LOCALE_SHORT[active]}</span>
        <ChevronDownIcon className="pv-lang__chevron" aria-hidden="true" />
      </button>
      <ul className="pv-lang__menu" role="listbox" aria-label={t('language.aria')}>
        {LOCALES.map((locale) => (
          <li key={locale}>
            <button
              type="button"
              role="option"
              aria-selected={locale === active}
              className={`pv-lang__option${locale === active ? ' is-active' : ''}`}
              onClick={() => {
                if (locale !== active) switchLocale(locale);
                setOpen(false);
              }}
            >
              <span className="pv-lang__option-code">{LOCALE_SHORT[locale]}</span>
              <span className="pv-lang__option-name">{LOCALE_LABELS[locale]}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
