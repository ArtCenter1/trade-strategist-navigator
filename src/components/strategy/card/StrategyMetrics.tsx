
interface MetricsProps {
  metrics: {
    winRate: string;
    profitFactor: number;
    maxDrawdown: string;
  };
}

export function StrategyMetrics({ metrics }: MetricsProps) {
  return (
    <div>
      <h3 className="text-sm font-medium text-muted-foreground mb-2">Performance Metrics</h3>
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-card p-2 rounded-md border">
          <div className="text-xs text-muted-foreground">Win Rate</div>
          <div className="font-medium">{metrics.winRate}</div>
        </div>
        <div className="bg-card p-2 rounded-md border">
          <div className="text-xs text-muted-foreground">Profit Factor</div>
          <div className="font-medium">{metrics.profitFactor.toFixed(1)}</div>
        </div>
        <div className="bg-card p-2 rounded-md border">
          <div className="text-xs text-muted-foreground">Max Drawdown</div>
          <div className="font-medium">{metrics.maxDrawdown}</div>
        </div>
      </div>
    </div>
  );
}
