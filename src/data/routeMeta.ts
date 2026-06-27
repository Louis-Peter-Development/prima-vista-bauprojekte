import type { Locale } from '../i18n/routes';

export type RouteMeta = {
  title: string;
  description: string;
};

export const SITE_NAME = 'Prima Vista Bauprojekte';
export const SITE_ORIGIN = 'https://www.primavista-bauprojekte.com';

export const DEFAULT_ROUTE_META: RouteMeta = {
  title: 'Premium Sanierung & Bau in Frankfurt und Emmenbrücke',
  description:
    'Prima Vista Bauprojekte plant und realisiert Sanierung, Renovierung und Ausbau aus einer Hand in Frankfurt, Emmenbrücke und Umgebung.',
};

export const ROUTE_META: Record<string, RouteMeta> = {
  '/': DEFAULT_ROUTE_META,
  '/gewerke': {
    title: 'Gewerke - alle Leistungen im Überblick',
    description: 'Alle Gewerke für Sanierung, Ausbau und Renovierung: Bad, Küche, Böden, Elektro, Rohbau, Fassade, Dach und mehr.',
  },
  '/badsanierung': {
    title: 'Badsanierung & Gäste-WC',
    description: 'Badsanierung und Gäste-WC aus einer Hand, inklusive Planung, Ausbau, Installation, Fliesen und Ausstattung.',
  },
  '/kuechen-moebelbau': {
    title: 'Küchen & Möbelbau Kostenrechner',
    description: 'Küchenplanung, Einbauküchen, Arbeitsplatten, Möbelbau und Ausbau mit transparentem Kostenrahmen kalkulieren.',
  },
  '/boeden-belaege': {
    title: 'Böden & Beläge Kostenrechner',
    description: 'Parkett, Vinyl, Fliesen, Teppich, Sockelleisten und Bodenaufbereitung für Wohn- und Gewerbeflächen kalkulieren.',
  },
  '/elektroinstallation': {
    title: 'Elektroinstallation Kostenrechner',
    description: 'Elektroinstallation, Sicherungskasten, Netzwerk, Lichttechnik und Smart-Home-Leistungen kalkulieren.',
  },
  '/trockenbau': {
    title: 'Trockenbau Kostenrechner',
    description: 'Trockenbauwände, Decken, Vorsatzwände, Dachschrägen und Spachtelarbeiten mit Richtpreisen kalkulieren.',
  },
  '/maler-lackierer': {
    title: 'Maler & Lackierer Kostenrechner',
    description: 'Malerarbeiten, Spachtelung, Tapeten, Fassadenanstrich und Lackierungen für Sanierungsprojekte kalkulieren.',
  },
  '/fassadensanierung': {
    title: 'Fassadensanierung Kostenrechner',
    description: 'Fassadendämmung, Anstrich, Holzverkleidung, Klinker, Naturstein und Vorhangfassaden kalkulieren.',
  },
  '/abdichtung-keller': {
    title: 'Abdichtung & Keller',
    description: 'Kellerabdichtung, Perimeterabdichtung, Horizontalsperre und Feuchteschutz für Bestandsgebäude kalkulieren.',
  },
  '/dachsanierung': {
    title: 'Dachsanierung Kostenrechner',
    description: 'Dacheindeckung, Dämmung, Dachstuhl, Gauben, Dachfenster und Innenausbau transparent kalkulieren.',
  },
  '/treppen-gelaender': {
    title: 'Treppen & Geländer Kostenrechner',
    description: 'Treppen, Geländer, Durchbrüche, Außentreppen und Treppenaufbereitung für Sanierung und Neubau kalkulieren.',
  },
  '/garten-aussenanlagen': {
    title: 'Garten & Außenanlagen Kostenrechner',
    description: 'Terrassen, Carports, Gartenhäuser, Mauern, Beleuchtung, Zaunanlagen und Außenanlagen kalkulieren.',
  },
  '/barrierefreiheit': {
    title: 'Barrierefreies Bad Kostenrechner',
    description: 'Barrierefreie Bäder, bodengleiche Duschen, seniorengerechte Ausstattung und rollstuhlgerechte Lösungen kalkulieren.',
  },
  '/fenstertechnik': {
    title: 'Fenstertechnik Kostenrechner',
    description: 'Fenster, Balkontüren, Dachfenster, Rollläden, Markisen und Garagentore mit Montage kalkulieren.',
  },
  '/rohbau-abbruch': {
    title: 'Rohbau & Abbruch Kostenrechner',
    description: 'Abbruch, Rohbau, Estrich, Stahlträger, Verputz, Mauerwerk und Entsorgung transparent kalkulieren.',
  },
  '/tueren-zargen': {
    title: 'Türen & Zargen Kostenrechner',
    description: 'Innentüren, Zargen, Beschläge, Haustüren, Brandschutztüren und Montageleistungen kalkulieren.',
  },
  '/sanitaerinstallation': {
    title: 'Wasserinstallation Kostenrechner',
    description: 'Sanitärinstallation, Trinkwasser, Abwasser, Hauptstränge und Anschlussarbeiten für Sanierung kalkulieren.',
  },
  '/zaeune': {
    title: 'Zäune Kostenrechner',
    description: 'Zaunanlagen, Tore, Sichtschutz und Montage für Außenbereiche kalkulieren.',
  },
  '/komplett-pakete': {
    title: 'Komplett-Pakete für Sanierung & Bau',
    description: 'Komplettpakete für Haus, Wohnung, Gastronomie und Büro mit koordinierten Gewerken und transparentem Kostenrahmen.',
  },
  '/projekte': {
    title: 'Projekte & Referenzen',
    description: 'Referenzen und Projektbeispiele von Prima Vista Bauprojekte für Wohnsitze, Gastronomie, Hotels und Gewerbe.',
  },
  '/blog': {
    title: 'Magazin',
    description: 'Ratgeber, Einblicke und Projektwissen rund um Sanierung, Ausbau, Renovierung und Bauleitung.',
  },
  '/kontakt': {
    title: 'Kontakt - Anfrage stellen',
    description: 'Kontakt zu Prima Vista Bauprojekte für Sanierung, Renovierung, Ausbau und Bauprojekte in Deutschland und der Schweiz.',
  },
  '/blitz-angebot': {
    title: 'Blitz-Angebot in 24 Stunden',
    description: 'Schnelle Projektanfrage für Sanierung und Ausbau mit Rückmeldung innerhalb von 24 Stunden an Werktagen.',
  },
  '/kalkulator': {
    title: 'Kostenkalkulator für Sanierung & Bau',
    description: 'Interaktiver Kostenkalkulator für Haus, Wohnung, Gewerke und Heizmethoden mit transparenten Richtpreisen.',
  },
  '/haus-sanierung': {
    title: 'Haus-Sanierung kalkulieren',
    description: 'Haus-Sanierung mit Gewerken, Materialien und Richtpreisen Schritt für Schritt kalkulieren.',
  },
  '/wohnung-sanierung': {
    title: 'Wohnung-Sanierung kalkulieren',
    description: 'Wohnungssanierung für Studio, Zwei-Zimmer, Drei-Zimmer und Maisonette mit Kostenrahmen kalkulieren.',
  },
  '/gastronomie-ausbau': {
    title: 'Gastronomie-Ausbau kalkulieren',
    description: 'Ausbau für Restaurants, Bars, Cafés und Gastronomieflächen mit Gewerken und Richtpreisen kalkulieren.',
  },
  '/buero-ausbau': {
    title: 'Büro-Ausbau kalkulieren',
    description: 'Büroflächen, Praxen und Arbeitswelten mit Ausbaugrad, Fläche, Gewerken und Richtpreisen kalkulieren.',
  },
  '/heizmethoden': {
    title: 'Moderne Heizmethoden - Wärmepumpe, Gas, Pellet & mehr',
    description: 'Heizmethoden wie Wärmepumpe, Gasheizung, Pellet, Fußbodenheizung, Heizkörper und Warmwasser vergleichen.',
  },
  '/impressum': {
    title: 'Impressum',
    description: 'Impressum und Anbieterkennzeichnung der Prima Vista Bauprojekte Webseite.',
  },
  '/datenschutz': {
    title: 'Datenschutzerklärung',
    description: 'Datenschutzerklärung mit Informationen zur Verarbeitung personenbezogener Daten auf dieser Webseite.',
  },
};

