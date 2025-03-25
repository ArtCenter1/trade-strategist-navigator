
import { Badge } from "@/components/ui/badge";
import { AlertTriangle } from "lucide-react";

interface StrategyBadgesProps {
  type: string;
  riskLevel: "low" | "medium" | "high";
}

export function StrategyBadges({ type, riskLevel }: StrategyBadgesProps) {
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
    <div className="flex flex-wrap gap-2 mt-2">
      <Badge variant="outline" className={getTypeBadgeColor(type)}>
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </Badge>
      <Badge variant="outline" className={getRiskBadgeColor(riskLevel)}>
        <AlertTriangle className="h-3 w-3 mr-1" />
        {riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)} Risk
      </Badge>
    </div>
  );
}
