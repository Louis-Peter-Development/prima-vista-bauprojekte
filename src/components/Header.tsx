import { useEffect, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';

type NavItem = { to: string; label: string; activeOn?: string[] };

const NAV: NavItem[] = [
  { to: '/', label: 'Start' },
  { to: '/komplett-pakete', label: 'Komplett-Pakete', activeOn: ['/haus-sanierung', '/wohnung-sanierung', '/gastronomie-ausbau'] },
  { to: '/gewerke', label: 'Gewerke', activeOn: ['/badsanierung', '/kuechen-moebelbau', '/boeden-belaege', '/elektroinstallation', '/trockenbau', '/maler-lackierer', '/fassadensanierung', '/abdichtung-keller', '/dachsanierung', '/treppen-gelaender', '/garten-aussenanlagen', '/barrierefreiheit', '/fenstertechnik', '/rohbau-abbruch', '/tueren-zargen', '/sanitaerinstallation', '/zaeune'] },
  { to: '/heizmethoden', label: 'Heizmethoden', activeOn: ['/heizkoerper', '/heizstraenge', '/fussbodenheizung', '/waermepumpe', '/gas-heizung', '/pelletofen', '/saunaofen'] },
  { to: '/projekte', label: 'Projekte' },
  { to: '/blog', label: 'Magazin' },
  { to: '/kalkulator', label: 'Kalkulator' },
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
  const { pathname } = useLocation();

  useEffect(() => { setOpen(false); }, [pathname]);

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
            aria-label="Prima Vista — Startseite"
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
          <nav className="pv-nav" aria-label="Hauptnavigation">
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
                      {item.label}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
            <button
              type="button"
              className="pv-theme-toggle"
              aria-label={theme === 'dark' ? 'Zum hellen Design wechseln' : 'Zum dunklen Design wechseln'}
              aria-pressed={theme === 'dark'}
              title={theme === 'dark' ? 'Helles Design' : 'Dunkles Design'}
              onClick={toggleTheme}
            >
              <span className="pv-theme-toggle__track" aria-hidden="true">
                <span className="pv-theme-toggle__sun" />
                <span className="pv-theme-toggle__moon" />
                <span className="pv-theme-toggle__knob" />
              </span>
            </button>
            <Link className="btn btn--light pv-header__cta" to="/blitz-angebot">
              Blitz-Angebot <span className="arrow">&gt;</span>
            </Link>
            <button
              type="button"
              className={`pv-burger${open ? ' is-open' : ''}`}
              aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
              aria-expanded={open}
              aria-controls="pv-mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              <span></span><span></span><span></span>
            </button>
          </nav>
        </div>
      </header>

      <div
        id="pv-mobile-menu"
        className={`pv-mobile-menu${open ? ' is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Hauptnavigation"
        hidden={!open}
      >
        <Link to="/projekte" className="pv-mobile-menu__feature" onClick={() => setOpen(false)}>
          <img src={FEATURED_PROJECT.src} alt="" width="1500" height="1125" loading="lazy" />
          <span className="pv-mobile-menu__feature-overlay" aria-hidden="true" />
          <span className="pv-mobile-menu__feature-eyebrow">
            Im Fokus <span className="pv-mobile-menu__feature-sep">·</span> {FEATURED_PROJECT.num}
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

        <nav className="pv-mobile-menu__nav" aria-label="Mobile Navigation">
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
                  <span className="pv-mobile-menu__label">{item.label}</span>
                  <span className="pv-mobile-menu__num">{String(i + 1).padStart(2, '0')}</span>
                </NavLink>
              </li>
              );
            })}
          </ul>
        </nav>

        <div className="pv-mobile-menu__foot">
          <Link to="/blitz-angebot" className="pv-mobile-menu__cta" onClick={() => setOpen(false)}>
            Blitz-Angebot <span className="arrow">&gt;</span>
          </Link>
          <Link to="/kontakt" className="pv-mobile-menu__cta pv-mobile-menu__cta--ghost" onClick={() => setOpen(false)}>
            Termin vereinbaren <span className="arrow">&gt;</span>
          </Link>
          <div className="pv-mobile-menu__phone">
            oder rufen Sie an <span className="pv-mobile-menu__phone-sep">·</span>{' '}
            <a href="tel:+4915789818308">+49 1578 98 18 308</a>
          </div>
        </div>
      </div>
    </>
  );
}
