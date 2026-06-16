export type GewerkPhoto = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type GewerkPhotoSet = {
  label: string;
  images: GewerkPhoto[];
};

export const GEWERK_PHOTO_SETS = {
  abdichtung: {
    label: 'Abdichtungen',
    images: [
      { src: '/assets/img/leistungen/abdichtung-keller-01.webp', alt: 'Abdichtungsarbeiten im Nassbereich', width: 1501, height: 1048 },
    ],
  },
  badsanierung: {
    label: 'Badsanierung',
    images: [
      { src: '/assets/img/leistungen/badsanierung-02.webp', alt: 'Modernes Bad mit Dusche und Waschtisch', width: 1501, height: 1048 },
      { src: '/assets/img/leistungen/badsanierung-05.webp', alt: 'Ausgebautes Bad mit WC und Dusche', width: 1200, height: 1600 },
      { src: '/assets/img/leistungen/badsanierung-01.webp', alt: 'Dunkles Wellnessbad mit beleuchteten Spiegeln', width: 1086, height: 1448 },
    ],
  },
  barrierefreiheit: {
    label: 'Barrierefreiheit',
    images: [
      { src: '/assets/img/leistungen/badsanierung-06.webp', alt: 'Kompaktes barrierearmes Bad mit bodennaher Dusche', width: 1200, height: 1600 },
      { src: '/assets/img/leistungen/badsanierung-05.webp', alt: 'Badumbau mit freier Bewegungsfläche', width: 1200, height: 1600 },
    ],
  },
  boeden: {
    label: 'Böden & Beläge',
    images: [
      { src: '/assets/img/leistungen/boeden-belaege-01.webp', alt: 'Wohnbereich mit großformatigem Bodenbelag', width: 1484, height: 1060 },
      { src: '/assets/img/leistungen/boeden-belaege-11.webp', alt: 'Heller Holzfußboden mit sauberem Wandanschluss', width: 1484, height: 1060 },
      { src: '/assets/img/leistungen/boeden-belaege-10.webp', alt: 'Polierte Bodenfläche in offenem Wohnraum', width: 1484, height: 1060 },
    ],
  },
  dach: {
    label: 'Dachsanierung',
    images: [
      { src: '/assets/img/leistungen/dachsanierung-01.webp', alt: 'Dachsanierung mit Gerüst und neuen Dachflächenfenstern', width: 1536, height: 1024 },
    ],
  },
  elektro: {
    label: 'Elektroinstallation',
    images: [
      { src: '/assets/img/leistungen/elektroinstallation-01.webp', alt: 'Elektrodetails mit Schaltern, Steckdosen und Licht', width: 1536, height: 1024 },
      { src: '/assets/img/leistungen/elektroinstallation-03.webp', alt: 'Geöffneter Sicherungskasten mit sauberer Verdrahtung', width: 718, height: 1600 },
      { src: '/assets/img/leistungen/elektroinstallation-05.webp', alt: 'Innenraum mit Akzentbeleuchtung und Wandleuchten', width: 1535, height: 1024 },
    ],
  },
  fassade: {
    label: 'Fassaden & Dämmung',
    images: [
      { src: '/assets/img/leistungen/fassadensanierung-01.webp', alt: 'Sanierte helle Fassade mit Fenstern und Rollläden', width: 1200, height: 1600 },
      { src: '/assets/img/leistungen/fassadensanierung-02.webp', alt: 'Fassadenaufbau mit Dämmung und moderner Außenansicht', width: 1535, height: 1024 },
    ],
  },
  fenster: {
    label: 'Fenstertechnik',
    images: [
      { src: '/assets/img/leistungen/fenstertechnik-02.webp', alt: 'Eingebautes Fenster mit gedämmten Laibungen', width: 1600, height: 1200 },
      { src: '/assets/img/leistungen/fenstertechnik-01.webp', alt: 'Fensterarbeiten im Innenausbau mit Leiter', width: 1600, height: 1200 },
      { src: '/assets/img/leistungen/fenstertechnik-03.webp', alt: 'Fensterband im Trockenbau vor der Übergabe', width: 1600, height: 1200 },
    ],
  },
  garten: {
    label: 'Garten & Außenanlagen',
    images: [
      { src: '/assets/img/leistungen/garten-aussenanlagen-01.webp', alt: 'Terrasse mit Pergola und Steinplatten', width: 1200, height: 1600 },
      { src: '/assets/img/leistungen/garten-aussenanlagen-02.webp', alt: 'Gartenbeleuchtung mit bepflanzter Außenfläche', width: 1536, height: 1024 },
      { src: '/assets/img/leistungen/garten-aussenanlagen-05.webp', alt: 'Terrassenunterbau vor der fertigen Oberfläche', width: 1600, height: 1200 },
    ],
  },
  kueche: {
    label: 'Küchen & Möbelbau',
    images: [
      { src: '/assets/img/leistungen/kuechen-moebelbau-02.webp', alt: 'Küche mit Insel, Pendelleuchten und Einbauten', width: 1402, height: 1122 },
      { src: '/assets/img/leistungen/kuechen-moebelbau-03.webp', alt: 'Küchenzeile mit Spüle und großem Fenster', width: 1198, height: 1600 },
      { src: '/assets/img/leistungen/kuechen-moebelbau-04.webp', alt: 'Küchenmontage mit Arbeitsplatte und Wasseranschluss', width: 1200, height: 1600 },
    ],
  },
  maler: {
    label: 'Maler & Lackierer',
    images: [
      { src: '/assets/img/leistungen/maler-lackierer-03.webp', alt: 'Maler beim Streichen einer Innenwand', width: 737, height: 1600 },
      { src: '/assets/img/leistungen/maler-lackierer-06.webp', alt: 'Lackierarbeiten mit Sprühgerät', width: 1536, height: 1024 },
      { src: '/assets/img/leistungen/maler-lackierer-08.webp', alt: 'Akzentwand mit Malerwerkzeug im Raum', width: 1536, height: 1024 },
    ],
  },
  rohbau: {
    label: 'Rohbau Leistungen',
    images: [
      { src: '/assets/img/leistungen/rohbau-trockenbau-01.webp', alt: 'Rohbaufläche mit Betonwänden und vorbereiteten Leitungswegen', width: 1200, height: 900 },
      { src: '/assets/img/leistungen/rohbau-trockenbau-02.webp', alt: 'Rohbau mit Metallständerwand und vorbereiteten Installationen', width: 1200, height: 900 },
    ],
  },
  trockenbau: {
    label: 'Trockenbau',
    images: [
      { src: '/assets/img/leistungen/trockenbau-decke-01.webp', alt: 'Trockenbau-Unterkonstruktion an der Decke mit vorbereiteten Leitungen', width: 1200, height: 900 },
      { src: '/assets/img/leistungen/trockenbau-waende-01.webp', alt: 'Trockenbauwand mit Metallprofilen und Holzwerkstoffplatten im Aufbau', width: 1200, height: 900 },
      { src: '/assets/img/leistungen/trockenbau-decke-02.webp', alt: 'Abgehängte Deckenunterkonstruktion im Innenausbau', width: 1200, height: 900 },
    ],
  },
  treppen: {
    label: 'Treppen & Geländer',
    images: [
      { src: '/assets/img/leistungen/treppen-gelaender-01.webp', alt: 'Helle Innentreppe mit Geländer', width: 1102, height: 1600 },
      { src: '/assets/img/leistungen/treppen-gelaender-03.webp', alt: 'Außentreppe aus Metall an einem Gebäude', width: 1600, height: 1369 },
      { src: '/assets/img/leistungen/treppen-gelaender-15.webp', alt: 'Betontreppe mit sauberer Wandführung', width: 1600, height: 1203 },
    ],
  },
  tueren: {
    label: 'Türen & Zargen',
    images: [
      { src: '/assets/img/leistungen/tueren-zargen-01.webp', alt: 'Flur mit montierten Innentüren und Zargen', width: 1200, height: 1600 },
      { src: '/assets/img/leistungen/tueren-zargen-03.webp', alt: 'Moderne Haustür und Fensterfront', width: 1535, height: 1024 },
      { src: '/assets/img/leistungen/tueren-zargen-04.webp', alt: 'Balkon- und Glastürdetail an moderner Fassade', width: 1535, height: 1024 },
    ],
  },
  wasser: {
    label: 'Wasser & Sanitär',
    images: [
      { src: '/assets/img/leistungen/wasserinstallation-04.webp', alt: 'Sanitärinstallation mit Vorwandmodul', width: 900, height: 1600 },
      { src: '/assets/img/leistungen/wasserinstallation-03.webp', alt: 'Vorwandinstallation für WC und Wasseranschlüsse', width: 900, height: 1600 },
      { src: '/assets/img/leistungen/wasserinstallation-02.webp', alt: 'Wasserzähler und Rohrinstallation im Ausbau', width: 899, height: 1599 },
    ],
  },
  heizkoerper: {
    label: 'Heizkörper',
    images: [
      { src: '/assets/img/leistungen/heizkoerper-01.webp', alt: 'Moderner Heizkörper in einem sanierten Wohnraum', width: 700, height: 700 },
      { src: '/assets/img/leistungen/gas-heizung-01.webp', alt: 'Heizkörper im Wohnraum nach Heizungsmodernisierung', width: 1200, height: 1600 },
    ],
  },
  fussbodenheizung: {
    label: 'Fußbodenheizung',
    images: [
      { src: '/assets/img/leistungen/fussbodenheizung-01.webp', alt: 'Fußbodenheizung im vorbereiteten Bodenaufbau', width: 900, height: 1600 },
    ],
  },
  waermepumpe: {
    label: 'Wärmepumpe',
    images: [
      { src: '/assets/img/leistungen/waermepumpe-01.webp', alt: 'Außeneinheit einer Luft-Wärmepumpe am Gebäude', width: 1536, height: 1024 },
    ],
  },
  gasHeizung: {
    label: 'Gas-Heizung',
    images: [
      { src: '/assets/img/leistungen/gas-heizung-01.webp', alt: 'Heizkörper im Wohnraum nach Heizungsmodernisierung', width: 1200, height: 1600 },
    ],
  },
  saunaofen: {
    label: 'Saunaofen',
    images: [
      { src: '/assets/img/proj-spa-bath.webp', alt: 'Wellnessbereich als Umfeld für Saunaofen und Ofentechnik', width: 1500, height: 1125 },
    ],
  },
  zaeune: {
    label: 'Zäune & Tore',
    images: [
      { src: '/assets/img/leistungen/zaeune-tore-01.webp', alt: 'Moderner Metallzaun mit Einfahrtstor', width: 1536, height: 1024 },
      { src: '/assets/img/leistungen/zaeune-tore-02.webp', alt: 'Holzzaun mit Sichtschutz entlang eines Hauses', width: 1536, height: 1024 },
    ],
  },
} satisfies Record<string, GewerkPhotoSet>;

export type GewerkPhotoSetKey = keyof typeof GEWERK_PHOTO_SETS;
