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

export const packageFassadeAlles: RenovationPackage = {
  id: 'fassadeAlles',
  title: 'Alles zu Fassade',
  defaultArea: 100,
  defaultFloorCount: 1,
  categories: [
    {
      id: 'daemmung-fassade',
      title: 'DÄMMUNG - Fassade',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'daemmung-fassade-sub',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('fass-100-basis', 'daemmung-fassade', 'daemmung-fassade-sub', `FASSADEN Dämmung WDVS | 🛠 Montage-Leistungspaket`, 'FASS-100-BASIS', 59, 'qm', `🛠 Montage-Leistungspaket`, false, false, 1, 'service')
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
            createProduct('uv868-00626', 'material', 'material-sub', `weber.therm MW 035 Fassade Mineralwoll-Dämmplatte - 140 mm`, 'uv868-00626', 30.48, 'Stk', `weber.therm MW 035 Fassade Mineralwoll-Dämmplatte - 140 mm`, false, false, 1, 'material'),
            createProduct('fass-401-mat', 'material', 'material-sub', `VERKLEIDUNG | Fassade aus Lärchen-Holz |**Varianten**`, 'FASS-401-MAT', 97.96, 'qm', `Fassade aus Lärchen-Holz |**Varianten**`, false, true, 1, 'optional'),
            createProduct('744-10030', 'material', 'material-sub', `Terca Klinker KMz 28-2,4-DF voll KK1 rotbunt glatt`, '744-10030', 2.42, 'Stk', `Terca Klinker KMz 28-2,4-DF voll KK1 rotbunt glatt`, false, false, 1, 'material'),
            createProduct('uv633-00009', 'material', 'material-sub', `Stebah Fugenmörtel - 25 Kg - Hellgrau`, 'uv633-00009', 23.3, 'Sack', `Stebah Fugenmörtel - 25 Kg - Hellgrau`, false, false, 1, 'material'),
            createProduct('466-20089', 'material', 'material-sub', `Metten Naturstein Mauersystem ARTIC GRANIT Hellgrau gestockt 40x20x15 cm`, '466-20089', 18.92, 'Stk', `Metten Naturstein Mauersystem ARTIC GRANIT Hellgrau gestockt 40x20x15 cm`, false, false, 1, 'material'),
            createProduct('737-00359', 'material', 'material-sub', `De Ryck Steinriemchen Granulit G52 | 21x1,5x6 cm`, '737-00359', 59.62, 'Stk', `21x1,5x6 cm`, false, false, 1, 'material'),
            createProduct('uv737-00378', 'material', 'material-sub', `De Ryck Imprägnierung Kanister`, 'uv737-00378', 24.01, 'Stk', `De Ryck Imprägnierung Kanister`, false, false, 1, 'material'),
            createProduct('031-00032', 'material', 'material-sub', `1A BAUCHEMIE Wand- und Bodenspachtel 50S - 25 Kg Spachtelmasse für innen & außen`, '031-00032', 38.39, 'Stk', `1A BAUCHEMIE Wand- und Bodenspachtel 50S - 25 Kg Spachtelmasse für innen & außen`, false, false, 1, 'material'),
            createProduct('uv31-00018-3', 'material', 'material-sub', `1A BAUCHEMIE T-FLEX TE C2 Flex Klebemörtel für keramische Wand- und Bodenbeläge im Innen- und Außenbereich grau`, 'uv31-00018', 19.73, 'Sack', `1A BAUCHEMIE T-FLEX TE C2 Flex Klebemörtel für keramische Wand- und Bodenbeläge im Innen- und Außenbereich grau`, false, false, 1, 'material'),
            createProduct('uv31-00012', 'material', 'material-sub', `1A BAUCHEMIE universal Fertig Grundierung für saugende Untergründe innen & außen Boden & Wand`, 'uv31-00012', 39.58, 'Geb', `1A BAUCHEMIE universal Fertig Grundierung für saugende Untergründe innen & außen Boden & Wand`, false, false, 1, 'material'),
            createProduct('mat-anfrage', 'material', 'material-sub', `AUF ANFRAGE & BEMUSTERUNG DER MATERIALIEN`, 'MAT-Anfrage', 0, 'Stk', `AUF ANFRAGE & BEMUSTERUNG DER MATERIALIEN`, false, false, 1, 'material'),
            createProduct('mat-anfrage-2', 'material', 'material-sub', `AUF ANFRAGE & BEMUSTERUNG DER MATERIALIEN`, 'MAT-Anfrage', 0, 'Stk', `AUF ANFRAGE & BEMUSTERUNG DER MATERIALIEN`, false, false, 1, 'material')
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
            createProduct('868-00365', 'extra-positionen', 'extra-positionen-sub', `weber.therm 302 Klebe- und Armierungsmötel leicht naturweiss, 25 Kg`, '868-00365', 23.1, 'Stk', `weber.therm 302 Klebe- und Armierungsmötel leicht naturweiss, 25 Kg`, false, false, 1, 'extra'),
            createProduct('uv868-00877', 'extra-positionen', 'extra-positionen-sub', `weber.top 203 AquaBalance Edelkratzputz fein mit Glimmer 25 Kg`, 'uv868-00877', 19.73, 'Stk', `weber.top 203 AquaBalance Edelkratzputz fein mit Glimmer 25 Kg`, false, false, 1, 'extra'),
            createProduct('868-00188', 'extra-positionen', 'extra-positionen-sub', `weber.therm 310 Armierungsgewebe 8x8mm - 1,1x50 m`, '868-00188', 91.52, 'Stk', `weber.therm 310 Armierungsgewebe 8x8mm - 1,1x50 m`, false, false, 1, 'extra'),
            createProduct('868-00413', 'extra-positionen', 'extra-positionen-sub', `weber.therm Dübelteller DT 140`, '868-00413', 53.79, 'Stk', `weber.therm Dübelteller DT 140`, false, false, 1, 'extra'),
            createProduct('uv868-00282', 'extra-positionen', 'extra-positionen-sub', `Weber Gewebe-Abschlussprofil`, 'uv868-00282', 27.28, 'Stk', `Weber Gewebe-Abschlussprofil`, false, false, 1, 'extra'),
            createProduct('uv868-00722', 'extra-positionen', 'extra-positionen-sub', `weber.therm Sockelabschlussprofil W61-1 KU`, 'uv868-00722', 13.7, 'Stk', `weber.therm Sockelabschlussprofil W61-1 KU`, false, false, 1, 'extra'),
            createProduct('uv31-00018', 'extra-positionen', 'extra-positionen-sub', `1A BAUCHEMIE T-FLEX TE C2 Flex Klebemörtel für keramische Wand- und Bodenbeläge im Innen- und Außenbereich grau`, 'uv31-00018', 19.73, 'Sack', `1A BAUCHEMIE T-FLEX TE C2 Flex Klebemörtel für keramische Wand- und Bodenbeläge im Innen- und Außenbereich grau`, false, false, 1, 'extra'),
            createProduct('uv633-00009-2', 'extra-positionen', 'extra-positionen-sub', `Stebah Fugenmörtel - 25 Kg - Hellgrau`, 'uv633-00009', 23.3, 'Sack', `Stebah Fugenmörtel - 25 Kg - Hellgrau`, false, false, 1, 'extra'),
            createProduct('uv31-00018-2', 'extra-positionen', 'extra-positionen-sub', `1A BAUCHEMIE T-FLEX TE C2 Flex Klebemörtel für keramische Wand- und Bodenbeläge im Innen- und Außenbereich grau`, 'uv31-00018', 19.73, 'Sack', `1A BAUCHEMIE T-FLEX TE C2 Flex Klebemörtel für keramische Wand- und Bodenbeläge im Innen- und Außenbereich grau`, false, false, 1, 'extra')
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
            createProduct('abbd-101-1-mat', 'optionale-positionen', 'optionale-positionen-sub', `PERIMETERDÄMMUNG Abdichtung | 🛠 Montage-Leistungspaket`, 'ABBD-101.1-MAT', 249, 'qm', `🛠 Montage-Leistungspaket`, false, true, 1, 'optional'),
            createProduct('uv868-00421', 'optionale-positionen', 'optionale-positionen-sub', `weber.therm EPS 032 Sockel standard Polystyrol Perimeter-Dämmplatte`, 'uv868-00421', 22.62, 'Stk', `weber.therm EPS 032 Sockel standard Polystyrol Perimeter-Dämmplatte`, false, true, 1, 'optional'),
            createProduct('fass-100-au', 'optionale-positionen', 'optionale-positionen-sub', `Weitere Produkte - zu FASSADE |**Varianten**`, 'FASS-100-AU', 0, 'Stk', `**Varianten**`, false, true, 1, 'optional'),
            createProduct('229-00258', 'optionale-positionen', 'optionale-positionen-sub', `Gala-Lusit Cremona Landhausmauer Mauersysteme Mischformat, 12,5 cm Dicke - Sahara-Weiß Melange`, '229-00258', 177.1, 'Stk', `Gala-Lusit Cremona Landhausmauer Mauersysteme Mischformat, 12,5 cm Dicke - Sahara-Weiß Melange`, false, true, 1, 'optional'),
            createProduct('uv229-00499', 'optionale-positionen', 'optionale-positionen-sub', `Gala-Lusit Spaltino Mauerblock - Gelbsand-Melange ohne Fase`, 'uv229-00499', 23.85, 'Stk', `Gala-Lusit Spaltino Mauerblock - Gelbsand-Melange ohne Fase`, false, true, 1, 'optional'),
            createProduct('uv13-00223', 'optionale-positionen', 'optionale-positionen-sub', `Austrotherm XPS Plus P GK Dämmplatte 1250 x 600 mm`, 'uv13-00223', 17.71, 'qm', `Austrotherm XPS Plus P GK Dämmplatte 1250 x 600 mm`, false, true, 1, 'optional')
          ]
        }
      ]
    },
    {
      id: 'holz-fassaden-verkleidung',
      title: 'HOLZ - Fassaden Verkleidung',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'holz-fassaden-verkleidung-sub',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('fass-300-basis', 'holz-fassaden-verkleidung', 'holz-fassaden-verkleidung-sub', `FASSADEN Verkleidung | 🛠 Montage-Leistungspaket`, 'FASS-300-BASIS', 49, 'qm', `🛠 Montage-Leistungspaket`, false, false, 1, 'service')
          ]
        }
      ]
    },
    {
      id: 'verblendmauerwerk-fassaden-verkleidung',
      title: 'VERBLENDMAUERWERK - Fassaden Verkleidung',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'verblendmauerwerk-fassaden-verkleidung-sub',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('fass-10012', 'verblendmauerwerk-fassaden-verkleidung', 'verblendmauerwerk-fassaden-verkleidung-sub', `VERBLENDMAUERWERK | 🛠 Montage`, 'FASS-10012', 149, 'qm', `🛠 Montage`, false, false, 1, 'service')
          ]
        }
      ]
    },
    {
      id: 'naturstein-fassaden-verkleidung',
      title: 'NATURSTEIN- Fassaden Verkleidung',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'naturstein-fassaden-verkleidung-sub',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('fass-10007', 'naturstein-fassaden-verkleidung', 'naturstein-fassaden-verkleidung-sub', `NATURSTEIN | 🛠 Montage`, 'FASS-10007', 69, 'qm', `🛠 Montage`, false, false, 1, 'service')
          ]
        }
      ]
    },
    {
      id: 'klinkerriemchen-fassaden-verkleidung',
      title: 'KLINKERRIEMCHEN - Fassaden Verkleidung',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'klinkerriemchen-fassaden-verkleidung-sub',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('fass-10001', 'klinkerriemchen-fassaden-verkleidung', 'klinkerriemchen-fassaden-verkleidung-sub', `KLINKERRIEMCHEN | 🛠 Montage`, 'FASS-10001', 49, 'qm', `🛠 Montage`, false, false, 1, 'service')
          ]
        }
      ]
    },
    {
      id: 'vorhangfassade',
      title: 'VORHANGFASSADE',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'vorhangfassade-sub',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('fass-10009', 'vorhangfassade', 'vorhangfassade-sub', `VORHANGFASSADE | 🛠 Montage`, 'FASS-10009', 159, 'qm', `🛠 Montage`, false, false, 1, 'service')
          ]
        }
      ]
    },
    {
      id: 'plattenverkleidung',
      title: 'PLATTENVERKLEIDUNG',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'plattenverkleidung-sub',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('fass-10010', 'plattenverkleidung', 'plattenverkleidung-sub', `FASSADENVERKLEIDUNG MIT GLASPLATTEN | 🛠 Montage`, 'FASS-10010', 69, 'qm', `🛠 Montage`, false, false, 1, 'service')
          ]
        }
      ]
    }
  ]
};

