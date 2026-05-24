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

export const packageFensterAlles: RenovationPackage = {
  id: 'fensterAlles',
  title: 'Alles zu Fenster',
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
            createProduct('fens-100-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `FENSTER & Türen | 🛠 Montage-Leistungspaket`, 'FENS-100-BASIS', 415.31, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'service'),
            createProduct('fens-102-1-op', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `ALT-FENSTER |🛠 Demontage & Entsorgung`, 'FENS-102-1-OP', 70.5, 'Stk', `🛠 Demontage & Entsorgung`, true, false, 1, 'service')
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
            createProduct('fens-101-3-k1', 'material', 'material-sub', `Schüco LivIng 82 AS Rondo - bis 1 m Kantenlänge`, 'FENS-101.3-K1', 857.82, 'Stk', `Schüco LivIng 82 AS Rondo - bis 1 m Kantenlänge`, true, false, 1, 'material'),
            createProduct('fens-101-3-k2', 'material', 'material-sub', `Schüco LivIng 82 AS Rondo - bis 2 m Kantenlänge`, 'FENS-101.3-K2', 1264.16, 'Stk', `Schüco LivIng 82 AS Rondo - bis 2 m Kantenlänge`, true, false, 1, 'material'),
            createProduct('fens-101-3-k3', 'material', 'material-sub', `Schüco LivIng 82 AS Rondo - bis 3 m Kantenlänge`, 'FENS-101.3-K3', 1670.49, 'Stk', `Schüco LivIng 82 AS Rondo - bis 3 m Kantenlänge`, true, false, 1, 'material'),
            createProduct('fens-101-3-k4', 'material', 'material-sub', `Schüco LivIng 82 AS Rondo - bis 4 m Kantenlänge`, 'FENS-101.3-K4', 2076.83, 'Stk', `Schüco LivIng 82 AS Rondo - bis 4 m Kantenlänge`, true, false, 1, 'material'),
            createProduct('fens-501-9', 'material', 'material-sub', `Balkontür Kunststoff Schüco LivIng 82 AS Rondo`, 'FENS-501.9', 653.19, 'Stk', `Balkontür Kunststoff Schüco LivIng 82 AS Rondo`, true, false, 1, 'material'),
            createProduct('uv595-30018', 'material', 'material-sub', `Skan Holz Carport Eifel mit Bogen mit Doppelstegplatten`, 'uv595-30018', 2848.95, 'Stk', `Skan Holz Carport Eifel mit Bogen mit Doppelstegplatten`, true, false, 1, 'material'),
            createProduct('uv595-30003', 'material', 'material-sub', `Skan Holz Caravan-Carport Emsland mit Aluminium-Dachplatten`, 'uv595-30003', 4168.93, 'Stk', `Skan Holz Caravan-Carport Emsland mit Aluminium-Dachplatten`, true, false, 1, 'material'),
            createProduct('mat-anfrage-5', 'material', 'material-sub', `AUF ANFRAGE & BEMUSTERUNG DER MATERIALIEN`, 'MAT-Anfrage', 0, 'Stk', `AUF ANFRAGE & BEMUSTERUNG DER MATERIALIEN`, true, false, 1, 'material')
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
            createProduct('1101181', 'optionale-positionen', 'optionale-positionen-sub', `ACO Therm 3.0 RWA-Drehfluegel 3fach DIN L 1000x 500 m. 3 Baendern +RA-Beschlagtei.`, '1101181', 415.24, 'Stk', `ACO Therm 3.0 RWA-Drehfluegel 3fach DIN L 1000x 500 m. 3 Baendern +RA-Beschlagtei.`, false, true, 1, 'optional'),
            createProduct('uv600-130', 'optionale-positionen', 'optionale-positionen-sub', `Schellenberg Insektenschutz Rollo`, 'uv600-130', 71.38, 'Stk', `Schellenberg Insektenschutz Rollo`, false, true, 1, 'optional'),
            createProduct('uv600-142', 'optionale-positionen', 'optionale-positionen-sub', `Schellenberg Insektenschutz Schiebetür`, 'uv600-142', 168.25, 'Stk', `Schellenberg Insektenschutz Schiebetür`, false, true, 1, 'optional'),
            createProduct('gara-10002-basis', 'optionale-positionen', 'optionale-positionen-sub', `GARAGENTOR | 🛠 Montage-Leistungspaket`, 'GARA-10002-Basis', 790, 'Stk', `🛠 Montage-Leistungspaket`, false, true, 1, 'optional')
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
            createProduct('uv789-1039', 'extra-positionen', 'extra-positionen-sub', `Griffwerk LUCIA PROFESSIONAL Schraubtechnik GK4 - Fensterolive`, 'uv789-1039', 33.03, 'Stk', `Griffwerk LUCIA PROFESSIONAL Schraubtechnik GK4 - Fensterolive`, true, false, 1, 'extra'),
            createProduct('fens-101-basis', 'extra-positionen', 'extra-positionen-sub', `ROLLADENPANZER | Antrieb-MANUELL |**Varianten**`, 'FENS-101-BASIS', 1292, 'Stk', `Antrieb-MANUELL |**Varianten**`, false, true, 1, 'optional'),
            createProduct('fens-100-au', 'extra-positionen', 'extra-positionen-sub', `Weitere Produkte - zu FENSTER |**Varianten**`, 'FENS-100-AU', 0, 'Stk', `**Varianten**`, false, true, 1, 'optional'),
            createProduct('uv652-10002', 'extra-positionen', 'extra-positionen-sub', `Steico fix 2.0 Dämmkeile 20x1350 mm (Unterfensterbank)`, 'uv652-10002', 488.14, 'Pak', `Steico fix 2.0 Dämmkeile 20x1350 mm (Unterfensterbank)`, true, false, 1, 'extra'),
            createProduct('fens-10001-basis', 'extra-positionen', 'extra-positionen-sub', `MARKISEN | 🛠 Montage-Leistungspaket`, 'FENS-10001-Basis', 149, 'lfm', `🛠 Montage-Leistungspaket`, true, false, 1, 'extra'),
            createProduct('mat-anfrage', 'extra-positionen', 'extra-positionen-sub', `AUF ANFRAGE & BEMUSTERUNG DER MATERIALIEN`, 'MAT-Anfrage', 0, 'Stk', `AUF ANFRAGE & BEMUSTERUNG DER MATERIALIEN`, true, false, 1, 'extra'),
            createProduct('fens-10002-basis', 'extra-positionen', 'extra-positionen-sub', `FENSTERLÄDEN | 🛠 Montage-Leistungspaket`, 'FENS-10002-Basis', 179, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'extra'),
            createProduct('mat-anfrage-2', 'extra-positionen', 'extra-positionen-sub', `AUF ANFRAGE & BEMUSTERUNG DER MATERIALIEN`, 'MAT-Anfrage', 0, 'Stk', `AUF ANFRAGE & BEMUSTERUNG DER MATERIALIEN`, true, false, 1, 'extra'),
            createProduct('fens-101-1-zu', 'extra-positionen', 'extra-positionen-sub', `ROLLADENPANZER | ANTRIEB-MANUELL | 🛠 Zusatz-Montage`, 'FENS-101-1-ZU', 592.96, 'Stk', `ANTRIEB-MANUELL | 🛠 Zusatz-Montage`, true, false, 1, 'extra'),
            createProduct('mat-anfrage-3', 'extra-positionen', 'extra-positionen-sub', `AUF ANFRAGE & BEMUSTERUNG DER MATERIALIEN`, 'MAT-Anfrage', 0, 'Stk', `AUF ANFRAGE & BEMUSTERUNG DER MATERIALIEN`, true, false, 1, 'extra'),
            createProduct('fens-101-2-zu', 'extra-positionen', 'extra-positionen-sub', `ROLLADENPANZER | ANTRIEB-ELEKTRISCH | 🛠 Zusatz-Montage`, 'FENS-101-2-ZU', 988.96, 'Stk', `ANTRIEB-ELEKTRISCH | 🛠 Zusatz-Montage`, true, false, 1, 'extra'),
            createProduct('mat-anfrage-4', 'extra-positionen', 'extra-positionen-sub', `AUF ANFRAGE & BEMUSTERUNG DER MATERIALIEN`, 'MAT-Anfrage', 0, 'Stk', `AUF ANFRAGE & BEMUSTERUNG DER MATERIALIEN`, true, false, 1, 'extra'),
            createProduct('carp-10001-basis', 'extra-positionen', 'extra-positionen-sub', `CARPORTBAU FREISTEHEND | 🛠 Montage-Leistungspaket`, 'CARP-10001-Basis', 895, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'extra'),
            createProduct('carp-10008-basis', 'extra-positionen', 'extra-positionen-sub', `CARPORTBELEUCHTUNG | 🛠 Montage-Leistungspaket`, 'CARP-10008-Basis', 295, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'extra'),
            createProduct('carp-10009-basis', 'extra-positionen', 'extra-positionen-sub', `CARPORTBODEN | 🛠 Montage-Leistungspaket`, 'CARP-10009-Basis', 59, 'qm', `🛠 Montage-Leistungspaket`, true, false, 1, 'extra'),
            createProduct('carp-10010-basis', 'extra-positionen', 'extra-positionen-sub', `CARPORT-SEITENWÄNDE | 🛠 Montage-Leistungspaket`, 'CARP-10010-Basis', 149, 'qm', `🛠 Montage-Leistungspaket`, true, false, 1, 'extra'),
            createProduct('carp-10011-basis', 'extra-positionen', 'extra-positionen-sub', `CARPORT REGENRINNEN | 🛠 Montage-Leistungspaket`, 'CARP-10011-Basis', 95, 'lfm', `🛠 Montage-Leistungspaket`, true, false, 1, 'extra'),
            createProduct('carp-10012-basis', 'extra-positionen', 'extra-positionen-sub', `CARPORT-TOR | 🛠 Montage-Leistungspaket`, 'CARP-10012-Basis', 595, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'extra')
          ]
        }
      ]
    }
  ]
};

