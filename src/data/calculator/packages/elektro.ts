import type { RenovationPackage, RenovationProduct } from '../types';

function createProduct(
  id: string,
  category: string,
  subcategory: string,
  title: string,
  basePrice: number,
  unit: string,
  description: string,
  enabled = true,
  optional = false,
  baseQuantity = 1,
  sku = '',
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
    scalable: false,
    quantity: baseQuantity,
    canDuplicate: false,
    canRemove: true,
    canReplace: false,
    description,
    alternatives: []
  };
}

export const packageElektroAlles: RenovationPackage = {
  id: 'elektroAlles',
  title: 'Alles zu Elektroinstallation',
  defaultArea: 5,
  defaultFloorCount: 1,
  categories: [
    {
      id: 'basis',
      title: 'Basis',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'basis-sub',
          title: 'Basis',
          type: 'service',
          products: [
            createProduct('elek-100-basis', 'basis', 'basis-sub', `ELEKTRO-NEUINSTALLATION (pro Etage)`, 1995.9, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'ELEK-100-BASIS', 'service')
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
          title: 'Extra Positionen',
          type: 'extra',
          products: [
            createProduct('elek-201-1-zu', 'extra-positionen', 'extra-positionen-sub', `ZULEITUNGEN SET`, 3495.9, 'Stk', `8X SCHALTER/ 25X STECKDOSEN (PRO ETAGE) | 🛠 Zusatz-Montage`, true, false, 1, 'ELEK-201-1-ZU', 'extra'),
            createProduct('elek-101-2-mat', 'extra-positionen', 'extra-positionen-sub', `SICHERUNGSKASTEN`, 1678.5, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'ELEK-101.2-MAT', 'extra'),
            createProduct('elek-201-2-zu', 'extra-positionen', 'extra-positionen-sub', `HERDANSCHLUSS ZULEITUNG + DOSE`, 391.9, 'Stk', `🛠 Zusatz-Montage`, true, false, 1, 'ELEK-201-2-ZU', 'extra'),
            createProduct('elek-201-3-zu', 'extra-positionen', 'extra-positionen-sub', `MAUERSCHLITZE BETON`, 69.25, 'Stk', `HERSTELLEN PRO ELEKTROELEMENT | 🛠 Zusatz-Montage`, true, false, 1, 'ELEK-201-3-ZU', 'extra'),
            createProduct('elek-310-mat', 'extra-positionen', 'extra-positionen-sub', `ELEKTRO_CHECK (pro Etage)`, 295.9, 'Stk', `ELEKTRO_CHECK (pro Etage)`, true, false, 1, 'ELEK-310-MAT', 'extra'),
            createProduct('elek-201-3-zu-2', 'extra-positionen', 'extra-positionen-sub', `MAUERSCHLITZE BETON`, 69.25, 'Stk', `HERSTELLEN PRO ELEKTROELEMENT | 🛠 Zusatz-Montage`, true, false, 1, 'ELEK-201-3-ZU', 'extra'),
            createProduct('elek-310-mat-2', 'extra-positionen', 'extra-positionen-sub', `ELEKTRO_CHECK (pro Etage)`, 295.9, 'Stk', `ELEKTRO_CHECK (pro Etage)`, true, false, 1, 'ELEK-310-MAT', 'extra')
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
          title: 'Material',
          type: 'optional',
          products: [
            createProduct('elek-201-mat', 'material', 'material-sub', `SCHALTER/STECKD. SET 25/8`, 1495.9, 'Stk', `Gira S 55 weiß | **Varianten**`, false, true, 1, 'ELEK-201-MAT', 'optional'),
            createProduct('elek-302-mat', 'material', 'material-sub', `STECKDOSE`, 49.9, 'Stk', `Gira S 55 weiß | **Varianten**`, false, true, 1, 'ELEK-302-MAT', 'optional'),
            createProduct('elek-301-mat', 'material', 'material-sub', `LICHTSCHALTER`, 65.39, 'Stk', `Gira S 55 weiß | **Varianten**`, false, true, 1, 'ELEK-301-MAT', 'optional'),
            createProduct('elek-201-2-zu-2', 'material', 'material-sub', `HERDANSCHLUSS ZULEITUNG + DOSE`, 391.9, 'Stk', `🛠 Zusatz-Montage`, true, false, 1, 'ELEK-201-2-ZU', 'extra'),
            createProduct('elek-101-2-mat-2', 'material', 'material-sub', `SICHERUNGSKASTEN`, 1678.5, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'ELEK-101.2-MAT', 'service')
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
          title: 'Optionale Positionen',
          type: 'optional',
          products: [
            createProduct('elek-301-zu', 'optionale-positionen', 'optionale-positionen-sub', `IT NETZWERKINSTALLATION`, 1978.96, 'Stk', `SET BIS 50 QM | 🛠 Zusatz-Montage`, false, true, 1, 'ELEK-301-ZU', 'optional'),
            createProduct('elek-401-1-mat', 'optionale-positionen', 'optionale-positionen-sub', `LED-EINBAUSTPOST (3 Stück)`, 395.01, 'Stk', `🛠 Montage-Leistungspaket`, false, true, 1, 'ELEK-401.1-MAT', 'optional'),
            createProduct('elek-100-au', 'optionale-positionen', 'optionale-positionen-sub', `Weitere Produkte zu ELEKTROINSTALLATION`, 0, 'Stk', `**Varianten**`, false, true, 1, 'ELEK-100-AU', 'optional'),
            createProduct('elek-301-1-zu', 'optionale-positionen', 'optionale-positionen-sub', `E-ZULEITUNG - ALS EINZELINSTALLATION (PRO 5 M)`, 159.9, 'Stk', `🛠 Zusatz-Montage`, false, true, 1, 'ELEK-301-1-ZU', 'optional')
          ]
        }
      ]
    },
    {
      id: 'it-netzwerk-basis-haus',
      title: 'IT-NETZWERK | Basis-Haus',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'it-netzwerk-basis-haus-sub',
          title: 'IT-NETZWERK | Basis-Haus',
          type: 'extra',
          products: [
            createProduct('elek-301-zu-2', 'it-netzwerk-basis-haus', 'it-netzwerk-basis-haus-sub', `IT NETZWERKINSTALLATION`, 1978.96, 'Stk', `SET BIS 50 QM | 🛠 Zusatz-Montage`, true, false, 1, 'ELEK-301-ZU', 'extra')
          ]
        }
      ]
    },
    {
      id: 'lampen-leuchtmittel-basis-haus',
      title: 'LAMPEN & LEUCHTMITTEL | Basis-Haus',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'lampen-leuchtmittel-basis-haus-sub',
          title: 'LAMPEN & LEUCHTMITTEL | Basis-Haus',
          type: 'service',
          products: [
            createProduct('elek-401-1-mat-2', 'lampen-leuchtmittel-basis-haus', 'lampen-leuchtmittel-basis-haus-sub', `LED-EINBAUSTPOST (3 Stück)`, 395.01, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'ELEK-401.1-MAT', 'service')
          ]
        }
      ]
    }
  ]
};

