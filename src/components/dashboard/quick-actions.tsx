'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface QuickActionsProps {
  onSync?: () => void;
  onGenerateChecklist?: () => void;
  onExportReport?: () => void;
}

export function QuickActions({ onSync, onGenerateChecklist, onExportReport }: QuickActionsProps) {
  const actions = [
    {
      label: 'Sync POS',
      description: 'Pull latest from Clover',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      onClick: onSync,
      variant: 'default' as const,
    },
    {
      label: 'Generate Checklist',
      description: 'Create weekly tasks',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      onClick: onGenerateChecklist,
      variant: 'outline' as const,
    },
    {
      label: 'Export Report',
      description: 'Download PDF/CSV',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      onClick: onExportReport,
      variant: 'outline' as const,
    },
  ];

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {actions.map((action) => (
          <Button
            key={action.label}
            variant={action.variant}
            className="w-full justify-start gap-3 h-auto py-3"
            onClick={action.onClick}
          >
            <div className={action.variant === 'default' ? 'text-primary-foreground' : 'text-primary'}>
              {action.icon}
            </div>
            <div className="text-left">
              <div className="font-medium">{action.label}</div>
              <div className={`text-xs ${action.variant === 'default' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                {action.description}
              </div>
            </div>
          </Button>
        ))}
        
        <div className="pt-2 border-t border-border">
          <Link href="/checklist">
            <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M9 5l7 7-7 7" />
              </svg>
              View Weekly Checklist
            </Button>
          </Link>
          <Link href="/alerts">
            <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M9 5l7 7-7 7" />
              </svg>
              View Daily Alerts
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
