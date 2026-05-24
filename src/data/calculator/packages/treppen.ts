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

export const packageTreppenAlles: RenovationPackage = {
  id: 'treppenAlles',
  title: 'Alles zu Treppen',
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
            createProduct('mon-10255', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `HOLZTREPPEN | 🛠 Montage`, 'MON-10255', 1790, 'Stk', `🛠 Montage`, true, false, 1, 'service'),
            createProduct('tr-uv-11504', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `Holztreppe Lindos (Eiche) gerade`, 'TR-uv-11504', 3207.76, 'Stk', `Holztreppe Lindos (Eiche) gerade`, true, false, 1, 'material'),
            createProduct('trep-10030', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `BETONTREPPE pro Stufe | 🛠 Montage`, 'TREP-10030', 149, 'pro Stufe', `🛠 Montage`, true, false, 1, 'service'),
            createProduct('trep-10031', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `BETON-PODEST für Treppe | 🛠 Montage`, 'TREP-10031', 245, 'qm', `🛠 Montage`, true, false, 1, 'service'),
            createProduct('mon-10077', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `STUFEN | FLIESEN | 🛠 Montage`, 'MON-10077', 79, 'Stk', `FLIESEN | 🛠 Montage`, true, false, 1, 'service'),
            createProduct('144-12646', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `Agrob Buchtal Stufenplatte 25x35x1,4/4,2cm Goldline goldocker R11/A 851-9330`, '144-12646', 19.47, 'Stk', `Agrob Buchtal Stufenplatte 25x35x1,4/4,2cm Goldline goldocker R11/A 851-9330`, true, false, 1, 'material'),
            createProduct('trep-10001-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `AUßENTREPPE | 🛠 Montage-Leistungspaket`, 'TREP-10001-Basis', 1490, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'service'),
            createProduct('tr-uv-11845', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `Außenstahlwangentreppe Kreta gerade`, 'TR-uv-11845', 1901.12, 'Stk', `Außenstahlwangentreppe Kreta gerade`, true, false, 1, 'material'),
            createProduct('trep-10002-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `SPINDELTREPPE | 🛠 Montage-Leistungspaket`, 'TREP-10002-Basis', 1490, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'service'),
            createProduct('152-43', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `Dolle Spindeltreppe Oslo Buche Leimholz, lackiert - Ø 120 cm Art.Nr.: 760213`, '152-43', 1582.9, 'Stk', `Dolle Spindeltreppe Oslo Buche Leimholz, lackiert - Ø 120 cm Art.Nr.: 760213`, true, false, 1, 'material'),
            createProduct('trep-10004-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `RAUMSPAR-TREPPE | 🛠 Montage-Leistungspaket`, 'TREP-10004-Basis', 1490, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'service'),
            createProduct('tr-uv-11639', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `Raumspartreppe Fichte 2000 mit Holzgeländer`, 'TR-uv-11639', 520.03, 'Stk', `Raumspartreppe Fichte 2000 mit Holzgeländer`, true, false, 1, 'material'),
            createProduct('male-301-5-mat', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `TREPPENSTUFEN LACKIERUNG | 🛠 Montage-Leistungspaket`, 'MALE-301.5-MAT', 99, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'service'),
            createProduct('trep-201-3-zu', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `AUFBEREITEN PODEST | JE PODEST (SCHLEIFEN & LACKIEREN) | 🛠 Zusatz-Montage`, 'TREP-201.3-ZU', 198, 'Stk', `JE PODEST (SCHLEIFEN & LACKIEREN) | 🛠 Zusatz-Montage`, true, false, 1, 'extra'),
            createProduct('male-301-6-mat', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `TREPPENGELÄNDER LACKIERUNG | 🛠 Montage-Leistungspaket`, 'MALE-301.6-MAT', 589.9, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'service'),
            createProduct('trep-202-1-zu', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `VERKLEIDUNG STUFE | JE TREPPENSTUFE (MIT MASSIVHOLZ) | 🛠 Zusatz-Montage`, 'TREP-202.1-ZU', 149, 'Stk', `JE TREPPENSTUFE (MIT MASSIVHOLZ) | 🛠 Zusatz-Montage`, true, false, 1, 'extra'),
            createProduct('trep-203-1-zu', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `VERKLEIDUNG PODEST | JE PODEST (MIT MASSIVHOLZ) | 🛠 Zusatz-Montage`, 'TREP-203.1-ZU', 595, 'Stk', `JE PODEST (MIT MASSIVHOLZ) | 🛠 Zusatz-Montage`, true, false, 1, 'extra'),
            createProduct('tr-uv-11824', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `Treppenstufe Modell Samos`, 'TR-uv-11824', 57.48, 'Stk', `Treppenstufe Modell Samos`, true, false, 1, 'material'),
            createProduct('tr-uv-11819', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `Setzstufen aus Massivholz`, 'TR-uv-11819', 57.48, 'Stk', `Setzstufen aus Massivholz`, true, false, 1, 'material'),
            createProduct('mon-10259', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `TREPPENGELÄNDER| 🛠 Montage`, 'MON-10259', 195, 'lfm', `🛠 Montage`, true, false, 1, 'service'),
            createProduct('tr-uv-11773', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `Treppengeländer Modell Kos gerade`, 'TR-uv-11773', 758, 'Stk', `Treppengeländer Modell Kos gerade`, true, false, 1, 'material'),
            createProduct('tr-uv-11798', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `Brüstungsgeländer Modell Kos`, 'TR-uv-11798', 526.87, 'Stk', `Brüstungsgeländer Modell Kos`, true, false, 1, 'material'),
            createProduct('mon-10255-2', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `HOLZTREPPEN | 🛠 Montage`, 'MON-10255', 1790, 'Stk', `🛠 Montage`, true, false, 1, 'service')
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
            createProduct('600', 'optionale-positionen', 'optionale-positionen-sub', `Holztreppe Lindos (Eiche) ¼ gewendelt unten`, '600', 3564.94, 'Stk', `Holztreppe Lindos (Eiche) ¼ gewendelt unten`, false, true, 1, 'optional'),
            createProduct('tr-uv-11882', 'optionale-positionen', 'optionale-positionen-sub', `Außenspindeltreppe PINIO aus massiven Stahl mit Geländer und Podest`, 'TR-uv-11882', 1883.47, 'Stk', `Außenspindeltreppe PINIO aus massiven Stahl mit Geländer und Podest`, false, true, 1, 'optional'),
            createProduct('tr-uv-11882-2', 'optionale-positionen', 'optionale-positionen-sub', `Außenspindeltreppe PINIO aus massiven Stahl mit Geländer und Podest`, 'TR-uv-11882', 1883.47, 'Stk', `Außenspindeltreppe PINIO aus massiven Stahl mit Geländer und Podest`, false, true, 1, 'optional'),
            createProduct('tr-uv-11902', 'optionale-positionen', 'optionale-positionen-sub', `Spindeltreppe HEAVY METAL aus Stahl mit Podest und Geländer`, 'TR-uv-11902', 2800.68, 'Stk', `Spindeltreppe HEAVY METAL aus Stahl mit Podest und Geländer`, false, true, 1, 'optional'),
            createProduct('tr-uv-11760', 'optionale-positionen', 'optionale-positionen-sub', `Mittelholmtreppe SEGMENT aus Stahl mit Geländer`, 'TR-uv-11760', 4370.09, 'Stk', `Mittelholmtreppe SEGMENT aus Stahl mit Geländer`, false, true, 1, 'optional'),
            createProduct('trep-102-3-mat', 'optionale-positionen', 'optionale-positionen-sub', `Glasgeländer Premium`, 'TREP-102.3-MAT', 2993.91, 'Stk', `Glasgeländer Premium`, false, true, 1, 'optional'),
            createProduct('uv577-149', 'optionale-positionen', 'optionale-positionen-sub', `Roto Bodentreppe Designo Passivhaus KH 29 - U-Wert 0,63`, 'uv577-149', 935, 'Stk', `Roto Bodentreppe Designo Passivhaus KH 29 - U-Wert 0,63`, false, true, 1, 'optional')
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
            createProduct('uv729-20050', 'material', 'material-sub', `Wellhöfer Bodentreppe StahlBlau mit WärmeSchutz WS3D`, 'uv729-20050', 666.46, 'Stk', `Wellhöfer Bodentreppe StahlBlau mit WärmeSchutz WS3D`, true, false, 1, 'material')
          ]
        }
      ]
    }
  ]
};

