
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";
import { AllocationChart } from "@/components/dashboard/AllocationChart";
import { AssetTable } from "@/components/dashboard/AssetTable";
import { ArrowUpRight, Search, TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { formatCurrency, formatPercentage, themeColors } from "@/lib/theme-config";
import { Badge } from "@/components/ui/badge";

const TradingDashboard = () => {
  // Mock data - In real implementation, this would come from API
  const portfolioValue = 47854.48;
  const portfolioChange = -2139.11;
  const portfolioChangePercent = -4.28;
  
  return (
    <div className="flex flex-col w-full min-h-screen bg-[#111111] text-white">
      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <Card className="bg-[#1A1A1A] border-[#333333] text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-normal text-[#999999]">Portfolio Value (USD)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold">
                {formatCurrency(portfolioValue)}
              </span>
              <span className="ml-2 text-xs text-[#999999]">+0.61%</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-[#1A1A1A] border-[#333333] text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-normal text-[#999999]">24h Change (USD)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline">
              <span className={`text-2xl font-bold ${portfolioChange < 0 ? 'text-[#FF3B30]' : 'text-[#34C759]'}`}>
                {formatCurrency(portfolioChange)}
              </span>
              {portfolioChange < 0 ? (
                <TrendingDown className="ml-2 h-4 w-4 text-[#FF3B30]" />
              ) : (
                <TrendingUp className="ml-2 h-4 w-4 text-[#34C759]" />
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-[#1A1A1A] border-[#333333] text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-normal text-[#999999]">24h Change (%)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline">
              <span className={`text-2xl font-bold ${portfolioChangePercent < 0 ? 'text-[#FF3B30]' : 'text-[#34C759]'}`}>
                {formatPercentage(portfolioChangePercent)}
              </span>
              {portfolioChangePercent < 0 ? (
                <TrendingDown className="ml-2 h-4 w-4 text-[#FF3B30]" />
              ) : (
                <TrendingUp className="ml-2 h-4 w-4 text-[#34C759]" />
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Performance Chart and Allocation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
        <Card className="bg-[#1A1A1A] border-[#333333] text-white lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-md">Performance</CardTitle>
            <div className="flex space-x-1">
              <Button variant="outline" size="sm" className="h-8 bg-[#333333] border-[#444444] text-white hover:bg-[#444444]">Day</Button>
              <Button variant="outline" size="sm" className="h-8 bg-[#333333] border-[#444444] text-white hover:bg-[#444444]">Week</Button>
              <Button variant="outline" size="sm" className="h-8 bg-[#333333] border-[#444444] text-white hover:bg-[#444444]">Month</Button>
              <Button variant="outline" size="sm" className="h-8 bg-[#3a3a3a] border-[#444444] text-white hover:bg-[#444444]">Year</Button>
              <Button variant="outline" size="sm" className="h-8 bg-[#333333] border-[#444444] text-white hover:bg-[#444444]">5 Years</Button>
            </div>
          </CardHeader>
          <CardContent className="h-[300px]">
            <PerformanceChart />
          </CardContent>
        </Card>
        
        <Card className="bg-[#1A1A1A] border-[#333333] text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-md">Current Allocations</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <AllocationChart />
          </CardContent>
        </Card>
      </div>
      
      {/* Portfolio Details */}
      <Card className="bg-[#1A1A1A] border-[#333333] text-white">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-md">Portfolio Overview</CardTitle>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#999999]" />
              <Input 
                className="w-[200px] pl-8 h-9 bg-[#222222] border-[#333333] text-white placeholder:text-[#666666]" 
                placeholder="Search Assets"
              />
            </div>
            <Button className="bg-[#34C759] hover:bg-[#2EB050] text-white">
              <Wallet className="mr-1 h-4 w-4" />
              Deposit
            </Button>
            <Button variant="outline" className="border-[#444444] text-white hover:bg-[#333333]">
              <ArrowUpRight className="mr-1 h-4 w-4" />
              Withdraw
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue="balances">
            <div className="border-b border-[#333333] px-6">
              <TabsList className="bg-transparent h-12">
                <TabsTrigger 
                  value="balances" 
                  className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-white data-[state=active]:text-white rounded-none h-12 text-[#999999]"
                >
                  Balances
                </TabsTrigger>
                <TabsTrigger 
                  value="open-orders" 
                  className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-white data-[state=active]:text-white rounded-none h-12 text-[#999999]"
                >
                  Open Orders
                  <Badge className="ml-1 bg-[#FF3B30] text-white" variant="default">1</Badge>
                </TabsTrigger>
                <TabsTrigger 
                  value="order-history" 
                  className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-white data-[state=active]:text-white rounded-none h-12 text-[#999999]"
                >
                  Order History
                </TabsTrigger>
                <TabsTrigger 
                  value="transfers" 
                  className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-white data-[state=active]:text-white rounded-none h-12 text-[#999999]"
                >
                  Transfers
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="balances" className="m-0">
              <AssetTable />
            </TabsContent>
            
            <TabsContent value="open-orders" className="m-0 p-6">
              <p className="text-[#999999]">Your open orders will appear here.</p>
            </TabsContent>
            
            <TabsContent value="order-history" className="m-0 p-6">
              <p className="text-[#999999]">Your order history will appear here.</p>
            </TabsContent>
            
            <TabsContent value="transfers" className="m-0 p-6">
              <p className="text-[#999999]">Your transfers will appear here.</p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default TradingDashboard;
