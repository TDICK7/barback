// Mock data exports
export * from './items';
export * from './alerts';
export * from './consumption';
export * from './checklist';
export * from './activity';

// Re-export commonly used functions
export { mockItems, getItemById, getCriticalItems, getLowStockItems, getWellStockedItems } from './items';
export { mockAlerts, getActiveAlerts, getCriticalAlerts } from './alerts';
export { mockConsumptionData, mockVarianceTrends, mockVarianceLogs } from './consumption';
export { mockWeeklyChecklist, mockChecklistItems } from './checklist';
export { mockActivityLog, getRecentActivity } from './activity';
