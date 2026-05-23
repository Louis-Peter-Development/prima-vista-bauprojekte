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
    scalable: unit === 'qm' || unit === 'lfm' || unit === 'Stk',
    quantity: baseQuantity,
    canDuplicate: false,
    canRemove: true,
    canReplace: false,
    description,
    alternatives: []
  };
}

export const packageBoedenAlles: RenovationPackage = {
  id: 'boedenAlles',
  title: 'Alles zu Böden',
  defaultArea: 45,
  defaultFloorCount: 1,
  categories: [
    {
      id: 'bodenfliesen',
      title: 'BODENFLIESEN',
      lead: '',
      subsections: [
        {
          id: 'bodenfliesen-sub',
          title: 'BODENFLIESEN',
          type: 'service',
          products: [
            createProduct('bode-400-basis', 'bodenfliesen', 'bodenfliesen-sub', "BODENFLIESEN | 🛠 Montage-Leistungspaket", 59.9, 'qm', '', true, false, 100, 'BODE-400-BASIS', 'service')
          ]
        }
      ]
    },
    {
      id: 'ausstattung-optional',
      title: 'Ausstattung & Optional',
      lead: '',
      subsections: [
        {
          id: 'ausstattung-optional-sub',
          title: 'Ausstattung & Optional',
          type: 'service',
          products: [
            createProduct('1209835', 'ausstattung-optional', 'ausstattung-optional-sub', "*V&B 80x 80x 0,9 2835BZ1001 Pure Base !Z creme matt ugl. FS R10/B rekt. #1209834", 46.2, 'qm', '', false, true, 110, '1209835', 'optional'),
            createProduct('662445', 'ausstattung-optional', 'ausstattung-optional-sub', "V&B 7,5x 60 2872RU200 My Earth Sockel beige multicolor ugl. FS", 14.53, 'qm', '', false, true, 110, '662445', 'optional'),
            createProduct('uv867-00298', 'ausstattung-optional', 'ausstattung-optional-sub', "Ottoseal S 110 Premium Neutral Silicon", 8.79, 'Stk', '', false, true, 10, 'uv867-00298', 'optional'),
            createProduct('bode-100-2-op', 'ausstattung-optional', 'ausstattung-optional-sub', "AUSGLEICH-Boden | max. 1 cm der Bodenfläche", 39.9, 'qm', '', false, true, 1, 'BODE-100-2-OP', 'optional')
          ]
        }
      ]
    }
  ]
};

export const packageBoedenParkettVerlegung: RenovationPackage = {
  id: 'boedenParkettVerlegung',
  title: 'Parkett Verlegung',
  defaultArea: 45,
  defaultFloorCount: 1,
  categories: [
    {
      id: 'verlegung-boden',
      title: 'VERLEGUNG-Boden',
      lead: '',
      subsections: [
        {
          id: 'verlegung-boden-sub',
          title: 'VERLEGUNG-Boden',
          type: 'service',
          products: [
            createProduct('bode-100-basis', 'verlegung-boden', 'verlegung-boden-sub', "VERLEGUNG-Boden | 🛠 Montage-Leistungspaket", 19.9, 'qm', '', true, false, 100, 'BODE-100-BASIS', 'service')
          ]
        }
      ]
    },
    {
      id: 'extra-positionen',
      title: 'Extra Positionen',
      lead: '',
      subsections: [
        {
          id: 'extra-positionen-sub',
          title: 'Extra Positionen',
          type: 'service',
          products: [
            createProduct('bode-100-1-op', 'extra-positionen', 'extra-positionen-sub', "ALT-BODEN |🛠 Demontage & Entsorgung", 15.79, 'qm', '', true, false, 100, 'BODE-100-1-OP', 'service')
          ]
        }
      ]
    },
    {
      id: 'ausstattung-optional',
      title: 'Ausstattung & Optional',
      lead: '',
      subsections: [
        {
          id: 'ausstattung-optional-sub',
          title: 'Ausstattung & Optional',
          type: 'service',
          products: [
            createProduct('par1501534-e28a', 'ausstattung-optional', 'ausstattung-optional-sub', "JOKA Classic KINGSTON 435 SB / DS 3.5 mm Fertigparkett 3-S m", 49.83, 'qm', '', false, true, 110, 'PAR1501534_E28A', 'optional'),
            createProduct('1265921', 'ausstattung-optional', 'ausstattung-optional-sub', "RAW Sockelleiste MDF Cubus !Z weiß uni alle Dekore 2500x 16x 80 mm", 3.56, 'lfm', '', false, true, 110, '1265921', 'optional'),
            createProduct('287221', 'ausstattung-optional', 'ausstattung-optional-sub', "Geficell PE Basic Schaumdaemmbahn 5/1000 mm, 50 m/Ro = 50,00 qm, blau", 2.14, 'qm', '', false, true, 110, '287221', 'optional'),
            createProduct('1098740', 'ausstattung-optional', 'ausstattung-optional-sub', "Prinz Alu-Uebergangsprofil - gel !Z 38 mm 100 cm lang Silber", 6.69, 'Stück', '', false, true, 10, '1098740', 'optional'),
            createProduct('uv816-00746', 'ausstattung-optional', 'ausstattung-optional-sub', "Gutjahr IndorTec THERM-E Komplettset TD 3-in-1 Elektro-Flächenheizung", 395.95, 'Stk', '', false, true, 1, 'uv816-00746', 'optional'),
            createProduct('bode-100-2-op', 'ausstattung-optional', 'ausstattung-optional-sub', "AUSGLEICH-Boden | max. 1 cm der Bodenfläche", 39.9, 'qm', '', false, true, 1, 'BODE-100-2-OP', 'optional')
          ]
        }
      ]
    }
  ]
};

