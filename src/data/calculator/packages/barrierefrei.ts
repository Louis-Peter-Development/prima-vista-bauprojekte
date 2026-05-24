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
    sku: `PV-BAR-${id.toUpperCase().substring(0, 6)}`,
    type,
    unit,
    basePrice,
    enabled,
    optional,
    minQuantity: 1,
    quantityStep: 1,
    baseQuantity,
    scalable: unit === 'qm' || unit === 'Stk',
    quantity: baseQuantity,
    canDuplicate: false,
    canRemove: true,
    canReplace: false,
    description,
    alternatives: []
  };
}

// 1. Ebenerdige Dusche
export const packageBarrierefreiDusche: RenovationPackage = {
  id: 'barrierefreiDusche',
  title: 'Ebenerdige Dusche',
  defaultArea: 4,
  defaultFloorCount: 1,
  categories: [
    {
      id: 'abbruch',
      title: 'Abbruch & Vorbereitung',
      lead: 'Demontage der alten Wanne oder Duschtasse.',
      subsections: [
        {
          id: 'demontage',
          title: 'Demontage',
          type: 'service',
          products: [
            createProduct('abbruch-wanne', 'abbruch', 'demontage', 'Alte Wanne entfernen', 350, 'pauschal', 'Inkl. Fachgerechter Entsorgung.'),
            createProduct('estrich-anpassen', 'abbruch', 'demontage', 'Estrich/Ablauf anpassen', 450, 'pauschal', 'Vorbereitung für bodengleichen Ablauf.')
          ]
        }
      ]
    },
    {
      id: 'duschbereich',
      title: 'Bodengleiche Dusche',
      lead: 'Erstellung des ebenerdigen Duschbereichs.',
      subsections: [
        {
          id: 'dusche',
          title: 'Duschbereich',
          type: 'material',
          products: [
            createProduct('dusche-bodengleich', 'duschbereich', 'dusche', 'Bodengleiche Dusche (gefliest)', 1580, 'Stk', 'Inkl. Rinne, Abdichtung und Fliesen.'),
            createProduct('duschsitz', 'duschbereich', 'dusche', 'Duschsitz / Klappsitz', 676, 'Stk', 'Tragfähige Befestigung an der Wand.', true, false, 1, 'material'),
            createProduct('haltegriff-dusche', 'duschbereich', 'dusche', 'Stützklappgriff Dusche', 435, 'Stk', 'Sicherer Halt im Duschbereich.', true, false, 1, 'material')
          ]
        }
      ]
    }
  ]
};

// 2. WC & Waschtisch
export const packageBarrierefreiWc: RenovationPackage = {
  id: 'barrierefreiWc',
  title: 'WC & Waschtisch',
  defaultArea: 4,
  defaultFloorCount: 1,
  categories: [
    {
      id: 'sanitaer',
      title: 'Sanitärobjekte',
      lead: 'Barrierefreies Vital-WC und unterfahrbarer Waschtisch.',
      subsections: [
        {
          id: 'wc',
          title: 'Barrierefreies WC',
          type: 'material',
          products: [
            createProduct('vital-wc', 'sanitaer', 'wc', 'Vital-WC (erhöht/verlängert)', 1280, 'Stk', 'Wand-WC inkl. speziellem Sitz.'),
            createProduct('vorwand-wc', 'sanitaer', 'wc', 'Vorwandelement WC', 450, 'Stk', 'Verstärkte Ausführung für Stützgriffe.'),
            createProduct('haltegriff-wc', 'sanitaer', 'wc', 'Stützklappgriffe (Paar)', 870, 'Paar', 'Beidseitig am WC montiert.', true, false, 1, 'material')
          ]
        },
        {
          id: 'waschbecken',
          title: 'Unterfahrbarer Waschtisch',
          type: 'material',
          products: [
            createProduct('waschtisch-unterfahrbar', 'sanitaer', 'waschbecken', 'Waschtisch (unterfahrbar)', 1342, 'Stk', 'Inkl. Flach-Aufputzsiphon und langer Armatur.')
          ]
        }
      ]
    }
  ]
};

// 3. Seniorengerechtes Bad (Teilsanierung)
export const packageBarrierefreiSenioren: RenovationPackage = {
  id: 'barrierefreiSenioren',
  title: 'Seniorengerechtes Bad',
  defaultArea: 6,
  defaultFloorCount: 1,
  categories: [
    packageBarrierefreiDusche.categories[0], // Abbruch Wanne
    packageBarrierefreiDusche.categories[1], // Duschbereich
    {
      id: 'sicherheit',
      title: 'Sicherheit & Komfort',
      lead: 'Zusätzliche Griffe und rutschfeste Beläge.',
      subsections: [
        {
          id: 'rutschfest',
          title: 'Bodenbelag',
          type: 'service',
          products: [
            createProduct('rutschfest', 'sicherheit', 'rutschfest', 'Rutschfeste Badfliesen (R10/R11)', 125, 'qm', 'Inklusive Verlegung und Material.', true, false, 6, 'service')
          ]
        },
        {
          id: 'hygiene',
          title: 'Sicherheitselemente',
          type: 'material',
          products: [
            createProduct('haltegriff-wc', 'sicherheit', 'hygiene', 'Stützklappgriffe WC', 870, 'Paar', 'Beidseitig am WC montiert.', true, false, 1, 'material'),
            createProduct('hygiene-zubehoer', 'sicherheit', 'hygiene', 'Hygienezubehör', 738, 'pauschal', 'Spender, Abfallbox, Halterungen.', false, true, 1, 'material')
          ]
        }
      ]
    }
  ]
};

// 4. Rollstuhlgerecht (Komplett)
export const packageBarrierefreiRollstuhl: RenovationPackage = {
  id: 'barrierefreiRollstuhl',
  title: 'Rollstuhlgerecht (Komplett)',
  defaultArea: 8,
  defaultFloorCount: 1,
  categories: [
    {
      id: 'grundriss',
      title: 'Raumanpassung',
      lead: 'Bewegungsflächen und Zugänge herstellen.',
      subsections: [
        {
          id: 'tuer',
          title: 'Tür & Zugang',
          type: 'service',
          products: [
            createProduct('tuerverbreiterung', 'grundriss', 'tuer', 'Türverbreiterung', 3200, 'pauschal', 'Wandausschnitt vergrößern für Rollstuhl.', true, false, 1, 'service'),
            createProduct('planung', 'grundriss', 'tuer', 'Aufmaß & Bewegungsflächenplanung', 950, 'pauschal', 'Planung nach DIN 18040-2.', true, false, 1, 'service')
          ]
        }
      ]
    },
    {
      id: 'sanitaer',
      title: 'Vollsanierung',
      lead: 'Wasserinstallation und Fliesenarbeiten.',
      subsections: [
        {
          id: 'rohr',
          title: 'Rohrinstallation',
          type: 'service',
          products: [
            createProduct('wasser-neu', 'sanitaer', 'rohr', 'Wasserinstallation komplett', 1996, 'pauschal', 'Anpassung aller Anschlüsse an neue DIN-Höhen.')
          ]
        },
        packageBarrierefreiSenioren.categories[2].subsections[0], // rutschfest
      ]
    },
    packageBarrierefreiDusche.categories[1], // Duschbereich
    packageBarrierefreiWc.categories[0], // WC & Waschtisch
  ]
};
