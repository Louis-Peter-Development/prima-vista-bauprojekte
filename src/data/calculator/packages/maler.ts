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

export const packageMalerAlles: RenovationPackage = {
  id: 'malerAlles',
  title: 'Alles zu Maler',
  defaultArea: 200,
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
            createProduct('male-100-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `MALER (pro Etage) | 🛠 Montage-Leistungspaket`, 'MALE-100-BASIS', 355.5, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'service'),
            createProduct('male-101-mat', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `GLÄTTUNG MIT FEINSPACHTEL | 🛠 Montage-Leistungspaket`, 'MALE-101-MAT', 17.9, 'qm', `🛠 Montage-Leistungspaket`, true, false, 1, 'service'),
            createProduct('male-201-mat', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `ANSTRICH | 🛠 Montage-Leistungspaket`, 'MALE-201-MAT', 9.85, 'qm', `🛠 Montage-Leistungspaket`, true, false, 1, 'service')
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
            createProduct('male-101-1-zu', 'extra-positionen', 'extra-positionen-sub', `GRUNDIERUNG - DER FLÄCHEN | 🛠 Zusatz-Montage`, 'MALE-101-1-ZU', 3.91, 'qm', `🛠 Zusatz-Montage`, true, false, 1, 'extra'),
            createProduct('male-101-2-zu', 'extra-positionen', 'extra-positionen-sub', `ALT-TAPETEN |🛠 Demontage & Entsorgung`, 'MALE-101-2-ZU', 7.87, 'qm', `🛠 Demontage & Entsorgung`, true, false, 1, 'extra')
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
            createProduct('male-301-1-mat', 'optionale-positionen', 'optionale-positionen-sub', `ZIMMERTÜREN LACKIERUNG | 🛠 Montage-Leistungspaket`, 'MALE-301.1-MAT', 178.15, 'Stk', `🛠 Montage-Leistungspaket`, false, true, 1, 'optional'),
            createProduct('male-301-2-mat', 'optionale-positionen', 'optionale-positionen-sub', `FENSTER LACKIERUNG | 🛠 Montage-Leistungspaket`, 'MALE-301.2-MAT', 98.9, 'qm', `🛠 Montage-Leistungspaket`, false, true, 1, 'optional'),
            createProduct('male-301-3-mat', 'optionale-positionen', 'optionale-positionen-sub', `HEIZKÖRPER LACKIERUNG | 🛠 Montage-Leistungspaket`, 'MALE-301.3-MAT', 118.75, 'lfm', `🛠 Montage-Leistungspaket`, false, true, 1, 'optional'),
            createProduct('male-301-4-mat', 'optionale-positionen', 'optionale-positionen-sub', `HOLZDECKEN LACKIERUNG | 🛠 Montage-Leistungspaket`, 'MALE-301.4-MAT', 39.55, 'qm', `🛠 Montage-Leistungspaket`, false, true, 1, 'optional'),
            createProduct('male-301-5-mat', 'optionale-positionen', 'optionale-positionen-sub', `TREPPENSTUFEN LACKIERUNG | 🛠 Montage-Leistungspaket`, 'MALE-301.5-MAT', 99, 'Stk', `🛠 Montage-Leistungspaket`, false, true, 1, 'optional'),
            createProduct('male-301-6-mat', 'optionale-positionen', 'optionale-positionen-sub', `TREPPENGELÄNDER LACKIERUNG | 🛠 Montage-Leistungspaket`, 'MALE-301.6-MAT', 589.9, 'Stk', `🛠 Montage-Leistungspaket`, false, true, 1, 'optional')
          ]
        }
      ]
    }
  ]
};

export const packageMalerAnstrich: RenovationPackage = {
  id: 'malerAnstrich',
  title: 'Anstrich',
  defaultArea: 200,
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
            createProduct('male-100-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `MALER (pro Etage) | 🛠 Montage-Leistungspaket`, 'MALE-100-BASIS', 355.5, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'service'),
            createProduct('male-201-mat', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `ANSTRICH | 🛠 Montage-Leistungspaket`, 'MALE-201-MAT', 9.85, 'qm', `🛠 Montage-Leistungspaket`, true, false, 200, 'service')
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
            createProduct('male-101-1-zu', 'optionale-positionen', 'optionale-positionen-sub', `GRUNDIERUNG - DER FLÄCHEN | 🛠 Zusatz-Montage`, 'MALE-101-1-ZU', 3.91, 'qm', `🛠 Zusatz-Montage`, false, true, 1, 'optional')
          ]
        }
      ]
    }
  ]
};

