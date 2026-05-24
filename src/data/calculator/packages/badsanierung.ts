import type { RenovationPackage, RenovationProduct } from '../types';

function createProduct(
  id: string,
  category: string,
  subcategory: string,
  title: string,
  sku: string,
  basePrice: number,
  unit: string,
  description: string,
  enabled = true,
  optional = false,
  baseQuantity = 1,
  type: 'service' | 'material' | 'extra' | 'optional' = 'service'
): RenovationProduct {
  return {
    id,
    category,
    subcategory,
    title,
    sku,
    type,
    unit,
    basePrice,
    enabled,
    optional,
    minQuantity: 1,
    quantityStep: 1,
    baseQuantity,
    scalable: unit.toLowerCase().includes('qm') || unit.toLowerCase().includes('lfm') || unit === 'm',
    quantity: baseQuantity,
    canDuplicate: false,
    canRemove: true,
    canReplace: false,
    description,
    alternatives: []
  };
}

export const packageBadGaeste: RenovationPackage = {
  id: 'badGaeste',
  title: 'Gäste-WC (Alle Varianten)',
  defaultArea: 6,
  defaultFloorCount: 1,
  categories: [
    {
      id: 'wasserinstallation-basis-haus',
      title: 'WASSERINSTALLATION | Basis-Haus',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'wasserinstallation-basis-haus-sub',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('wass-200-basis', 'wasserinstallation-basis-haus', 'wasserinstallation-basis-haus-sub', `WASSERINSTALLATION GÄSTE-WC | 🛠 Montage-Leistungspaket`, 'WASS-200-BASIS', 1195.9, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'service'),
            createProduct('wass-101-mon', 'wasserinstallation-basis-haus', 'wasserinstallation-basis-haus-sub', `VORSATZ-ELEMENT | 🛠 Montage`, 'WASS-101-MON', 279, 'Stk', `🛠 Montage`, true, false, 1, 'service')
          ]
        }
      ]
    },
    {
      id: 'material',
      title: 'Material',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'material-sub',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('cvis3wt112', 'material', 'material-sub', `VIS Waschtisch-Montageelement | CONEL VIS Waschtisch-Montage`, 'CVIS3WT112', 203.94, 'Stk', `CONEL VIS Waschtisch-Montage`, true, false, 1, 'service'),
            createProduct('dfix320wc112', 'material', 'material-sub', `Montageelement für Wand-WC, mit UP-Spülkasten Sigma 12 cm |`, 'DFIX320WC112', 390.06, 'Stk', ``, true, false, 1, 'service'),
            createProduct('sigma30wech', 'material', 'material-sub', `Abdeckplatte Sigma30 weiß/hgl.verchr. f.2-Mengen-Spülung, für UP-Spülkästen GE`, 'SIGMA30WECH', 101.5, 'Stk', `Abdeckplatte Sigma30 weiß/hgl.verchr. f.2-Mengen-Spülung, für UP-Spülkästen GE`, true, false, 1, 'material'),
            createProduct('uv835-10017', 'material', 'material-sub', `Ximax Badheizkörper BIANCA - weiß`, 'uv835-10017', 388.95, 'Stk', `Ximax Badheizkörper BIANCA - weiß`, true, false, 1, 'material'),
            createProduct('1168296', 'material', 'material-sub', `V&B 30x 60 1571TW010 Unit Two weiß matt`, '1168296', 30.22, 'qm', `V&B 30x 60 1571TW010 Unit Two weiß matt`, true, false, 12, 'material'),
            createProduct('1176157', 'material', 'material-sub', `V&B 30x 60 2341BP900 Daytona !B dark grey matt ugl. FS R10/B`, '1176157', 30.22, 'qm', `V&B 30x 60 2341BP900 Daytona !B dark grey matt ugl. FS R10/B`, true, false, 4, 'material'),
            createProduct('1054265', 'material', 'material-sub', `V&B 5x 10 2037BU9M8 Cadiz Mosaik ash grey ugl. FS R10/B rekt.`, '1054265', 298.67, 'qm', `V&B 5x 10 2037BU9M8 Cadiz Mosaik ash grey ugl. FS R10/B rekt.`, true, false, 1, 'material'),
            createProduct('uv867-00298', 'material', 'material-sub', `Ottoseal S 110 Premium Neutral Silicon`, 'uv867-00298', 8.79, 'Stk', `Ottoseal S 110 Premium Neutral Silicon`, true, false, 5, 'material'),
            createProduct('uv519-00256', 'material', 'material-sub', `PCI Nanofug Variabler Flexfugenmörtel`, 'uv519-00256', 58.65, 'Sack', `PCI Nanofug Variabler Flexfugenmörtel`, true, false, 1, 'material'),
            createProduct('uv519-00143', 'material', 'material-sub', `PCI Flexmörtel Verformungsfähiger Fliesenkleber`, 'uv519-00143', 53.75, 'Sack', `PCI Flexmörtel Verformungsfähiger Fliesenkleber`, true, false, 3, 'material'),
            createProduct('uv608-6903', 'material', 'material-sub', `Schlüter FINEC Dekorprofil Eckenset`, 'uv608-6903', 32.51, 'Stk', `Schlüter FINEC Dekorprofil Eckenset`, true, false, 2, 'material'),
            createProduct('dewwc', 'material', 'material-sub', `Wand-Tiefspül-WC derby sichtbare Befestigung weiss VIGOUR`, 'DEWWC', 191.57, 'Stk', `Wand-Tiefspül-WC derby sichtbare Befestigung weiss VIGOUR`, true, false, 1, 'material'),
            createProduct('desias', 'material', 'material-sub', `WC-Sitz derby Edelstahlscharnier abnehmbar mit Absenkautomatik weiss VIG.`, 'DESIAS', 115.34, 'Stk', `WC-Sitz derby Edelstahlscharnier abnehmbar mit Absenkautomatik weiss VIG.`, true, false, 1, 'material'),
            createProduct('desp45ohp', 'material', 'material-sub', `Handwaschb.derby style plus 45x35cm ohne HL mit ÜL weiss PflegePLUS VIGOUR`, 'DESP45OHP', 201.96, 'Stk', `Handwaschb.derby style plus 45x35cm ohne HL mit ÜL weiss PflegePLUS VIGOUR`, true, false, 1, 'material'),
            createProduct('des', 'material', 'material-sub', `Einhand-Waschtischbatterie derby style mit Ablaufgarnitur verchromt VIGOUR`, 'DES', 152.96, 'Stk', `Einhand-Waschtischbatterie derby style mit Ablaufgarnitur verchromt VIGOUR`, true, false, 1, 'material')
          ]
        }
      ]
    },
    {
      id: 'optionale-positionen',
      title: 'Optionale Positionen',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'optionale-positionen-sub',
          title: 'Leistungen & Materialien',
          type: 'optional',
          products: [
            createProduct('wass-100-au', 'optionale-positionen', 'optionale-positionen-sub', `WEITERES zu WASSERINSTALLATION - (Klick Grünes-Symbol)`, 'WASS-100-AU', 0, 'Stk', `WEITERES zu WASSERINSTALLATION - (Klick Grünes-Symbol)`, true, true, 1, 'optional'),
            createProduct('uv816-00746', 'optionale-positionen', 'optionale-positionen-sub', `Gutjahr IndorTec THERM-E Komplettset TD 3-in-1 Elektro-Flächenheizung`, 'uv816-00746', 395.95, 'Stk', `Gutjahr IndorTec THERM-E Komplettset TD 3-in-1 Elektro-Flächenheizung`, true, true, 1, 'optional'),
            createProduct('strahyr', 'optionale-positionen', 'optionale-positionen-sub', `AP-Hygienebeutelspender Stratos m.runder Öffnung Edelstahl matt Franke`, 'STRAHYR', 112.86, 'Stk', `AP-Hygienebeutelspender Stratos m.runder Öffnung Edelstahl matt Franke`, true, true, 1, 'optional'),
            createProduct('santralabh18', 'optionale-positionen', 'optionale-positionen-sub', `Abfallbox SanTral 18 Liter m.Beutelhalt. Edelstahl Ophardt`, 'SANTRALABH18', 312.84, 'Stk', `Abfallbox SanTral 18 Liter m.Beutelhalt. Edelstahl Ophardt`, true, true, 1, 'optional'),
            createProduct('codessp50', 'optionale-positionen', 'optionale-positionen-sub', `Spender berührungsfrei weiss für Desinfektionsmittel 0,5 l Conti`, 'CODESSP50', 146.52, 'Stk', `Spender berührungsfrei weiss für Desinfektionsmittel 0,5 l Conti`, true, true, 1, 'optional'),
            createProduct('cwsssppas', 'optionale-positionen', 'optionale-positionen-sub', `Seifensch.-Spend.CWS ParadiseAntib.Slim m.Panel weiss f.500ml Flaschen m.Schloss`, 'CWSSSPPAS', 165.83, 'Stk', `Seifensch.-Spend.CWS ParadiseAntib.Slim m.Panel weiss f.500ml Flaschen m.Schloss`, true, true, 1, 'optional'),
            createProduct('hewiksiw448', 'optionale-positionen', 'optionale-positionen-sub', `Klappsitz Hewi 448x428mm reinweiss m.Wandplatten o.Befestigung`, 'HEWIKSIW448', 676.17, 'Stk', `Klappsitz Hewi 448x428mm reinweiss m.Wandplatten o.Befestigung`, true, true, 1, 'optional'),
            createProduct('hewiwig600', 'optionale-positionen', 'optionale-positionen-sub', `Winkelgriff Hewi 600x300mm reinweiss`, 'HEWIWIG600', 255.42, 'Stk', `Winkelgriff Hewi 600x300mm reinweiss`, true, true, 1, 'optional')
          ]
        }
      ]
    },
    {
      id: 'heizkoerper-basis-haus',
      title: 'HEIZKÖRPER | Basis-Haus',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'heizkoerper-basis-haus-sub',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('heiz-101-mon', 'heizkoerper-basis-haus', 'heizkoerper-basis-haus-sub', `HEIZKÖRPER | 🛠 Montage`, 'HEIZ-101-MON', 149, 'Stk', `🛠 Montage`, true, false, 1, 'service')
          ]
        }
      ]
    },
    {
      id: 'extra-positionen',
      title: 'Extra Positionen',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'extra-positionen-sub',
          title: 'Leistungen & Materialien',
          type: 'extra',
          products: [
            createProduct('heiz-301-mat', 'extra-positionen', 'extra-positionen-sub', `HEIZSTRÄNGE bis max. 5 m | 🛠 Montage-Leistungspaket`, 'HEIZ-301-MAT', 434.56, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'extra'),
            createProduct('vede218b', 'extra-positionen', 'extra-positionen-sub', `Durchlauferhitzer Vaillant VED E 21/8 B 21KW elektronisch gesteuert weiss`, 'VEDE218B', 373.23, 'Stk', `Durchlauferhitzer Vaillant VED E 21/8 B 21KW elektronisch gesteuert weiss`, true, false, 1, 'extra'),
            createProduct('heiz-201-1-op', 'extra-positionen', 'extra-positionen-sub', `HEIZKÖRPER |🛠 Demontage & Entsorgung`, 'HEIZ-201-1-OP', 67.13, 'Stk', `🛠 Demontage & Entsorgung`, true, false, 1, 'extra')
          ]
        }
      ]
    },
    {
      id: 'fliesen-gaeste-wc',
      title: 'FLIESEN GÄSTE WC',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'fliesen-gaeste-wc-sub',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('gawc-100-basis', 'fliesen-gaeste-wc', 'fliesen-gaeste-wc-sub', `FLIESEN - GÄSTE WC | 🛠 Montage-Leistungspaket`, 'GAWC-100-BASIS', 2470.9, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'service')
          ]
        }
      ]
    },
    {
      id: 'sanitaer-gaeste-wc',
      title: 'SANITÄR GÄSTE WC',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'sanitaer-gaeste-wc-sub',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('gawc-500-basis', 'sanitaer-gaeste-wc', 'sanitaer-gaeste-wc-sub', `SANITÄR - GÄSTE WC | 🛠 Montage-Leistungspaket`, 'GAWC-500-BASIS', 1183.9, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'service')
          ]
        }
      ]
    }
  ]
};

