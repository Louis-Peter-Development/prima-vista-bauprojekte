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
