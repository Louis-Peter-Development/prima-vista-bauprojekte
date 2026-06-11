export type RenovationLineType = 'service' | 'material' | 'extra' | 'optional';

export type CalculatorContext = {
  livingArea: number;
  floorCount: number;
};

export type RenovationProductAlternative = {
  id: string;
  title: string;
  sku: string;
  unit: string;
  basePrice: number;
  description?: string;
  image?: string;
};

export type RenovationProduct = {
  id: string;
  category: string;
  subcategory: string;
  title: string;
  sku: string;
  type: RenovationLineType;
  unit: string;
  basePrice: number;
  
  // Base configuration
  enabled: boolean;
  optional: boolean;
  minQuantity: number;
  quantityStep: number;
  baseQuantity: number;
  
  // Scaling system
  scalable: boolean;
  formula?: string; // Parsed as safe arithmetic with CalculatorContext variables
  
  // Computed runtime value
  quantity: number;
  
  // Operations
  canDuplicate: boolean;
  canRemove: boolean;
  canReplace: boolean;
  
  description: string;
  image?: string;
  alternatives: RenovationProductAlternative[];
};

export type RenovationSubsection = {
  id: string;
  title: string;
  type: RenovationLineType;
  collapsedByDefault?: boolean;
  products: RenovationProduct[];
};

export type RenovationCategory = {
  id: string;
  title: string;
  lead: string;
  collapsedByDefault?: boolean;
  subsections: RenovationSubsection[];
};

export type RenovationPackage = {
  id: string;
  title: string;
  defaultArea: number;
  defaultFloorCount: number;
  categories: RenovationCategory[];
};
