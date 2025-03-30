
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getStrategyById } from "@/components/strategy/StrategyDetailData";
import { ComparisonChart } from "./ComparisonChart";
import { ComparisonTable } from "./ComparisonTable";
import { X } from "lucide-react";
import type { Strategy } from "@/components/Strategy";

export function StrategyComparisonTool() {
  const [selectedStrategies, setSelectedStrategies] = useState<string[]>([]);
  const [selectedStrategyToAdd, setSelectedStrategyToAdd] = useState<string>("");
  
  // Mock data for available strategies
  const availableStrategies = [
    { id: 'rsi', name: 'RSI Strategy' },
    { id: 'bollinger', name: 'Bollinger Bands' },
    { id: 'macd', name: 'MACD Strategy' },
    { id: 'moving-average', name: 'Moving Average Crossover' },
    { id: 'fibonacci', name: 'Fibonacci Retracement' },
  ];
  
  const addStrategy = () => {
    if (selectedStrategyToAdd && !selectedStrategies.includes(selectedStrategyToAdd)) {
      setSelectedStrategies([...selectedStrategies, selectedStrategyToAdd]);
      setSelectedStrategyToAdd("");
    }
  };
  
  const removeStrategy = (id: string) => {
    setSelectedStrategies(selectedStrategies.filter(s => s !== id));
  };
  
  const strategiesData = selectedStrategies.map(id => getStrategyById(id)).filter(Boolean) as Strategy[];
  
  const filteredAvailableStrategies = availableStrategies.filter(
    strategy => !selectedStrategies.includes(strategy.id)
  );
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Strategy Comparison</CardTitle>
        <CardDescription>
          Compare multiple trading strategies to find the best fit for your needs
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-end gap-2">
          <div className="flex-1">
            <Select value={selectedStrategyToAdd} onValueChange={setSelectedStrategyToAdd}>
              <SelectTrigger>
                <SelectValue placeholder="Select a strategy to compare" />
              </SelectTrigger>
              <SelectContent>
                {filteredAvailableStrategies.map(strategy => (
                  <SelectItem key={strategy.id} value={strategy.id}>
                    {strategy.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button 
            onClick={addStrategy} 
            disabled={!selectedStrategyToAdd || selectedStrategies.length >= 3}
          >
            Add to Comparison
          </Button>
        </div>
        
        {selectedStrategies.length > 0 ? (
          <>
            <div className="flex flex-wrap gap-2">
              {selectedStrategies.map(id => {
                const strategy = getStrategyById(id);
                if (!strategy) return null;
                
                return (
                  <div key={id} className="flex items-center rounded-md bg-accent px-3 py-1 text-sm">
                    <span>{strategy.name}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-1 h-5 w-5 p-0"
                      onClick={() => removeStrategy(id)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                );
              })}
            </div>
            
            {strategiesData.length >= 2 && (
              <>
                <ComparisonChart strategies={strategiesData} />
                <ComparisonTable strategies={strategiesData} />
              </>
            )}
          </>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            Select strategies to compare their performance and features
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <p className="text-xs text-muted-foreground">
          Compare up to 3 strategies at once for better visual comparison
        </p>
      </CardFooter>
    </Card>
  );
}
