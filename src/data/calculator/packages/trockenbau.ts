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

export const packageTrockenbauAlles: RenovationPackage = {
  id: 'trockenbauAlles',
  title: 'Alles zu Trockenbau',
  defaultArea: 100,
  defaultFloorCount: 1,
  categories: [
    {
      id: 'trockenbau-basis-haus',
      title: 'TROCKENBAU | Basis-Haus',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'trockenbau-basis-haus-sub',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('troc-100-basis', 'trockenbau-basis-haus', 'trockenbau-basis-haus-sub', `DECKEN | 🛠 Montage-Leistungspaket`, 'TROC-100-BASIS', 49, 'qm', `🛠 Montage-Leistungspaket`, true, false, 1, 'service'),
            createProduct('troc-200-basis', 'trockenbau-basis-haus', 'trockenbau-basis-haus-sub', `WÄNDE | 🛠 Montage-Leistungspaket`, 'TROC-200-BASIS', 49, 'qm', `🛠 Montage-Leistungspaket`, true, false, 1, 'service'),
            createProduct('troc-300-basis', 'trockenbau-basis-haus', 'trockenbau-basis-haus-sub', `VORSATZWÄNDE | 🛠 Montage-Leistungspaket`, 'TROC-300-BASIS', 49, 'qm', `🛠 Montage-Leistungspaket`, true, false, 1, 'service'),
            createProduct('troc-101-1-zu', 'trockenbau-basis-haus', 'trockenbau-basis-haus-sub', `VERSPACHTLUNG | STREICHFERTIG FÜR GIPSPLATTEN | 🛠 Zusatz-Montage`, 'TROC-101-1-ZU', 22.82, 'qm', `STREICHFERTIG FÜR GIPSPLATTEN | 🛠 Zusatz-Montage`, true, false, 1, 'extra'),
            createProduct('troc-201-1-zu', 'trockenbau-basis-haus', 'trockenbau-basis-haus-sub', `TÜRLOCH HERSTELLUNG - FÜR GK-WÄNDE | 🛠 Zusatz-Montage`, 'TROC-201-1-ZU', 64.22, 'Stk', `🛠 Zusatz-Montage`, true, false, 1, 'extra'),
            createProduct('troc-201-2-zu', 'trockenbau-basis-haus', 'trockenbau-basis-haus-sub', `ECKAUSBILDUNG - FÜR GK-WÄNDE &-DECKEN | 🛠 Zusatz-Montage`, 'TROC-201-2-ZU', 67.37, 'Stk', `🛠 Zusatz-Montage`, true, false, 1, 'extra')
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
            createProduct('556617', 'material', 'material-sub', `Rigips Gipsplatte`, '556617', 3.49, 'qm', `Rigips Gipsplatte`, true, false, 1, 'material'),
            createProduct('1010766', 'material', 'material-sub', `Knauf GKBI SONDERPAL. impraegniert 2000x 1250x 12,5 mm AK 24 St/Pal`, '1010766', 8.9, 'qm', `Knauf GKBI SONDERPAL. impraegniert 2000x 1250x 12,5 mm AK 24 St/Pal`, true, false, 1, 'material')
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
            createProduct('troc-401-zu', 'extra-positionen', 'extra-positionen-sub', `ROHRKÄSTEN & KOFFER - BAU IN TROCKENBAUWEISE | 🛠 Zusatz-Montage`, 'TROC-401-ZU', 235.91, 'Stk', `🛠 Zusatz-Montage`, true, false, 1, 'extra'),
            createProduct('troc-501-zu', 'extra-positionen', 'extra-positionen-sub', `DURCHGANG VERSCHLIEßEN - BAU IN TROCKENBAUWEISE | 🛠 Zusatz-Montage`, 'TROC-501-ZU', 423.81, 'Stk', `🛠 Zusatz-Montage`, true, false, 1, 'extra'),
            createProduct('uv169-236', 'extra-positionen', 'extra-positionen-sub', `ECLISSE Innenwand Schiebetürset inkl. Holztürblatt Unico EF 1-flügelig für Trockenbauwand`, 'uv169-236', 927.65, 'Stk', `ECLISSE Innenwand Schiebetürset inkl. Holztürblatt Unico EF 1-flügelig für Trockenbauwand`, true, false, 1, 'extra'),
            createProduct('troc-201-1-zu-2', 'extra-positionen', 'extra-positionen-sub', `TÜRLOCH HERSTELLUNG - FÜR GK-WÄNDE | 🛠 Zusatz-Montage`, 'TROC-201-1-ZU', 64.22, 'Stk', `🛠 Zusatz-Montage`, true, false, 1, 'extra'),
            createProduct('troc-201-2-zu-2', 'extra-positionen', 'extra-positionen-sub', `ECKAUSBILDUNG - FÜR GK-WÄNDE &-DECKEN | 🛠 Zusatz-Montage`, 'TROC-201-2-ZU', 67.37, 'Stk', `🛠 Zusatz-Montage`, true, false, 1, 'extra'),
            createProduct('troc-401-zu-2', 'extra-positionen', 'extra-positionen-sub', `ROHRKÄSTEN & KOFFER - BAU IN TROCKENBAUWEISE | 🛠 Zusatz-Montage`, 'TROC-401-ZU', 235.91, 'Stk', `🛠 Zusatz-Montage`, true, false, 1, 'extra'),
            createProduct('troc-501-zu-2', 'extra-positionen', 'extra-positionen-sub', `DURCHGANG VERSCHLIEßEN - BAU IN TROCKENBAUWEISE | 🛠 Zusatz-Montage`, 'TROC-501-ZU', 423.81, 'Stk', `🛠 Zusatz-Montage`, true, false, 1, 'extra')
          ]
        }
      ]
    },
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
            createProduct('mon-10222', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `ESTRICH | 🛠 Montage`, 'MON-10222', 29, 'qm', `🛠 Montage`, true, false, 1, 'service'),
            createProduct('rohb-501-1-op', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `ALT-ESTRICH |🛠 Demontage & Entsorgung`, 'ROHB-501-1-OP', 45.89, 'qm', `🛠 Demontage & Entsorgung`, true, false, 1, 'service'),
            createProduct('uv204-000321', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `Fermacell Estrich-Elemente (MW) mit Mineralwolldämmung 1500x500 mm - Dicke: 30 mm`, 'uv204-000321', 26.39, 'Stk', `Fermacell Estrich-Elemente (MW) mit Mineralwolldämmung 1500x500 mm - Dicke: 30 mm`, true, false, 1, 'material'),
            createProduct('204-00071', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `Fermacell Estrich-Kleber - 1 kg Flasche`, '204-00071', 25.19, 'Stk', `Fermacell Estrich-Kleber - 1 kg Flasche`, true, false, 1, 'material'),
            createProduct('204-00073', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `Fermacell Schnellbauschrauben für Estrichelemente 3,9x19 mm, 1000 Stück`, '204-00073', 21.89, 'Stk', `Fermacell Schnellbauschrauben für Estrichelemente 3,9x19 mm, 1000 Stück`, true, false, 1, 'material'),
            createProduct('rohb-501-2-op', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `Ausgleichsschüttung Herstellen (bis 3 cm)`, 'ROHB-501-2-OP', 11.68, 'qm', `Ausgleichsschüttung Herstellen (bis 3 cm)`, true, false, 1, 'material'),
            createProduct('204-85', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `Fermacell Wabenschüttung - 15 Liter Sack`, '204-85', 9.24, 'Stk', `Fermacell Wabenschüttung - 15 Liter Sack`, true, false, 1, 'material'),
            createProduct('204-00088', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `Fermacell Wärmedämmschüttung - 100 Liter Sack`, '204-00088', 25.85, 'Stk', `Fermacell Wärmedämmschüttung - 100 Liter Sack`, true, false, 1, 'material'),
            createProduct('204-00086', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `Fermacell Estrich-Wabe 1.500x1.000 mm, Dicke 30 mm`, '204-00086', 15.84, 'Stk', `Fermacell Estrich-Wabe 1.500x1.000 mm, Dicke 30 mm`, true, false, 1, 'material'),
            createProduct('dach-600-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `DACHAUSBAU | 🛠 Montage-Leistungspaket`, 'DACH-600-BASIS', 79, 'qm', `🛠 Montage-Leistungspaket`, true, false, 1, 'service'),
            createProduct('dach-601-1-zu', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `VERSPACHTLUNG | STREICHFERTIG AUF GIPSPLATTEN | 🛠 Zusatz-Montage`, 'DACH-601-1-ZU', 24.9, 'qm', `STREICHFERTIG AUF GIPSPLATTEN | 🛠 Zusatz-Montage`, true, false, 1, 'extra'),
            createProduct('dach-600-2-op', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `ALT-DÄMMUNG |🛠 Demontage & Entsorgung`, 'DACH-600-2-OP', 13.4, 'qm', `🛠 Demontage & Entsorgung`, true, false, 1, 'service'),
            createProduct('556617-2', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `Rigips Gipsplatte`, '556617', 3.49, 'qm', `Rigips Gipsplatte`, true, false, 1, 'material'),
            createProduct('1010766-2', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `Knauf GKBI SONDERPAL. impraegniert 2000x 1250x 12,5 mm AK 24 St/Pal`, '1010766', 8.9, 'qm', `Knauf GKBI SONDERPAL. impraegniert 2000x 1250x 12,5 mm AK 24 St/Pal`, true, false, 1, 'material'),
            createProduct('609625', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `URSA SF 32 PLUS 1-seitig vlieskaschiert 2800x 1200x 140 mm`, '609625', 25.7, 'qm', `URSA SF 32 PLUS 1-seitig vlieskaschiert 2800x 1200x 140 mm`, true, false, 1, 'material'),
            createProduct('1010361', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `Knauf Ins. LDS Flex Plus Dampfbremsbahn 1,5x 40 m/Ro`, '1010361', 7.59, 'qm', `Knauf Ins. LDS Flex Plus Dampfbremsbahn 1,5x 40 m/Ro`, true, false, 1, 'material'),
            createProduct('dach-602-mon', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `DÄMMUNG | 🛠 Montage`, 'DACH-602-MON', 29, 'qm', `🛠 Montage`, true, false, 1, 'service'),
            createProduct('688152', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `Rigidur Dachbodenelement 032 TF 85 1500x 500x 85 mm EPS 032 DEO`, '688152', 41.86, 'qm', `Rigidur Dachbodenelement 032 TF 85 1500x 500x 85 mm EPS 032 DEO`, true, false, 1, 'material'),
            createProduct('uv569-00014', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `Rockwool Masterrock 035 Kleinformat, Aufsparrendämmung 1000x600 mm`, 'uv569-00014', 59.83, 'Pak', `Rockwool Masterrock 035 Kleinformat, Aufsparrendämmung 1000x600 mm`, true, false, 1, 'material'),
            createProduct('uv383-00605', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `Knauf REVO BS90 Wand 25 Revisionsklappe | Dicke: 25 mm | LxB: 300 x 300 mm`, 'uv383-00605', 134.15, 'Stk', `Dicke: 25 mm | LxB: 300 x 300 mm`, true, false, 1, 'material'),
            createProduct('dach-500-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `DACHFENSTER | 🛠 Montage-Leistungspaket`, 'DACH-500-BASIS', 795.9, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'service'),
            createProduct('uv702-1369', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `Velux GGU Kunststoff-Dachfenster | Schwingfenster Solarfenster`, 'uv702-1369', 1147.8, 'Stk', `Schwingfenster Solarfenster`, true, false, 1, 'material'),
            createProduct('uv704-91870', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `Velux DG Verdunkelungs-Rollo manuell`, 'uv704-91870', 83.72, 'Stk', `Velux DG Verdunkelungs-Rollo manuell`, true, false, 1, 'material'),
            createProduct('troc-200-basis-2', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `WÄNDE | 🛠 Montage-Leistungspaket`, 'TROC-200-BASIS', 49, 'qm', `🛠 Montage-Leistungspaket`, true, false, 1, 'service'),
            createProduct('pladiver2-181', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `ARDESIO Steinpaneel`, 'PLADIVER2_181', 153.91, 'qm', `ARDESIO Steinpaneel`, true, false, 1, 'material')
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
            createProduct('dach-600-au', 'optionale-positionen', 'optionale-positionen-sub', `Weitere Produkte zu INNENAUSBAU |**Varianten**`, 'DACH-600-AU', 0, 'Stk', `**Varianten**`, false, true, 1, 'optional'),
            createProduct('517-01445', 'optionale-positionen', 'optionale-positionen-sub', `Parador Paneele Novara Esche Weiss geplankt Dekor (1602384)`, '517-01445', 24.31, 'Stk', `Parador Paneele Novara Esche Weiss geplankt Dekor (1602384)`, false, true, 1, 'optional'),
            createProduct('517-02194', 'optionale-positionen', 'optionale-positionen-sub', `Parador Deckenleiste DAL 2 Esche Weiss glänzend Dekor (1745640)`, '517-02194', 6.74, 'Stk', `Parador Deckenleiste DAL 2 Esche Weiss glänzend Dekor (1745640)`, false, true, 1, 'optional'),
            createProduct('auspan2021-03', 'optionale-positionen', 'optionale-positionen-sub', `JOKA PARO AKUSTIK Echtholzpaneel GEPRÄGT 2400 x 600 x 20 mm,`, 'AUSPAN2021_03', 132.28, 'qm', `JOKA PARO AKUSTIK Echtholzpaneel GEPRÄGT 2400 x 600 x 20 mm,`, false, true, 1, 'optional'),
            createProduct('737-00336', 'optionale-positionen', 'optionale-positionen-sub', `De Ryck Steinriemchen Murok Sierra M47`, '737-00336', 90.42, 'Stk', `De Ryck Steinriemchen Murok Sierra M47`, false, true, 1, 'optional'),
            createProduct('080-28', 'optionale-positionen', 'optionale-positionen-sub', `Botament M21 HP Premium-Flexkleber - 25Kg`, '080-28', 47.96, 'Stk', `Botament M21 HP Premium-Flexkleber - 25Kg`, false, true, 1, 'optional')
          ]
        }
      ]
    }
  ]
};

