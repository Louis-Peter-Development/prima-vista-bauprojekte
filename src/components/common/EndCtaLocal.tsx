import type { CSSProperties, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { createContactPresetFromCtaLabel, type ContactFormPreset } from '../../data/kontakt';
import SectionEyebrow from './SectionEyebrow';

type EndCtaLocalProps = {
  eyebrow: ReactNode;
  title: ReactNode;
  ctaLabel: ReactNode;
  to?: string;
  contactPreset?: ContactFormPreset;
  style?: CSSProperties;
};

export default function EndCtaLocal({
  eyebrow,
  title,
  ctaLabel,
  to = '/kontakt',
  contactPreset,
  style,
}: EndCtaLocalProps) {
  const contactState = to === '/kontakt' && typeof ctaLabel === 'string'
    ? { contact: contactPreset ?? createContactPresetFromCtaLabel(ctaLabel) }
    : contactPreset
      ? { contact: contactPreset }
      : undefined;

  return (
    <section className="end-cta-local" style={style}>
      <div className="end-cta-local__inner reveal-group">
        <SectionEyebrow>{eyebrow}</SectionEyebrow>
        <h2>{title}</h2>
        <Link className="btn btn--light btn--shimmer" to={to} state={contactState}>{ctaLabel} <span className="arrow">&gt;</span></Link>
      </div>
    </section>
  );
}
