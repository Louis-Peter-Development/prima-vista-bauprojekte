import type { RenovationPackage } from '../types';
import { createBossmannHousePackage } from './aligned-house';

export const packageBlitzHaus4: RenovationPackage = createBossmannHousePackage(
  '2e',
  '2× Etagen ohne Dach',
  120,
  2,
);
