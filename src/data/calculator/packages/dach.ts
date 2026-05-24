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
  type: 'service' | 'material' | 'extra' | 'optional' = 'service'
): RenovationProduct {
  return {
    id,
    category,
    subcategory,
    title,
    sku: `PV-DACH-${id.toUpperCase().substring(0, 6)}`,
    type,
    unit,
    basePrice,
    enabled,
    optional,
    minQuantity: 1,
    quantityStep: 1,
    baseQuantity,
    scalable: unit === 'qm' || unit === 'lfm' || unit === 'Stk' || unit === 'm',
    quantity: baseQuantity,
    canDuplicate: false,
    canRemove: true,
    canReplace: false,
    description,
    alternatives: []
  };
}

const COMMON_PREP_CATEGORY = {
  id: 'vorbereitung',
  title: 'Vorbereitung & Gerüst',
  lead: 'Allgemeine Vorbereitungsarbeiten.',
  subsections: [
    {
      id: 'geruest',
      title: 'Baustelleneinrichtung',
      type: 'service' as const,
      products: [
        createProduct('geruestbau', 'vorbereitung', 'geruest', 'Gerüstbau & Baustelleneinrichtung', 4500, 'pauschal', 'Aufstellen von Arbeits- und Schutzgerüsten.', true, false, 1, 'service'),
        createProduct('abbruch-dach', 'vorbereitung', 'geruest', 'Rückbau alter Dachaufbau', 3600, 'pauschal', 'Fachgerechter Abbruch und Entsorgung.', false, true, 1, 'service'),
      ]
    }
  ]
};

// 1. Alles zu Dachsanierung (Placeholder combining others)
export const packageDachAlles: RenovationPackage = {
  id: 'dachAlles',
  title: 'Alles zu Dachsanierung',
  defaultArea: 120,
  defaultFloorCount: 1,
  categories: [
    COMMON_PREP_CATEGORY
  ]
};

