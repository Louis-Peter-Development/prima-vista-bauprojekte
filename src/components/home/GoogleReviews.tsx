import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

type Review = {
  author: string;
  rating: number;
  text: string;
  relativeTime: string;
  profilePhoto?: string;
};

type ReviewsPayload = {
  rating?: number;
  userRatingsTotal?: number;
  url?: string;
  reviews?: Review[];
};

type Props = {
  fallback: { quote: string; name: string; meta: string };
};

export default function GoogleReviews({ fallback }: Props) {
  const { t } = useTranslation('home');
  const [data, setData] = useState<ReviewsPayload | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/reviews')
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then((d: ReviewsPayload) => {
        if (!cancelled) setData(d);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const reviews = data?.reviews?.filter((r) => r.text && r.rating >= 4) ?? [];

  if (error || reviews.length === 0) {
    return (
      <section className="testimonial">
        <div className="testimonial__inner reveal reveal--scale">
          <div className="quote-mark">&ldquo;</div>
          <blockquote>{fallback.quote}</blockquote>
          <div className="testimonial__attr">
            <span className="name">{fallback.name}</span>
            <span className="sep">·</span>
            <span>{fallback.meta}</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="testimonial">
      <div className="testimonial__inner reveal reveal--scale">
        <div className="testimonial__grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
          gap: 'clamp(24px, 4vw, 48px)',
          textAlign: 'left'
        }}>
          {reviews.slice(0, 4).map((r, i) => {
            const meta = [
              `${r.rating} ${t('reviews.starsSuffix')}`,
              r.relativeTime,
              t('reviews.source'),
            ].filter(Boolean).join(' · ');

            return (
              <div key={i} className="testimonial__item">
                <div className="quote-mark" style={{ fontSize: '80px', marginBottom: '16px', textAlign: 'left' }}>&ldquo;</div>
                <blockquote style={{ fontSize: '20px', marginBottom: '24px', textAlign: 'left' }}>{r.text}</blockquote>
                <div className="testimonial__attr" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '4px' }}>
                  <span className="name">{r.author}</span>
                  <span>{meta}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
