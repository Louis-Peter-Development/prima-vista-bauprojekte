import { HOME_TRADES } from '../../data/home';

export default function HomeMarquee() {
  return (
    <section className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {[...HOME_TRADES, ...HOME_TRADES].map((label, i) => (
          <span className="marquee__item" key={`${label}-${i}`}>{label}</span>
        ))}
      </div>
    </section>
  );
}
