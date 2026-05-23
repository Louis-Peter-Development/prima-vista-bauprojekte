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
    scalable: unit.toLowerCase().includes('qm') || unit.toLowerCase().includes('lfm'),
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
      id: 'wasserinstallation-badezimmer',
      title: 'WASSERINSTALLATION BADEZIMMER',
      lead: 'Zusammenstellung der Positionen',
      subsections: [
        {
          id: 'basis',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('wass-100-basis', 'wasserinstallation-badezimmer', 'basis', 'WASSERINSTALLATION BADEZIMMER | 🛠 Montage-Leistungspaket', 'WASS-100-BASIS', 1995.9, 'Stück', '', true, false, 1, 'service'),
          ]
        }
      ]
    },
    {
      id: 'wasserinstallation-g-ste-wc',
      title: 'WASSERINSTALLATION GÄSTE-WC',
      lead: 'Zusammenstellung der Positionen',
      subsections: [
        {
          id: 'basis',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('wass-200-basis', 'wasserinstallation-g-ste-wc', 'basis', 'WASSERINSTALLATION GÄSTE-WC | 🛠 Montage-Leistungspaket', 'WASS-200-BASIS', 1195.9, 'Stück', '', true, false, 1, 'service'),
          ]
        }
      ]
    },
    {
      id: 'allgemein',
      title: 'Allgemein',
      lead: 'Zusammenstellung der Positionen',
      subsections: [
        {
          id: 'basis',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('wass-105-zu', 'allgemein', 'basis', 'WASCHMASCHINEN ANSCHLUSS | 🛠 Zusatz-Montage', 'WASS-105-ZU', 355.36, 'Stück', '', true, false, 1, 'service'),
            createProduct('wass-101-mon', 'allgemein', 'basis', 'VORSATZ-ELEMENT | 🛠 Montage', 'WASS-101-MON', 279, 'Stk', '', true, false, 1, 'service'),
            createProduct('cvis3wt112', 'allgemein', 'basis', 'VIS Waschtisch-Montageelement | CONEL VIS Waschtisch-Montage', 'CVIS3WT112', 203.94, 'Stück', '', true, false, 1, 'service'),
            createProduct('dfix320wc112', 'allgemein', 'basis', 'Montageelement für Wand-WC, mit UP-Spülkasten Sigma 12 cm |', 'DFIX320WC112', 390.06, 'Stück', '', true, false, 1, 'service'),
            createProduct('sigma30wech', 'allgemein', 'basis', 'Abdeckplatte Sigma30 weiß/hgl.verchr. f.2-Mengen-Spülung, für UP-Spülkästen GE', 'SIGMA30WECH', 101.5, 'Stück', '', true, false, 1, 'service'),
            createProduct('heiz-201-1-op', 'allgemein', 'basis', 'HEIZKÖRPER |🛠 Demontage & Entsorgung', 'HEIZ-201-1-OP', 67.13, 'Stück', '', true, false, 1, 'service'),
            createProduct('heiz-101-mon', 'allgemein', 'basis', 'HEIZKÖRPER | 🛠 Montage', 'HEIZ-101-MON', 149, 'Stk', '', true, false, 1, 'service'),
            createProduct('uv835-10017', 'allgemein', 'basis', 'Ximax Badheizkörper BIANCA - weiß', 'uv835-10017', 388.95, 'Stk', '', true, false, 1, 'service'),
            createProduct('vede218b', 'allgemein', 'basis', 'Durchlauferhitzer Vaillant VED E 21/8 B 21KW elektronisch gesteuert weiss', 'VEDE218B', 373.23, 'Stück', '', true, false, 1, 'service'),
            createProduct('uv816-00746', 'allgemein', 'basis', 'Gutjahr IndorTec THERM-E Komplettset TD 3-in-1 Elektro-Flächenheizung', 'uv816-00746', 395.95, 'Stk', '', true, false, 1, 'service'),
            createProduct('1168296', 'allgemein', 'basis', 'V&B 30x 60 1571TW010 Unit Two weiß matt', '1168296', 30.22, 'qm', '', true, false, 1, 'service'),
            createProduct('1176157', 'allgemein', 'basis', 'V&B 30x 60 2341BP900 Daytona !B dark grey matt ugl. FS R10/B', '1176157', 30.22, 'qm', '', true, false, 1, 'service'),
            createProduct('1054265', 'allgemein', 'basis', 'V&B 5x 10 2037BU9M8 Cadiz Mosaik ash grey ugl. FS R10/B rekt.', '1054265', 298.67, 'qm', '', true, false, 1, 'service'),
            createProduct('uv867-00298', 'allgemein', 'basis', 'Ottoseal S 110 Premium Neutral Silicon', 'uv867-00298', 8.79, 'Stk', '', true, false, 1, 'service'),
            createProduct('uv519-00256', 'allgemein', 'basis', 'PCI Nanofug Variabler Flexfugenmörtel', 'uv519-00256', 58.65, 'Sack', '', true, false, 1, 'service'),
            createProduct('uv519-00143', 'allgemein', 'basis', 'PCI Flexmörtel Verformungsfähiger Fliesenkleber', 'uv519-00143', 53.75, 'Sack', '', true, false, 1, 'service'),
            createProduct('uv608-6903', 'allgemein', 'basis', 'Schlüter FINEC Dekorprofil Eckenset', 'uv608-6903', 32.51, 'Stk', '', true, false, 1, 'service'),
            createProduct('dewwc', 'allgemein', 'basis', 'Wand-Tiefspül-WC derby sichtbare Befestigung weiss VIGOUR', 'DEWWC', 191.57, 'Stück', '', true, false, 1, 'service'),
            createProduct('desias', 'allgemein', 'basis', 'WC-Sitz derby Edelstahlscharnier abnehmbar mit Absenkautomatik weiss VIG.', 'DESIAS', 115.34, 'Stück', '', true, false, 1, 'service'),
            createProduct('des60p', 'allgemein', 'basis', 'Waschtisch derby style 60x48cm weiss PflegePLUS VIGOUR', 'DES60P', 191.57, 'Stück', '', true, false, 1, 'service'),
            createProduct('des', 'allgemein', 'basis', 'Einhand-Waschtischbatterie derby style mit Ablaufgarnitur verchromt VIGOUR', 'DES', 152.96, 'Stück', '', true, false, 1, 'service'),
            createProduct('desm180p', 'allgemein', 'basis', 'Badewanne Stahl derby 180x80cm weiss Ab-/Überlauf mittig Pflegeplus VIGOUR', 'DESM180P', 1039.5, 'Stück', '', true, false, 1, 'service'),
            createProduct('depghw', 'allgemein', 'basis', 'Einhand-AP-Badebatterie derby plus mit Hebel geschl. o. Brausegarn. verchr. VIG', 'DEPGHW', 233.64, 'Stück', '', true, false, 1, 'service'),
            createProduct('cls90ef', 'allgemein', 'basis', 'Duschwanne Stahl clivia 90x90x3.2cm weiss VIGOUR', 'CLS90EF', 297.99, 'Stück', '', true, false, 1, 'service'),
            createProduct('euphdsee260', 'allgemein', 'basis', 'Duschsystem Euphoria 260 mit Einhandmischer 9,5l/min chrom Grohe', 'EUPHDSEE260', 608.85, 'Stück', '', true, false, 1, 'service'),
            createProduct('v2ge90l', 'allgemein', 'basis', 'Gleittür Eckhälfte 2.0 links 900x1950mm silber matt ESG klar VIGOUR', 'V2GE90L', 569.25, 'Stk', '', true, false, 1, 'service'),
            createProduct('v2ge90r', 'allgemein', 'basis', 'Gleittür Eckhälfte 2.0 rechts 900x1950mm silber matt ESG klar VIGOUR', 'V2GE90R', 569.25, 'Stk', '', true, false, 1, 'service'),
            createProduct('1168296', 'allgemein', 'basis', 'V&B 30x 60 1571TW010 Unit Two weiß matt', '1168296', 30.22, 'qm', '', true, false, 1, 'service'),
            createProduct('1176157', 'allgemein', 'basis', 'V&B 30x 60 2341BP900 Daytona !B dark grey matt ugl. FS R10/B', '1176157', 30.22, 'qm', '', true, false, 1, 'service'),
            createProduct('dewwc', 'allgemein', 'basis', 'Wand-Tiefspül-WC derby sichtbare Befestigung weiss VIGOUR', 'DEWWC', 191.57, 'Stück', '', true, false, 1, 'service'),
            createProduct('desias', 'allgemein', 'basis', 'WC-Sitz derby Edelstahlscharnier abnehmbar mit Absenkautomatik weiss VIG.', 'DESIAS', 115.34, 'Stück', '', true, false, 1, 'service'),
            createProduct('desp45ohp', 'allgemein', 'basis', 'Handwaschb.derby style plus 45x35cm ohne HL mit ÜL weiss PflegePLUS VIGOUR', 'DESP45OHP', 201.96, 'Stück', '', true, false, 1, 'service'),
            createProduct('des', 'allgemein', 'basis', 'Einhand-Waschtischbatterie derby style mit Ablaufgarnitur verchromt VIGOUR', 'DES', 152.96, 'Stück', '', true, false, 1, 'service'),
            createProduct('strahyr', 'allgemein', 'basis', 'AP-Hygienebeutelspender Stratos m.runder Öffnung Edelstahl matt Franke', 'STRAHYR', 112.86, 'Stück', '', true, false, 1, 'service'),
            createProduct('santralabh18', 'allgemein', 'basis', 'Abfallbox SanTral 18 Liter m.Beutelhalt. Edelstahl Ophardt', 'SANTRALABH18', 312.84, 'Stück', '', true, false, 1, 'service'),
            createProduct('codessp50', 'allgemein', 'basis', 'Spender berührungsfrei weiss für Desinfektionsmittel 0,5 l Conti', 'CODESSP50', 146.52, 'Stück', '', true, false, 1, 'service'),
            createProduct('cwsssppas', 'allgemein', 'basis', 'Seifensch.-Spend.CWS ParadiseAntib.Slim m.Panel weiss f.500ml Flaschen m.Schloss', 'CWSSSPPAS', 165.83, 'Stück', '', true, false, 1, 'service'),
            createProduct('hewiksiw448', 'allgemein', 'basis', 'Klappsitz Hewi 448x428mm reinweiss m.Wandplatten o.Befestigung', 'HEWIKSIW448', 676.17, 'Stück', '', true, false, 1, 'service'),
            createProduct('hewiwig600', 'allgemein', 'basis', 'Winkelgriff Hewi 600x300mm reinweiss', 'HEWIWIG600', 255.42, 'Stück', '', true, false, 1, 'service'),
            createProduct('wass-101-mon', 'allgemein', 'basis', 'VORSATZ-ELEMENT | 🛠 Montage', 'WASS-101-MON', 279, 'Stk', '', true, false, 1, 'service'),
            createProduct('deu', 'allgemein', 'basis', 'Urinal derby Zulauf verdeckt inkl.Befestigungssatz weiss VIGOUR', 'DEU', 244.53, 'Stück', '', true, false, 1, 'service'),
            createProduct('desudas', 'allgemein', 'basis', 'Urinaldeckel derby style abnehmbar Edelstahlscharn. Absenkautom. weiss VIG.', 'DESUDAS', 134.64, 'Stück', '', true, false, 1, 'service'),
            createProduct('v1deeu', 'allgemein', 'basis', 'Urinal-Betätigungsplatte DEE Kunststoff weiss VIGOUR', 'V1DEEU', 145.04, 'Stück', '', true, false, 1, 'service'),
            createProduct('schall', 'allgemein', 'basis', 'Montageset f. Wand-WC/WD-Bidet m.geringem Schallschutz TRINNITY', 'SCHALL', 6.53, 'Stück', '', true, false, 1, 'service'),
            createProduct('cvis3u112', 'allgemein', 'basis', 'VIS Urinal-Montageelement | CONEL VIS Bidet- und Urinal-Mont', 'CVIS3U112', 401.94, 'Stück', '', true, false, 1, 'service'),
            createProduct('whitewbdp', 'allgemein', 'basis', 'VIGOUR Wandbidet white | Bidet-Becken', 'WHITEWBDP', 425.7, 'Stück', '', true, false, 1, 'service'),
            createProduct('upbd', 'allgemein', 'basis', 'Einhand-Bidetbatterie Up m.Ablaufgarnitur verchromt Nobili', 'UPBD', 214.83, 'Stück', '', true, false, 1, 'service'),
            createProduct('schall', 'allgemein', 'basis', 'Montageset f. Wand-WC/WD-Bidet m.geringem Schallschutz TRINNITY', 'SCHALL', 6.53, 'Stück', '', true, false, 1, 'service'),
            createProduct('tragwc', 'allgemein', 'basis', 'Tragegestell, für alle wandhängenden WCs und Bidets | Ergänz', 'TRAGWC', 50, 'Stück', '', true, false, 1, 'service'),
            createProduct('uv754-11104', 'allgemein', 'basis', 'Finnhaus Wolff Innensauna Basic Zino - 193x193 cm', 'uv754-11104', 1890.85, 'Stk', '', true, false, 1, 'service'),
            createProduct('754-11229', 'allgemein', 'basis', 'Finnhaus Wolff Saunahaus Selina 2424 - 238x238 cm', '754-11229', 4999.5, 'Stk', '', true, false, 1, 'service'),
            createProduct('uv886-10216', 'allgemein', 'basis', 'Eliga Elektro-Saunaofen mit Verdampfer Wandgerät', 'uv886-10216', 1366.27, 'Stk', '', true, false, 1, 'service'),
            createProduct('886-10353', 'allgemein', 'basis', 'Eliga Sauna-Zubehör-Set 9-teilig All-in', '886-10353', 143.18, 'Stk', '', true, false, 1, 'service'),
            createProduct('886-10315', 'allgemein', 'basis', 'Eliga Leuchte für Dampfbad und Sauna', '886-10315', 121.09, 'Stk', '', true, false, 1, 'service'),
            createProduct('728-00476', 'allgemein', 'basis', 'Weka Spezial-Sauna-Leuchten-Set', '728-00476', 61.27, 'Stk', '', true, false, 1, 'service'),
            createProduct('886-10479', 'allgemein', 'basis', 'Eliga Sauna Messstation', '886-10479', 48.28, 'Stk', '', true, false, 1, 'service'),
            createProduct('uv886-10081', 'allgemein', 'basis', 'Eliga Sauna-Aufgusskonzentrat', 'uv886-10081', 12.28, 'Stk', '', true, false, 1, 'service'),
          ]
        }
      ]
    },
    {
      id: 'ebenerdigen-duschbereich-herstellen-befliesen',
      title: 'Ebenerdigen Duschbereich herstellen & befliesen',
      lead: 'Zusammenstellung der Positionen',
      subsections: [
        {
          id: 'basis',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('bade-507-4-mat', 'ebenerdigen-duschbereich-herstellen-befliesen', 'basis', 'Ebenerdigen Duschbereich herstellen & befliesen | 🛠 Montage-Leistungspaket', 'BADE-507.4-MAT', 1579.9, 'Stück', '', true, false, 1, 'service'),
            createProduct('bade-507-4-mat', 'ebenerdigen-duschbereich-herstellen-befliesen', 'basis', 'Ebenerdigen Duschbereich herstellen & befliesen | 🛠 Montage-Leistungspaket', 'BADE-507.4-MAT', 1579.9, 'Stück', '', true, false, 1, 'service'),
          ]
        }
      ]
    },
    {
      id: 'heizstr-nge-bis-max-5-m',
      title: 'HEIZSTRÄNGE bis max. 5 m',
      lead: 'Zusammenstellung der Positionen',
      subsections: [
        {
          id: 'basis',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('heiz-301-mat', 'heizstr-nge-bis-max-5-m', 'basis', 'HEIZSTRÄNGE bis max. 5 m | 🛠 Montage-Leistungspaket', 'HEIZ-301-MAT', 434.56, 'Stück', '', true, false, 1, 'service'),
          ]
        }
      ]
    },
    {
      id: 'fliesen-bad',
      title: 'FLIESEN - BAD',
      lead: 'Zusammenstellung der Positionen',
      subsections: [
        {
          id: 'basis',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('bade-100-basis', 'fliesen-bad', 'basis', 'FLIESEN - BAD | 🛠 Montage-Leistungspaket', 'BADE-100-BASIS', 5995, 'Stück', '', true, false, 1, 'service'),
          ]
        }
      ]
    },
    {
      id: 'sanit-r-bad',
      title: 'SANITÄR - BAD',
      lead: 'Zusammenstellung der Positionen',
      subsections: [
        {
          id: 'basis',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('bade-500-basis', 'sanit-r-bad', 'basis', 'SANITÄR - BAD | Montage-Leistungspaket', 'BADE-500-BASIS', 1995, 'Stück', '', true, false, 1, 'service'),
          ]
        }
      ]
    },
    {
      id: 'fliesen-g-ste-wc',
      title: 'FLIESEN - GÄSTE WC',
      lead: 'Zusammenstellung der Positionen',
      subsections: [
        {
          id: 'basis',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('gawc-100-basis', 'fliesen-g-ste-wc', 'basis', 'FLIESEN - GÄSTE WC | 🛠 Montage-Leistungspaket', 'GAWC-100-BASIS', 2470.9, 'Stück', '', true, false, 1, 'service'),
          ]
        }
      ]
    },
    {
      id: 'sanit-r-g-ste-wc',
      title: 'SANITÄR - GÄSTE WC',
      lead: 'Zusammenstellung der Positionen',
      subsections: [
        {
          id: 'basis',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('gawc-500-basis', 'sanit-r-g-ste-wc', 'basis', 'SANITÄR - GÄSTE WC | 🛠 Montage-Leistungspaket', 'GAWC-500-BASIS', 1183.9, 'Stück', '', true, false, 1, 'service'),
          ]
        }
      ]
    },
    {
      id: 'urianal',
      title: 'URIANAL',
      lead: 'Zusammenstellung der Positionen',
      subsections: [
        {
          id: 'basis',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('bade-10001-basis', 'urianal', 'basis', 'URIANAL | 🛠 Montage-Leistungspaket', 'BADE-10001-Basis', 395, 'Stk', '', true, false, 1, 'service'),
          ]
        }
      ]
    },
    {
      id: 'bidet',
      title: 'BIDET',
      lead: 'Zusammenstellung der Positionen',
      subsections: [
        {
          id: 'basis',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('bade-10003-basis', 'bidet', 'basis', 'BIDET | 🛠 Montage-Leistungspaket', 'BADE-10003-Basis', 395, 'Stk', '', true, false, 1, 'service'),
          ]
        }
      ]
    },
    {
      id: 'sauna',
      title: 'SAUNA',
      lead: 'Zusammenstellung der Positionen',
      subsections: [
        {
          id: 'basis',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('bade-10002-basis', 'sauna', 'basis', 'SAUNA | Montage | 🛠 Montage-Leistungspaket', 'BADE-10002-Basis', 4990, 'Stk', '', true, false, 1, 'service'),
          ]
        }
      ]
    },
  ]
};