export const packageFassadeDaemmung: RenovationPackage = {
  id: 'fassadeDaemmung',
  title: 'Dämmung & Anstrich',
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
            createProduct('fass-100-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `FASSADEN Dämmung WDVS | 🛠 Montage-Leistungspaket`, 'FASS-100-BASIS', 59, 'qm', `🛠 Montage-Leistungspaket`, true, false, 100, 'service')
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
            createProduct('uv868-00626', 'material', 'material-sub', `weber.therm MW 035 Fassade Mineralwoll-Dämmplatte - 140 mm`, 'uv868-00626', 30.48, 'Stk', `weber.therm MW 035 Fassade Mineralwoll-Dämmplatte - 140 mm`, true, false, 110, 'material')
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
            createProduct('868-00365', 'extra-positionen', 'extra-positionen-sub', `weber.therm 302 Klebe- und Armierungsmötel leicht naturweiss, 25 Kg`, '868-00365', 23.1, 'Stk', `weber.therm 302 Klebe- und Armierungsmötel leicht naturweiss, 25 Kg`, true, false, 50, 'extra'),
            createProduct('uv868-00877', 'extra-positionen', 'extra-positionen-sub', `weber.top 203 AquaBalance Edelkratzputz fein mit Glimmer 25 Kg`, 'uv868-00877', 19.73, 'Stk', `weber.top 203 AquaBalance Edelkratzputz fein mit Glimmer 25 Kg`, true, false, 72, 'extra'),
            createProduct('868-00188', 'extra-positionen', 'extra-positionen-sub', `weber.therm 310 Armierungsgewebe 8x8mm - 1,1x50 m`, '868-00188', 91.52, 'Stk', `weber.therm 310 Armierungsgewebe 8x8mm - 1,1x50 m`, true, false, 2, 'extra'),
            createProduct('868-00413', 'extra-positionen', 'extra-positionen-sub', `weber.therm Dübelteller DT 140`, '868-00413', 53.79, 'Stk', `weber.therm Dübelteller DT 140`, true, false, 4, 'extra'),
            createProduct('uv868-00282', 'extra-positionen', 'extra-positionen-sub', `Weber Gewebe-Abschlussprofil`, 'uv868-00282', 27.28, 'Stk', `Weber Gewebe-Abschlussprofil`, true, false, 20, 'extra'),
            createProduct('uv868-00722', 'extra-positionen', 'extra-positionen-sub', `weber.therm Sockelabschlussprofil W61-1 KU`, 'uv868-00722', 13.7, 'Stk', `weber.therm Sockelabschlussprofil W61-1 KU`, true, false, 20, 'extra')
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
            createProduct('abbd-101-1-mat', 'optionale-positionen', 'optionale-positionen-sub', `PERIMETERDÄMMUNG Abdichtung | 🛠 Montage-Leistungspaket`, 'ABBD-101.1-MAT', 249, 'qm', `🛠 Montage-Leistungspaket`, false, true, 1, 'optional'),
            createProduct('uv868-00421', 'optionale-positionen', 'optionale-positionen-sub', `weber.therm EPS 032 Sockel standard Polystyrol Perimeter-Dämmplatte`, 'uv868-00421', 22.62, 'Stk', `weber.therm EPS 032 Sockel standard Polystyrol Perimeter-Dämmplatte`, false, true, 1, 'optional'),
            createProduct('fass-100-au', 'optionale-positionen', 'optionale-positionen-sub', `Weitere Produkte - zu FASSADE |**Varianten**`, 'FASS-100-AU', 0, 'Stk', `**Varianten**`, false, true, 1, 'optional')
          ]
        }
      ]
    }
  ]
};

