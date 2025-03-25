
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import type { StrategyDetails } from "../types";

interface StrategyPerformanceTabProps {
  strategy: StrategyDetails;
}

export function StrategyPerformanceTab({ strategy }: StrategyPerformanceTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Metrics</CardTitle>
        <CardDescription>
          Historical performance metrics based on backtesting against 5 years of market data.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(strategy.performanceMetrics).map(([key, value]) => (
            <div key={key} className="bg-card p-4 rounded-md border">
              <div className="text-sm text-muted-foreground">
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
              </div>
              <div className="text-xl font-medium mt-1">{value}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
