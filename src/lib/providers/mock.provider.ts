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
import {
  mockItems,
  getItemById as getMockItemById,
  getCriticalItems as getMockCriticalItems,
  getLowStockItems as getMockLowStockItems,
  getWellStockedItems as getMockWellStockedItems,
  getItemsByCategory as getMockItemsByCategory,
} from '@/data/mock/items';
import {
  mockAlerts,
  getActiveAlerts as getMockActiveAlerts,
  getCriticalAlerts as getMockCriticalAlerts,
  getAlertsByItem as getMockAlertsByItem,
} from '@/data/mock/alerts';
import {
  mockConsumptionData,
  mockVarianceTrends,
  mockVarianceLogs,
  getHighVarianceItems as getMockHighVarianceItems,
} from '@/data/mock/consumption';
import {
  mockWeeklyChecklist,
  mockChecklistItems,
} from '@/data/mock/checklist';
import {
  mockActivityLog,
  getRecentActivity as getMockRecentActivity,
} from '@/data/mock/activity';
import { IDataProvider } from './types';

/**
 * Mock data provider implementation
 * Uses static mock data for development and demos
 */
export class MockProvider implements IDataProvider {
  private items: Item[] = [...mockItems];
  private alerts: Alert[] = [...mockAlerts];
  private checklist: WeeklyChecklist = { ...mockWeeklyChecklist };
  private activityLog: ActivityLogEntry[] = [...mockActivityLog];

  // ============ Inventory Methods ============
  
  async getItems(): Promise<Item[]> {
    return this.items;
  }

  async getItemById(id: string): Promise<Item | null> {
    return getMockItemById(id) || null;
  }

  async getItemsByCategory(category: string): Promise<Item[]> {
    return getMockItemsByCategory(category);
  }

  async getCriticalItems(): Promise<Item[]> {
    return getMockCriticalItems();
  }

  async getLowStockItems(): Promise<Item[]> {
    return getMockLowStockItems();
  }

  async getWellStockedItems(): Promise<Item[]> {
    return getMockWellStockedItems();
  }

  async updateItemQuantity(itemId: string, quantity: number): Promise<Item> {
    const index = this.items.findIndex(item => item.id === itemId);
    if (index === -1) throw new Error(`Item ${itemId} not found`);
    
    this.items[index] = { ...this.items[index], currentQuantity: quantity };
    return this.items[index];
  }