export const packageBoedenParkettAufbereiten: RenovationPackage = {
  id: 'boedenParkettAufbereiten',
  title: 'Parkett Aufbereiten',
  defaultArea: 45,
  defaultFloorCount: 1,
  categories: [
    {
      id: 'art-der-ausf-hrung',
      title: 'Art der Ausführung',
      lead: '',
      subsections: [
        {
          id: 'art-der-ausf-hrung-sub',
          title: 'Art der Ausführung',
          type: 'service',
          products: [
            createProduct('bode-100-op', 'art-der-ausf-hrung', 'art-der-ausf-hrung-sub', "AUFBEREITEN | Parkett schleifen & lackieren", 33.75, 'qm', '', true, false, 100, 'BODE-100-OP', 'service')
          ]
        }
      ]
    },
    {
      id: 'ausstattung-optional',
      title: 'Ausstattung & Optional',
      lead: '',
      subsections: [
        {
          id: 'ausstattung-optional-sub',
          title: 'Ausstattung & Optional',
          type: 'service',
          products: [
            createProduct('bode-100-2-op', 'ausstattung-optional', 'ausstattung-optional-sub', "AUSGLEICH-Boden | max. 1 cm der Bodenfläche", 39.9, 'qm', '', false, true, 1, 'BODE-100-2-OP', 'optional')
          ]
        }
      ]
    }
  ]
};