export const packageTrockenbauDecken: RenovationPackage = {
  id: 'trockenbauDecken',
  title: 'Decken abhängen',
  defaultArea: 100,
  defaultFloorCount: 1,
  categories: [
    {
      id: 'trockenbau-basis-haus',
      title: 'TROCKENBAU | Basis-Haus',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'trockenbau-basis-haus-sub',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('troc-100-basis', 'trockenbau-basis-haus', 'trockenbau-basis-haus-sub', `DECKEN | 🛠 Montage-Leistungspaket`, 'TROC-100-BASIS', 49, 'qm', `🛠 Montage-Leistungspaket`, true, false, 100, 'service'),
            createProduct('troc-101-1-zu', 'trockenbau-basis-haus', 'trockenbau-basis-haus-sub', `VERSPACHTLUNG | STREICHFERTIG FÜR GIPSPLATTEN | 🛠 Zusatz-Montage`, 'TROC-101-1-ZU', 22.82, 'qm', `STREICHFERTIG FÜR GIPSPLATTEN | 🛠 Zusatz-Montage`, true, false, 100, 'extra'),
            createProduct('troc-201-2-zu', 'trockenbau-basis-haus', 'trockenbau-basis-haus-sub', `ECKAUSBILDUNG - FÜR GK-WÄNDE &-DECKEN | 🛠 Zusatz-Montage`, 'TROC-201-2-ZU', 67.37, 'Stk', `🛠 Zusatz-Montage`, true, false, 1, 'extra')
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
            createProduct('556617', 'material', 'material-sub', `Rigips Gipsplatte`, '556617', 3.49, 'qm', `Rigips Gipsplatte`, true, false, 90, 'material'),
            createProduct('1010766', 'material', 'material-sub', `Knauf GKBI SONDERPAL. impraegniert 2000x 1250x 12,5 mm AK 24 St/Pal`, '1010766', 8.9, 'qm', `Knauf GKBI SONDERPAL. impraegniert 2000x 1250x 12,5 mm AK 24 St/Pal`, true, false, 10, 'material')
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
            createProduct('517-01445', 'optionale-positionen', 'optionale-positionen-sub', `Parador Paneele Novara Esche Weiss geplankt Dekor (1602384)`, '517-01445', 24.31, 'Stk', `Parador Paneele Novara Esche Weiss geplankt Dekor (1602384)`, false, true, 1, 'optional'),
            createProduct('517-02194', 'optionale-positionen', 'optionale-positionen-sub', `Parador Deckenleiste DAL 2 Esche Weiss glänzend Dekor (1745640)`, '517-02194', 6.74, 'Stk', `Parador Deckenleiste DAL 2 Esche Weiss glänzend Dekor (1745640)`, false, true, 1, 'optional'),
            createProduct('dach-600-au', 'optionale-positionen', 'optionale-positionen-sub', `Weitere Produkte zu INNENAUSBAU |**Varianten**`, 'DACH-600-AU', 0, 'Stk', `**Varianten**`, false, true, 1, 'optional')
          ]
        }
      ]
    }
  ]
};

