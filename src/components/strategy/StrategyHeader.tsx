
import { ArrowLeft, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Strategy } from "@/components/Strategy";

interface StrategyHeaderProps {
  strategy: Strategy;
}

export function StrategyHeader({ strategy }: StrategyHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="mb-6 flex items-center justify-between">
      <Button 
        variant="outline" 
        size="sm" 
        className="flex items-center" 
        onClick={() => navigate('/strategies')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Strategies
      </Button>
      
      {strategy.isPremium && (
        <Badge variant="outline" className="bg-primary/10 text-primary flex items-center gap-1">
          <Lock className="h-3 w-3" />
          Premium Strategy
        </Badge>
      )}
    </div>
  );
}