export const packageBadKomplett: RenovationPackage = {
  id: 'badKomplett',
  title: 'Komplettbad Wanne & Dusche',
  defaultArea: 8,
  defaultFloorCount: 1,
  categories: [
    {
      id: 'wasserinstallation-basis-haus',
      title: 'WASSERINSTALLATION | Basis-Haus',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'wasserinstallation-basis-haus-sub',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('wass-100-basis', 'wasserinstallation-basis-haus', 'wasserinstallation-basis-haus-sub', `WASSERINSTALLATION BADEZIMMER | 🛠 Montage-Leistungspaket`, 'WASS-100-BASIS', 1995.9, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'service'),
            createProduct('wass-105-zu', 'wasserinstallation-basis-haus', 'wasserinstallation-basis-haus-sub', `WASCHMASCHINEN ANSCHLUSS | 🛠 Zusatz-Montage`, 'WASS-105-ZU', 355.36, 'Stk', `🛠 Zusatz-Montage`, true, false, 1, 'extra'),
            createProduct('wass-101-mon', 'wasserinstallation-basis-haus', 'wasserinstallation-basis-haus-sub', `VORSATZ-ELEMENT | 🛠 Montage`, 'WASS-101-MON', 279, 'Stk', `🛠 Montage`, true, false, 2, 'service')
          ]
        }
      ]
    },
    {
      id: 'material',
      title: 'Material',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'material-sub',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('cvis3wt112', 'material', 'material-sub', `VIS Waschtisch-Montageelement | CONEL VIS Waschtisch-Montage`, 'CVIS3WT112', 203.94, 'Stk', `CONEL VIS Waschtisch-Montage`, true, false, 1, 'service'),
            createProduct('dfix320wc112', 'material', 'material-sub', `Montageelement für Wand-WC, mit UP-Spülkasten Sigma 12 cm |`, 'DFIX320WC112', 390.06, 'Stk', ``, true, false, 1, 'service'),
            createProduct('sigma30wech', 'material', 'material-sub', `Abdeckplatte Sigma30 weiß/hgl.verchr. f.2-Mengen-Spülung, für UP-Spülkästen GE`, 'SIGMA30WECH', 101.5, 'Stk', `Abdeckplatte Sigma30 weiß/hgl.verchr. f.2-Mengen-Spülung, für UP-Spülkästen GE`, true, false, 1, 'material'),
            createProduct('uv835-10017', 'material', 'material-sub', `Ximax Badheizkörper BIANCA - weiß`, 'uv835-10017', 388.95, 'Stk', `Ximax Badheizkörper BIANCA - weiß`, true, false, 1, 'material'),
            createProduct('vede218b', 'material', 'material-sub', `Durchlauferhitzer Vaillant VED E 21/8 B 21KW elektronisch gesteuert weiss`, 'VEDE218B', 373.23, 'Stk', `Durchlauferhitzer Vaillant VED E 21/8 B 21KW elektronisch gesteuert weiss`, true, false, 1, 'material'),
            createProduct('uv816-00746', 'material', 'material-sub', `Gutjahr IndorTec THERM-E Komplettset TD 3-in-1 Elektro-Flächenheizung`, 'uv816-00746', 395.95, 'Stk', `Gutjahr IndorTec THERM-E Komplettset TD 3-in-1 Elektro-Flächenheizung`, true, false, 1, 'material'),
            createProduct('1168296', 'material', 'material-sub', `V&B 30x 60 1571TW010 Unit Two weiß matt`, '1168296', 30.22, 'qm', `V&B 30x 60 1571TW010 Unit Two weiß matt`, true, false, 18, 'material'),
            createProduct('1176157', 'material', 'material-sub', `V&B 30x 60 2341BP900 Daytona !B dark grey matt ugl. FS R10/B`, '1176157', 30.22, 'qm', `V&B 30x 60 2341BP900 Daytona !B dark grey matt ugl. FS R10/B`, true, false, 6, 'material'),
            createProduct('1054265', 'material', 'material-sub', `V&B 5x 10 2037BU9M8 Cadiz Mosaik ash grey ugl. FS R10/B rekt.`, '1054265', 298.67, 'qm', `V&B 5x 10 2037BU9M8 Cadiz Mosaik ash grey ugl. FS R10/B rekt.`, true, false, 3, 'material'),
            createProduct('uv867-00298', 'material', 'material-sub', `Ottoseal S 110 Premium Neutral Silicon`, 'uv867-00298', 8.79, 'Stk', `Ottoseal S 110 Premium Neutral Silicon`, true, false, 10, 'material'),
            createProduct('uv519-00256', 'material', 'material-sub', `PCI Nanofug Variabler Flexfugenmörtel`, 'uv519-00256', 58.65, 'Sack', `PCI Nanofug Variabler Flexfugenmörtel`, true, false, 2, 'material'),
            createProduct('uv519-00143', 'material', 'material-sub', `PCI Flexmörtel Verformungsfähiger Fliesenkleber`, 'uv519-00143', 53.75, 'Sack', `PCI Flexmörtel Verformungsfähiger Fliesenkleber`, true, false, 6, 'material'),
            createProduct('uv608-6903', 'material', 'material-sub', `Schlüter FINEC Dekorprofil Eckenset`, 'uv608-6903', 32.51, 'Stk', `Schlüter FINEC Dekorprofil Eckenset`, true, false, 2, 'material'),
            createProduct('dewwc', 'material', 'material-sub', `Wand-Tiefspül-WC derby sichtbare Befestigung weiss VIGOUR`, 'DEWWC', 191.57, 'Stk', `Wand-Tiefspül-WC derby sichtbare Befestigung weiss VIGOUR`, true, false, 1, 'material'),
            createProduct('desias', 'material', 'material-sub', `WC-Sitz derby Edelstahlscharnier abnehmbar mit Absenkautomatik weiss VIG.`, 'DESIAS', 115.34, 'Stk', `WC-Sitz derby Edelstahlscharnier abnehmbar mit Absenkautomatik weiss VIG.`, true, false, 1, 'material'),
            createProduct('des60p', 'material', 'material-sub', `Waschtisch derby style 60x48cm weiss PflegePLUS VIGOUR`, 'DES60P', 191.57, 'Stk', `Waschtisch derby style 60x48cm weiss PflegePLUS VIGOUR`, true, false, 1, 'material'),
            createProduct('des', 'material', 'material-sub', `Einhand-Waschtischbatterie derby style mit Ablaufgarnitur verchromt VIGOUR`, 'DES', 152.96, 'Stk', `Einhand-Waschtischbatterie derby style mit Ablaufgarnitur verchromt VIGOUR`, true, false, 1, 'material'),
            createProduct('desm180p', 'material', 'material-sub', `Badewanne Stahl derby 180x80cm weiss Ab-/Überlauf mittig Pflegeplus VIGOUR`, 'DESM180P', 1039.5, 'Stk', `Badewanne Stahl derby 180x80cm weiss Ab-/Überlauf mittig Pflegeplus VIGOUR`, true, false, 1, 'material'),
            createProduct('depghw', 'material', 'material-sub', `Einhand-AP-Badebatterie derby plus mit Hebel geschl. o. Brausegarn. verchr. VIG`, 'DEPGHW', 233.64, 'Stk', `Einhand-AP-Badebatterie derby plus mit Hebel geschl. o. Brausegarn. verchr. VIG`, true, false, 1, 'material'),
            createProduct('cls90ef', 'material', 'material-sub', `Duschwanne Stahl clivia 90x90x3.2cm weiss VIGOUR`, 'CLS90EF', 297.99, 'Stk', `Duschwanne Stahl clivia 90x90x3.2cm weiss VIGOUR`, true, false, 1, 'material'),
            createProduct('euphdsee260', 'material', 'material-sub', `Duschsystem Euphoria 260 mit Einhandmischer 9,5l/min chrom Grohe`, 'EUPHDSEE260', 608.85, 'Stk', `Duschsystem Euphoria 260 mit Einhandmischer 9,5l/min chrom Grohe`, true, false, 1, 'material'),
            createProduct('v2ge90l', 'material', 'material-sub', `Gleittür Eckhälfte 2.0 links 900x1950mm silber matt ESG klar VIGOUR`, 'V2GE90L', 569.25, 'Stk', `Gleittür Eckhälfte 2.0 links 900x1950mm silber matt ESG klar VIGOUR`, true, false, 1, 'material'),
            createProduct('v2ge90r', 'material', 'material-sub', `Gleittür Eckhälfte 2.0 rechts 900x1950mm silber matt ESG klar VIGOUR`, 'V2GE90R', 569.25, 'Stk', `Gleittür Eckhälfte 2.0 rechts 900x1950mm silber matt ESG klar VIGOUR`, true, false, 1, 'material')
          ]
        }
      ]
    },
    {
      id: 'optionale-positionen',
      title: 'Optionale Positionen',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'optionale-positionen-sub',
          title: 'Leistungen & Materialien',
          type: 'optional',
          products: [
            createProduct('wass-100-au', 'optionale-positionen', 'optionale-positionen-sub', `WEITERES zu WASSERINSTALLATION - (Klick Grünes-Symbol)`, 'WASS-100-AU', 0, 'Stk', `WEITERES zu WASSERINSTALLATION - (Klick Grünes-Symbol)`, true, true, 1, 'optional'),
            createProduct('bade-507-4-mat', 'optionale-positionen', 'optionale-positionen-sub', `Ebenerdigen Duschbereich herstellen & befliesen | 🛠 Montage-Leistungspaket`, 'BADE-507.4-MAT', 1579.9, 'Stk', `🛠 Montage-Leistungspaket`, true, true, 1, 'optional'),
            createProduct('strahyr', 'optionale-positionen', 'optionale-positionen-sub', `AP-Hygienebeutelspender Stratos m.runder Öffnung Edelstahl matt Franke`, 'STRAHYR', 112.86, 'Stk', `AP-Hygienebeutelspender Stratos m.runder Öffnung Edelstahl matt Franke`, true, true, 1, 'optional'),
            createProduct('santralabh18', 'optionale-positionen', 'optionale-positionen-sub', `Abfallbox SanTral 18 Liter m.Beutelhalt. Edelstahl Ophardt`, 'SANTRALABH18', 312.84, 'Stk', `Abfallbox SanTral 18 Liter m.Beutelhalt. Edelstahl Ophardt`, true, true, 1, 'optional'),
            createProduct('codessp50', 'optionale-positionen', 'optionale-positionen-sub', `Spender berührungsfrei weiss für Desinfektionsmittel 0,5 l Conti`, 'CODESSP50', 146.52, 'Stk', `Spender berührungsfrei weiss für Desinfektionsmittel 0,5 l Conti`, true, true, 1, 'optional'),
            createProduct('cwsssppas', 'optionale-positionen', 'optionale-positionen-sub', `Seifensch.-Spend.CWS ParadiseAntib.Slim m.Panel weiss f.500ml Flaschen m.Schloss`, 'CWSSSPPAS', 165.83, 'Stk', `Seifensch.-Spend.CWS ParadiseAntib.Slim m.Panel weiss f.500ml Flaschen m.Schloss`, true, true, 1, 'optional'),
            createProduct('hewiksiw448', 'optionale-positionen', 'optionale-positionen-sub', `Klappsitz Hewi 448x428mm reinweiss m.Wandplatten o.Befestigung`, 'HEWIKSIW448', 676.17, 'Stk', `Klappsitz Hewi 448x428mm reinweiss m.Wandplatten o.Befestigung`, true, true, 1, 'optional'),
            createProduct('hewiwig600', 'optionale-positionen', 'optionale-positionen-sub', `Winkelgriff Hewi 600x300mm reinweiss`, 'HEWIWIG600', 255.42, 'Stk', `Winkelgriff Hewi 600x300mm reinweiss`, true, true, 1, 'optional')
          ]
        }
      ]
    },
    {
      id: 'heizkoerper-basis-haus',
      title: 'HEIZKÖRPER | Basis-Haus',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'heizkoerper-basis-haus-sub',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('heiz-301-mat', 'heizkoerper-basis-haus', 'heizkoerper-basis-haus-sub', `HEIZSTRÄNGE bis max. 5 m | 🛠 Montage-Leistungspaket`, 'HEIZ-301-MAT', 434.56, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'service'),
            createProduct('heiz-201-1-op', 'heizkoerper-basis-haus', 'heizkoerper-basis-haus-sub', `HEIZKÖRPER |🛠 Demontage & Entsorgung`, 'HEIZ-201-1-OP', 67.13, 'Stk', `🛠 Demontage & Entsorgung`, true, false, 1, 'service'),
            createProduct('heiz-101-mon', 'heizkoerper-basis-haus', 'heizkoerper-basis-haus-sub', `HEIZKÖRPER | 🛠 Montage`, 'HEIZ-101-MON', 149, 'Stk', `🛠 Montage`, true, false, 1, 'service')
          ]
        }
      ]
    },
    {
      id: 'fliesen-badezimmer',
      title: 'FLIESEN BADEZIMMER',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'fliesen-badezimmer-sub',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('bade-100-basis', 'fliesen-badezimmer', 'fliesen-badezimmer-sub', `FLIESEN - BAD | 🛠 Montage-Leistungspaket`, 'BADE-100-BASIS', 5995, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'service')
          ]
        }
      ]
    },
    {
      id: 'sanitaer-badezimmer',
      title: 'SANITÄR BADEZIMMER',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'sanitaer-badezimmer-sub',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('bade-500-basis', 'sanitaer-badezimmer', 'sanitaer-badezimmer-sub', `SANITÄR - BAD | Montage-Leistungspaket`, 'BADE-500-BASIS', 1995, 'Stk', `Montage-Leistungspaket`, true, false, 1, 'service')
          ]
        }
      ]
    }
  ]
};

