import { useTranslation } from 'react-i18next';
import { LOCALES, LOCALE_LABELS, LOCALE_SHORT } from '../i18n/routes';
import { useLocale, useSwitchLocale } from '../i18n/useLocale';
import '../styles/components/language-switcher.css';

type Props = { className?: string };

export default function LanguageSwitcher({ className }: Props) {
  const { t } = useTranslation();
  const active = useLocale();
  const switchLocale = useSwitchLocale();

  return (
    <div
      className={`pv-lang${className ? ` ${className}` : ''}`}
      role="group"
      aria-label={t('language.aria')}
    >
      {LOCALES.map((locale) => (
        <button
          key={locale}
          type="button"
          className={`pv-lang__btn${locale === active ? ' is-active' : ''}`}
          aria-label={LOCALE_LABELS[locale]}
          aria-current={locale === active ? 'true' : undefined}
          onClick={() => {
            if (locale !== active) switchLocale(locale);
          }}
        >
          {LOCALE_SHORT[locale]}
        </button>
      ))}
    </div>
  );
}
