
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X } from "lucide-react";
import type { Strategy } from "@/components/Strategy";

interface ComparisonTableProps {
  strategies: Strategy[];
}

export function ComparisonTable({ strategies }: ComparisonTableProps) {
  // Define the metrics to compare
  const metrics = [
    { label: "Win Rate", key: "winRate", suffix: "%" },
    { label: "Avg. Profit", key: "avgProfit", suffix: "%" },
    { label: "Max Drawdown", key: "maxDrawdown", suffix: "%" },
    { label: "Sharpe Ratio", key: "sharpeRatio", suffix: "" },
    { label: "Risk Level", key: "riskLevel", suffix: "" },
  ];
  
  // Define feature comparison (for this demo, we'll create some mock features)
  const features = [
    { label: "Automatic Rebalancing", mapping: { "rsi": true, "bollinger": true, "macd": false, "moving-average": true, "fibonacci": false } },
    { label: "Stop Loss Integration", mapping: { "rsi": true, "bollinger": true, "macd": true, "moving-average": false, "fibonacci": true } },
    { label: "Multiple Timeframes", mapping: { "rsi": false, "bollinger": true, "macd": true, "moving-average": true, "fibonacci": false } },
    { label: "Custom Alerts", mapping: { "rsi": true, "bollinger": false, "macd": true, "moving-average": false, "fibonacci": true } },
  ];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Strategy Metrics Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <Table className="border">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Metric</TableHead>
              {strategies.map(strategy => (
                <TableHead key={strategy.id} className="text-center">
                  {strategy.name}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {metrics.map(metric => (
              <TableRow key={metric.label}>
                <TableCell className="font-medium">{metric.label}</TableCell>
                {strategies.map(strategy => {
                  // For risk level, just display the value
                  if (metric.key === "riskLevel") {
                    return (
                      <TableCell key={strategy.id} className="text-center">
                        <span className="capitalize">{strategy.riskLevel}</span>
                      </TableCell>
                    );
                  }
                  
                  // For performance metrics, display the value with suffix
                  return (
                    <TableCell key={strategy.id} className="text-center">
                      {strategy.performanceMetrics[metric.key as keyof typeof strategy.performanceMetrics]}{metric.suffix}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
            
            {/* Features comparison */}
            <TableRow>
              <TableCell colSpan={strategies.length + 1} className="bg-muted/50">
                <span className="font-semibold">Features</span>
              </TableCell>
            </TableRow>
            
            {features.map(feature => (
              <TableRow key={feature.label}>
                <TableCell className="font-medium">{feature.label}</TableCell>
                {strategies.map(strategy => {
                  const hasFeature = feature.mapping[strategy.id as keyof typeof feature.mapping];
                  
                  return (
                    <TableCell key={strategy.id} className="text-center">
                      {hasFeature ? (
                        <Check className="h-4 w-4 mx-auto text-green-500" />
                      ) : (
                        <X className="h-4 w-4 mx-auto text-red-500" />
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