export const packageTrockenbauWaendeStellen: RenovationPackage = {
  id: 'trockenbauWaendeStellen',
  title: 'Wände stellen',
  defaultArea: 100,
  defaultFloorCount: 1,
  categories: [
    {
      id: 'trockenbau-basis-haus',
      title: 'TROCKENBAU | Basis-Haus',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'trockenbau-basis-haus-sub',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('troc-200-basis', 'trockenbau-basis-haus', 'trockenbau-basis-haus-sub', `WÄNDE | 🛠 Montage-Leistungspaket`, 'TROC-200-BASIS', 49, 'qm', `🛠 Montage-Leistungspaket`, true, false, 100, 'service'),
            createProduct('troc-300-basis', 'trockenbau-basis-haus', 'trockenbau-basis-haus-sub', `VORSATZWÄNDE | 🛠 Montage-Leistungspaket`, 'TROC-300-BASIS', 49, 'qm', `🛠 Montage-Leistungspaket`, true, false, 1, 'service'),
            createProduct('troc-101-1-zu', 'trockenbau-basis-haus', 'trockenbau-basis-haus-sub', `VERSPACHTLUNG | STREICHFERTIG FÜR GIPSPLATTEN | 🛠 Zusatz-Montage`, 'TROC-101-1-ZU', 22.82, 'qm', `STREICHFERTIG FÜR GIPSPLATTEN | 🛠 Zusatz-Montage`, true, false, 100, 'extra'),
            createProduct('troc-201-1-zu', 'trockenbau-basis-haus', 'trockenbau-basis-haus-sub', `TÜRLOCH HERSTELLUNG - FÜR GK-WÄNDE | 🛠 Zusatz-Montage`, 'TROC-201-1-ZU', 64.22, 'Stk', `🛠 Zusatz-Montage`, true, false, 1, 'extra'),
            createProduct('troc-201-2-zu', 'trockenbau-basis-haus', 'trockenbau-basis-haus-sub', `ECKAUSBILDUNG - FÜR GK-WÄNDE &-DECKEN | 🛠 Zusatz-Montage`, 'TROC-201-2-ZU', 67.37, 'Stk', `🛠 Zusatz-Montage`, true, false, 1, 'extra')
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
            createProduct('556617', 'material', 'material-sub', `Rigips Gipsplatte`, '556617', 3.49, 'qm', `Rigips Gipsplatte`, true, false, 90, 'material'),
            createProduct('1010766', 'material', 'material-sub', `Knauf GKBI SONDERPAL. impraegniert 2000x 1250x 12,5 mm AK 24 St/Pal`, '1010766', 8.9, 'qm', `Knauf GKBI SONDERPAL. impraegniert 2000x 1250x 12,5 mm AK 24 St/Pal`, true, false, 10, 'material')
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
            createProduct('troc-401-zu', 'extra-positionen', 'extra-positionen-sub', `ROHRKÄSTEN & KOFFER - BAU IN TROCKENBAUWEISE | 🛠 Zusatz-Montage`, 'TROC-401-ZU', 235.91, 'Stk', `🛠 Zusatz-Montage`, true, false, 1, 'extra'),
            createProduct('troc-501-zu', 'extra-positionen', 'extra-positionen-sub', `DURCHGANG VERSCHLIEßEN - BAU IN TROCKENBAUWEISE | 🛠 Zusatz-Montage`, 'TROC-501-ZU', 423.81, 'Stk', `🛠 Zusatz-Montage`, true, false, 1, 'extra'),
            createProduct('uv169-236', 'extra-positionen', 'extra-positionen-sub', `ECLISSE Innenwand Schiebetürset inkl. Holztürblatt Unico EF 1-flügelig für Trockenbauwand`, 'uv169-236', 927.65, 'Stk', `ECLISSE Innenwand Schiebetürset inkl. Holztürblatt Unico EF 1-flügelig für Trockenbauwand`, true, false, 1, 'extra')
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
            createProduct('auspan2021-03', 'optionale-positionen', 'optionale-positionen-sub', `JOKA PARO AKUSTIK Echtholzpaneel GEPRÄGT 2400 x 600 x 20 mm,`, 'AUSPAN2021_03', 132.28, 'qm', `JOKA PARO AKUSTIK Echtholzpaneel GEPRÄGT 2400 x 600 x 20 mm,`, false, true, 1, 'optional'),
            createProduct('pladiver2-181', 'optionale-positionen', 'optionale-positionen-sub', `ARDESIO Steinpaneel`, 'PLADIVER2_181', 153.91, 'qm', `ARDESIO Steinpaneel`, false, true, 1, 'optional')
          ]
        }
      ]
    }
  ]
};

