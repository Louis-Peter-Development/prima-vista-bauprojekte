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

export const packageKuecheAlles: RenovationPackage = {
  id: 'kuecheAlles',
  title: 'Alles zu Küchen',
  defaultArea: 7,
  defaultFloorCount: 1,
  categories: [
    {
      id: 'art-der-ausfuehrung',
      title: 'Art der Ausführung',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'art-der-ausfuehrung-sub',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('kuec-10001-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `KÜCHENMONTAGEpauschal | 🛠 Montage-Leistungspaket`, 'KUEC-10001-Basis', 290, 'lfm', `🛠 Montage-Leistungspaket`, false, false, 7, 'service'),
            createProduct('wass-300-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `WASSERINSTALLATION KÜCHE | 🛠 Montage-Leistungspaket`, 'WASS-300-BASIS', 995.9, 'Stk', `🛠 Montage-Leistungspaket`, false, false, 1, 'service'),
            createProduct('elek-301-1-zu', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `E-ZULEITUNG - ALS EINZELINSTALLATION (PRO 5 M) | 🛠 Zusatz-Montage`, 'ELEK-301-1-ZU', 159.9, 'Stk', `🛠 Zusatz-Montage`, false, false, 1, 'extra'),
            createProduct('elek-201-2-zu', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `HERDANSCHLUSS ZULEITUNG + DOSE | 🛠 Zusatz-Montage`, 'ELEK-201-2-ZU', 391.9, 'Stk', `🛠 Zusatz-Montage`, false, false, 1, 'extra')
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
          type: 'material',
          products: [
            createProduct('neu-000053', 'material', 'material-sub', `nobilia Einbauküche L-Küche Berlin 540 cm in Weiß komplett konfigurierbar - online kaufen`, 'neu-000053', 5424.02, 'Stk', `nobilia Einbauküche L-Küche Berlin 540 cm in Weiß komplett konfigurierbar - online kaufen`, false, false, 1, 'material'),
            createProduct('elek-302-mat', 'material', 'material-sub', `STECKDOSE | Gira S 55 weiß |**Varianten**`, 'ELEK-302-MAT', 49.9, 'Stk', `Gira S 55 weiß |**Varianten**`, false, true, 1, 'optional'),
            createProduct('elek-301-mat', 'material', 'material-sub', `LICHTSCHALTER | Gira S 55 weiß |**Varianten**`, 'ELEK-301-MAT', 65.39, 'Stk', `Gira S 55 weiß |**Varianten**`, false, true, 1, 'optional'),
            createProduct('elek-201-2-zu-2', 'material', 'material-sub', `HERDANSCHLUSS ZULEITUNG + DOSE | 🛠 Zusatz-Montage`, 'ELEK-201-2-ZU', 391.9, 'Stk', `🛠 Zusatz-Montage`, false, false, 1, 'extra')
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
            createProduct('670036575447', 'optionale-positionen', 'optionale-positionen-sub', `nobilia Einbauküche L-Küche München 430 cm in Weiß komplett - online kaufen`, '670036575447', 3616.41, 'Stk', `nobilia Einbauküche L-Küche München 430 cm in Weiß komplett - online kaufen`, false, true, 1, 'optional'),
            createProduct('neu-000053-2', 'optionale-positionen', 'optionale-positionen-sub', `nobilia Einbauküche L-Küche Berlin 540 cm in Weiß komplett konfigurierbar - online kaufen`, 'neu-000053', 5424.02, 'Stk', `nobilia Einbauküche L-Küche Berlin 540 cm in Weiß komplett konfigurierbar - online kaufen`, false, true, 1, 'optional'),
            createProduct('36961744486550', 'optionale-positionen', 'optionale-positionen-sub', `nobilia Singleküche Eschweiler 225 cm Weiß matt Beton Schiefergrau komplett mit Kochfeld`, '36961744486550', 2957.15, 'Stk', `nobilia Singleküche Eschweiler 225 cm Weiß matt Beton Schiefergrau komplett mit Kochfeld`, false, true, 1, 'optional'),
            createProduct('37121822720150', 'optionale-positionen', 'optionale-positionen-sub', `nobilia Miniküche Gera 150 cm Weiß matt Beton Schiefergrau Büroküche`, '37121822720150', 2851.24, 'Stk', `nobilia Miniküche Gera 150 cm Weiß matt Beton Schiefergrau Büroküche`, false, true, 1, 'optional'),
            createProduct('37392617767062', 'optionale-positionen', 'optionale-positionen-sub', `nobilia Küche Nordhorn 315 cm Alpinweiß matt günstige Küche Eiche Sierra komplette Einbauküche`, '37392617767062', 3662.82, 'Stk', `nobilia Küche Nordhorn 315 cm Alpinweiß matt günstige Küche Eiche Sierra komplette Einbauküche`, false, true, 1, 'optional'),
            createProduct('37263489892502', 'optionale-positionen', 'optionale-positionen-sub', `nobilia Küchenzeile Bamberg 225 cm Weiß mit Preisen Eiche Sierra Teeküche`, '37263489892502', 3239.18, 'Stk', `nobilia Küchenzeile Bamberg 225 cm Weiß mit Preisen Eiche Sierra Teeküche`, false, true, 1, 'optional'),
            createProduct('elek-101-2-mat', 'optionale-positionen', 'optionale-positionen-sub', `SICHERUNGSKASTEN | 🛠 Montage-Leistungspaket`, 'ELEK-101.2-MAT', 1678.5, 'Stk', `🛠 Montage-Leistungspaket`, false, true, 1, 'optional')
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
            createProduct('670036573313', 'extra-positionen', 'extra-positionen-sub', `Hailo Einbau-Abfallsammler Separato ASSB 40 Mülleimer für Badezimmer-Auszugschränke 22cm hoch`, '670036573313', 109.48, 'Stk', `Hailo Einbau-Abfallsammler Separato ASSB 40 Mülleimer für Badezimmer-Auszugschränke 22cm hoch`, false, false, 1, 'extra'),
            createProduct('3372-953-044', 'extra-positionen', 'extra-positionen-sub', `nobilia Handtuchhalter 2-armig HTHA2`, '3372-953_-044', 141.61, 'Stk', `nobilia Handtuchhalter 2-armig HTHA2`, false, false, 1, 'extra')
          ]
        }
      ]
    }
  ]
};