export const packageBadKomplett: RenovationPackage = {
  id: 'badKomplett',
  title: 'Komplettbad Wanne & Dusche',
  defaultArea: 6,
  defaultFloorCount: 1,
  categories: [
    {
      id: 'wasserinstallation-badezimmer',
      title: 'WASSERINSTALLATION BADEZIMMER',
      lead: 'Zusammenstellung der Positionen',
      subsections: [
        {
          id: 'basis',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('wass-100-basis', 'wasserinstallation-badezimmer', 'basis', 'WASSERINSTALLATION BADEZIMMER | 🛠 Montage-Leistungspaket', 'WASS-100-BASIS', 1995.9, 'Stück', '', true, false, 1, 'service'),
          ]
        }
      ]
    },
    {
      id: 'allgemein',
      title: 'Allgemein',
      lead: 'Zusammenstellung der Positionen',
      subsections: [
        {
          id: 'basis',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('wass-105-zu', 'allgemein', 'basis', 'WASCHMASCHINEN ANSCHLUSS | 🛠 Zusatz-Montage', 'WASS-105-ZU', 355.36, 'Stück', '', true, false, 1, 'service'),
            createProduct('wass-101-mon', 'allgemein', 'basis', 'VORSATZ-ELEMENT | 🛠 Montage', 'WASS-101-MON', 279, 'Stk', '', true, false, 2, 'service'),
            createProduct('cvis3wt112', 'allgemein', 'basis', 'VIS Waschtisch-Montageelement | CONEL VIS Waschtisch-Montage', 'CVIS3WT112', 203.94, 'Stück', '', true, false, 1, 'service'),
            createProduct('dfix320wc112', 'allgemein', 'basis', 'Montageelement für Wand-WC, mit UP-Spülkasten Sigma 12 cm |', 'DFIX320WC112', 390.06, 'Stück', '', true, false, 1, 'service'),
            createProduct('sigma30wech', 'allgemein', 'basis', 'Abdeckplatte Sigma30 weiß/hgl.verchr. f.2-Mengen-Spülung, für UP-Spülkästen GE', 'SIGMA30WECH', 101.5, 'Stück', '', true, false, 1, 'service'),
            createProduct('heiz-201-1-op', 'allgemein', 'basis', 'HEIZKÖRPER |🛠 Demontage & Entsorgung', 'HEIZ-201-1-OP', 67.13, 'Stück', '', true, false, 1, 'service'),
            createProduct('heiz-101-mon', 'allgemein', 'basis', 'HEIZKÖRPER | 🛠 Montage', 'HEIZ-101-MON', 149, 'Stk', '', true, false, 1, 'service'),
            createProduct('uv835-10017', 'allgemein', 'basis', 'Ximax Badheizkörper BIANCA - weiß', 'uv835-10017', 388.95, 'Stk', '', true, false, 1, 'service'),
            createProduct('vede218b', 'allgemein', 'basis', 'Durchlauferhitzer Vaillant VED E 21/8 B 21KW elektronisch gesteuert weiss', 'VEDE218B', 373.23, 'Stück', '', true, false, 1, 'service'),
            createProduct('uv816-00746', 'allgemein', 'basis', 'Gutjahr IndorTec THERM-E Komplettset TD 3-in-1 Elektro-Flächenheizung', 'uv816-00746', 395.95, 'Stk', '', true, false, 1, 'service'),
            createProduct('1168296', 'allgemein', 'basis', 'V&B 30x 60 1571TW010 Unit Two weiß matt', '1168296', 30.22, 'qm', '', true, false, 18, 'service'),
            createProduct('1176157', 'allgemein', 'basis', 'V&B 30x 60 2341BP900 Daytona !B dark grey matt ugl. FS R10/B', '1176157', 30.22, 'qm', '', true, false, 6, 'service'),
            createProduct('1054265', 'allgemein', 'basis', 'V&B 5x 10 2037BU9M8 Cadiz Mosaik ash grey ugl. FS R10/B rekt.', '1054265', 298.67, 'qm', '', true, false, 3, 'service'),
            createProduct('uv867-00298', 'allgemein', 'basis', 'Ottoseal S 110 Premium Neutral Silicon', 'uv867-00298', 8.79, 'Stk', '', true, false, 10, 'service'),
            createProduct('uv519-00256', 'allgemein', 'basis', 'PCI Nanofug Variabler Flexfugenmörtel', 'uv519-00256', 58.65, 'Sack', '', true, false, 2, 'service'),
            createProduct('uv519-00143', 'allgemein', 'basis', 'PCI Flexmörtel Verformungsfähiger Fliesenkleber', 'uv519-00143', 53.75, 'Sack', '', true, false, 6, 'service'),
            createProduct('uv608-6903', 'allgemein', 'basis', 'Schlüter FINEC Dekorprofil Eckenset', 'uv608-6903', 32.51, 'Stk', '', true, false, 2, 'service'),
            createProduct('dewwc', 'allgemein', 'basis', 'Wand-Tiefspül-WC derby sichtbare Befestigung weiss VIGOUR', 'DEWWC', 191.57, 'Stück', '', true, false, 1, 'service'),
            createProduct('desias', 'allgemein', 'basis', 'WC-Sitz derby Edelstahlscharnier abnehmbar mit Absenkautomatik weiss VIG.', 'DESIAS', 115.34, 'Stück', '', true, false, 1, 'service'),
            createProduct('des60p', 'allgemein', 'basis', 'Waschtisch derby style 60x48cm weiss PflegePLUS VIGOUR', 'DES60P', 191.57, 'Stück', '', true, false, 1, 'service'),
            createProduct('des', 'allgemein', 'basis', 'Einhand-Waschtischbatterie derby style mit Ablaufgarnitur verchromt VIGOUR', 'DES', 152.96, 'Stück', '', true, false, 1, 'service'),
            createProduct('desm180p', 'allgemein', 'basis', 'Badewanne Stahl derby 180x80cm weiss Ab-/Überlauf mittig Pflegeplus VIGOUR', 'DESM180P', 1039.5, 'Stück', '', true, false, 1, 'service'),
            createProduct('depghw', 'allgemein', 'basis', 'Einhand-AP-Badebatterie derby plus mit Hebel geschl. o. Brausegarn. verchr. VIG', 'DEPGHW', 233.64, 'Stück', '', true, false, 1, 'service'),
            createProduct('cls90ef', 'allgemein', 'basis', 'Duschwanne Stahl clivia 90x90x3.2cm weiss VIGOUR', 'CLS90EF', 297.99, 'Stück', '', true, false, 1, 'service'),
            createProduct('euphdsee260', 'allgemein', 'basis', 'Duschsystem Euphoria 260 mit Einhandmischer 9,5l/min chrom Grohe', 'EUPHDSEE260', 608.85, 'Stück', '', true, false, 1, 'service'),
            createProduct('v2ge90l', 'allgemein', 'basis', 'Gleittür Eckhälfte 2.0 links 900x1950mm silber matt ESG klar VIGOUR', 'V2GE90L', 569.25, 'Stk', '', true, false, 1, 'service'),
            createProduct('v2ge90r', 'allgemein', 'basis', 'Gleittür Eckhälfte 2.0 rechts 900x1950mm silber matt ESG klar VIGOUR', 'V2GE90R', 569.25, 'Stk', '', true, false, 1, 'service'),
            createProduct('strahyr', 'allgemein', 'basis', 'AP-Hygienebeutelspender Stratos m.runder Öffnung Edelstahl matt Franke', 'STRAHYR', 112.86, 'Stück', '', true, false, 1, 'service'),
            createProduct('santralabh18', 'allgemein', 'basis', 'Abfallbox SanTral 18 Liter m.Beutelhalt. Edelstahl Ophardt', 'SANTRALABH18', 312.84, 'Stück', '', true, false, 1, 'service'),
            createProduct('codessp50', 'allgemein', 'basis', 'Spender berührungsfrei weiss für Desinfektionsmittel 0,5 l Conti', 'CODESSP50', 146.52, 'Stück', '', true, false, 1, 'service'),
            createProduct('cwsssppas', 'allgemein', 'basis', 'Seifensch.-Spend.CWS ParadiseAntib.Slim m.Panel weiss f.500ml Flaschen m.Schloss', 'CWSSSPPAS', 165.83, 'Stück', '', true, false, 1, 'service'),
            createProduct('hewiksiw448', 'allgemein', 'basis', 'Klappsitz Hewi 448x428mm reinweiss m.Wandplatten o.Befestigung', 'HEWIKSIW448', 676.17, 'Stück', '', true, false, 1, 'service'),
            createProduct('hewiwig600', 'allgemein', 'basis', 'Winkelgriff Hewi 600x300mm reinweiss', 'HEWIWIG600', 255.42, 'Stück', '', true, false, 1, 'service'),
          ]
        }
      ]
    },
    {
      id: 'heizstr-nge-bis-max-5-m',
      title: 'HEIZSTRÄNGE bis max. 5 m',
      lead: 'Zusammenstellung der Positionen',
      subsections: [
        {
          id: 'basis',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('heiz-301-mat', 'heizstr-nge-bis-max-5-m', 'basis', 'HEIZSTRÄNGE bis max. 5 m | 🛠 Montage-Leistungspaket', 'HEIZ-301-MAT', 434.56, 'Stück', '', true, false, 1, 'service'),
          ]
        }
      ]
    },
    {
      id: 'fliesen-bad',
      title: 'FLIESEN - BAD',
      lead: 'Zusammenstellung der Positionen',
      subsections: [
        {
          id: 'basis',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('bade-100-basis', 'fliesen-bad', 'basis', 'FLIESEN - BAD | 🛠 Montage-Leistungspaket', 'BADE-100-BASIS', 5995, 'Stück', '', true, false, 1, 'service'),
          ]
        }
      ]
    },
    {
      id: 'sanit-r-bad',
      title: 'SANITÄR - BAD',
      lead: 'Zusammenstellung der Positionen',
      subsections: [
        {
          id: 'basis',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('bade-500-basis', 'sanit-r-bad', 'basis', 'SANITÄR - BAD | Montage-Leistungspaket', 'BADE-500-BASIS', 1995, 'Stück', '', true, false, 1, 'service'),
          ]
        }
      ]
    },
    {
      id: 'ebenerdigen-duschbereich-herstellen-befliesen',
      title: 'Ebenerdigen Duschbereich herstellen & befliesen',
      lead: 'Zusammenstellung der Positionen',
      subsections: [
        {
          id: 'basis',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('bade-507-4-mat', 'ebenerdigen-duschbereich-herstellen-befliesen', 'basis', 'Ebenerdigen Duschbereich herstellen & befliesen | 🛠 Montage-Leistungspaket', 'BADE-507.4-MAT', 1579.9, 'Stück', '', true, false, 1, 'service'),
          ]
        }
      ]
    },
  ]
};

