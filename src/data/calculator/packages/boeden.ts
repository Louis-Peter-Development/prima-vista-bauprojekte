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

export const packageBoedenAlles: RenovationPackage = {
  id: 'boedenAlles',
  title: 'Alles zu Böden',
  defaultArea: 100,
  defaultFloorCount: 1,
  categories: [
    {
      id: 'holz-boden',
      title: 'HOLZ-BODEN',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'holz-boden-sub',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('bode-100-basis', 'holz-boden', 'holz-boden-sub', `VERLEGUNG-Boden | 🛠 Montage-Leistungspaket`, 'BODE-100-BASIS', 19.9, 'qm', `🛠 Montage-Leistungspaket`, false, false, 1, 'service')
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
            createProduct('bode-100-1-op', 'extra-positionen', 'extra-positionen-sub', `ALT-BODEN |🛠 Demontage & Entsorgung`, 'BODE-100-1-OP', 15.79, 'qm', `🛠 Demontage & Entsorgung`, false, false, 1, 'extra')
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
            createProduct('rohb-501-2-op', 'optionale-positionen', 'optionale-positionen-sub', `Ausgleichsschüttung Herstellen (bis 3 cm)`, 'ROHB-501-2-OP', 11.68, 'qm', `Ausgleichsschüttung Herstellen (bis 3 cm)`, false, true, 1, 'optional'),
            createProduct('bode-100-2-op', 'optionale-positionen', 'optionale-positionen-sub', `AUSGLEICH-Boden | max. 1 cm der Bodenfläche`, 'BODE-100-2-OP', 39.9, 'qm', `max. 1 cm der Bodenfläche`, false, true, 1, 'optional'),
            createProduct('bode-100-op', 'optionale-positionen', 'optionale-positionen-sub', `AUFBEREITEN | Parkett schleifen & lackieren`, 'BODE-100-OP', 33.75, 'qm', `Parkett schleifen & lackieren`, false, true, 1, 'optional'),
            createProduct('rohb-501-2-op-2', 'optionale-positionen', 'optionale-positionen-sub', `Ausgleichsschüttung Herstellen (bis 3 cm)`, 'ROHB-501-2-OP', 11.68, 'qm', `Ausgleichsschüttung Herstellen (bis 3 cm)`, false, true, 1, 'optional')
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
            createProduct('680700', 'material', 'material-sub', `Egger Laminat Classic 31 Garrison Eiche natur EHL022 1292x192x7mm`, '680700', 14.35, 'qm', `Egger Laminat Classic 31 Garrison Eiche natur EHL022 1292x192x7mm`, false, false, 1, 'material'),
            createProduct('763-00785', 'material', 'material-sub', `Ziro Kork Korkboden natur KF | Harmony roh 5 mm | Kurzdiele`, '763-00785', 41.91, 'Stk', `Harmony roh 5 mm | Kurzdiele`, false, false, 1, 'material'),
            createProduct('680767', 'material', 'material-sub', `Egger Sockelleiste 2400x 17x 60mm !Z Leiste zu EHL022 L150`, '680767', 7.5, 'lfm', `Egger Sockelleiste 2400x 17x 60mm !Z Leiste zu EHL022 L150`, false, false, 1, 'material'),
            createProduct('287221', 'material', 'material-sub', `Geficell PE Basic Schaumdaemmbahn 5/1000 mm, 50 m/Ro = 50,00 qm, blau`, '287221', 2.14, 'qm', `Geficell PE Basic Schaumdaemmbahn 5/1000 mm, 50 m/Ro = 50,00 qm, blau`, false, false, 1, 'material'),
            createProduct('1098740', 'material', 'material-sub', `Prinz Alu-Uebergangsprofil - gel !Z 38 mm 100 cm lang Silber`, '1098740', 6.69, 'Stk', `Prinz Alu-Uebergangsprofil - gel !Z 38 mm 100 cm lang Silber`, false, false, 1, 'material'),
            createProduct('1209835', 'material', 'material-sub', `*V&B 80x 80x 0,9 2835BZ1001 Pure Base !Z creme matt ugl. FS R10/B rekt. #1209834`, '1209835', 46.2, 'qm', `*V&B 80x 80x 0,9 2835BZ1001 Pure Base !Z creme matt ugl. FS R10/B rekt. #1209834`, false, false, 1, 'material'),
            createProduct('662445', 'material', 'material-sub', `V&B 7,5x 60 2872RU200 My Earth Sockel beige multicolor ugl. FS`, '662445', 14.53, 'qm', `V&B 7,5x 60 2872RU200 My Earth Sockel beige multicolor ugl. FS`, false, false, 1, 'material'),
            createProduct('uv867-00298', 'material', 'material-sub', `Ottoseal S 110 Premium Neutral Silicon`, 'uv867-00298', 8.79, 'Stk', `Ottoseal S 110 Premium Neutral Silicon`, false, false, 1, 'material'),
            createProduct('tepnafjtp2-310', 'material', 'material-sub', `JOKAVLIES TITAN PLUS 200cm Atelier 2020`, 'TEPNAFJTP2_310', 14.89, 'qm', `JOKAVLIES TITAN PLUS 200cm Atelier 2020`, false, false, 1, 'material')
          ]
        }
      ]
    },
    {
      id: 'fliesen-boden',
      title: 'FLIESEN-BODEN',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'fliesen-boden-sub',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('bode-400-basis', 'fliesen-boden', 'fliesen-boden-sub', `BODENFLIESEN | 🛠 Montage-Leistungspaket`, 'BODE-400-BASIS', 59.9, 'qm', `🛠 Montage-Leistungspaket`, false, false, 1, 'service')
          ]
        }
      ]
    },
    {
      id: 'teppich-boden',
      title: 'TEPPICH-BODEN',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'teppich-boden-sub',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('bode-10001-basis', 'teppich-boden', 'teppich-boden-sub', `VERLEGUNG TEPPICH | 🛠 Montage-Leistungspaket`, 'BODE-10001-Basis', 17.9, 'qm', `🛠 Montage-Leistungspaket`, false, false, 1, 'service')
          ]
        }
      ]
    },
    {
      id: 'estrich-boden',
      title: 'ESTRICH-BODEN',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'estrich-boden-sub',
          title: 'Leistungen & Materialien',
          type: 'optional',
          products: [
            createProduct('rohb-501-mat', 'estrich-boden', 'estrich-boden-sub', `ESTRICH | Trocken-Platten |**Varianten**`, 'ROHB-501-MAT', 48.46, 'qm', `Trocken-Platten |**Varianten**`, false, true, 1, 'optional'),
            createProduct('rohb-10004-basis', 'estrich-boden', 'estrich-boden-sub', `SICHTBETON-ESTRICH-BODEN | 🛠 Montage-Leistungspaket`, 'ROHB-10004-Basis', 139, 'qm', `🛠 Montage-Leistungspaket`, false, false, 1, 'service')
          ]
        }
      ]
    }
  ]
};