export const packageBadWanne: RenovationPackage = {
  id: 'badWanne',
  title: 'Bad mit Wanne',
  defaultArea: 8,
  defaultFloorCount: 1,
  categories: [
    {
      id: 'wasserinstallation-basis-haus',
      title: 'WASSERINSTALLATION | Basis-Haus',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'wasserinstallation-basis-haus-sub',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('wass-100-basis', 'wasserinstallation-basis-haus', 'wasserinstallation-basis-haus-sub', `WASSERINSTALLATION BADEZIMMER | 🛠 Montage-Leistungspaket`, 'WASS-100-BASIS', 1995.9, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'service'),
            createProduct('wass-105-zu', 'wasserinstallation-basis-haus', 'wasserinstallation-basis-haus-sub', `WASCHMASCHINEN ANSCHLUSS | 🛠 Zusatz-Montage`, 'WASS-105-ZU', 355.36, 'Stk', `🛠 Zusatz-Montage`, true, false, 1, 'extra'),
            createProduct('wass-101-mon', 'wasserinstallation-basis-haus', 'wasserinstallation-basis-haus-sub', `VORSATZ-ELEMENT | 🛠 Montage`, 'WASS-101-MON', 279, 'Stk', `🛠 Montage`, true, false, 2, 'service')
          ]
        }
      ]
    },
    {
      id: 'material',
      title: 'Material',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'material-sub',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('cvis3wt112', 'material', 'material-sub', `VIS Waschtisch-Montageelement | CONEL VIS Waschtisch-Montage`, 'CVIS3WT112', 203.94, 'Stk', `CONEL VIS Waschtisch-Montage`, true, false, 1, 'service'),
            createProduct('dfix320wc112', 'material', 'material-sub', `Montageelement für Wand-WC, mit UP-Spülkasten Sigma 12 cm |`, 'DFIX320WC112', 390.06, 'Stk', ``, true, false, 1, 'service'),
            createProduct('sigma30wech', 'material', 'material-sub', `Abdeckplatte Sigma30 weiß/hgl.verchr. f.2-Mengen-Spülung, für UP-Spülkästen GE`, 'SIGMA30WECH', 101.5, 'Stk', `Abdeckplatte Sigma30 weiß/hgl.verchr. f.2-Mengen-Spülung, für UP-Spülkästen GE`, true, false, 1, 'material'),
            createProduct('uv835-10017', 'material', 'material-sub', `Ximax Badheizkörper BIANCA - weiß`, 'uv835-10017', 388.95, 'Stk', `Ximax Badheizkörper BIANCA - weiß`, true, false, 1, 'material'),
            createProduct('vede218b', 'material', 'material-sub', `Durchlauferhitzer Vaillant VED E 21/8 B 21KW elektronisch gesteuert weiss`, 'VEDE218B', 373.23, 'Stk', `Durchlauferhitzer Vaillant VED E 21/8 B 21KW elektronisch gesteuert weiss`, true, false, 1, 'material'),
            createProduct('uv816-00746', 'material', 'material-sub', `Gutjahr IndorTec THERM-E Komplettset TD 3-in-1 Elektro-Flächenheizung`, 'uv816-00746', 395.95, 'Stk', `Gutjahr IndorTec THERM-E Komplettset TD 3-in-1 Elektro-Flächenheizung`, true, false, 1, 'material'),
            createProduct('1092361', 'material', 'material-sub', `V&B 30x 60 2576SD9B0 Hudson volcano matt ugl. FS R10/A rekt.`, '1092361', 41.99, 'qm', `V&B 30x 60 2576SD9B0 Hudson volcano matt ugl. FS R10/A rekt.`, true, false, 6, 'material'),
            createProduct('1054265', 'material', 'material-sub', `V&B 5x 10 2037BU9M8 Cadiz Mosaik ash grey ugl. FS R10/B rekt.`, '1054265', 298.67, 'qm', `V&B 5x 10 2037BU9M8 Cadiz Mosaik ash grey ugl. FS R10/B rekt.`, true, false, 3, 'material'),
            createProduct('uv867-00298', 'material', 'material-sub', `Ottoseal S 110 Premium Neutral Silicon`, 'uv867-00298', 8.79, 'Stk', `Ottoseal S 110 Premium Neutral Silicon`, true, false, 10, 'material'),
            createProduct('uv519-00256', 'material', 'material-sub', `PCI Nanofug Variabler Flexfugenmörtel`, 'uv519-00256', 58.65, 'Sack', `PCI Nanofug Variabler Flexfugenmörtel`, true, false, 2, 'material'),
            createProduct('uv519-00143', 'material', 'material-sub', `PCI Flexmörtel Verformungsfähiger Fliesenkleber`, 'uv519-00143', 53.75, 'Sack', `PCI Flexmörtel Verformungsfähiger Fliesenkleber`, true, false, 6, 'material'),
            createProduct('uv608-6903', 'material', 'material-sub', `Schlüter FINEC Dekorprofil Eckenset`, 'uv608-6903', 32.51, 'Stk', `Schlüter FINEC Dekorprofil Eckenset`, true, false, 2, 'material'),
            createProduct('dewwc', 'material', 'material-sub', `Wand-Tiefspül-WC derby sichtbare Befestigung weiss VIGOUR`, 'DEWWC', 191.57, 'Stk', `Wand-Tiefspül-WC derby sichtbare Befestigung weiss VIGOUR`, true, false, 1, 'material'),
            createProduct('desias', 'material', 'material-sub', `WC-Sitz derby Edelstahlscharnier abnehmbar mit Absenkautomatik weiss VIG.`, 'DESIAS', 115.34, 'Stk', `WC-Sitz derby Edelstahlscharnier abnehmbar mit Absenkautomatik weiss VIG.`, true, false, 1, 'material'),
            createProduct('des60p', 'material', 'material-sub', `Waschtisch derby style 60x48cm weiss PflegePLUS VIGOUR`, 'DES60P', 191.57, 'Stk', `Waschtisch derby style 60x48cm weiss PflegePLUS VIGOUR`, true, false, 1, 'material'),
            createProduct('des', 'material', 'material-sub', `Einhand-Waschtischbatterie derby style mit Ablaufgarnitur verchromt VIGOUR`, 'DES', 152.96, 'Stk', `Einhand-Waschtischbatterie derby style mit Ablaufgarnitur verchromt VIGOUR`, true, false, 1, 'material'),
            createProduct('desm180p', 'material', 'material-sub', `Badewanne Stahl derby 180x80cm weiss Ab-/Überlauf mittig Pflegeplus VIGOUR`, 'DESM180P', 1039.5, 'Stk', `Badewanne Stahl derby 180x80cm weiss Ab-/Überlauf mittig Pflegeplus VIGOUR`, true, false, 1, 'material'),
            createProduct('depghw', 'material', 'material-sub', `Einhand-AP-Badebatterie derby plus mit Hebel geschl. o. Brausegarn. verchr. VIG`, 'DEPGHW', 233.64, 'Stk', `Einhand-AP-Badebatterie derby plus mit Hebel geschl. o. Brausegarn. verchr. VIG`, true, false, 1, 'material')
          ]
        }
      ]
    },
    {
      id: 'optionale-positionen',
      title: 'Optionale Positionen',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'optionale-positionen-sub',
          title: 'Leistungen & Materialien',
          type: 'optional',
          products: [
            createProduct('wass-100-au', 'optionale-positionen', 'optionale-positionen-sub', `WEITERES zu WASSERINSTALLATION - (Klick Grünes-Symbol)`, 'WASS-100-AU', 0, 'Stk', `WEITERES zu WASSERINSTALLATION - (Klick Grünes-Symbol)`, true, true, 1, 'optional'),
            createProduct('strahyr', 'optionale-positionen', 'optionale-positionen-sub', `AP-Hygienebeutelspender Stratos m.runder Öffnung Edelstahl matt Franke`, 'STRAHYR', 112.86, 'Stk', `AP-Hygienebeutelspender Stratos m.runder Öffnung Edelstahl matt Franke`, true, true, 1, 'optional'),
            createProduct('santralabh18', 'optionale-positionen', 'optionale-positionen-sub', `Abfallbox SanTral 18 Liter m.Beutelhalt. Edelstahl Ophardt`, 'SANTRALABH18', 312.84, 'Stk', `Abfallbox SanTral 18 Liter m.Beutelhalt. Edelstahl Ophardt`, true, true, 1, 'optional'),
            createProduct('codessp50', 'optionale-positionen', 'optionale-positionen-sub', `Spender berührungsfrei weiss für Desinfektionsmittel 0,5 l Conti`, 'CODESSP50', 146.52, 'Stk', `Spender berührungsfrei weiss für Desinfektionsmittel 0,5 l Conti`, true, true, 1, 'optional'),
            createProduct('cwsssppas', 'optionale-positionen', 'optionale-positionen-sub', `Seifensch.-Spend.CWS ParadiseAntib.Slim m.Panel weiss f.500ml Flaschen m.Schloss`, 'CWSSSPPAS', 165.83, 'Stk', `Seifensch.-Spend.CWS ParadiseAntib.Slim m.Panel weiss f.500ml Flaschen m.Schloss`, true, true, 1, 'optional'),
            createProduct('hewiksiw448', 'optionale-positionen', 'optionale-positionen-sub', `Klappsitz Hewi 448x428mm reinweiss m.Wandplatten o.Befestigung`, 'HEWIKSIW448', 676.17, 'Stk', `Klappsitz Hewi 448x428mm reinweiss m.Wandplatten o.Befestigung`, true, true, 1, 'optional'),
            createProduct('hewiwig600', 'optionale-positionen', 'optionale-positionen-sub', `Winkelgriff Hewi 600x300mm reinweiss`, 'HEWIWIG600', 255.42, 'Stk', `Winkelgriff Hewi 600x300mm reinweiss`, true, true, 1, 'optional')
          ]
        }
      ]
    },
    {
      id: 'heizkoerper-basis-haus',
      title: 'HEIZKÖRPER | Basis-Haus',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'heizkoerper-basis-haus-sub',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('heiz-301-mat', 'heizkoerper-basis-haus', 'heizkoerper-basis-haus-sub', `HEIZSTRÄNGE bis max. 5 m | 🛠 Montage-Leistungspaket`, 'HEIZ-301-MAT', 434.56, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'service'),
            createProduct('heiz-201-1-op', 'heizkoerper-basis-haus', 'heizkoerper-basis-haus-sub', `HEIZKÖRPER |🛠 Demontage & Entsorgung`, 'HEIZ-201-1-OP', 67.13, 'Stk', `🛠 Demontage & Entsorgung`, true, false, 1, 'service'),
            createProduct('heiz-101-mon', 'heizkoerper-basis-haus', 'heizkoerper-basis-haus-sub', `HEIZKÖRPER | 🛠 Montage`, 'HEIZ-101-MON', 149, 'Stk', `🛠 Montage`, true, false, 1, 'service'),
            createProduct('heiz-201-1-op-2', 'heizkoerper-basis-haus', 'heizkoerper-basis-haus-sub', `HEIZKÖRPER |🛠 Demontage & Entsorgung`, 'HEIZ-201-1-OP', 67.13, 'Stk', `🛠 Demontage & Entsorgung`, true, false, 1, 'service')
          ]
        }
      ]
    },
    {
      id: 'fliesen-badezimmer',
      title: 'FLIESEN BADEZIMMER',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'fliesen-badezimmer-sub',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('bade-100-basis', 'fliesen-badezimmer', 'fliesen-badezimmer-sub', `FLIESEN - BAD | 🛠 Montage-Leistungspaket`, 'BADE-100-BASIS', 5995, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'service')
          ]
        }
      ]
    },
    {
      id: 'sanitaer-badezimmer',
      title: 'SANITÄR BADEZIMMER',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'sanitaer-badezimmer-sub',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('bade-500-basis', 'sanitaer-badezimmer', 'sanitaer-badezimmer-sub', `SANITÄR - BAD | Montage-Leistungspaket`, 'BADE-500-BASIS', 1995, 'Stk', `Montage-Leistungspaket`, true, false, 1, 'service')
          ]
        }
      ]
    }
  ]
};