export const packageKuecheKomplettkueche: RenovationPackage = {
  id: 'kuecheKomplettkueche',
  title: 'Komplettküche',
  defaultArea: 7,
  defaultFloorCount: 1,
  categories: [
    {
      id: 'art-der-ausfuehrung',
      title: 'Art der Ausführung',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'art-der-ausfuehrung-sub',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('kuec-10001-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `KÜCHENMONTAGEpauschal | 🛠 Montage-Leistungspaket`, 'KUEC-10001-Basis', 290, 'lfm', `🛠 Montage-Leistungspaket`, true, false, 7, 'service'),
            createProduct('wass-300-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `WASSERINSTALLATION KÜCHE | 🛠 Montage-Leistungspaket`, 'WASS-300-BASIS', 995.9, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'service'),
            createProduct('elek-301-1-zu', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `E-ZULEITUNG - ALS EINZELINSTALLATION (PRO 5 M) | 🛠 Zusatz-Montage`, 'ELEK-301-1-ZU', 159.9, 'Stk', `🛠 Zusatz-Montage`, true, false, 4, 'extra'),
            createProduct('elek-201-2-zu', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `HERDANSCHLUSS ZULEITUNG + DOSE | 🛠 Zusatz-Montage`, 'ELEK-201-2-ZU', 391.9, 'Stk', `🛠 Zusatz-Montage`, true, false, 1, 'extra')
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
          type: 'material',
          products: [
            createProduct('neu-000053', 'material', 'material-sub', `nobilia Einbauküche L-Küche Berlin 540 cm in Weiß komplett konfigurierbar - online kaufen`, 'neu-000053', 5424.02, 'Stk', `nobilia Einbauküche L-Küche Berlin 540 cm in Weiß komplett konfigurierbar - online kaufen`, true, false, 1, 'material'),
            createProduct('elek-302-mat', 'material', 'material-sub', `STECKDOSE | Gira S 55 weiß |**Varianten**`, 'ELEK-302-MAT', 49.9, 'Stk', `Gira S 55 weiß |**Varianten**`, true, true, 8, 'optional'),
            createProduct('elek-301-mat', 'material', 'material-sub', `LICHTSCHALTER | Gira S 55 weiß |**Varianten**`, 'ELEK-301-MAT', 65.39, 'Stk', `Gira S 55 weiß |**Varianten**`, true, true, 2, 'optional'),
            createProduct('elek-201-2-zu-2', 'material', 'material-sub', `HERDANSCHLUSS ZULEITUNG + DOSE | 🛠 Zusatz-Montage`, 'ELEK-201-2-ZU', 391.9, 'Stk', `🛠 Zusatz-Montage`, true, false, 1, 'extra')
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
            createProduct('670036575447', 'optionale-positionen', 'optionale-positionen-sub', `nobilia Einbauküche L-Küche München 430 cm in Weiß komplett - online kaufen`, '670036575447', 3616.41, 'Stk', `nobilia Einbauküche L-Küche München 430 cm in Weiß komplett - online kaufen`, false, true, 1, 'optional'),
            createProduct('elek-101-2-mat', 'optionale-positionen', 'optionale-positionen-sub', `SICHERUNGSKASTEN | 🛠 Montage-Leistungspaket`, 'ELEK-101.2-MAT', 1678.5, 'Stk', `🛠 Montage-Leistungspaket`, false, true, 1, 'optional')
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
            createProduct('670036573313', 'extra-positionen', 'extra-positionen-sub', `Hailo Einbau-Abfallsammler Separato ASSB 40 Mülleimer für Badezimmer-Auszugschränke 22cm hoch`, '670036573313', 109.48, 'Stk', `Hailo Einbau-Abfallsammler Separato ASSB 40 Mülleimer für Badezimmer-Auszugschränke 22cm hoch`, false, false, 1, 'extra'),
            createProduct('3372-953-044', 'extra-positionen', 'extra-positionen-sub', `nobilia Handtuchhalter 2-armig HTHA2`, '3372-953_-044', 141.61, 'Stk', `nobilia Handtuchhalter 2-armig HTHA2`, false, false, 1, 'extra')
          ]
        }
      ]
    }
  ]
};

