
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { BacktestResult, Trade } from "@/services/backtesting/backtestingService";
import { BacktestEquityCurve } from "./BacktestEquityCurve";
import { BacktestDrawdown } from "./BacktestDrawdown";
import { BacktestTradesTable } from "./BacktestTradesTable";
import { BacktestSummaryMetrics } from "./BacktestSummaryMetrics";

interface BacktestResultsProps {
  results: BacktestResult | null;
  isLoading: boolean;
}

export function BacktestResults({ results, isLoading }: BacktestResultsProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <span className="ml-2">Running backtest...</span>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="text-center p-8 text-muted-foreground">
        No backtest results yet. Configure and run a backtest to see results.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <BacktestSummaryMetrics results={results} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BacktestEquityCurve equityCurve={results.equityCurve} />
        <BacktestDrawdown drawdowns={results.drawdowns} />
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Trade History</CardTitle>
        </CardHeader>
        <CardContent>
          <BacktestTradesTable trades={results.trades} />
        </CardContent>
      </Card>
    </div>
  );
}
