import type { CSSProperties, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import SectionEyebrow from './SectionEyebrow';

type EndCtaLocalProps = {
  eyebrow: ReactNode;
  title: ReactNode;
  ctaLabel: ReactNode;
  to?: string;
  style?: CSSProperties;
};

export default function EndCtaLocal({
  eyebrow,
  title,
  ctaLabel,
  to = '/kontakt',
  style,
}: EndCtaLocalProps) {
  return (
    <section className="end-cta-local" style={style}>
      <div className="end-cta-local__inner reveal">
        <SectionEyebrow>{eyebrow}</SectionEyebrow>
        <h2>{title}</h2>
        <Link className="btn btn--light" to={to}>{ctaLabel} <span className="arrow">&gt;</span></Link>
      </div>
    </section>
  );
}
