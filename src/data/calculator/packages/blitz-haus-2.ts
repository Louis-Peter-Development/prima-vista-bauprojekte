import type { RenovationPackage } from '../types';
import { createBossmannHousePackage } from './aligned-house';

export const packageBlitzHaus2: RenovationPackage = createBossmannHousePackage(
  '2e-d',
  '2× Etagen + 1× Dach',
  120,
  2,
);