export const packageTreppenHolztreppe: RenovationPackage = {
  id: 'treppenHolztreppe',
  title: 'Holztreppe',
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
            createProduct('mon-10255', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `HOLZTREPPEN | 🛠 Montage`, 'MON-10255', 1790, 'Stk', `🛠 Montage`, true, false, 1, 'service')
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
            createProduct('tr-uv-11504', 'material', 'material-sub', `Holztreppe Lindos (Eiche) gerade`, 'TR-uv-11504', 3207.76, 'Stk', `Holztreppe Lindos (Eiche) gerade`, true, false, 1, 'material')
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
            createProduct('600', 'optionale-positionen', 'optionale-positionen-sub', `Holztreppe Lindos (Eiche) ¼ gewendelt unten`, '600', 3564.94, 'Stk', `Holztreppe Lindos (Eiche) ¼ gewendelt unten`, false, true, 1, 'optional'),
            createProduct('blitz-trep-durch', 'optionale-positionen', 'optionale-positionen-sub', `DURCHBRUCH TREPPENAUGE Angebot | Kalkulator für Montage & Material`, 'BLITZ-TREP-DURCH', 0, 'Stk', `Kalkulator für Montage & Material`, false, true, 1, 'optional'),
            createProduct('trep-101-1-zu', 'optionale-positionen', 'optionale-positionen-sub', `WANGENVERKLEIDUNG TREPPENLOCH | 🛠 Zusatz-Montage`, 'TREP-101-1-ZU', 503.95, 'Stk', `🛠 Zusatz-Montage`, false, true, 1, 'optional')
          ]
        }
      ]
    }
  ]
};