// Neubedachung
export const packageDachDachNeubedachung: RenovationPackage = {
  id: 'dachNeubedachung',
  title: 'Neubedachung',
  defaultArea: 120,
  defaultFloorCount: 1,
  categories: [
    COMMON_PREP_CATEGORY,
    {
      id: 'dachNeubedachung-cat',
      title: 'Neubedachung (Details)',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'sanierung',
          title: 'Leistungen & Material',
          type: 'service',
          products: [
            createProduct('dach-100-basis', 'sanierung', 'sanierung', `NEUBEDACHUNG`, 149.9, 'qm', `🛠 Montage-Leistungspaket`, true, false, 100, 'service'),
            createProduct('dach-101-1-zu', 'sanierung', 'sanierung', `ALT-ZIEGEL`, 17.23, 'qm', `🛠 Demontage & Entsorgung`, false, true, 100, 'service'),
            createProduct('dach-101-2-zu', 'sanierung', 'sanierung', `FASSADENGERÜST STELLEN`, 32, 'qm', `🛠 Zusatz-Montage`, false, true, 100, 'service'),
            createProduct('dach-101-3-zu', 'sanierung', 'sanierung', `RINNE & FALLROHR`, 99.9, 'lfm', `🛠 Zusatz-Montage`, false, true, 30, 'service'),
            createProduct('1007285', 'sanierung', 'sanierung', `Erlus E 58 S Flachdachpfanne Engobe in kupferbraun`, 44.89, 'qm', `Erlus E 58 S Flachdachpfanne Engobe in kupferbraun`, true, false, 100, 'material'),
            createProduct('dach-100-au', 'sanierung', 'sanierung', `Weitere Produkte zu NEUBEDACHUNG`, 0, 'Stk', `**Varianten**`, false, true, 1, 'material'),
            createProduct('dach-602-mon', 'sanierung', 'sanierung', `DÄMMUNG`, 29, 'qm', `🛠 Montage`, false, true, 1, 'service'),
            createProduct('uv24-00017', 'sanierung', 'sanierung', `Bauder PIR SF Steildachwärmedämmelement WLS 023 - Nut & Feder - 1800 x 1200 mm`, 43.09, 'qm', `Bauder PIR SF Steildachwärmedämmelement WLS 023 - Nut & Feder - 1800 x 1200 mm`, false, true, 1, 'material'),
            createProduct('688152', 'sanierung', 'sanierung', `Rigidur Dachbodenelement 032 TF 85 1500x 500x 85 mm EPS 032 DEO`, 41.86, 'qm', `Rigidur Dachbodenelement 032 TF 85 1500x 500x 85 mm EPS 032 DEO`, false, true, 1, 'material'),
            createProduct('uv569-00014', 'sanierung', 'sanierung', `Rockwool Masterrock 035 Kleinformat, Aufsparrendämmung 1000x600 mm`, 59.83, 'Pak.', `Rockwool Masterrock 035 Kleinformat, Aufsparrendämmung 1000x600 mm`, false, true, 1, 'material'),
            createProduct('dach-500-basis', 'sanierung', 'sanierung', `DACHFENSTER`, 795.9, 'Stk', `🛠 Montage-Leistungspaket`, false, true, 1, 'service'),
            createProduct('uv702-1369', 'sanierung', 'sanierung', `Velux GGU Kunststoff-Dachfenster`, 1147.8, 'Stk.', `Schwingfenster Solarfenster`, false, true, 1, 'material'),
            createProduct('uv704-91870', 'sanierung', 'sanierung', `Velux DG Verdunkelungs-Rollo manuell`, 83.72, 'Stk.', `Velux DG Verdunkelungs-Rollo manuell`, false, true, 1, 'material'),
            createProduct('dach-201-mat', 'sanierung', 'sanierung', `SCHLEPPE-GAUBE`, 7420.05, 'Stk', `🛠 Montage-Leistungspaket`, false, true, 1, 'service'),
            createProduct('dach-301-mat', 'sanierung', 'sanierung', `DACHSTUHL Satteldach`, 90.67, 'qm', `🛠 Montage-Leistungspaket`, false, true, 1, 'service'),
            createProduct('dach-301-1-zu', 'sanierung', 'sanierung', `ALT-DACHSTUHL`, 20.7, 'qm', `🛠 Demontage & Entsorgung`, false, true, 1, 'service'),
            createProduct('dach-600-basis', 'sanierung', 'sanierung', `DACHAUSBAU`, 79, 'qm', `🛠 Montage-Leistungspaket`, false, true, 1, 'service'),
            createProduct('dach-601-1-zu', 'sanierung', 'sanierung', `VERSPACHTLUNG`, 24.9, 'qm', `STREICHFERTIG AUF GIPSPLATTEN`, false, true, 1, 'service'),
            createProduct('dach-600-2-op', 'sanierung', 'sanierung', `ALT-DÄMMUNG`, 13.4, 'qm', `🛠 Demontage & Entsorgung`, false, true, 1, 'service'),
            createProduct('556617', 'sanierung', 'sanierung', `Rigips Gipsplatte`, 3.49, 'qm', `Rigips Gipsplatte`, true, false, 1, 'material'),
            createProduct('1010766', 'sanierung', 'sanierung', `Knauf GKBI SONDERPAL. impraegniert 2000x 1250x 12,5 mm AK 24 St/Pal`, 8.9, 'qm', `Knauf GKBI SONDERPAL. impraegniert 2000x 1250x 12,5 mm AK 24 St/Pal`, true, false, 1, 'material'),
            createProduct('609625', 'sanierung', 'sanierung', `URSA SF 32 PLUS 1-seitig vlieskaschiert 2800x 1200x 140 mm`, 25.7, 'qm', `URSA SF 32 PLUS 1-seitig vlieskaschiert 2800x 1200x 140 mm`, true, false, 1, 'material'),
            createProduct('1010361', 'sanierung', 'sanierung', `Knauf Ins. LDS Flex Plus Dampfbremsbahn 1,5x 40 m/Ro`, 7.59, 'qm', `Knauf Ins. LDS Flex Plus Dampfbremsbahn 1,5x 40 m/Ro`, true, false, 1, 'material'),
            createProduct('uv383-00605', 'sanierung', 'sanierung', `Knauf REVO BS90 Wand 25 Revisionsklappe`, 134.15, 'Stk.', `Dicke: 25 mm`, true, false, 1, 'material'),
            createProduct('dach-600-au', 'sanierung', 'sanierung', `Weitere Produkte zu INNENAUSBAU`, 0, 'Stk', `**Varianten**`, false, true, 1, 'material'),
            createProduct('517-01445', 'sanierung', 'sanierung', `Parador Paneele Novara Esche Weiss geplankt Dekor (1602384)`, 24.31, 'Stk', `Parador Paneele Novara Esche Weiss geplankt Dekor (1602384)`, false, true, 1, 'material'),
            createProduct('517-02194', 'sanierung', 'sanierung', `Parador Deckenleiste DAL 2 Esche Weiss glänzend Dekor (1745640)`, 6.74, 'Stk', `Parador Deckenleiste DAL 2 Esche Weiss glänzend Dekor (1745640)`, false, true, 1, 'material'),
            createProduct('dach-602-mon', 'sanierung', 'sanierung', `DÄMMUNG`, 29, 'qm', `🛠 Montage`, false, true, 1, 'service'),
            createProduct('688152', 'sanierung', 'sanierung', `Rigidur Dachbodenelement 032 TF 85 1500x 500x 85 mm EPS 032 DEO`, 41.86, 'qm', `Rigidur Dachbodenelement 032 TF 85 1500x 500x 85 mm EPS 032 DEO`, false, true, 1, 'material'),
            createProduct('uv569-00014', 'sanierung', 'sanierung', `Rockwool Masterrock 035 Kleinformat, Aufsparrendämmung 1000x600 mm`, 59.83, 'Pak.', `Rockwool Masterrock 035 Kleinformat, Aufsparrendämmung 1000x600 mm`, false, true, 1, 'material')
          ]
        }
      ]
    }
  ]
};

