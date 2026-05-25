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
    scalable: false,
    quantity: baseQuantity,
    canDuplicate: false,
    canRemove: true,
    canReplace: false,
    description,
    alternatives: []
  };
}

export const packageHeizmethodenAlles: RenovationPackage = {
  id: 'heizmethodenAlles',
  title: 'Alles zu Heizmethoden',
  defaultArea: 100,
  defaultFloorCount: 1,
  categories: [
    {
      id: 'bodenheizung-basis-haus',
      title: 'BODENHEIZUNG | Basis-Haus',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'bodenheizung-basis-haus-sub',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('heiz-100-basis', 'bodenheizung-basis-haus', 'bodenheizung-basis-haus-sub', `BODENHEIZUNG | 🛠 Montage-Leistungspaket`, 'HEIZ-100-BASIS', 89, 'qm', `🛠 Montage-Leistungspaket`, false, false, 1, 'service')
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
            createProduct('rohb-501-mat', 'extra-positionen', 'extra-positionen-sub', `ESTRICH | Trocken-Platten`, 'ROHB-501-MAT', 48.46, 'qm', `Trocken-Platten`, false, false, 1, 'extra'),
            createProduct('rohb-501-1-op', 'extra-positionen', 'extra-positionen-sub', `ALT-ESTRICH |🛠 Demontage & Entsorgung`, 'ROHB-501-1-OP', 45.89, 'qm', `🛠 Demontage & Entsorgung`, false, false, 1, 'extra')
          ]
        }
      ]
    },
    {
      id: 'flaechenheizsystem',
      title: 'FLÄCHENHEIZSYSTEM',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'flaechenheizsystem-sub',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('mon-10158', 'flaechenheizsystem', 'flaechenheizsystem-sub', `FLÄCHENHEIZSYSTEME | 🛠 Montage`, 'MON-10158', 69, 'qm', `🛠 Montage`, false, false, 3, 'service'),
            createProduct('uv722-00108', 'flaechenheizsystem', 'flaechenheizsystem-sub', `Warmup Aluminiumfolien-Heizsystem, für Holz-, Vinyl- und Laminatböden, 80 Watt`, 'uv722-00108', 219.93, 'Stk', `Kalkulationsposition fuer Montage, Material oder Zusatzleistung.`, false, false, 1, 'material')
          ]
        }
      ]
    },
    {
      id: 'heizkoerper',
      title: 'HEIZKÖRPER',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'heizkoerper-sub',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('heiz-101-mon', 'heizkoerper', 'heizkoerper-sub', `HEIZKÖRPER | 🛠 Montage`, 'HEIZ-101-MON', 149, 'Stk', `🛠 Montage`, false, false, 1, 'service'),
            createProduct('mon-10158-2', 'heizkoerper', 'heizkoerper-sub', `FLÄCHENHEIZSYSTEME | 🛠 Montage`, 'MON-10158', 69, 'qm', `🛠 Montage`, false, false, 1, 'service')
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
            createProduct('pt6333080', 'material', 'material-sub', `Plan-Flachheizkörper Cosmo T6 Typ 33 - 300 x 800 cm - (W) 1012`, 'PT6333080', 749, 'Stk', `Kalkulationsposition fuer Montage, Material oder Zusatzleistung.`, false, false, 1, 'material'),
            createProduct('uv835-1083-2', 'material', 'material-sub', `Ximax Elektro Raumheizkörper Fortuna Horizontal - weiß`, 'uv835-1083', 471.41, 'Stk', `Kalkulationsposition fuer Montage, Material oder Zusatzleistung.`, false, false, 1, 'material')
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
            createProduct('uv835-10017', 'optionale-positionen', 'optionale-positionen-sub', `Ximax Badheizkörper BIANCA - weiß`, 'uv835-10017', 388.95, 'Stk', `Kalkulationsposition fuer Montage, Material oder Zusatzleistung.`, false, true, 1, 'optional'),
            createProduct('uv835-1083', 'optionale-positionen', 'optionale-positionen-sub', `Ximax Elektro Raumheizkörper Fortuna Horizontal - weiß`, 'uv835-1083', 471.41, 'Stk', `Kalkulationsposition fuer Montage, Material oder Zusatzleistung.`, false, true, 1, 'optional'),
            createProduct('heiz-301-mat', 'optionale-positionen', 'optionale-positionen-sub', `HEIZSTRÄNGE bis max. 5 m | 🛠 Montage-Leistungspaket`, 'HEIZ-301-MAT', 434.56, 'Stk', `🛠 Montage-Leistungspaket`, false, true, 1, 'optional'),
            createProduct('heiz-301-3-mat', 'optionale-positionen', 'optionale-positionen-sub', `AP-HEIZSTRÄNGE | Neuinstallation (Aufputz Pro M)`, 'HEIZ-301.3-MAT', 88.06, 'lfm', `Neuinstallation (Aufputz Pro M)`, false, true, 1, 'optional'),
            createProduct('heiz-301-2-mat', 'optionale-positionen', 'optionale-positionen-sub', `UP-HEIZSTRÄNGE | Neuinstallation (Unterputz, Pro M)`, 'HEIZ-301.2-MAT', 118.75, 'lfm', `Neuinstallation (Unterputz, Pro M)`, false, true, 1, 'optional'),
            createProduct('uv835-981', 'optionale-positionen', 'optionale-positionen-sub', `Ximax Handtuchwärmer C3 Typ 1 - Chrom`, 'uv835-981', 489.81, 'Stk', `Kalkulationsposition fuer Montage, Material oder Zusatzleistung.`, false, true, 1, 'optional')
          ]
        }
      ]
    }
  ]
};

