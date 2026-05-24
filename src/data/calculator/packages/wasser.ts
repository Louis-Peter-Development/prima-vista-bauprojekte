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

export const packageWasserAlles: RenovationPackage = {
  id: 'wasserAlles',
  title: 'Alles zu Wasser',
  defaultArea: 8,
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
            createProduct('wass-100-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `WASSERINSTALLATION BADEZIMMER | 🛠 Montage-Leistungspaket`, 'WASS-100-BASIS', 1995.9, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'service'),
            createProduct('wass-200-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `WASSERINSTALLATION GÄSTE-WC | 🛠 Montage-Leistungspaket`, 'WASS-200-BASIS', 1195.9, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'service'),
            createProduct('wass-300-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `WASSERINSTALLATION KÜCHE | 🛠 Montage-Leistungspaket`, 'WASS-300-BASIS', 995.9, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'service'),
            createProduct('wass-400-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `WASSERINSTALLLATION KELLER | 🛠 Montage-Leistungspaket`, 'WASS-400-BASIS', 1239.9, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'service'),
            createProduct('wass-501-mat', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `HAUPTSTRANG (Trink- & Abwasser & Zirkul.) | 🛠 Montage-Leistungspaket`, 'WASS-501-MAT', 2767.9, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'service')
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
            createProduct('wass-105-zu', 'extra-positionen', 'extra-positionen-sub', `WASCHMASCHINEN ANSCHLUSS | 🛠 Zusatz-Montage`, 'WASS-105-ZU', 355.36, 'Stk', `🛠 Zusatz-Montage`, true, false, 1, 'extra'),
            createProduct('wass-101-mon', 'extra-positionen', 'extra-positionen-sub', `VORSATZ-ELEMENT | 🛠 Montage`, 'WASS-101-MON', 279, 'Stk', `🛠 Montage`, true, false, 1, 'extra')
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
            createProduct('sigma30wech', 'material', 'material-sub', `Abdeckplatte Sigma30 weiß/hgl.verchr. f.2-Mengen-Spülung, für UP-Spülkästen GE`, 'SIGMA30WECH', 101.5, 'Stk', `Abdeckplatte Sigma30 weiß/hgl.verchr. f.2-Mengen-Spülung, für UP-Spülkästen GE`, true, false, 1, 'material')
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
            createProduct('563-01504', 'optionale-positionen', 'optionale-positionen-sub', `Rewatec Wasser-Entnahmearmatur für TwinCover`, '563-01504', 104.39, 'Stk', `Rewatec Wasser-Entnahmearmatur für TwinCover`, false, true, 1, 'optional'),
            createProduct('007-00208', 'optionale-positionen', 'optionale-positionen-sub', `ACO Rain4me Haus und Garten Professional vollautomatische Regenwasserzentrale mit Pumpe`, '007-00208', 3211.95, 'Stk', `ACO Rain4me Haus und Garten Professional vollautomatische Regenwasserzentrale mit Pumpe`, false, true, 1, 'optional'),
            createProduct('007-00206', 'optionale-positionen', 'optionale-positionen-sub', `ACO Rain4me Garten Plus Klarwasserpumpe, schwimmende Ansaugung 1m`, '007-00206', 1033.95, 'Stk', `ACO Rain4me Garten Plus Klarwasserpumpe, schwimmende Ansaugung 1m`, false, true, 1, 'optional'),
            createProduct('uv7-00036', 'optionale-positionen', 'optionale-positionen-sub', `ACO Rain4me Gartenanlage Plus Einbau stehend`, 'uv7-00036', 3090.93, 'Stk', `ACO Rain4me Gartenanlage Plus Einbau stehend`, false, true, 1, 'optional'),
            createProduct('uv7-00277', 'optionale-positionen', 'optionale-positionen-sub', `ACO Rain4me Regenwassertzisterne für Regenwassernutzung`, 'uv7-00277', 1484.93, 'Stk', `ACO Rain4me Regenwassertzisterne für Regenwassernutzung`, false, true, 1, 'optional')
          ]
        }
      ]
    }
  ]
};

export const packageWasserBadezimmer: RenovationPackage = {
  id: 'wasserBadezimmer',
  title: 'Badezimmer',
  defaultArea: 1,
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
            createProduct('sigma30wech', 'material', 'material-sub', `Abdeckplatte Sigma30 weiß/hgl.verchr. f.2-Mengen-Spülung, für UP-Spülkästen GE`, 'SIGMA30WECH', 101.5, 'Stk', `Abdeckplatte Sigma30 weiß/hgl.verchr. f.2-Mengen-Spülung, für UP-Spülkästen GE`, true, false, 1, 'material')
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
            createProduct('wass-100-au', 'optionale-positionen', 'optionale-positionen-sub', `WEITERES zu WASSERINSTALLATION - (Klick Grünes-Symbol)`, 'WASS-100-AU', 0, 'Stk', `WEITERES zu WASSERINSTALLATION - (Klick Grünes-Symbol)`, false, true, 1, 'optional')
          ]
        }
      ]
    }
  ]
};

