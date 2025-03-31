
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TradingChart } from "@/components/terminal/TradingChart";
import { OrderBook } from "@/components/terminal/OrderBook";
import { RecentTrades } from "@/components/terminal/RecentTrades";
import { TradingForm } from "@/components/terminal/TradingForm";
import { AssetTable } from "@/components/terminal/AssetTable";
import { TradingHeader } from "@/components/terminal/TradingHeader";

const TerminalPage = () => {
  const [selectedPair, setSelectedPair] = useState<string>("BTC/USDT");
  const [exchangeProvider, setExchangeProvider] = useState<string>("Binance");
  
  return (
    <div className="flex flex-col w-full min-h-screen bg-[#111111] text-white">
      <TradingHeader 
        selectedPair={selectedPair}
        onPairChange={setSelectedPair}
        exchangeProvider={exchangeProvider}
        onExchangeChange={setExchangeProvider}
      />
      
      <div className="grid grid-cols-12 gap-4 p-4">
        {/* Main Chart Area */}
        <div className="col-span-12 lg:col-span-8 space-y-4">
          <Card className="bg-[#1A1A1A] border-[#333333] text-white">
            <CardContent className="p-4">
              <TradingChart 
                tradingPair={selectedPair} 
                exchange={exchangeProvider}
              />
            </CardContent>
          </Card>
          
          <AssetTable />
        </div>
        
        {/* Right Sidebar */}
        <div className="col-span-12 lg:col-span-4 space-y-4">
          <Card className="bg-[#1A1A1A] border-[#333333] text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-md">Order Book & Trades</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="order-book" className="w-full">
                <TabsList className="bg-[#222222] text-white w-full">
                  <TabsTrigger 
                    value="order-book"
                    className="data-[state=active]:bg-[#333333] data-[state=active]:text-white"
                  >
                    Order Book
                  </TabsTrigger>
                  <TabsTrigger 
                    value="recent-trades"
                    className="data-[state=active]:bg-[#333333] data-[state=active]:text-white"
                  >
                    Recent Trades
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="order-book">
                  <OrderBook tradingPair={selectedPair} />
                </TabsContent>
                <TabsContent value="recent-trades">
                  <RecentTrades tradingPair={selectedPair} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <Card className="bg-[#1A1A1A] border-[#333333] text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-md">Trade</CardTitle>
            </CardHeader>
            <CardContent>
              <TradingForm tradingPair={selectedPair} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TerminalPage;
