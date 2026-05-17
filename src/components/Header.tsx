import { useEffect, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';

const NAV = [
  { to: '/', label: 'Start' },
  { to: '/komplett-pakete', label: 'Komplett-Pakete' },
  { to: '/gewerke', label: 'Gewerke' },
  { to: '/projekte', label: 'Projekte' },
  { to: '/blitz-angebot', label: 'Blitz Angebot' },
  { to: '/kontakt', label: 'Kontakt' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
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
    <header className={`pv-header${open ? ' is-menu-open' : ''}`}>
      <div className="pv-header__inner">
        <Link className="pv-logo" to="/" aria-label="Prima Vista — Startseite">
          <img src="/assets/img/logo.png" alt="" />
          <span className="pv-logo__txt">
            <span className="pv-logo__name">Prima Vista</span>
            <span className="pv-logo__tag">Bauprojekte</span>
          </span>
        </Link>
        <nav className="pv-nav" aria-label="Hauptnavigation">
          <ul className="pv-nav__list">
            {NAV.map(({ to, label }) => (
              <li key={to}>
                <NavLink to={to} end={to === '/'} className={({ isActive }) => (isActive ? 'is-active' : '')}>
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
          <Link className="btn btn--light pv-header__cta" to="/kontakt">
            Jetzt anfragen <span className="arrow">&gt;</span>
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

      <div
        id="pv-mobile-menu"
        className={`pv-mobile-menu${open ? ' is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Hauptnavigation"
        hidden={!open}
      >
        <ul className="pv-mobile-menu__list">
          {NAV.map(({ to, label }, i) => (
            <li key={to} style={{ ['--i' as string]: i }}>
              <NavLink to={to} end={to === '/'} className={({ isActive }) => (isActive ? 'is-active' : '')}>
                <span className="pv-mobile-menu__num">{String(i + 1).padStart(2, '0')}</span>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
        <Link className="btn btn--solid pv-mobile-menu__cta" to="/kontakt">
          Jetzt anfragen <span className="arrow">&gt;</span>
        </Link>
      </div>
    </header>
  );
}
