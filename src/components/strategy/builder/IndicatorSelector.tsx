
import { useState } from "react";
import { Check, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Mock indicator data
const indicators = [
  { 
    id: "rsi", 
    name: "Relative Strength Index (RSI)", 
    category: "momentum",
    description: "Measures the speed and change of price movements on a scale from 0 to 100." 
  },
  { 
    id: "macd", 
    name: "Moving Average Convergence Divergence (MACD)", 
    category: "trend",
    description: "Shows the relationship between two moving averages of a security's price." 
  },
  { 
    id: "bollinger", 
    name: "Bollinger Bands", 
    category: "volatility",
    description: "Uses standard deviations to determine overbought or oversold conditions." 
  },
  { 
    id: "sma", 
    name: "Simple Moving Average (SMA)", 
    category: "trend",
    description: "Calculates the average price over a specific time period." 
  },
  { 
    id: "ema", 
    name: "Exponential Moving Average (EMA)", 
    category: "trend",
    description: "Gives more weight to recent prices for a faster response to price changes." 
  },
  { 
    id: "stochastic", 
    name: "Stochastic Oscillator", 
    category: "momentum",
    description: "Compares a specific closing price to a range of prices over time." 
  },
  { 
    id: "adx", 
    name: "Average Directional Index (ADX)", 
    category: "trend",
    description: "Measures the strength of a trend regardless of its direction." 
  },
  { 
    id: "atr", 
    name: "Average True Range (ATR)", 
    category: "volatility",
    description: "Measures market volatility by decomposing the entire range of an asset price." 
  },
  { 
    id: "obv", 
    name: "On-Balance Volume (OBV)", 
    category: "volume",
    description: "Uses volume flow to predict changes in stock price." 
  },
];

interface IndicatorSelectorProps {
  selectedIndicators: string[];
  setSelectedIndicators: (indicators: string[]) => void;
}

export function IndicatorSelector({ selectedIndicators, setSelectedIndicators }: IndicatorSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  const categories = [...new Set(indicators.map(i => i.category))];
  
  // Filter indicators based on search query and active category
  const filteredIndicators = indicators.filter(indicator => {
    const matchesSearch = indicator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           indicator.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory ? indicator.category === activeCategory : true;
    
    return matchesSearch && matchesCategory;
  });
  
  const toggleIndicator = (id: string) => {
    if (selectedIndicators.includes(id)) {
      setSelectedIndicators(selectedIndicators.filter(i => i !== id));
    } else {
      setSelectedIndicators([...selectedIndicators, id]);
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search indicators"
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1.5 h-7 w-7 p-0"
              onClick={() => setSearchQuery("")}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Clear</span>
            </Button>
          )}
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <Button
          variant={activeCategory === null ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveCategory(null)}
        >
          All
        </Button>
        {categories.map(category => (
          <Button
            key={category}
            variant={activeCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory(category === activeCategory ? null : category)}
          >
            <span className="capitalize">{category}</span>
          </Button>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Available Indicators</CardTitle>
              <CardDescription>Select indicators to add to your strategy</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[250px]">
                <div className="p-4 pt-0">
                  {filteredIndicators.length > 0 ? (
                    filteredIndicators.map(indicator => (
                      <div key={indicator.id} className="mt-4 first:mt-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="text-sm font-medium">{indicator.name}</h4>
                            <p className="text-xs text-muted-foreground">
                              {indicator.description}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="mt-0.5"
                            onClick={() => toggleIndicator(indicator.id)}
                            disabled={selectedIndicators.includes(indicator.id)}
                          >
                            {selectedIndicators.includes(indicator.id) ? "Added" : "Add"}
                          </Button>
                        </div>
                        <Separator className="mt-3" />
                      </div>
                    ))
                  ) : (
                    <div className="py-12 text-center text-muted-foreground">
                      No indicators match your search
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Selected Indicators</CardTitle>
              <CardDescription>
                Indicators that will be used in your strategy
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[250px]">
                <div className="p-4 pt-0">
                  {selectedIndicators.length > 0 ? (
                    selectedIndicators.map(id => {
                      const indicator = indicators.find(i => i.id === id);
                      if (!indicator) return null;
                      
                      return (
                        <div key={id} className="mt-4 first:mt-0">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-green-500" />
                                <h4 className="text-sm font-medium">{indicator.name}</h4>
                              </div>
                              <p className="text-xs text-muted-foreground ml-6">
                                {indicator.description}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-destructive"
                              onClick={() => toggleIndicator(id)}
                            >
                              Remove
                            </Button>
                          </div>
                          <Separator className="mt-3" />
                        </div>
                      );
                    })
                  ) : (
                    <div className="py-12 text-center text-muted-foreground">
                      No indicators selected yet
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
