export type BlitzFormState = {
  art: 'haus' | 'wohnung' | 'gastro' | 'anderes';
  gewerke: string[];
  groesse: string;
  starttermin: string;
  msg: string;
  name: string;
  email: string;
  tel: string;
};

export const INITIAL_BLITZ_FORM: BlitzFormState = {
  art: 'haus',
  gewerke: [],
  groesse: '',
  starttermin: '',
  msg: '',
  name: '',
  email: '',
  tel: '',
};

export const BLITZ_ART_OPTIONS: Array<{ value: BlitzFormState['art']; label: string }> = [
  { value: 'haus', label: 'Haus' },
  { value: 'wohnung', label: 'Wohnung' },
  { value: 'gastro', label: 'Gastronomie' },
  { value: 'anderes', label: 'Anderes' },
];

export const BLITZ_GEWERKE_OPTIONS = [
  'Komplettabriss / Rohbau',
  'Bad & Sanitär',
  'Küche',
  'Böden & Parkett',
  'Wände & Maler',
  'Elektrik',
  'Fassade / Dach',
  'Heizung / Energie',
];
