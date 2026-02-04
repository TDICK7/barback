'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InventoryHealthScore } from '@/lib/types';

interface HealthScoreProps {
  data: InventoryHealthScore;
}

export function HealthScoreCard({ data }: HealthScoreProps) {
  const { score, criticalItems, lowStockItems, wellStockedItems } = data;
  
  // Determine color based on score
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const getScoreGradient = (score: number) => {
    if (score >= 80) return 'from-success/20 to-success/5';
    if (score >= 60) return 'from-warning/20 to-warning/5';
    return 'from-destructive/20 to-destructive/5';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Healthy';
    if (score >= 60) return 'Needs Attention';
    return 'Critical';
  };

  // Calculate circumference for SVG gauge
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <Card className={`bg-gradient-to-br ${getScoreGradient(score)} border-border/50`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Inventory Health
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-6">
          {/* Circular Gauge */}
          <div className="relative">
            <svg width="160" height="160" className="transform -rotate-90">
              {/* Background circle */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                fill="none"
                stroke="currentColor"
                strokeWidth="12"
                className="text-muted/30"
              />
              {/* Progress circle */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                fill="none"
                stroke="currentColor"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className={getScoreColor(score)}
                style={{ transition: 'stroke-dashoffset 0.5s ease' }}
              />
            </svg>
            {/* Score text in center */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-4xl font-bold font-mono ${getScoreColor(score)}`}>
                {score}
              </span>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">
                {getScoreLabel(score)}
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex-1 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-destructive animate-pulse-slow" />
                <span className="text-sm text-muted-foreground">Critical</span>
              </div>
              <span className="font-mono font-semibold text-destructive">{criticalItems}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-warning" />
                <span className="text-sm text-muted-foreground">Low Stock</span>
              </div>
              <span className="font-mono font-semibold text-warning">{lowStockItems}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-success" />
                <span className="text-sm text-muted-foreground">Well Stocked</span>
              </div>
              <span className="font-mono font-semibold text-success">{wellStockedItems}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
