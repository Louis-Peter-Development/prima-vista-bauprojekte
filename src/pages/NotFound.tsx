import { useTranslation } from 'react-i18next';
import { Link } from '../i18n/Link';
import { usePageTitle } from '../hooks/usePageTitle';
import '../styles/pages/not-found.css';

const QUICK_LINKS = [
  { labelKey: 'nav.packages', to: '/komplett-pakete' },
  { labelKey: 'nav.trades', to: '/gewerke' },
  { labelKey: 'nav.projects', to: '/projekte' },
  { labelKey: 'footer.contact', to: '/kontakt' },
];

export default function NotFound() {
  const { t } = useTranslation();
  usePageTitle(t('notFound.metaTitle'));

  return (
    <section className="not-found" aria-labelledby="not-found-title">
      <div className="not-found__inner">
        <div className="not-found__copy reveal">
          <p className="not-found__eyebrow">{t('notFound.eyebrow')}</p>
          <h1 id="not-found-title">{t('notFound.title')}</h1>
          <p className="not-found__lede">{t('notFound.lede')}</p>
          <div className="not-found__actions" aria-label={t('notFound.actionsAria')}>
            <Link className="btn btn--solid" to="/">
              {t('notFound.toHome')} <span className="arrow">&gt;</span>
            </Link>
            <Link className="btn btn--dark" to="/kontakt">
              {t('notFound.toContact')} <span className="arrow">&gt;</span>
            </Link>
          </div>
        </div>

        <aside className="not-found__panel reveal" data-delay="1" aria-label={t('notFound.panelAria')}>
          <div className="not-found__code" aria-hidden="true">404</div>
          <nav className="not-found__links" aria-label={t('notFound.linksAria')}>
            {QUICK_LINKS.map((link, index) => (
              <Link to={link.to} key={link.to}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                {t(link.labelKey)}
              </Link>
            ))}
          </nav>
        </aside>
      </div>
    </section>
  );
}