export const packageBoedenParkettVerlegung: RenovationPackage = {
  id: 'boedenParkettVerlegung',
  title: 'Parkett Verlegung',
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
            createProduct('bode-100-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `VERLEGUNG-Boden | 🛠 Montage-Leistungspaket`, 'BODE-100-BASIS', 19.9, 'qm', `🛠 Montage-Leistungspaket`, true, false, 100, 'service')
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
            createProduct('bode-100-1-op', 'extra-positionen', 'extra-positionen-sub', `ALT-BODEN |🛠 Demontage & Entsorgung`, 'BODE-100-1-OP', 15.79, 'qm', `🛠 Demontage & Entsorgung`, true, false, 100, 'extra')
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
            createProduct('par1501534-e28a', 'material', 'material-sub', `JOKA Classic KINGSTON 435 SB / DS 3.5 mm Fertigparkett 3-S m`, 'PAR1501534_E28A', 49.83, 'qm', `JOKA Classic KINGSTON 435 SB / DS 3.5 mm Fertigparkett 3-S m`, true, false, 110, 'material'),
            createProduct('1265921', 'material', 'material-sub', `RAW Sockelleiste MDF Cubus !Z weiß uni alle Dekore 2500x 16x 80 mm`, '1265921', 3.56, 'lfm', `RAW Sockelleiste MDF Cubus !Z weiß uni alle Dekore 2500x 16x 80 mm`, true, false, 110, 'material'),
            createProduct('287221', 'material', 'material-sub', `Geficell PE Basic Schaumdaemmbahn 5/1000 mm, 50 m/Ro = 50,00 qm, blau`, '287221', 2.14, 'qm', `Geficell PE Basic Schaumdaemmbahn 5/1000 mm, 50 m/Ro = 50,00 qm, blau`, true, false, 110, 'material'),
            createProduct('1098740', 'material', 'material-sub', `Prinz Alu-Uebergangsprofil - gel !Z 38 mm 100 cm lang Silber`, '1098740', 6.69, 'Stk', `Prinz Alu-Uebergangsprofil - gel !Z 38 mm 100 cm lang Silber`, true, false, 10, 'material')
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
            createProduct('uv816-00746', 'optionale-positionen', 'optionale-positionen-sub', `Gutjahr IndorTec THERM-E Komplettset TD 3-in-1 Elektro-Flächenheizung`, 'uv816-00746', 395.95, 'Stk', `Gutjahr IndorTec THERM-E Komplettset TD 3-in-1 Elektro-Flächenheizung`, false, true, 1, 'optional'),
            createProduct('bode-100-2-op', 'optionale-positionen', 'optionale-positionen-sub', `AUSGLEICH-Boden | max. 1 cm der Bodenfläche`, 'BODE-100-2-OP', 39.9, 'qm', `max. 1 cm der Bodenfläche`, false, true, 1, 'optional')
          ]
        }
      ]
    }
  ]
};