// Dachstuhl
export const packageDachDachDachstuhl: RenovationPackage = {
  id: 'dachDachstuhl',
  title: 'Dachstuhl',
  defaultArea: 120,
  defaultFloorCount: 1,
  categories: [
    COMMON_PREP_CATEGORY,
    {
      id: 'dachDachstuhl-cat',
      title: 'Dachstuhl (Details)',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'sanierung',
          title: 'Leistungen & Material',
          type: 'service',
          products: [
            createProduct('dach-301-mat', 'sanierung', 'sanierung', `DACHSTUHL Satteldach`, 90.67, 'qm', `🛠 Montage-Leistungspaket`, true, false, 100, 'service'),
            createProduct('dach-301-1-zu', 'sanierung', 'sanierung', `ALT-DACHSTUHL`, 20.7, 'qm', `🛠 Demontage & Entsorgung`, false, true, 1, 'service'),
            createProduct('ents-101-mat', 'sanierung', 'sanierung', `CONTAINER`, 490.05, 'Stk', `Entsorgung  Bauschutt`, false, true, 1, 'material')
          ]
        }
      ]
    }
  ]
};

// Dachdämmung
export const packageDachDachDaemmung: RenovationPackage = {
  id: 'dachDaemmung',
  title: 'Dachdämmung',
  defaultArea: 120,
  defaultFloorCount: 1,
  categories: [
    COMMON_PREP_CATEGORY,
    {
      id: 'dachDaemmung-cat',
      title: 'Dachdämmung (Details)',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'sanierung',
          title: 'Leistungen & Material',
          type: 'service',
          products: [
            createProduct('dach-602-mon', 'sanierung', 'sanierung', `DÄMMUNG`, 29, 'qm', `🛠 Montage`, true, false, 100, 'service'),
            createProduct('dach-600-2-op', 'sanierung', 'sanierung', `ALT-DÄMMUNG`, 13.4, 'qm', `🛠 Demontage & Entsorgung`, false, true, 100, 'service'),
            createProduct('609625', 'sanierung', 'sanierung', `URSA SF 32 PLUS 1-seitig vlieskaschiert 2800x 1200x 140 mm`, 25.7, 'qm', `URSA SF 32 PLUS 1-seitig vlieskaschiert 2800x 1200x 140 mm`, true, false, 100, 'material'),
            createProduct('1010361', 'sanierung', 'sanierung', `Knauf Ins. LDS Flex Plus Dampfbremsbahn 1,5x 40 m/Ro`, 7.59, 'qm', `Knauf Ins. LDS Flex Plus Dampfbremsbahn 1,5x 40 m/Ro`, true, false, 100, 'material'),
            createProduct('688152', 'sanierung', 'sanierung', `Rigidur Dachbodenelement 032 TF 85 1500x 500x 85 mm EPS 032 DEO`, 41.86, 'qm', `Rigidur Dachbodenelement 032 TF 85 1500x 500x 85 mm EPS 032 DEO`, false, true, 1, 'material'),
            createProduct('uv569-00014', 'sanierung', 'sanierung', `Rockwool Masterrock 035 Kleinformat, Aufsparrendämmung 1000x600 mm`, 59.83, 'Pak.', `Rockwool Masterrock 035 Kleinformat, Aufsparrendämmung 1000x600 mm`, false, true, 1, 'material'),
            createProduct('uv383-00605', 'sanierung', 'sanierung', `Knauf REVO BS90 Wand 25 Revisionsklappe`, 134.15, 'Stk.', `Dicke: 25 mm`, false, true, 1, 'material'),
            createProduct('dach-500-basis', 'sanierung', 'sanierung', `DACHFENSTER`, 795.9, 'Stk', `🛠 Montage-Leistungspaket`, false, true, 1, 'service'),
            createProduct('uv702-1369', 'sanierung', 'sanierung', `Velux GGU Kunststoff-Dachfenster`, 1147.8, 'Stk.', `Schwingfenster Solarfenster`, false, true, 1, 'material'),
            createProduct('uv704-91870', 'sanierung', 'sanierung', `Velux DG Verdunkelungs-Rollo manuell`, 83.72, 'Stk.', `Velux DG Verdunkelungs-Rollo manuell`, false, true, 1, 'material')
          ]
        }
      ]
    }
  ]
};