export const packageBadDusche: RenovationPackage = {
  id: 'badDusche',
  title: 'Bad mit Dusche',
  defaultArea: 8,
  defaultFloorCount: 1,
  categories: [
    {
      id: 'wasserinstallation-basis-haus',
      title: 'WASSERINSTALLATION | Basis-Haus',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'wasserinstallation-basis-haus-sub',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('wass-100-basis', 'wasserinstallation-basis-haus', 'wasserinstallation-basis-haus-sub', `WASSERINSTALLATION BADEZIMMER | 🛠 Montage-Leistungspaket`, 'WASS-100-BASIS', 1995.9, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'service'),
            createProduct('wass-105-zu', 'wasserinstallation-basis-haus', 'wasserinstallation-basis-haus-sub', `WASCHMASCHINEN ANSCHLUSS | 🛠 Zusatz-Montage`, 'WASS-105-ZU', 355.36, 'Stk', `🛠 Zusatz-Montage`, true, false, 1, 'extra'),
            createProduct('wass-101-mon', 'wasserinstallation-basis-haus', 'wasserinstallation-basis-haus-sub', `VORSATZ-ELEMENT | 🛠 Montage`, 'WASS-101-MON', 279, 'Stk', `🛠 Montage`, true, false, 2, 'service')
          ]
        }
      ]
    },
    {
      id: 'material',
      title: 'Material',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'material-sub',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('cvis3wt112', 'material', 'material-sub', `VIS Waschtisch-Montageelement | CONEL VIS Waschtisch-Montage`, 'CVIS3WT112', 203.94, 'Stk', `CONEL VIS Waschtisch-Montage`, true, false, 1, 'service'),
            createProduct('dfix320wc112', 'material', 'material-sub', `Montageelement für Wand-WC, mit UP-Spülkasten Sigma 12 cm |`, 'DFIX320WC112', 390.06, 'Stk', ``, true, false, 1, 'service'),
            createProduct('sigma30wech', 'material', 'material-sub', `Abdeckplatte Sigma30 weiß/hgl.verchr. f.2-Mengen-Spülung, für UP-Spülkästen GE`, 'SIGMA30WECH', 101.5, 'Stk', `Abdeckplatte Sigma30 weiß/hgl.verchr. f.2-Mengen-Spülung, für UP-Spülkästen GE`, true, false, 1, 'material'),
            createProduct('uv835-10017', 'material', 'material-sub', `Ximax Badheizkörper BIANCA - weiß`, 'uv835-10017', 388.95, 'Stk', `Ximax Badheizkörper BIANCA - weiß`, true, false, 1, 'material'),
            createProduct('vede218b', 'material', 'material-sub', `Durchlauferhitzer Vaillant VED E 21/8 B 21KW elektronisch gesteuert weiss`, 'VEDE218B', 373.23, 'Stk', `Durchlauferhitzer Vaillant VED E 21/8 B 21KW elektronisch gesteuert weiss`, true, false, 1, 'material'),
            createProduct('uv816-00746', 'material', 'material-sub', `Gutjahr IndorTec THERM-E Komplettset TD 3-in-1 Elektro-Flächenheizung`, 'uv816-00746', 395.95, 'Stk', `Gutjahr IndorTec THERM-E Komplettset TD 3-in-1 Elektro-Flächenheizung`, true, false, 1, 'material'),
            createProduct('1168296', 'material', 'material-sub', `V&B 30x 60 1571TW010 Unit Two weiß matt`, '1168296', 30.22, 'qm', `V&B 30x 60 1571TW010 Unit Two weiß matt`, true, false, 18, 'material'),
            createProduct('1176157', 'material', 'material-sub', `V&B 30x 60 2341BP900 Daytona !B dark grey matt ugl. FS R10/B`, '1176157', 30.22, 'qm', `V&B 30x 60 2341BP900 Daytona !B dark grey matt ugl. FS R10/B`, true, false, 6, 'material'),
            createProduct('1054265', 'material', 'material-sub', `V&B 5x 10 2037BU9M8 Cadiz Mosaik ash grey ugl. FS R10/B rekt.`, '1054265', 298.67, 'qm', `V&B 5x 10 2037BU9M8 Cadiz Mosaik ash grey ugl. FS R10/B rekt.`, true, false, 3, 'material'),
            createProduct('uv867-00298', 'material', 'material-sub', `Ottoseal S 110 Premium Neutral Silicon`, 'uv867-00298', 8.79, 'Stk', `Ottoseal S 110 Premium Neutral Silicon`, true, false, 10, 'material'),
            createProduct('uv519-00256', 'material', 'material-sub', `PCI Nanofug Variabler Flexfugenmörtel`, 'uv519-00256', 58.65, 'Sack', `PCI Nanofug Variabler Flexfugenmörtel`, true, false, 2, 'material'),
            createProduct('uv519-00143', 'material', 'material-sub', `PCI Flexmörtel Verformungsfähiger Fliesenkleber`, 'uv519-00143', 53.75, 'Sack', `PCI Flexmörtel Verformungsfähiger Fliesenkleber`, true, false, 6, 'material'),
            createProduct('uv608-6903', 'material', 'material-sub', `Schlüter FINEC Dekorprofil Eckenset`, 'uv608-6903', 32.51, 'Stk', `Schlüter FINEC Dekorprofil Eckenset`, true, false, 2, 'material'),
            createProduct('dewwc', 'material', 'material-sub', `Wand-Tiefspül-WC derby sichtbare Befestigung weiss VIGOUR`, 'DEWWC', 191.57, 'Stk', `Wand-Tiefspül-WC derby sichtbare Befestigung weiss VIGOUR`, true, false, 1, 'material'),
            createProduct('desias', 'material', 'material-sub', `WC-Sitz derby Edelstahlscharnier abnehmbar mit Absenkautomatik weiss VIG.`, 'DESIAS', 115.34, 'Stk', `WC-Sitz derby Edelstahlscharnier abnehmbar mit Absenkautomatik weiss VIG.`, true, false, 1, 'material'),
            createProduct('des60p', 'material', 'material-sub', `Waschtisch derby style 60x48cm weiss PflegePLUS VIGOUR`, 'DES60P', 191.57, 'Stk', `Waschtisch derby style 60x48cm weiss PflegePLUS VIGOUR`, true, false, 1, 'material'),
            createProduct('des', 'material', 'material-sub', `Einhand-Waschtischbatterie derby style mit Ablaufgarnitur verchromt VIGOUR`, 'DES', 152.96, 'Stk', `Einhand-Waschtischbatterie derby style mit Ablaufgarnitur verchromt VIGOUR`, true, false, 1, 'material'),
            createProduct('cls90ef', 'material', 'material-sub', `Duschwanne Stahl clivia 90x90x3.2cm weiss VIGOUR`, 'CLS90EF', 297.99, 'Stk', `Duschwanne Stahl clivia 90x90x3.2cm weiss VIGOUR`, true, false, 1, 'material'),
            createProduct('euphdsee260', 'material', 'material-sub', `Duschsystem Euphoria 260 mit Einhandmischer 9,5l/min chrom Grohe`, 'EUPHDSEE260', 608.85, 'Stk', `Duschsystem Euphoria 260 mit Einhandmischer 9,5l/min chrom Grohe`, true, false, 1, 'material'),
            createProduct('v2ge90l', 'material', 'material-sub', `Gleittür Eckhälfte 2.0 links 900x1950mm silber matt ESG klar VIGOUR`, 'V2GE90L', 569.25, 'Stk', `Gleittür Eckhälfte 2.0 links 900x1950mm silber matt ESG klar VIGOUR`, true, false, 1, 'material'),
            createProduct('v2ge90r', 'material', 'material-sub', `Gleittür Eckhälfte 2.0 rechts 900x1950mm silber matt ESG klar VIGOUR`, 'V2GE90R', 569.25, 'Stk', `Gleittür Eckhälfte 2.0 rechts 900x1950mm silber matt ESG klar VIGOUR`, true, false, 1, 'material')
          ]
        }
      ]
    },
    {
      id: 'optionale-positionen',
      title: 'Optionale Positionen',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'optionale-positionen-sub',
          title: 'Leistungen & Materialien',
          type: 'optional',
          products: [
            createProduct('wass-100-au', 'optionale-positionen', 'optionale-positionen-sub', `WEITERES zu WASSERINSTALLATION - (Klick Grünes-Symbol)`, 'WASS-100-AU', 0, 'Stk', `WEITERES zu WASSERINSTALLATION - (Klick Grünes-Symbol)`, true, true, 1, 'optional'),
            createProduct('bade-507-4-mat', 'optionale-positionen', 'optionale-positionen-sub', `Ebenerdigen Duschbereich herstellen & befliesen | 🛠 Montage-Leistungspaket`, 'BADE-507.4-MAT', 1579.9, 'Stk', `🛠 Montage-Leistungspaket`, true, true, 1, 'optional'),
            createProduct('strahyr', 'optionale-positionen', 'optionale-positionen-sub', `AP-Hygienebeutelspender Stratos m.runder Öffnung Edelstahl matt Franke`, 'STRAHYR', 112.86, 'Stk', `AP-Hygienebeutelspender Stratos m.runder Öffnung Edelstahl matt Franke`, true, true, 1, 'optional'),
            createProduct('santralabh18', 'optionale-positionen', 'optionale-positionen-sub', `Abfallbox SanTral 18 Liter m.Beutelhalt. Edelstahl Ophardt`, 'SANTRALABH18', 312.84, 'Stk', `Abfallbox SanTral 18 Liter m.Beutelhalt. Edelstahl Ophardt`, true, true, 1, 'optional'),
            createProduct('codessp50', 'optionale-positionen', 'optionale-positionen-sub', `Spender berührungsfrei weiss für Desinfektionsmittel 0,5 l Conti`, 'CODESSP50', 146.52, 'Stk', `Spender berührungsfrei weiss für Desinfektionsmittel 0,5 l Conti`, true, true, 1, 'optional'),
            createProduct('cwsssppas', 'optionale-positionen', 'optionale-positionen-sub', `Seifensch.-Spend.CWS ParadiseAntib.Slim m.Panel weiss f.500ml Flaschen m.Schloss`, 'CWSSSPPAS', 165.83, 'Stk', `Seifensch.-Spend.CWS ParadiseAntib.Slim m.Panel weiss f.500ml Flaschen m.Schloss`, true, true, 1, 'optional'),
            createProduct('hewiksiw448', 'optionale-positionen', 'optionale-positionen-sub', `Klappsitz Hewi 448x428mm reinweiss m.Wandplatten o.Befestigung`, 'HEWIKSIW448', 676.17, 'Stk', `Klappsitz Hewi 448x428mm reinweiss m.Wandplatten o.Befestigung`, true, true, 1, 'optional'),
            createProduct('hewiwig600', 'optionale-positionen', 'optionale-positionen-sub', `Winkelgriff Hewi 600x300mm reinweiss`, 'HEWIWIG600', 255.42, 'Stk', `Winkelgriff Hewi 600x300mm reinweiss`, true, true, 1, 'optional')
          ]
        }
      ]
    },
    {
      id: 'heizkoerper-basis-haus',
      title: 'HEIZKÖRPER | Basis-Haus',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'heizkoerper-basis-haus-sub',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('heiz-301-mat', 'heizkoerper-basis-haus', 'heizkoerper-basis-haus-sub', `HEIZSTRÄNGE bis max. 5 m | 🛠 Montage-Leistungspaket`, 'HEIZ-301-MAT', 434.56, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'service'),
            createProduct('heiz-201-1-op', 'heizkoerper-basis-haus', 'heizkoerper-basis-haus-sub', `HEIZKÖRPER |🛠 Demontage & Entsorgung`, 'HEIZ-201-1-OP', 67.13, 'Stk', `🛠 Demontage & Entsorgung`, true, false, 1, 'service'),
            createProduct('heiz-101-mon', 'heizkoerper-basis-haus', 'heizkoerper-basis-haus-sub', `HEIZKÖRPER | 🛠 Montage`, 'HEIZ-101-MON', 149, 'Stk', `🛠 Montage`, true, false, 1, 'service'),
            createProduct('heiz-201-1-op-2', 'heizkoerper-basis-haus', 'heizkoerper-basis-haus-sub', `HEIZKÖRPER |🛠 Demontage & Entsorgung`, 'HEIZ-201-1-OP', 67.13, 'Stk', `🛠 Demontage & Entsorgung`, true, false, 1, 'service')
          ]
        }
      ]
    },
    {
      id: 'fliesen-badezimmer',
      title: 'FLIESEN BADEZIMMER',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'fliesen-badezimmer-sub',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('bade-100-basis', 'fliesen-badezimmer', 'fliesen-badezimmer-sub', `FLIESEN - BAD | 🛠 Montage-Leistungspaket`, 'BADE-100-BASIS', 5995, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'service')
          ]
        }
      ]
    },
    {
      id: 'sanitaer-badezimmer',
      title: 'SANITÄR BADEZIMMER',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'sanitaer-badezimmer-sub',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('bade-500-basis', 'sanitaer-badezimmer', 'sanitaer-badezimmer-sub', `SANITÄR - BAD | Montage-Leistungspaket`, 'BADE-500-BASIS', 1995, 'Stk', `Montage-Leistungspaket`, true, false, 1, 'service')
          ]
        }
      ]
    }
  ]
};

