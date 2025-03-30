
import { Button } from "@/components/ui/button";
import { StrategyBuilder as StrategyBuilderTool } from "@/components/strategy/builder/StrategyBuilder";

export default function StrategyBuilder() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Strategy Builder</h2>
      </div>
      
      <p className="text-muted-foreground">
        Create a custom trading strategy with your own rules and parameters. Define entry and exit conditions based on technical indicators.
      </p>
      
      <StrategyBuilderTool />
    </div>
  );
}