export const packageMalerGlaettenAnstrich: RenovationPackage = {
  id: 'malerGlaettenAnstrich',
  title: 'Glätten & Anstrich',
  defaultArea: 200,
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
            createProduct('male-100-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `MALER (pro Etage) | 🛠 Montage-Leistungspaket`, 'MALE-100-BASIS', 355.5, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'service'),
            createProduct('male-101-mat', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `GLÄTTUNG MIT FEINSPACHTEL | 🛠 Montage-Leistungspaket`, 'MALE-101-MAT', 17.9, 'qm', `🛠 Montage-Leistungspaket`, true, false, 200, 'service'),
            createProduct('male-201-mat', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `ANSTRICH | 🛠 Montage-Leistungspaket`, 'MALE-201-MAT', 9.85, 'qm', `🛠 Montage-Leistungspaket`, true, false, 200, 'service')
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
            createProduct('male-101-2-zu', 'optionale-positionen', 'optionale-positionen-sub', `ALT-TAPETEN |🛠 Demontage & Entsorgung`, 'MALE-101-2-ZU', 7.87, 'qm', `🛠 Demontage & Entsorgung`, false, true, 1, 'optional'),
            createProduct('male-101-1-zu', 'optionale-positionen', 'optionale-positionen-sub', `GRUNDIERUNG - DER FLÄCHEN | 🛠 Zusatz-Montage`, 'MALE-101-1-ZU', 3.91, 'qm', `🛠 Zusatz-Montage`, false, true, 1, 'optional')
          ]
        }
      ]
    }
  ]
};

export const packageMalerTapezieren: RenovationPackage = {
  id: 'malerTapezieren',
  title: 'Tapezieren',
  defaultArea: 200,
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
            createProduct('male-100-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `MALER (pro Etage) | 🛠 Montage-Leistungspaket`, 'MALE-100-BASIS', 355.5, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'service'),
            createProduct('male-101-2-mat', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `Tapezieren der Wände & Decken`, 'MALE-101.2-MAT', 21.73, 'qm', `Tapezieren der Wände & Decken`, true, false, 200, 'material'),
            createProduct('male-201-mat', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `ANSTRICH | 🛠 Montage-Leistungspaket`, 'MALE-201-MAT', 9.85, 'qm', `🛠 Montage-Leistungspaket`, true, false, 200, 'service')
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
            createProduct('male-101-2-zu', 'optionale-positionen', 'optionale-positionen-sub', `ALT-TAPETEN |🛠 Demontage & Entsorgung`, 'MALE-101-2-ZU', 7.87, 'qm', `🛠 Demontage & Entsorgung`, false, true, 1, 'optional'),
            createProduct('male-101-1-zu', 'optionale-positionen', 'optionale-positionen-sub', `GRUNDIERUNG - DER FLÄCHEN | 🛠 Zusatz-Montage`, 'MALE-101-1-ZU', 3.91, 'qm', `🛠 Zusatz-Montage`, false, true, 1, 'optional')
          ]
        }
      ]
    }
  ]
};

export const packageMalerDeckenLackierung: RenovationPackage = {
  id: 'malerDeckenLackierung',
  title: 'Holzdecken',
  defaultArea: 50,
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
            createProduct('male-301-4-mat', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `HOLZDECKEN LACKIERUNG | 🛠 Montage-Leistungspaket`, 'MALE-301.4-MAT', 39.55, 'qm', `🛠 Montage-Leistungspaket`, true, false, 100, 'service')
          ]
        }
      ]
    }
  ]
};

export const packageMalerHeizkoerperLackierung: RenovationPackage = {
  id: 'malerHeizkoerperLackierung',
  title: 'Heizkörper',
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
            createProduct('male-301-3-mat', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `HEIZKÖRPER LACKIERUNG | 🛠 Montage-Leistungspaket`, 'MALE-301.3-MAT', 118.75, 'lfm', `🛠 Montage-Leistungspaket`, true, false, 1, 'service')
          ]
        }
      ]
    }
  ]
};

export const packageMalerFensterLackierung: RenovationPackage = {
  id: 'malerFensterLackierung',
  title: 'Fenster',
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
            createProduct('male-301-2-mat', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `FENSTER LACKIERUNG | 🛠 Montage-Leistungspaket`, 'MALE-301.2-MAT', 98.9, 'qm', `🛠 Montage-Leistungspaket`, true, false, 1, 'service')
          ]
        }
      ]
    }
  ]
};

export const packageMalerTuerenLackierung: RenovationPackage = {
  id: 'malerTuerenLackierung',
  title: 'Türen',
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
            createProduct('male-301-1-mat', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `ZIMMERTÜREN LACKIERUNG | 🛠 Montage-Leistungspaket`, 'MALE-301.1-MAT', 178.15, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'service')
          ]
        }
      ]
    }
  ]
};

