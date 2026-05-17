import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLightbox, type LightboxItem } from '../components/Lightbox';
import '../styles/pages/projekte.css';

type Size = 'lg' | 'md' | 'sm' | 'tall' | 'wide' | 'sq';
type Tag = 'wohnsitz' | 'gastro' | 'bad' | 'kueche' | 'commercial';

type Project = {
  num: string;
  title: string;
  ttl: string;
  meta: string;
  src: string;
  size: Size;
  tags: Tag[];
  revealDelay?: number;
};

const PROJECTS: Project[] = [
  { num: '№ 142',  title: 'Riad — Restaurant · Frankfurt · 2025',     ttl: 'Riad Restaurant',  meta: 'Gastronomie · Frankfurt · 2025',  src: '/assets/img/proj-moroccan-dining-wide.jpg', size: 'lg',   tags: ['gastro'] },
  { num: '№ 138',  title: 'Villa Sichtbeton · Luzern · 2024',         ttl: 'Villa Sichtbeton', meta: 'Wohnsitz · Luzern · 2024',        src: '/assets/img/proj-concrete-sofa-tall.jpg',   size: 'md',   tags: ['wohnsitz'], revealDelay: 1 },
  { num: '№ 140',  title: 'Küche Eichenholz · Frankfurt · 2025',      ttl: 'Küche Eiche',      meta: 'Wohnsitz · Frankfurt · 2025',     src: '/assets/img/proj-kitchen-oak.jpg',          size: 'sm',   tags: ['wohnsitz', 'kueche'] },
  { num: '№ 141',  title: 'Spa-Bad — Hotel · Emmenbrücke · 2025',     ttl: 'Spa-Bad',          meta: 'Hotel · Emmenbrücke · 2025',      src: '/assets/img/proj-spa-bath.jpg',             size: 'sm',   tags: ['commercial', 'bad'], revealDelay: 1 },
  { num: '№ 145',  title: 'Office Lobby · Frankfurt · 2026',          ttl: 'Office Lobby',     meta: 'Commercial · Frankfurt · 2026',   src: '/assets/img/proj-lobby-tree-wide.jpg',      size: 'sm',   tags: ['commercial'], revealDelay: 2 },
  { num: '№ 139',  title: 'Sushi Counter · Wiesbaden · 2025',         ttl: 'Sushi Counter',    meta: 'Gastronomie · Wiesbaden · 2025',  src: '/assets/img/proj-sushi-wide.jpg',           size: 'wide', tags: ['gastro'] },
  { num: '№ 136',  title: 'Sichtbeton-Treppenhaus · Luzern · 2024',   ttl: 'Treppenhaus',      meta: 'Commercial · Luzern · 2024',      src: '/assets/img/proj-stairs-concrete.jpg',      size: 'tall', tags: ['commercial'], revealDelay: 1 },
  { num: '№ 143',  title: 'Doppelbad · Frankfurt · 2025',             ttl: 'Doppelbad',        meta: 'Wohnsitz · Frankfurt · 2025',     src: '/assets/img/proj-bath-double.jpg',          size: 'sm',   tags: ['wohnsitz', 'bad'] },
  { num: '№ 137',  title: 'Naturstein-Bad · Sachsenhausen · 2024',    ttl: 'Naturstein-Bad',   meta: 'Wohnsitz · Sachsenhausen · 2024', src: '/assets/img/proj-bath-stone.jpg',           size: 'sm',   tags: ['wohnsitz', 'bad'], revealDelay: 1 },
  { num: '№ 142b', title: 'Riad — Bar-Ecke · Frankfurt · 2025',       ttl: 'Riad Bar-Ecke',    meta: 'Gastronomie · Frankfurt · 2025',  src: '/assets/img/proj-moroccan-corner.jpg',      size: 'md',   tags: ['gastro'] },
  { num: '№ 138b', title: 'Concrete Corner · Luzern · 2024',          ttl: 'Concrete Corner',  meta: 'Wohnsitz · Luzern · 2024',        src: '/assets/img/proj-concrete-corner.jpg',      size: 'lg',   tags: ['wohnsitz'], revealDelay: 1 },
  { num: '№ 146',  title: 'Wine Bar · Frankfurt · 2026',              ttl: 'Wine Bar',         meta: 'Gastronomie · Frankfurt · 2026',  src: '/assets/img/proj-wine-restaurant.jpg',      size: 'sm',   tags: ['gastro'] },
  { num: '№ 141b', title: 'Spa-Korridor · Emmenbrücke · 2025',        ttl: 'Spa Korridor',     meta: 'Hotel · Emmenbrücke · 2025',      src: '/assets/img/proj-spa-corridor.jpg',         size: 'sm',   tags: ['commercial'], revealDelay: 1 },
  { num: '№ 144',  title: 'Eiche Parkett · Wiesbaden · 2025',         ttl: 'Eiche Parkett',    meta: 'Wohnsitz · Wiesbaden · 2025',     src: '/assets/img/proj-floor-oak.jpg',            size: 'sm',   tags: ['wohnsitz'], revealDelay: 2 },
  { num: '№ 145b', title: 'Lobby Garden · Frankfurt · 2026',          ttl: 'Lobby Garden',     meta: 'Commercial · Frankfurt · 2026',   src: '/assets/img/proj-lobby-tree.jpg',           size: 'wide', tags: ['commercial'] },
  { num: '№ 142c', title: 'Riad — Lampen · Frankfurt · 2025',         ttl: 'Riad Lampen',      meta: 'Gastronomie · Frankfurt · 2025',  src: '/assets/img/proj-moroccan-lamps.jpg',       size: 'tall', tags: ['gastro'], revealDelay: 1 },
];

