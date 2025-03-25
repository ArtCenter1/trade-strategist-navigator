
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { StrategyDetails } from "../types";

interface StrategyOverviewTabProps {
  strategy: StrategyDetails;
}

export function StrategyOverviewTab({ strategy }: StrategyOverviewTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Strategy Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-2">Description</h3>
          <p className="text-muted-foreground">{strategy.longDescription}</p>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-2">Trading Rules</h3>
          <ul className="list-disc pl-5 space-y-1">
            {strategy.tradingRules.map((rule, index) => (
              <li key={index} className="text-muted-foreground">{rule}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
