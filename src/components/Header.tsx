import { NavLink, Link } from 'react-router-dom';

const NAV = [
  { to: '/', label: 'Start' },
  { to: '/gewerke', label: 'Gewerke' },
  { to: '/komplett-pakete', label: 'Komplett-Pakete' },
  { to: '/projekte', label: 'Projekte' },
  { to: '/kontakt', label: 'Kontakt' },
];

export default function Header() {
  return (
    <header className="pv-header">
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
          <Link className="btn btn--light" to="/kontakt">
            Termin vereinbaren <span className="arrow">&gt;</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