export const packageFassadeAnstrich: RenovationPackage = {
  id: 'fassadeAnstrich',
  title: 'Anstrich',
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
            createProduct('fass-200-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `FASSADEN Anstrich | 🛠 Montage-Leistungspaket`, 'FASS-200-BASIS', 39, 'qm', `🛠 Montage-Leistungspaket`, true, false, 1, 'service')
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
            createProduct('uv868-00943', 'material', 'material-sub', `weber.ton 410 AquaBalance Silikatfarbe aussen`, 'uv868-00943', 159.5, 'Stk', `weber.ton 410 AquaBalance Silikatfarbe aussen`, true, false, 2, 'material')
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
            createProduct('fass-100-2-zu', 'extra-positionen', 'extra-positionen-sub', `FASSADENGERÜST STELLEN | 🛠 Zusatz-Montage`, 'FASS-100-2-ZU', 26.95, 'qm', `🛠 Zusatz-Montage`, true, false, 1, 'extra')
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
            createProduct('fass-100-2-op', 'optionale-positionen', 'optionale-positionen-sub', `ALT-FARBE | abkratzen`, 'FASS-100-2-OP', 5.09, 'qm', `abkratzen`, false, true, 1, 'optional'),
            createProduct('fass-100-au', 'optionale-positionen', 'optionale-positionen-sub', `Weitere Produkte - zu FASSADE |**Varianten**`, 'FASS-100-AU', 0, 'Stk', `**Varianten**`, false, true, 1, 'optional')
          ]
        }
      ]
    }
  ]
};