export const packageBoedenLaminatVerlegung: RenovationPackage = {
  id: 'boedenLaminatVerlegung',
  title: 'Laminat Verlegung',
  defaultArea: 45,
  defaultFloorCount: 1,
  categories: [
    {
      id: 'verlegung-boden',
      title: 'VERLEGUNG-Boden',
      lead: '',
      subsections: [
        {
          id: 'verlegung-boden-sub',
          title: 'VERLEGUNG-Boden',
          type: 'service',
          products: [
            createProduct('bode-100-basis', 'verlegung-boden', 'verlegung-boden-sub', "VERLEGUNG-Boden | 🛠 Montage-Leistungspaket", 19.9, 'qm', '', true, false, 100, 'BODE-100-BASIS', 'service')
          ]
        }
      ]
    },
    {
      id: 'extra-positionen',
      title: 'Extra Positionen',
      lead: '',
      subsections: [
        {
          id: 'extra-positionen-sub',
          title: 'Extra Positionen',
          type: 'service',
          products: [
            createProduct('bode-100-1-op', 'extra-positionen', 'extra-positionen-sub', "ALT-BODEN |🛠 Demontage & Entsorgung", 15.79, 'qm', '', true, false, 100, 'BODE-100-1-OP', 'service')
          ]
        }
      ]
    },
    {
      id: 'ausstattung-optional',
      title: 'Ausstattung & Optional',
      lead: '',
      subsections: [
        {
          id: 'ausstattung-optional-sub',
          title: 'Ausstattung & Optional',
          type: 'service',
          products: [
            createProduct('1105594', 'ausstattung-optional', 'ausstattung-optional-sub', "Egger Laminat Classic 31 Stangl Buche EBL002 1292x192x7mm", 14.35, 'qm', '', false, true, 110, '1105594', 'optional'),
            createProduct('642888', 'ausstattung-optional', 'ausstattung-optional-sub', "Egger Sockelleiste 2400x 17x 60mm Leiste zu EBL002 L131", 3.49, 'lfm', '', false, true, 110, '642888', 'optional'),
            createProduct('287221', 'ausstattung-optional', 'ausstattung-optional-sub', "Geficell PE Basic Schaumdaemmbahn 5/1000 mm, 50 m/Ro = 50,00 qm, blau", 2.14, 'qm', '', false, true, 110, '287221', 'optional'),
            createProduct('1098740', 'ausstattung-optional', 'ausstattung-optional-sub', "Prinz Alu-Uebergangsprofil - gel !Z 38 mm 100 cm lang Silber", 6.69, 'Stück', '', false, true, 10, '1098740', 'optional'),
            createProduct('uv816-00746', 'ausstattung-optional', 'ausstattung-optional-sub', "Gutjahr IndorTec THERM-E Komplettset TD 3-in-1 Elektro-Flächenheizung", 395.95, 'Stk', '', false, true, 1, 'uv816-00746', 'optional'),
            createProduct('bode-100-2-op', 'ausstattung-optional', 'ausstattung-optional-sub', "AUSGLEICH-Boden | max. 1 cm der Bodenfläche", 39.9, 'qm', '', false, true, 1, 'BODE-100-2-OP', 'optional')
          ]
        }
      ]
    }
  ]
};

export const packageBoedenFliesenVerlegung: RenovationPackage = {
  id: 'boedenFliesenVerlegung',
  title: 'Fliesen Verlegung',
  defaultArea: 45,
  defaultFloorCount: 1,
  categories: [
    {
      id: 'bodenfliesen',
      title: 'BODENFLIESEN',
      lead: '',
      subsections: [
        {
          id: 'bodenfliesen-sub',
          title: 'BODENFLIESEN',
          type: 'service',
          products: [
            createProduct('bode-400-basis', 'bodenfliesen', 'bodenfliesen-sub', "BODENFLIESEN | 🛠 Montage-Leistungspaket", 5.99, '59,90 €', '', true, false, 1, 'BODE-400-BASIS', 'service')
          ]
        }
      ]
    },
    {
      id: 'ausstattung-optional',
      title: 'Ausstattung & Optional',
      lead: '',
      subsections: [
        {
          id: 'ausstattung-optional-sub',
          title: 'Ausstattung & Optional',
          type: 'service',
          products: [
            createProduct('1209835', 'ausstattung-optional', 'ausstattung-optional-sub', "*V&B 80x 80x 0,9 2835BZ1001 Pure Base !Z creme matt ugl. FS R10/B rekt. #1209834", 5.082, '46,20 €', '', false, true, 1, '1209835', 'optional'),
            createProduct('662445', 'ausstattung-optional', 'ausstattung-optional-sub', "V&B 7,5x 60 2872RU200 My Earth Sockel beige multicolor ugl. FS", 1.5983, '14,53 €', '', false, true, 1, '662445', 'optional'),
            createProduct('uv867-00298', 'ausstattung-optional', 'ausstattung-optional-sub', "Ottoseal S 110 Premium Neutral Silicon", 8790, '8,79 €', '', false, true, 1, 'uv867-00298', 'optional'),
            createProduct('bode-100-2-op', 'ausstattung-optional', 'ausstattung-optional-sub', "AUSGLEICH-Boden | max. 1 cm der Bodenfläche", 3990, '39,90 €', '', false, true, 1, 'BODE-100-2-OP', 'optional')
          ]
        }
      ]
    }
  ]
};