export const packageHeizmethodenHeizkoerper: RenovationPackage = {
  id: 'heizmethodenHeizkoerper',
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
            createProduct('heiz-101-mon', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `HEIZKÖRPER | 🛠 Montage`, 'HEIZ-101-MON', 149, 'Stk', `🛠 Montage`, true, false, 1, 'service')
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
            createProduct('pt6333080', 'material', 'material-sub', `Plan-Flachheizkörper Cosmo T6 Typ 33 - 300 x 800 cm - (W) 1012`, 'PT6333080', 749, 'Stk', `Kalkulationsposition fuer Montage, Material oder Zusatzleistung.`, true, false, 1, 'material')
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
            createProduct('uv835-10017', 'optionale-positionen', 'optionale-positionen-sub', `Ximax Badheizkörper BIANCA - weiß`, 'uv835-10017', 388.95, 'Stk', `Kalkulationsposition fuer Montage, Material oder Zusatzleistung.`, false, true, 1, 'optional'),
            createProduct('uv835-1083', 'optionale-positionen', 'optionale-positionen-sub', `Ximax Elektro Raumheizkörper Fortuna Horizontal - weiß`, 'uv835-1083', 471.41, 'Stk', `Kalkulationsposition fuer Montage, Material oder Zusatzleistung.`, false, true, 1, 'optional'),
            createProduct('heiz-301-mat', 'optionale-positionen', 'optionale-positionen-sub', `HEIZSTRÄNGE bis max. 5 m | 🛠 Montage-Leistungspaket`, 'HEIZ-301-MAT', 434.56, 'Stk', `🛠 Montage-Leistungspaket`, false, true, 1, 'optional'),
            createProduct('heiz-301-3-mat', 'optionale-positionen', 'optionale-positionen-sub', `AP-HEIZSTRÄNGE | Neuinstallation (Aufputz Pro M)`, 'HEIZ-301.3-MAT', 88.06, 'lfm', `Neuinstallation (Aufputz Pro M)`, false, true, 1, 'optional'),
            createProduct('heiz-301-2-mat', 'optionale-positionen', 'optionale-positionen-sub', `UP-HEIZSTRÄNGE | Neuinstallation (Unterputz, Pro M)`, 'HEIZ-301.2-MAT', 118.75, 'lfm', `Neuinstallation (Unterputz, Pro M)`, false, true, 1, 'optional')
          ]
        }
      ]
    }
  ]
};

export const packageHeizmethodenHeizstraenge: RenovationPackage = {
  id: 'heizmethodenHeizstraenge',
  title: 'Heizstränge',
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
          type: 'material',
          products: [
            createProduct('heiz-301-3-mat', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `AP-HEIZSTRÄNGE | Neuinstallation (Aufputz Pro M)`, 'HEIZ-301.3-MAT', 88.06, 'lfm', `Neuinstallation (Aufputz Pro M)`, true, false, 50, 'material')
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
            createProduct('heiz-301-2-mat', 'optionale-positionen', 'optionale-positionen-sub', `UP-HEIZSTRÄNGE | Neuinstallation (Unterputz, Pro M)`, 'HEIZ-301.2-MAT', 118.75, 'lfm', `Neuinstallation (Unterputz, Pro M)`, false, true, 1, 'optional'),
            createProduct('heiz-301-mat', 'optionale-positionen', 'optionale-positionen-sub', `HEIZSTRÄNGE bis max. 5 m | 🛠 Montage-Leistungspaket`, 'HEIZ-301-MAT', 434.56, 'Stk', `🛠 Montage-Leistungspaket`, false, true, 1, 'optional')
          ]
        }
      ]
    }
  ]
};

