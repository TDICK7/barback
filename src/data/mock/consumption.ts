import { ConsumptionData, VarianceTrend, VarianceLog } from '@/lib/types';

const now = new Date();

// Yesterday's consumption data compared to 7-day averages
export const mockConsumptionData: ConsumptionData[] = [
  {
    itemId: 'item-001',
    itemName: 'Lattes (Espresso)',
    date: new Date(now.getTime() - 24 * 60 * 60 * 1000),
    quantity: 45,
    averageQuantity: 42,
    percentChange: 7.1,
  },
  {
    itemId: 'item-002',
    itemName: 'Cold Brew',
    date: new Date(now.getTime() - 24 * 60 * 60 * 1000),
    quantity: 28,
    averageQuantity: 32,
    percentChange: -12.5,
  },
  {
    itemId: 'item-004',
    itemName: 'Whole Milk',
    date: new Date(now.getTime() - 24 * 60 * 60 * 1000),
    quantity: 3.5,
    averageQuantity: 3.2,
    percentChange: 9.4,
  },
  {
    itemId: 'item-006',
    itemName: 'Oat Milk',
    date: new Date(now.getTime() - 24 * 60 * 60 * 1000),
    quantity: 2.8,
    averageQuantity: 2.4,
    percentChange: 16.7,
  },
  {
    itemId: 'item-008',
    itemName: 'Vanilla Syrup',
    date: new Date(now.getTime() - 24 * 60 * 60 * 1000),
    quantity: 1.2,
    averageQuantity: 1.0,
    percentChange: 20.0,
  },
  {
    itemId: 'item-012',
    itemName: 'Bottled Water',
    date: new Date(now.getTime() - 24 * 60 * 60 * 1000),
    quantity: 35,
    averageQuantity: 28,
    percentChange: 25.0,
  },
];

// 12-week variance trend for charts
export const mockVarianceTrends: VarianceTrend[] = [
  { weekNumber: 1, weekLabel: 'Nov 11', totalVariancePercent: 8.2, itemsWithVariance: 3 },
  { weekNumber: 2, weekLabel: 'Nov 18', totalVariancePercent: 5.1, itemsWithVariance: 2 },
  { weekNumber: 3, weekLabel: 'Nov 25', totalVariancePercent: 12.4, itemsWithVariance: 5 },
  { weekNumber: 4, weekLabel: 'Dec 2', totalVariancePercent: 6.8, itemsWithVariance: 4 },
  { weekNumber: 5, weekLabel: 'Dec 9', totalVariancePercent: 4.2, itemsWithVariance: 2 },
  { weekNumber: 6, weekLabel: 'Dec 16', totalVariancePercent: 15.3, itemsWithVariance: 6 },
  { weekNumber: 7, weekLabel: 'Dec 23', totalVariancePercent: 18.7, itemsWithVariance: 8 },
  { weekNumber: 8, weekLabel: 'Dec 30', totalVariancePercent: 9.5, itemsWithVariance: 4 },
  { weekNumber: 9, weekLabel: 'Jan 6', totalVariancePercent: 7.1, itemsWithVariance: 3 },
  { weekNumber: 10, weekLabel: 'Jan 13', totalVariancePercent: 5.8, itemsWithVariance: 2 },
  { weekNumber: 11, weekLabel: 'Jan 20', totalVariancePercent: 8.9, itemsWithVariance: 4 },
  { weekNumber: 12, weekLabel: 'Jan 27', totalVariancePercent: 11.2, itemsWithVariance: 5 },
];

// Current week's variance logs
export const mockVarianceLogs: VarianceLog[] = [
  {
    id: 'var-001',
    itemId: 'item-012',
    expected: 200,
    actual: 245,
    variancePercent: 22.5,
    date: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
    notes: 'Possible unrecorded sales or sampling',
    investigationStatus: 'investigating',
  },
  {
    id: 'var-002',
    itemId: 'item-002',
    expected: 2.5,
    actual: 2.9,
    variancePercent: 16.0,
    date: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
    notes: 'Higher than expected cold brew consumption',
    investigationStatus: 'pending',
  },
  {
    id: 'var-003',
    itemId: 'item-004',
    expected: 18,
    actual: 21,
    variancePercent: 16.7,
    date: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
    notes: 'Possible spoilage or increased demand',
    investigationStatus: 'pending',
  },
  {
    id: 'var-004',
    itemId: 'item-008',
    expected: 10,
    actual: 12,
    variancePercent: 20.0,
    date: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
    investigationStatus: 'pending',
  },
];

export const getRecentConsumption = (): ConsumptionData[] => {
  return mockConsumptionData;
};

export const getVarianceTrends = (): VarianceTrend[] => {
  return mockVarianceTrends;
};

export const getVarianceLogs = (): VarianceLog[] => {
  return mockVarianceLogs;
};

export const getHighVarianceItems = (): VarianceLog[] => {
  return mockVarianceLogs.filter(v => Math.abs(v.variancePercent) >= 15);
};