export const packageBadWanne: RenovationPackage = {
  id: 'badWanne',
  title: 'Bad mit Wanne',
  defaultArea: 6,
  defaultFloorCount: 1,
  categories: [
    {
      id: 'wasserinstallation-badezimmer',
      title: 'WASSERINSTALLATION BADEZIMMER',
      lead: 'Zusammenstellung der Positionen',
      subsections: [
        {
          id: 'basis',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('wass-100-basis', 'wasserinstallation-badezimmer', 'basis', 'WASSERINSTALLATION BADEZIMMER | 🛠 Montage-Leistungspaket', 'WASS-100-BASIS', 1995.9, 'Stück', '', true, false, 1, 'service'),
          ]
        }
      ]
    },
    {
      id: 'allgemein',
      title: 'Allgemein',
      lead: 'Zusammenstellung der Positionen',
      subsections: [
        {
          id: 'basis',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('wass-105-zu', 'allgemein', 'basis', 'WASCHMASCHINEN ANSCHLUSS | 🛠 Zusatz-Montage', 'WASS-105-ZU', 355.36, 'Stück', '', true, false, 1, 'service'),
            createProduct('wass-101-mon', 'allgemein', 'basis', 'VORSATZ-ELEMENT | 🛠 Montage', 'WASS-101-MON', 279, 'Stk', '', true, false, 2, 'service'),
            createProduct('cvis3wt112', 'allgemein', 'basis', 'VIS Waschtisch-Montageelement | CONEL VIS Waschtisch-Montage', 'CVIS3WT112', 203.94, 'Stück', '', true, false, 1, 'service'),
            createProduct('dfix320wc112', 'allgemein', 'basis', 'Montageelement für Wand-WC, mit UP-Spülkasten Sigma 12 cm |', 'DFIX320WC112', 390.06, 'Stück', '', true, false, 1, 'service'),
            createProduct('sigma30wech', 'allgemein', 'basis', 'Abdeckplatte Sigma30 weiß/hgl.verchr. f.2-Mengen-Spülung, für UP-Spülkästen GE', 'SIGMA30WECH', 101.5, 'Stück', '', true, false, 1, 'service'),
            createProduct('heiz-201-1-op', 'allgemein', 'basis', 'HEIZKÖRPER |🛠 Demontage & Entsorgung', 'HEIZ-201-1-OP', 67.13, 'Stück', '', true, false, 1, 'service'),
            createProduct('heiz-101-mon', 'allgemein', 'basis', 'HEIZKÖRPER | 🛠 Montage', 'HEIZ-101-MON', 149, 'Stk', '', true, false, 1, 'service'),
            createProduct('heiz-201-1-op', 'allgemein', 'basis', 'HEIZKÖRPER |🛠 Demontage & Entsorgung', 'HEIZ-201-1-OP', 67.13, 'Stück', '', true, false, 1, 'service'),
            createProduct('uv835-10017', 'allgemein', 'basis', 'Ximax Badheizkörper BIANCA - weiß', 'uv835-10017', 388.95, 'Stk', '', true, false, 1, 'service'),
            createProduct('vede218b', 'allgemein', 'basis', 'Durchlauferhitzer Vaillant VED E 21/8 B 21KW elektronisch gesteuert weiss', 'VEDE218B', 373.23, 'Stück', '', true, false, 1, 'service'),
            createProduct('uv816-00746', 'allgemein', 'basis', 'Gutjahr IndorTec THERM-E Komplettset TD 3-in-1 Elektro-Flächenheizung', 'uv816-00746', 395.95, 'Stk', '', true, false, 1, 'service'),
            createProduct('1092361', 'allgemein', 'basis', 'V&B 30x 60 2576SD9B0 Hudson volcano matt ugl. FS R10/A rekt.', '1092361', 41.99, 'qm', '', true, false, 6, 'service'),
            createProduct('1054265', 'allgemein', 'basis', 'V&B 5x 10 2037BU9M8 Cadiz Mosaik ash grey ugl. FS R10/B rekt.', '1054265', 298.67, 'qm', '', true, false, 3, 'service'),
            createProduct('uv867-00298', 'allgemein', 'basis', 'Ottoseal S 110 Premium Neutral Silicon', 'uv867-00298', 8.79, 'Stk', '', true, false, 10, 'service'),
            createProduct('uv519-00256', 'allgemein', 'basis', 'PCI Nanofug Variabler Flexfugenmörtel', 'uv519-00256', 58.65, 'Sack', '', true, false, 2, 'service'),
            createProduct('uv519-00143', 'allgemein', 'basis', 'PCI Flexmörtel Verformungsfähiger Fliesenkleber', 'uv519-00143', 53.75, 'Sack', '', true, false, 6, 'service'),
            createProduct('uv608-6903', 'allgemein', 'basis', 'Schlüter FINEC Dekorprofil Eckenset', 'uv608-6903', 32.51, 'Stk', '', true, false, 2, 'service'),
            createProduct('dewwc', 'allgemein', 'basis', 'Wand-Tiefspül-WC derby sichtbare Befestigung weiss VIGOUR', 'DEWWC', 191.57, 'Stück', '', true, false, 1, 'service'),
            createProduct('desias', 'allgemein', 'basis', 'WC-Sitz derby Edelstahlscharnier abnehmbar mit Absenkautomatik weiss VIG.', 'DESIAS', 115.34, 'Stück', '', true, false, 1, 'service'),
            createProduct('des60p', 'allgemein', 'basis', 'Waschtisch derby style 60x48cm weiss PflegePLUS VIGOUR', 'DES60P', 191.57, 'Stück', '', true, false, 1, 'service'),
            createProduct('des', 'allgemein', 'basis', 'Einhand-Waschtischbatterie derby style mit Ablaufgarnitur verchromt VIGOUR', 'DES', 152.96, 'Stück', '', true, false, 1, 'service'),
            createProduct('desm180p', 'allgemein', 'basis', 'Badewanne Stahl derby 180x80cm weiss Ab-/Überlauf mittig Pflegeplus VIGOUR', 'DESM180P', 1039.5, 'Stück', '', true, false, 1, 'service'),
            createProduct('depghw', 'allgemein', 'basis', 'Einhand-AP-Badebatterie derby plus mit Hebel geschl. o. Brausegarn. verchr. VIG', 'DEPGHW', 233.64, 'Stück', '', true, false, 1, 'service'),
            createProduct('strahyr', 'allgemein', 'basis', 'AP-Hygienebeutelspender Stratos m.runder Öffnung Edelstahl matt Franke', 'STRAHYR', 112.86, 'Stück', '', true, false, 1, 'service'),
            createProduct('santralabh18', 'allgemein', 'basis', 'Abfallbox SanTral 18 Liter m.Beutelhalt. Edelstahl Ophardt', 'SANTRALABH18', 312.84, 'Stück', '', true, false, 1, 'service'),
            createProduct('codessp50', 'allgemein', 'basis', 'Spender berührungsfrei weiss für Desinfektionsmittel 0,5 l Conti', 'CODESSP50', 146.52, 'Stück', '', true, false, 1, 'service'),
            createProduct('cwsssppas', 'allgemein', 'basis', 'Seifensch.-Spend.CWS ParadiseAntib.Slim m.Panel weiss f.500ml Flaschen m.Schloss', 'CWSSSPPAS', 165.83, 'Stück', '', true, false, 1, 'service'),
            createProduct('hewiksiw448', 'allgemein', 'basis', 'Klappsitz Hewi 448x428mm reinweiss m.Wandplatten o.Befestigung', 'HEWIKSIW448', 676.17, 'Stück', '', true, false, 1, 'service'),
            createProduct('hewiwig600', 'allgemein', 'basis', 'Winkelgriff Hewi 600x300mm reinweiss', 'HEWIWIG600', 255.42, 'Stück', '', true, false, 1, 'service'),
          ]
        }
      ]
    },
    {
      id: 'heizstr-nge-bis-max-5-m',
      title: 'HEIZSTRÄNGE bis max. 5 m',
      lead: 'Zusammenstellung der Positionen',
      subsections: [
        {
          id: 'basis',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('heiz-301-mat', 'heizstr-nge-bis-max-5-m', 'basis', 'HEIZSTRÄNGE bis max. 5 m | 🛠 Montage-Leistungspaket', 'HEIZ-301-MAT', 434.56, 'Stück', '', true, false, 1, 'service'),
          ]
        }
      ]
    },
    {
      id: 'fliesen-bad',
      title: 'FLIESEN - BAD',
      lead: 'Zusammenstellung der Positionen',
      subsections: [
        {
          id: 'basis',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('bade-100-basis', 'fliesen-bad', 'basis', 'FLIESEN - BAD | 🛠 Montage-Leistungspaket', 'BADE-100-BASIS', 5995, 'Stück', '', true, false, 1, 'service'),
          ]
        }
      ]
    },
    {
      id: 'sanit-r-bad',
      title: 'SANITÄR - BAD',
      lead: 'Zusammenstellung der Positionen',
      subsections: [
        {
          id: 'basis',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('bade-500-basis', 'sanit-r-bad', 'basis', 'SANITÄR - BAD | Montage-Leistungspaket', 'BADE-500-BASIS', 1995, 'Stück', '', true, false, 1, 'service'),
          ]
        }
      ]
    },
  ]
};