// Localized route-meta overrides. Routes not yet listed here fall back to the
// German meta above, so SEO never regresses while translation rolls out.
const ROUTE_META_I18N: Record<Exclude<Locale, 'de'>, Record<string, RouteMeta>> = {
  en: {
    '/': {
      title: 'Premium renovation & construction in Frankfurt and Emmenbrücke',
      description:
        'Prima Vista Bauprojekte plans and delivers renovation, refurbishment and fit-out from a single source in Frankfurt, Emmenbrücke and the surrounding area.',
    },
    '/impressum': {
      title: 'Legal notice',
      description: 'Legal notice and provider identification for the Prima Vista Bauprojekte website.',
    },
    '/datenschutz': {
      title: 'Privacy policy',
      description: 'Privacy policy with information on the processing of personal data on this website.',
    },
    '/kontakt': {
      title: 'Contact – make an enquiry',
      description: 'Contact Prima Vista Bauprojekte for renovation, refurbishment, fit-out and building projects in Germany and Switzerland.',
    },
  },
  it: {
    '/': {
      title: 'Ristrutturazione e costruzione premium a Francoforte ed Emmenbrücke',
      description:
        'Prima Vista Bauprojekte progetta e realizza ristrutturazione, rinnovo e allestimento da un unico interlocutore a Francoforte, Emmenbrücke e dintorni.',
    },
    '/impressum': {
      title: 'Note legali',
      description: 'Note legali e identificazione del fornitore per il sito web di Prima Vista Bauprojekte.',
    },
    '/datenschutz': {
      title: 'Informativa sulla privacy',
      description: "Informativa sulla privacy con informazioni sul trattamento dei dati personali su questo sito web.",
    },
    '/kontakt': {
      title: 'Contatti – invia una richiesta',
      description: 'Contatti Prima Vista Bauprojekte per ristrutturazione, rinnovo, allestimento e progetti edilizi in Germania e Svizzera.',
    },
  },
};

