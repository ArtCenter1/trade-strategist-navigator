
import React from "react";
import { ChevronDown, Save, BarChart2 } from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface TradingHeaderProps {
  selectedPair: string;
  onPairChange: (pair: string) => void;
  exchangeProvider: string;
  onExchangeChange: (exchange: string) => void;
}

export function TradingHeader({
  selectedPair,
  onPairChange,
  exchangeProvider,
  onExchangeChange
}: TradingHeaderProps) {
  // Trading pairs
  const tradingPairs = ["BTC/USDT", "ETH/USDT", "SOL/USDT", "BNB/USDT", "XRP/USDT"];
  
  // Exchange providers
  const exchanges = ["Binance", "Coinbase", "Kraken", "Bybit", "OKX"];
  
  // Time intervals
  const timeIntervals = ["1h", "4h", "1d", "1w", "1m"];
  
  return (
    <div className="w-full border-b border-[#333333] bg-[#1A1A1A] p-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* Exchange Selector */}
          <Select 
            value={exchangeProvider} 
            onValueChange={onExchangeChange}
          >
            <SelectTrigger className="w-[120px] bg-[#222222] border-[#444444] text-white">
              <SelectValue placeholder="Exchange" />
            </SelectTrigger>
            <SelectContent className="bg-[#222222] border-[#444444] text-white">
              {exchanges.map((exchange) => (
                <SelectItem key={exchange} value={exchange}>
                  {exchange}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {/* Trading Pair Selector */}
          <Select 
            value={selectedPair} 
            onValueChange={onPairChange}
          >
            <SelectTrigger className="w-[140px] bg-[#222222] border-[#444444] text-white">
              <SelectValue placeholder="Trading Pair" />
            </SelectTrigger>
            <SelectContent className="bg-[#222222] border-[#444444] text-white">
              {tradingPairs.map((pair) => (
                <SelectItem key={pair} value={pair}>
                  {pair}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {/* Current Price */}
          <div className="hidden md:flex flex-col">
            <div className="text-2xl font-bold text-white">
              83,055.34 <span className="text-green-500 text-sm">+0.84%</span>
            </div>
            <div className="text-xs text-[#999999]">
              Vol: 228.8384 (24h)
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Time Interval Selector */}
          <div className="hidden md:flex bg-[#222222] rounded-md overflow-hidden">
            {timeIntervals.map((interval) => (
              <button
                key={interval}
                className="px-3 py-1 text-sm hover:bg-[#333333] text-white"
              >
                {interval}
              </button>
            ))}
          </div>
          
          {/* Chart Tools Button */}
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-[#222222] border-[#444444] text-white hover:bg-[#333333]"
          >
            <BarChart2 className="h-4 w-4 mr-2" />
            Indicators
          </Button>
          
          {/* Save Layout Button */}
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-[#222222] border-[#444444] text-white hover:bg-[#333333]"
          >
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