export const packageWasserGaesteWc: RenovationPackage = {
  id: 'wasserGaesteWc',
  title: 'Gäste-WC',
  defaultArea: 1,
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
            createProduct('sigma30wech', 'material', 'material-sub', `Abdeckplatte Sigma30 weiß/hgl.verchr. f.2-Mengen-Spülung, für UP-Spülkästen GE`, 'SIGMA30WECH', 101.5, 'Stk', `Abdeckplatte Sigma30 weiß/hgl.verchr. f.2-Mengen-Spülung, für UP-Spülkästen GE`, true, false, 1, 'material')
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
            createProduct('wass-100-au', 'optionale-positionen', 'optionale-positionen-sub', `WEITERES zu WASSERINSTALLATION - (Klick Grünes-Symbol)`, 'WASS-100-AU', 0, 'Stk', `WEITERES zu WASSERINSTALLATION - (Klick Grünes-Symbol)`, false, true, 1, 'optional')
          ]
        }
      ]
    }
  ]
};

export const packageWasserKueche: RenovationPackage = {
  id: 'wasserKueche',
  title: 'Küche',
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
            createProduct('wass-300-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `WASSERINSTALLATION KÜCHE | 🛠 Montage-Leistungspaket`, 'WASS-300-BASIS', 995.9, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'service')
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
            createProduct('wass-102-1-mat', 'optionale-positionen', 'optionale-positionen-sub', `WASSERZÄHLER | Unterputz-Block`, 'WASS-102.1-MAT', 950.35, 'Stk', `Unterputz-Block`, false, true, 1, 'optional'),
            createProduct('wass-102-2-mat', 'optionale-positionen', 'optionale-positionen-sub', `WASSERZÄHER | Kalt-oder Warm (Aufputz)`, 'WASS-102.2-MAT', 394.96, 'Stk', `Kalt-oder Warm (Aufputz)`, false, true, 1, 'optional'),
            createProduct('wass-102-1-mat-2', 'optionale-positionen', 'optionale-positionen-sub', `WASSERZÄHLER | Unterputz-Block`, 'WASS-102.1-MAT', 950.35, 'Stk', `Unterputz-Block`, false, true, 1, 'optional')
          ]
        }
      ]
    }
  ]
};

export const packageWasserWaschmaschine: RenovationPackage = {
  id: 'wasserWaschmaschine',
  title: 'Waschmaschine',
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
            createProduct('wass-105-zu', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `WASCHMASCHINEN ANSCHLUSS | 🛠 Zusatz-Montage`, 'WASS-105-ZU', 355.36, 'Stk', `🛠 Zusatz-Montage`, true, false, 1, 'extra')
          ]
        }
      ]
    }
  ]
};

export const packageWasserKeller: RenovationPackage = {
  id: 'wasserKeller',
  title: 'Keller',
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
            createProduct('wass-400-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `WASSERINSTALLLATION KELLER | 🛠 Montage-Leistungspaket`, 'WASS-400-BASIS', 1239.9, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'service')
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
            createProduct('wass-100-au', 'optionale-positionen', 'optionale-positionen-sub', `WEITERES zu WASSERINSTALLATION - (Klick Grünes-Symbol)`, 'WASS-100-AU', 0, 'Stk', `WEITERES zu WASSERINSTALLATION - (Klick Grünes-Symbol)`, false, true, 1, 'optional')
          ]
        }
      ]
    }
  ]
};

