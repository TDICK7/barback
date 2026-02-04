import { Sidebar, Header, SyncButton } from '@/components/layout';
import { 
  HealthScoreCard, 
  AlertsPanel, 
  VarianceChart, 
  QuickActions,
  ActivityFeed 
} from '@/components/dashboard';
import { InventoryService } from '@/lib/services';

export default async function DashboardPage() {
  // Fetch data using the service layer
  const [
    healthScore,
    alerts,
    varianceTrends,
    recentActivity,
    lastSyncTime,
  ] = await Promise.all([
    InventoryService.getInventoryHealthScore(),
    InventoryService.getActiveAlerts(),
    InventoryService.getVarianceTrends(12),
    InventoryService.getRecentActivity(8),
    InventoryService.getLastSyncTime(),
  ]);

  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <main className="pl-64">
        <Header 
          title="Dashboard" 
          subtitle={formattedDate}
          actions={<SyncButton lastSync={lastSyncTime} />}
        />
        
        <div className="p-6">
          {/* Top row - Health Score and Alerts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <HealthScoreCard data={healthScore} />
            <AlertsPanel alerts={alerts} />
          </div>
          
          {/* Middle row - Variance Chart */}
          <div className="mb-6">
            <VarianceChart data={varianceTrends} />
          </div>
          
          {/* Bottom row - Quick Actions and Activity Feed */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <QuickActions />
            <div className="lg:col-span-2">
              <ActivityFeed activities={recentActivity} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
