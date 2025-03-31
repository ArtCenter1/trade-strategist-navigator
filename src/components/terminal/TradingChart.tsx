
import React from "react";

interface TradingChartProps {
  tradingPair: string;
  exchange: string;
}

export function TradingChart({ tradingPair, exchange }: TradingChartProps) {
  return (
    <div className="w-full h-[500px] relative bg-[#111111] rounded flex items-center justify-center">
      <div className="text-center text-[#666666]">
        <p className="text-lg">Trading Chart for {tradingPair}</p>
        <p className="text-sm mt-2">
          (This is a placeholder - in a real app, this would be an interactive trading chart, 
          e.g. using TradingView or a charting library like Recharts)
        </p>
      </div>
    </div>
  );
}
