// Core domain types matching PRD schema

export type ItemCategory = 
  | 'coffee-supplies'
  | 'bottled-beverages'
  | 'consumables'
  | 'milk-alternatives'
  | 'syrups';

export type UnitOfMeasure = 
  | 'lbs'
  | 'gallons'
  | 'bottles'
  | 'kegs'
  | 'units'
  | 'oz';

export type AlertType = 
  | 'low-stock'
  | 'critical-stock'
  | 'variance'
  | 'spoilage'
  | 'anomaly';

export type AlertStatus = 
  | 'active'
  | 'acknowledged'
  | 'resolved';

export type AlertSeverity = 
  | 'critical'
  | 'warning'
  | 'info';

export type UserRole = 
  | 'brewer'
  | 'manager'
  | 'owner';

export type ChecklistItemPriority = 
  | 'critical'
  | 'high'
  | 'medium'
  | 'low';

// Database schema types
export interface Item {
  id: string;
  name: string;
  category: ItemCategory;
  unit: UnitOfMeasure;
  parLevel: number;      // Target inventory quantity
  reorderPoint: number;  // Level that triggers ordering
  currentQuantity: number;
  costPerUnit: number;
  supplier?: string;
  shelfLifeDays?: number;
  recipeMultiplier?: number; // Quantity per finished drink
}

export interface InventorySnapshot {
  id: string;
  itemId: string;
  quantity: number;
  timestamp: Date;
  recordedBy?: string;
}

export interface SalesTransaction {
  id: string;
  itemId: string;
  quantity: number;
  timestamp: Date;
  transactionId: string;
  unitPrice: number;
}

export interface VarianceLog {
  id: string;
  itemId: string;
  expected: number;
  actual: number;
  variancePercent: number;
  date: Date;
  notes?: string;
  investigationStatus?: 'pending' | 'investigating' | 'resolved';
}

export interface Alert {
  id: string;
  type: AlertType;
  severity: AlertSeverity;
  itemId?: string;
  message: string;
  status: AlertStatus;
  createdAt: Date;
  acknowledgedAt?: Date;
  acknowledgedBy?: string;
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  phone?: string;
  preferences: UserPreferences;
}

export interface UserPreferences {
  emailNotifications: boolean;
  smsNotifications: boolean;
  quietHoursStart?: string; // HH:mm format
  quietHoursEnd?: string;
}

// Checklist types
export interface ChecklistItem {
  id: string;
  itemId: string;
  item: Item;
  priority: ChecklistItemPriority;
  recommendedOrderQty: number;
  currentStock: number;
  weeklyAverage: number;
  lastOrderDate?: Date;
  variance?: VarianceLog;
  isCompleted: boolean;
  notes?: string;
}

export interface WeeklyChecklist {
  id: string;
  weekStartDate: Date;
  weekEndDate: Date;
  items: ChecklistItem[];
  generatedAt: Date;
  completedAt?: Date;
  completedBy?: string;
}

// Dashboard types
export interface InventoryHealthScore {
  score: number; // 0-100
  criticalItems: number;
  lowStockItems: number;
  wellStockedItems: number;
  lastUpdated: Date;
}

export interface ConsumptionData {
  itemId: string;
  itemName: string;
  date: Date;
  quantity: number;
  averageQuantity: number;
  percentChange: number;
}

export interface VarianceTrend {
  weekNumber: number;
  weekLabel: string;
  totalVariancePercent: number;
  itemsWithVariance: number;
}

export interface DailyReport {
  date: Date;
  criticalAlerts: Alert[];
  lowStockAlerts: Alert[];
  wellStockedItems: Item[];
  consumptionData: ConsumptionData[];
}

// API response types (for future Clover integration)
export interface SyncResult {
  success: boolean;
  itemsSynced: number;
  transactionsSynced: number;
  errors: string[];
  timestamp: Date;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}