export const packageElektroNeuinstallation: RenovationPackage = {
  id: 'elektroNeuinstallation',
  title: 'Neuinstallation pro Etage',
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
          title: 'Basis',
          type: 'service',
          products: [
            createProduct('elek-100-basis', 'basis', 'basis-sub', `ELEKTRO-NEUINSTALLATION (pro Etage)`, 1995.9, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 2, 'ELEK-100-BASIS', 'service')
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
          title: 'Extra Positionen',
          type: 'extra',
          products: [
            createProduct('elek-201-1-zu', 'extra-positionen', 'extra-positionen-sub', `ZULEITUNGEN SET`, 3495.9, 'Stk', `8X SCHALTER/ 25X STECKDOSEN (PRO ETAGE) | 🛠 Zusatz-Montage`, true, false, 2, 'ELEK-201-1-ZU', 'extra'),
            createProduct('elek-101-2-mat', 'extra-positionen', 'extra-positionen-sub', `SICHERUNGSKASTEN`, 1678.5, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'ELEK-101.2-MAT', 'extra'),
            createProduct('elek-201-2-zu', 'extra-positionen', 'extra-positionen-sub', `HERDANSCHLUSS ZULEITUNG + DOSE`, 391.9, 'Stk', `🛠 Zusatz-Montage`, true, false, 1, 'ELEK-201-2-ZU', 'extra'),
            createProduct('elek-201-3-zu', 'extra-positionen', 'extra-positionen-sub', `MAUERSCHLITZE BETON`, 69.25, 'Stk', `HERSTELLEN PRO ELEKTROELEMENT | 🛠 Zusatz-Montage`, true, false, 1, 'ELEK-201-3-ZU', 'extra')
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
          title: 'Material',
          type: 'optional',
          products: [
            createProduct('elek-201-mat', 'material', 'material-sub', `SCHALTER/STECKD. SET 25/8`, 1495.9, 'Stk', `Gira S 55 weiß | **Varianten**`, false, true, 2, 'ELEK-201-MAT', 'optional')
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
          title: 'Optionale Positionen',
          type: 'optional',
          products: [
            createProduct('elek-301-zu', 'optionale-positionen', 'optionale-positionen-sub', `IT NETZWERKINSTALLATION`, 1978.96, 'Stk', `SET BIS 50 QM | 🛠 Zusatz-Montage`, false, true, 1, 'ELEK-301-ZU', 'optional'),
            createProduct('elek-401-1-mat', 'optionale-positionen', 'optionale-positionen-sub', `LED-EINBAUSTPOST (3 Stück)`, 395.01, 'Stk', `🛠 Montage-Leistungspaket`, false, true, 1, 'ELEK-401.1-MAT', 'optional'),
            createProduct('elek-100-au', 'optionale-positionen', 'optionale-positionen-sub', `Weitere Produkte zu ELEKTROINSTALLATION`, 0, 'Stk', `**Varianten**`, false, true, 1, 'ELEK-100-AU', 'optional')
          ]
        }
      ]
    }
  ]
};

