import { Trans, useTranslation } from 'react-i18next';
import { Link } from '../../i18n/Link';
import type { Package } from '../../data/komplettPakete';

type PackageDetailSectionProps = {
  pkg: Package;
};

export default function PackageDetailSection({ pkg }: PackageDetailSectionProps) {
  const { t } = useTranslation('pages');
  const base = `pakete.packages.${pkg.key}`;
  const alt = t(`${base}.alt`);
  const includes = t(`${base}.includes`, { returnObjects: true }) as string[];

  const cls = ['pkg-detail'];
  if (pkg.variant === 'paper') cls.push('pkg-detail--paper');
  if (pkg.variant === 'ink') cls.push('pkg-detail--ink');
  if (pkg.reverse) cls.push('pkg-detail--reverse');

  const photoInner = (
    <>
      <span className="pkg-detail__photo-num">№&nbsp;{pkg.num}</span>
      <img src={pkg.photo} alt={alt} width="1600" height="1200" loading="lazy" />
    </>
  );
  const photo = pkg.detailTo ? (
    <Link className="pkg-detail__photo pkg-detail__photo--link reveal" to={pkg.detailTo} aria-label={alt}>
      {photoInner}
    </Link>
  ) : (
    <div className="pkg-detail__photo reveal">{photoInner}</div>
  );
  const titleNode = <Trans i18nKey={`pages:${base}.title`} components={{ em: <em />, br: <br /> }} />;
  const title = pkg.detailTo ? (
    <Link className="pkg-detail__title-link" to={pkg.detailTo}>
      {titleNode}
    </Link>
  ) : (
    titleNode
  );
  const body = (
    <div className="pkg-detail__body reveal" data-delay="1">
      <div className="pkg-detail__eyebrow"><span className="rule-red"></span> {t(`${base}.eyebrow`)}</div>
      <h2 className="pkg-detail__title">{title}</h2>
      <p className="pkg-detail__lede">{t(`${base}.lede`)}</p>
      <div className="pkg-detail__price">
        <span className="pkg-detail__price-label">{t(`${base}.priceLabel`)}</span>
        <span className="pkg-detail__price-val">{t(`${base}.priceVal`)}</span>
        <span className="pkg-detail__price-from">{t(`${base}.priceFrom`)}</span>
      </div>
      <ul className="pkg-detail__includes">
        {includes.map((item) => <li key={item}>{item}</li>)}
      </ul>
      <div className="pkg-detail__actions">
        <Link className={`btn ${pkg.ctaDark ? 'btn--dark' : 'btn--light'}`} to="/kontakt">
          {t(`${base}.ctaLabel`)} <span className="arrow">&gt;</span>
        </Link>
        {pkg.detailTo && (
          <Link className="btn btn--solid pkg-detail__cta-secondary" to={pkg.detailTo}>
            {t(`${base}.detailCtaLabel`)} <span className="arrow">&gt;</span>
          </Link>
        )}
      </div>
    </div>
  );

  return (
    <section className={cls.join(' ')}>
      <div className="pkg-detail__inner">
        {pkg.reverse ? <>{body}{photo}</> : <>{photo}{body}</>}
      </div>
    </section>
  );
}
