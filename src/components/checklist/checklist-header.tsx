'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { WeeklyChecklist } from '@/lib/types';

interface ChecklistHeaderProps {
  checklist: WeeklyChecklist;
  onExport?: () => void;
}

export function ChecklistHeader({ checklist, onExport }: ChecklistHeaderProps) {
  const completedCount = checklist.items.filter(i => i.isCompleted).length;
  const totalCount = checklist.items.length;
  const progressPercent = (completedCount / totalCount) * 100;

  const formatDateRange = (start: Date, end: Date) => {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    return `${start.toLocaleDateString('en-US', options)} - ${end.toLocaleDateString('en-US', options)}, ${end.getFullYear()}`;
  };

  const criticalCount = checklist.items.filter(i => i.priority === 'critical' && !i.isCompleted).length;
  const highCount = checklist.items.filter(i => i.priority === 'high' && !i.isCompleted).length;

  return (
    <Card className="bg-gradient-to-br from-secondary via-secondary/80 to-secondary/60 border-border/50">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-1">
              Weekly Inventory Checklist
            </h2>
            <p className="text-sm text-muted-foreground">
              Week of {formatDateRange(checklist.weekStartDate, checklist.weekEndDate)}
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={onExport} className="gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export PDF
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Completion Progress</span>
            <span className="font-mono text-sm font-medium text-foreground">
              {completedCount} / {totalCount} items
            </span>
          </div>
          <Progress value={progressPercent} className="h-3 bg-muted" />
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 rounded-lg bg-background/50">
            <div className="text-2xl font-bold font-mono text-foreground">{totalCount}</div>
            <div className="text-xs text-muted-foreground">Total Items</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-destructive/10">
            <div className="text-2xl font-bold font-mono text-destructive">{criticalCount}</div>
            <div className="text-xs text-muted-foreground">Critical</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-warning/10">
            <div className="text-2xl font-bold font-mono text-warning">{highCount}</div>
            <div className="text-xs text-muted-foreground">High Priority</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-success/10">
            <div className="text-2xl font-bold font-mono text-success">{completedCount}</div>
            <div className="text-xs text-muted-foreground">Completed</div>
          </div>
        </div>

        {/* Generated timestamp */}
        <div className="mt-4 pt-4 border-t border-border/30 text-xs text-muted-foreground">
          Generated on {checklist.generatedAt.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </div>
      </CardContent>
    </Card>
  );
}