export const packageFensterKunststoff: RenovationPackage = {
  id: 'fensterKunststoff',
  title: 'Kunststofffenster',
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
            createProduct('fens-100-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `FENSTER & Türen | 🛠 Montage-Leistungspaket`, 'FENS-100-BASIS', 415.31, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 5, 'service'),
            createProduct('fens-102-1-op', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `ALT-FENSTER |🛠 Demontage & Entsorgung`, 'FENS-102-1-OP', 70.5, 'Stk', `🛠 Demontage & Entsorgung`, true, false, 1, 'service')
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
            createProduct('fens-101-3-k1', 'material', 'material-sub', `Schüco LivIng 82 AS Rondo - bis 1 m Kantenlänge`, 'FENS-101.3-K1', 857.82, 'Stk', `Schüco LivIng 82 AS Rondo - bis 1 m Kantenlänge`, true, false, 1, 'material'),
            createProduct('fens-101-3-k2', 'material', 'material-sub', `Schüco LivIng 82 AS Rondo - bis 2 m Kantenlänge`, 'FENS-101.3-K2', 1264.16, 'Stk', `Schüco LivIng 82 AS Rondo - bis 2 m Kantenlänge`, true, false, 1, 'material'),
            createProduct('fens-101-3-k3', 'material', 'material-sub', `Schüco LivIng 82 AS Rondo - bis 3 m Kantenlänge`, 'FENS-101.3-K3', 1670.49, 'Stk', `Schüco LivIng 82 AS Rondo - bis 3 m Kantenlänge`, true, false, 1, 'material'),
            createProduct('fens-101-3-k4', 'material', 'material-sub', `Schüco LivIng 82 AS Rondo - bis 4 m Kantenlänge`, 'FENS-101.3-K4', 2076.83, 'Stk', `Schüco LivIng 82 AS Rondo - bis 4 m Kantenlänge`, true, false, 1, 'material'),
            createProduct('fens-501-9', 'material', 'material-sub', `Balkontür Kunststoff Schüco LivIng 82 AS Rondo`, 'FENS-501.9', 653.19, 'Stk', `Balkontür Kunststoff Schüco LivIng 82 AS Rondo`, true, false, 1, 'material')
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
            createProduct('1101181', 'optionale-positionen', 'optionale-positionen-sub', `ACO Therm 3.0 RWA-Drehfluegel 3fach DIN L 1000x 500 m. 3 Baendern +RA-Beschlagtei.`, '1101181', 415.24, 'Stk', `ACO Therm 3.0 RWA-Drehfluegel 3fach DIN L 1000x 500 m. 3 Baendern +RA-Beschlagtei.`, false, true, 1, 'optional'),
            createProduct('uv600-130', 'optionale-positionen', 'optionale-positionen-sub', `Schellenberg Insektenschutz Rollo`, 'uv600-130', 71.38, 'Stk', `Schellenberg Insektenschutz Rollo`, false, true, 1, 'optional'),
            createProduct('uv600-142', 'optionale-positionen', 'optionale-positionen-sub', `Schellenberg Insektenschutz Schiebetür`, 'uv600-142', 168.25, 'Stk', `Schellenberg Insektenschutz Schiebetür`, false, true, 1, 'optional')
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
            createProduct('uv789-1039', 'extra-positionen', 'extra-positionen-sub', `Griffwerk LUCIA PROFESSIONAL Schraubtechnik GK4 - Fensterolive`, 'uv789-1039', 33.03, 'Stk', `Griffwerk LUCIA PROFESSIONAL Schraubtechnik GK4 - Fensterolive`, true, false, 5, 'extra'),
            createProduct('fens-101-basis', 'extra-positionen', 'extra-positionen-sub', `ROLLADENPANZER | Antrieb-MANUELL |**Varianten**`, 'FENS-101-BASIS', 1292, 'Stk', `Antrieb-MANUELL |**Varianten**`, false, true, 1, 'optional'),
            createProduct('fens-100-au', 'extra-positionen', 'extra-positionen-sub', `Weitere Produkte - zu FENSTER |**Varianten**`, 'FENS-100-AU', 0, 'Stk', `**Varianten**`, false, true, 1, 'optional'),
            createProduct('uv652-10002', 'extra-positionen', 'extra-positionen-sub', `Steico fix 2.0 Dämmkeile 20x1350 mm (Unterfensterbank)`, 'uv652-10002', 488.14, 'Pak', `Steico fix 2.0 Dämmkeile 20x1350 mm (Unterfensterbank)`, true, false, 1, 'extra')
          ]
        }
      ]
    }
  ]
};

