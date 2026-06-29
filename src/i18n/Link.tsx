import { forwardRef } from 'react';
import {
  Link as RouterLink,
  NavLink as RouterNavLink,
  type LinkProps,
  type NavLinkProps,
} from 'react-router-dom';

import { localizedPath } from './routes';
import { useLocale } from './useLocale';

// Drop-in replacements for react-router's Link / NavLink. Components keep
// passing canonical German paths (`to="/gewerke"`); these rewrite `to` to the
// active locale (`/en/trades`, `/it/mestieri`). String targets are localized;
// `To` objects and external/anchor-style targets pass through unchanged.

function shouldLocalize(to: LinkProps['to']): to is string {
  return typeof to === 'string' && to.startsWith('/');
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { to, ...rest },
  ref,
) {
  const locale = useLocale();
  const target = shouldLocalize(to) ? localizedPath(to, locale) : to;
  return <RouterLink ref={ref} to={target} {...rest} />;
});

export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(function NavLink(
  { to, ...rest },
  ref,
) {
  const locale = useLocale();
  const target = shouldLocalize(to) ? localizedPath(to, locale) : to;
  return <RouterNavLink ref={ref} to={target} {...rest} />;
});
