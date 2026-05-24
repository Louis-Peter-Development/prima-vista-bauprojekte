import type { ReactNode } from 'react';

export type Package = {
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
  detailTo?: string;
};

export const PACKAGES: Package[] = [
  {
    num: '01',
    photo: '/assets/img/photo-haus-exterior.webp',
    alt: 'Haus-Sanierung',
    eyebrow: 'Komplettpaket · Haus',
    detailTo: '/haus-sanierung',
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
    photo: '/assets/img/photo-parkett-altbau.webp',
    alt: 'Wohnung-Sanierung',
    eyebrow: 'Komplettpaket · Wohnung',
    detailTo: '/wohnung-sanierung',
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
    photo: '/assets/img/proj-sushi.webp',
    alt: 'Gastronomie-Ausbau',
    eyebrow: 'Komplettpaket · Gastronomie',
    detailTo: '/gastronomie-ausbau',
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

export const COMPARE_ROWS: Array<{ feature: string; haus: ReactNode; wohnung: ReactNode; gastro: ReactNode }> = [
  { feature: 'Bauzeit (Median)', haus: <span className="num">22 Wochen</span>, wohnung: <span className="num">8 Wochen</span>, gastro: <span className="num">14 Wochen</span> },
  { feature: 'Investition (ab)', haus: <span className="num">€ 1.480 / m²</span>, wohnung: <span className="num">€ 980 / m²</span>, gastro: <span className="num">Individuell</span> },
  { feature: 'Geeignet für Selbstbewohner', haus: <span className="compare__check">✓</span>, wohnung: <span className="compare__check">✓</span>, gastro: <span className="compare__no">—</span> },
  { feature: 'Während Bewohnung möglich', haus: <span className="compare__no">teils</span>, wohnung: <span className="compare__check">✓</span>, gastro: <span className="compare__no">—</span> },
  { feature: 'Behörden & Genehmigungen', haus: <span className="compare__check">✓</span>, wohnung: <span className="compare__check">✓</span>, gastro: <span className="compare__check">✓</span> },
  { feature: 'Festpreisgarantie', haus: <span className="compare__check">✓</span>, wohnung: <span className="compare__check">✓</span>, gastro: <span className="compare__check">✓</span> },
  { feature: '5 Jahre Werksgewähr', haus: <span className="compare__check">✓</span>, wohnung: <span className="compare__check">✓</span>, gastro: <span className="compare__check">✓</span> },
];