export const packageBoedenParkettAufbereiten: RenovationPackage = {
  id: 'boedenParkettAufbereiten',
  title: 'Parkett Aufbereiten',
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
          type: 'material',
          products: [
            createProduct('bode-100-op', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `AUFBEREITEN | Parkett schleifen & lackieren`, 'BODE-100-OP', 33.75, 'qm', `Parkett schleifen & lackieren`, true, false, 100, 'material')
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
            createProduct('bode-100-2-op', 'optionale-positionen', 'optionale-positionen-sub', `AUSGLEICH-Boden | max. 1 cm der Bodenfläche`, 'BODE-100-2-OP', 39.9, 'qm', `max. 1 cm der Bodenfläche`, false, true, 1, 'optional')
          ]
        }
      ]
    }
  ]
};

export const packageBoedenLaminatVerlegung: RenovationPackage = {
  id: 'boedenLaminatVerlegung',
  title: 'Laminat Verlegung',
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
            createProduct('bode-100-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `VERLEGUNG-Boden | 🛠 Montage-Leistungspaket`, 'BODE-100-BASIS', 19.9, 'qm', `🛠 Montage-Leistungspaket`, true, false, 100, 'service')
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
            createProduct('bode-100-1-op', 'extra-positionen', 'extra-positionen-sub', `ALT-BODEN |🛠 Demontage & Entsorgung`, 'BODE-100-1-OP', 15.79, 'qm', `🛠 Demontage & Entsorgung`, true, false, 100, 'extra')
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
            createProduct('1105594', 'material', 'material-sub', `Egger Laminat Classic 31 Stangl Buche EBL002 1292x192x7mm`, '1105594', 14.35, 'qm', `Egger Laminat Classic 31 Stangl Buche EBL002 1292x192x7mm`, true, false, 110, 'material'),
            createProduct('642888', 'material', 'material-sub', `Egger Sockelleiste 2400x 17x 60mm Leiste zu EBL002 L131`, '642888', 3.49, 'lfm', `Egger Sockelleiste 2400x 17x 60mm Leiste zu EBL002 L131`, true, false, 110, 'material'),
            createProduct('287221', 'material', 'material-sub', `Geficell PE Basic Schaumdaemmbahn 5/1000 mm, 50 m/Ro = 50,00 qm, blau`, '287221', 2.14, 'qm', `Geficell PE Basic Schaumdaemmbahn 5/1000 mm, 50 m/Ro = 50,00 qm, blau`, true, false, 110, 'material'),
            createProduct('1098740', 'material', 'material-sub', `Prinz Alu-Uebergangsprofil - gel !Z 38 mm 100 cm lang Silber`, '1098740', 6.69, 'Stk', `Prinz Alu-Uebergangsprofil - gel !Z 38 mm 100 cm lang Silber`, true, false, 10, 'material')
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
            createProduct('uv816-00746', 'optionale-positionen', 'optionale-positionen-sub', `Gutjahr IndorTec THERM-E Komplettset TD 3-in-1 Elektro-Flächenheizung`, 'uv816-00746', 395.95, 'Stk', `Gutjahr IndorTec THERM-E Komplettset TD 3-in-1 Elektro-Flächenheizung`, false, true, 1, 'optional'),
            createProduct('bode-100-2-op', 'optionale-positionen', 'optionale-positionen-sub', `AUSGLEICH-Boden | max. 1 cm der Bodenfläche`, 'BODE-100-2-OP', 39.9, 'qm', `max. 1 cm der Bodenfläche`, false, true, 1, 'optional')
          ]
        }
      ]
    }
  ]
};

