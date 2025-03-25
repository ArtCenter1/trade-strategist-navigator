
import { ArrowLeft, LineChart, Lock } from "lucide-react";
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
    <>
      <header className="w-full px-4 py-4 border-b flex items-center justify-between bg-card">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-trading-navy text-white flex items-center justify-center">
            <LineChart className="h-5 w-5" />
          </div>
          <span className="font-semibold text-lg">TradingBot</span>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/dashboard')}
            className="text-sm font-medium hover:underline"
          >
            Dashboard
          </button>
          <button 
            onClick={() => navigate('/strategies')}
            className="text-sm font-medium text-primary hover:underline"
          >
            Strategies
          </button>
        </div>
      </header>

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
    </>
  );
}