export const packageKuecheSingleMinikuechen: RenovationPackage = {
  id: 'kuecheSingleMinikuechen',
  title: 'Single-/Miniküche',
  defaultArea: 3,
  defaultFloorCount: 1,
  categories: [
    {
      id: 'art-der-ausfuehrung',
      title: 'Art der Ausführung',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'art-der-ausfuehrung-sub',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('kuec-10001-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `KÜCHENMONTAGEpauschal | 🛠 Montage-Leistungspaket`, 'KUEC-10001-Basis', 290, 'lfm', `🛠 Montage-Leistungspaket`, true, false, 3, 'service'),
            createProduct('wass-300-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `WASSERINSTALLATION KÜCHE | 🛠 Montage-Leistungspaket`, 'WASS-300-BASIS', 995.9, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'service'),
            createProduct('elek-301-1-zu', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `E-ZULEITUNG - ALS EINZELINSTALLATION (PRO 5 M) | 🛠 Zusatz-Montage`, 'ELEK-301-1-ZU', 159.9, 'Stk', `🛠 Zusatz-Montage`, true, false, 2, 'extra'),
            createProduct('elek-201-2-zu', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `HERDANSCHLUSS ZULEITUNG + DOSE | 🛠 Zusatz-Montage`, 'ELEK-201-2-ZU', 391.9, 'Stk', `🛠 Zusatz-Montage`, true, false, 1, 'extra')
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
          type: 'material',
          products: [
            createProduct('36961744486550', 'material', 'material-sub', `nobilia Singleküche Eschweiler 225 cm Weiß matt Beton Schiefergrau komplett mit Kochfeld`, '36961744486550', 2957.15, 'Stk', `nobilia Singleküche Eschweiler 225 cm Weiß matt Beton Schiefergrau komplett mit Kochfeld`, true, false, 1, 'material'),
            createProduct('elek-302-mat', 'material', 'material-sub', `STECKDOSE | Gira S 55 weiß |**Varianten**`, 'ELEK-302-MAT', 49.9, 'Stk', `Gira S 55 weiß |**Varianten**`, true, true, 4, 'optional'),
            createProduct('elek-301-mat', 'material', 'material-sub', `LICHTSCHALTER | Gira S 55 weiß |**Varianten**`, 'ELEK-301-MAT', 65.39, 'Stk', `Gira S 55 weiß |**Varianten**`, true, true, 1, 'optional'),
            createProduct('elek-201-2-zu-2', 'material', 'material-sub', `HERDANSCHLUSS ZULEITUNG + DOSE | 🛠 Zusatz-Montage`, 'ELEK-201-2-ZU', 391.9, 'Stk', `🛠 Zusatz-Montage`, true, false, 1, 'extra')
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
            createProduct('37029889638550', 'optionale-positionen', 'optionale-positionen-sub', `nobilia Teeküche Iserlohn 165 cm Weiß matt Eiche Sierra --`, '37029889638550', 2449.02, 'Stk', `nobilia Teeküche Iserlohn 165 cm Weiß matt Eiche Sierra --`, false, true, 1, 'optional'),
            createProduct('elek-101-2-mat', 'optionale-positionen', 'optionale-positionen-sub', `SICHERUNGSKASTEN | 🛠 Montage-Leistungspaket`, 'ELEK-101.2-MAT', 1678.5, 'Stk', `🛠 Montage-Leistungspaket`, false, true, 1, 'optional')
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
            createProduct('670036573313', 'extra-positionen', 'extra-positionen-sub', `Hailo Einbau-Abfallsammler Separato ASSB 40 Mülleimer für Badezimmer-Auszugschränke 22cm hoch`, '670036573313', 109.48, 'Stk', `Hailo Einbau-Abfallsammler Separato ASSB 40 Mülleimer für Badezimmer-Auszugschränke 22cm hoch`, false, false, 1, 'extra'),
            createProduct('3372-953-044', 'extra-positionen', 'extra-positionen-sub', `nobilia Handtuchhalter 2-armig HTHA2`, '3372-953_-044', 141.61, 'Stk', `nobilia Handtuchhalter 2-armig HTHA2`, false, false, 1, 'extra')
          ]
        }
      ]
    }
  ]
};

