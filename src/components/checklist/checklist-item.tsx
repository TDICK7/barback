'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ChecklistItem as ChecklistItemType } from '@/lib/types';
import { cn } from '@/lib/utils';

interface ChecklistItemProps {
  item: ChecklistItemType;
  onToggle?: (itemId: string, completed: boolean) => void;
  onNotesChange?: (itemId: string, notes: string) => void;
}

export function ChecklistItemCard({ item, onToggle, onNotesChange }: ChecklistItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [notes, setNotes] = useState(item.notes || '');

  const priorityStyles = {
    critical: {
      border: 'border-l-4 border-l-destructive',
      badge: 'bg-destructive/20 text-destructive border-destructive/30',
      label: 'Critical',
    },
    high: {
      border: 'border-l-4 border-l-warning',
      badge: 'bg-warning/20 text-warning border-warning/30',
      label: 'High Priority',
    },
    medium: {
      border: 'border-l-4 border-l-primary',
      badge: 'bg-primary/20 text-primary border-primary/30',
      label: 'Medium',
    },
    low: {
      border: 'border-l-4 border-l-muted',
      badge: 'bg-muted text-muted-foreground',
      label: 'Low',
    },
  };

  const styles = priorityStyles[item.priority];

  const formatDate = (date: Date | undefined) => {
    if (!date) return 'Never';
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    return `${days} days ago`;
  };

  const handleToggle = (checked: boolean) => {
    onToggle?.(item.id, checked);
  };

  const handleNotesBlur = () => {
    if (notes !== item.notes) {
      onNotesChange?.(item.id, notes);
    }
  };

  return (
    <Card className={cn(
      'bg-card/50 border-border/50 transition-all',
      styles.border,
      item.isCompleted && 'opacity-60'
    )}>
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          {/* Checkbox */}
          <div className="pt-1">
            <Checkbox
              checked={item.isCompleted}
              onCheckedChange={handleToggle}
              className="h-5 w-5"
            />
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className={cn(
                  'font-medium text-foreground',
                  item.isCompleted && 'line-through text-muted-foreground'
                )}>
                  {item.item.name}
                </h3>
                <p className="text-sm text-muted-foreground capitalize">
                  {item.item.category.replace('-', ' ')}
                </p>
              </div>
              <Badge variant="outline" className={cn('shrink-0', styles.badge)}>
                {styles.label}
              </Badge>
            </div>

            {/* Stock Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-3 border-y border-border/30 mb-3">
              <div>
                <span className="text-xs text-muted-foreground block">Current</span>
                <span className="font-mono font-semibold text-foreground">
                  {item.currentStock} {item.item.unit}
                </span>
              </div>
              <div>
                <span className="text-xs text-muted-foreground block">Weekly Avg</span>
                <span className="font-mono font-semibold text-foreground">
                  {item.weeklyAverage} {item.item.unit}
                </span>
              </div>
              <div>
                <span className="text-xs text-muted-foreground block">Recommended</span>
                <span className="font-mono font-semibold text-primary">
                  Order {item.recommendedOrderQty} {item.item.unit}
                </span>
              </div>
              <div>
                <span className="text-xs text-muted-foreground block">Last Order</span>
                <span className="font-mono text-sm text-foreground">
                  {formatDate(item.lastOrderDate)}
                </span>
              </div>
            </div>

            {/* Variance Alert */}
            {item.variance && item.variance.variancePercent > 15 && (
              <div className="flex items-center gap-2 p-2 rounded bg-warning/10 border border-warning/20 mb-3">
                <svg className="w-4 h-4 text-warning shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div className="flex-1 text-sm">
                  <span className="font-medium text-warning">Variance Alert:</span>
                  <span className="text-muted-foreground ml-1">
                    {item.variance.variancePercent.toFixed(1)}% above expected
                    {item.variance.notes && ` - ${item.variance.notes}`}
                  </span>
                </div>
              </div>
            )}

            {/* Expand/Collapse Notes */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-muted-foreground p-0 h-auto"
            >
              <svg 
                className={cn('w-4 h-4 mr-1 transition-transform', isExpanded && 'rotate-90')} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              {notes ? 'Edit notes' : 'Add notes'}
            </Button>

            {/* Notes Field */}
            {isExpanded && (
              <div className="mt-3">
                <Textarea
                  placeholder="Add notes about this item..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  onBlur={handleNotesBlur}
                  className="min-h-[80px] bg-muted/50 border-border/50"
                />
              </div>
            )}

            {/* Existing notes display */}
            {!isExpanded && notes && (
              <p className="mt-2 text-sm text-muted-foreground italic">
                Note: {notes}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