// Gauben
export const packageDachDachGauben: RenovationPackage = {
  id: 'dachGauben',
  title: 'Gauben',
  defaultArea: 1,
  defaultFloorCount: 1,
  categories: [
    COMMON_PREP_CATEGORY,
    {
      id: 'dachGauben-cat',
      title: 'Gauben (Details)',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'sanierung',
          title: 'Leistungen & Material',
          type: 'service',
          products: [
            createProduct('dach-201-mat', 'sanierung', 'sanierung', `SCHLEPPE-GAUBE`, 7420.05, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'service')
          ]
        }
      ]
    }
  ]
};

// Dachfenster
export const packageDachDachFenster: RenovationPackage = {
  id: 'dachFenster',
  title: 'Dachfenster',
  defaultArea: 2,
  defaultFloorCount: 1,
  categories: [
    COMMON_PREP_CATEGORY,
    {
      id: 'dachFenster-cat',
      title: 'Dachfenster (Details)',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'sanierung',
          title: 'Leistungen & Material',
          type: 'service',
          products: [
            createProduct('dach-500-basis', 'sanierung', 'sanierung', `DACHFENSTER`, 795.9, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'service'),
            createProduct('uv702-1369', 'sanierung', 'sanierung', `Velux GGU Kunststoff-Dachfenster`, 1147.8, 'Stk.', `Schwingfenster Solarfenster`, true, false, 1, 'material'),
            createProduct('uv704-91870', 'sanierung', 'sanierung', `Velux DG Verdunkelungs-Rollo manuell`, 83.72, 'Stk.', `Velux DG Verdunkelungs-Rollo manuell`, false, true, 1, 'material')
          ]
        }
      ]
    }
  ]
};