export const packageBadDusche: RenovationPackage = {
  id: 'badDusche',
  title: 'Bad mit Dusche',
  defaultArea: 6,
  defaultFloorCount: 1,
  categories: [
    {
      id: 'wasserinstallation-badezimmer',
      title: 'WASSERINSTALLATION BADEZIMMER',
      lead: 'Zusammenstellung der Positionen',
      subsections: [
        {
          id: 'basis',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('wass-100-basis', 'wasserinstallation-badezimmer', 'basis', 'WASSERINSTALLATION BADEZIMMER | 🛠 Montage-Leistungspaket', 'WASS-100-BASIS', 1995.9, 'Stück', '', true, false, 1, 'service'),
          ]
        }
      ]
    },
    {
      id: 'wasserinstallation',
      title: 'WASSERINSTALLATION',
      lead: 'Zusammenstellung der Positionen',
      subsections: [
        {
          id: 'basis',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('wass-105-zu', 'wasserinstallation', 'basis', 'WASCHMASCHINEN ANSCHLUSS | 🛠 Zusatz-Montage', 'WASS-105-ZU', 355.36, 'Stück', '', true, false, 1, 'service'),
            createProduct('wass-101-mon', 'wasserinstallation', 'basis', 'VORSATZ-ELEMENT | 🛠 Montage', 'WASS-101-MON', 279, 'Stk', '', true, false, 2, 'service'),
          ]
        }
      ]
    },
    {
      id: 'ausstattung-optional',
      title: 'Ausstattung & Optional',
      lead: 'Zusammenstellung der Positionen',
      subsections: [
        {
          id: 'basis',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('cvis3wt112', 'ausstattung-optional', 'basis', 'VIS Waschtisch-Montageelement | CONEL VIS Waschtisch-Montage', 'CVIS3WT112', 203.94, 'Stück', '', true, false, 1, 'service'),
            createProduct('dfix320wc112', 'ausstattung-optional', 'basis', 'Montageelement für Wand-WC, mit UP-Spülkasten Sigma 12 cm |', 'DFIX320WC112', 390.06, 'Stück', '', true, false, 1, 'service'),
            createProduct('sigma30wech', 'ausstattung-optional', 'basis', 'Abdeckplatte Sigma30 weiß/hgl.verchr. f.2-Mengen-Spülung, für UP-Spülkästen GE', 'SIGMA30WECH', 101.5, 'Stück', '', true, false, 1, 'service'),
            createProduct('wass-100-au', 'ausstattung-optional', 'basis', 'WEITERES zu WASSERINSTALLATION - (Klick Grünes-Symbol)', 'WASS-100-AU', 0, 'Stk', '', true, false, 1, 'service'),
            createProduct('uv835-10017', 'ausstattung-optional', 'basis', 'Ximax Badheizkörper BIANCA - weiß', 'uv835-10017', 388.95, 'Stk', '', true, false, 1, 'service'),
            createProduct('vede218b', 'ausstattung-optional', 'basis', 'Durchlauferhitzer Vaillant VED E 21/8 B 21KW elektronisch gesteuert weiss', 'VEDE218B', 373.23, 'Stück', '', true, false, 1, 'service'),
            createProduct('uv816-00746', 'ausstattung-optional', 'basis', 'Gutjahr IndorTec THERM-E Komplettset TD 3-in-1 Elektro-Flächenheizung', 'uv816-00746', 395.95, 'Stk', '', true, false, 1, 'service'),
            createProduct('1168296', 'ausstattung-optional', 'basis', 'V&B 30x 60 1571TW010 Unit Two weiß matt', '1168296', 30.22, 'qm', '', true, false, 18, 'service'),
            createProduct('1176157', 'ausstattung-optional', 'basis', 'V&B 30x 60 2341BP900 Daytona !B dark grey matt ugl. FS R10/B', '1176157', 30.22, 'qm', '', true, false, 6, 'service'),
            createProduct('1054265', 'ausstattung-optional', 'basis', 'V&B 5x 10 2037BU9M8 Cadiz Mosaik ash grey ugl. FS R10/B rekt.', '1054265', 298.67, 'qm', '', true, false, 3, 'service'),
            createProduct('uv867-00298', 'ausstattung-optional', 'basis', 'Ottoseal S 110 Premium Neutral Silicon', 'uv867-00298', 8.79, 'Stk', '', true, false, 10, 'service'),
            createProduct('uv519-00256', 'ausstattung-optional', 'basis', 'PCI Nanofug Variabler Flexfugenmörtel', 'uv519-00256', 58.65, 'Sack', '', true, false, 2, 'service'),
            createProduct('uv519-00143', 'ausstattung-optional', 'basis', 'PCI Flexmörtel Verformungsfähiger Fliesenkleber', 'uv519-00143', 53.75, 'Sack', '', true, false, 6, 'service'),
            createProduct('uv608-6903', 'ausstattung-optional', 'basis', 'Schlüter FINEC Dekorprofil Eckenset', 'uv608-6903', 32.51, 'Stk', '', true, false, 2, 'service'),
            createProduct('dewwc', 'ausstattung-optional', 'basis', 'Wand-Tiefspül-WC derby sichtbare Befestigung weiss VIGOUR', 'DEWWC', 191.57, 'Stück', '', true, false, 1, 'service'),
            createProduct('desias', 'ausstattung-optional', 'basis', 'WC-Sitz derby Edelstahlscharnier abnehmbar mit Absenkautomatik weiss VIG.', 'DESIAS', 115.34, 'Stück', '', true, false, 1, 'service'),
            createProduct('des60p', 'ausstattung-optional', 'basis', 'Waschtisch derby style 60x48cm weiss PflegePLUS VIGOUR', 'DES60P', 191.57, 'Stück', '', true, false, 1, 'service'),
            createProduct('des', 'ausstattung-optional', 'basis', 'Einhand-Waschtischbatterie derby style mit Ablaufgarnitur verchromt VIGOUR', 'DES', 152.96, 'Stück', '', true, false, 1, 'service'),
            createProduct('desm180p', 'ausstattung-optional', 'basis', 'Badewanne Stahl derby 180x80cm weiss Ab-/Überlauf mittig Pflegeplus VIGOUR', 'DESM180P', 1039.5, 'Stück', '', true, false, 1, 'service'),
            createProduct('depghw', 'ausstattung-optional', 'basis', 'Einhand-AP-Badebatterie derby plus mit Hebel geschl. o. Brausegarn. verchr. VIG', 'DEPGHW', 233.64, 'Stück', '', true, false, 1, 'service'),
            createProduct('cls90ef', 'ausstattung-optional', 'basis', 'Duschwanne Stahl clivia 90x90x3.2cm weiss VIGOUR', 'CLS90EF', 297.99, 'Stück', '', true, false, 1, 'service'),
            createProduct('euphdsee260', 'ausstattung-optional', 'basis', 'Duschsystem Euphoria 260 mit Einhandmischer 9,5l/min chrom Grohe', 'EUPHDSEE260', 608.85, 'Stück', '', true, false, 1, 'service'),
            createProduct('v2ge90l', 'ausstattung-optional', 'basis', 'Gleittür Eckhälfte 2.0 links 900x1950mm silber matt ESG klar VIGOUR', 'V2GE90L', 569.25, 'Stk', '', true, false, 1, 'service'),
            createProduct('v2ge90r', 'ausstattung-optional', 'basis', 'Gleittür Eckhälfte 2.0 rechts 900x1950mm silber matt ESG klar VIGOUR', 'V2GE90R', 569.25, 'Stk', '', true, false, 1, 'service'),
            createProduct('strahyr', 'ausstattung-optional', 'basis', 'AP-Hygienebeutelspender Stratos m.runder Öffnung Edelstahl matt Franke', 'STRAHYR', 112.86, 'Stück', '', true, false, 1, 'service'),
            createProduct('santralabh18', 'ausstattung-optional', 'basis', 'Abfallbox SanTral 18 Liter m.Beutelhalt. Edelstahl Ophardt', 'SANTRALABH18', 312.84, 'Stück', '', true, false, 1, 'service'),
            createProduct('codessp50', 'ausstattung-optional', 'basis', 'Spender berührungsfrei weiss für Desinfektionsmittel 0,5 l Conti', 'CODESSP50', 146.52, 'Stück', '', true, false, 1, 'service'),
            createProduct('cwsssppas', 'ausstattung-optional', 'basis', 'Seifensch.-Spend.CWS ParadiseAntib.Slim m.Panel weiss f.500ml Flaschen m.Schloss', 'CWSSSPPAS', 165.83, 'Stück', '', true, false, 1, 'service'),
            createProduct('hewiksiw448', 'ausstattung-optional', 'basis', 'Klappsitz Hewi 448x428mm reinweiss m.Wandplatten o.Befestigung', 'HEWIKSIW448', 676.17, 'Stück', '', true, false, 1, 'service'),
            createProduct('hewiwig600', 'ausstattung-optional', 'basis', 'Winkelgriff Hewi 600x300mm reinweiss', 'HEWIWIG600', 255.42, 'Stück', '', true, false, 1, 'service'),
          ]
        }
      ]
    },
    {
      id: 'heizstr-nge-bis-max-5-m',
      title: 'HEIZSTRÄNGE bis max. 5 m',
      lead: 'Zusammenstellung der Positionen',
      subsections: [
        {
          id: 'basis',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('heiz-301-mat', 'heizstr-nge-bis-max-5-m', 'basis', 'HEIZSTRÄNGE bis max. 5 m | 🛠 Montage-Leistungspaket', 'HEIZ-301-MAT', 434.56, 'Stück', '', true, false, 1, 'service'),
          ]
        }
      ]
    },
    {
      id: 'heizk-rper',
      title: 'HEIZKÖRPER',
      lead: 'Zusammenstellung der Positionen',
      subsections: [
        {
          id: 'basis',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('heiz-201-1-op', 'heizk-rper', 'basis', 'HEIZKÖRPER |🛠 Demontage & Entsorgung', 'HEIZ-201-1-OP', 67.13, 'Stück', '', true, false, 1, 'service'),
            createProduct('heiz-101-mon', 'heizk-rper', 'basis', 'HEIZKÖRPER | 🛠 Montage', 'HEIZ-101-MON', 149, 'Stk', '', true, false, 1, 'service'),
          ]
        }
      ]
    },
    {
      id: 'fliesen-bad',
      title: 'FLIESEN - BAD',
      lead: 'Zusammenstellung der Positionen',
      subsections: [
        {
          id: 'basis',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('bade-100-basis', 'fliesen-bad', 'basis', 'FLIESEN - BAD | 🛠 Montage-Leistungspaket', 'BADE-100-BASIS', 5995, 'Stück', '', true, false, 1, 'service'),
          ]
        }
      ]
    },
    {
      id: 'sanit-r-bad',
      title: 'SANITÄR - BAD',
      lead: 'Zusammenstellung der Positionen',
      subsections: [
        {
          id: 'basis',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('bade-500-basis', 'sanit-r-bad', 'basis', 'SANITÄR - BAD | Montage-Leistungspaket', 'BADE-500-BASIS', 1995, 'Stück', '', true, false, 1, 'service'),
          ]
        }
      ]
    },
    {
      id: 'ebenerdigen-duschbereich-herstellen-befliesen',
      title: 'Ebenerdigen Duschbereich herstellen & befliesen',
      lead: 'Zusammenstellung der Positionen',
      subsections: [
        {
          id: 'basis',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('bade-507-4-mat', 'ebenerdigen-duschbereich-herstellen-befliesen', 'basis', 'Ebenerdigen Duschbereich herstellen & befliesen | 🛠 Montage-Leistungspaket', 'BADE-507.4-MAT', 1579.9, 'Stück', '', true, false, 1, 'service'),
          ]
        }
      ]
    },
  ]
};

