
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BacktestResult } from "@/services/backtesting/backtestingService";

interface BacktestSummaryMetricsProps {
  results: BacktestResult;
}

export function BacktestSummaryMetrics({ results }: BacktestSummaryMetricsProps) {
  const metrics = [
    {
      title: "Net Profit",
      value: `$${results.totalProfit.toFixed(2)}`,
      description: `${results.totalProfitPercentage.toFixed(2)}%`
    },
    {
      title: "Win Rate",
      value: `${results.winRate.toFixed(2)}%`,
      description: `${results.trades.length} trades`
    },
    {
      title: "Max Drawdown",
      value: `${results.maxDrawdown.toFixed(2)}%`,
      description: "Peak to trough decline"
    },
    {
      title: "Sharpe Ratio",
      value: results.sharpeRatio.toFixed(2),
      description: "Risk-adjusted return"
    },
    {
      title: "Annualized Return",
      value: `${results.annualizedReturn.toFixed(2)}%`,
      description: "Yearly performance"
    },
    {
      title: "Final Capital",
      value: `$${results.finalCapital.toFixed(2)}`,
      description: `From $${results.initialCapital.toFixed(0)}`
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {metrics.map((metric) => (
            <div key={metric.title} className="p-4 bg-card rounded-lg border">
              <h3 className="text-sm font-medium text-muted-foreground">{metric.title}</h3>
              <p className="text-2xl font-bold mt-1">{metric.value}</p>
              <p className="text-xs text-muted-foreground">{metric.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
