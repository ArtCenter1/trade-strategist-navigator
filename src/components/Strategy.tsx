
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  TrendingUp, 
  AlertTriangle, 
  Lock,
  ChevronRight
} from "lucide-react";

type StrategyPerformanceMetrics = {
  winRate: string;
  profitFactor: number;
  maxDrawdown: string;
};

export type StrategyParameters = Record<string, any>;

export type Strategy = {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  type: string;
  isPremium: boolean;
  parameters: StrategyParameters;
  riskLevel: "low" | "medium" | "high";
  performanceMetrics: StrategyPerformanceMetrics;
  tradingRules?: string[];
};

type StrategyProps = {
  strategy: Strategy;
  onSelect: () => void;
};

export function Strategy({ strategy, onSelect }: StrategyProps) {
  const getRiskBadgeColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "medium":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "high":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case "oscillator":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "trend":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100";
      case "volatility":
        return "bg-indigo-100 text-indigo-800 hover:bg-indigo-100";
      case "momentum":
        return "bg-orange-100 text-orange-800 hover:bg-orange-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="relative">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{strategy.name}</CardTitle>
            <CardDescription className="mt-1">{strategy.description}</CardDescription>
          </div>
          {strategy.isPremium && (
            <Badge variant="outline" className="bg-primary/10 text-primary flex items-center gap-1">
              <Lock className="h-3 w-3" />
              Premium
            </Badge>
          )}
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          <Badge variant="outline" className={getTypeBadgeColor(strategy.type)}>
            {strategy.type.charAt(0).toUpperCase() + strategy.type.slice(1)}
          </Badge>
          <Badge variant="outline" className={getRiskBadgeColor(strategy.riskLevel)}>
            <AlertTriangle className="h-3 w-3 mr-1" />
            {strategy.riskLevel.charAt(0).toUpperCase() + strategy.riskLevel.slice(1)} Risk
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Performance Metrics</h3>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-card p-2 rounded-md border">
                <div className="text-xs text-muted-foreground">Win Rate</div>
                <div className="font-medium">{strategy.performanceMetrics.winRate}</div>
              </div>
              <div className="bg-card p-2 rounded-md border">
                <div className="text-xs text-muted-foreground">Profit Factor</div>
                <div className="font-medium">{strategy.performanceMetrics.profitFactor.toFixed(1)}</div>
              </div>
              <div className="bg-card p-2 rounded-md border">
                <div className="text-xs text-muted-foreground">Max Drawdown</div>
                <div className="font-medium">{strategy.performanceMetrics.maxDrawdown}</div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Key Parameters</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {Object.entries(strategy.parameters).slice(0, 4).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="text-sm text-muted-foreground">{key}:</span>
                  <span className="text-sm font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/50 py-3">
        <Button 
          onClick={onSelect} 
          className="w-full"
          variant={strategy.isPremium ? "outline" : "default"}
        >
          <span>View Details</span>
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );
}
