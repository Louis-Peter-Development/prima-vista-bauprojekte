import { useMemo, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import PageIntro from '../components/common/PageIntro';
import EndCtaLocal from '../components/common/EndCtaLocal';
import MapBand from '../components/projekte/MapBand';
import ProjectFilter from '../components/projekte/ProjectFilter';
import ProjectGallery from '../components/projekte/ProjectGallery';
import { PROJECTS, type ProjectTag } from '../data/projects';
import '../styles/pages/projekte.css';

export default function Projekte() {
  const { t } = useTranslation('projects');
  const [filter, setFilter] = useState<'all' | ProjectTag>('all');

  const visible = useMemo(
    () => PROJECTS.map((p) => ({ p, match: filter === 'all' || p.tags.includes(filter) })),
    [filter],
  );
  const shownProjects = visible.filter((v) => v.match).map((v) => v.p);

  return (
    <>
      <PageIntro
        backgroundImage="/assets/img/projects/bad-soden-einfamilienhaus-01.webp"
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
      <ProjectGallery visible={visible} />
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
