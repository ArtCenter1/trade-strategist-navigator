
import { useState } from "react";
import { Strategy } from "@/components/Strategy";
import { StrategyFormValues } from "./BasicSettingsTab";
import { BacktestConfig } from "../../backtest/BacktestConfig";
import { BacktestResults } from "../../backtest/BacktestResults";
import { BacktestResult, runBacktest } from "@/services/backtesting/backtestingService";
import { PineScriptStrategy } from "../../pine/PineScriptTypes";
import { useToast } from "@/hooks/use-toast";

interface BacktestingTabProps {
  strategy: Strategy | StrategyFormValues | PineScriptStrategy;
  selectedIndicators?: string[];
  rules?: any[];
}

export function BacktestingTab({ strategy, selectedIndicators = [], rules = [] }: BacktestingTabProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<BacktestResult | null>(null);
  const { toast } = useToast();

  const handleRunBacktest = async (config: any) => {
    try {
      setIsLoading(true);
      
      // In a real application, you would send this data to a backend service
      // Here we're using a mock implementation
      const backtestResults = await runBacktest(
        strategy,
        config.symbol,
        config.timeframe,
        config.days,
        config.initialCapital
      );
      
      setResults(backtestResults);
      
      toast({
        title: "Backtest Completed",
        description: "Your strategy has been successfully backtested.",
      });
    } catch (error) {
      console.error("Backtest error:", error);
      toast({
        title: "Backtest Failed",
        description: "An error occurred while running the backtest.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <BacktestConfig 
        strategy={strategy} 
        onRunBacktest={handleRunBacktest} 
        isLoading={isLoading} 
      />
      
      <BacktestResults 
        results={results} 
        isLoading={isLoading} 
      />
    </div>
  );
}