export const packageHeizmethodenFussbodenheizung: RenovationPackage = {
  id: 'heizmethodenFussbodenheizung',
  title: 'Fußbodenheizung',
  defaultArea: 100,
  defaultFloorCount: 1,
  categories: [
    {
      id: 'bodenheizung-basis-haus',
      title: 'BODENHEIZUNG | Basis-Haus',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'bodenheizung-basis-haus-sub',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('heiz-100-basis', 'bodenheizung-basis-haus', 'bodenheizung-basis-haus-sub', `BODENHEIZUNG | 🛠 Montage-Leistungspaket`, 'HEIZ-100-BASIS', 89, 'qm', `🛠 Montage-Leistungspaket`, true, false, 100, 'service')
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
            createProduct('rohb-501-mat', 'extra-positionen', 'extra-positionen-sub', `ESTRICH | Trocken-Platten`, 'ROHB-501-MAT', 48.46, 'qm', `Trocken-Platten`, false, false, 1, 'extra'),
            createProduct('rohb-501-1-op', 'extra-positionen', 'extra-positionen-sub', `ALT-ESTRICH |🛠 Demontage & Entsorgung`, 'ROHB-501-1-OP', 45.89, 'qm', `🛠 Demontage & Entsorgung`, false, false, 1, 'extra')
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
            createProduct('mon-10158', 'optionale-positionen', 'optionale-positionen-sub', `FLÄCHENHEIZSYSTEME | 🛠 Montage`, 'MON-10158', 69, 'qm', `🛠 Montage`, false, true, 3, 'optional'),
            createProduct('uv722-00108', 'optionale-positionen', 'optionale-positionen-sub', `Warmup Aluminiumfolien-Heizsystem, für Holz-, Vinyl- und Laminatböden, 80 Watt`, 'uv722-00108', 219.93, 'Stk', `Kalkulationsposition fuer Montage, Material oder Zusatzleistung.`, false, true, 1, 'optional')
          ]
        }
      ]
    }
  ]
};

export const packageHeizmethodenWaermepumpe: RenovationPackage = {
  id: 'heizmethodenWaermepumpe',
  title: 'Wärmepumpe',
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
            createProduct('heiz-400-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `WÄRMEPUMPEN | 🛠 Montage-Leistungspaket`, 'HEIZ-400-BASIS', 4500, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'service')
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
            createProduct('heiz-411-4-mat', 'material', 'material-sub', `12 KW - LG WÄRMEPUMPEN im Paket - TM187/123`, 'HEIZ-411.4-MAT', 10542.42, 'Stk', `Kalkulationsposition fuer Montage, Material oder Zusatzleistung.`, true, false, 1, 'material'),
            createProduct('heiz-411-zu', 'material', 'material-sub', `LG-ZUBEHÖR-SET - für LG Wärmepumpen`, 'HEIZ-411-ZU', 1500, 'Stk', `Kalkulationsposition fuer Montage, Material oder Zusatzleistung.`, true, false, 1, 'material')
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
            createProduct('heiz-431-1-zu', 'optionale-positionen', 'optionale-positionen-sub', `ALT-ÖLTANK |🛠 Demontage & Entsorgung`, 'HEIZ-431.1-ZU', 2900, 'Stk', `🛠 Demontage & Entsorgung`, false, true, 1, 'optional'),
            createProduct('heiz-401-basis', 'optionale-positionen', 'optionale-positionen-sub', `FUNDAMENT | für Therme & Wärmepumpe`, 'HEIZ-401-BASIS', 2495, 'Stk', `für Therme & Wärmepumpe`, false, true, 1, 'optional')
          ]
        }
      ]
    }
  ]
};

export const packageHeizmethodenGasHeizung: RenovationPackage = {
  id: 'heizmethodenGasHeizung',
  title: 'Gas-Heizung',
  defaultArea: 1,
  defaultFloorCount: 1,
  categories: [
    {
      id: 'thermen-waermepumpen-basis-haus-heiz-400-ue',
      title: 'THERMEN & WÄRMEPUMPEN | Basis-Haus HEIZ-400-UE',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'thermen-waermepumpen-basis-haus-heiz-400-ue-sub',
          title: 'Leistungen & Materialien',
          type: 'material',
          products: [
            createProduct('heiz-401-3-mat', 'thermen-waermepumpen-basis-haus-heiz-400-ue', 'thermen-waermepumpen-basis-haus-heiz-400-ue-sub', `Gas-Brennwert-Kessel 20 Kw (für Haus)`, 'HEIZ-401.3-MAT', 10588.99, 'Stk', `Kalkulationsposition fuer Montage, Material oder Zusatzleistung.`, true, false, 1, 'material'),
            createProduct('heiz-403-13-mat', 'thermen-waermepumpen-basis-haus-heiz-400-ue', 'thermen-waermepumpen-basis-haus-heiz-400-ue-sub', `Gas-Kombitherme 20-24 Kw (für Wohnung)`, 'HEIZ-403.13-MAT', 3955.9, 'Stk', `Kalkulationsposition fuer Montage, Material oder Zusatzleistung.`, true, false, 1, 'material')
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
            createProduct('heiz-401-basis', 'optionale-positionen', 'optionale-positionen-sub', `FUNDAMENT | für Therme & Wärmepumpe`, 'HEIZ-401-BASIS', 2495, 'Stk', `für Therme & Wärmepumpe`, false, true, 1, 'optional'),
            createProduct('heiz-431-1-zu', 'optionale-positionen', 'optionale-positionen-sub', `ALT-ÖLTANK |🛠 Demontage & Entsorgung`, 'HEIZ-431.1-ZU', 2900, 'Stk', `🛠 Demontage & Entsorgung`, false, true, 1, 'optional')
          ]
        }
      ]
    }
  ]
};