const FILTERS: Array<{ key: 'all' | Tag; label: string }> = [
  { key: 'all',        label: 'Alle' },
  { key: 'wohnsitz',   label: 'Wohnsitz' },
  { key: 'gastro',     label: 'Gastronomie' },
  { key: 'bad',        label: 'Bäder' },
  { key: 'kueche',     label: 'Küchen' },
  { key: 'commercial', label: 'Commercial' },
];

export default function Projekte() {
  const { open } = useLightbox();
  const [filter, setFilter] = useState<'all' | Tag>('all');

  const visible = useMemo(
    () => PROJECTS.map((p) => ({ p, match: filter === 'all' || p.tags.includes(filter) })),
    [filter],
  );
  const shownProjects = visible.filter((v) => v.match).map((v) => v.p);
  const lightboxItems: LightboxItem[] = shownProjects.map((p) => ({ src: p.src, title: p.title }));
  const indexInShown = (p: Project) => shownProjects.indexOf(p);

  return (
    <>
      <section className="page-intro">
        <div className="page-intro__inner">
          <div className="reveal">
            <div className="crumb"><span className="num">04</span> Projekte · Werkschau</div>
            <h1>
              Räume aus<br />
              der <em>Werkstatt.</em>
            </h1>
          </div>
          <div className="reveal" data-delay="1">
            <p className="lede">
              Eine Auswahl der Projekte, die wir 2024 bis 2026 abgeschlossen haben — Wohnsitz, Gastronomie und gemischte Nutzungen in Hessen und der Innerschweiz.
            </p>
            <ul className="meta-list">
              <li>Gezeigt<span>{shownProjects.length} Projekte</span></li>
              <li>Zeitraum<span>2024–2026</span></li>
              <li>Region<span>DE Frankfurt · CH Luzern</span></li>
              <li>Vollständiges Portfolio<span>Auf Anfrage</span></li>
            </ul>
          </div>
        </div>
      </section>

      <div className="proj-filter">
        <div className="proj-filter__inner">
          <span className="proj-filter__label">Filtern nach</span>
          <ul className="proj-filter__list">
            {FILTERS.map(({ key, label }) => (
              <li key={key}>
                <button
                  type="button"
                  className={`proj-filter__chip${filter === key ? ' is-active' : ''}`}
                  onClick={() => setFilter(key)}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
          <span className="proj-filter__count">{shownProjects.length} / {PROJECTS.length}</span>
        </div>
      </div>

      <section className="gallery">
        <div className="gallery__grid">
          {visible.map(({ p, match }) => (
            <a
              key={p.num}
              className={`g-card reveal${match ? '' : ' is-hidden'}`}
              data-size={p.size}
              data-delay={p.revealDelay}
              href={p.src}
              onClick={(e) => {
                e.preventDefault();
                if (match) open(lightboxItems, indexInShown(p));
              }}
            >
              <img src={p.src} alt="" />
              <div className="g-card__body">
                <span className="g-card__num">{p.num}</span>
                <h3 className="g-card__ttl">{p.ttl}</h3>
                <span className="g-card__meta">{p.meta}</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="map-band">
        <div className="map-band__inner">
          <div className="reveal">
            <div className="eyebrow eyebrow--on-dark"><span className="rule-red"></span>&nbsp;&nbsp;Standorte</div>
            <h2 style={{ marginTop: 18 }}>
              Gebaut in zwei<br />
              Ländern, gleicher<br />
              <em>Anspruch.</em>
            </h2>
            <p>
              Von der Frankfurter Zentrale aus betreuen wir Projekte in ganz Hessen. Aus Emmenbrücke heraus die Innerschweiz. Beide Büros teilen Bauleiter, Lieferanten und Standards.
            </p>
            <ul className="map-band__cities">
              <li><span className="num">DE</span><span className="city">Frankfurt am Main</span></li>
              <li><span className="num">CH</span><span className="city">Emmenbrücke / Luzern</span></li>
              <li><span className="num">DE</span><span className="city">Wiesbaden</span></li>
              <li><span className="num">CH</span><span className="city">Zug, Zürich</span></li>
              <li><span className="num">DE</span><span className="city">Darmstadt, Offenbach</span></li>
              <li><span className="num">CH</span><span className="city">Innerschweiz</span></li>
            </ul>
          </div>
          <div className="map-band__photo reveal" data-delay="1">
            <img src="/assets/img/proj-team-jacket.jpg" alt="Prima Vista Team auf der Baustelle" />
            <div className="map-band__photo-label">
              <span className="num">№ 00</span><span>Team Frankfurt — 2026</span>
            </div>
          </div>
        </div>
      </section>

      <section className="end-cta-local" style={{ background: 'var(--pv-cream-paper)' }}>
        <div className="end-cta-local__inner reveal">
          <div className="eyebrow"><span className="rule-red"></span>&nbsp;&nbsp;Ihr Projekt</div>
          <h2 style={{ marginTop: 24 }}>
            Erzählen Sie uns von<br />Ihrem <em>nächsten Raum.</em>
          </h2>
          <Link className="btn btn--light" to="/kontakt">Termin vereinbaren <span className="arrow">&gt;</span></Link>
        </div>
      </section>
    </>
  );
}