export const packageTreppenBetontreppe: RenovationPackage = {
  id: 'treppenBetontreppe',
  title: 'Betontreppe',
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
            createProduct('trep-10030', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `BETONTREPPE pro Stufe | 🛠 Montage`, 'TREP-10030', 149, 'pro Stufe', `🛠 Montage`, true, false, 11, 'service'),
            createProduct('trep-10031', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `BETON-PODEST für Treppe | 🛠 Montage`, 'TREP-10031', 245, 'qm', `🛠 Montage`, true, false, 2, 'service')
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
            createProduct('mon-10077', 'optionale-positionen', 'optionale-positionen-sub', `STUFEN | FLIESEN | 🛠 Montage`, 'MON-10077', 79, 'Stk', `FLIESEN | 🛠 Montage`, false, true, 1, 'optional'),
            createProduct('144-12646', 'optionale-positionen', 'optionale-positionen-sub', `Agrob Buchtal Stufenplatte 25x35x1,4/4,2cm Goldline goldocker R11/A 851-9330`, '144-12646', 19.47, 'Stk', `Agrob Buchtal Stufenplatte 25x35x1,4/4,2cm Goldline goldocker R11/A 851-9330`, false, true, 1, 'optional')
          ]
        }
      ]
    }
  ]
};

export const packageTreppenDurchbruch: RenovationPackage = {
  id: 'treppenDurchbruch',
  title: 'Treppenauge',
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
            createProduct('trep-501-1-zu', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `TREPPENLOCH IN BETONDECKE HERSTELLEN | 🛠 Zusatz-Montage`, 'TREP-501.1-ZU', 4050, 'Stk', `🛠 Zusatz-Montage`, true, false, 1, 'extra')
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
            createProduct('trep-101-1-zu', 'optionale-positionen', 'optionale-positionen-sub', `WANGENVERKLEIDUNG TREPPENLOCH | 🛠 Zusatz-Montage`, 'TREP-101-1-ZU', 503.95, 'Stk', `🛠 Zusatz-Montage`, false, true, 1, 'optional'),
            createProduct('trep-101-2-zu', 'optionale-positionen', 'optionale-positionen-sub', `ALT-TREPPENLOCH | VERSCHLIEßEN | 🛠 Zusatz-Montage`, 'TREP-101-2-ZU', 473.54, 'Stk', `VERSCHLIEßEN | 🛠 Zusatz-Montage`, false, true, 1, 'optional')
          ]
        }
      ]
    }
  ]
};

