import type { CSSProperties, ReactNode } from 'react';

type MetaItem = {
  label: string;
  value: ReactNode;
};

type PageIntroProps = {
  className?: string;
  backgroundImage: string;
  backgroundPosition?: string;
  crumbNumber: string;
  crumbLabel: ReactNode;
  title: ReactNode;
  lede: ReactNode;
  meta: MetaItem[];
};

export default function PageIntro({
  className,
  backgroundImage,
  backgroundPosition,
  crumbNumber,
  crumbLabel,
  title,
  lede,
  meta,
}: PageIntroProps) {
  const style: CSSProperties & Record<string, string> = {
    '--page-intro-bg': `url(${backgroundImage})`,
  };

  if (backgroundPosition) {
    style['--page-intro-bg-position'] = backgroundPosition;
  }

  return (
    <section className={['page-intro', className].filter(Boolean).join(' ')} style={style}>
      <div className="page-intro__inner">
        <div className="animate-in">
          <div className="crumb"><span className="num">{crumbNumber}</span> {crumbLabel}</div>
          <h1>{title}</h1>
        </div>
        <div className="animate-in" data-delay="1">
          <p className="lede">{lede}</p>
          <ul className="meta-list">
            {meta.map((item) => (
              <li key={item.label}>{item.label}<span>{item.value}</span></li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