export const packageBadWhirlpool: RenovationPackage = {
  id: 'badWhirlpool',
  title: 'Bad mit Whirlpool',
  defaultArea: 6,
  defaultFloorCount: 1,
  categories: [
    {
      id: 'wasserinstallation-badezimmer',
      title: 'WASSERINSTALLATION BADEZIMMER',
      lead: 'Zusammenstellung der Positionen',
      subsections: [
        {
          id: 'basis',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('wass-100-basis', 'wasserinstallation-badezimmer', 'basis', 'WASSERINSTALLATION BADEZIMMER | 🛠 Montage-Leistungspaket', 'WASS-100-BASIS', 1995.9, 'Stück', '', true, false, 1, 'service'),
          ]
        }
      ]
    },
    {
      id: 'wasserinstallation',
      title: 'WASSERINSTALLATION',
      lead: 'Zusammenstellung der Positionen',
      subsections: [
        {
          id: 'basis',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('wass-105-zu', 'wasserinstallation', 'basis', 'WASCHMASCHINEN ANSCHLUSS | 🛠 Zusatz-Montage', 'WASS-105-ZU', 355.36, 'Stück', '', true, false, 1, 'service'),
            createProduct('wass-101-mon', 'wasserinstallation', 'basis', 'VORSATZ-ELEMENT | 🛠 Montage', 'WASS-101-MON', 279, 'Stk', '', true, false, 2, 'service'),
          ]
        }
      ]
    },
    {
      id: 'ausstattung-optional',
      title: 'Ausstattung & Optional',
      lead: 'Zusammenstellung der Positionen',
      subsections: [
        {
          id: 'basis',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('cvis3wt112', 'ausstattung-optional', 'basis', 'VIS Waschtisch-Montageelement | CONEL VIS Waschtisch-Montage', 'CVIS3WT112', 203.94, 'Stück', '', true, false, 1, 'service'),
            createProduct('dfix320wc112', 'ausstattung-optional', 'basis', 'Montageelement für Wand-WC, mit UP-Spülkasten Sigma 12 cm |', 'DFIX320WC112', 390.06, 'Stück', '', true, false, 1, 'service'),
            createProduct('sigma30wech', 'ausstattung-optional', 'basis', 'Abdeckplatte Sigma30 weiß/hgl.verchr. f.2-Mengen-Spülung, für UP-Spülkästen GE', 'SIGMA30WECH', 101.5, 'Stück', '', true, false, 1, 'service'),
            createProduct('wass-100-au', 'ausstattung-optional', 'basis', 'WEITERES zu WASSERINSTALLATION - (Klick Grünes-Symbol)', 'WASS-100-AU', 0, 'Stk', '', true, false, 1, 'service'),
            createProduct('uv835-10017', 'ausstattung-optional', 'basis', 'Ximax Badheizkörper BIANCA - weiß', 'uv835-10017', 388.95, 'Stk', '', true, false, 1, 'service'),
            createProduct('vede218b', 'ausstattung-optional', 'basis', 'Durchlauferhitzer Vaillant VED E 21/8 B 21KW elektronisch gesteuert weiss', 'VEDE218B', 373.23, 'Stück', '', true, false, 1, 'service'),
            createProduct('uv816-00746', 'ausstattung-optional', 'basis', 'Gutjahr IndorTec THERM-E Komplettset TD 3-in-1 Elektro-Flächenheizung', 'uv816-00746', 395.95, 'Stk', '', true, false, 1, 'service'),
            createProduct('1092361', 'ausstattung-optional', 'basis', 'V&B 30x 60 2576SD9B0 Hudson volcano matt ugl. FS R10/A rekt.', '1092361', 41.99, 'qm', '', true, false, 6, 'service'),
            createProduct('1054265', 'ausstattung-optional', 'basis', 'V&B 5x 10 2037BU9M8 Cadiz Mosaik ash grey ugl. FS R10/B rekt.', '1054265', 298.67, 'qm', '', true, false, 3, 'service'),
            createProduct('uv867-00298', 'ausstattung-optional', 'basis', 'Ottoseal S 110 Premium Neutral Silicon', 'uv867-00298', 8.79, 'Stk', '', true, false, 10, 'service'),
            createProduct('uv519-00256', 'ausstattung-optional', 'basis', 'PCI Nanofug Variabler Flexfugenmörtel', 'uv519-00256', 58.65, 'Sack', '', true, false, 2, 'service'),
            createProduct('uv519-00143', 'ausstattung-optional', 'basis', 'PCI Flexmörtel Verformungsfähiger Fliesenkleber', 'uv519-00143', 53.75, 'Sack', '', true, false, 6, 'service'),
            createProduct('uv608-6903', 'ausstattung-optional', 'basis', 'Schlüter FINEC Dekorprofil Eckenset', 'uv608-6903', 32.51, 'Stk', '', true, false, 2, 'service'),
            createProduct('dewwc', 'ausstattung-optional', 'basis', 'Wand-Tiefspül-WC derby sichtbare Befestigung weiss VIGOUR', 'DEWWC', 191.57, 'Stück', '', true, false, 1, 'service'),
            createProduct('desias', 'ausstattung-optional', 'basis', 'WC-Sitz derby Edelstahlscharnier abnehmbar mit Absenkautomatik weiss VIG.', 'DESIAS', 115.34, 'Stück', '', true, false, 1, 'service'),
            createProduct('des60p', 'ausstattung-optional', 'basis', 'Waschtisch derby style 60x48cm weiss PflegePLUS VIGOUR', 'DES60P', 191.57, 'Stück', '', true, false, 1, 'service'),
            createProduct('des', 'ausstattung-optional', 'basis', 'Einhand-Waschtischbatterie derby style mit Ablaufgarnitur verchromt VIGOUR', 'DES', 152.96, 'Stück', '', true, false, 1, 'service'),
            createProduct('wlbasiceks', 'ausstattung-optional', 'basis', 'Whirl-Line Basic Eco Kombisystem Zum Einbau in bereitgestellt Acrylwanne', 'WLBASICEKS', 4830.21, 'Stück', '', true, false, 1, 'service'),
            createProduct('depghw', 'ausstattung-optional', 'basis', 'Einhand-AP-Badebatterie derby plus mit Hebel geschl. o. Brausegarn. verchr. VIG', 'DEPGHW', 233.64, 'Stück', '', true, false, 1, 'service'),
            createProduct('strahyr', 'ausstattung-optional', 'basis', 'AP-Hygienebeutelspender Stratos m.runder Öffnung Edelstahl matt Franke', 'STRAHYR', 112.86, 'Stück', '', true, false, 1, 'service'),
            createProduct('santralabh18', 'ausstattung-optional', 'basis', 'Abfallbox SanTral 18 Liter m.Beutelhalt. Edelstahl Ophardt', 'SANTRALABH18', 312.84, 'Stück', '', true, false, 1, 'service'),
            createProduct('codessp50', 'ausstattung-optional', 'basis', 'Spender berührungsfrei weiss für Desinfektionsmittel 0,5 l Conti', 'CODESSP50', 146.52, 'Stück', '', true, false, 1, 'service'),
            createProduct('cwsssppas', 'ausstattung-optional', 'basis', 'Seifensch.-Spend.CWS ParadiseAntib.Slim m.Panel weiss f.500ml Flaschen m.Schloss', 'CWSSSPPAS', 165.83, 'Stück', '', true, false, 1, 'service'),
            createProduct('hewiksiw448', 'ausstattung-optional', 'basis', 'Klappsitz Hewi 448x428mm reinweiss m.Wandplatten o.Befestigung', 'HEWIKSIW448', 676.17, 'Stück', '', true, false, 1, 'service'),
            createProduct('hewiwig600', 'ausstattung-optional', 'basis', 'Winkelgriff Hewi 600x300mm reinweiss', 'HEWIWIG600', 255.42, 'Stück', '', true, false, 1, 'service'),
          ]
        }
      ]
    },
    {
      id: 'heizstr-nge-bis-max-5-m',
      title: 'HEIZSTRÄNGE bis max. 5 m',
      lead: 'Zusammenstellung der Positionen',
      subsections: [
        {
          id: 'basis',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('heiz-301-mat', 'heizstr-nge-bis-max-5-m', 'basis', 'HEIZSTRÄNGE bis max. 5 m | 🛠 Montage-Leistungspaket', 'HEIZ-301-MAT', 434.56, 'Stück', '', true, false, 1, 'service'),
          ]
        }
      ]
    },
    {
      id: 'heizk-rper',
      title: 'HEIZKÖRPER',
      lead: 'Zusammenstellung der Positionen',
      subsections: [
        {
          id: 'basis',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('heiz-201-1-op', 'heizk-rper', 'basis', 'HEIZKÖRPER |🛠 Demontage & Entsorgung', 'HEIZ-201-1-OP', 67.13, 'Stück', '', true, false, 1, 'service'),
            createProduct('heiz-101-mon', 'heizk-rper', 'basis', 'HEIZKÖRPER | 🛠 Montage', 'HEIZ-101-MON', 149, 'Stk', '', true, false, 1, 'service'),
            createProduct('heiz-201-1-op', 'heizk-rper', 'basis', 'HEIZKÖRPER |🛠 Demontage & Entsorgung', 'HEIZ-201-1-OP', 67.13, 'Stück', '', true, false, 1, 'service'),
          ]
        }
      ]
    },
    {
      id: 'fliesen-bad',
      title: 'FLIESEN - BAD',
      lead: 'Zusammenstellung der Positionen',
      subsections: [
        {
          id: 'basis',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('bade-100-basis', 'fliesen-bad', 'basis', 'FLIESEN - BAD | 🛠 Montage-Leistungspaket', 'BADE-100-BASIS', 5995, 'Stück', '', true, false, 1, 'service'),
          ]
        }
      ]
    },
    {
      id: 'sanit-r-bad',
      title: 'SANITÄR - BAD',
      lead: 'Zusammenstellung der Positionen',
      subsections: [
        {
          id: 'basis',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('bade-500-basis', 'sanit-r-bad', 'basis', 'SANITÄR - BAD | Montage-Leistungspaket', 'BADE-500-BASIS', 1995, 'Stück', '', true, false, 1, 'service'),
          ]
        }
      ]
    },
  ]
};

