export type BueroType = 'refresh' | 'klassisch' | 'open-space' | 'praxis';

export type BueroTypeOption = {
  value: BueroType;
  label: string;
  detail: string;
  factor: number;
};

export type AreaOption = {
  value: number;
  label: string;
};

export type BueroGewerk = {
  key: string;
  num: string;
  label: string;
  lede: string;
  pricePerM2: number;
};

export const BUERO_TYPES: BueroTypeOption[] = [
  { value: 'refresh', label: 'Büro-Refresh', detail: 'Boden, Maler, Licht, kleinere Anpassungen', factor: 0.85 },
  { value: 'klassisch', label: 'Klassisches Büro', detail: 'Zellenbüros, Meetingräume und Teeküche', factor: 1.0 },
  { value: 'open-space', label: 'Open Space', detail: 'Akustik, Lichtzonen und flexible Arbeitsplätze', factor: 1.12 },
  { value: 'praxis', label: 'Praxis / Beratung', detail: 'Empfang, Sanitär, Diskretion und Brandschutz', factor: 1.22 },
];

export const AREA_OPTIONS: AreaOption[] = [
  { value: 50, label: '50 m²' },
  { value: 80, label: '80 m²' },
  { value: 150, label: '150 m²' },
  { value: 300, label: '300 m²' },
];

export const BUERO_GEWERKE: BueroGewerk[] = [
  { key: 'abbruch', num: '01', label: 'Rückbau & Entkernung', lede: 'Altbestand, Boden, Decken öffnen', pricePerM2: 55 },
  { key: 'trockenbau', num: '02', label: 'Trockenbau & Räume', lede: 'Trennwände, Vorsatzschalen, Decken', pricePerM2: 110 },
  { key: 'akustik', num: '03', label: 'Akustik', lede: 'Akustikdecken, Absorber, Telefonboxen', pricePerM2: 95 },
  { key: 'elektro', num: '04', label: 'Elektroinstallation', lede: 'Steckdosen, Unterverteilung, Sicherheit', pricePerM2: 135 },
  { key: 'netzwerk', num: '05', label: 'Netzwerk & Daten', lede: 'LAN, WLAN, Server-/Patchfeld', pricePerM2: 70 },
  { key: 'licht', num: '06', label: 'Lichtkonzept', lede: 'Arbeitsplatzlicht, Schienen, Steuerung', pricePerM2: 95 },
  { key: 'boeden', num: '07', label: 'Bodenbeläge', lede: 'Vinyl, Teppichfliese, Parkett, Sockel', pricePerM2: 120 },
  { key: 'maler', num: '08', label: 'Malerarbeiten', lede: 'Spachteln, Anstrich, Lackdetails', pricePerM2: 65 },
  { key: 'sanitaer', num: '09', label: 'Sanitär & WCs', lede: 'Mitarbeiter-WC, Gäste-WC, Anschlüsse', pricePerM2: 110 },
  { key: 'teekueche', num: '10', label: 'Teeküche', lede: 'Anschlüsse, Einbau, Arbeitsflächen', pricePerM2: 160 },
  { key: 'brandschutz', num: '11', label: 'Brandschutz', lede: 'Fluchtwege, Türen, Beschilderung', pricePerM2: 75 },
  { key: 'moebel', num: '12', label: 'Einbauten & Möbel', lede: 'Empfang, Stauraum, Besprechung', pricePerM2: 220 },
  { key: 'klima', num: '13', label: 'Klima & Lüftung', lede: 'Splitgeräte, Luftführung, Nachrüstung', pricePerM2: 130 },
];

export function formatTsd(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2).replace('.', ',')} Mio.`;
  return `${Math.round(n / 1000).toLocaleString('de-DE')} Tsd.`;
}