export const packageBoedenKorkboden: RenovationPackage = {
  id: 'boedenKorkboden',
  title: 'Korkboden Verlegung',
  defaultArea: 45,
  defaultFloorCount: 1,
  categories: [
    {
      id: 'verklebte-bodenverlegung',
      title: 'VERKLEBTE BODENVERLEGUNG',
      lead: '',
      subsections: [
        {
          id: 'verklebte-bodenverlegung-sub',
          title: 'VERKLEBTE BODENVERLEGUNG',
          type: 'service',
          products: [
            createProduct('bode-201-op', 'verklebte-bodenverlegung', 'verklebte-bodenverlegung-sub', "VERKLEBTE BODENVERLEGUNG | 🛠 Montage-Leistungspaket", 2.99, '29,90 €', '', true, false, 1, 'BODE-201-OP', 'service')
          ]
        }
      ]
    },
    {
      id: 'extra-positionen',
      title: 'Extra Positionen',
      lead: '',
      subsections: [
        {
          id: 'extra-positionen-sub',
          title: 'Extra Positionen',
          type: 'service',
          products: [
            createProduct('bode-100-1-op', 'extra-positionen', 'extra-positionen-sub', "ALT-BODEN |🛠 Demontage & Entsorgung", 1.579, '15,79 €', '', true, false, 1, 'BODE-100-1-OP', 'service')
          ]
        }
      ]
    },
    {
      id: 'ausstattung-optional',
      title: 'Ausstattung & Optional',
      lead: '',
      subsections: [
        {
          id: 'ausstattung-optional-sub',
          title: 'Ausstattung & Optional',
          type: 'service',
          products: [
            createProduct('763-00785', 'ausstattung-optional', 'ausstattung-optional-sub', "Ziro Kork Korkboden natur KF | Harmony roh 5 mm | Kurzdiele", 4.6101, '41,91 €', '', false, true, 1, '763-00785', 'optional'),
            createProduct('1098740', 'ausstattung-optional', 'ausstattung-optional-sub', "Prinz Alu-Uebergangsprofil - gel !Z 38 mm 100 cm lang Silber", 6690, '6,69 €', '', false, true, 1, '1098740', 'optional'),
            createProduct('uv816-00746', 'ausstattung-optional', 'ausstattung-optional-sub', "Gutjahr IndorTec THERM-E Komplettset TD 3-in-1 Elektro-Flächenheizung", 39595, '395,95 €', '', false, true, 1, 'uv816-00746', 'optional'),
            createProduct('bode-100-2-op', 'ausstattung-optional', 'ausstattung-optional-sub', "AUSGLEICH-Boden | max. 1 cm der Bodenfläche", 3990, '39,90 €', '', false, true, 1, 'BODE-100-2-OP', 'optional')
          ]
        }
      ]
    }
  ]
};

