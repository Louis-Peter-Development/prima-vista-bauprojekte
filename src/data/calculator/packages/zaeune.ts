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

export const packageZaeuneAluminium: RenovationPackage = {
  id: 'zaeuneAluminium',
  title: 'Aluminiumzaun',
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
            createProduct('zaun-10008', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `ALUMINIUMZAUN | 🛠 Montage`, 'ZAUN-10008', 149, 'lfm', `🛠 Montage`, true, false, 20, 'service'),
            createProduct('uv257-00567', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `GroJa Lumino Alu-Steckzaun Steckzaun quadratisch 180x180 cm, ohne Pfosten`, 'uv257-00567', 478.43, 'Stk', `GroJa Lumino Alu-Steckzaun Steckzaun quadratisch 180x180 cm, ohne Pfosten`, true, false, 24, 'material'),
            createProduct('uv257-00946', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `GroJa WPC-Steckzaunpfosten inkl. Kappe zum Aufdübeln, 10x10 cm - Terra`, 'uv257-00946', 41.73, 'Stk', `GroJa WPC-Steckzaunpfosten inkl. Kappe zum Aufdübeln, 10x10 cm - Terra`, true, false, 48, 'material'),
            createProduct('uv257-00569', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `GroJa Lumino Alu-Steckzaun Tor 1-flügelig 100 x 180 cm, ohne Pfosten - mit Alurahmen`, 'uv257-00569', 780.95, 'Stk', `GroJa Lumino Alu-Steckzaun Tor 1-flügelig 100 x 180 cm, ohne Pfosten - mit Alurahmen`, true, false, 1, 'material')
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
            createProduct('uv257-00746', 'optionale-positionen', 'optionale-positionen-sub', `GroJa Lumino Alu-Steckzaun Tor 2-flügelig 300 x 180 cm, ohne Pfosten - mit Anthrazitrahmen - anthrazitgrau`, 'uv257-00746', 2804.95, 'Stk', `GroJa Lumino Alu-Steckzaun Tor 2-flügelig 300 x 180 cm, ohne Pfosten - mit Anthrazitrahmen - anthrazitgrau`, false, true, 1, 'optional')
          ]
        }
      ]
    }
  ]
};

export const packageZaeuneHolz: RenovationPackage = {
  id: 'zaeuneHolz',
  title: 'Holzzaun',
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
            createProduct('zaun-10003', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `HOLZZAUN | 🛠 Montage`, 'ZAUN-10003', 149, 'lfm', `🛠 Montage`, true, false, 20, 'service')
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
            createProduct('679-01308', 'material', 'material-sub', `LIGHTLINE Lamellenzaun 180 x 150 cm`, '679-01308', 314.6, 'Stk', `LIGHTLINE Lamellenzaun 180 x 150 cm`, true, false, 24, 'material')
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
            createProduct('679-00373', 'optionale-positionen', 'optionale-positionen-sub', `LIGHTLINE KS-Zaun Ranki 180 x 150 cm Füllung weiß / Rahmen weiß`, '679-00373', 325.6, 'Stk', `LIGHTLINE KS-Zaun Ranki 180 x 150 cm Füllung weiß / Rahmen weiß`, false, true, 1, 'optional'),
            createProduct('679-00372', 'optionale-positionen', 'optionale-positionen-sub', `LIGHTLINE KS-Zaun Ranki Ecke 90 x 150/90 cm Füllung weiß / Rahmen weiß`, '679-00372', 325.6, 'Stk', `LIGHTLINE KS-Zaun Ranki Ecke 90 x 150/90 cm Füllung weiß / Rahmen weiß`, false, true, 1, 'optional')
          ]
        }
      ]
    },
    {
      id: 'alternativ',
      title: 'Alternativ',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'alternativ-sub',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('mon-10307', 'alternativ', 'alternativ-sub', `VORGARTENZAUN | 🛠 Montage`, 'MON-10307', 98, 'lfm', `🛠 Montage`, true, false, 20, 'service'),
            createProduct('679-00661', 'alternativ', 'alternativ-sub', `LIGHTLINE Vorgarten gerade, weiß 180 x 80 cm`, '679-00661', 178.2, 'Stk', `LIGHTLINE Vorgarten gerade, weiß 180 x 80 cm`, true, false, 24, 'material'),
            createProduct('679-01292', 'alternativ', 'alternativ-sub', `LIGHTLINE KS-Vorgartentor weiß 100 x 80 cm`, '679-01292', 609.4, 'Stk', `LIGHTLINE KS-Vorgartentor weiß 100 x 80 cm`, true, false, 1, 'material')
          ]
        }
      ]
    }
  ]
};