export const packageBadWhirlpool: RenovationPackage = {
  id: 'badWhirlpool',
  title: 'Bad mit Whirlpool',
  defaultArea: 8,
  defaultFloorCount: 1,
  categories: [
    {
      id: 'wasserinstallation-basis-haus',
      title: 'WASSERINSTALLATION | Basis-Haus',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'wasserinstallation-basis-haus-sub',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('wass-100-basis', 'wasserinstallation-basis-haus', 'wasserinstallation-basis-haus-sub', `WASSERINSTALLATION BADEZIMMER | 🛠 Montage-Leistungspaket`, 'WASS-100-BASIS', 1995.9, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'service'),
            createProduct('wass-105-zu', 'wasserinstallation-basis-haus', 'wasserinstallation-basis-haus-sub', `WASCHMASCHINEN ANSCHLUSS | 🛠 Zusatz-Montage`, 'WASS-105-ZU', 355.36, 'Stk', `🛠 Zusatz-Montage`, true, false, 1, 'extra'),
            createProduct('wass-101-mon', 'wasserinstallation-basis-haus', 'wasserinstallation-basis-haus-sub', `VORSATZ-ELEMENT | 🛠 Montage`, 'WASS-101-MON', 279, 'Stk', `🛠 Montage`, true, false, 2, 'service')
          ]
        }
      ]
    },
    {
      id: 'material',
      title: 'Material',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'material-sub',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('cvis3wt112', 'material', 'material-sub', `VIS Waschtisch-Montageelement | CONEL VIS Waschtisch-Montage`, 'CVIS3WT112', 203.94, 'Stk', `CONEL VIS Waschtisch-Montage`, true, false, 1, 'service'),
            createProduct('dfix320wc112', 'material', 'material-sub', `Montageelement für Wand-WC, mit UP-Spülkasten Sigma 12 cm |`, 'DFIX320WC112', 390.06, 'Stk', ``, true, false, 1, 'service'),
            createProduct('sigma30wech', 'material', 'material-sub', `Abdeckplatte Sigma30 weiß/hgl.verchr. f.2-Mengen-Spülung, für UP-Spülkästen GE`, 'SIGMA30WECH', 101.5, 'Stk', `Abdeckplatte Sigma30 weiß/hgl.verchr. f.2-Mengen-Spülung, für UP-Spülkästen GE`, true, false, 1, 'material'),
            createProduct('uv835-10017', 'material', 'material-sub', `Ximax Badheizkörper BIANCA - weiß`, 'uv835-10017', 388.95, 'Stk', `Ximax Badheizkörper BIANCA - weiß`, true, false, 1, 'material'),
            createProduct('vede218b', 'material', 'material-sub', `Durchlauferhitzer Vaillant VED E 21/8 B 21KW elektronisch gesteuert weiss`, 'VEDE218B', 373.23, 'Stk', `Durchlauferhitzer Vaillant VED E 21/8 B 21KW elektronisch gesteuert weiss`, true, false, 1, 'material'),
            createProduct('uv816-00746', 'material', 'material-sub', `Gutjahr IndorTec THERM-E Komplettset TD 3-in-1 Elektro-Flächenheizung`, 'uv816-00746', 395.95, 'Stk', `Gutjahr IndorTec THERM-E Komplettset TD 3-in-1 Elektro-Flächenheizung`, true, false, 1, 'material'),
            createProduct('1092361', 'material', 'material-sub', `V&B 30x 60 2576SD9B0 Hudson volcano matt ugl. FS R10/A rekt.`, '1092361', 41.99, 'qm', `V&B 30x 60 2576SD9B0 Hudson volcano matt ugl. FS R10/A rekt.`, true, false, 6, 'material'),
            createProduct('1054265', 'material', 'material-sub', `V&B 5x 10 2037BU9M8 Cadiz Mosaik ash grey ugl. FS R10/B rekt.`, '1054265', 298.67, 'qm', `V&B 5x 10 2037BU9M8 Cadiz Mosaik ash grey ugl. FS R10/B rekt.`, true, false, 3, 'material'),
            createProduct('uv867-00298', 'material', 'material-sub', `Ottoseal S 110 Premium Neutral Silicon`, 'uv867-00298', 8.79, 'Stk', `Ottoseal S 110 Premium Neutral Silicon`, true, false, 10, 'material'),
            createProduct('uv519-00256', 'material', 'material-sub', `PCI Nanofug Variabler Flexfugenmörtel`, 'uv519-00256', 58.65, 'Sack', `PCI Nanofug Variabler Flexfugenmörtel`, true, false, 2, 'material'),
            createProduct('uv519-00143', 'material', 'material-sub', `PCI Flexmörtel Verformungsfähiger Fliesenkleber`, 'uv519-00143', 53.75, 'Sack', `PCI Flexmörtel Verformungsfähiger Fliesenkleber`, true, false, 6, 'material'),
            createProduct('uv608-6903', 'material', 'material-sub', `Schlüter FINEC Dekorprofil Eckenset`, 'uv608-6903', 32.51, 'Stk', `Schlüter FINEC Dekorprofil Eckenset`, true, false, 2, 'material'),
            createProduct('dewwc', 'material', 'material-sub', `Wand-Tiefspül-WC derby sichtbare Befestigung weiss VIGOUR`, 'DEWWC', 191.57, 'Stk', `Wand-Tiefspül-WC derby sichtbare Befestigung weiss VIGOUR`, true, false, 1, 'material'),
            createProduct('desias', 'material', 'material-sub', `WC-Sitz derby Edelstahlscharnier abnehmbar mit Absenkautomatik weiss VIG.`, 'DESIAS', 115.34, 'Stk', `WC-Sitz derby Edelstahlscharnier abnehmbar mit Absenkautomatik weiss VIG.`, true, false, 1, 'material'),
            createProduct('des60p', 'material', 'material-sub', `Waschtisch derby style 60x48cm weiss PflegePLUS VIGOUR`, 'DES60P', 191.57, 'Stk', `Waschtisch derby style 60x48cm weiss PflegePLUS VIGOUR`, true, false, 1, 'material'),
            createProduct('des', 'material', 'material-sub', `Einhand-Waschtischbatterie derby style mit Ablaufgarnitur verchromt VIGOUR`, 'DES', 152.96, 'Stk', `Einhand-Waschtischbatterie derby style mit Ablaufgarnitur verchromt VIGOUR`, true, false, 1, 'material'),
            createProduct('wlbasiceks', 'material', 'material-sub', `Whirl-Line Basic Eco Kombisystem Zum Einbau in bereitgestellt Acrylwanne`, 'WLBASICEKS', 4830.21, 'Stk', `Whirl-Line Basic Eco Kombisystem Zum Einbau in bereitgestellt Acrylwanne`, true, false, 1, 'material'),
            createProduct('depghw', 'material', 'material-sub', `Einhand-AP-Badebatterie derby plus mit Hebel geschl. o. Brausegarn. verchr. VIG`, 'DEPGHW', 233.64, 'Stk', `Einhand-AP-Badebatterie derby plus mit Hebel geschl. o. Brausegarn. verchr. VIG`, true, false, 1, 'material')
          ]
        }
      ]
    },
    {
      id: 'optionale-positionen',
      title: 'Optionale Positionen',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'optionale-positionen-sub',
          title: 'Leistungen & Materialien',
          type: 'optional',
          products: [
            createProduct('wass-100-au', 'optionale-positionen', 'optionale-positionen-sub', `WEITERES zu WASSERINSTALLATION - (Klick Grünes-Symbol)`, 'WASS-100-AU', 0, 'Stk', `WEITERES zu WASSERINSTALLATION - (Klick Grünes-Symbol)`, true, true, 1, 'optional'),
            createProduct('strahyr', 'optionale-positionen', 'optionale-positionen-sub', `AP-Hygienebeutelspender Stratos m.runder Öffnung Edelstahl matt Franke`, 'STRAHYR', 112.86, 'Stk', `AP-Hygienebeutelspender Stratos m.runder Öffnung Edelstahl matt Franke`, true, true, 1, 'optional'),
            createProduct('santralabh18', 'optionale-positionen', 'optionale-positionen-sub', `Abfallbox SanTral 18 Liter m.Beutelhalt. Edelstahl Ophardt`, 'SANTRALABH18', 312.84, 'Stk', `Abfallbox SanTral 18 Liter m.Beutelhalt. Edelstahl Ophardt`, true, true, 1, 'optional'),
            createProduct('codessp50', 'optionale-positionen', 'optionale-positionen-sub', `Spender berührungsfrei weiss für Desinfektionsmittel 0,5 l Conti`, 'CODESSP50', 146.52, 'Stk', `Spender berührungsfrei weiss für Desinfektionsmittel 0,5 l Conti`, true, true, 1, 'optional'),
            createProduct('cwsssppas', 'optionale-positionen', 'optionale-positionen-sub', `Seifensch.-Spend.CWS ParadiseAntib.Slim m.Panel weiss f.500ml Flaschen m.Schloss`, 'CWSSSPPAS', 165.83, 'Stk', `Seifensch.-Spend.CWS ParadiseAntib.Slim m.Panel weiss f.500ml Flaschen m.Schloss`, true, true, 1, 'optional'),
            createProduct('hewiksiw448', 'optionale-positionen', 'optionale-positionen-sub', `Klappsitz Hewi 448x428mm reinweiss m.Wandplatten o.Befestigung`, 'HEWIKSIW448', 676.17, 'Stk', `Klappsitz Hewi 448x428mm reinweiss m.Wandplatten o.Befestigung`, true, true, 1, 'optional'),
            createProduct('hewiwig600', 'optionale-positionen', 'optionale-positionen-sub', `Winkelgriff Hewi 600x300mm reinweiss`, 'HEWIWIG600', 255.42, 'Stk', `Winkelgriff Hewi 600x300mm reinweiss`, true, true, 1, 'optional')
          ]
        }
      ]
    },
    {
      id: 'heizkoerper-basis-haus',
      title: 'HEIZKÖRPER | Basis-Haus',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'heizkoerper-basis-haus-sub',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('heiz-301-mat', 'heizkoerper-basis-haus', 'heizkoerper-basis-haus-sub', `HEIZSTRÄNGE bis max. 5 m | 🛠 Montage-Leistungspaket`, 'HEIZ-301-MAT', 434.56, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'service'),
            createProduct('heiz-201-1-op', 'heizkoerper-basis-haus', 'heizkoerper-basis-haus-sub', `HEIZKÖRPER |🛠 Demontage & Entsorgung`, 'HEIZ-201-1-OP', 67.13, 'Stk', `🛠 Demontage & Entsorgung`, true, false, 1, 'service'),
            createProduct('heiz-101-mon', 'heizkoerper-basis-haus', 'heizkoerper-basis-haus-sub', `HEIZKÖRPER | 🛠 Montage`, 'HEIZ-101-MON', 149, 'Stk', `🛠 Montage`, true, false, 1, 'service'),
            createProduct('heiz-201-1-op-2', 'heizkoerper-basis-haus', 'heizkoerper-basis-haus-sub', `HEIZKÖRPER |🛠 Demontage & Entsorgung`, 'HEIZ-201-1-OP', 67.13, 'Stk', `🛠 Demontage & Entsorgung`, true, false, 1, 'service')
          ]
        }
      ]
    },
    {
      id: 'fliesen-badezimmer',
      title: 'FLIESEN BADEZIMMER',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'fliesen-badezimmer-sub',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('bade-100-basis', 'fliesen-badezimmer', 'fliesen-badezimmer-sub', `FLIESEN - BAD | 🛠 Montage-Leistungspaket`, 'BADE-100-BASIS', 5995, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'service')
          ]
        }
      ]
    },
    {
      id: 'sanitaer-badezimmer',
      title: 'SANITÄR BADEZIMMER',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'sanitaer-badezimmer-sub',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('bade-500-basis', 'sanitaer-badezimmer', 'sanitaer-badezimmer-sub', `SANITÄR - BAD | Montage-Leistungspaket`, 'BADE-500-BASIS', 1995, 'Stk', `Montage-Leistungspaket`, true, false, 1, 'service')
          ]
        }
      ]
    }
  ]
};

