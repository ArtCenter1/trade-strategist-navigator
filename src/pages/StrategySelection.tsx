import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Strategy } from "@/components/Strategy";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import type { Strategy as StrategyType } from "@/components/Strategy";

const strategyData: StrategyType[] = [
  {
    id: "rsi",
    name: "RSI (Relative Strength Index)",
    description: "A momentum oscillator that measures the speed and change of price movements.",
    type: "oscillator",
    isPremium: false,
    parameters: {
      period: 14,
      overbought: 70,
      oversold: 30
    },
    riskLevel: "medium",
    performanceMetrics: {
      winRate: "62%",
      profitFactor: 1.8,
      maxDrawdown: "15%"
    }
  },
  {
    id: "bollinger",
    name: "Bollinger Bands",
    description: "A volatility indicator that creates bands above and below a moving average to identify overbought/oversold conditions.",
    type: "volatility",
    isPremium: false,
    parameters: {
      period: 20,
      stdDev: 2,
      maType: "SMA"
    },
    riskLevel: "medium",
    performanceMetrics: {
      winRate: "58%",
      profitFactor: 1.6,
      maxDrawdown: "18%"
    }
  },
  {
    id: "macd",
    name: "MACD (Moving Average Convergence Divergence)",
    description: "A trend-following momentum indicator that shows the relationship between two moving averages of a security's price.",
    type: "momentum",
    isPremium: true,
    parameters: {
      fastPeriod: 12,
      slowPeriod: 26,
      signalPeriod: 9
    },
    riskLevel: "high",
    performanceMetrics: {
      winRate: "65%",
      profitFactor: 2.1,
      maxDrawdown: "22%"
    }
  }
];

const StrategySelection = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-8 w-8 border-4 border-trading-navy border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Trading Strategies</h1>
          <p className="text-muted-foreground">
            Select and configure a trading strategy to deploy on your connected exchanges.
          </p>
        </div>

        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Information</AlertTitle>
          <AlertDescription>
            Premium strategies are available with a paid subscription. Upgrade your plan to access all strategies.
          </AlertDescription>
        </Alert>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {strategyData.map((strategy) => (
            <Strategy 
              key={strategy.id}
              strategy={strategy}
              onSelect={() => navigate(`/strategies/${strategy.id}`)}
            />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StrategySelection;