export const packageBoedenVinyl: RenovationPackage = {
  id: 'boedenVinyl',
  title: 'Vinyl o. Linoleum Verlegung',
  defaultArea: 45,
  defaultFloorCount: 1,
  categories: [
    {
      id: 'verklebte-bodenverlegung',
      title: 'VERKLEBTE BODENVERLEGUNG',
      lead: '',
      subsections: [
        {
          id: 'verklebte-bodenverlegung-sub',
          title: 'VERKLEBTE BODENVERLEGUNG',
          type: 'service',
          products: [
            createProduct('bode-201-op', 'verklebte-bodenverlegung', 'verklebte-bodenverlegung-sub', "VERKLEBTE BODENVERLEGUNG | 🛠 Montage-Leistungspaket", 2.99, '29,90 €', '', true, false, 1, 'BODE-201-OP', 'service')
          ]
        }
      ]
    },
    {
      id: 'extra-positionen',
      title: 'Extra Positionen',
      lead: '',
      subsections: [
        {
          id: 'extra-positionen-sub',
          title: 'Extra Positionen',
          type: 'service',
          products: [
            createProduct('bode-100-1-op', 'extra-positionen', 'extra-positionen-sub', "ALT-BODEN |🛠 Demontage & Entsorgung", 1.579, '15,79 €', '', true, false, 1, 'BODE-100-1-OP', 'service')
          ]
        }
      ]
    },
    {
      id: 'ausstattung-optional',
      title: 'Ausstattung & Optional',
      lead: '',
      subsections: [
        {
          id: 'ausstattung-optional-sub',
          title: 'Ausstattung & Optional',
          type: 'service',
          products: [
            createProduct('lvtdes230-4254', 'ausstattung-optional', 'ausstattung-optional-sub', "DESIGN 230 HDF 9,6mm/32er JOKA Classic Designböden230 HDF!", 5.0237, '45,67 €', '', false, true, 1, 'LVTDES230_4254', 'optional'),
            createProduct('763-10094', 'ausstattung-optional', 'ausstattung-optional-sub', "Ziro Lino-klick Linoleumboden HDF | 620x450x10 mm | Velluto Kurzdiele", 5500, '55,00 €', '', false, true, 1, '763-10094', 'optional'),
            createProduct('1098740', 'ausstattung-optional', 'ausstattung-optional-sub', "Prinz Alu-Uebergangsprofil - gel !Z 38 mm 100 cm lang Silber", 6690, '6,69 €', '', false, true, 1, '1098740', 'optional'),
            createProduct('uv816-00746', 'ausstattung-optional', 'ausstattung-optional-sub', "Gutjahr IndorTec THERM-E Komplettset TD 3-in-1 Elektro-Flächenheizung", 39595, '395,95 €', '', false, true, 1, 'uv816-00746', 'optional'),
            createProduct('bode-100-2-op', 'ausstattung-optional', 'ausstattung-optional-sub', "AUSGLEICH-Boden | max. 1 cm der Bodenfläche", 3990, '39,90 €', '', false, true, 1, 'BODE-100-2-OP', 'optional')
          ]
        }
      ]
    }
  ]
};

export const packageBoedenTeppich: RenovationPackage = {
  id: 'boedenTeppich',
  title: 'Teppich Verlegung',
  defaultArea: 45,
  defaultFloorCount: 1,
  categories: [
    {
      id: 'verlegung-teppich',
      title: 'VERLEGUNG TEPPICH',
      lead: '',
      subsections: [
        {
          id: 'verlegung-teppich-sub',
          title: 'VERLEGUNG TEPPICH',
          type: 'service',
          products: [
            createProduct('bode-10001-basis', 'verlegung-teppich', 'verlegung-teppich-sub', "VERLEGUNG TEPPICH | 🛠 Montage-Leistungspaket", 1.79, '17,90 €', '', true, false, 1, 'BODE-10001-Basis', 'service')
          ]
        }
      ]
    },
    {
      id: 'ausstattung-optional',
      title: 'Ausstattung & Optional',
      lead: '',
      subsections: [
        {
          id: 'ausstattung-optional-sub',
          title: 'Ausstattung & Optional',
          type: 'service',
          products: [
            createProduct('tepnafjtp2-310', 'ausstattung-optional', 'ausstattung-optional-sub', "JOKAVLIES TITAN PLUS 200cm Atelier 2020", 1.6379, '14,89 €', '', false, true, 1, 'TEPNAFJTP2_310', 'optional'),
            createProduct('1098740', 'ausstattung-optional', 'ausstattung-optional-sub', "Prinz Alu-Uebergangsprofil - gel !Z 38 mm 100 cm lang Silber", 6690, '6,69 €', '', false, true, 1, '1098740', 'optional'),
            createProduct('uv816-00746', 'ausstattung-optional', 'ausstattung-optional-sub', "Gutjahr IndorTec THERM-E Komplettset TD 3-in-1 Elektro-Flächenheizung", 39595, '395,95 €', '', false, true, 1, 'uv816-00746', 'optional'),
            createProduct('bode-100-2-op', 'ausstattung-optional', 'ausstattung-optional-sub', "AUSGLEICH-Boden | max. 1 cm der Bodenfläche", 3990, '39,90 €', '', false, true, 1, 'BODE-100-2-OP', 'optional')
          ]
        }
      ]
    },
    {
      id: 'extra-positionen',
      title: 'Extra Positionen',
      lead: '',
      subsections: [
        {
          id: 'extra-positionen-sub',
          title: 'Extra Positionen',
          type: 'service',
          products: [
            createProduct('bode-100-1-op', 'extra-positionen', 'extra-positionen-sub', "ALT-BODEN |🛠 Demontage & Entsorgung", 1.579, '15,79 €', '', true, false, 1, 'BODE-100-1-OP', 'service')
          ]
        }
      ]
    }
  ]
};

