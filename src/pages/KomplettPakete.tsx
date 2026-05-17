import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import '../styles/pages/komplett-pakete.css';

type Pkg = {
  num: string;
  variant?: 'paper' | 'ink' | undefined;
  reverse?: boolean;
  photo: string;
  alt: string;
  eyebrow: string;
  title: ReactNode;
  lede: string;
  priceLabel: string;
  priceVal: string;
  priceFrom: string;
  includes: string[];
  ctaLabel: string;
  ctaDark?: boolean;
};

const PACKAGES: Pkg[] = [
  {
    num: '01',
    photo: '/assets/img/photo-haus-clean.jpg',
    alt: 'Haus-Sanierung',
    eyebrow: 'Komplettpaket · Haus',
    title: <>Haus-<br /><em>Sanierung.</em></>,
    lede: 'Generalsanierung von Bestandsbauten — vom Dach bis zur Hofeinfahrt. Für Einfamilienhäuser, Mehrfamilien­häuser und Reihenhäuser bis 480 m².',
    priceLabel: 'Festpreis ab',
    priceVal: '€ 1.480 / m²',
    priceFrom: 'inkl. Material & Bauleitung',
    includes: ['Dach & Dämmung', 'Fassade & Putz', 'Fenster & Türen', 'Elektrik & Smart-Home',
               'Sanitär & Heizung', 'Innenausbau komplett', 'Garten & Außenanlagen', 'Behörden & Genehmigungen'],
    ctaLabel: 'Festpreis anfragen',
  },
  {
    num: '02',
    variant: 'paper',
    reverse: true,
    photo: '/assets/img/photo-wohnung-clean.jpg',
    alt: 'Wohnung-Sanierung',
    eyebrow: 'Komplettpaket · Wohnung',
    title: <>Wohnung-<br /><em>Sanierung.</em></>,
    lede: 'Etagenwohnungen modular sanieren: Bäder, Küchen, Böden, Elektrik, Heizung — in 6 bis 10 Wochen bewohnbar. Auch bei vermieteten Einheiten.',
    priceLabel: 'Festpreis ab',
    priceVal: '€ 980 / m²',
    priceFrom: 'inkl. Material & Bauleitung',
    includes: ['Bäder & WCs', 'Küche & Geräte', 'Parkett, Stein, Vinyl', 'Elektrik komplett',
               'Sanitärstränge', 'Wände & Decken', 'Maler & Tapeten', 'Innentüren'],
    ctaLabel: 'Festpreis anfragen',
  },
  {
    num: '03',
    variant: 'ink',
    photo: '/assets/img/proj-moroccan-dining.jpg',
    alt: 'Gastronomie-Ausbau',
    eyebrow: 'Komplettpaket · Gastronomie',
    title: <>Gastronomie-<br /><em>Ausbau.</em></>,
    lede: 'Restaurants, Bars und Hotels — von der Konzeptphase bis zur Eröffnung. Wir bauen schlüssel­fertig und stellen Sie auf das Veterinär­amt vor.',
    priceLabel: 'Konzept-Sprint ab',
    priceVal: '€ 4.800',
    priceFrom: 'Bauleistung individuell',
    includes: ['Innenarchitektur & Konzept', 'Lüftungs- und Klimatechnik', 'Küche & Theke (gewerblich)',
               'Kühlhäuser & Lager', 'Sanitärbereiche Gast/Personal', 'Möbel, Polster & Licht',
               'POS & Audio-/Video-Technik', 'Brandschutz & Abnahmen'],
    ctaLabel: 'Konzept buchen',
    ctaDark: true,
  },
];

const COMPARE_ROWS: Array<{ feature: string; haus: React.ReactNode; wohnung: React.ReactNode; gastro: React.ReactNode }> = [
  { feature: 'Bauzeit (Median)',           haus: <span className="num">22 Wochen</span>,    wohnung: <span className="num">8 Wochen</span>,  gastro: <span className="num">14 Wochen</span> },
  { feature: 'Investition (ab)',           haus: <span className="num">€ 1.480 / m²</span>, wohnung: <span className="num">€ 980 / m²</span>, gastro: <span className="num">Individuell</span> },
  { feature: 'Geeignet für Selbstbewohner', haus: <span className="compare__check">✓</span>, wohnung: <span className="compare__check">✓</span>, gastro: <span className="compare__no">—</span> },
  { feature: 'Während Bewohnung möglich',   haus: <span className="compare__no">teils</span>, wohnung: <span className="compare__check">✓</span>, gastro: <span className="compare__no">—</span> },
  { feature: 'Behörden & Genehmigungen',    haus: <span className="compare__check">✓</span>, wohnung: <span className="compare__check">✓</span>, gastro: <span className="compare__check">✓</span> },
  { feature: 'Festpreisgarantie',           haus: <span className="compare__check">✓</span>, wohnung: <span className="compare__check">✓</span>, gastro: <span className="compare__check">✓</span> },
  { feature: '5 Jahre Werksgewähr',         haus: <span className="compare__check">✓</span>, wohnung: <span className="compare__check">✓</span>, gastro: <span className="compare__check">✓</span> },
];

