import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import PageIntro from '../components/common/PageIntro';
import EndCtaLocal from '../components/common/EndCtaLocal';
import MapBand from '../components/projekte/MapBand';
import ProjectFilter from '../components/projekte/ProjectFilter';
import ProjectGallery, { projectAnchorId } from '../components/projekte/ProjectGallery';
import { useLightbox, type LightboxItem } from '../components/Lightbox';
import { PROJECTS, type Project, type ProjectTag } from '../data/projects';
import '../styles/pages/projekte.css';

export default function Projekte() {
  const { t } = useTranslation('projects');
  const { open } = useLightbox();
  const { hash } = useLocation();
  const [filter, setFilter] = useState<'all' | ProjectTag>('all');
  const openedHashRef = useRef<string | null>(null);

  const visible = useMemo(
    () => PROJECTS.map((p) => ({ p, match: filter === 'all' || p.tags.includes(filter) })),
    [filter],
  );
  const shownProjects = visible.filter((v) => v.match).map((v) => v.p);
  const itemTitle = (p: Project) => t(`items.${p.slug}.title`, { defaultValue: p.title });
  const lightboxItems: LightboxItem[] = shownProjects.map((p) => ({ src: p.src, title: itemTitle(p), slug: p.detail ? p.slug : undefined }));
  const indexInShown = (p: Project) => shownProjects.indexOf(p);

  useEffect(() => {
    const target = hash.replace(/^#/, '');
    if (!target || openedHashRef.current === target) return;
    const idx = PROJECTS.findIndex((p) => projectAnchorId(p.src) === target);
    if (idx === -1) return;
    openedHashRef.current = target;
    setFilter('all');
    const allItems: LightboxItem[] = PROJECTS.map((p) => ({
      src: p.src,
      title: t(`items.${p.slug}.title`, { defaultValue: p.title }),
      slug: p.detail ? p.slug : undefined,
    }));
    document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    open(allItems, idx);
  }, [hash, open, t]);

  return (
    <>
      <PageIntro
        backgroundImage="/assets/img/proj-concrete-sofa-tall.webp"
        crumbNumber="04"
        crumbLabel={t('overview.crumbLabel')}
        title={<Trans i18nKey="projects:overview.title" components={{ em: <em />, br: <br /> }} />}
        lede={t('overview.lede')}
        meta={[
          { label: t('overview.metaShownLabel'), value: t('overview.metaShownValue', { count: shownProjects.length }) },
          { label: t('overview.metaPeriodLabel'), value: t('overview.metaPeriodValue') },
          { label: t('overview.metaRegionLabel'), value: t('overview.metaRegionValue') },
          { label: t('overview.metaPortfolioLabel'), value: t('overview.metaPortfolioValue') },
        ]}
      />

      <ProjectFilter filter={filter} count={shownProjects.length} onChange={setFilter} />
      <ProjectGallery visible={visible} lightboxItems={lightboxItems} getIndex={indexInShown} onOpen={open} />
      <MapBand />
      <EndCtaLocal
        eyebrow={t('overview.endEyebrow')}
        title={<Trans i18nKey="projects:overview.endTitle" components={{ em: <em />, br: <br /> }} />}
        ctaLabel={t('overview.endCta')}
        art="andere"
        style={{ background: 'var(--pv-cream-paper)' }}
      />
    </>
  );
}