export const packageFensterHolz: RenovationPackage = {
  id: 'fensterHolz',
  title: 'Holzfenster',
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
            createProduct('fens-100-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `FENSTER & Türen | 🛠 Montage-Leistungspaket`, 'FENS-100-BASIS', 415.31, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 5, 'service'),
            createProduct('fens-102-1-op', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `ALT-FENSTER |🛠 Demontage & Entsorgung`, 'FENS-102-1-OP', 70.5, 'Stk', `🛠 Demontage & Entsorgung`, true, false, 1, 'service')
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
            createProduct('fens-301-1-k1', 'material', 'material-sub', `Wertbau Holzfenster IV68 Classic mit Regenschiene - bis 1 m Kantenlänge`, 'FENS-301.1-K1', 1622.43, 'Stk', `Wertbau Holzfenster IV68 Classic mit Regenschiene - bis 1 m Kantenlänge`, true, false, 1, 'material'),
            createProduct('fens-301-1-k2', 'material', 'material-sub', `Wertbau Holzfenster IV68 Classic mit Regenschiene - bis 2 m Kantenlänge`, 'FENS-301.1-K2', 2390.94, 'Stk', `Wertbau Holzfenster IV68 Classic mit Regenschiene - bis 2 m Kantenlänge`, true, false, 1, 'material'),
            createProduct('fens-301-1-k3', 'material', 'material-sub', `Wertbau Holzfenster IV68 Classic mit Regenschiene - bis 3 m Kantenlänge`, 'FENS-301.1-K3', 3159.46, 'Stk', `Wertbau Holzfenster IV68 Classic mit Regenschiene - bis 3 m Kantenlänge`, true, false, 1, 'material'),
            createProduct('fens-301-1-k4', 'material', 'material-sub', `Wertbau Holzfenster IV68 Classic mit Regenschiene - bis 4 m Kantenlänge`, 'FENS-301.1-K4', 3927.98, 'Stk', `Wertbau Holzfenster IV68 Classic mit Regenschiene - bis 4 m Kantenlänge`, true, false, 1, 'material'),
            createProduct('fens-501-39', 'material', 'material-sub', `Wertbau Balkontür Holz IV68 Stil mit Regenschiene`, 'FENS-501.39', 956.28, 'Stk', `Wertbau Balkontür Holz IV68 Stil mit Regenschiene`, true, false, 1, 'material')
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
            createProduct('1101181', 'optionale-positionen', 'optionale-positionen-sub', `ACO Therm 3.0 RWA-Drehfluegel 3fach DIN L 1000x 500 m. 3 Baendern +RA-Beschlagtei.`, '1101181', 415.24, 'Stk', `ACO Therm 3.0 RWA-Drehfluegel 3fach DIN L 1000x 500 m. 3 Baendern +RA-Beschlagtei.`, false, true, 1, 'optional'),
            createProduct('uv600-130', 'optionale-positionen', 'optionale-positionen-sub', `Schellenberg Insektenschutz Rollo`, 'uv600-130', 71.38, 'Stk', `Schellenberg Insektenschutz Rollo`, false, true, 1, 'optional'),
            createProduct('uv600-142', 'optionale-positionen', 'optionale-positionen-sub', `Schellenberg Insektenschutz Schiebetür`, 'uv600-142', 168.25, 'Stk', `Schellenberg Insektenschutz Schiebetür`, false, true, 1, 'optional')
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
            createProduct('uv789-1039', 'extra-positionen', 'extra-positionen-sub', `Griffwerk LUCIA PROFESSIONAL Schraubtechnik GK4 - Fensterolive`, 'uv789-1039', 33.03, 'Stk', `Griffwerk LUCIA PROFESSIONAL Schraubtechnik GK4 - Fensterolive`, true, false, 5, 'extra'),
            createProduct('fens-101-basis', 'extra-positionen', 'extra-positionen-sub', `ROLLADENPANZER | Antrieb-MANUELL |**Varianten**`, 'FENS-101-BASIS', 1292, 'Stk', `Antrieb-MANUELL |**Varianten**`, false, true, 1, 'optional'),
            createProduct('fens-100-au', 'extra-positionen', 'extra-positionen-sub', `Weitere Produkte - zu FENSTER |**Varianten**`, 'FENS-100-AU', 0, 'Stk', `**Varianten**`, false, true, 1, 'optional'),
            createProduct('uv652-10002', 'extra-positionen', 'extra-positionen-sub', `Steico fix 2.0 Dämmkeile 20x1350 mm (Unterfensterbank)`, 'uv652-10002', 488.14, 'Pak', `Steico fix 2.0 Dämmkeile 20x1350 mm (Unterfensterbank)`, true, false, 1, 'extra')
          ]
        }
      ]
    }
  ]
};

