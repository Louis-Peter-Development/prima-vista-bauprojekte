import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PageIntro from '../components/common/PageIntro';
import EndCtaLocal from '../components/common/EndCtaLocal';
import MapBand from '../components/projekte/MapBand';
import ProjectFilter from '../components/projekte/ProjectFilter';
import ProjectGallery, { projectAnchorId } from '../components/projekte/ProjectGallery';
import { useLightbox, type LightboxItem } from '../components/Lightbox';
import { PROJECTS, type Project, type ProjectTag } from '../data/projects';
import { usePageTitle } from '../hooks/usePageTitle';
import '../styles/pages/projekte.css';

export default function Projekte() {
  usePageTitle('Projekte & Referenzen');
  const { open } = useLightbox();
  const { hash } = useLocation();
  const [filter, setFilter] = useState<'all' | ProjectTag>('all');
  const openedHashRef = useRef<string | null>(null);

  const visible = useMemo(
    () => PROJECTS.map((p) => ({ p, match: filter === 'all' || p.tags.includes(filter) })),
    [filter],
  );
  const shownProjects = visible.filter((v) => v.match).map((v) => v.p);
  const lightboxItems: LightboxItem[] = shownProjects.map((p) => ({ src: p.src, title: p.title, slug: p.detail ? p.slug : undefined }));
  const indexInShown = (p: Project) => shownProjects.indexOf(p);

  useEffect(() => {
    const target = hash.replace(/^#/, '');
    if (!target || openedHashRef.current === target) return;
    const idx = PROJECTS.findIndex((p) => projectAnchorId(p.src) === target);
    if (idx === -1) return;
    openedHashRef.current = target;
    setFilter('all');
    const allItems: LightboxItem[] = PROJECTS.map((p) => ({ src: p.src, title: p.title, slug: p.detail ? p.slug : undefined }));
    document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    open(allItems, idx);
  }, [hash, open]);

  return (
    <>
      <PageIntro
        backgroundImage="/assets/img/proj-moroccan-dining-wide.webp"
        crumbNumber="04"
        crumbLabel="Projekte · Werkschau"
        title={<>Räume aus<br />der <em>Werkstatt.</em></>}
        lede="Eine Auswahl der Projekte, die wir 2024 bis 2026 abgeschlossen haben — Wohnsitz, Gastronomie und gemischte Nutzungen in Hessen und der Innerschweiz."
        meta={[
          { label: 'Gezeigt', value: `${shownProjects.length} Projekte` },
          { label: 'Zeitraum', value: '2024–2026' },
          { label: 'Region', value: 'DE Frankfurt · CH Luzern' },
          { label: 'Vollständiges Portfolio', value: 'Auf Anfrage' },
        ]}
      />

      <ProjectFilter filter={filter} count={shownProjects.length} onChange={setFilter} />
      <ProjectGallery visible={visible} lightboxItems={lightboxItems} getIndex={indexInShown} onOpen={open} />
      <MapBand />
      <EndCtaLocal
        eyebrow="Ihr Projekt"
        title={<>Erzählen Sie uns von<br />Ihrem <em>nächsten Raum.</em></>}
        ctaLabel="Termin vereinbaren"
        style={{ background: 'var(--pv-cream-paper)' }}
      />
    </>
  );
}