export const packageHeizmethodenOelHeizung: RenovationPackage = {
  id: 'heizmethodenOelHeizung',
  title: 'Öl-Heizung',
  defaultArea: 1,
  defaultFloorCount: 1,
  categories: [
    {
      id: 'thermen-waermepumpen-basis-haus-heiz-400-ue',
      title: 'THERMEN & WÄRMEPUMPEN | Basis-Haus HEIZ-400-UE',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'thermen-waermepumpen-basis-haus-heiz-400-ue-sub',
          title: 'Leistungen & Materialien',
          type: 'material',
          products: [
            createProduct('heiz-402-2-mat', 'thermen-waermepumpen-basis-haus-heiz-400-ue', 'thermen-waermepumpen-basis-haus-heiz-400-ue-sub', `Öl-Brennwert-Kessel 24 Kw (für Haus)`, 'HEIZ-402.2-MAT', 12370.99, 'Stk', `Kalkulationsposition fuer Montage, Material oder Zusatzleistung.`, true, false, 1, 'material')
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
            createProduct('heiz-401-basis', 'optionale-positionen', 'optionale-positionen-sub', `FUNDAMENT | für Therme & Wärmepumpe`, 'HEIZ-401-BASIS', 2495, 'Stk', `für Therme & Wärmepumpe`, false, true, 1, 'optional'),
            createProduct('heiz-431-1-zu', 'optionale-positionen', 'optionale-positionen-sub', `ALT-ÖLTANK |🛠 Demontage & Entsorgung`, 'HEIZ-431.1-ZU', 2900, 'Stk', `🛠 Demontage & Entsorgung`, false, true, 1, 'optional')
          ]
        }
      ]
    }
  ]
};

export const packageHeizmethodenPelletofen: RenovationPackage = {
  id: 'heizmethodenPelletofen',
  title: 'Pelletofen',
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
            createProduct('heiz-10014-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `PELLETTHEIZUNG | 🛠 Montage-Leistungspaket`, 'HEIZ-10014-Basis', 2000, 'qm', `🛠 Montage-Leistungspaket`, true, false, 1, 'service')
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
            createProduct('heiz-405-mat', 'extra-positionen', 'extra-positionen-sub', `PELLETTHEIZUNG | Vitoligno 300 - 12kW`, 'HEIZ-405-MAT', 9900, 'Stk', `Vitoligno 300 - 12kW`, true, false, 1, 'extra'),
            createProduct('743-1204', 'extra-positionen', 'extra-positionen-sub', `Wienerberger LAS 1216 LW Kamtec Kaminsystem 1 stgm, HAN.: 34765146`, '743-1204', 545.6, 'Stk', `Kalkulationsposition fuer Montage, Material oder Zusatzleistung.`, false, false, 1, 'extra'),
            createProduct('743-10076', 'extra-positionen', 'extra-positionen-sub', `Wienerberger Kamtec Abströmkopf ASK 120, HAN.: 30056461`, '743-10076', 190.3, 'Stk', `Kalkulationsposition fuer Montage, Material oder Zusatzleistung.`, false, false, 1, 'extra'),
            createProduct('743-10042', 'extra-positionen', 'extra-positionen-sub', `Wienerberger Kamtec Krag und Abdeckplatte KP/AP-U 20 W für Untermauerung einzügig, HAN.: 34765655`, '743-10042', 457.6, 'Stk', `Kalkulationsposition fuer Montage, Material oder Zusatzleistung.`, false, false, 1, 'extra'),
            createProduct('743-10068', 'extra-positionen', 'extra-positionen-sub', `Wienerberger Kamtec ISSr Fugenkleber, HAN.: 30054461`, '743-10068', 68.75, 'Stk', `Kalkulationsposition fuer Montage, Material oder Zusatzleistung.`, false, false, 1, 'extra')
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
            createProduct('heiz-431-1-zu', 'optionale-positionen', 'optionale-positionen-sub', `ALT-ÖLTANK |🛠 Demontage & Entsorgung`, 'HEIZ-431.1-ZU', 2900, 'Stk', `🛠 Demontage & Entsorgung`, false, true, 1, 'optional'),
            createProduct('725-76', 'optionale-positionen', 'optionale-positionen-sub', `Weber Holzpelletgrill SmokeFire EX4 GBS 61x45cm - Schwarz`, '725-76', 1406.9, 'Stk', `Kalkulationsposition fuer Montage, Material oder Zusatzleistung.`, false, true, 1, 'optional')
          ]
        }
      ]
    }
  ]
};

