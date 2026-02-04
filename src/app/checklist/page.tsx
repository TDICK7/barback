import { Sidebar, Header } from '@/components/layout';
import { ChecklistItemCard, ChecklistHeader, VarianceAlerts } from '@/components/checklist';
import { VarianceWithName } from '@/components/checklist/variance-alerts';
import { InventoryService } from '@/lib/services';

export default async function ChecklistPage() {
  // Fetch data using the service layer
  const [
    checklist,
    varianceLogs,
    items,
  ] = await Promise.all([
    InventoryService.getWeeklyChecklist(),
    InventoryService.getHighVarianceItems(15),
    InventoryService.getItems(),
  ]);

  // Add item names to variance logs
  const variancesWithNames: VarianceWithName[] = varianceLogs.map(variance => {
    const item = items.find(i => i.id === variance.itemId);
    return {
      ...variance,
      itemName: item?.name || 'Unknown Item',
    };
  });

  // Group checklist items by priority
  const criticalItems = checklist.items.filter(i => i.priority === 'critical');
  const highItems = checklist.items.filter(i => i.priority === 'high');
  const mediumItems = checklist.items.filter(i => i.priority === 'medium');
  const lowItems = checklist.items.filter(i => i.priority === 'low');

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <main className="pl-64">
        <Header 
          title="Weekly Checklist" 
          subtitle="Inventory verification and ordering tasks"
        />
        
        <div className="p-6 max-w-5xl">
          {/* Checklist Header/Summary */}
          <div className="mb-8">
            <ChecklistHeader checklist={checklist} />
          </div>

          {/* Variance Alerts */}
          {variancesWithNames.length > 0 && (
            <div className="mb-8">
              <VarianceAlerts variances={variancesWithNames} />
            </div>
          )}

          {/* Critical Items */}
          {criticalItems.length > 0 && (
            <section className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg">🔴</span>
                <h2 className="text-lg font-semibold text-foreground">
                  Critical - Order Immediately
                </h2>
                <span className="text-sm text-muted-foreground">
                  ({criticalItems.length} items)
                </span>
              </div>
              <div className="space-y-4">
                {criticalItems.map((item) => (
                  <ChecklistItemCard key={item.id} item={item} />
                ))}
              </div>
            </section>
          )}

          {/* High Priority Items */}
          {highItems.length > 0 && (
            <section className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg">🟡</span>
                <h2 className="text-lg font-semibold text-foreground">
                  High Priority - Order This Week
                </h2>
                <span className="text-sm text-muted-foreground">
                  ({highItems.length} items)
                </span>
              </div>
              <div className="space-y-4">
                {highItems.map((item) => (
                  <ChecklistItemCard key={item.id} item={item} />
                ))}
              </div>
            </section>
          )}

          {/* Medium Priority Items */}
          {mediumItems.length > 0 && (
            <section className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg">🔵</span>
                <h2 className="text-lg font-semibold text-foreground">
                  Medium Priority
                </h2>
                <span className="text-sm text-muted-foreground">
                  ({mediumItems.length} items)
                </span>
              </div>
              <div className="space-y-4">
                {mediumItems.map((item) => (
                  <ChecklistItemCard key={item.id} item={item} />
                ))}
              </div>
            </section>
          )}

          {/* Low Priority Items */}
          {lowItems.length > 0 && (
            <section className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg">⚪</span>
                <h2 className="text-lg font-semibold text-foreground">
                  Low Priority
                </h2>
                <span className="text-sm text-muted-foreground">
                  ({lowItems.length} items)
                </span>
              </div>
              <div className="space-y-4">
                {lowItems.map((item) => (
                  <ChecklistItemCard key={item.id} item={item} />
                ))}
              </div>
            </section>
          )}

          {/* Trends Section */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg">📊</span>
              <h2 className="text-lg font-semibold text-foreground">
                Trends to Watch
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-success/10 border border-success/20">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <span className="font-medium text-foreground">Latte sales up 15%</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Compared to last month. Consider increasing espresso and milk orders.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                  </svg>
                  <span className="font-medium text-foreground">Cold Brew down 8%</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Seasonal decrease expected. May reduce concentrate orders slightly.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