// Dachanhebung
export const packageDachDachanhebung: RenovationPackage = {
  id: 'dachanhebung',
  title: 'Dachanhebung',
  defaultArea: 120,
  defaultFloorCount: 1,
  categories: [
    COMMON_PREP_CATEGORY,
    {
      id: 'dachanhebung-cat',
      title: 'Dachanhebung (Details)',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'sanierung',
          title: 'Leistungen & Material',
          type: 'service',
          products: [
            createProduct('dach-400-basis', 'sanierung', 'sanierung', `DACHSTUHL hydraulisch anheben`, 15429.72, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'service')
          ]
        }
      ]
    }
  ]
};

// Dach-Innenausbau
export const packageDachDachInnenausbau: RenovationPackage = {
  id: 'dachInnenausbau',
  title: 'Dach-Innenausbau',
  defaultArea: 80,
  defaultFloorCount: 1,
  categories: [
    COMMON_PREP_CATEGORY,
    {
      id: 'dachInnenausbau-cat',
      title: 'Dach-Innenausbau (Details)',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'sanierung',
          title: 'Leistungen & Material',
          type: 'service',
          products: [
            createProduct('dach-600-basis', 'sanierung', 'sanierung', `DACHAUSBAU`, 79, 'qm', `🛠 Montage-Leistungspaket`, true, false, 100, 'service'),
            createProduct('dach-601-1-zu', 'sanierung', 'sanierung', `VERSPACHTLUNG`, 24.9, 'qm', `STREICHFERTIG AUF GIPSPLATTEN`, false, true, 100, 'service'),
            createProduct('dach-600-2-op', 'sanierung', 'sanierung', `ALT-DÄMMUNG`, 13.4, 'qm', `🛠 Demontage & Entsorgung`, false, true, 100, 'service'),
            createProduct('556617', 'sanierung', 'sanierung', `Rigips Gipsplatte`, 3.49, 'qm', `Rigips Gipsplatte`, true, false, 90, 'material'),
            createProduct('1010766', 'sanierung', 'sanierung', `Knauf GKBI SONDERPAL. impraegniert 2000x 1250x 12,5 mm AK 24 St/Pal`, 8.9, 'qm', `Knauf GKBI SONDERPAL. impraegniert 2000x 1250x 12,5 mm AK 24 St/Pal`, true, false, 10, 'material'),
            createProduct('609625', 'sanierung', 'sanierung', `URSA SF 32 PLUS 1-seitig vlieskaschiert 2800x 1200x 140 mm`, 25.7, 'qm', `URSA SF 32 PLUS 1-seitig vlieskaschiert 2800x 1200x 140 mm`, true, false, 100, 'material'),
            createProduct('1010361', 'sanierung', 'sanierung', `Knauf Ins. LDS Flex Plus Dampfbremsbahn 1,5x 40 m/Ro`, 7.59, 'qm', `Knauf Ins. LDS Flex Plus Dampfbremsbahn 1,5x 40 m/Ro`, true, false, 100, 'material'),
            createProduct('dach-600-au', 'sanierung', 'sanierung', `Weitere Produkte zu INNENAUSBAU`, 0, 'Stk', `**Varianten**`, false, true, 1, 'material'),
            createProduct('517-01445', 'sanierung', 'sanierung', `Parador Paneele Novara Esche Weiss geplankt Dekor (1602384)`, 24.31, 'Stk', `Parador Paneele Novara Esche Weiss geplankt Dekor (1602384)`, false, true, 1, 'material'),
            createProduct('517-02194', 'sanierung', 'sanierung', `Parador Deckenleiste DAL 2 Esche Weiss glänzend Dekor (1745640)`, 6.74, 'Stk', `Parador Deckenleiste DAL 2 Esche Weiss glänzend Dekor (1745640)`, false, true, 1, 'material'),
            createProduct('dach-602-mon', 'sanierung', 'sanierung', `DÄMMUNG`, 29, 'qm', `🛠 Montage`, false, true, 1, 'service'),
            createProduct('688152', 'sanierung', 'sanierung', `Rigidur Dachbodenelement 032 TF 85 1500x 500x 85 mm EPS 032 DEO`, 41.86, 'qm', `Rigidur Dachbodenelement 032 TF 85 1500x 500x 85 mm EPS 032 DEO`, false, true, 1, 'material'),
            createProduct('uv569-00014', 'sanierung', 'sanierung', `Rockwool Masterrock 035 Kleinformat, Aufsparrendämmung 1000x600 mm`, 59.83, 'Pak.', `Rockwool Masterrock 035 Kleinformat, Aufsparrendämmung 1000x600 mm`, false, true, 1, 'material'),
            createProduct('uv383-00605', 'sanierung', 'sanierung', `Knauf REVO BS90 Wand 25 Revisionsklappe`, 134.15, 'Stk.', `Dicke: 25 mm`, false, true, 1, 'material'),
            createProduct('dach-500-basis', 'sanierung', 'sanierung', `DACHFENSTER`, 795.9, 'Stk', `🛠 Montage-Leistungspaket`, false, true, 1, 'service'),
            createProduct('uv702-1369', 'sanierung', 'sanierung', `Velux GGU Kunststoff-Dachfenster`, 1147.8, 'Stk.', `Schwingfenster Solarfenster`, false, true, 1, 'material'),
            createProduct('uv704-91870', 'sanierung', 'sanierung', `Velux DG Verdunkelungs-Rollo manuell`, 83.72, 'Stk.', `Velux DG Verdunkelungs-Rollo manuell`, false, true, 1, 'material'),
            createProduct('mon-10255', 'sanierung', 'sanierung', `HOLZTREPPEN`, 1790, 'Stk.', `🛠 Montage`, false, true, 1, 'service'),
            createProduct('uv729-20050', 'sanierung', 'sanierung', `Wellhöfer Bodentreppe StahlBlau mit WärmeSchutz WS3D`, 666.46, 'Stk', `Wellhöfer Bodentreppe StahlBlau mit WärmeSchutz WS3D`, false, true, 1, 'material'),
            createProduct('uv577-149', 'sanierung', 'sanierung', `Roto Bodentreppe Designo Passivhaus KH 29 - U-Wert 0,63`, 935, 'Stk.', `Roto Bodentreppe Designo Passivhaus KH 29 - U-Wert 0,63`, false, true, 1, 'material')
          ]
        }
      ]
    }
  ]
};