export const packageKuecheBuerokueche: RenovationPackage = {
  id: 'kuecheBuerokueche',
  title: 'Büroküche',
  defaultArea: 5,
  defaultFloorCount: 1,
  categories: [
    {
      id: 'art-der-ausfuehrung',
      title: 'Art der Ausführung',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'art-der-ausfuehrung-sub',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('kuec-10001-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `KÜCHENMONTAGEpauschal | 🛠 Montage-Leistungspaket`, 'KUEC-10001-Basis', 290, 'lfm', `🛠 Montage-Leistungspaket`, true, false, 2, 'service'),
            createProduct('wass-300-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `WASSERINSTALLATION KÜCHE | 🛠 Montage-Leistungspaket`, 'WASS-300-BASIS', 995.9, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'service'),
            createProduct('elek-301-1-zu', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `E-ZULEITUNG - ALS EINZELINSTALLATION (PRO 5 M) | 🛠 Zusatz-Montage`, 'ELEK-301-1-ZU', 159.9, 'Stk', `🛠 Zusatz-Montage`, true, false, 2, 'extra'),
            createProduct('elek-201-2-zu', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `HERDANSCHLUSS ZULEITUNG + DOSE | 🛠 Zusatz-Montage`, 'ELEK-201-2-ZU', 391.9, 'Stk', `🛠 Zusatz-Montage`, true, false, 1, 'extra')
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
          type: 'material',
          products: [
            createProduct('37121822720150', 'material', 'material-sub', `nobilia Miniküche Gera 150 cm Weiß matt Beton Schiefergrau Büroküche`, '37121822720150', 2851.24, 'Stk', `nobilia Miniküche Gera 150 cm Weiß matt Beton Schiefergrau Büroküche`, true, false, 1, 'material'),
            createProduct('elek-302-mat', 'material', 'material-sub', `STECKDOSE | Gira S 55 weiß |**Varianten**`, 'ELEK-302-MAT', 49.9, 'Stk', `Gira S 55 weiß |**Varianten**`, true, true, 4, 'optional'),
            createProduct('elek-301-mat', 'material', 'material-sub', `LICHTSCHALTER | Gira S 55 weiß |**Varianten**`, 'ELEK-301-MAT', 65.39, 'Stk', `Gira S 55 weiß |**Varianten**`, true, true, 2, 'optional'),
            createProduct('elek-201-2-zu-2', 'material', 'material-sub', `HERDANSCHLUSS ZULEITUNG + DOSE | 🛠 Zusatz-Montage`, 'ELEK-201-2-ZU', 391.9, 'Stk', `🛠 Zusatz-Montage`, true, false, 1, 'extra')
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
            createProduct('37021554376854', 'optionale-positionen', 'optionale-positionen-sub', `nobilia Büroküche Düren 210 cm Alpinweiß matt Beton Schiefergrau`, '37021554376854', 2647.75, 'Stk', `nobilia Büroküche Düren 210 cm Alpinweiß matt Beton Schiefergrau`, false, true, 1, 'optional'),
            createProduct('elek-101-2-mat', 'optionale-positionen', 'optionale-positionen-sub', `SICHERUNGSKASTEN | 🛠 Montage-Leistungspaket`, 'ELEK-101.2-MAT', 1678.5, 'Stk', `🛠 Montage-Leistungspaket`, false, true, 1, 'optional')
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
            createProduct('670036573313', 'extra-positionen', 'extra-positionen-sub', `Hailo Einbau-Abfallsammler Separato ASSB 40 Mülleimer für Badezimmer-Auszugschränke 22cm hoch`, '670036573313', 109.48, 'Stk', `Hailo Einbau-Abfallsammler Separato ASSB 40 Mülleimer für Badezimmer-Auszugschränke 22cm hoch`, false, false, 1, 'extra'),
            createProduct('3372-953-044', 'extra-positionen', 'extra-positionen-sub', `nobilia Handtuchhalter 2-armig HTHA2`, '3372-953_-044', 141.61, 'Stk', `nobilia Handtuchhalter 2-armig HTHA2`, false, false, 1, 'extra')
          ]
        }
      ]
    }
  ]
};