export const packageFassadeHolzverkleidung: RenovationPackage = {
  id: 'fassadeHolzverkleidung',
  title: 'Holzverkleidung',
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
            createProduct('fass-300-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `FASSADEN Verkleidung | 🛠 Montage-Leistungspaket`, 'FASS-300-BASIS', 49, 'qm', `🛠 Montage-Leistungspaket`, true, false, 1, 'service')
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
            createProduct('fass-401-mat', 'material', 'material-sub', `VERKLEIDUNG | Fassade aus Lärchen-Holz |**Varianten**`, 'FASS-401-MAT', 97.96, 'qm', `Fassade aus Lärchen-Holz |**Varianten**`, true, true, 1, 'optional')
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
            createProduct('fass-100-2-zu', 'extra-positionen', 'extra-positionen-sub', `FASSADENGERÜST STELLEN | 🛠 Zusatz-Montage`, 'FASS-100-2-ZU', 26.95, 'qm', `🛠 Zusatz-Montage`, true, false, 1, 'extra')
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
            createProduct('fass-100-2-op', 'optionale-positionen', 'optionale-positionen-sub', `ALT-FARBE | abkratzen`, 'FASS-100-2-OP', 5.09, 'qm', `abkratzen`, false, true, 1, 'optional'),
            createProduct('fass-100-au', 'optionale-positionen', 'optionale-positionen-sub', `Weitere Produkte - zu FASSADE |**Varianten**`, 'FASS-100-AU', 0, 'Stk', `**Varianten**`, false, true, 1, 'optional')
          ]
        }
      ]
    }
  ]
};