export const packageFensterAluminium: RenovationPackage = {
  id: 'fensterAluminium',
  title: 'Aluminiumfenster',
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
            createProduct('fens-100-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `FENSTER & Türen | 🛠 Montage-Leistungspaket`, 'FENS-100-BASIS', 415.31, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 5, 'service'),
            createProduct('fens-102-1-op', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `ALT-FENSTER |🛠 Demontage & Entsorgung`, 'FENS-102-1-OP', 70.5, 'Stk', `🛠 Demontage & Entsorgung`, true, false, 1, 'service')
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
            createProduct('fens-201-1-k1', 'material', 'material-sub', `Schüco CT70 Kunststoff-Alu-Fenster - bis 1 m Kantenlänge`, 'FENS-201.1-K1', 1328.49, 'Stk', `Schüco CT70 Kunststoff-Alu-Fenster - bis 1 m Kantenlänge`, true, false, 1, 'material'),
            createProduct('fens-201-1-k2', 'material', 'material-sub', `Schüco CT70 Kunststoff-Alu-Fenster - bis 2 m Kantenlänge`, 'FENS-201.1-K2', 1957.77, 'Stk', `Schüco CT70 Kunststoff-Alu-Fenster - bis 2 m Kantenlänge`, true, false, 1, 'material'),
            createProduct('fens-201-1-k3', 'material', 'material-sub', `Schüco CT70 Kunststoff-Alu-Fenster - bis 3 m Kantenlänge`, 'FENS-201.1-K3', 2587.05, 'Stk', `Schüco CT70 Kunststoff-Alu-Fenster - bis 3 m Kantenlänge`, true, false, 1, 'material'),
            createProduct('fens-201-1-k4', 'material', 'material-sub', `Schüco CT70 Kunststoff-Alu-Fenster - bis 4 m Kantenlänge`, 'FENS-201.1-K4', 3216.34, 'Stk', `Schüco CT70 Kunststoff-Alu-Fenster - bis 4 m Kantenlänge`, true, false, 1, 'material'),
            createProduct('fens-501-37', 'material', 'material-sub', `Schüco CT70 Balkontür Kunststoff-Alu`, 'FENS-501.37', 664.5, 'Stk', `Schüco CT70 Balkontür Kunststoff-Alu`, true, false, 1, 'material')
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
            createProduct('1101181', 'optionale-positionen', 'optionale-positionen-sub', `ACO Therm 3.0 RWA-Drehfluegel 3fach DIN L 1000x 500 m. 3 Baendern +RA-Beschlagtei.`, '1101181', 415.24, 'Stk', `ACO Therm 3.0 RWA-Drehfluegel 3fach DIN L 1000x 500 m. 3 Baendern +RA-Beschlagtei.`, false, true, 1, 'optional'),
            createProduct('uv600-130', 'optionale-positionen', 'optionale-positionen-sub', `Schellenberg Insektenschutz Rollo`, 'uv600-130', 71.38, 'Stk', `Schellenberg Insektenschutz Rollo`, false, true, 1, 'optional'),
            createProduct('uv600-142', 'optionale-positionen', 'optionale-positionen-sub', `Schellenberg Insektenschutz Schiebetür`, 'uv600-142', 168.25, 'Stk', `Schellenberg Insektenschutz Schiebetür`, false, true, 1, 'optional')
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
            createProduct('uv789-1039', 'extra-positionen', 'extra-positionen-sub', `Griffwerk LUCIA PROFESSIONAL Schraubtechnik GK4 - Fensterolive`, 'uv789-1039', 33.03, 'Stk', `Griffwerk LUCIA PROFESSIONAL Schraubtechnik GK4 - Fensterolive`, true, false, 5, 'extra'),
            createProduct('fens-101-basis', 'extra-positionen', 'extra-positionen-sub', `ROLLADENPANZER | Antrieb-MANUELL |**Varianten**`, 'FENS-101-BASIS', 1292, 'Stk', `Antrieb-MANUELL |**Varianten**`, false, true, 1, 'optional'),
            createProduct('fens-100-au', 'extra-positionen', 'extra-positionen-sub', `Weitere Produkte - zu FENSTER |**Varianten**`, 'FENS-100-AU', 0, 'Stk', `**Varianten**`, false, true, 1, 'optional'),
            createProduct('uv652-10002', 'extra-positionen', 'extra-positionen-sub', `Steico fix 2.0 Dämmkeile 20x1350 mm (Unterfensterbank)`, 'uv652-10002', 488.14, 'Pak', `Steico fix 2.0 Dämmkeile 20x1350 mm (Unterfensterbank)`, true, false, 1, 'extra')
          ]
        }
      ]
    }
  ]
};