export const packageElektroSicherungskasten: RenovationPackage = {
  id: 'elektroSicherungskasten',
  title: 'Sicherungskasten',
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
          title: 'Basis',
          type: 'service',
          products: [
            createProduct('elek-101-2-mat', 'basis', 'basis-sub', `SICHERUNGSKASTEN`, 1678.5, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'ELEK-101.2-MAT', 'service')
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
          title: 'Optionale Positionen',
          type: 'optional',
          products: [
            createProduct('elek-310-mat', 'optionale-positionen', 'optionale-positionen-sub', `ELEKTRO_CHECK (pro Etage)`, 295.9, 'Stk', `ELEKTRO_CHECK (pro Etage)`, false, true, 1, 'ELEK-310-MAT', 'optional')
          ]
        }
      ]
    }
  ]
};

export const packageElektroNetzwerk: RenovationPackage = {
  id: 'elektroNetzwerk',
  title: 'Netzwerk & Bus',
  defaultArea: 50,
  defaultFloorCount: 1,
  categories: [
    {
      id: 'basis',
      title: 'Basis',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'basis-sub',
          title: 'Basis',
          type: 'extra',
          products: [
            createProduct('elek-301-zu', 'basis', 'basis-sub', `IT NETZWERKINSTALLATION`, 1978.96, 'Stk', `SET BIS 50 QM | 🛠 Zusatz-Montage`, true, false, 1, 'ELEK-301-ZU', 'extra')
          ]
        }
      ]
    }
  ]
};