export const packageBoedenFliesenVerlegung: RenovationPackage = {
  id: 'boedenFliesenVerlegung',
  title: 'Fliesen Verlegung',
  defaultArea: 100,
  defaultFloorCount: 1,
  categories: [
    {
      id: 'fliesen-boden',
      title: 'FLIESEN-BODEN',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'fliesen-boden-sub',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('bode-400-basis', 'fliesen-boden', 'fliesen-boden-sub', `BODENFLIESEN | 🛠 Montage-Leistungspaket`, 'BODE-400-BASIS', 59.9, 'qm', `🛠 Montage-Leistungspaket`, true, false, 100, 'service')
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
            createProduct('1209835', 'material', 'material-sub', `*V&B 80x 80x 0,9 2835BZ1001 Pure Base !Z creme matt ugl. FS R10/B rekt. #1209834`, '1209835', 46.2, 'qm', `*V&B 80x 80x 0,9 2835BZ1001 Pure Base !Z creme matt ugl. FS R10/B rekt. #1209834`, true, false, 110, 'material'),
            createProduct('662445', 'material', 'material-sub', `V&B 7,5x 60 2872RU200 My Earth Sockel beige multicolor ugl. FS`, '662445', 14.53, 'qm', `V&B 7,5x 60 2872RU200 My Earth Sockel beige multicolor ugl. FS`, true, false, 110, 'material'),
            createProduct('uv867-00298', 'material', 'material-sub', `Ottoseal S 110 Premium Neutral Silicon`, 'uv867-00298', 8.79, 'Stk', `Ottoseal S 110 Premium Neutral Silicon`, true, false, 10, 'material')
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
            createProduct('bode-100-2-op', 'optionale-positionen', 'optionale-positionen-sub', `AUSGLEICH-Boden | max. 1 cm der Bodenfläche`, 'BODE-100-2-OP', 39.9, 'qm', `max. 1 cm der Bodenfläche`, false, true, 1, 'optional')
          ]
        }
      ]
    }
  ]
};

export const packageBoedenSockelleisten: RenovationPackage = {
  id: 'boedenSockelleisten',
  title: 'Sockelleisten Verlegung',
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
            createProduct('bode-10002-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `SOCKELLEISTEN | 🛠 Montage-Leistungspaket`, 'BODE-10002-Basis', 4.95, 'lfm', `🛠 Montage-Leistungspaket`, true, false, 100, 'service')
          ]
        }
      ]
    }
  ]
};

export const packageBoedenKorkboden: RenovationPackage = {
  id: 'boedenKorkboden',
  title: 'Korkboden Verlegung',
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
            createProduct('bode-201-op', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `VERKLEBTE BODENVERLEGUNG | 🛠 Montage-Leistungspaket`, 'BODE-201-OP', 29.9, 'qm', `🛠 Montage-Leistungspaket`, true, false, 100, 'service')
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
            createProduct('bode-100-1-op', 'extra-positionen', 'extra-positionen-sub', `ALT-BODEN |🛠 Demontage & Entsorgung`, 'BODE-100-1-OP', 15.79, 'qm', `🛠 Demontage & Entsorgung`, true, false, 100, 'extra')
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
            createProduct('763-00785', 'material', 'material-sub', `Ziro Kork Korkboden natur KF | Harmony roh 5 mm | Kurzdiele`, '763-00785', 41.91, 'Stk', `Harmony roh 5 mm | Kurzdiele`, true, false, 110, 'material'),
            createProduct('1098740', 'material', 'material-sub', `Prinz Alu-Uebergangsprofil - gel !Z 38 mm 100 cm lang Silber`, '1098740', 6.69, 'Stk', `Prinz Alu-Uebergangsprofil - gel !Z 38 mm 100 cm lang Silber`, true, false, 10, 'material')
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
            createProduct('uv816-00746', 'optionale-positionen', 'optionale-positionen-sub', `Gutjahr IndorTec THERM-E Komplettset TD 3-in-1 Elektro-Flächenheizung`, 'uv816-00746', 395.95, 'Stk', `Gutjahr IndorTec THERM-E Komplettset TD 3-in-1 Elektro-Flächenheizung`, false, true, 1, 'optional'),
            createProduct('bode-100-2-op', 'optionale-positionen', 'optionale-positionen-sub', `AUSGLEICH-Boden | max. 1 cm der Bodenfläche`, 'BODE-100-2-OP', 39.9, 'qm', `max. 1 cm der Bodenfläche`, false, true, 1, 'optional')
          ]
        }
      ]
    }
  ]
};

