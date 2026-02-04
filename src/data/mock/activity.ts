export interface ActivityLogEntry {
  id: string;
  action: string;
  description: string;
  user: string;
  timestamp: Date;
  type: 'sync' | 'order' | 'count' | 'alert' | 'adjustment';
}

const now = new Date();

export const mockActivityLog: ActivityLogEntry[] = [
  {
    id: 'act-001',
    action: 'Inventory Synced',
    description: 'Daily POS sync completed successfully. 24 items updated.',
    user: 'System',
    timestamp: new Date(now.getTime() - 3 * 60 * 60 * 1000), // 3 hours ago
    type: 'sync',
  },
  {
    id: 'act-002',
    action: 'Order Placed',
    description: 'Ordered 200 paper straws from Eco Supplies',
    user: 'Sarah M.',
    timestamp: new Date(now.getTime() - 5 * 60 * 60 * 1000),
    type: 'order',
  },
  {
    id: 'act-003',
    action: 'Manual Count',
    description: 'Physical inventory count completed for coffee supplies',
    user: 'Mike R.',
    timestamp: new Date(now.getTime() - 8 * 60 * 60 * 1000),
    type: 'count',
  },
  {
    id: 'act-004',
    action: 'Alert Acknowledged',
    description: 'Low stock alert for Kombucha acknowledged',
    user: 'Sarah M.',
    timestamp: new Date(now.getTime() - 12 * 60 * 60 * 1000),
    type: 'alert',
  },
  {
    id: 'act-005',
    action: 'Quantity Adjusted',
    description: 'Adjusted Orange Juice count: 15 → 12 (spoilage)',
    user: 'Mike R.',
    timestamp: new Date(now.getTime() - 24 * 60 * 60 * 1000),
    type: 'adjustment',
  },
  {
    id: 'act-006',
    action: 'Checklist Generated',
    description: 'Weekly inventory checklist auto-generated',
    user: 'System',
    timestamp: new Date(now.getTime() - 26 * 60 * 60 * 1000),
    type: 'sync',
  },
  {
    id: 'act-007',
    action: 'Order Received',
    description: 'Received shipment from Local Roasters Co. (15 lbs espresso)',
    user: 'Carlos T.',
    timestamp: new Date(now.getTime() - 30 * 60 * 60 * 1000),
    type: 'order',
  },
  {
    id: 'act-008',
    action: 'Variance Flagged',
    description: 'System detected 22.5% variance on Bottled Water',
    user: 'System',
    timestamp: new Date(now.getTime() - 48 * 60 * 60 * 1000),
    type: 'alert',
  },
];

export const getRecentActivity = (limit: number = 10): ActivityLogEntry[] => {
  return mockActivityLog
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    .slice(0, limit);
};

export const getActivityByType = (type: ActivityLogEntry['type']): ActivityLogEntry[] => {
  return mockActivityLog.filter(entry => entry.type === type);
};
