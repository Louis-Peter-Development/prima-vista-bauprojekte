import { Suspense, useEffect, useRef, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import PageIntro from '../components/common/PageIntro';
import KalkCategoryPicker from '../components/kalkulator/KalkCategoryPicker';
import KalkLeafPicker from '../components/kalkulator/KalkLeafPicker';
import { KATEGORIEN, type KategorieKey } from '../data/kalkulatorNav';
import { usePageTitle } from '../hooks/usePageTitle';
import '../styles/pages/kalkulator.css';

type MetaItem = { label: string; value: string };

export default function Kalkulator() {
  const { t } = useTranslation('kalk');
  usePageTitle(t('intro.metaTitle'));
  const [kategorieKey, setKategorieKey] = useState<KategorieKey | null>(null);
  const [leafKey, setLeafKey] = useState<string | null>(null);
  const [categoryScrollTick, setCategoryScrollTick] = useState(0);
  const [leafScrollTick, setLeafScrollTick] = useState(0);
  const leavesRef = useRef<HTMLDivElement | null>(null);
  const embedRef = useRef<HTMLDivElement | null>(null);

  const category = KATEGORIEN.find((c) => c.key === kategorieKey) ?? null;
  const leaf = category?.leaves.find((l) => l.key === leafKey) ?? null;
  const LeafComponent = leaf?.Component ?? null;

  function scrollToPanel(element: HTMLElement) {
    const target = element.querySelector<HTMLElement>('.kalk-board__field, .hk-calc, .renocalc, .kalk-loading')
      ?? (element.firstElementChild instanceof HTMLElement
      ? element.firstElementChild
      : element);
    const header = document.querySelector<HTMLElement>('.pv-header');
    const headerBottom = header?.getBoundingClientRect().bottom ?? 0;
    const top = window.scrollY + target.getBoundingClientRect().top - headerBottom - 24;
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
  }

  useEffect(() => {
    if (!leafKey || !leafScrollTick || !embedRef.current) return;
    const frame = window.requestAnimationFrame(() => {
      if (embedRef.current) scrollToPanel(embedRef.current);
    });
    const timers = [160, 420].map((delay) => window.setTimeout(() => {
      if (embedRef.current) scrollToPanel(embedRef.current);
    }, delay));
    return () => {
      window.cancelAnimationFrame(frame);
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [leafKey, leafScrollTick]);

  useEffect(() => {
    if (!kategorieKey || !categoryScrollTick || !leavesRef.current) return;
    const frame = window.requestAnimationFrame(() => {
      leavesRef.current?.scrollIntoView({ block: 'start', behavior: 'smooth' });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [categoryScrollTick, kategorieKey]);

  function selectCategory(key: KategorieKey) {
    setKategorieKey(key);
    setLeafKey(null);
    setCategoryScrollTick((tick) => tick + 1);
  }

  function selectLeaf(key: string) {
    setLeafKey(key);
    setLeafScrollTick((tick) => tick + 1);
  }

  return (
    <>
      <PageIntro
        className="kalk-intro"
        backgroundImage="/assets/img/projects/eiche-parkett-01.webp"
        crumbNumber="06"
        crumbLabel={t('intro.crumbLabel')}
        title={<Trans i18nKey="kalk:intro.title" components={{ em: <em />, br: <br /> }} />}
        lede={t('intro.lede')}
        meta={t('intro.meta', { returnObjects: true }) as MetaItem[]}
      />

      <section className={`kalkulator kalkulator--nav ${LeafComponent ? 'has-embed' : ''}`}>
        <div className="kalkulator__inner kalkulator__inner--stack">
          <KalkCategoryPicker selected={kategorieKey} onSelect={selectCategory} />
          {category && (
            <div ref={leavesRef} className="kalk-leaves-anchor">
              <KalkLeafPicker
                category={category}
                selected={leafKey}
                onSelect={selectLeaf}
              />
            </div>
          )}
        </div>
      </section>

      {LeafComponent && (
        <div ref={embedRef} className="kalk-embed-wrap">
          <Suspense fallback={<div className="kalk-loading">{t('intro.loading')}</div>}>
            <LeafComponent embedded />
          </Suspense>
        </div>
      )}
    </>
  );
}
