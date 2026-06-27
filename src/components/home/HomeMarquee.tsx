import { useTranslation } from 'react-i18next';

export default function HomeMarquee() {
  const { t } = useTranslation('home');
  const items = t('marquee.items', { returnObjects: true }) as string[];
  return (
    <section className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {[...items, ...items].map((label, i) => (
          <span className="marquee__item" key={`${label}-${i}`}>{label}</span>
        ))}
      </div>
    </section>
  );
}