export const packageElektroEinzelinstallation: RenovationPackage = {
  id: 'elektroEinzelinstallation',
  title: 'Einzelinstallation',
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
          title: 'Basis',
          type: 'extra',
          products: [
            createProduct('elek-301-1-zu', 'basis', 'basis-sub', `E-ZULEITUNG - ALS EINZELINSTALLATION (PRO 5 M)`, 159.9, 'Stk', `🛠 Zusatz-Montage`, true, false, 1, 'ELEK-301-1-ZU', 'extra')
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
          title: 'Material',
          type: 'optional',
          products: [
            createProduct('elek-302-mat', 'material', 'material-sub', `STECKDOSE`, 49.9, 'Stk', `Gira S 55 weiß | **Varianten**`, false, true, 2, 'ELEK-302-MAT', 'optional'),
            createProduct('elek-301-mat', 'material', 'material-sub', `LICHTSCHALTER`, 65.39, 'Stk', `Gira S 55 weiß | **Varianten**`, false, true, 1, 'ELEK-301-MAT', 'optional'),
            createProduct('elek-201-2-zu', 'material', 'material-sub', `HERDANSCHLUSS ZULEITUNG + DOSE`, 391.9, 'Stk', `🛠 Zusatz-Montage`, true, false, 1, 'ELEK-201-2-ZU', 'extra'),
            createProduct('elek-101-2-mat', 'material', 'material-sub', `SICHERUNGSKASTEN`, 1678.5, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'ELEK-101.2-MAT', 'service')
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
          title: 'Extra Positionen',
          type: 'extra',
          products: [
            createProduct('elek-201-3-zu', 'extra-positionen', 'extra-positionen-sub', `MAUERSCHLITZE BETON`, 69.25, 'Stk', `HERSTELLEN PRO ELEKTROELEMENT | 🛠 Zusatz-Montage`, true, false, 1, 'ELEK-201-3-ZU', 'extra'),
            createProduct('elek-310-mat', 'extra-positionen', 'extra-positionen-sub', `ELEKTRO_CHECK (pro Etage)`, 295.9, 'Stk', `ELEKTRO_CHECK (pro Etage)`, true, false, 1, 'ELEK-310-MAT', 'extra')
          ]
        }
      ]
    },
    {
      id: 'it-netzwerk-basis-haus',
      title: 'IT-NETZWERK | Basis-Haus',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'it-netzwerk-basis-haus-sub',
          title: 'IT-NETZWERK | Basis-Haus',
          type: 'extra',
          products: [
            createProduct('elek-301-zu', 'it-netzwerk-basis-haus', 'it-netzwerk-basis-haus-sub', `IT NETZWERKINSTALLATION`, 1978.96, 'Stk', `SET BIS 50 QM | 🛠 Zusatz-Montage`, true, false, 1, 'ELEK-301-ZU', 'extra')
          ]
        }
      ]
    },
    {
      id: 'lampen-leuchtmittel-basis-haus',
      title: 'LAMPEN & LEUCHTMITTEL | Basis-Haus',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'lampen-leuchtmittel-basis-haus-sub',
          title: 'LAMPEN & LEUCHTMITTEL | Basis-Haus',
          type: 'service',
          products: [
            createProduct('elek-401-1-mat', 'lampen-leuchtmittel-basis-haus', 'lampen-leuchtmittel-basis-haus-sub', `LED-EINBAUSTPOST (3 Stück)`, 395.01, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'ELEK-401.1-MAT', 'service')
          ]
        }
      ]
    }
  ]
};

export const packageElektroLichttechnik: RenovationPackage = {
  id: 'elektroLichttechnik',
  title: 'Lichttechnik & Beleuchtung',
  defaultArea: 3,
  defaultFloorCount: 1,
  categories: [
    {
      id: 'basis',
      title: 'Basis',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'basis-sub',
          title: 'Basis',
          type: 'service',
          products: [
            createProduct('elek-10002-basis', 'basis', 'basis-sub', `BELEUCHTUNG`, 129, 'Stk.', `🛠 Montage-Leistungspaket`, true, false, 4, 'ELEK-10002-Basis', 'service')
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
          title: 'Material',
          type: 'material',
          products: [
            createProduct('lht-1005368', 'material', 'material-sub', `SLV NUMINOS® MOVE S Einbaustrahler weiß 40°`, 68.02, 'Stk.', `SLV NUMINOS® MOVE S Einbaustrahler weiß 40°`, true, false, 4, 'LHT-1005368', 'material')
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
          title: 'Optionale Positionen',
          type: 'optional',
          products: [
            createProduct('lht-93567', 'optionale-positionen', 'optionale-positionen-sub', `LED Möbel-Aufbauleuchten Set, 3x3,2W, rund`, 99.63, 'Stk.', `LED Möbel-Aufbauleuchten Set, 3x3,2W, rund`, false, true, 1, 'LHT-93567', 'optional'),
            createProduct('lht-94741', 'optionale-positionen', 'optionale-positionen-sub', `LED Pollerleuchte Bako 50cm IP44 Anthrazit`, 54.54, 'Stk.', `LED Pollerleuchte Bako 50cm IP44 Anthrazit`, false, true, 1, 'LHT-94741', 'optional'),
            createProduct('lht-3230-61-102', 'optionale-positionen', 'optionale-positionen-sub', `"FABAS LUCE WIGTON Deckenleuchte Weiß IP65"`, 73.03, 'Stk.', `"FABAS LUCE WIGTON Deckenleuchte Weiß IP65"`, false, true, 1, 'LHT-3230-61-102', 'optional'),
            createProduct('lht-3561-46-101', 'optionale-positionen', 'optionale-positionen-sub', `"Allegra Pendelleuchte 90cm E27 Schwarz"`, 261.13, 'Stk.', `"Allegra Pendelleuchte 90cm E27 Schwarz"`, false, true, 1, 'LHT-3561-46-101', 'optional'),
            createProduct('lht-9069-22-pn', 'optionale-positionen', 'optionale-positionen-sub', `"ETON Wandleuchte in Betonoptik, Paul Neuhaus"`, 58.73, 'Stk.', `"ETON Wandleuchte in Betonoptik, Paul Neuhaus"`, false, true, 1, 'LHT-9069-22-PN', 'optional')
          ]
        }
      ]
    }
  ]
};