export const packageKuecheEinbaukueche: RenovationPackage = {
  id: 'kuecheEinbaukueche',
  title: 'Einbauküche',
  defaultArea: 7,
  defaultFloorCount: 1,
  categories: [
    {
      id: 'art-der-ausfuehrung',
      title: 'Art der Ausführung',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'art-der-ausfuehrung-sub',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('kuec-10001-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `KÜCHENMONTAGEpauschal | 🛠 Montage-Leistungspaket`, 'KUEC-10001-Basis', 290, 'lfm', `🛠 Montage-Leistungspaket`, true, false, 4, 'service'),
            createProduct('wass-300-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `WASSERINSTALLATION KÜCHE | 🛠 Montage-Leistungspaket`, 'WASS-300-BASIS', 995.9, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'service'),
            createProduct('elek-301-1-zu', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `E-ZULEITUNG - ALS EINZELINSTALLATION (PRO 5 M) | 🛠 Zusatz-Montage`, 'ELEK-301-1-ZU', 159.9, 'Stk', `🛠 Zusatz-Montage`, true, false, 4, 'extra'),
            createProduct('elek-201-2-zu', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `HERDANSCHLUSS ZULEITUNG + DOSE | 🛠 Zusatz-Montage`, 'ELEK-201-2-ZU', 391.9, 'Stk', `🛠 Zusatz-Montage`, true, false, 1, 'extra')
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
          type: 'material',
          products: [
            createProduct('37392617767062', 'material', 'material-sub', `nobilia Küche Nordhorn 315 cm Alpinweiß matt günstige Küche Eiche Sierra komplette Einbauküche`, '37392617767062', 3662.82, 'Stk', `nobilia Küche Nordhorn 315 cm Alpinweiß matt günstige Küche Eiche Sierra komplette Einbauküche`, true, false, 1, 'material'),
            createProduct('elek-302-mat', 'material', 'material-sub', `STECKDOSE | Gira S 55 weiß |**Varianten**`, 'ELEK-302-MAT', 49.9, 'Stk', `Gira S 55 weiß |**Varianten**`, true, true, 8, 'optional'),
            createProduct('elek-301-mat', 'material', 'material-sub', `LICHTSCHALTER | Gira S 55 weiß |**Varianten**`, 'ELEK-301-MAT', 65.39, 'Stk', `Gira S 55 weiß |**Varianten**`, true, true, 2, 'optional'),
            createProduct('elek-201-2-zu-2', 'material', 'material-sub', `HERDANSCHLUSS ZULEITUNG + DOSE | 🛠 Zusatz-Montage`, 'ELEK-201-2-ZU', 391.9, 'Stk', `🛠 Zusatz-Montage`, true, false, 1, 'extra')
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
            createProduct('37296593043606', 'optionale-positionen', 'optionale-positionen-sub', `nobilia Küchenzeile Braunschweig 345 cm weiß Beton Einbauküche --`, '37296593043606', 5482.33, 'Stk', `nobilia Küchenzeile Braunschweig 345 cm weiß Beton Einbauküche --`, false, true, 1, 'optional'),
            createProduct('elek-101-2-mat', 'optionale-positionen', 'optionale-positionen-sub', `SICHERUNGSKASTEN | 🛠 Montage-Leistungspaket`, 'ELEK-101.2-MAT', 1678.5, 'Stk', `🛠 Montage-Leistungspaket`, false, true, 1, 'optional')
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
            createProduct('670036573313', 'extra-positionen', 'extra-positionen-sub', `Hailo Einbau-Abfallsammler Separato ASSB 40 Mülleimer für Badezimmer-Auszugschränke 22cm hoch`, '670036573313', 109.48, 'Stk', `Hailo Einbau-Abfallsammler Separato ASSB 40 Mülleimer für Badezimmer-Auszugschränke 22cm hoch`, false, false, 1, 'extra'),
            createProduct('3372-953-044', 'extra-positionen', 'extra-positionen-sub', `nobilia Handtuchhalter 2-armig HTHA2`, '3372-953_-044', 141.61, 'Stk', `nobilia Handtuchhalter 2-armig HTHA2`, false, false, 1, 'extra')
          ]
        }
      ]
    }
  ]
};

