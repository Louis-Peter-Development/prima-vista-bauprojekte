import { Link } from 'react-router-dom';
import type { Package } from '../../data/komplettPakete';

type PackageDetailSectionProps = {
  pkg: Package;
};

export default function PackageDetailSection({ pkg }: PackageDetailSectionProps) {
  const cls = ['pkg-detail'];
  if (pkg.variant === 'paper') cls.push('pkg-detail--paper');
  if (pkg.variant === 'ink') cls.push('pkg-detail--ink');
  if (pkg.reverse) cls.push('pkg-detail--reverse');

  const photoInner = (
    <>
      <span className="pkg-detail__photo-num">№&nbsp;{pkg.num}</span>
      <img src={pkg.photo} alt={pkg.alt} width="1600" height="1200" loading="lazy" />
    </>
  );
  const photo = pkg.detailTo ? (
    <Link className="pkg-detail__photo pkg-detail__photo--link reveal" to={pkg.detailTo} aria-label={pkg.alt}>
      {photoInner}
    </Link>
  ) : (
    <div className="pkg-detail__photo reveal">{photoInner}</div>
  );
  const title = pkg.detailTo ? (
    <Link className="pkg-detail__title-link" to={pkg.detailTo}>
      {pkg.title}
    </Link>
  ) : (
    pkg.title
  );
  const body = (
    <div className="pkg-detail__body reveal" data-delay="1">
      <div className="pkg-detail__eyebrow"><span className="rule-red"></span> {pkg.eyebrow}</div>
      <h2 className="pkg-detail__title">{title}</h2>
      <p className="pkg-detail__lede">{pkg.lede}</p>
      <div className="pkg-detail__price">
        <span className="pkg-detail__price-label">{pkg.priceLabel}</span>
        <span className="pkg-detail__price-val">{pkg.priceVal}</span>
        <span className="pkg-detail__price-from">{pkg.priceFrom}</span>
      </div>
      <ul className="pkg-detail__includes">
        {pkg.includes.map((item) => <li key={item}>{item}</li>)}
      </ul>
      <div className="pkg-detail__actions">
        <Link className={`btn ${pkg.ctaDark ? 'btn--dark' : 'btn--light'}`} to="/kontakt">
          {pkg.ctaLabel} <span className="arrow">&gt;</span>
        </Link>
        {pkg.detailTo && (
          <Link className="btn btn--solid pkg-detail__cta-secondary" to={pkg.detailTo}>
            Sanierung kalkulieren <span className="arrow">&gt;</span>
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