export const packageTrockenbauWaendeVerkleiden: RenovationPackage = {
  id: 'trockenbauWaendeVerkleiden',
  title: 'Wände verkleiden',
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
            createProduct('troc-200-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `WÄNDE | 🛠 Montage-Leistungspaket`, 'TROC-200-BASIS', 49, 'qm', `🛠 Montage-Leistungspaket`, true, false, 10, 'service')
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
            createProduct('pladiver2-181', 'material', 'material-sub', `ARDESIO Steinpaneel`, 'PLADIVER2_181', 153.91, 'qm', `ARDESIO Steinpaneel`, true, false, 10, 'material')
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
            createProduct('auspan2021-03', 'optionale-positionen', 'optionale-positionen-sub', `JOKA PARO AKUSTIK Echtholzpaneel GEPRÄGT 2400 x 600 x 20 mm,`, 'AUSPAN2021_03', 132.28, 'qm', `JOKA PARO AKUSTIK Echtholzpaneel GEPRÄGT 2400 x 600 x 20 mm,`, false, true, 1, 'optional'),
            createProduct('737-00336', 'optionale-positionen', 'optionale-positionen-sub', `De Ryck Steinriemchen Murok Sierra M47`, '737-00336', 90.42, 'Stk', `De Ryck Steinriemchen Murok Sierra M47`, false, true, 1, 'optional'),
            createProduct('080-28', 'optionale-positionen', 'optionale-positionen-sub', `Botament M21 HP Premium-Flexkleber - 25Kg`, '080-28', 47.96, 'Stk', `Botament M21 HP Premium-Flexkleber - 25Kg`, false, true, 2, 'optional')
          ]
        }
      ]
    },
    {
      id: 'trockenbau-basis-haus',
      title: 'TROCKENBAU | Basis-Haus',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'trockenbau-basis-haus-sub',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('troc-300-basis', 'trockenbau-basis-haus', 'trockenbau-basis-haus-sub', `VORSATZWÄNDE | 🛠 Montage-Leistungspaket`, 'TROC-300-BASIS', 49, 'qm', `🛠 Montage-Leistungspaket`, true, false, 1, 'service'),
            createProduct('556617', 'trockenbau-basis-haus', 'trockenbau-basis-haus-sub', `Rigips Gipsplatte`, '556617', 3.49, 'qm', `Rigips Gipsplatte`, true, false, 1, 'material'),
            createProduct('1010766', 'trockenbau-basis-haus', 'trockenbau-basis-haus-sub', `Knauf GKBI SONDERPAL. impraegniert 2000x 1250x 12,5 mm AK 24 St/Pal`, '1010766', 8.9, 'qm', `Knauf GKBI SONDERPAL. impraegniert 2000x 1250x 12,5 mm AK 24 St/Pal`, true, false, 1, 'material')
          ]
        }
      ]
    }
  ]
};

