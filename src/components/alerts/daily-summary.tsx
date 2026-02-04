'use client';

import { Card, CardContent } from '@/components/ui/card';

interface DailySummaryProps {
  date: Date;
  criticalCount: number;
  lowStockCount: number;
  wellStockedCount: number;
}

export function DailySummary({ date, criticalCount, lowStockCount, wellStockedCount }: DailySummaryProps) {
  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const totalItems = criticalCount + lowStockCount + wellStockedCount;

  return (
    <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/20 glow-amber">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20">
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Daily Inventory Report</h2>
            <p className="text-sm text-muted-foreground">{formattedDate}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 rounded-lg bg-destructive/10">
            <div className="text-2xl font-bold font-mono text-destructive">{criticalCount}</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wide">Critical</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-warning/10">
            <div className="text-2xl font-bold font-mono text-warning">{lowStockCount}</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wide">Low Stock</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-success/10">
            <div className="text-2xl font-bold font-mono text-success">{wellStockedCount}</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wide">Well Stocked</div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-border/30 flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Total items tracked:</span>
          <span className="font-mono font-semibold text-foreground">{totalItems}</span>
        </div>
      </CardContent>
    </Card>
  );
}
