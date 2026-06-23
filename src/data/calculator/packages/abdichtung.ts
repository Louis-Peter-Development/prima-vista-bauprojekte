import type { RenovationPackage } from '../types';

export const packageAbdichtungAlles: RenovationPackage = {
  id: "abdichtung",
  title: "Komplette Abdichtung",
  defaultArea: 100,
  defaultFloorCount: 1,
  categories: [
    {
      id: "section-01-art-der-ausfuhrung",
      title: "Art der Ausführung",
      lead: "Ausgewählte Leistungen und Materialien.",
      collapsedByDefault: false,
      subsections: [
        {
          id: "leistungen-materialien",
          title: "Leistungen & Materialien",
          type: "service",
          products: [
            {
              id: "pv-001-abbd-101-1-mat",
              category: "section-01-art-der-ausfuhrung",
              subcategory: "leistungen-materialien",
              title: "PERIMETERDÄMMUNG Abdichtung | 🛠 Montage-Leistungspaket",
              sku: "ABBD-101.1-MAT",
              image: "/assets/img/products/ABBD-101.1-MAT.png",
              type: "service",
              unit: "qm",
              basePrice: 249,
              enabled: true,
              optional: false,
              minQuantity: 1,
              quantityStep: 1,
              baseQuantity: 1,
              scalable: false,
              quantity: 1,
              canDuplicate: false,
              canRemove: true,
              canReplace: false,
              description: "Kalkulationsposition fuer Montage, Material oder Zusatzleistung.",
              alternatives: [],
            }
          ],
        }
      ],
    },
    {
      id: "section-02-material",
      title: "Material",
      lead: "Ausgewählte Leistungen und Materialien.",
      collapsedByDefault: true,
      subsections: [
        {
          id: "leistungen-materialien",
          title: "Leistungen & Materialien",
          type: "service",
          products: [
            {
              id: "pv-002-uv868-00421",
              category: "section-02-material",
              subcategory: "leistungen-materialien",
              title: "weber.therm EPS 032 Sockel standard Polystyrol Perimeter-Dämmplatte",
              sku: "uv868-00421",
              image: "/assets/img/products/uv868-00421.jpg",
              type: "material",
              unit: "",
              basePrice: 22.62,
              enabled: true,
              optional: false,
              minQuantity: 1,
              quantityStep: 1,
              baseQuantity: 1,
              scalable: false,
              quantity: 1,
              canDuplicate: false,
              canRemove: true,
              canReplace: false,
              description: "Kalkulationsposition fuer Montage, Material oder Zusatzleistung.",
              alternatives: [],
            }
          ],
        }
      ],
    },
    {
      id: "section-03-optionale-positionen",
      title: "Optionale Positionen",
      lead: "Ausgewählte Leistungen und Materialien.",
      collapsedByDefault: true,
      subsections: [
        {
          id: "leistungen-materialien",
          title: "Leistungen & Materialien",
          type: "optional",
          products: [
            {
              id: "pv-003-abbd-101-2-mat",
              category: "section-03-optionale-positionen",
              subcategory: "leistungen-materialien",
              title: "HORIZONTAL | Abdichtung des Kellergeschosses",
              sku: "ABBD-101.2-MAT",
              image: "/assets/img/products/ABBD-101.2-MAT.png",
              type: "optional",
              unit: "qm",
              basePrice: 119,
              enabled: false,
              optional: true,
              minQuantity: 1,
              quantityStep: 1,
              baseQuantity: 1,
              scalable: false,
              quantity: 1,
              canDuplicate: false,
              canRemove: true,
              canReplace: false,
              description: "Kalkulationsposition fuer Montage, Material oder Zusatzleistung.",
              alternatives: [],
            },
            {
              id: "pv-004-abbd-101-3-mat",
              category: "section-03-optionale-positionen",
              subcategory: "leistungen-materialien",
              title: "DICHTSYSTEM | Anti Feuchtigkeit",
              sku: "ABBD-101.3-MAT",
              image: "/assets/img/products/ABBD-101.3-MAT.png",
              type: "optional",
              unit: "qm",
              basePrice: 69.25,
              enabled: false,
              optional: true,
              minQuantity: 1,
              quantityStep: 1,
              baseQuantity: 1,
              scalable: false,
              quantity: 1,
              canDuplicate: false,
              canRemove: true,
              canReplace: false,
              description: "Kalkulationsposition fuer Montage, Material oder Zusatzleistung.",
              alternatives: [],
            }
          ],
        }
      ],
    }
  ],
};