export const packageTrockenbauEstrich: RenovationPackage = {
  id: 'trockenbauEstrich',
  title: 'Estrich/Boden',
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
            createProduct('mon-10222', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `ESTRICH | 🛠 Montage`, 'MON-10222', 29, 'qm', `🛠 Montage`, true, false, 100, 'service'),
            createProduct('rohb-501-1-op', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `ALT-ESTRICH |🛠 Demontage & Entsorgung`, 'ROHB-501-1-OP', 45.89, 'qm', `🛠 Demontage & Entsorgung`, true, false, 1, 'service')
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
            createProduct('uv204-000321', 'material', 'material-sub', `Fermacell Estrich-Elemente (MW) mit Mineralwolldämmung 1500x500 mm - Dicke: 30 mm`, 'uv204-000321', 26.39, 'Stk', `Fermacell Estrich-Elemente (MW) mit Mineralwolldämmung 1500x500 mm - Dicke: 30 mm`, true, false, 130, 'material')
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
            createProduct('204-00071', 'extra-positionen', 'extra-positionen-sub', `Fermacell Estrich-Kleber - 1 kg Flasche`, '204-00071', 25.19, 'Stk', `Fermacell Estrich-Kleber - 1 kg Flasche`, true, false, 2, 'extra'),
            createProduct('204-00073', 'extra-positionen', 'extra-positionen-sub', `Fermacell Schnellbauschrauben für Estrichelemente 3,9x19 mm, 1000 Stück`, '204-00073', 21.89, 'Stk', `Fermacell Schnellbauschrauben für Estrichelemente 3,9x19 mm, 1000 Stück`, true, false, 2, 'extra'),
            createProduct('rohb-501-2-op', 'extra-positionen', 'extra-positionen-sub', `Ausgleichsschüttung Herstellen (bis 3 cm)`, 'ROHB-501-2-OP', 11.68, 'qm', `Ausgleichsschüttung Herstellen (bis 3 cm)`, true, false, 1, 'extra'),
            createProduct('204-85', 'extra-positionen', 'extra-positionen-sub', `Fermacell Wabenschüttung - 15 Liter Sack`, '204-85', 9.24, 'Stk', `Fermacell Wabenschüttung - 15 Liter Sack`, true, false, 1, 'extra'),
            createProduct('204-00088', 'extra-positionen', 'extra-positionen-sub', `Fermacell Wärmedämmschüttung - 100 Liter Sack`, '204-00088', 25.85, 'Stk', `Fermacell Wärmedämmschüttung - 100 Liter Sack`, true, false, 1, 'extra'),
            createProduct('204-00086', 'extra-positionen', 'extra-positionen-sub', `Fermacell Estrich-Wabe 1.500x1.000 mm, Dicke 30 mm`, '204-00086', 15.84, 'Stk', `Fermacell Estrich-Wabe 1.500x1.000 mm, Dicke 30 mm`, true, false, 1, 'extra')
          ]
        }
      ]
    }
  ]
};

