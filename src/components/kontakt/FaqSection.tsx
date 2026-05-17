import { useState } from 'react';
import SectionEyebrow from '../common/SectionEyebrow';
import { FAQ } from '../../data/kontakt';

export default function FaqSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section className="faq">
      <div className="faq__inner">
        <div className="faq__intro reveal">
          <SectionEyebrow>Häufige Fragen</SectionEyebrow>
          <h2>
            Was<br />
            Auftraggeber<br />
            am häufigsten<br />
            <em>fragen.</em>
          </h2>
          <p>Antworten zu Festpreis, Bauzeit, Material und Garantie. Weitere Fragen klären wir gern persönlich.</p>
        </div>
        <ul className="faq__list">
          {FAQ.map((item, i) => (
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