export const packageTreppenGelaender: RenovationPackage = {
  id: 'treppenGelaender',
  title: 'Geländer',
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
            createProduct('mon-10259', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `TREPPENGELÄNDER| 🛠 Montage`, 'MON-10259', 195, 'lfm', `🛠 Montage`, true, false, 5, 'service')
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
            createProduct('tr-uv-11773', 'material', 'material-sub', `Treppengeländer Modell Kos gerade`, 'TR-uv-11773', 758, 'Stk', `Treppengeländer Modell Kos gerade`, true, false, 1, 'material'),
            createProduct('tr-uv-11798', 'material', 'material-sub', `Brüstungsgeländer Modell Kos`, 'TR-uv-11798', 526.87, 'Stk', `Brüstungsgeländer Modell Kos`, true, false, 1, 'material')
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
            createProduct('trep-102-3-mat', 'optionale-positionen', 'optionale-positionen-sub', `Glasgeländer Premium`, 'TREP-102.3-MAT', 2993.91, 'Stk', `Glasgeländer Premium`, false, true, 1, 'optional'),
            createProduct('male-301-6-mat', 'optionale-positionen', 'optionale-positionen-sub', `TREPPENGELÄNDER LACKIERUNG | 🛠 Montage-Leistungspaket`, 'MALE-301.6-MAT', 589.9, 'Stk', `🛠 Montage-Leistungspaket`, false, true, 1, 'optional')
          ]
        }
      ]
    }
  ]
};

export const packageTreppenAussentreppe: RenovationPackage = {
  id: 'treppenAussentreppe',
  title: 'Außentreppe',
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
            createProduct('trep-10001-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `AUßENTREPPE | 🛠 Montage-Leistungspaket`, 'TREP-10001-Basis', 1490, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'service')
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
            createProduct('tr-uv-11845', 'material', 'material-sub', `Außenstahlwangentreppe Kreta gerade`, 'TR-uv-11845', 1901.12, 'Stk', `Außenstahlwangentreppe Kreta gerade`, true, false, 1, 'material')
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
            createProduct('tr-uv-11882', 'optionale-positionen', 'optionale-positionen-sub', `Außenspindeltreppe PINIO aus massiven Stahl mit Geländer und Podest`, 'TR-uv-11882', 1883.47, 'Stk', `Außenspindeltreppe PINIO aus massiven Stahl mit Geländer und Podest`, false, true, 1, 'optional'),
            createProduct('blitz-trep-durch', 'optionale-positionen', 'optionale-positionen-sub', `DURCHBRUCH TREPPENAUGE Angebot | Kalkulator für Montage & Material`, 'BLITZ-TREP-DURCH', 0, 'Stk', `Kalkulator für Montage & Material`, false, true, 1, 'optional'),
            createProduct('trep-101-2-zu', 'optionale-positionen', 'optionale-positionen-sub', `ALT-TREPPENLOCH | VERSCHLIEßEN | 🛠 Zusatz-Montage`, 'TREP-101-2-ZU', 473.54, 'Stk', `VERSCHLIEßEN | 🛠 Zusatz-Montage`, false, true, 1, 'optional')
          ]
        }
      ]
    }
  ]
};

