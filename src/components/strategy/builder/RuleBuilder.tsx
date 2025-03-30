
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown, ChevronUp, ArrowRight, Trash2 } from "lucide-react";

interface RuleBuilderProps {
  rules: any[];
  setRules: (rules: any[]) => void;
  selectedIndicators: string[];
}

// Mock indicator data for rule building
const getIndicatorData = (id: string) => {
  const indicators: Record<string, { name: string; conditions: string[] }> = {
    "rsi": {
      name: "RSI",
      conditions: ["crosses above", "crosses below", "is above", "is below"]
    },
    "macd": {
      name: "MACD",
      conditions: ["crosses signal line", "is above signal line", "is below signal line", "histogram increasing", "histogram decreasing"]
    },
    "bollinger": {
      name: "Bollinger Bands",
      conditions: ["price crosses upper band", "price crosses lower band", "price is above upper band", "price is below lower band", "bandwidth increasing", "bandwidth decreasing"]
    },
    "sma": {
      name: "SMA",
      conditions: ["crosses above", "crosses below", "is above", "is below"]
    },
    "ema": {
      name: "EMA",
      conditions: ["crosses above", "crosses below", "is above", "is below"]
    },
    "stochastic": {
      name: "Stochastic",
      conditions: ["%K crosses above %D", "%K crosses below %D", "is above 80", "is below 20"]
    },
    "adx": {
      name: "ADX",
      conditions: ["is above", "is below", "is increasing", "is decreasing"]
    },
    "atr": {
      name: "ATR",
      conditions: ["is above", "is below", "is increasing", "is decreasing"]
    },
    "obv": {
      name: "OBV",
      conditions: ["is increasing", "is decreasing", "diverges positively", "diverges negatively"]
    }
  };
  
  return indicators[id] || { name: id, conditions: [] };
};

export function RuleBuilder({ rules, setRules, selectedIndicators }: RuleBuilderProps) {
  const [indicatorId, setIndicatorId] = useState<string>("");
  const [condition, setCondition] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [action, setAction] = useState<string>("buy");
  const bottomRef = useRef<HTMLDivElement>(null);
  
  const addRule = () => {
    if (!indicatorId || !condition) return;
    
    const indicatorData = getIndicatorData(indicatorId);
    const needsValue = condition.includes("above") || condition.includes("below");
    
    if (needsValue && !value) return;
    
    const newRule = {
      id: Date.now().toString(),
      indicator: indicatorId,
      indicatorName: indicatorData.name,
      condition,
      value: needsValue ? value : null,
      action
    };
    
    setRules([...rules, newRule]);
    
    // Reset form
    setIndicatorId("");
    setCondition("");
    setValue("");
    
    // Scroll to bottom
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };
  
  const removeRule = (id: string) => {
    setRules(rules.filter(rule => rule.id !== id));
  };
  
  const moveRule = (id: string, direction: "up" | "down") => {
    const index = rules.findIndex(rule => rule.id === id);
    if (
      (direction === "up" && index === 0) || 
      (direction === "down" && index === rules.length - 1)
    ) {
      return;
    }
    
    const newRules = [...rules];
    const newIndex = direction === "up" ? index - 1 : index + 1;
    
    const rule = newRules[index];
    newRules.splice(index, 1);
    newRules.splice(newIndex, 0, rule);
    
    setRules(newRules);
  };
  
  const selectedIndicator = indicatorId ? getIndicatorData(indicatorId) : null;
  const conditions = selectedIndicator?.conditions || [];
  const needsValue = condition.includes("above") || condition.includes("below");
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Trading Rules</CardTitle>
          <CardDescription>
            Create rules that determine when to buy or sell
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="indicator">Indicator</Label>
              <Select value={indicatorId} onValueChange={setIndicatorId}>
                <SelectTrigger id="indicator">
                  <SelectValue placeholder="Select indicator" />
                </SelectTrigger>
                <SelectContent>
                  {selectedIndicators.map(id => {
                    const indicator = getIndicatorData(id);
                    return (
                      <SelectItem key={id} value={id}>
                        {indicator.name}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="condition">Condition</Label>
              <Select 
                value={condition} 
                onValueChange={setCondition}
                disabled={!indicatorId}
              >
                <SelectTrigger id="condition">
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
                <SelectContent>
                  {conditions.map(cond => (
                    <SelectItem key={cond} value={cond}>
                      {cond}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {needsValue && (
              <div>
                <Label htmlFor="value">Value</Label>
                <Input
                  id="value"
                  placeholder="Enter value"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            <div>
              <Label>Action</Label>
              <div className="flex mt-2">
                <Button
                  type="button"
                  variant={action === "buy" ? "default" : "outline"}
                  className="rounded-r-none"
                  onClick={() => setAction("buy")}
                >
                  Buy
                </Button>
                <Button
                  type="button"
                  variant={action === "sell" ? "default" : "outline"}
                  className="rounded-l-none"
                  onClick={() => setAction("sell")}
                >
                  Sell
                </Button>
              </div>
            </div>
            
            <Button 
              onClick={addRule}
              disabled={!indicatorId || !condition || (needsValue && !value)}
              className="mt-auto"
            >
              Add Rule
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Rule Set</CardTitle>
          <CardDescription>
            {rules.length > 0 
              ? "Rules will be evaluated in order from top to bottom" 
              : "Add rules to create your trading strategy"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {rules.length > 0 ? (
            <ScrollArea className="h-[250px] pr-4">
              <div className="space-y-3">
                {rules.map((rule, index) => (
                  <div 
                    key={rule.id}
                    className="flex items-center justify-between p-3 rounded-md border bg-background"
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${rule.action === "buy" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                        {index + 1}
                      </div>
                      <div className="flex flex-wrap items-center gap-1">
                        <span className="font-medium">{rule.indicatorName}</span>
                        <span className="text-muted-foreground">{rule.condition}</span>
                        {rule.value && <span className="font-medium">{rule.value}</span>}
                        <ArrowRight className="h-3 w-3 mx-1" />
                        <span className={rule.action === "buy" ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                          {rule.action.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => moveRule(rule.id, "up")}
                        disabled={index === 0}
                      >
                        <ChevronUp className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => moveRule(rule.id, "down")}
                        disabled={index === rules.length - 1}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive"
                        onClick={() => removeRule(rule.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>
            </ScrollArea>
          ) : (
            <div className="py-8 text-center text-muted-foreground">
              No rules defined yet. Add rules to create your strategy.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
