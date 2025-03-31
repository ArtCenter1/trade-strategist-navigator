
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface RecentTradesProps {
  tradingPair: string;
}

export function RecentTrades({ tradingPair }: RecentTradesProps) {
  // Mock data for recent trades
  const trades = [
    { amount: 0.0240, price: 83855.34, time: "19:34:56" },
    { amount: 0.0008, price: 83855.34, time: "19:35:08" },
    { amount: 0.0239, price: 83855.34, time: "19:35:12" },
    { amount: 0.0014, price: 83855.34, time: "19:34:59" },
    { amount: 0.0409, price: 83855.32, time: "19:34:58" },
    { amount: 0.0024, price: 83855.34, time: "19:34:58" },
    { amount: 0.0127, price: 83855.34, time: "19:34:57" },
    { amount: 0.0127, price: 83855.33, time: "19:34:57" },
    { amount: 0.0052, price: 83855.33, time: "19:34:57" },
    { amount: 0.0052, price: 83855.33, time: "19:34:57" },
    { amount: 0.0246, price: 83855.34, time: "19:34:56" },
    { amount: 0.0066, price: 83855.33, time: "19:34:56" },
    { amount: 0.0060, price: 83855.00, time: "19:34:56" },
    { amount: 0.0021, price: 83854.91, time: "19:34:56" },
    { amount: 0.0007, price: 83854.90, time: "19:34:56" },
  ];

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs font-medium text-[#999999] mb-1">
        <span>Amount (BTC)</span>
        <span>Price (USDT)</span>
        <span>Time</span>
      </div>
      
      <div className="max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#333333]">
        <Table>
          <TableBody>
            {trades.map((trade, index) => (
              <TableRow 
                key={`trade-${index}`}
                className="border-b-0 hover:bg-[#222222]"
              >
                <TableCell className="py-1 px-1 text-left">
                  {trade.amount.toFixed(6)}
                </TableCell>
                <TableCell className={`py-1 px-1 text-right ${index % 2 === 0 ? 'text-[#34C759]' : 'text-[#FF3B30]'}`}>
                  {trade.price.toFixed(2)}
                </TableCell>
                <TableCell className="py-1 px-1 text-right text-[#999999]">
                  {trade.time}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
