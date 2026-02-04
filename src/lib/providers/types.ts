import {
  Item,
  Alert,
  InventorySnapshot,
  SalesTransaction,
  VarianceLog,
  WeeklyChecklist,
  ConsumptionData,
  VarianceTrend,
  InventoryHealthScore,
  DailyReport,
  SyncResult,
} from '@/lib/types';
import { ActivityLogEntry } from '@/data/mock/activity';

/**
 * Provider interfaces for data access
 * These interfaces allow swapping between MockProvider and CloverProvider
 */

export interface IInventoryProvider {
  // Items
  getItems(): Promise<Item[]>;
  getItemById(id: string): Promise<Item | null>;
  getItemsByCategory(category: string): Promise<Item[]>;
  getCriticalItems(): Promise<Item[]>;
  getLowStockItems(): Promise<Item[]>;
  getWellStockedItems(): Promise<Item[]>;
  updateItemQuantity(itemId: string, quantity: number): Promise<Item>;
  
  // Snapshots
  getSnapshots(itemId: string, startDate?: Date, endDate?: Date): Promise<InventorySnapshot[]>;
  createSnapshot(itemId: string, quantity: number): Promise<InventorySnapshot>;
}

export interface IAlertProvider {
  getAlerts(): Promise<Alert[]>;
  getActiveAlerts(): Promise<Alert[]>;
  getCriticalAlerts(): Promise<Alert[]>;
  getAlertsByItem(itemId: string): Promise<Alert[]>;
  acknowledgeAlert(alertId: string, userId: string): Promise<Alert>;
  resolveAlert(alertId: string): Promise<Alert>;
}

export interface ISalesProvider {
  getTransactions(startDate: Date, endDate: Date): Promise<SalesTransaction[]>;
  getTransactionsByItem(itemId: string, startDate?: Date, endDate?: Date): Promise<SalesTransaction[]>;
}

export interface IVarianceProvider {
  getVarianceLogs(): Promise<VarianceLog[]>;
  getVarianceByItem(itemId: string): Promise<VarianceLog[]>;
  getVarianceTrends(weeks?: number): Promise<VarianceTrend[]>;
  getHighVarianceItems(threshold?: number): Promise<VarianceLog[]>;
}

export interface IChecklistProvider {
  getWeeklyChecklist(): Promise<WeeklyChecklist>;
  updateChecklistItem(itemId: string, updates: Partial<{ isCompleted: boolean; notes: string }>): Promise<void>;
  generateChecklist(): Promise<WeeklyChecklist>;
}

export interface IReportProvider {
  getDailyReport(date?: Date): Promise<DailyReport>;
  getConsumptionData(days?: number): Promise<ConsumptionData[]>;
  getInventoryHealthScore(): Promise<InventoryHealthScore>;
}

export interface IActivityProvider {
  getRecentActivity(limit?: number): Promise<ActivityLogEntry[]>;
  logActivity(entry: Omit<ActivityLogEntry, 'id' | 'timestamp'>): Promise<ActivityLogEntry>;
}

export interface ISyncProvider {
  syncWithPOS(): Promise<SyncResult>;
  getLastSyncTime(): Promise<Date | null>;
}

/**
 * Combined provider interface for the entire data layer
 */
export interface IDataProvider extends 
  IInventoryProvider,
  IAlertProvider,
  ISalesProvider,
  IVarianceProvider,
  IChecklistProvider,
  IReportProvider,
  IActivityProvider,
  ISyncProvider {}