export const packageBoedenVinyl: RenovationPackage = {
  id: 'boedenVinyl',
  title: 'Vinyl o. Linoleum Verlegung',
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
            createProduct('bode-201-op', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `VERKLEBTE BODENVERLEGUNG | 🛠 Montage-Leistungspaket`, 'BODE-201-OP', 29.9, 'qm', `🛠 Montage-Leistungspaket`, true, false, 100, 'service')
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
            createProduct('bode-100-1-op', 'extra-positionen', 'extra-positionen-sub', `ALT-BODEN |🛠 Demontage & Entsorgung`, 'BODE-100-1-OP', 15.79, 'qm', `🛠 Demontage & Entsorgung`, true, false, 100, 'extra')
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
            createProduct('lvtdes230-4254', 'material', 'material-sub', `DESIGN 230 HDF 9,6mm/32er JOKA Classic Designböden230 HDF!`, 'LVTDES230_4254', 45.67, 'qm', `DESIGN 230 HDF 9,6mm/32er JOKA Classic Designböden230 HDF!`, true, false, 110, 'material'),
            createProduct('1098740', 'material', 'material-sub', `Prinz Alu-Uebergangsprofil - gel !Z 38 mm 100 cm lang Silber`, '1098740', 6.69, 'Stk', `Prinz Alu-Uebergangsprofil - gel !Z 38 mm 100 cm lang Silber`, true, false, 10, 'material')
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
            createProduct('763-10094', 'optionale-positionen', 'optionale-positionen-sub', `Ziro Lino-klick Linoleumboden HDF | 620x450x10 mm | Velluto Kurzdiele`, '763-10094', 55, 'Stk', `620x450x10 mm | Velluto Kurzdiele`, false, true, 1, 'optional'),
            createProduct('uv816-00746', 'optionale-positionen', 'optionale-positionen-sub', `Gutjahr IndorTec THERM-E Komplettset TD 3-in-1 Elektro-Flächenheizung`, 'uv816-00746', 395.95, 'Stk', `Gutjahr IndorTec THERM-E Komplettset TD 3-in-1 Elektro-Flächenheizung`, false, true, 1, 'optional'),
            createProduct('bode-100-2-op', 'optionale-positionen', 'optionale-positionen-sub', `AUSGLEICH-Boden | max. 1 cm der Bodenfläche`, 'BODE-100-2-OP', 39.9, 'qm', `max. 1 cm der Bodenfläche`, false, true, 1, 'optional')
          ]
        }
      ]
    }
  ]
};

export const packageBoedenEstrichplatten: RenovationPackage = {
  id: 'boedenEstrichplatten',
  title: 'Estrichplatten Verlegung',
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
            createProduct('rohb-501-1-op', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `ALT-ESTRICH |🛠 Demontage & Entsorgung`, 'ROHB-501-1-OP', 45.89, 'qm', `🛠 Demontage & Entsorgung`, false, false, 1, 'service')
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
            createProduct('204-00073', 'extra-positionen', 'extra-positionen-sub', `Fermacell Schnellbauschrauben für Estrichelemente 3,9x19 mm, 1000 Stück`, '204-00073', 21.89, 'Stk', `Fermacell Schnellbauschrauben für Estrichelemente 3,9x19 mm, 1000 Stück`, true, false, 2, 'extra')
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
            createProduct('rohb-501-2-op', 'optionale-positionen', 'optionale-positionen-sub', `Ausgleichsschüttung Herstellen (bis 3 cm)`, 'ROHB-501-2-OP', 11.68, 'qm', `Ausgleichsschüttung Herstellen (bis 3 cm)`, true, true, 1, 'optional'),
            createProduct('204-85', 'optionale-positionen', 'optionale-positionen-sub', `Fermacell Wabenschüttung - 15 Liter Sack`, '204-85', 9.24, 'Stk', `Fermacell Wabenschüttung - 15 Liter Sack`, false, true, 1, 'optional'),
            createProduct('204-00088', 'optionale-positionen', 'optionale-positionen-sub', `Fermacell Wärmedämmschüttung - 100 Liter Sack`, '204-00088', 25.85, 'Stk', `Fermacell Wärmedämmschüttung - 100 Liter Sack`, false, true, 1, 'optional'),
            createProduct('204-00086', 'optionale-positionen', 'optionale-positionen-sub', `Fermacell Estrich-Wabe 1.500x1.000 mm, Dicke 30 mm`, '204-00086', 15.84, 'Stk', `Fermacell Estrich-Wabe 1.500x1.000 mm, Dicke 30 mm`, false, true, 1, 'optional')
          ]
        }
      ]
    }
  ]
};