export const packageFassadeSockeldaemmung: RenovationPackage = {
  id: 'fassadeSockeldaemmung',
  title: 'Sockeldämmung',
  defaultArea: 50,
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
            createProduct('fass-10006', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `FASSADENVERKLEIDUNG | 🛠 Montage`, 'FASS-10006', 69, 'qm', `🛠 Montage`, true, false, 20, 'service')
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
            createProduct('uv13-00223', 'material', 'material-sub', `Austrotherm XPS Plus P GK Dämmplatte 1250 x 600 mm`, 'uv13-00223', 17.71, 'qm', `Austrotherm XPS Plus P GK Dämmplatte 1250 x 600 mm`, true, false, 22, 'material'),
            createProduct('031-00032', 'material', 'material-sub', `1A BAUCHEMIE Wand- und Bodenspachtel 50S - 25 Kg Spachtelmasse für innen & außen`, '031-00032', 38.39, 'Stk', `1A BAUCHEMIE Wand- und Bodenspachtel 50S - 25 Kg Spachtelmasse für innen & außen`, true, false, 1, 'material'),
            createProduct('uv31-00018', 'material', 'material-sub', `1A BAUCHEMIE T-FLEX TE C2 Flex Klebemörtel für keramische Wand- und Bodenbeläge im Innen- und Außenbereich grau`, 'uv31-00018', 19.73, 'Sack', `1A BAUCHEMIE T-FLEX TE C2 Flex Klebemörtel für keramische Wand- und Bodenbeläge im Innen- und Außenbereich grau`, true, false, 2, 'material'),
            createProduct('uv31-00012', 'material', 'material-sub', `1A BAUCHEMIE universal Fertig Grundierung für saugende Untergründe innen & außen Boden & Wand`, 'uv31-00012', 39.58, 'Geb', `1A BAUCHEMIE universal Fertig Grundierung für saugende Untergründe innen & außen Boden & Wand`, true, false, 1, 'material')
          ]
        }
      ]
    }
  ]
};

