
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { PineScriptParser } from "./PineScriptParser";
import { PineScriptInterpreter } from "./PineScriptInterpreter";

const EXAMPLE_SCRIPT = `
// Simple Moving Average Crossover Strategy
strategy.name = "SMA Crossover"
strategy.description = "A basic strategy that goes long when fast SMA crosses above slow SMA, and exits when it crosses below"

// Input parameters
fastLength = 9
slowLength = 21

// Calculate indicators
fastSMA = sma(close, fastLength)
slowSMA = sma(close, slowLength)

// Entry and exit conditions
longCondition = crossover(fastSMA, slowSMA)
shortCondition = crossover(slowSMA, fastSMA)

// Strategy entries and exits
if (longCondition) {
    strategy.entry("Long", "long", when = longCondition)
}

if (shortCondition) {
    strategy.exit("Exit Long", "Long", when = shortCondition)
}
`.trim();

export function PineScriptEditor() {
  const [script, setScript] = useState(EXAMPLE_SCRIPT);
  const [parsedStrategy, setParsedStrategy] = useState<any>(null);
  const { toast } = useToast();
  
  const handleParseScript = () => {
    try {
      const parser = new PineScriptParser();
      const strategy = parser.parse(script);
      setParsedStrategy(strategy);
      
      // For demonstration purposes, evaluate the strategy
      const interpreter = new PineScriptInterpreter();
      interpreter.evaluateStrategy(strategy.ast);
      
      toast({
        title: "Script Parsed Successfully",
        description: `Strategy name: ${strategy.name}`,
      });
    } catch (error) {
      console.error("Error parsing Pine Script:", error);
      toast({
        title: "Error Parsing Script",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Pine Script Editor</CardTitle>
        <CardDescription>
          Write custom trading strategies using Pine Script syntax
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea
          className="font-mono h-96"
          value={script}
          onChange={(e) => setScript(e.target.value)}
          placeholder="Enter your Pine Script code here..."
        />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => setScript(EXAMPLE_SCRIPT)}>
          Load Example
        </Button>
        <Button onClick={handleParseScript}>
          Parse Strategy
        </Button>
      </CardFooter>
      
      {parsedStrategy && (
        <CardContent className="border-t pt-4">
          <h3 className="text-lg font-medium mb-2">Parsed Strategy</h3>
          <pre className="bg-muted p-4 rounded-md text-sm overflow-auto max-h-60">
            {JSON.stringify(parsedStrategy, null, 2)}
          </pre>
        </CardContent>
      )}
    </Card>
  );
}