export const packageElektroFreeHome: RenovationPackage = {
  id: 'elektroFreeHome',
  title: 'Free Home',
  defaultArea: 1,
  defaultFloorCount: 1,
  categories: [
    {
      id: 'material',
      title: 'Material',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'material-sub',
          title: 'Material',
          type: 'material',
          products: [
            createProduct('mat-anfrage', 'material', 'material-sub', `AUF ANFRAGE & BEMUSTERUNG DER MATERIALIEN`, 0, 'Stk.', `AUF ANFRAGE & BEMUSTERUNG DER MATERIALIEN`, true, false, 1, 'MAT-Anfrage', 'material')
          ]
        }
      ]
    }
  ]
};

export const packageElektroRolladen: RenovationPackage = {
  id: 'elektroRolladen',
  title: 'Rolladen-Steuerung',
  defaultArea: 3,
  defaultFloorCount: 1,
  categories: [
    {
      id: 'basis',
      title: 'Basis',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'basis-sub',
          title: 'Basis',
          type: 'extra',
          products: [
            createProduct('elek-301-1-zu', 'basis', 'basis-sub', `E-ZULEITUNG - ALS EINZELINSTALLATION (PRO 5 M)`, 159.9, 'Stk', `🛠 Zusatz-Montage`, true, false, 1, 'ELEK-301-1-ZU', 'extra')
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
          title: 'Material',
          type: 'optional',
          products: [
            createProduct('elek-501-mat', 'material', 'material-sub', `JALOUSIESCHALTER`, 203.94, 'Stk', `Free-Home | **Varianten**`, false, true, 1, 'ELEK-501-MAT', 'optional')
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
          title: 'Extra Positionen',
          type: 'extra',
          products: [
            createProduct('elek-601-27', 'extra-positionen', 'extra-positionen-sub', `Verteilerkomponenten Rollo Steuerung`, 1683, 'Stk', `Verteilerkomponenten Rollo Steuerung`, true, false, 1, 'ELEK-601.27', 'extra')
          ]
        }
      ]
    }
  ]
};

export const packageElektroSprechanlagen: RenovationPackage = {
  id: 'elektroSprechanlagen',
  title: 'Sprechanlagen',
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
          title: 'Basis',
          type: 'service',
          products: [
            createProduct('elek-10003-basis', 'basis', 'basis-sub', `SPRECHANLAGEN`, 289, 'Stk.', `🛠 Montage-Leistungspaket`, true, false, 1, 'ELEK-10003-Basis', 'service')
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
          title: 'Material',
          type: 'material',
          products: [
            createProduct('mat-anfrage', 'material', 'material-sub', `AUF ANFRAGE & BEMUSTERUNG DER MATERIALIEN`, 0, 'Stk.', `AUF ANFRAGE & BEMUSTERUNG DER MATERIALIEN`, true, false, 1, 'MAT-Anfrage', 'material')
          ]
        }
      ]
    }
  ]
};