  async getSnapshots(itemId: string): Promise<InventorySnapshot[]> {
    // Generate mock snapshots for the past 7 days
    const snapshots: InventorySnapshot[] = [];
    const item = getMockItemById(itemId);
    if (!item) return snapshots;

    const now = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      snapshots.push({
        id: `snapshot-${itemId}-${i}`,
        itemId,
        quantity: item.currentQuantity + Math.floor(Math.random() * 5),
        timestamp: date,
      });
    }
    return snapshots;
  }

  async createSnapshot(itemId: string, quantity: number): Promise<InventorySnapshot> {
    return {
      id: `snapshot-${Date.now()}`,
      itemId,
      quantity,
      timestamp: new Date(),
    };
  }

  // ============ Alert Methods ============

  async getAlerts(): Promise<Alert[]> {
    return this.alerts;
  }

  async getActiveAlerts(): Promise<Alert[]> {
    return getMockActiveAlerts();
  }

  async getCriticalAlerts(): Promise<Alert[]> {
    return getMockCriticalAlerts();
  }

  async getAlertsByItem(itemId: string): Promise<Alert[]> {
    return getMockAlertsByItem(itemId);
  }

  async acknowledgeAlert(alertId: string, userId: string): Promise<Alert> {
    const index = this.alerts.findIndex(a => a.id === alertId);
    if (index === -1) throw new Error(`Alert ${alertId} not found`);
    
    this.alerts[index] = {
      ...this.alerts[index],
      status: 'acknowledged',
      acknowledgedAt: new Date(),
      acknowledgedBy: userId,
    };
    return this.alerts[index];
  }

  async resolveAlert(alertId: string): Promise<Alert> {
    const index = this.alerts.findIndex(a => a.id === alertId);
    if (index === -1) throw new Error(`Alert ${alertId} not found`);
    
    this.alerts[index] = { ...this.alerts[index], status: 'resolved' };
    return this.alerts[index];
  }

  // ============ Sales Methods ============

  async getTransactions(): Promise<SalesTransaction[]> {
    // Generate mock transactions
    return [];
  }

  async getTransactionsByItem(): Promise<SalesTransaction[]> {
    return [];
  }

  // ============ Variance Methods ============

  async getVarianceLogs(): Promise<VarianceLog[]> {
    return mockVarianceLogs;
  }

  async getVarianceByItem(itemId: string): Promise<VarianceLog[]> {
    return mockVarianceLogs.filter(v => v.itemId === itemId);
  }

  async getVarianceTrends(weeks: number = 12): Promise<VarianceTrend[]> {
    return mockVarianceTrends.slice(-weeks);
  }

  async getHighVarianceItems(threshold: number = 15): Promise<VarianceLog[]> {
    return getMockHighVarianceItems().filter(v => Math.abs(v.variancePercent) >= threshold);
  }

  // ============ Checklist Methods ============

  async getWeeklyChecklist(): Promise<WeeklyChecklist> {
    return this.checklist;
  }

  async updateChecklistItem(
    itemId: string,
    updates: Partial<{ isCompleted: boolean; notes: string }>
  ): Promise<void> {
    const checklistItem = this.checklist.items.find(i => i.id === itemId);
    if (checklistItem) {
      Object.assign(checklistItem, updates);
    }
  }

  async generateChecklist(): Promise<WeeklyChecklist> {
    // In real implementation, this would analyze inventory and generate new checklist
    return this.checklist;
  }

  // ============ Report Methods ============

  async getDailyReport(date?: Date): Promise<DailyReport> {
    const reportDate = date || new Date();
    const criticalAlerts = await this.getCriticalAlerts();
    const activeAlerts = await this.getActiveAlerts();
    const wellStockedItems = await this.getWellStockedItems();

    return {
      date: reportDate,
      criticalAlerts,
      lowStockAlerts: activeAlerts.filter(a => a.severity === 'warning'),
      wellStockedItems,
      consumptionData: mockConsumptionData,
    };
  }

  async getConsumptionData(): Promise<ConsumptionData[]> {
    return mockConsumptionData;
  }

  async getInventoryHealthScore(): Promise<InventoryHealthScore> {
    const critical = (await this.getCriticalItems()).length;
    const lowStock = (await this.getLowStockItems()).length;
    const wellStocked = (await this.getWellStockedItems()).length;
    const total = critical + lowStock + wellStocked;

    // Calculate score: 100 - (critical * 10 + lowStock * 3)
    const score = Math.max(0, Math.min(100, 100 - (critical * 10 + lowStock * 3)));

    return {
      score,
      criticalItems: critical,
      lowStockItems: lowStock,
      wellStockedItems: wellStocked,
      lastUpdated: new Date(),
    };
  }

  // ============ Activity Methods ============

  async getRecentActivity(limit: number = 10): Promise<ActivityLogEntry[]> {
    return getMockRecentActivity(limit);
  }

  async logActivity(entry: Omit<ActivityLogEntry, 'id' | 'timestamp'>): Promise<ActivityLogEntry> {
    const newEntry: ActivityLogEntry = {
      ...entry,
      id: `act-${Date.now()}`,
      timestamp: new Date(),
    };
    this.activityLog.unshift(newEntry);
    return newEntry;
  }

  // ============ Sync Methods ============

  async syncWithPOS(): Promise<SyncResult> {
    // Simulate a successful sync
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      itemsSynced: this.items.length,
      transactionsSynced: 156,
      errors: [],
      timestamp: new Date(),
    };
  }

  async getLastSyncTime(): Promise<Date | null> {
    const syncActivity = this.activityLog.find(a => a.type === 'sync');
    return syncActivity?.timestamp || null;
  }
}
