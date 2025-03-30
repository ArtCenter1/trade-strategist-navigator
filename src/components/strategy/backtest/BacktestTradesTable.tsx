
import { Trade } from "@/services/backtesting/backtestingService";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowDown, ArrowUp } from "lucide-react";

interface BacktestTradesTableProps {
  trades: Trade[];
}

export function BacktestTradesTable({ trades }: BacktestTradesTableProps) {
  // If no trades, show a message
  if (trades.length === 0) {
    return (
      <div className="text-center py-4 text-muted-foreground">
        No trades were executed during this backtest.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Entry Time</TableHead>
            <TableHead>Entry Price</TableHead>
            <TableHead>Exit Time</TableHead>
            <TableHead>Exit Price</TableHead>
            <TableHead className="text-right">Profit/Loss</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {trades.map((trade, index) => (
            <TableRow key={index}>
              <TableCell>
                <div className="flex items-center">
                  {trade.type === 'long' ? (
                    <ArrowUp className="h-4 w-4 mr-1 text-green-500" />
                  ) : (
                    <ArrowDown className="h-4 w-4 mr-1 text-red-500" />
                  )}
                  {trade.type === 'long' ? 'Long' : 'Short'}
                </div>
              </TableCell>
              <TableCell>{new Date(trade.entryTime).toLocaleString()}</TableCell>
              <TableCell>${trade.entryPrice.toFixed(2)}</TableCell>
              <TableCell>{new Date(trade.exitTime).toLocaleString()}</TableCell>
              <TableCell>${trade.exitPrice.toFixed(2)}</TableCell>
              <TableCell className={`text-right ${trade.profit > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {trade.profit > 0 ? '+' : ''}{trade.profitPercentage.toFixed(2)}%
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
