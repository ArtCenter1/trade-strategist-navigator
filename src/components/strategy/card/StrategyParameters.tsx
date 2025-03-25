
type StrategyParametersProps = {
  parameters: Record<string, any>;
};

export function StrategyParameters({ parameters }: StrategyParametersProps) {
  return (
    <div>
      <h3 className="text-sm font-medium text-muted-foreground mb-2">Key Parameters</h3>
      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
        {Object.entries(parameters).slice(0, 4).map(([key, value]) => (
          <div key={key} className="flex justify-between">
            <span className="text-sm text-muted-foreground">{key}:</span>
            <span className="text-sm font-medium">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
