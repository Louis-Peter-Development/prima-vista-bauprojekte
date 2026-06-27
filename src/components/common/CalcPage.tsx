import type { ReactNode } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import PageIntro from './PageIntro';
import GewerkPhotoShowcase from './GewerkPhotoShowcase';
import EndCtaLocal from './EndCtaLocal';
import { usePageTitle } from '../../hooks/usePageTitle';
import type { GewerkPhotoSetKey } from '../../data/gewerkPhotoSets';
import '../../styles/pages/heizkoerper.css';
import '../../styles/pages/kalkulator.css';
import '../../styles/pages/haus-sanierung.css';

type MetaItem = { label: string; value: string };

type Props = {
  /** Key under pages:calc.<pageKey>. */
  pageKey: string;
  crumbNumber: string;
  backgroundImage: string;
  className?: string;
  photoSet?: GewerkPhotoSetKey;
  /** When true, renders a localized EndCtaLocal from calc.<pageKey>.end*. */
  endCta?: boolean;
  /** Wrap children in `<section className="kalkulator">`. Default true. */
  wrapSection?: boolean;
  children: ReactNode;
};

/**
 * Shared shell for the package and heating-method calculator pages: a localized
 * PageIntro (+ optional photo showcase / end CTA) wrapping the page's calculator.
 */
export default function CalcPage({ pageKey, crumbNumber, backgroundImage, className, photoSet, endCta, wrapSection = true, children }: Props) {
  const { t } = useTranslation('pages');
  const base = `calc.${pageKey}`;
  const meta = t(`${base}.meta`, { returnObjects: true }) as MetaItem[];
  usePageTitle(t(`${base}.metaTitle`));

  return (
    <>
      <PageIntro
        className={className}
        backgroundImage={backgroundImage}
        crumbNumber={crumbNumber}
        crumbLabel={t(`${base}.crumbLabel`)}
        title={<Trans i18nKey={`pages:${base}.title`} components={{ em: <em />, br: <br /> }} />}
        lede={t(`${base}.lede`)}
        meta={meta}
      />

      {photoSet && <GewerkPhotoShowcase photoSet={photoSet} />}

      {wrapSection ? <section className="kalkulator">{children}</section> : children}

      {endCta && (
        <EndCtaLocal
          eyebrow={t(`${base}.endEyebrow`)}
          title={<Trans i18nKey={`pages:${base}.endTitle`} components={{ em: <em />, br: <br /> }} />}
          ctaLabel={t(`${base}.endCta`)}
          art="einzel"
        />
      )}
    </>
  );
}
