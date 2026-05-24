import FaqSection from '../components/kontakt/FaqSection';
import KontaktForm from '../components/kontakt/KontaktForm';
import KontaktIntro from '../components/kontakt/KontaktIntro';
import { usePageTitle } from '../hooks/usePageTitle';
import '../styles/pages/kontakt.css';

export default function Kontakt() {
  usePageTitle('Kontakt – Anfrage stellen');
  return (
    <>
      <section
        className="kontakt"
        style={{
          ['--kontakt-bg' as string]: 'url(/assets/img/photo-office-light.webp)',
          ['--kontakt-bg-position' as string]: 'center',
        }}
      >
        <div className="kontakt__inner">
          <KontaktIntro />
          <KontaktForm />
        </div>
      </section>

      <FaqSection />
    </>
  );
}