export const packageBadWhirlpoolDusche: RenovationPackage = {
  id: 'badWhirlpoolDusche',
  title: 'Bad mit Whirlpool & Dusche',
  defaultArea: 8,
  defaultFloorCount: 1,
  categories: [
    {
      id: 'wasserinstallation-basis-haus',
      title: 'WASSERINSTALLATION | Basis-Haus',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'wasserinstallation-basis-haus-sub',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('wass-100-basis', 'wasserinstallation-basis-haus', 'wasserinstallation-basis-haus-sub', `WASSERINSTALLATION BADEZIMMER | 🛠 Montage-Leistungspaket`, 'WASS-100-BASIS', 1995.9, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'service'),
            createProduct('wass-105-zu', 'wasserinstallation-basis-haus', 'wasserinstallation-basis-haus-sub', `WASCHMASCHINEN ANSCHLUSS | 🛠 Zusatz-Montage`, 'WASS-105-ZU', 355.36, 'Stk', `🛠 Zusatz-Montage`, true, false, 1, 'extra'),
            createProduct('wass-101-mon', 'wasserinstallation-basis-haus', 'wasserinstallation-basis-haus-sub', `VORSATZ-ELEMENT | 🛠 Montage`, 'WASS-101-MON', 279, 'Stk', `🛠 Montage`, true, false, 2, 'service')
          ]
        }
      ]
    },
    {
      id: 'material',
      title: 'Material',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'material-sub',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('cvis3wt112', 'material', 'material-sub', `VIS Waschtisch-Montageelement | CONEL VIS Waschtisch-Montage`, 'CVIS3WT112', 203.94, 'Stk', `CONEL VIS Waschtisch-Montage`, true, false, 1, 'service'),
            createProduct('dfix320wc112', 'material', 'material-sub', `Montageelement für Wand-WC, mit UP-Spülkasten Sigma 12 cm |`, 'DFIX320WC112', 390.06, 'Stk', ``, true, false, 1, 'service'),
            createProduct('sigma30wech', 'material', 'material-sub', `Abdeckplatte Sigma30 weiß/hgl.verchr. f.2-Mengen-Spülung, für UP-Spülkästen GE`, 'SIGMA30WECH', 101.5, 'Stk', `Abdeckplatte Sigma30 weiß/hgl.verchr. f.2-Mengen-Spülung, für UP-Spülkästen GE`, true, false, 1, 'material'),
            createProduct('uv835-10017', 'material', 'material-sub', `Ximax Badheizkörper BIANCA - weiß`, 'uv835-10017', 388.95, 'Stk', `Ximax Badheizkörper BIANCA - weiß`, true, false, 1, 'material'),
            createProduct('vede218b', 'material', 'material-sub', `Durchlauferhitzer Vaillant VED E 21/8 B 21KW elektronisch gesteuert weiss`, 'VEDE218B', 373.23, 'Stk', `Durchlauferhitzer Vaillant VED E 21/8 B 21KW elektronisch gesteuert weiss`, true, false, 1, 'material'),
            createProduct('uv816-00746', 'material', 'material-sub', `Gutjahr IndorTec THERM-E Komplettset TD 3-in-1 Elektro-Flächenheizung`, 'uv816-00746', 395.95, 'Stk', `Gutjahr IndorTec THERM-E Komplettset TD 3-in-1 Elektro-Flächenheizung`, true, false, 1, 'material'),
            createProduct('1092361', 'material', 'material-sub', `V&B 30x 60 2576SD9B0 Hudson volcano matt ugl. FS R10/A rekt.`, '1092361', 41.99, 'qm', `V&B 30x 60 2576SD9B0 Hudson volcano matt ugl. FS R10/A rekt.`, true, false, 6, 'material'),
            createProduct('1054265', 'material', 'material-sub', `V&B 5x 10 2037BU9M8 Cadiz Mosaik ash grey ugl. FS R10/B rekt.`, '1054265', 298.67, 'qm', `V&B 5x 10 2037BU9M8 Cadiz Mosaik ash grey ugl. FS R10/B rekt.`, true, false, 3, 'material'),
            createProduct('uv867-00298', 'material', 'material-sub', `Ottoseal S 110 Premium Neutral Silicon`, 'uv867-00298', 8.79, 'Stk', `Ottoseal S 110 Premium Neutral Silicon`, true, false, 10, 'material'),
            createProduct('uv519-00256', 'material', 'material-sub', `PCI Nanofug Variabler Flexfugenmörtel`, 'uv519-00256', 58.65, 'Sack', `PCI Nanofug Variabler Flexfugenmörtel`, true, false, 2, 'material'),
            createProduct('uv519-00143', 'material', 'material-sub', `PCI Flexmörtel Verformungsfähiger Fliesenkleber`, 'uv519-00143', 53.75, 'Sack', `PCI Flexmörtel Verformungsfähiger Fliesenkleber`, true, false, 6, 'material'),
            createProduct('uv608-6903', 'material', 'material-sub', `Schlüter FINEC Dekorprofil Eckenset`, 'uv608-6903', 32.51, 'Stk', `Schlüter FINEC Dekorprofil Eckenset`, true, false, 2, 'material'),
            createProduct('dewwc', 'material', 'material-sub', `Wand-Tiefspül-WC derby sichtbare Befestigung weiss VIGOUR`, 'DEWWC', 191.57, 'Stk', `Wand-Tiefspül-WC derby sichtbare Befestigung weiss VIGOUR`, true, false, 1, 'material'),
            createProduct('desias', 'material', 'material-sub', `WC-Sitz derby Edelstahlscharnier abnehmbar mit Absenkautomatik weiss VIG.`, 'DESIAS', 115.34, 'Stk', `WC-Sitz derby Edelstahlscharnier abnehmbar mit Absenkautomatik weiss VIG.`, true, false, 1, 'material'),
            createProduct('des60p', 'material', 'material-sub', `Waschtisch derby style 60x48cm weiss PflegePLUS VIGOUR`, 'DES60P', 191.57, 'Stk', `Waschtisch derby style 60x48cm weiss PflegePLUS VIGOUR`, true, false, 1, 'material'),
            createProduct('des', 'material', 'material-sub', `Einhand-Waschtischbatterie derby style mit Ablaufgarnitur verchromt VIGOUR`, 'DES', 152.96, 'Stk', `Einhand-Waschtischbatterie derby style mit Ablaufgarnitur verchromt VIGOUR`, true, false, 1, 'material'),
            createProduct('wlbasiceks', 'material', 'material-sub', `Whirl-Line Basic Eco Kombisystem Zum Einbau in bereitgestellt Acrylwanne`, 'WLBASICEKS', 4830.21, 'Stk', `Whirl-Line Basic Eco Kombisystem Zum Einbau in bereitgestellt Acrylwanne`, true, false, 1, 'material'),
            createProduct('depghw', 'material', 'material-sub', `Einhand-AP-Badebatterie derby plus mit Hebel geschl. o. Brausegarn. verchr. VIG`, 'DEPGHW', 233.64, 'Stk', `Einhand-AP-Badebatterie derby plus mit Hebel geschl. o. Brausegarn. verchr. VIG`, true, false, 1, 'material'),
            createProduct('cls90ef', 'material', 'material-sub', `Duschwanne Stahl clivia 90x90x3.2cm weiss VIGOUR`, 'CLS90EF', 297.99, 'Stk', `Duschwanne Stahl clivia 90x90x3.2cm weiss VIGOUR`, true, false, 1, 'material'),
            createProduct('euphdsee260', 'material', 'material-sub', `Duschsystem Euphoria 260 mit Einhandmischer 9,5l/min chrom Grohe`, 'EUPHDSEE260', 608.85, 'Stk', `Duschsystem Euphoria 260 mit Einhandmischer 9,5l/min chrom Grohe`, true, false, 1, 'material'),
            createProduct('v2ge90l', 'material', 'material-sub', `Gleittür Eckhälfte 2.0 links 900x1950mm silber matt ESG klar VIGOUR`, 'V2GE90L', 569.25, 'Stk', `Gleittür Eckhälfte 2.0 links 900x1950mm silber matt ESG klar VIGOUR`, true, false, 1, 'material'),
            createProduct('v2ge90r', 'material', 'material-sub', `Gleittür Eckhälfte 2.0 rechts 900x1950mm silber matt ESG klar VIGOUR`, 'V2GE90R', 569.25, 'Stk', `Gleittür Eckhälfte 2.0 rechts 900x1950mm silber matt ESG klar VIGOUR`, true, false, 1, 'material')
          ]
        }
      ]
    },
    {
      id: 'optionale-positionen',
      title: 'Optionale Positionen',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'optionale-positionen-sub',
          title: 'Leistungen & Materialien',
          type: 'optional',
          products: [
            createProduct('wass-100-au', 'optionale-positionen', 'optionale-positionen-sub', `WEITERES zu WASSERINSTALLATION - (Klick Grünes-Symbol)`, 'WASS-100-AU', 0, 'Stk', `WEITERES zu WASSERINSTALLATION - (Klick Grünes-Symbol)`, true, true, 1, 'optional'),
            createProduct('bade-507-4-mat', 'optionale-positionen', 'optionale-positionen-sub', `Ebenerdigen Duschbereich herstellen & befliesen | 🛠 Montage-Leistungspaket`, 'BADE-507.4-MAT', 1579.9, 'Stk', `🛠 Montage-Leistungspaket`, true, true, 1, 'optional'),
            createProduct('strahyr', 'optionale-positionen', 'optionale-positionen-sub', `AP-Hygienebeutelspender Stratos m.runder Öffnung Edelstahl matt Franke`, 'STRAHYR', 112.86, 'Stk', `AP-Hygienebeutelspender Stratos m.runder Öffnung Edelstahl matt Franke`, true, true, 1, 'optional'),
            createProduct('santralabh18', 'optionale-positionen', 'optionale-positionen-sub', `Abfallbox SanTral 18 Liter m.Beutelhalt. Edelstahl Ophardt`, 'SANTRALABH18', 312.84, 'Stk', `Abfallbox SanTral 18 Liter m.Beutelhalt. Edelstahl Ophardt`, true, true, 1, 'optional'),
            createProduct('codessp50', 'optionale-positionen', 'optionale-positionen-sub', `Spender berührungsfrei weiss für Desinfektionsmittel 0,5 l Conti`, 'CODESSP50', 146.52, 'Stk', `Spender berührungsfrei weiss für Desinfektionsmittel 0,5 l Conti`, true, true, 1, 'optional'),
            createProduct('cwsssppas', 'optionale-positionen', 'optionale-positionen-sub', `Seifensch.-Spend.CWS ParadiseAntib.Slim m.Panel weiss f.500ml Flaschen m.Schloss`, 'CWSSSPPAS', 165.83, 'Stk', `Seifensch.-Spend.CWS ParadiseAntib.Slim m.Panel weiss f.500ml Flaschen m.Schloss`, true, true, 1, 'optional'),
            createProduct('hewiksiw448', 'optionale-positionen', 'optionale-positionen-sub', `Klappsitz Hewi 448x428mm reinweiss m.Wandplatten o.Befestigung`, 'HEWIKSIW448', 676.17, 'Stk', `Klappsitz Hewi 448x428mm reinweiss m.Wandplatten o.Befestigung`, true, true, 1, 'optional'),
            createProduct('hewiwig600', 'optionale-positionen', 'optionale-positionen-sub', `Winkelgriff Hewi 600x300mm reinweiss`, 'HEWIWIG600', 255.42, 'Stk', `Winkelgriff Hewi 600x300mm reinweiss`, true, true, 1, 'optional')
          ]
        }
      ]
    },
    {
      id: 'heizkoerper-basis-haus',
      title: 'HEIZKÖRPER | Basis-Haus',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'heizkoerper-basis-haus-sub',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('heiz-301-mat', 'heizkoerper-basis-haus', 'heizkoerper-basis-haus-sub', `HEIZSTRÄNGE bis max. 5 m | 🛠 Montage-Leistungspaket`, 'HEIZ-301-MAT', 434.56, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'service'),
            createProduct('heiz-201-1-op', 'heizkoerper-basis-haus', 'heizkoerper-basis-haus-sub', `HEIZKÖRPER |🛠 Demontage & Entsorgung`, 'HEIZ-201-1-OP', 67.13, 'Stk', `🛠 Demontage & Entsorgung`, true, false, 1, 'service'),
            createProduct('heiz-101-mon', 'heizkoerper-basis-haus', 'heizkoerper-basis-haus-sub', `HEIZKÖRPER | 🛠 Montage`, 'HEIZ-101-MON', 149, 'Stk', `🛠 Montage`, true, false, 1, 'service'),
            createProduct('heiz-201-1-op-2', 'heizkoerper-basis-haus', 'heizkoerper-basis-haus-sub', `HEIZKÖRPER |🛠 Demontage & Entsorgung`, 'HEIZ-201-1-OP', 67.13, 'Stk', `🛠 Demontage & Entsorgung`, true, false, 1, 'service')
          ]
        }
      ]
    },
    {
      id: 'fliesen-badezimmer',
      title: 'FLIESEN BADEZIMMER',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'fliesen-badezimmer-sub',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('bade-100-basis', 'fliesen-badezimmer', 'fliesen-badezimmer-sub', `FLIESEN - BAD | 🛠 Montage-Leistungspaket`, 'BADE-100-BASIS', 5995, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'service')
          ]
        }
      ]
    },
    {
      id: 'sanitaer-badezimmer',
      title: 'SANITÄR BADEZIMMER',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'sanitaer-badezimmer-sub',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('bade-500-basis', 'sanitaer-badezimmer', 'sanitaer-badezimmer-sub', `SANITÄR - BAD | Montage-Leistungspaket`, 'BADE-500-BASIS', 1995, 'Stk', `Montage-Leistungspaket`, true, false, 1, 'service')
          ]
        }
      ]
    }
  ]
};