export const packageKuecheKuechenzeile: RenovationPackage = {
  id: 'kuecheKuechenzeile',
  title: 'Küchenzeile',
  defaultArea: 4,
  defaultFloorCount: 1,
  categories: [
    {
      id: 'art-der-ausfuehrung',
      title: 'Art der Ausführung',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'art-der-ausfuehrung-sub',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('kuec-10001-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `KÜCHENMONTAGEpauschal | 🛠 Montage-Leistungspaket`, 'KUEC-10001-Basis', 290, 'lfm', `🛠 Montage-Leistungspaket`, true, false, 3, 'service'),
            createProduct('wass-300-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `WASSERINSTALLATION KÜCHE | 🛠 Montage-Leistungspaket`, 'WASS-300-BASIS', 995.9, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'service'),
            createProduct('elek-301-1-zu', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `E-ZULEITUNG - ALS EINZELINSTALLATION (PRO 5 M) | 🛠 Zusatz-Montage`, 'ELEK-301-1-ZU', 159.9, 'Stk', `🛠 Zusatz-Montage`, true, false, 2, 'extra'),
            createProduct('elek-201-2-zu', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `HERDANSCHLUSS ZULEITUNG + DOSE | 🛠 Zusatz-Montage`, 'ELEK-201-2-ZU', 391.9, 'Stk', `🛠 Zusatz-Montage`, true, false, 1, 'extra')
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
          type: 'material',
          products: [
            createProduct('37263489892502', 'material', 'material-sub', `nobilia Küchenzeile Bamberg 225 cm Weiß mit Preisen Eiche Sierra Teeküche`, '37263489892502', 3239.18, 'Stk', `nobilia Küchenzeile Bamberg 225 cm Weiß mit Preisen Eiche Sierra Teeküche`, true, false, 1, 'material'),
            createProduct('elek-302-mat', 'material', 'material-sub', `STECKDOSE | Gira S 55 weiß |**Varianten**`, 'ELEK-302-MAT', 49.9, 'Stk', `Gira S 55 weiß |**Varianten**`, true, true, 4, 'optional'),
            createProduct('elek-301-mat', 'material', 'material-sub', `LICHTSCHALTER | Gira S 55 weiß |**Varianten**`, 'ELEK-301-MAT', 65.39, 'Stk', `Gira S 55 weiß |**Varianten**`, true, true, 2, 'optional'),
            createProduct('elek-201-2-zu-2', 'material', 'material-sub', `HERDANSCHLUSS ZULEITUNG + DOSE | 🛠 Zusatz-Montage`, 'ELEK-201-2-ZU', 391.9, 'Stk', `🛠 Zusatz-Montage`, true, false, 1, 'extra')
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
            createProduct('37273858605206', 'optionale-positionen', 'optionale-positionen-sub', `nobilia Küchenzeile Ingolstadt 225 cm Alpinweiß matt Online Kaufen Beton Schiefergrau __`, '37273858605206', 4230.45, 'Stk', `nobilia Küchenzeile Ingolstadt 225 cm Alpinweiß matt Online Kaufen Beton Schiefergrau __`, false, true, 1, 'optional'),
            createProduct('elek-101-2-mat', 'optionale-positionen', 'optionale-positionen-sub', `SICHERUNGSKASTEN | 🛠 Montage-Leistungspaket`, 'ELEK-101.2-MAT', 1678.5, 'Stk', `🛠 Montage-Leistungspaket`, false, true, 1, 'optional')
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
            createProduct('670036573313', 'extra-positionen', 'extra-positionen-sub', `Hailo Einbau-Abfallsammler Separato ASSB 40 Mülleimer für Badezimmer-Auszugschränke 22cm hoch`, '670036573313', 109.48, 'Stk', `Hailo Einbau-Abfallsammler Separato ASSB 40 Mülleimer für Badezimmer-Auszugschränke 22cm hoch`, false, false, 1, 'extra'),
            createProduct('3372-953-044', 'extra-positionen', 'extra-positionen-sub', `nobilia Handtuchhalter 2-armig HTHA2`, '3372-953_-044', 141.61, 'Stk', `nobilia Handtuchhalter 2-armig HTHA2`, false, false, 1, 'extra')
          ]
        }
      ]
    }
  ]
};

