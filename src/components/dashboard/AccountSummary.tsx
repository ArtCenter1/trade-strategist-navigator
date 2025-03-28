
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleDollarSign, CreditCard, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock data for connected exchanges
const exchanges = [
  { name: 'Binance', balance: '$4,285.32', coins: 6 },
  { name: 'Coinbase', balance: '$2,112.75', coins: 4 },
];

export function AccountSummary() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Account Summary</h2>
        <Button variant="outline" size="sm">Refresh Balances</Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$6,398.07</div>
            <p className="text-xs text-muted-foreground mt-1">
              Across all connected exchanges
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Trading Capital</CardTitle>
            <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$3,450.00</div>
            <p className="text-xs text-muted-foreground mt-1">
              Currently allocated to strategies
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Exchange Accounts</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{exchanges.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Connected exchange accounts
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Exchange Balances</CardTitle>
          <CardDescription>
            Your current holdings across connected exchanges
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {exchanges.map((exchange) => (
              <div key={exchange.name} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                <div>
                  <h3 className="text-sm font-medium">{exchange.name}</h3>
                  <p className="text-xs text-muted-foreground">{exchange.coins} coins/tokens</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{exchange.balance}</p>
                </div>
              </div>
            ))}
            
            {exchanges.length === 0 && (
              <div className="text-center py-6">
                <p className="text-sm text-muted-foreground">No exchanges connected yet</p>
                <Button variant="outline" size="sm" className="mt-2">
                  Connect an Exchange
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
