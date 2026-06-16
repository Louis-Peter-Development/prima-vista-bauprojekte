import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';

type MetaItem = {
  label: string;
  value: ReactNode;
};

type PageIntroProps = {
  className?: string;
  backgroundImage: string;
  backgroundImages?: string[];
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
  backgroundImages,
  backgroundPosition,
  crumbNumber,
  crumbLabel,
  title,
  lede,
  meta,
}: PageIntroProps) {
  const slides = backgroundImages && backgroundImages.length > 0 ? backgroundImages : [backgroundImage];
  const hasSlideshow = slides.length > 1;
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (!hasSlideshow) return undefined;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let interval = 0;

    const start = () => {
      if (interval || motionQuery.matches) return;
      interval = window.setInterval(() => {
        setActiveSlide((current) => (current + 1) % slides.length);
      }, 5000);
    };
    const stop = () => {
      if (!interval) return;
      window.clearInterval(interval);
      interval = 0;
    };
    const handleMotionChange = () => {
      if (motionQuery.matches) stop();
      else start();
    };

    start();
    motionQuery.addEventListener('change', handleMotionChange);

    return () => {
      stop();
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, [hasSlideshow, slides.length]);

  const style: CSSProperties & Record<string, string> = {
    '--page-intro-bg': `url(${backgroundImage})`,
  };

  if (backgroundPosition) {
    style['--page-intro-bg-position'] = backgroundPosition;
  }

  return (
    <section className={['page-intro', hasSlideshow ? 'page-intro--slideshow' : undefined, className].filter(Boolean).join(' ')} style={style}>
      {hasSlideshow && (
        <div className="page-intro__slideshow" aria-hidden="true">
          {slides.map((slide, index) => (
            <img
              className={index === activeSlide ? 'is-active' : undefined}
              src={slide}
              alt=""
              key={slide}
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding={index === 0 ? 'sync' : 'async'}
            />
          ))}
        </div>
      )}
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