export const packageKuecheArbeitsplatteSpuele: RenovationPackage = {
  id: 'kuecheArbeitsplatteSpuele',
  title: 'Arbeitsplatte & Spüle',
  defaultArea: 4,
  defaultFloorCount: 1,
  categories: [
    {
      id: 'basis',
      title: 'Basis',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'basis-sub',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('kuec-10002-basis', 'basis', 'basis-sub', `KÜCHENARBEITSPLATTE | 🛠 Montage-Leistungspaket`, 'KUEC-10002-Basis', 250, 'lfm', `🛠 Montage-Leistungspaket`, true, false, 1, 'service')
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
          type: 'material',
          products: [
            createProduct('mat-anfrage', 'material', 'material-sub', `AUF ANFRAGE & BEMUSTERUNG DER MATERIALIEN`, 'MAT-Anfrage', 0, 'Stk', `AUF ANFRAGE & BEMUSTERUNG DER MATERIALIEN`, false, false, 1, 'material')
          ]
        }
      ]
    }
  ]
};

export const packageKuecheDunstabzugshaube: RenovationPackage = {
  id: 'kuecheDunstabzugshaube',
  title: 'Dunstabzugshaube',
  defaultArea: 1,
  defaultFloorCount: 1,
  categories: [
    {
      id: 'basis',
      title: 'Basis',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'basis-sub',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('kuec-10006-basis', 'basis', 'basis-sub', `DUNSTABZUGSHAUBE | 🛠 Montage-Leistungspaket`, 'KUEC-10006-Basis', 249, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'service')
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
          type: 'material',
          products: [
            createProduct('mat-anfrage', 'material', 'material-sub', `AUF ANFRAGE & BEMUSTERUNG DER MATERIALIEN`, 'MAT-Anfrage', 0, 'Stk', `AUF ANFRAGE & BEMUSTERUNG DER MATERIALIEN`, false, false, 1, 'material')
          ]
        }
      ]
    }
  ]
};

export const packageKuecheBodenDecken: RenovationPackage = {
  id: 'kuecheBodenDecken',
  title: 'Boden & Decken',
  defaultArea: 20,
  defaultFloorCount: 1,
  categories: [
    {
      id: 'art-der-ausfuehrung',
      title: 'Art der Ausführung',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'art-der-ausfuehrung-sub',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('bode-400-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `BODENFLIESEN | 🛠 Montage-Leistungspaket`, 'BODE-400-BASIS', 59.9, 'qm', `🛠 Montage-Leistungspaket`, true, false, 10, 'service'),
            createProduct('bode-201-op', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `VERKLEBTE BODENVERLEGUNG | 🛠 Montage-Leistungspaket`, 'BODE-201-OP', 29.9, 'qm', `🛠 Montage-Leistungspaket`, false, false, 1, 'service'),
            createProduct('bode-100-1-op', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `ALT-BODEN |🛠 Demontage & Entsorgung`, 'BODE-100-1-OP', 15.79, 'qm', `🛠 Demontage & Entsorgung`, false, false, 1, 'service')
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
          type: 'material',
          products: [
            createProduct('1209835', 'material', 'material-sub', `*V&B 80x 80x 0,9 2835BZ1001 Pure Base !Z creme matt ugl. FS R10/B rekt. #1209834`, '1209835', 46.2, 'qm', `*V&B 80x 80x 0,9 2835BZ1001 Pure Base !Z creme matt ugl. FS R10/B rekt. #1209834`, true, false, 12, 'material'),
            createProduct('662445', 'material', 'material-sub', `V&B 7,5x 60 2872RU200 My Earth Sockel beige multicolor ugl. FS`, '662445', 14.53, 'qm', `V&B 7,5x 60 2872RU200 My Earth Sockel beige multicolor ugl. FS`, true, false, 12, 'material'),
            createProduct('uv867-00298', 'material', 'material-sub', `Ottoseal S 110 Premium Neutral Silicon`, 'uv867-00298', 8.79, 'Stk', `Ottoseal S 110 Premium Neutral Silicon`, true, false, 2, 'material'),
            createProduct('lvtdes230-4254', 'material', 'material-sub', `DESIGN 230 HDF 9,6mm/32er JOKA Classic Designböden230 HDF!`, 'LVTDES230_4254', 45.67, 'qm', `DESIGN 230 HDF 9,6mm/32er JOKA Classic Designböden230 HDF!`, false, false, 1, 'material'),
            createProduct('1098740', 'material', 'material-sub', `Prinz Alu-Uebergangsprofil - gel !Z 38 mm 100 cm lang Silber`, '1098740', 6.69, 'Stk', `Prinz Alu-Uebergangsprofil - gel !Z 38 mm 100 cm lang Silber`, false, false, 1, 'material')
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
            createProduct('uv816-00746', 'optionale-positionen', 'optionale-positionen-sub', `Gutjahr IndorTec THERM-E Komplettset TD 3-in-1 Elektro-Flächenheizung`, 'uv816-00746', 395.95, 'Stk', `Gutjahr IndorTec THERM-E Komplettset TD 3-in-1 Elektro-Flächenheizung`, false, true, 1, 'optional'),
            createProduct('bode-100-2-op', 'optionale-positionen', 'optionale-positionen-sub', `AUSGLEICH-Boden | max. 1 cm der Bodenfläche`, 'BODE-100-2-OP', 39.9, 'qm', `max. 1 cm der Bodenfläche`, false, true, 1, 'optional')
          ]
        }
      ]
    }
  ]
};

