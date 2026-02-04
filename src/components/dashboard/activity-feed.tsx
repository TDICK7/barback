'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ActivityLogEntry } from '@/data/mock/activity';
import { cn } from '@/lib/utils';

interface ActivityFeedProps {
  activities: ActivityLogEntry[];
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  const getTypeIcon = (type: ActivityLogEntry['type']) => {
    switch (type) {
      case 'sync':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        );
      case 'order':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        );
      case 'count':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        );
      case 'alert':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        );
      case 'adjustment':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        );
    }
  };

  const getTypeColor = (type: ActivityLogEntry['type']) => {
    switch (type) {
      case 'sync': return 'bg-primary/10 text-primary';
      case 'order': return 'bg-success/10 text-success';
      case 'count': return 'bg-blue-500/10 text-blue-400';
      case 'alert': return 'bg-warning/10 text-warning';
      case 'adjustment': return 'bg-purple-500/10 text-purple-400';
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={activity.id} className="flex gap-3">
              {/* Timeline */}
              <div className="flex flex-col items-center">
                <div className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full',
                  getTypeColor(activity.type)
                )}>
                  {getTypeIcon(activity.type)}
                </div>
                {index < activities.length - 1 && (
                  <div className="w-px flex-1 bg-border mt-2" />
                )}
              </div>
              
              {/* Content */}
              <div className="flex-1 pb-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-foreground">
                    {activity.action}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formatTime(activity.timestamp)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {activity.description}
                </p>
                <span className="text-xs text-muted-foreground/70">
                  by {activity.user}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
