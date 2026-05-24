import EndCtaLocal from '../components/common/EndCtaLocal';
import PageIntro from '../components/common/PageIntro';
import PackageCompare from '../components/komplett-pakete/PackageCompare';
import PackageDetailSection from '../components/komplett-pakete/PackageDetailSection';
import { PACKAGES } from '../data/komplettPakete';
import { usePageTitle } from '../hooks/usePageTitle';
import '../styles/pages/komplett-pakete.css';

export default function KomplettPakete() {
  usePageTitle('Komplett-Pakete für Sanierung & Bau');
  return (
    <>
      <PageIntro
        backgroundImage="/assets/img/photo-haus-exterior.webp"
        crumbNumber="02"
        crumbLabel="Komplett-Pakete"
        title={<>Drei Wege<br />zum fertigen<br /><em>Raum.</em></>}
        lede="Verwandeln Sie Ihr Zuhause in Ihren Traumort: sorgenfreie Komplett­sanierung für Haus, Wohnung und Gastronomie — Bauleitung und alle Materialien inklusive."
        meta={[
          { label: 'Festpreisgarantie', value: 'Schriftlich, vor Beginn' },
          { label: 'Bauzeit', value: '6–32 Wochen' },
          { label: 'Bauleitung', value: 'Eigene Inhouse-Teams' },
          { label: 'Versicherung', value: '5 Jahre Werksgewähr' },
        ]}
      />

      {PACKAGES.map((pkg) => (
        <PackageDetailSection key={pkg.num} pkg={pkg} />
      ))}

      <PackageCompare />

      <section className="pkg-quote">
        <div className="reveal">
          <blockquote>
            Sie zahlen <em>einen</em> Preis, sehen <em>ein</em> Datum, sprechen mit <em>einer</em> Person — und das vom ersten Telefonat bis zur Schlüsselübergabe.
          </blockquote>
          <div className="attr">
            <span className="name">Daniel &amp; Monica</span> &nbsp;·&nbsp; Gründer, Prima Vista Bauprojekte
          </div>
        </div>
      </section>

      <EndCtaLocal
        eyebrow="Erste Beratung kostenlos"
        title={<>Welches <em>Paket</em><br />passt zu Ihnen?</>}
        ctaLabel="Termin vereinbaren"
        style={{ background: 'var(--pv-cream-paper)' }}
      />
    </>
  );
}