export const packageZaeuneGlas: RenovationPackage = {
  id: 'zaeuneGlas',
  title: 'Glaszaun',
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
            createProduct('zaun-10013', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `GLASZAUN 🛠 Montage`, 'ZAUN-10013', 149, 'lfm', `GLASZAUN 🛠 Montage`, true, false, 10, 'service')
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
            createProduct('uv257-00457', 'material', 'material-sub', `GroJa Ambiente Glaszaun schräg, 90 x 180/90 cm, ohne Pfosten - Klarglas`, 'uv257-00457', 174.77, 'Stk', `GroJa Ambiente Glaszaun schräg, 90 x 180/90 cm, ohne Pfosten - Klarglas`, true, false, 12, 'material')
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
            createProduct('uv257-00974', 'extra-positionen', 'extra-positionen-sub', `GroJa Alu-Steckzaunpfosten inkl. Kappe zum Einbetonieren, 9 x 9 cm - anthrazit, DB 703`, 'uv257-00974', 98.95, 'Stk', `GroJa Alu-Steckzaunpfosten inkl. Kappe zum Einbetonieren, 9 x 9 cm - anthrazit, DB 703`, true, false, 14, 'extra')
          ]
        }
      ]
    }
  ]
};

export const packageZaeuneMetall: RenovationPackage = {
  id: 'zaeuneMetall',
  title: 'Metallzaun',
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
            createProduct('zaun-10004', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `METALLZAUN | 🛠 Montage`, 'ZAUN-10004', 149, 'lfm', `🛠 Montage`, true, false, 20, 'service')
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
            createProduct('uv12-00202', 'material', 'material-sub', `DZT Metallzaun-Komplett-Set VALENCIA anthrazitgrau (RAL7016) - Elemente 2,0 m breit (Schmuckzaun)`, 'uv12-00202', 1875.14, 'Set', `DZT Metallzaun-Komplett-Set VALENCIA anthrazitgrau (RAL7016) - Elemente 2,0 m breit (Schmuckzaun)`, true, false, 1, 'material')
          ]
        }
      ]
    }
  ]
};

export const packageZaeuneDoppelstab: RenovationPackage = {
  id: 'zaeuneDoppelstab',
  title: 'Doppelstabmatten',
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
            createProduct('zaun-10002', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `DOPPELSTABMATTENZAUN | 🛠 Montage`, 'ZAUN-10002', 148, 'lfm', `🛠 Montage`, true, false, 20, 'service'),
            createProduct('uv265-84105', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `Hadra Doppelstabmattenzaun Komplettset Anthrazit - Elemente 2,5 m breit - incl. Pfosten und Befestigungen`, 'uv265-84105', 847.69, 'Set', `Hadra Doppelstabmattenzaun Komplettset Anthrazit - Elemente 2,5 m breit - incl. Pfosten und Befestigungen`, true, false, 8, 'material'),
            createProduct('265-00045', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `Hadra Drehflügeltor für Doppelstabmatten SMALL, 1-flügelig, Anthrazit für Zaunhöhe: 123 cm`, '265-00045', 364.1, 'Stk', `Hadra Drehflügeltor für Doppelstabmatten SMALL, 1-flügelig, Anthrazit für Zaunhöhe: 123 cm`, true, false, 1, 'material')
          ]
        }
      ]
    }
  ]
};

export const packageZaeuneGabionen: RenovationPackage = {
  id: 'zaeuneGabionen',
  title: 'Gabionenzaun',
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
            createProduct('zaun-10015', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `GABIONENZAUN | 🛠 Montage`, 'ZAUN-10015', 149, 'lfm', `🛠 Montage`, true, false, 10, 'service')
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
            createProduct('uv12-00355', 'material', 'material-sub', `DZT Gabione Onyx KL: 400x347 mm - feuerverzinkt`, 'uv12-00355', 295.77, 'Stk', `DZT Gabione Onyx KL: 400x347 mm - feuerverzinkt`, true, false, 24, 'material')
          ]
        }
      ]
    }
  ]
};

export const packageZaeuneSichtschutz: RenovationPackage = {
  id: 'zaeuneSichtschutz',
  title: 'Sichtschutzzaun',
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
            createProduct('zaun-10006', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `SICHTSCHUTZZAUN | 🛠 Montage`, 'ZAUN-10006', 149, 'lfm', `🛠 Montage`, true, false, 20, 'service')
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
            createProduct('679-01171', 'material', 'material-sub', `Sichtschutzzaun SUNLINE Ranki 180 x 180 cm`, '679-01171', 199.1, 'Stk', `Sichtschutzzaun SUNLINE Ranki 180 x 180 cm`, true, false, 12, 'material')
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
            createProduct('679-01172', 'optionale-positionen', 'optionale-positionen-sub', `Sichtschutzzaun SUNLINE Ranki ECKE 90 x 180/90 cm`, '679-01172', 199.1, 'Stk', `Sichtschutzzaun SUNLINE Ranki ECKE 90 x 180/90 cm`, false, true, 1, 'optional')
          ]
        }
      ]
    }
  ]
};

