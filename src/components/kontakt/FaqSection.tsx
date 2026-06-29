import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import SectionEyebrow from '../common/SectionEyebrow';

type FaqItem = { q: string; a: string };

export default function FaqSection() {
  const { t } = useTranslation('kontakt');
  const faq = t('faq', { returnObjects: true }) as FaqItem[];
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section className="faq">
      <div className="faq__inner">
        <div className="faq__intro reveal">
          <SectionEyebrow>{t('faqSection.eyebrow')}</SectionEyebrow>
          <h2>
            <Trans i18nKey="kontakt:faqSection.title" components={{ em: <em />, br: <br /> }} />
          </h2>
          <p>{t('faqSection.intro')}</p>
        </div>
        <ul className="faq__list">
          {faq.map((item, i) => (
            <li key={item.q} className={`faq__item${openFaq === i ? ' is-open' : ''}`}>
              <button
                className="faq__q"
                type="button"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                {item.q}
                <span className="toggle">+</span>
              </button>
              <div className="faq__a">
                <div className="faq__a-inner">{item.a}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