export const packageAbdichtungHorizontal: RenovationPackage = {
  id: "abdichtungHorizontal",
  title: "Horizontal-Abdichtung",
  defaultArea: 30,
  defaultFloorCount: 1,
  categories: [
    {
      id: "section-01-art-der-ausfuhrung",
      title: "Art der Ausführung",
      lead: "Ausgewählte Leistungen und Materialien.",
      collapsedByDefault: false,
      subsections: [
        {
          id: "leistungen-materialien",
          title: "Leistungen & Materialien",
          type: "service",
          products: [
            {
              id: "pv-001-abbd-101-2-mat",
              category: "section-01-art-der-ausfuhrung",
              subcategory: "leistungen-materialien",
              title: "HORIZONTAL | Abdichtung des Kellergeschosses",
              sku: "ABBD-101.2-MAT",
              image: "/assets/img/products/ABBD-101.2-MAT.png",
              type: "material",
              unit: "qm",
              basePrice: 119,
              enabled: true,
              optional: false,
              minQuantity: 1,
              quantityStep: 1,
              baseQuantity: 1,
              scalable: false,
              quantity: 1,
              canDuplicate: false,
              canRemove: true,
              canReplace: false,
              description: "Kalkulationsposition fuer Montage, Material oder Zusatzleistung.",
              alternatives: [],
            }
          ],
        }
      ],
    }
  ],
};

export const packageAbdichtungPerimeter: RenovationPackage = {
  id: "abdichtungPerimeter",
  title: "Perimeter-Abdichtung",
  defaultArea: 30,
  defaultFloorCount: 1,
  categories: [
    {
      id: "section-01-art-der-ausfuhrung",
      title: "Art der Ausführung",
      lead: "Ausgewählte Leistungen und Materialien.",
      collapsedByDefault: false,
      subsections: [
        {
          id: "leistungen-materialien",
          title: "Leistungen & Materialien",
          type: "service",
          products: [
            {
              id: "pv-001-abbd-101-1-mat",
              category: "section-01-art-der-ausfuhrung",
              subcategory: "leistungen-materialien",
              title: "PERIMETERDÄMMUNG Abdichtung | 🛠 Montage-Leistungspaket",
              sku: "ABBD-101.1-MAT",
              image: "/assets/img/products/ABBD-101.1-MAT.png",
              type: "service",
              unit: "qm",
              basePrice: 249,
              enabled: true,
              optional: false,
              minQuantity: 1,
              quantityStep: 1,
              baseQuantity: 50,
              scalable: false,
              quantity: 50,
              canDuplicate: false,
              canRemove: true,
              canReplace: false,
              description: "Kalkulationsposition fuer Montage, Material oder Zusatzleistung.",
              alternatives: [],
            }
          ],
        }
      ],
    },
    {
      id: "section-02-material",
      title: "Material",
      lead: "Ausgewählte Leistungen und Materialien.",
      collapsedByDefault: true,
      subsections: [
        {
          id: "leistungen-materialien",
          title: "Leistungen & Materialien",
          type: "service",
          products: [
            {
              id: "pv-002-uv868-00421",
              category: "section-02-material",
              subcategory: "leistungen-materialien",
              title: "weber.therm EPS 032 Sockel standard Polystyrol Perimeter-Dämmplatte",
              sku: "uv868-00421",
              image: "/assets/img/products/uv868-00421.jpg",
              type: "material",
              unit: "",
              basePrice: 22.62,
              enabled: true,
              optional: false,
              minQuantity: 1,
              quantityStep: 1,
              baseQuantity: 55,
              scalable: false,
              quantity: 55,
              canDuplicate: false,
              canRemove: true,
              canReplace: false,
              description: "Kalkulationsposition fuer Montage, Material oder Zusatzleistung.",
              alternatives: [],
            }
          ],
        }
      ],
    }
  ],
};

export const packageAbdichtungKeller: RenovationPackage = {
  id: "abdichtungKeller",
  title: "Keller-Abdichtung (Innen)",
  defaultArea: 60,
  defaultFloorCount: 1,
  categories: [
    {
      id: "section-01-art-der-ausfuhrung",
      title: "Art der Ausführung",
      lead: "Ausgewählte Leistungen und Materialien.",
      collapsedByDefault: false,
      subsections: [
        {
          id: "leistungen-materialien",
          title: "Leistungen & Materialien",
          type: "service",
          products: [
            {
              id: "pv-001-abbd-101-3-mat",
              category: "section-01-art-der-ausfuhrung",
              subcategory: "leistungen-materialien",
              title: "DICHTSYSTEM | Anti Feuchtigkeit",
              sku: "ABBD-101.3-MAT",
              image: "/assets/img/products/ABBD-101.3-MAT.png",
              type: "material",
              unit: "qm",
              basePrice: 69.25,
              enabled: true,
              optional: false,
              minQuantity: 1,
              quantityStep: 1,
              baseQuantity: 1,
              scalable: false,
              quantity: 1,
              canDuplicate: false,
              canRemove: true,
              canReplace: false,
              description: "Kalkulationsposition fuer Montage, Material oder Zusatzleistung.",
              alternatives: [],
            }
          ],
        }
      ],
    }
  ],
};
