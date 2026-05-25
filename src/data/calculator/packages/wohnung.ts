import type { RenovationPackage } from '../types';
import { createBossmannWohnungPackage } from './aligned-wohnung';

export const packageWohnungStudio: RenovationPackage = createBossmannWohnungPackage(
  'studio',
  '1-Zimmer · Studio',
  50,
  1,
);

export const packageWohnung2zi: RenovationPackage = createBossmannWohnungPackage(
  '2zi',
  '2-Zimmer-Wohnung',
  100,
  1,
);

export const packageWohnung3zi: RenovationPackage = createBossmannWohnungPackage(
  '3zi',
  '3-Zimmer-Wohnung',
  150,
  1,
);

export const packageWohnungMaisonette: RenovationPackage = createBossmannWohnungPackage(
  'maisonette',
  'Maisonette · 4+ Zimmer',
  200,
  2,
);
