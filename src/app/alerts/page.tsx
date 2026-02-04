import { Sidebar, Header } from '@/components/layout';
import { StockLevelCard, ConsumptionCard, DailySummary } from '@/components/alerts';
import { InventoryService } from '@/lib/services';

export default async function AlertsPage() {
  // Fetch data using the service layer
  const [
    criticalItems,
    lowStockItems,
    wellStockedItems,
    consumptionData,
  ] = await Promise.all([
    InventoryService.getCriticalItems(),
    InventoryService.getLowStockItems(),
    InventoryService.getWellStockedItems(),
    InventoryService.getConsumptionData(),
  ]);

  const today = new Date();

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <main className="pl-64">
        <Header 
          title="Daily Alerts" 
          subtitle="Morning inventory snapshot for brewers"
        />
        
        <div className="p-6 max-w-6xl">
          {/* Daily Summary Card */}
          <div className="mb-8">
            <DailySummary 
              date={today}
              criticalCount={criticalItems.length}
              lowStockCount={lowStockItems.length}
              wellStockedCount={wellStockedItems.length}
            />
          </div>

          {/* Critical Items Section */}
          {criticalItems.length > 0 && (
            <section className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg">🔴</span>
                <h2 className="text-lg font-semibold text-foreground">
                  Critical - Order Today
                </h2>
                <span className="text-sm text-muted-foreground">
                  ({criticalItems.length} items)
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {criticalItems.map((item) => (
                  <StockLevelCard key={item.id} item={item} variant="critical" />
                ))}
              </div>
            </section>
          )}

          {/* Low Stock Section */}
          {lowStockItems.length > 0 && (
            <section className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg">🟡</span>
                <h2 className="text-lg font-semibold text-foreground">
                  Low Stock - Order Soon
                </h2>
                <span className="text-sm text-muted-foreground">
                  ({lowStockItems.length} items)
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {lowStockItems.map((item) => (
                  <StockLevelCard key={item.id} item={item} variant="warning" />
                ))}
              </div>
            </section>
          )}

          {/* Consumption Comparison */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg">📊</span>
              <h2 className="text-lg font-semibold text-foreground">
                Consumption Analysis
              </h2>
            </div>
            <div className="max-w-2xl">
              <ConsumptionCard data={consumptionData} />
            </div>
          </section>

          {/* Well Stocked Section */}
          {wellStockedItems.length > 0 && (
            <section className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg">✅</span>
                <h2 className="text-lg font-semibold text-foreground">
                  Well Stocked
                </h2>
                <span className="text-sm text-muted-foreground">
                  ({wellStockedItems.length} items)
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {wellStockedItems.slice(0, 8).map((item) => (
                  <StockLevelCard key={item.id} item={item} variant="healthy" />
                ))}
              </div>
              {wellStockedItems.length > 8 && (
                <p className="mt-4 text-sm text-muted-foreground text-center">
                  +{wellStockedItems.length - 8} more items well stocked
                </p>
              )}
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