export const packageBadWhirlpoolDusche: RenovationPackage = {
  id: 'badWhirlpoolDusche',
  title: 'Bad mit Whirlpool & Dusche',
  defaultArea: 6,
  defaultFloorCount: 1,
  categories: [
    {
      id: 'wasserinstallation-badezimmer',
      title: 'WASSERINSTALLATION BADEZIMMER',
      lead: 'Zusammenstellung der Positionen',
      subsections: [
        {
          id: 'basis',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('wass-100-basis', 'wasserinstallation-badezimmer', 'basis', 'WASSERINSTALLATION BADEZIMMER | 🛠 Montage-Leistungspaket', 'WASS-100-BASIS', 1995.9, 'Stück', '', true, false, 1, 'service'),
          ]
        }
      ]
    },
    {
      id: 'wasserinstallation',
      title: 'WASSERINSTALLATION',
      lead: 'Zusammenstellung der Positionen',
      subsections: [
        {
          id: 'basis',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('wass-105-zu', 'wasserinstallation', 'basis', 'WASCHMASCHINEN ANSCHLUSS | 🛠 Zusatz-Montage', 'WASS-105-ZU', 355.36, 'Stück', '', true, false, 1, 'service'),
            createProduct('wass-101-mon', 'wasserinstallation', 'basis', 'VORSATZ-ELEMENT | 🛠 Montage', 'WASS-101-MON', 279, 'Stk', '', true, false, 2, 'service'),
          ]
        }
      ]
    },
    {
      id: 'ausstattung-optional',
      title: 'Ausstattung & Optional',
      lead: 'Zusammenstellung der Positionen',
      subsections: [
        {
          id: 'basis',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('cvis3wt112', 'ausstattung-optional', 'basis', 'VIS Waschtisch-Montageelement | CONEL VIS Waschtisch-Montage', 'CVIS3WT112', 203.94, 'Stück', '', true, false, 1, 'service'),
            createProduct('dfix320wc112', 'ausstattung-optional', 'basis', 'Montageelement für Wand-WC, mit UP-Spülkasten Sigma 12 cm |', 'DFIX320WC112', 390.06, 'Stück', '', true, false, 1, 'service'),
            createProduct('sigma30wech', 'ausstattung-optional', 'basis', 'Abdeckplatte Sigma30 weiß/hgl.verchr. f.2-Mengen-Spülung, für UP-Spülkästen GE', 'SIGMA30WECH', 101.5, 'Stück', '', true, false, 1, 'service'),
            createProduct('wass-100-au', 'ausstattung-optional', 'basis', 'WEITERES zu WASSERINSTALLATION - (Klick Grünes-Symbol)', 'WASS-100-AU', 0, 'Stk', '', true, false, 1, 'service'),
            createProduct('uv835-10017', 'ausstattung-optional', 'basis', 'Ximax Badheizkörper BIANCA - weiß', 'uv835-10017', 388.95, 'Stk', '', true, false, 1, 'service'),
            createProduct('vede218b', 'ausstattung-optional', 'basis', 'Durchlauferhitzer Vaillant VED E 21/8 B 21KW elektronisch gesteuert weiss', 'VEDE218B', 373.23, 'Stück', '', true, false, 1, 'service'),
            createProduct('uv816-00746', 'ausstattung-optional', 'basis', 'Gutjahr IndorTec THERM-E Komplettset TD 3-in-1 Elektro-Flächenheizung', 'uv816-00746', 395.95, 'Stk', '', true, false, 1, 'service'),
            createProduct('1092361', 'ausstattung-optional', 'basis', 'V&B 30x 60 2576SD9B0 Hudson volcano matt ugl. FS R10/A rekt.', '1092361', 41.99, 'qm', '', true, false, 6, 'service'),
            createProduct('1054265', 'ausstattung-optional', 'basis', 'V&B 5x 10 2037BU9M8 Cadiz Mosaik ash grey ugl. FS R10/B rekt.', '1054265', 298.67, 'qm', '', true, false, 3, 'service'),
            createProduct('uv867-00298', 'ausstattung-optional', 'basis', 'Ottoseal S 110 Premium Neutral Silicon', 'uv867-00298', 8.79, 'Stk', '', true, false, 10, 'service'),
            createProduct('uv519-00256', 'ausstattung-optional', 'basis', 'PCI Nanofug Variabler Flexfugenmörtel', 'uv519-00256', 58.65, 'Sack', '', true, false, 2, 'service'),
            createProduct('uv519-00143', 'ausstattung-optional', 'basis', 'PCI Flexmörtel Verformungsfähiger Fliesenkleber', 'uv519-00143', 53.75, 'Sack', '', true, false, 6, 'service'),
            createProduct('uv608-6903', 'ausstattung-optional', 'basis', 'Schlüter FINEC Dekorprofil Eckenset', 'uv608-6903', 32.51, 'Stk', '', true, false, 2, 'service'),
            createProduct('dewwc', 'ausstattung-optional', 'basis', 'Wand-Tiefspül-WC derby sichtbare Befestigung weiss VIGOUR', 'DEWWC', 191.57, 'Stück', '', true, false, 1, 'service'),
            createProduct('desias', 'ausstattung-optional', 'basis', 'WC-Sitz derby Edelstahlscharnier abnehmbar mit Absenkautomatik weiss VIG.', 'DESIAS', 115.34, 'Stück', '', true, false, 1, 'service'),
            createProduct('des60p', 'ausstattung-optional', 'basis', 'Waschtisch derby style 60x48cm weiss PflegePLUS VIGOUR', 'DES60P', 191.57, 'Stück', '', true, false, 1, 'service'),
            createProduct('des', 'ausstattung-optional', 'basis', 'Einhand-Waschtischbatterie derby style mit Ablaufgarnitur verchromt VIGOUR', 'DES', 152.96, 'Stück', '', true, false, 1, 'service'),
            createProduct('wlbasiceks', 'ausstattung-optional', 'basis', 'Whirl-Line Basic Eco Kombisystem Zum Einbau in bereitgestellt Acrylwanne', 'WLBASICEKS', 4830.21, 'Stück', '', true, false, 1, 'service'),
            createProduct('depghw', 'ausstattung-optional', 'basis', 'Einhand-AP-Badebatterie derby plus mit Hebel geschl. o. Brausegarn. verchr. VIG', 'DEPGHW', 233.64, 'Stück', '', true, false, 1, 'service'),
            createProduct('cls90ef', 'ausstattung-optional', 'basis', 'Duschwanne Stahl clivia 90x90x3.2cm weiss VIGOUR', 'CLS90EF', 297.99, 'Stück', '', true, false, 1, 'service'),
            createProduct('euphdsee260', 'ausstattung-optional', 'basis', 'Duschsystem Euphoria 260 mit Einhandmischer 9,5l/min chrom Grohe', 'EUPHDSEE260', 608.85, 'Stück', '', true, false, 1, 'service'),
            createProduct('v2ge90l', 'ausstattung-optional', 'basis', 'Gleittür Eckhälfte 2.0 links 900x1950mm silber matt ESG klar VIGOUR', 'V2GE90L', 569.25, 'Stk', '', true, false, 1, 'service'),
            createProduct('v2ge90r', 'ausstattung-optional', 'basis', 'Gleittür Eckhälfte 2.0 rechts 900x1950mm silber matt ESG klar VIGOUR', 'V2GE90R', 569.25, 'Stk', '', true, false, 1, 'service'),
            createProduct('strahyr', 'ausstattung-optional', 'basis', 'AP-Hygienebeutelspender Stratos m.runder Öffnung Edelstahl matt Franke', 'STRAHYR', 112.86, 'Stück', '', true, false, 1, 'service'),
            createProduct('santralabh18', 'ausstattung-optional', 'basis', 'Abfallbox SanTral 18 Liter m.Beutelhalt. Edelstahl Ophardt', 'SANTRALABH18', 312.84, 'Stück', '', true, false, 1, 'service'),
            createProduct('codessp50', 'ausstattung-optional', 'basis', 'Spender berührungsfrei weiss für Desinfektionsmittel 0,5 l Conti', 'CODESSP50', 146.52, 'Stück', '', true, false, 1, 'service'),
            createProduct('cwsssppas', 'ausstattung-optional', 'basis', 'Seifensch.-Spend.CWS ParadiseAntib.Slim m.Panel weiss f.500ml Flaschen m.Schloss', 'CWSSSPPAS', 165.83, 'Stück', '', true, false, 1, 'service'),
            createProduct('hewiksiw448', 'ausstattung-optional', 'basis', 'Klappsitz Hewi 448x428mm reinweiss m.Wandplatten o.Befestigung', 'HEWIKSIW448', 676.17, 'Stück', '', true, false, 1, 'service'),
            createProduct('hewiwig600', 'ausstattung-optional', 'basis', 'Winkelgriff Hewi 600x300mm reinweiss', 'HEWIWIG600', 255.42, 'Stück', '', true, false, 1, 'service'),
          ]
        }
      ]
    },
    {
      id: 'heizstr-nge-bis-max-5-m',
      title: 'HEIZSTRÄNGE bis max. 5 m',
      lead: 'Zusammenstellung der Positionen',
      subsections: [
        {
          id: 'basis',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('heiz-301-mat', 'heizstr-nge-bis-max-5-m', 'basis', 'HEIZSTRÄNGE bis max. 5 m | 🛠 Montage-Leistungspaket', 'HEIZ-301-MAT', 434.56, 'Stück', '', true, false, 1, 'service'),
          ]
        }
      ]
    },
    {
      id: 'heizk-rper',
      title: 'HEIZKÖRPER',
      lead: 'Zusammenstellung der Positionen',
      subsections: [
        {
          id: 'basis',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('heiz-201-1-op', 'heizk-rper', 'basis', 'HEIZKÖRPER |🛠 Demontage & Entsorgung', 'HEIZ-201-1-OP', 67.13, 'Stück', '', true, false, 1, 'service'),
            createProduct('heiz-101-mon', 'heizk-rper', 'basis', 'HEIZKÖRPER | 🛠 Montage', 'HEIZ-101-MON', 149, 'Stk', '', true, false, 1, 'service'),
            createProduct('heiz-201-1-op', 'heizk-rper', 'basis', 'HEIZKÖRPER |🛠 Demontage & Entsorgung', 'HEIZ-201-1-OP', 67.13, 'Stück', '', true, false, 1, 'service'),
          ]
        }
      ]
    },
    {
      id: 'fliesen-bad',
      title: 'FLIESEN - BAD',
      lead: 'Zusammenstellung der Positionen',
      subsections: [
        {
          id: 'basis',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('bade-100-basis', 'fliesen-bad', 'basis', 'FLIESEN - BAD | 🛠 Montage-Leistungspaket', 'BADE-100-BASIS', 5995, 'Stück', '', true, false, 1, 'service'),
          ]
        }
      ]
    },
    {
      id: 'sanit-r-bad',
      title: 'SANITÄR - BAD',
      lead: 'Zusammenstellung der Positionen',
      subsections: [
        {
          id: 'basis',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('bade-500-basis', 'sanit-r-bad', 'basis', 'SANITÄR - BAD | Montage-Leistungspaket', 'BADE-500-BASIS', 1995, 'Stück', '', true, false, 1, 'service'),
          ]
        }
      ]
    },
    {
      id: 'ebenerdigen-duschbereich-herstellen-befliesen',
      title: 'Ebenerdigen Duschbereich herstellen & befliesen',
      lead: 'Zusammenstellung der Positionen',
      subsections: [
        {
          id: 'basis',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('bade-507-4-mat', 'ebenerdigen-duschbereich-herstellen-befliesen', 'basis', 'Ebenerdigen Duschbereich herstellen & befliesen | 🛠 Montage-Leistungspaket', 'BADE-507.4-MAT', 1579.9, 'Stück', '', true, false, 1, 'service'),
          ]
        }
      ]
    },
  ]
};

