import BlitzForm from '../components/blitz-angebot/BlitzForm';
import BlitzIntro from '../components/blitz-angebot/BlitzIntro';
import { usePageTitle } from '../hooks/usePageTitle';
import '../styles/pages/kontakt.css';

export default function BlitzAngebot() {
  usePageTitle('Blitz-Angebot in 24 Stunden');
  return (
    <section
      className="kontakt kontakt--blitz"
      style={{
        ['--kontakt-bg' as string]: 'url(/assets/img/photo-altbausanierung.webp)',
        ['--kontakt-bg-position' as string]: 'center top',
      }}
    >
      <div className="kontakt__inner">
        <BlitzIntro />
        <BlitzForm />
      </div>
    </section>
  );
}
