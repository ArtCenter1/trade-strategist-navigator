
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ApiKeyForm } from "@/components/exchange/ApiKeyForm";
import { ExchangeConnectionCard } from "@/components/exchange/ExchangeConnectionCard";

const DUMMY_CONNECTIONS = [
  {
    id: "1",
    exchangeId: "binance",
    exchangeName: "Binance",
    label: "Main Trading Account",
    isConnected: true,
    lastTested: new Date().toISOString(),
    permissions: ["READ", "TRADE"],
    balances: [
      { asset: "BTC", free: 0.5, locked: 0.1 },
      { asset: "ETH", free: 5.0, locked: 1.0 },
      { asset: "USDT", free: 10000, locked: 5000 },
    ],
  },
  {
    id: "2",
    exchangeId: "coinbase",
    exchangeName: "Coinbase Pro",
    label: "HODL Portfolio",
    isConnected: true,
    lastTested: new Date().toISOString(),
    permissions: ["READ"],
    balances: [
      { asset: "BTC", free: 2.5, locked: 0 },
      { asset: "ETH", free: 40.0, locked: 0 },
    ],
  },
];

export default function ExchangeConnection() {
  const [connections, setConnections] = useState(DUMMY_CONNECTIONS);
  const [activeTab, setActiveTab] = useState("connections");

  return (
    <div className="container max-w-7xl py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Exchange Connections</h1>
        <p className="text-muted-foreground">
          Connect your exchange accounts to enable trading and portfolio monitoring.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="connections">My Connections</TabsTrigger>
          <TabsTrigger value="add">Add Connection</TabsTrigger>
        </TabsList>
        
        <TabsContent value="connections" className="space-y-6">
          {connections.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <p className="text-center text-muted-foreground">
                  You don't have any exchange connections yet. Add one to get started.
                </p>
                <button
                  className="mt-4 text-primary hover:underline"
                  onClick={() => setActiveTab("add")}
                >
                  Connect an Exchange
                </button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {connections.map((connection) => (
                <ExchangeConnectionCard 
                  key={connection.id} 
                  connection={connection} 
                />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="add">
          <ApiKeyForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
