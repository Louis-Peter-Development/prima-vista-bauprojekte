import type { CSSProperties, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from '../../i18n/Link';
import { inferContactArt, type ContactFormPreset, type ContactFormState } from '../../data/kontakt';
import SectionEyebrow from './SectionEyebrow';

type EndCtaLocalProps = {
  eyebrow: ReactNode;
  title: ReactNode;
  ctaLabel: ReactNode;
  to?: string;
  /**
   * Stable contact-form preset type. Pass this on translated pages so the form
   * preset no longer depends on keyword-matching a (now localized) label.
   * Falls back to inferring from the label for not-yet-translated callers.
   */
  art?: ContactFormState['art'];
  contactPreset?: ContactFormPreset;
  style?: CSSProperties;
};

export default function EndCtaLocal({
  eyebrow,
  title,
  ctaLabel,
  to = '/kontakt',
  art,
  contactPreset,
  style,
}: EndCtaLocalProps) {
  const { t } = useTranslation();
  const labelText = typeof ctaLabel === 'string' ? ctaLabel : undefined;

  let contactState: { contact: ContactFormPreset } | undefined;
  if (contactPreset) {
    contactState = { contact: contactPreset };
  } else if (to === '/kontakt' && labelText) {
    contactState = {
      contact: {
        sourceLabel: labelText,
        art: art ?? inferContactArt(labelText),
        msg: t('contactPresetMsg', { topic: labelText }),
      },
    };
  }

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
