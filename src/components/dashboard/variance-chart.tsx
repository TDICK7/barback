'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { VarianceTrend } from '@/lib/types';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';

interface VarianceChartProps {
  data: VarianceTrend[];
}

export function VarianceChart({ data }: VarianceChartProps) {
  const avgVariance = data.reduce((sum, d) => sum + d.totalVariancePercent, 0) / data.length;

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Variance Trend (12 Weeks)
          </CardTitle>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-muted-foreground">Variance %</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-8 h-0.5 bg-warning/50" style={{ borderStyle: 'dashed' }} />
              <span className="text-muted-foreground">15% Threshold</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis 
                dataKey="weekLabel" 
                tick={{ fill: '#71717a', fontSize: 11 }}
                tickLine={{ stroke: '#27272a' }}
                axisLine={{ stroke: '#27272a' }}
              />
              <YAxis 
                tick={{ fill: '#71717a', fontSize: 11 }}
                tickLine={{ stroke: '#27272a' }}
                axisLine={{ stroke: '#27272a' }}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#141419',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                }}
                labelStyle={{ color: '#fafafa', fontWeight: 600, marginBottom: 4 }}
                itemStyle={{ color: '#a1a1aa', fontSize: 12 }}
                formatter={(value) => value !== undefined ? [`${Number(value).toFixed(1)}%`, 'Variance'] : ['', 'Variance']}
              />
              {/* Warning threshold line */}
              <ReferenceLine 
                y={15} 
                stroke="#eab308" 
                strokeDasharray="5 5" 
                strokeOpacity={0.5}
              />
              {/* Danger threshold line */}
              <ReferenceLine 
                y={20} 
                stroke="#ef4444" 
                strokeDasharray="5 5" 
                strokeOpacity={0.3}
              />
              <Line
                type="monotone"
                dataKey="totalVariancePercent"
                stroke="#f59e0b"
                strokeWidth={2}
                dot={{
                  fill: '#141419',
                  stroke: '#f59e0b',
                  strokeWidth: 2,
                  r: 4,
                }}
                activeDot={{
                  fill: '#f59e0b',
                  stroke: '#141419',
                  strokeWidth: 2,
                  r: 6,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Average:</span>
            <span className="font-mono font-semibold text-foreground">
              {avgVariance.toFixed(1)}%
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Latest:</span>
            <span className={`font-mono font-semibold ${
              data[data.length - 1]?.totalVariancePercent > 15 
                ? 'text-warning' 
                : 'text-foreground'
            }`}>
              {data[data.length - 1]?.totalVariancePercent.toFixed(1)}%
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