export const packageTreppenRaumspartreppe: RenovationPackage = {
  id: 'treppenRaumspartreppe',
  title: 'Raumspartreppe',
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
            createProduct('trep-10004-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `RAUMSPAR-TREPPE | 🛠 Montage-Leistungspaket`, 'TREP-10004-Basis', 1490, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'service')
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
            createProduct('tr-uv-11639', 'material', 'material-sub', `Raumspartreppe Fichte 2000 mit Holzgeländer`, 'TR-uv-11639', 520.03, 'Stk', `Raumspartreppe Fichte 2000 mit Holzgeländer`, true, false, 1, 'material')
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
            createProduct('tr-uv-11760', 'optionale-positionen', 'optionale-positionen-sub', `Mittelholmtreppe SEGMENT aus Stahl mit Geländer`, 'TR-uv-11760', 4370.09, 'Stk', `Mittelholmtreppe SEGMENT aus Stahl mit Geländer`, false, true, 1, 'optional'),
            createProduct('blitz-trep-durch', 'optionale-positionen', 'optionale-positionen-sub', `DURCHBRUCH TREPPENAUGE Angebot | Kalkulator für Montage & Material`, 'BLITZ-TREP-DURCH', 0, 'Stk', `Kalkulator für Montage & Material`, false, true, 1, 'optional'),
            createProduct('trep-101-2-zu', 'optionale-positionen', 'optionale-positionen-sub', `ALT-TREPPENLOCH | VERSCHLIEßEN | 🛠 Zusatz-Montage`, 'TREP-101-2-ZU', 473.54, 'Stk', `VERSCHLIEßEN | 🛠 Zusatz-Montage`, false, true, 1, 'optional')
          ]
        }
      ]
    }
  ]
};

export const packageTreppenDachbodentreppe: RenovationPackage = {
  id: 'treppenDachbodentreppe',
  title: 'Dachbodentreppe',
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
            createProduct('mon-10255', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `HOLZTREPPEN | 🛠 Montage`, 'MON-10255', 1790, 'Stk', `🛠 Montage`, true, false, 1, 'service')
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
            createProduct('uv729-20050', 'material', 'material-sub', `Wellhöfer Bodentreppe StahlBlau mit WärmeSchutz WS3D`, 'uv729-20050', 666.46, 'Stk', `Wellhöfer Bodentreppe StahlBlau mit WärmeSchutz WS3D`, true, false, 1, 'material')
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
            createProduct('uv577-149', 'optionale-positionen', 'optionale-positionen-sub', `Roto Bodentreppe Designo Passivhaus KH 29 - U-Wert 0,63`, 'uv577-149', 935, 'Stk', `Roto Bodentreppe Designo Passivhaus KH 29 - U-Wert 0,63`, false, true, 1, 'optional')
          ]
        }
      ]
    }
  ]
};

export const packageTreppenSpindeltreppe: RenovationPackage = {
  id: 'treppenSpindeltreppe',
  title: 'Spindeltreppe',
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
            createProduct('trep-10002-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `SPINDELTREPPE | 🛠 Montage-Leistungspaket`, 'TREP-10002-Basis', 1490, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'service')
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
            createProduct('152-43', 'material', 'material-sub', `Dolle Spindeltreppe Oslo Buche Leimholz, lackiert - Ø 120 cm Art.Nr.: 760213`, '152-43', 1582.9, 'Stk', `Dolle Spindeltreppe Oslo Buche Leimholz, lackiert - Ø 120 cm Art.Nr.: 760213`, true, false, 1, 'material')
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
            createProduct('tr-uv-11882', 'optionale-positionen', 'optionale-positionen-sub', `Außenspindeltreppe PINIO aus massiven Stahl mit Geländer und Podest`, 'TR-uv-11882', 1883.47, 'Stk', `Außenspindeltreppe PINIO aus massiven Stahl mit Geländer und Podest`, false, true, 1, 'optional'),
            createProduct('tr-uv-11902', 'optionale-positionen', 'optionale-positionen-sub', `Spindeltreppe HEAVY METAL aus Stahl mit Podest und Geländer`, 'TR-uv-11902', 2800.68, 'Stk', `Spindeltreppe HEAVY METAL aus Stahl mit Podest und Geländer`, false, true, 1, 'optional'),
            createProduct('blitz-trep-durch', 'optionale-positionen', 'optionale-positionen-sub', `DURCHBRUCH TREPPENAUGE Angebot | Kalkulator für Montage & Material`, 'BLITZ-TREP-DURCH', 0, 'Stk', `Kalkulator für Montage & Material`, false, true, 1, 'optional'),
            createProduct('trep-101-1-zu', 'optionale-positionen', 'optionale-positionen-sub', `WANGENVERKLEIDUNG TREPPENLOCH | 🛠 Zusatz-Montage`, 'TREP-101-1-ZU', 503.95, 'Stk', `🛠 Zusatz-Montage`, false, true, 1, 'optional')
          ]
        }
      ]
    }
  ]
};