export const packageFensterFensterlaeden: RenovationPackage = {
  id: 'fensterFensterlaeden',
  title: 'Fensterläden',
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
            createProduct('fens-10002-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `FENSTERLÄDEN | 🛠 Montage-Leistungspaket`, 'FENS-10002-Basis', 179, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'service')
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
            createProduct('fens-101-basis', 'material', 'material-sub', `ROLLADENPANZER | Antrieb-MANUELL |**Varianten**`, 'FENS-101-BASIS', 1292, 'Stk', `Antrieb-MANUELL |**Varianten**`, false, true, 1, 'optional')
          ]
        }
      ]
    }
  ]
};

export const packageFensterRolladen: RenovationPackage = {
  id: 'fensterRolladen',
  title: 'Rollladen',
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
            createProduct('fens-101-1-zu', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `ROLLADENPANZER | ANTRIEB-MANUELL | 🛠 Zusatz-Montage`, 'FENS-101-1-ZU', 592.96, 'Stk', `ANTRIEB-MANUELL | 🛠 Zusatz-Montage`, true, false, 1, 'extra')
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
            createProduct('fens-101-2-zu', 'optionale-positionen', 'optionale-positionen-sub', `ROLLADENPANZER | ANTRIEB-ELEKTRISCH | 🛠 Zusatz-Montage`, 'FENS-101-2-ZU', 988.96, 'Stk', `ANTRIEB-ELEKTRISCH | 🛠 Zusatz-Montage`, false, true, 1, 'optional')
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
            createProduct('mat-anfrage', 'material', 'material-sub', `AUF ANFRAGE & BEMUSTERUNG DER MATERIALIEN`, 'MAT-Anfrage', 0, 'Stk', `AUF ANFRAGE & BEMUSTERUNG DER MATERIALIEN`, true, false, 1, 'material')
          ]
        }
      ]
    }
  ]
};

