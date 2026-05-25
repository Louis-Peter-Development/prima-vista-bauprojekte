import { Link } from 'react-router-dom';
import type { LightboxItem } from '../Lightbox';
import type { Project } from '../../data/projects';

export function projectAnchorId(src: string): string {
  const file = src.split('/').pop() ?? src;
  return `proj-${file.replace(/\.[^.]+$/, '')}`;
}

type VisibleProject = {
  p: Project;
  match: boolean;
};

type ProjectGalleryProps = {
  visible: VisibleProject[];
  lightboxItems: LightboxItem[];
  getIndex: (project: Project) => number;
  onOpen: (items: LightboxItem[], index: number) => void;
};

export default function ProjectGallery({
  visible,
  lightboxItems,
  getIndex,
  onOpen,
}: ProjectGalleryProps) {
  return (
    <section className="gallery">
      <div className="gallery__grid">
        {visible.map(({ p, match }) => (
          <div
            key={p.num}
            id={projectAnchorId(p.src)}
            className={`g-card reveal reveal--scale${match ? '' : ' is-hidden'}`}
            data-size={p.size}
            data-delay={p.revealDelay}
          >
            <a
              className="g-card__img-link"
              href={p.src}
              onClick={(e) => {
                e.preventDefault();
                if (match) onOpen(lightboxItems, getIndex(p));
              }}
            >
              <img
                src={p.src}
                alt=""
                width={p.size === 'tall' ? 1125 : p.size === 'wide' ? 1500 : 1500}
                height={p.size === 'tall' ? 1500 : p.size === 'wide' ? 750 : 1125}
                loading="lazy"
              />
            </a>
            <div className="g-card__body">
              <span className="g-card__num">{p.num}</span>
              <h3 className="g-card__ttl">{p.ttl}</h3>
              <span className="g-card__meta">{p.meta}</span>
              {p.detail && (
                <Link
                  className="g-card__more"
                  to={`/projekte/${p.slug}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  Mehr erfahren <span>›</span>
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