export const packageBoedenEstrichplatten: RenovationPackage = {
  id: 'boedenEstrichplatten',
  title: 'Estrichplatten Verlegung',
  defaultArea: 45,
  defaultFloorCount: 1,
  categories: [
    {
      id: 'art-der-ausf-hrung',
      title: 'Art der Ausführung',
      lead: '',
      subsections: [
        {
          id: 'art-der-ausf-hrung-sub',
          title: 'Art der Ausführung',
          type: 'service',
          products: [
            createProduct('mon-10222', 'art-der-ausf-hrung', 'art-der-ausf-hrung-sub', "ESTRICH | 🛠 Montage", 29, 'qm', '', true, false, 100, 'MON-10222', 'service'),
            createProduct('rohb-501-1-op', 'art-der-ausf-hrung', 'art-der-ausf-hrung-sub', "ALT-ESTRICH |🛠 Demontage & Entsorgung", 45.89, 'qm', '', true, false, 1, 'ROHB-501-1-OP', 'service')
          ]
        }
      ]
    },
    {
      id: 'ausstattung-optional',
      title: 'Ausstattung & Optional',
      lead: '',
      subsections: [
        {
          id: 'ausstattung-optional-sub',
          title: 'Ausstattung & Optional',
          type: 'service',
          products: [
            createProduct('uv204-000321', 'ausstattung-optional', 'ausstattung-optional-sub', "Fermacell Estrich-Elemente (MW) mit Mineralwolldämmung 1500x500 mm - Dicke: 30 mm", 26.39, 'Stk', '', false, true, 130, 'uv204-000321', 'optional'),
            createProduct('rohb-501-2-op', 'ausstattung-optional', 'ausstattung-optional-sub', "Ausgleichsschüttung Herstellen (bis 3 cm)", 11.68, 'qm', '', false, true, 1, 'ROHB-501-2-OP', 'optional'),
            createProduct('204-85', 'ausstattung-optional', 'ausstattung-optional-sub', "Fermacell Wabenschüttung - 15 Liter Sack", 9.24, 'Stk', '', false, true, 1, '204-85', 'optional'),
            createProduct('204-00088', 'ausstattung-optional', 'ausstattung-optional-sub', "Fermacell Wärmedämmschüttung - 100 Liter Sack", 25.85, 'Stk', '', false, true, 1, '204-00088', 'optional'),
            createProduct('204-00086', 'ausstattung-optional', 'ausstattung-optional-sub', "Fermacell Estrich-Wabe 1.500x1.000 mm, Dicke 30 mm", 15.84, 'Stk', '', false, true, 1, '204-00086', 'optional')
          ]
        }
      ]
    },
    {
      id: 'extra-positionen',
      title: 'Extra Positionen',
      lead: '',
      subsections: [
        {
          id: 'extra-positionen-sub',
          title: 'Extra Positionen',
          type: 'service',
          products: [
            createProduct('204-00071', 'extra-positionen', 'extra-positionen-sub', "Fermacell Estrich-Kleber - 1 kg Flasche", 25.19, 'Stk', '', true, false, 2, '204-00071', 'service'),
            createProduct('204-00073', 'extra-positionen', 'extra-positionen-sub', "Fermacell Schnellbauschrauben für Estrichelemente 3,9x19 mm, 1000 Stück", 21.89, 'Stk', '', true, false, 2, '204-00073', 'service')
          ]
        }
      ]
    }
  ]
};