export const packageFensterDachfenster: RenovationPackage = {
  id: 'fensterDachfenster',
  title: 'Dachfenster',
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
            createProduct('dach-500-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `DACHFENSTER | 🛠 Montage-Leistungspaket`, 'DACH-500-BASIS', 795.9, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'service')
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
            createProduct('uv702-1369', 'material', 'material-sub', `Velux GGU Kunststoff-Dachfenster | Schwingfenster Solarfenster`, 'uv702-1369', 1147.8, 'Stk', `Schwingfenster Solarfenster`, true, false, 1, 'material')
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
            createProduct('uv704-91870', 'optionale-positionen', 'optionale-positionen-sub', `Velux DG Verdunkelungs-Rollo manuell`, 'uv704-91870', 83.72, 'Stk', `Velux DG Verdunkelungs-Rollo manuell`, false, true, 1, 'optional')
          ]
        }
      ]
    }
  ]
};

export const packageFensterBalkontueren: RenovationPackage = {
  id: 'fensterBalkontueren',
  title: 'Balkontüren',
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
            createProduct('fens-100-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `FENSTER & Türen | 🛠 Montage-Leistungspaket`, 'FENS-100-BASIS', 415.31, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'service'),
            createProduct('fens-102-1-op', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `ALT-FENSTER |🛠 Demontage & Entsorgung`, 'FENS-102-1-OP', 70.5, 'Stk', `🛠 Demontage & Entsorgung`, true, false, 1, 'service')
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
            createProduct('fens-501-9', 'material', 'material-sub', `Balkontür Kunststoff Schüco LivIng 82 AS Rondo`, 'FENS-501.9', 653.19, 'Stk', `Balkontür Kunststoff Schüco LivIng 82 AS Rondo`, true, false, 1, 'material')
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
            createProduct('fens-701-2', 'optionale-positionen', 'optionale-positionen-sub', `Hebeschiebetür Schüco LivIngSlide HST Eco`, 'FENS-701.2', 4470.51, 'Stk', `Hebeschiebetür Schüco LivIngSlide HST Eco`, false, true, 1, 'optional'),
            createProduct('fens-601-11', 'optionale-positionen', 'optionale-positionen-sub', `PSK Tür Kunststoff Schüco LivIng 82 AS`, 'FENS-601.11', 2780.88, 'Stk', `PSK Tür Kunststoff Schüco LivIng 82 AS`, false, true, 1, 'optional')
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
            createProduct('uv789-1039', 'extra-positionen', 'extra-positionen-sub', `Griffwerk LUCIA PROFESSIONAL Schraubtechnik GK4 - Fensterolive`, 'uv789-1039', 33.03, 'Stk', `Griffwerk LUCIA PROFESSIONAL Schraubtechnik GK4 - Fensterolive`, true, false, 1, 'extra'),
            createProduct('fens-101-basis', 'extra-positionen', 'extra-positionen-sub', `ROLLADENPANZER | Antrieb-MANUELL |**Varianten**`, 'FENS-101-BASIS', 1292, 'Stk', `Antrieb-MANUELL |**Varianten**`, false, true, 1, 'optional'),
            createProduct('uv600-130', 'extra-positionen', 'extra-positionen-sub', `Schellenberg Insektenschutz Rollo`, 'uv600-130', 71.38, 'Stk', `Schellenberg Insektenschutz Rollo`, true, false, 1, 'extra'),
            createProduct('uv600-142', 'extra-positionen', 'extra-positionen-sub', `Schellenberg Insektenschutz Schiebetür`, 'uv600-142', 168.25, 'Stk', `Schellenberg Insektenschutz Schiebetür`, true, false, 1, 'extra'),
            createProduct('fens-100-au', 'extra-positionen', 'extra-positionen-sub', `Weitere Produkte - zu FENSTER |**Varianten**`, 'FENS-100-AU', 0, 'Stk', `**Varianten**`, false, true, 1, 'optional'),
            createProduct('uv652-10002', 'extra-positionen', 'extra-positionen-sub', `Steico fix 2.0 Dämmkeile 20x1350 mm (Unterfensterbank)`, 'uv652-10002', 488.14, 'Pak', `Steico fix 2.0 Dämmkeile 20x1350 mm (Unterfensterbank)`, true, false, 1, 'extra')
          ]
        }
      ]
    }
  ]
};

