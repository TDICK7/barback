import { Alert, AlertSeverity, AlertType } from '@/lib/types';

const now = new Date();
const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);

export const mockAlerts: Alert[] = [
  {
    id: 'alert-001',
    type: 'critical-stock',
    severity: 'critical',
    itemId: 'item-004',
    message: 'Whole Milk is critically low: 2 gallons remaining (Target: 12)',
    status: 'active',
    createdAt: new Date(now.getTime() - 2 * 60 * 60 * 1000), // 2 hours ago
  },
  {
    id: 'alert-002',
    type: 'critical-stock',
    severity: 'critical',
    itemId: 'item-002',
    message: 'Cold Brew Concentrate is critically low: 1 keg remaining (Target: 4)',
    status: 'active',
    createdAt: new Date(now.getTime() - 4 * 60 * 60 * 1000), // 4 hours ago
  },
  {
    id: 'alert-003',
    type: 'low-stock',
    severity: 'warning',
    itemId: 'item-008',
    message: 'Vanilla Syrup is running low: 3 bottles remaining (Target: 8)',
    status: 'active',
    createdAt: new Date(now.getTime() - 6 * 60 * 60 * 1000), // 6 hours ago
  },
  {
    id: 'alert-004',
    type: 'low-stock',
    severity: 'warning',
    itemId: 'item-012',
    message: 'Bottled Water (16oz) is running low: 24 units remaining (Target: 72)',
    status: 'active',
    createdAt: yesterday,
  },
  {
    id: 'alert-005',
    type: 'variance',
    severity: 'warning',
    itemId: 'item-012',
    message: 'Unusual consumption detected: Bottled Water usage 22.5% above expected',
    status: 'active',
    createdAt: yesterday,
  },
  {
    id: 'alert-006',
    type: 'low-stock',
    severity: 'warning',
    itemId: 'item-018',
    message: 'Kombucha is running low: 8 units remaining (Target: 18)',
    status: 'acknowledged',
    createdAt: yesterday,
    acknowledgedAt: new Date(now.getTime() - 12 * 60 * 60 * 1000),
    acknowledgedBy: 'Sarah M.',
  },
  {
    id: 'alert-007',
    type: 'spoilage',
    severity: 'warning',
    itemId: 'item-016',
    message: 'Orange Juice approaching expiration: 5 units expire in 3 days',
    status: 'active',
    createdAt: twoDaysAgo,
  },
  {
    id: 'alert-008',
    type: 'anomaly',
    severity: 'info',
    itemId: 'item-001',
    message: 'Espresso usage trending 15% higher than last month average',
    status: 'acknowledged',
    createdAt: twoDaysAgo,
    acknowledgedAt: yesterday,
    acknowledgedBy: 'Mike R.',
  },
];

export const getActiveAlerts = (): Alert[] => {
  return mockAlerts.filter(alert => alert.status === 'active');
};

export const getCriticalAlerts = (): Alert[] => {
  return mockAlerts.filter(alert => alert.severity === 'critical' && alert.status === 'active');
};

export const getAlertsByType = (type: AlertType): Alert[] => {
  return mockAlerts.filter(alert => alert.type === type);
};

export const getAlertsBySeverity = (severity: AlertSeverity): Alert[] => {
  return mockAlerts.filter(alert => alert.severity === severity);
};

export const getAlertsByItem = (itemId: string): Alert[] => {
  return mockAlerts.filter(alert => alert.itemId === itemId);
};