const DYNAMIC_TITLES: Record<Locale, { blog: string; project: string }> = {
  de: { blog: 'Magazinbeitrag', project: 'Projekt' },
  en: { blog: 'Magazine article', project: 'Project' },
  it: { blog: 'Articolo del magazine', project: 'Progetto' },
};

/**
 * Resolve route metadata for a canonical (German) path in the given locale.
 * Falls back to the German meta when a localized override is not yet defined.
 */
export function getRouteMeta(pathname: string, locale: Locale = 'de'): RouteMeta {
  const localeMeta = locale === 'de' ? ROUTE_META : ROUTE_META_I18N[locale];

  if (localeMeta[pathname]) return localeMeta[pathname];
  if (locale !== 'de' && ROUTE_META[pathname]) return ROUTE_META[pathname];

  if (pathname.startsWith('/blog/')) {
    return {
      title: DYNAMIC_TITLES[locale].blog,
      description: (localeMeta['/blog'] ?? ROUTE_META['/blog']).description,
    };
  }
  if (pathname.startsWith('/projekte/')) {
    return {
      title: DYNAMIC_TITLES[locale].project,
      description: (localeMeta['/projekte'] ?? ROUTE_META['/projekte']).description,
    };
  }
  return localeMeta['/'] ?? DEFAULT_ROUTE_META;
}
