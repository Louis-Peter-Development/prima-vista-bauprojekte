export type ContactFormState = {
  vorname: string;
  nachname: string;
  email: string;
  tel: string;
  art: 'haus' | 'wohnung' | 'gastro' | 'einzel' | 'andere';
  region: string;
  budget: string;
  msg: string;
  dsgvo: boolean;
};

export type ContactFormPreset = Partial<Pick<ContactFormState, 'art' | 'region' | 'budget' | 'msg'>> & {
  sourceLabel?: string;
};

export type ContactLocationState = {
  contact?: ContactFormPreset;
};

export const INITIAL_CONTACT_FORM: ContactFormState = {
  vorname: '',
  nachname: '',
  email: '',
  tel: '',
  art: 'haus',
  region: 'Frankfurt & Hessen',
  budget: 'Bitte wählen',
  msg: '',
  dsgvo: false,
};

export const CONTACT_ART_OPTIONS: Array<{ value: ContactFormState['art']; label: string }> = [
  { value: 'haus', label: 'Haus-Sanierung' },
  { value: 'wohnung', label: 'Wohnung' },
  { value: 'gastro', label: 'Gastronomie' },
  { value: 'einzel', label: 'Einzelgewerk' },
  { value: 'andere', label: 'Andere' },
];

function inferContactArt(label: string): ContactFormState['art'] {
  const normalized = label.toLocaleLowerCase('de-DE');

  if (normalized.includes('wohnung')) return 'wohnung';
  if (normalized.includes('gastro') || normalized.includes('gastronomie')) return 'gastro';
  if (normalized.includes('komplett') || normalized.includes('haus')) return 'haus';
  if (
    normalized.includes('anfragen')
    || normalized.includes('beratung')
    || normalized.includes('termin')
    || normalized.includes('wärmepumpe')
    || normalized.includes('heizung')
    || normalized.includes('bad')
    || normalized.includes('tür')
    || normalized.includes('tuer')
    || normalized.includes('fenster')
    || normalized.includes('boden')
    || normalized.includes('dach')
    || normalized.includes('fassade')
    || normalized.includes('elektro')
    || normalized.includes('sanitär')
    || normalized.includes('sanitaer')
    || normalized.includes('trockenbau')
    || normalized.includes('garten')
    || normalized.includes('treppen')
    || normalized.includes('zaun')
  ) {
    return 'einzel';
  }

  return 'andere';
}

export function createContactPresetFromCtaLabel(label: string): ContactFormPreset {
  const sourceLabel = label.trim();

  return {
    sourceLabel,
    art: inferContactArt(sourceLabel),
    msg: `Hallo Prima Vista Team,\n\nich interessiere mich für: ${sourceLabel}.\n\nBitte melden Sie sich bei mir zur ersten Abstimmung.`,
  };
}

export const FAQ = [
  {
    q: 'Wie kommt ein verbindlicher Festpreis zustande?',
    a: 'Nach dem Erstgespräch nehmen wir vor Ort auf, prüfen Statik und Substanz und erstellen ein detailliertes Leistungsverzeichnis. Innerhalb von 14 Tagen erhalten Sie einen schriftlichen Festpreis — gültig für 60 Tage, verbindlich nach Vertragsunterzeichnung.',
  },
  {
    q: 'Wie schnell können Sie mit den Arbeiten beginnen?',
    a: 'In der Regel 4–8 Wochen nach Vertragsabschluss. Bei Wohnungssanierungen oft schneller, bei Genehmigungs­pflichtigen Vorhaben (Statik, Dach, Fassade) entsprechend länger. Wir kommunizieren das Startdatum verbindlich.',
  },
  {
    q: 'Arbeiten Sie mit Subunternehmern?',
    a: 'Unsere Bauleitung, Elektrik, Sanitär, Trockenbau, Maler, Schreinerei sind inhouse. Fliesenleger, Dachdecker und Fassade sind langjährige, vertraglich gebundene Partnerbetriebe — keine Tagelöhner, keine Mehrfach-Übergaben.',
  },
  {
    q: 'Was ist im Festpreis enthalten?',
    a: 'Alle Materialien laut Auswahl, alle Gewerke, Bauleitung, Bauschuttentsorgung, Reinigung, Behördengänge sowie Versicherung. Nicht enthalten: Sonder­wünsche nach Vertragsabschluss (separat ausgewiesen) und Eigentumsabgaben.',
  },
  {
    q: 'Kann ich während der Sanierung in der Wohnung bleiben?',
    a: 'Bei Etagenwohnungen mit Teilsanierung (z. B. nur Bad oder Küche): ja, mit eingeschränkter Nutzung. Bei Vollsanierungen empfehlen wir den Auszug — wir helfen bei Übergangs-Möblierung und Logistik.',
  },
  {
    q: 'Welche Garantie geben Sie?',
    a: 'Fünf Jahre Werks­gewähr auf alle ausgeführten Arbeiten — das ist mehr als die gesetzliche Pflicht. Auf Material gilt die Herstellergarantie, die wir für Sie geltend machen.',
  },
];
