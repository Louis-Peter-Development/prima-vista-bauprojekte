import { useTranslation } from 'react-i18next';
import { Link } from '../../i18n/Link';
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

const projectLayoutSequence = ['feature', 'stack', 'stack', 'third', 'third', 'third', 'half', 'half'] as const;
type ProjectLayout = (typeof projectLayoutSequence)[number];

function layoutForVisibleIndex(index: number): ProjectLayout {
  if (index < projectLayoutSequence.length) return projectLayoutSequence[index];
  const repeat = ['third', 'third', 'third', 'half', 'half'] as const;
  return repeat[(index - projectLayoutSequence.length) % repeat.length];
}

export default function ProjectGallery({
  visible,
  lightboxItems,
  getIndex,
  onOpen,
}: ProjectGalleryProps) {
  const { t } = useTranslation('projects');
  const totalVisible = visible.filter((project) => project.match).length;
  const projects = visible.map(({ p, match }, index) => {
    if (!match) return { p, match, layout: undefined, align: undefined };
    const visibleIndex = visible.slice(0, index).filter((project) => project.match).length;
    const layout = layoutForVisibleIndex(visibleIndex);
    const previousLayout = visibleIndex > 0 ? layoutForVisibleIndex(visibleIndex - 1) : undefined;
    const align = layout === 'half' && visibleIndex === totalVisible - 1 && previousLayout !== 'half'
      ? 'center'
      : undefined;
    return { p, match, layout, align };
  });

  return (
    <section className="gallery">
      <div className="gallery__grid">
        {projects.map(({ p, match, layout, align }) => (
          <div
            key={p.num}
            id={projectAnchorId(p.src)}
            className={`g-card reveal reveal--scale${match ? '' : ' is-hidden'}`}
            data-size={p.size}
            data-layout={layout}
            data-align={align}
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
              <h3 className="g-card__ttl">{t(`items.${p.slug}.ttl`, { defaultValue: p.ttl })}</h3>
              <span className="g-card__meta">{t(`items.${p.slug}.meta`, { defaultValue: p.meta })}</span>
              {p.detail && (
                <Link
                  className="g-card__more"
                  to={`/projekte/${p.slug}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  {t('gallery.more')} <span>›</span>
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