export const packageHeizmethodenThermenOefen: RenovationPackage = {
  id: 'heizmethodenThermenOefen',
  title: 'Thermen & Öfen',
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
            createProduct('heiz-10005-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `KAMIN | 🛠 Montage-Leistungspaket`, 'HEIZ-10005-Basis', 2490, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'service')
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
            createProduct('mat-anfrage', 'material', 'material-sub', `AUF ANFRAGE & BEMUSTERUNG DER MATERIALIEN`, 'MAT-Anfrage', 0, 'Stk', `Kalkulationsposition fuer Montage, Material oder Zusatzleistung.`, false, false, 1, 'material')
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
            createProduct('743-1204', 'extra-positionen', 'extra-positionen-sub', `Wienerberger LAS 1216 LW Kamtec Kaminsystem 1 stgm, HAN.: 34765146`, '743-1204', 545.6, 'Stk', `Kalkulationsposition fuer Montage, Material oder Zusatzleistung.`, false, false, 1, 'extra'),
            createProduct('743-10076', 'extra-positionen', 'extra-positionen-sub', `Wienerberger Kamtec Abströmkopf ASK 120, HAN.: 30056461`, '743-10076', 190.3, 'Stk', `Kalkulationsposition fuer Montage, Material oder Zusatzleistung.`, false, false, 1, 'extra'),
            createProduct('743-10042', 'extra-positionen', 'extra-positionen-sub', `Wienerberger Kamtec Krag und Abdeckplatte KP/AP-U 20 W für Untermauerung einzügig, HAN.: 34765655`, '743-10042', 457.6, 'Stk', `Kalkulationsposition fuer Montage, Material oder Zusatzleistung.`, false, false, 1, 'extra'),
            createProduct('743-10068', 'extra-positionen', 'extra-positionen-sub', `Wienerberger Kamtec ISSr Fugenkleber, HAN.: 30054461`, '743-10068', 68.75, 'Stk', `Kalkulationsposition fuer Montage, Material oder Zusatzleistung.`, false, false, 1, 'extra')
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
            createProduct('uv307-112', 'optionale-positionen', 'optionale-positionen-sub', `EcoStar Kaminholzregal Trend`, 'uv307-112', 592.89, 'Stk', `Kalkulationsposition fuer Montage, Material oder Zusatzleistung.`, false, true, 1, 'optional')
          ]
        }
      ]
    }
  ]
};

