
import type { Strategy } from "@/components/Strategy";

// Define specific parameter types for different strategies
export type RsiParameters = {
  period: number;
  overbought: number;
  oversold: number;
};

export type BollingerParameters = {
  period: number;
  stdDev: number;
  maType: string;
};

export type MacdParameters = {
  fastPeriod: number;
  slowPeriod: number;
  signalPeriod: number;
};

export type StrategyDetails = Strategy & {
  longDescription: string;
  tradingRules: string[];
  performanceMetrics: {
    winRate: string;
    profitFactor: number;
    maxDrawdown: string;
    sharpeRatio: number;
    avgTrade: string;
    expectancy: number;
  };
};