export default function KomplettPakete() {
  return (
    <>
      <section className="page-intro">
        <div className="page-intro__inner">
          <div className="reveal">
            <div className="crumb"><span className="num">03</span> Komplett-Pakete</div>
            <h1>
              Drei Wege<br />
              zum fertigen<br />
              <em>Raum.</em>
            </h1>
          </div>
          <div className="reveal" data-delay="1">
            <p className="lede">
              Verwandeln Sie Ihr Zuhause in Ihren Traumort: sorgenfreie Komplett­sanierung für Haus, Wohnung und Gastronomie — Bauleitung und alle Materialien inklusive.
            </p>
            <ul className="meta-list">
              <li>Festpreisgarantie<span>Schriftlich, vor Beginn</span></li>
              <li>Bauzeit<span>6–32 Wochen</span></li>
              <li>Bauleitung<span>Eigene Inhouse-Teams</span></li>
              <li>Versicherung<span>5 Jahre Werksgewähr</span></li>
            </ul>
          </div>
        </div>
      </section>

      {PACKAGES.map((pkg) => {
        const cls = ['pkg-detail'];
        if (pkg.variant === 'paper') cls.push('pkg-detail--paper');
        if (pkg.variant === 'ink') cls.push('pkg-detail--ink');
        if (pkg.reverse) cls.push('pkg-detail--reverse');

        const photo = (
          <div className="pkg-detail__photo reveal">
            <span className="pkg-detail__photo-num">{pkg.num}</span>
            <img src={pkg.photo} alt={pkg.alt} />
          </div>
        );
        const body = (
          <div className="pkg-detail__body reveal" data-delay="1">
            <div className="pkg-detail__eyebrow"><span className="rule-red"></span> {pkg.eyebrow}</div>
            <h2 className="pkg-detail__title">{pkg.title}</h2>
            <p className="pkg-detail__lede">{pkg.lede}</p>
            <div className="pkg-detail__price">
              <span className="pkg-detail__price-label">{pkg.priceLabel}</span>
              <span className="pkg-detail__price-val">{pkg.priceVal}</span>
              <span className="pkg-detail__price-from">{pkg.priceFrom}</span>
            </div>
            <ul className="pkg-detail__includes">
              {pkg.includes.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <Link className={`btn ${pkg.ctaDark ? 'btn--dark' : 'btn--light'}`} to="/kontakt">
              {pkg.ctaLabel} <span className="arrow">&gt;</span>
            </Link>
          </div>
        );

        return (
          <section key={pkg.num} className={cls.join(' ')}>
            <div className="pkg-detail__inner">
              {pkg.reverse ? <>{body}{photo}</> : <>{photo}{body}</>}
            </div>
          </section>
        );
      })}

      <section className="compare">
        <div className="compare__head reveal">
          <div className="eyebrow"><span className="rule-red"></span>&nbsp;&nbsp;Im Vergleich</div>
          <h2 style={{ marginTop: 18 }}>
            Welches Paket passt zu <em>Ihrem</em> Projekt?
          </h2>
          <p>
            Die Antwort steckt fast immer in zwei Fragen: Wohnen Sie selbst dort? Und wie groß ist der Eingriff? Die folgenden Werte sind unsere Median-Erfahrungen aus 412 Projekten.
          </p>
        </div>
        <div className="compare__table">
          <div className="compare__grid">
            <div className="compare__row">
              <div className="compare__cell compare__cell--head">Merkmal</div>
              <div className="compare__cell compare__cell--head">Haus</div>
              <div className="compare__cell compare__cell--head" style={{ color: 'var(--pv-copper)' }}>Wohnung</div>
              <div className="compare__cell compare__cell--head">Gastro</div>
            </div>
            {COMPARE_ROWS.map((row) => (
              <div key={row.feature} className="compare__row">
                <div className="compare__cell compare__cell--first">{row.feature}</div>
                <div className="compare__cell">{row.haus}</div>
                <div className="compare__cell compare__highlight">{row.wohnung}</div>
                <div className="compare__cell">{row.gastro}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pkg-quote">
        <div className="reveal">
          <blockquote>
            Sie zahlen <em>einen</em> Preis, sehen <em>ein</em> Datum, sprechen mit <em>einer</em> Person — und das vom ersten Telefonat bis zur Schlüsselübergabe.
          </blockquote>
          <div className="attr">
            <span className="name">Daniel &amp; Monica</span> &nbsp;·&nbsp; Gründer, Prima Vista Bauprojekte
          </div>
        </div>
      </section>

      <section className="end-cta-local" style={{ background: 'var(--pv-cream-paper)' }}>
        <div className="end-cta-local__inner reveal">
          <div className="eyebrow"><span className="rule-red"></span>&nbsp;&nbsp;Erste Beratung kostenlos</div>
          <h2 style={{ marginTop: 24 }}>
            Welches <em>Paket</em><br />passt zu Ihnen?
          </h2>
          <Link className="btn btn--light" to="/kontakt">Termin vereinbaren <span className="arrow">&gt;</span></Link>
        </div>
      </section>
    </>
  );
}