export const packageFassadeKlinkerSteinriemchen: RenovationPackage = {
  id: 'fassadeKlinkerSteinriemchen',
  title: 'Klinkerriemchen',
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
            createProduct('fass-10001', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `KLINKERRIEMCHEN | 🛠 Montage`, 'FASS-10001', 49, 'qm', `🛠 Montage`, true, false, 20, 'service')
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
            createProduct('737-00359', 'material', 'material-sub', `De Ryck Steinriemchen Granulit G52 | 21x1,5x6 cm`, '737-00359', 59.62, 'Stk', `21x1,5x6 cm`, true, false, 22, 'material'),
            createProduct('uv737-00378', 'material', 'material-sub', `De Ryck Imprägnierung Kanister`, 'uv737-00378', 24.01, 'Stk', `De Ryck Imprägnierung Kanister`, true, false, 1, 'material'),
            createProduct('031-00032', 'material', 'material-sub', `1A BAUCHEMIE Wand- und Bodenspachtel 50S - 25 Kg Spachtelmasse für innen & außen`, '031-00032', 38.39, 'Stk', `1A BAUCHEMIE Wand- und Bodenspachtel 50S - 25 Kg Spachtelmasse für innen & außen`, true, false, 1, 'material'),
            createProduct('uv31-00018', 'material', 'material-sub', `1A BAUCHEMIE T-FLEX TE C2 Flex Klebemörtel für keramische Wand- und Bodenbeläge im Innen- und Außenbereich grau`, 'uv31-00018', 19.73, 'Sack', `1A BAUCHEMIE T-FLEX TE C2 Flex Klebemörtel für keramische Wand- und Bodenbeläge im Innen- und Außenbereich grau`, true, false, 2, 'material'),
            createProduct('uv31-00012', 'material', 'material-sub', `1A BAUCHEMIE universal Fertig Grundierung für saugende Untergründe innen & außen Boden & Wand`, 'uv31-00012', 39.58, 'Geb', `1A BAUCHEMIE universal Fertig Grundierung für saugende Untergründe innen & außen Boden & Wand`, true, false, 1, 'material')
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
            createProduct('uv13-00223', 'optionale-positionen', 'optionale-positionen-sub', `Austrotherm XPS Plus P GK Dämmplatte 1250 x 600 mm`, 'uv13-00223', 17.71, 'qm', `Austrotherm XPS Plus P GK Dämmplatte 1250 x 600 mm`, false, true, 1, 'optional')
          ]
        }
      ]
    }
  ]
};

export const packageFassadePlattenverkleidung: RenovationPackage = {
  id: 'fassadePlattenverkleidung',
  title: 'Plattenverkleidung',
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
            createProduct('fass-10010', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `FASSADENVERKLEIDUNG MIT GLASPLATTEN | 🛠 Montage`, 'FASS-10010', 69, 'qm', `🛠 Montage`, true, false, 1, 'service')
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
            createProduct('mat-anfrage', 'material', 'material-sub', `AUF ANFRAGE & BEMUSTERUNG DER MATERIALIEN`, 'MAT-Anfrage', 0, 'Stk', `AUF ANFRAGE & BEMUSTERUNG DER MATERIALIEN`, false, false, 1, 'material')
          ]
        }
      ]
    }
  ]
};

