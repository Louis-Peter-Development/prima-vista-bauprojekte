import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  type Locale,
  localeFromPathname,
  localizedPath,
  toCanonicalPath,
} from './routes';

/** Active locale, derived from the URL prefix (`/en`, `/it`, else `de`). */
export function useLocale(): Locale {
  const { pathname } = useLocation();
  return localeFromPathname(pathname);
}

/**
 * Returns a function that rewrites a canonical (German) in-app path to the
 * active locale — used by the localized <Link>/<NavLink> wrappers.
 */
export function useLocalizedPath(): (to: string) => string {
  const locale = useLocale();
  return useCallback((to: string) => localizedPath(to, locale), [locale]);
}

/**
 * Switch language while staying on the equivalent page: take the current URL,
 * resolve it to its canonical German path, then re-localize for the target.
 */
export function useSwitchLocale(): (locale: Locale) => void {
  const { pathname, search, hash } = useLocation();
  const navigate = useNavigate();
  return useCallback(
    (locale: Locale) => {
      const canonical = toCanonicalPath(pathname);
      navigate(`${localizedPath(canonical, locale)}${search}${hash}`);
    },
    [pathname, search, hash, navigate],
  );
}