export const packageFensterCarportGaragentore: RenovationPackage = {
  id: 'fensterCarportGaragentore',
  title: 'Garagentore',
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
            createProduct('carp-10001-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `CARPORTBAU FREISTEHEND | 🛠 Montage-Leistungspaket`, 'CARP-10001-Basis', 895, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'service')
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
            createProduct('uv595-30018', 'material', 'material-sub', `Skan Holz Carport Eifel mit Bogen mit Doppelstegplatten`, 'uv595-30018', 2848.95, 'Stk', `Skan Holz Carport Eifel mit Bogen mit Doppelstegplatten`, true, false, 1, 'material'),
            createProduct('uv595-30003', 'material', 'material-sub', `Skan Holz Caravan-Carport Emsland mit Aluminium-Dachplatten`, 'uv595-30003', 4168.93, 'Stk', `Skan Holz Caravan-Carport Emsland mit Aluminium-Dachplatten`, true, false, 1, 'material'),
            createProduct('mat-anfrage', 'material', 'material-sub', `AUF ANFRAGE & BEMUSTERUNG DER MATERIALIEN`, 'MAT-Anfrage', 0, 'Stk', `AUF ANFRAGE & BEMUSTERUNG DER MATERIALIEN`, true, false, 1, 'material')
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
            createProduct('carp-10008-basis', 'extra-positionen', 'extra-positionen-sub', `CARPORTBELEUCHTUNG | 🛠 Montage-Leistungspaket`, 'CARP-10008-Basis', 295, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'extra'),
            createProduct('carp-10009-basis', 'extra-positionen', 'extra-positionen-sub', `CARPORTBODEN | 🛠 Montage-Leistungspaket`, 'CARP-10009-Basis', 59, 'qm', `🛠 Montage-Leistungspaket`, true, false, 1, 'extra'),
            createProduct('carp-10010-basis', 'extra-positionen', 'extra-positionen-sub', `CARPORT-SEITENWÄNDE | 🛠 Montage-Leistungspaket`, 'CARP-10010-Basis', 149, 'qm', `🛠 Montage-Leistungspaket`, true, false, 1, 'extra'),
            createProduct('carp-10011-basis', 'extra-positionen', 'extra-positionen-sub', `CARPORT REGENRINNEN | 🛠 Montage-Leistungspaket`, 'CARP-10011-Basis', 95, 'lfm', `🛠 Montage-Leistungspaket`, true, false, 1, 'extra'),
            createProduct('carp-10012-basis', 'extra-positionen', 'extra-positionen-sub', `CARPORT-TOR | 🛠 Montage-Leistungspaket`, 'CARP-10012-Basis', 595, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'extra')
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
            createProduct('gara-10002-basis', 'optionale-positionen', 'optionale-positionen-sub', `GARAGENTOR | 🛠 Montage-Leistungspaket`, 'GARA-10002-Basis', 790, 'Stk', `🛠 Montage-Leistungspaket`, false, true, 1, 'optional')
          ]
        }
      ]
    }
  ]
};

export const packageFensterFensterLackierung: RenovationPackage = {
  id: 'fensterFensterLackierung',
  title: 'Fensterlackierung',
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

export const packageFensterMarkisen: RenovationPackage = {
  id: 'fensterMarkisen',
  title: 'Markisen',
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
            createProduct('fens-10001-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `MARKISEN | 🛠 Montage-Leistungspaket`, 'FENS-10001-Basis', 149, 'lfm', `🛠 Montage-Leistungspaket`, true, false, 1, 'service')
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
            createProduct('mat-anfrage', 'material', 'material-sub', `AUF ANFRAGE & BEMUSTERUNG DER MATERIALIEN`, 'MAT-Anfrage', 0, 'Stk', `AUF ANFRAGE & BEMUSTERUNG DER MATERIALIEN`, true, false, 1, 'material')
          ]
        }
      ]
    }
  ]
};