export const packageHeizmethodenThermenAlle: RenovationPackage = {
  id: 'heizmethodenThermenAlle',
  title: 'Alles zu Thermen',
  defaultArea: 1,
  defaultFloorCount: 1,
  categories: [
    {
      id: 'thermen-waermepumpen-basis-haus',
      title: 'THERMEN & WÄRMEPUMPEN | Basis-Haus',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'thermen-waermepumpen-basis-haus-sub',
          title: 'Leistungen & Materialien',
          type: 'material',
          products: [
            createProduct('heiz-401-3-mat', 'thermen-waermepumpen-basis-haus', 'thermen-waermepumpen-basis-haus-sub', `Gas-Brennwert-Kessel 20 Kw (für Haus)`, 'HEIZ-401.3-MAT', 10588.99, 'Stk', `Kalkulationsposition fuer Montage, Material oder Zusatzleistung.`, false, false, 1, 'material'),
            createProduct('heiz-403-13-mat', 'thermen-waermepumpen-basis-haus', 'thermen-waermepumpen-basis-haus-sub', `Gas-Kombitherme 20-24 Kw (für Wohnung)`, 'HEIZ-403.13-MAT', 3955.9, 'Stk', `Kalkulationsposition fuer Montage, Material oder Zusatzleistung.`, false, false, 1, 'material'),
            createProduct('heiz-402-2-mat', 'thermen-waermepumpen-basis-haus', 'thermen-waermepumpen-basis-haus-sub', `Öl-Brennwert-Kessel 24 Kw (für Haus)`, 'HEIZ-402.2-MAT', 12370.99, 'Stk', `Kalkulationsposition fuer Montage, Material oder Zusatzleistung.`, false, false, 1, 'material'),
            createProduct('heiz-400-basis', 'thermen-waermepumpen-basis-haus', 'thermen-waermepumpen-basis-haus-sub', `WÄRMEPUMPEN | 🛠 Montage-Leistungspaket`, 'HEIZ-400-BASIS', 4500, 'Stk', `🛠 Montage-Leistungspaket`, false, false, 1, 'service'),
            createProduct('heiz-411-4-mat', 'thermen-waermepumpen-basis-haus', 'thermen-waermepumpen-basis-haus-sub', `12 KW - LG WÄRMEPUMPEN im Paket - TM187/123`, 'HEIZ-411.4-MAT', 10542.42, 'Stk', `Kalkulationsposition fuer Montage, Material oder Zusatzleistung.`, false, false, 1, 'material'),
            createProduct('heiz-411-zu', 'thermen-waermepumpen-basis-haus', 'thermen-waermepumpen-basis-haus-sub', `LG-ZUBEHÖR-SET - für LG Wärmepumpen`, 'HEIZ-411-ZU', 1500, 'Stk', `Kalkulationsposition fuer Montage, Material oder Zusatzleistung.`, false, false, 1, 'material'),
            createProduct('heiz-405-2-mat', 'thermen-waermepumpen-basis-haus', 'thermen-waermepumpen-basis-haus-sub', `Pellet Silo Geobox 21 Inkl. Befüllstutzen`, 'HEIZ-405.2-MAT', 5143.05, 'Stk', `Kalkulationsposition fuer Montage, Material oder Zusatzleistung.`, false, false, 1, 'material'),
            createProduct('mat-anfrage', 'thermen-waermepumpen-basis-haus', 'thermen-waermepumpen-basis-haus-sub', `AUF ANFRAGE & BEMUSTERUNG DER MATERIALIEN`, 'MAT-Anfrage', 0, 'Stk', `Kalkulationsposition fuer Montage, Material oder Zusatzleistung.`, false, false, 1, 'material')
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
            createProduct('heiz-431-1-zu', 'optionale-positionen', 'optionale-positionen-sub', `ALT-ÖLTANK |🛠 Demontage & Entsorgung`, 'HEIZ-431.1-ZU', 2900, 'Stk', `🛠 Demontage & Entsorgung`, false, true, 1, 'optional'),
            createProduct('heiz-401-basis', 'optionale-positionen', 'optionale-positionen-sub', `FUNDAMENT | für Therme & Wärmepumpe`, 'HEIZ-401-BASIS', 2495, 'Stk', `für Therme & Wärmepumpe`, false, true, 1, 'optional'),
            createProduct('uv307-112', 'optionale-positionen', 'optionale-positionen-sub', `EcoStar Kaminholzregal Trend`, 'uv307-112', 592.89, 'Stk', `Kalkulationsposition fuer Montage, Material oder Zusatzleistung.`, false, true, 1, 'optional')
          ]
        }
      ]
    },
    {
      id: 'flaechenheizsystem',
      title: 'FLÄCHENHEIZSYSTEM',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'flaechenheizsystem-sub',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('mon-10158', 'flaechenheizsystem', 'flaechenheizsystem-sub', `FLÄCHENHEIZSYSTEME | 🛠 Montage`, 'MON-10158', 69, 'qm', `🛠 Montage`, false, false, 1, 'service'),
            createProduct('uv835-1083', 'flaechenheizsystem', 'flaechenheizsystem-sub', `Ximax Elektro Raumheizkörper Fortuna Horizontal - weiß`, 'uv835-1083', 471.41, 'Stk', `Kalkulationsposition fuer Montage, Material oder Zusatzleistung.`, false, false, 1, 'material'),
            createProduct('mon-10158-2', 'flaechenheizsystem', 'flaechenheizsystem-sub', `FLÄCHENHEIZSYSTEME | 🛠 Montage`, 'MON-10158', 69, 'qm', `🛠 Montage`, false, false, 3, 'service'),
            createProduct('uv722-00108', 'flaechenheizsystem', 'flaechenheizsystem-sub', `Warmup Aluminiumfolien-Heizsystem, für Holz-, Vinyl- und Laminatböden, 80 Watt`, 'uv722-00108', 219.93, 'Stk', `Kalkulationsposition fuer Montage, Material oder Zusatzleistung.`, false, false, 1, 'material')
          ]
        }
      ]
    },
    {
      id: 'heizkoerper',
      title: 'HEIZKÖRPER',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'heizkoerper-sub',
          title: 'Leistungen & Materialien',
          type: 'material',
          products: [
            createProduct('uv835-981', 'heizkoerper', 'heizkoerper-sub', `Ximax Handtuchwärmer C3 Typ 1 - Chrom`, 'uv835-981', 489.81, 'Stk', `Kalkulationsposition fuer Montage, Material oder Zusatzleistung.`, false, false, 1, 'material')
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
            createProduct('743-1204', 'extra-positionen', 'extra-positionen-sub', `Wienerberger LAS 1216 LW Kamtec Kaminsystem 1 stgm, HAN.: 34765146`, '743-1204', 545.6, 'Stk', `Kalkulationsposition fuer Montage, Material oder Zusatzleistung.`, false, false, 1, 'extra'),
            createProduct('743-10076', 'extra-positionen', 'extra-positionen-sub', `Wienerberger Kamtec Abströmkopf ASK 120, HAN.: 30056461`, '743-10076', 190.3, 'Stk', `Kalkulationsposition fuer Montage, Material oder Zusatzleistung.`, false, false, 1, 'extra'),
            createProduct('743-10042', 'extra-positionen', 'extra-positionen-sub', `Wienerberger Kamtec Krag und Abdeckplatte KP/AP-U 20 W für Untermauerung einzügig, HAN.: 34765655`, '743-10042', 457.6, 'Stk', `Kalkulationsposition fuer Montage, Material oder Zusatzleistung.`, false, false, 1, 'extra'),
            createProduct('743-10068', 'extra-positionen', 'extra-positionen-sub', `Wienerberger Kamtec ISSr Fugenkleber, HAN.: 30054461`, '743-10068', 68.75, 'Stk', `Kalkulationsposition fuer Montage, Material oder Zusatzleistung.`, false, false, 1, 'extra')
          ]
        }
      ]
    }
  ]
};

