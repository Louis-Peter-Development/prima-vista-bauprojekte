import { useEffect } from 'react';
import i18n from './config';
import { LOCALE_HTML_LANG } from './routes';
import { useLocale } from './useLocale';

/**
 * Keeps the i18next active language and the `<html lang>` attribute in sync with
 * the locale encoded in the URL. Rendered once near the top of the tree.
 */
export default function LocaleSync() {
  const locale = useLocale();

  useEffect(() => {
    if (i18n.language !== locale) i18n.changeLanguage(locale);
    document.documentElement.lang = LOCALE_HTML_LANG[locale];
  }, [locale]);

  return null;
}
