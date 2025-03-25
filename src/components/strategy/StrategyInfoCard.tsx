
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import type { Strategy } from "@/components/Strategy";

interface StrategyInfoCardProps {
  strategy: Strategy;
}

export function StrategyInfoCard({ strategy }: StrategyInfoCardProps) {
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
    <Card className="mb-6">
      <CardHeader>
        <div className="flex flex-wrap gap-2 mb-2">
          <Badge variant="outline" className={getTypeBadgeColor(strategy.type)}>
            {strategy.type.charAt(0).toUpperCase() + strategy.type.slice(1)}
          </Badge>
          <Badge variant="outline" className={getRiskBadgeColor(strategy.riskLevel)}>
            <AlertTriangle className="h-3 w-3 mr-1" />
            {strategy.riskLevel.charAt(0).toUpperCase() + strategy.riskLevel.slice(1)} Risk
          </Badge>
        </div>
        <CardTitle className="text-2xl">{strategy.name}</CardTitle>
        <CardDescription className="mt-1">{strategy.description}</CardDescription>
      </CardHeader>
    </Card>
  );
}
