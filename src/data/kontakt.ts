export type ContactFormState = {
  vorname: string;
  nachname: string;
  email: string;
  tel: string;
  art: 'haus' | 'wohnung' | 'gastro' | 'buero' | 'einzel' | 'andere';
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
  region: 'Deutschland',
  budget: 'Bitte wählen',
  msg: '',
  dsgvo: false,
};

export const CONTACT_ART_OPTIONS: Array<{ value: ContactFormState['art']; label: string }> = [
  { value: 'haus', label: 'Haus-Sanierung' },
  { value: 'wohnung', label: 'Wohnung' },
  { value: 'gastro', label: 'Gastronomie' },
  { value: 'buero', label: 'Büro' },
  { value: 'einzel', label: 'Einzelgewerk' },
  { value: 'andere', label: 'Andere' },
];

export function inferContactArt(label: string): ContactFormState['art'] {
  const normalized = label.toLocaleLowerCase('de-DE');

  if (normalized.includes('wohnung')) return 'wohnung';
  if (normalized.includes('gastro') || normalized.includes('gastronomie')) return 'gastro';
  if (normalized.includes('büro') || normalized.includes('buero') || normalized.includes('office')) return 'buero';
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
