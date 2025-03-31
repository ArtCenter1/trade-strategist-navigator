
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface OrderBookProps {
  tradingPair: string;
}

export function OrderBook({ tradingPair }: OrderBookProps) {
  // Mock data for the order book
  const asks = [
    { price: 84370.81, amount: 0.0087, total: 734.03 },
    { price: 84306.31, amount: 0.0142, total: 1197.15 },
    { price: 84275.38, amount: 0.0066, total: 556.22 },
    { price: 84046.31, amount: 0.0023, total: 193.31 },
    { price: 83990.15, amount: 0.0102, total: 856.70 },
    { price: 83859.10, amount: 0.0728, total: 6105.14 },
    { price: 83859.00, amount: 0.0461, total: 3865.90 },
    { price: 83859.00, amount: 0.0007, total: 58.70 },
  ];
  
  const bids = [
    { price: 83858.99, amount: 0.0065, total: 545.08 },
    { price: 83857.64, amount: 0.0120, total: 1006.29 },
    { price: 83855.34, amount: 0.0246, total: 2062.84 },
    { price: 83859.33, amount: 0.0007, total: 58.70 },
    { price: 83859.58, amount: 0.0140, total: 1174.03 },
    { price: 83859.66, amount: 0.0140, total: 1174.04 },
    { price: 83859.67, amount: 0.0140, total: 1174.04 },
    { price: 83859.68, amount: 0.0089, total: 746.35 },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between text-xs font-medium text-[#999999] mb-1">
        <span>Price (USDT)</span>
        <span>Amount (BTC)</span>
        <span>Total</span>
      </div>
      
      {/* Asks (Sell Orders) */}
      <div className="max-h-[220px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#333333]">
        <Table>
          <TableBody>
            {asks.map((order, index) => (
              <TableRow 
                key={`ask-${index}`}
                className="border-b-0 hover:bg-[#222222]"
              >
                <TableCell className="py-1 px-1 text-right text-[#FF3B30]">
                  {order.price.toFixed(2)}
                </TableCell>
                <TableCell className="py-1 px-1 text-right">
                  {order.amount.toFixed(6)}
                </TableCell>
                <TableCell className="py-1 px-1 text-right">
                  {order.total.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {/* Current Price */}
      <div className="border-y border-[#333333] py-2 my-2 flex justify-center">
        <span className="text-lg font-bold">83,855.34</span>
      </div>
      
      {/* Bids (Buy Orders) */}
      <div className="max-h-[220px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#333333]">
        <Table>
          <TableBody>
            {bids.map((order, index) => (
              <TableRow 
                key={`bid-${index}`}
                className="border-b-0 hover:bg-[#222222]"
              >
                <TableCell className="py-1 px-1 text-right text-[#34C759]">
                  {order.price.toFixed(2)}
                </TableCell>
                <TableCell className="py-1 px-1 text-right">
                  {order.amount.toFixed(6)}
                </TableCell>
                <TableCell className="py-1 px-1 text-right">
                  {order.total.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