export const packageHeizmethodenKaminofen: RenovationPackage = {
  id: 'heizmethodenKaminofen',
  title: 'Kaminofen',
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
            createProduct('heiz-10005-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `KAMIN | 🛠 Montage-Leistungspaket`, 'HEIZ-10005-Basis', 2490, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'service')
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
            createProduct('mat-anfrage', 'material', 'material-sub', `AUF ANFRAGE & BEMUSTERUNG DER MATERIALIEN`, 'MAT-Anfrage', 0, 'Stk', `Kalkulationsposition fuer Montage, Material oder Zusatzleistung.`, false, false, 1, 'material')
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
            createProduct('743-1204', 'extra-positionen', 'extra-positionen-sub', `Wienerberger LAS 1216 LW Kamtec Kaminsystem 1 stgm, HAN.: 34765146`, '743-1204', 545.6, 'Stk', `Kalkulationsposition fuer Montage, Material oder Zusatzleistung.`, false, false, 1, 'extra'),
            createProduct('743-10076', 'extra-positionen', 'extra-positionen-sub', `Wienerberger Kamtec Abströmkopf ASK 120, HAN.: 30056461`, '743-10076', 190.3, 'Stk', `Kalkulationsposition fuer Montage, Material oder Zusatzleistung.`, false, false, 1, 'extra'),
            createProduct('743-10042', 'extra-positionen', 'extra-positionen-sub', `Wienerberger Kamtec Krag und Abdeckplatte KP/AP-U 20 W für Untermauerung einzügig, HAN.: 34765655`, '743-10042', 457.6, 'Stk', `Kalkulationsposition fuer Montage, Material oder Zusatzleistung.`, false, false, 1, 'extra'),
            createProduct('743-10068', 'extra-positionen', 'extra-positionen-sub', `Wienerberger Kamtec ISSr Fugenkleber, HAN.: 30054461`, '743-10068', 68.75, 'Stk', `Kalkulationsposition fuer Montage, Material oder Zusatzleistung.`, false, false, 1, 'extra')
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
            createProduct('uv307-112', 'optionale-positionen', 'optionale-positionen-sub', `EcoStar Kaminholzregal Trend`, 'uv307-112', 592.89, 'Stk', `Kalkulationsposition fuer Montage, Material oder Zusatzleistung.`, false, true, 1, 'optional')
          ]
        }
      ]
    }
  ]
};

export const packageHeizmethodenSaunaofen: RenovationPackage = {
  id: 'heizmethodenSaunaofen',
  title: 'Saunaofen',
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
            createProduct('bade-10002-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `SAUNA | Montage | 🛠 Montage-Leistungspaket`, 'BADE-10002-Basis', 4990, 'Stk', `Montage | 🛠 Montage-Leistungspaket`, true, false, 1, 'service')
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
            createProduct('uv754-11104', 'material', 'material-sub', `Finnhaus Wolff Innensauna Basic Zino - 193x193 cm`, 'uv754-11104', 1890.85, 'Stk', `Kalkulationsposition fuer Montage, Material oder Zusatzleistung.`, true, false, 1, 'material')
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
            createProduct('754-11229', 'optionale-positionen', 'optionale-positionen-sub', `Finnhaus Wolff Saunahaus Selina 2424 - 238x238 cm`, '754-11229', 4999.5, 'Stk', `Kalkulationsposition fuer Montage, Material oder Zusatzleistung.`, false, true, 1, 'optional')
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
            createProduct('uv886-10216', 'extra-positionen', 'extra-positionen-sub', `Eliga Elektro-Saunaofen mit Verdampfer Wandgerät`, 'uv886-10216', 1366.27, 'Stk', `Kalkulationsposition fuer Montage, Material oder Zusatzleistung.`, false, false, 1, 'extra'),
            createProduct('886-10353', 'extra-positionen', 'extra-positionen-sub', `Eliga Sauna-Zubehör-Set 9-teilig All-in`, '886-10353', 143.18, 'Stk', `Kalkulationsposition fuer Montage, Material oder Zusatzleistung.`, false, false, 1, 'extra'),
            createProduct('886-10315', 'extra-positionen', 'extra-positionen-sub', `Eliga Leuchte für Dampfbad und Sauna`, '886-10315', 121.09, 'Stk', `Kalkulationsposition fuer Montage, Material oder Zusatzleistung.`, false, false, 1, 'extra'),
            createProduct('728-00476', 'extra-positionen', 'extra-positionen-sub', `Weka Spezial-Sauna-Leuchten-Set`, '728-00476', 61.27, 'Stk', `Kalkulationsposition fuer Montage, Material oder Zusatzleistung.`, false, false, 1, 'extra'),
            createProduct('886-10479', 'extra-positionen', 'extra-positionen-sub', `Eliga Sauna Messstation`, '886-10479', 48.28, 'Stk', `Kalkulationsposition fuer Montage, Material oder Zusatzleistung.`, false, false, 1, 'extra'),
            createProduct('uv886-10081', 'extra-positionen', 'extra-positionen-sub', `Eliga Sauna-Aufgusskonzentrat`, 'uv886-10081', 12.28, 'Stk', `Kalkulationsposition fuer Montage, Material oder Zusatzleistung.`, false, false, 1, 'extra')
          ]
        }
      ]
    }
  ]
};