export const packageZaeuneMaschendraht: RenovationPackage = {
  id: 'zaeuneMaschendraht',
  title: 'Maschendrahtzaun',
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
            createProduct('zaun-10001', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `MASCHENDRAHTZAUN | 🛠 Montage`, 'ZAUN-10001', 98, 'lfm', `🛠 Montage`, true, false, 20, 'service')
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
            createProduct('uv804-50054', 'material', 'material-sub', `Alberts Maschendraht-Zaun-Set - Pfosten zum Einbetonieren - Anthrazit-Metallic - incl. Pfosten und Befestigungen`, 'uv804-50054', 268.35, 'Stk', `Alberts Maschendraht-Zaun-Set - Pfosten zum Einbetonieren - Anthrazit-Metallic - incl. Pfosten und Befestigungen`, true, false, 1, 'material'),
            createProduct('265-00040', 'material', 'material-sub', `Hadra Drehflügeltor für Doppelstabmatten SMALL, 1-flügelig, Grün für Zaunhöhe: 83 cm`, '265-00040', 290.4, 'Stk', `Hadra Drehflügeltor für Doppelstabmatten SMALL, 1-flügelig, Grün für Zaunhöhe: 83 cm`, true, false, 1, 'material')
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
            createProduct('012-00598', 'optionale-positionen', 'optionale-positionen-sub', `DZT VARIO compact 2-flügeliges Tor - 2960 x 1400 mm grün`, '012-00598', 1191.55, 'Stk', `DZT VARIO compact 2-flügeliges Tor - 2960 x 1400 mm grün`, false, true, 1, 'optional')
          ]
        }
      ]
    }
  ]
};

export const packageZaeuneSteck: RenovationPackage = {
  id: 'zaeuneSteck',
  title: 'Steckzaun',
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
            createProduct('mon-10305', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `STECKZAUN | 🛠 Montage`, 'MON-10305', 98, 'lfm', `🛠 Montage`, true, false, 20, 'service'),
            createProduct('uv257-00567', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `GroJa Lumino Alu-Steckzaun Steckzaun quadratisch 180x180 cm, ohne Pfosten`, 'uv257-00567', 478.43, 'Stk', `GroJa Lumino Alu-Steckzaun Steckzaun quadratisch 180x180 cm, ohne Pfosten`, true, false, 24, 'material'),
            createProduct('uv257-00946', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `GroJa WPC-Steckzaunpfosten inkl. Kappe zum Aufdübeln, 10x10 cm - Terra`, 'uv257-00946', 41.73, 'Stk', `GroJa WPC-Steckzaunpfosten inkl. Kappe zum Aufdübeln, 10x10 cm - Terra`, true, false, 48, 'material'),
            createProduct('uv257-00569', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `GroJa Lumino Alu-Steckzaun Tor 1-flügelig 100 x 180 cm, ohne Pfosten - mit Alurahmen`, 'uv257-00569', 780.95, 'Stk', `GroJa Lumino Alu-Steckzaun Tor 1-flügelig 100 x 180 cm, ohne Pfosten - mit Alurahmen`, true, false, 1, 'material')
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
            createProduct('uv257-00746', 'optionale-positionen', 'optionale-positionen-sub', `GroJa Lumino Alu-Steckzaun Tor 2-flügelig 300 x 180 cm, ohne Pfosten - mit Anthrazitrahmen - anthrazitgrau`, 'uv257-00746', 2804.95, 'Stk', `GroJa Lumino Alu-Steckzaun Tor 2-flügelig 300 x 180 cm, ohne Pfosten - mit Anthrazitrahmen - anthrazitgrau`, false, true, 1, 'optional')
          ]
        }
      ]
    }
  ]
};

export const packageZaeuneVorgarten: RenovationPackage = {
  id: 'zaeuneVorgarten',
  title: 'Vorgartenzaun',
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
            createProduct('mon-10307', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `VORGARTENZAUN | 🛠 Montage`, 'MON-10307', 98, 'lfm', `🛠 Montage`, true, false, 20, 'service'),
            createProduct('679-00661', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `LIGHTLINE Vorgarten gerade, weiß 180 x 80 cm`, '679-00661', 178.2, 'Stk', `LIGHTLINE Vorgarten gerade, weiß 180 x 80 cm`, true, false, 24, 'material'),
            createProduct('679-01292', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `LIGHTLINE KS-Vorgartentor weiß 100 x 80 cm`, '679-01292', 609.4, 'Stk', `LIGHTLINE KS-Vorgartentor weiß 100 x 80 cm`, true, false, 1, 'material')
          ]
        }
      ]
    }
  ]
};

export const packageZaeuneSichtschutzstreifen: RenovationPackage = {
  id: 'zaeuneSichtschutzstreifen',
  title: 'Sichtschutzstreifen',
  defaultArea: 20,
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
            createProduct('zaun-10012', 'basis', 'basis-sub', `SICHTSCHUTZSTREIFEN| 🛠 Montage`, 'ZAUN-10012', 89, 'lfm', `🛠 Montage`, true, false, 1, 'service')
          ]
        }
      ]
    }
  ]
};
