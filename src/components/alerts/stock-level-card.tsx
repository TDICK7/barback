'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Item } from '@/lib/types';
import { cn } from '@/lib/utils';

interface StockLevelCardProps {
  item: Item;
  variant: 'critical' | 'warning' | 'healthy';
}

export function StockLevelCard({ item, variant }: StockLevelCardProps) {
  const percentage = Math.min(100, (item.currentQuantity / item.parLevel) * 100);
  
  const variantStyles = {
    critical: {
      border: 'border-l-4 border-l-destructive',
      badge: 'bg-destructive/20 text-destructive',
      progress: 'bg-destructive',
      icon: '🔴',
    },
    warning: {
      border: 'border-l-4 border-l-warning',
      badge: 'bg-warning/20 text-warning',
      progress: 'bg-warning',
      icon: '🟡',
    },
    healthy: {
      border: 'border-l-4 border-l-success',
      badge: 'bg-success/20 text-success',
      progress: 'bg-success',
      icon: '✅',
    },
  };

  const styles = variantStyles[variant];

  const formatUnit = (quantity: number, unit: string) => {
    if (unit === 'units') return quantity.toString();
    return `${quantity} ${unit}`;
  };

  return (
    <Card className={cn('bg-card/50 border-border/50', styles.border)}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-foreground truncate">{item.name}</h3>
            <p className="text-sm text-muted-foreground capitalize">
              {item.category.replace('-', ' ')}
            </p>
          </div>
          <Badge variant="outline" className={cn('ml-2 shrink-0', styles.badge)}>
            {variant}
          </Badge>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Current Stock</span>
            <span className="font-mono font-semibold text-foreground">
              {formatUnit(item.currentQuantity, item.unit)}
            </span>
          </div>
          
          <div className="relative">
            <Progress 
              value={percentage} 
              className="h-2 bg-muted"
            />
            <style jsx global>{`
              [data-slot="progress-indicator"] {
                background-color: ${variant === 'critical' ? '#ef4444' : variant === 'warning' ? '#eab308' : '#22c55e'};
              }
            `}</style>
          </div>
          
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Reorder: {formatUnit(item.reorderPoint, item.unit)}</span>
            <span>Target: {formatUnit(item.parLevel, item.unit)}</span>
          </div>
          
          {item.supplier && (
            <div className="pt-2 border-t border-border/50 text-xs text-muted-foreground">
              Supplier: {item.supplier}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
