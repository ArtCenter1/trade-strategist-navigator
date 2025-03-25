
import { StrategyCard } from "./strategy/card/StrategyCard";

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
  return <StrategyCard strategy={strategy} onSelect={onSelect} />;
}