export const packageWasserGarten: RenovationPackage = {
  id: 'wasserGarten',
  title: 'Garten',
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
          type: 'material',
          products: [
            createProduct('wass-607-1-mat', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `GARTEN-ANSCHLUSS | inkl. frostsicheren Außenwasserhahn`, 'WASS-607.1-MAT', 346.5, 'Stk', `inkl. frostsicheren Außenwasserhahn`, true, false, 1, 'material')
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
            createProduct('563-01504', 'optionale-positionen', 'optionale-positionen-sub', `Rewatec Wasser-Entnahmearmatur für TwinCover`, '563-01504', 104.39, 'Stk', `Rewatec Wasser-Entnahmearmatur für TwinCover`, false, true, 1, 'optional'),
            createProduct('007-00208', 'optionale-positionen', 'optionale-positionen-sub', `ACO Rain4me Haus und Garten Professional vollautomatische Regenwasserzentrale mit Pumpe`, '007-00208', 3211.95, 'Stk', `ACO Rain4me Haus und Garten Professional vollautomatische Regenwasserzentrale mit Pumpe`, false, true, 1, 'optional'),
            createProduct('007-00206', 'optionale-positionen', 'optionale-positionen-sub', `ACO Rain4me Garten Plus Klarwasserpumpe, schwimmende Ansaugung 1m`, '007-00206', 1033.95, 'Stk', `ACO Rain4me Garten Plus Klarwasserpumpe, schwimmende Ansaugung 1m`, false, true, 1, 'optional'),
            createProduct('uv7-00036', 'optionale-positionen', 'optionale-positionen-sub', `ACO Rain4me Gartenanlage Plus Einbau stehend`, 'uv7-00036', 3090.93, 'Stk', `ACO Rain4me Gartenanlage Plus Einbau stehend`, false, true, 1, 'optional'),
            createProduct('uv7-00277', 'optionale-positionen', 'optionale-positionen-sub', `ACO Rain4me Regenwassertzisterne für Regenwassernutzung`, 'uv7-00277', 1484.93, 'Stk', `ACO Rain4me Regenwassertzisterne für Regenwassernutzung`, false, true, 1, 'optional'),
            createProduct('563-01505', 'optionale-positionen', 'optionale-positionen-sub', `Rewatec Wasserverteiler RainStar - extern - ebenerdiger Einbau - begehbar`, '563-01505', 173.8, 'Stk', `Rewatec Wasserverteiler RainStar - extern - ebenerdiger Einbau - begehbar`, false, true, 1, 'optional')
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
            createProduct('mon-100-stk', 'alternativ', 'alternativ-sub', `MONTAGE | 🛠 Montage 100`, 'MON-100-stk', 999.9, 'Stk', `🛠 Montage 100`, true, false, 1, 'service'),
            createProduct('uv563-01018', 'alternativ', 'alternativ-sub', `Rewatec NEO Gartenanlage Basic`, 'uv563-01018', 1946.93, 'Stk', `Rewatec NEO Gartenanlage Basic`, true, false, 1, 'material')
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
            createProduct('563-01344', 'extra-positionen', 'extra-positionen-sub', `Rewatec Wasserzapfsäule Premium Art.Nr.: RWZT0041`, '563-01344', 299.2, 'Stk', `Rewatec Wasserzapfsäule Premium Art.Nr.: RWZT0041`, true, false, 1, 'extra')
          ]
        }
      ]
    }
  ]
};

export const packageWasserSpuelkasten: RenovationPackage = {
  id: 'wasserSpuelkasten',
  title: 'Spülkasten',
  defaultArea: 1,
  defaultFloorCount: 1,
  categories: [
    {
      id: 'extra-positionen-unter-ue-zu',
      title: 'Extra Positionen UNTER-UE-ZU',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'extra-positionen-unter-ue-zu-sub',
          title: 'Leistungen & Materialien',
          type: 'extra',
          products: [
            createProduct('wass-101-mon', 'extra-positionen-unter-ue-zu', 'extra-positionen-unter-ue-zu-sub', `VORSATZ-ELEMENT | 🛠 Montage`, 'WASS-101-MON', 279, 'Stk', `🛠 Montage`, true, false, 1, 'extra')
          ]
        }
      ]
    },
    {
      id: 'material-unter-ue-mat',
      title: 'Material UNTER-UE-MAT',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'material-unter-ue-mat-sub',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('cvis3wt112', 'material-unter-ue-mat', 'material-unter-ue-mat-sub', `VIS Waschtisch-Montageelement | CONEL VIS Waschtisch-Montage`, 'CVIS3WT112', 203.94, 'Stk', `CONEL VIS Waschtisch-Montage`, true, false, 1, 'service'),
            createProduct('dfix320wc112', 'material-unter-ue-mat', 'material-unter-ue-mat-sub', `Montageelement für Wand-WC, mit UP-Spülkasten Sigma 12 cm |`, 'DFIX320WC112', 390.06, 'Stk', ``, true, false, 1, 'service'),
            createProduct('sigma30wech', 'material-unter-ue-mat', 'material-unter-ue-mat-sub', `Abdeckplatte Sigma30 weiß/hgl.verchr. f.2-Mengen-Spülung, für UP-Spülkästen GE`, 'SIGMA30WECH', 101.5, 'Stk', `Abdeckplatte Sigma30 weiß/hgl.verchr. f.2-Mengen-Spülung, für UP-Spülkästen GE`, true, false, 1, 'material'),
            createProduct('wass-101-mat', 'material-unter-ue-mat', 'material-unter-ue-mat-sub', `SPÜLKASTEN | Unterputz für Hänge-WC |**Varianten**`, 'WASS-101-MAT', 920.65, 'Stk', `Unterputz für Hänge-WC |**Varianten**`, false, true, 1, 'optional')
          ]
        }
      ]
    }
  ]
};

export const packageWasserHauptstrang: RenovationPackage = {
  id: 'wasserHauptstrang',
  title: 'Hauptstrang',
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
            createProduct('wass-501-mat', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `HAUPTSTRANG (Trink- & Abwasser & Zirkul.) | 🛠 Montage-Leistungspaket`, 'WASS-501-MAT', 2767.9, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'service'),
            createProduct('wass-100-au', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `WEITERES zu WASSERINSTALLATION - (Klick Grünes-Symbol)`, 'WASS-100-AU', 0, 'Stk', `WEITERES zu WASSERINSTALLATION - (Klick Grünes-Symbol)`, true, false, 1, 'material')
          ]
        }
      ]
    }
  ]
};