export const packageKuecheElektroBeleuchtung: RenovationPackage = {
  id: 'kuecheElektroBeleuchtung',
  title: 'Elektro & Beleuchtung',
  defaultArea: 1,
  defaultFloorCount: 1,
  categories: [
    {
      id: 'art-der-ausfuehrung',
      title: 'Art der Ausführung',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'art-der-ausfuehrung-sub',
          title: 'Leistungen & Materialien',
          type: 'extra',
          products: [
            createProduct('elek-201-2-zu', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `HERDANSCHLUSS ZULEITUNG + DOSE | 🛠 Zusatz-Montage`, 'ELEK-201-2-ZU', 391.9, 'Stk', `🛠 Zusatz-Montage`, true, false, 1, 'extra'),
            createProduct('elek-301-1-zu', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `E-ZULEITUNG - ALS EINZELINSTALLATION (PRO 5 M) | 🛠 Zusatz-Montage`, 'ELEK-301-1-ZU', 159.9, 'Stk', `🛠 Zusatz-Montage`, true, false, 4, 'extra'),
            createProduct('elek-10002-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `BELEUCHTUNG | 🛠 Montage-Leistungspaket`, 'ELEK-10002-Basis', 129, 'Stk', `🛠 Montage-Leistungspaket`, false, false, 1, 'service'),
            createProduct('lht-1005368', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `SLV NUMINOS® MOVE S Einbaustrahler weiß 40°`, 'LHT-1005368', 68.02, 'Stk', `SLV NUMINOS® MOVE S Einbaustrahler weiß 40°`, false, false, 1, 'material')
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
          type: 'optional',
          products: [
            createProduct('elek-302-mat', 'material', 'material-sub', `STECKDOSE | Gira S 55 weiß |**Varianten**`, 'ELEK-302-MAT', 49.9, 'Stk', `Gira S 55 weiß |**Varianten**`, true, true, 8, 'optional'),
            createProduct('elek-301-mat', 'material', 'material-sub', `LICHTSCHALTER | Gira S 55 weiß |**Varianten**`, 'ELEK-301-MAT', 65.39, 'Stk', `Gira S 55 weiß |**Varianten**`, true, true, 2, 'optional')
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
            createProduct('elek-101-2-mat', 'optionale-positionen', 'optionale-positionen-sub', `SICHERUNGSKASTEN | 🛠 Montage-Leistungspaket`, 'ELEK-101.2-MAT', 1678.5, 'Stk', `🛠 Montage-Leistungspaket`, false, true, 1, 'optional')
          ]
        }
      ]
    }
  ]
};

export const packageKuecheWasserinstallation: RenovationPackage = {
  id: 'kuecheWasserinstallation',
  title: 'Wasserinstallation',
  defaultArea: 1,
  defaultFloorCount: 1,
  categories: [
    {
      id: 'art-der-ausfuehrung',
      title: 'Art der Ausführung',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'art-der-ausfuehrung-sub',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('wass-300-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `WASSERINSTALLATION KÜCHE | 🛠 Montage-Leistungspaket`, 'WASS-300-BASIS', 995.9, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'service'),
            createProduct('bade-503-mon', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `ARMATUR | 🛠 Montage`, 'BADE-503-MON', 190, 'Stk', `🛠 Montage`, false, false, 1, 'service'),
            createProduct('grandisehdm6', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `Küchen-EHM Grandis E HD-M Infrarot Batteriebetrieb 6V chrom Schell`, 'GRANDISEHDM6', 1096.92, 'Stk', `Küchen-EHM Grandis E HD-M Infrarot Batteriebetrieb 6V chrom Schell`, false, false, 1, 'material')
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
            createProduct('tr3500to5t', 'optionale-positionen', 'optionale-positionen-sub', `BOSCH Kleinspeicher TR3500TO 5 T 435x270x240 2,2kW 5l Druck/Tropfstopp`, 'TR3500TO5T', 164.34, 'Stk', `BOSCH Kleinspeicher TR3500TO 5 T 435x270x240 2,2kW 5l Druck/Tropfstopp`, false, true, 1, 'optional')
          ]
        }
      ]
    }
  ]
};