export const packageBoedenSichtestrich: RenovationPackage = {
  id: 'boedenSichtestrich',
  title: 'Sichtestrich Verlegung',
  defaultArea: 45,
  defaultFloorCount: 1,
  categories: [
    {
      id: 'sichtbeton-estrich-boden',
      title: 'SICHTBETON-ESTRICH-BODEN',
      lead: '',
      subsections: [
        {
          id: 'sichtbeton-estrich-boden-sub',
          title: 'SICHTBETON-ESTRICH-BODEN',
          type: 'service',
          products: [
            createProduct('rohb-10004-basis', 'sichtbeton-estrich-boden', 'sichtbeton-estrich-boden-sub', "SICHTBETON-ESTRICH-BODEN | 🛠 Montage-Leistungspaket", 139, 'qm', '', true, false, 1, 'ROHB-10004-Basis', 'service')
          ]
        }
      ]
    }
  ]
};

export const packageBoedenSockelleisten: RenovationPackage = {
  id: 'boedenSockelleisten',
  title: 'Sockelleisten Verlegung',
  defaultArea: 45,
  defaultFloorCount: 1,
  categories: [
    {
      id: 'verlegung-boden',
      title: 'VERLEGUNG-Boden',
      lead: '',
      subsections: [
        {
          id: 'verlegung-boden-sub',
          title: 'VERLEGUNG-Boden',
          type: 'service',
          products: [
            createProduct('bode-100-basis', 'verlegung-boden', 'verlegung-boden-sub', "VERLEGUNG-Boden | 🛠 Montage-Leistungspaket", 19.9, 'qm', '', true, false, 100, 'BODE-100-BASIS', 'service')
          ]
        }
      ]
    },
    {
      id: 'extra-positionen',
      title: 'Extra Positionen',
      lead: '',
      subsections: [
        {
          id: 'extra-positionen-sub',
          title: 'Extra Positionen',
          type: 'service',
          products: [
            createProduct('bode-100-1-op', 'extra-positionen', 'extra-positionen-sub', "ALT-BODEN |🛠 Demontage & Entsorgung", 15.79, 'qm', '', true, false, 100, 'BODE-100-1-OP', 'service')
          ]
        }
      ]
    },
    {
      id: 'ausstattung-optional',
      title: 'Ausstattung & Optional',
      lead: '',
      subsections: [
        {
          id: 'ausstattung-optional-sub',
          title: 'Ausstattung & Optional',
          type: 'service',
          products: [
            createProduct('par1501534-e28a', 'ausstattung-optional', 'ausstattung-optional-sub', "JOKA Classic KINGSTON 435 SB / DS 3.5 mm Fertigparkett 3-S m", 49.83, 'qm', '', false, true, 110, 'PAR1501534_E28A', 'optional'),
            createProduct('1265921', 'ausstattung-optional', 'ausstattung-optional-sub', "RAW Sockelleiste MDF Cubus !Z weiß uni alle Dekore 2500x 16x 80 mm", 3.56, 'lfm', '', false, true, 110, '1265921', 'optional'),
            createProduct('287221', 'ausstattung-optional', 'ausstattung-optional-sub', "Geficell PE Basic Schaumdaemmbahn 5/1000 mm, 50 m/Ro = 50,00 qm, blau", 2.14, 'qm', '', false, true, 110, '287221', 'optional'),
            createProduct('1098740', 'ausstattung-optional', 'ausstattung-optional-sub', "Prinz Alu-Uebergangsprofil - gel !Z 38 mm 100 cm lang Silber", 6.69, 'Stück', '', false, true, 10, '1098740', 'optional'),
            createProduct('uv816-00746', 'ausstattung-optional', 'ausstattung-optional-sub', "Gutjahr IndorTec THERM-E Komplettset TD 3-in-1 Elektro-Flächenheizung", 395.95, 'Stk', '', false, true, 1, 'uv816-00746', 'optional'),
            createProduct('bode-100-2-op', 'ausstattung-optional', 'ausstattung-optional-sub', "AUSGLEICH-Boden | max. 1 cm der Bodenfläche", 39.9, 'qm', '', false, true, 1, 'BODE-100-2-OP', 'optional')
          ]
        }
      ]
    }
  ]
};