export const packageHeizmethodenDurchlauferhitzer: RenovationPackage = {
  id: 'heizmethodenDurchlauferhitzer',
  title: 'Durchlauferhitzer',
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
            createProduct('mon-10157', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `DURCHLAUFERHITZER|HOME| 🛠 Montage`, 'MON-10157', 395, 'Stk', `HOME | 🛠 Montage`, true, false, 1, 'service')
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
            createProduct('vede218b', 'material', 'material-sub', `Durchlauferhitzer Vaillant VED E 21/8 B 21KW elektronisch gesteuert weiss`, 'VEDE218B', 373.23, 'Stk', `Kalkulationsposition fuer Montage, Material oder Zusatzleistung.`, true, false, 1, 'material')
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
            createProduct('mon-10159', 'optionale-positionen', 'optionale-positionen-sub', `SPEICHER | 🛠 Montage`, 'MON-10159', 1190, 'Stk', `🛠 Montage`, false, true, 1, 'optional'),
            createProduct('veh107upl', 'optionale-positionen', 'optionale-positionen-sub', `Vaillant Speicher eloSTOR VEH 10/7 U plus, 10 Liter Untertisch, druckfest`, 'VEH107UPL', 522.72, 'Stk', `Kalkulationsposition fuer Montage, Material oder Zusatzleistung.`, false, true, 1, 'optional')
          ]
        }
      ]
    }
  ]
};

export const packageHeizmethodenWarmwasserspeicher: RenovationPackage = {
  id: 'heizmethodenWarmwasserspeicher',
  title: 'Warmwasserspeicher',
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
            createProduct('mon-10159', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `SPEICHER | 🛠 Montage`, 'MON-10159', 1190, 'Stk', `🛠 Montage`, true, false, 1, 'service')
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
            createProduct('veh107upl', 'material', 'material-sub', `Vaillant Speicher eloSTOR VEH 10/7 U plus, 10 Liter Untertisch, druckfest`, 'VEH107UPL', 522.72, 'Stk', `Kalkulationsposition fuer Montage, Material oder Zusatzleistung.`, true, false, 1, 'material')
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
            createProduct('mon-10157', 'optionale-positionen', 'optionale-positionen-sub', `DURCHLAUFERHITZER|HOME| 🛠 Montage`, 'MON-10157', 395, 'Stk', `HOME | 🛠 Montage`, false, true, 1, 'optional'),
            createProduct('vede218b', 'optionale-positionen', 'optionale-positionen-sub', `Durchlauferhitzer Vaillant VED E 21/8 B 21KW elektronisch gesteuert weiss`, 'VEDE218B', 373.23, 'Stk', `Kalkulationsposition fuer Montage, Material oder Zusatzleistung.`, false, true, 1, 'optional')
          ]
        }
      ]
    }
  ]
};

export const packageHeizmethodenElektroHeizung: RenovationPackage = {
  id: 'heizmethodenElektroHeizung',
  title: 'Elektro-Heizung',
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
            createProduct('mon-10158', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `FLÄCHENHEIZSYSTEME | 🛠 Montage`, 'MON-10158', 69, 'qm', `🛠 Montage`, true, false, 1, 'service')
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
            createProduct('uv835-1083', 'material', 'material-sub', `Ximax Elektro Raumheizkörper Fortuna Horizontal - weiß`, 'uv835-1083', 471.41, 'Stk', `Kalkulationsposition fuer Montage, Material oder Zusatzleistung.`, true, false, 1, 'material')
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
            createProduct('uv835-981', 'optionale-positionen', 'optionale-positionen-sub', `Ximax Handtuchwärmer C3 Typ 1 - Chrom`, 'uv835-981', 489.81, 'Stk', `Kalkulationsposition fuer Montage, Material oder Zusatzleistung.`, false, true, 1, 'optional'),
            createProduct('mon-10158-2', 'optionale-positionen', 'optionale-positionen-sub', `FLÄCHENHEIZSYSTEME | 🛠 Montage`, 'MON-10158', 69, 'qm', `🛠 Montage`, true, true, 3, 'optional'),
            createProduct('uv722-00108', 'optionale-positionen', 'optionale-positionen-sub', `Warmup Aluminiumfolien-Heizsystem, für Holz-, Vinyl- und Laminatböden, 80 Watt`, 'uv722-00108', 219.93, 'Stk', `Kalkulationsposition fuer Montage, Material oder Zusatzleistung.`, false, true, 1, 'optional')
          ]
        }
      ]
    }
  ]
};
