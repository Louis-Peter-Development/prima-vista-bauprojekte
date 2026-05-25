import { Link } from 'react-router-dom';
import type { LightboxItem } from '../Lightbox';
import SectionEyebrow from '../common/SectionEyebrow';
import { FEATURED_TRADES } from '../../data/gewerke';

type FeaturedTradesProps = {
  items: LightboxItem[];
  onOpen: (items: LightboxItem[], index: number) => void;
};

export default function FeaturedTrades({ items, onOpen }: FeaturedTradesProps) {
  return (
    <section className="featured-trades">
      <div className="featured-trades__inner">
        <div className="featured-trades__head">
          <div className="reveal">
            <SectionEyebrow>Am häufigsten gefragt</SectionEyebrow>
            <h2>
              Drei Gewerke, die fast<br />
              jedes Projekt <em>tragen.</em>
            </h2>
          </div>
          <p className="reveal" data-delay="1">
            Ob Komplettsanierung oder Einzelauftrag — drei Disziplinen sind in jedem zweiten Auftrag dabei. Mit eigenen Teams in Bad, Küche und Boden.
          </p>
        </div>
        <div className="featured-trades__grid">
          {FEATURED_TRADES.map((card, i) => {
            const className = `ft-card${card.feature ? ' ft-card--feature' : ''} reveal reveal--scale`;
            const body = (
              <>
                <img src={card.src} alt={card.title} width="800" height="600" loading="lazy" />
                <div className="ft-card__body">
                  <span className="ft-card__count">{card.count}</span>
                  <h3 className="ft-card__title">{card.heading[0]}<br />{card.heading[1]}</h3>
                  <p className="ft-card__desc">{card.desc}</p>
                  {card.detailTo ? <span className="ft-card__more">Kostenrechner öffnen ›</span> : null}
                </div>
              </>
            );

            return card.detailTo ? (
              <Link
                key={card.src}
                className={className}
                data-delay={card.revealDelay}
                to={card.detailTo}
              >
                {body}
              </Link>
            ) : (
              <a
                key={card.src}
                className={className}
                data-delay={card.revealDelay}
                href={card.src}
                onClick={(e) => { e.preventDefault(); onOpen(items, i); }}
              >
                {body}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