// 9. Flachdach-Beschichtung (Fallback)
export const packageFlachdach: RenovationPackage = {
  id: 'flachdach',
  title: 'Flachdach-Beschichtung',
  defaultArea: 80,
  defaultFloorCount: 1,
  categories: [
    {
      id: 'flachdach',
      title: 'Flachdach',
      lead: 'Sanierung und Abdichtung.',
      subsections: [
        {
          id: 'sanierung',
          title: 'Beschichtung',
          type: 'service',
          products: [
            createProduct('flachdach-beschichtung', 'flachdach', 'sanierung', 'Flachdach beschichten', 167, 'qm', 'Reinigen, grundieren und mit Flüssigkunststoff abdichten.', true, false, 80, 'service')
          ]
        }
      ]
    }
  ]
};

// 10. Dachboden-Dämmung (Fallback)
export const packageDachbodenDaemmung: RenovationPackage = {
  id: 'dachbodenDaemmung',
  title: 'Dachboden-Dämmung',
  defaultArea: 80,
  defaultFloorCount: 1,
  categories: [
    {
      id: 'dachboden',
      title: 'Geschossdecke',
      lead: 'Dämmung der obersten Geschossdecke.',
      subsections: [
        {
          id: 'sanierung',
          title: 'Dämmung',
          type: 'service',
          products: [
            createProduct('dachboden-daemmung', 'dachboden', 'sanierung', 'Geschossdecke dämmen', 122, 'qm', 'Dämmplatten verlegen, begehbar (z.B. OSB) oder nicht begehbar.', true, false, 80, 'service')
          ]
        }
      ]
    }
  ]
};