export const packageBoedenSichtestrich: RenovationPackage = {
  id: 'boedenSichtestrich',
  title: 'Sichtestrich Verlegung',
  defaultArea: 100,
  defaultFloorCount: 1,
  categories: [
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
            createProduct('bode-100-2-op', 'optionale-positionen', 'optionale-positionen-sub', `-`, 'BODE-100-2-OP', 0, '-', `-`, false, true, 1, 'optional'),
            createProduct('rohb-501-mat', 'optionale-positionen', 'optionale-positionen-sub', `-`, 'ROHB-501-MAT', 0, '-', `-`, true, true, 100, 'optional'),
            createProduct('rohb-501-1-op', 'optionale-positionen', 'optionale-positionen-sub', `-`, 'ROHB-501-1-OP', 0, '-', `-`, true, true, 100, 'optional'),
            createProduct('rohb-501-2-op', 'optionale-positionen', 'optionale-positionen-sub', `-`, 'ROHB-501-2-OP', 0, '-', `-`, false, true, 1, 'optional'),
            createProduct('bode-701-mat', 'optionale-positionen', 'optionale-positionen-sub', `-`, 'BODE-701-MAT', 0, '-', `-`, false, true, 1, 'optional'),
            createProduct('v520-00029', 'optionale-positionen', 'optionale-positionen-sub', `-`, 'v520-00029', 0, '-', `-`, false, true, 1, 'optional'),
            createProduct('bode-100-1-op', 'optionale-positionen', 'optionale-positionen-sub', `-`, 'BODE-100-1-OP', 0, '-', `-`, false, true, 1, 'optional')
          ]
        }
      ]
    }
  ]
};

export const packageBoedenTeppich: RenovationPackage = {
  id: 'boedenTeppich',
  title: 'Teppich Verlegung',
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
            createProduct('bode-10001-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `VERLEGUNG TEPPICH | 🛠 Montage-Leistungspaket`, 'BODE-10001-Basis', 17.9, 'qm', `🛠 Montage-Leistungspaket`, true, false, 100, 'service')
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
            createProduct('tepnafjtp2-310', 'material', 'material-sub', `JOKAVLIES TITAN PLUS 200cm Atelier 2020`, 'TEPNAFJTP2_310', 14.89, 'qm', `JOKAVLIES TITAN PLUS 200cm Atelier 2020`, true, false, 110, 'material'),
            createProduct('1098740', 'material', 'material-sub', `Prinz Alu-Uebergangsprofil - gel !Z 38 mm 100 cm lang Silber`, '1098740', 6.69, 'Stk', `Prinz Alu-Uebergangsprofil - gel !Z 38 mm 100 cm lang Silber`, true, false, 10, 'material')
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
            createProduct('bode-100-1-op', 'extra-positionen', 'extra-positionen-sub', `ALT-BODEN |🛠 Demontage & Entsorgung`, 'BODE-100-1-OP', 15.79, 'qm', `🛠 Demontage & Entsorgung`, true, false, 100, 'extra')
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
            createProduct('uv816-00746', 'optionale-positionen', 'optionale-positionen-sub', `Gutjahr IndorTec THERM-E Komplettset TD 3-in-1 Elektro-Flächenheizung`, 'uv816-00746', 395.95, 'Stk', `Gutjahr IndorTec THERM-E Komplettset TD 3-in-1 Elektro-Flächenheizung`, false, true, 1, 'optional'),
            createProduct('bode-100-2-op', 'optionale-positionen', 'optionale-positionen-sub', `AUSGLEICH-Boden | max. 1 cm der Bodenfläche`, 'BODE-100-2-OP', 39.9, 'qm', `max. 1 cm der Bodenfläche`, false, true, 1, 'optional')
          ]
        }
      ]
    }
  ]
};
