
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock } from "lucide-react";
import { StrategyBadges } from "./StrategyBadges";
import { StrategyMetrics } from "./StrategyMetrics";
import { StrategyParameters } from "./StrategyParameters";
import { StrategyAction } from "./StrategyAction";
import type { Strategy } from "@/components/Strategy";

type StrategyCardProps = {
  strategy: Strategy;
  onSelect: () => void;
};

export function StrategyCard({ strategy, onSelect }: StrategyCardProps) {
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
        
        <StrategyBadges type={strategy.type} riskLevel={strategy.riskLevel} />
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <StrategyMetrics metrics={strategy.performanceMetrics} />
          <StrategyParameters parameters={strategy.parameters} />
        </div>
      </CardContent>
      
      <CardFooter className="bg-muted/50 py-3">
        <StrategyAction 
          onSelect={onSelect} 
          isPremium={strategy.isPremium} 
        />
      </CardFooter>
    </Card>
  );
}
