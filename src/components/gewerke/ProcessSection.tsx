import SectionEyebrow from '../common/SectionEyebrow';
import { PROCESS_STEPS } from '../../data/gewerke';

export default function ProcessSection() {
  return (
    <section className="process">
      <div className="process__inner">
        <div className="process__head">
          <div className="reveal">
            <SectionEyebrow onDark>So arbeiten wir</SectionEyebrow>
            <h2>Vom Anruf bis zur<br />schlüssel­fertigen <em>Übergabe.</em></h2>
          </div>
          <p className="reveal" data-delay="1">
            Vier Etappen — jede mit fester Ansprechperson, festem Termin und schriftlichem Festpreis. Keine Stundenabrechnung, keine Übergaben zwischen Subunternehmern.
          </p>
        </div>
        <div className="process__steps">
          {PROCESS_STEPS.map((step, i) => (
            <div key={step.num} className="process-step reveal" data-delay={i || undefined}>
              <span className="process-step__num">{step.num}</span>
              <span className="process-step__label">{step.label}</span>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
