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

  const photo = (
    <div className="pkg-detail__photo reveal">
      <span className="pkg-detail__photo-num">№&nbsp;{pkg.num}</span>
      <img src={pkg.photo} alt={pkg.alt} />
    </div>
  );
  const body = (
    <div className="pkg-detail__body reveal" data-delay="1">
      <div className="pkg-detail__eyebrow"><span className="rule-red"></span> {pkg.eyebrow}</div>
      <h2 className="pkg-detail__title">{pkg.title}</h2>
      <p className="pkg-detail__lede">{pkg.lede}</p>
      <div className="pkg-detail__price">
        <span className="pkg-detail__price-label">{pkg.priceLabel}</span>
        <span className="pkg-detail__price-val">{pkg.priceVal}</span>
        <span className="pkg-detail__price-from">{pkg.priceFrom}</span>
      </div>
      <ul className="pkg-detail__includes">
        {pkg.includes.map((item) => <li key={item}>{item}</li>)}
      </ul>
      <Link className={`btn ${pkg.ctaDark ? 'btn--dark' : 'btn--light'}`} to="/kontakt">
        {pkg.ctaLabel} <span className="arrow">&gt;</span>
      </Link>
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