export const packageTreppenAufbereiten: RenovationPackage = {
  id: 'treppenAufbereiten',
  title: 'Treppen aufbereiten',
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

export const packageTreppenBelegung: RenovationPackage = {
  id: 'treppenBelegung',
  title: 'Treppenbelegung',
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
            createProduct('trep-202-1-zu', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `VERKLEIDUNG STUFE | JE TREPPENSTUFE (MIT MASSIVHOLZ) | 🛠 Zusatz-Montage`, 'TREP-202.1-ZU', 149, 'Stk', `JE TREPPENSTUFE (MIT MASSIVHOLZ) | 🛠 Zusatz-Montage`, true, false, 13, 'extra'),
            createProduct('trep-203-1-zu', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `VERKLEIDUNG PODEST | JE PODEST (MIT MASSIVHOLZ) | 🛠 Zusatz-Montage`, 'TREP-203.1-ZU', 595, 'Stk', `JE PODEST (MIT MASSIVHOLZ) | 🛠 Zusatz-Montage`, true, false, 1, 'extra')
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
            createProduct('tr-uv-11824', 'material', 'material-sub', `Treppenstufe Modell Samos`, 'TR-uv-11824', 57.48, 'Stk', `Treppenstufe Modell Samos`, true, false, 13, 'material'),
            createProduct('tr-uv-11819', 'material', 'material-sub', `Setzstufen aus Massivholz`, 'TR-uv-11819', 57.48, 'Stk', `Setzstufen aus Massivholz`, true, false, 13, 'material')
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
            createProduct('mon-10077', 'optionale-positionen', 'optionale-positionen-sub', `STUFEN | FLIESEN | 🛠 Montage`, 'MON-10077', 79, 'Stk', `FLIESEN | 🛠 Montage`, false, true, 1, 'optional'),
            createProduct('144-12646', 'optionale-positionen', 'optionale-positionen-sub', `Agrob Buchtal Stufenplatte 25x35x1,4/4,2cm Goldline goldocker R11/A 851-9330`, '144-12646', 19.47, 'Stk', `Agrob Buchtal Stufenplatte 25x35x1,4/4,2cm Goldline goldocker R11/A 851-9330`, false, true, 1, 'optional'),
            createProduct('male-301-5-mat', 'optionale-positionen', 'optionale-positionen-sub', `TREPPENSTUFEN LACKIERUNG | 🛠 Montage-Leistungspaket`, 'MALE-301.5-MAT', 99, 'Stk', `🛠 Montage-Leistungspaket`, false, true, 1, 'optional'),
            createProduct('male-301-6-mat', 'optionale-positionen', 'optionale-positionen-sub', `TREPPENGELÄNDER LACKIERUNG | 🛠 Montage-Leistungspaket`, 'MALE-301.6-MAT', 589.9, 'Stk', `🛠 Montage-Leistungspaket`, false, true, 1, 'optional')
          ]
        }
      ]
    }
  ]
};
