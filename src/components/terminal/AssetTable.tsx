
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export function AssetTable() {
  // Mock data for assets
  const assets = [
    { 
      icon: "BTC", 
      name: "Bitcoin", 
      ticker: "BTC", 
      amount: 0.01797199, 
      value: 1529.96, 
      price: 85138.00, 
      change: -1.97, 
      chart: "down"
    },
    { 
      icon: "BNB", 
      name: "Binance Coin", 
      ticker: "BNB", 
      amount: 2.04651185, 
      value: 1240.70, 
      price: 606.25, 
      change: -3.28, 
      chart: "down"
    },
    { 
      icon: "LINK", 
      name: "Chainlink", 
      ticker: "LINK", 
      amount: 82.22, 
      value: 1173.28, 
      price: 14.27, 
      change: -8.43, 
      chart: "down"
    },
    { 
      icon: "NEO", 
      name: "NEO", 
      ticker: "NEO", 
      amount: 11.08869, 
      value: 82.53, 
      price: 7.50, 
      change: -1.18, 
      chart: "down"
    },
  ];

  return (
    <div className="bg-[#1A1A1A] border border-[#333333] rounded-lg overflow-hidden">
      <Table>
        <TableHeader className="bg-[#222222]">
          <TableRow className="hover:bg-transparent border-b border-[#333333]">
            <TableHead className="text-[#999999] font-medium">Asset</TableHead>
            <TableHead className="text-[#999999] font-medium text-right">Available</TableHead>
            <TableHead className="text-[#999999] font-medium text-right">Amount</TableHead>
            <TableHead className="text-[#999999] font-medium text-right">Value (USD)</TableHead>
            <TableHead className="text-[#999999] font-medium text-right">Last Price</TableHead>
            <TableHead className="text-[#999999] font-medium text-right">24h Change</TableHead>
            <TableHead className="text-[#999999] font-medium text-right">7d Chart</TableHead>
            <TableHead className="text-[#999999] font-medium text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assets.map((asset) => (
            <TableRow 
              key={asset.ticker}
              className="border-b border-[#333333] hover:bg-[#222222]"
            >
              <TableCell className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#333333] flex items-center justify-center text-white">
                  {asset.icon.substring(0, 1)}
                </div>
                <div>
                  <div className="font-medium">{asset.name}</div>
                  <div className="text-[#999999] text-sm">{asset.ticker}</div>
                </div>
              </TableCell>
              <TableCell className="text-right">
                {asset.amount.toFixed(asset.amount < 1 ? 8 : 2)}
              </TableCell>
              <TableCell className="text-right">
                {asset.amount.toFixed(asset.amount < 1 ? 8 : 2)} {asset.ticker}
              </TableCell>
              <TableCell className="text-right">
                ${asset.value.toFixed(2)}
              </TableCell>
              <TableCell className="text-right">
                ${asset.price.toFixed(2)}
              </TableCell>
              <TableCell className="text-right text-[#FF3B30]">
                {asset.change.toFixed(2)}%
              </TableCell>
              <TableCell className="text-right">
                <div className="h-8 flex items-center justify-end">
                  <svg 
                    width="60" 
                    height="20" 
                    viewBox="0 0 60 20" 
                    className="text-[#FF3B30]"
                  >
                    <path 
                      d="M1,10 L10,8 L20,12 L30,5 L40,15 L50,7 L59,13" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Button 
                  size="sm"
                  className="bg-[#222222] hover:bg-[#333333] text-white text-xs"
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
