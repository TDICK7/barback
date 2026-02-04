import { ChecklistItem, WeeklyChecklist } from '@/lib/types';
import { mockItems, getItemById } from './items';
import { mockVarianceLogs } from './consumption';

const now = new Date();
const weekStart = new Date(now);
weekStart.setDate(now.getDate() - now.getDay() + 1); // Monday
const weekEnd = new Date(weekStart);
weekEnd.setDate(weekStart.getDate() + 6); // Sunday

// Generate checklist items based on current inventory levels
export const mockChecklistItems: ChecklistItem[] = [
  {
    id: 'check-001',
    itemId: 'item-004',
    item: getItemById('item-004')!,
    priority: 'critical',
    recommendedOrderQty: 20,
    currentStock: 2,
    weeklyAverage: 18,
    lastOrderDate: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
    variance: mockVarianceLogs.find(v => v.itemId === 'item-004'),
    isCompleted: false,
    notes: '',
  },
  {
    id: 'check-002',
    itemId: 'item-002',
    item: getItemById('item-002')!,
    priority: 'critical',
    recommendedOrderQty: 3,
    currentStock: 1,
    weeklyAverage: 2.5,
    lastOrderDate: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000),
    variance: mockVarianceLogs.find(v => v.itemId === 'item-002'),
    isCompleted: false,
    notes: '',
  },
  {
    id: 'check-003',
    itemId: 'item-008',
    item: getItemById('item-008')!,
    priority: 'high',
    recommendedOrderQty: 12,
    currentStock: 3,
    weeklyAverage: 10,
    lastOrderDate: new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000),
    variance: mockVarianceLogs.find(v => v.itemId === 'item-008'),
    isCompleted: false,
    notes: '',
  },
  {
    id: 'check-004',
    itemId: 'item-012',
    item: getItemById('item-012')!,
    priority: 'high',
    recommendedOrderQty: 72,
    currentStock: 24,
    weeklyAverage: 56,
    lastOrderDate: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000),
    variance: mockVarianceLogs.find(v => v.itemId === 'item-012'),
    isCompleted: false,
    notes: 'Check for unrecorded sales',
  },
  {
    id: 'check-005',
    itemId: 'item-018',
    item: getItemById('item-018')!,
    priority: 'high',
    recommendedOrderQty: 18,
    currentStock: 8,
    weeklyAverage: 12,
    lastOrderDate: new Date(now.getTime() - 8 * 24 * 60 * 60 * 1000),
    isCompleted: false,
    notes: '',
  },
  {
    id: 'check-006',
    itemId: 'item-016',
    item: getItemById('item-016')!,
    priority: 'medium',
    recommendedOrderQty: 24,
    currentStock: 12,
    weeklyAverage: 16,
    lastOrderDate: new Date(now.getTime() - 12 * 24 * 60 * 60 * 1000),
    isCompleted: false,
    notes: 'Some units expiring soon - check dates',
  },
  {
    id: 'check-007',
    itemId: 'item-023',
    item: getItemById('item-023')!,
    priority: 'medium',
    recommendedOrderQty: 200,
    currentStock: 180,
    weeklyAverage: 150,
    lastOrderDate: new Date(now.getTime() - 21 * 24 * 60 * 60 * 1000),
    isCompleted: true,
    notes: 'Ordered on Monday',
  },
  {
    id: 'check-008',
    itemId: 'item-003',
    item: getItemById('item-003')!,
    priority: 'low',
    recommendedOrderQty: 5,
    currentStock: 7,
    weeklyAverage: 4,
    lastOrderDate: new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000),
    isCompleted: false,
    notes: '',
  },
];

export const mockWeeklyChecklist: WeeklyChecklist = {
  id: 'checklist-001',
  weekStartDate: weekStart,
  weekEndDate: weekEnd,
  items: mockChecklistItems,
  generatedAt: new Date(weekStart.getTime() + 6 * 60 * 60 * 1000), // Monday 6 AM
  completedAt: undefined,
  completedBy: undefined,
};

export const getWeeklyChecklist = (): WeeklyChecklist => {
  return mockWeeklyChecklist;
};

export const getChecklistByPriority = (priority: string): ChecklistItem[] => {
  return mockChecklistItems.filter(item => item.priority === priority);
};

export const getCriticalChecklistItems = (): ChecklistItem[] => {
  return mockChecklistItems.filter(item => item.priority === 'critical');
};

export const getHighPriorityChecklistItems = (): ChecklistItem[] => {
  return mockChecklistItems.filter(item => item.priority === 'high');
};

export const getIncompleteChecklistItems = (): ChecklistItem[] => {
  return mockChecklistItems.filter(item => !item.isCompleted);
};
