import { lazy, type ComponentType, type LazyExoticComponent } from 'react';

export type KategorieKey = 'pakete' | 'gewerke' | 'heizung';

export type Leaf = {
  key: string;
  label: string;
  lead?: string;
  photo?: string;
  Component: LazyExoticComponent<ComponentType<{ embedded?: boolean }>>;
};

export type KategorieDef = {
  key: KategorieKey;
  num: string;
  label: string;
  description: string;
  leaves: Leaf[];
};

export const KATEGORIEN: KategorieDef[] = [
  {
    key: 'pakete',
    num: '01',
    label: 'Komplett-Pakete',
    description: 'Schlüsselfertige Sanierung — Haus oder Wohnung',
    leaves: [
      {
        key: 'haus',
        label: 'Haus-Sanierung',
        lead: 'Generalsanierung — Dach bis Garten',
        photo: '/assets/img/photo-haus-exterior.webp',
        Component: lazy(() => import('../components/kalkulator/embeds/HausSanierungEmbed')),
      },
      {
        key: 'wohnung',
        label: 'Wohnung-Sanierung',
        lead: 'Bäder, Küchen, Böden, Elektrik',
        photo: '/assets/img/photo-parkett-altbau.webp',
        Component: lazy(() => import('../components/kalkulator/embeds/WohnungSanierungEmbed')),
      },
      {
        key: 'gastronomie',
        label: 'Gastronomie-Ausbau',
        lead: 'Restaurant, Café, Bar oder Club',
        photo: '/assets/img/photo-parkett-altbau.webp',
        Component: lazy(() => import('../components/kalkulator/embeds/GastronomieAusbauEmbed')),
      },
    ],
  },
  {
    key: 'gewerke',
    num: '02',
    label: 'Gewerke',
    description: 'Einzelne Gewerke detailliert kalkulieren',
    leaves: [
      { key: 'bad', label: 'Bäder & Sanitär', lead: 'Wanne, Dusche, WC', Component: lazy(() => import('../components/gewerke/BadsanierungConfigurator')) },
      { key: 'kueche', label: 'Küchen & Möbelbau', lead: 'Schreinerei, Geräte', Component: lazy(() => import('../components/gewerke/KuechenConfigurator')) },
      { key: 'boden', label: 'Böden & Beläge', lead: 'Parkett, Stein, Vinyl', Component: lazy(() => import('../components/gewerke/BoedenConfigurator')) },
      { key: 'elektro', label: 'Elektroinstallation', lead: 'Strom, Licht, KNX', Component: lazy(() => import('../components/gewerke/ElektroConfigurator')) },
      { key: 'sanitaer', label: 'Sanitärinstallation', lead: 'Wasser, Abwasser', Component: lazy(() => import('../components/gewerke/WasserConfigurator')) },
      { key: 'trockenbau', label: 'Trockenbau', lead: 'Wände, Decken', Component: lazy(() => import('../components/gewerke/TrockenbauConfigurator')) },
      { key: 'maler', label: 'Maler & Lackierer', lead: 'Farben, Tapeten', Component: lazy(() => import('../components/gewerke/MalerConfigurator')) },
      { key: 'fassade', label: 'Fassadensanierung', lead: 'Putz, WDVS', Component: lazy(() => import('../components/gewerke/FassadeConfigurator')) },
      { key: 'dach', label: 'Dachsanierung', lead: 'Eindeckung, Dämmung', Component: lazy(() => import('../components/gewerke/DachConfigurator')) },
      { key: 'abdichtung', label: 'Abdichtung & Keller', lead: 'Feuchtigkeit', Component: lazy(() => import('../components/gewerke/AbdichtungKellerConfigurator')) },
      { key: 'treppen', label: 'Treppen & Geländer', lead: 'Holz, Beton, Stahl', Component: lazy(() => import('../components/gewerke/TreppenConfigurator')) },
      { key: 'garten', label: 'Garten & Außenanlagen', lead: 'Terrasse, Wege', Component: lazy(() => import('../components/gewerke/GartenConfigurator')) },
      { key: 'barrierefreiheit', label: 'Barrierefreiheit', lead: 'Bad, Türen, Zugang', Component: lazy(() => import('../components/gewerke/BarrierefreiesBadConfigurator')) },
      { key: 'fenster', label: 'Fenstertechnik', lead: 'Kunststoff, Holz, Alu', Component: lazy(() => import('../components/gewerke/FensterConfigurator')) },
      { key: 'rohbau', label: 'Rohbau & Abbruch', lead: 'Fundament, Mauerwerk', Component: lazy(() => import('../components/gewerke/RohbauConfigurator')) },
      { key: 'tueren', label: 'Türen & Zargen', lead: 'Innen, Haus, Schiebe', Component: lazy(() => import('../components/gewerke/TuerenConfigurator')) },
      { key: 'zaeune', label: 'Zäune & Tore', lead: 'Doppelstab, Holz, Sichtschutz', Component: lazy(() => import('../components/gewerke/ZaeuneConfigurator')) },
    ],
  },
  {
    key: 'heizung',
    num: '03',
    label: 'Heizmethoden',
    description: 'Heizsystem konfigurieren und kalkulieren',
    leaves: [
      { key: 'heizkoerper', label: 'Heizkörper', lead: 'Austausch & Lackierung', Component: lazy(() => import('../components/heizkoerper/HeizkoerperCalculator')) },
      { key: 'heizstraenge', label: 'Heizstränge', lead: 'Steig- & Verteilstränge', Component: lazy(() => import('../components/heizstraenge/HeizstraengeCalculator')) },
      { key: 'fussboden', label: 'Fußboden-Heizung', lead: 'Wassergeführt oder elektrisch', Component: lazy(() => import('../components/fussbodenheizung/FussbodenheizungCalculator')) },
      { key: 'waermepumpe', label: 'Luft-Wärmepumpe', lead: 'Förderfähige Wärmequelle', Component: lazy(() => import('../components/waermepumpe/WaermepumpeCalculator')) },
      { key: 'gas', label: 'Gas-Heizung', lead: 'Brennwert', Component: lazy(() => import('../components/gas-heizung/GasHeizungCalculator')) },
      { key: 'pellet', label: 'Pelletofen', lead: 'CO₂-neutrale Alternative', Component: lazy(() => import('../components/pelletofen/PelletofenCalculator')) },
      { key: 'sauna', label: 'Saunaofen', lead: 'Thermen & Öfen', Component: lazy(() => import('../components/saunaofen/SaunaofenCalculator')) },
    ],
  },
];