export const packageBadBarrierefrei: RenovationPackage = {
  id: 'badBarrierefrei',
  title: 'Barrierefreies Bad',
  defaultArea: 6,
  defaultFloorCount: 1,
  categories: [
    {
      id: 'wasserinstallation-badezimmer',
      title: 'WASSERINSTALLATION BADEZIMMER',
      lead: 'Zusammenstellung der Positionen',
      subsections: [
        {
          id: 'basis',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('wass-100-basis', 'wasserinstallation-badezimmer', 'basis', 'WASSERINSTALLATION BADEZIMMER | 🛠 Montage-Leistungspaket', 'WASS-100-BASIS', 1995.9, 'Stück', '', true, false, 1, 'service'),
          ]
        }
      ]
    },
    {
      id: 'wasserinstallation',
      title: 'WASSERINSTALLATION',
      lead: 'Zusammenstellung der Positionen',
      subsections: [
        {
          id: 'basis',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('wass-105-zu', 'wasserinstallation', 'basis', 'WASCHMASCHINEN ANSCHLUSS | 🛠 Zusatz-Montage', 'WASS-105-ZU', 355.36, 'Stück', '', true, false, 1, 'service'),
            createProduct('wass-101-mon', 'wasserinstallation', 'basis', 'VORSATZ-ELEMENT | 🛠 Montage', 'WASS-101-MON', 279, 'Stk', '', true, false, 2, 'service'),
          ]
        }
      ]
    },
    {
      id: 'ausstattung-optional',
      title: 'Ausstattung & Optional',
      lead: 'Zusammenstellung der Positionen',
      subsections: [
        {
          id: 'basis',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('cvis3wt112', 'ausstattung-optional', 'basis', 'VIS Waschtisch-Montageelement | CONEL VIS Waschtisch-Montage', 'CVIS3WT112', 203.94, 'Stück', '', true, false, 1, 'service'),
            createProduct('dfix320wc112', 'ausstattung-optional', 'basis', 'Montageelement für Wand-WC, mit UP-Spülkasten Sigma 12 cm |', 'DFIX320WC112', 390.06, 'Stück', '', true, false, 1, 'service'),
            createProduct('sigma30wech', 'ausstattung-optional', 'basis', 'Abdeckplatte Sigma30 weiß/hgl.verchr. f.2-Mengen-Spülung, für UP-Spülkästen GE', 'SIGMA30WECH', 101.5, 'Stück', '', true, false, 1, 'service'),
            createProduct('wass-100-au', 'ausstattung-optional', 'basis', 'WEITERES zu WASSERINSTALLATION - (Klick Grünes-Symbol)', 'WASS-100-AU', 0, 'Stk', '', true, false, 1, 'service'),
            createProduct('uv835-10017', 'ausstattung-optional', 'basis', 'Ximax Badheizkörper BIANCA - weiß', 'uv835-10017', 388.95, 'Stk', '', true, false, 1, 'service'),
            createProduct('vede218b', 'ausstattung-optional', 'basis', 'Durchlauferhitzer Vaillant VED E 21/8 B 21KW elektronisch gesteuert weiss', 'VEDE218B', 373.23, 'Stück', '', true, false, 1, 'service'),
            createProduct('uv816-00746', 'ausstattung-optional', 'basis', 'Gutjahr IndorTec THERM-E Komplettset TD 3-in-1 Elektro-Flächenheizung', 'uv816-00746', 395.95, 'Stk', '', true, false, 1, 'service'),
            createProduct('1092361', 'ausstattung-optional', 'basis', 'V&B 30x 60 2576SD9B0 Hudson volcano matt ugl. FS R10/A rekt.', '1092361', 41.99, 'qm', '', true, false, 6, 'service'),
            createProduct('1054265', 'ausstattung-optional', 'basis', 'V&B 5x 10 2037BU9M8 Cadiz Mosaik ash grey ugl. FS R10/B rekt.', '1054265', 298.67, 'qm', '', true, false, 3, 'service'),
            createProduct('uv867-00298', 'ausstattung-optional', 'basis', 'Ottoseal S 110 Premium Neutral Silicon', 'uv867-00298', 8.79, 'Stk', '', true, false, 10, 'service'),
            createProduct('uv519-00256', 'ausstattung-optional', 'basis', 'PCI Nanofug Variabler Flexfugenmörtel', 'uv519-00256', 58.65, 'Sack', '', true, false, 2, 'service'),
            createProduct('uv519-00143', 'ausstattung-optional', 'basis', 'PCI Flexmörtel Verformungsfähiger Fliesenkleber', 'uv519-00143', 53.75, 'Sack', '', true, false, 6, 'service'),
            createProduct('uv608-6903', 'ausstattung-optional', 'basis', 'Schlüter FINEC Dekorprofil Eckenset', 'uv608-6903', 32.51, 'Stk', '', true, false, 2, 'service'),
            createProduct('dewwc', 'ausstattung-optional', 'basis', 'Wand-Tiefspül-WC derby sichtbare Befestigung weiss VIGOUR', 'DEWWC', 191.57, 'Stück', '', true, false, 1, 'service'),
            createProduct('desias', 'ausstattung-optional', 'basis', 'WC-Sitz derby Edelstahlscharnier abnehmbar mit Absenkautomatik weiss VIG.', 'DESIAS', 115.34, 'Stück', '', true, false, 1, 'service'),
            createProduct('des60p', 'ausstattung-optional', 'basis', 'Waschtisch derby style 60x48cm weiss PflegePLUS VIGOUR', 'DES60P', 191.57, 'Stück', '', true, false, 1, 'service'),
            createProduct('des', 'ausstattung-optional', 'basis', 'Einhand-Waschtischbatterie derby style mit Ablaufgarnitur verchromt VIGOUR', 'DES', 152.96, 'Stück', '', true, false, 1, 'service'),
            createProduct('wlbasiceks', 'ausstattung-optional', 'basis', 'Whirl-Line Basic Eco Kombisystem Zum Einbau in bereitgestellt Acrylwanne', 'WLBASICEKS', 4830.21, 'Stück', '', true, false, 1, 'service'),
            createProduct('depghw', 'ausstattung-optional', 'basis', 'Einhand-AP-Badebatterie derby plus mit Hebel geschl. o. Brausegarn. verchr. VIG', 'DEPGHW', 233.64, 'Stück', '', true, false, 1, 'service'),
            createProduct('strahyr', 'ausstattung-optional', 'basis', 'AP-Hygienebeutelspender Stratos m.runder Öffnung Edelstahl matt Franke', 'STRAHYR', 112.86, 'Stück', '', true, false, 1, 'service'),
            createProduct('santralabh18', 'ausstattung-optional', 'basis', 'Abfallbox SanTral 18 Liter m.Beutelhalt. Edelstahl Ophardt', 'SANTRALABH18', 312.84, 'Stück', '', true, false, 1, 'service'),
            createProduct('codessp50', 'ausstattung-optional', 'basis', 'Spender berührungsfrei weiss für Desinfektionsmittel 0,5 l Conti', 'CODESSP50', 146.52, 'Stück', '', true, false, 1, 'service'),
            createProduct('cwsssppas', 'ausstattung-optional', 'basis', 'Seifensch.-Spend.CWS ParadiseAntib.Slim m.Panel weiss f.500ml Flaschen m.Schloss', 'CWSSSPPAS', 165.83, 'Stück', '', true, false, 1, 'service'),
            createProduct('hewiksiw448', 'ausstattung-optional', 'basis', 'Klappsitz Hewi 448x428mm reinweiss m.Wandplatten o.Befestigung', 'HEWIKSIW448', 676.17, 'Stück', '', true, false, 1, 'service'),
            createProduct('hewiwig600', 'ausstattung-optional', 'basis', 'Winkelgriff Hewi 600x300mm reinweiss', 'HEWIWIG600', 255.42, 'Stück', '', true, false, 1, 'service'),
          ]
        }
      ]
    },
    {
      id: 'heizstr-nge-bis-max-5-m',
      title: 'HEIZSTRÄNGE bis max. 5 m',
      lead: 'Zusammenstellung der Positionen',
      subsections: [
        {
          id: 'basis',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('heiz-301-mat', 'heizstr-nge-bis-max-5-m', 'basis', 'HEIZSTRÄNGE bis max. 5 m | 🛠 Montage-Leistungspaket', 'HEIZ-301-MAT', 434.56, 'Stück', '', true, false, 1, 'service'),
          ]
        }
      ]
    },
    {
      id: 'heizk-rper',
      title: 'HEIZKÖRPER',
      lead: 'Zusammenstellung der Positionen',
      subsections: [
        {
          id: 'basis',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('heiz-201-1-op', 'heizk-rper', 'basis', 'HEIZKÖRPER |🛠 Demontage & Entsorgung', 'HEIZ-201-1-OP', 67.13, 'Stück', '', true, false, 1, 'service'),
            createProduct('heiz-101-mon', 'heizk-rper', 'basis', 'HEIZKÖRPER | 🛠 Montage', 'HEIZ-101-MON', 149, 'Stk', '', true, false, 1, 'service'),
            createProduct('heiz-201-1-op', 'heizk-rper', 'basis', 'HEIZKÖRPER |🛠 Demontage & Entsorgung', 'HEIZ-201-1-OP', 67.13, 'Stück', '', true, false, 1, 'service'),
          ]
        }
      ]
    },
    {
      id: 'fliesen-bad',
      title: 'FLIESEN - BAD',
      lead: 'Zusammenstellung der Positionen',
      subsections: [
        {
          id: 'basis',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('bade-100-basis', 'fliesen-bad', 'basis', 'FLIESEN - BAD | 🛠 Montage-Leistungspaket', 'BADE-100-BASIS', 5995, 'Stück', '', true, false, 1, 'service'),
          ]
        }
      ]
    },
    {
      id: 'sanit-r-bad',
      title: 'SANITÄR - BAD',
      lead: 'Zusammenstellung der Positionen',
      subsections: [
        {
          id: 'basis',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('bade-500-basis', 'sanit-r-bad', 'basis', 'SANITÄR - BAD | Montage-Leistungspaket', 'BADE-500-BASIS', 1995, 'Stück', '', true, false, 1, 'service'),
          ]
        }
      ]
    },
  ]
};

