import { Item } from '@/lib/types';

export const mockItems: Item[] = [
  // Coffee Supplies
  {
    id: 'item-001',
    name: 'Espresso Beans (House Blend)',
    category: 'coffee-supplies',
    unit: 'lbs',
    parLevel: 20,
    reorderPoint: 8,
    currentQuantity: 15,
    costPerUnit: 14.99,
    supplier: 'Local Roasters Co.',
    recipeMultiplier: 0.07, // oz per shot
  },
  {
    id: 'item-002',
    name: 'Cold Brew Concentrate',
    category: 'coffee-supplies',
    unit: 'kegs',
    parLevel: 4,
    reorderPoint: 2,
    currentQuantity: 1,
    costPerUnit: 89.99,
    supplier: 'Brew Masters',
    shelfLifeDays: 14,
  },
  {
    id: 'item-003',
    name: 'Decaf Espresso Beans',
    category: 'coffee-supplies',
    unit: 'lbs',
    parLevel: 10,
    reorderPoint: 4,
    currentQuantity: 7,
    costPerUnit: 16.99,
    supplier: 'Local Roasters Co.',
    recipeMultiplier: 0.07,
  },
  
  // Milk & Alternatives
  {
    id: 'item-004',
    name: 'Whole Milk',
    category: 'milk-alternatives',
    unit: 'gallons',
    parLevel: 12,
    reorderPoint: 5,
    currentQuantity: 2,
    costPerUnit: 4.29,
    supplier: 'Dairy Fresh',
    shelfLifeDays: 7,
    recipeMultiplier: 8, // oz per latte
  },
  {
    id: 'item-005',
    name: '2% Milk',
    category: 'milk-alternatives',
    unit: 'gallons',
    parLevel: 8,
    reorderPoint: 3,
    currentQuantity: 6,
    costPerUnit: 4.19,
    supplier: 'Dairy Fresh',
    shelfLifeDays: 7,
    recipeMultiplier: 8,
  },
  {
    id: 'item-006',
    name: 'Oat Milk',
    category: 'milk-alternatives',
    unit: 'gallons',
    parLevel: 10,
    reorderPoint: 4,
    currentQuantity: 8,
    costPerUnit: 7.99,
    supplier: 'Plant Based Co.',
    shelfLifeDays: 14,
    recipeMultiplier: 8,
  },
  {
    id: 'item-007',
    name: 'Almond Milk',
    category: 'milk-alternatives',
    unit: 'gallons',
    parLevel: 6,
    reorderPoint: 2,
    currentQuantity: 5,
    costPerUnit: 6.99,
    supplier: 'Plant Based Co.',
    shelfLifeDays: 14,
    recipeMultiplier: 8,
  },
  
  // Syrups
  {
    id: 'item-008',
    name: 'Vanilla Syrup',
    category: 'syrups',
    unit: 'bottles',
    parLevel: 8,
    reorderPoint: 3,
    currentQuantity: 3,
    costPerUnit: 12.99,
    supplier: 'Torani',
    recipeMultiplier: 1, // oz per drink
  },
  {
    id: 'item-009',
    name: 'Caramel Syrup',
    category: 'syrups',
    unit: 'bottles',
    parLevel: 8,
    reorderPoint: 3,
    currentQuantity: 6,
    costPerUnit: 12.99,
    supplier: 'Torani',
    recipeMultiplier: 1,
  },
  {
    id: 'item-010',
    name: 'Hazelnut Syrup',
    category: 'syrups',
    unit: 'bottles',
    parLevel: 6,
    reorderPoint: 2,
    currentQuantity: 4,
    costPerUnit: 12.99,
    supplier: 'Torani',
    recipeMultiplier: 1,
  },
  {
    id: 'item-011',
    name: 'Sugar-Free Vanilla Syrup',
    category: 'syrups',
    unit: 'bottles',
    parLevel: 4,
    reorderPoint: 2,
    currentQuantity: 3,
    costPerUnit: 13.99,
    supplier: 'Torani',
    recipeMultiplier: 1,
  },
  
  // Bottled Beverages
  {
    id: 'item-012',
    name: 'Bottled Water (16oz)',
    category: 'bottled-beverages',
    unit: 'units',
    parLevel: 72,
    reorderPoint: 24,
    currentQuantity: 24,
    costPerUnit: 0.89,
    supplier: 'Beverage Distributors',
  },
  {
    id: 'item-013',
    name: 'Sparkling Water (12oz)',
    category: 'bottled-beverages',
    unit: 'units',
    parLevel: 48,
    reorderPoint: 18,
    currentQuantity: 36,
    costPerUnit: 1.29,
    supplier: 'Beverage Distributors',
  },
  {
    id: 'item-014',
    name: 'Coca-Cola (12oz)',
    category: 'bottled-beverages',
    unit: 'units',
    parLevel: 36,
    reorderPoint: 12,
    currentQuantity: 28,
    costPerUnit: 1.49,
    supplier: 'Beverage Distributors',
  },
  {
    id: 'item-015',
    name: 'Diet Coke (12oz)',
    category: 'bottled-beverages',
    unit: 'units',
    parLevel: 24,
    reorderPoint: 8,
    currentQuantity: 18,
    costPerUnit: 1.49,
    supplier: 'Beverage Distributors',
  },
  {
    id: 'item-016',
    name: 'Orange Juice (12oz)',
    category: 'bottled-beverages',
    unit: 'units',
    parLevel: 24,
    reorderPoint: 8,
    currentQuantity: 12,
    costPerUnit: 3.49,
    supplier: 'Beverage Distributors',
    shelfLifeDays: 21,
  },
  {
    id: 'item-017',
    name: 'Red Bull (8.4oz)',
    category: 'bottled-beverages',
    unit: 'units',
    parLevel: 36,
    reorderPoint: 12,
    currentQuantity: 30,
    costPerUnit: 2.99,
    supplier: 'Beverage Distributors',
  },
  {
    id: 'item-018',
    name: 'Kombucha (16oz)',
    category: 'bottled-beverages',
    unit: 'units',
    parLevel: 18,
    reorderPoint: 6,
    currentQuantity: 8,
    costPerUnit: 4.29,
    supplier: 'Local Ferments',
    shelfLifeDays: 30,
  },
  
  // Consumables
  {
    id: 'item-019',
    name: 'Paper Cups (12oz)',
    category: 'consumables',
    unit: 'units',
    parLevel: 500,
    reorderPoint: 150,
    currentQuantity: 320,
    costPerUnit: 0.08,
    supplier: 'Eco Supplies',
  },
  {
    id: 'item-020',
    name: 'Paper Cups (16oz)',
    category: 'consumables',
    unit: 'units',
    parLevel: 400,
    reorderPoint: 120,
    currentQuantity: 280,
    costPerUnit: 0.10,
    supplier: 'Eco Supplies',
  },
  {
    id: 'item-021',
    name: 'Cup Lids (12oz)',
    category: 'consumables',
    unit: 'units',
    parLevel: 500,
    reorderPoint: 150,
    currentQuantity: 450,
    costPerUnit: 0.04,
    supplier: 'Eco Supplies',
  },
  {
    id: 'item-022',
    name: 'Cup Lids (16oz)',
    category: 'consumables',
    unit: 'units',
    parLevel: 400,
    reorderPoint: 120,
    currentQuantity: 380,
    costPerUnit: 0.05,
    supplier: 'Eco Supplies',
  },
  {
    id: 'item-023',
    name: 'Paper Straws',
    category: 'consumables',
    unit: 'units',
    parLevel: 300,
    reorderPoint: 100,
    currentQuantity: 180,
    costPerUnit: 0.03,
    supplier: 'Eco Supplies',
  },
  {
    id: 'item-024',
    name: 'Napkins',
    category: 'consumables',
    unit: 'units',
    parLevel: 1000,
    reorderPoint: 300,
    currentQuantity: 650,
    costPerUnit: 0.01,
    supplier: 'Eco Supplies',
  },
];

export const getItemById = (id: string): Item | undefined => {
  return mockItems.find(item => item.id === id);
};

export const getItemsByCategory = (category: string): Item[] => {
  return mockItems.filter(item => item.category === category);
};

export const getCriticalItems = (): Item[] => {
  return mockItems.filter(item => item.currentQuantity <= item.reorderPoint);
};

export const getLowStockItems = (): Item[] => {
  return mockItems.filter(item => 
    item.currentQuantity > item.reorderPoint && 
    item.currentQuantity <= item.parLevel * 0.5
  );
};

export const getWellStockedItems = (): Item[] => {
  return mockItems.filter(item => item.currentQuantity > item.parLevel * 0.5);
};
