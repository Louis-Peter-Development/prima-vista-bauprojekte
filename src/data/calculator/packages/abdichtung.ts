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
    sku: `PV-ABD-${id.toUpperCase().substring(0, 6)}`,
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
  title: 'Vorbereitung & Baustelle',
  lead: 'Allgemeine Vorbereitungsarbeiten für die Abdichtung.',
  subsections: [
    {
      id: 'einrichtung',
      title: 'Baustelleneinrichtung',
      type: 'service' as const,
      products: [
        createProduct('baustelle-ein', 'vorbereitung', 'einrichtung', 'Baustelleneinrichtung & Schutz', 1500, 'pauschal', 'An- und Abfahrt, Schmutzschleusen, Abdecken.', true, false, 1, 'service'),
        createProduct('abbruch', 'vorbereitung', 'einrichtung', 'Rückbau & Entsorgung', 850, 'pauschal', 'Fachgerechter Abbruch und Entsorgung.', false, true, 1, 'service')
      ]
    }
  ]
};

// Placeholder for Alles
export const packageAbdichtungAlles: RenovationPackage = {
  id: 'abdichtung',
  title: 'Komplette Abdichtung',
  defaultArea: 100,
  defaultFloorCount: 1,
  categories: [
    COMMON_PREP_CATEGORY
  ]
};

// Horizontal-Abdichtung
export const packageAbdichtungHorizontal: RenovationPackage = {
  id: 'abdichtungHorizontal',
  title: 'Horizontal-Abdichtung',
  defaultArea: 30,
  defaultFloorCount: 1,
  categories: [
    COMMON_PREP_CATEGORY,
    {
      id: 'abdichtungHorizontal-cat',
      title: 'Horizontal-Abdichtung (Details)',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'abdichtung',
          title: 'Leistungen & Material',
          type: 'service',
          products: [
            createProduct('abbd-101-2-mat', 'abdichtung', 'abdichtung', `HORIZONTAL`, 119, 'qm', `Abdichtung des Kellergeschosses`, false, false, 1, 'material')
          ]
        }
      ]
    }
  ]
};

// Perimeter-Abdichtung
export const packageAbdichtungPerimeter: RenovationPackage = {
  id: 'abdichtungPerimeter',
  title: 'Perimeter-Abdichtung',
  defaultArea: 30,
  defaultFloorCount: 1,
  categories: [
    COMMON_PREP_CATEGORY,
    {
      id: 'abdichtungPerimeter-cat',
      title: 'Perimeter-Abdichtung (Details)',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'abdichtung',
          title: 'Leistungen & Material',
          type: 'service',
          products: [
            createProduct('abbd-101-1-mat', 'abdichtung', 'abdichtung', `PERIMETERDÄMMUNG Abdichtung`, 249, 'qm', `🛠 Montage-Leistungspaket`, false, false, 50, 'service'),
            createProduct('uv868-00421', 'abdichtung', 'abdichtung', `weber.therm EPS 032 Sockel standard Polystyrol Perimeter-Dämmplatte`, 22.62, 'Stk', `weber.therm EPS 032 Sockel standard Polystyrol Perimeter-Dämmplatte`, false, false, 55, 'material')
          ]
        }
      ]
    }
  ]
};

// Keller-Abdichtung (Innen)
export const packageAbdichtungKeller: RenovationPackage = {
  id: 'abdichtungKeller',
  title: 'Keller-Abdichtung (Innen)',
  defaultArea: 60,
  defaultFloorCount: 1,
  categories: [
    COMMON_PREP_CATEGORY,
    {
      id: 'abdichtungKeller-cat',
      title: 'Keller-Abdichtung (Innen) (Details)',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'abdichtung',
          title: 'Leistungen & Material',
          type: 'service',
          products: [
            createProduct('abbd-101-3-mat', 'abdichtung', 'abdichtung', `DICHTSYSTEM`, 69.25, 'qm', `Anti Feuchtigkeit`, false, false, 1, 'material')
          ]
        }
      ]
    }
  ]
};
