import { Trans, useTranslation } from 'react-i18next';
import SectionEyebrow from '../common/SectionEyebrow';
import { PROCESS_STEPS } from '../../data/gewerke';

export default function ProcessSection() {
  const { t } = useTranslation('pages');
  return (
    <section className="process">
      <div className="process__inner">
        <div className="process__head">
          <div className="reveal">
            <SectionEyebrow onDark>{t('gewerke.process.eyebrow')}</SectionEyebrow>
            <h2><Trans i18nKey="pages:gewerke.process.title" components={{ em: <em />, br: <br /> }} /></h2>
          </div>
          <p className="reveal" data-delay="1">{t('gewerke.process.intro')}</p>
        </div>
        <div className="process__steps">
          {PROCESS_STEPS.map((step, i) => (
            <div key={step.num} className="process-step reveal" data-delay={i || undefined}>
              <span className="process-step__num">{step.num}</span>
              <span className="process-step__label">{t(`gewerke.process.steps.${i + 1}.label`)}</span>
              <h3>{t(`gewerke.process.steps.${i + 1}.title`)}</h3>
              <p>{t(`gewerke.process.steps.${i + 1}.desc`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
