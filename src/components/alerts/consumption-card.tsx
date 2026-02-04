'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ConsumptionData } from '@/lib/types';
import { cn } from '@/lib/utils';

interface ConsumptionCardProps {
  data: ConsumptionData[];
}

export function ConsumptionCard({ data }: ConsumptionCardProps) {
  return (
    <Card className="border-border/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Yesterday&apos;s Consumption vs Average
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {data.map((item) => {
            const isUp = item.percentChange > 0;
            const isSignificant = Math.abs(item.percentChange) > 15;
            
            return (
              <div 
                key={item.itemId} 
                className="flex items-center justify-between py-2 border-b border-border/30 last:border-0"
              >
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-medium text-foreground truncate block">
                    {item.itemName}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Avg: {item.averageQuantity}
                  </span>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm font-semibold text-foreground">
                    {item.quantity}
                  </span>
                  
                  <div className={cn(
                    'flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium',
                    isSignificant 
                      ? (isUp ? 'bg-warning/20 text-warning' : 'bg-success/20 text-success')
                      : 'bg-muted text-muted-foreground'
                  )}>
                    {isUp ? (
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                    ) : (
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                    {Math.abs(item.percentChange).toFixed(1)}%
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
