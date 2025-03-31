
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatCryptoAmount, themeColors } from "@/lib/theme-config";
import { Area, AreaChart, ResponsiveContainer } from "recharts";

// Mock data for assets
const assets = [
  { 
    id: "btc", 
    name: "Bitcoin", 
    ticker: "BTC", 
    amount: 0.22272205, 
    value: 9147954, 
    price: 38299.98, 
    change: -2.71, 
    chartData: [40, 43, 35, 37, 36, 38, 42, 39, 36], 
    color: "#F7931A",
    icon: "https://cryptologos.cc/logos/bitcoin-btc-logo.png"
  },
  { 
    id: "eth", 
    name: "Ethereum", 
    ticker: "ETH", 
    amount: 2.11025222, 
    value: 5649087, 
    price: 2450.65, 
    change: -1.97, 
    chartData: [38, 40, 37, 39, 38, 37, 36, 35, 36],
    color: "#627EEA",
    icon: "https://cryptologos.cc/logos/ethereum-eth-logo.png"
  },
  { 
    id: "sol", 
    name: "Solana", 
    ticker: "SOL", 
    amount: 58.00, 
    value: 2535150, 
    price: 43.71, 
    change: -4.77, 
    chartData: [42, 39, 38, 37, 35, 34, 33, 32, 31],
    color: "#00FFBD",
    icon: "https://cryptologos.cc/logos/solana-sol-logo.png"
  },
  { 
    id: "avax", 
    name: "Avalanche", 
    ticker: "AVAX", 
    amount: 278.00, 
    value: 3449098, 
    price: 12.41, 
    change: -7.37, 
    chartData: [41, 39, 37, 36, 34, 32, 31, 30, 29],
    color: "#E84142",
    icon: "https://cryptologos.cc/logos/avalanche-avax-logo.png"
  },
  { 
    id: "imx", 
    name: "Immutable", 
    ticker: "IMX", 
    amount: 3000.00, 
    value: 175419, 
    price: 0.58473, 
    change: -8.66, 
    chartData: [42, 38, 36, 34, 32, 30, 28, 27, 26],
    color: "#627EEA",
    icon: "https://cryptologos.cc/logos/immutable-x-imx-logo.png"
  },
  { 
    id: "bnb", 
    name: "BNB", 
    ticker: "BNB", 
    amount: 2.39093222, 
    value: 144851, 
    price: 605.25, 
    change: -3.28, 
    chartData: [40, 39, 37, 38, 37, 35, 36, 37, 36],
    color: "#F3BA2F",
    icon: "https://cryptologos.cc/logos/bnb-bnb-logo.png"
  },
];

// Generate chart data from array of values
const generateChartData = (values: number[]) => {
  return values.map((value, index) => ({ value }));
};

export function AssetTable() {
  return (
    <div className="w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-[#333333] hover:bg-[#1a1a1a]">
            <TableHead className="text-left text-[#999999] font-normal">Asset</TableHead>
            <TableHead className="text-right text-[#999999] font-normal">Amount</TableHead>
            <TableHead className="text-right text-[#999999] font-normal">Value (USD)</TableHead>
            <TableHead className="text-right text-[#999999] font-normal">Last Price</TableHead>
            <TableHead className="text-right text-[#999999] font-normal">24h Change</TableHead>
            <TableHead className="text-center text-[#999999] font-normal">7d Chart</TableHead>
            <TableHead className="text-right text-[#999999] font-normal">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assets.map((asset) => (
            <TableRow key={asset.id} className="border-b border-[#333333] hover:bg-[#1a1a1a]">
              <TableCell className="flex items-center py-4">
                <div className="w-8 h-8 flex-shrink-0 rounded-full overflow-hidden bg-white mr-2 flex items-center justify-center">
                  <img src={asset.icon} alt={asset.name} className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-medium">{asset.name}</div>
                  <div className="text-xs text-[#999999]">{asset.ticker}</div>
                </div>
              </TableCell>
              <TableCell className="text-right font-mono">
                {formatCryptoAmount(asset.amount)}
              </TableCell>
              <TableCell className="text-right">
                {formatCurrency(asset.value / 100)}
              </TableCell>
              <TableCell className="text-right">
                {formatCurrency(asset.price)}
              </TableCell>
              <TableCell className={`text-right ${asset.change < 0 ? 'text-[#FF3B30]' : 'text-[#34C759]'}`}>
                {asset.change.toFixed(2)}%
              </TableCell>
              <TableCell className="p-0 w-[100px]">
                <div className="h-10">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={generateChartData(asset.chartData)}>
                      <defs>
                        <linearGradient id={`color${asset.id}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={asset.change < 0 ? "#FF3B30" : "#34C759"} stopOpacity={0.3} />
                          <stop offset="95%" stopColor={asset.change < 0 ? "#FF3B30" : "#34C759"} stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke={asset.change < 0 ? "#FF3B30" : "#34C759"}
                        fillOpacity={1}
                        fill={`url(#color${asset.id})`}
                        strokeWidth={1.5}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8 px-3 text-white bg-transparent border-[#444444] hover:bg-[#333333]"
                >
                  TRADE
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
