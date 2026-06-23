import { describe, expect, it } from 'vitest';
import {
  BLITZ_ART_OPTIONS,
  BLITZ_GEWERKE_OPTIONS,
  BLITZ_SERVICE_GROUPS,
  mapKalkulatorPicksToBlitzGewerke,
} from './blitzAngebot';

describe('Blitz Angebot service choices', () => {
  it('starts with the broad top-level request areas', () => {
    expect(BLITZ_ART_OPTIONS).toEqual([
      { value: 'pakete', label: 'Komplett-Pakete' },
      { value: 'gewerke', label: 'Gewerke' },
      { value: 'heizung', label: 'Heizmethoden' },
      { value: 'anderes', label: 'Anderes' },
    ]);
  });

  it('offers every calculator leaf choice in grouped form', () => {
    expect(BLITZ_SERVICE_GROUPS.map((group) => group.label)).toEqual([
      'Komplett-Pakete',
      'Gewerke',
      'Heizmethoden',
    ]);
    expect(BLITZ_GEWERKE_OPTIONS).toEqual(expect.arrayContaining([
      'Haus-Sanierung',
      'Wohnung-Sanierung',
      'Gastronomie-Ausbau',
      'Büro-Ausbau',
      'Bäder & Sanitär',
      'Küchen & Möbelbau',
      'Böden & Beläge',
      'Elektroinstallation',
      'Sanitärinstallation',
      'Trockenbau',
      'Maler & Lackierer',
      'Fassadensanierung',
      'Dachsanierung',
      'Abdichtung & Keller',
      'Treppen & Geländer',
      'Garten & Außenanlagen',
      'Barrierefreiheit',
      'Fenstertechnik',
      'Rohbau & Abbruch',
      'Türen & Zargen',
      'Zäune & Tore',
      'Heizkörper',
      'Heizstränge',
      'Fußboden-Heizung',
      'Luft-Wärmepumpe',
      'Gas-Heizung',
      'Pelletofen',
      'Saunaofen',
    ]));
  });

  it('maps calculator pick and trade keys to detailed Blitz choices', () => {
    expect(mapKalkulatorPicksToBlitzGewerke([
      { key: 'boeden', label: 'Böden & Dielen', subtotal: 1000 },
      { key: 'section-01', label: 'Material', subtotal: 500, tradeKey: 'bade', tradeLabel: 'Badezimmer' },
      { key: 'netzwerk', label: 'Netzwerk & Daten', subtotal: 800 },
    ])).toEqual(['Böden & Beläge', 'Bäder & Sanitär', 'Elektroinstallation']);
  });

  it('uses the calculator kind label for specific heating calculators', () => {
    expect(mapKalkulatorPicksToBlitzGewerke([
      { key: 'section-01', label: 'Art der Ausführung', subtotal: 2000, tradeKey: 'heiz', tradeLabel: 'Heizung' },
    ], 'Wärmepumpe')).toEqual(['Luft-Wärmepumpe']);
    expect(mapKalkulatorPicksToBlitzGewerke([
      { key: 'section-01', label: 'Art der Ausführung', subtotal: 2000, tradeKey: 'bade', tradeLabel: 'Badezimmer' },
    ], 'Saunaofen')).toEqual(['Saunaofen']);
  });
});
