
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingDown, TrendingUp } from "lucide-react";
import { formatCurrency, formatPercentage } from "@/lib/theme-config";

interface PortfolioSummaryProps {
  portfolioValue: number;
  portfolioChange: number;
  portfolioChangePercent: number;
}

export function PortfolioSummary({
  portfolioValue,
  portfolioChange,
  portfolioChangePercent,
}: PortfolioSummaryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      <Card className="bg-[#1A1A1A] border-[#333333] text-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-normal text-[#999999]">Portfolio Value (USD)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline">
            <span className="text-2xl font-bold">
              {formatCurrency(portfolioValue)}
            </span>
            <span className="ml-2 text-xs text-[#999999]">+0.61%</span>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-[#1A1A1A] border-[#333333] text-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-normal text-[#999999]">24h Change (USD)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline">
            <span className={`text-2xl font-bold ${portfolioChange < 0 ? 'text-[#FF3B30]' : 'text-[#34C759]'}`}>
              {formatCurrency(portfolioChange)}
            </span>
            {portfolioChange < 0 ? (
              <TrendingDown className="ml-2 h-4 w-4 text-[#FF3B30]" />
            ) : (
              <TrendingUp className="ml-2 h-4 w-4 text-[#34C759]" />
            )}
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-[#1A1A1A] border-[#333333] text-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-normal text-[#999999]">24h Change (%)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline">
            <span className={`text-2xl font-bold ${portfolioChangePercent < 0 ? 'text-[#FF3B30]' : 'text-[#34C759]'}`}>
              {formatPercentage(portfolioChangePercent)}
            </span>
            {portfolioChangePercent < 0 ? (
              <TrendingDown className="ml-2 h-4 w-4 text-[#FF3B30]" />
            ) : (
              <TrendingUp className="ml-2 h-4 w-4 text-[#34C759]" />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