export const packageTrockenbauDachschraegen: RenovationPackage = {
  id: 'trockenbauDachschraegen',
  title: 'Dachschrägen',
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
            createProduct('dach-600-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `DACHAUSBAU | 🛠 Montage-Leistungspaket`, 'DACH-600-BASIS', 79, 'qm', `🛠 Montage-Leistungspaket`, true, false, 100, 'service')
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
            createProduct('dach-601-1-zu', 'extra-positionen', 'extra-positionen-sub', `VERSPACHTLUNG | STREICHFERTIG AUF GIPSPLATTEN | 🛠 Zusatz-Montage`, 'DACH-601-1-ZU', 24.9, 'qm', `STREICHFERTIG AUF GIPSPLATTEN | 🛠 Zusatz-Montage`, true, false, 100, 'extra'),
            createProduct('dach-600-2-op', 'extra-positionen', 'extra-positionen-sub', `ALT-DÄMMUNG |🛠 Demontage & Entsorgung`, 'DACH-600-2-OP', 13.4, 'qm', `🛠 Demontage & Entsorgung`, true, false, 100, 'extra'),
            createProduct('dach-602-mon', 'extra-positionen', 'extra-positionen-sub', `DÄMMUNG | 🛠 Montage`, 'DACH-602-MON', 29, 'qm', `🛠 Montage`, true, false, 1, 'extra'),
            createProduct('688152', 'extra-positionen', 'extra-positionen-sub', `Rigidur Dachbodenelement 032 TF 85 1500x 500x 85 mm EPS 032 DEO`, '688152', 41.86, 'qm', `Rigidur Dachbodenelement 032 TF 85 1500x 500x 85 mm EPS 032 DEO`, true, false, 1, 'extra'),
            createProduct('uv569-00014', 'extra-positionen', 'extra-positionen-sub', `Rockwool Masterrock 035 Kleinformat, Aufsparrendämmung 1000x600 mm`, 'uv569-00014', 59.83, 'Pak', `Rockwool Masterrock 035 Kleinformat, Aufsparrendämmung 1000x600 mm`, true, false, 1, 'extra'),
            createProduct('uv383-00605', 'extra-positionen', 'extra-positionen-sub', `Knauf REVO BS90 Wand 25 Revisionsklappe | Dicke: 25 mm | LxB: 300 x 300 mm`, 'uv383-00605', 134.15, 'Stk', `Dicke: 25 mm | LxB: 300 x 300 mm`, true, false, 1, 'extra'),
            createProduct('dach-500-basis', 'extra-positionen', 'extra-positionen-sub', `DACHFENSTER | 🛠 Montage-Leistungspaket`, 'DACH-500-BASIS', 795.9, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'extra'),
            createProduct('uv702-1369', 'extra-positionen', 'extra-positionen-sub', `Velux GGU Kunststoff-Dachfenster | Schwingfenster Solarfenster`, 'uv702-1369', 1147.8, 'Stk', `Schwingfenster Solarfenster`, true, false, 1, 'extra'),
            createProduct('uv704-91870', 'extra-positionen', 'extra-positionen-sub', `Velux DG Verdunkelungs-Rollo manuell`, 'uv704-91870', 83.72, 'Stk', `Velux DG Verdunkelungs-Rollo manuell`, true, false, 1, 'extra')
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
            createProduct('556617', 'material', 'material-sub', `Rigips Gipsplatte`, '556617', 3.49, 'qm', `Rigips Gipsplatte`, true, false, 90, 'material'),
            createProduct('1010766', 'material', 'material-sub', `Knauf GKBI SONDERPAL. impraegniert 2000x 1250x 12,5 mm AK 24 St/Pal`, '1010766', 8.9, 'qm', `Knauf GKBI SONDERPAL. impraegniert 2000x 1250x 12,5 mm AK 24 St/Pal`, true, false, 10, 'material'),
            createProduct('609625', 'material', 'material-sub', `URSA SF 32 PLUS 1-seitig vlieskaschiert 2800x 1200x 140 mm`, '609625', 25.7, 'qm', `URSA SF 32 PLUS 1-seitig vlieskaschiert 2800x 1200x 140 mm`, true, false, 100, 'material'),
            createProduct('1010361', 'material', 'material-sub', `Knauf Ins. LDS Flex Plus Dampfbremsbahn 1,5x 40 m/Ro`, '1010361', 7.59, 'qm', `Knauf Ins. LDS Flex Plus Dampfbremsbahn 1,5x 40 m/Ro`, true, false, 100, 'material')
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
            createProduct('dach-600-au', 'optionale-positionen', 'optionale-positionen-sub', `Weitere Produkte zu INNENAUSBAU |**Varianten**`, 'DACH-600-AU', 0, 'Stk', `**Varianten**`, false, true, 1, 'optional'),
            createProduct('517-01445', 'optionale-positionen', 'optionale-positionen-sub', `Parador Paneele Novara Esche Weiss geplankt Dekor (1602384)`, '517-01445', 24.31, 'Stk', `Parador Paneele Novara Esche Weiss geplankt Dekor (1602384)`, false, true, 1, 'optional'),
            createProduct('517-02194', 'optionale-positionen', 'optionale-positionen-sub', `Parador Deckenleiste DAL 2 Esche Weiss glänzend Dekor (1745640)`, '517-02194', 6.74, 'Stk', `Parador Deckenleiste DAL 2 Esche Weiss glänzend Dekor (1745640)`, false, true, 1, 'optional')
          ]
        }
      ]
    }
  ]
};