export const packageBadBarrierefrei: RenovationPackage = {
  id: 'badBarrierefrei',
  title: 'Barrierefreies Bad',
  defaultArea: 8,
  defaultFloorCount: 1,
  categories: [
    {
      id: 'wasserinstallation-basis-haus',
      title: 'WASSERINSTALLATION | Basis-Haus',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'wasserinstallation-basis-haus-sub',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('wass-100-basis', 'wasserinstallation-basis-haus', 'wasserinstallation-basis-haus-sub', `WASSERINSTALLATION BADEZIMMER | 🛠 Montage-Leistungspaket`, 'WASS-100-BASIS', 1995.9, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'service'),
            createProduct('wass-105-zu', 'wasserinstallation-basis-haus', 'wasserinstallation-basis-haus-sub', `WASCHMASCHINEN ANSCHLUSS | 🛠 Zusatz-Montage`, 'WASS-105-ZU', 355.36, 'Stk', `🛠 Zusatz-Montage`, true, false, 1, 'extra'),
            createProduct('wass-101-mon', 'wasserinstallation-basis-haus', 'wasserinstallation-basis-haus-sub', `VORSATZ-ELEMENT | 🛠 Montage`, 'WASS-101-MON', 279, 'Stk', `🛠 Montage`, true, false, 2, 'service'),
            createProduct('bade-507-4-mat', 'wasserinstallation-basis-haus', 'wasserinstallation-basis-haus-sub', `Ebenerdigen Duschbereich herstellen & befliesen | 🛠 Montage-Leistungspaket`, 'BADE-507.4-MAT', 1579.9, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'service')
          ]
        }
      ]
    },
    {
      id: 'material',
      title: 'Material',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'material-sub',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('cvis3wt112', 'material', 'material-sub', `VIS Waschtisch-Montageelement | CONEL VIS Waschtisch-Montage`, 'CVIS3WT112', 203.94, 'Stk', `CONEL VIS Waschtisch-Montage`, true, false, 1, 'service'),
            createProduct('dfix320wc112', 'material', 'material-sub', `Montageelement für Wand-WC, mit UP-Spülkasten Sigma 12 cm |`, 'DFIX320WC112', 390.06, 'Stk', ``, true, false, 1, 'service'),
            createProduct('gebpffnwcs10n', 'material', 'material-sub', `WC-Strg. mit elektr. Spül, Netz, BT 1-Mengen-Sp. Sigma10, für SKG, Funk`, 'GEBPFFNWCS10N', 733.59, 'Stk', `WC-Strg. mit elektr. Spül, Netz, BT 1-Mengen-Sp. Sigma10, für SKG, Funk`, true, false, 1, 'material'),
            createProduct('clpufs', 'material', 'material-sub', `Universalfunkauslöser clivia plus mit Schelle, schwarz VIGOUR`, 'CLPUFS', 408.87, 'Stk', `Universalfunkauslöser clivia plus mit Schelle, schwarz VIGOUR`, true, false, 1, 'material'),
            createProduct('uv835-10017', 'material', 'material-sub', `Ximax Badheizkörper BIANCA - weiß`, 'uv835-10017', 388.95, 'Stk', `Ximax Badheizkörper BIANCA - weiß`, true, false, 1, 'material'),
            createProduct('clagecfxun', 'material', 'material-sub', `Clage Kompakt-Durchlauferhitzer CFX-U FUNKTRONIC MPS`, 'CLAGECFXUN', 486.09, 'Stk', `Clage Kompakt-Durchlauferhitzer CFX-U FUNKTRONIC MPS`, true, false, 1, 'material'),
            createProduct('uv816-00746', 'material', 'material-sub', `Gutjahr IndorTec THERM-E Komplettset TD 3-in-1 Elektro-Flächenheizung`, 'uv816-00746', 395.95, 'Stk', `Gutjahr IndorTec THERM-E Komplettset TD 3-in-1 Elektro-Flächenheizung`, true, false, 1, 'material'),
            createProduct('1168296', 'material', 'material-sub', `V&B 30x 60 1571TW010 Unit Two weiß matt`, '1168296', 30.22, 'qm', `V&B 30x 60 1571TW010 Unit Two weiß matt`, true, false, 18, 'material'),
            createProduct('1176157', 'material', 'material-sub', `V&B 30x 60 2341BP900 Daytona !B dark grey matt ugl. FS R10/B`, '1176157', 30.22, 'qm', `V&B 30x 60 2341BP900 Daytona !B dark grey matt ugl. FS R10/B`, true, false, 6, 'material'),
            createProduct('1054265', 'material', 'material-sub', `V&B 5x 10 2037BU9M8 Cadiz Mosaik ash grey ugl. FS R10/B rekt.`, '1054265', 298.67, 'qm', `V&B 5x 10 2037BU9M8 Cadiz Mosaik ash grey ugl. FS R10/B rekt.`, true, false, 3, 'material'),
            createProduct('uv867-00298', 'material', 'material-sub', `Ottoseal S 110 Premium Neutral Silicon`, 'uv867-00298', 8.79, 'Stk', `Ottoseal S 110 Premium Neutral Silicon`, true, false, 10, 'material'),
            createProduct('uv519-00256', 'material', 'material-sub', `PCI Nanofug Variabler Flexfugenmörtel`, 'uv519-00256', 58.65, 'Sack', `PCI Nanofug Variabler Flexfugenmörtel`, true, false, 2, 'material'),
            createProduct('uv519-00143', 'material', 'material-sub', `PCI Flexmörtel Verformungsfähiger Fliesenkleber`, 'uv519-00143', 53.75, 'Sack', `PCI Flexmörtel Verformungsfähiger Fliesenkleber`, true, false, 6, 'material'),
            createProduct('uv608-6903', 'material', 'material-sub', `Schlüter FINEC Dekorprofil Eckenset`, 'uv608-6903', 32.51, 'Stk', `Schlüter FINEC Dekorprofil Eckenset`, true, false, 2, 'material'),
            createProduct('starck3vwwc', 'material', 'material-sub', `Wand-Tiefspül-WC Vital Starck 3 Ausladung 700mm weiss Duravit`, 'STARCK3VWWC', 710.82, 'Stk', `Wand-Tiefspül-WC Vital Starck 3 Ausladung 700mm weiss Duravit`, true, false, 1, 'material'),
            createProduct('starck3sr', 'material', 'material-sub', `WC-Sitzring Starck 3 Vital Duravit m.Winkelpuffern Scharniere edelstahl we`, 'STARCK3SR', 117.32, 'Stk', `WC-Sitzring Starck 3 Vital Duravit m.Winkelpuffern Scharniere edelstahl we`, true, false, 1, 'material'),
            createProduct('starck3sies', 'material', 'material-sub', `WC-Sitz Starck 3 Vital mit Deckel weiss Scharniere edelstahl Duravit`, 'STARCK3SIES', 158.4, 'Stk', `WC-Sitz Starck 3 Vital mit Deckel weiss Scharniere edelstahl Duravit`, true, false, 1, 'material'),
            createProduct('skg600resm', 'material', 'material-sub', `Stützklappgriff 600mm re Edelstahl fein matt`, 'SKG600RESM', 614, 'Stk', `Stützklappgriff 600mm re Edelstahl fein matt`, true, false, 1, 'material'),
            createProduct('vita65n', 'material', 'material-sub', `Waschtisch Vitalis barrierefrei 65x60cm m.Hahnloch m.Überlauf weiss Geberit`, 'VITA65N', 557.37, 'Stk', `Waschtisch Vitalis barrierefrei 65x60cm m.Hahnloch m.Überlauf weiss Geberit`, true, false, 1, 'material'),
            createProduct('upsfs', 'material', 'material-sub', `GE WT UP-Siphon mit Fertigbauset, Sieb- ventil und Standrohr, Abgang horizontal`, 'UPSFS', 137.61, 'Stk', `GE WT UP-Siphon mit Fertigbauset, Sieb- ventil und Standrohr, Abgang horizontal`, true, false, 1, 'material'),
            createProduct('aquaf5ev1001', 'material', 'material-sub', `Standventil F5E DN15 Ausladung 125mm messing verchromt Franke`, 'AQUAF5EV1001', 443.52, 'Stk', `Standventil F5E DN15 Ausladung 125mm messing verchromt Franke`, true, false, 1, 'material'),
            createProduct('euphdsee260', 'material', 'material-sub', `Duschsystem Euphoria 260 mit Einhandmischer 9,5l/min chrom Grohe`, 'EUPHDSEE260', 608.85, 'Stk', `Duschsystem Euphoria 260 mit Einhandmischer 9,5l/min chrom Grohe`, true, false, 1, 'material')
          ]
        }
      ]
    },
    {
      id: 'optionale-positionen',
      title: 'Optionale Positionen',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'optionale-positionen-sub',
          title: 'Leistungen & Materialien',
          type: 'optional',
          products: [
            createProduct('wass-100-au', 'optionale-positionen', 'optionale-positionen-sub', `WEITERES zu WASSERINSTALLATION - (Klick Grünes-Symbol)`, 'WASS-100-AU', 0, 'Stk', `WEITERES zu WASSERINSTALLATION - (Klick Grünes-Symbol)`, true, true, 1, 'optional'),
            createProduct('hewiksiw448', 'optionale-positionen', 'optionale-positionen-sub', `Klappsitz Hewi 448x428mm reinweiss m.Wandplatten o.Befestigung`, 'HEWIKSIW448', 676.17, 'Stk', `Klappsitz Hewi 448x428mm reinweiss m.Wandplatten o.Befestigung`, true, true, 1, 'optional'),
            createProduct('hewiwig600', 'optionale-positionen', 'optionale-positionen-sub', `Winkelgriff Hewi 600x300mm reinweiss`, 'HEWIWIG600', 255.42, 'Stk', `Winkelgriff Hewi 600x300mm reinweiss`, true, true, 1, 'optional'),
            createProduct('strahyr', 'optionale-positionen', 'optionale-positionen-sub', `AP-Hygienebeutelspender Stratos m.runder Öffnung Edelstahl matt Franke`, 'STRAHYR', 112.86, 'Stk', `AP-Hygienebeutelspender Stratos m.runder Öffnung Edelstahl matt Franke`, true, true, 1, 'optional'),
            createProduct('santralabh18', 'optionale-positionen', 'optionale-positionen-sub', `Abfallbox SanTral 18 Liter m.Beutelhalt. Edelstahl Ophardt`, 'SANTRALABH18', 312.84, 'Stk', `Abfallbox SanTral 18 Liter m.Beutelhalt. Edelstahl Ophardt`, true, true, 1, 'optional'),
            createProduct('codessp50', 'optionale-positionen', 'optionale-positionen-sub', `Spender berührungsfrei weiss für Desinfektionsmittel 0,5 l Conti`, 'CODESSP50', 146.52, 'Stk', `Spender berührungsfrei weiss für Desinfektionsmittel 0,5 l Conti`, true, true, 1, 'optional'),
            createProduct('cwsssppas', 'optionale-positionen', 'optionale-positionen-sub', `Seifensch.-Spend.CWS ParadiseAntib.Slim m.Panel weiss f.500ml Flaschen m.Schloss`, 'CWSSSPPAS', 165.83, 'Stk', `Seifensch.-Spend.CWS ParadiseAntib.Slim m.Panel weiss f.500ml Flaschen m.Schloss`, true, true, 1, 'optional')
          ]
        }
      ]
    },
    {
      id: 'heizkoerper-basis-haus',
      title: 'HEIZKÖRPER | Basis-Haus',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'heizkoerper-basis-haus-sub',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('heiz-101-mon', 'heizkoerper-basis-haus', 'heizkoerper-basis-haus-sub', `HEIZKÖRPER | 🛠 Montage`, 'HEIZ-101-MON', 149, 'Stk', `🛠 Montage`, true, false, 1, 'service'),
            createProduct('heiz-301-mat', 'heizkoerper-basis-haus', 'heizkoerper-basis-haus-sub', `HEIZSTRÄNGE bis max. 5 m | 🛠 Montage-Leistungspaket`, 'HEIZ-301-MAT', 434.56, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'service'),
            createProduct('heiz-201-1-op', 'heizkoerper-basis-haus', 'heizkoerper-basis-haus-sub', `HEIZKÖRPER |🛠 Demontage & Entsorgung`, 'HEIZ-201-1-OP', 67.13, 'Stk', `🛠 Demontage & Entsorgung`, true, false, 1, 'service')
          ]
        }
      ]
    },
    {
      id: 'fliesen-badezimmer',
      title: 'FLIESEN BADEZIMMER',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'fliesen-badezimmer-sub',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('bade-100-basis', 'fliesen-badezimmer', 'fliesen-badezimmer-sub', `FLIESEN - BAD | 🛠 Montage-Leistungspaket`, 'BADE-100-BASIS', 5995, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'service')
          ]
        }
      ]
    },
    {
      id: 'sanitaer-badezimmer',
      title: 'SANITÄR BADEZIMMER',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'sanitaer-badezimmer-sub',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('bade-500-basis', 'sanitaer-badezimmer', 'sanitaer-badezimmer-sub', `SANITÄR - BAD | Montage-Leistungspaket`, 'BADE-500-BASIS', 1995, 'Stk', `Montage-Leistungspaket`, true, false, 1, 'service')
          ]
        }
      ]
    }
  ]
};