export const packageMalerTreppenGelaenderLackierung: RenovationPackage = {
  id: 'malerTreppenGelaenderLackierung',
  title: 'Treppen/Geländer',
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
            createProduct('male-301-5-mat', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `TREPPENSTUFEN LACKIERUNG | 🛠 Montage-Leistungspaket`, 'MALE-301.5-MAT', 99, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 15, 'service'),
            createProduct('trep-201-3-zu', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `AUFBEREITEN PODEST | JE PODEST (SCHLEIFEN & LACKIEREN) | 🛠 Zusatz-Montage`, 'TREP-201.3-ZU', 198, 'Stk', `JE PODEST (SCHLEIFEN & LACKIEREN) | 🛠 Zusatz-Montage`, true, false, 1, 'extra'),
            createProduct('male-301-6-mat', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `TREPPENGELÄNDER LACKIERUNG | 🛠 Montage-Leistungspaket`, 'MALE-301.6-MAT', 589.9, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'service')
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
            createProduct('trep-202-1-zu', 'optionale-positionen', 'optionale-positionen-sub', `VERKLEIDUNG STUFE | JE TREPPENSTUFE (MIT MASSIVHOLZ) | 🛠 Zusatz-Montage`, 'TREP-202.1-ZU', 149, 'Stk', `JE TREPPENSTUFE (MIT MASSIVHOLZ) | 🛠 Zusatz-Montage`, false, true, 1, 'optional'),
            createProduct('trep-203-1-zu', 'optionale-positionen', 'optionale-positionen-sub', `VERKLEIDUNG PODEST | JE PODEST (MIT MASSIVHOLZ) | 🛠 Zusatz-Montage`, 'TREP-203.1-ZU', 595, 'Stk', `JE PODEST (MIT MASSIVHOLZ) | 🛠 Zusatz-Montage`, false, true, 1, 'optional'),
            createProduct('tr-uv-11824', 'optionale-positionen', 'optionale-positionen-sub', `Treppenstufe Modell Samos`, 'TR-uv-11824', 57.48, 'Stk', `Treppenstufe Modell Samos`, false, true, 1, 'optional'),
            createProduct('tr-uv-11819', 'optionale-positionen', 'optionale-positionen-sub', `Setzstufen aus Massivholz`, 'TR-uv-11819', 57.48, 'Stk', `Setzstufen aus Massivholz`, false, true, 1, 'optional'),
            createProduct('mon-10077', 'optionale-positionen', 'optionale-positionen-sub', `STUFEN | FLIESEN | 🛠 Montage`, 'MON-10077', 79, 'Stk', `FLIESEN | 🛠 Montage`, false, true, 1, 'optional'),
            createProduct('144-12646', 'optionale-positionen', 'optionale-positionen-sub', `Agrob Buchtal Stufenplatte 25x35x1,4/4,2cm Goldline goldocker R11/A 851-9330`, '144-12646', 19.47, 'Stk', `Agrob Buchtal Stufenplatte 25x35x1,4/4,2cm Goldline goldocker R11/A 851-9330`, false, true, 1, 'optional')
          ]
        }
      ]
    }
  ]
};

export const packageMalerFassadenAnstrich: RenovationPackage = {
  id: 'malerFassadenAnstrich',
  title: 'Fassadenanstrich',
  defaultArea: 100,
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
            createProduct('fass-200-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `FASSADEN Anstrich | 🛠 Montage-Leistungspaket`, 'FASS-200-BASIS', 39, 'qm', `🛠 Montage-Leistungspaket`, true, false, 1, 'service')
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
            createProduct('uv868-00943', 'material', 'material-sub', `weber.ton 410 AquaBalance Silikatfarbe aussen`, 'uv868-00943', 159.5, 'Stk', `weber.ton 410 AquaBalance Silikatfarbe aussen`, true, false, 2, 'material')
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
            createProduct('fass-100-2-zu', 'extra-positionen', 'extra-positionen-sub', `FASSADENGERÜST STELLEN | 🛠 Zusatz-Montage`, 'FASS-100-2-ZU', 26.95, 'qm', `🛠 Zusatz-Montage`, true, false, 1, 'extra')
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
            createProduct('fass-100-2-op', 'optionale-positionen', 'optionale-positionen-sub', `ALT-FARBE | abkratzen`, 'FASS-100-2-OP', 5.09, 'qm', `abkratzen`, false, true, 1, 'optional'),
            createProduct('fass-100-au', 'optionale-positionen', 'optionale-positionen-sub', `Weitere Produkte - zu FASSADE |**Varianten**`, 'FASS-100-AU', 0, 'Stk', `**Varianten**`, false, true, 1, 'optional')
          ]
        }
      ]
    }
  ]
};