export const packageFassadeNatursteinverkleidung: RenovationPackage = {
  id: 'fassadeNatursteinverkleidung',
  title: 'Naturstein',
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
            createProduct('fass-10007', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `NATURSTEIN | 🛠 Montage`, 'FASS-10007', 69, 'qm', `🛠 Montage`, true, false, 20, 'service')
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
            createProduct('466-20089', 'material', 'material-sub', `Metten Naturstein Mauersystem ARTIC GRANIT Hellgrau gestockt 40x20x15 cm`, '466-20089', 18.92, 'Stk', `Metten Naturstein Mauersystem ARTIC GRANIT Hellgrau gestockt 40x20x15 cm`, true, false, 132, 'material')
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
            createProduct('229-00258', 'optionale-positionen', 'optionale-positionen-sub', `Gala-Lusit Cremona Landhausmauer Mauersysteme Mischformat, 12,5 cm Dicke - Sahara-Weiß Melange`, '229-00258', 177.1, 'Stk', `Gala-Lusit Cremona Landhausmauer Mauersysteme Mischformat, 12,5 cm Dicke - Sahara-Weiß Melange`, false, true, 1, 'optional'),
            createProduct('uv229-00499', 'optionale-positionen', 'optionale-positionen-sub', `Gala-Lusit Spaltino Mauerblock - Gelbsand-Melange ohne Fase`, 'uv229-00499', 23.85, 'Stk', `Gala-Lusit Spaltino Mauerblock - Gelbsand-Melange ohne Fase`, false, true, 1, 'optional')
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
            createProduct('uv633-00009', 'extra-positionen', 'extra-positionen-sub', `Stebah Fugenmörtel - 25 Kg - Hellgrau`, 'uv633-00009', 23.3, 'Sack', `Stebah Fugenmörtel - 25 Kg - Hellgrau`, true, false, 2, 'extra'),
            createProduct('uv31-00018', 'extra-positionen', 'extra-positionen-sub', `1A BAUCHEMIE T-FLEX TE C2 Flex Klebemörtel für keramische Wand- und Bodenbeläge im Innen- und Außenbereich grau`, 'uv31-00018', 19.73, 'Sack', `1A BAUCHEMIE T-FLEX TE C2 Flex Klebemörtel für keramische Wand- und Bodenbeläge im Innen- und Außenbereich grau`, true, false, 4, 'extra')
          ]
        }
      ]
    }
  ]
};

export const packageFassadeVorhangfassade: RenovationPackage = {
  id: 'fassadeVorhangfassade',
  title: 'Vorhangfassade',
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
            createProduct('fass-10009', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `VORHANGFASSADE | 🛠 Montage`, 'FASS-10009', 159, 'qm', `🛠 Montage`, true, false, 1, 'service')
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
            createProduct('mat-anfrage', 'material', 'material-sub', `AUF ANFRAGE & BEMUSTERUNG DER MATERIALIEN`, 'MAT-Anfrage', 0, 'Stk', `AUF ANFRAGE & BEMUSTERUNG DER MATERIALIEN`, false, false, 1, 'material')
          ]
        }
      ]
    }
  ]
};

export const packageFassadeVerblendmauerwerk: RenovationPackage = {
  id: 'fassadeVerblendmauerwerk',
  title: 'Verblendmauerwerk',
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
            createProduct('fass-10012', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `VERBLENDMAUERWERK | 🛠 Montage`, 'FASS-10012', 149, 'qm', `🛠 Montage`, true, false, 100, 'service')
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
            createProduct('744-10030', 'material', 'material-sub', `Terca Klinker KMz 28-2,4-DF voll KK1 rotbunt glatt`, '744-10030', 2.42, 'Stk', `Terca Klinker KMz 28-2,4-DF voll KK1 rotbunt glatt`, true, false, 440, 'material'),
            createProduct('uv633-00009', 'material', 'material-sub', `Stebah Fugenmörtel - 25 Kg - Hellgrau`, 'uv633-00009', 23.3, 'Sack', `Stebah Fugenmörtel - 25 Kg - Hellgrau`, true, false, 6, 'material')
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
            createProduct('uv31-00018', 'extra-positionen', 'extra-positionen-sub', `1A BAUCHEMIE T-FLEX TE C2 Flex Klebemörtel für keramische Wand- und Bodenbeläge im Innen- und Außenbereich grau`, 'uv31-00018', 19.73, 'Sack', `1A BAUCHEMIE T-FLEX TE C2 Flex Klebemörtel für keramische Wand- und Bodenbeläge im Innen- und Außenbereich grau`, true, false, 16, 'extra')
          ]
        }
      ]
    }
  ]
};
