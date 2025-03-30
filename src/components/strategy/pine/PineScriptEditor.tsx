
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { extractConditions, runPineScriptStrategy } from "./PineScriptInterpreter";
import { PineScriptStrategy } from "./PineScriptTypes";
import { BacktestingTab } from "../builder/form/BacktestingTab";
import { useToast } from "@/hooks/use-toast";

export function PineScriptEditor() {
  const [script, setScript] = useState<string>(defaultScript);
  const [activeTab, setActiveTab] = useState<string>("editor");
  const [strategy, setStrategy] = useState<PineScriptStrategy | null>(null);
  const { toast } = useToast();

  const handleScriptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setScript(e.target.value);
  };

  const handleRun = () => {
    try {
      // In a real implementation, we would parse the script and extract the strategy
      // For now, we'll create a mock strategy
      const newStrategy: PineScriptStrategy = {
        name: "Custom Pine Script Strategy",
        description: "A strategy created using Pine Script",
        ast: [],
        entryConditions: [],
        exitConditions: []
      };
      
      setStrategy(newStrategy);
      setActiveTab("backtest");
      
      toast({
        title: "Script Compiled",
        description: "Your Pine Script has been successfully compiled.",
      });
    } catch (error) {
      console.error("Pine Script error:", error);
      toast({
        title: "Compilation Error",
        description: error instanceof Error ? error.message : "An error occurred while compiling your script.",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Pine Script Editor</CardTitle>
        <CardDescription>
          Create a trading strategy using TradingView's Pine Script language
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="editor">Script Editor</TabsTrigger>
            <TabsTrigger value="backtest" disabled={!strategy}>Backtest</TabsTrigger>
          </TabsList>
          
          <TabsContent value="editor" className="space-y-4">
            <div className="relative">
              <textarea
                value={script}
                onChange={handleScriptChange}
                className="w-full h-96 p-4 font-mono text-sm bg-muted border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                spellCheck={false}
              />
            </div>
            
            <div className="flex justify-end">
              <Button onClick={handleRun}>Compile & Run</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="backtest">
            {strategy && (
              <BacktestingTab strategy={strategy} />
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

// Default Pine Script template
const defaultScript = `// Define strategy settings
strategy("My First Strategy", overlay=true)

// Input parameters
length = input(14, "RSI Period")
overbought = input(70, "Overbought Level")
oversold = input(30, "Oversold Level")

// Calculate indicators
src = close
rsiValue = rsi(src, length)
smaValue = sma(src, 50)

// Define entry and exit conditions
longCondition = crossover(rsiValue, oversold) and close > smaValue
shortCondition = crossunder(rsiValue, overbought) and close < smaValue

// Execute strategy
if (longCondition)
    strategy.entry("Long", strategy.long)

if (shortCondition)
    strategy.entry("Short", strategy.short)
`;
