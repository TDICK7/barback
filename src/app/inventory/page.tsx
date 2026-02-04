import { Sidebar, Header } from '@/components/layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { InventoryService } from '@/lib/services';
import { cn } from '@/lib/utils';

export default async function InventoryPage() {
  const items = await InventoryService.getItems();

  // Group items by category
  const categories = items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof items>);

  const categoryLabels: Record<string, string> = {
    'coffee-supplies': 'Coffee Supplies',
    'milk-alternatives': 'Milk & Alternatives',
    'syrups': 'Syrups',
    'bottled-beverages': 'Bottled Beverages',
    'consumables': 'Consumables',
  };

  const getStockStatus = (item: typeof items[0]) => {
    if (item.currentQuantity <= item.reorderPoint) {
      return { label: 'Critical', className: 'bg-destructive/20 text-destructive border-destructive/30' };
    }
    if (item.currentQuantity <= item.parLevel * 0.5) {
      return { label: 'Low', className: 'bg-warning/20 text-warning border-warning/30' };
    }
    return { label: 'OK', className: 'bg-success/20 text-success border-success/30' };
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <main className="pl-64">
        <Header 
          title="Inventory" 
          subtitle="View and manage all inventory items"
        />
        
        <div className="p-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-card/50 border-border/50">
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold font-mono text-foreground">{items.length}</div>
                <div className="text-sm text-muted-foreground">Total Items</div>
              </CardContent>
            </Card>
            <Card className="bg-card/50 border-border/50">
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold font-mono text-foreground">
                  {Object.keys(categories).length}
                </div>
                <div className="text-sm text-muted-foreground">Categories</div>
              </CardContent>
            </Card>
            <Card className="bg-card/50 border-border/50">
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold font-mono text-destructive">
                  {items.filter(i => i.currentQuantity <= i.reorderPoint).length}
                </div>
                <div className="text-sm text-muted-foreground">Need Reorder</div>
              </CardContent>
            </Card>
            <Card className="bg-card/50 border-border/50">
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold font-mono text-primary">
                  ${items.reduce((sum, i) => sum + (i.currentQuantity * i.costPerUnit), 0).toFixed(0)}
                </div>
                <div className="text-sm text-muted-foreground">Total Value</div>
              </CardContent>
            </Card>
          </div>

          {/* Items by Category */}
          {Object.entries(categories).map(([category, categoryItems]) => (
            <section key={category} className="mb-8">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                {categoryLabels[category] || category}
                <span className="text-sm font-normal text-muted-foreground ml-2">
                  ({categoryItems.length} items)
                </span>
              </h2>
              
              <Card className="border-border/50 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border bg-muted/30">
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">Item</th>
                        <th className="text-right p-4 text-sm font-medium text-muted-foreground">Current</th>
                        <th className="text-right p-4 text-sm font-medium text-muted-foreground">Reorder At</th>
                        <th className="text-right p-4 text-sm font-medium text-muted-foreground">Target</th>
                        <th className="text-right p-4 text-sm font-medium text-muted-foreground">Unit Cost</th>
                        <th className="text-center p-4 text-sm font-medium text-muted-foreground">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categoryItems.map((item) => {
                        const status = getStockStatus(item);
                        return (
                          <tr key={item.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                            <td className="p-4">
                              <div className="font-medium text-foreground">{item.name}</div>
                              {item.supplier && (
                                <div className="text-xs text-muted-foreground">{item.supplier}</div>
                              )}
                            </td>
                            <td className="text-right p-4">
                              <span className="font-mono font-semibold text-foreground">
                                {item.currentQuantity}
                              </span>
                              <span className="text-muted-foreground text-sm ml-1">{item.unit}</span>
                            </td>
                            <td className="text-right p-4 font-mono text-muted-foreground">
                              {item.reorderPoint}
                            </td>
                            <td className="text-right p-4 font-mono text-muted-foreground">
                              {item.parLevel}
                            </td>
                            <td className="text-right p-4 font-mono text-muted-foreground">
                              ${item.costPerUnit.toFixed(2)}
                            </td>
                            <td className="text-center p-4">
                              <Badge variant="outline" className={cn('text-xs', status.className)}>
                                {status.label}
                              </Badge>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </Card>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
