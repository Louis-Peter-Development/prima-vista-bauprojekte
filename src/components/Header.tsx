import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { NavLink, Link } from '../i18n/Link';
import { toCanonicalPath } from '../i18n/routes';
import LanguageSwitcher from './LanguageSwitcher';
import { useTheme } from '../hooks/useTheme';

type NavItem = { to: string; labelKey: string; activeOn?: string[] };

const NAV: NavItem[] = [
  { to: '/', labelKey: 'nav.home' },
  { to: '/komplett-pakete', labelKey: 'nav.packages', activeOn: ['/haus-sanierung', '/wohnung-sanierung', '/gastronomie-ausbau', '/buero-ausbau'] },
  { to: '/gewerke', labelKey: 'nav.trades', activeOn: ['/badsanierung', '/kuechen-moebelbau', '/boeden-belaege', '/elektroinstallation', '/trockenbau', '/maler-lackierer', '/fassadensanierung', '/abdichtung-keller', '/dachsanierung', '/treppen-gelaender', '/garten-aussenanlagen', '/barrierefreiheit', '/fenstertechnik', '/rohbau-abbruch', '/tueren-zargen', '/sanitaerinstallation', '/zaeune'] },
  { to: '/heizmethoden', labelKey: 'nav.heating', activeOn: ['/heizkoerper', '/heizstraenge', '/fussbodenheizung', '/waermepumpe', '/gas-heizung', '/pelletofen', '/saunaofen'] },
  { to: '/projekte', labelKey: 'nav.projects' },
  { to: '/blog', labelKey: 'nav.magazine' },
  { to: '/kalkulator', labelKey: 'nav.calculator' },
];

function navItemMatches(item: NavItem, pathname: string): boolean {
  if (item.to === '/') return pathname === '/';
  if (pathname === item.to || pathname.startsWith(`${item.to}/`)) return true;
  return item.activeOn?.some((p) => pathname === p || pathname.startsWith(`${p}/`)) ?? false;
}

const FEATURED_PROJECT = {
  src: '/assets/img/proj-spa-bath.webp',
  num: '№ 141',
  titleLead: 'Spa-Bad —',
  titleAccent: 'Hotel.',
  loc: 'Emmenbrücke',
  year: '2025',
};

export default function Header() {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const { pathname: rawPathname } = useLocation();
  const pathname = toCanonicalPath(rawPathname);

  useEffect(() => { setOpen(false); }, [rawPathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <header className={`pv-header${open ? ' is-menu-open' : ''}`}>
        <div className="pv-header__inner">
          <Link
            className="pv-logo"
            to="/"
            aria-label={t('header.logoAria')}
            onClick={() => {
              if (pathname === '/') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            <img src="/assets/img/logo.png" alt="" width="1085" height="1051" />
            <span className="pv-logo__txt">
              <span className="pv-logo__name">Prima Vista</span>
              <span className="pv-logo__tag">Bauprojekte</span>
            </span>
          </Link>
          <nav className="pv-nav" aria-label={t('nav.ariaPrimary')}>
            <ul className="pv-nav__list">
              {NAV.map((item) => {
                const active = navItemMatches(item, pathname);
                return (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      end={item.to === '/'}
                      className={active ? 'is-active' : ''}
                      onClick={() => {
                        if (pathname === item.to || (item.to === '/' && pathname === '/')) {
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                      }}
                    >
                      {t(item.labelKey)}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
            <LanguageSwitcher className="pv-nav__lang" />
            <button
              type="button"
              className="pv-theme-toggle"
              aria-label={theme === 'dark' ? t('header.themeToLight') : t('header.themeToDark')}
              aria-pressed={theme === 'dark'}
              title={theme === 'dark' ? t('header.themeLightTitle') : t('header.themeDarkTitle')}
              onClick={toggleTheme}
            >
              <span className="pv-theme-toggle__track" aria-hidden="true">
                <span className="pv-theme-toggle__sun" />
                <span className="pv-theme-toggle__moon" />
                <span className="pv-theme-toggle__knob" />
              </span>
            </button>
          </nav>
          <div className="pv-header__actions">
            <Link className="btn btn--light pv-header__cta" to="/blitz-angebot">
              {t('cta.expressQuote')} <span className="arrow">&gt;</span>
            </Link>
            <button
              type="button"
              className={`pv-burger${open ? ' is-open' : ''}`}
              aria-label={open ? t('header.closeMenu') : t('header.openMenu')}
              aria-expanded={open}
              aria-controls="pv-mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </header>

      <div
        id="pv-mobile-menu"
        className={`pv-mobile-menu${open ? ' is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={t('nav.ariaPrimary')}
        hidden={!open}
      >
        <Link to="/projekte" className="pv-mobile-menu__feature" onClick={() => setOpen(false)}>
          <img src={FEATURED_PROJECT.src} alt="" width="1500" height="1125" loading="lazy" />
          <span className="pv-mobile-menu__feature-overlay" aria-hidden="true" />
          <span className="pv-mobile-menu__feature-eyebrow">
            {t('mobileMenu.focus')} <span className="pv-mobile-menu__feature-sep">·</span> {FEATURED_PROJECT.num}
          </span>
          <span className="pv-mobile-menu__feature-body">
            <span className="pv-mobile-menu__feature-title">
              {FEATURED_PROJECT.titleLead}{' '}
              <em>{FEATURED_PROJECT.titleAccent}</em>
            </span>
            <span className="pv-mobile-menu__feature-meta">
              <span>{FEATURED_PROJECT.loc}</span>
              <span className="pv-mobile-menu__feature-dot">·</span>
              <span>{FEATURED_PROJECT.year}</span>
            </span>
          </span>
        </Link>

        <nav className="pv-mobile-menu__nav" aria-label={t('nav.ariaMobile')}>
          <ul className="pv-mobile-menu__list">
            {NAV.map((item, i) => {
              const active = navItemMatches(item, pathname);
              return (
              <li key={item.to} style={{ ['--i' as string]: i }}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={`pv-mobile-menu__link${active ? ' is-active' : ''}`}
                  onClick={() => {
                    if (pathname === item.to || (item.to === '/' && pathname === '/')) {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                    setOpen(false);
                  }}
                >
                  <span className="pv-mobile-menu__label">{t(item.labelKey)}</span>
                  <span className="pv-mobile-menu__num">{String(i + 1).padStart(2, '0')}</span>
                </NavLink>
              </li>
              );
            })}
          </ul>
        </nav>

        <div className="pv-mobile-menu__foot">
          <LanguageSwitcher className="pv-lang--mobile pv-mobile-menu__lang" />
          <Link to="/blitz-angebot" className="pv-mobile-menu__cta" onClick={() => setOpen(false)}>
            {t('cta.expressQuote')} <span className="arrow">&gt;</span>
          </Link>
          <Link to="/kontakt" className="pv-mobile-menu__cta pv-mobile-menu__cta--ghost" onClick={() => setOpen(false)}>
            {t('cta.appointment')} <span className="arrow">&gt;</span>
          </Link>
          <div className="pv-mobile-menu__phone">
            {t('mobileMenu.callPrefix')} <span className="pv-mobile-menu__phone-sep">·</span>{' '}
            <a href="tel:+4915789818308">+49 1578 98 18 308</a>
          </div>
        </div>
      </div>
    </>
  );
}
