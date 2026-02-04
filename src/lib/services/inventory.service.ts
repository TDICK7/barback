import { MockProvider } from '@/lib/providers';
import { IDataProvider } from '@/lib/providers/types';

/**
 * Inventory Service
 * 
 * This service acts as the main interface for all data operations.
 * It uses the provider pattern to allow swapping between mock data
 * and real Clover API integration.
 * 
 * Usage:
 *   const service = InventoryService.getInstance();
 *   const items = await service.getItems();
 */

class InventoryServiceImpl {
  private static instance: InventoryServiceImpl;
  private provider: IDataProvider;

  private constructor() {
    // Default to MockProvider
    // In the future, this can be switched based on environment
    // or configuration to use CloverProvider
    this.provider = new MockProvider();
  }

  static getInstance(): InventoryServiceImpl {
    if (!InventoryServiceImpl.instance) {
      InventoryServiceImpl.instance = new InventoryServiceImpl();
    }
    return InventoryServiceImpl.instance;
  }

  /**
   * Set a different provider (useful for testing or switching to Clover)
   */
  setProvider(provider: IDataProvider): void {
    this.provider = provider;
  }

  // ============ Inventory ============
  getItems = () => this.provider.getItems();
  getItemById = (id: string) => this.provider.getItemById(id);
  getItemsByCategory = (category: string) => this.provider.getItemsByCategory(category);
  getCriticalItems = () => this.provider.getCriticalItems();
  getLowStockItems = () => this.provider.getLowStockItems();
  getWellStockedItems = () => this.provider.getWellStockedItems();
  updateItemQuantity = (itemId: string, quantity: number) => 
    this.provider.updateItemQuantity(itemId, quantity);
  getSnapshots = (itemId: string, startDate?: Date, endDate?: Date) =>
    this.provider.getSnapshots(itemId, startDate, endDate);
  createSnapshot = (itemId: string, quantity: number) =>
    this.provider.createSnapshot(itemId, quantity);

  // ============ Alerts ============
  getAlerts = () => this.provider.getAlerts();
  getActiveAlerts = () => this.provider.getActiveAlerts();
  getCriticalAlerts = () => this.provider.getCriticalAlerts();
  getAlertsByItem = (itemId: string) => this.provider.getAlertsByItem(itemId);
  acknowledgeAlert = (alertId: string, userId: string) =>
    this.provider.acknowledgeAlert(alertId, userId);
  resolveAlert = (alertId: string) => this.provider.resolveAlert(alertId);

  // ============ Sales ============
  getTransactions = (startDate: Date, endDate: Date) =>
    this.provider.getTransactions(startDate, endDate);
  getTransactionsByItem = (itemId: string, startDate?: Date, endDate?: Date) =>
    this.provider.getTransactionsByItem(itemId, startDate, endDate);

  // ============ Variance ============
  getVarianceLogs = () => this.provider.getVarianceLogs();
  getVarianceByItem = (itemId: string) => this.provider.getVarianceByItem(itemId);
  getVarianceTrends = (weeks?: number) => this.provider.getVarianceTrends(weeks);
  getHighVarianceItems = (threshold?: number) => this.provider.getHighVarianceItems(threshold);

  // ============ Checklist ============
  getWeeklyChecklist = () => this.provider.getWeeklyChecklist();
  updateChecklistItem = (
    itemId: string,
    updates: Partial<{ isCompleted: boolean; notes: string }>
  ) => this.provider.updateChecklistItem(itemId, updates);
  generateChecklist = () => this.provider.generateChecklist();

  // ============ Reports ============
  getDailyReport = (date?: Date) => this.provider.getDailyReport(date);
  getConsumptionData = (days?: number) => this.provider.getConsumptionData(days);
  getInventoryHealthScore = () => this.provider.getInventoryHealthScore();

  // ============ Activity ============
  getRecentActivity = (limit?: number) => this.provider.getRecentActivity(limit);
  logActivity = (entry: Parameters<IDataProvider['logActivity']>[0]) =>
    this.provider.logActivity(entry);

  // ============ Sync ============
  syncWithPOS = () => this.provider.syncWithPOS();
  getLastSyncTime = () => this.provider.getLastSyncTime();
}

// Export singleton instance
export const InventoryService = InventoryServiceImpl.getInstance();

// Export type for dependency injection
export type { InventoryServiceImpl };
