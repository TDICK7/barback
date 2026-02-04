'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert } from '@/lib/types';
import { cn } from '@/lib/utils';

interface AlertsPanelProps {
  alerts: Alert[];
  onAcknowledge?: (alertId: string) => void;
}

export function AlertsPanel({ alerts, onAcknowledge }: AlertsPanelProps) {
  const getSeverityStyles = (severity: Alert['severity']) => {
    switch (severity) {
      case 'critical':
        return {
          badge: 'bg-destructive/20 text-destructive border-destructive/30',
          icon: 'text-destructive',
          border: 'border-l-destructive',
        };
      case 'warning':
        return {
          badge: 'bg-warning/20 text-warning border-warning/30',
          icon: 'text-warning',
          border: 'border-l-warning',
        };
      default:
        return {
          badge: 'bg-primary/20 text-primary border-primary/30',
          icon: 'text-primary',
          border: 'border-l-primary',
        };
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return date.toLocaleDateString();
  };

  const activeAlerts = alerts.filter(a => a.status === 'active');

  return (
    <Card className="border-border/50">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Active Alerts
        </CardTitle>
        <Badge variant="outline" className="font-mono">
          {activeAlerts.length}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-3">
        {activeAlerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="rounded-full bg-success/10 p-3 mb-3">
              <svg className="w-6 h-6 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-sm text-muted-foreground">All clear! No active alerts.</p>
          </div>
        ) : (
          activeAlerts.slice(0, 5).map((alert) => {
            const styles = getSeverityStyles(alert.severity);
            return (
              <div
                key={alert.id}
                className={cn(
                  'group relative rounded-lg border border-l-4 bg-card p-3 transition-colors hover:bg-muted/50',
                  styles.border
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className={cn('text-xs', styles.badge)}>
                        {alert.severity}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {formatTime(alert.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm text-foreground line-clamp-2">
                      {alert.message}
                    </p>
                  </div>
                  {onAcknowledge && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onAcknowledge(alert.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </Button>
                  )}
                </div>
              </div>
            );
          })
        )}
        {activeAlerts.length > 5 && (
          <Button variant="ghost" className="w-full text-muted-foreground">
            View all {activeAlerts.length} alerts
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
