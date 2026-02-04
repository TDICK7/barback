'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { VarianceLog } from '@/lib/types';
import { cn } from '@/lib/utils';

// Extended type that includes the item name
export interface VarianceWithName extends VarianceLog {
  itemName: string;
}

interface VarianceAlertsProps {
  variances: VarianceWithName[];
}

export function VarianceAlerts({ variances }: VarianceAlertsProps) {
  if (variances.length === 0) return null;

  const getStatusBadge = (status: VarianceLog['investigationStatus']) => {
    switch (status) {
      case 'investigating':
        return <Badge variant="outline" className="bg-primary/20 text-primary border-primary/30">Investigating</Badge>;
      case 'resolved':
        return <Badge variant="outline" className="bg-success/20 text-success border-success/30">Resolved</Badge>;
      default:
        return <Badge variant="outline" className="bg-warning/20 text-warning border-warning/30">Pending</Badge>;
    }
  };

  return (
    <Card className="border-warning/30 bg-warning/5">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <CardTitle className="text-sm font-medium text-warning">
            Variance Alerts - Investigate
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {variances.map((variance) => (
          <div 
            key={variance.id}
            className="flex items-start justify-between p-3 rounded-lg bg-background/50 border border-border/30"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-foreground">
                  {variance.itemName}
                </span>
                {getStatusBadge(variance.investigationStatus)}
              </div>
              <div className="text-sm text-muted-foreground">
                Expected: <span className="font-mono">{variance.expected}</span> | 
                Actual: <span className="font-mono">{variance.actual}</span>
              </div>
              {variance.notes && (
                <p className="text-sm text-muted-foreground mt-1 italic">
                  {variance.notes}
                </p>
              )}
            </div>
            <div className={cn(
              'font-mono font-bold text-lg',
              variance.variancePercent > 20 ? 'text-destructive' : 'text-warning'
            )}>
              +{variance.variancePercent.toFixed(1)}%
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
